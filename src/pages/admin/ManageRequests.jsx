import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, getImageUrl } from '../../utils/api';
import { FileText, Clock, Check, X, MessageSquare } from 'lucide-react';

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

  const statusBadge = (s) => {
    switch (s) {
      case 'pending':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: '#D97706', label: 'Pending' };
      case 'approved':
        return { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669', label: 'Approved' };
      case 'rejected':
        return { bg: 'rgba(239, 68, 68, 0.1)', color: '#DC2626', label: 'Rejected' };
      default:
        return { bg: 'var(--color-background)', color: 'var(--color-text-muted)', label: s };
    }
  };

  const filtered = requests.filter(r => {
    if (filter !== 'all' && r.status !== filter) return false;
    if (typeFilter !== 'all' && r.type !== typeFilter) return false;
    return true;
  });

  const pendingCount = requests.filter(r => r.status === 'pending').length;

  return (
    <AdminLayout pageTitle="Manage Requests">
      <div className="space-y-6 max-w-6xl mx-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Total Requests', count: requests.length, Icon: FileText, color: 'var(--color-primary)' },
            { label: 'Pending', count: pendingCount, Icon: Clock, color: '#D97706' },
            { label: 'Approved', count: requests.filter(r => r.status === 'approved').length, Icon: Check, color: '#059669' },
            { label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length, Icon: X, color: '#DC2626' },
          ].map(s => (
            <div key={s.label} className="rounded-xl border p-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(18, 53, 91, 0.08)', color: s.color }}>
                  <s.Icon className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>{s.count}</p>
                  <p className="text-[11px] font-medium" style={{ color: 'var(--color-text-muted)' }}>{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="flex gap-1 rounded-lg border p-1" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            {['all', 'pending', 'approved', 'rejected'].map(s => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  filter === s ? 'text-white shadow-xs' : 'hover:opacity-80'
                }`}
                style={{
                  background: filter === s ? 'var(--color-primary)' : 'transparent',
                  color: filter === s ? '#ffffff' : 'var(--color-text-muted)'
                }}
              >
                {s.charAt(0).toUpperCase() + s.slice(1)}
                {s === 'pending' && pendingCount > 0 && <span className="ml-1 text-[10px]">({pendingCount})</span>}
              </button>
            ))}
          </div>
          <div className="flex gap-1 rounded-lg border p-1" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            {['all', 'edit', 'delete'].map(t => (
              <button
                key={t}
                onClick={() => setTypeFilter(t)}
                className={`px-3 py-1.5 rounded-md text-xs font-semibold transition-all ${
                  typeFilter === t ? 'text-white shadow-xs' : 'hover:opacity-80'
                }`}
                style={{
                  background: typeFilter === t ? 'var(--color-primary)' : 'transparent',
                  color: typeFilter === t ? '#ffffff' : 'var(--color-text-muted)'
                }}
              >
                {t === 'all' ? 'All Types' : t === 'edit' ? 'Edit Requests' : 'Delete Requests'}
              </button>
            ))}
          </div>
        </div>

        {/* Requests List */}
        <div className="space-y-4">
          {filtered.length === 0 ? (
            <div className="rounded-xl border p-12 text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              <FileText className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-xs font-medium">No requests found</p>
            </div>
          ) : (
            filtered.map(req => {
              const badge = statusBadge(req.status);
              return (
                <div key={req.id} className="rounded-xl border p-5 transition-all hover:shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex flex-col lg:flex-row gap-4">
                    {/* Student Info */}
                    <div className="flex items-center gap-3 lg:w-56 shrink-0">
                      <img
                        src={req.studentImage ? getImageUrl(req.studentImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(req.studentName || 'Student')}&size=40&background=12355B&color=fff&bold=true`}
                        alt={req.studentName}
                        className="w-10 h-10 rounded-lg object-cover border"
                        style={{ borderColor: 'var(--color-border)' }}
                      />
                      <div>
                        <p className="text-xs font-bold" style={{ color: 'var(--color-text)' }}>{req.studentName}</p>
                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{req.studentEmail}</p>
                        {req.rollNumber && <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{req.rollNumber}</p>}
                      </div>
                    </div>

                    {/* Request Details */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full" style={{ background: badge.bg, color: badge.color }}>
                          {badge.label}
                        </span>
                        <span className="px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider rounded-full border" style={{
                          background: req.type === 'edit' ? 'rgba(59, 130, 246, 0.1)' : 'rgba(239, 68, 68, 0.1)',
                          color: req.type === 'edit' ? '#2563EB' : '#DC2626',
                          borderColor: req.type === 'edit' ? 'rgba(59, 130, 246, 0.2)' : 'rgba(239, 68, 68, 0.2)'
                        }}>
                          {req.type === 'edit' ? 'Profile Edit' : 'Account Deletion'}
                        </span>
                        <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{formatDate(req.createdAt)}</span>
                      </div>

                      <p className="text-xs" style={{ color: 'var(--color-text)' }}><strong>Reason:</strong> {req.reason}</p>

                      {req.type === 'edit' && req.requestData && (
                        <div className="p-3 rounded-lg border space-y-1.5" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                          <p className="text-[11px] font-semibold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Requested Changes:</p>
                          <div className="flex flex-wrap gap-1.5">
                            {Object.entries(typeof req.requestData === 'string' ? JSON.parse(req.requestData) : req.requestData).map(([k, v]) => (
                              <span key={k} className="px-2 py-1 rounded border text-[11px]" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                                <strong style={{ color: 'var(--color-primary)' }}>{k}:</strong> {v || '(empty)'}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {req.adminNote && (
                        <p className="text-xs italic flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}><MessageSquare className="w-3.5 h-3.5" /> Admin note: {req.adminNote}</p>
                      )}

                      {req.reviewerName && (
                        <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>Reviewed by {req.reviewerName} on {formatDate(req.reviewedAt)}</p>
                      )}
                    </div>

                    {/* Actions */}
                    {req.status === 'pending' && (
                      <div className="flex lg:flex-col gap-2 shrink-0">
                        <button
                          onClick={() => handleApprove(req.id)}
                          className="flex-1 lg:flex-none px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" /> Approve
                        </button>
                        <button
                          onClick={() => handleReject(req.id)}
                          className="flex-1 lg:flex-none px-4 py-2 bg-red-600 hover:bg-red-700 text-white text-xs font-semibold rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                        >
                          <X className="w-3.5 h-3.5" /> Reject
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default ManageRequests;
