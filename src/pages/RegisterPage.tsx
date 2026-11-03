import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { CenteredPopup } from '../components/common/CenteredPopup';
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Check,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  ShieldCheck,
  Sparkles,
  KeyRound,
} from 'lucide-react';

export const RegisterPage: React.FC = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [passwordNotice, setPasswordNotice] = useState<string | null>(null);

  // Centered Notification Popup state
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  // 5-Criteria Checklist definitions
  const criteria = [
    {
      id: 'length',
      label: 'At least 8 characters',
      met: password.length >= 8,
    },
    {
      id: 'uppercase',
      label: 'At least one uppercase letter (A-Z)',
      met: /[A-Z]/.test(password),
    },
    {
      id: 'lowercase',
      label: 'At least one lowercase letter (a-z)',
      met: /[a-z]/.test(password),
    },
    {
      id: 'number',
      label: 'At least one number (0-9)',
      met: /[0-9]/.test(password),
    },
    {
      id: 'special',
      label: 'At least one special symbol (!@#$%^&*)',
      met: /[!@#$%^&*]/.test(password),
    },
  ];

  const metCount = criteria.filter((c) => c.met).length;
  const isAllCriteriaMet = metCount === 5;

  // Real-time visual indicator displaying Weak, Moderate, or Strong & Verified status
  const getStrengthMeter = () => {
    if (!password) {
      return {
        label: 'Not Entered',
        percentage: 0,
        barColor: 'bg-neutral-200',
        textColor: 'text-[#919A9F]',
        badgeBg: 'bg-[#F3F3F1]',
        isStrong: false,
      };
    }
    if (metCount <= 2) {
      return {
        label: 'Weak',
        percentage: Math.max(20, metCount * 20),
        barColor: 'bg-[#C44940]',
        textColor: 'text-[#C44940]',
        badgeBg: 'bg-[#FCEBE9]',
        isStrong: false,
      };
    }
    if (metCount <= 4) {
      return {
        label: 'Moderate',
        percentage: metCount * 20,
        barColor: 'bg-[#A66A00]',
        textColor: 'text-[#A66A00]',
        badgeBg: 'bg-[#FFF3D6]',
        isStrong: false,
      };
    }
    return {
      label: 'Strong & Verified',
      percentage: 100,
      barColor: 'bg-[#23845B]',
      textColor: 'text-[#23845B]',
      badgeBg: 'bg-[#E6F4EC]',
      isStrong: true,
    };
  };

  const strength = getStrengthMeter();

  // "Suggest Strong Password" Generator
  const handleSuggestPassword = () => {
    const uppers = 'ABCDEFGHJKLMNPQRSTUVWXYZ';
    const lowers = 'abcdefghijkmnopqrstuvwxyz';
    const numbers = '23456789';
    const specials = '!@#$%^&*';

    // Guarantee 2 of each required category
    const generated: string[] = [
      uppers[Math.floor(Math.random() * uppers.length)],
      uppers[Math.floor(Math.random() * uppers.length)],
      lowers[Math.floor(Math.random() * lowers.length)],
      lowers[Math.floor(Math.random() * lowers.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      numbers[Math.floor(Math.random() * numbers.length)],
      specials[Math.floor(Math.random() * specials.length)],
      specials[Math.floor(Math.random() * specials.length)],
    ];

    const allChars = uppers + lowers + numbers + specials;
    while (generated.length < 15) {
      generated.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    // Shuffle characters
    for (let i = generated.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [generated[i], generated[j]] = [generated[j], generated[i]];
    }

    const securePass = generated.join('');
    setPassword(securePass);
    setConfirmPassword(securePass);
    setShowPassword(true); // reveals text for safety
    setError(null);
    setPasswordNotice('Secure high-entropy password generated and applied!');
    setTimeout(() => setPasswordNotice(null), 4000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!fullName.trim()) {
      setError('Please enter your full legal name.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid educational or personal email address.');
      return;
    }
    if (!isAllCriteriaMet) {
      setError('Password must satisfy all 5 verification criteria before registering.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match. Please ensure both fields are identical.');
      return;
    }
    if (!agreeTerms) {
      setError('Please accept the Institutional Terms and Student Policy.');
      return;
    }

    setIsLoading(true);
    // AutoLogin is false for post-registration transition to login
    const res = await register(fullName, email, password, 'student', false);
    setIsLoading(false);

    if (res.success) {
      setRegisteredEmail(email.trim());
      setShowSuccessPopup(true);
    } else {
      setError(res.error || 'Registration failed.');
    }
  };

  const handleProceedToLogin = () => {
    setShowSuccessPopup(false);
    navigate('/login', {
      state: {
        email: registeredEmail,
        registeredSuccess: true,
      },
    });
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-4 sm:p-6 lg:p-8 font-sans">
      {/* Centered Notification Popup for Registration */}
      <CenteredPopup
        isOpen={showSuccessPopup}
        type="success"
        title="Account Created Successfully!"
        message={`Welcome, ${fullName.trim()}! Your institutional student account is created and verified. Transitioning to Sign In...`}
        actionText="Proceed to Sign In"
        onAction={handleProceedToLogin}
        autoCloseMs={2800}
      />

      <div className="w-full max-w-xl bg-white rounded-2xl border border-[#DBDBD9] shadow-sm p-6 sm:p-10">
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Student Registration
          </h1>
          <p className="text-xs text-[#62676B] mt-1">
            Create your verified student account with high-grade security credentials.
          </p>
        </div>

        {/* Institutional policy note */}
        <div className="mb-6 p-3.5 rounded-xl bg-[#FFF2D7] border border-[#FAC95A]/70 text-xs text-[#131313] flex items-start gap-2.5">
          <ShieldCheck className="w-4 h-4 text-[#F9A51B] shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold">Institutional Access Policy</p>
            <p className="text-[11px] text-[#62676B] mt-0.5 leading-relaxed">
              Public self-registration assigns the <strong>Student</strong> role. Faculty, Department HODs, and Administrators are provisioned by the Academic Registrar.
            </p>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-[#FCEBE9] border border-[#C44940]/30 text-[#C44940] text-xs flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {passwordNotice && (
          <div className="mb-4 p-3 rounded-lg bg-[#E6F4EC] border border-[#23845B]/30 text-[#23845B] text-xs flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{passwordNotice}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#131313] mb-1.5">
              Full Legal Name *
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
              Institutional or Personal Email Address *
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

          {/* Password Section with Suggest Strong Password Header */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between">
              <label className="block text-xs font-medium text-[#131313]">
                Password *
              </label>

              {/* "Suggest Strong Password" Button */}
              <button
                type="button"
                onClick={handleSuggestPassword}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-[#FFF2D7] text-[#131313] hover:bg-[#F9A51B] hover:text-white border border-[#FAC95A] transition-colors cursor-pointer"
                title="Generate a secure high-entropy password that meets all 5 criteria"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#E58E08]" />
                <span>Suggest Strong Password</span>
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full pl-9 pr-10 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="p-1.5 text-[#919A9F] hover:text-[#131313] absolute right-2.5 top-1/2 -translate-y-1/2 cursor-pointer"
                    title={showPassword ? 'Hide password' : 'Show password text for safety'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm password"
                    className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B]"
                  />
                </div>
              </div>
            </div>

            {/* Password Strength Meter */}
            <div className="mt-3 p-3 bg-[#F9F9F8] rounded-xl border border-[#DBDBD9] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#62676B] font-medium">Password Strength:</span>
                <span
                  className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold ${strength.badgeBg} ${strength.textColor}`}
                >
                  {strength.isStrong && <CheckCircle2 className="w-3.5 h-3.5" />}
                  <span>{strength.label}</span>
                </span>
              </div>

              {/* Progress meter bar */}
              <div className="h-2 w-full bg-[#E5E5E3] rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${strength.barColor}`}
                  style={{ width: `${strength.percentage}%` }}
                />
              </div>

              {/* Live 5-Criteria Verification Checklist */}
              <div className="pt-2 border-t border-[#DBDBD9]/60">
                <span className="text-[10px] uppercase tracking-wider font-bold text-[#919A9F] block mb-1.5">
                  Live 5-Criteria Verification Checklist:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-[11px]">
                  {criteria.map((item) => (
                    <div
                      key={item.id}
                      className={`flex items-center gap-1.5 transition-colors ${
                        item.met ? 'text-[#23845B] font-medium' : 'text-[#919A9F]'
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full flex items-center justify-center shrink-0 text-[10px] ${
                          item.met
                            ? 'bg-[#E6F4EC] text-[#23845B] border border-[#23845B]/30'
                            : 'bg-[#F3F3F1] text-[#919A9F] border border-[#DBDBD9]'
                        }`}
                      >
                        {item.met ? <Check className="w-2.5 h-2.5 stroke-[3]" /> : '•'}
                      </div>
                      <span>{item.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

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
            disabled={isLoading || !isAllCriteriaMet}
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
