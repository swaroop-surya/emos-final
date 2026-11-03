import React from 'react';
import { LogOut, X, AlertTriangle } from 'lucide-react';

export interface LogoutConfirmModalProps {
  isOpen: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

export const LogoutConfirmModal: React.FC<LogoutConfirmModalProps> = ({
  isOpen,
  onCancel,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs transition-opacity duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-modal-title"
    >
      <div className="relative w-full max-w-sm bg-white rounded-2xl border border-[#DBDBD9] p-6 shadow-2xl text-center animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 p-1.5 text-[#919A9F] hover:text-[#131313] hover:bg-[#F3F3F1] rounded-lg transition-colors cursor-pointer"
          aria-label="Cancel sign out"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Warning Icon */}
        <div className="mx-auto mb-3.5 w-14 h-14 rounded-2xl bg-[#FFF2D7] text-[#F9A51B] border border-[#FAC95A] flex items-center justify-center shadow-xs">
          <LogOut className="w-7 h-7 text-[#E58E08]" />
        </div>

        <h3 id="logout-modal-title" className="text-lg font-bold text-[#131313]">
          Confirm Sign Out
        </h3>

        <p className="text-xs text-[#62676B] mt-1.5 leading-relaxed">
          Are you sure you want to end your current educational session? You will be returned to the landing page.
        </p>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-2.5 px-4 rounded-xl border border-[#DBDBD9] bg-white hover:bg-[#F3F3F1] text-xs font-semibold text-[#131313] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex-1 py-2.5 px-4 rounded-xl bg-[#C44940] hover:bg-red-700 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};
