import React, { useState } from 'react';
import { User as UserIcon, Heart, ShieldCheck, ShoppingBag, Calendar, FileText, Activity, Clock, ArrowRight, Download, Truck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';

interface CustomerDashboardProps {
  navigate: (route: string) => void;
}

export const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ navigate }) => {
  const {
    currentUser,
    ownershipRecords,
    userMembership,
    orders,
    bookings,
    cows,
    switchUserRole,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'cows' | 'membership' | 'orders' | 'bookings' | 'certificates' | 'profile'
  >('cows');

  if (!currentUser) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#2C241E]">
          Sign In to Access Customer Portal
        </h1>
        <p className="text-xs text-[#6A5A4D]">
          Switch to our demo customer profile to test cow sponsorship dossiers, orders, and booking records.
        </p>
        <button
          onClick={() => switchUserRole('customer')}
          className="px-6 py-2.5 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
        >
          Sign In as Aditi Sharma (Family Custodian)
        </button>
      </div>
    );
  }

  const userCows = ownershipRecords.filter((rec) => rec.userId === currentUser.id);

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Top Header Card */}
      <div className="bg-[#2C241E] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-md">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#8E412A] text-white flex items-center justify-center font-serif text-2xl font-bold">
            {currentUser.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-serif font-bold text-white">
                {currentUser.name}
              </h1>
              <span className="bg-emerald-800 text-emerald-200 text-[10px] font-semibold px-2 py-0.5 rounded">
                Active Custodian
              </span>
            </div>
            <p className="text-xs text-gray-300 font-mono mt-0.5">{currentUser.email} · {currentUser.phone}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/own-a-cow')}
            className="px-4 py-2 bg-[#8E412A] hover:bg-[#A34B30] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
          >
            + Adopt Another Cow
          </button>
          <button
            onClick={() => navigate('/cow-tourism')}
            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-semibold rounded-xl border border-white/20 transition-colors cursor-pointer"
          >
            Book a Visit
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('cows')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'cows'
              ? 'bg-[#2C241E] text-white font-bold'
              : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          <Heart className="w-4 h-4 text-[#8E412A]" />
          <span>My Cows & Care Plans ({userCows.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('membership')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'membership'
              ? 'bg-[#2C241E] text-white font-bold'
              : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          <ShieldCheck className="w-4 h-4 text-emerald-600" />
          <span>Membership & Quota</span>
        </button>

        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'orders'
              ? 'bg-[#2C241E] text-white font-bold'
              : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          <ShoppingBag className="w-4 h-4 text-amber-600" />
          <span>Store Orders ({orders.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'bookings'
              ? 'bg-[#2C241E] text-white font-bold'
              : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          <Calendar className="w-4 h-4 text-blue-600" />
          <span>Tour Passes ({bookings.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('certificates')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'certificates'
              ? 'bg-[#2C241E] text-white font-bold'
              : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          <FileText className="w-4 h-4 text-purple-600" />
          <span>Certificates & Dossiers</span>
        </button>

        <button
          onClick={() => setActiveTab('profile')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer flex items-center gap-2 ${
            activeTab === 'profile'
              ? 'bg-[#2C241E] text-white font-bold'
              : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          <UserIcon className="w-4 h-4 text-gray-500" />
          <span>Profile & Address</span>
        </button>
      </div>

      {/* Tab 1: My Cows */}
      {activeTab === 'cows' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {userCows.map((rec) => {
              const fullCow = cows.find((c) => c.id === rec.cowId);
              return (
                <div
                  key={rec.id}
                  className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 shadow-xs space-y-4"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-24 h-24 rounded-2xl overflow-hidden shrink-0">
                      <FallbackImage
                        src={fullCow?.imageUrl || ''}
                        alt={rec.cowName}
                        className="w-full h-full"
                        category="cow"
                      />
                    </div>
                    <div className="space-y-1">
                      <span className="text-[10px] font-mono bg-[#FAF8F5] text-gray-600 px-2 py-0.5 rounded border border-gray-200">
                        {rec.cowTag}
                      </span>
                      <h3 className="font-serif font-bold text-xl text-[#2C241E]">
                        {rec.cowName}
                      </h3>
                      <p className="text-xs text-[#8E412A] font-medium">{rec.planTitle}</p>
                      <span className="inline-block text-[11px] text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                        Active Custodianship
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 p-3 bg-[#FAF8F5] rounded-xl text-xs font-mono">
                    <div>
                      <span className="text-gray-500 block text-[10px]">Monthly Ghee:</span>
                      <span className="font-bold text-[#2C241E]">{rec.monthlyGheeAllotmentKg} kg A2 Bilona</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">Visits Used:</span>
                      <span className="font-bold text-[#2C241E]">{rec.visitsUsed} / {rec.allowedVisitsPerYear} visits</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">Next Renewal:</span>
                      <span className="font-bold text-[#2C241E]">{rec.nextRenewalDate}</span>
                    </div>
                    <div>
                      <span className="text-gray-500 block text-[10px]">Certificate:</span>
                      <span className="font-bold text-[#8E412A]">{rec.certificateNumber}</span>
                    </div>
                  </div>

                  {/* Recent Health Updates for this cow */}
                  {fullCow?.updates && fullCow.updates.length > 0 && (
                    <div className="pt-2 border-t border-gray-100">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-gray-700 block mb-2">
                        Latest Veterinary & Pasture Note:
                      </span>
                      <div className="p-3 bg-amber-50/60 rounded-xl text-xs space-y-1 border border-amber-100">
                        <div className="flex justify-between font-semibold text-[#8E412A]">
                          <span>{fullCow.updates[0].title}</span>
                          <span className="font-mono text-[10px] text-gray-500">{fullCow.updates[0].date}</span>
                        </div>
                        <p className="text-gray-600 text-[11px]">{fullCow.updates[0].summary}</p>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Tab 2: Membership */}
      {activeTab === 'membership' && (
        <div className="bg-white rounded-3xl p-8 border border-[#2C241E]/10 space-y-6 shadow-xs max-w-2xl">
          {userMembership ? (
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-gray-100 pb-4">
                <div>
                  <span className="text-xs uppercase font-semibold text-[#8E412A]">Annual Membership</span>
                  <h3 className="text-2xl font-serif font-bold text-[#2C241E]">{userMembership.planName}</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">Card ID: {userMembership.memberIdCard}</p>
                </div>
                <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-semibold rounded-full">
                  ACTIVE
                </span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 bg-[#FAF8F5] rounded-2xl">
                  <span className="text-gray-500 block text-[11px]">A2 Bilona Ghee Claimed:</span>
                  <span className="text-xl font-bold text-[#8E412A] block mt-1">
                    {userMembership.gheeQuotaUsedKg} / {userMembership.gheeQuotaTotalKg} kg
                  </span>
                  <span className="text-[10px] text-gray-400">Next jar dispatched 1st of next month</span>
                </div>

                <div className="p-4 bg-[#FAF8F5] rounded-2xl">
                  <span className="text-gray-500 block text-[11px]">Free Tour Visits Remaining:</span>
                  <span className="text-xl font-bold text-emerald-700 block mt-1">
                    {userMembership.freeVisitsRemaining} Visits
                  </span>
                  <span className="text-[10px] text-gray-400">Valid until {userMembership.expiryDate}</span>
                </div>
              </div>

              <div className="p-4 bg-emerald-50 rounded-2xl text-xs text-emerald-900 border border-emerald-100 space-y-1">
                <strong className="block">Active Member Privileges:</strong>
                <p>• 15% automatic discount on all store items applied at checkout</p>
                <p>• Complimentary admission to Ekadashi Sunrise Gau Puja and Aarti</p>
                <p>• Priority booking access for high-demand harvest festivals</p>
              </div>
            </div>
          ) : (
            <div className="text-center py-8 space-y-3">
              <p className="text-xs text-gray-600">You currently have no active annual membership.</p>
              <button
                onClick={() => navigate('/membership')}
                className="px-6 py-2.5 bg-[#8E412A] text-white text-xs font-semibold rounded-xl"
              >
                Explore Membership Plans
              </button>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Store Orders */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.id}
              className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 pb-3">
                <div>
                  <span className="font-serif font-bold text-base text-[#2C241E]">{ord.orderNumber}</span>
                  <span className="text-xs text-gray-500 font-mono block">Placed on {new Date(ord.createdAt).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold font-mono bg-blue-50 text-blue-800 uppercase">
                    {ord.orderStatus}
                  </span>
                  <span className="font-mono font-bold text-sm text-[#2C241E]">
                    ₹{ord.total.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="divide-y divide-gray-100 text-xs">
                {ord.items.map((it, idx) => (
                  <div key={idx} className="py-2 flex items-center justify-between">
                    <span>{it.quantity}x {it.productName} ({it.variantName || 'standard'})</span>
                    <span className="font-mono">₹{it.subtotal.toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>

              {ord.trackingNumber && (
                <div className="pt-2 flex items-center gap-2 text-xs text-emerald-800 bg-emerald-50 px-3 py-2 rounded-xl">
                  <Truck className="w-4 h-4 shrink-0" />
                  <span>Tracking: <strong>{ord.trackingNumber}</strong></span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Tour Bookings */}
      {activeTab === 'bookings' && (
        <div className="space-y-4">
          {bookings.map((bk) => (
            <div
              key={bk.id}
              className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 space-y-3 shadow-xs"
            >
              <div className="flex justify-between items-center border-b border-gray-100 pb-3">
                <div>
                  <span className="text-xs text-gray-500 font-mono">Ref: {bk.bookingRef}</span>
                  <h4 className="font-serif font-bold text-base text-[#2C241E]">{bk.packageTitle}</h4>
                </div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  {bk.bookingStatus.toUpperCase()}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-mono">
                <div>
                  <span className="text-gray-500 block text-[10px]">Visit Date:</span>
                  <span className="font-bold text-[#2C241E]">{bk.bookingDate}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Timing Slot:</span>
                  <span className="font-bold text-[#2C241E]">{bk.timeSlot}</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Total Guests:</span>
                  <span className="font-bold text-[#2C241E]">{bk.totalGuests} Guests</span>
                </div>
                <div>
                  <span className="text-gray-500 block text-[10px]">Amount Paid:</span>
                  <span className="font-bold text-emerald-700">₹{bk.totalAmount}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 5: Certificates */}
      {activeTab === 'certificates' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {userCows.map((rec) => (
            <div
              key={rec.id}
              className="bg-[#FAF8F5] border-2 border-[#E4D5C7] rounded-3xl p-8 space-y-4 relative shadow-sm"
            >
              <div className="text-center space-y-1 border-b border-[#E4D5C7] pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#8E412A]">
                  Official Sanctuary Custodian Certificate
                </span>
                <h3 className="font-serif font-bold text-xl text-[#2C241E]">
                  Certificate of Sacred Cow Guardianship
                </h3>
                <span className="text-xs font-mono text-[#8C7A6B]">
                  No. {rec.certificateNumber}
                </span>
              </div>

              <p className="text-xs text-center text-[#4E3F33] leading-relaxed italic">
                "This certifies that <strong>{currentUser.name}</strong> and family have entered into sacred custodianship for indigenous cow <strong>{rec.cowName}</strong> ({rec.cowTag}), ensuring lifelong green fodder, shelter, and medical care at Cow Town Sanctuary Ltd."
              </p>

              <div className="flex justify-between items-end pt-4 text-[10px] text-gray-500 border-t border-[#E4D5C7]">
                <div>
                  <span className="block font-bold text-[#2C241E]">Dr. Rameshwar Rao</span>
                  <span>Chief Veterinary Officer</span>
                </div>
                <div className="text-right">
                  <span className="block font-bold text-[#2C241E]">Mathura Eco-Corridor</span>
                  <span>Established under Ahimsa Charter</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 6: Profile */}
      {activeTab === 'profile' && (
        <div className="bg-white rounded-3xl p-8 border border-[#2C241E]/10 max-w-xl space-y-4 shadow-xs">
          <h3 className="font-serif font-bold text-xl text-[#2C241E]">
            Profile & Registered Shipping Address
          </h3>
          <div className="text-xs space-y-2 text-[#4E3F33]">
            <p><strong>Name:</strong> {currentUser.name}</p>
            <p><strong>Email:</strong> {currentUser.email}</p>
            <p><strong>Phone:</strong> {currentUser.phone}</p>
            <div className="pt-2 border-t border-gray-100">
              <strong className="block mb-1">Default Address:</strong>
              <p>{currentUser.address?.line1}</p>
              <p>{currentUser.address?.line2}</p>
              <p>{currentUser.address?.city}, {currentUser.address?.state} - {currentUser.address?.postalCode}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
