import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useToast } from '../../context/ToastContext';
import { Logo } from './Logo';
import {
  LayoutDashboard,
  Users,
  GraduationCap,
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Award,
  FileBarChart,
  Bell,
  Settings,
  UserCheck,
  Layers,
  LogOut,
  X,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { currentUser, logout } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const role = currentUser?.role || 'admin';

  // Navigation config based on role matching design reference
  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/app/students', label: 'Students', icon: GraduationCap },
          { to: '/app/teachers', label: 'Teachers', icon: UserCheck },
          { to: '/app/courses', label: 'Courses', icon: BookOpen },
          { to: '/app/classes', label: 'Classes', icon: Layers },
          { to: '/app/attendance', label: 'Attendance', icon: CalendarCheck },
          { to: '/app/assignments', label: 'Assignments', icon: ClipboardList },
          { to: '/app/examinations', label: 'Examinations', icon: Award },
          { to: '/app/results', label: 'Results', icon: Award },
          { to: '/app/reports', label: 'Reports', icon: FileBarChart },
          { to: '/app/notifications', label: 'Notifications', icon: Bell },
          { to: '/app/settings', label: 'Settings', icon: Settings },
        ];
      case 'teacher':
        return [
          { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/app/classes', label: 'My Classes', icon: Layers },
          { to: '/app/students', label: 'Students', icon: GraduationCap },
          { to: '/app/attendance', label: 'Attendance', icon: CalendarCheck },
          { to: '/app/assignments', label: 'Assignments', icon: ClipboardList },
          { to: '/app/examinations', label: 'Examinations', icon: Award },
          { to: '/app/results', label: 'Results', icon: Award },
          { to: '/app/notifications', label: 'Messages', icon: Bell },
          { to: '/app/profile', label: 'Profile', icon: Users },
          { to: '/app/settings', label: 'Settings', icon: Settings },
        ];
      case 'student':
        return [
          { to: '/app/dashboard', label: 'Dashboard', icon: LayoutDashboard },
          { to: '/app/profile', label: 'Profile', icon: Users },
          { to: '/app/courses', label: 'My Courses', icon: BookOpen },
          { to: '/app/attendance', label: 'Attendance', icon: CalendarCheck },
          { to: '/app/assignments', label: 'Assignments', icon: ClipboardList },
          { to: '/app/examinations', label: 'Examinations', icon: Award },
          { to: '/app/results', label: 'My Results', icon: Award },
          { to: '/app/notifications', label: 'Messages', icon: Bell },
          { to: '/app/settings', label: 'Settings', icon: Settings },
        ];
    }
  };

  const navItems = getNavItems();

  const handleLogout = () => {
    onClose();
    navigate('/', { replace: true });
    logout();
    showToast({
      type: 'success',
      title: 'Signed Out Successfully',
      message: 'You have been logged out of your session.',
    });
  };

  const roleBadgeLabel = {
    admin: 'Administrator',
    teacher: 'Faculty',
    student: 'Student',
  }[role];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-64 bg-white border-r border-[#DBDBD9] flex flex-col transition-transform duration-200 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand Header */}
        <div className="h-16 px-5 border-b border-[#DBDBD9] flex items-center justify-between">
          <NavLink to="/app/dashboard" className="cursor-pointer" onClick={() => onClose()}>
            <Logo size="md" />
          </NavLink>
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-md text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1] cursor-pointer"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation list */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[11px] font-semibold tracking-wider text-[#919A9F] uppercase">
            {role.toUpperCase()} MENU
          </div>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => onClose()}
                className={({ isActive }) =>
                  `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#FFF2D7] text-[#131313] font-semibold border-l-4 border-[#F9A51B] pl-2.5'
                      : 'text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1]'
                  }`
                }
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4 shrink-0 text-[#F9A51B]" />
                  <span>{item.label}</span>
                </div>
                <ChevronRight className="w-3.5 h-3.5 opacity-40" />
              </NavLink>
            );
          })}
        </div>

        {/* User Card at Bottom */}
        <div className="p-3 border-t border-[#DBDBD9] bg-[#F9F9F8]">
          <div className="flex items-center justify-between p-2 rounded-lg bg-white border border-[#DBDBD9]/80 shadow-2xs">
            <div className="flex items-center gap-2.5 overflow-hidden">
              <div className="w-9 h-9 rounded-full bg-[#FFF2D7] text-[#F9A51B] border border-[#FAC95A] flex items-center justify-center font-bold text-xs shrink-0">
                {currentUser?.fullName
                  ? currentUser.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')
                  : 'U'}
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-semibold text-[#131313] truncate">
                  {currentUser?.fullName || 'User'}
                </p>
                <p className="text-[11px] text-[#62676B] capitalize flex items-center gap-1 truncate">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#23845B]" />
                  {roleBadgeLabel}
                </p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="p-1.5 rounded-md text-[#62676B] hover:text-[#C44940] hover:bg-[#FCEBE9] transition-colors cursor-pointer shrink-0"
              title="Sign Out"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};
