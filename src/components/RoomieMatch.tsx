import React, { useState } from 'react';
import { RoommateProfile } from '../types';
import { initialRoommates } from '../data';
import { UserPlus, Sparkles, X, Check, ArrowRight, MessageSquare, Flame } from 'lucide-react';

export default function RoomieMatch() {
  const [roommates, setRoommates] = useState<RoommateProfile[]>(initialRoommates);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [howItWorksOpen, setHowItWorksOpen] = useState(false);
  const [matchedRoommates, setMatchedRoommates] = useState<RoommateProfile[] | null>(null);
  const [connectedRoomie, setConnectedRoomie] = useState<RoommateProfile | null>(null);
  const [connectMessage, setConnectMessage] = useState('');
  const [connectSuccess, setConnectSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'Female',
    course: 'BS Biology',
    year: '1',
    sleepSchedule: 'Sleeps early',
    cleanliness: 'Extremely clean',
    budget: '₱1000 - ₱2000',
    bio: ''
  });

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simulate Match scoring based on sleep schedule and cleanliness
    const scored = initialRoommates.map(r => {
      let score = 75; // baseline
      if (formData.sleepSchedule === 'Sleeps early' && r.tags.includes('Early Riser')) score += 15;
      if (formData.sleepSchedule === 'Night owl' && r.tags.includes('Code Night Owl')) score += 20;
      if (formData.cleanliness === 'Extremely clean' && r.tags.includes('Clean Freak')) score += 15;
      if (score > 100) score = 100;
      return { ...r, matchScore: score };
    }).sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));

    setMatchedRoommates(scored);
    setProfileModalOpen(false);
  };

  const handleConnectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setConnectSuccess(true);
    setTimeout(() => {
      setConnectSuccess(false);
      setConnectedRoomie(null);
      setConnectMessage('');
    }, 3500);
  };

  return (
    <section className="py-16 bg-white" id="roomie-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Banner container with Ochre/Yellow backdrops */}
        <div 
          className="relative overflow-hidden rounded-3xl bg-[#B45309] p-8 sm:p-12 lg:p-16 text-white shadow-xl flex flex-col lg:flex-row lg:items-center lg:justify-between"
          id="roomie-banner"
        >
          {/* Decorative background circle */}
          <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-[#D97706]/30 translate-x-12 translate-y-12 blur-2xl z-0" />
          <div className="absolute right-12 top-1/2 -translate-y-1/2 h-80 w-80 rounded-full bg-amber-200/20 z-0 hidden lg:block" />

          {/* Left Text content */}
          <div className="relative z-10 max-w-xl text-left lg:mr-8" id="roomie-text">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight sm:text-4xl">
              Find Your Ideal Housemate
            </h2>
            <p className="mt-4 text-sm sm:text-base text-amber-50/90 leading-relaxed">
              Don't want to live alone? Our RoomieMatch feature uses academic interests and lifestyle habits to find you the perfect co-living partner.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setProfileModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-violet-900 px-5 py-3.5 text-sm font-bold text-white shadow-md hover:bg-violet-950 transition-colors cursor-pointer"
              >
                <UserPlus className="h-4.5 w-4.5" />
                <span>Create Student Profile</span>
              </button>
              
              <button
                onClick={() => setHowItWorksOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/60 bg-transparent px-5 py-3.5 text-sm font-bold hover:bg-white/10 transition-colors cursor-pointer"
              >
                <span>Learn How It Works</span>
              </button>
            </div>
          </div>

          {/* Right Featured Profile layout exactly as in the image */}
          <div className="relative z-10 mt-12 lg:mt-0 flex items-center justify-center lg:w-96" id="roomie-card-panel">
            {/* Round yellow element from image behind card */}
            <div className="absolute h-48 w-48 rounded-full bg-amber-100/35 scale-110 z-0 translate-x-8 translate-y-4" />
            
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-5 text-gray-800 shadow-2xl border border-amber-100 z-10" id="renalyn-card">
              <div className="flex items-center space-x-3.5">
                {/* Avatar */}
                <img 
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=200"
                  alt="Renalyn Joyce Bascones"
                  className="h-11 w-11 rounded-full object-cover border border-amber-200"
                  referrerPolicy="no-referrer"
                />
                
                <div className="flex flex-col text-left">
                  <h4 className="font-sans text-xs font-black tracking-tight text-violet-950 uppercase">
                    RENALYN JOYCE BASCONES, 20
                  </h4>
                  <span className="text-[10px] font-bold text-violet-600 flex items-center gap-1 mt-0.5">
                    🎓 BS Computer Science
                  </span>
                </div>
              </div>

              {/* Tags from original picture */}
              <div className="mt-4 flex flex-wrap gap-1.5">
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-[#B45309] border border-amber-100">
                  Early Bird
                </span>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-[#B45309] border border-amber-100">
                  Hate Alarm Clock
                </span>
                <span className="rounded-full bg-amber-50 px-2.5 py-1 text-[10px] font-bold text-[#B45309] border border-amber-100">
                  Clean Freak
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* Dynamic Match Feed when user completes matching */}
        {matchedRoommates && (
          <div className="mt-12 text-left" id="matches-results">
            <div className="flex items-center justify-between border-b border-gray-100 pb-4">
              <div>
                <h3 className="text-xl font-extrabold text-violet-950">Recommended Roommates For You</h3>
                <p className="text-xs text-gray-500">Based on your shared course, sleep cycle, and habits.</p>
              </div>
              <button 
                onClick={() => setMatchedRoommates(null)}
                className="text-xs text-violet-600 font-bold hover:underline"
              >
                Reset Matching
              </button>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {matchedRoommates.map((match) => (
                <div key={match.id} className="relative rounded-2xl border border-violet-100 bg-white p-5 shadow-xs flex flex-col justify-between hover:shadow-md transition-shadow">
                  {/* Match Percentage Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-0.5 rounded-full bg-violet-100 px-2 py-1 text-[10px] font-extrabold text-violet-700">
                    <Sparkles className="h-3 w-3 fill-violet-700" />
                    <span>{match.matchScore}% Match</span>
                  </div>

                  <div className="text-left">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 shrink-0 rounded-full bg-violet-50 flex items-center justify-center font-bold text-violet-800">
                        {match.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-sans text-xs font-extrabold text-violet-950 uppercase">{match.name}, {match.age}</h4>
                        <span className="text-[10px] font-medium text-gray-400 block">{match.course} (Yr {match.year})</span>
                      </div>
                    </div>

                    <p className="mt-3 text-[11px] text-gray-500 italic line-clamp-2">
                      "{match.bio}"
                    </p>

                    <div className="mt-4 space-y-1">
                      <div className="text-[10px] text-gray-400"><strong>⏰ Sleeps:</strong> {match.sleepSchedule}</div>
                      <div className="text-[10px] text-gray-400"><strong>🧼 Cleanliness:</strong> {match.cleanliness}</div>
                    </div>
                  </div>

                  <button
                    onClick={() => setConnectedRoomie(match)}
                    className="mt-5 w-full rounded-lg bg-violet-800 py-2 text-xs font-semibold text-white hover:bg-violet-700 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <MessageSquare className="h-3.5 w-3.5" />
                    <span>Connect Now</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Create Profile Modal */}
        {profileModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setProfileModalOpen(false)}
                className="absolute top-4 right-4 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-lg font-black text-violet-950">Setup Your Roomie Profile</h3>
              <p className="text-xs text-gray-400">Fill out your college major and daily routines to find highly compatible students.</p>

              <form onSubmit={handleProfileSubmit} className="mt-4 space-y-4">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="Enter your name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Age</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 20"
                      value={formData.age}
                      onChange={(e) => setFormData({...formData, age: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Year Level</label>
                    <select
                      value={formData.year}
                      onChange={(e) => setFormData({...formData, year: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden bg-white"
                    >
                      <option value="1">1st Year</option>
                      <option value="2">2nd Year</option>
                      <option value="3">3rd Year</option>
                      <option value="4">4th Year</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Sleep Pattern</label>
                    <select
                      value={formData.sleepSchedule}
                      onChange={(e) => setFormData({...formData, sleepSchedule: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden bg-white"
                    >
                      <option value="Sleeps early">Early Sleeper</option>
                      <option value="Night owl">Night Owl</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Cleanliness</label>
                    <select
                      value={formData.cleanliness}
                      onChange={(e) => setFormData({...formData, cleanliness: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden bg-white"
                    >
                      <option value="Extremely clean">Super Tidy</option>
                      <option value="Moderate">Cozy/Moderate</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Tell Us About Yourself</label>
                  <textarea
                    required
                    placeholder="Describe your hobbies, study style, or roommate dealbreakers..."
                    rows={3}
                    value={formData.bio}
                    onChange={(e) => setFormData({...formData, bio: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-[#D97706] py-3 text-xs font-bold text-white shadow-xs hover:bg-[#B45309] transition-all cursor-pointer"
                >
                  Generate Ideal Matches
                </button>
              </form>
            </div>
          </div>
        )}

        {/* Learn How It Works Modal */}
        {howItWorksOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setHowItWorksOpen(false)}
                className="absolute top-4 right-4 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-lg font-black text-violet-950 flex items-center gap-1">
                <span>⚡</span>
                <span>How RoomieMatch Works</span>
              </h3>
              
              <div className="mt-4 space-y-4 text-xs text-gray-600 leading-relaxed">
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#B45309] font-bold">1</div>
                  <p><strong>Create Your Profile:</strong> Tell us your routine, major, budget, and general cleanliness expectations.</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#B45309] font-bold">2</div>
                  <p><strong>Similarity Matching:</strong> Our algorithm aligns your habits with other registered Mindanao State University students.</p>
                </div>
                <div className="flex gap-3">
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-amber-100 text-[#B45309] font-bold">3</div>
                  <p><strong>Connect & Chat:</strong> Initiate secure contact. Plan together, view properties in tandem, and split costs securely using GCash.</p>
                </div>
              </div>

              <button
                onClick={() => { setHowItWorksOpen(false); setProfileModalOpen(true); }}
                className="mt-6 w-full rounded-xl bg-violet-800 py-2.5 text-xs font-bold text-white hover:bg-violet-700 cursor-pointer"
              >
                Get Match Started Now
              </button>
            </div>
          </div>
        )}

        {/* Connect Roommate Modal */}
        {connectedRoomie && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
            <div className="relative w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
              <button 
                onClick={() => setConnectedRoomie(null)}
                className="absolute top-4 right-4 rounded-full bg-gray-100 p-1.5 text-gray-500 hover:bg-gray-200 cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>

              <h3 className="text-base font-bold text-violet-950">Message {connectedRoomie.name}</h3>
              <p className="text-xs text-gray-400">Introduce yourself and propose co-living!</p>

              {connectSuccess ? (
                <div className="mt-4 rounded-xl bg-emerald-50 border border-emerald-100 p-4 text-center">
                  <span className="text-2xl">✉️</span>
                  <h4 className="mt-1 text-xs font-bold text-emerald-800">Message Sent!</h4>
                  <p className="mt-1 text-[11px] text-emerald-600">{connectedRoomie.name} has been notified and will reply in your IskoStay inbox.</p>
                </div>
              ) : (
                <form onSubmit={handleConnectSubmit} className="mt-4 space-y-3">
                  <textarea
                    required
                    rows={4}
                    placeholder={`Hi ${connectedRoomie.name.split(' ')[0]}, I saw we matched on IskoStay RoomieMatch! I am looking for a dorm...`}
                    value={connectMessage}
                    onChange={(e) => setConnectMessage(e.target.value)}
                    className="w-full rounded-lg border border-gray-200 p-3 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#D97706] py-2.5 text-xs font-bold text-white hover:bg-[#B45309] cursor-pointer"
                  >
                    Send Invitation
                  </button>
                </form>
              )}
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
