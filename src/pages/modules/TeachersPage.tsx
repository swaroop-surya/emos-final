import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Teacher } from '../../types';
import {
  Users,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Mail,
  Phone,
  BookOpen,
  Layers,
  Award,
} from 'lucide-react';

export const TeachersPage: React.FC = () => {
  const { teachers, classes, addTeacher, updateTeacher, deleteTeacher } = useData();
  const { currentUser } = useAuth();
  const location = useLocation();

  const isAdmin = currentUser?.role === 'admin';

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(() => {
    return new URLSearchParams(location.search).get('action') === 'new' && isAdmin;
  });
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formEmpNo, setFormEmpNo] = useState('');
  const [formDept, setFormDept] = useState('Computer Science');
  const [formDesignation, setFormDesignation] = useState('Assistant Professor');
  const [formPhone, setFormPhone] = useState('');
  const [formQualification, setFormQualification] = useState('');
  const [formSubjects, setFormSubjects] = useState('');
  const [formClassIds, setFormClassIds] = useState<string[]>([]);
  const [formError, setFormError] = useState<string | null>(null);

  const filteredTeachers = teachers.filter((t) => {
    const matchSearch =
      t.fullName.toLowerCase().includes(search.toLowerCase()) ||
      t.employeeNumber.toLowerCase().includes(search.toLowerCase()) ||
      t.assignedSubjects.some((s) => s.toLowerCase().includes(search.toLowerCase()));

    const matchDept = selectedDept === 'all' || t.department === selectedDept;
    return matchSearch && matchDept;
  });

  const handleOpenAdd = () => {
    setEditingTeacher(null);
    setFormName('');
    setFormEmail('');
    setFormEmpNo(`FAC-2026-${Math.floor(100 + Math.random() * 900)}`);
    setFormDept('Computer Science');
    setFormDesignation('Assistant Professor');
    setFormPhone('');
    setFormQualification('M.Tech, Ph.D Candidate');
    setFormSubjects('Computer Networks, Algorithms');
    setFormClassIds([classes[0]?.id || 'cls-cse-1']);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (t: Teacher) => {
    setEditingTeacher(t);
    setFormName(t.fullName);
    setFormEmail(t.email);
    setFormEmpNo(t.employeeNumber);
    setFormDept(t.department);
    setFormDesignation(t.designation);
    setFormPhone(t.phone || '');
    setFormQualification(t.qualification);
    setFormSubjects(t.assignedSubjects.join(', '));
    setFormClassIds(t.assignedClassIds);
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName.trim() || !formEmail.trim() || !formEmpNo.trim()) {
      setFormError('Name, email, and employee number are required.');
      return;
    }

    const assignedClassNames = classes
      .filter((c) => formClassIds.includes(c.id))
      .map((c) => c.name);

    const subjectsArray = formSubjects
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    if (editingTeacher) {
      updateTeacher(editingTeacher.id, {
        fullName: formName.trim(),
        email: formEmail.trim(),
        employeeNumber: formEmpNo.trim(),
        department: formDept,
        designation: formDesignation,
        phone: formPhone.trim(),
        qualification: formQualification.trim(),
        assignedSubjects: subjectsArray,
        assignedClassIds: formClassIds,
        assignedClassNames,
      });
    } else {
      addTeacher({
        userId: `usr-${Date.now()}`,
        fullName: formName.trim(),
        email: formEmail.trim(),
        employeeNumber: formEmpNo.trim(),
        department: formDept,
        designation: formDesignation,
        phone: formPhone.trim(),
        qualification: formQualification.trim(),
        assignedSubjects: subjectsArray,
        assignedClassIds: formClassIds,
        assignedClassNames,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Faculty & Teachers
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Manage academic appointments, departmental assignments, and course allocations.
          </p>
        </div>

        {isAdmin && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Add Faculty</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search faculty by name, employee code, or subject..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:bg-white"
          />
        </div>

        <select
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
          className="px-3 py-2 bg-[#F9F9F8] border border-[#DBDBD9] rounded-lg text-xs text-[#131313] focus:outline-hidden focus:border-[#F9A51B]"
        >
          <option value="all">All Departments</option>
          <option value="Computer Science">Computer Science</option>
          <option value="Software Engineering">Software Engineering</option>
          <option value="Artificial Intelligence">Artificial Intelligence</option>
        </select>
      </div>

      {/* Grid of Teachers */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {filteredTeachers.map((t) => (
          <div
            key={t.id}
            className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-[#FFF2D7] text-[#F9A51B] border border-[#FAC95A] flex items-center justify-center font-bold text-sm shrink-0">
                    {t.fullName
                      .split(' ')
                      .map((n) => n[0])
                      .slice(0, 2)
                      .join('')}
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-[#131313]">{t.fullName}</h3>
                    <p className="text-xs text-[#F9A51B] font-medium">{t.designation}</p>
                    <span className="text-[11px] text-[#62676B] font-mono">{t.employeeNumber}</span>
                  </div>
                </div>

                {isAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(t)}
                      className="p-1.5 rounded-md text-[#62676B] hover:text-[#F9A51B] hover:bg-[#FFF2D7] cursor-pointer"
                      title="Edit"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => {
                        if (window.confirm(`Delete faculty record for ${t.fullName}?`)) {
                          deleteTeacher(t.id);
                        }
                      }}
                      className="p-1.5 rounded-md text-[#62676B] hover:text-[#C44940] hover:bg-[#FCEBE9] cursor-pointer"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-[#DBDBD9]/50 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-[#62676B]">
                  <Mail className="w-3.5 h-3.5 text-[#F9A51B] shrink-0" />
                  <span className="text-[#131313] truncate">{t.email}</span>
                </div>
                <div className="flex items-center gap-2 text-[#62676B]">
                  <Award className="w-3.5 h-3.5 text-[#F9A51B] shrink-0" />
                  <span className="text-[#131313] truncate">{t.qualification}</span>
                </div>
                <div className="flex items-start gap-2 text-[#62676B]">
                  <BookOpen className="w-3.5 h-3.5 text-[#F9A51B] shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <span className="text-[#919A9F] block text-[10px] uppercase font-semibold">Subjects</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {t.assignedSubjects.map((sub, i) => (
                        <span
                          key={i}
                          className="px-2 py-0.5 rounded-md bg-[#F9F9F8] border border-[#DBDBD9] text-[11px] text-[#131313]"
                        >
                          {sub}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#DBDBD9]/50 flex items-center justify-between text-[11px] text-[#62676B]">
              <span className="flex items-center gap-1">
                <Layers className="w-3 h-3 text-[#23845B]" />
                {t.assignedClassNames.length} Assigned Cohorts
              </span>
              <span>Joined: {t.joiningDate}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl border border-[#DBDBD9] max-w-lg w-full p-6 shadow-xl">
            <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]">
              <h3 className="font-bold text-base text-[#131313]">
                {editingTeacher ? 'Edit Faculty Record' : 'Add New Faculty Member'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
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

            <form onSubmit={handleSave} className="space-y-3 mt-4 text-xs">
              <div>
                <label className="block font-medium text-[#131313] mb-1">Full Legal Name *</label>
                <input
                  type="text"
                  required
                  value={formName}
                  onChange={(e) => setFormName(e.target.value)}
                  placeholder="e.g. Prof. Rajesh Sharma"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Employee ID *</label>
                  <input
                    type="text"
                    required
                    value={formEmpNo}
                    onChange={(e) => setFormEmpNo(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Department</label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Software Engineering">Software Engineering</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Designation</label>
                  <input
                    type="text"
                    value={formDesignation}
                    onChange={(e) => setFormDesignation(e.target.value)}
                    placeholder="Associate Professor"
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#131313] mb-1">Assigned Subjects (comma-separated)</label>
                <input
                  type="text"
                  value={formSubjects}
                  onChange={(e) => setFormSubjects(e.target.value)}
                  placeholder="Web Technologies, Database Systems"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div>
                <label className="block font-medium text-[#131313] mb-1">Academic Qualifications</label>
                <input
                  type="text"
                  value={formQualification}
                  onChange={(e) => setFormQualification(e.target.value)}
                  placeholder="Ph.D in Distributed Systems, M.Tech"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-[#DBDBD9]">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#DBDBD9] rounded-lg text-[#62676B] hover:bg-[#F3F3F1] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold rounded-lg shadow-xs cursor-pointer"
                >
                  Save Faculty
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
