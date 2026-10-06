import React, { useState } from 'react';
import { ShoppingBag, User as UserIcon, Menu, X, ChevronDown, Compass, Shield } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface HeaderProps {
  currentRoute: string;
  navigate: (route: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentRoute, navigate }) => {
  const { cart, currentUser, switchUserRole, siteSettings } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);

  const navLinks = [
    { label: 'Sanctuary', route: '/about' },
    { label: 'Our Cows', route: '/our-cows' },
    { label: 'Own / Care', route: '/own-a-cow' },
    { label: 'Elder Care', route: '/elder-cow-care' },
    { label: 'Membership', route: '/membership' },
    { label: 'Store', route: '/shop' },
    { label: 'Tourism', route: '/cow-tourism' },
  ];

  const handleNavClick = (route: string) => {
    navigate(route);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#2C241E]/10">
      {/* Optional Editorial Announcement */}
      {siteSettings.isAnnouncementActive && (
        <div className="bg-[#2C241E] text-[#F3EDE2] text-xs py-1.5 px-4 text-center tracking-wide font-medium flex items-center justify-center gap-2">
          <span>{siteSettings.announcementBanner}</span>
        </div>
      )}

      {/* Top Bar Contract: Zone 1, Zone 2, Zone 3 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        {/* Zone 1: Single text element wordmark */}
        <button
          onClick={() => handleNavClick('/')}
          className="text-xl sm:text-2xl font-serif font-bold tracking-tight text-[#2C241E] hover:text-[#8E412A] transition-colors text-left shrink-0 cursor-pointer"
        >
          Cow Town Sanctuary
        </button>

        {/* Zone 2: 4-7 clean text navigation links */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#5A4B3E]">
          {navLinks.map((link) => {
            const isActive = currentRoute === link.route;
            return (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`whitespace-nowrap transition-colors py-1 relative cursor-pointer ${
                  isActive
                    ? 'text-[#8E412A] font-semibold'
                    : 'hover:text-[#2C241E]'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#8E412A] rounded-full" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* User Account / Role Switcher Menu */}
          <div className="relative">
            <button
              onClick={() => setUserDropdownOpen(!userDropdownOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-[#2C241E]/15 hover:border-[#2C241E]/30 text-xs font-medium text-[#2C241E] bg-[#FFFFFF]/70 hover:bg-white transition-all cursor-pointer"
              title="Account & Portal switcher"
            >
              <UserIcon className="w-3.5 h-3.5 text-[#8E412A]" />
              <span className="hidden sm:inline max-w-[100px] truncate">
                {currentUser?.role === 'admin'
                  ? 'Admin Ops'
                  : currentUser
                  ? currentUser.name.split(' ')[0]
                  : 'Account'}
              </span>
              <ChevronDown className="w-3 h-3 text-[#5A4B3E]" />
            </button>

            {userDropdownOpen && (
              <div
                className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-[#2C241E]/10 py-2 z-50 text-xs text-[#2C241E] animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setUserDropdownOpen(false)}
              >
                <div className="px-3 py-2 border-b border-gray-100 bg-[#FAF8F5]">
                  <p className="font-semibold text-[#2C241E]">
                    {currentUser ? currentUser.name : 'Guest Visitor'}
                  </p>
                  <p className="text-[11px] text-[#8C7A6B] truncate">
                    {currentUser ? currentUser.email : 'Not signed in'}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => handleNavClick('/dashboard')}
                    className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] flex items-center justify-between cursor-pointer"
                  >
                    <span>Member Dashboard</span>
                    <span className="text-[10px] text-[#8E412A] font-medium">My Cows & Orders</span>
                  </button>
                  <button
                    onClick={() => handleNavClick('/admin')}
                    className="w-full text-left px-3 py-2 hover:bg-[#FAF8F5] flex items-center justify-between cursor-pointer text-[#8E412A]"
                  >
                    <span className="flex items-center gap-1.5">
                      <Shield className="w-3.5 h-3.5" />
                      Sanctuary Admin CMS
                    </span>
                    <span className="text-[10px] bg-[#8E412A]/10 px-1.5 py-0.5 rounded-sm">Operations</span>
                  </button>
                </div>

                <div className="border-t border-gray-100 pt-1">
                  <div className="px-3 py-1 text-[10px] text-gray-400 font-semibold uppercase tracking-wider">
                    Quick Role Switch:
                  </div>
                  <button
                    onClick={() => switchUserRole('customer')}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#FAF8F5] cursor-pointer ${
                      currentUser?.role === 'customer' ? 'font-semibold text-[#8E412A]' : 'text-gray-600'
                    }`}
                  >
                    • Customer (Aditi Sharma)
                  </button>
                  <button
                    onClick={() => switchUserRole('admin')}
                    className={`w-full text-left px-3 py-1.5 hover:bg-[#FAF8F5] cursor-pointer ${
                      currentUser?.role === 'admin' ? 'font-semibold text-[#8E412A]' : 'text-gray-600'
                    }`}
                  >
                    • Admin (Sanctuary Operations)
                  </button>
                  <button
                    onClick={() => switchUserRole('guest')}
                    className="w-full text-left px-3 py-1.5 hover:bg-[#FAF8F5] text-gray-500 cursor-pointer"
                  >
                    • Sign Out (Guest)
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Cart Trigger */}
          <button
            onClick={() => handleNavClick('/cart')}
            className="relative p-2 rounded-lg border border-[#2C241E]/15 hover:border-[#2C241E]/30 text-[#2C241E] bg-[#FFFFFF]/70 hover:bg-white transition-all cursor-pointer"
            aria-label={`View cart with ${cartItemCount} items`}
          >
            <ShoppingBag className="w-4 h-4 text-[#2C241E]" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-[#8E412A] text-white text-[10px] font-bold font-mono w-4 h-4 rounded-full flex items-center justify-center">
                {cartItemCount}
              </span>
            )}
          </button>

          {/* Visit Booking CTA button */}
          <button
            onClick={() => handleNavClick('/cow-tourism')}
            className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-[#8E412A] hover:bg-[#783622] rounded-lg transition-colors cursor-pointer shadow-xs whitespace-nowrap"
          >
            <Compass className="w-3.5 h-3.5" />
            Book a Visit
          </button>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 text-[#2C241E] hover:text-[#8E412A] focus:outline-hidden"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#FAF8F5] border-b border-[#2C241E]/15 px-4 pt-3 pb-6 animate-in slide-in-from-top-4 duration-200 shadow-lg">
          <div className="grid grid-cols-2 gap-2 mb-4">
            {navLinks.map((link) => (
              <button
                key={link.route}
                onClick={() => handleNavClick(link.route)}
                className={`text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                  currentRoute === link.route
                    ? 'bg-[#8E412A] text-white font-medium'
                    : 'text-[#2C241E] hover:bg-black/5'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-[#2C241E]/10 flex flex-col gap-2">
            <button
              onClick={() => handleNavClick('/cow-tourism')}
              className="w-full py-2.5 px-4 text-center text-xs font-semibold text-white bg-[#8E412A] rounded-lg"
            >
              Book a Sanctuary Experience
            </button>
            <button
              onClick={() => handleNavClick('/dashboard')}
              className="w-full py-2 px-4 text-center text-xs font-medium text-[#2C241E] bg-white border border-[#2C241E]/15 rounded-lg"
            >
              My Custodian Dashboard
            </button>
            <button
              onClick={() => handleNavClick('/admin')}
              className="w-full py-2 px-4 text-center text-xs font-medium text-[#8E412A] bg-amber-50 border border-amber-200 rounded-lg"
            >
              Admin Operations CMS
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
