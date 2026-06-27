import React, { useState } from 'react';
import { HousingListing } from '../types';
import { CheckCircle2, MapPin, Sparkles, X, Phone, Calendar, ArrowRight, Wifi, ShowerHead, HelpCircle, ShieldAlert } from 'lucide-react';

interface FeaturedStaysProps {
  listings: HousingListing[];
  onViewAll: () => void;
}

export default function FeaturedStays({ listings, onViewAll }: FeaturedStaysProps) {
  const [selectedListing, setSelectedListing] = useState<HousingListing | null>(null);
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    phone: '',
    date: '',
    message: ''
  });

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setSelectedListing(null);
      setBookingForm({ name: '', phone: '', date: '', message: '' });
    }, 4000);
  };

  return (
    <section className="py-16 bg-white" id="featured-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header of Section */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between border-b border-gray-100 pb-5 gap-4" id="featured-header">
          <div className="text-left">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-violet-950 sm:text-4xl">
              Featured Stay near MSU
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Hand-picked housing for a comfortable student life.
            </p>
          </div>
          <button 
            onClick={onViewAll}
            className="group flex items-center space-x-1.5 text-sm font-bold text-[#D97706] hover:text-[#B45309] transition-colors cursor-pointer self-start sm:self-auto"
          >
            <span>View All Listings</span>
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Listings Grid */}
        {listings.length === 0 ? (
          <div className="mt-12 text-center py-16 rounded-2xl bg-gray-50 border border-dashed border-gray-200" id="no-listings">
            <ShieldAlert className="mx-auto h-12 w-12 text-violet-300" />
            <h3 className="mt-4 text-sm font-bold text-gray-900">No housing matched your filters</h3>
            <p className="mt-1 text-xs text-gray-500">Try adjusting your price range or university filter above to view more cottages!</p>
            <button 
              onClick={onViewAll}
              className="mt-4 inline-flex items-center justify-center rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-700 cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3" id="listings-grid">
            {listings.map((listing) => (
              <div 
                key={listing.id}
                className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:shadow-md"
              >
                {/* Card Thumbnail Area */}
                <div className="relative h-56 w-full overflow-hidden bg-gray-100">
                  <img
                    src={listing.image}
                    alt={listing.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    referrerPolicy="no-referrer"
                  />
                  {/* IskoVerified Stamp */}
                  {listing.isVerified && (
                    <div className="absolute top-4 right-4 flex items-center space-x-1 rounded-full bg-emerald-500/90 px-3 py-1 text-[10px] font-extrabold tracking-wide text-white shadow-xs">
                      <CheckCircle2 className="h-3 w-3 fill-white text-emerald-500" />
                      <span>IskoVerified</span>
                    </div>
                  )}
                </div>

                {/* Card Details Area */}
                <div className="p-5 text-left">
                  <h3 className="font-sans text-lg font-bold text-violet-950 group-hover:text-violet-700 transition-colors">
                    {listing.title}
                  </h3>
                  
                  {/* Distance info */}
                  <div className="mt-1.5 flex items-center space-x-1.5 text-xs text-amber-700 font-semibold">
                    <span>🏠</span>
                    <span>{listing.distance}</span>
                  </div>

                  {/* Amenities Pills */}
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {listing.wifi && (
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-semibold text-gray-600 border border-gray-100">
                        Free Wi-Fi
                      </span>
                    )}
                    {listing.insideCR && (
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-semibold text-gray-600 border border-gray-100">
                        Inside CR
                      </span>
                    )}
                    {listing.withSink && (
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-semibold text-gray-600 border border-gray-100">
                        With Sink
                      </span>
                    )}
                    {listing.cctv && (
                      <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 text-[10px] font-semibold text-gray-600 border border-gray-100">
                        CCTV
                      </span>
                    )}
                  </div>

                  {/* Price and CTA */}
                  <div className="mt-6 flex items-center justify-between border-t border-gray-50 pt-4">
                    <div className="flex flex-col">
                      <span className="text-xl font-black text-violet-950">
                        ₱{listing.price}
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">
                        per month
                      </span>
                    </div>

                    <button
                      onClick={() => setSelectedListing(listing)}
                      className="rounded-lg bg-[#D97706] px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#B45309] transition-colors cursor-pointer"
                    >
                      View More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Accommodation Information Modal */}
        {selectedListing && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs overflow-y-auto animate-fade-in" id="listing-modal">
            <div className="relative w-full max-w-4xl rounded-2xl bg-white shadow-2xl overflow-y-auto md:overflow-hidden max-h-[95vh] md:max-h-[85vh] flex flex-col md:flex-row">
              
              {/* Left Column: Media & Overview */}
              <div className="w-full md:w-1/2 bg-gray-50 flex flex-col md:h-full md:overflow-y-auto border-b md:border-b-0 md:border-r border-gray-100 shrink-0">
                <div className="relative h-48 sm:h-60 md:h-72 w-full shrink-0">
                  <img
                    src={selectedListing.image}
                    alt={selectedListing.title}
                    className="h-full w-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute top-4 left-4 flex items-center space-x-1.5 rounded-full bg-emerald-500 px-3 py-1 text-xs font-bold text-white">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>IskoVerified</span>
                  </div>
                </div>

                <div className="p-6 text-left flex-1">
                  <span className="text-xs font-bold text-violet-600 uppercase tracking-widest">
                    {selectedListing.type}
                  </span>
                  <h3 className="mt-1 text-2xl font-black text-violet-950">
                    {selectedListing.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 font-medium">
                    📍 {selectedListing.university} • {selectedListing.distance}
                  </p>

                  <div className="mt-4 rounded-xl bg-violet-50/50 p-4 border border-violet-100/30">
                    <p className="text-xs font-semibold text-violet-950">About the Property:</p>
                    <p className="mt-1 text-xs text-gray-600 leading-relaxed">
                      {selectedListing.description}
                    </p>
                  </div>

                  {/* Complete Amenities Checklist */}
                  <div className="mt-5">
                    <p className="text-xs font-bold text-violet-950 uppercase tracking-wider">Included Amenities:</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {selectedListing.amenities.map((am, i) => (
                        <div key={i} className="flex items-center space-x-1.5 text-xs text-gray-600">
                          <span className="text-emerald-500 font-bold">✓</span>
                          <span>{am}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: Landlord Rules & Reservation Inquiry */}
              <div className="w-full md:w-1/2 p-6 flex flex-col justify-between md:h-full md:overflow-y-auto">
                {/* Close Button */}
                <button 
                  onClick={() => setSelectedListing(null)}
                  className="absolute top-4 right-4 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 cursor-pointer z-10"
                >
                  <X className="h-5 w-5" />
                </button>

                <div className="text-left">
                  {/* Landlord Guidelines */}
                  <h4 className="text-xs font-bold text-violet-950 uppercase tracking-wider flex items-center gap-1">
                    <span>📋</span>
                    <span>Landlord Rules & Curfew</span>
                  </h4>
                  <div className="mt-2 space-y-1.5">
                    {selectedListing.rules.map((rule, idx) => (
                      <div key={idx} className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs text-gray-600 border border-gray-100">
                        • {rule}
                      </div>
                    ))}
                  </div>

                  {/* Property Owner */}
                  <div className="mt-5 flex items-center space-x-3 rounded-xl bg-amber-50/50 p-3 border border-amber-100/50">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-amber-700 text-sm font-bold">
                      {selectedListing.landlordName.charAt(0)}
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="text-xs font-bold text-violet-950">Property Landlord:</span>
                      <span className="text-xs text-gray-600 font-semibold">{selectedListing.landlordName}</span>
                    </div>
                  </div>

                  {/* Reservation form */}
                  <div className="mt-6 border-t border-gray-100 pt-5">
                    <h4 className="text-sm font-bold text-violet-950">Interested? Inquire or Book Now</h4>
                    <p className="text-[11px] text-gray-400">Submit an inquiry and the verified landlord will receive an SMS notification.</p>

                    {bookingSuccess ? (
                      <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                        <span className="text-2xl">🎉</span>
                        <h5 className="mt-1 text-xs font-bold text-emerald-800">Inquiry Received Successfully!</h5>
                        <p className="mt-1 text-[11px] text-emerald-600">Landlord <strong>{selectedListing.landlordName}</strong> will reach out via SMS/Call shortly.</p>
                      </div>
                    ) : (
                      <form onSubmit={handleBookingSubmit} className="mt-4 space-y-3">
                        <div className="grid grid-cols-2 gap-3">
                          <input
                            type="text"
                            required
                            placeholder="Your Name"
                            value={bookingForm.name}
                            onChange={(e) => setBookingForm({ ...bookingForm, name: e.target.value })}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                          />
                          <input
                            type="tel"
                            required
                            placeholder="Your Phone (e.g., 0917...)"
                            value={bookingForm.phone}
                            onChange={(e) => setBookingForm({ ...bookingForm, phone: e.target.value })}
                            className="rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                          />
                        </div>
                        <input
                          type="date"
                          required
                          value={bookingForm.date}
                          onChange={(e) => setBookingForm({ ...bookingForm, date: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden text-gray-500"
                        />
                        <textarea
                          placeholder="Your questions or message (optional)"
                          rows={2}
                          value={bookingForm.message}
                          onChange={(e) => setBookingForm({ ...bookingForm, message: e.target.value })}
                          className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                        />
                        <button
                          type="submit"
                          className="w-full rounded-xl bg-[#D97706] py-2.5 text-xs font-bold text-white shadow-xs hover:bg-[#B45309] transition-all cursor-pointer"
                        >
                          Send Booking Request
                        </button>
                      </form>
                    )}
                  </div>
                </div>

                {/* Footer terms in modal */}
                <div className="mt-5 border-t border-gray-50 pt-3 flex items-center justify-between text-[10px] text-gray-400">
                  <span>Price: <strong>₱{selectedListing.price}/month</strong></span>
                  <span>Escrow Guard Active 🛡️</span>
                </div>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
