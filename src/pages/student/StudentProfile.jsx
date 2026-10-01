import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { authApi, studentApi, getImageUrl } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

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
    // Filter only changed fields
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
    { id: 'personal', label: 'Personal Info', icon: 'ri-user-line' },
    { id: 'academic', label: 'Academic', icon: 'ri-graduation-cap-line' },
    { id: 'social', label: 'Social Links', icon: 'ri-links-line' },
    { id: 'requests', label: 'My Requests', icon: 'ri-file-list-3-line' },
    { id: 'security', label: 'Security', icon: 'ri-lock-line' },
  ];

  const inputClass = 'w-full px-3 py-2.5 rounded-lg bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-[13px] text-gray-700 dark-theme:text-gray-200 transition-colors';
  const labelClass = 'block text-[12px] font-semibold text-gray-500 dark-theme:text-gray-400 uppercase tracking-wide mb-1.5';
  const readOnlyClass = 'w-full px-3 py-2.5 rounded-lg bg-sand dark-theme:bg-gray-800/50 border border-sand dark-theme:border-gray-700 text-[13px] text-gray-600 dark-theme:text-gray-300 cursor-not-allowed';

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }) : '—';
  const statusColors = { pending: 'bg-yellow-100 text-yellow-700 dark-theme:bg-yellow-900/30 dark-theme:text-yellow-400', approved: 'bg-green-100 text-green-700 dark-theme:bg-green-900/30 dark-theme:text-green-400', rejected: 'bg-red-100 text-red-700 dark-theme:bg-red-900/30 dark-theme:text-red-400' };

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
        <div className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-6">
          <div className="flex flex-col sm:flex-row items-center gap-5">
            <div className="relative group">
              <img
                src={profile.profileImage ? getImageUrl(profile.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullName || 'Student')}&size=96&background=c96442&color=fff&bold=true`}
                alt="Profile"
                className="w-24 h-24 rounded-xl object-cover border-2 border-sand dark-theme:border-gray-700"
              />
              <label className="absolute inset-0 bg-black/40 rounded-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                <i className="ri-camera-line text-white text-xl"></i>
                <input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </label>
            </div>
            <div className="text-center sm:text-left flex-1">
              <h2 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">{profile.fullName || 'Student'}</h2>
              <p className="text-sm text-gray-500 dark-theme:text-gray-400">{profile.email}</p>
              <div className="flex flex-wrap gap-2 mt-1.5 justify-center sm:justify-start">
                <span className="px-2.5 py-0.5 bg-emerald-500/10 text-emerald-600 dark-theme:text-emerald-400 text-[11px] font-semibold rounded-full uppercase">Student</span>
                {profile.rollNumber && <span className="px-2.5 py-0.5 bg-sand dark-theme:bg-gray-800 text-gray-600 dark-theme:text-gray-400 text-[11px] font-semibold rounded-full">{profile.rollNumber}</span>}
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={openEditModal} className="px-4 py-2 bg-primary hover:bg-primary-dark text-white text-[13px] font-semibold rounded-lg transition-colors flex items-center gap-1.5">
                <i className="ri-edit-line text-sm"></i> Request Edit
              </button>
              <button onClick={() => {
                const hasPending = requests.some(r => r.type === 'delete' && r.status === 'pending');
                if (hasPending) {
                  Swal.fire({ ...getSwalOpts(), icon: 'info', title: 'Pending Request', text: 'You already have a pending deletion request.' });
                  return;
                }
                setDeleteReason('');
                setShowDeleteModal(true);
              }} className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg transition-colors flex items-center gap-1.5">
                <i className="ri-delete-bin-line text-sm"></i> Delete Account
              </button>
            </div>
          </div>
          <div className="mt-4 p-3 bg-amber-50 dark-theme:bg-amber-900/20 border border-amber-200 dark-theme:border-amber-800 rounded-lg">
            <p className="text-[12px] text-amber-700 dark-theme:text-amber-400 flex items-center gap-2">
              <i className="ri-information-line text-sm"></i>
              Your profile data is frozen. To make changes, use the <strong>"Request Edit"</strong> button. Admin will review and approve your changes.
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-1.5 overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg text-[13px] font-medium transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-primary text-white shadow-sm'
                  : 'text-gray-500 dark-theme:text-gray-400 hover:bg-cream dark-theme:hover:bg-gray-800'
              }`}
            >
              <i className={tab.icon}></i>
              <span className="hidden sm:inline">{tab.label}</span>
              {tab.id === 'requests' && requests.filter(r => r.status === 'pending').length > 0 && (
                <span className="w-5 h-5 bg-yellow-500 text-white text-[10px] rounded-full flex items-center justify-center font-bold">{requests.filter(r => r.status === 'pending').length}</span>
              )}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-6">
          {activeTab === 'personal' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Full Name</label><div className={readOnlyClass}>{profile.fullName || '—'}</div></div>
              <div><label className={labelClass}>Email</label><div className={readOnlyClass}>{profile.email || '—'}</div></div>
              <div><label className={labelClass}>Username</label><div className={readOnlyClass}>{profile.username || '—'}</div></div>
              <div><label className={labelClass}>Phone</label><div className={readOnlyClass}>{profile.countryCode || ''} {profile.phone || '—'}</div></div>
              <div><label className={labelClass}>Gender</label><div className={readOnlyClass}>{profile.gender ? profile.gender.charAt(0).toUpperCase() + profile.gender.slice(1) : '—'}</div></div>
              <div><label className={labelClass}>Date of Birth</label><div className={readOnlyClass}>{formatDate(profile.dateOfBirth)}</div></div>
              <div className="md:col-span-2"><label className={labelClass}>Address</label><div className={readOnlyClass}>{profile.address || '—'}</div></div>
              <div className="md:col-span-2"><label className={labelClass}>Bio</label><div className={`${readOnlyClass} min-h-[60px]`}>{profile.bio || '—'}</div></div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div><label className={labelClass}>Roll Number</label><div className={readOnlyClass}>{profile.rollNumber || '—'}</div></div>
              <div><label className={labelClass}>College</label><div className={readOnlyClass}>{profile.college || '—'}</div></div>
              <div><label className={labelClass}>Department</label><div className={readOnlyClass}>{profile.department || '—'}</div></div>
              <div><label className={labelClass}>Year</label><div className={readOnlyClass}>{profile.year || '—'}</div></div>
              <div><label className={labelClass}>Verified</label><div className={readOnlyClass}>{profile.isVerified ? 'Yes' : 'No'}</div></div>
              <div><label className={labelClass}>Account Status</label><div className={readOnlyClass}>{profile.isActive ? 'Active' : 'Deactivated'}</div></div>
              <div><label className={labelClass}>Joined</label><div className={readOnlyClass}>{formatDate(profile.createdAt)}</div></div>
            </div>
          )}

          {activeTab === 'social' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {[
                { key: 'github', icon: 'ri-github-fill', label: 'GitHub' },
                { key: 'linkedin', icon: 'ri-linkedin-box-fill', label: 'LinkedIn' },
                { key: 'hackerrank', icon: 'ri-code-box-line', label: 'HackerRank' },
                { key: 'leetcode', icon: 'ri-code-s-slash-line', label: 'LeetCode' },
              ].map(s => (
                <div key={s.key}>
                  <label className={labelClass}><i className={`${s.icon} mr-1`}></i>{s.label}</label>
                  <div className={readOnlyClass}>
                    {profile[s.key] ? (
                      <a href={profile[s.key]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">{profile[s.key]}</a>
                    ) : '—'}
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'requests' && (
            <div className="space-y-4">
              {requests.length === 0 ? (
                <div className="text-center py-12">
                  <i className="ri-file-list-3-line text-4xl text-gray-300 dark-theme:text-gray-600"></i>
                  <p className="mt-2 text-sm text-gray-400">No requests yet</p>
                </div>
              ) : (
                requests.map(req => (
                  <div key={req.id} className="border border-sand dark-theme:border-gray-800 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${statusColors[req.status]}`}>{req.status.charAt(0).toUpperCase() + req.status.slice(1)}</span>
                          <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${req.type === 'edit' ? 'bg-blue-100 text-blue-700 dark-theme:bg-blue-900/30 dark-theme:text-blue-400' : 'bg-red-100 text-red-700 dark-theme:bg-red-900/30 dark-theme:text-red-400'}`}>
                            {req.type === 'edit' ? 'Profile Edit' : 'Account Deletion'}
                          </span>
                          <span className="text-[11px] text-gray-400">{formatDate(req.createdAt)}</span>
                        </div>
                        <p className="text-[13px] text-gray-600 dark-theme:text-gray-300"><strong>Reason:</strong> {req.reason}</p>
                        {req.type === 'edit' && req.requestData && (
                          <div className="mt-2 p-2 bg-cream dark-theme:bg-gray-800/50 rounded-lg">
                            <p className="text-[11px] font-semibold text-gray-500 dark-theme:text-gray-400 mb-1">Requested Changes:</p>
                            <div className="flex flex-wrap gap-1.5">
                              {Object.entries(typeof req.requestData === 'string' ? JSON.parse(req.requestData) : req.requestData).map(([k, v]) => (
                                <span key={k} className="px-2 py-0.5 bg-white dark-theme:bg-gray-700 border border-sand dark-theme:border-gray-600 rounded text-[11px] text-gray-600 dark-theme:text-gray-300">
                                  <strong>{k}:</strong> {v}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}
                        {req.adminNote && (
                          <p className="mt-2 text-[12px] text-gray-500 dark-theme:text-gray-400 italic"><i className="ri-chat-quote-line mr-1"></i>Admin note: {req.adminNote}</p>
                        )}
                        {req.reviewerName && req.reviewedAt && (
                          <p className="mt-1 text-[11px] text-gray-400">Reviewed by {req.reviewerName} on {formatDate(req.reviewedAt)}</p>
                        )}
                      </div>
                      {req.status === 'pending' && (
                        <button onClick={() => handleCancelRequest(req.id)} className="px-3 py-1.5 text-[12px] text-red-500 hover:bg-red-50 dark-theme:hover:bg-red-900/20 rounded-lg transition-colors">
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

      {/* Edit Request Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowEditModal(false)}>
          <div className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 w-full max-w-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white dark-theme:bg-gray-900 px-6 py-4 border-b border-sand dark-theme:border-gray-800 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">Request Profile Edit</h3>
              <button onClick={() => setShowEditModal(false)} className="w-8 h-8 rounded-lg hover:bg-sand dark-theme:hover:bg-gray-800 flex items-center justify-center text-gray-400">
                <i className="ri-close-line text-lg"></i>
              </button>
            </div>
            <div className="p-6 space-y-5">
              <div className="p-3 bg-blue-50 dark-theme:bg-blue-900/20 border border-blue-200 dark-theme:border-blue-800 rounded-lg">
                <p className="text-[12px] text-blue-700 dark-theme:text-blue-400 flex items-center gap-2">
                  <i className="ri-information-line text-sm"></i>
                  Edit the fields you want to change. Only the changed fields will be sent for approval.
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>Full Name</label>
                  <input type="text" className={inputClass} value={editFields.fullName} onChange={e => setEditFields(f => ({ ...f, fullName: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Phone</label>
                  <div className="flex gap-2">
                    <input type="text" className={`${inputClass} w-20`} value={editFields.countryCode} onChange={e => setEditFields(f => ({ ...f, countryCode: e.target.value }))} />
                    <input type="text" className={inputClass} value={editFields.phone} onChange={e => setEditFields(f => ({ ...f, phone: e.target.value }))} />
                  </div>
                </div>
                <div>
                  <label className={labelClass}>Gender</label>
                  <select className={inputClass} value={editFields.gender} onChange={e => setEditFields(f => ({ ...f, gender: e.target.value }))}>
                    <option value="">Select Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className={labelClass}>Date of Birth</label>
                  <input type="date" className={inputClass} value={editFields.dateOfBirth} onChange={e => setEditFields(f => ({ ...f, dateOfBirth: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>College</label>
                  <input type="text" className={inputClass} value={editFields.college} onChange={e => setEditFields(f => ({ ...f, college: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Department</label>
                  <input type="text" className={inputClass} value={editFields.department} onChange={e => setEditFields(f => ({ ...f, department: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Year</label>
                  <input type="text" className={inputClass} value={editFields.year} onChange={e => setEditFields(f => ({ ...f, year: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>Address</label>
                  <input type="text" className={inputClass} value={editFields.address} onChange={e => setEditFields(f => ({ ...f, address: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Bio</label>
                <textarea className={`${inputClass} resize-none`} rows="2" value={editFields.bio} onChange={e => setEditFields(f => ({ ...f, bio: e.target.value }))} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className={labelClass}>GitHub</label>
                  <input type="url" className={inputClass} value={editFields.github} onChange={e => setEditFields(f => ({ ...f, github: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>LinkedIn</label>
                  <input type="url" className={inputClass} value={editFields.linkedin} onChange={e => setEditFields(f => ({ ...f, linkedin: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>HackerRank</label>
                  <input type="url" className={inputClass} value={editFields.hackerrank} onChange={e => setEditFields(f => ({ ...f, hackerrank: e.target.value }))} />
                </div>
                <div>
                  <label className={labelClass}>LeetCode</label>
                  <input type="url" className={inputClass} value={editFields.leetcode} onChange={e => setEditFields(f => ({ ...f, leetcode: e.target.value }))} />
                </div>
              </div>
              <div>
                <label className={labelClass}>Reason for Changes <span className="text-red-500">*</span></label>
                <textarea className={`${inputClass} resize-none`} rows="2" value={editReason} onChange={e => setEditReason(e.target.value)} placeholder="Explain why you need to edit your profile..." />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowEditModal(false)} className="px-5 py-2.5 text-[13px] font-medium text-gray-600 dark-theme:text-gray-400 hover:bg-sand dark-theme:hover:bg-gray-800 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={handleSubmitEditRequest} disabled={loading} className="px-6 py-2.5 bg-primary hover:bg-primary-dark text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50">
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
          <div className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 w-full max-w-md" onClick={e => e.stopPropagation()}>
            <div className="px-6 py-4 border-b border-sand dark-theme:border-gray-800">
              <h3 className="text-lg font-bold text-red-600">Request Account Deletion</h3>
            </div>
            <div className="p-6 space-y-4">
              <div className="p-3 bg-red-50 dark-theme:bg-red-900/20 border border-red-200 dark-theme:border-red-800 rounded-lg">
                <p className="text-[12px] text-red-700 dark-theme:text-red-400 flex items-start gap-2">
                  <i className="ri-error-warning-line text-sm mt-0.5"></i>
                  <span>This will send a request to admin to deactivate your account. Once approved, you will no longer be able to access the platform.</span>
                </p>
              </div>
              <div>
                <label className={labelClass}>Reason for Account Deletion <span className="text-red-500">*</span></label>
                <textarea className={`${inputClass} resize-none`} rows="3" value={deleteReason} onChange={e => setDeleteReason(e.target.value)} placeholder="Why do you want to delete your account?" />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button onClick={() => setShowDeleteModal(false)} className="px-5 py-2.5 text-[13px] font-medium text-gray-600 dark-theme:text-gray-400 hover:bg-sand dark-theme:hover:bg-gray-800 rounded-lg transition-colors">
                  Cancel
                </button>
                <button onClick={handleSubmitDeleteRequest} disabled={loading} className="px-6 py-2.5 bg-red-500 hover:bg-red-600 text-white text-[13px] font-semibold rounded-lg transition-colors disabled:opacity-50">
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
