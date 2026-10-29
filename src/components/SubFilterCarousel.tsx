import React, { useRef } from 'react';
import { useCoupon } from '../context/CouponContext';
import { ChevronLeft, ChevronRight, Sparkles, Filter, X } from 'lucide-react';

export const SubFilterCarousel: React.FC = () => {
  const { 
    subFilters, 
    selectedSubFilters, 
    toggleSubFilter, 
    clearSubFilters,
    coupons
  } = useCoupon();

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Calculate counts for each filter
  const getFilterCount = (filterName: string) => {
    return coupons.filter(c => 
      c.category.toLowerCase() === filterName.toLowerCase() ||
      c.couponType.toLowerCase() === filterName.toLowerCase() ||
      c.exchangeType.toLowerCase() === filterName.toLowerCase()
    ).length;
  };

  return (
    <div className="bg-white border-b border-slate-200 shadow-xs relative">
      <div className="max-w-7xl mx-auto px-4 py-2.5 flex items-center gap-2">
        
        {/* Filter prefix label */}
        <div className="hidden sm:flex items-center gap-1.5 text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0 pr-2 border-r border-slate-200">
          <Filter className="w-3.5 h-3.5 text-amber-500" />
          <span>Filters</span>
        </div>

        {/* Carousel Navigation Button: Left */}
        <button
          onClick={() => scroll('left')}
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          title="Scroll Left"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        {/* Scrollable Filter Chips Area */}
        <div
          ref={scrollContainerRef}
          className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 scroll-smooth"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {/* Quick "All" chip */}
          <button
            onClick={clearSubFilters}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold shrink-0 transition-all flex items-center gap-1.5 ${
              selectedSubFilters.length === 0
                ? 'bg-[#19222d] text-amber-400 shadow-xs'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>All Deals ({coupons.length})</span>
          </button>

          {/* SubFilter Chips */}
          {subFilters.map(filter => {
            const isSelected = selectedSubFilters.includes(filter.filterName);
            const count = getFilterCount(filter.filterName);

            return (
              <button
                key={filter.id}
                onClick={() => toggleSubFilter(filter.filterName)}
                title={filter.description}
                className={`px-3 py-1.5 rounded-full text-xs font-medium shrink-0 transition-all flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#febd69] text-[#19222d] font-bold shadow-xs ring-2 ring-amber-400/50'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200/80 border border-slate-200/60'
                }`}
              >
                <span>{filter.filterName}</span>
                <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                  isSelected ? 'bg-amber-600/30 text-slate-900 font-bold' : 'bg-slate-200 text-slate-600'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Carousel Navigation Button: Right */}
        <button
          onClick={() => scroll('right')}
          className="p-1 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
          title="Scroll Right"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Clear selection chip if active */}
        {selectedSubFilters.length > 0 && (
          <button
            onClick={clearSubFilters}
            className="hidden md:flex items-center gap-1 text-xs text-rose-600 hover:text-rose-700 font-medium shrink-0 pl-2 border-l border-slate-200"
          >
            <X className="w-3.5 h-3.5" />
            <span>Reset ({selectedSubFilters.length})</span>
          </button>
        )}
      </div>
    </div>
  );
};

