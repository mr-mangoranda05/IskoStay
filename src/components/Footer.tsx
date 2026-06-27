import { Home, Instagram, Linkedin, Twitter } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export default function Footer({ setActiveTab }: FooterProps) {
  return (
    <footer className="bg-violet-950 text-white border-t border-violet-900" id="app-footer">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 text-left">
          
          {/* Brand & Mission Column */}
          <div className="md:col-span-2 space-y-4" id="footer-brand-col">
            <div className="flex items-center space-x-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-800 text-white">
                <Home className="h-4.5 w-4.5" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-lg font-bold tracking-tight">
                  Isko<span className="text-violet-400">Stay</span>
                </span>
                <span className="text-[8px] font-medium tracking-wider text-violet-300 uppercase">
                  University Home Search
                </span>
              </div>
            </div>

            <p className="text-xs text-violet-200/80 max-w-sm leading-relaxed">
              Reliable Student Housing for the Filipino Youth. Making university life safer and easier, one dorm at a time.
            </p>

            {/* Social Icons matching image */}
            <div className="flex items-center space-x-3 pt-2" id="footer-socials">
              <a href="#" className="rounded-lg bg-violet-900 p-2 text-violet-200 hover:text-white transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-violet-900 p-2 text-violet-200 hover:text-white transition-colors">
                <Linkedin className="h-4 w-4" />
              </a>
              <a href="#" className="rounded-lg bg-violet-900 p-2 text-violet-200 hover:text-white transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Navigation Column */}
          <div className="space-y-3" id="footer-nav-col">
            <h4 className="text-xs font-bold text-violet-300 uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-xs text-violet-200/70">
              <li>
                <button onClick={() => { setActiveTab('find-housing'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Find Housing
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('iskoverified'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  IskoVerified
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('roomie-match'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  Roomie Match
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('list-accommodation'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="hover:text-white transition-colors cursor-pointer">
                  About Us
                </button>
              </li>
            </ul>
          </div>

          {/* Support Column */}
          <div className="space-y-3" id="footer-support-col">
            <h4 className="text-xs font-bold text-violet-300 uppercase tracking-widest">Support</h4>
            <ul className="space-y-2 text-xs text-violet-200/70">
              <li><a href="#" className="hover:text-white transition-colors">Safety Standards</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Contact Support</a></li>
            </ul>
          </div>

        </div>

        {/* Copyright Line */}
        <div className="mt-12 border-t border-violet-900 pt-6 text-center text-[10px] text-violet-200/50" id="footer-bottom">
          <p>© 2026 IskoStay. Reliable Student Housing for the Filipino Youth.</p>
        </div>
      </div>
    </footer>
  );
}
