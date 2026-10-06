import React, { useState } from 'react';
import { Mail, Phone, MapPin, Heart, ArrowRight, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface FooterProps {
  navigate: (route: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ navigate }) => {
  const { siteSettings, showNotification } = useApp();
  const [emailInput, setEmailInput] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput || !emailInput.includes('@')) {
      showNotification('Please enter a valid email address.');
      return;
    }
    showNotification(`Pranam! ${emailInput} has been subscribed to the monthly Cow Town Gazette.`);
    setEmailInput('');
  };

  return (
    <footer className="bg-[#1C1814] text-[#E5DFD7] border-t border-[#342D26]">
      {/* Upper Footer: Core Sanctuary Mission & Newsletter */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Brand & Ethos */}
          <div className="md:col-span-4 space-y-4">
            <h3 className="text-2xl font-serif font-bold text-white tracking-tight">
              Cow Town Sanctuary Ltd
            </h3>
            <p className="text-sm text-[#B3A89B] leading-relaxed">
              A restorative sanctuary and sustainable lifestyle ecosystem dedicated to the lifelong protection of indigenous Indian cows, ethical Vedic bilona dairy, regenerative organic agriculture, and transformative family tourism.
            </p>
            <div className="pt-2 flex items-center gap-2 text-xs text-[#9E8E7E]">
              <ShieldCheck className="w-4 h-4 text-[#8E412A]" />
              <span>Registered Sustainable Agri-Sanctuary · Mathura-Bharatpur Belt</span>
            </div>
          </div>

          {/* Quick Pillar Links */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-white">
              Sanctuary
            </h4>
            <ul className="space-y-2 text-sm text-[#B3A89B]">
              <li>
                <button onClick={() => navigate('/about')} className="hover:text-white transition-colors cursor-pointer">
                  About Our Vision
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/our-cows')} className="hover:text-white transition-colors cursor-pointer">
                  Resident Cow Herd
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/own-a-cow')} className="hover:text-white transition-colors cursor-pointer">
                  Own / Care for a Cow
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/elder-cow-care')} className="hover:text-white transition-colors cursor-pointer">
                  Elder Cow Retirement
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/facilities')} className="hover:text-white transition-colors cursor-pointer">
                  Sanctuary Facilities
                </button>
              </li>
            </ul>
          </div>

          {/* Tourism & Commerce */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-white">
              Experience & Store
            </h4>
            <ul className="space-y-2 text-sm text-[#B3A89B]">
              <li>
                <button onClick={() => navigate('/cow-tourism')} className="hover:text-white transition-colors cursor-pointer">
                  Book a Visit
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/membership')} className="hover:text-white transition-colors cursor-pointer">
                  Membership Tiers
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/shop')} className="hover:text-white transition-colors cursor-pointer">
                  A2 Vedic Ghee & Store
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/gallery')} className="hover:text-white transition-colors cursor-pointer">
                  Photo Gallery
                </button>
              </li>
              <li>
                <button onClick={() => navigate('/stories')} className="hover:text-white transition-colors cursor-pointer">
                  Sanctuary Stories
                </button>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase font-semibold tracking-wider text-white">
              Connect & Visit
            </h4>
            <div className="space-y-2 text-sm text-[#B3A89B]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#8E412A] shrink-0 mt-0.5" />
                <span>{siteSettings.address}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#8E412A] shrink-0" />
                <span>{siteSettings.contactPhone}</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#8E412A] shrink-0" />
                <span>{siteSettings.contactEmail}</span>
              </p>
            </div>

            <form onSubmit={handleSubscribe} className="pt-2">
              <label htmlFor="footer-email" className="block text-xs text-[#B3A89B] mb-1.5">
                Receive seasonal herd updates & A2 batch releases:
              </label>
              <div className="flex gap-2">
                <input
                  id="footer-email"
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-[#2A231C] text-sm px-3 py-2 rounded-lg text-white border border-[#44382E] focus:outline-hidden focus:border-[#8E412A] grow"
                  required
                />
                <button
                  type="submit"
                  className="px-3.5 py-2 bg-[#8E412A] hover:bg-[#783622] text-white rounded-lg text-xs font-semibold shrink-0 transition-colors cursor-pointer flex items-center gap-1"
                >
                  Join
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Lower Bar: Policies & Copyright */}
      <div className="border-t border-[#2A231C] bg-[#14110E] py-6 text-xs text-[#8C7A6B]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span>© {new Date().getFullYear()} Cow Town Sanctuary Ltd. All rights reserved.</span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <button onClick={() => navigate('/privacy')} className="hover:text-white transition-colors cursor-pointer">
              Privacy Policy
            </button>
            <button onClick={() => navigate('/terms')} className="hover:text-white transition-colors cursor-pointer">
              Terms of Custodianship
            </button>
            <button onClick={() => navigate('/shipping-policy')} className="hover:text-white transition-colors cursor-pointer">
              Shipping & Transit
            </button>
            <button onClick={() => navigate('/refund-policy')} className="hover:text-white transition-colors cursor-pointer">
              Refund & Cancellation
            </button>
            <button onClick={() => navigate('/faq')} className="hover:text-white transition-colors cursor-pointer">
              FAQ
            </button>
            <button onClick={() => navigate('/contact')} className="hover:text-white transition-colors cursor-pointer">
              Contact Desk
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
