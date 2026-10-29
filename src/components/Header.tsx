import React, { useState } from 'react';
import { useCoupon } from '../context/CouponContext';
import { 
  Search, 
  Plus, 
  ArrowLeftRight, 
  ShieldCheck, 
  Bell, 
  User as UserIcon, 
  LogOut, 
  Tag, 
  Building2, 
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const { 
    searchQuery, 
    setSearchQuery, 
    currentUser, 
    logout, 
    setAuthModalOpen, 
    setAddCouponModalOpen,
    setOffersModalOpen,
    offers,
    activeTab,
    setActiveTab,
    switchDemoUser
  } = useCoupon();

  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [demoSwitchOpen, setDemoSwitchOpen] = useState(false);

  // Offers targeting current user that are pending
  const pendingOffersCount = currentUser 
    ? offers.filter(o => o.targetOwnerUsername === currentUser.username && o.status === 'pending').length 
    : 0;

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <header className="sticky top-0 z-40 bg-[#19222d] text-white shadow-md">
      {/* Top micro-announcement banner */}
      <div className="bg-[#131921] px-4 py-1.5 text-xs text-slate-300 border-b border-slate-800 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-1.5 text-amber-400 font-medium">
            <Building2 className="w-3.5 h-3.5" />
            <span>Closed Community Hub:</span>
          </div>
          <span className="text-slate-300">Bangalore Tech Park Campus • 0% Transaction Fees • Peer Handshake Exchange</span>
          
          <div className="ml-auto hidden md:flex items-center gap-3">
            <button 
              onClick={() => setActiveTab('community')}
              className="hover:text-amber-300 transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>How Peer Trust Works</span>
            </button>
            <span className="text-slate-600">|</span>
            <div className="relative">
              <button 
                onClick={() => setDemoSwitchOpen(!demoSwitchOpen)}
                className="text-amber-400 hover:text-amber-300 font-medium text-xs flex items-center gap-1"
              >
                <span>Switch Demo User</span>
                <span className="bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded text-[10px]">
                  {currentUser ? currentUser.firstname : 'Guest'}
                </span>
              </button>

              {demoSwitchOpen && (
                <div className="absolute right-0 top-6 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl p-2 z-50 text-xs">
                  <div className="text-[10px] uppercase font-bold text-slate-400 px-2 py-1">Simulate User Session</div>
                  <button 
                    onClick={() => { switchDemoUser('jaswanth_k'); setDemoSwitchOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span>Jaswanth (Engineering)</span>
                    <span className="text-amber-400 text-[10px]">⭐ 4.9</span>
                  </button>
                  <button 
                    onClick={() => { switchDemoUser('priya_sharma'); setDemoSwitchOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span>Priya (Design)</span>
                    <span className="text-amber-400 text-[10px]">⭐ 4.8</span>
                  </button>
                  <button 
                    onClick={() => { switchDemoUser('arun_v'); setDemoSwitchOpen(false); }}
                    className="w-full text-left px-2 py-1.5 rounded hover:bg-slate-700 flex items-center justify-between"
                  >
                    <span>Arun (Product)</span>
                    <span className="text-amber-400 text-[10px]">⭐ 5.0</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main navigation bar */}
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center gap-4 md:gap-6 justify-between">
          
          {/* Logo */}
          <div 
            onClick={() => setActiveTab('browse')}
            className="flex items-center gap-2 cursor-pointer select-none group"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-amber-500 to-amber-300 flex items-center justify-center text-[#19222d] shadow-md group-hover:scale-105 transition-transform">
              <ArrowLeftRight className="w-5 h-5 font-bold" />
            </div>
            <div>
              <div className="flex items-center gap-0.5 text-xl font-black tracking-tight leading-none">
                <span className="text-[#febd69]">Coupon</span>
                <span className="text-white">Maatran</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-wide">
                PEER COUPON EXCHANGE
              </div>
            </div>
          </div>

          {/* Search bar */}
          <form 
            onSubmit={handleSearchSubmit} 
            className="flex-1 max-w-2xl relative hidden sm:block"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search coupons (e.g. Swiggy, BookMyShow, Amazon, E-Voucher, Free)..."
                className="w-full bg-slate-900/90 text-white placeholder-slate-400 text-sm rounded-lg pl-4 pr-24 py-2.5 border border-slate-700 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-12 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="absolute right-1 top-1 bottom-1 px-3 bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] rounded-md font-semibold text-xs flex items-center gap-1 transition-colors"
              >
                <Search className="w-4 h-4" />
              </button>
            </div>
          </form>

          {/* Navigation Action Buttons */}
          <div className="flex items-center gap-2 md:gap-3">
            {/* Nav Tabs */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium mr-2">
              <button
                onClick={() => setActiveTab('browse')}
                className={`px-3 py-1.5 rounded-lg transition-colors ${
                  activeTab === 'browse' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                Explore
              </button>
              <button
                onClick={() => setActiveTab('my-coupons')}
                className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                  activeTab === 'my-coupons' ? 'bg-slate-800 text-amber-400 font-semibold' : 'text-slate-300 hover:text-white'
                }`}
              >
                <Tag className="w-4 h-4" />
                <span>My Listings</span>
              </button>
            </nav>

            {/* Offers / Swaps Notification button */}
            <button
              onClick={() => setOffersModalOpen(true)}
              className="relative p-2 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
              title="Offers and Swap Requests"
            >
              <Bell className="w-5 h-5" />
              {pendingOffersCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-amber-500 text-[#19222d] text-xs font-bold rounded-full flex items-center justify-center animate-bounce">
                  {pendingOffersCount}
                </span>
              )}
            </button>

            {/* Post a Coupon button */}
            <button
              onClick={() => {
                if (!currentUser) {
                  setAuthModalOpen(true);
                } else {
                  setAddCouponModalOpen(true);
                }
              }}
              className="bg-[#febd69] hover:bg-[#f3a43d] text-[#19222d] font-bold px-3.5 py-2 rounded-lg text-xs md:text-sm flex items-center gap-1.5 shadow-sm transition-all hover:scale-105"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span className="hidden sm:inline">Add Coupon</span>
              <span className="sm:hidden">Add</span>
            </button>

            {/* User Profile / Auth */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-slate-800 transition-colors text-left"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-300 font-bold text-xs flex items-center justify-center">
                    {currentUser.firstname[0]}
                  </div>
                  <div className="hidden xl:block">
                    <div className="text-xs font-semibold leading-tight">{currentUser.firstname}</div>
                    <div className="text-[10px] text-amber-400">⭐ {currentUser.trustScore.toFixed(1)}</div>
                  </div>
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl p-3 z-50 text-xs">
                    <div className="pb-3 border-b border-slate-800">
                      <div className="font-bold text-white text-sm">{currentUser.firstname} {currentUser.lastname}</div>
                      <div className="text-slate-400 text-[11px]">{currentUser.emailID}</div>
                      <div className="mt-1.5 flex items-center gap-1.5 text-amber-400 font-medium">
                        <Building2 className="w-3.5 h-3.5" />
                        <span className="text-[11px] truncate">{currentUser.campusLocation}</span>
                      </div>
                    </div>

                    <div className="py-2 space-y-1">
                      <button
                        onClick={() => { setActiveTab('my-coupons'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                      >
                        <span>My Listed Coupons</span>
                        <span className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400">
                          {currentUser.activeListingsCount}
                        </span>
                      </button>
                      <button
                        onClick={() => { setOffersModalOpen(true); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center justify-between"
                      >
                        <span>Active Swaps & Offers</span>
                        {pendingOffersCount > 0 && (
                          <span className="bg-amber-500/20 text-amber-400 font-bold px-1.5 py-0.5 rounded text-[10px]">
                            {pendingOffersCount} new
                          </span>
                        )}
                      </button>
                      <button
                        onClick={() => { setActiveTab('community'); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-slate-800 text-slate-200 flex items-center gap-1.5"
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        <span>Trust Score & Badges</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-slate-800">
                      <button
                        onClick={() => { logout(); setUserDropdownOpen(false); }}
                        className="w-full text-left px-2 py-1.5 rounded-lg hover:bg-rose-950/40 text-rose-300 flex items-center gap-2"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => setAuthModalOpen(true)}
                className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold transition-colors"
              >
                <UserIcon className="w-4 h-4 text-amber-400" />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>

        {/* Mobile Search input */}
        <div className="mt-2.5 sm:hidden">
          <div className="relative flex items-center">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search coupons..."
              className="w-full bg-slate-900 text-white placeholder-slate-400 text-xs rounded-lg pl-3 pr-8 py-2 border border-slate-700 focus:outline-none focus:border-amber-400"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2 text-slate-400"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

