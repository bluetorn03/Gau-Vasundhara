import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, AlertCircle, Smartphone, CreditCard, Building2, X } from 'lucide-react';

interface RazorpayModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (paymentDetails: { paymentId: string; orderId: string; signature: string }) => void;
  amount: number; // in INR
  purpose: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
}

export const RazorpayModal: React.FC<RazorpayModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  amount,
  purpose,
  customerName,
  customerEmail,
  customerPhone,
}) => {
  const [activeTab, setActiveTab] = useState<'upi' | 'card' | 'netbanking'>('upi');
  const [upiId, setUpiId] = useState('user@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8821');
  const [expiry, setExpiry] = useState('08/29');
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSimulatePayment = (willSucceed = true) => {
    setIsProcessing(true);
    setErrorMsg(null);

    setTimeout(() => {
      setIsProcessing(false);
      if (willSucceed) {
        const paymentId = `pay_rzp_${Math.random().toString(36).substring(2, 10)}`;
        const orderId = `order_rzp_${Math.random().toString(36).substring(2, 10)}`;
        const signature = `sig_${Math.random().toString(36).substring(2, 18)}`;

        onSuccess({ paymentId, orderId, signature });
        onClose();
      } else {
        setErrorMsg('Simulated bank gateway decline. Please re-try with valid test credentials.');
      }
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-[#2C241E]/10">
        {/* Razorpay Header */}
        <div className="bg-[#0C2340] text-white p-4 relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-white/70 hover:text-white p-1 rounded-md transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-2 mb-1">
            <span className="font-semibold text-xs tracking-wide text-[#3399CC] bg-white/10 px-2 py-0.5 rounded-sm">
              GATEWAY INTEGRATION BOUNDARY
            </span>
            <span className="text-[11px] text-white/60">Frontend Demo Sandbox</span>
          </div>
          <p className="text-[10px] text-white/70 italic mt-0.5">
            Ready for Laravel + Razorpay Standard Checkout SDK
          </p>

          <div className="flex justify-between items-end mt-3">
            <div>
              <p className="text-xs text-white/70">Paying to Cow Town Sanctuary</p>
              <p className="text-sm font-medium text-white line-clamp-1">{purpose}</p>
            </div>
            <div className="text-right">
              <span className="text-xs text-white/60 block">Amount Payable</span>
              <span className="text-xl font-bold font-mono tracking-tight text-white">
                ₹{amount.toLocaleString('en-IN')}
              </span>
            </div>
          </div>
        </div>

        {/* Tab navigation */}
        <div className="grid grid-cols-3 border-b border-gray-200 bg-gray-50 text-xs font-medium">
          <button
            onClick={() => setActiveTab('upi')}
            className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${
              activeTab === 'upi'
                ? 'border-[#0C2340] text-[#0C2340] bg-white font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Smartphone className="w-4 h-4" />
            UPI / QR
          </button>
          <button
            onClick={() => setActiveTab('card')}
            className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${
              activeTab === 'card'
                ? 'border-[#0C2340] text-[#0C2340] bg-white font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            Cards
          </button>
          <button
            onClick={() => setActiveTab('netbanking')}
            className={`py-3 flex flex-col items-center gap-1 border-b-2 transition-colors ${
              activeTab === 'netbanking'
                ? 'border-[#0C2340] text-[#0C2340] bg-white font-semibold'
                : 'border-transparent text-gray-500 hover:text-gray-800'
            }`}
          >
            <Building2 className="w-4 h-4" />
            Netbanking
          </button>
        </div>

        {/* Content area */}
        <div className="p-5">
          {errorMsg && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-600 mt-0.5" />
              <span>{errorMsg}</span>
            </div>
          )}

          {activeTab === 'upi' && (
            <div className="space-y-4">
              <div className="bg-[#F8F9FA] p-3 rounded-lg border border-gray-200">
                <label className="text-[11px] font-semibold text-gray-600 uppercase tracking-wider block mb-1">
                  Enter UPI ID / VPA
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  placeholder="mobileNumber@upi or id@bank"
                  className="w-full px-3 py-2 text-sm border border-gray-300 rounded bg-white focus:outline-hidden focus:border-[#0C2340]"
                />
                <span className="text-[10px] text-gray-400 mt-1 block">
                  e.g. Google Pay, PhonePe, Paytm, BHIM
                </span>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500 py-1">
                <span>Verified User:</span>
                <span className="font-medium text-gray-800">{customerName}</span>
              </div>
            </div>
          )}

          {activeTab === 'card' && (
            <div className="space-y-3">
              <div>
                <label className="text-[11px] font-semibold text-gray-600 block mb-1">Card Number</label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded bg-white"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">Expiry</label>
                  <input
                    type="text"
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded bg-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-semibold text-gray-600 block mb-1">CVV</label>
                  <input
                    type="password"
                    defaultValue="•••"
                    className="w-full px-3 py-2 text-sm font-mono border border-gray-300 rounded bg-white"
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === 'netbanking' && (
            <div className="space-y-3">
              <label className="text-xs text-gray-600 block">Select Popular Bank:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {['HDFC Bank', 'State Bank of India', 'ICICI Bank', 'Axis Bank'].map((bank) => (
                  <button
                    key={bank}
                    type="button"
                    className="p-2 border border-gray-200 rounded text-left hover:border-[#0C2340] hover:bg-gray-50 transition-colors"
                  >
                    {bank}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Action buttons */}
          <div className="mt-6 space-y-2">
            <button
              onClick={() => handleSimulatePayment(true)}
              disabled={isProcessing}
              className="w-full py-3 bg-[#0C2340] hover:bg-[#12335C] active:bg-[#07172A] text-white font-medium text-sm rounded-lg transition-all shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Verifying with Razorpay...
                </>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  Authorize & Pay ₹{amount.toLocaleString('en-IN')}
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-4 pt-2">
              <button
                type="button"
                onClick={() => handleSimulatePayment(false)}
                className="text-[11px] text-gray-400 hover:text-red-500 transition-colors"
              >
                Simulate Payment Failure
              </button>
              <span className="text-gray-300">·</span>
              <button
                type="button"
                onClick={onClose}
                className="text-[11px] text-gray-400 hover:text-gray-700 transition-colors"
              >
                Cancel Transaction
              </button>
            </div>
          </div>
        </div>

        {/* Security Footer */}
        <div className="bg-gray-50 border-t border-gray-100 px-4 py-2.5 flex items-center justify-between text-[11px] text-gray-400">
          <span className="flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5 text-gray-400" />
            256-bit SSL Encrypted
          </span>
          <span>PCI-DSS Compliant</span>
        </div>
      </div>
    </div>
  );
};
