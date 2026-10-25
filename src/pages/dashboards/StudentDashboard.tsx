import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import {
  BookOpen,
  CalendarCheck,
  ClipboardList,
  Calendar,
  CheckCircle2,
  Bell,
  Award,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

export const StudentDashboard: React.FC = () => {
  const { currentUser } = useAuth();
  const { courses, assignments, examinations, results } = useData();
  const navigate = useNavigate();

  // Student specific metrics
  const myCoursesCount = 5;
  const attendanceRate = 92;
  const pendingAssignmentsCount = 3;
  const upcomingExamsCount = 2;
  const overallProgress = 78;

  const enrolledCourseList = [
    {
      id: 'crs-web-101',
      title: 'Web Technologies',
      code: 'CS-101',
      cohort: 'B.Tech - 1st Year',
      progress: 75,
      color: '#F9A51B',
      teacher: 'Prof. Rajesh Sharma',
    },
    {
      id: 'crs-db-102',
      title: 'Database Management Systems',
      code: 'CS-102',
      cohort: 'B.Tech - 1st Year',
      progress: 60,
      color: '#23845B',
      teacher: 'Prof. Rajesh Sharma',
    },
    {
      id: 'crs-net-201',
      title: 'Computer Networks',
      code: 'CS-201',
      cohort: 'B.Tech - 1st Year',
      progress: 40,
      color: '#A66A00',
      teacher: 'Dr. Sunita Rao',
    },
    {
      id: 'crs-ds-103',
      title: 'Data Structures & Algorithms',
      code: 'CS-103',
      cohort: 'B.Tech - 1st Year',
      progress: 85,
      color: '#F9A51B',
      teacher: 'Prof. David Miller',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner with Circular Donut Progress Ring */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 sm:p-6 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-[#F9A51B] uppercase tracking-wider bg-[#FFF2D7] px-2.5 py-0.5 rounded-full mb-2">
            <Sparkles className="w-3 h-3" />
            Academic Semester 1
          </span>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Welcome back, {currentUser?.fullName?.split(' ')[0] || 'Varshith'}!
          </h1>
          <p className="text-xs text-[#62676B] mt-1 max-w-lg">
            Keep going! You&apos;re doing great. 3 assignments are due this week and your next exam is in 18 days.
          </p>
        </div>

        {/* Circular Donut Progress Ring matching Screenshot 3 */}
        <div className="flex items-center gap-4 bg-[#F9F9F8] p-3.5 rounded-xl border border-[#DBDBD9]/60 shrink-0">
          <div className="relative w-14 h-14 flex items-center justify-center">
            <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-[#DBDBD9]"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className="text-[#F9A51B]"
                strokeDasharray={`${overallProgress}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute text-xs font-bold text-[#131313] tabular-nums">
              {overallProgress}%
            </span>
          </div>
          <div>
            <span className="text-xs font-bold text-[#131313] block">Overall Progress</span>
            <span className="text-[11px] text-[#23845B] font-medium flex items-center gap-1">
              On track for Semester Honor
            </span>
          </div>
        </div>
      </div>

      {/* 4 Metric Cards Matching Screenshot 3 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* My Courses */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">My Courses</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center">
              <BookOpen className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{myCoursesCount}</span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate('/app/courses')}
              className="text-[11px] font-medium text-[#F9A51B] hover:underline cursor-pointer"
            >
              View all →
            </button>
          </div>
        </div>

        {/* Attendance */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Attendance</span>
            <div className="w-8 h-8 rounded-lg bg-[#E6F4EC] text-[#23845B] flex items-center justify-center">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{attendanceRate}%</span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate('/app/attendance')}
              className="text-[11px] font-medium text-[#23845B] hover:underline cursor-pointer"
            >
              View details →
            </button>
          </div>
        </div>

        {/* Assignments */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-[#62676B]">Assignments</span>
            <div className="w-8 h-8 rounded-lg bg-[#FFF3D6] text-[#A66A00] flex items-center justify-center">
              <ClipboardList className="w-4 h-4" />
            </div>
          </div>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{pendingAssignmentsCount} Pending</span>
          </div>
          <div className="mt-2">
            <button
              onClick={() => navigate('/app/assignments')}
              className="text-[11px] font-medium text-[#A66A00] hover:underline cursor-pointer"
            >
              View all →
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

      {/* Grid: My Courses + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: My Courses with Progress Bars Matching Screenshot 3 */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#DBDBD9]/50">
            <div>
              <h2 className="font-semibold text-sm text-[#131313]">My Courses</h2>
              <p className="text-[11px] text-[#62676B]">Enrolled curriculum & syllabus progress</p>
            </div>
            <button
              onClick={() => navigate('/app/courses')}
              className="text-xs font-semibold text-[#F9A51B] hover:text-[#E58E08] cursor-pointer inline-flex items-center gap-1"
            >
              View all <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-[#DBDBD9]/50 mt-2">
            {enrolledCourseList.map((course) => (
              <div key={course.id} className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center font-bold text-xs shrink-0">
                    {course.code.split('-')[1]}
                  </div>
                  <div>
                    <h3 className="font-semibold text-xs text-[#131313] hover:text-[#F9A51B] cursor-pointer" onClick={() => navigate('/app/courses')}>
                      {course.title}
                    </h3>
                    <p className="text-[11px] text-[#62676B]">
                      {course.cohort} • {course.teacher}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto w-full sm:w-48">
                  <div className="flex-1 h-2 bg-[#F3F3F1] rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                    />
                  </div>
                  <span className="text-xs font-bold text-[#131313] tabular-nums w-8 text-right">
                    {course.progress}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Recent Activity Matching Screenshot 3 */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <div className="pb-3 border-b border-[#DBDBD9]/50 flex items-center justify-between">
            <h2 className="font-semibold text-sm text-[#131313]">Recent Activity</h2>
            <span className="text-[10px] bg-[#F3F3F1] text-[#62676B] px-2 py-0.5 rounded-md font-medium">
              Timeline
            </span>
          </div>

          <div className="divide-y divide-[#DBDBD9]/40 mt-1">
            <div className="py-3 flex gap-3 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#E6F4EC] text-[#23845B] flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-[#131313]">Assignment submitted</p>
                <p className="text-[#62676B] text-[11px]">Web Technologies • Relational Schema</p>
                <span className="text-[10px] text-[#919A9F]">1 day ago</span>
              </div>
            </div>

            <div className="py-3 flex gap-3 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center shrink-0 mt-0.5">
                <CalendarCheck className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-[#131313]">Attendance marked</p>
                <p className="text-[#62676B] text-[11px]">Database Management Systems • Present</p>
                <span className="text-[10px] text-[#919A9F]">2 days ago</span>
              </div>
            </div>

            <div className="py-3 flex gap-3 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#FFF3D6] text-[#A66A00] flex items-center justify-center shrink-0 mt-0.5">
                <Award className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-[#131313]">Exam result available</p>
                <p className="text-[#62676B] text-[11px]">Data Structures Unit Test 1 • Grade: A+ (92%)</p>
                <span className="text-[10px] text-[#919A9F]">3 days ago</span>
              </div>
            </div>

            <div className="py-3 flex gap-3 text-xs">
              <div className="w-7 h-7 rounded-full bg-[#F3F3F1] text-[#62676B] flex items-center justify-center shrink-0 mt-0.5">
                <Bell className="w-3.5 h-3.5" />
              </div>
              <div>
                <p className="font-semibold text-[#131313]">New notice published</p>
                <p className="text-[#62676B] text-[11px]">Winter 2026 Examination Schedule</p>
                <span className="text-[10px] text-[#919A9F]">4 days ago</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => navigate('/app/results')}
            className="w-full mt-3 py-2 text-center rounded-lg bg-[#FFF2D7] hover:bg-[#F9A51B] text-[#131313] hover:text-white transition-colors text-xs font-semibold cursor-pointer"
          >
            View Academic Scorecard
          </button>
        </div>
      </div>
    </div>
  );
};
