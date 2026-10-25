import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from '../components/common/Logo';
import { useAuth } from '../context/AuthContext';
import {
  GraduationCap,
  CalendarCheck,
  BookOpen,
  ClipboardList,
  FileBarChart,
  ShieldCheck,
  Check,
  ArrowRight,
  Menu,
  X,
  Users,
  Award,
  Clock,
  Sparkles,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentYear = new Date().getFullYear();

  return (
    <div className="min-h-screen bg-[#F9F9F8] text-[#131313] font-sans flex flex-col selection:bg-[#FFF2D7] selection:text-[#131313]">
      {/* Sticky Header */}
      <header className="sticky top-0 z-40 bg-[#F9F9F8]/95 backdrop-blur-xs border-b border-[#DBDBD9]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="cursor-pointer">
            <Logo size="md" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-[#62676B]">
            <a href="#features" className="hover:text-[#131313] transition-colors">
              Features
            </a>
            <a href="#modules" className="hover:text-[#131313] transition-colors">
              Modules
            </a>
            <a href="#how-it-works" className="hover:text-[#131313] transition-colors">
              How It Works
            </a>
            <a href="#roles" className="hover:text-[#131313] transition-colors">
              Workspaces
            </a>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <Link
                to="/app/dashboard"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Go to Workspace <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            ) : (
              <>
                <Link
                  to="/login"
                  className="px-4 py-2 rounded-lg text-xs font-medium text-[#131313] hover:bg-[#F3F3F1] border border-transparent transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/register"
                  className="px-4 py-2 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile hamburger button */}
          <button
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg text-[#62676B] hover:bg-[#F3F3F1]"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-[#DBDBD9] bg-white px-4 py-4 space-y-3">
            <a
              href="#features"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#131313]"
            >
              Features
            </a>
            <a
              href="#modules"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#131313]"
            >
              Modules
            </a>
            <a
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#131313]"
            >
              How It Works
            </a>
            <a
              href="#roles"
              onClick={() => setMobileMenuOpen(false)}
              className="block py-2 text-sm font-medium text-[#131313]"
            >
              Workspaces
            </a>
            <div className="pt-2 border-t border-[#DBDBD9] flex flex-col gap-2">
              <Link
                to="/login"
                className="w-full text-center py-2 text-xs font-medium border border-[#DBDBD9] rounded-lg"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="w-full text-center py-2 text-xs font-semibold bg-[#F9A51B] text-white rounded-lg"
              >
                Get Started
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section */}
      <section className="py-12 sm:py-20 lg:py-24 border-b border-[#DBDBD9]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FFF2D7] border border-[#FAC95A]/60 text-xs font-semibold text-[#131313]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#F9A51B]" />
                <span>ONE PLATFORM. BETTER EDUCATION.</span>
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#131313] leading-none">
                Less administration. <br />
                <span className="text-[#F9A51B]">More education.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#62676B] leading-relaxed max-w-xl">
                Manage students, courses, attendance, assessments, and academic records from one organized workspace built for your institution.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/register"
                  className="px-6 py-3 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold text-sm shadow-xs transition-all flex items-center gap-2"
                >
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <a
                  href="#features"
                  className="px-6 py-3 rounded-lg bg-white border border-[#DBDBD9] hover:bg-[#F3F3F1] text-[#131313] font-medium text-sm transition-colors"
                >
                  Explore Features
                </a>
              </div>

              <div className="pt-2 flex items-center gap-2 text-xs text-[#62676B]">
                <ShieldCheck className="w-4 h-4 text-[#23845B]" />
                <span>Designed for administrators, teachers, and students.</span>
              </div>
            </div>

            {/* Right Column: Authentic UI Preview of Dashboard */}
            <div className="lg:col-span-6">
              <div className="relative rounded-2xl bg-white border border-[#DBDBD9] p-4 sm:p-6 shadow-sm overflow-hidden">
                {/* Simulated UI Window Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-[#DBDBD9]/60 mb-4">
                  <div className="flex items-center gap-2">
                    <span className="w-3 h-3 rounded-full bg-[#C44940]/70" />
                    <span className="w-3 h-3 rounded-full bg-[#A66A00]/70" />
                    <span className="w-3 h-3 rounded-full bg-[#23845B]/70" />
                    <span className="text-xs font-semibold text-[#62676B] ml-2">EOMS Dashboard Preview</span>
                  </div>
                  <span className="text-[10px] bg-[#FFF2D7] text-[#131313] font-medium px-2 py-0.5 rounded-md">
                    Academic Year 2026-27
                  </span>
                </div>

                {/* Compact Realistic Dashboard Cards */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#DBDBD9]">
                    <span className="text-[11px] text-[#62676B] block">Total Students</span>
                    <span className="text-xl font-bold text-[#131313] tabular-nums">248</span>
                    <span className="text-[10px] text-[#23845B] font-medium block mt-0.5">+12% enrolled</span>
                  </div>
                  <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#DBDBD9]">
                    <span className="text-[11px] text-[#62676B] block">Active Courses</span>
                    <span className="text-xl font-bold text-[#131313] tabular-nums">12</span>
                    <span className="text-[10px] text-[#62676B] font-medium block mt-0.5">Across 4 departments</span>
                  </div>
                </div>

                {/* Attendance & Activity */}
                <div className="space-y-2.5">
                  <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#DBDBD9] flex items-center justify-between">
                    <div>
                      <span className="text-xs font-semibold text-[#131313] block">Attendance Overview</span>
                      <span className="text-[11px] text-[#62676B]">B.Tech 1st Year (CSE)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-20 h-2 bg-[#DBDBD9]/60 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F9A51B] rounded-full w-[90%]" />
                      </div>
                      <span className="text-xs font-bold text-[#131313] tabular-nums">90%</span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-[#DBDBD9] text-xs">
                    <span className="text-[10px] font-semibold text-[#919A9F] uppercase block mb-1.5">
                      Recent Academic Activity
                    </span>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-[#131313] font-medium truncate">Database Systems Unit Test published</span>
                      <span className="text-[10px] text-[#919A9F] shrink-0">Today</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-t border-[#DBDBD9]/40">
                      <span className="text-[#131313] font-medium truncate">Assignment 3 received 28 submissions</span>
                      <span className="text-[10px] text-[#919A9F] shrink-0">Yesterday</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#DBDBD9]/60 flex items-center justify-between text-xs text-[#62676B]">
                  <span>Demo data visualization</span>
                  <Link to="/login" className="text-[#F9A51B] font-semibold hover:underline">
                    Experience Live System →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 sm:py-24 border-b border-[#DBDBD9] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#131313]">
              Everything your institution needs, in one place.
            </h2>
            <p className="text-sm text-[#62676B] mt-2">
              Replace fragmented tools and spreadsheets with a single intuitive system built for academic workflows.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* 1. Student Records */}
            <div className="p-6 rounded-xl border border-[#DBDBD9] bg-[#F9F9F8] hover:border-[#FAC95A] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                <GraduationCap className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#131313] mb-1.5">1. Student Records</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Manage student profiles, enrollment details, parent contacts, and individual academic histories securely.
              </p>
            </div>

            {/* 2. Attendance Management */}
            <div className="p-6 rounded-xl border border-[#DBDBD9] bg-[#F9F9F8] hover:border-[#FAC95A] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                <CalendarCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#131313] mb-1.5">2. Attendance Management</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Record and review daily attendance with class-level summaries, duplicate prevention, and instant rate tracking.
              </p>
            </div>

            {/* 3. Course Management */}
            <div className="p-6 rounded-xl border border-[#DBDBD9] bg-[#F9F9F8] hover:border-[#FAC95A] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#131313] mb-1.5">3. Course Management</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Organize courses, academic cohorts, subject credits, and faculty teaching assignments smoothly.
              </p>
            </div>

            {/* 4. Assignments & Examinations */}
            <div className="p-6 rounded-xl border border-[#DBDBD9] bg-[#F9F9F8] hover:border-[#FAC95A] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                <ClipboardList className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#131313] mb-1.5">4. Assignments and Examinations</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Publish assignments, track student submissions, schedule exams, and record verified numerical marks.
              </p>
            </div>

            {/* 5. Academic Reports */}
            <div className="p-6 rounded-xl border border-[#DBDBD9] bg-[#F9F9F8] hover:border-[#FAC95A] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                <FileBarChart className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#131313] mb-1.5">5. Academic Reports</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Review attendance rates, grade distributions, enrollment trends, and comprehensive report cards.
              </p>
            </div>

            {/* 6. Role-Based Workspaces */}
            <div className="p-6 rounded-xl border border-[#DBDBD9] bg-[#F9F9F8] hover:border-[#FAC95A] transition-all">
              <div className="w-10 h-10 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-base font-semibold text-[#131313] mb-1.5">6. Role-Based Workspaces</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Give administrators, teachers, and students tailored access to their exact tools with enforced security boundaries.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 sm:py-24 border-b border-[#DBDBD9]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#131313]">
              How it works
            </h2>
            <p className="text-sm text-[#62676B] mt-2">
              A straightforward process to onboard your school, college, or training institution.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-white rounded-xl border border-[#DBDBD9] p-6 shadow-2xs relative">
              <span className="w-8 h-8 rounded-full bg-[#FFF2D7] text-[#F9A51B] font-bold text-sm flex items-center justify-center mb-4">
                1
              </span>
              <h3 className="text-base font-semibold text-[#131313] mb-2">Create or receive an account</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Students register with institutional email, while faculty and admin accounts are safely provisioned with verified credentials.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-xl border border-[#DBDBD9] p-6 shadow-2xs relative">
              <span className="w-8 h-8 rounded-full bg-[#FFF2D7] text-[#F9A51B] font-bold text-sm flex items-center justify-center mb-4">
                2
              </span>
              <h3 className="text-base font-semibold text-[#131313] mb-2">Access your role-specific workspace</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Log into a personalized dashboard customized with only the relevant classes, assessments, and permissions.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-xl border border-[#DBDBD9] p-6 shadow-2xs relative">
              <span className="w-8 h-8 rounded-full bg-[#FFF2D7] text-[#F9A51B] font-bold text-sm flex items-center justify-center mb-4">
                3
              </span>
              <h3 className="text-base font-semibold text-[#131313] mb-2">Manage academic activities</h3>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Take attendance, submit coursework, record examination marks, and generate institutional analytics in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Role-based Benefits Section */}
      <section id="roles" className="py-16 sm:py-24 border-b border-[#DBDBD9] bg-white">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#131313]">
              Tailored for every academic stakeholder
            </h2>
            <p className="text-sm text-[#62676B] mt-2">
              Three specialized workspaces built to remove friction from daily institutional operations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Admin */}
            <div className="bg-[#F9F9F8] rounded-xl border border-[#DBDBD9] p-6 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#131313]">Administrator</h3>
                <p className="text-xs font-medium text-[#F9A51B] mt-0.5 mb-3">
                  “Keep institution-wide operations organized.”
                </p>
                <ul className="space-y-2 text-xs text-[#62676B]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Complete student & faculty lifecycle</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Cross-department enrollment metrics</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Academic calendar and exam controls</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Institution-wide performance reports</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#DBDBD9]">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-[#F9A51B] hover:text-[#E58E08] inline-flex items-center gap-1"
                >
                  Admin Portal →
                </Link>
              </div>
            </div>

            {/* Teacher */}
            <div className="bg-[#F9F9F8] rounded-xl border border-[#DBDBD9] p-6 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                  <Users className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#131313]">Teacher</h3>
                <p className="text-xs font-medium text-[#F9A51B] mt-0.5 mb-3">
                  “Spend less time managing records and more time supporting students.”
                </p>
                <ul className="space-y-2 text-xs text-[#62676B]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>1-click daily attendance recording</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Create & evaluate assignments</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Enter marks and compute grades</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Class rosters and contact details</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#DBDBD9]">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-[#F9A51B] hover:text-[#E58E08] inline-flex items-center gap-1"
                >
                  Faculty Portal →
                </Link>
              </div>
            </div>

            {/* Student */}
            <div className="bg-[#F9F9F8] rounded-xl border border-[#DBDBD9] p-6 flex flex-col justify-between">
              <div>
                <div className="w-8 h-8 rounded-lg bg-[#FFF2D7] text-[#F9A51B] flex items-center justify-center mb-4">
                  <GraduationCap className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#131313]">Student</h3>
                <p className="text-xs font-medium text-[#F9A51B] mt-0.5 mb-3">
                  “Stay informed about courses, attendance, assignments, and results.”
                </p>
                <ul className="space-y-2 text-xs text-[#62676B]">
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Live syllabus progress tracking</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Attendance percentage records</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Assignment submission portal</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-[#23845B]" />
                    <span>Published exam grade report card</span>
                  </li>
                </ul>
              </div>
              <div className="mt-6 pt-4 border-t border-[#DBDBD9]">
                <Link
                  to="/login"
                  className="text-xs font-semibold text-[#F9A51B] hover:text-[#E58E08] inline-flex items-center gap-1"
                >
                  Student Portal →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 sm:py-20 bg-[#FFF2D7]/50 border-b border-[#DBDBD9]">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-[#131313]">
            Bring your academic operations together.
          </h2>
          <p className="text-sm sm:text-base text-[#62676B] max-w-xl mx-auto">
            Start with a clearer, more organized way to manage everyday academic work.
          </p>
          <div className="pt-2">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold text-sm shadow-xs transition-colors"
            >
              <span>Access EOMS</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white py-12 text-xs text-[#62676B]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8 pb-8 border-b border-[#DBDBD9]">
            <div className="md:col-span-1 space-y-3">
              <Logo size="sm" />
              <p className="text-[11px] text-[#62676B] leading-relaxed">
                Centralized academic operations management platform designed for universities, colleges, and schools.
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-[#131313] mb-3">Platform</h4>
              <ul className="space-y-2">
                <li><a href="#features" className="hover:text-[#131313]">Features</a></li>
                <li><a href="#modules" className="hover:text-[#131313]">Modules</a></li>
                <li><a href="#how-it-works" className="hover:text-[#131313]">How It Works</a></li>
                <li><a href="#roles" className="hover:text-[#131313]">Role Workspaces</a></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#131313] mb-3">Portals</h4>
              <ul className="space-y-2">
                <li><Link to="/login" className="hover:text-[#131313]">Administrator Login</Link></li>
                <li><Link to="/login" className="hover:text-[#131313]">Faculty Login</Link></li>
                <li><Link to="/login" className="hover:text-[#131313]">Student Portal</Link></li>
                <li><Link to="/register" className="hover:text-[#131313]">Student Registration</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-semibold text-[#131313] mb-3">Institutional Policy</h4>
              <ul className="space-y-2">
                <li><span className="hover:text-[#131313] cursor-pointer">Privacy Policy</span></li>
                <li><span className="hover:text-[#131313] cursor-pointer">Terms of Service</span></li>
                <li><span className="hover:text-[#131313] cursor-pointer">Academic Integrity</span></li>
                <li><span className="hover:text-[#131313] cursor-pointer">Security Standards</span></li>
              </ul>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#919A9F]">
            <p>© {currentYear} EOMS — Education Operation Management System. All rights reserved.</p>
            <p>Designed with warm, minimal typography & accessibility standards.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
