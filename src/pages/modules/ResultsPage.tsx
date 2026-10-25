import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import {
  Award,
  CheckCircle2,
  XCircle,
  Search,
  Filter,
  Printer,
  Sparkles,
  TrendingUp,
} from 'lucide-react';

export const ResultsPage: React.FC = () => {
  const { results, examinations } = useData();
  const { currentUser } = useAuth();

  const isStudent = currentUser?.role === 'student';
  const [selectedExamId, setSelectedExamId] = useState<string>('all');
  const [search, setSearch] = useState('');

  // Enforce privacy rule: student only sees their own published results!
  const filteredResults = results.filter((r) => {
    if (isStudent && r.studentId !== currentUser?.id) {
      return false;
    }

    const matchExam = selectedExamId === 'all' || r.examinationId === selectedExamId;
    const matchSearch =
      r.studentName.toLowerCase().includes(search.toLowerCase()) ||
      r.studentNumber.toLowerCase().includes(search.toLowerCase()) ||
      r.examTitle.toLowerCase().includes(search.toLowerCase());

    return matchExam && matchSearch;
  });

  const totalResults = filteredResults.length;
  const passCount = filteredResults.filter((r) => r.status === 'Pass').length;
  const averagePercentage =
    totalResults > 0
      ? Math.round(
          filteredResults.reduce((acc, curr) => acc + curr.percentage, 0) / totalResults
        )
      : 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            {isStudent ? 'My Academic Results' : 'Examinations & Results Ledger'}
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            {isStudent
              ? 'Official published grades, percentages, and semester transcripts.'
              : 'Institutional examination results and cohort performance analytics.'}
          </p>
        </div>

        <button
          onClick={() => window.print()}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium transition-colors cursor-pointer self-start sm:self-auto"
        >
          <Printer className="w-3.5 h-3.5 text-[#F9A51B]" />
          <span>Print Scorecard</span>
        </button>
      </div>

      {/* Performance Summary Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <span className="text-xs font-medium text-[#62676B]">Recorded Grades</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#131313] tabular-nums">{totalResults}</span>
          </div>
          <span className="text-[11px] text-[#62676B] mt-1 block">Verified scorecards</span>
        </div>

        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <span className="text-xs font-medium text-[#62676B]">Average Percentage</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#F9A51B] tabular-nums">{averagePercentage}%</span>
          </div>
          <span className="text-[11px] text-[#23845B] font-medium flex items-center gap-1 mt-1">
            <TrendingUp className="w-3.5 h-3.5" /> First Class Distinction
          </span>
        </div>

        <div className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs">
          <span className="text-xs font-medium text-[#62676B]">Passing Clearance</span>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-[#23845B] tabular-nums">
              {totalResults > 0 ? Math.round((passCount / totalResults) * 100) : 100}%
            </span>
          </div>
          <span className="text-[11px] text-[#62676B] mt-1 block">
            {passCount} of {totalResults} assessments passed
          </span>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student, roll number, or assessment..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-3.5 h-3.5 text-[#F9A51B]" />
          <select
            value={selectedExamId}
            onChange={(e) => setSelectedExamId(e.target.value)}
            className="px-3 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] focus:outline-hidden focus:border-[#F9A51B]"
          >
            <option value="all">All Examinations</option>
            {examinations.map((ex) => (
              <option key={ex.id} value={ex.id}>
                {ex.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Table */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DBDBD9] bg-[#F9F9F8] text-[#919A9F] font-medium">
                <th className="py-3 px-4">Examination</th>
                <th className="py-3 px-4">Subject</th>
                {!isStudent && <th className="py-3 px-4">Student</th>}
                <th className="py-3 px-4">Marks Obtained</th>
                <th className="py-3 px-4">Percentage</th>
                <th className="py-3 px-4">Letter Grade</th>
                <th className="py-3 px-4 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DBDBD9]/50">
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-[#919A9F]">
                    No exam results published for the selected filter.
                  </td>
                </tr>
              ) : (
                filteredResults.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F9F9F8] transition-colors">
                    <td className="py-3.5 px-4 font-semibold text-[#131313]">
                      {r.examTitle}
                    </td>
                    <td className="py-3.5 px-4 text-[#62676B]">
                      {r.courseName}
                    </td>
                    {!isStudent && (
                      <td className="py-3.5 px-4">
                        <div className="font-medium text-[#131313]">{r.studentName}</div>
                        <div className="text-[11px] text-[#62676B] font-mono">{r.studentNumber}</div>
                      </td>
                    )}
                    <td className="py-3.5 px-4 font-mono font-medium text-[#131313] tabular-nums">
                      {r.marksObtained} / {r.maximumMarks}
                    </td>
                    <td className="py-3.5 px-4 tabular-nums font-semibold text-[#131313]">
                      {r.percentage}%
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full font-bold text-xs ${
                          r.grade === 'A+' || r.grade === 'A'
                            ? 'bg-[#E6F4EC] text-[#23845B]'
                            : r.grade === 'B' || r.grade === 'C'
                            ? 'bg-[#FFF2D7] text-[#131313]'
                            : 'bg-[#FCEBE9] text-[#C44940]'
                        }`}
                      >
                        {r.grade}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <span
                        className={`inline-flex items-center gap-1 font-semibold text-xs ${
                          r.status === 'Pass' ? 'text-[#23845B]' : 'text-[#C44940]'
                        }`}
                      >
                        {r.status === 'Pass' ? (
                          <CheckCircle2 className="w-3.5 h-3.5" />
                        ) : (
                          <XCircle className="w-3.5 h-3.5" />
                        )}
                        <span>{r.status}</span>
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
