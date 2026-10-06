import React, { useState } from 'react';
import { ShieldCheck, ArrowRight, CheckCircle2, ShoppingBag, Truck, CreditCard, Banknote, ArrowLeft } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Address, Order } from '../types';
import { RazorpayModal } from '../components/ui/RazorpayModal';

interface CheckoutPageProps {
  navigate: (route: string) => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({ navigate }) => {
  const {
    cart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    createOrder,
    currentUser,
    switchUserRole,
  } = useApp();

  const [address, setAddress] = useState<Address>({
    fullName: currentUser?.name || 'Aditi Sharma',
    phone: currentUser?.phone || '+91 98201 54321',
    line1: currentUser?.address?.line1 || 'B-402, Vrindavan Heights, Palm Beach Road',
    line2: currentUser?.address?.line2 || 'Sector 19, Sanpada',
    city: currentUser?.address?.city || 'Navi Mumbai',
    state: currentUser?.address?.state || 'Maharashtra',
    postalCode: currentUser?.address?.postalCode || '400705',
  });

  const [paymentMethod, setPaymentMethod] = useState<'razorpay' | 'cod'>('razorpay');
  const [deliveryNotes, setDeliveryNotes] = useState('');

  const [isRazorpayOpen, setIsRazorpayOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (cart.length === 0 && !placedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <h1 className="text-2xl font-serif font-bold text-[#2C241E]">
          No items in cart to checkout
        </h1>
        <button
          onClick={() => navigate('/shop')}
          className="px-6 py-2.5 bg-[#8E412A] text-white text-xs font-semibold rounded-xl"
        >
          Return to Store
        </button>
      </div>
    );
  }

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) switchUserRole('customer');

