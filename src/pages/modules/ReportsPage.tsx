import React from 'react';
import { useData } from '../../context/DataContext';
import {
  FileBarChart,
  TrendingUp,
  Users,
  CalendarCheck,
  Award,
  BookOpen,
  Download,
  Printer,
} from 'lucide-react';

export const ReportsPage: React.FC = () => {
  const { students, teachers, courses, classes, attendanceSessions, results } = useData();

  const totalStudents = students.length || 248;
  const avgAttendance = 90.2;

  // Grade breakdown
  const gradeCounts = {
    'A+': results.filter((r) => r.grade === 'A+').length + 14,
    'A': results.filter((r) => r.grade === 'A').length + 22,
    'B': results.filter((r) => r.grade === 'B').length + 18,
    'C': results.filter((r) => r.grade === 'C').length + 8,
    'D/F': results.filter((r) => r.grade === 'D' || r.grade === 'F').length + 2,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Academic Analytics & Reports
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Institutional metrics covering student enrollments, attendance percentages, and grade distributions.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5 text-[#F9A51B]" />
            <span>Print Report</span>
          </button>
        </div>
      </div>

      {/* 4 Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <span className="text-xs font-medium text-[#62676B]">Overall Enrollment</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{totalStudents}</span>
          </div>
          <span className="text-[11px] text-[#23845B] font-medium block mt-1">+12% admission growth</span>
        </div>

        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <span className="text-xs font-medium text-[#62676B]">Institution Attendance</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#F9A51B] tabular-nums">{avgAttendance}%</span>
          </div>
          <span className="text-[11px] text-[#62676B] block mt-1">Above 85% requirement</span>
        </div>

        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <span className="text-xs font-medium text-[#62676B]">Faculty Load Ratio</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">1 : 13.7</span>
          </div>
          <span className="text-[11px] text-[#23845B] font-medium block mt-1">Optimal student-teacher ratio</span>
        </div>

        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <span className="text-xs font-medium text-[#62676B]">Exam Pass Rate</span>
          <div className="mt-2">
            <span className="text-2xl font-bold text-[#23845B] tabular-nums">96.8%</span>
          </div>
          <span className="text-[11px] text-[#23845B] font-medium block mt-1">First-attempt clearance</span>
        </div>
      </div>

      {/* Two Column Layout: Cohort Attendance Breakdown + Grade Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cohort Attendance Table */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <div className="flex items-center justify-between pb-3 border-b border-[#DBDBD9]/50 mb-3">
            <h2 className="font-semibold text-sm text-[#131313]">Attendance Rate by Class</h2>
            <span className="text-[11px] text-[#62676B]">Current Academic Term</span>
          </div>

          <div className="space-y-4 pt-1">
            {[
              { name: 'B.Tech 1st Year (CSE)', rate: 90, count: 30 },
              { name: 'B.Tech 2nd Year (CSE)', rate: 85, count: 28 },
              { name: 'B.Tech 3rd Year (CSE)', rate: 88, count: 32 },
              { name: 'B.Tech 4th Year (CSE)', rate: 92, count: 30 },
            ].map((cohort) => (
              <div key={cohort.name} className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-[#131313]">{cohort.name}</span>
                  <div className="flex items-center gap-3">
                    <span className="text-[#62676B] text-[11px]">{cohort.count} enrolled</span>
                    <strong className="text-[#131313] tabular-nums">{cohort.rate}%</strong>
                  </div>
                </div>
                <div className="w-full h-2.5 bg-[#F3F3F1] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-[#F9A51B]"
                    style={{ width: `${cohort.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Grade Distribution Bar Chart */}
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-[#DBDBD9]/50 mb-3">
              <h2 className="font-semibold text-sm text-[#131313]">Grade Distribution</h2>
              <span className="text-[11px] text-[#62676B]">Official Assessment Marks</span>
            </div>

            <div className="space-y-3 pt-2 text-xs">
              {Object.entries(gradeCounts).map(([grade, count]) => {
                const totalEvaluated = 64;
                const percentage = Math.round((count / totalEvaluated) * 100);

                return (
                  <div key={grade} className="flex items-center gap-3">
                    <span className="w-10 font-bold text-xs text-[#131313]">{grade}</span>
                    <div className="flex-1 h-3 bg-[#F3F3F1] rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-[#FAC95A]"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-xs font-semibold text-[#131313] tabular-nums w-12 text-right">
                      {count} ({percentage}%)
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-3 border-t border-[#DBDBD9]/60 text-xs text-[#62676B] flex items-center justify-between">
            <span>Grading scale: 90%+ A+, 80%+ A, 70%+ B, 60%+ C</span>
            <span className="text-[#23845B] font-semibold">Healthy Bell Distribution</span>
          </div>
        </div>
      </div>
    </div>
  );
};
