import React, { useState } from 'react';
import { useCoupon } from '../context/CouponContext';
import { 
  X, 
  Bell, 
  Check, 
  CheckCircle2 
} from 'lucide-react';

export const OffersModal: React.FC = () => {
  const { 
    offersModalOpen, 
    setOffersModalOpen, 
    offers, 
    currentUser, 
    respondToOffer,
    setAuthModalOpen 
  } = useCoupon();

  const [activeTab, setActiveTab] = useState<'incoming' | 'sent'>('incoming');

  if (!offersModalOpen) return null;

  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div onClick={() => setOffersModalOpen(false)} className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs" />
        <div className="relative w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl z-10 text-center">
          <Bell className="w-12 h-12 text-amber-500 mx-auto mb-3" />
          <h3 className="font-bold text-slate-900 text-lg">Login to View Offers</h3>
          <p className="text-xs text-slate-500 mt-1 mb-5">
            You need to be signed in to view incoming swap proposals and negotiations.
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => setOffersModalOpen(false)}
              className="flex-1 py-2 text-xs font-bold rounded-xl border border-slate-300"
            >
              Close
            </button>
            <button
              onClick={() => { setOffersModalOpen(false); setAuthModalOpen(true); }}
              className="flex-1 py-2 text-xs font-bold rounded-xl bg-[#febd69] text-[#19222d]"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    );
  }

  const incomingOffers = offers.filter(o => o.targetOwnerUsername === currentUser.username);
  const sentOffers = offers.filter(o => o.offeredByUsername === currentUser.username);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setOffersModalOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[85vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#19222d] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-amber-400 text-[#19222d] flex items-center justify-center font-bold">
              <Bell className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Peer Offers & Negotiation Hub</h3>
              <p className="text-xs text-slate-400">Direct peer-to-peer handshakes without financial middleman</p>
            </div>
          </div>
          
          <button
            onClick={() => setOffersModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-200 bg-slate-50">
          <button
            onClick={() => setActiveTab('incoming')}
            className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'incoming' 
                ? 'bg-white text-[#19222d] border-b-2 border-amber-500 font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>Incoming Offers</span>
            <span className="bg-amber-100 text-amber-800 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {incomingOffers.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('sent')}
            className={`flex-1 py-3 text-xs font-bold transition-colors flex items-center justify-center gap-2 ${
              activeTab === 'sent' 
                ? 'bg-white text-[#19222d] border-b-2 border-amber-500 font-black' 
                : 'text-slate-500 hover:text-slate-900'
            }`}
          >
            <span>My Sent Proposals</span>
            <span className="bg-slate-200 text-slate-700 text-[10px] px-1.5 py-0.2 rounded-full font-bold">
              {sentOffers.length}
            </span>
          </button>
        </div>

        {/* Offers List */}
        <div className="p-6 overflow-y-auto space-y-4 flex-1">
          {activeTab === 'incoming' ? (
            incomingOffers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                No incoming offers received yet. Newly submitted proposals from teammates will show here!
              </div>
            ) : (
              incomingOffers.map(offer => (
                <div 
                  key={offer.id} 
                  className={`p-4 rounded-2xl border transition-all ${
                    offer.status === 'pending'
                      ? 'border-amber-300 bg-amber-50/30'
                      : offer.status === 'accepted'
                      ? 'border-emerald-300 bg-emerald-50/20'
                      : 'border-slate-200 bg-slate-50 opacity-60'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-bold text-amber-800 bg-amber-100 px-2 py-0.5 rounded-full uppercase tracking-wider">
                        Offer for: {offer.couponTitle}
                      </span>
                      <h4 className="font-bold text-slate-900 text-sm mt-1">
                        Proposal from <span className="text-[#19222d]">{offer.offeredByName}</span> ({offer.offeredByUsername})
                      </h4>
                    </div>

                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      offer.status === 'pending'
                        ? 'bg-amber-100 text-amber-800 animate-pulse'
                        : offer.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}>
                      {offer.status}
                    </span>
                  </div>

                  <div className="bg-white p-3 rounded-xl border border-slate-200 text-xs text-slate-700 space-y-1.5 my-3 shadow-2xs">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-slate-900">Offer Type:</span>
                      <span className="text-slate-700 font-semibold">{offer.offerType}</span>
                      {offer.cashAmount ? (
                        <span className="text-emerald-700 font-black">₹{offer.cashAmount}</span>
                      ) : null}
                    </div>

                    {offer.offeredSwapDescription && (
                      <div>
                        <span className="font-bold text-slate-900">Offered Swap:</span>
                        <span className="text-slate-600 ml-1">{offer.offeredSwapDescription}</span>
                      </div>
                    )}

                    <div>
                      <span className="font-bold text-slate-900">Proposed Meetup:</span>
                      <span className="text-slate-600 ml-1">{offer.preferredMeetingSpot}</span>
                    </div>

                    <div className="pt-1 text-slate-600 italic">
                      "{offer.message}"
                    </div>
                  </div>

                  {offer.status === 'pending' && (
                    <div className="flex items-center justify-end gap-2 pt-1">
                      <button
                        onClick={() => respondToOffer(offer.id, 'declined')}
                        className="px-3 py-1.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 text-xs font-bold transition-colors"
                      >
                        Decline
                      </button>
                      <button
                        onClick={() => respondToOffer(offer.id, 'accepted')}
                        className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Accept & Unlock Voucher</span>
                      </button>
                    </div>
                  )}
                </div>
              ))
            )
          ) : (
            sentOffers.length === 0 ? (
              <div className="text-center py-12 text-slate-400 text-xs">
                You haven't sent any exchange proposals yet. Click on any coupon's "More Info" to propose an exchange!
              </div>
            ) : (
              sentOffers.map(offer => (
                <div key={offer.id} className="p-4 rounded-2xl border border-slate-200 bg-white shadow-2xs">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div>
                      <span className="text-[11px] font-bold text-slate-500 uppercase">Coupon Proposal</span>
                      <h4 className="font-bold text-slate-900 text-sm">{offer.couponTitle}</h4>
                      <p className="text-xs text-slate-500">Sent to seller: {offer.targetOwnerUsername}</p>
                    </div>
                    <span className={`text-[11px] font-extrabold px-2.5 py-1 rounded-full uppercase tracking-wider ${
                      offer.status === 'accepted'
                        ? 'bg-emerald-100 text-emerald-800'
                        : offer.status === 'pending'
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {offer.status}
                    </span>
                  </div>

                  <div className="bg-slate-50 p-2.5 rounded-xl text-xs text-slate-600 italic mt-2">
                    "{offer.message}"
                  </div>

                  {offer.status === 'accepted' && (
                    <div className="mt-2.5 p-2 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-2 text-xs font-bold text-emerald-800">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>Offer accepted! The voucher code is unlocked in the coupon details.</span>
                    </div>
                  )}
                </div>
              ))
            )
          )}
        </div>
      </div>
    </div>
  );
};
