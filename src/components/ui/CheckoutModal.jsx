import React, { useState } from 'react';
import Swal, { getSwalOpts } from '@/utils/swal';
import { studentApi } from '@/utils/api';

const CheckoutModal = ({ isOpen, onClose, item, type = 'plan', billingCycle = 'monthly', onSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiVpa, setUpiVpa] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCvv, setCardCvv] = useState('');
  const [cardName, setCardName] = useState('');
  const [selectedBank, setSelectedBank] = useState('HDFC Bank');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen || !item) return null;

  const price = type === 'plan'
    ? (billingCycle === 'yearly' ? item.yearlyPrice : item.monthlyPrice)
    : (item.price || 999);

  const discountAmount = billingCycle === 'yearly' ? Math.round(price * 0.2) : 0;
  const finalPrice = Math.max(0, price - discountAmount);
  const gstAmount = Math.round(finalPrice * 0.18);
  const grandTotal = Math.round(finalPrice + gstAmount);

  const handlePay = async (e) => {
    e.preventDefault();
    if (paymentMethod === 'UPI' && upiVpa && !upiVpa.includes('@')) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Invalid UPI ID', text: 'Please enter a valid UPI ID (e.g. name@upi).' });
      return;
    }

    setIsProcessing(true);

    try {
      let res;
      if (type === 'plan') {
        res = await studentApi.subscribePlan({
          planId: item.id,
          billingCycle,
          paymentMethod
        });
      } else {
        res = await studentApi.buyCourse({
          courseId: item.id,
          paymentMethod
        });
      }

      if (res.success) {
        await Swal.fire({
          ...getSwalOpts(),
          icon: 'success',
          title: 'Payment Successful!',
          html: `
            <div class="text-center">
              <p class="text-sm text-gray-600 mb-2">Transaction ID: <span class="font-mono font-bold">${res.data?.transactionId || 'SWB-' + Date.now()}</span></p>
              <p class="text-lg font-semibold text-green-600 mb-3">Amount Paid: ₹${grandTotal.toLocaleString('en-IN')}</p>
              <p class="text-xs text-gray-500">Your ${type === 'plan' ? 'subscription is now active' : 'course is unlocked'}!</p>
            </div>
          `,
          confirmButtonText: 'Great, Thanks!'
        });
        if (onSuccess) onSuccess(res.data);
        onClose();
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Payment Failed', text: res.message || 'Payment could not be processed.' });
      }
    } catch (err) {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Something went wrong during payment.' });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
      <div className="bg-white dark-theme:bg-gray-900 rounded-2xl max-w-2xl w-full overflow-hidden border border-sand dark-theme:border-gray-800 shadow-2xl transition-all">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-primary-dark p-6 text-white flex items-center justify-between">
          <div>
            <span className="text-xs uppercase font-semibold tracking-wider bg-white/20 px-2.5 py-1 rounded-full text-white/90">
              Checkout & Payment
            </span>
            <h2 className="text-2xl font-bold mt-1">Complete Order</h2>
          </div>
          <button onClick={onClose} className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors">
            <i className="ri-close-line text-xl"></i>
          </button>
        </div>

        <div className="p-6 grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Left: Order Summary */}
          <div className="md:col-span-5 bg-cream dark-theme:bg-gray-800/50 p-5 rounded-xl border border-sand dark-theme:border-gray-700/50 flex flex-col justify-between">
            <div>
              <h3 className="text-xs font-semibold uppercase text-gray-500 dark-theme:text-gray-400 tracking-wider mb-3">Order Summary</h3>
              <div className="mb-4">
                <div className="font-bold text-gray-900 dark-theme:text-white text-lg">{item.title}</div>
                <div className="text-xs text-gray-500 dark-theme:text-gray-400 capitalize mt-0.5">
                  {type === 'plan' ? `${billingCycle} Billing Plan` : 'Lifetime Access Course'}
                </div>
              </div>

              <div className="space-y-2 text-sm border-t border-sand dark-theme:border-gray-700 pt-3">
                <div className="flex justify-between text-gray-600 dark-theme:text-gray-300">
                  <span>Base Price:</span>
                  <span className="font-medium">₹{price.toLocaleString('en-IN')}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Yearly Discount (20%):</span>
                    <span className="font-medium">-₹{discountAmount.toLocaleString('en-IN')}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600 dark-theme:text-gray-300">
                  <span>GST (18%):</span>
                  <span className="font-medium">₹{gstAmount.toLocaleString('en-IN')}</span>
                </div>
              </div>
            </div>

            <div className="border-t border-sand dark-theme:border-gray-700 pt-4 mt-4">
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-gray-800 dark-theme:text-gray-200">Total Due:</span>
                <span className="text-2xl font-black text-primary">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
              <div className="text-[11px] text-gray-400 dark-theme:text-gray-500 text-right mt-1">Includes all applicable taxes</div>
            </div>
          </div>

          {/* Right: Payment Method Selector */}
          <div className="md:col-span-7 space-y-4">
            <h3 className="text-xs font-semibold uppercase text-gray-500 dark-theme:text-gray-400 tracking-wider">Select Payment Option</h3>
            
            {/* Payment Method Pills */}
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'UPI', label: 'UPI / QR', icon: 'ri-qr-code-line' },
                { id: 'Card', label: 'Card', icon: 'ri-bank-card-line' },
                { id: 'NetBanking', label: 'NetBanking', icon: 'ri-building-line' }
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPaymentMethod(m.id)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-xs font-medium transition-all ${
                    paymentMethod === m.id
                      ? 'bg-primary/10 border-primary text-primary font-bold shadow-sm'
                      : 'border-sand dark-theme:border-gray-700 text-gray-600 dark-theme:text-gray-400 hover:bg-cream dark-theme:hover:bg-gray-800'
                  }`}
                >
                  <i className={`${m.icon} text-lg mb-1`}></i>
                  {m.label}
                </button>
              ))}
            </div>

            <form onSubmit={handlePay} className="space-y-4 pt-2">
              {paymentMethod === 'UPI' && (
                <div className="space-y-3 bg-cream/50 dark-theme:bg-gray-800/30 p-4 rounded-xl border border-sand dark-theme:border-gray-700">
                  <div className="text-center p-2 bg-white dark-theme:bg-gray-900 rounded-lg border border-sand dark-theme:border-gray-800">
                    <div className="w-28 h-28 mx-auto bg-gray-100 dark-theme:bg-gray-800 rounded-lg flex items-center justify-center border border-dashed border-gray-400">
                      <i className="ri-qr-code-fill text-6xl text-gray-700 dark-theme:text-gray-300"></i>
                    </div>
                    <p className="text-[11px] text-gray-500 dark-theme:text-gray-400 mt-1">Scan QR with GPay / PhonePe / Paytm</p>
                  </div>

                  <div>
                    <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 block mb-1">Or enter VPA / UPI ID</label>
                    <input
                      type="text"
                      placeholder="e.g. mobile@upi or name@okaxis"
                      value={upiVpa}
                      onChange={(e) => setUpiVpa(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'Card' && (
                <div className="space-y-3">
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 block mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="4532 •••• •••• 8901"
                      value={cardNumber}
                      maxLength={19}
                      onChange={(e) => setCardNumber(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 block mb-1">Expiry (MM/YY)</label>
                      <input
                        type="text"
                        placeholder="08/28"
                        maxLength={5}
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 block mb-1">CVV</label>
                      <input
                        type="password"
                        placeholder="•••"
                        maxLength={4}
                        value={cardCvv}
                        onChange={(e) => setCardCvv(e.target.value)}
                        required
                        className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 block mb-1">Cardholder Name</label>
                    <input
                      type="text"
                      placeholder="Name on card"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                    />
                  </div>
                </div>
              )}

              {paymentMethod === 'NetBanking' && (
                <div>
                  <label className="text-xs font-medium text-gray-600 dark-theme:text-gray-400 block mb-1">Select Bank</label>
                  <select
                    value={selectedBank}
                    onChange={(e) => setSelectedBank(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                  >
                    <option value="HDFC Bank">HDFC Bank</option>
                    <option value="State Bank of India">State Bank of India (SBI)</option>
                    <option value="ICICI Bank">ICICI Bank</option>
                    <option value="Axis Bank">Axis Bank</option>
                    <option value="Kotak Mahindra">Kotak Mahindra Bank</option>
                  </select>
                </div>
              )}

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-3.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60 mt-4"
              >
                {isProcessing ? (
                  <>
                    Processing Payment...
                  </>
                ) : (
                  <>
                    <i className="ri-shield-check-line text-lg"></i>
                    Pay ₹{grandTotal.toLocaleString('en-IN')} Securely
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CheckoutModal;
