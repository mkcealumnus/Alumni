import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, authApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';


const AdminSettings = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [profile, setProfile] = useState({ fullName: '', email: '', phone: '', username: '' });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [settings, setSettings] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setProfile({ fullName: user.fullName || '', email: user.email || '', phone: user.phone || '', username: user.username || '' });
    const fetchSettings = async () => {
      const res = await adminApi.getSettings();
      if (res.success) setSettings(res.settings || {});
    };
    fetchSettings();
  }, [user]);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await authApi.updateProfile(profile);
    if (res.success) {
      updateUser(res.user);
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Profile Updated!', timer: 1500, showConfirmButton: false});
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Mismatch', text: 'Passwords do not match'});
      return;
    }
    setLoading(true);
    const res = await authApi.changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Password Changed!', timer: 1500, showConfirmButton: false});
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
    }
    setLoading(false);
  };

  const handleSettingsUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await adminApi.updateSettings({ settings });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Settings Saved!', timer: 1500, showConfirmButton: false});
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
    }
    setLoading(false);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'ri-user-line' },
    { id: 'password', label: 'Password', icon: 'ri-lock-line' },
    { id: 'platform', label: 'Platform', icon: 'ri-settings-line' },
  ];

  return (
    <AdminLayout pageTitle="Settings">
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark-theme:bg-gray-900 rounded-xl p-1 border border-sand dark-theme:border-gray-800 w-fit">
          {tabs.map(tab => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === tab.id ? 'bg-primary text-white' : 'text-gray-500 hover:bg-gray-50 dark-theme:hover:bg-gray-800'}`}>
              <i className={tab.icon}></i>{tab.label}
            </button>
          ))}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 max-w-lg">
            <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-5">Profile Information</h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Full Name</label>
                <input type="text" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Email</label>
                <input type="email" value={profile.email} disabled className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 outline-none text-sm opacity-60 cursor-not-allowed" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Phone</label>
                <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark disabled:opacity-60">{loading ? 'Saving...' : 'Save Changes'}</button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 max-w-lg">
            <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-5">Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Current Password</label>
                <input type="password" required value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">New Password</label>
                <input type="password" required value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Confirm Password</label>
                <input type="password" required value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark disabled:opacity-60">{loading ? 'Changing...' : 'Change Password'}</button>
            </form>
          </div>
        )}

        {/* Platform Tab */}
        {activeTab === 'platform' && (
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 max-w-lg">
            <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-5">Platform Settings</h3>
            <form onSubmit={handleSettingsUpdate} className="space-y-4">
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Site Name</label>
                <input type="text" value={settings.siteName || 'NextStep'} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Support Email</label>
                <input type="email" value={settings.supportEmail || ''} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <div><label className="block text-xs font-medium text-gray-500 mb-1">Max Students Per Course</label>
                <input type="number" value={settings.maxStudentsPerCourse || 100} onChange={(e) => setSettings({ ...settings, maxStudentsPerCourse: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" /></div>
              <div className="flex items-center gap-3">
                <input type="checkbox" checked={settings.maintenanceMode === 'true' || settings.maintenanceMode === true} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked ? 'true' : 'false' })} className="rounded border-gray-300 text-primary focus:ring-primary" />
                <label className="text-sm text-gray-600 dark-theme:text-gray-400">Maintenance Mode</label>
              </div>
              <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark disabled:opacity-60">{loading ? 'Saving...' : 'Save Settings'}</button>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
export default AdminSettings;
