import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Logo } from '../components/common/Logo';
import { Mail, ArrowLeft, CheckCircle2, AlertCircle } from 'lucide-react';

export const ForgotPasswordPage: React.FC = () => {
  const { forgotPassword } = useAuth();
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid institutional email address.');
      return;
    }

    setIsLoading(true);
    const res = await forgotPassword(email);
    setIsLoading(false);
    setSubmitted(true);
    setMessage(res.message);
  };

  return (
    <div className="min-h-screen bg-[#F9F9F8] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-2xl border border-[#DBDBD9] shadow-sm p-6 sm:p-8">
        <div className="text-center mb-6">
          <div className="inline-block mb-3">
            <Logo size="md" />
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-[#131313]">
            Reset Password
          </h1>
          <p className="text-xs text-[#62676B] mt-1">
            Enter your institutional email address and we will dispatch password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="space-y-4">
            <div className="p-4 rounded-xl bg-[#E6F4EC] border border-[#23845B]/30 text-xs text-[#23845B] flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-sm">Dispatched Successfully</p>
                <p className="mt-1 leading-relaxed text-[#131313]">{message}</p>
              </div>
            </div>

            <Link
              to="/login"
              className="w-full py-2.5 px-4 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Sign In</span>
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="p-3 rounded-lg bg-[#FCEBE9] border border-[#C44940]/30 text-[#C44940] text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-medium text-[#131313] mb-1.5">
                Registered Institutional Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#919A9F] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@eoms.edu"
                  className="w-full pl-9 pr-4 py-2.5 bg-white border border-[#DBDBD9] rounded-lg text-xs text-[#131313] placeholder-[#919A9F] focus:outline-hidden focus:border-[#F9A51B] focus:ring-1 focus:ring-[#F9A51B]"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-2.5 px-4 rounded-lg bg-[#F9A51B] hover:bg-[#E58E08] text-white text-xs font-semibold shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isLoading ? 'Sending instructions...' : 'Send Recovery Instructions'}
            </button>

            <div className="text-center pt-2">
              <Link
                to="/login"
                className="text-xs text-[#62676B] hover:text-[#131313] inline-flex items-center gap-1.5"
              >
                <ArrowLeft className="w-3 h-3" />
                <span>Back to Login</span>
              </Link>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
