import React from 'react';
import { useCoupon } from '../context/CouponContext';
import { CheckCircle2, AlertCircle, Info, XCircle, X } from 'lucide-react';

export const ToastContainer: React.FC = () => {
  const { toasts, removeToast } = useCoupon();

  if (toasts.length === 0) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2 max-w-md w-full px-4 pointer-events-none">
      {toasts.map(toast => {
        const icons = {
          success: <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />,
          warning: <AlertCircle className="w-5 h-5 text-amber-500 shrink-0" />,
          error: <XCircle className="w-5 h-5 text-rose-500 shrink-0" />,
          info: <Info className="w-5 h-5 text-blue-500 shrink-0" />
        };

        const borders = {
          success: 'border-emerald-200 bg-white',
          warning: 'border-amber-200 bg-white',
          error: 'border-rose-200 bg-white',
          info: 'border-blue-200 bg-white'
        };

        return (
          <div
            key={toast.id}
            className={`pointer-events-auto flex items-center justify-between p-4 rounded-xl shadow-lg border ${borders[toast.type]} transition-all animate-in slide-in-from-right duration-200`}
          >
            <div className="flex items-center gap-3">
              {icons[toast.type]}
              <span className="text-sm font-medium text-slate-800">{toast.text}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-slate-400 hover:text-slate-600 transition-colors ml-3 p-1 rounded-md"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        );
      })}
    </div>
  );
};

