import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole } from '../types';
import { INITIAL_USERS } from '../data/mockData';

interface AuthContextType {
  currentUser: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, roleHint?: UserRole) => Promise<{ success: boolean; error?: string }>;
  register: (name: string, email: string, password: string, role?: UserRole) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  switchDemoRole: (role: UserRole) => void;
  updateProfile: (data: Partial<User>) => void;
  forgotPassword: (email: string) => Promise<{ success: boolean; message: string }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_STORAGE_KEY = 'eoms_auth_user_session';
const ALL_USERS_KEY = 'eoms_institution_users';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize users and current session
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem(ALL_USERS_KEY);
      if (!storedUsers) {
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(INITIAL_USERS));
      }

      const activeSession = localStorage.getItem(AUTH_STORAGE_KEY);
      if (activeSession) {
        setCurrentUser(JSON.parse(activeSession));
      } else {
        // Default to admin for immediate convenience in AI studio preview, but can sign out or switch
        const defaultAdmin = INITIAL_USERS[0];
        setCurrentUser(defaultAdmin);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(defaultAdmin));
      }
    } catch {
      setCurrentUser(INITIAL_USERS[0]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string, roleHint?: UserRole) => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 400)); // Simulate realistic network latency

    if (!email || !password) {
      setIsLoading(false);
      return { success: false, error: 'Please enter both email and password.' };
    }

    if (password.length < 4) {
      setIsLoading(false);
      return { success: false, error: 'Password must be at least 4 characters.' };
    }

    try {
      const storedUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      const allUsers: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : INITIAL_USERS;

      // Find user by email or match demo role
      let user = allUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());

      // If demo email or role hint matches
      if (!user && roleHint) {
        user = allUsers.find((u) => u.role === roleHint);
      }

      if (!user) {
        // Allow fallback for initial demo accounts if typed without exact domain
        if (email.toLowerCase().includes('admin')) {
          user = allUsers.find((u) => u.role === 'admin');
        } else if (email.toLowerCase().includes('teacher')) {
          user = allUsers.find((u) => u.role === 'teacher');
        } else if (email.toLowerCase().includes('student')) {
          user = allUsers.find((u) => u.role === 'student');
        }
      }

      if (user) {
        setCurrentUser(user);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
        setIsLoading(false);
        return { success: true };
      }

      setIsLoading(false);
      return { success: false, error: 'Invalid credentials. Check email address and try again.' };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'An unexpected authentication error occurred.' };
    }
  };

  const register = async (name: string, email: string, password: string, requestedRole: UserRole = 'student') => {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));

    if (!name || !email || !password) {
      setIsLoading(false);
      return { success: false, error: 'All fields are required.' };
    }

    // Role security rule: Public self-registration only allows student role.
    // Teacher or Admin require administrative provisioning.
    const finalRole: UserRole = requestedRole === 'student' ? 'student' : 'student';

    try {
      const storedUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      const allUsers: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : INITIAL_USERS;

      const existing = allUsers.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
      if (existing) {
        setIsLoading(false);
        return { success: false, error: 'An account with this email address already exists.' };
      }

      const newUser: User = {
        id: `usr-${Date.now()}`,
        fullName: name.trim(),
        email: email.trim().toLowerCase(),
        role: finalRole,
        accountStatus: 'Active',
        createdAt: new Date().toISOString(),
        studentNumber: `STU-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`,
        className: 'B.Tech 1st Year (CSE)',
        classId: 'cls-cse-1',
        department: 'Computer Science & Engineering',
      };

      const updatedUsers = [...allUsers, newUser];
      localStorage.setItem(ALL_USERS_KEY, JSON.stringify(updatedUsers));
      setCurrentUser(newUser);
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(newUser));

      setIsLoading(false);
      return { success: true };
    } catch {
      setIsLoading(false);
      return { success: false, error: 'Could not create account at this time.' };
    }
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem(AUTH_STORAGE_KEY);
  };

  const switchDemoRole = (role: UserRole) => {
    try {
      const storedUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      const allUsers: User[] = storedUsersRaw ? JSON.parse(storedUsersRaw) : INITIAL_USERS;
      const targetUser = allUsers.find((u) => u.role === role) || INITIAL_USERS.find((u) => u.role === role);
      if (targetUser) {
        setCurrentUser(targetUser);
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(targetUser));
      }
    } catch {
      // fallback
      const target = INITIAL_USERS.find((u) => u.role === role) || INITIAL_USERS[0];
      setCurrentUser(target);
    }
  };

  const updateProfile = (data: Partial<User>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(updated));

    // Update in all users
    try {
      const storedUsersRaw = localStorage.getItem(ALL_USERS_KEY);
      if (storedUsersRaw) {
        const allUsers: User[] = JSON.parse(storedUsersRaw);
        const next = allUsers.map((u) => (u.id === currentUser.id ? updated : u));
        localStorage.setItem(ALL_USERS_KEY, JSON.stringify(next));
      }
    } catch {
      // ignore
    }
  };

  const forgotPassword = async (email: string) => {
    await new Promise((resolve) => setTimeout(resolve, 400));
    return {
      success: true,
      message: `Password reset instructions have been dispatched to ${email}. Check your institutional mailbox.`,
    };
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        isAuthenticated: !!currentUser,
        isLoading,
        login,
        register,
        logout,
        switchDemoRole,
        updateProfile,
        forgotPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
