import React, { useState } from 'react';
import { Heart, ShieldCheck, Check, Sparkles, AlertCircle, ArrowRight, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';
import { RazorpayModal } from '../components/ui/RazorpayModal';

interface ElderCowCarePageProps {
  navigate: (route: string) => void;
}

export const ElderCowCarePage: React.FC<ElderCowCarePageProps> = ({ navigate }) => {
  const { cows, carePlans, adoptCow, currentUser, switchUserRole } = useApp();

  const elderCows = cows.filter((c) => c.isElderCareProgram || c.category === 'elder');
  const elderPlan = carePlans.find((p) => p.type === 'elder_care') || carePlans[1];

  const [selectedCowId, setSelectedCowId] = useState<string>(elderCows[0]?.id || '');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const [sponsorName, setSponsorName] = useState(currentUser?.name || 'Aditi Sharma');
  const [sponsorEmail, setSponsorEmail] = useState(currentUser?.email || 'aditi.sharma@example.com');
  const [sponsorPhone, setSponsorPhone] = useState(currentUser?.phone || '+91 98201 54321');

  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [certRef, setCertRef] = useState('');

  const selectedCow = cows.find((c) => c.id === selectedCowId) || elderCows[0];
  const amountToPay = billingCycle === 'annual' ? elderPlan.annualFee : elderPlan.monthlyFee;

  const handleStartPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) switchUserRole('customer');
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedCow) {
      adoptCow(selectedCow.id, elderPlan.id, billingCycle);
      setCertRef(`CTS-ELDER-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`);
      setIsSuccess(true);
    }
  };

  if (isSuccess && selectedCow) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold text-[#B85D36] uppercase tracking-wider">
          Elder Sponsorship Active
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C241E]">
          Thank You for Giving {selectedCow.name} a Peaceful Golden Age
        </h1>

        <div className="p-6 bg-white rounded-2xl border border-[#2C241E]/10 shadow-xs text-left max-w-lg mx-auto space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
              <FallbackImage src={selectedCow.imageUrl} alt={selectedCow.name} className="w-full h-full" category="elder" />
            </div>
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2C241E]">{selectedCow.name}</h3>
              <p className="text-xs text-[#8C7A6B] font-mono">Tag: {selectedCow.tagNumber} · Age: {selectedCow.ageYears} yrs</p>
              <p className="text-xs text-[#B85D36] font-medium mt-1">Elder Hospice Sponsorship</p>
            </div>
          </div>

          <div className="border-t border-gray-100 pt-3 text-xs text-[#4E3F33] space-y-1.5 font-mono">
            <p>Certificate Ref: <span className="font-bold text-[#2C241E]">{certRef}</span></p>
            <p>Sponsor: {sponsorName} ({sponsorEmail})</p>
            <p>Direct Care: Geriatric Mash, Joint Oil Therapy & Vet Oversight</p>
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
            onClick={() => navigate('/our-cows')}
            className="px-6 py-3 bg-white border border-[#2C241E]/15 text-[#2C241E] text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Meet Other Herds
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#B85D36] uppercase tracking-wider">
          Sacred Retirement & Geriatric Sanctuary
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Care for an Elder Cow: Dignity in Their Sunset Years
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          When cows age and no longer produce milk or work fields, commercial systems abandon them. Cow Town’s Elder Cow Wing provides soft straw bedding, warm herbal oil joint rubs, easily digestible steamed nutrition, and continuous medical supervision.
        </p>
      </div>

      {/* 3 Pillars of Elder Care */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-2xl bg-white border border-[#2C241E]/10 space-y-3">
          <Heart className="w-6 h-6 text-[#B85D36]" />
          <h3 className="font-serif font-bold text-lg text-[#2C241E]">
            Geriatric Nutrition
          </h3>
          <p className="text-xs text-[#6A5A4D] leading-relaxed">
            Elder cows often have worn molars. We cook warm porridge of crushed barley, jaggery, fenugreek, and fermented green silage so they absorb maximum calories effortlessly.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#2C241E]/10 space-y-3">
          <Sparkles className="w-6 h-6 text-amber-600" />
          <h3 className="font-serif font-bold text-lg text-[#2C241E]">
            Joint & Hoof Physiotherapy
          </h3>
          <p className="text-xs text-[#6A5A4D] leading-relaxed">
            Weekly abhyanga massage using medicated warm sesame, shallaki, and camphor oil soothes arthritic knees. Hooves are trimmed and conditioned with antifungal neem balm.
          </p>
        </div>

        <div className="p-6 rounded-2xl bg-white border border-[#2C241E]/10 space-y-3">
          <ShieldCheck className="w-6 h-6 text-emerald-700" />
          <h3 className="font-serif font-bold text-lg text-[#2C241E]">
            Palliative Veterinary Care
          </h3>
          <p className="text-xs text-[#6A5A4D] leading-relaxed">
            Daily morning rounds by our veterinary surgeon, monitoring pulse, digestion, respiratory comfort, and pain-free dignified mobility in shaded soft-earth paddocks.
          </p>
        </div>
      </div>

      {/* Interactive Sponsorship Form */}
      <form onSubmit={handleStartPayment} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-8">
          {/* Elder Selection */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2C241E]">
              1. Select an Elder Resident to Sponsor
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {elderCows.map((cow) => {
                const isSelected = cow.id === selectedCowId;
                return (
                  <div
                    key={cow.id}
                    onClick={() => setSelectedCowId(cow.id)}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                      isSelected
                        ? 'border-[#B85D36] bg-[#FAF8F5] ring-2 ring-[#B85D36]/20'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="h-28 rounded-lg overflow-hidden mb-2">
                      <FallbackImage src={cow.imageUrl} alt={cow.name} className="w-full h-full" category="elder" />
                    </div>
                    <span className="font-serif font-bold text-sm text-[#2C241E] block">{cow.name}</span>
                    <span className="text-[11px] text-[#B85D36] font-mono">Age: {cow.ageYears} yrs ({cow.breed})</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sponsor Form */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2C241E]">
              2. Sponsor Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Your Full Name *</label>
                <input
                  type="text"
                  value={sponsorName}
                  onChange={(e) => setSponsorName(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#B85D36]"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  value={sponsorPhone}
                  onChange={(e) => setSponsorPhone(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#B85D36]"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Email (for health bulletins) *</label>
                <input
                  type="email"
                  value={sponsorEmail}
                  onChange={(e) => setSponsorEmail(e.target.value)}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#B85D36]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Plan card & payment */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-6 shadow-sm sticky top-24">
            <div>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B85D36]">
                Elder Sponsorship Plan
              </span>
              <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                {elderPlan.title}
              </h3>
              <p className="text-xs text-[#6A5A4D] mt-1 leading-relaxed">
                Directly provides customized soft mash, straw bedding, and daily veterinary physiotherapy for {selectedCow?.name}.
              </p>
            </div>

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
                Monthly (₹2,800/mo)
              </button>
              <button
                type="button"
                onClick={() => setBillingCycle('annual')}
                className={`py-2 px-3 rounded-lg font-medium transition-colors cursor-pointer ${
                  billingCycle === 'annual'
                    ? 'bg-white text-[#B85D36] font-bold shadow-xs'
                    : 'text-[#6A5A4D] hover:text-[#2C241E]'
                }`}
              >
                Annual (₹30,000/yr)
              </button>
            </div>

            <div className="space-y-2 pt-2 border-t border-gray-100">
              {elderPlan.features.map((feat, idx) => (
                <div key={idx} className="flex items-start gap-2 text-xs text-[#4E3F33]">
                  <Check className="w-4 h-4 text-[#B85D36] shrink-0 mt-0.5" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between">
              <div>
                <span className="text-xs text-[#8C7A6B] block">Contribution Amount:</span>
                <span className="text-2xl font-serif font-bold text-[#2C241E] font-mono">
                  ₹{amountToPay.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-[#B85D36] hover:bg-[#9E472A] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <Heart className="w-4 h-4" />
              <span>Sponsor {selectedCow?.name} via Razorpay</span>
            </button>
          </div>
        </div>
      </form>

      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={amountToPay}
        purpose={`Elder Cow Sponsorship - ${selectedCow?.name}`}
        customerName={sponsorName}
        customerEmail={sponsorEmail}
        customerPhone={sponsorPhone}
      />
    </div>
  );
};
