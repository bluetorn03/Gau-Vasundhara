import React, { useState } from 'react';
import { Heart, Check, ArrowRight, ShieldCheck, Sparkles, User as UserIcon, Calendar, Gift, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';
import { RazorpayModal } from '../components/ui/RazorpayModal';
import { Cow } from '../types';

interface OwnCowPageProps {
  navigate: (route: string) => void;
}

export const OwnCowPage: React.FC<OwnCowPageProps> = ({ navigate }) => {
  const { cows, carePlans, adoptCow, currentUser, switchUserRole } = useApp();

  const availableCows = cows.filter((c) => c.isAvailableForOwnership);
  const selectedPlan = carePlans.find((p) => p.type === 'family_ownership') || carePlans[0];

  const [selectedCowId, setSelectedCowId] = useState<string>(availableCows[0]?.id || '');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  // Form details
  const [custodianName, setCustodianName] = useState(currentUser?.name || 'Aditi Sharma');
  const [custodianEmail, setCustodianEmail] = useState(currentUser?.email || 'aditi.sharma@example.com');
  const [custodianPhone, setCustodianPhone] = useState(currentUser?.phone || '+91 98201 54321');
  const [dedicationMessage, setDedicationMessage] = useState('Dedicated to the good health and prosperity of our family');

  // Payment modal state
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [certificateRef, setCertificateRef] = useState('');

  const selectedCow = cows.find((c) => c.id === selectedCowId) || availableCows[0];

  const amountToPay = billingCycle === 'annual' ? selectedPlan.annualFee : selectedPlan.monthlyFee;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      switchUserRole('customer');
    }
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedCow) {
      adoptCow(selectedCow.id, selectedPlan.id, billingCycle);
      setCertificateRef(`CTS-CUST-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
      setIsSuccess(true);
    }
  };

  if (isSuccess && selectedCow) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Custodianship Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C241E]">
          Congratulations! You are now the Lifelong Guardian of {selectedCow.name}
        </h1>

        <div className="p-6 bg-white rounded-2xl border border-[#2C241E]/10 shadow-xs text-left max-w-lg mx-auto space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <FallbackImage src={selectedCow.imageUrl} alt={selectedCow.name} className="w-full h-full" category="cow" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2C241E]">{selectedCow.name}</h3>
              <p className="text-xs text-[#8C7A6B] font-mono">Tag: {selectedCow.tagNumber} · {selectedCow.breed}</p>
              <p className="text-xs text-emerald-700 font-medium mt-1">Status: Active Family Custodianship</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 text-xs text-[#4E3F33] space-y-1.5 font-mono">
            <p>Certificate Ref: <span className="font-bold text-[#2C241E]">{certificateRef}</span></p>
            <p>Custodian: {custodianName} ({custodianEmail})</p>
            <p>Monthly A2 Ghee Allotment: 500 ml (Shipped to your doorstep)</p>
            <p>Free Family Sanctuary Visits: 12 passes per year</p>
          </div>
        </div>

        <p className="text-xs text-[#6A5A4D] max-w-md mx-auto">
          A digital copy of your Certificate of Custodianship along with Dr. Rao’s initial health dossier has been emailed to {custodianEmail}.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
          >
            Go to My Custodian Dashboard
          </button>
          <button
            onClick={() => navigate('/cow-tourism')}
            className="px-6 py-3 bg-white border border-[#2C241E]/15 text-[#2C241E] text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Plan Your First Visit to Meet {selectedCow.name}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Family Co-Custodianship Program
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Own & Care for an Indigenous Cow at Cow Town Sanctuary
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Adopt a resident cow in our serene sanctuary pastures. Your family becomes their lifelong recognized guardian. In return, you receive doorstep monthly deliveries of pure Vedic A2 bilona ghee, quarterly health reports, and unlimited visits.
        </p>
      </div>

      {/* 4-Step Process Breadcrumb */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl bg-white border border-[#2C241E]/10 text-xs">
        <div className="flex items-center gap-2 text-[#8E412A] font-semibold">
          <span className="w-5 h-5 rounded-full bg-[#8E412A]/10 flex items-center justify-center font-mono">1</span>
          <span>Select Your Cow</span>
        </div>
        <div className="flex items-center gap-2 text-[#8E412A] font-semibold">
          <span className="w-5 h-5 rounded-full bg-[#8E412A]/10 flex items-center justify-center font-mono">2</span>
          <span>Review Benefits</span>
        </div>
        <div className="flex items-center gap-2 text-[#8E412A] font-semibold">
          <span className="w-5 h-5 rounded-full bg-[#8E412A]/10 flex items-center justify-center font-mono">3</span>
          <span>Custodian Form</span>
        </div>
        <div className="flex items-center gap-2 text-[#8E412A] font-semibold">
          <span className="w-5 h-5 rounded-full bg-[#8E412A]/10 flex items-center justify-center font-mono">4</span>
          <span>Secure Razorpay</span>
        </div>
      </div>

      <form onSubmit={handleStartPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Column: Select Cow & Custodian Form */}
        <div className="lg:col-span-7 space-y-8">
          {/* Step 1: Select Cow */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2C241E] flex items-center gap-2">
              <span>Step 1: Choose Your Resident Cow</span>
            </h3>
            <p className="text-xs text-[#6A5A4D]">
              Select which indigenous cow your family wishes to co-own and sponsor:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {availableCows.map((cow) => {
                const isSelected = cow.id === selectedCowId;
                return (
                  <div
                    key={cow.id}
                    onClick={() => setSelectedCowId(cow.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#8E412A] bg-[#FAF8F5] ring-2 ring-[#8E412A]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="h-28 rounded-lg overflow-hidden mb-2">
                      <FallbackImage src={cow.imageUrl} alt={cow.name} className="w-full h-full" category="cow" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-sm text-[#2C241E]">{cow.name}</span>
                      <span className="text-[10px] text-gray-500 font-mono">{cow.tagNumber}</span>
                    </div>
                    <span className="text-[11px] text-[#8E412A] font-medium block">{cow.breed} · {cow.ageYears} yrs</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Step 2: Custodian Family Details */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2C241E]">
              Step 2: Custodian Family Registration
            </h3>
            <p className="text-xs text-[#6A5A4D]">
              These details will appear on your official Certificate of Custodianship.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">
                  Primary Custodian Name *
                </label>
                <input
                  type="text"
                  value={custodianName}
                  onChange={(e) => setCustodianName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">
                  Mobile Phone Number *
                </label>
                <input
                  type="tel"
                  value={custodianPhone}
                  onChange={(e) => setCustodianPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#2C241E] block mb-1">
                  Email Address (for quarterly vet reports & ghee dispatch tracking) *
                </label>
                <input
                  type="email"
                  value={custodianEmail}
                  onChange={(e) => setCustodianEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#2C241E] block mb-1">
                  Dedication / Blessing Line (optional)
                </label>
                <input
                  type="text"
                  value={dedicationMessage}
                  onChange={(e) => setDedicationMessage(e.target.value)}
                  placeholder="e.g. In memory of Late Shri Ramesh Sharma / In honor of our wedding anniversary"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Plan Summary, Benefits, Checkout Button */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-6 shadow-sm sticky top-24">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#8E412A]">
                Care Package
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                {selectedPlan.title}
              </h3>
              <p className="text-xs text-[#6A5A4D] mt-1 leading-relaxed">
                Complete green fodder, housing, dental & geriatric healthcare for {selectedCow?.name}.
              </p>
            </div>

            {/* Billing Cycle Selector */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[#FAF8F5] rounded-xl border border-gray-200 text-xs">
              <button
                type="button"
                onClick={() => setBillingCycle('monthly')}
                className={`py-2 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-[#2C241E] font-bold shadow-xs'
                    : 'text-[#6A5A4D] hover:text-[#2C241E]'
                }`}
              >
                Monthly Plan (₹3,500/mo)
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`py-2 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-white text-[#8E412A] font-bold shadow-xs'
                    : 'text-[#6A5A4D] hover:text-[#2C241E]'
                }`}
              >
                Annual Plan (₹38,000/yr)
              </button>
            </div>

            {/* Inclusions checklist */}
            <div className="space-y-2.5 pt-2 border-t border-gray-100">
              <span className="text-xs font-bold text-[#2C241E] block">
                Custodian Family Inclusions:
              </span>
              {selectedPlan.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#4E3F33]">
                  <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            {/* Pricing total */}
            <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#8C7A6B] block">Initial Payment Due:</span>
                <span className="text-2xl font-serif font-bold text-[#2C241E] font-mono">
                  ₹{amountToPay.toLocaleString('en-IN')}
                </span>
                <span className="text-[11px] text-gray-500 block">
                  {billingCycle === 'annual' ? 'Billed once annually' : 'Auto-renews monthly · Cancel anytime'}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#8E412A] hover:bg-[#783622] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Complete Custodianship via Razorpay</span>
            </button>

            <p className="text-[10px] text-center text-[#8C7A6B]">
              Secured with 256-bit encryption. UPI, Netbanking & Major Cards accepted.
            </p>
          </div>
        </div>
      </form>

      {/* Razorpay Integration Modal */}
      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={amountToPay}
        purpose={`Cow Town Custodianship - ${selectedCow?.name} (${selectedCow?.tagNumber})`}
        customerName={custodianName}
        customerEmail={custodianEmail}
        customerPhone={custodianPhone}
      />
    </div>
  );
};
