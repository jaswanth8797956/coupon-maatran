import React, { useState } from 'react';
import { useCoupon } from '../context/CouponContext';
import { 
  X, 
  Calendar, 
  ExternalLink, 
  ShieldCheck, 
  Send, 
  CheckCircle2, 
  Trash2, 
  Lock, 
  Unlock, 
  Building2 
} from 'lucide-react';

export const CouponDetailDrawer: React.FC = () => {
  const { 
    selectedCouponForDetail, 
    setSelectedCouponForDetail, 
    currentUser, 
    deleteCoupon, 
    makeOffer, 
    offers, 
    setAuthModalOpen 
  } = useCoupon();

  const [offerType, setOfferType] = useState<'Cash' | 'Swap' | 'Free Request'>('Cash');
  const [cashOfferAmount, setCashOfferAmount] = useState<number>(0);
  const [swapDescription, setSwapDescription] = useState('');
  const [message, setMessage] = useState('');
  const [meetingSpot, setMeetingSpot] = useState('Tower B Cafeteria');

  if (!selectedCouponForDetail) return null;

  const coupon = selectedCouponForDetail;
  const isOwner = currentUser && currentUser.username === coupon.ownerID;
  const now = new Date();
  const endDate = new Date(coupon.validityEnd);
  const startDate = new Date(coupon.validityStart);
  const isExpired = endDate < now;

  // Check if current user has an accepted offer on this coupon
  const userOffer = currentUser 
    ? offers.find(o => o.couponId === coupon._id && o.offeredByUsername === currentUser.username)
    : null;
  const isUnlocked = isOwner || (userOffer && userOffer.status === 'accepted');

  const handleSendOffer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      setAuthModalOpen(true);
      return;
    }

    makeOffer(
      coupon._id,
      coupon.exchangeType === 'Free' ? 'Free Request' : offerType,
      message || (offerType === 'Cash' ? `Hi, I am interested in buying this for ₹${cashOfferAmount || coupon.exchangePrice}.` : 'Hi, I would love to trade coupons!'),
      meetingSpot,
      offerType === 'Cash' ? (cashOfferAmount || coupon.exchangePrice) : undefined,
      offerType === 'Swap' ? swapDescription : undefined
    );

    // Reset form
    setMessage('');
    setSwapDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        onClick={() => setSelectedCouponForDetail(null)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in"
      />

      {/* Drawer content */}
      <div className="relative w-full max-w-xl bg-white h-full shadow-2xl flex flex-col z-10 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Drawer Header */}
        <div className="sticky top-0 bg-[#19222d] text-white p-5 border-b border-slate-800 flex items-start justify-between gap-4 z-20">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-400 text-[#19222d]">
                {coupon.couponType}
              </span>
              <span className="text-xs text-slate-300 font-medium">
                {coupon.category}
              </span>
              <span className="text-slate-500">•</span>
              <span className="text-xs text-slate-300">
                Qty: {coupon.quantity}
              </span>
            </div>
            <h2 className="text-lg font-black text-white leading-snug">
              {coupon.title}
            </h2>
          </div>

          <button
            onClick={() => setSelectedCouponForDetail(null)}
            className="p-1.5 rounded-lg bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700 transition-colors shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Body */}
        <div className="p-6 space-y-6 flex-1">

          {/* Pricing & Exchange Overview Card */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-200/80 rounded-2xl p-5 shadow-xs">
            <div className="grid grid-cols-2 gap-4 divide-x divide-amber-200/60">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Exchange Requirement</span>
                <div className="mt-1">
                  {coupon.exchangeType === 'Free' ? (
                    <span className="text-2xl font-black text-emerald-600">FREE GIVEAWAY</span>
                  ) : coupon.exchangeType === 'Exchange' ? (
                    <div>
                      <span className="text-xl font-black text-indigo-900">Coupon Swap</span>
                      <p className="text-xs text-slate-700 mt-0.5">{coupon.exchangeInfo || 'Open to offers'}</p>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-2xl font-black text-[#19222d]">
                          ₹{coupon.exchangePrice.toLocaleString('en-IN')}
                        </span>
                        <span className="text-xs text-slate-500 uppercase">{coupon.currency}</span>
                      </div>
                      <span className="text-xs font-semibold text-amber-700">
                        {coupon.negotiable ? '✓ Negotiable with seller' : '• Fixed Price'}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pl-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Original Coupon Value</span>
                <div className="mt-1">
                  <span className="text-2xl font-black text-slate-700 line-through">
                    ₹{coupon.couponPrice.toLocaleString('en-IN')}
                  </span>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {coupon.couponPrice > coupon.exchangePrice 
                      ? `Save ₹${(coupon.couponPrice - coupon.exchangePrice).toLocaleString('en-IN')}`
                      : 'Verified face value'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Secret Voucher Code / Handshake Status */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                {isUnlocked ? <Unlock className="w-4 h-4 text-emerald-600" /> : <Lock className="w-4 h-4 text-slate-400" />}
                <span>Voucher Code / Secret Key</span>
              </span>
              <span className="text-[11px] text-slate-500 font-medium">
                {isUnlocked ? 'Handshake complete' : 'Locked until peer agreement'}
              </span>
            </div>

            {isUnlocked ? (
              <div className="bg-white border-2 border-dashed border-emerald-400 rounded-xl p-3 flex items-center justify-between">
                <div>
                  <div className="text-xs text-slate-500">Your Code to Redeem:</div>
                  <div className="font-mono text-lg font-black text-emerald-700 tracking-wider">
                    {coupon.couponCodeSecret || 'ACTIVE-PEER-DEAL-889'}
                  </div>
                </div>
                <button
                  onClick={() => navigator.clipboard.writeText(coupon.couponCodeSecret || 'ACTIVE-PEER-DEAL-889')}
                  className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-colors"
                >
                  Copy Code
                </button>
              </div>
            ) : (
              <div className="bg-slate-200/70 border border-slate-300 rounded-xl p-3 text-center">
                <div className="font-mono text-sm tracking-widest text-slate-500 select-none">
                  •••• •••• •••• [LOCKED]
                </div>
                <p className="text-[11px] text-slate-500 mt-1">
                  Code will automatically reveal here as soon as {coupon.ownerName} accepts your exchange offer!
                </p>
              </div>
            )}
          </div>

          {/* Validity & Product Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
              <Calendar className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Validity Period</span>
                <span className="text-slate-600">
                  {startDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })} – {endDate.toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
                {isExpired && (
                  <span className="block text-rose-600 font-bold mt-0.5">⚠️ This coupon has expired.</span>
                )}
              </div>
            </div>

            <div className="bg-white p-3.5 rounded-xl border border-slate-200 flex items-start gap-3">
              <ExternalLink className="w-4 h-4 text-blue-500 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold text-slate-800 block">Product / Redemption Link</span>
                {coupon.sourceProductID ? (
                  <a 
                    href={`https://${coupon.sourceProductID}`} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:underline break-all truncate max-w-[180px] block"
                  >
                    {coupon.sourceProductID}
                  </a>
                ) : (
                  <span className="text-slate-400">Standard offline / app redemption</span>
                )}
              </div>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Description & Terms</h4>
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {coupon.description}
            </div>
          </div>

          {/* Seller Community Profile */}
          <div>
            <h4 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Seller Peer Profile</h4>
            <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-xs flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-11 h-11 rounded-full bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-base shrink-0">
                  {coupon.ownerName[0]}
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-slate-900">{coupon.ownerName}</span>
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                  </div>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Building2 className="w-3.5 h-3.5 text-slate-400" />
                    <span>{coupon.ownerCampusLocation}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="bg-amber-100 text-amber-800 text-[11px] font-bold px-2 py-0.5 rounded-full">
                      ⭐ {coupon.ownerTrustScore} Trust Score
                    </span>
                    <span className="bg-slate-100 text-slate-600 text-[11px] font-semibold px-2 py-0.5 rounded-full">
                      {coupon.ownerTotalSwaps} Successful Swaps
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Owner Actions OR Offer Submission Form */}
          {isOwner ? (
            <div className="bg-rose-50 border border-rose-200 p-4 rounded-2xl">
              <h4 className="text-xs font-bold text-rose-800 uppercase tracking-wider mb-1">Your Listing</h4>
              <p className="text-xs text-rose-700 mb-3">You posted this coupon. You can withdraw or remove it from the board anytime.</p>
              <button
                onClick={() => deleteCoupon(coupon._id)}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete This Listing</span>
              </button>
            </div>
          ) : isExpired ? (
            <div className="bg-slate-100 p-4 rounded-xl text-center text-slate-500 text-xs">
              This coupon has expired and cannot receive offers.
            </div>
          ) : userOffer ? (
            <div className="bg-emerald-50 border border-emerald-200 p-4 rounded-2xl">
              <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm mb-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Offer Status: {userOffer.status.toUpperCase()}</span>
              </div>
              <p className="text-xs text-emerald-700">
                You sent an offer ({userOffer.offerType}) on {new Date(userOffer.createdAt).toLocaleDateString()}.
              </p>
              <p className="text-xs text-slate-600 mt-2 italic bg-white p-2.5 rounded-lg border border-emerald-100">
                "{userOffer.message}"
              </p>
            </div>
          ) : (
            <form onSubmit={handleSendOffer} className="bg-slate-50 border border-slate-200 p-5 rounded-2xl space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                  Send Exchange / Buy Offer to {coupon.ownerName}
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  No payment gateways used. You agree on terms and meet in campus or message directly.
                </p>
              </div>

              {coupon.exchangeType !== 'Free' && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setOfferType('Cash')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      offerType === 'Cash' 
                        ? 'bg-[#19222d] text-amber-400 border-[#19222d]' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Cash Exchange
                  </button>
                  <button
                    type="button"
                    onClick={() => setOfferType('Swap')}
                    className={`flex-1 py-2 text-xs font-bold rounded-xl border transition-all ${
                      offerType === 'Swap' 
                        ? 'bg-[#19222d] text-amber-400 border-[#19222d]' 
                        : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-100'
                    }`}
                  >
                    Coupon Swap Barter
                  </button>
                </div>
              )}

              {offerType === 'Cash' && coupon.exchangeType !== 'Free' && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Cash Offer (INR) {coupon.negotiable && <span className="text-amber-600 font-normal">(Negotiable)</span>}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-sm font-bold text-slate-400">₹</span>
                    <input
                      type="number"
                      defaultValue={coupon.exchangePrice}
                      onChange={(e) => setCashOfferAmount(Number(e.target.value))}
                      placeholder={coupon.exchangePrice.toString()}
                      min="0"
                      className="w-full bg-white text-slate-900 pl-8 pr-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>
              )}

              {offerType === 'Swap' && (
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    What coupon are you proposing to trade?
                  </label>
                  <input
                    type="text"
                    value={swapDescription}
                    onChange={(e) => setSwapDescription(e.target.value)}
                    required
                    placeholder="e.g. Starbucks ₹250 drink coupon or Zomato Pro pass"
                    className="w-full bg-white text-slate-900 px-3 py-2 text-sm rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                  />
                </div>
              )}

              {/* Campus Meetup Spot */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Preferred Campus Handshake Spot
                </label>
                <select
                  value={meetingSpot}
                  onChange={(e) => setMeetingSpot(e.target.value)}
                  className="w-full bg-white text-slate-900 px-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                >
                  <option value="Tower B Cafeteria - Near Coffee Counter">Tower B Cafeteria - Near Coffee Counter</option>
                  <option value="Tower A Main Lobby / Reception">Tower A Main Lobby / Reception</option>
                  <option value="Direct Slack / Teams Digital Handshake">Direct Slack / Teams Digital Handshake</option>
                  <option value="Tower C PM Hub - 4th Floor">Tower C PM Hub - 4th Floor</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Note to Seller
                </label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                  placeholder="Hey, let's exchange today during lunch break!"
                  className="w-full bg-white text-slate-900 p-2.5 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] font-black rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
                <span>Send Exchange Proposal</span>
              </button>
            </form>
          )}

        </div>
      </div>
    </div>
  );
};
