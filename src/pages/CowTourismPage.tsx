import React, { useState } from 'react';
import { Compass, Calendar, Clock, Users, Check, ArrowRight, ShieldCheck, CheckCircle2, MapPin } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';
import { TourPackage, TourBooking } from '../types';
import { RazorpayModal } from '../components/ui/RazorpayModal';

interface CowTourismPageProps {
  navigate: (route: string) => void;
}

export const CowTourismPage: React.FC<CowTourismPageProps> = ({ navigate }) => {
  const { tourPackages, bookTour, currentUser, switchUserRole } = useApp();

  const [selectedPackageId, setSelectedPackageId] = useState<string>(tourPackages[0].id);
  const [selectedDate, setSelectedDate] = useState<string>(
    new Date(Date.now() + 5 * 24 * 3600 * 1000).toISOString().split('T')[0]
  );
  const [timeSlot, setTimeSlot] = useState<string>('9:30 AM – 2:30 PM');
  const [adultsCount, setAdultsCount] = useState<number>(2);
  const [childrenCount, setChildrenCount] = useState<number>(1);
  const [specialRequests, setSpecialRequests] = useState<string>('');

  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<TourBooking | null>(null);

  const selectedPackage = tourPackages.find((p) => p.id === selectedPackageId) || tourPackages[0];

  const totalAmount =
    adultsCount * selectedPackage.pricePerAdult +
    childrenCount * selectedPackage.pricePerChild;

  const handleStartBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) switchUserRole('customer');
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = async () => {
    const booking = await bookTour(
      selectedPackage.id,
      selectedDate,
      timeSlot,
      adultsCount,
      childrenCount,
      specialRequests
    );
    setConfirmedBooking(booking);
  };

  if (confirmedBooking) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Visit Pass Issued
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C241E]">
          Your Sanctuary Visit is Confirmed!
        </h1>

        <div className="p-6 bg-white rounded-2xl border border-[#2C241E]/10 shadow-xs text-left max-w-lg mx-auto space-y-4 font-mono text-xs">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <span className="text-[11px] text-gray-500 block">Booking Reference</span>
              <span className="font-bold text-lg text-[#2C241E]">{confirmedBooking.bookingRef}</span>
            </div>
            <span className="bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded text-[11px] font-semibold">
              CONFIRMED
            </span>
          </div>

          <p>Experience: <strong className="text-[#2C241E]">{confirmedBooking.packageTitle}</strong></p>
          <p>Date: {confirmedBooking.bookingDate} ({confirmedBooking.timeSlot})</p>
          <p>Guests: {confirmedBooking.adultsCount} Adults, {confirmedBooking.childrenCount} Children ({confirmedBooking.totalGuests} Total)</p>
          <p>Amount Paid: ₹{confirmedBooking.totalAmount.toLocaleString('en-IN')}</p>
          {confirmedBooking.specialRequests && (
            <p>Notes: {confirmedBooking.specialRequests}</p>
          )}

          <div className="p-3 bg-[#FAF8F5] rounded-xl text-[11px] text-[#6A5A4D] font-sans">
            Please show this digital pass or booking ref <strong className="text-[#2C241E]">{confirmedBooking.bookingRef}</strong> at the sanctuary reception desk upon arrival. Comfortable walking shoes and cotton attire are recommended.
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
          >
            View in My Dashboard
          </button>
          <button
            onClick={() => navigate('/facilities')}
            className="px-6 py-3 bg-white border border-[#2C241E]/15 text-[#2C241E] text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Explore Sanctuary Facilities
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#2C5282] uppercase tracking-wider">
          Cow Town Tourism & Experiences
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Restorative Farm Retreats & Family Experiences
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Escape the noise of modern life. Walk peaceful pastures, bond with calm therapy cows, learn traditional bilona churning, and enjoy farm-fresh satvik meals cooked in brass vessels over gentle woodfire.
        </p>
      </div>

      {/* Package Selection Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {tourPackages.map((pkg) => {
          const isSelected = pkg.id === selectedPackageId;
          return (
            <div
              key={pkg.id}
              onClick={() => setSelectedPackageId(pkg.id)}
              className={`rounded-2xl p-5 border text-left cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'border-[#2C5282] bg-white ring-2 ring-[#2C5282]/20 shadow-md'
                  : 'border-[#2C241E]/10 bg-white hover:border-gray-300'
              }`}
            >
              <div>
                <div className="h-40 rounded-xl overflow-hidden mb-3">
                  <FallbackImage src={pkg.imageUrl} alt={pkg.title} className="w-full h-full" category="tourism" />
                </div>
                <h3 className="font-serif font-bold text-base text-[#2C241E] line-clamp-1">{pkg.title}</h3>
                <p className="text-xs text-[#6A5A4D] mt-1 line-clamp-2">{pkg.tagline}</p>
              </div>

              <div className="pt-4 border-t border-gray-100 mt-3 flex items-baseline justify-between">
                <div>
                  <span className="text-xs text-gray-500 block">Adult Pass</span>
                  <span className="font-mono font-bold text-sm text-[#2C5282]">₹{pkg.pricePerAdult}</span>
                </div>
                <span className="text-[11px] text-gray-500 font-mono">{pkg.durationHours} hrs</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Booking Module */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#2C241E]/10 shadow-xs">
        <form onSubmit={handleStartBooking} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Details / Left (lg:col-span-7) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-semibold text-[#2C5282] uppercase tracking-wider">
                Selected Experience
              </span>
              <h2 className="text-2xl font-serif font-bold text-[#2C241E] mt-1">
                {selectedPackage.title}
              </h2>
              <p className="text-xs text-[#6A5A4D] mt-2 leading-relaxed">
                {selectedPackage.description}
              </p>
            </div>

            {/* Date & Slot */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-[#2C241E] block mb-1">
                  Choose Visit Date *
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#2C5282]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2C241E] block mb-1">
                  Time Slot *
                </label>
                <select
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#2C5282]"
                >
                  <option value={selectedPackage.timing}>{selectedPackage.timing}</option>
                  <option value="Custom Morning Slot (By Request)">Custom Morning Slot</option>
                </select>
              </div>
            </div>

            {/* Guest Counts */}
            <div className="grid grid-cols-2 gap-4 pt-2">
              <div>
                <label className="text-xs font-semibold text-[#2C241E] block mb-1">
                  Adults (₹{selectedPackage.pricePerAdult} each)
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl bg-[#FAF8F5] p-1">
                  <button
                    type="button"
                    onClick={() => setAdultsCount(Math.max(1, adultsCount - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="grow text-center text-xs font-mono font-bold">{adultsCount}</span>
                  <button
                    type="button"
                    onClick={() => setAdultsCount(adultsCount + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-[#2C241E] block mb-1">
                  Children 5-12 yrs (₹{selectedPackage.pricePerChild} each)
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl bg-[#FAF8F5] p-1">
                  <button
                    type="button"
                    onClick={() => setChildrenCount(Math.max(0, childrenCount - 1))}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-white cursor-pointer"
                  >
                    -
                  </button>
                  <span className="grow text-center text-xs font-mono font-bold">{childrenCount}</span>
                  <button
                    type="button"
                    onClick={() => setChildrenCount(childrenCount + 1)}
                    className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-white cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Special notes */}
            <div>
              <label className="text-xs font-semibold text-[#2C241E] block mb-1">
                Special Dietary or Accessibility Requests (Senior citizen buggy, etc.)
              </label>
              <input
                type="text"
                value={specialRequests}
                onChange={(e) => setSpecialRequests(e.target.value)}
                placeholder="e.g. Jain satvik preparation / Buggy assistance for grandmother"
                className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#2C5282]"
              />
            </div>

            {/* Itinerary Schedule */}
            <div className="pt-4 border-t border-gray-100 space-y-3">
              <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C241E]">
                Day Schedule & Itinerary
              </h4>
              <div className="space-y-2">
                {selectedPackage.itinerary.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-xs">
                    <span className="font-mono font-semibold text-[#2C5282] shrink-0 w-20">{item.time}</span>
                    <span className="text-[#4E3F33]">{item.activity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Pricing & Checkout / Right (lg:col-span-5) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-gray-200 space-y-5 sticky top-24">
              <h3 className="text-lg font-serif font-bold text-[#2C241E]">
                Booking Summary
              </h3>

              <div className="space-y-2.5 text-xs text-[#4E3F33]">
                <div className="flex justify-between">
                  <span>Adult Passes ({adultsCount}x):</span>
                  <span className="font-mono">₹{(adultsCount * selectedPackage.pricePerAdult).toLocaleString('en-IN')}</span>
                </div>
                {childrenCount > 0 && (
                  <div className="flex justify-between">
                    <span>Child Passes ({childrenCount}x):</span>
                    <span className="font-mono">₹{(childrenCount * selectedPackage.pricePerChild).toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="pt-3 border-t border-gray-200 flex justify-between items-baseline text-sm font-bold text-[#2C241E]">
                  <span>Total Payable:</span>
                  <span className="text-2xl font-serif font-mono text-[#2C5282]">
                    ₹{totalAmount.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="space-y-2 pt-2 border-t border-gray-200 text-xs text-[#6A5A4D]">
                <span className="font-semibold block text-[#2C241E]">Included in this pass:</span>
                {selectedPackage.inclusions.map((inc, i) => (
                  <p key={i} className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{inc}</span>
                  </p>
                ))}
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#2C5282] hover:bg-[#1E3A5F] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Reserve Passes via Razorpay</span>
              </button>

              <p className="text-[10px] text-center text-gray-400">
                Full refund available up to 48 hours prior to scheduled arrival time.
              </p>
            </div>
          </div>
        </form>
      </div>

      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={totalAmount}
        purpose={`Cow Town Sanctuary Visit - ${selectedPackage.title}`}
        customerName={currentUser?.name || 'Visitor'}
        customerEmail={currentUser?.email || 'visitor@example.com'}
      />
    </div>
  );
};
