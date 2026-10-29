import React, { useState } from 'react';
import { useCoupon } from '../context/CouponContext';
import type { CouponType, ExchangeType, Category } from '../types';
import { X, Sparkles, AlertCircle } from 'lucide-react';

export const AddCouponModal: React.FC = () => {
  const { 
    addCouponModalOpen, 
    setAddCouponModalOpen, 
    addCoupon, 
    currentUser, 
    setAuthModalOpen,
    addToast 
  } = useCoupon();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [couponType, setCouponType] = useState<CouponType>('E-Voucher');
  const [category, setCategory] = useState<Category>('Food & Dining');
  const [exchangeType, setExchangeType] = useState<ExchangeType>('Cash');
  const [couponPrice, setCouponPrice] = useState<number | ''>('');
  const [exchangePrice, setExchangePrice] = useState<number | ''>('');
  const [currency] = useState('INR');
  const [negotiable, setNegotiable] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [validityStart, setValidityStart] = useState(() => new Date().toISOString().split('T')[0]);
  const [validityEnd, setValidityEnd] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 30);
    return d.toISOString().split('T')[0];
  });
  const [sourceProductID, setSourceProductID] = useState('');
  const [exchangeInfo, setExchangeInfo] = useState('');
  const [couponCodeSecret, setCouponCodeSecret] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  if (!addCouponModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!currentUser) {
      setAddCouponModalOpen(false);
      setAuthModalOpen(true);
      addToast('warning', 'Please login before posting a coupon.');
      return;
    }

    // Date Validation
    if (new Date(validityEnd) <= new Date(validityStart)) {
      setErrorMsg('Validity End Date must be after Start Date!');
      return;
    }

    // Price Validation (preserving original humor!)
    const cPrice = Number(couponPrice) || 0;
    const ePrice = exchangeType === 'Free' ? 0 : Number(exchangePrice) || 0;

    if (exchangeType !== 'Free' && exchangeType !== 'Exchange') {
      if (ePrice > cPrice) {
        setErrorMsg("Don't be greedy! Exchange price should not be higher than coupon price!");
        return;
      }
    }

    addCoupon({
      title: title.trim(),
      description: description.trim(),
      couponType,
      category,
      exchangeType,
      couponPrice: cPrice,
      exchangePrice: ePrice,
      currency,
      negotiable: exchangeType === 'Free' ? false : negotiable,
      quantity: Number(quantity) || 1,
      validityStart: new Date(validityStart).toISOString(),
      validityEnd: new Date(validityEnd).toISOString(),
      sourceProductID: sourceProductID.trim() || undefined,
      exchangeInfo: exchangeType === 'Cash' ? undefined : exchangeInfo.trim() || undefined,
      couponCodeSecret: couponCodeSecret.trim() || `COUP-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      status: 'active'
    });

    // Reset Form
    setTitle('');
    setDescription('');
    setCouponPrice('');
    setExchangePrice('');
    setSourceProductID('');
    setExchangeInfo('');
    setCouponCodeSecret('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        onClick={() => setAddCouponModalOpen(false)}
        className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog */}
      <div className="relative w-full max-w-2xl bg-white rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col animate-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-[#19222d] text-white p-5 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#febd69] text-[#19222d] flex items-center justify-center font-bold">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-black text-base text-white">Post New Coupon for Exchange</h3>
              <p className="text-xs text-slate-400">List an unneeded coupon or voucher for your campus peers</p>
            </div>
          </div>
          
          <button
            onClick={() => setAddCouponModalOpen(false)}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 flex-1">
          {errorMsg && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-bold text-rose-700 flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-rose-600" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Title */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Coupon / Voucher Title <span className="text-rose-500">*</span>
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Swiggy Gourmet ₹500 Off, BookMyShow Pair Tickets, Cult.fit Pass"
              className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white"
            />
          </div>

          {/* Description */}
          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">
              Description & Terms of Use <span className="text-rose-500">*</span>
            </label>
            <textarea
              required
              rows={2}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Minimum spend, valid cities, specific conditions, or how you earned it..."
              className="w-full bg-slate-50 border border-slate-300 rounded-xl p-3 text-xs text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white"
            />
          </div>

          {/* Category & Coupon Type Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Category <span className="text-rose-500">*</span>
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white"
              >
                <option value="Food & Dining">Food & Dining</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Shopping & Retail">Shopping & Retail</option>
                <option value="Travel & Rides">Travel & Rides</option>
                <option value="Electronics">Electronics</option>
                <option value="Health & Wellness">Health & Wellness</option>
                <option value="Subscriptions">Subscriptions</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Coupon Type <span className="text-rose-500">*</span>
              </label>
              <select
                value={couponType}
                onChange={(e) => setCouponType(e.target.value as CouponType)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 focus:bg-white"
              >
                <option value="E-Voucher">E-Voucher (Digital voucher with barcode/PIN)</option>
                <option value="Coupon Code">Coupon Code (Promo code)</option>
                <option value="Discount">Discount (% or flat cut)</option>
                <option value="Gift Card">Gift Card (Balance card)</option>
              </select>
            </div>
          </div>

          {/* Exchange Type & Pricing Block */}
          <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Exchange By <span className="text-rose-500">*</span>
                </label>
                <select
                  value={exchangeType}
                  onChange={(e) => setExchangeType(e.target.value as ExchangeType)}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 font-semibold"
                >
                  <option value="Cash">Cash (Sell at discount)</option>
                  <option value="Free">Free (Community Giveaway)</option>
                  <option value="Exchange">Exchange (Coupon barter)</option>
                  <option value="Any">Any (Cash or Barter)</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Original Face Value (₹) <span className="text-rose-500">*</span>
                </label>
                <input
                  type="number"
                  required
                  min="0"
                  value={couponPrice}
                  onChange={(e) => setCouponPrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder="e.g. 500"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  Expected Cash (₹) {exchangeType === 'Free' && '(Disabled)'}
                </label>
                <input
                  type="number"
                  disabled={exchangeType === 'Free' || exchangeType === 'Exchange'}
                  required={exchangeType === 'Cash'}
                  min="0"
                  value={exchangeType === 'Free' ? 0 : exchangePrice}
                  onChange={(e) => setExchangePrice(e.target.value === '' ? '' : Number(e.target.value))}
                  placeholder={exchangeType === 'Free' ? '0' : 'e.g. 200'}
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400 disabled:bg-slate-100 disabled:text-slate-400"
                />
              </div>
            </div>

            {/* If Exchange or Any: Ask for Barter preferences */}
            {(exchangeType === 'Exchange' || exchangeType === 'Any') && (
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">
                  What coupons are you interested in swapping for?
                </label>
                <input
                  type="text"
                  value={exchangeInfo}
                  onChange={(e) => setExchangeInfo(e.target.value)}
                  placeholder="e.g. Looking for Starbucks, Zomato Gold, or Uber vouchers"
                  className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
                />
              </div>
            )}

            <div className="flex items-center gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
                <input
                  type="checkbox"
                  checked={negotiable}
                  disabled={exchangeType === 'Free'}
                  onChange={(e) => setNegotiable(e.target.checked)}
                  className="rounded text-amber-500 focus:ring-amber-400"
                />
                <span>Allow buyers/peers to negotiate price</span>
              </label>

              <div className="flex items-center gap-1.5 ml-auto text-xs">
                <span className="font-bold text-slate-600">Quantity:</span>
                <input
                  type="number"
                  min="1"
                  max="50"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-16 bg-white border border-slate-300 rounded-lg px-2 py-1 text-xs text-center"
                />
              </div>
            </div>
          </div>

          {/* Validity Dates */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Validity Start Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={validityStart}
                onChange={(e) => setValidityStart(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Validity End Date <span className="text-rose-500">*</span>
              </label>
              <input
                type="date"
                required
                value={validityEnd}
                onChange={(e) => setValidityEnd(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Secret Voucher Code & Source Link */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Coupon Code / PIN (Confidential)
              </label>
              <input
                type="text"
                value={couponCodeSecret}
                onChange={(e) => setCouponCodeSecret(e.target.value)}
                placeholder="e.g. SWIGGY500-XY89"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs font-mono text-slate-900 focus:outline-none focus:border-amber-400"
              />
              <span className="text-[10px] text-slate-500 block mt-0.5">
                🔒 Kept secure. Only revealed to the peer once you accept their offer.
              </span>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">
                Store / Product Link
              </label>
              <input
                type="text"
                value={sourceProductID}
                onChange={(e) => setSourceProductID(e.target.value)}
                placeholder="e.g. amazon.in/giftcards or swiggy.com"
                className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs text-slate-900 focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          {/* Modal Footer */}
          <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => setAddCouponModalOpen(false)}
              className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] text-xs font-black shadow-md transition-all hover:scale-105"
            >
              List Coupon on Board
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
