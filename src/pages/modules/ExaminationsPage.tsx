import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Examination } from '../../types';
import {
  Award,
  Plus,
  Calendar,
  Layers,
  CheckCircle2,
  Clock,
  BookOpen,
  Edit3,
  X,
  FileCheck,
  ArrowRight,
} from 'lucide-react';

export const ExaminationsPage: React.FC = () => {
  const { examinations, courses, classes, students, addExamination, saveExamMarks } = useData();
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const isFacultyOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'teacher';

  const [isAddOpen, setIsAddOpen] = useState(false);
  const [markingExam, setMarkingExam] = useState<Examination | null>(null);

  // Form State for creating examination
  const [formTitle, setFormTitle] = useState('');
  const [formType, setFormType] = useState<'Mid-Term' | 'Semester Final' | 'Class Test' | 'Practical'>('Mid-Term');
  const [formCourseId, setFormCourseId] = useState(courses[0]?.id || 'crs-web-101');
  const [formClassId, setFormClassId] = useState(classes[0]?.id || 'cls-cse-1');
  const [formDate, setFormDate] = useState('2026-11-15');
  const [formMaxMarks, setFormMaxMarks] = useState(100);
  const [formPassMarks, setFormPassMarks] = useState(40);

  // Enter marks state: { [studentId]: marksObtained }
  const [marksMap, setMarksMap] = useState<Record<string, number>>({});
  const [marksSuccess, setMarksSuccess] = useState<string | null>(null);

  const handleCreateExam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim()) return;

    const course = courses.find((c) => c.id === formCourseId);
    const cls = classes.find((c) => c.id === formClassId);

    addExamination({
      title: formTitle.trim(),
      examType: formType,
      courseId: formCourseId,
      courseName: course?.title || 'Web Technologies',
      classId: formClassId,
      className: cls?.name || 'B.Tech 1st Year (CSE)',
      examDate: formDate,
      maximumMarks: Number(formMaxMarks),
      passingMarks: Number(formPassMarks),
      status: 'Scheduled',
    });

    setIsAddOpen(false);
  };

  const handleOpenMarksDialog = (exam: Examination) => {
    setMarkingExam(exam);
    // Pre-populate marks with default realistic values if not set
    const classStudents = students.filter((s) => s.classId === exam.classId);
    const initialMarks: Record<string, number> = {};
    classStudents.forEach((s) => {
      // Default to 80% mark
      initialMarks[s.id] = Math.round(exam.maximumMarks * 0.82);
    });
    setMarksMap(initialMarks);
    setMarksSuccess(null);
  };

  const handleSaveAllMarks = () => {
    if (!markingExam) return;

    const classStudents = students.filter((s) => s.classId === markingExam.classId);
    const marksList = classStudents.map((s) => ({
      studentId: s.id,
      marksObtained: marksMap[s.id] ?? Math.round(markingExam.maximumMarks * 0.75),
    }));

    saveExamMarks(markingExam.id, marksList);
    setMarksSuccess(`Marks saved and published for ${markingExam.title}!`);
    setTimeout(() => {
      setMarkingExam(null);
      setMarksSuccess(null);
      navigate('/app/results');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Examinations & Assessments
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Institutional exam schedules, hall allocations, and official grading criteria.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {isFacultyOrAdmin && (
            <button
              onClick={() => setIsAddOpen(true)}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Schedule Examination</span>
            </button>
          )}

          <button
            onClick={() => navigate('/app/results')}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] text-xs font-medium transition-colors cursor-pointer"
          >
            <FileCheck className="w-3.5 h-3.5 text-[#23845B]" />
            <span>View Published Results</span>
          </button>
        </div>
      </div>

      {/* Grid of Exams */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {examinations.map((exam) => (
          <div
            key={exam.id}
            className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-semibold text-[#131313] bg-[#FFF2D7] px-2.5 py-0.5 rounded-full border border-[#FAC95A]/60">
                  {exam.examType}
                </span>

                <span
                  className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    exam.status === 'Published'
                      ? 'bg-[#E6F4EC] text-[#23845B]'
                      : 'bg-[#FFF3D6] text-[#A66A00]'
                  }`}
                >
                  {exam.status}
                </span>
              </div>

              <h3 className="font-bold text-base text-[#131313] mt-2.5 leading-snug">
                {exam.title}
              </h3>
              <p className="text-xs text-[#62676B] mt-1">{exam.courseName}</p>

              <div className="mt-4 pt-3 border-t border-[#DBDBD9]/50 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#62676B]">
                  <span className="flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-[#F9A51B]" /> Cohort:
                  </span>
                  <strong className="text-[#131313]">{exam.className}</strong>
                </div>

                <div className="flex items-center justify-between text-[#62676B]">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#F9A51B]" /> Exam Date:
                  </span>
                  <strong className="text-[#131313]">{exam.examDate}</strong>
                </div>

                <div className="flex items-center justify-between text-[#62676B]">
                  <span>Max / Pass Marks:</span>
                  <span className="text-[#131313] font-medium tabular-nums">
                    {exam.maximumMarks} / {exam.passingMarks}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-[#DBDBD9]/50 flex items-center justify-between">
              {isFacultyOrAdmin ? (
                <button
                  onClick={() => handleOpenMarksDialog(exam)}
                  className="w-full py-2 px-3 rounded-lg bg-[#FFF2D7] hover:bg-[#F9A51B] text-[#131313] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>
                    {exam.status === 'Published' ? 'Update Marks' : 'Enter & Publish Marks'}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => navigate('/app/results')}
                  className="w-full py-2 px-3 rounded-lg bg-[#FFF2D7] hover:bg-[#F9A51B] text-[#131313] hover:text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>View Grade Scorecard</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Schedule Exam Modal */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <h3 className="font-bold text-base text-[#131313]">Schedule Examination</h3>
              <button
                onClick={() => setIsAddOpen(false)}
                className="p-1 rounded-md text-[#62676B] hover:text-[#131313] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateExam} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-medium text-[#131313] mb-1">Exam Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Mid-Term 1: Web Technologies"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Assessment Type</label>
                  <select
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  >
                    <option value="Mid-Term">Mid-Term</option>
                    <option value="Semester Final">Semester Final</option>
                    <option value="Class Test">Class Test</option>
                    <option value="Practical">Practical</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Subject Course</label>
                  <select
                    value={formCourseId}
                    onChange={(e) => setFormCourseId(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  >
                    {courses.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.title}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Class</label>
                  <select
                    value={formClassId}
                    onChange={(e) => setFormClassId(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  >
                    {classes.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Exam Date</label>
                  <input
                    type="date"
                    required
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Max Marks</label>
                  <input
                    type="number"
                    min="20"
                    max="100"
                    value={formMaxMarks}
                    onChange={(e) => setFormMaxMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DBDBD9]">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Publish Schedule
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Enter Marks Dialog for Faculty */}
      {markingExam && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-2xl w-full p-6 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <div>
                <h3 className="font-bold text-base text-[#131313]">
                  Enter Marks: {markingExam.title}
                </h3>
                <span className="text-xs text-[#62676B]">
                  Max: {markingExam.maximumMarks} | Pass: {markingExam.passingMarks} | {markingExam.className}
                </span>
              </div>
              <button
                onClick={() => setMarkingExam(null)}
                className="p-1 rounded-md text-[#62676B] hover:text-[#131313] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {marksSuccess ? (
              <div className="py-8 text-center text-xs">
                <CheckCircle2 className="w-8 h-8 text-[#23845B] mx-auto mb-2" />
                <p className="font-semibold text-sm text-[#131313]">{marksSuccess}</p>
              </div>
            ) : (
              <div className="mt-4 space-y-4">
                <table className="w-full text-left text-xs">
                  <thead>
                    <tr className="border-b border-[#DBDBD9] bg-[#F9F9F8] text-[#919A9F]">
                      <th className="py-2.5 px-3">Student</th>
                      <th className="py-2.5 px-3">Roll No.</th>
                      <th className="py-2.5 px-3">Marks (out of {markingExam.maximumMarks})</th>
                      <th className="py-2.5 px-3 text-center">Grade</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#DBDBD9]/50">
                    {students
                      .filter((s) => s.classId === markingExam.classId)
                      .map((stu) => {
                        const curMark = marksMap[stu.id] ?? 80;
                        const pct = Math.round((curMark / markingExam.maximumMarks) * 100);
                        const grade = pct >= 90 ? 'A+' : pct >= 80 ? 'A' : pct >= 70 ? 'B' : pct >= 60 ? 'C' : 'F';

                        return (
                          <tr key={stu.id} className="hover:bg-[#F9F9F8]">
                            <td className="py-2.5 px-3 font-semibold text-[#131313]">
                              {stu.fullName}
                            </td>
                            <td className="py-2.5 px-3 font-mono text-[#62676B]">
                              {stu.studentNumber}
                            </td>
                            <td className="py-2.5 px-3">
                              <input
                                type="number"
                                min={0}
                                max={markingExam.maximumMarks}
                                value={curMark}
                                onChange={(e) =>
                                  setMarksMap((prev) => ({
                                    ...prev,
                                    [stu.id]: Number(e.target.value),
                                  }))
                                }
                                className="w-24 px-2.5 py-1 text-xs border border-[#DBDBD9] rounded-md focus:border-[#F9A51B]"
                              />
                            </td>
                            <td className="py-2.5 px-3 text-center font-bold text-xs">
                              <span
                                className={`px-2 py-0.5 rounded-full ${
                                  grade === 'A+' || grade === 'A'
                                    ? 'bg-[#E6F4EC] text-[#23845B]'
                                    : 'bg-[#FFF2D7] text-[#131313]'
                                }`}
                              >
                                {grade} ({pct}%)
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                  </tbody>
                </table>

                <div className="flex items-center justify-between pt-4 border-t border-[#DBDBD9]">
                  <span className="text-[11px] text-[#62676B]">
                    Saving computes official letter grades and updates student transcript cards.
                  </span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMarkingExam(null)}
                      className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-xs font-medium text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleSaveAllMarks}
                      className="px-4 py-2 bg-[#23845B] hover:bg-emerald-700 text-white font-semibold rounded-lg text-xs shadow-xs cursor-pointer"
                    >
                      Publish Exam Results
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
