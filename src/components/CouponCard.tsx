import React from 'react';
import type { Coupon } from '../types';
import { useCoupon } from '../context/CouponContext';
import { 
  Ticket, 
  Tag, 
  Percent, 
  Gift, 
  ArrowRight,
  ShieldCheck,
  Clock,
  Layers
} from 'lucide-react';

interface CouponCardProps {
  coupon: Coupon;
}

export const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const { setSelectedCouponForDetail } = useCoupon();

  const now = new Date();
  const endDate = new Date(coupon.validityEnd);
  const isExpired = endDate < now;
  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  const isExpiringSoon = !isExpired && daysLeft <= 5;
  const isOutOfStock = coupon.quantity <= 0;

  // Icon and badge styling based on coupon type
  const getTypeMeta = (type: Coupon['couponType']) => {
    switch (type) {
      case 'E-Voucher':
        return {
          icon: <Ticket className="w-4 h-4 text-emerald-600" />,
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-200'
        };
      case 'Coupon Code':
        return {
          icon: <Tag className="w-4 h-4 text-blue-600" />,
          bg: 'bg-blue-50 text-blue-700 border-blue-200'
        };
      case 'Discount':
        return {
          icon: <Percent className="w-4 h-4 text-purple-600" />,
          bg: 'bg-purple-50 text-purple-700 border-purple-200'
        };
      case 'Gift Card':
        return {
          icon: <Gift className="w-4 h-4 text-amber-600" />,
          bg: 'bg-amber-50 text-amber-700 border-amber-200'
        };
      default:
        return {
          icon: <Ticket className="w-4 h-4 text-slate-600" />,
          bg: 'bg-slate-50 text-slate-700 border-slate-200'
        };
    }
  };

  const typeMeta = getTypeMeta(coupon.couponType);

  // Price calculations & exchange style
  const renderExchangeBadge = () => {
    if (coupon.exchangeType === 'Free') {
      return (
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Exchange Value</span>
          <span className="text-xl font-black text-emerald-600 tracking-tight">FREE</span>
          <span className="text-[11px] text-emerald-700 font-medium">Community Giveaway</span>
        </div>
      );
    }

    if (coupon.exchangeType === 'Exchange') {
      return (
        <div className="flex flex-col">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Exchange Value</span>
          <span className="text-base font-bold text-indigo-700 tracking-tight">Coupon Barter</span>
          <span className="text-[11px] text-slate-500 truncate max-w-[140px]" title={coupon.exchangeInfo}>
            {coupon.exchangeInfo || 'Looking for options'}
          </span>
        </div>
      );
    }

    // Cash or Any
    const discountPercent = coupon.couponPrice > 0 && coupon.exchangePrice > 0
      ? Math.round(((coupon.couponPrice - coupon.exchangePrice) / coupon.couponPrice) * 100)
      : null;

    return (
      <div className="flex flex-col">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Exchange Price</span>
        <div className="flex items-baseline gap-1.5">
          <span className="text-xl font-black text-[#19222d] tracking-tight">
            ₹{coupon.exchangePrice.toLocaleString('en-IN')}
          </span>
          {discountPercent !== null && discountPercent > 0 && (
            <span className="bg-rose-100 text-rose-700 font-extrabold text-[10px] px-1.5 py-0.5 rounded">
              {discountPercent}% OFF
            </span>
          )}
        </div>
        <span className="text-[11px] text-slate-500">
          {coupon.negotiable ? 'Negotiable with seller' : 'Fixed offer'}
        </span>
      </div>
    );
  };

  return (
    <div 
      className={`group bg-white rounded-2xl border transition-all duration-200 flex flex-col justify-between overflow-hidden shadow-xs hover:shadow-lg hover:-translate-y-0.5 ${
        isExpired 
          ? 'border-slate-200 opacity-60 bg-slate-50' 
          : 'border-slate-200/80 hover:border-amber-300'
      }`}
    >
      {/* Top Banner & Badges */}
      <div className="p-4 sm:p-5 pb-3">
        <div className="flex items-center justify-between gap-2 mb-2.5">
          {/* Coupon Type Badge */}
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border ${typeMeta.bg}`}>
            {typeMeta.icon}
            <span>{coupon.couponType}</span>
          </div>

          {/* Expiry / Stock Badge */}
          {isExpired ? (
            <span className="text-[11px] font-bold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-md border border-rose-200">
              Expired
            </span>
          ) : isOutOfStock ? (
            <span className="text-[11px] font-bold text-slate-600 bg-slate-100 px-2 py-0.5 rounded-md">
              Claimed
            </span>
          ) : isExpiringSoon ? (
            <span className="flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
              <Clock className="w-3 h-3 text-amber-600" />
              <span>{daysLeft}d left</span>
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-500">
              Valid till {endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
            </span>
          )}
        </div>

        {/* Title & Category */}
        <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-amber-600 transition-colors line-clamp-2">
          {coupon.title}
        </h3>
        
        <div className="flex items-center gap-2 mt-1">
          <span className="text-xs font-semibold text-slate-500">
            {coupon.category}
          </span>
          <span className="text-slate-300">•</span>
          <span className="text-xs text-slate-500 flex items-center gap-1">
            <Layers className="w-3 h-3 text-slate-400" />
            <span>Qty: {coupon.quantity}</span>
          </span>
        </div>

        {/* Short description */}
        <p className="text-xs text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {coupon.description}
        </p>

        {/* Pricing / Exchange Row */}
        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          {renderExchangeBadge()}

          {/* Coupon Face Worth */}
          <div className="text-right">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Face Value</span>
            <span className="text-sm font-semibold text-slate-500 line-through">
              ₹{coupon.couponPrice.toLocaleString('en-IN')}
            </span>
          </div>
        </div>
      </div>

      {/* Seller & Action Footer */}
      <div className="bg-slate-50/80 p-3 sm:px-5 sm:py-3 border-t border-slate-100 flex items-center justify-between gap-2">
        {/* Owner Info with Trust Score */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-full bg-slate-200 border border-slate-300 text-slate-700 font-bold text-xs flex items-center justify-center shrink-0">
            {coupon.ownerName[0]}
          </div>
          <div className="min-w-0">
            <div className="flex items-center gap-1">
              <span className="text-xs font-semibold text-slate-800 truncate">{coupon.ownerName}</span>
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            </div>
            <div className="flex items-center gap-1 text-[10px] text-slate-500">
              <span className="text-amber-500 font-bold">⭐ {coupon.ownerTrustScore}</span>
              <span>•</span>
              <span className="truncate">{coupon.ownerCampusLocation.split('-')[0]}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={() => setSelectedCouponForDetail(coupon)}
          className="bg-[#19222d] hover:bg-slate-800 text-white text-xs font-bold px-3 py-2 rounded-xl flex items-center gap-1 shrink-0 shadow-xs group-hover:bg-[#febd69] group-hover:text-[#19222d] transition-all"
        >
          <span>More Info</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
};
