import React, { useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Student } from '../../types';
import {
  GraduationCap,
  Search,
  Filter,
  Plus,
  Eye,
  Edit2,
  Trash2,
  X,
  CheckCircle,
  Phone,
  Mail,
  Calendar,
  AlertTriangle,
} from 'lucide-react';

export const StudentsPage: React.FC = () => {
  const { students, classes, addStudent, updateStudent, deleteStudent } = useData();
  const { currentUser } = useAuth();
  const location = useLocation();

  const isFacultyOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'teacher';
  const isAdmin = currentUser?.role === 'admin';

  // Search & Filter state
  const [search, setSearch] = useState('');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  // Modal states
  const [isAddModalOpen, setIsAddModalOpen] = useState(() => {
    return new URLSearchParams(location.search).get('action') === 'new' && isFacultyOrAdmin;
  });
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formStudentNumber, setFormStudentNumber] = useState('');
  const [formClassId, setFormClassId] = useState(classes[0]?.id || 'cls-cse-1');
  const [formParentName, setFormParentName] = useState('');
  const [formParentPhone, setFormParentPhone] = useState('');
  const [formStatus, setFormStatus] = useState<'Active' | 'On Leave' | 'Graduated'>('Active');
  const [formError, setFormError] = useState<string | null>(null);

  // Filtered students
  const filteredStudents = useMemo(() => {
    return students.filter((s) => {
      const matchSearch =
        s.fullName.toLowerCase().includes(search.toLowerCase()) ||
        s.studentNumber.toLowerCase().includes(search.toLowerCase()) ||
        s.email.toLowerCase().includes(search.toLowerCase());

      const matchClass = selectedClass === 'all' || s.classId === selectedClass;
      const matchStatus = selectedStatus === 'all' || s.enrollmentStatus === selectedStatus;

      return matchSearch && matchClass && matchStatus;
    });
  }, [students, search, selectedClass, selectedStatus]);

  const handleOpenAdd = () => {
    setEditingStudent(null);
    setFormName('');
    setFormEmail('');
    setFormStudentNumber(`STU-2026-${Math.floor(100 + Math.random() * 900)}`);
    setFormClassId(classes[0]?.id || 'cls-cse-1');
    setFormParentName('');
    setFormParentPhone('');
    setFormStatus('Active');
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (student: Student) => {
    setEditingStudent(student);
    setFormName(student.fullName);
    setFormEmail(student.email);
    setFormStudentNumber(student.studentNumber);
    setFormClassId(student.classId);
    setFormParentName(student.parentName || '');
    setFormParentPhone(student.parentPhone || '');
    setFormStatus(student.enrollmentStatus);
    setFormError(null);
    setIsAddModalOpen(true);
  };

  const handleSaveStudent = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!formName.trim() || !formEmail.trim() || !formStudentNumber.trim()) {
      setFormError('Name, email, and student number are required.');
      return;
    }

    const matchedClass = classes.find((c) => c.id === formClassId);
    const className = matchedClass ? matchedClass.name : 'B.Tech 1st Year (CSE)';

    if (editingStudent) {
      updateStudent(editingStudent.id, {
        fullName: formName.trim(),
        email: formEmail.trim(),
        studentNumber: formStudentNumber.trim(),
        classId: formClassId,
        className,
        parentName: formParentName.trim(),
        parentPhone: formParentPhone.trim(),
        enrollmentStatus: formStatus,
      });
    } else {
      addStudent({
        userId: `usr-${Date.now()}`,
        fullName: formName.trim(),
        email: formEmail.trim(),
        studentNumber: formStudentNumber.trim(),
        classId: formClassId,
        className,
        parentName: formParentName.trim(),
        parentPhone: formParentPhone.trim(),
        enrollmentStatus: formStatus,
        attendanceRate: 95,
      });
    }

    setIsAddModalOpen(false);
  };

  const confirmDelete = (id: string) => {
    deleteStudent(id);
    setDeletingId(null);
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Student Directory
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Manage student registrations, academic rosters, and cohort allocations.
          </p>
        </div>

        {isFacultyOrAdmin && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Student</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by student name, roll number, or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:bg-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-xs text-[#62676B]">
            <Filter className="w-3.5 h-3.5 text-[#F9A51B]" />
            <span>Class:</span>
          </div>
          <select
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
            className="px-3 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] focus:outline-hidden focus:border-[#F9A51B]"
          >
            <option value="all">All Classes</option>
            {classes.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="px-3 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] focus:outline-hidden focus:border-[#F9A51B]"
          >
            <option value="all">All Statuses</option>
            <option value="Active">Active</option>
            <option value="On Leave">On Leave</option>
            <option value="Graduated">Graduated</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#DBDBD9] bg-[#F9F9F8] text-[#919A9F] font-medium">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">Roll Number</th>
                <th className="py-3 px-4">Enrolled Class</th>
                <th className="py-3 px-4">Attendance</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DBDBD9]/50">
              {filteredStudents.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-[#919A9F]">
                    No student records matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredStudents.map((s) => (
                  <tr key={s.id} className="hover:bg-[#F9F9F8] transition-colors">
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-[#FFF2D7] text-[#F9A51B] border border-[#FAC95A] flex items-center justify-center font-bold text-xs shrink-0">
                          {s.fullName
                            .split(' ')
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join('')}
                        </div>
                        <div>
                          <p className="font-semibold text-[#131313] hover:text-[#F9A51B] cursor-pointer" onClick={() => setViewingStudent(s)}>
                            {s.fullName}
                          </p>
                          <p className="text-[11px] text-[#62676B]">{s.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-mono font-medium text-[#131313]">
                      {s.studentNumber}
                    </td>
                    <td className="py-3.5 px-4 text-[#131313]">
                      {s.className}
                    </td>
                    <td className="py-3.5 px-4">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-[#F3F3F1] rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#F9A51B]"
                            style={{ width: `${s.attendanceRate}%` }}
                          />
                        </div>
                        <span className="font-semibold text-[#131313] tabular-nums">
                          {s.attendanceRate}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3.5 px-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium ${
                          s.enrollmentStatus === 'Active'
                            ? 'bg-[#E6F4EC] text-[#23845B]'
                            : s.enrollmentStatus === 'On Leave'
                            ? 'bg-[#FFF3D6] text-[#A66A00]'
                            : 'bg-[#F3F3F1] text-[#62676B]'
                        }`}
                      >
                        {s.enrollmentStatus}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          onClick={() => setViewingStudent(s)}
                          className="p-1.5 rounded-md text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1] transition-colors cursor-pointer"
                          title="View Profile"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        {isFacultyOrAdmin && (
                          <button
                            onClick={() => handleOpenEdit(s)}
                            className="p-1.5 rounded-md text-[#62676B] hover:text-[#F9A51B] hover:bg-[#FFF2D7] transition-colors cursor-pointer"
                            title="Edit Record"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                        )}
                        {isAdmin && (
                          <button
                            onClick={() => setDeletingId(s.id)}
                            className="p-1.5 rounded-md text-[#62676B] hover:text-[#C44940] hover:bg-[#FCEBE9] transition-colors cursor-pointer"
                            title="Delete Record"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <h3 className="font-bold text-base text-[#131313]">
                {editingStudent ? 'Edit Student Details' : 'Add New Student Record'}
              </h3>
              <button
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-md text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="mt-4 p-3 rounded-lg bg-[#FCEBE9] text-[#C44940] text-xs">
                {formError}
              </div>
            )}

            <form onSubmit={handleSaveStudent} className="space-y-4 mt-4 text-xs">
              <div>
                <label className="block font-medium text-[#131313] mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Varshith Reddy"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="student@institution.edu"
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Roll / Student Number *</label>
                  <input
                    type="text"
                    required
                    value={formStudentNumber}
                    onChange={(e) => setFormStudentNumber(e.target.value)}
                    placeholder="STU-2026-084"
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Cohort / Class *</label>
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
                  <label className="block font-medium text-[#131313] mb-1">Enrollment Status</label>
                  <select
                    value={formStatus}
                    onChange={(e) => setFormStatus(e.target.value as any)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  >
                    <option value="Active">Active</option>
                    <option value="On Leave">On Leave</option>
                    <option value="Graduated">Graduated</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Parent / Guardian Name</label>
                  <input
                    type="text"
                    value={formParentName}
                    onChange={(e) => setFormParentName(e.target.value)}
                    placeholder="Parent Name"
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Parent Contact Phone</label>
                  <input
                    type="text"
                    value={formParentPhone}
                    onChange={(e) => setFormParentPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#DBDBD9]">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  {editingStudent ? 'Save Changes' : 'Create Record'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Profile Drawer / Modal */}
      {viewingStudent && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-md w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <span className="text-xs font-semibold text-[#919A9F] uppercase tracking-wider">
                Student Profile Record
              </span>
              <button
                onClick={() => setViewingStudent(null)}
                className="p-1 rounded-md text-[#62676B] hover:text-[#131313] hover:bg-[#F3F3F1] cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="py-4 text-center">
              <div className="w-16 h-16 rounded-full bg-[#FFF2D7] text-[#F9A51B] border-2 border-[#FAC95A] flex items-center justify-center text-xl font-bold mx-auto mb-3">
                {viewingStudent.fullName
                  .split(' ')
                  .map((n) => n[0])
                  .slice(0, 2)
                  .join('')}
              </div>
              <h3 className="font-bold text-lg text-[#131313]">{viewingStudent.fullName}</h3>
              <p className="text-xs text-[#62676B] font-mono mt-0.5">{viewingStudent.studentNumber}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-[#E6F4EC] text-[#23845B]">
                {viewingStudent.enrollmentStatus}
              </span>
            </div>

            <div className="space-y-3 bg-[#F9F9F8] p-4 rounded-xl border border-[#DBDBD9] text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[#62676B] flex items-center gap-1.5">
                  <GraduationCap className="w-3.5 h-3.5 text-[#F9A51B]" /> Class / Cohort
                </span>
                <strong className="text-[#131313]">{viewingStudent.className}</strong>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#62676B] flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#F9A51B]" /> Email Address
                </span>
                <span className="text-[#131313]">{viewingStudent.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#62676B] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#F9A51B]" /> Enrolled Date
                </span>
                <span className="text-[#131313]">{viewingStudent.enrolledAt}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[#62676B] flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[#F9A51B]" /> Parent Contact
                </span>
                <span className="text-[#131313]">
                  {viewingStudent.parentName || 'Not recorded'} ({viewingStudent.parentPhone || 'N/A'})
                </span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#DBDBD9]/60">
                <span className="text-[#62676B]">Attendance Rate</span>
                <strong className="text-[#F9A51B] tabular-nums font-bold">
                  {viewingStudent.attendanceRate}%
                </strong>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#DBDBD9] flex justify-end">
              <button
                onClick={() => setViewingStudent(null)}
                className="px-4 py-2 bg-[#F9A51B] text-white rounded-lg text-xs font-semibold hover:bg-[#E58E08] cursor-pointer"
              >
                Close Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      {deletingId && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-sm w-full p-6 shadow-xl text-center">
            <div className="w-12 h-12 rounded-full bg-[#FCEBE9] text-[#C44940] flex items-center justify-center mx-auto mb-3">
              <AlertTriangle className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-base text-[#131313] mb-1">Remove Student?</h3>
            <p className="text-xs text-[#62676B] mb-5">
              Are you sure you want to delete this student record? This action will remove associated attendance and assessment records.
            </p>
            <div className="flex items-center justify-center gap-3">
              <button
                onClick={() => setDeletingId(null)}
                className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-xs font-medium text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={() => confirmDelete(deletingId)}
                className="px-4 py-2 bg-[#C44940] hover:bg-red-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Confirm Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
