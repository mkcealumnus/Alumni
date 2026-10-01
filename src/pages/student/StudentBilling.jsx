import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import CheckoutModal from '@/components/ui/CheckoutModal';
import { studentApi, publicApi } from '../../utils/api';
import Swal, { getSwalOpts } from '../../utils/swal';


const StudentBilling = () => {
  const [subStatus, setSubStatus] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [billingCycle, setBillingCycle] = useState('monthly');

  const loadBillingData = async () => {
    setLoading(true);
    try {
      const [subRes, txRes, planRes] = await Promise.all([
        studentApi.getSubscriptionStatus(),
        studentApi.getBillingHistory(),
        publicApi.getPricingPlans()
      ]);

      if (subRes.success) setSubStatus(subRes);
      if (txRes.success) setTransactions(txRes.transactions || []);
      if (planRes.success) setPlans(planRes.plans || []);
    } catch (err) {
      console.error('Failed to load billing data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBillingData();
  }, []);

  const handleUpgradeClick = (plan) => {
    setSelectedPlan(plan);
    setCheckoutModalOpen(true);
  };

  const printReceipt = (tx) => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <html>
        <head>
          <title>Receipt - ${tx.transactionId}</title>
          <style>
            body { font-family: system-ui, sans-serif; padding: 40px; color: #333; }
            .header { display: flex; justify-content: space-between; border-bottom: 2px solid #c96442; padding-bottom: 20px; }
            .logo { font-size: 24px; font-weight: bold; color: #c96442; }
            .title { font-size: 18px; font-weight: bold; }
            .details { margin: 30px 0; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { text-align: left; padding: 12px; border-bottom: 1px solid #ddd; }
            th { background: #f9f9f9; }
            .total { text-align: right; font-size: 18px; font-weight: bold; margin-top: 20px; }
            .footer { margin-top: 50px; text-align: center; font-size: 12px; color: #888; }
          </style>
        </head>
        <body>
          <div class="header">
            <div>
              <div class="logo">NextStep</div>
              <div>Grow your skills, bloom your future</div>
            </div>
            <div style="text-align: right;">
              <div class="title">INVOICE RECEIPT</div>
              <div>Date: ${new Date(tx.createdAt).toLocaleDateString()}</div>
              <div>Receipt #: ${tx.transactionId}</div>
            </div>
          </div>
          <div class="details">
            <p><strong>Item Description:</strong> ${tx.itemTitle}</p>
            <p><strong>Payment Method:</strong> ${tx.paymentMethod}</p>
            <p><strong>Status:</strong> <span style="color: green;">SUCCESS</span></p>
          </div>
          <table>
            <thead>
              <tr><th>Description</th><th>Amount</th></tr>
            </thead>
            <tbody>
              <tr><td>${tx.itemTitle}</td><td>₹${Number(tx.amount).toLocaleString('en-IN')}</td></tr>
            </tbody>
          </table>
          <div class="total">Total Paid: ₹${Number(tx.amount).toLocaleString('en-IN')}</div>
          <div class="footer">Thank you for choosing NextStep Platform! This is a computer-generated tax invoice receipt.</div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => printWindow.print(), 250);
  };

  if (loading) {
    return (
      <DashboardLayout activeItem="billing">
        <Loader fullPage text="Loading billing data..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout activeItem="billing">

      <div className="space-y-6">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark-theme:text-white">Billing & Subscriptions</h1>
            <p className="text-gray-500 dark-theme:text-gray-400 text-sm">Manage your plan membership, payment receipts, and billing options.</p>
          </div>

          <div className="flex items-center gap-2 bg-sand/50 dark-theme:bg-gray-800 p-1 rounded-xl border border-sand dark-theme:border-gray-700 self-start md:self-auto">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${billingCycle === 'monthly' ? 'bg-white dark-theme:bg-gray-900 text-primary shadow-sm' : 'text-gray-500'}`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${billingCycle === 'yearly' ? 'bg-white dark-theme:bg-gray-900 text-primary shadow-sm' : 'text-gray-500'}`}
            >
              Yearly
              <span className="bg-green-500 text-white text-[9px] px-1.5 py-0.5 rounded-full uppercase font-bold">Save 20%</span>
            </button>
          </div>
        </div>

        {/* Current Plan Card */}
        <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden border border-gray-700">
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-primary/10 blur-3xl pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative z-10">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-primary text-white">
                  {subStatus?.hasActiveSub ? subStatus.subscription?.planTitle : 'Starter Pass (Free)'}
                </span>
                {subStatus?.hasActiveSub && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30 flex items-center gap-1">
                    <i className="ri-checkbox-circle-fill"></i> Active Membership
                  </span>
                )}
              </div>
              <h2 className="text-xl font-bold">Your Current Plan</h2>
              <p className="text-gray-400 text-xs mt-1">
                {subStatus?.hasActiveSub 
                  ? `Valid until ${new Date(subStatus.subscription.endDate).toLocaleDateString()} (${subStatus.subscription.billingCycle} billing)`
                  : 'Upgrade to Pro Scholar for unlimited courses, interactive coding, and 1-on-1 mentor support.'}
              </p>
            </div>

            {subStatus?.hasActiveSub ? (
              <button
                onClick={() => {
                  const proPlan = plans.find(p => p.slug === 'pro') || plans[1];
                  if (proPlan) handleUpgradeClick(proPlan);
                }}
                className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white font-semibold text-xs transition-all border border-white/20"
              >
                Change or Extend Plan
              </button>
            ) : (
              <button
                onClick={() => {
                  const proPlan = plans.find(p => p.slug === 'pro') || plans[1];
                  if (proPlan) handleUpgradeClick(proPlan);
                }}
                className="px-6 py-3 rounded-xl bg-primary hover:bg-primary-dark text-white font-bold text-xs shadow-lg transition-all flex items-center gap-2"
              >
                <i className="ri-vip-crown-fill text-yellow-300"></i>
                Upgrade to Pro Scholar
              </button>
            )}
          </div>
        </div>

        {/* Pricing Tier Plans */}
        <div className="space-y-3">
          <h3 className="text-lg font-bold text-gray-900 dark-theme:text-white">Available Plans</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((plan) => {
              const displayPrice = billingCycle === 'yearly' ? plan.yearlyPrice : plan.monthlyPrice;
              const isCurrent = subStatus?.subscription?.planId === plan.id;

              return (
                <div
                  key={plan.id}
                  className={`bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border flex flex-col justify-between transition-all relative ${
                    plan.isPopular
                      ? 'border-primary ring-2 ring-primary/20 shadow-lg'
                      : 'border-sand dark-theme:border-gray-800'
                  }`}
                >
                  {plan.isPopular && (
                    <span className="absolute -top-3 right-6 bg-primary text-white text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-md">
                      Most Popular
                    </span>
                  )}

                  <div>
                    <h4 className="text-lg font-bold text-gray-900 dark-theme:text-white">{plan.title}</h4>
                    <p className="text-gray-500 dark-theme:text-gray-400 text-xs mt-1 min-h-[32px]">{plan.description}</p>
                    
                    <div className="my-4">
                      <span className="text-3xl font-black text-gray-900 dark-theme:text-white">₹{displayPrice}</span>
                      <span className="text-xs text-gray-500 dark-theme:text-gray-400">/{billingCycle === 'yearly' ? 'yr' : 'mo'}</span>
                    </div>

                    <div className="border-t border-sand dark-theme:border-gray-800 pt-4 space-y-2.5">
                      {plan.features?.map((feat, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-gray-600 dark-theme:text-gray-300">
                          <i className="ri-checkbox-circle-fill text-green-500 text-sm flex-shrink-0 mt-0.5"></i>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleUpgradeClick(plan)}
                    disabled={isCurrent}
                    className={`w-full py-3 rounded-xl font-bold text-xs mt-6 transition-all ${
                      isCurrent
                        ? 'bg-gray-100 dark-theme:bg-gray-800 text-gray-400 cursor-not-allowed'
                        : plan.isPopular
                        ? 'bg-primary hover:bg-primary-dark text-white shadow-md'
                        : 'bg-sand hover:bg-sand-dark dark-theme:bg-gray-800 text-gray-800 dark-theme:text-gray-200'
                    }`}
                  >
                    {isCurrent ? 'Current Plan' : `Get ${plan.title}`}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Transaction History & Invoices */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark-theme:text-white">Payment History & Receipts</h3>
            <span className="text-xs text-gray-400">{transactions.length} Total Receipts</span>
          </div>

          {transactions.length === 0 ? (
            <div className="text-center py-10 text-gray-400 text-sm">
              <i className="ri-receipt-line text-4xl block mb-2 opacity-50"></i>
              No billing history found. Receipts will appear here once you purchase a plan or course.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-gray-600 dark-theme:text-gray-300">
                <thead className="bg-cream dark-theme:bg-gray-800/50 uppercase text-[10px] font-bold text-gray-400 border-b border-sand dark-theme:border-gray-800">
                  <tr>
                    <th className="py-3 px-4">Transaction ID</th>
                    <th className="py-3 px-4">Description</th>
                    <th className="py-3 px-4">Payment Method</th>
                    <th className="py-3 px-4">Date</th>
                    <th className="py-3 px-4">Amount</th>
                    <th className="py-3 px-4 text-right">Invoice</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-sand dark-theme:divide-gray-800">
                  {transactions.map((tx) => (
                    <tr key={tx.id} className="hover:bg-cream/50 dark-theme:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-medium text-gray-900 dark-theme:text-white">{tx.transactionId}</td>
                      <td className="py-3.5 px-4 font-semibold text-gray-800 dark-theme:text-gray-200">{tx.itemTitle}</td>
                      <td className="py-3.5 px-4">{tx.paymentMethod}</td>
                      <td className="py-3.5 px-4">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td className="py-3.5 px-4 font-bold text-gray-900 dark-theme:text-white">₹{Number(tx.amount).toLocaleString('en-IN')}</td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={() => printReceipt(tx)}
                          className="px-3 py-1.5 rounded-lg bg-primary/10 hover:bg-primary/20 text-primary font-semibold text-[11px] transition-colors inline-flex items-center gap-1"
                        >
                          <i className="ri-download-2-line"></i> Download
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

      </div>

      {/* Checkout Modal */}
      {selectedPlan && (
        <CheckoutModal
          isOpen={checkoutModalOpen}
          onClose={() => setCheckoutModalOpen(false)}
          item={selectedPlan}
          type="plan"
          billingCycle={billingCycle}
          onSuccess={() => loadBillingData()}
        />
      )}
    </DashboardLayout>
  );
};

export default StudentBilling;
