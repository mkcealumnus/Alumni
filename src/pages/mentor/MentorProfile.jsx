import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { authApi, getImageUrl } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const MentorProfile = () => {
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
    { id: 'personal', label: 'Personal Info', icon: 'ri-user-line' },
    { id: 'social', label: 'Social Links', icon: 'ri-links-line' },
    { id: 'security', label: 'Security', icon: 'ri-lock-line' },
  ];

  const inputClass = 'w-full px-3 py-2.5 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-[13px] text-gray-700 dark-theme:text-gray-200 transition-colors';
  const labelClass = 'block text-[12px] font-semibold text-gray-500 dark-theme:text-gray-400 uppercase tracking-wide mb-1.5';

  if (fetching) {
    return (
      <DashboardLayout pageTitle="My Profile" role="mentor">
        <Loader fullPage text="Loading profile..." />
      </DashboardLayout>
    );
  }


  return (
    <DashboardLayout pageTitle="My Profile" role="mentor">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group">
              <img
                src={profile.profileImage ? getImageUrl(profile.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'Mentor')}&size=96&background=c96442&color=fff&bold=true`}
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover border-2 border-sand dark-theme:border-gray-700"
              />
              <label className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <i className="ri-camera-line text-white text-xl"></i>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="text-center sm:text-left">
              <h2 className="text-xl font-bold text-gray-800 dark-theme:text-white">{profile.fullName || 'Mentor'}</h2>
              <p className="text-sm text-gray-500 dark-theme:text-gray-400">{profile.email}</p>
              <span className="inline-block mt-1.5 px-2.5 py-0.5 bg-blue-500/10 text-blue-600 dark-theme:text-blue-400 text-[11px] font-semibold rounded-full uppercase">Mentor</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-1.5">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 dark-theme:text-gray-400 hover:bg-cream dark-theme:hover:bg-gray-800'
              }`}
            >
              <i className={tab.icon}></i>
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-6">
          {activeTab === 'personal' && (
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" className={inputClass} value={profile.fullName} onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Email</label>
                  <input type="email" className={`${inputClass} opacity-60 cursor-not-allowed`} value={profile.email} disabled />
                </div>
                <div>
                  <label className={labelClass}>Username</label>
                  <input type="text" className={`${inputClass} opacity-60 cursor-not-allowed`} value={profile.username} disabled />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <div className="flex gap-2">
                    <input type="text" className={`${inputClass} w-20`} value={profile.countryCode} onChange={e => setProfile(p => ({ ...p, countryCode: e.target.value }))} />
                    <input type="text" className={inputClass} value={profile.phone} onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select className={inputClass} value={profile.gender} onChange={e => setProfile(p => ({ ...p, gender: e.target.value }))}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" className={inputClass} value={profile.dateOfBirth} onChange={e => setProfile(p => ({ ...p, dateOfBirth: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>College</label>
                  <input type="text" className={inputClass} value={profile.college} onChange={e => setProfile(p => ({ ...p, college: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Department</label>
                  <input type="text" className={inputClass} value={profile.department} onChange={e => setProfile(p => ({ ...p, department: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Address</label>
                <textarea className={`${inputClass} resize-none`} rows="2" value={profile.address} onChange={e => setProfile(p => ({ ...p, address: e.target.value }))} />
              </div>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea className={`${inputClass} resize-none`} rows="3" value={profile.bio} onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))} placeholder="Tell us about yourself..." />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'social' && (
            <form onSubmit={handleProfileUpdate} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className={labelClass}><i className="ri-github-fill mr-1"></i>GitHub</label>
                  <input type="url" className={inputClass} value={profile.github} onChange={e => setProfile(p => ({ ...p, github: e.target.value }))} placeholder="https://github.com/username" />
                </div>
                <div>
                  <label className={labelClass}><i className="ri-linkedin-box-fill mr-1"></i>LinkedIn</label>
                  <input type="url" className={inputClass} value={profile.linkedin} onChange={e => setProfile(p => ({ ...p, linkedin: e.target.value }))} placeholder="https://linkedin.com/in/username" />
                </div>
                <div>
                  <label className={labelClass}><i className="ri-code-box-line mr-1"></i>HackerRank</label>
                  <input type="url" className={inputClass} value={profile.hackerrank} onChange={e => setProfile(p => ({ ...p, hackerrank: e.target.value }))} placeholder="https://hackerrank.com/username" />
                </div>
                <div>
                  <label className={labelClass}><i className="ri-code-s-slash-line mr-1"></i>LeetCode</label>
                  <input type="url" className={inputClass} value={profile.leetcode} onChange={e => setProfile(p => ({ ...p, leetcode: e.target.value }))} placeholder="https://leetcode.com/username" />
                </div>
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50">
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordChange} className="space-y-5 max-w-md">
              <div>
                <label className={labelClass}>Current Password</label>
                <input type="password" className={inputClass} value={passwords.currentPassword} onChange={e => setPasswords(p => ({ ...p, currentPassword: e.target.value }))} required />
              </div>
              <div>
                <label className={labelClass}>New Password</label>
                <input type="password" className={inputClass} value={passwords.newPassword} onChange={e => setPasswords(p => ({ ...p, newPassword: e.target.value }))} required />
              </div>
              <div>
                <label className={labelClass}>Confirm New Password</label>
                <input type="password" className={inputClass} value={passwords.confirmPassword} onChange={e => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))} required />
              </div>
              <div className="flex justify-end">
                <button type="submit" disabled={loading} className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50">
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MentorProfile;
