import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Assignment, StudentSubmission } from '../../types';
import {
  ClipboardList,
  Plus,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  Upload,
  Award,
  X,
  Filter,
  AlertCircle,
} from 'lucide-react';

export const AssignmentsPage: React.FC = () => {
  const { assignments, courses, classes, addAssignment, submitAssignment, gradeAssignmentSubmission } = useData();
  const { currentUser } = useAuth();
  const location = useLocation();

  const isFacultyOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'teacher';
  const isStudent = currentUser?.role === 'student';

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(() => {
    return new URLSearchParams(location.search).get('action') === 'new' && isFacultyOrAdmin;
  });
  const [submittingAssignment, setSubmittingAssignment] = useState<Assignment | null>(null);
  const [reviewingAssignment, setReviewingAssignment] = useState<Assignment | null>(null);

  // Form State for creating assignment
  const [formTitle, setFormTitle] = useState('');
  const [formCourseId, setFormCourseId] = useState(courses[0]?.id || 'crs-web-101');
  const [formClassId, setFormClassId] = useState(classes[0]?.id || 'cls-cse-1');
  const [formInstructions, setFormInstructions] = useState('');
  const [formDueDate, setFormDueDate] = useState('2026-11-05');
  const [formTotalMarks, setFormTotalMarks] = useState(25);
  const [formError, setFormError] = useState<string | null>(null);

  // Student submission form
  const [submissionContent, setSubmissionContent] = useState('');
  const [submissionFeedbackMsg, setSubmissionFeedbackMsg] = useState<string | null>(null);

  // Grading form
  const [gradingMarks, setGradingMarks] = useState<Record<string, number>>({});
  const [gradingFeedback, setGradingFeedback] = useState<Record<string, string>>({});

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formInstructions.trim()) {
      setFormError('Please fill in title and instructions.');
      return;
    }

    const course = courses.find((c) => c.id === formCourseId);
    const cls = classes.find((c) => c.id === formClassId);

    addAssignment({
      title: formTitle.trim(),
      courseId: formCourseId,
      courseName: course?.title || 'Web Technologies',
      classId: formClassId,
      className: cls?.name || 'B.Tech 1st Year (CSE)',
      teacherId: currentUser?.id || 'usr-teacher-1',
      teacherName: currentUser?.fullName || 'Prof. Rajesh Sharma',
      instructions: formInstructions.trim(),
      dueDate: formDueDate,
      totalMarks: Number(formTotalMarks),
      status: 'Published',
    });

    setIsCreateOpen(false);
  };

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!submittingAssignment || !submissionContent.trim()) return;

    submitAssignment(submittingAssignment.id, {
      studentId: currentUser?.id || 'usr-student-1',
      studentName: currentUser?.fullName || 'Varshith Reddy',
      submittedAt: new Date().toISOString(),
      status: 'submitted',
      contentOrFile: submissionContent.trim(),
    });

    setSubmissionFeedbackMsg('Your work has been submitted successfully for evaluation.');
    setTimeout(() => {
      setSubmittingAssignment(null);
      setSubmissionFeedbackMsg(null);
      setSubmissionContent('');
    }, 2000);
  };

  const handleSaveGrade = (assignmentId: string, studentId: string) => {
    const marks = gradingMarks[studentId] ?? 20;
    const feedback = gradingFeedback[studentId] ?? 'Good work on solution.';
    gradeAssignmentSubmission(assignmentId, studentId, marks, feedback);
    alert('Grade and feedback saved.');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Assignments & Coursework
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Publish assessment prompts, track submission deadlines, and evaluate student work.
          </p>
        </div>

        {isFacultyOrAdmin && (
          <button
            onClick={() => {
              setFormTitle('');
              setFormInstructions('');
              setIsCreateOpen(true);
            }}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Assignment</span>
          </button>
        )}
      </div>

      {/* Grid of Assignments */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {assignments.map((asg) => {
          const mySubmission = asg.submissions.find((s) => s.studentId === currentUser?.id);
          const hasSubmitted = !!mySubmission;

          return (
            <div
              key={asg.id}
              className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <span className="text-[11px] font-semibold text-[#F9A51B] bg-[#FFF2D7] px-2.5 py-0.5 rounded-full border border-[#FAC95A]/50">
                    {asg.courseName}
                  </span>
                  <span className="text-xs font-semibold text-[#131313] tabular-nums">
                    {asg.totalMarks} Marks
                  </span>
                </div>

                <h3 className="font-bold text-base text-[#131313] mt-2.5 leading-snug">
                  {asg.title}
                </h3>
                <p className="text-xs text-[#62676B] mt-1.5 line-clamp-3 leading-relaxed">
                  {asg.instructions}
                </p>

                <div className="mt-4 pt-3 border-t border-[#DBDBD9]/50 space-y-2 text-xs">
                  <div className="flex items-center justify-between text-[#62676B]">
                    <span>Cohort:</span>
                    <strong className="text-[#131313]">{asg.className}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#62676B]">
                    <span className="flex items-center gap-1 text-[#C44940] font-medium">
                      <Clock className="w-3.5 h-3.5" /> Due Date:
                    </span>
                    <strong className="text-[#131313]">{asg.dueDate}</strong>
                  </div>
                  <div className="flex items-center justify-between text-[#62676B]">
                    <span>Instructor:</span>
                    <span className="text-[#131313]">{asg.teacherName}</span>
                  </div>
                </div>
              </div>

              {/* Action Buttons based on role */}
              <div className="mt-5 pt-3 border-t border-[#DBDBD9]/50">
                {isStudent && (
                  <div className="flex items-center justify-between">
                    {hasSubmitted ? (
                      <span className="inline-flex items-center gap-1.5 text-xs text-[#23845B] font-semibold">
                        <CheckCircle2 className="w-4 h-4" />
                        Submitted ({mySubmission.status})
                      </span>
                    ) : (
                      <button
                        onClick={() => setSubmittingAssignment(asg)}
                        className="w-full py-2 px-3 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Upload className="w-3.5 h-3.5" />
                        <span>Submit Solution</span>
                      </button>
                    )}
                  </div>
                )}

                {isFacultyOrAdmin && (
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-[#62676B]">
                      <strong className="text-[#131313]">{asg.submissions.length}</strong> Submissions
                    </span>
                    <button
                      onClick={() => setReviewingAssignment(asg)}
                      className="px-3 py-1.5 rounded-lg bg-[#FFF2D7] text-[#131313] hover:bg-[#F9A51B] hover:text-white font-medium text-xs transition-colors cursor-pointer"
                    >
                      Review & Grade
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Create Assignment Modal */}
      {isCreateOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <h3 className="font-bold text-base text-[#131313]">Create New Assignment</h3>
              <button
                onClick={() => setIsCreateOpen(false)}
                className="p-1 rounded-md text-[#62676B] hover:text-[#131313] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 rounded-lg bg-[#FCEBE9] text-[#C44940] text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleCreateAssignment} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-medium text-[#131313] mb-1">Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Lab 4: Relational Database Normalization"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Course</label>
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
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Class Cohort</label>
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
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Submission Deadline</label>
                  <input
                    type="date"
                    required
                    value={formDueDate}
                    onChange={(e) => setFormDueDate(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Total Marks</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    value={formTotalMarks}
                    onChange={(e) => setFormTotalMarks(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#131313] mb-1">Instructions & Rubric *</label>
                <textarea
                  rows={3}
                  required
                  value={formInstructions}
                  onChange={(e) => setFormInstructions(e.target.value)}
                  placeholder="Outline questions, code requirements, or submission format..."
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DBDBD9]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Publish Assignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Student Submit Modal */}
      {submittingAssignment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <h3 className="font-bold text-base text-[#131313]">
                Submit Coursework Solution
              </h3>
              <button
                onClick={() => setSubmittingAssignment(null)}
                className="p-1 rounded-md text-[#62676B] hover:text-[#131313] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {submissionFeedbackMsg ? (
              <div className="py-6 text-center text-xs">
                <CheckCircle2 className="w-8 h-8 text-[#23845B] mx-auto mb-2" />
                <p className="font-semibold text-sm text-[#131313]">{submissionFeedbackMsg}</p>
              </div>
            ) : (
              <form onSubmit={handleStudentSubmit} className="space-y-4 mt-4 text-xs">
                <div>
                  <span className="text-[11px] font-semibold text-[#F9A51B] block">
                    {submittingAssignment.courseName}
                  </span>
                  <p className="font-bold text-sm text-[#131313] mt-0.5">
                    {submittingAssignment.title}
                  </p>
                  <p className="text-[#62676B] text-[11px] mt-1 bg-[#F9F9F8] p-2.5 rounded-lg border border-[#DBDBD9]">
                    {submittingAssignment.instructions}
                  </p>
                </div>

                <div>
                  <label className="block font-medium text-[#131313] mb-1">
                    Solution File or Repository URL *
                  </label>
                  <input
                    type="text"
                    required
                    value={submissionContent}
                    onChange={(e) => setSubmissionContent(e.target.value)}
                    placeholder="e.g. database_schema_solution.sql or github.com/user/project"
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-3 border-t border-[#DBDBD9]">
                  <button
                    type="button"
                    onClick={() => setSubmittingAssignment(null)}
                    className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                  >
                    Confirm Submission
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Review & Grade Modal for Faculty */}
      {reviewingAssignment && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-2xl w-full p-6 shadow-xl max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <div>
                <h3 className="font-bold text-base text-[#131313]">
                  Submissions: {reviewingAssignment.title}
                </h3>
                <span className="text-xs text-[#62676B]">
                  Max Marks: {reviewingAssignment.totalMarks} • {reviewingAssignment.className}
                </span>
              </div>
              <button
                onClick={() => setReviewingAssignment(null)}
                className="p-1 rounded-md text-[#62676B] hover:text-[#131313] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-4 space-y-4 text-xs">
              {reviewingAssignment.submissions.length === 0 ? (
                <div className="py-8 text-center text-[#919A9F]">
                  No student submissions received for this assignment yet.
                </div>
              ) : (
                reviewingAssignment.submissions.map((sub) => (
                  <div key={sub.studentId} className="p-4 rounded-xl bg-[#F9F9F8] border border-[#DBDBD9] space-y-2">
                    <div className="flex items-center justify-between">
                      <strong className="text-sm font-semibold text-[#131313]">
                        {sub.studentName}
                      </strong>
                      <span className="text-[11px] text-[#919A9F]">
                        Submitted {new Date(sub.submittedAt).toLocaleString()}
                      </span>
                    </div>

                    <div className="p-2 bg-white rounded-md border border-[#DBDBD9]/60 font-mono text-[11px] text-[#131313]">
                      File: {sub.contentOrFile}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                      <div>
                        <label className="block text-[11px] font-medium text-[#131313] mb-1">
                          Marks Obtained (out of {reviewingAssignment.totalMarks})
                        </label>
                        <input
                          type="number"
                          max={reviewingAssignment.totalMarks}
                          min={0}
                          defaultValue={sub.marksObtained ?? 22}
                          onChange={(e) =>
                            setGradingMarks((prev) => ({
                              ...prev,
                              [sub.studentId]: Number(e.target.value),
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-white border border-[#DBDBD9] rounded-lg"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-medium text-[#131313] mb-1">
                          Instructor Feedback
                        </label>
                        <input
                          type="text"
                          defaultValue={sub.feedback || 'Well analyzed and executed.'}
                          onChange={(e) =>
                            setGradingFeedback((prev) => ({
                              ...prev,
                              [sub.studentId]: e.target.value,
                            }))
                          }
                          className="w-full px-3 py-1.5 bg-white border border-[#DBDBD9] rounded-lg"
                        />
                      </div>
                    </div>

                    <div className="flex justify-end pt-1">
                      <button
                        onClick={() => handleSaveGrade(reviewingAssignment.id, sub.studentId)}
                        className="px-3 py-1 rounded-md bg-[#23845B] text-white font-medium hover:bg-emerald-700 cursor-pointer text-xs"
                      >
                        Save Evaluation
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
