import React from 'react';
import { CouponProvider, useCoupon } from './context/CouponContext';
import { Header } from './components/Header';
import { SubFilterCarousel } from './components/SubFilterCarousel';
import { CouponList } from './components/CouponList';
import { CouponDetailDrawer } from './components/CouponDetailDrawer';
import { AddCouponModal } from './components/AddCouponModal';
import { AuthModal } from './components/AuthModal';
import { OffersModal } from './components/OffersModal';
import { ToastContainer } from './components/ToastContainer';
import { CommunityTrustInfo } from './components/CommunityTrustInfo';
import { ArrowLeftRight, Code2 } from 'lucide-react';

const MainLayout: React.FC = () => {
  const { activeTab } = useCoupon();

  return (
    <div className="min-h-screen flex flex-col bg-[#f3f4f6]">
      {/* Global Header */}
      <Header />

      {/* SubFilter Carousel (shown in explore and my-coupons views) */}
      {activeTab !== 'community' && <SubFilterCarousel />}

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'community' ? (
          <CommunityTrustInfo />
        ) : (
          <CouponList />
        )}
      </main>

      {/* Modernized Footer */}
      <footer className="bg-[#19222d] text-slate-400 text-xs py-8 border-t border-slate-800 mt-12">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-amber-400 text-[#19222d] flex items-center justify-center font-bold text-xs">
              <ArrowLeftRight className="w-3.5 h-3.5" />
            </div>
            <span className="font-bold text-white text-sm">CouponMaatran</span>
            <span className="text-slate-500">•</span>
            <span>Closed-Community Peer Coupon & Voucher Exchange</span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-slate-400">
            <span>Modernized Rebuild (Vite + React 19 + TypeScript)</span>
            <span>•</span>
            <a 
              href="https://github.com/vatinidian/CouponMaatran" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>Original Repo (vatinidian/CouponMaatran)</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modals & Drawers */}
      <CouponDetailDrawer />
      <AddCouponModal />
      <AuthModal />
      <OffersModal />
      <ToastContainer />
    </div>
  );
};

export function App() {
  return (
    <CouponProvider>
      <MainLayout />
    </CouponProvider>
  );
}

export default App;
