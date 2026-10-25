import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  Layers,
  Users,
  ClipboardList,
  Calendar,
  CalendarCheck,
  PlusCircle,
  FileCheck,
  Award,
  ChevronRight,
  TrendingUp,
} from 'lucide-react';

export const TeacherDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { classes, assignments, examinations, attendanceSessions } = useData();
  const navigate = useNavigate();

  // Metrics matching Screenshot 4
  const myClassesCount = 4;
  const totalStudentsCount = 120;
  const pendingAssignmentsCount = assignments.filter((a) => a.status === 'Published').length || 3;
  const upcomingExamsCount = examinations.filter((e) => e.status === 'Scheduled').length || 1;

  // Class Overview rows matching Screenshot 4
  const classRows = [
    {
      id: 'cls-cse-1',
      name: 'B.Tech 1st Year (CSE)',
      subject: 'Web Technologies & DBMS',
      students: 30,
      attendance: '90%',
      rateNum: 90,
      recentDate: '24 Oct 2026',
    },
    {
      id: 'cls-cse-2',
      name: 'B.Tech 2nd Year (CSE)',
      subject: 'Database Systems',
      students: 28,
      attendance: '85%',
      rateNum: 85,
      recentDate: '24 Oct 2026',
    },
    {
      id: 'cls-cse-3',
      name: 'B.Tech 3rd Year (CSE)',
      subject: 'Computer Networks',
      students: 32,
      attendance: '88%',
      rateNum: 88,
      recentDate: '23 Oct 2026',
    },
    {
      id: 'cls-cse-4',
      name: 'B.Tech 4th Year (CSE)',
      subject: 'Cloud & AI Systems',
      students: 30,
      attendance: '92%',
      rateNum: 92,
      recentDate: '24 Oct 2026',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Teacher Dashboard
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Good morning, {currentUser?.fullName || 'Prof. Sharma'}! Manage your classes and track your students.
          </p>
        </div>

        <button
          onClick={() => navigate('/app/attendance')}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
        >
          <CalendarCheck className="w-3.5 h-3.5" />
          <span>Mark Daily Attendance</span>
        </button>
      </div>

      {/* 4 Metric Cards Matching Screenshot 4 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* My Classes */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">My Classes</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center">
              <Layers className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{myClassesCount}</span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate('/app/classes')}
              className="text-[11px] font-medium text-[#F9A51B] hover:underline cursor-pointer"
            >
              View all →
            </button>
          </div>
        </div>

        {/* Total Students */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Total Students</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6F4EC] text-[#23845B] flex items-center justify-center">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{totalStudentsCount}</span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate('/app/students')}
              className="text-[11px] font-medium text-[#23845B] hover:underline cursor-pointer"
            >
              View students →
            </button>
          </div>
        </div>

        {/* Pending Assignments */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Pending Reviews</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF3D6] text-[#A66A00] flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{pendingAssignmentsCount}</span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate('/app/assignments')}
              className="text-[11px] font-medium text-[#A66A00] hover:underline cursor-pointer"
            >
              View submissions →
            </button>
          </div>
        </div>

        {/* Upcoming Exams */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Upcoming Exams</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{upcomingExamsCount}</span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate('/app/examinations')}
              className="text-[11px] font-medium text-[#F9A51B] hover:underline cursor-pointer"
            >
              View schedule →
            </button>
          </div>
        </div>
      </div>

      {/* Main Section: Class Overview Table + Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class Overview Table Matching Screenshot 4 */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#DBDBD9]/50">
            <div>
              <h2 className="font-semibold text-sm text-[#131313]">Class Overview</h2>
              <p className="text-[11px] text-[#62676B]">Enrolled cohorts and average class attendance</p>
            </div>
            <button
              onClick={() => navigate('/app/classes')}
              className="text-xs font-semibold text-[#F9A51B] hover:text-[#E58E08] cursor-pointer"
            >
              Manage Classes
            </button>
          </div>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#DBDBD9] text-[#919A9F] font-medium">
                  <th className="py-3 px-3">Class Name</th>
                  <th className="py-3 px-3">Students</th>
                  <th className="py-3 px-3">Attendance</th>
                  <th className="py-3 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DBDBD9]/50">
                {classRows.map((c) => (
                  <tr key={c.id} className="hover:bg-[#F9F9F8] transition-colors">
                    <td className="py-3.5 px-3">
                      <div className="font-semibold text-[#131313]">{c.name}</div>
                      <div className="text-[11px] text-[#62676B]">{c.subject}</div>
                    </td>
                    <td className="py-3.5 px-3 tabular-nums text-[#131313] font-medium">
                      {c.students}
                    </td>
                    <td className="py-3.5 px-3">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[#F3F3F1] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#F9A51B]"
                            style={{ width: c.attendance }}
                          />
                        </div>
                        <span className="font-semibold text-[#131313] tabular-nums">{c.attendance}</span>
                      </div>
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      <button
                        onClick={() => navigate(`/app/attendance?classId=${c.id}`)}
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-[#FFF2D7] text-[#131313] hover:bg-[#F9A51B] hover:text-white transition-colors font-medium text-[11px] cursor-pointer"
                      >
                        <span>Mark Attendance</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions Panel Matching Screenshot 4 */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="pb-3 border-b border-[#DBDBD9]/50">
              <h2 className="font-semibold text-sm text-[#131313]">Quick Actions</h2>
              <p className="text-[11px] text-[#62676B]">Faculty academic tasks</p>
            </div>

            <div className="mt-4 space-y-2.5">
              <button
                onClick={() => navigate('/app/attendance')}
                className="w-full py-2.5 px-3 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold flex items-center justify-between shadow-xs transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <CalendarCheck className="w-4 h-4" />
                  <span>Mark Attendance</span>
                </div>
                <ChevronRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => navigate('/app/assignments?action=new')}
                className="w-full py-2.5 px-3 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4 text-[#F9A51B]" />
                  <span>Create Assignment</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#919A9F]" />
              </button>

              <button
                onClick={() => navigate('/app/examinations')}
                className="w-full py-2.5 px-3 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#F9A51B]" />
                  <span>Enter Examination Marks</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#919A9F]" />
              </button>

              <button
                onClick={() => navigate('/app/results')}
                className="w-full py-2.5 px-3 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium flex items-center justify-between transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-[#23845B]" />
                  <span>Publish Class Results</span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#919A9F]" />
              </button>
            </div>
          </div>

          <div className="mt-6 p-3 rounded-lg bg-[#F9F9F8] border border-[#DBDBD9]/60 text-xs text-[#62676B]">
            <p className="font-semibold text-[#131313] flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-3.5 h-3.5 text-[#F9A51B]" />
              Teaching Schedule Note
            </p>
            <p className="text-[11px] leading-relaxed">
              Lab assessments for Web Technologies take place on Thursday in Computing Lab 3.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
