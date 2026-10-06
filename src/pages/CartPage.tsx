import React, { useState } from 'react';
import { Trash2, ArrowRight, ShoppingBag, ArrowLeft, Tag, ShieldCheck } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';

interface CartPageProps {
  navigate: (route: string) => void;
}

export const CartPage: React.FC<CartPageProps> = ({ navigate }) => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    cartSubtotal,
    cartDiscount,
    cartShipping,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    siteSettings,
  } = useApp();

  const [couponInput, setCouponInput] = useState('');
  const [couponError, setCouponError] = useState<string | null>(null);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    setCouponError(null);
    const res = applyCoupon(couponInput);
    if (!res.success) {
      setCouponError(res.message);
    } else {
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <div className="w-16 h-16 rounded-full bg-[#F5EFE6] text-[#8E412A] flex items-center justify-center mx-auto">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h1 className="text-3xl font-serif font-bold text-[#2C241E]">
          Your Shopping Bag is Empty
        </h1>
        <p className="text-xs text-[#6A5A4D]">
          Explore our traditional A2 bilona ghee, sacred gomaya dhoop, and raw sanctuary apiary honey.
        </p>
        <button
          onClick={() => navigate('/shop')}
          className="mt-4 px-6 py-3 bg-[#8E412A] hover:bg-[#783622] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
        >
          Explore Sanctuary Store
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-4">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#2C241E]">
            Shopping Bag ({cart.length} items)
          </h1>
          <p className="text-xs text-[#6A5A4D] mt-0.5">
            Proceeds directly sponsor the green fodder and healthcare of our sanctuary cows.
          </p>
        </div>
        <button
          onClick={() => navigate('/shop')}
          className="text-xs font-semibold text-[#8E412A] hover:text-[#783622] flex items-center gap-1 cursor-pointer"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Continue Shopping</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Line Items (lg:col-span-8) */}
        <div className="lg:col-span-8 space-y-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-2xl p-5 border border-[#2C241E]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-xs"
            >
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0 bg-[#FAF8F5]">
                  <FallbackImage
                    src={item.product.imageUrl}
                    alt={item.product.name}
                    className="w-full h-full"
                    category="product"
                  />
                </div>
                <div>
                  <h3 className="font-serif font-bold text-sm text-[#2C241E] line-clamp-1">
                    {item.product.name}
                  </h3>
                  {item.variantName && (
                    <span className="text-[11px] text-[#8E412A] font-medium block">
                      Size: {item.variantName}
                    </span>
                  )}
                  <span className="text-xs font-mono font-bold text-[#2C241E] mt-1 block">
                    ₹{item.price.toLocaleString('en-IN')}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between w-full sm:w-auto gap-6">
                {/* Stepper */}
                <div className="flex items-center border border-gray-200 rounded-lg bg-[#FAF8F5] p-0.5">
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-white rounded cursor-pointer"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-xs font-mono font-semibold">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-xs font-bold hover:bg-white rounded cursor-pointer"
                  >
                    +
                  </button>
                </div>

                {/* Subtotal */}
                <div className="text-right">
                  <span className="text-sm font-serif font-bold text-[#2C241E] font-mono block">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Remove */}
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1.5 text-gray-400 hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove item"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary & Coupon (lg:col-span-4) */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-[#2C241E]/10 space-y-5 shadow-xs sticky top-24">
            <h3 className="text-lg font-serif font-bold text-[#2C241E]">
              Order Summary
            </h3>

            {/* Coupon Code Section */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#2C241E] flex items-center gap-1">
                <Tag className="w-3.5 h-3.5 text-[#8E412A]" />
                <span>Apply Coupon / Privilege Code</span>
              </label>

              {appliedCoupon ? (
                <div className="p-2.5 bg-emerald-50 rounded-xl border border-emerald-200 flex items-center justify-between text-xs text-emerald-800">
                  <div>
                    <span className="font-bold font-mono uppercase">{appliedCoupon.code}</span>
                    <span className="text-[11px] block text-emerald-600">{appliedCoupon.discountPercentage}% discount applied</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline cursor-pointer font-medium"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    placeholder="e.g. WELCOMEGAU"
                    className="grow px-3 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] uppercase font-mono focus:outline-hidden focus:border-[#8E412A]"
                  />
                  <button
                    type="submit"
                    className="px-3.5 py-2 bg-[#2C241E] hover:bg-[#3D332B] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}
              {couponError && (
                <p className="text-[11px] text-red-600">{couponError}</p>
              )}
              <div className="text-[10px] text-gray-400">
                Hint: Try code <code className="text-[#8E412A] font-bold">WELCOMEGAU</code> (10% off) or <code className="text-[#8E412A] font-bold">GAU2026</code>
              </div>
            </div>

            {/* Line item calculations */}
            <div className="space-y-2.5 pt-3 border-t border-gray-100 text-xs">
              <div className="flex justify-between text-[#6A5A4D]">
                <span>Items Subtotal:</span>
                <span className="font-mono text-[#2C241E]">₹{cartSubtotal.toLocaleString('en-IN')}</span>
              </div>

              {cartDiscount > 0 && (
                <div className="flex justify-between text-emerald-700">
                  <span>Coupon Discount:</span>
                  <span className="font-mono">-₹{cartDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}

              <div className="flex justify-between text-[#6A5A4D]">
                <span>Shipping Transit:</span>
                <span className="font-mono text-[#2C241E]">
                  {cartShipping === 0 ? (
                    <span className="text-emerald-700 font-bold">FREE</span>
                  ) : (
                    `₹${cartShipping.toLocaleString('en-IN')}`
                  )}
                </span>
              </div>

              {cartShipping > 0 && (
                <p className="text-[10px] text-[#8C7A6B]">
                  Add ₹{(siteSettings.freeShippingThreshold - cartSubtotal).toLocaleString('en-IN')} more to unlock FREE nationwide shipping!
                </p>
              )}
            </div>

            {/* Total */}
            <div className="pt-4 border-t border-gray-100 flex items-baseline justify-between">
              <span className="text-sm font-bold text-[#2C241E]">Total Amount:</span>
              <span className="text-2xl font-serif font-bold text-[#2C241E] font-mono">
                ₹{cartTotal.toLocaleString('en-IN')}
              </span>
            </div>

            <button
              onClick={() => navigate('/checkout')}
              className="w-full py-3.5 bg-[#8E412A] hover:bg-[#783622] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-1.5 text-[11px] text-[#8C7A6B]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Safe & Secure Indian Payments</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
