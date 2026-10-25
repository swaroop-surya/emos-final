import React, { useState } from 'react';
import { Outlet, Navigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Sidebar } from '../common/Sidebar';
import { Header } from '../common/Header';
import { DemoSwitcherBar } from '../common/DemoSwitcherBar';
import { ShieldAlert, ArrowLeft } from 'lucide-react';

export const AppLayout: React.FC = () => {
  const { isAuthenticated, currentUser, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 border-3 border-[#F9A51B] border-t-transparent rounded-full animate-spin" />
          <p className="text-sm font-medium text-[#62676B]">Loading EOMS workspace...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated || !currentUser) {
    return <Navigate to="/" replace />;
  }

  // Role Access Guard checking
  const path = location.pathname;
  const role = currentUser.role;

  // Strict role boundaries
  const isStudentRestricted =
    role === 'student' &&
    (path.startsWith('/app/teachers') ||
      path.startsWith('/app/reports') ||
      path.includes('/new') ||
      path.includes('/edit'));

  const isTeacherRestricted =
    role === 'teacher' && (path.startsWith('/app/reports') && !path.includes('/class'));

  if (isStudentRestricted) {
    return (
      <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white rounded-xl border border-[#DBDBD9] p-6 text-center shadow-sm">
          <div className="w-12 h-12 rounded-full bg-[#FCEBE9] text-[#C44940] flex items-center justify-center mx-auto mb-4">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <h2 className="text-lg font-bold text-[#131313] mb-1">Access Restricted</h2>
          <p className="text-xs text-[#62676B] mb-5 leading-relaxed">
            This module requires administrative or faculty permissions. Your current account role ({role}) does not have clearance to view this page.
          </p>
          <div className="flex items-center justify-center gap-3">
            <Link
              to="/app/dashboard"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9A51B] text-white font-medium text-xs hover:bg-[#E58E08] transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Return to Student Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex flex-col font-sans">
      {/* Top Demo Bar */}
      <DemoSwitcherBar />

      <div className="flex-1 flex overflow-hidden">
        {/* Navigation Sidebar */}
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 lg:pl-64">
          <Header onOpenSidebar={() => setSidebarOpen(true)} />

          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
