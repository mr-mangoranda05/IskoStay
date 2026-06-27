import { ShieldCheck, Eye, PhoneCall, CheckCircle, Star } from 'lucide-react';

export default function WhyIskoStay() {
  const features = [
    {
      icon: <Eye className="h-5 w-5 text-violet-700" />,
      title: 'Physical Inspections',
      description: 'Our team visits every site to verify photos & amenities.',
    },
    {
      icon: <ShieldCheck className="h-5 w-5 text-violet-700" />,
      title: 'NBI-Cleared Landlords',
      description: 'All property owners are background checked.',
    },
    {
      icon: <PhoneCall className="h-5 w-5 text-violet-700" />,
      title: '24/7 Hotline',
      description: 'Dedicated student support whenever you need it.',
    },
    {
      icon: <CheckCircle className="h-5 w-5 text-violet-700" />,
      title: 'Secure GCash Payments',
      description: 'Escrowed payments for deposit protection.',
    },
  ];

  return (
    <section className="bg-purple-50/40 py-16 sm:py-20" id="why-iskostay-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          
          {/* Left Text and Features Grid */}
          <div className="flex flex-col text-left">
            <h2 className="font-sans text-3xl font-extrabold tracking-tight text-violet-950 sm:text-4xl" id="why-title">
              Why IskoStay?
            </h2>
            <p className="mt-4 text-base text-gray-600 max-w-lg leading-relaxed" id="why-desc">
              We understand that moving away from home is a big step. That's why every listing on our platform undergoes a rigorous multi-step verification process to ensure your peace of mind.
            </p>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2" id="why-features-grid">
              {features.map((feat, index) => (
                <div 
                  key={index} 
                  className="rounded-xl bg-violet-50/50 p-5 border border-violet-100/40 hover:bg-violet-50 transition-colors duration-200"
                >
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-100 text-violet-700">
                    {feat.icon}
                  </div>
                  <h3 className="mt-3 font-sans text-sm font-bold text-violet-950">
                    {feat.title}
                  </h3>
                  <p className="mt-1 text-xs text-gray-500 leading-normal">
                    {feat.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Interactive Image and Student Review Overlay */}
          <div className="relative mt-8 lg:mt-0" id="why-image-container">
            <div className="overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&q=80&w=1200"
                alt="IskoStay Dorm bunk beds wood"
                className="h-72 sm:h-96 w-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Floating Review Badge */}
            <div 
              className="absolute -bottom-6 left-6 right-6 sm:left-10 sm:right-auto sm:max-w-sm rounded-xl bg-white p-4 shadow-lg border border-violet-50"
              id="student-rating-badge"
            >
              <div className="flex items-center space-x-1.5 text-amber-500">
                <Star className="h-4.5 w-4.5 fill-amber-500" />
                <span className="font-sans text-xs font-extrabold text-violet-950">4.9/5 Rating</span>
              </div>
              <p className="mt-1.5 text-xs italic text-gray-600 leading-relaxed">
                "Finding a dorm in Marawi has never been this easy and safe."
              </p>
              <div className="mt-1 text-[10px] font-bold text-violet-600">
                — Aliyah, MSU Student
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
