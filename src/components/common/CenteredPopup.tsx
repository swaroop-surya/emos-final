import React, { useEffect } from 'react';
import { CheckCircle2, AlertCircle, Info, ArrowRight, X } from 'lucide-react';

export interface CenteredPopupProps {
  isOpen: boolean;
  type?: 'success' | 'info' | 'warning';
  title: string;
  message: string;
  actionText?: string;
  onAction?: () => void;
  onClose?: () => void;
  autoCloseMs?: number;
}

export const CenteredPopup: React.FC<CenteredPopupProps> = ({
  isOpen,
  type = 'success',
  title,
  message,
  actionText,
  onAction,
  onClose,
  autoCloseMs,
}) => {
  useEffect(() => {
    if (!isOpen || !autoCloseMs) return;
    const timer = setTimeout(() => {
      if (onAction) {
        onAction();
      } else if (onClose) {
        onClose();
      }
    }, autoCloseMs);
    return () => clearTimeout(timer);
  }, [isOpen, autoCloseMs, onAction, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
    >
      <div className="relative w-full max-w-sm sm:max-w-md bg-white rounded-2xl border border-[#DBDBD9] p-6 sm:p-8 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
        {onClose && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 text-[#919A9F] hover:text-[#131313] hover:bg-[#F3F3F1] rounded-lg transition-colors cursor-pointer"
            aria-label="Close notification"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {/* Status Icon */}
        <div className="mx-auto mb-4 flex items-center justify-center">
          {type === 'success' && (
            <div className="w-14 h-14 rounded-2xl bg-[#E6F4EC] text-[#23845B] border border-[#23845B]/20 flex items-center justify-center shadow-xs">
              <CheckCircle2 className="w-8 h-8" />
            </div>
          )}
          {type === 'warning' && (
            <div className="w-14 h-14 rounded-2xl bg-[#FFF3D6] text-[#A66A00] border border-[#FAC95A] flex items-center justify-center shadow-xs">
              <AlertCircle className="w-8 h-8" />
            </div>
          )}
          {type === 'info' && (
            <div className="w-14 h-14 rounded-2xl bg-[#FFF2D7] text-[#F9A51B] border border-[#FAC95A] flex items-center justify-center shadow-xs">
              <Info className="w-8 h-8" />
            </div>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-tight text-[#131313]">
          {title}
        </h3>

        <p className="text-xs sm:text-sm text-[#62676B] mt-2 leading-relaxed">
          {message}
        </p>

        {autoCloseMs && (
          <div className="mt-4 w-full h-1 bg-[#F3F3F1] rounded-full overflow-hidden">
            <div
              className="h-full bg-[#F9A51B] rounded-full animate-[shrink_linear_forwards]"
              style={{
                animationDuration: `${autoCloseMs}ms`,
              }}
            />
          </div>
        )}

        {actionText && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => {
                if (onAction) onAction();
                else if (onClose) onClose();
              }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#F9A51B] hover:bg-[#E58E08] text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors cursor-pointer"
            >
              <span>{actionText}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
