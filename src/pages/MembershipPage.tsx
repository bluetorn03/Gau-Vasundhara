import React, { useState } from 'react';
import { ShieldCheck, Check, ArrowRight, Star, Sparkles, Heart, CheckCircle2 } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { RazorpayModal } from '../components/ui/RazorpayModal';

interface MembershipPageProps {
  navigate: (route: string) => void;
}

export const MembershipPage: React.FC<MembershipPageProps> = ({ navigate }) => {
  const { membershipPlans, subscribeMembership, userMembership, currentUser, switchUserRole } = useApp();
  const [selectedPlanId, setSelectedPlanId] = useState<string>('mem_gold');
  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedPlan = membershipPlans.find((p) => p.id === selectedPlanId) || membershipPlans[1];

  const handleStartPurchase = (planId: string) => {
    setSelectedPlanId(planId);
    if (!currentUser) switchUserRole('customer');
    setIsRazorpayOpen(true);
  };

  const handlePaymentSuccess = () => {
    subscribeMembership(selectedPlanId);
    setIsSuccess(true);
  };

  if (isSuccess && userMembership) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Membership Activated
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C241E]">
          Welcome to the {userMembership.planName}
        </h1>

        <div className="p-6 bg-white rounded-2xl border border-[#2C241E]/10 shadow-xs text-left space-y-3 font-mono text-xs">
          <p>Member ID Card: <strong className="text-[#8E412A]">{userMembership.memberIdCard}</strong></p>
          <p>Validity: {userMembership.startDate} to {userMembership.expiryDate}</p>
          <p>Annual A2 Vedic Ghee Allotment: {userMembership.gheeQuotaTotalKg} kg (Shipped to registered address)</p>
          <p>Sanctuary Free Visit Passes: {userMembership.totalVisitsAllowed} visits</p>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
          >
            Access My Member Dashboard
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-white border border-[#2C241E]/15 text-[#2C241E] text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Shop with Member Privilege Discount
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Sanctuary Membership
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Nourish Your Household & Champion Indigenous Cows
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Sanctuary membership connects your family with ethical A2 Vedic bilona ghee, priority weekend visit privileges, and dedicated cow guardianship.
        </p>
      </div>

      {/* 3 Tier Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
        {membershipPlans.map((plan) => {
          const isGold = plan.isRecommended;
          return (
            <div
              key={plan.id}
              className={`rounded-3xl p-8 flex flex-col justify-between transition-all relative ${
                isGold
                  ? 'bg-[#2C241E] text-white shadow-xl ring-2 ring-[#8E412A]'
                  : 'bg-white text-[#2C241E] border border-[#2C241E]/10 shadow-xs hover:shadow-md'
              }`}
            >
              {isGold && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#8E412A] text-white text-[11px] font-semibold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-xs">
                  Most Cherished Family Tier
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <span className={`text-xs uppercase tracking-wider font-semibold ${isGold ? 'text-amber-400' : 'text-[#8E412A]'}`}>
                    {plan.tier.toUpperCase()} TIER
                  </span>
                  <h3 className="text-2xl font-serif font-bold mt-1">
                    {plan.name}
                  </h3>
                  <p className={`text-xs mt-2 leading-relaxed ${isGold ? 'text-gray-300' : 'text-[#6A5A4D]'}`}>
                    {plan.tagline}
                  </p>
                </div>

                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-serif font-bold font-mono">
                    ₹{plan.annualFee.toLocaleString('en-IN')}
                  </span>
                  <span className={`text-xs ${isGold ? 'text-gray-400' : 'text-[#8C7A6B]'}`}>
                    / year
                  </span>
                </div>

                {/* Benefits List */}
                <div className={`space-y-3 pt-4 border-t ${isGold ? 'border-white/15' : 'border-gray-100'}`}>
                  {plan.benefits.map((b, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs">
                      <Check className={`w-4 h-4 shrink-0 mt-0.5 ${isGold ? 'text-amber-400' : 'text-emerald-700'}`} />
                      <span className={isGold ? 'text-gray-200' : 'text-[#4E3F33]'}>{b}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => handleStartPurchase(plan.id)}
                  className={`w-full py-3.5 text-xs font-semibold rounded-xl transition-all shadow-xs cursor-pointer flex items-center justify-center gap-2 ${
                    isGold
                      ? 'bg-[#8E412A] hover:bg-[#A34B30] text-white'
                      : 'bg-[#FAF8F5] hover:bg-[#8E412A] text-[#2C241E] hover:text-white border border-[#2C241E]/15 hover:border-transparent'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Join as {plan.name}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Comparison Matrix */}
      <div className="bg-white rounded-3xl p-8 border border-[#2C241E]/10 space-y-6">
        <h3 className="text-xl font-serif font-bold text-[#2C241E]">
          Tier Comparison Matrix
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-gray-200 text-[#8C7A6B] uppercase font-semibold">
                <th className="py-3 px-4">Membership Privilege</th>
                <th className="py-3 px-4">Sanctuary Friend</th>
                <th className="py-3 px-4 font-bold text-[#8E412A]">Family Custodian</th>
                <th className="py-3 px-4">Patron Circle</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-[#4E3F33]">
              <tr>
                <td className="py-3 px-4 font-medium">Annual A2 Bilona Ghee Quota</td>
                <td className="py-3 px-4 font-mono">1.0 kg (2 x 500ml)</td>
                <td className="py-3 px-4 font-mono font-bold text-[#8E412A]">3.0 kg (6 x 500ml)</td>
                <td className="py-3 px-4 font-mono">6.0 kg (12 x 500ml)</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Free Day Tour Guest Passes</td>
                <td className="py-3 px-4 font-mono">2 passes</td>
                <td className="py-3 px-4 font-mono font-bold text-[#8E412A]">Unlimited Family (4/visit)</td>
                <td className="py-3 px-4 font-mono">Unlimited + 8 VIP Passes</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Store Privilege Discount</td>
                <td className="py-3 px-4 font-mono">10% off</td>
                <td className="py-3 px-4 font-mono font-bold text-[#8E412A]">15% off</td>
                <td className="py-3 px-4 font-mono">20% off</td>
              </tr>
              <tr>
                <td className="py-3 px-4 font-medium">Eco-Cottage Retreat Stay</td>
                <td className="py-3 px-4 text-gray-400">—</td>
                <td className="py-3 px-4 text-gray-400">—</td>
                <td className="py-3 px-4 font-semibold text-emerald-800">2-Night Complimentary Stay</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handlePaymentSuccess}
        amount={selectedPlan.annualFee}
        purpose={`Cow Town Membership - ${selectedPlan.name}`}
        customerName={currentUser?.name || 'Customer'}
        customerEmail={currentUser?.email || 'customer@example.com'}
      />
    </div>
  );
};
