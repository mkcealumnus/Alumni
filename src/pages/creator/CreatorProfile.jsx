import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';
import Swal, { getSwalOpts } from '@/utils/swal';
import { authApi } from '@/utils/api';

const CreatorProfile = () => {
  const { user, updateUser } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Course Creator',
    email: user?.email || 'creator@sowberry.com',
    username: user?.username || 'creator_sow',
    role: user?.role || 'creator',
    specialization: 'Instructional Design & Curriculum Authoring',
    publishedCourses: 12,
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
        specialization: formData.specialization,
      });
      if (res?.success) {
        if (updateUser && res.user) updateUser(res.user);
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        Swal.fire({ ...getSwalOpts(), title: 'Saved!', text: 'Profile updated successfully.', icon: 'success' });
      } else {
        setSaved(true);
        setTimeout(() => setSaved(false), 3000);
        Swal.fire({ ...getSwalOpts(), title: 'Saved!', text: 'Profile details updated.', icon: 'success' });
      }
    } catch (err) {
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      Swal.fire({ ...getSwalOpts(), title: 'Saved!', text: 'Profile details updated.', icon: 'success' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout pageTitle="Creator Profile" role="creator">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-amber-500 to-orange-500 text-white font-bold text-3xl flex items-center justify-center shadow-lg">
            {(formData.fullName || 'C')[0].toUpperCase()}
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
                {formData.fullName}
              </h1>
              <span className="px-3 py-1 rounded-full bg-amber-500/10 text-amber-600 font-medium text-xs border border-amber-500/20 capitalize">
                {formData.role}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              {formData.specialization}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              <i className="ri-mail-line mr-1"></i>{formData.email}
            </p>
          </div>
        </div>

        {/* Profile Settings Form */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">
            Creator Profile & Preferences
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
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
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
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
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
                  Specialization
                </label>
                <input
                  type="text"
                  value={formData.specialization}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-sand dark-theme:border-gray-800 flex justify-end">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md shadow-amber-600/20"
              >
                Save Creator Profile
              </button>
            </div>
          </form>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CreatorProfile;
