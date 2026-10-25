import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  variant?: 'light' | 'dark' | 'orange';
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  showSubtitle = true,
  variant = 'orange',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  const textSizes = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const subtitleSizes = {
    sm: 'text-[10px]',
    md: 'text-[11px]',
    lg: 'text-xs',
  };

  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      {/* Restrained geometric graduation cap & open book mark */}
      <div
        className={`${iconSizes[size]} rounded-lg flex items-center justify-center shrink-0 transition-colors ${
          variant === 'light'
            ? 'bg-white text-[#F9A51B] shadow-xs'
            : 'bg-[#F9A51B] text-white shadow-xs'
        }`}
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-5/7 h-5/7"
        >
          {/* Graduation Cap */}
          <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
          {/* Cap hanging tassel & bottom book curve */}
          <path d="M6 12v5c3 3 9 3 12 0v-5" />
        </svg>
      </div>

      <div className="flex flex-col leading-none">
        <span
          className={`font-bold tracking-tight ${textSizes[size]} ${
            variant === 'light' ? 'text-white' : 'text-[#131313]'
          }`}
        >
          EOMS
        </span>
        {showSubtitle && (
          <span
            className={`font-medium tracking-normal mt-0.5 ${subtitleSizes[size]} ${
              variant === 'light' ? 'text-amber-100' : 'text-[#62676B]'
            }`}
          >
            Education Management
          </span>
        )}
      </div>
    </div>
  );
};
