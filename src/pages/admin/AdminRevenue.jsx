import React, { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import { adminApi } from '../../utils/api';
import Swal, { getSwalOpts } from '../../utils/swal';


const AdminRevenue = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editingPlan, setEditingPlan] = useState(null);
  const [editForm, setEditForm] = useState({ title: '', monthlyPrice: 0, yearlyPrice: 0, description: '' });

  const loadRevenueData = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getRevenueAnalytics();
      if (res.success) {
        setData(res);
      }
    } catch (err) {
      console.error('Failed to load revenue analytics:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadRevenueData();
  }, []);

  const handleEditClick = (plan) => {
    setEditingPlan(plan);
    setEditForm({
      title: plan.title,
      monthlyPrice: plan.monthlyPrice,
      yearlyPrice: plan.yearlyPrice,
      description: plan.description || ''
    });
  };

  const handleSavePlan = async (e) => {
    e.preventDefault();
    if (!editingPlan) return;

    try {
      const res = await adminApi.updatePricingPlan(editingPlan.id, editForm);
      if (res.success) {
        Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Plan Updated', text: res.message, timer: 1500, showConfirmButton: false });
        setEditingPlan(null);
        loadRevenueData();
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not update plan.' });
      }
    } catch {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: 'Network error.' });
    }
  };

  if (loading) {
    return (
      <AdminLayout pageTitle="Revenue Management">
        <Loader fullPage text="Loading revenue analytics..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="Revenue Management">
      <div className="space-y-6">
        
        {/* Header */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark-theme:text-white">Revenue & Pricing Management</h1>
          <p className="text-gray-500 dark-theme:text-gray-400 text-sm">Monitor platform earnings, active subscriptions, and edit pricing tier models.</p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="bg-white dark-theme:bg-gray-900 p-5 rounded-2xl border border-sand dark-theme:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/10 text-green-600 flex items-center justify-center text-2xl font-bold">
              ₹
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Revenue</div>
              <div className="text-2xl font-black text-gray-900 dark-theme:text-white mt-0.5">
                ₹{Number(data?.totalRevenue || 0).toLocaleString('en-IN')}
              </div>
            </div>
          </div>

          <div className="bg-white dark-theme:bg-gray-900 p-5 rounded-2xl border border-sand dark-theme:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center text-2xl">
              <i className="ri-vip-crown-line"></i>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Active Subscribers</div>
              <div className="text-2xl font-black text-gray-900 dark-theme:text-white mt-0.5">
                {data?.activeSubscribers || 0}
              </div>
            </div>
          </div>

          <div className="bg-white dark-theme:bg-gray-900 p-5 rounded-2xl border border-sand dark-theme:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center text-2xl">
              <i className="ri-book-read-line"></i>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Course Sales</div>
              <div className="text-2xl font-black text-gray-900 dark-theme:text-white mt-0.5">
                {data?.courseSalesCount || 0}
              </div>
            </div>
          </div>

          <div className="bg-white dark-theme:bg-gray-900 p-5 rounded-2xl border border-sand dark-theme:border-gray-800 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 text-purple-600 flex items-center justify-center text-2xl">
              <i className="ri-history-line"></i>
            </div>
            <div>
              <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Total Transactions</div>
              <div className="text-2xl font-black text-gray-900 dark-theme:text-white mt-0.5">
                {data?.totalTransactions || 0}
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Plans Manager */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900 dark-theme:text-white">Active Subscription Plans</h3>
            <span className="text-xs text-gray-400">Edit plan pricing & configuration</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.plans?.map((plan) => (
              <div key={plan.id} className="bg-cream/40 dark-theme:bg-gray-800/40 p-5 rounded-xl border border-sand dark-theme:border-gray-700 space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-gray-900 dark-theme:text-white text-base">{plan.title}</h4>
                  <span className="text-[11px] font-semibold text-primary bg-primary/10 px-2.5 py-0.5 rounded-full">
                    {plan.activeSubscribers} Active
                  </span>
                </div>

                <p className="text-xs text-gray-500 dark-theme:text-gray-400 min-h-[36px]">{plan.description}</p>

                <div className="flex items-baseline gap-3 text-sm font-bold text-gray-900 dark-theme:text-white border-t border-b border-sand dark-theme:border-gray-700 py-2">
                  <div>Monthly: <span className="text-primary">₹{plan.monthlyPrice}</span></div>
                  <div>Yearly: <span className="text-primary">₹{plan.yearlyPrice}</span></div>
                </div>

                <button
                  onClick={() => handleEditClick(plan)}
                  className="w-full py-2 rounded-lg bg-sand dark-theme:bg-gray-700 hover:bg-primary hover:text-white text-xs font-semibold text-gray-700 dark-theme:text-gray-200 transition-colors flex items-center justify-center gap-1.5"
                >
                  <i className="ri-edit-line"></i> Edit Plan Prices
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions Log */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900 dark-theme:text-white">Recent Transactions Log</h3>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-gray-600 dark-theme:text-gray-300">
              <thead className="bg-cream dark-theme:bg-gray-800/50 uppercase text-[10px] font-bold text-gray-400 border-b border-sand dark-theme:border-gray-800">
                <tr>
                  <th className="py-3 px-4">Tx ID</th>
                  <th className="py-3 px-4">User</th>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Method</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-sand dark-theme:divide-gray-800">
                {data?.recentTransactions?.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-8 text-center text-gray-400">No transactions recorded yet.</td>
                  </tr>
                ) : (
                  data?.recentTransactions?.map((tx) => (
                    <tr key={tx.id} className="hover:bg-cream/50 dark-theme:hover:bg-gray-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono font-medium text-gray-900 dark-theme:text-white">{tx.transactionId}</td>
                      <td className="py-3 px-4">
                        <div className="font-semibold text-gray-800 dark-theme:text-gray-200">{tx.fullName}</div>
                        <div className="text-[10px] text-gray-400">{tx.email}</div>
                      </td>
                      <td className="py-3 px-4 font-medium">{tx.itemTitle}</td>
                      <td className="py-3 px-4">{tx.paymentMethod}</td>
                      <td className="py-3 px-4">{new Date(tx.createdAt).toLocaleDateString()}</td>
                      <td className="py-3 px-4 text-right font-bold text-green-600 dark-theme:text-green-400">₹{Number(tx.amount).toLocaleString('en-IN')}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* Edit Plan Modal */}
      {editingPlan && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-fade-in">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl max-w-md w-full p-6 border border-sand dark-theme:border-gray-800 shadow-2xl">
            <h3 className="text-lg font-bold text-gray-900 dark-theme:text-white mb-4">Edit {editingPlan.title}</h3>
            <form onSubmit={handleSavePlan} className="space-y-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 dark-theme:text-gray-400 block mb-1">Plan Title</label>
                <input
                  type="text"
                  value={editForm.title}
                  onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                  required
                  className="w-full px-3.5 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark-theme:text-gray-400 block mb-1">Monthly Price (₹)</label>
                  <input
                    type="number"
                    value={editForm.monthlyPrice}
                    onChange={(e) => setEditForm({ ...editForm, monthlyPrice: Number(e.target.value) })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-600 dark-theme:text-gray-400 block mb-1">Yearly Price (₹)</label>
                  <input
                    type="number"
                    value={editForm.yearlyPrice}
                    onChange={(e) => setEditForm({ ...editForm, yearlyPrice: Number(e.target.value) })}
                    required
                    className="w-full px-3.5 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 dark-theme:text-gray-400 block mb-1">Description</label>
                <textarea
                  rows={2}
                  value={editForm.description}
                  onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-sm outline-none focus:border-primary"
                ></textarea>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingPlan(null)}
                  className="flex-1 py-2.5 rounded-xl border border-sand dark-theme:border-gray-700 text-xs font-semibold text-gray-600 dark-theme:text-gray-400 hover:bg-cream"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-bold shadow-sm"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default AdminRevenue;
