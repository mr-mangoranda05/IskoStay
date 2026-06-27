import React, { useState } from 'react';
import { Search, MapPin, Coins, Home } from 'lucide-react';

interface HeroProps {
  onSearch: (university: string, priceRange: string, type: string) => void;
}

export default function Hero({ onSearch }: HeroProps) {
  const [university, setUniversity] = useState('Mindanao State University Main Campus');
  const [priceRange, setPriceRange] = useState('800-2000');
  const [type, setType] = useState('Bed Space');

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(university, priceRange, type);
    
    // Scroll smoothly to featured section
    const element = document.getElementById('featured-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative overflow-hidden bg-slate-50 py-16 sm:py-24" id="hero-section">
      {/* Background Image with Blur Overlay as in the original */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&q=80&w=1920"
          alt="MSU Campus Gate and Trees"
          className="h-full w-full object-cover object-center scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white/85 via-white/80 to-purple-50/90 mix-blend-multiply" />
        <div className="absolute inset-0 bg-violet-950/20 backdrop-blur-[2px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        {/* Hero Headlines */}
        <h1 className="font-sans text-4xl font-extrabold tracking-tight text-violet-950 sm:text-5xl md:text-6xl max-w-3xl mx-auto leading-tight" id="hero-title">
          Find Your Safe Haven Near Your University
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base sm:text-lg font-medium text-violet-900/80" id="hero-subtitle">
          Reliable student housing for the Filipino Youth. Secure, verified, and just a walk away from campus.
        </p>

        {/* Floating Search Form */}
        <form 
          onSubmit={handleSearchSubmit}
          className="mx-auto mt-10 max-w-4xl rounded-2xl border border-violet-100 bg-white p-4 shadow-xl md:p-6"
          id="search-widget"
        >
          <div className="grid grid-cols-1 gap-5 md:grid-cols-4 md:divide-x md:divide-gray-100">
            {/* University Field */}
            <div className="flex flex-col text-left px-2">
              <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-violet-600" />
                University
              </label>
              <select
                value={university}
                onChange={(e) => setUniversity(e.target.value)}
                className="mt-1 block w-full border-0 p-0 text-sm font-semibold text-gray-800 focus:outline-hidden focus:ring-0 bg-transparent cursor-pointer"
                id="select-university"
              >
                <option value="Mindanao State University Main Campus">MSU Main Campus</option>
                <option value="UP Diliman Campus">UP Diliman Campus</option>
                <option value="University of Santo Tomas">UST Campus</option>
              </select>
            </div>

            {/* Price Range Field */}
            <div className="flex flex-col text-left px-2 md:pl-6">
              <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                <Coins className="h-3.5 w-3.5 text-violet-600" />
                Price Range
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="mt-1 block w-full border-0 p-0 text-sm font-semibold text-gray-800 focus:outline-hidden focus:ring-0 bg-transparent cursor-pointer"
                id="select-price"
              >
                <option value="all">Any Price</option>
                <option value="800-2000">₱ 800 - 2,000</option>
                <option value="2000-3000">₱ 2,000 - 3,000</option>
                <option value="3000-plus">₱ 3,000+</option>
              </select>
            </div>

            {/* Accommodation Type Field */}
            <div className="flex flex-col text-left px-2 md:pl-6">
              <label className="text-[10px] font-bold tracking-wider text-gray-400 uppercase flex items-center gap-1.5">
                <Home className="h-3.5 w-3.5 text-violet-600" />
                Accommodation Type
              </label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 block w-full border-0 p-0 text-sm font-semibold text-gray-800 focus:outline-hidden focus:ring-0 bg-transparent cursor-pointer"
                id="select-type"
              >
                <option value="all">All Types</option>
                <option value="Bed Space">Bed Space</option>
                <option value="Shared Room">Shared Room</option>
                <option value="Single Room">Single Room</option>
                <option value="Studio">Studio</option>
              </select>
            </div>

            {/* Search Now Button */}
            <div className="flex items-center justify-center md:pl-4">
              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#D97706] px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-[#B45309] transition-all duration-200 cursor-pointer"
                id="search-btn"
              >
                <Search className="h-5 w-5 stroke-[2.5]" />
                <span>Search Now</span>
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
