import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, authApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { User, Lock, Settings } from 'lucide-react';

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
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'password', label: 'Password', icon: Lock },
    { id: 'platform', label: 'Platform', icon: Settings },
  ];

  const inputClass = "w-full px-4 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]";
  const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <AdminLayout pageTitle="Settings">
      <div className="space-y-6 max-w-4xl mx-auto">
        <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Settings</h1>

        {/* Tabs */}
        <div className="flex gap-1 p-1 rounded-xl border w-fit" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors"
                style={{
                  background: isActive ? 'var(--color-primary)' : 'transparent',
                  color: isActive ? '#ffffff' : 'var(--color-text-muted)',
                }}
              >
                <Icon className="w-4 h-4" />
                {tab.label}
              </button>
            );
          })}
        </div>

        {/* Profile Tab */}
        {activeTab === 'profile' && (
          <div className="rounded-xl p-6 border max-w-lg shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-base font-bold mb-5" style={{ color: 'var(--color-text)' }}>Profile Information</h3>
            <form onSubmit={handleProfileUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Full Name</label>
                <input type="text" value={profile.fullName} onChange={(e) => setProfile({ ...profile, fullName: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Email</label>
                <input type="email" value={profile.email} disabled className={`${inputClass} opacity-60 cursor-not-allowed`} style={{ ...inputStyle, background: 'var(--color-background)' }} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Phone</label>
                <input type="tel" value={profile.phone} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90 disabled:opacity-60 shadow-xs" style={{ background: 'var(--color-primary)' }}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </form>
          </div>
        )}

        {/* Password Tab */}
        {activeTab === 'password' && (
          <div className="rounded-xl p-6 border max-w-lg shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-base font-bold mb-5" style={{ color: 'var(--color-text)' }}>Change Password</h3>
            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Current Password</label>
                <input type="password" required value={passwords.currentPassword} onChange={(e) => setPasswords({ ...passwords, currentPassword: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>New Password</label>
                <input type="password" required value={passwords.newPassword} onChange={(e) => setPasswords({ ...passwords, newPassword: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Confirm Password</label>
                <input type="password" required value={passwords.confirmPassword} onChange={(e) => setPasswords({ ...passwords, confirmPassword: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90 disabled:opacity-60 shadow-xs" style={{ background: 'var(--color-primary)' }}>
                {loading ? 'Changing...' : 'Change Password'}
              </button>
            </form>
          </div>
        )}

        {/* Platform Tab */}
        {activeTab === 'platform' && (
          <div className="rounded-xl p-6 border max-w-lg shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-base font-bold mb-5" style={{ color: 'var(--color-text)' }}>Platform Settings</h3>
            <form onSubmit={handleSettingsUpdate} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Site Name</label>
                <input type="text" value={settings.siteName || 'NextStep'} onChange={(e) => setSettings({ ...settings, siteName: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Support Email</label>
                <input type="email" value={settings.supportEmail || ''} onChange={(e) => setSettings({ ...settings, supportEmail: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Max Students Per Course</label>
                <input type="number" value={settings.maxStudentsPerCourse || 100} onChange={(e) => setSettings({ ...settings, maxStudentsPerCourse: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div className="flex items-center gap-3">
                <input type="checkbox" id="mMode" checked={settings.maintenanceMode === 'true' || settings.maintenanceMode === true} onChange={(e) => setSettings({ ...settings, maintenanceMode: e.target.checked ? 'true' : 'false' })} className="rounded border-gray-300 text-[var(--color-primary)] focus:ring-[var(--color-primary)]" />
                <label htmlFor="mMode" className="text-xs font-semibold cursor-pointer" style={{ color: 'var(--color-text)' }}>Maintenance Mode</label>
              </div>
              <button type="submit" disabled={loading} className="px-5 py-2.5 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90 disabled:opacity-60 shadow-xs" style={{ background: 'var(--color-primary)' }}>
                {loading ? 'Saving...' : 'Save Settings'}
              </button>
            </form>
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
