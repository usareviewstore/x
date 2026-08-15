import React from 'react';
import { OrderStatus } from '../types';
import { Clock, CheckCircle2, AlertCircle, RefreshCw, XCircle } from 'lucide-react';

interface OrderStatusBadgeProps {
  status: OrderStatus;
  className?: string;
}

export const OrderStatusBadge: React.FC<OrderStatusBadgeProps> = ({ status, className = '' }) => {
  const getStatusConfig = (st: OrderStatus) => {
    switch (st) {
      case 'Pending Payment':
        return {
          label: 'Pending Payment',
          bg: 'bg-amber-50 text-amber-800 border-amber-200',
          icon: Clock,
        };
      case 'Payment Submitted':
      case 'Payment Verification':
        return {
          label: 'Payment Verification',
          bg: 'bg-blue-50 text-blue-800 border-blue-200',
          icon: RefreshCw,
        };
      case 'Payment Confirmed':
        return {
          label: 'Payment Confirmed',
          bg: 'bg-emerald-50 text-emerald-800 border-emerald-200',
          icon: CheckCircle2,
        };
      case 'Processing':
        return {
          label: 'In Progress',
          bg: 'bg-indigo-50 text-indigo-800 border-indigo-200',
          icon: RefreshCw,
        };
      case 'Completed':
        return {
          label: 'Completed',
          bg: 'bg-emerald-100 text-emerald-900 border-emerald-300',
          icon: CheckCircle2,
        };
      case 'Cancelled':
        return {
          label: 'Cancelled',
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: XCircle,
        };
      case 'Refund Requested':
      case 'Refunded':
        return {
          label: st,
          bg: 'bg-rose-50 text-rose-800 border-rose-200',
          icon: AlertCircle,
        };
      default:
        return {
          label: st,
          bg: 'bg-slate-50 text-slate-800 border-slate-200',
          icon: Clock,
        };
    }
  };

  const config = getStatusConfig(status);
  const Icon = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${config.bg} ${className}`}
    >
      <Icon className="w-3.5 h-3.5 animate-spin-slow" />
      <span>{config.label}</span>
    </span>
  );
};
