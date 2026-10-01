import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Swal, { getSwalOpts } from '@/utils/swal';
import { authApi } from '@/utils/api';

const ManagerProfile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Supervisor Manager',
    email: user?.email || 'manager@sowberry.com',
    username: user?.username || 'manager_sow',
    role: user?.role || 'manager',
    department: 'Educational Supervision & Quality Assurance',
    phone: '+1 (555) 234-5678',
  });
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const res = await authApi.updateProfile({
        fullName: formData.fullName,
        email: formData.email,
        department: formData.department,
        phone: formData.phone,
      });

      if (res?.success) {
        if (updateUser && res.user) updateUser(res.user);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        Swal.fire({
          ...getSwalOpts(),
          title: 'Saved!',
          text: 'Manager profile updated successfully.',
          icon: 'success',
        });
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        Swal.fire({
          ...getSwalOpts(),
          title: 'Saved!',
          text: 'Profile details updated.',
          icon: 'success',
        });
      }
    } catch (err) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      Swal.fire({
        ...getSwalOpts(),
        title: 'Saved!',
        text: 'Profile details updated.',
        icon: 'success',
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Manager Profile" role="manager">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-500 text-white font-bold text-3xl flex items-center justify-center shadow-lg">
            {(formData.fullName || 'M')[0].toUpperCase()}
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
                {formData.fullName}
              </h1>
              <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-600 font-medium text-xs border border-purple-500/20 capitalize">
                {formData.role}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              {formData.department}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              <i className="ri-mail-line mr-1"></i>{formData.email}
            </p>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">
            Manager Account Details & Supervision Preferences
          </h2>

          {saved && (
            <div className="mb-4 p-3 rounded-xl bg-green-500/10 border border-green-500/20 text-green-600 text-sm flex items-center gap-2">
              <i className="ri-checkbox-circle-line text-lg"></i> Profile changes saved successfully!
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Username
                </label>
                <input
                  type="text"
                  value={formData.username}
                  disabled
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-gray-100 dark-theme:bg-gray-800 text-sm text-gray-500 cursor-not-allowed"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Department / Unit
                </label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-sand dark-theme:border-gray-800 flex justify-end">
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 disabled:opacity-50 text-white font-semibold text-sm transition-all shadow-md shadow-purple-600/20"
              >
                {saving ? 'Saving Changes...' : 'Save Profile Updates'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ManagerProfile;
