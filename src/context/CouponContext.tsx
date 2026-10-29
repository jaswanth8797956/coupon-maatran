import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Coupon, SubFilter, User, ExchangeOffer, ToastMessage } from '../types';
import { INITIAL_COUPONS, INITIAL_SUB_FILTERS, INITIAL_USERS, INITIAL_OFFERS } from '../data/seedData';

interface CouponContextType {
  coupons: Coupon[];
  filteredCoupons: Coupon[];
  subFilters: SubFilter[];
  selectedSubFilters: string[];
  toggleSubFilter: (filterName: string) => void;
  clearSubFilters: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  showExpired: boolean;
  setShowExpired: (show: boolean) => void;
  sortBy: string;
  setSortBy: (sort: string) => void;
  activeTab: 'browse' | 'my-coupons' | 'my-offers' | 'community';
  setActiveTab: (tab: 'browse' | 'my-coupons' | 'my-offers' | 'community') => void;
  
  // Auth
  currentUser: User | null;
  login: (username: string) => boolean;
  register: (user: Partial<User>) => void;
  logout: () => void;
  switchDemoUser: (username: string) => void;
  
  // Modals & Drawers
  selectedCouponForDetail: Coupon | null;
  setSelectedCouponForDetail: (coupon: Coupon | null) => void;
  addCouponModalOpen: boolean;
  setAddCouponModalOpen: (open: boolean) => void;
  authModalOpen: boolean;
  setAuthModalOpen: (open: boolean) => void;
  offersModalOpen: boolean;
  setOffersModalOpen: (open: boolean) => void;
  
  // Actions
  addCoupon: (newCoupon: Omit<Coupon, '_id' | 'createdAt' | 'ownerID' | 'ownerName' | 'ownerTrustScore' | 'ownerTotalSwaps' | 'ownerCampusLocation'>) => void;
  deleteCoupon: (id: string) => void;
  
  // Offers
  offers: ExchangeOffer[];
  makeOffer: (couponId: string, offerType: 'Cash' | 'Swap' | 'Free Request', message: string, meetingSpot: string, cashAmount?: number, swapDescription?: string) => void;
  respondToOffer: (offerId: string, status: 'accepted' | 'declined') => void;
  
  // Toasts
  toasts: ToastMessage[];
  addToast: (type: ToastMessage['type'], text: string) => void;
  removeToast: (id: string) => void;
}

const CouponContext = createContext<CouponContextType | undefined>(undefined);

