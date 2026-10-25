import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { AdminDashboard } from './AdminDashboard';
import { TeacherDashboard } from './TeacherDashboard';
import { StudentDashboard } from './StudentDashboard';

export const DashboardDispatcher: React.FC = () => {
  const { currentUser } = useAuth();

  switch (currentUser?.role) {
    case 'teacher':
      return <TeacherDashboard />;
    case 'student':
      return <StudentDashboard />;
    case 'admin':
    default:
      return <AdminDashboard />;
  }
};
