import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { StudentAttendanceEntry } from '../../types';
import {
  CalendarCheck,
  Calendar,
  Layers,
  CheckCircle2,
  XCircle,
  Clock,
  Save,
  Check,
  History,
  AlertCircle,
  Sparkles,
} from 'lucide-react';

export const AttendancePage: React.FC = () => {
  const { classes, students, attendanceSessions, saveAttendanceSession } = useData();
  const { currentUser } = useAuth();
  const location = useLocation();

  const isFacultyOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'teacher';

  // Query parameter pre-select
  const queryClassId = new URLSearchParams(location.search).get('classId');

  const [selectedClassId, setSelectedClassId] = useState<string>(
    queryClassId || classes[0]?.id || 'cls-cse-1'
  );
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  // Student Attendance Entries state for the selected class & date
  const [entries, setEntries] = useState<StudentAttendanceEntry[]>([]);
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'register' | 'history'>('register');

  // Load students for chosen class or load existing session if recorded
  useEffect(() => {
    // Check if a session already exists for this class & date
    const existing = attendanceSessions.find(
      (s) => s.classId === selectedClassId && s.date === selectedDate
    );

    const classStudents = students.filter((s) => s.classId === selectedClassId);

    if (existing) {
      setEntries(existing.entries);
    } else {
      // Initialize with default 'present'
      const initial: StudentAttendanceEntry[] = classStudents.map((s) => ({
        studentId: s.id,
        studentName: s.fullName,
        studentNumber: s.studentNumber,
        status: 'present',
      }));
      setEntries(initial);
    }
    setSaveSuccessMsg(null);
  }, [selectedClassId, selectedDate, attendanceSessions, students]);

  const handleStatusChange = (
    studentId: string,
    status: 'present' | 'absent' | 'late'
  ) => {
    setEntries((prev) =>
      prev.map((entry) => (entry.studentId === studentId ? { ...entry, status } : entry))
    );
  };

  const handleMarkAll = (status: 'present' | 'absent') => {
    setEntries((prev) => prev.map((e) => ({ ...e, status })));
  };

  const handleSave = () => {
    const matchedClass = classes.find((c) => c.id === selectedClassId);
    const className = matchedClass ? matchedClass.name : 'Selected Class';

    const presentCount = entries.filter((e) => e.status === 'present').length;
    const absentCount = entries.filter((e) => e.status === 'absent').length;
    const lateCount = entries.filter((e) => e.status === 'late').length;

    const res = saveAttendanceSession({
      classId: selectedClassId,
      className,
      date: selectedDate,
      markedByTeacherId: currentUser?.id || 'usr-teacher-1',
      markedByTeacherName: currentUser?.fullName || 'Faculty Member',
      presentCount,
      absentCount,
      lateCount,
      totalStudents: entries.length,
      entries,
    });

    setSaveSuccessMsg(res.message);
    setTimeout(() => setSaveSuccessMsg(null), 4000);
  };

  const presentCount = entries.filter((e) => e.status === 'present').length;
  const absentCount = entries.filter((e) => e.status === 'absent').length;
  const lateCount = entries.filter((e) => e.status === 'late').length;
  const total = entries.length;
  const rate = total > 0 ? Math.round(((presentCount + lateCount * 0.5) / total) * 100) : 100;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Attendance Register
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Record, verify, and monitor daily attendance across all academic sections.
          </p>
        </div>

        {/* Tab switch */}
        <div className="flex items-center gap-1 p-1 bg-white border border-[#DBDBD9] rounded-lg">
          <button
            onClick={() => setActiveTab('register')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'register'
                ? 'bg-[#F9A51B] text-white shadow-xs'
                : 'text-[#62676B] hover:text-[#131313]'
            }`}
          >
            Mark Register
          </button>
          <button
            onClick={() => setActiveTab('history')}
            className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
              activeTab === 'history'
                ? 'bg-[#F9A51B] text-white shadow-xs'
                : 'text-[#62676B] hover:text-[#131313]'
            }`}
          >
            Past Sessions Log
          </button>
        </div>
      </div>

      {saveSuccessMsg && (
        <div className="p-3.5 rounded-xl bg-[#E6F4EC] border border-[#23845B]/30 text-xs text-[#23845B] flex items-center justify-between shadow-xs">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span className="font-semibold">{saveSuccessMsg}</span>
          </div>
          <span className="text-[10px] text-[#23845B] uppercase font-bold">Synchronized</span>
        </div>
      )}

      {activeTab === 'register' ? (
        <div className="space-y-6">
          {/* Controls Bar: Class selector, Date picker, Quick Mark All */}
          <div className="bg-white rounded-xl border border-[#DBDBD9] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#F9A51B]" />
                <label className="text-xs font-semibold text-[#131313]">Cohort:</label>
                <select
                  value={selectedClassId}
                  onChange={(e) => setSelectedClassId(e.target.value)}
                  className="px-3 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] focus:outline-hidden focus:border-[#F9A51B] font-medium"
                >
                  {classes.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#F9A51B]" />
                <label className="text-xs font-semibold text-[#131313]">Date:</label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  className="px-3 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] focus:outline-hidden focus:border-[#F9A51B] font-medium"
                />
              </div>
            </div>

            {isFacultyOrAdmin && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => handleMarkAll('present')}
                  className="px-3 py-1.5 rounded-lg border border-[#DBDBD9] hover:bg-[#E6F4EC] hover:text-[#23845B] hover:border-[#23845B]/40 text-xs font-medium text-[#131313] transition-colors cursor-pointer"
                >
                  Mark All Present
                </button>
                <button
                  onClick={() => handleMarkAll('absent')}
                  className="px-3 py-1.5 rounded-lg border border-[#DBDBD9] hover:bg-[#FCEBE9] hover:text-[#C44940] hover:border-[#C44940]/40 text-xs font-medium text-[#131313] transition-colors cursor-pointer"
                >
                  Reset / Clear
                </button>
                <button
                  onClick={handleSave}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Attendance</span>
                </button>
              </div>
            )}
          </div>

          {/* Quick Metrics Bar for Selected Session */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-white rounded-xl border border-[#DBDBD9] shadow-2xs">
              <span className="text-[10px] text-[#62676B] block">Total Eligible</span>
              <span className="text-xl font-bold text-[#131313] tabular-nums">{total}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DBDBD9] shadow-2xs">
              <span className="text-[10px] text-[#23845B] font-semibold block">Present</span>
              <span className="text-xl font-bold text-[#23845B] tabular-nums">{presentCount}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DBDBD9] shadow-2xs">
              <span className="text-[10px] text-[#C44940] font-semibold block">Absent</span>
              <span className="text-xl font-bold text-[#C44940] tabular-nums">{absentCount}</span>
            </div>
            <div className="p-3 bg-white rounded-xl border border-[#DBDBD9] shadow-2xs">
              <span className="text-[10px] text-[#A66A00] font-semibold block">Late</span>
              <span className="text-xl font-bold text-[#A66A00] tabular-nums">{lateCount}</span>
            </div>
          </div>

          {/* Student Roster Table for Attendance */}
          <div className="bg-white rounded-xl border border-[#DBDBD9] shadow-2xs overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-[#DBDBD9] bg-[#F9F9F8] text-[#919A9F] font-medium">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Student Name</th>
                  <th className="py-3 px-4 text-center">Status</th>
                  <th className="py-3 px-4">Remarks</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DBDBD9]/50">
                {entries.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-[#919A9F]">
                      No enrolled students found for this class.
                    </td>
                  </tr>
                ) : (
                  entries.map((entry, idx) => (
                    <tr key={entry.studentId} className="hover:bg-[#F9F9F8] transition-colors">
                      <td className="py-3 px-4 text-[#919A9F] font-mono">{idx + 1}</td>
                      <td className="py-3 px-4 font-mono font-medium text-[#131313]">
                        {entry.studentNumber}
                      </td>
                      <td className="py-3 px-4 font-semibold text-[#131313]">
                        {entry.studentName}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center justify-center gap-1.5">
                          <button
                            type="button"
                            onClick={() => handleStatusChange(entry.studentId, 'present')}
                            className={`px-3 py-1 rounded-md font-medium text-[11px] transition-colors cursor-pointer ${
                              entry.status === 'present'
                                ? 'bg-[#23845B] text-white shadow-xs font-semibold'
                                : 'bg-[#F9F9F8] text-[#62676B] hover:bg-[#E6F4EC] hover:text-[#23845B] border border-[#DBDBD9]'
                            }`}
                          >
                            Present
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(entry.studentId, 'absent')}
                            className={`px-3 py-1 rounded-md font-medium text-[11px] transition-colors cursor-pointer ${
                              entry.status === 'absent'
                                ? 'bg-[#C44940] text-white shadow-xs font-semibold'
                                : 'bg-[#F9F9F8] text-[#62676B] hover:bg-[#FCEBE9] hover:text-[#C44940] border border-[#DBDBD9]'
                            }`}
                          >
                            Absent
                          </button>
                          <button
                            type="button"
                            onClick={() => handleStatusChange(entry.studentId, 'late')}
                            className={`px-3 py-1 rounded-md font-medium text-[11px] transition-colors cursor-pointer ${
                              entry.status === 'late'
                                ? 'bg-[#A66A00] text-white shadow-xs font-semibold'
                                : 'bg-[#F9F9F8] text-[#62676B] hover:bg-[#FFF3D6] hover:text-[#A66A00] border border-[#DBDBD9]'
                            }`}
                          >
                            Late
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <input
                          type="text"
                          placeholder="Optional notes (e.g. medical leave)"
                          value={entry.remarks || ''}
                          onChange={(e) => {
                            const val = e.target.value;
                            setEntries((prev) =>
                              prev.map((item) =>
                                item.studentId === entry.studentId
                                  ? { ...item, remarks: val }
                                  : item
                              )
                            );
                          }}
                          className="w-full max-w-xs px-2.5 py-1 text-[11px] bg-transparent border border-transparent hover:border-[#DBDBD9] focus:border-[#F9A51B] focus:bg-white rounded-md"
                        />
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        /* History Log Tab */
        <div className="bg-white rounded-xl border border-[#DBDBD9] shadow-2xs overflow-hidden">
          <div className="p-4 border-b border-[#DBDBD9] flex items-center justify-between">
            <h3 className="font-bold text-sm text-[#131313]">Past Attendance Registers</h3>
            <span className="text-xs text-[#62676B]">{attendanceSessions.length} total sessions recorded</span>
          </div>

          <div className="divide-y divide-[#DBDBD9]/50 text-xs">
            {attendanceSessions.map((s) => (
              <div key={s.id} className="p-4 hover:bg-[#F9F9F8] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <strong className="text-sm text-[#131313] font-semibold">{s.className}</strong>
                    <span className="px-2 py-0.5 rounded-full text-[10px] bg-[#FFF2D7] text-[#131313] font-medium border border-[#FAC95A]">
                      {s.date}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#62676B] mt-0.5">
                    Marked by: {s.markedByTeacherName} • {s.totalStudents} enrolled students
                  </p>
                </div>

                <div className="flex items-center gap-4 text-xs tabular-nums">
                  <span className="text-[#23845B] font-medium">{s.presentCount} Present</span>
                  <span className="text-[#C44940] font-medium">{s.absentCount} Absent</span>
                  <span className="text-[#A66A00] font-medium">{s.lateCount} Late</span>
                  <button
                    onClick={() => {
                      setSelectedClassId(s.classId);
                      setSelectedDate(s.date);
                      setActiveTab('register');
                    }}
                    className="px-3 py-1 rounded-md bg-[#FFF2D7] text-[#131313] hover:bg-[#F9A51B] hover:text-white font-medium transition-colors cursor-pointer"
                  >
                    Review / Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
