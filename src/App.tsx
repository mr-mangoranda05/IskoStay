import React, { useState, useEffect } from 'react';
import { initialListings } from './data';
import { HousingListing } from './types';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import WhyIskoStay from './components/WhyIskoStay';
import FeaturedStays from './components/FeaturedStays';
import RoomieMatch from './components/RoomieMatch';
import IskoVerifiedInfo from './components/IskoVerifiedInfo';
import ListAccommodation from './components/ListAccommodation';
import ChatSupport from './components/ChatSupport';
import Footer from './components/Footer';
import { ShieldCheck, LogIn, X, Check } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('find-housing');
  const [listings, setListings] = useState<HousingListing[]>(initialListings);
  const [filteredListings, setFilteredListings] = useState<HousingListing[]>(initialListings);
  
  // Login modal
  const [loginOpen, setLoginOpen] = useState(false);
  const [loginRole, setLoginRole] = useState<'student' | 'landlord'>('student');
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginSuccess, setLoginSuccess] = useState(false);

  // Search filter logic
  const handleSearch = (university: string, priceRange: string, type: string) => {
    let result = listings;

    // Filter by University
    if (university && university !== 'all') {
      result = result.filter(item => item.university === university);
    }

    // Filter by Accommodation Type
    if (type && type !== 'all') {
      result = result.filter(item => item.type === type);
    }

    // Filter by Price Range
    if (priceRange && priceRange !== 'all') {
      if (priceRange === '800-2000') {
        result = result.filter(item => item.price >= 800 && item.price <= 2000);
      } else if (priceRange === '2000-3000') {
        result = result.filter(item => item.price >= 2000 && item.price <= 3000);
      } else if (priceRange === '3000-plus') {
        result = result.filter(item => item.price > 3000);
      }
    }

    setFilteredListings(result);
  };

  const handleResetFilters = () => {
    setFilteredListings(listings);
  };

  const handleAddListing = (newListing: HousingListing) => {
    // Append to list of listings
    const updated = [newListing, ...listings];
    setListings(updated);
    setFilteredListings(updated);
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginSuccess(true);
    setTimeout(() => {
      setLoginSuccess(false);
      setLoginOpen(false);
      setLoginForm({ email: '', password: '' });
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-violet-100 selection:text-violet-900" id="iskostay-root">
      
      {/* Navbar header */}
      <Navbar 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onOpenLogin={() => setLoginOpen(true)} 
      />

      {/* Main interactive tabs routing */}
      <main className="flex-grow">
        {activeTab === 'find-housing' && (
          <div className="animate-fade-in" id="find-housing-tab">
            {/* Search hero */}
            <Hero onSearch={handleSearch} />
            
            {/* Why choose IskoStay list */}
            <WhyIskoStay />
            
            {/* Listings Grid with filtering */}
            <FeaturedStays 
              listings={filteredListings} 
              onViewAll={handleResetFilters} 
            />

            {/* Roommate Finder Segment */}
            <RoomieMatch />
          </div>
        )}

        {activeTab === 'iskoverified' && (
          <div className="animate-fade-in" id="iskoverified-tab">
            <IskoVerifiedInfo />
          </div>
        )}

        {activeTab === 'roomie-match' && (
          <div className="animate-fade-in" id="roomiematch-tab">
            <RoomieMatch />
          </div>
        )}

        {activeTab === 'list-accommodation' && (
          <div className="animate-fade-in" id="list-accommodation-tab">
            <ListAccommodation 
              onAddListing={handleAddListing} 
              onSuccessRedirect={() => setActiveTab('find-housing')} 
            />
          </div>
        )}
      </main>

      {/* Footer information */}
      <Footer setActiveTab={setActiveTab} />

      {/* Floating live support widget */}
      <ChatSupport />

      {/* Interactive Mock Login Portal Modal */}
      {loginOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs" id="login-modal">
          <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-left border border-gray-100">
            <button 
              onClick={() => setLoginOpen(false)}
              className="absolute top-4 right-4 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 cursor-pointer"
            >
              <X className="h-5 w-5" />
            </button>

            <h3 className="text-xl font-black text-violet-950 flex items-center gap-1.5">
              <span>🔑</span>
              <span>IskoStay Portal</span>
            </h3>
            <p className="text-xs text-gray-400 mt-1">Access your verified rentals or search dashboard.</p>

            {/* Tab selector Student vs Landlord */}
            <div className="mt-5 grid grid-cols-2 gap-2 bg-gray-50 rounded-xl p-1">
              <button
                onClick={() => setLoginRole('student')}
                className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  loginRole === 'student' ? 'bg-white text-violet-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                I am a Student
              </button>
              <button
                onClick={() => setLoginRole('landlord')}
                className={`py-2 text-xs font-bold rounded-lg cursor-pointer transition-all ${
                  loginRole === 'landlord' ? 'bg-white text-violet-800 shadow-xs' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                I am a Landlord
              </button>
            </div>

            {loginSuccess ? (
              <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                <Check className="mx-auto h-8 w-8 text-emerald-600 animate-bounce" />
                <h4 className="mt-2 text-xs font-bold text-emerald-800">Login Successful!</h4>
                <p className="mt-1 text-[10px] text-emerald-600">Syncing your student preferences...</p>
              </div>
            ) : (
              <form onSubmit={handleLoginSubmit} className="mt-5 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder={loginRole === 'student' ? 'name@msu.edu.ph' : 'landlord@example.com'}
                    value={loginForm.email}
                    onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Password</label>
                  <input
                    type="password"
                    required
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-violet-800 py-3 text-xs font-bold text-white shadow-xs hover:bg-violet-700 cursor-pointer"
                >
                  Log In Securely
                </button>
              </form>
            )}

            <div className="mt-5 border-t border-gray-50 pt-3 text-center text-[10px] text-gray-400">
              {loginRole === 'student' 
                ? 'Don\'t have an account? Sign up using your university email.' 
                : 'Need help registering as a landlord? Message our Support.'}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
