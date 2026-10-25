import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { ToastProvider } from './context/ToastContext';

// Layout
import { AppLayout } from './components/layout/AppLayout';

// Public Pages
import { LandingPage } from './pages/LandingPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';
import { ForgotPasswordPage } from './pages/ForgotPasswordPage';

// Dashboard Dispatcher
import { DashboardDispatcher } from './pages/dashboards/DashboardDispatcher';

// Functional Modules
import { StudentsPage } from './pages/modules/StudentsPage';
import { TeachersPage } from './pages/modules/TeachersPage';
import { CoursesPage } from './pages/modules/CoursesPage';
import { ClassesPage } from './pages/modules/ClassesPage';
import { AttendancePage } from './pages/modules/AttendancePage';
import { AssignmentsPage } from './pages/modules/AssignmentsPage';
import { ExaminationsPage } from './pages/modules/ExaminationsPage';
import { ResultsPage } from './pages/modules/ResultsPage';
import { ReportsPage } from './pages/modules/ReportsPage';
import { NotificationsPage } from './pages/modules/NotificationsPage';
import { ProfilePage } from './pages/modules/ProfilePage';
import { SettingsPage } from './pages/modules/SettingsPage';

// Not Found Page
const NotFoundPage = () => (
  <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-6 text-center">
    <div className="max-w-md w-full bg-white rounded-2xl border border-[#DBDBD9] p-8 shadow-sm">
      <span className="text-4xl font-extrabold text-[#F9A51B] tabular-nums">404</span>
      <h2 className="text-lg font-bold text-[#131313] mt-2 mb-1">Page Not Found</h2>
      <p className="text-xs text-[#62676B] mb-6">
        The requested academic route or record does not exist on this institutional server.
      </p>
      <a
        href="/"
        className="inline-flex px-4 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors"
      >
        Return to Home
      </a>
    </div>
  </div>
);

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <AuthProvider>
          <DataProvider>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/forgot-password" element={<ForgotPasswordPage />} />

              {/* Application Protected Routes with AppLayout Shell */}
              <Route path="/app" element={<AppLayout />}>
                <Route index element={<Navigate to="/app/dashboard" replace />} />
                <Route path="dashboard" element={<DashboardDispatcher />} />
                <Route path="students" element={<StudentsPage />} />
                <Route path="teachers" element={<TeachersPage />} />
                <Route path="courses" element={<CoursesPage />} />
                <Route path="classes" element={<ClassesPage />} />
                <Route path="attendance" element={<AttendancePage />} />
                <Route path="assignments" element={<AssignmentsPage />} />
                <Route path="examinations" element={<ExaminationsPage />} />
                <Route path="results" element={<ResultsPage />} />
                <Route path="reports" element={<ReportsPage />} />
                <Route path="notifications" element={<NotificationsPage />} />
                <Route path="profile" element={<ProfilePage />} />
                <Route path="settings" element={<SettingsPage />} />
              </Route>

              {/* Catch-all Not Found */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </DataProvider>
        </AuthProvider>
      </ToastProvider>
    </BrowserRouter>
  );
}
