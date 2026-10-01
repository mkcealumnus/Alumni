import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';
import { authApi, studentApi, getImageUrl } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { 
  User, GraduationCap, Link2, FileText, Lock, Camera, 
  Edit, Trash2, Info, Code, Code2, X, AlertTriangle 
} from 'lucide-react';

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

const StudentProfile = () => {
  const { user, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('personal');
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [profile, setProfile] = useState({});
  const [requests, setRequests] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editFields, setEditFields] = useState({});
  const [editReason, setEditReason] = useState('');
  const [deleteReason, setDeleteReason] = useState('');
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setFetching(true);
    const [profileRes, reqRes] = await Promise.all([
      authApi.getMe(),
      studentApi.getProfileRequests()
    ]);
    if (profileRes.success && profileRes.user) {
      setProfile(profileRes.user);
    }
    if (reqRes.success) {
      setRequests(reqRes.requests || []);
    }
    setFetching(false);
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
    const res = await authApi.uploadProfileImage(file, profile.rollNumber);
    if (res.success && res.profileImage) {
      setProfile(p => ({ ...p, profileImage: res.profileImage }));
      updateUser({ ...user, profileImage: res.profileImage });
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Photo Updated!', timer: 1500, showConfirmButton: false });
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Upload failed' });
    }
    setLoading(false);
  };

  const openEditModal = () => {
    const hasPending = requests.some(r => r.type === 'edit' && r.status === 'pending');
    if (hasPending) {
      Swal.fire({ ...getSwalOpts(), icon: 'info', title: 'Pending Request', text: 'You already have a pending edit request. Please wait for admin to review it.' });
      return;
    }
    setEditFields({
      fullName: profile.fullName || '',
      phone: profile.phone || '',
      countryCode: profile.countryCode || '+91',
      college: profile.college || '',
      department: profile.department || '',
      year: profile.year || '',
      gender: profile.gender || '',
      dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
      address: profile.address || '',
      bio: profile.bio || '',
      github: profile.github || '',
      linkedin: profile.linkedin || '',
      hackerrank: profile.hackerrank || '',
      leetcode: profile.leetcode || '',
    });
    setEditReason('');
    setShowEditModal(true);
  };

  const handleSubmitEditRequest = async () => {
    if (!editReason.trim()) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Reason Required', text: 'Please provide a reason for the edit request.' });
      return;
    }
    const changedFields = {};
    Object.entries(editFields).forEach(([key, value]) => {
      const original = key === 'dateOfBirth'
        ? (profile[key] ? profile[key].split('T')[0] : '')
        : (profile[key] || '');
      if (value !== original) changedFields[key] = value;
    });

    if (Object.keys(changedFields).length === 0) {
      Swal.fire({ ...getSwalOpts(), icon: 'info', title: 'No Changes', text: 'You haven\'t changed any fields.' });
      return;
    }

    setLoading(true);
    const res = await studentApi.createProfileRequest({
      type: 'edit',
      requestData: changedFields,
      reason: editReason.trim()
    });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Request Submitted!', text: 'Your edit request has been sent to admin for approval.' });
      setShowEditModal(false);
      fetchData();
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
    setLoading(false);
  };

  const handleSubmitDeleteRequest = async () => {
    if (!deleteReason.trim()) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Reason Required', text: 'Please provide a reason for account deletion.' });
      return;
    }
    setLoading(true);
    const res = await studentApi.createProfileRequest({
      type: 'delete',
      reason: deleteReason.trim()
    });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Request Submitted!', text: 'Your account deletion request has been sent to admin.' });
      setShowDeleteModal(false);
      setDeleteReason('');
      fetchData();
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
    setLoading(false);
  };

  const handleCancelRequest = async (id) => {
    const result = await Swal.fire({ ...getSwalOpts(), title: 'Cancel Request?', text: 'Are you sure you want to cancel this request?', icon: 'question', showCancelButton: true, confirmButtonText: 'Yes, cancel it' });
    if (!result.isConfirmed) return;
    const res = await studentApi.cancelProfileRequest(id);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Cancelled!', timer: 1500, showConfirmButton: false });
      fetchData();
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const tabs = [
    { id: 'personal', label: 'Personal Info', icon: User },
    { id: 'academic', label: 'Academic', icon: GraduationCap },
    { id: 'social', label: 'Social Links', icon: Link2 },
    { id: 'requests', label: 'My Requests', icon: FileText },
    { id: 'security', label: 'Security', icon: Lock },
  ];

  const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };
  const readOnlyStyle = { background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'approved': return { background: 'var(--color-success-bg)', color: 'var(--color-success)' };
      case 'rejected': return { background: 'var(--color-danger-bg)', color: 'var(--color-danger)' };
      default: return { background: 'var(--color-warning-bg)', color: 'var(--color-warning)' };
    }
  };

  if (fetching) {
    return (
      <DashboardLayout pageTitle="My Profile" role="student">
        <Loader fullPage text="Loading profile..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="My Profile" role="student">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <div className="rounded-xl border p-6 shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group">
              <img
                src={profile.profileImage ? getImageUrl(profile.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'Student')}&size=96&background=12355b&color=fff&bold=true`}
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover border-2"
                style={{ borderColor: 'var(--color-border)' }}
              />
              <label className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <Camera className="h-6 w-6 text-white" />
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{profile.fullName || 'Student'}</h2>
              <p className="text-xs font-medium mt-0.5" style={{ color: 'var(--color-text-secondary)' }}>{profile.email}</p>
              <div className="flex flex-wrap gap-2 mt-2 justify-center sm:justify-start">
                <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md border" style={{ background: 'var(--color-accent)', color: 'var(--color-primary)', borderColor: 'var(--color-border)' }}>Student</span>
                {profile.rollNumber && <span className="px-2.5 py-0.5 text-xs font-semibold rounded-md border" style={{ background: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)', borderColor: 'var(--color-border)' }}>{profile.rollNumber}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={openEditModal} 
                className="px-3.5 py-2 rounded-lg text-white text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-xs"
                style={{ background: 'var(--color-primary)' }}
                onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
              >
                <Edit className="h-3.5 w-3.5" /> Request Edit
              </button>
              <button 
                onClick={() => {
                  const hasPending = requests.some(r => r.type === 'delete' && r.status === 'pending');
                  if (hasPending) {
                    Swal.fire({ ...getSwalOpts(), icon: 'info', title: 'Pending Request', text: 'You already have a pending deletion request.' });
                    return;
                  }
                  setDeleteReason('');
                  setShowDeleteModal(true);
                }} 
                className="px-3.5 py-2 border rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                style={{ background: 'var(--color-danger-bg)', borderColor: 'var(--color-border)', color: 'var(--color-danger)' }}
              >
                <Trash2 className="h-3.5 w-3.5" /> Delete Account
              </button>
            </div>
          </div>
          <div className="mt-4 p-3 rounded-lg border flex items-center gap-2 text-xs" style={{ background: 'var(--color-info-bg)', borderColor: 'var(--color-border)', color: 'var(--color-info)' }}>
            <Info className="h-4 w-4 shrink-0" />
            <span>Your profile data is frozen. To make changes, use the <strong>"Request Edit"</strong> button. Admin will review and approve your changes.</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1.5 rounded-xl border p-1.5 overflow-x-auto" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isSelected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-xs font-medium transition-colors whitespace-nowrap"
                style={{
                  background: isSelected ? 'var(--color-primary)' : 'transparent',
                  color: isSelected ? '#FFFFFF' : 'var(--color-text-secondary)'
                }}
              >
                <Icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tab.label}</span>
                {tab.id === 'requests' && requests.filter(r => r.status === 'pending').length > 0 && (
                  <span className="w-4 h-4 rounded-full text-[10px] flex items-center justify-center font-bold text-white" style={{ background: 'var(--color-warning)' }}>
                    {requests.filter(r => r.status === 'pending').length}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="rounded-xl border p-6 shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Full Name</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.fullName || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Email</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.email || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Username</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.username || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Phone</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.countryCode || ''} {profile.phone || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Gender</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Date of Birth</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{formatDate(profile.dateOfBirth)}</div></div>
              <div className="md:col-span-2"><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Address</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.address || '—'}</div></div>
              <div className="md:col-span-2"><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Bio</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium min-h-[60px]" style={readOnlyStyle}>{profile.bio || '—'}</div></div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Roll Number</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.rollNumber || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>College</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.college || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Department</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.department || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Year</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.year || '—'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Verified</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.isVerified ? 'Yes' : 'No'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Account Status</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{profile.isActive ? 'Active' : 'Deactivated'}</div></div>
              <div><label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Joined</label><div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>{formatDate(profile.createdAt)}</div></div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: 'github', icon: GithubIcon, label: 'GitHub' },
                { key: 'linkedin', icon: LinkedinIcon, label: 'LinkedIn' },
                { key: 'hackerrank', icon: Code, label: 'HackerRank' },
                { key: 'leetcode', icon: Code2, label: 'LeetCode' },
              ].map(s => {
                const Icon = s.icon;
                return (
                  <div key={s.key}>
                    <label className="block text-xs font-semibold mb-1 flex items-center gap-1.5" style={{ color: 'var(--color-text-muted)' }}>
                      <Icon className="h-4 w-4" />{s.label}
                    </label>
                    <div className="w-full px-3 py-2 rounded-lg border text-xs font-medium" style={readOnlyStyle}>
                      {profile[s.key] ? (
                        <a href={profile[s.key]} target="_blank" rel="noopener noreferrer" className="hover:underline font-semibold" style={{ color: 'var(--color-primary)' }}>{profile[s.key]}</a>
                      ) : '—'}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center py-12" style={{ color: 'var(--color-text-muted)' }}>
                  <FileText className="h-10 w-10 mx-auto mb-2 opacity-40" />
                  <p className="text-xs font-medium">No profile edit or deletion requests yet</p>
                </div>
              ) : (
                requests.map(req => (
                  <div key={req.id} className="border rounded-lg p-4" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full capitalize" style={getStatusBadgeStyle(req.status)}>{req.status}</span>
                          <span className="px-2.5 py-0.5 text-xs font-semibold rounded-full border" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                            {req.type === 'edit' ? 'Profile Edit' : 'Account Deletion'}
                          </span>
                          <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{formatDate(req.createdAt)}</span>
                        </div>
                        <p className="text-xs font-medium" style={{ color: 'var(--color-text)' }}><strong>Reason:</strong> {req.reason}</p>
                        {req.type === 'edit' && req.requestData && (
                          <div className="mt-2 p-2.5 rounded-lg border" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)' }}>
                            <p className="text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Requested Changes:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {Object.entries(typeof req.requestData === 'string' ? JSON.parse(req.requestData) : req.requestData).map(([k, v]) => (
                                <span key={k} className="px-2 py-0.5 border rounded text-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-secondary)' }}>
                                  <strong>{k}:</strong> {v}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {req.adminNote && (
                          <p className="mt-2 text-xs italic" style={{ color: 'var(--color-text-muted)' }}>Admin note: {req.adminNote}</p>
                        )}
                      </div>
                      {req.status === 'pending' && (
                        <button onClick={() => handleCancelRequest(req.id)} className="px-3 py-1 text-xs font-medium rounded-lg transition-colors border" style={{ background: 'var(--color-danger-bg)', borderColor: 'var(--color-border)', color: 'var(--color-danger)' }}>
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handlePasswordChange} className="space-y-4 max-w-md">
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Current Password</label>
                <input type="password" className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20" style={inputStyle} value={passwords.currentPassword} onChange={e => setPasswords(p => ({ ...p, currentPassword: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>New Password</label>
                <input type="password" className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20" style={inputStyle} value={passwords.newPassword} onChange={e => setPasswords(p => ({ ...p, newPassword: e.target.value }))} required />
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Confirm New Password</label>
                <input type="password" className="w-full px-3 py-2 rounded-lg border text-xs focus:outline-none focus:ring-2 focus:ring-blue-500/20" style={inputStyle} value={passwords.confirmPassword} onChange={e => setPasswords(p => ({ ...p, confirmPassword: e.target.value }))} required />
              </div>
              <div className="flex justify-end pt-2">
                <button 
                  type="submit" 
                  disabled={loading} 
                  className="px-5 py-2.5 text-white text-xs font-semibold rounded-lg transition-colors shadow-xs disabled:opacity-50"
                  style={{ background: 'var(--color-primary)' }}
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
                >
                  {loading ? 'Changing...' : 'Change Password'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Edit Request Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditModal(false)}>
          <div className="rounded-xl border w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }} onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 px-6 py-4 border-b flex items-center justify-between" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Request Profile Edit</h3>
              <button onClick={() => setShowEditModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center text-gray-400 hover:bg-gray-100">
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 rounded-lg border text-xs flex items-center gap-2" style={{ background: 'var(--color-info-bg)', borderColor: 'var(--color-border)', color: 'var(--color-info)' }}>
                <Info className="h-4 w-4 shrink-0" />
                <span>Edit the fields you want to change. Only the changed fields will be sent for approval.</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Full Name</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.fullName} onChange={e => setEditFields(f => ({ ...f, fullName: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Phone</label>
                  <div className="flex gap-2">
                    <input type="text" className="w-20 px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.countryCode} onChange={e => setEditFields(f => ({ ...f, countryCode: e.target.value }))} />
                    <input type="text" className="flex-1 px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.phone} onChange={e => setEditFields(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Gender</label>
                  <select className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.gender} onChange={e => setEditFields(f => ({ ...f, gender: e.target.value }))}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Date of Birth</label>
                  <input type="date" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.dateOfBirth} onChange={e => setEditFields(f => ({ ...f, dateOfBirth: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>College</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.college} onChange={e => setEditFields(f => ({ ...f, college: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Department</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.department} onChange={e => setEditFields(f => ({ ...f, department: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Year</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.year} onChange={e => setEditFields(f => ({ ...f, year: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Address</label>
                  <input type="text" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.address} onChange={e => setEditFields(f => ({ ...f, address: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Bio</label>
                <textarea className="w-full px-3 py-2 rounded-lg border text-xs resize-none" rows="2" style={inputStyle} value={editFields.bio} onChange={e => setEditFields(f => ({ ...f, bio: e.target.value }))} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>GitHub</label>
                  <input type="url" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.github} onChange={e => setEditFields(f => ({ ...f, github: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>LinkedIn</label>
                  <input type="url" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.linkedin} onChange={e => setEditFields(f => ({ ...f, linkedin: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>HackerRank</label>
                  <input type="url" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.hackerrank} onChange={e => setEditFields(f => ({ ...f, hackerrank: e.target.value }))} />
                </div>
                <div>
                  <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>LeetCode</label>
                  <input type="url" className="w-full px-3 py-2 rounded-lg border text-xs" style={inputStyle} value={editFields.leetcode} onChange={e => setEditFields(f => ({ ...f, leetcode: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Reason for Changes <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                <textarea className="w-full px-3 py-2 rounded-lg border text-xs resize-none" rows="2" style={inputStyle} value={editReason} onChange={e => setEditReason(e.target.value)} placeholder="Explain why you need to edit your profile..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowEditModal(false)} className="px-4 py-2 border rounded-lg text-xs font-medium" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  Cancel
                </button>
                <button onClick={handleSubmitEditRequest} disabled={loading} className="px-5 py-2 text-white text-xs font-semibold rounded-lg shadow-xs disabled:opacity-50" style={{ background: 'var(--color-primary)' }}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Account Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowDeleteModal(false)}>
          <div className="rounded-xl border w-full max-w-md shadow-xl" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }} onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-base font-bold" style={{ color: 'var(--color-danger)' }}>Request Account Deletion</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 rounded-lg border text-xs flex items-start gap-2" style={{ background: 'var(--color-danger-bg)', borderColor: 'var(--color-border)', color: 'var(--color-danger)' }}>
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5" />
                <span>This will send a request to admin to deactivate your account. Once approved, you will no longer be able to access the platform.</span>
              </div>
              <div>
                <label className="block text-xs font-semibold mb-1" style={{ color: 'var(--color-text-muted)' }}>Reason for Account Deletion <span style={{ color: 'var(--color-danger)' }}>*</span></label>
                <textarea className="w-full px-3 py-2 rounded-lg border text-xs resize-none" rows="3" style={inputStyle} value={deleteReason} onChange={e => setDeleteReason(e.target.value)} placeholder="Why do you want to delete your account?" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowDeleteModal(false)} className="px-4 py-2 border rounded-lg text-xs font-medium" style={{ background: 'var(--color-surface-muted)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                  Cancel
                </button>
                <button onClick={handleSubmitDeleteRequest} disabled={loading} className="px-5 py-2 text-white text-xs font-semibold rounded-lg shadow-xs disabled:opacity-50" style={{ background: 'var(--color-danger)' }}>
                  {loading ? 'Submitting...' : 'Submit Request'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default StudentProfile;
