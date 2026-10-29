import React from 'react';
import { useCoupon } from '../context/CouponContext';
import { CouponCard } from './CouponCard';
import { 
  ArrowUpDown, 
  Plus, 
  X, 
  Inbox
} from 'lucide-react';

export const CouponList: React.FC = () => {
  const { 
    filteredCoupons, 
    searchQuery, 
    selectedSubFilters, 
    clearSubFilters,
    showExpired,
    setShowExpired,
    sortBy,
    setSortBy,
    setAddCouponModalOpen,
    currentUser,
    setAuthModalOpen,
    activeTab
  } = useCoupon();

  // If in 'my-coupons' tab, only show coupons owned by current user
  const displayCoupons = activeTab === 'my-coupons' && currentUser
    ? filteredCoupons.filter(c => c.ownerID === currentUser.username)
    : filteredCoupons;

  return (
    <div className="max-w-7xl mx-auto px-4 py-6">
      
      {/* List Header & Action Toolbar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        
        {/* Count & Tab Title */}
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-black text-slate-900 tracking-tight">
              {activeTab === 'my-coupons' ? 'My Listed Coupons' : 'Active Community Coupons'}
            </h2>
            <span className="bg-[#19222d] text-amber-400 font-bold text-xs px-2.5 py-0.5 rounded-full">
              {displayCoupons.length}
            </span>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            {activeTab === 'my-coupons'
              ? 'Manage and track the coupons and vouchers you posted'
              : 'Save money and reduce coupon waste across Bangalore campus'}
          </p>
        </div>

        {/* Filters and Sorting Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          
          {/* Hide / Show Expired Toggle */}
          <label className="flex items-center gap-1.5 px-3 py-1.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 cursor-pointer hover:bg-slate-50 select-none shadow-2xs">
            <input
              type="checkbox"
              checked={showExpired}
              onChange={(e) => setShowExpired(e.target.checked)}
              className="rounded text-amber-500 focus:ring-amber-400"
            />
            <span>Include Expired Deals</span>
          </label>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-xl px-2.5 py-1.5 text-xs font-semibold text-slate-700 shadow-2xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
            <span className="text-slate-400">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-transparent text-slate-900 font-bold focus:outline-none cursor-pointer"
            >
              <option value="validityEnd">Expiring Soonest</option>
              <option value="couponPriceDesc">Highest Face Value</option>
              <option value="exchangePriceAsc">Lowest Exchange Price</option>
              <option value="trustScore">Highest Trust Rating</option>
              <option value="newest">Newest Listed</option>
            </select>
          </div>

          {/* Post Coupon button shortcut */}
          <button
            onClick={() => {
              if (!currentUser) setAuthModalOpen(true);
              else setAddCouponModalOpen(true);
            }}
            className="hidden md:flex items-center gap-1.5 bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all shadow-2xs"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" />
            <span>Post Deal</span>
          </button>
        </div>
      </div>

      {/* Active filters pill bar (if filters are applied) */}
      {(selectedSubFilters.length > 0 || searchQuery.trim()) && (
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">Active Criteria:</span>
          
          {searchQuery.trim() && (
            <span className="inline-flex items-center gap-1 text-xs bg-amber-100 text-amber-900 font-semibold px-2.5 py-0.5 rounded-full border border-amber-200">
              <span>Query: "{searchQuery}"</span>
            </span>
          )}

          {selectedSubFilters.map(filter => (
            <span key={filter} className="inline-flex items-center gap-1 text-xs bg-slate-200 text-slate-800 font-semibold px-2.5 py-0.5 rounded-full">
              <span>{filter}</span>
            </span>
          ))}

          <button
            onClick={clearSubFilters}
            className="text-xs text-rose-600 hover:text-rose-700 font-bold flex items-center gap-1 ml-1"
          >
            <X className="w-3.5 h-3.5" />
            <span>Clear Criteria</span>
          </button>
        </div>
      )}

      {/* Coupon Grid or Empty State */}
      {displayCoupons.length === 0 ? (
        <div className="py-20 text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-3xl bg-amber-100 text-amber-600 flex items-center justify-center mx-auto mb-4 shadow-sm">
            <Inbox className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No Matching Coupons Found</h3>
          <p className="text-xs text-slate-500 mt-1 mb-6 leading-relaxed">
            {activeTab === 'my-coupons'
              ? "You haven't posted any coupons yet! Post a coupon from your wallet that you won't use so teammates can benefit."
              : "We couldn't find any deals matching your active search or filters. Try removing filters or post a new coupon yourself."}
          </p>

          <div className="flex items-center justify-center gap-3">
            {(selectedSubFilters.length > 0 || searchQuery) && (
              <button
                onClick={clearSubFilters}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold rounded-xl transition-colors"
              >
                Reset All Filters
              </button>
            )}
            <button
              onClick={() => {
                if (!currentUser) setAuthModalOpen(true);
                else setAddCouponModalOpen(true);
              }}
              className="px-5 py-2 bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] text-xs font-black rounded-xl transition-all shadow-sm"
            >
              Post a Coupon Now
            </button>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-6">
          {displayCoupons.map(coupon => (
            <CouponCard key={coupon._id} coupon={coupon} />
          ))}
        </div>
      )}

    </div>
  );
};
