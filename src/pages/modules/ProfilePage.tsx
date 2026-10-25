import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
  User,
  Mail,
  Phone,
  Building,
  GraduationCap,
  Calendar,
  Save,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';

export const ProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '+1 (555) 018-4412');
  const [department, setDepartment] = useState(
    currentUser?.department || 'Computer Science & Engineering'
  );
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile({
      fullName,
      phone,
      department,
    });
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  const roleLabel = {
    admin: 'Institutional Administrator',
    teacher: 'Faculty / Professor',
    student: 'Undergraduate Student',
  }[currentUser?.role || 'admin'];

  return (
    <div className="max-w-3xl space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
          Account Profile
        </h1>
        <p className="text-xs text-[#62676B] mt-0.5">
          View and manage your institutional credentials and contact information.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-3.5 rounded-xl bg-[#E6F4EC] border border-[#23845B]/30 text-xs text-[#23845B] flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span className="font-semibold">Profile details successfully updated!</span>
        </div>
      )}

      {/* Main Profile Card */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-6 shadow-2xs space-y-6">
        {/* User Identity Header */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pb-6 border-b border-[#DBDBD9]/60">
          <div className="w-16 h-16 rounded-full bg-[#FFF2D7] text-[#F9A51B] border-2 border-[#FAC95A] flex items-center justify-center font-bold text-xl shrink-0">
            {currentUser?.fullName
              ? currentUser.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')
              : 'U'}
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold text-[#131313]">{currentUser?.fullName}</h2>
              <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded-full bg-[#FFF2D7] text-[#F9A51B] border border-[#FAC95A]/50">
                {currentUser?.role}
              </span>
            </div>
            <p className="text-xs text-[#62676B] mt-0.5">{roleLabel}</p>
            <p className="text-[11px] text-[#919A9F] font-mono mt-1">
              ID: {currentUser?.studentNumber || currentUser?.employeeNumber || 'SYS-ADM-01'}
            </p>
          </div>
        </div>

        {/* Edit Form */}
        <form onSubmit={handleSave} className="space-y-4 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#131313] mb-1.5">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#131313] mb-1.5">Institutional Email</label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  disabled
                  value={currentUser?.email || ''}
                  className="w-full pl-9 pr-4 py-2.5 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-[#62676B] cursor-not-allowed"
                />
              </div>
              <span className="text-[10px] text-[#919A9F] mt-1 block">
                Official email address managed by system administrator.
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-[#131313] mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium text-[#131313] mb-1.5">Department / Faculty</label>
              <div className="relative">
                <Building className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-[#DBDBD9]/60 flex justify-end">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
