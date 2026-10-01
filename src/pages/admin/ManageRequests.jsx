import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, getImageUrl } from '../../utils/api';

const ManageRequests = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [noteModal, setNoteModal] = useState(null); // { id, action }
  const [adminNote, setAdminNote] = useState('');

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    setLoading(true);
    const res = await adminApi.getProfileRequests();
    if (res.success) {
      setRequests(res.requests || []);
    }
    setLoading(false);
  };

  const handleApprove = async (id) => {
    const result = await Swal.fire({
      ...getSwalOpts(),
      title: 'Approve Request?',
      text: 'This will apply the requested changes.',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Approve',
      confirmButtonColor: '#22c55e',
      input: 'textarea',
      inputLabel: 'Admin Note (optional)',
      inputPlaceholder: 'Add a note for the student...',
    });
    if (!result.isConfirmed) return;

    const res = await adminApi.approveProfileRequest(id, { adminNote: result.value || '' });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Approved!', text: res.message, timer: 2000, showConfirmButton: false });
      fetchRequests();
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const handleReject = async (id) => {
    const result = await Swal.fire({
      ...getSwalOpts(),
      title: 'Reject Request?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Reject',
      confirmButtonColor: '#ef4444',
      input: 'textarea',
      inputLabel: 'Reason for rejection (required)',
      inputPlaceholder: 'Explain why this request is rejected...',
      inputValidator: (value) => {
        if (!value || !value.trim()) return 'Please provide a reason for rejection.';
      },
    });
    if (!result.isConfirmed) return;

    const res = await adminApi.rejectProfileRequest(id, { adminNote: result.value.trim() });
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Rejected', timer: 1500, showConfirmButton: false });
      fetchRequests();
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const formatDate = (d) => d ? new Date(d).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '—';

  const statusColors = {
    pending: 'bg-yellow-100 text-yellow-700 dark-theme:bg-yellow-900/30 dark-theme:text-yellow-400',
    approved: 'bg-green-100 text-green-700 dark-theme:bg-green-900/30 dark-theme:text-green-400',
    rejected: 'bg-red-100 text-red-700 dark-theme:bg-red-900/30 dark-theme:text-red-400',
  };

  const filtered = requests.filter(r => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    return true;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <AdminLayout pageTitle="Manage Requests">
      <div className="space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Requests', count: requests.length, icon: 'ri-file-list-3-line', color: 'text-blue-600 bg-blue-100 dark-theme:bg-blue-900/30 dark-theme:text-blue-400' },
            { label: 'Pending', count: pendingCount, icon: 'ri-time-line', color: 'text-yellow-600 bg-yellow-100 dark-theme:bg-yellow-900/30 dark-theme:text-yellow-400' },
            { label: 'Approved', count: requests.filter(r => r.status === 'approved').length, icon: 'ri-check-line', color: 'text-green-600 bg-green-100 dark-theme:bg-green-900/30 dark-theme:text-green-400' },
            { label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length, icon: 'ri-close-line', color: 'text-red-600 bg-red-100 dark-theme:bg-red-900/30 dark-theme:text-red-400' },
          ].map(s => (
            <div key={s.label} className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${s.color}`}>
                  <i className={`${s.icon} text-lg`}></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-800 dark-theme:text-white">{s.count}</p>
                  <p className="text-[11px] text-gray-500 dark-theme:text-gray-400">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-1 bg-white dark-theme:bg-gray-900 rounded-lg border border-sand dark-theme:border-gray-800 p-1">
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                  filter === s ? 'bg-primary text-white' : 'text-gray-500 dark-theme:text-gray-400 hover:bg-cream dark-theme:hover:bg-gray-800'
                }`}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                {s === 'pending' && pendingCount > 0 && <span className="ml-1 text-[10px]">({pendingCount})</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-1 bg-white dark-theme:bg-gray-900 rounded-lg border border-sand dark-theme:border-gray-800 p-1">
            {['all', 'edit', 'delete'].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-md text-[12px] font-medium transition-all ${
                  typeFilter === t ? 'bg-primary text-white' : 'text-gray-500 dark-theme:text-gray-400 hover:bg-cream dark-theme:hover:bg-gray-800'
                }`}
              >
                {t === 'all' ? 'All Types' : t === 'edit' ? 'Edit Requests' : 'Delete Requests'}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 p-12 text-center">
              <i className="ri-file-list-3-line text-4xl text-gray-300 dark-theme:text-gray-600"></i>
              <p className="mt-2 text-sm text-gray-400">No requests found</p>
            </div>
          ) : (
            filtered.map(req => (
              <div key={req.id} className={`bg-white dark-theme:bg-gray-900 rounded-xl border ${req.status === 'pending' ? 'border-yellow-300 dark-theme:border-yellow-800' : 'border-sand dark-theme:border-gray-800'} p-5 transition-all hover:shadow-sm`}>
                <div className="flex flex-col lg:flex-row gap-4">
                  {/* Student Info */}
                  <div className="flex items-center gap-3 lg:w-56 shrink-0">
                    <img
                      src={req.studentImage ? getImageUrl(req.studentImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(req.studentName || 'Student')}&size=40&background=c96442&color=fff&bold=true`}
                      alt={req.studentName}
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                    <div>
                      <p className="text-[13px] font-semibold text-gray-800 dark-theme:text-white">{req.studentName}</p>
                      <p className="text-[11px] text-gray-400">{req.studentEmail}</p>
                      {req.rollNumber && <p className="text-[10px] text-gray-400">{req.rollNumber}</p>}
                    </div>
                  </div>

                  {/* Request Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${statusColors[req.status]}`}>
                        {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                      </span>
                      <span className={`px-2 py-0.5 text-[11px] font-semibold rounded-full ${
                        req.type === 'edit' 
                          ? 'bg-blue-100 text-blue-700 dark-theme:bg-blue-900/30 dark-theme:text-blue-400' 
                          : 'bg-red-100 text-red-700 dark-theme:bg-red-900/30 dark-theme:text-red-400'
                      }`}>
                        {req.type === 'edit' ? 'Profile Edit' : 'Account Deletion'}
                      </span>
                      <span className="text-[11px] text-gray-400">{formatDate(req.createdAt)}</span>
                    </div>

                    <p className="text-[13px] text-gray-600 dark-theme:text-gray-300"><strong>Reason:</strong> {req.reason}</p>

                    {req.type === 'edit' && req.requestData && (
                      <div className="p-2.5 bg-gray-50 dark-theme:bg-gray-800/50 rounded-lg">
                        <p className="text-[11px] font-semibold text-gray-500 dark-theme:text-gray-400 mb-1.5">Requested Changes:</p>
                        <div className="flex flex-wrap gap-1.5">
                          {Object.entries(typeof req.requestData === 'string' ? JSON.parse(req.requestData) : req.requestData).map(([k, v]) => (
                            <span key={k} className="px-2 py-1 bg-white dark-theme:bg-gray-700 border border-sand dark-theme:border-gray-600 rounded text-[11px] text-gray-600 dark-theme:text-gray-300">
                              <strong className="text-gray-800 dark-theme:text-gray-200">{k}:</strong> {v || '(empty)'}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {req.adminNote && (
                      <p className="text-[12px] text-gray-500 dark-theme:text-gray-400 italic"><i className="ri-chat-quote-line mr-1"></i>Admin note: {req.adminNote}</p>
                    )}

                    {req.reviewerName && (
                      <p className="text-[11px] text-gray-400">Reviewed by {req.reviewerName} on {formatDate(req.reviewedAt)}</p>
                    )}
                  </div>

                  {/* Actions */}
                  {req.status === 'pending' && (
                    <div className="flex lg:flex-col gap-2 shrink-0">
                      <button
                        onClick={() => handleApprove(req.id)}
                        className="flex-1 lg:flex-none px-4 py-2 bg-green-500 hover:bg-green-600 text-white text-[12px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <i className="ri-check-line text-sm"></i> Approve
                      </button>
                      <button
                        onClick={() => handleReject(req.id)}
                        className="flex-1 lg:flex-none px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-[12px] font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5"
                      >
                        <i className="ri-close-line text-sm"></i> Reject
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageRequests;