    if (paymentMethod === 'razorpay') {
      setIsRazorpayOpen(true);
    } else {
      // Cash on Delivery
      setIsProcessing(true);
      const newOrder = await createOrder(address, 'cod', deliveryNotes);
      setIsProcessing(false);
      setPlacedOrder(newOrder);
    }
  };

  const handleRazorpaySuccess = async () => {
    setIsProcessing(true);
    const newOrder = await createOrder(address, 'razorpay', deliveryNotes);
    setIsProcessing(false);
    setPlacedOrder(newOrder);
  };

  if (placedOrder) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Order Confirmed
        </span>

        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C241E]">
          Thank You! Your Sanctuary Harvest is Confirmed
        </h1>

        <div className="p-6 bg-white rounded-2xl border border-[#2C241E]/10 shadow-xs text-left max-w-lg mx-auto space-y-4">
          <div className="flex justify-between items-center border-b border-gray-100 pb-3">
            <div>
              <span className="text-xs text-gray-500 block">Order Reference</span>
              <span className="font-serif font-bold text-lg text-[#2C241E]">{placedOrder.orderNumber}</span>
            </div>
            <div className="text-right">
              <span className="text-xs text-gray-500 block">Total Amount</span>
              <span className="font-mono font-bold text-lg text-[#8E412A]">₹{placedOrder.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          <div className="text-xs text-[#4E3F33] space-y-1.5 font-mono">
            <p>Payment: <span className="font-bold uppercase text-emerald-700">{placedOrder.paymentMethod} ({placedOrder.paymentStatus})</span></p>
            <p>Dispatched to: {placedOrder.shippingAddress.fullName}</p>
            <p>{placedOrder.shippingAddress.line1}, {placedOrder.shippingAddress.city}, {placedOrder.shippingAddress.postalCode}</p>
            <p>Carrier Tracking: <span className="text-[#2C241E] font-bold">{placedOrder.trackingNumber}</span></p>
          </div>

          <div className="pt-2 border-t border-gray-100">
            <span className="text-xs font-semibold text-[#2C241E] block mb-1">Items Ordered:</span>
            {placedOrder.items.map((it, i) => (
              <div key={i} className="flex justify-between text-xs text-gray-600 py-0.5">
                <span>{it.quantity}x {it.productName} ({it.variantName || 'standard'})</span>
                <span className="font-mono">₹{it.subtotal.toLocaleString('en-IN')}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-[#6A5A4D] max-w-md mx-auto">
          A receipt and tracking confirmation has been sent to {placedOrder.customerEmail}. Our logistics team will pack your items with insulated, shock-absorbent eco-packaging.
        </p>

        <div className="flex justify-center gap-4 pt-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="px-6 py-3 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
          >
            Track in Customer Dashboard
          </button>
          <button
            onClick={() => navigate('/shop')}
            className="px-6 py-3 bg-white border border-[#2C241E]/15 text-[#2C241E] text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Continue Browsing Store
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="flex items-center gap-2 text-xs text-[#8C7A6B]">
        <button onClick={() => navigate('/cart')} className="hover:text-[#2C241E] flex items-center gap-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Shopping Bag</span>
        </button>
      </div>

      <h1 className="text-3xl font-serif font-bold text-[#2C241E]">
        Checkout & Secure Dispatch
      </h1>

      <form onSubmit={handleSubmitOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Form (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-8">
          {/* Shipping Address */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2C241E] flex items-center gap-2">
              <Truck className="w-5 h-5 text-[#8E412A]" />
              <span>1. Delivery Destination</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Full Name *</label>
                <input
                  type="text"
                  value={address.fullName}
                  onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Mobile Phone *</label>
                <input
                  type="tel"
                  value={address.phone}
                  onChange={(e) => setAddress({ ...address, phone: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Address Line 1 (Flat, House No., Building) *</label>
                <input
                  type="text"
                  value={address.line1}
                  onChange={(e) => setAddress({ ...address, line1: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Address Line 2 (Street, Sector, Landmark)</label>
                <input
                  type="text"
                  value={address.line2 || ''}
                  onChange={(e) => setAddress({ ...address, line2: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2C241E] block mb-1">City *</label>
                <input
                  type="text"
                  value={address.city}
                  onChange={(e) => setAddress({ ...address, city: e.target.value })}
                  required
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-xs font-medium text-[#2C241E] block mb-1">State *</label>
                  <input
                    type="text"
                    value={address.state}
                    onChange={(e) => setAddress({ ...address, state: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                  />
                </div>
                <div>
                  <label className="text-xs font-medium text-[#2C241E] block mb-1">PIN Code *</label>
                  <input
                    type="text"
                    value={address.postalCode}
                    onChange={(e) => setAddress({ ...address, postalCode: e.target.value })}
                    required
                    className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label className="text-xs font-medium text-[#2C241E] block mb-1">Special Delivery Instructions (optional)</label>
                <input
                  type="text"
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="e.g. Leave with security / Ring bell twice"
                  className="w-full px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
                />
              </div>
            </div>
          </div>

          {/* Payment Method */}
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-4">
            <h3 className="text-lg font-serif font-bold text-[#2C241E]">
              2. Payment Mode
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <label
                onClick={() => setPaymentMethod('razorpay')}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'razorpay'
                    ? 'border-[#8E412A] bg-[#FAF8F5] ring-2 ring-[#8E412A]/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'razorpay'}
                  onChange={() => setPaymentMethod('razorpay')}
                  className="mt-1 text-[#8E412A]"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#2C241E]">
                    <CreditCard className="w-4 h-4 text-[#8E412A]" />
                    <span>Razorpay (Instant Online)</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    UPI, Google Pay, PhonePe, Debit/Credit Cards & Netbanking
                  </span>
                </div>
              </label>

              <label
                onClick={() => setPaymentMethod('cod')}
                className={`p-4 rounded-xl border flex items-start gap-3 cursor-pointer transition-all ${
                  paymentMethod === 'cod'
                    ? 'border-[#8E412A] bg-[#FAF8F5] ring-2 ring-[#8E412A]/20'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <input
                  type="radio"
                  name="paymentMethod"
                  checked={paymentMethod === 'cod'}
                  onChange={() => setPaymentMethod('cod')}
                  className="mt-1 text-[#8E412A]"
                />
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-xs text-[#2C241E]">
                    <Banknote className="w-4 h-4 text-[#8E412A]" />
                    <span>Cash on Delivery (COD)</span>
                  </div>
                  <span className="text-[11px] text-gray-500 block mt-0.5">
                    Pay in cash or UPI QR upon physical receipt at your doorstep
                  </span>
                </div>
              </label>
            </div>
          </div>
        </div>

        {/* Right Summary (lg:col-span-5) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-2xl p-6 sm:p-8 border border-[#2C241E]/10 space-y-5 shadow-xs sticky top-24">
            <h3 className="text-lg font-serif font-bold text-[#2C241E]">
              Order Summary ({cart.length} items)
            </h3>

            <div className="max-h-56 overflow-y-auto divide-y divide-gray-100 pr-1">
              {cart.map((item) => (
                <div key={item.id} className="py-2.5 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-medium text-[#2C241E] line-clamp-1">{item.product.name}</span>
                    <span className="text-[11px] text-gray-500">Qty: {item.quantity} · {item.variantName || 'standard'}</span>
                  </div>
                  <span className="font-mono font-bold text-[#2C241E]">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 pt-3 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal:</span>
                <span className="font-mono">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>
              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Discount:</span>
                  <span className="font-mono">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-gray-600">
                <span>Shipping:</span>
                <span className="font-mono">
                  {cartShipping === 0 ? 'FREE' : `₹${cartShipping}`}
                </span>
              </div>
              <div className="flex justify-between text-sm font-bold text-[#2C241E] pt-2 border-t border-gray-100">
                <span>Payable Amount:</span>
                <span className="font-mono font-serif text-xl">₹{cartTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 bg-[#8E412A] hover:bg-[#783622] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isProcessing ? (
                <span>Generating Order...</span>
              ) : paymentMethod === 'razorpay' ? (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Pay ₹{cartTotal.toLocaleString('en-IN')} via Razorpay</span>
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Place Cash on Delivery Order</span>
                </>
              )}
            </button>
          </div>
        </div>
      </form>

      <RazorpayModal
        isOpen={isRazorpayOpen}
        onClose={() => setIsRazorpayOpen(false)}
        onSuccess={handleRazorpaySuccess}
        amount={cartTotal}
        purpose="Cow Town Sanctuary - Organic Farm Order"
        customerName={address.fullName}
        customerEmail={currentUser?.email || 'customer@example.com'}
        customerPhone={address.phone}
      />
    </div>
  );
};
