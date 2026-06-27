import React, { useState } from 'react';
import { HousingListing } from '../types';
import { PlusCircle, Info, Home, ListTodo, ShieldCheck, CheckCircle2, CloudUpload } from 'lucide-react';

interface ListAccommodationProps {
  onAddListing: (newListing: HousingListing) => void;
  onSuccessRedirect: () => void;
}

export default function ListAccommodation({ onAddListing, onSuccessRedirect }: ListAccommodationProps) {
  const [step, setStep] = useState(1);
  const [success, setSuccess] = useState(false);

  // Form States
  const [form, setForm] = useState({
    title: '',
    university: 'Mindanao State University Main Campus',
    distance: '',
    price: '',
    type: 'Bed Space' as HousingListing['type'],
    wifi: true,
    insideCR: true,
    withSink: true,
    cctv: true,
    image: '',
    landlordName: '',
    description: '',
    nbiDocUploaded: false
  });

  const [dragActive, setDragActive] = useState(false);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setForm({ ...form, nbiDocUploaded: true });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Append new listing to state
      const randomId = 'custom-' + Math.floor(Math.random() * 100000);
      const formattedListing: HousingListing = {
        id: randomId,
        title: form.title || 'Cozy MSU Student Haven',
        university: form.university,
        distance: form.distance || '5 min walk to Main Gate',
        price: Number(form.price) || 1000,
        type: form.type,
        wifi: form.wifi,
        insideCR: form.insideCR,
        withSink: form.withSink,
        cctv: form.cctv,
        image: form.image || 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&q=80&w=1000',
        isVerified: form.nbiDocUploaded, // Verified if NBI clearance is simulated-uploaded
        landlordName: form.landlordName || 'Dormitory Host',
        description: form.description || 'Excellent newly submitted accommodation near campus with dynamic facilities and round-the-clock safety guards.',
        amenities: [
          form.wifi ? 'Free Wi-Fi' : '',
          form.insideCR ? 'Inside CR' : '',
          form.withSink ? 'With Sink' : '',
          form.cctv ? 'CCTV Security' : '',
          'Fresh bed sheets',
          'Study table'
        ].filter(Boolean),
        rules: ['9:30 PM Curfew', 'No Smoking', 'Visitors until 6 PM only']
      };

      onAddListing(formattedListing);
      setSuccess(true);
      setTimeout(() => {
        setSuccess(false);
        setStep(1);
        setForm({
          title: '',
          university: 'Mindanao State University Main Campus',
          distance: '',
          price: '',
          type: 'Bed Space',
          wifi: true,
          insideCR: true,
          withSink: true,
          cctv: true,
          image: '',
          landlordName: '',
          description: '',
          nbiDocUploaded: false
        });
        onSuccessRedirect(); // Swaps back to listings view smoothly
      }, 3500);
    }
  };

  return (
    <div className="bg-slate-50 py-16 text-left" id="list-accommodation-portal">
      <div className="mx-auto max-w-3xl px-4 sm:px-6">
        
        {/* Step Indicator Headers */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between border-b border-gray-100 pb-5 gap-4" id="wizard-steps-header">
          <div className="flex items-center space-x-3">
            <PlusCircle className="h-8 w-8 text-violet-800" />
            <div>
              <h2 className="font-sans text-2xl font-black text-violet-950">List Your Accommodation</h2>
              <p className="text-xs text-gray-500">Reach thousands of MSU, UP, and UST student renters instantly.</p>
            </div>
          </div>

          <div className="flex gap-1 self-start sm:self-auto">
            {[1, 2, 3].map((s) => (
              <span 
                key={s} 
                className={`h-2.5 w-8 rounded-full transition-colors ${step >= s ? 'bg-violet-800' : 'bg-gray-200'}`}
              />
            ))}
          </div>
        </div>

        {success ? (
          <div className="rounded-3xl bg-white p-10 shadow-xl border border-emerald-100 text-center" id="submission-success">
            <span className="text-5xl">🎉</span>
            <h3 className="mt-4 text-xl font-black text-emerald-800">Accommodation Submitted Successfully!</h3>
            <p className="mt-2 text-xs text-gray-500 max-w-md mx-auto leading-relaxed">
              Your property has been listed in our index. Our verification team has scheduled a standard physical audit. It is now live in the search results!
            </p>
            <div className="mt-4 animate-pulse text-[10px] font-bold text-violet-600">
              Returning to listings view in a few seconds...
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl bg-white p-6 sm:p-8 shadow-xl border border-gray-100">
            {/* STEP 1: General Info */}
            {step === 1 && (
              <div className="space-y-5" id="step-1-fields">
                <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 border-b border-gray-50 pb-2">
                  <Info className="h-4 w-4" />
                  <span>STEP 1: General Accommodation Details</span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Accommodation / Cottage Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Al-Noor Cottage C"
                    value={form.title}
                    onChange={(e) => setForm({...form, title: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Target University</label>
                    <select
                      value={form.university}
                      onChange={(e) => setForm({...form, university: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs focus:border-violet-500 focus:outline-hidden bg-white"
                    >
                      <option value="Mindanao State University Main Campus">Mindanao State University Main Campus</option>
                      <option value="UP Diliman Campus">UP Diliman Campus</option>
                      <option value="University of Santo Tomas">University of Santo Tomas</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Monthly Rental Rate (₱)</label>
                    <input
                      type="number"
                      required
                      placeholder="e.g. 1000"
                      value={form.price}
                      onChange={(e) => setForm({...form, price: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs focus:border-violet-500 focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Proximity / Distance description</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 3 min walk to Main Gate"
                      value={form.distance}
                      onChange={(e) => setForm({...form, distance: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs focus:border-violet-500 focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Dorm Photo URL (Optional)</label>
                    <input
                      type="url"
                      placeholder="e.g. https://images.unsplash.com/photo-..."
                      value={form.image}
                      onChange={(e) => setForm({...form, image: e.target.value})}
                      className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs focus:border-violet-500 focus:outline-hidden"
                    />
                    <span className="text-[9px] text-gray-400 block mt-1">Leave empty to auto-assign a high-quality student cottage placeholder image.</span>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Detailed Listing Description</label>
                  <textarea
                    required
                    rows={3}
                    placeholder="Describe room dimensions, study atmospheres, security setups, or surrounding amenities..."
                    value={form.description}
                    onChange={(e) => setForm({...form, description: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                </div>
              </div>
            )}

            {/* STEP 2: Room Amenities */}
            {step === 2 && (
              <div className="space-y-5" id="step-2-fields">
                <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 border-b border-gray-50 pb-2">
                  <Home className="h-4 w-4" />
                  <span>STEP 2: Space & Included Amenities</span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Accommodation Setup</label>
                  <div className="grid grid-cols-2 gap-3">
                    {['Bed Space', 'Single Room', 'Shared Room', 'Studio'].map((t) => (
                      <button
                        key={t}
                        type="button"
                        onClick={() => setForm({ ...form, type: t as HousingListing['type'] })}
                        className={`rounded-xl py-3 border text-xs font-bold transition-all cursor-pointer ${
                          form.type === t 
                            ? 'bg-violet-50 text-violet-800 border-violet-800' 
                            : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Checklist of Included Perks</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                    <label className="flex items-center space-x-2.5 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.wifi}
                        onChange={(e) => setForm({...form, wifi: e.target.checked})}
                        className="rounded text-violet-800 focus:ring-violet-500"
                      />
                      <span className="text-xs font-semibold text-gray-700">Free Wi-Fi Available</span>
                    </label>

                    <label className="flex items-center space-x-2.5 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.insideCR}
                        onChange={(e) => setForm({...form, insideCR: e.target.checked})}
                        className="rounded text-violet-800 focus:ring-violet-500"
                      />
                      <span className="text-xs font-semibold text-gray-700">Inside CR (Private Bathroom)</span>
                    </label>

                    <label className="flex items-center space-x-2.5 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.withSink}
                        onChange={(e) => setForm({...form, withSink: e.target.checked})}
                        className="rounded text-violet-800 focus:ring-violet-500"
                      />
                      <span className="text-xs font-semibold text-gray-700">With Private Sink</span>
                    </label>

                    <label className="flex items-center space-x-2.5 rounded-lg border border-gray-100 p-3 hover:bg-gray-50 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.cctv}
                        onChange={(e) => setForm({...form, cctv: e.target.checked})}
                        className="rounded text-violet-800 focus:ring-violet-500"
                      />
                      <span className="text-xs font-semibold text-gray-700">CCTV Surveillance Safety</span>
                    </label>
                  </div>
                </div>
              </div>
            )}

            {/* STEP 3: Verification Clearance */}
            {step === 3 && (
              <div className="space-y-5" id="step-3-fields">
                <div className="flex items-center gap-1.5 text-xs font-bold text-violet-900 border-b border-gray-50 pb-2">
                  <ShieldCheck className="h-4 w-4" />
                  <span>STEP 3: Landlord Proof & Verification Screening</span>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Landlord / Property Owner Full Name</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Haji Ahmad Ali"
                    value={form.landlordName}
                    onChange={(e) => setForm({...form, landlordName: e.target.value})}
                    className="w-full rounded-lg border border-gray-200 px-3 py-2.5 text-xs focus:border-violet-500 focus:outline-hidden"
                  />
                </div>

                {/* File Drag and Drop container for NBI Clearance */}
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider block mb-1">Upload NBI Clearance Document for verification badge</label>
                  
                  <div
                    onDragEnter={handleDrag}
                    onDragOver={handleDrag}
                    onDragLeave={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => setForm({ ...form, nbiDocUploaded: true })}
                    className={`relative rounded-2xl border-2 border-dashed p-8 text-center transition-all cursor-pointer ${
                      form.nbiDocUploaded
                        ? 'border-emerald-500 bg-emerald-50/20'
                        : dragActive
                        ? 'border-violet-800 bg-violet-50/50'
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {form.nbiDocUploaded ? (
                      <div className="flex flex-col items-center justify-center">
                        <CheckCircle2 className="h-10 w-10 text-emerald-500" />
                        <span className="mt-2 text-xs font-bold text-emerald-800">Clearance Document Attached!</span>
                        <span className="text-[9px] text-gray-400 block mt-0.5">Click to replace or select another document.</span>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center">
                        <CloudUpload className="h-10 w-10 text-gray-400" />
                        <span className="mt-2 text-xs font-bold text-gray-700">Drag & Drop your NBI Clearance or click here</span>
                        <span className="text-[9px] text-gray-400 block mt-0.5">PDF, PNG, or JPEG accepted. Kept securely confidential.</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Form Action Controls */}
            <div className="mt-8 flex justify-between border-t border-gray-100 pt-5">
              {step > 1 ? (
                <button
                  type="button"
                  onClick={() => setStep(step - 1)}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-xs font-semibold text-gray-600 hover:bg-gray-50 cursor-pointer"
                >
                  Previous Step
                </button>
              ) : (
                <div />
              )}

              <button
                type="submit"
                className="rounded-lg bg-violet-800 px-6 py-2.5 text-xs font-bold text-white hover:bg-violet-700 cursor-pointer"
              >
                {step === 3 ? 'Finalize & Post Accommodation' : 'Continue to Next'}
              </button>
            </div>
          </form>
        )}

      </div>
    </div>
  );
}
