import React, { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const ContactPage: React.FC = () => {
  const { siteSettings, showNotification } = useApp();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('General Sanctuary Inquiry');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSent(true);
    showNotification('Pranam! Your inquiry has been received. Our sanctuary desk will contact you within 24 hours.');
  };

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Visit & Connect
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Contact Cow Town Sanctuary Desk
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Whether planning a family weekend visit, inquiring about cow co-custodianship, or ordering customized corporate gifting hampers, our sanctuary coordination team is delighted to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Contact Info / Left */}
        <div className="lg:col-span-5 space-y-8">
          <div className="bg-white rounded-3xl p-8 border border-[#2C241E]/10 space-y-6 shadow-xs">
            <h3 className="text-xl font-serif font-bold text-[#2C241E]">
              Sanctuary Estate Location
            </h3>

            <div className="space-y-4 text-xs text-[#4E3F33]">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2C241E] mb-0.5">Physical Address:</strong>
                  <p className="text-[#6A5A4D] leading-relaxed">{siteSettings.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2C241E] mb-0.5">Sanctuary Visiting Hours:</strong>
                  <p className="text-[#6A5A4D]">{siteSettings.visitingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2C241E] mb-0.5">Guest & Booking Helpdesk:</strong>
                  <p className="text-[#6A5A4D] font-mono">{siteSettings.contactPhone}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
                <div>
                  <strong className="block text-[#2C241E] mb-0.5">Email Correspondence:</strong>
                  <p className="text-[#6A5A4D] font-mono">{siteSettings.contactEmail}</p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 text-xs text-[#6A5A4D]">
              <strong className="block text-[#2C241E] mb-1">Travel Directions:</strong>
              <p className="leading-relaxed">
                Located 2.5 hours from New Delhi via Yamuna Expressway. Nearest railway stations: Mathura Junction (25 mins) and Bharatpur (35 mins). Electric buggy assistance available from entrance gate.
              </p>
            </div>
          </div>
        </div>

        {/* Inquiry Form / Right */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#2C241E]/10 shadow-xs">
          {isSent ? (
            <div className="py-12 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-2xl font-serif font-bold text-[#2C241E]">
                Inquiry Successfully Transmitted
              </h3>
              <p className="text-xs text-[#6A5A4D] max-w-sm mx-auto">
                Thank you for reaching out. A sanctuary coordinator will respond to {email} promptly.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-4 px-6 py-2.5 bg-[#FAF8F5] border border-gray-200 text-xs font-semibold rounded-xl text-[#2C241E]"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                Send an Inquiry Message
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-[#2C241E] block mb-1">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    placeholder="e.g. Rahul Verma"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#2C241E] block mb-1">Mobile Phone *</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                    placeholder="+91 98200 00000"
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Email Address *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="your.email@example.com"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Subject of Inquiry</label>
                <select
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                >
                  <option value="General Sanctuary Inquiry">General Sanctuary Inquiry</option>
                  <option value="Cow Co-Ownership & Sponsorship">Cow Co-Ownership & Sponsorship</option>
                  <option value="Elder Cow Care Program">Elder Cow Care Program</option>
                  <option value="Weekend Tourism & Retreat Booking">Weekend Tourism & Retreat Booking</option>
                  <option value="A2 Bilona Ghee Bulk Order">A2 Bilona Ghee Bulk Order</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Your Message</label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                  placeholder="Tell us how we can assist you..."
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#8E412A] hover:bg-[#783622] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry to Sanctuary Desk</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
