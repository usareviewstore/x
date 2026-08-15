import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { useToast } from '../context/ToastContext';

interface CopyButtonProps {
  text: string;
  label?: string;
  className?: string;
}

export const CopyButton: React.FC<CopyButtonProps> = ({ text, label = 'Copy Address', className = '' }) => {
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      showToast('Copied to Clipboard!', text.length > 25 ? `${text.substring(0, 25)}...` : text, 'success');
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      showToast('Copy Failed', 'Please copy manually.', 'error');
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`inline-flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 border shadow-xs active:scale-95 cursor-pointer ${
        copied
          ? 'bg-emerald-600 text-white border-emerald-600'
          : 'bg-indigo-600 text-white hover:bg-indigo-700 border-indigo-600'
      } ${className}`}
    >
      {copied ? (
        <>
          <Check className="w-4 h-4 text-white" />
          <span>Copied!</span>
        </>
      ) : (
        <>
          <Copy className="w-4 h-4" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
