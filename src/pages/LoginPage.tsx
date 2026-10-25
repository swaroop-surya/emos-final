import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Logo } from '../components/common/Logo';
import { UserRole } from '../types';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  BookOpen,
  AlertCircle,
} from 'lucide-react';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!email.trim()) {
      setError('Please provide an email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setIsLoading(true);
    const res = await login(email, password);
    setIsLoading(false);

    if (res.success) {
      showToast({
        type: 'success',
        title: 'Logged In Successfully!',
        message: 'Welcome back to your EOMS workspace.',
      });
      const from = (location.state as any)?.from?.pathname || '/app/dashboard';
      navigate(from, { replace: true });
    } else {
      setError(res.error || 'Authentication failed. Please verify credentials.');
    }
  };

  // Quick 1-click test helpers to fill credentials
  const fillDemoCredentials = (role: UserRole) => {
    setError(null);
    if (role === 'admin') {
      setEmail('admin@eoms.edu');
      setPassword('admin123');
    } else if (role === 'teacher') {
      setEmail('teacher@eoms.edu');
      setPassword('teacher123');
    } else {
      setEmail('student@eoms.edu');
      setPassword('student123');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* 2-Panel Desktop Container matching reference Screenshot 1 */}
      <div className="w-full max-w-5xl bg-white rounded-2xl border border-[#DBDBD9] shadow-sm overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
        {/* Left Panel: Warm Educational Brand Preview */}
        <div className="hidden lg:flex lg:col-span-5 bg-gradient-to-br from-[#FFF2D7] via-[#FFF9EE] to-white p-10 flex-col justify-between border-r border-[#DBDBD9] relative overflow-hidden">
          {/* Subtle geometric circles */}
          <div className="absolute -top-12 -left-12 w-48 h-48 rounded-full bg-[#FAC95A]/20 pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full bg-[#F9A51B]/15 pointer-events-none" />

          <div className="relative z-10">
            <Logo size="lg" />

            <div className="mt-12 space-y-3">
              <span className="text-[11px] font-semibold text-[#F9A51B] uppercase tracking-wider bg-white/80 px-2.5 py-1 rounded-full border border-[#FAC95A]/50">
                Operational Excellence
              </span>
              <h2 className="text-2xl font-bold text-[#131313] leading-snug">
                A clearer way to manage education.
              </h2>
              <p className="text-xs text-[#62676B] leading-relaxed">
                Centralized academic administration for students, faculty, and administrative leadership.
              </p>
            </div>
          </div>

          {/* Miniature dashboard preview card matching Screenshot 1 */}
          <div className="relative z-10 bg-white p-4 rounded-xl border border-[#DBDBD9] shadow-2xs space-y-3">
            <div className="flex items-center justify-between text-xs font-semibold text-[#131313]">
              <span>Active Semester</span>
              <span className="text-[10px] text-[#23845B] bg-[#E6F4EC] px-2 py-0.5 rounded-full">
                Live Term
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs">
              <div className="p-2 bg-[#F9F9F8] rounded-lg border border-[#DBDBD9]/60">
                <span className="text-[10px] text-[#62676B] block">Students</span>
                <strong className="text-sm text-[#131313] font-bold">248</strong>
              </div>
              <div className="p-2 bg-[#F9F9F8] rounded-lg border border-[#DBDBD9]/60">
                <span className="text-[10px] text-[#62676B] block">Attendance</span>
                <strong className="text-sm text-[#F9A51B] font-bold">92%</strong>
              </div>
            </div>
            <p className="text-[10px] text-[#919A9F] text-center">
              Multi-role access enforcement active
            </p>
          </div>

          <div className="relative z-10 text-[11px] text-[#62676B]">
            © {new Date().getFullYear()} EOMS Platform
          </div>
        </div>

        {/* Right Panel: Login Form matching Screenshot 1 */}
        <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md w-full mx-auto space-y-6">
            <div>
              <div className="lg:hidden mb-6">
                <Logo size="md" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
                Welcome Back!
              </h1>
              <p className="text-xs text-[#62676B] mt-1">
                Sign in to your account to continue to your workspace.
              </p>
            </div>

            {/* Quick Demo Pre-fill Pill Buttons */}
            <div className="p-3 bg-[#F9F9F8] rounded-xl border border-[#DBDBD9] space-y-2">
              <span className="text-[11px] font-semibold text-[#62676B] block">
                Quick Test Credentials:
              </span>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('admin')}
                  className="px-2 py-1.5 rounded-lg bg-white hover:bg-[#FFF2D7] text-[#131313] text-xs font-medium border border-[#DBDBD9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#F9A51B]" />
                  <span>Admin</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('teacher')}
                  className="px-2 py-1.5 rounded-lg bg-white hover:bg-[#FFF2D7] text-[#131313] text-xs font-medium border border-[#DBDBD9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <BookOpen className="w-3.5 h-3.5 text-[#F9A51B]" />
                  <span>Teacher</span>
                </button>
                <button
                  type="button"
                  onClick={() => fillDemoCredentials('student')}
                  className="px-2 py-1.5 rounded-lg bg-white hover:bg-[#FFF2D7] text-[#131313] text-xs font-medium border border-[#DBDBD9] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <GraduationCap className="w-3.5 h-3.5 text-[#F9A51B]" />
                  <span>Student</span>
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="p-3 rounded-lg bg-[#FCEBE9] border border-[#C44940]/30 text-[#C44940] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-[#131313] mb-1.5">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. admin@eoms.edu"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B] transition-all"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-medium text-[#131313]">
                    Password
                  </label>
                  <Link
                    to="/forgot-password"
                    className="text-xs text-[#F9A51B] hover:text-[#E58E08] font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B] transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="p-1.5 text-[#919A9F] hover:text-[#131313] absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center">
                <input
                  id="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 text-[#F9A51B] border-[#DBDBD9] rounded-sm focus:ring-[#F9A51B]"
                />
                <label htmlFor="remember-me" className="ml-2 block text-xs text-[#62676B] cursor-pointer">
                  Remember this device
                </label>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2.5 px-4 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Verifying credentials...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2 border-t border-[#DBDBD9]/60">
              <p className="text-xs text-[#62676B]">
                New student without an account?{' '}
                <Link to="/register" className="font-semibold text-[#F9A51B] hover:underline">
                  Register as Student
                </Link>
              </p>
              <p className="text-[11px] text-[#919A9F] mt-1">
                Faculty & Administrator access is provisioned by the Academic Registrar.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
