import React, { useState } from 'react';
import { ShieldCheck, CalendarRange, Lock, UserCheck, CheckCircle, ChevronRight, HelpCircle } from 'lucide-react';

export default function IskoVerifiedInfo() {
  const [testScore, setTestScore] = useState<number | null>(null);
  const [quiz, setQuiz] = useState({
    nbi: 'yes',
    inspection: 'yes',
    gcash: 'yes',
    curfew: 'yes'
  });

  const handleCalculateScore = (e: React.FormEvent) => {
    e.preventDefault();
    let score = 0;
    if (quiz.nbi === 'yes') score += 25;
    if (quiz.inspection === 'yes') score += 25;
    if (quiz.gcash === 'yes') score += 25;
    if (quiz.curfew === 'yes') score += 25;
    setTestScore(score);
  };

  const steps = [
    {
      icon: <UserCheck className="h-6 w-6 text-violet-700" />,
      title: '1. Landlord Background Screening',
      desc: 'Property owners undergo absolute NBI screening to ensure a safe environment for student renters. No hidden identities.'
    },
    {
      icon: <CalendarRange className="h-6 w-6 text-violet-700" />,
      title: '2. Physical On-Site Auditing',
      desc: 'The IskoStay operations team visits and double-checks the location, confirms exact distances, takes photos, and measures ventilation standards.'
    },
    {
      icon: <Lock className="h-6 w-6 text-violet-700" />,
      title: '3. Escrow Protected GCash Accounts',
      desc: 'Security deposits and advanced rents are safely held in an escrow structure. It is released only after successful move-in and key handovers.'
    }
  ];

  return (
    <div className="bg-slate-50 py-16 text-left" id="verified-portal">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Title Heading */}
        <div className="max-w-3xl">
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-800 border border-emerald-200 uppercase tracking-wider inline-flex items-center gap-1">
            <ShieldCheck className="h-4 w-4" />
            <span>The IskoVerified Trust Guarantee</span>
          </span>
          <h2 className="mt-4 font-sans text-3xl font-black text-violet-950 sm:text-4xl">
            Our Multi-Step Safety System
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Learn why students trust IskoStay listings over raw social media posts. We bridge the gap between student renters and landlords near Mindanao State University.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {steps.map((step, idx) => (
            <div key={idx} className="rounded-2xl border border-gray-100 bg-white p-6 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-violet-100 text-violet-800">
                  {step.icon}
                </div>
                <h3 className="mt-4 text-sm font-bold text-violet-950">{step.title}</h3>
                <p className="mt-2 text-xs text-gray-500 leading-relaxed">{step.desc}</p>
              </div>
              <div className="mt-6 border-t border-gray-50 pt-3 text-[10px] font-bold text-violet-600 flex items-center gap-1 uppercase">
                <span>Verified Metric</span>
                <ChevronRight className="h-3 w-3" />
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Calculator Banner */}
        <div className="mt-12 rounded-3xl bg-violet-900 p-8 text-white shadow-xl grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <h3 className="text-xl font-bold">Landlord? Evaluate Your Verification Score</h3>
            <p className="mt-2 text-xs text-violet-200 leading-relaxed">
              Find out if your accommodation qualifies for the coveted "IskoVerified" trust badge. Verified properties secure bookings up to 4x faster!
            </p>

            <form onSubmit={handleCalculateScore} className="mt-6 space-y-4 text-xs">
              <div className="flex items-center justify-between gap-4">
                <span>Do you possess a valid, updated NBI Clearance?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setQuiz({ ...quiz, nbi: 'yes' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${quiz.nbi === 'yes' ? 'bg-amber-500 text-white' : 'bg-violet-800 text-violet-200'}`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuiz({ ...quiz, nbi: 'no' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${quiz.nbi === 'no' ? 'bg-amber-500 text-white' : 'bg-violet-800 text-violet-200'}`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Are you willing to permit on-site photos and measurements?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setQuiz({ ...quiz, inspection: 'yes' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${quiz.inspection === 'yes' ? 'bg-amber-500 text-white' : 'bg-violet-800 text-violet-200'}`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuiz({ ...quiz, inspection: 'no' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${quiz.inspection === 'no' ? 'bg-amber-500 text-white' : 'bg-violet-800 text-violet-200'}`}
                  >
                    No
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between gap-4">
                <span>Do you support GCash escrow for security deposit holding?</span>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setQuiz({ ...quiz, gcash: 'yes' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${quiz.gcash === 'yes' ? 'bg-amber-500 text-white' : 'bg-violet-800 text-violet-200'}`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => setQuiz({ ...quiz, gcash: 'no' })}
                    className={`px-3 py-1 rounded-md font-semibold transition-colors ${quiz.gcash === 'no' ? 'bg-amber-500 text-white' : 'bg-violet-800 text-violet-200'}`}
                  >
                    No
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-amber-500 hover:bg-amber-600 transition-colors py-3 font-bold text-white shadow-md cursor-pointer"
              >
                Calculate Eligibility Percentage
              </button>
            </form>
          </div>

          <div className="flex flex-col items-center justify-center p-6 bg-violet-950/40 rounded-2xl border border-violet-800">
            {testScore !== null ? (
              <div className="text-center">
                <span className="text-5xl font-black text-amber-400">{testScore}%</span>
                <h4 className="mt-3 text-sm font-bold text-white">Verification Score Check</h4>
                <p className="mt-1 text-xs text-violet-200 leading-relaxed">
                  {testScore === 100 
                    ? 'Superb! You meet all requirements. Apply to list your accommodation now to receive immediate priority verification.' 
                    : 'Good progress. You need to fulfill all parameters to secure the "IskoVerified" mark on listings.'}
                </p>
              </div>
            ) : (
              <div className="text-center">
                <HelpCircle className="mx-auto h-12 w-12 text-violet-400 animate-pulse" />
                <h4 className="mt-3 text-sm font-bold text-white">Awaiting Assessment</h4>
                <p className="mt-1 text-xs text-violet-200">Answer the questions on the left and click calculate to verify eligibility.</p>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
