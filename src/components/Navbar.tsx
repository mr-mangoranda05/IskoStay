import { Home, LogIn } from 'lucide-react';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenLogin: () => void;
}

export default function Navbar({ activeTab, setActiveTab, onOpenLogin }: NavbarProps) {
  const navItems = [
    { id: 'find-housing', label: 'Find Housing' },
    { id: 'iskoverified', label: 'IskoVerified' },
    { id: 'roomie-match', label: 'Roomie Match' },
    { id: 'list-accommodation', label: 'List Accommodation' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-xs" id="nav-header">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <div 
          className="flex cursor-pointer items-center space-x-2" 
          onClick={() => setActiveTab('find-housing')}
          id="logo-container"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-800 text-white shadow-sm">
            <div className="relative flex items-center justify-center">
              {/* Location pin with home silhouette */}
              <Home className="h-5 w-5" />
              <div className="absolute -top-1 -right-1 h-3.5 w-3.5 rounded-full border border-white bg-amber-500 flex items-center justify-center text-[7px] font-bold">✓</div>
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-xl font-bold tracking-tight text-violet-950">
              Isko<span className="text-violet-600">Stay</span>
            </span>
            <span className="text-[9px] font-medium tracking-wider text-gray-400 uppercase">
              University Home Search
            </span>
          </div>
        </div>

        {/* Navigation Desktop */}
        <nav className="hidden md:flex items-center space-x-8" id="desktop-nav">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`font-sans text-sm font-medium transition-colors duration-200 cursor-pointer ${
                activeTab === item.id
                  ? 'text-violet-700 font-semibold border-b-2 border-violet-700 pb-1'
                  : 'text-gray-600 hover:text-violet-600 pb-1'
              }`}
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* CTA Buttons */}
        <div className="flex items-center space-x-2 sm:space-x-4" id="cta-container">
          <button 
            onClick={onOpenLogin}
            className="flex items-center space-x-1 font-sans text-xs sm:text-sm font-medium text-gray-700 hover:text-violet-700 cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
            <span>Signin</span>
          </button>
          
          <button 
            onClick={() => setActiveTab('list-accommodation')}
            className="hidden sm:block rounded-lg bg-violet-800 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-violet-700 transition-colors duration-200 cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>

      {/* Mobile Nav Bar */}
      <div className="flex md:hidden border-t border-gray-50 bg-gray-50/80 px-4 py-2 overflow-x-auto gap-2 no-scrollbar" id="mobile-nav">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              activeTab === item.id
                ? 'bg-violet-100 text-violet-800'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </header>
  );
}
