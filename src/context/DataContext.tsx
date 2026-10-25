import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  Student,
  Teacher,
  Course,
  ClassGroup,
  AttendanceSession,
  Assignment,
  Examination,
  ExamResult,
  NotificationItem,
  StudentSubmission,
} from '../types';
import {
  INITIAL_STUDENTS,
  INITIAL_TEACHERS,
  INITIAL_COURSES,
  INITIAL_CLASSES,
  INITIAL_ATTENDANCE_SESSIONS,
  INITIAL_ASSIGNMENTS,
  INITIAL_EXAMINATIONS,
  INITIAL_RESULTS,
  INITIAL_NOTIFICATIONS,
} from '../data/mockData';

interface DataContextType {
  students: Student[];
  teachers: Teacher[];
  courses: Course[];
  classes: ClassGroup[];
  attendanceSessions: AttendanceSession[];
  assignments: Assignment[];
  examinations: Examination[];
  results: ExamResult[];
  notifications: NotificationItem[];
  addStudent: (student: Omit<Student, 'id' | 'enrolledAt'>) => void;
  updateStudent: (id: string, data: Partial<Student>) => void;
  deleteStudent: (id: string) => void;
  addTeacher: (teacher: Omit<Teacher, 'id' | 'joiningDate'>) => void;
  updateTeacher: (id: string, data: Partial<Teacher>) => void;
  deleteTeacher: (id: string) => void;
  addCourse: (course: Omit<Course, 'id'>) => void;
  updateCourse: (id: string, data: Partial<Course>) => void;
  deleteCourse: (id: string) => void;
  saveAttendanceSession: (session: Omit<AttendanceSession, 'id'>) => { success: boolean; message: string };
  addAssignment: (assignment: Omit<Assignment, 'id' | 'submissions'>) => void;
  submitAssignment: (assignmentId: string, submission: StudentSubmission) => void;
  gradeAssignmentSubmission: (assignmentId: string, studentId: string, marks: number, feedback: string) => void;
  addExamination: (exam: Omit<Examination, 'id'>) => void;
  saveExamMarks: (examinationId: string, marksList: { studentId: string; marksObtained: number }[]) => void;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  addNotification: (notification: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => void;
  resetToDefaultData: () => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const PREFIX = 'eoms_storage_';

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [students, setStudents] = useState<Student[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}students`);
    return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
  });

  const [teachers, setTeachers] = useState<Teacher[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}teachers`);
    return saved ? JSON.parse(saved) : INITIAL_TEACHERS;
  });

  const [courses, setCourses] = useState<Course[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}courses`);
    return saved ? JSON.parse(saved) : INITIAL_COURSES;
  });

  const [classes, setClasses] = useState<ClassGroup[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}classes`);
    return saved ? JSON.parse(saved) : INITIAL_CLASSES;
  });

  const [attendanceSessions, setAttendanceSessions] = useState<AttendanceSession[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}attendance`);
    return saved ? JSON.parse(saved) : INITIAL_ATTENDANCE_SESSIONS;
  });

  const [assignments, setAssignments] = useState<Assignment[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}assignments`);
    return saved ? JSON.parse(saved) : INITIAL_ASSIGNMENTS;
  });

  const [examinations, setExaminations] = useState<Examination[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}examinations`);
    return saved ? JSON.parse(saved) : INITIAL_EXAMINATIONS;
  });

  const [results, setResults] = useState<ExamResult[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}results`);
    return saved ? JSON.parse(saved) : INITIAL_RESULTS;
  });

  const [notifications, setNotifications] = useState<NotificationItem[]>(() => {
    const saved = localStorage.getItem(`${PREFIX}notifications`);
    return saved ? JSON.parse(saved) : INITIAL_NOTIFICATIONS;
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem(`${PREFIX}students`, JSON.stringify(students));
  }, [students]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}teachers`, JSON.stringify(teachers));
  }, [teachers]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}courses`, JSON.stringify(courses));
  }, [courses]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}classes`, JSON.stringify(classes));
  }, [classes]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}attendance`, JSON.stringify(attendanceSessions));
  }, [attendanceSessions]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}assignments`, JSON.stringify(assignments));
  }, [assignments]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}examinations`, JSON.stringify(examinations));
  }, [examinations]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}results`, JSON.stringify(results));
  }, [results]);

  useEffect(() => {
    localStorage.setItem(`${PREFIX}notifications`, JSON.stringify(notifications));
  }, [notifications]);

  // Actions
  const addStudent = (studentData: Omit<Student, 'id' | 'enrolledAt'>) => {
    const newStudent: Student = {
      ...studentData,
      id: `stu-${Date.now()}`,
      enrolledAt: new Date().toISOString().split('T')[0],
      attendanceRate: 100,
    };
    setStudents((prev) => [newStudent, ...prev]);

    // Update class totalStudents count
    setClasses((prev) =>
      prev.map((c) => (c.id === studentData.classId ? { ...c, totalStudents: c.totalStudents + 1 } : c))
    );
  };

  const updateStudent = (id: string, data: Partial<Student>) => {
    setStudents((prev) => prev.map((s) => (s.id === id ? { ...s, ...data } : s)));
  };

  const deleteStudent = (id: string) => {
    setStudents((prev) => prev.filter((s) => s.id !== id));
  };

  const addTeacher = (teacherData: Omit<Teacher, 'id' | 'joiningDate'>) => {
    const newTeacher: Teacher = {
      ...teacherData,
      id: `tch-${Date.now()}`,
      joiningDate: new Date().toISOString().split('T')[0],
    };
    setTeachers((prev) => [newTeacher, ...prev]);
  };

  const updateTeacher = (id: string, data: Partial<Teacher>) => {
    setTeachers((prev) => prev.map((t) => (t.id === id ? { ...t, ...data } : t)));
  };

  const deleteTeacher = (id: string) => {
    setTeachers((prev) => prev.filter((t) => t.id !== id));
  };

  const addCourse = (courseData: Omit<Course, 'id'>) => {
    const newCourse: Course = {
      ...courseData,
      id: `crs-${Date.now()}`,
      progress: 0,
    };
    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (id: string, data: Partial<Course>) => {
    setCourses((prev) => prev.map((c) => (c.id === id ? { ...c, ...data } : c)));
  };

  const deleteCourse = (id: string) => {
    setCourses((prev) => prev.filter((c) => c.id !== id));
  };

  const saveAttendanceSession = (sessionData: Omit<AttendanceSession, 'id'>) => {
    // Check duplicate record rule for same class and date
    const existingIndex = attendanceSessions.findIndex(
      (s) => s.classId === sessionData.classId && s.date === sessionData.date
    );

    if (existingIndex >= 0) {
      // Overwrite/update existing session with authorized correction
      const updatedSession: AttendanceSession = {
        ...sessionData,
        id: attendanceSessions[existingIndex].id,
      };
      setAttendanceSessions((prev) => {
        const next = [...prev];
        next[existingIndex] = updatedSession;
        return next;
      });
      return { success: true, message: `Updated attendance for ${sessionData.className} on ${sessionData.date}.` };
    }

    const newSession: AttendanceSession = {
      ...sessionData,
      id: `att-sess-${Date.now()}`,
    };
    setAttendanceSessions((prev) => [newSession, ...prev]);
    return { success: true, message: `Recorded attendance for ${sessionData.className} successfully.` };
  };

  const addAssignment = (assignmentData: Omit<Assignment, 'id' | 'submissions'>) => {
    const newAssignment: Assignment = {
      ...assignmentData,
      id: `asg-${Date.now()}`,
      submissions: [],
    };
    setAssignments((prev) => [newAssignment, ...prev]);

    // Send notification
    addNotification({
      targetRoles: ['student'],
      title: `New Assignment: ${assignmentData.title}`,
      message: `Due on ${assignmentData.dueDate} for ${assignmentData.courseName}. Check instructions.`,
      type: 'info',
    });
  };

  const submitAssignment = (assignmentId: string, submission: StudentSubmission) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignmentId) {
          const filtered = a.submissions.filter((s) => s.studentId !== submission.studentId);
          return { ...a, submissions: [...filtered, submission] };
        }
        return a;
      })
    );
  };

  const gradeAssignmentSubmission = (
    assignmentId: string,
    studentId: string,
    marks: number,
    feedback: string
  ) => {
    setAssignments((prev) =>
      prev.map((a) => {
        if (a.id === assignmentId) {
          const updatedSubmissions = a.submissions.map((sub) =>
            sub.studentId === studentId
              ? { ...sub, marksObtained: marks, feedback, status: 'graded' as const }
              : sub
          );
          return { ...a, submissions: updatedSubmissions };
        }
        return a;
      })
    );
  };

  const addExamination = (examData: Omit<Examination, 'id'>) => {
    const newExam: Examination = {
      ...examData,
      id: `ex-${Date.now()}`,
    };
    setExaminations((prev) => [newExam, ...prev]);

    addNotification({
      targetRoles: ['student', 'teacher'],
      title: `Examination Scheduled: ${examData.title}`,
      message: `Scheduled on ${examData.examDate} for ${examData.courseName} (${examData.className}).`,
      type: 'warning',
    });
  };

  const calculateGrade = (percentage: number): 'A+' | 'A' | 'B' | 'C' | 'D' | 'F' => {
    if (percentage >= 90) return 'A+';
    if (percentage >= 80) return 'A';
    if (percentage >= 70) return 'B';
    if (percentage >= 60) return 'C';
    if (percentage >= 50) return 'D';
    return 'F';
  };

  const saveExamMarks = (
    examinationId: string,
    marksList: { studentId: string; marksObtained: number }[]
  ) => {
    const exam = examinations.find((e) => e.id === examinationId);
    if (!exam) return;

    const newResults: ExamResult[] = marksList.map((m) => {
      const student = students.find((s) => s.id === m.studentId);
      const percentage = Math.round((m.marksObtained / exam.maximumMarks) * 100);
      const grade = calculateGrade(percentage);
      const status = m.marksObtained >= exam.passingMarks ? 'Pass' : 'Fail';

      return {
        id: `res-${examinationId}-${m.studentId}`,
        examinationId,
        examTitle: exam.title,
        courseName: exam.courseName,
        classId: exam.classId,
        studentId: m.studentId,
        studentName: student?.fullName || 'Student',
        studentNumber: student?.studentNumber || 'STU-GEN',
        marksObtained: m.marksObtained,
        maximumMarks: exam.maximumMarks,
        grade,
        percentage,
        status,
        publishedAt: new Date().toISOString(),
      };
    });

    // Replace or add
    setResults((prev) => {
      const filtered = prev.filter((r) => r.examinationId !== examinationId);
      return [...newResults, ...filtered];
    });

    // Mark exam as published
    setExaminations((prev) =>
      prev.map((e) => (e.id === examinationId ? { ...e, status: 'Published' } : e))
    );

    addNotification({
      targetRoles: ['student', 'admin'],
      title: `Exam Results Published: ${exam.title}`,
      message: `Marks have been entered and published for ${exam.className}. Check scorecards.`,
      type: 'success',
    });
  };

  const markNotificationRead = (id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  };

  const markAllNotificationsRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  };

  const addNotification = (item: Omit<NotificationItem, 'id' | 'createdAt' | 'read'>) => {
    const newNotif: NotificationItem = {
      ...item,
      id: `notif-${Date.now()}`,
      createdAt: new Date().toISOString(),
      read: false,
    };
    setNotifications((prev) => [newNotif, ...prev]);
  };

  const resetToDefaultData = () => {
    setStudents(INITIAL_STUDENTS);
    setTeachers(INITIAL_TEACHERS);
    setCourses(INITIAL_COURSES);
    setClasses(INITIAL_CLASSES);
    setAttendanceSessions(INITIAL_ATTENDANCE_SESSIONS);
    setAssignments(INITIAL_ASSIGNMENTS);
    setExaminations(INITIAL_EXAMINATIONS);
    setResults(INITIAL_RESULTS);
    setNotifications(INITIAL_NOTIFICATIONS);
    Object.keys(localStorage)
      .filter((k) => k.startsWith(PREFIX))
      .forEach((k) => localStorage.removeItem(k));
  };

  return (
    <DataContext.Provider
      value={{
        students,
        teachers,
        courses,
        classes,
        attendanceSessions,
        assignments,
        examinations,
        results,
        notifications,
        addStudent,
        updateStudent,
        deleteStudent,
        addTeacher,
        updateTeacher,
        deleteTeacher,
        addCourse,
        updateCourse,
        deleteCourse,
        saveAttendanceSession,
        addAssignment,
        submitAssignment,
        gradeAssignmentSubmission,
        addExamination,
        saveExamMarks,
        markNotificationRead,
        markAllNotificationsRead,
        addNotification,
        resetToDefaultData,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
