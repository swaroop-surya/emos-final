import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import { useToast } from '../../context/ToastContext';
import { UserRole } from '../../types';
import { ShieldCheck, GraduationCap, BookOpen, RotateCcw } from 'lucide-react';

export const DemoSwitcherBar: React.FC = () => {
  const { currentUser, switchDemoRole } = useAuth();
  const { resetToDefaultData } = useData();
  const { showToast } = useToast();

  const roles: { role: UserRole; label: string; name: string; icon: React.ReactNode }[] = [
    {
      role: 'admin',
      label: 'Admin',
      name: 'Dr. Elena Vance',
      icon: <ShieldCheck className="w-3.5 h-3.5" />,
    },
    {
      role: 'teacher',
      label: 'Teacher',
      name: 'Prof. Rajesh Sharma',
      icon: <BookOpen className="w-3.5 h-3.5" />,
    },
    {
      role: 'student',
      label: 'Student',
      name: 'Varshith Reddy',
      icon: <GraduationCap className="w-3.5 h-3.5" />,
    },
  ];

  return (
    <aside aria-label="Demo Role Switcher" className="bg-[#FFF2D7] border-b border-[#FAC95A]/60 px-4 py-2 text-xs text-[#131313] flex flex-wrap items-center justify-between gap-2 shadow-xs transition-colors">
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-semibold bg-[#F9A51B] text-white uppercase tracking-wider">
          Demo Environment
        </span>
        <span className="hidden sm:inline text-[#62676B]">
          Current Persona: <strong className="text-[#131313] font-semibold">{currentUser?.fullName || 'Guest'}</strong> (
          <span className="capitalize">{currentUser?.role || 'Guest'}</span>)
        </span>
      </div>

      <div className="flex items-center gap-1.5 flex-wrap">
        <span className="text-[#62676B] mr-1 hidden md:inline font-medium">Switch Persona:</span>
        {roles.map((r) => {
          const isActive = currentUser?.role === r.role;
          return (
            <button
              key={r.role}
              onClick={() => {
                switchDemoRole(r.role);
                showToast({
                  type: 'info',
                  title: `Switched to ${r.label} Persona`,
                  message: `Viewing workspace as ${r.name} (${r.label})`,
                });
              }}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md font-medium text-xs transition-all cursor-pointer ${
                isActive
                  ? 'bg-[#F9A51B] text-white shadow-xs font-semibold'
                  : 'bg-white hover:bg-[#F3F3F1] text-[#131313] border border-[#DBDBD9]'
              }`}
              title={`Switch to ${r.name} (${r.label})`}
            >
              {r.icon}
              <span>{r.label}</span>
            </button>
          );
        })}

        <button
          onClick={() => {
            if (window.confirm('Reset sample records to initial pristine state?')) {
              resetToDefaultData();
              showToast({
                type: 'success',
                title: 'Data Reset',
                message: 'All sample records restored to baseline default state.',
              });
            }
          }}
          className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-white hover:bg-[#FCEBE9] text-[#62676B] hover:text-[#C44940] border border-[#DBDBD9] transition-colors ml-1 cursor-pointer"
          title="Reset database to default sample records"
        >
          <RotateCcw className="w-3 h-3" />
          <span className="hidden sm:inline">Reset Seed</span>
        </button>
      </div>
    </aside>
  );
};
