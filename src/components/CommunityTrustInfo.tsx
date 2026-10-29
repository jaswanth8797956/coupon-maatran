import React from 'react';
import { useCoupon } from '../context/CouponContext';
import { 
  ShieldCheck, 
  Star, 
  Building2, 
  Lock, 
  Coins, 
  Award, 
  Sparkles 
} from 'lucide-react';

export const CommunityTrustInfo: React.FC = () => {
  const { currentUser, setActiveTab } = useCoupon();

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-300">
      
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#19222d] via-[#232f3e] to-slate-900 rounded-3xl p-8 sm:p-10 text-white shadow-xl relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="max-w-2xl relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/10 border border-amber-400/30 text-amber-300 text-xs font-bold mb-4">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Closed-Community Trust Architecture</span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight leading-tight">
            Why <span className="text-[#febd69]">CouponMaatran</span> Doesn't Need a Payment Gateway
          </h1>

          <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed">
            By limiting coupon exchanges to verified teammates within a corporate campus or trusted closed network, we remove transaction fees, dispute fraud, and payment gateway headaches.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <button
              onClick={() => setActiveTab('browse')}
              className="px-5 py-2.5 rounded-xl bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] font-black text-xs transition-all shadow-md hover:scale-105"
            >
              Explore Available Coupons
            </button>
            <button
              onClick={() => setActiveTab('my-coupons')}
              className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-colors"
            >
              My Community Stats
            </button>
          </div>
        </div>
      </div>

      {/* 4 Pillars of CouponMaatran */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center mb-4">
            <Coins className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">0% Financial Friction</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            No bank transfers, transaction fees, or payment escrow charges. Negotiate directly and settle peer-to-peer (cash, UPI, or pure voucher barter).
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center mb-4">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Campus Handshake</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Meet at the cafeteria, your floor’s coffee bar, or reception. Pick up physical voucher cards safely among verified teammates.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center mb-4">
            <Star className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Trust Score & Ratings</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Teammates rate each other after successful trades. High scores earn badges, while policy violations or expired voucher spam get flagged.
          </p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-xs">
          <div className="w-10 h-10 rounded-xl bg-purple-100 text-purple-700 flex items-center justify-center mb-4">
            <Lock className="w-5 h-5" />
          </div>
          <h3 className="font-bold text-slate-900 text-base mb-1">Secret Key Handshake</h3>
          <p className="text-xs text-slate-600 leading-relaxed">
            Confidential promo codes and PINs are securely masked until the owner accepts the exchange proposal from the buyer.
          </p>
        </div>

      </div>

      {/* Current User Community Card */}
      {currentUser && (
        <div className="bg-white border border-slate-200 rounded-3xl p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-slate-100">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-[#19222d] text-amber-400 font-black text-xl flex items-center justify-center shadow-sm">
                {currentUser.firstname[0]}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-xl font-bold text-slate-900">{currentUser.firstname} {currentUser.lastname}</h3>
                  <span className="bg-emerald-100 text-emerald-800 text-[10px] font-black px-2 py-0.5 rounded-full flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>VERIFIED</span>
                  </span>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">{currentUser.emailID} • {currentUser.campusLocation}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="bg-amber-50 border border-amber-200 rounded-2xl px-4 py-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700 block">Trust Rating</span>
                <span className="text-lg font-black text-amber-900">⭐ {currentUser.trustScore.toFixed(1)} / 5.0</span>
              </div>
              <div className="bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2 text-center">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block">Total Swaps</span>
                <span className="text-lg font-black text-slate-800">{currentUser.successfulSwapsCount}</span>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Earned Community Badges</h4>
            <div className="flex flex-wrap gap-2">
              {currentUser.badges.map((badge, idx) => (
                <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 border border-slate-200 text-xs font-bold text-slate-700">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span>{badge}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Exchange Etiquette Guidelines */}
      <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6 sm:p-8">
        <h3 className="font-bold text-slate-900 text-base mb-4 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Campus Peer Exchange Guidelines</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-600">
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-1">1. Keep Validity Accurate</h5>
            <p>Ensure expiration dates and product terms are clearly described before listing so your peers don't miss out.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-1">2. Don't Overprice</h5>
            <p>The goal is to prevent coupon wastage. Exchange prices should always be fair and lower than original face value.</p>
          </div>
          <div className="p-4 bg-white rounded-xl border border-slate-200">
            <h5 className="font-bold text-slate-800 mb-1">3. Timely Handshake</h5>
            <p>When you agree on a meetup spot, try to be prompt so both of you can enjoy your lunch or coffee break smoothly.</p>
          </div>
        </div>
      </div>

    </div>
  );
};
