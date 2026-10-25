import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import {
  Menu,
  Search,
  Bell,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Info,
  ChevronDown,
  User as UserIcon,
  Settings,
  LogOut,
} from 'lucide-react';

interface HeaderProps {
  onOpenSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenSidebar }) => {
  const { currentUser, logout } = useAuth();
  const { notifications, markNotificationRead, markAllNotificationsRead } = useData();
  const { showToast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const notifRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Filter notifications for current user's role
  const role = currentUser?.role || 'admin';
  const myNotifications = notifications.filter(
    (n) => n.targetRoles.includes(role) || n.targetUserId === currentUser?.id
  );
  const unreadCount = myNotifications.filter((n) => !n.read).length;

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setShowNotifications(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(e.target as Node)) {
        setShowUserMenu(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Format today's date
  const todayFormatted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date());

  // Breadcrumb helper
  const getBreadcrumbTitle = () => {
    const path = location.pathname.split('/').filter(Boolean);
    if (path.length <= 1) return 'Dashboard';
    const segment = path[1];
    return segment.charAt(0).toUpperCase() + segment.slice(1);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    // Route to students or courses search based on role
    if (role === 'student') {
      navigate('/app/courses');
    } else {
      navigate('/app/students');
    }
  };

  return (
    <header className="h-16 bg-white border-b border-[#DBDBD9] px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left section: Hamburger & Breadcrumbs */}
      <div className="flex items-center gap-3">
        <button
          onClick={onOpenSidebar}
          className="lg:hidden p-2 rounded-lg text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1] cursor-pointer"
          aria-label="Open sidebar"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 text-sm">
          <span className="text-[#919A9F] hidden sm:inline">EOMS</span>
          <span className="text-[#919A9F] hidden sm:inline">/</span>
          <span className="font-semibold text-[#131313]">{getBreadcrumbTitle()}</span>
        </div>
      </div>

      {/* Center Search Input */}
      <div className="hidden md:flex flex-1 max-w-md mx-6">
        <form onSubmit={handleSearchSubmit} className="relative w-full">
          <Search className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search students, classes, records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:bg-white transition-all"
          />
        </form>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Date badge */}
        <div className="hidden xl:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F9F9F8] border border-[#DBDBD9] text-xs text-[#62676B]">
          <Calendar className="w-3.5 h-3.5 text-[#F9A51B]" />
          <span>{todayFormatted}</span>
        </div>

        {/* Notifications Popover */}
        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setShowNotifications((prev) => !prev)}
            className="relative p-2 rounded-lg text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1] transition-colors cursor-pointer"
            aria-label="View notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#F9A51B] ring-2 ring-white" />
            )}
          </button>

          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-lg border border-[#DBDBD9] py-3 z-50">
              <div className="px-4 pb-2 border-b border-[#DBDBD9] flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-sm text-[#131313]">Notifications</h4>
                  <p className="text-[11px] text-[#62676B]">{unreadCount} unread notices</p>
                </div>
                {unreadCount > 0 && (
                  <button
                    onClick={markAllNotificationsRead}
                    className="text-xs text-[#F9A51B] hover:text-[#E58E08] font-medium cursor-pointer"
                  >
                    Mark all read
                  </button>
                )}
              </div>

              <div className="max-h-72 overflow-y-auto divide-y divide-[#DBDBD9]/50">
                {myNotifications.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#919A9F]">
                    No notifications at this time.
                  </div>
                ) : (
                  myNotifications.slice(0, 5).map((n) => (
                    <div
                      key={n.id}
                      onClick={() => markNotificationRead(n.id)}
                      className={`p-3 text-xs flex gap-3 cursor-pointer hover:bg-[#F9F9F8] transition-colors ${
                        !n.read ? 'bg-[#FFF2D7]/40' : ''
                      }`}
                    >
                      <div className="mt-0.5 shrink-0">
                        {n.type === 'success' && (
                          <CheckCircle2 className="w-4 h-4 text-[#23845B]" />
                        )}
                        {n.type === 'warning' && (
                          <AlertCircle className="w-4 h-4 text-[#A66A00]" />
                        )}
                        {(n.type === 'info' || n.type === 'alert') && (
                          <Info className="w-4 h-4 text-[#F9A51B]" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-[#131313] leading-snug">{n.title}</p>
                        <p className="text-[#62676B] text-[11px] mt-0.5 line-clamp-2 leading-relaxed">
                          {n.message}
                        </p>
                        <span className="text-[10px] text-[#919A9F] mt-1 block">
                          {new Date(n.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="pt-2 px-4 border-t border-[#DBDBD9] text-center">
                <button
                  onClick={() => {
                    setShowNotifications(false);
                    navigate('/app/notifications');
                  }}
                  className="text-xs font-medium text-[#F9A51B] hover:underline"
                >
                  View all announcements & messages →
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User Menu */}
        <div className="relative" ref={userMenuRef}>
          <button
            onClick={() => setShowUserMenu((prev) => !prev)}
            className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-[#F3F3F1] transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-[#FFF2D7] text-[#F9A51B] border border-[#FAC95A] flex items-center justify-center font-bold text-xs shrink-0">
              {currentUser?.fullName
                ? currentUser.fullName
                    .split(' ')
                    .map((n) => n[0])
                    .slice(0, 2)
                    .join('')
                : 'U'}
            </div>
            <div className="hidden sm:block text-left leading-tight">
              <span className="text-xs font-semibold text-[#131313] block">
                {currentUser?.fullName?.split(' ')[0] || 'User'}
              </span>
              <span className="text-[10px] text-[#62676B] capitalize block">
                {currentUser?.role || 'Guest'}
              </span>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-[#919A9F]" />
          </button>

          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-[#DBDBD9] py-1.5 z-50 text-xs">
              <div className="px-3 py-2 border-b border-[#DBDBD9]/60">
                <p className="font-semibold text-[#131313] truncate">{currentUser?.fullName}</p>
                <p className="text-[11px] text-[#62676B] truncate">{currentUser?.email}</p>
              </div>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/app/profile');
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#F9F9F8] flex items-center gap-2 text-[#131313] cursor-pointer"
              >
                <UserIcon className="w-3.5 h-3.5 text-[#62676B]" />
                <span>My Profile</span>
              </button>

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/app/settings');
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#F9F9F8] flex items-center gap-2 text-[#131313] cursor-pointer"
              >
                <Settings className="w-3.5 h-3.5 text-[#62676B]" />
                <span>Account Settings</span>
              </button>

              <div className="border-t border-[#DBDBD9]/60 my-1" />

              <button
                onClick={() => {
                  setShowUserMenu(false);
                  navigate('/', { replace: true });
                  logout();
                  showToast({
                    type: 'success',
                    title: 'Signed Out Successfully',
                    message: 'You have been safely signed out.',
                  });
                }}
                className="w-full px-3 py-2 text-left hover:bg-[#FCEBE9] flex items-center gap-2 text-[#C44940] cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Sign Out</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
