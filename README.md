# EOMS — Education Operation Management System

A centralized, responsive educational administration platform built for institutions to manage students, faculty, courses, attendance, assignments, examinations, and official academic records.

---

## 🌟 Visual Design & Theme Tokens

Adapted from the warm, restrained aesthetic in the reference specification:

- **App Background**: `#F9F9F8` (Warm off-white)
- **Primary CTA & Accent**: `#F9A51B` (Rich Amber)
- **Primary Hover**: `#E58E08`
- **Surface**: `#FFFFFF`
- **Border**: `#DBDBD9`
- **Success**: `#23845B`
- **Typography**: Inter (with tabular numbers for attendance metrics and grades)

---

## 👥 Three Role-Based Workspaces

1. **Administrator (`admin`)**
   - **Metrics**: Total Students (248), Total Teachers (18), Total Courses (12), Pending Approvals (5).
   - **Enrollment Chart**: Monthly trend visualization.
   - **Live Audit**: Recent student registrations, faculty updates, published results.
   - **Quick Actions**: Add Student, Add Teacher, Create Course, View Reports.

2. **Teacher (`teacher`)**
   - **Metrics**: My Classes (4), Total Students (120), Pending Reviews (3), Upcoming Exams (1).
   - **Class Overview Table**: Section breakdown with live attendance percentage bars.
   - **Quick Actions**: Mark Daily Attendance, Create Assignment, Enter Exam Marks, Publish Results.

3. **Student (`student`)**
   - **Circular Progress Ring**: 78% overall term progress.
   - **Metrics**: Enrolled Courses (5), Attendance (92%), Pending Assignments (3), Upcoming Exams (2).
   - **Curriculum Overview**: Progress bars per course.
   - **Recent Activity**: Submission status, attendance marks, exam grades.

---

## 🔑 Demo Personas & Quick Switcher

For instant testing, a persistent **Demo Environment Bar** appears at the top of the interface allowing 1-click role switching:

- **Administrator**: `admin@eoms.edu` / `admin123` (Dr. Elena Vance)
- **Faculty / Teacher**: `teacher@eoms.edu` / `teacher123` (Prof. Rajesh Sharma)
- **Student**: `student@eoms.edu` / `student123` (Varshith Reddy)

You can also use the login screen buttons to prefill credentials, or register a new student account at `/register`.

---

## 🧭 Routes & Modules

### Public Routes
- `/`: Polished landing page with hero preview, 6 core features, 3-step process, role benefits, and CTA.
- `/login`: 2-panel login interface with validation and demo auto-fill buttons.
- `/register`: Student registration with role security policies and password strength indicator.
- `/forgot-password`: Institutional email password reset flow.

### Application Routes (`/app/*`)
- `/app/dashboard`: Role-specific dashboard dispatcher.
- `/app/students`: Student directory with filtering, profile drawer, and registration modal.
- `/app/teachers`: Faculty directory with departmental filters and appointment modal.
- `/app/courses`: Curriculum catalog with credit hours and progress tracking.
- `/app/classes`: Class sections, lecture halls, and representative assignments.
- `/app/attendance`: Interactive daily register with "Mark All Present", summary counters, and past session logs.
- `/app/assignments`: Assignment publisher, submission portal, and grading drawer.
- `/app/examinations`: Examination scheduler and grade computation dialog.
- `/app/results`: Transcript scorecards (with privacy guard: students view only their own grades).
- `/app/reports`: Analytics, cohort attendance rates, and bell grade distribution.
- `/app/notifications`: Institutional broadcast center with read/unread tracking.
- `/app/profile`: Personal academic credentials and contact details.
- `/app/settings`: Academic term configuration and password security.

---

## 🛠️ Development & Build

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Verify types & compile production build
npm run lint
npm run build
```
