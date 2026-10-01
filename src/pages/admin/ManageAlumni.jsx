import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, getImageUrl } from '../../utils/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const ManageAlumnis = () => {
  const [alumnis, setAlumnis] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editAlumni, setEditAlumni] = useState(null);
  const [form, setForm] = useState({ email: '', username: '', fullName: '', phone: '', password: '' });

  const fetchAlumnis = async () => {
    setLoading(true);
    const res = await adminApi.getAlumnis('');
    if (res.success) setAlumnis(res.alumnis || []);
    setLoading(false);
  };

  useEffect(() => { fetchAlumnis(); }, []);

  const openCreate = () => { setEditAlumni(null); setForm({ email: '', username: '', fullName: '', phone: '', password: '' }); setShowModal(true); };
  const openEdit = (m) => { setEditAlumni(m); setForm({ email: m.email, username: m.username, fullName: m.fullName, phone: m.phone || '', password: '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editAlumni) {
      const body = { ...form }; if (!body.password) delete body.password;
      const res = await adminApi.updateAlumni(editAlumni.id, body);
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Updated!', timer: 1500, showConfirmButton: false }); setShowModal(false); fetchAlumnis(); }
      else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    } else {
      const res = await adminApi.createAlumni({ ...form, role: 'alumni' });
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Alumni Created!', timer: 1500, showConfirmButton: false }); setShowModal(false); fetchAlumnis(); }
      else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const handleDelete = (id, name) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Alumni?', text: `Remove ${name}? This cannot be undone.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#B91C1C', confirmButtonText: 'Delete' })
      .then(async (r) => { if (r.isConfirmed) { const res = await adminApi.deleteAlumni(id); if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false }); fetchAlumnis(); } } });
  };

  const handleToggleStatus = async (m) => {
    const res = await adminApi.updateAlumni(m.id, { isActive: !m.isActive });
    if (res.success) fetchAlumnis();
  };

  const columns = [
    { key: 'id', label: 'ID', sortable: true, visible: false },
    { key: 'fullName', label: 'Name', sortable: true, render: (_, m) => (
      <div className="flex items-center gap-2.5">
        <img src={m.profileImage ? getImageUrl(m.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.fullName)}&size=36&background=12355B&color=fff`} className="w-8 h-8 rounded-lg object-cover" alt="" />
        <div>
          <span className="font-medium" style={{ color: 'var(--color-text)' }}>{m.fullName}</span>
          <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>@{m.username}</p>
        </div>
      </div>
    ), exportValue: (m) => m.fullName },
    { key: 'username', label: 'Username', sortable: true, visible: false },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false, render: (v) => v || '—' },
    { key: 'isActive', label: 'Status', sortable: true, render: (_, m) => (
      <button onClick={(e) => { e.stopPropagation(); handleToggleStatus(m); }} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: m.isActive ? 'var(--color-success-bg)' : 'var(--color-danger-bg)', color: m.isActive ? 'var(--color-success)' : 'var(--color-danger)' }}>
        {m.isActive ? 'Active' : 'Inactive'}
      </button>
    ), exportValue: (m) => m.isActive ? 'Active' : 'Inactive' },
    { key: 'createdAt', label: 'Joined', sortable: true, render: (v) => new Date(v).toLocaleDateString(), exportValue: (m) => new Date(m.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (_, m) => (
      <div className="flex items-center justify-end gap-2">
        <button onClick={(e) => { e.stopPropagation(); openEdit(m); }} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }} title="Edit"><Pencil size={14} /></button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(m.id, m.fullName); }} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }} title="Delete"><Trash2 size={14} /></button>
      </div>
    ) },
  ];

  return (
    <AdminLayout pageTitle="Manage Alumni">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Manage Alumni</h1>
          <p className="text-[14px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{alumnis.length} total alumni</p>
        </div>

        <DataTable
          columns={columns}
          data={alumnis}
          loading={loading}
          searchPlaceholder="Search alumni..."
          storageKey="nextstep_alumnis_cols"
          exportTitle="Alumni Report"
          exportFileName="MKCE_Alumni"
          emptyMessage="No alumni found"
          headerActions={
            <button
              onClick={openCreate}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors"
              style={{ background: 'var(--color-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
            >
              <Plus size={16} /> Add Alumni
            </button>
          }
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="w-full max-w-md mx-4 p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-semibold" style={{ color: 'var(--color-text)' }}>{editAlumni ? 'Edit Alumni' : 'Add Alumni'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>
                <X size={18} style={{ color: 'var(--color-text-muted)' }} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              {[
                { type: 'email', placeholder: 'Email', required: true, key: 'email' },
                { type: 'text', placeholder: 'Username', required: true, key: 'username' },
                { type: 'text', placeholder: 'Full Name', required: true, key: 'fullName' },
                { type: 'tel', placeholder: 'Phone', required: false, key: 'phone' },
                { type: 'password', placeholder: editAlumni ? 'New Password (leave blank to keep)' : 'Password', required: !editAlumni, key: 'password' },
              ].map(input => (
                <input
                  key={input.key}
                  type={input.type}
                  placeholder={input.placeholder}
                  required={input.required}
                  value={form[input.key]}
                  onChange={(e) => setForm({ ...form, [input.key]: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg text-sm outline-none transition-colors"
                  style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border-strong)', color: 'var(--color-text)' }}
                  onFocus={(e) => e.target.style.borderColor = 'var(--color-secondary)'}
                  onBlur={(e) => e.target.style.borderColor = 'var(--color-border-strong)'}
                />
              ))}
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg text-sm font-medium transition-colors" style={{ border: '1px solid var(--color-border-strong)', color: 'var(--color-text-secondary)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition-colors" style={{ background: 'var(--color-primary)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}>{editAlumni ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default ManageAlumnis;
