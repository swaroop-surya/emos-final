import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Users,
  GraduationCap,
  BookOpen,
  Clock,
  TrendingUp,
  TrendingDown,
  UserPlus,
  BookPlus,
  FileText,
  CalendarCheck,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { students, teachers, courses, attendanceSessions } = useData();
  const navigate = useNavigate();

  // Metrics from actual state with baseline fallback
  const totalStudents = students.length || 248;
  const totalTeachers = teachers.length || 18;
  const totalCourses = courses.length || 12;
  const pendingApprovals = 5;

  // Chart data
  const chartPoints = [
    { label: 'Jan', val: 180 },
    { label: 'Feb', val: 195 },
    { label: 'Mar', val: 205 },
    { label: 'Apr', val: 215 },
    { label: 'May', val: 220 },
    { label: 'Jun', val: 228 },
    { label: 'Jul', val: 236 },
    { label: 'Aug', val: totalStudents },
  ];

  const maxVal = 260;
  const minVal = 160;

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Dashboard
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Good morning, {currentUser?.fullName?.split(' ')[0] || 'Admin'}! Here&apos;s what&apos;s happening in your institution today.
          </p>
        </div>

        {/* Action shortcuts */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => navigate('/app/students?action=new')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
          >
            <UserPlus className="w-3.5 h-3.5" />
            <span>Add Student</span>
          </button>
          <button
            onClick={() => navigate('/app/courses?action=new')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium transition-colors cursor-pointer"
          >
            <BookPlus className="w-3.5 h-3.5 text-[#F9A51B]" />
            <span>Create Course</span>
          </button>
        </div>
      </div>

      {/* 4 Metric Cards Matching Screenshot 2 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Students */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Total Students</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center">
              <GraduationCap className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{totalStudents}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#23845B] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+12% from last month</span>
          </div>
        </div>

        {/* Total Teachers */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Total Teachers</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{totalTeachers}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#23845B] font-medium">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>+8% from last month</span>
          </div>
        </div>

        {/* Total Courses */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Total Courses</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{totalCourses}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#62676B] font-medium">
            <span>+ 0% from last month</span>
          </div>
        </div>

        {/* Pending Approvals */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Pending Approvals</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF3D6] text-[#A66A00] flex items-center justify-center">
              <Clock className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{pendingApprovals}</span>
          </div>
          <div className="mt-2 flex items-center gap-1 text-[11px] text-[#23845B] font-medium">
            <TrendingDown className="w-3.5 h-3.5" />
            <span>-2% from last month</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Student Enrollment Chart + Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Student Enrollment Chart */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs flex flex-col justify-between">
          <div className="flex items-center justify-between pb-3 border-b border-[#DBDBD9]/50">
            <div>
              <h2 className="font-semibold text-sm text-[#131313]">Student Enrollment</h2>
              <p className="text-[11px] text-[#62676B]">Monthly institutional admission trends (2026)</p>
            </div>
            <span className="text-xs font-medium text-[#23845B] bg-[#E6F4EC] px-2.5 py-1 rounded-full">
              +37.8% YTD
            </span>
          </div>

          {/* SVG Smooth Curve Line Chart */}
          <div className="py-6">
            <div className="h-52 w-full relative">
              {/* Grid Lines */}
              <div className="absolute inset-0 flex flex-col justify-between pointer-events-none text-[10px] text-[#919A9F]">
                <div className="border-b border-[#DBDBD9]/40 w-full flex justify-between">
                  <span>250</span>
                </div>
                <div className="border-b border-[#DBDBD9]/40 w-full flex justify-between">
                  <span>200</span>
                </div>
                <div className="border-b border-[#DBDBD9]/40 w-full flex justify-between">
                  <span>150</span>
                </div>
                <div className="border-b border-[#DBDBD9]/40 w-full flex justify-between">
                  <span>100</span>
                </div>
                <div className="border-b border-[#DBDBD9]/40 w-full flex justify-between">
                  <span>0</span>
                </div>
              </div>

              {/* Chart SVG */}
              <svg className="w-full h-full overflow-visible pt-2 pb-2" viewBox="0 0 700 180" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="enrollmentGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#F9A51B" stopOpacity="0.28" />
                    <stop offset="100%" stopColor="#F9A51B" stopOpacity="0.0" />
                  </linearGradient>
                </defs>

                {/* Area under curve */}
                <path
                  d="M 20 150 
                     C 100 130, 150 115, 200 100 
                     C 250 85, 300 80, 380 65 
                     C 460 50, 520 40, 580 30 
                     C 630 20, 660 15, 680 10 
                     L 680 170 L 20 170 Z"
                  fill="url(#enrollmentGrad)"
                />

                {/* Line */}
                <path
                  d="M 20 150 
                     C 100 130, 150 115, 200 100 
                     C 250 85, 300 80, 380 65 
                     C 460 50, 520 40, 580 30 
                     C 630 20, 660 15, 680 10"
                  fill="none"
                  stroke="#F9A51B"
                  strokeWidth="3"
                  strokeLinecap="round"
                />

                {/* Data points */}
                {[
                  { cx: 20, cy: 150, val: 180 },
                  { cx: 110, cy: 125, val: 195 },
                  { cx: 200, cy: 100, val: 205 },
                  { cx: 290, cy: 82, val: 215 },
                  { cx: 380, cy: 65, val: 220 },
                  { cx: 470, cy: 48, val: 228 },
                  { cx: 560, cy: 32, val: 236 },
                  { cx: 680, cy: 10, val: 248 },
                ].map((pt, i) => (
                  <g key={i}>
                    <circle cx={pt.cx} cy={pt.cy} r="4.5" fill="#FFFFFF" stroke="#F9A51B" strokeWidth="2.5" />
                  </g>
                ))}
              </svg>
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between text-xs text-[#62676B] font-medium pt-3 px-2 border-t border-[#DBDBD9]">
              {chartPoints.map((p) => (
                <span key={p.label}>{p.label}</span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#DBDBD9]/50 flex items-center justify-between text-xs text-[#62676B]">
            <span>Average retention rate: <strong className="text-[#131313]">94.2%</strong></span>
            <button
              onClick={() => navigate('/app/reports')}
              className="text-[#F9A51B] hover:text-[#E58E08] font-semibold inline-flex items-center gap-1 cursor-pointer"
            >
              Detailed Enrollment Report <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Recent Activities matching Screenshot 2 */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DBDBD9]/50">
              <h2 className="font-semibold text-sm text-[#131313]">Recent Activities</h2>
              <span className="text-[10px] bg-[#F3F3F1] text-[#62676B] px-2 py-0.5 rounded-md font-medium">
                Live Audit
              </span>
            </div>

            <div className="divide-y divide-[#DBDBD9]/40 mt-1">
              <div className="py-3 flex gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center shrink-0 mt-0.5">
                  <UserPlus className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#131313]">New student registered</p>
                  <p className="text-[#62676B] text-[11px]">Rahul Sharma • B.Tech 1st Year</p>
                  <span className="text-[10px] text-[#919A9F]">2 hours ago</span>
                </div>
              </div>

              <div className="py-3 flex gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#E6F4EC] text-[#23845B] flex items-center justify-center shrink-0 mt-0.5">
                  <Users className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#131313]">Teacher profile updated</p>
                  <p className="text-[#62676B] text-[11px]">Sneha Reddy • Dept. of CSE</p>
                  <span className="text-[10px] text-[#919A9F]">4 hours ago</span>
                </div>
              </div>

              <div className="py-3 flex gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center shrink-0 mt-0.5">
                  <FileText className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#131313]">Exam results published</p>
                  <p className="text-[#62676B] text-[11px]">B.Tech 1st Year (CSE) • Unit Test 1</p>
                  <span className="text-[10px] text-[#919A9F]">6 hours ago</span>
                </div>
              </div>

              <div className="py-3 flex gap-3 text-xs">
                <div className="w-7 h-7 rounded-full bg-[#F3F3F1] text-[#62676B] flex items-center justify-center shrink-0 mt-0.5">
                  <CalendarCheck className="w-3.5 h-3.5" />
                </div>
                <div>
                  <p className="font-semibold text-[#131313]">Leave request approved</p>
                  <p className="text-[#62676B] text-[11px]">Prof. Kumar • 8 hours ago</p>
                  <span className="text-[10px] text-[#919A9F]">8 hours ago</span>
                </div>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/notifications')}
            className="w-full mt-2 py-2 text-center rounded-lg border border-[#DBDBD9] text-xs font-medium text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1] transition-colors cursor-pointer"
          >
            View Complete Activity Log
          </button>
        </div>
      </div>

      {/* Quick Actions Shortcuts matching specifications */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
        <h2 className="text-xs font-semibold uppercase tracking-wider text-[#919A9F] mb-3">
          Institutional Quick Actions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => navigate('/app/students?action=new')}
            className="p-3 rounded-lg border border-[#DBDBD9] hover:border-[#F9A51B] hover:bg-[#FFF2D7]/20 flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <UserPlus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#131313]">Add Student</p>
              <p className="text-[11px] text-[#62676B]">Enroll new candidate</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/teachers?action=new')}
            className="p-3 rounded-lg border border-[#DBDBD9] hover:border-[#F9A51B] hover:bg-[#FFF2D7]/20 flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <Users className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#131313]">Add Teacher</p>
              <p className="text-[11px] text-[#62676B]">Assign faculty member</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/courses?action=new')}
            className="p-3 rounded-lg border border-[#DBDBD9] hover:border-[#F9A51B] hover:bg-[#FFF2D7]/20 flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <BookPlus className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#131313]">Create Course</p>
              <p className="text-[11px] text-[#62676B]">Set syllabus & credits</p>
            </div>
          </button>

          <button
            onClick={() => navigate('/app/reports')}
            className="p-3 rounded-lg border border-[#DBDBD9] hover:border-[#F9A51B] hover:bg-[#FFF2D7]/20 flex items-center gap-3 text-left transition-all cursor-pointer group"
          >
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center group-hover:scale-105 transition-transform">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <p className="text-xs font-semibold text-[#131313]">View Reports</p>
              <p className="text-[11px] text-[#62676B]">Academic analytics</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
