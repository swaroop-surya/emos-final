import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import {
  Settings,
  Shield,
  Bell,
  Lock,
  RotateCcw,
  CheckCircle2,
  Sliders,
  Calendar,
} from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const { resetToDefaultData } = useData();

  const [academicYear, setAcademicYear] = useState('2026-2027');
  const [term, setTerm] = useState('Fall Semester 1');
  const [minAttendance, setMinAttendance] = useState('85');

  const [emailNotifs, setEmailNotifs] = useState(true);
  const [examNotifs, setExamNotifs] = useState(true);
  const [assignmentNotifs, setAssignmentNotifs] = useState(true);

  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);

  const handleUpdatePassword = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordNotice('Password updated successfully.');
    setTimeout(() => setPasswordNotice(null), 3000);
  };

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
          System & Account Settings
        </h1>
        <p className="text-xs text-[#62676B] mt-0.5">
          Configure institutional preferences, security parameters, and notification policies.
        </p>
      </div>

      {passwordNotice && (
        <div className="p-3.5 rounded-xl bg-[#E6F4EC] border border-[#23845B]/30 text-xs text-[#23845B] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-semibold">{passwordNotice}</span>
        </div>
      )}

      {/* Institutional Configuration */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#DBDBD9]">
          <Calendar className="w-4 h-4 text-[#F9A51B]" />
          <h3 className="font-semibold text-sm text-[#131313]">Academic Term Configuration</h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
          <div>
            <label className="block text-[#62676B] mb-1 font-medium">Academic Year</label>
            <input
              type="text"
              value={academicYear}
              onChange={(e) => setAcademicYear(e.target.value)}
              className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[#62676B] mb-1 font-medium">Active Semester</label>
            <input
              type="text"
              value={term}
              onChange={(e) => setTerm(e.target.value)}
              className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg"
            />
          </div>

          <div>
            <label className="block text-[#62676B] mb-1 font-medium">Min Attendance Req (%)</label>
            <input
              type="number"
              value={minAttendance}
              onChange={(e) => setMinAttendance(e.target.value)}
              className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* Notification Preferences */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#DBDBD9]">
          <Bell className="w-4 h-4 text-[#F9A51B]" />
          <h3 className="font-semibold text-sm text-[#131313]">Notification Preferences</h3>
        </div>

        <div className="space-y-3 text-xs">
          <label className="flex items-center justify-between cursor-pointer">
            <div>
              <span className="font-medium text-[#131313] block">Examination Schedule Alerts</span>
              <span className="text-[11px] text-[#62676B]">Receive notifications when exam dates or seating halls are released.</span>
            </div>
            <input
              type="checkbox"
              checked={examNotifs}
              onChange={(e) => setExamNotifs(e.target.checked)}
              className="w-4 h-4 text-[#F9A51B] border-[#DBDBD9] rounded-sm"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#DBDBD9]/50">
            <div>
              <span className="font-medium text-[#131313] block">Assignment Submissions & Deadlines</span>
              <span className="text-[11px] text-[#62676B]">Alerts for coursework due dates and published teacher evaluations.</span>
            </div>
            <input
              type="checkbox"
              checked={assignmentNotifs}
              onChange={(e) => setAssignmentNotifs(e.target.checked)}
              className="w-4 h-4 text-[#F9A51B] border-[#DBDBD9] rounded-sm"
            />
          </label>

          <label className="flex items-center justify-between cursor-pointer pt-2 border-t border-[#DBDBD9]/50">
            <div>
              <span className="font-medium text-[#131313] block">Official Email Bulletins</span>
              <span className="text-[11px] text-[#62676B]">Summary digest delivered to your registered inbox.</span>
            </div>
            <input
              type="checkbox"
              checked={emailNotifs}
              onChange={(e) => setEmailNotifs(e.target.checked)}
              className="w-4 h-4 text-[#F9A51B] border-[#DBDBD9] rounded-sm"
            />
          </label>
        </div>
      </div>

      {/* Security & Password */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-3 border-b border-[#DBDBD9]">
          <Lock className="w-4 h-4 text-[#F9A51B]" />
          <h3 className="font-semibold text-sm text-[#131313]">Security & Authentication</h3>
        </div>

        <form onSubmit={handleUpdatePassword} className="space-y-3 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[#62676B] mb-1 font-medium">Current Password</label>
              <input
                type="password"
                required
                defaultValue="password123"
                className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg"
              />
            </div>
            <div>
              <label className="block text-[#62676B] mb-1 font-medium">New Password</label>
              <input
                type="password"
                required
                placeholder="Min 6 characters"
                className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg"
              />
            </div>
          </div>
          <div className="pt-2 flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-[#131313] hover:bg-neutral-800 text-white rounded-lg font-medium cursor-pointer"
            >
              Update Password
            </button>
          </div>
        </form>
      </div>

      {/* Seed Data Reset */}
      <div className="bg-[#FFF2D7]/40 rounded-xl border border-[#FAC95A]/60 p-5 shadow-2xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h3 className="font-semibold text-sm text-[#131313] flex items-center gap-1.5">
            <RotateCcw className="w-4 h-4 text-[#F9A51B]" />
            Development Seed Reset
          </h3>
          <p className="text-xs text-[#62676B] mt-0.5">
            Restore sample courses, students, and attendance records back to pristine initial state.
          </p>
        </div>

        <button
          onClick={() => {
            if (window.confirm('Reset all demo state to factory defaults?')) {
              resetToDefaultData();
              alert('Institutional data reset to baseline.');
            }
          }}
          className="px-4 py-2 rounded-lg bg-white hover:bg-red-50 text-[#C44940] border border-[#DBDBD9] font-medium text-xs transition-colors cursor-pointer shrink-0"
        >
          Reset Demo Data
        </button>
      </div>
    </div>
  );
};
