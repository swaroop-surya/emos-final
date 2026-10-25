export type UserRole = 'admin' | 'teacher' | 'student';

export interface User {
  id: string;
  fullName: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  department?: string;
  phone?: string;
  accountStatus: 'Active' | 'Pending' | 'Suspended';
  createdAt: string;
  studentNumber?: string;
  employeeNumber?: string;
  classId?: string;
  className?: string;
}

export interface Student {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  studentNumber: string;
  classId: string;
  className: string;
  enrollmentStatus: 'Active' | 'On Leave' | 'Graduated';
  parentName?: string;
  parentPhone?: string;
  attendanceRate: number;
  avatarUrl?: string;
  enrolledAt: string;
}

export interface Teacher {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  employeeNumber: string;
  department: string;
  designation: string;
  assignedSubjects: string[];
  assignedClassIds: string[];
  assignedClassNames: string[];
  phone?: string;
  qualification: string;
  joiningDate: string;
}

export interface Course {
  id: string;
  title: string;
  courseCode: string;
  department: string;
  credits: number;
  semester: string;
  description: string;
  teacherId: string;
  teacherName: string;
  classIds: string[];
  status: 'Active' | 'Archived';
  progress?: number;
}

export interface ClassGroup {
  id: string;
  name: string;
  academicYear: string;
  roomNumber: string;
  totalStudents: number;
  representativeName: string;
  courseIds: string[];
}

export interface StudentAttendanceEntry {
  studentId: string;
  studentName: string;
  studentNumber: string;
  status: 'present' | 'absent' | 'late';
  remarks?: string;
}

export interface AttendanceSession {
  id: string;
  classId: string;
  className: string;
  date: string;
  markedByTeacherId: string;
  markedByTeacherName: string;
  presentCount: number;
  absentCount: number;
  lateCount: number;
  totalStudents: number;
  entries: StudentAttendanceEntry[];
}

export interface StudentSubmission {
  studentId: string;
  studentName: string;
  submittedAt: string;
  status: 'submitted' | 'graded' | 'late';
  contentOrFile: string;
  marksObtained?: number;
  feedback?: string;
}

export interface Assignment {
  id: string;
  title: string;
  courseId: string;
  courseName: string;
  classId: string;
  className: string;
  teacherId: string;
  teacherName: string;
  instructions: string;
  dueDate: string;
  totalMarks: number;
  status: 'Published' | 'Draft' | 'Closed';
  submissions: StudentSubmission[];
}

export interface Examination {
  id: string;
  title: string;
  examType: 'Mid-Term' | 'Semester Final' | 'Class Test' | 'Practical';
  courseId: string;
  courseName: string;
  classId: string;
  className: string;
  examDate: string;
  maximumMarks: number;
  passingMarks: number;
  status: 'Scheduled' | 'Completed' | 'Published';
}

export interface ExamResult {
  id: string;
  examinationId: string;
  examTitle: string;
  courseName: string;
  classId: string;
  studentId: string;
  studentName: string;
  studentNumber: string;
  marksObtained: number;
  maximumMarks: number;
  grade: 'A+' | 'A' | 'B' | 'C' | 'D' | 'F';
  percentage: number;
  status: 'Pass' | 'Fail';
  publishedAt: string;
}

export interface NotificationItem {
  id: string;
  targetRoles: UserRole[];
  targetUserId?: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'success' | 'alert';
  createdAt: string;
  read: boolean;
}
