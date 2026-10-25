import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { Logo } from '../components/common/Logo';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Password strength checker
  const getPasswordStrength = () => {
    if (!password) return { score: 0, text: 'None', color: 'bg-gray-200' };
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 1) return { score: 1, text: 'Weak', color: 'bg-[#C44940]' };
    if (score === 2) return { score: 2, text: 'Moderate', color: 'bg-[#A66A00]' };
    return { score: 3, text: 'Strong', color: 'bg-[#23845B]' };
  };

  const strength = getPasswordStrength();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid educational or personal email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters long.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Institutional Terms and Student Policy.');
      return;
    }

    setIsLoading(true);
    // Public registration securely enforces Student role as per security policy
    const res = await register(fullName, email, password, 'student');
    setIsLoading(false);

    if (res.success) {
      showToast({
        type: 'success',
        title: 'Registration Successful!',
        message: `Welcome to EOMS, ${fullName.trim()}! Your student workspace is ready.`,
      });
      navigate('/app/dashboard');
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-xl bg-white rounded-2xl border border-[#DBDBD9] shadow-sm p-6 sm:p-10">
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Student Registration
          </h1>
          <p className="text-xs text-[#62676B] mt-1">
            Create your institutional account to access your courses, attendance, and grades.
          </p>
        </div>

        {/* Role Policy Notice as required by Master Prompt Section 8 */}
        <div className="mb-6 p-3.5 rounded-xl bg-[#FFF2D7] border border-[#FAC95A]/70 text-xs text-[#131313] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#F9A51B] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Institutional Access Policy</p>
            <p className="text-[11px] text-[#62676B] mt-0.5 leading-relaxed">
              Public self-registration assigns the <strong>Student</strong> role. Faculty, Department HODs, and Administrators must be provisioned directly by the Academic Registrar.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#FCEBE9] border border-[#C44940]/30 text-[#C44940] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#131313] mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Varshith Reddy"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B]"
              />
            </div>
          </div>

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
                placeholder="student.name@institution.edu"
                className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-[#131313] mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 6 characters"
                  className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="p-1.5 text-[#919A9F] hover:text-[#131313] absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-[#131313] mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B]"
                />
              </div>
            </div>
          </div>

          {/* Password strength bar */}
          {password && (
            <div className="space-y-1">
              <div className="flex justify-between text-[11px] text-[#62676B]">
                <span>Password strength: <strong>{strength.text}</strong></span>
              </div>
              <div className="h-1.5 w-full bg-[#F3F3F1] rounded-full overflow-hidden flex gap-1">
                <div
                  className={`h-full rounded-full transition-all ${
                    strength.score >= 1 ? strength.color : 'bg-transparent'
                  }`}
                  style={{ width: '33%' }}
                />
                <div
                  className={`h-full rounded-full transition-all ${
                    strength.score >= 2 ? strength.color : 'bg-transparent'
                  }`}
                  style={{ width: '33%' }}
                />
                <div
                  className={`h-full rounded-full transition-all ${
                    strength.score >= 3 ? strength.color : 'bg-transparent'
                  }`}
                  style={{ width: '34%' }}
                />
              </div>
            </div>
          )}

          <div className="pt-2">
            <label className="flex items-start cursor-pointer">
              <input
                type="checkbox"
                required
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="mt-0.5 w-4 h-4 text-[#F9A51B] border-[#DBDBD9] rounded-sm focus:ring-[#F9A51B]"
              />
              <span className="ml-2 text-xs text-[#62676B]">
                I agree to the institutional academic honor code, attendance requirements, and terms of service.
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 px-4 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 mt-4"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Creating Student Account...</span>
              </>
            ) : (
              <>
                <span>Complete Registration</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-6 mt-6 border-t border-[#DBDBD9]/60 text-xs text-[#62676B]">
          Already have an account?{' '}
          <Link to="/login" className="font-semibold text-[#F9A51B] hover:underline">
            Sign In here
          </Link>
        </div>
      </div>
    </div>
  );
};
