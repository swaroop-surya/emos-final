import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { Course } from '../../types';
import {
  BookOpen,
  Search,
  Plus,
  Edit2,
  Trash2,
  X,
  Users,
  GraduationCap,
  Layers,
  CheckCircle,
} from 'lucide-react';

export const CoursesPage: React.FC = () => {
  const { courses, teachers, classes, addCourse, updateCourse, deleteCourse } = useData();
  const { currentUser } = useAuth();
  const location = useLocation();

  const isFacultyOrAdmin = currentUser?.role === 'admin' || currentUser?.role === 'teacher';
  const isAdmin = currentUser?.role === 'admin';

  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('all');

  const [isModalOpen, setIsModalOpen] = useState(() => {
    return new URLSearchParams(location.search).get('action') === 'new' && isFacultyOrAdmin;
  });
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);

  // Form State
  const [formTitle, setFormTitle] = useState('');
  const [formCode, setFormCode] = useState('');
  const [formDept, setFormDept] = useState('Computer Science');
  const [formCredits, setFormCredits] = useState(4);
  const [formSemester, setFormSemester] = useState('Semester 1');
  const [formDescription, setFormDescription] = useState('');
  const [formTeacherId, setFormTeacherId] = useState(teachers[0]?.id || 'tch-1');
  const [formClassId, setFormClassId] = useState(classes[0]?.id || 'cls-cse-1');
  const [formError, setFormError] = useState<string | null>(null);

  const filteredCourses = courses.filter((c) => {
    const matchSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.courseCode.toLowerCase().includes(search.toLowerCase()) ||
      c.teacherName.toLowerCase().includes(search.toLowerCase());

    const matchDept = selectedDept === 'all' || c.department === selectedDept;
    return matchSearch && matchDept;
  });

  const handleOpenAdd = () => {
    setEditingCourse(null);
    setFormTitle('');
    setFormCode(`CS-${Math.floor(100 + Math.random() * 900)}`);
    setFormDept('Computer Science');
    setFormCredits(4);
    setFormSemester('Semester 1');
    setFormDescription('');
    setFormTeacherId(teachers[0]?.id || 'tch-1');
    setFormClassId(classes[0]?.id || 'cls-cse-1');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (c: Course) => {
    setEditingCourse(c);
    setFormTitle(c.title);
    setFormCode(c.courseCode);
    setFormDept(c.department);
    setFormCredits(c.credits);
    setFormSemester(c.semester);
    setFormDescription(c.description);
    setFormTeacherId(c.teacherId);
    setFormClassId(c.classIds[0] || classes[0]?.id || 'cls-cse-1');
    setFormError(null);
    setIsModalOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formTitle.trim() || !formCode.trim()) {
      setFormError('Course title and code are required.');
      return;
    }

    const teacher = teachers.find((t) => t.id === formTeacherId);
    const teacherName = teacher ? teacher.fullName : 'Faculty Member';

    if (editingCourse) {
      updateCourse(editingCourse.id, {
        title: formTitle.trim(),
        courseCode: formCode.trim(),
        department: formDept,
        credits: Number(formCredits),
        semester: formSemester,
        description: formDescription.trim(),
        teacherId: formTeacherId,
        teacherName,
        classIds: [formClassId],
      });
    } else {
      addCourse({
        title: formTitle.trim(),
        courseCode: formCode.trim(),
        department: formDept,
        credits: Number(formCredits),
        semester: formSemester,
        description: formDescription.trim(),
        teacherId: formTeacherId,
        teacherName,
        classIds: [formClassId],
        status: 'Active',
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
            Curriculum & Courses
          </h1>
          <p className="text-xs text-[#62676B] mt-0.5">
            Manage academic subjects, syllabus modules, credit points, and course instructors.
          </p>
        </div>

        {isFacultyOrAdmin && (
          <button
            onClick={handleOpenAdd}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer self-start sm:self-auto"
          >
            <Plus className="w-4 h-4" />
            <span>Create Course</span>
          </button>
        )}
      </div>

      {/* Filter and Search */}
      <div className="bg-white rounded-xl border border-[#DBDBD9] p-4 shadow-2xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search courses by title, subject code, or professor..."
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
          <option value="Artificial Intelligence">Artificial Intelligence</option>
        </select>
      </div>

      {/* Course Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredCourses.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-xl border border-[#DBDBD9] p-5 shadow-2xs hover:border-[#FAC95A] transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-[11px] font-mono font-bold bg-[#FFF2D7] text-[#131313] px-2 py-0.5 rounded-md border border-[#FAC95A]">
                  {c.courseCode}
                </span>

                {isFacultyOrAdmin && (
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(c)}
                      className="p-1 rounded-md text-[#62676B] hover:text-[#F9A51B] hover:bg-[#FFF2D7] cursor-pointer"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    {isAdmin && (
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete course ${c.title}?`)) {
                            deleteCourse(c.id);
                          }
                        }}
                        className="p-1 rounded-md text-[#62676B] hover:text-[#C44940] hover:bg-[#FCEBE9] cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                )}
              </div>

              <h3 className="font-bold text-base text-[#131313] mt-2 leading-snug">{c.title}</h3>
              <p className="text-xs text-[#62676B] mt-1 line-clamp-2 leading-relaxed">
                {c.description || 'Comprehensive foundational curriculum module covering theory and lab sessions.'}
              </p>

              <div className="mt-4 pt-3 border-t border-[#DBDBD9]/50 space-y-2 text-xs">
                <div className="flex items-center justify-between text-[#62676B]">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-[#F9A51B]" /> Instructor
                  </span>
                  <strong className="text-[#131313]">{c.teacherName}</strong>
                </div>

                <div className="flex items-center justify-between text-[#62676B]">
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-[#F9A51B]" /> Credits & Term
                  </span>
                  <span className="text-[#131313] font-medium">
                    {c.credits} Credits • {c.semester}
                  </span>
                </div>
              </div>

              {/* Progress bar if present */}
              {c.progress !== undefined && (
                <div className="mt-3 pt-3 border-t border-[#DBDBD9]/50">
                  <div className="flex items-center justify-between text-[11px] mb-1">
                    <span className="text-[#62676B]">Syllabus Covered</span>
                    <strong className="text-[#131313] tabular-nums">{c.progress}%</strong>
                  </div>
                  <div className="w-full h-1.5 bg-[#F3F3F1] rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#F9A51B] rounded-full"
                      style={{ width: `${c.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <div className="mt-4 pt-3 border-t border-[#DBDBD9]/50 flex items-center justify-between text-[11px]">
              <span className="inline-flex items-center gap-1 text-[#23845B]">
                <CheckCircle className="w-3 h-3" />
                Active Curriculum
              </span>
              <span className="text-[#919A9F]">{c.department}</span>
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
                {editingCourse ? 'Edit Course Details' : 'Create New Course'}
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
                <label className="block font-medium text-[#131313] mb-1">Course Title *</label>
                <input
                  type="text"
                  required
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  placeholder="e.g. Distributed Database Systems"
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Course Code *</label>
                  <input
                    type="text"
                    required
                    value={formCode}
                    onChange={(e) => setFormCode(e.target.value)}
                    placeholder="CS-304"
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Credits</label>
                  <input
                    type="number"
                    min="1"
                    max="6"
                    value={formCredits}
                    onChange={(e) => setFormCredits(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Academic Department</label>
                  <select
                    value={formDept}
                    onChange={(e) => setFormDept(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  >
                    <option value="Computer Science">Computer Science</option>
                    <option value="Artificial Intelligence">Artificial Intelligence</option>
                  </select>
                </div>
                <div>
                  <label className="block font-medium text-[#131313] mb-1">Semester</label>
                  <select
                    value={formSemester}
                    onChange={(e) => setFormSemester(e.target.value)}
                    className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                  >
                    <option value="Semester 1">Semester 1</option>
                    <option value="Semester 2">Semester 2</option>
                    <option value="Semester 3">Semester 3</option>
                    <option value="Semester 4">Semester 4</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-medium text-[#131313] mb-1">Assigned Instructor</label>
                <select
                  value={formTeacherId}
                  onChange={(e) => setFormTeacherId(e.target.value)}
                  className="w-full px-3 py-2 border border-[#DBDBD9] rounded-lg focus:outline-hidden focus:border-[#F9A51B]"
                >
                  {teachers.map((t) => (
                    <option key={t.id} value={t.id}>
                      {t.fullName} ({t.department})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block font-medium text-[#131313] mb-1">Description / Objectives</label>
                <textarea
                  rows={2}
                  value={formDescription}
                  onChange={(e) => setFormDescription(e.target.value)}
                  placeholder="Outline key academic outcomes and syllabus focus..."
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
                  Save Course
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