export const CouponProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load from localStorage or seed
  const [coupons, setCoupons] = useState<Coupon[]>(() => {
    const saved = localStorage.getItem('cm_coupons');
    return saved ? JSON.parse(saved) : INITIAL_COUPONS;
  });

  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('cm_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cm_current_user');
    return saved ? JSON.parse(saved) : INITIAL_USERS[0]; // default logged in as Jaswanth for quick testing
  });

  const [offers, setOffers] = useState<ExchangeOffer[]>(() => {
    const saved = localStorage.getItem('cm_offers');
    return saved ? JSON.parse(saved) : INITIAL_OFFERS;
  });

  const [subFilters] = useState<SubFilter[]>(INITIAL_SUB_FILTERS);
  const [selectedSubFilters, setSelectedSubFilters] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showExpired, setShowExpired] = useState(false);
  const [sortBy, setSortBy] = useState('validityEnd');
  const [activeTab, setActiveTab] = useState<'browse' | 'my-coupons' | 'my-offers' | 'community'>('browse');

  // Modals state
  const [selectedCouponForDetail, setSelectedCouponForDetail] = useState<Coupon | null>(null);
  const [addCouponModalOpen, setAddCouponModalOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [offersModalOpen, setOffersModalOpen] = useState(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem('cm_coupons', JSON.stringify(coupons));
  }, [coupons]);

  useEffect(() => {
    localStorage.setItem('cm_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('cm_current_user', JSON.stringify(currentUser));
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cm_offers', JSON.stringify(offers));
  }, [offers]);

  const addToast = (type: ToastMessage['type'], text: string) => {
    const id = 'toast-' + Date.now();
    setToasts(prev => [...prev, { id, type, text }]);
    setTimeout(() => {
      removeToast(id);
    }, 4500);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const toggleSubFilter = (filterName: string) => {
    setSelectedSubFilters(prev => 
      prev.includes(filterName) 
        ? prev.filter(f => f !== filterName) 
        : [...prev, filterName]
    );
  };

  const clearSubFilters = () => {
    setSelectedSubFilters([]);
    setSearchQuery('');
  };

  const login = (username: string): boolean => {
    const found = users.find(u => u.username.toLowerCase() === username.toLowerCase().trim());
    if (found) {
      setCurrentUser(found);
      addToast('success', `Welcome back, ${found.firstname}!`);
      return true;
    }
    // Auto-create friendly fallback user if not found
    const newUser: User = {
      username: username.toLowerCase().trim(),
      firstname: username,
      lastname: 'Community Member',
      emailID: `${username.toLowerCase()}@techcorp.internal`,
      campusLocation: 'Tower B, 3rd Floor',
      trustScore: 5.0,
      ratingsCount: 1,
      badges: ['Verified Teammate'],
      activeListingsCount: 0,
      successfulSwapsCount: 0
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast('success', `Welcome to CouponMaatran, ${newUser.firstname}!`);
    return true;
  };

  const register = (data: Partial<User>) => {
    const newUser: User = {
      username: data.username || `user_${Date.now().toString().slice(-4)}`,
      firstname: data.firstname || 'New',
      lastname: data.lastname || 'Member',
      emailID: data.emailID || 'user@techcorp.internal',
      campusLocation: data.campusLocation || 'Tower A - Main Hub',
      trustScore: 5.0,
      ratingsCount: 0,
      badges: ['Verified Teammate', 'New Joiner'],
      activeListingsCount: 0,
      successfulSwapsCount: 0
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast('success', `Account created successfully! Welcome, ${newUser.firstname}.`);
  };

  const logout = () => {
    setCurrentUser(null);
    addToast('info', 'You have been signed out.');
  };

  const switchDemoUser = (username: string) => {
    const found = users.find(u => u.username === username);
    if (found) {
      setCurrentUser(found);
      addToast('info', `Switched active user to ${found.firstname} (${found.username})`);
    }
  };

  const addCoupon = (couponData: Omit<Coupon, '_id' | 'createdAt' | 'ownerID' | 'ownerName' | 'ownerTrustScore' | 'ownerTotalSwaps' | 'ownerCampusLocation'>) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      addToast('warning', 'Please login before adding a coupon.');
      return;
    }

    const newCoupon: Coupon = {
      ...couponData,
      _id: 'coup-' + Date.now(),
      createdAt: new Date().toISOString(),
      ownerID: currentUser.username,
      ownerName: `${currentUser.firstname} ${currentUser.lastname}`,
      ownerTrustScore: currentUser.trustScore,
      ownerTotalSwaps: currentUser.successfulSwapsCount,
      ownerCampusLocation: currentUser.campusLocation,
      couponCodeSecret: couponData.couponCodeSecret || 'SAVE' + Math.floor(1000 + Math.random() * 9000),
      status: 'active'
    };

    setCoupons(prev => [newCoupon, ...prev]);
    // Increment active listings count
    setUsers(prev => prev.map(u => u.username === currentUser.username ? { ...u, activeListingsCount: u.activeListingsCount + 1 } : u));
    addToast('success', `Coupon "${newCoupon.title}" listed successfully!`);
    setAddCouponModalOpen(false);
  };

  const deleteCoupon = (id: string) => {
    setCoupons(prev => prev.filter(c => c._id !== id));
    if (selectedCouponForDetail?._id === id) {
      setSelectedCouponForDetail(null);
    }
    addToast('info', 'Coupon removed from listings.');
  };

  const makeOffer = (
    couponId: string, 
    offerType: 'Cash' | 'Swap' | 'Free Request', 
    message: string, 
    meetingSpot: string, 
    cashAmount?: number, 
    swapDescription?: string
  ) => {
    if (!currentUser) {
      setAuthModalOpen(true);
      addToast('warning', 'Please login to send an exchange offer.');
      return;
    }

    const targetCoupon = coupons.find(c => c._id === couponId);
    if (!targetCoupon) return;

    if (targetCoupon.ownerID === currentUser.username) {
      addToast('warning', "You can't make an offer on your own coupon!");
      return;
    }

    const newOffer: ExchangeOffer = {
      id: 'off-' + Date.now(),
      couponId,
      couponTitle: targetCoupon.title,
      offeredByUsername: currentUser.username,
      offeredByName: `${currentUser.firstname} ${currentUser.lastname}`,
      targetOwnerUsername: targetCoupon.ownerID,
      offerType,
      message,
      preferredMeetingSpot: meetingSpot,
      cashAmount,
      offeredSwapDescription: swapDescription,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setOffers(prev => [newOffer, ...prev]);
    addToast('success', `Offer sent to ${targetCoupon.ownerName}! They will be notified.`);
  };

  const respondToOffer = (offerId: string, status: 'accepted' | 'declined') => {
    setOffers(prev => prev.map(o => o.id === offerId ? { ...o, status } : o));
    const off = offers.find(o => o.id === offerId);
    if (off) {
      if (status === 'accepted') {
        addToast('success', `Offer from ${off.offeredByName} accepted! Voucher code unlocked.`);
        // Mark coupon as in_negotiation or swapped
        setCoupons(prev => prev.map(c => c._id === off.couponId ? { ...c, status: 'in_negotiation' } : c));
      } else {
        addToast('info', `Offer from ${off.offeredByName} declined.`);
      }
    }
  };

  // Filter & Sort calculation
  const now = new Date();
  const filteredCoupons = coupons.filter(coupon => {
    // Expiration check
    const isExpired = new Date(coupon.validityEnd) < now;
    if (!showExpired && isExpired) return false;

    // Search query matching title, description, category, couponType, owner
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match = 
        coupon.title.toLowerCase().includes(q) ||
        coupon.description.toLowerCase().includes(q) ||
        coupon.category.toLowerCase().includes(q) ||
        coupon.couponType.toLowerCase().includes(q) ||
        coupon.ownerName.toLowerCase().includes(q) ||
        (coupon.exchangeInfo && coupon.exchangeInfo.toLowerCase().includes(q));
      if (!match) return false;
    }

    // SubFilters matching
    if (selectedSubFilters.length > 0) {
      // Check if coupon matches all/any of the selected filters
      const match = selectedSubFilters.some(filterName => {
        return (
          coupon.category.toLowerCase() === filterName.toLowerCase() ||
          coupon.couponType.toLowerCase() === filterName.toLowerCase() ||
          coupon.exchangeType.toLowerCase() === filterName.toLowerCase()
        );
      });
      if (!match) return false;
    }

    return true;
  }).sort((a, b) => {
    if (sortBy === 'validityEnd') {
      return new Date(a.validityEnd).getTime() - new Date(b.validityEnd).getTime();
    }
    if (sortBy === 'couponPriceDesc') {
      return b.couponPrice - a.couponPrice;
    }
    if (sortBy === 'exchangePriceAsc') {
      return a.exchangePrice - b.exchangePrice;
    }
    if (sortBy === 'trustScore') {
      return b.ownerTrustScore - a.ownerTrustScore;
    }
    if (sortBy === 'newest') {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return 0;
  });

  return (
    <CouponContext.Provider
      value={{
        coupons,
        filteredCoupons,
        subFilters,
        selectedSubFilters,
        toggleSubFilter,
        clearSubFilters,
        searchQuery,
        setSearchQuery,
        showExpired,
        setShowExpired,
        sortBy,
        setSortBy,
        activeTab,
        setActiveTab,
        currentUser,
        login,
        register,
        logout,
        switchDemoUser,
        selectedCouponForDetail,
        setSelectedCouponForDetail,
        addCouponModalOpen,
        setAddCouponModalOpen,
        authModalOpen,
        setAuthModalOpen,
        offersModalOpen,
        setOffersModalOpen,
        addCoupon,
        deleteCoupon,
        offers,
        makeOffer,
        respondToOffer,
        toasts,
        addToast,
        removeToast,
      }}
    >
      {children}
    </CouponContext.Provider>
  );
};

export const useCoupon = () => {
  const context = useContext(CouponContext);
  if (!context) {
    throw new Error('useCoupon must be used within a CouponProvider');
  }
  return context;
};
