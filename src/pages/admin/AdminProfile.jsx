import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { authApi, getImageUrl } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { User, Link2, Lock, Camera, Code, Code2 } from 'lucide-react';

const GithubIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const LinkedinIcon = (props) => (
  <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const AdminProfile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profile, setProfile] = useState({
    fullName: '', email: '', username: '', phone: '', countryCode: '+91',
    college: '', department: '', gender: '', dateOfBirth: '', address: '', bio: '',
    github: '', linkedin: '', hackerrank: '', leetcode: '', profileImage: ''
  });
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    const fetchProfile = async () => {
      const res = await authApi.getMe();
      if (res.success && res.user) {
        setProfile({
          fullName: res.user.fullName || '',
          email: res.user.email || '',
          username: res.user.username || '',
          phone: res.user.phone || '',
          countryCode: res.user.countryCode || '+91',
          college: res.user.college || '',
          department: res.user.department || '',
          gender: res.user.gender || '',
          dateOfBirth: res.user.dateOfBirth ? res.user.dateOfBirth.split('T')[0] : '',
          address: res.user.address || '',
          bio: res.user.bio || '',
          github: res.user.github || '',
          linkedin: res.user.linkedin || '',
          hackerrank: res.user.hackerrank || '',
          leetcode: res.user.leetcode || '',
          profileImage: res.user.profileImage || '',
        });
      }
      setFetching(false);
    };
    fetchProfile();
  }, []);

  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await authApi.updateProfile(profile);
    if (res.success) {
      updateUser(res.user);
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Profile Updated!', timer: 1500, showConfirmButton: false });
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
    setLoading(false);
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    if (passwords.newPassword !== passwords.confirmPassword) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Mismatch', text: 'Passwords do not match' });
      return;
    }
    if (passwords.newPassword.length < 6) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Too Short', text: 'Password must be at least 6 characters' });
      return;
    }
    setLoading(true);
    const res = await authApi.changePassword({ currentPassword: passwords.currentPassword, newPassword: passwords.newPassword });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Password Changed!', timer: 1500, showConfirmButton: false });
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
    setLoading(false);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Too Large', text: 'Image must be under 2MB' });
      return;
    }
    setLoading(true);
    const res = await authApi.uploadProfileImage(file);
    if (res.success && res.profileImage) {
      setProfile(p => ({ ...p, profileImage: res.profileImage }));
      updateUser({ ...user, profileImage: res.profileImage });
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Photo Updated!', timer: 1500, showConfirmButton: false });
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Upload failed' });
    }
    setLoading(false);
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', Icon: User },
    { id: 'social', label: 'Social Links', Icon: Link2 },
    { id: 'security', label: 'Security', Icon: Lock },
  ];

  const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]';
  const inputStyle = { background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };
  const labelClass = 'block text-[11px] font-semibold uppercase tracking-wider mb-1.5';
  const labelStyle = { color: 'var(--color-text-muted)' };

  if (fetching) {
    return (
      <AdminLayout pageTitle="My Profile">
        <Loader fullPage text="Loading profile..." />
      </AdminLayout>
    );
  }

  return (
    <AdminLayout pageTitle="My Profile">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="rounded-xl border p-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group">
              <img
                src={profile.profileImage ? getImageUrl(profile.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'Admin')}&size=96&background=12355B&color=fff&bold=true`}
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover border"
                style={{ borderColor: 'var(--color-border)' }}
              />
              <label className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white">
                <Camera className="w-5 h-5" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{profile.fullName || 'Admin'}</h2>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{profile.email}</p>
              <span className="inline-block mt-2 px-2.5 py-0.5 text-[11px] font-semibold rounded-full uppercase" style={{ background: 'rgba(18,53,91,0.08)', color: 'var(--color-primary)' }}>
                System Administrator
              </span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 rounded-xl border p-1.5" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {tabs.map(({ id, label, Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === id
                  ? 'text-white shadow-xs'
                  : 'hover:opacity-80'
              }`}
              style={{
                background: activeTab === id ? 'var(--color-primary)' : 'transparent',
                color: activeTab === id ? '#ffffff' : 'var(--color-text-muted)'
              }}
            >
              <Icon className="w-4 h-4" />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="rounded-xl border p-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {activeTab === 'personal' && (
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass} style={labelStyle}>Full Name</label>
                  <input type="text" className={inputClass} style={inputStyle} value={profile.fullName} onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Email</label>
                  <input type="email" className={`${inputClass} opacity-60 cursor-not-allowed`} style={inputStyle} value={profile.email} disabled />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Username</label>
                  <input type="text" className={`${inputClass} opacity-60 cursor-not-allowed`} style={inputStyle} value={profile.username} disabled />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Phone</label>
                  <div className="flex gap-2">
                    <input type="text" className={`${inputClass} w-20`} style={inputStyle} value={profile.countryCode} onChange={e => setProfile(p => ({ ...p, countryCode: e.target.value }))} />
                    <input type="text" className={inputClass} style={inputStyle} value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Gender</label>
                  <select className={inputClass} style={inputStyle} value={profile.gender} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Date of Birth</label>
                  <input type="date" className={inputClass} style={inputStyle} value={profile.dateOfBirth} onChange={e => setProfile(p => ({ ...p, dateOfBirth: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>College</label>
                  <input type="text" className={inputClass} style={inputStyle} value={profile.college} onChange={e => setProfile(p => ({ ...p, college: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass} style={labelStyle}>Department</label>
                  <input type="text" className={inputClass} style={inputStyle} value={profile.department} onChange={e => setProfile(p => ({ ...p, department: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Address</label>
                <textarea className={`${inputClass} resize-none`} style={inputStyle} rows="2" value={profile.address} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Bio</label>
                <textarea className={`${inputClass} resize-none`} style={inputStyle} rows="3" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder="Tell us about yourself..." />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2.5 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'social' && (
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={`${labelClass} flex items-center gap-1.5`} style={labelStyle}>
                    <GithubIcon className="w-3.5 h-3.5" /> GitHub
                  </label>
                  <input type="url" className={inputClass} style={inputStyle} value={profile.github} onChange={e => setProfile(p => ({ ...p, github: e.target.value }))} placeholder="https://github.com/username" />
                </div>
                <div>
                  <label className={`${labelClass} flex items-center gap-1.5`} style={labelStyle}>
                    <LinkedinIcon className="w-3.5 h-3.5" /> LinkedIn
                  </label>
                  <input type="url" className={inputClass} style={inputStyle} value={profile.linkedin} onChange={e => setProfile(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/username" />
                </div>
                <div>
                  <label className={`${labelClass} flex items-center gap-1.5`} style={labelStyle}>
                    <Code className="w-3.5 h-3.5" /> HackerRank
                  </label>
                  <input type="url" className={inputClass} style={inputStyle} value={profile.hackerrank} onChange={e => setProfile(p => ({ ...p, hackerrank: e.target.value }))} placeholder="https://hackerrank.com/username" />
                </div>
                <div>
                  <label className={`${labelClass} flex items-center gap-1.5`} style={labelStyle}>
                    <Code2 className="w-3.5 h-3.5" /> LeetCode
                  </label>
                  <input type="url" className={inputClass} style={inputStyle} value={profile.leetcode} onChange={e => setProfile(p => ({ ...p, leetcode: e.target.value }))} placeholder="https://leetcode.com/username" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2.5 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
              <div>
                <label className={labelClass} style={labelStyle}>Current Password</label>
                <input type="password" className={inputClass} style={inputStyle} value={passwords.currentPassword} onChange={e => setPasswords(p => ({ ...p, currentPassword: e.target.value }))} required />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>New Password</label>
                <input type="password" className={inputClass} style={inputStyle} value={passwords.newPassword} onChange={e => setPasswords(p => ({ ...p, newPassword: e.target.value }))} required />
              </div>
              <div>
                <label className={labelClass} style={labelStyle}>Confirm New Password</label>
                <input type="password" className={inputClass} style={inputStyle} value={passwords.confirmPassword} onChange={e => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))} required />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2.5 text-white text-xs font-semibold rounded-lg transition-colors disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminProfile;
