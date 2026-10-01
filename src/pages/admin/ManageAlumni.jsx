import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, getImageUrl } from '../../utils/api';

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
    Swal.fire({ ...getSwalOpts(), title: 'Delete Alumni?', text: `Remove ${name}? This cannot be undone.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' })
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
        <img src={m.profileImage ? getImageUrl(m.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(m.fullName)}&size=36&background=c96442&color=fff`} className="w-8 h-8 rounded-lg object-cover" alt="" />
        <div>
          <span className="font-medium text-gray-800 dark-theme:text-gray-200">{m.fullName}</span>
          <p className="text-[11px] text-gray-400">@{m.username}</p>
        </div>
      </div>
    ), exportValue: (m) => m.fullName },
    { key: 'username', label: 'Username', sortable: true, visible: false },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false, render: (v) => v || '—' },
    { key: 'isActive', label: 'Status', sortable: true, render: (_, m) => (
      <button onClick={(e) => { e.stopPropagation(); handleToggleStatus(m); }} className={`px-2.5 py-1 rounded-full text-xs font-medium ${m.isActive ? 'bg-green-100 text-green-700 dark-theme:bg-green-900/30 dark-theme:text-green-400' : 'bg-red-100 text-red-700 dark-theme:bg-red-900/30 dark-theme:text-red-400'}`}>
        {m.isActive ? 'Active' : 'Inactive'}
      </button>
    ), exportValue: (m) => m.isActive ? 'Active' : 'Inactive' },
    { key: 'createdAt', label: 'Joined', sortable: true, render: (v) => new Date(v).toLocaleDateString(), exportValue: (m) => new Date(m.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (_, m) => (
      <div className="flex items-center justify-end gap-2">
        <button onClick={(e) => { e.stopPropagation(); openEdit(m); }} className="w-8 h-8 rounded-lg bg-blue-50 dark-theme:bg-blue-900/20 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors" title="Edit"><i className="ri-edit-line text-sm"></i></button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(m.id, m.fullName); }} className="w-8 h-8 rounded-lg bg-red-50 dark-theme:bg-red-900/20 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors" title="Delete"><i className="ri-delete-bin-line text-sm"></i></button>
      </div>
    ) },
  ];

  return (
    <AdminLayout pageTitle="Manage Alumnis">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Manage Alumnis</h1>
          <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">{alumnis.length} total alumnis</p>
        </div>

        <DataTable
          columns={columns}
          data={alumnis}
          loading={loading}
          searchPlaceholder="Search alumnis..."
          storageKey="nextstep_alumnis_cols"
          exportTitle="Alumnis Report"
          exportFileName="NextStep_Alumnis"
          emptyIcon="ri-team-line"
          emptyMessage="No alumnis found"
          headerActions={
            <button onClick={openCreate} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
              <i className="ri-add-line"></i> Add Alumni
            </button>
          }
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{editAlumni ? 'Edit Alumni' : 'Add Alumni'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-sand dark-theme:hover:bg-gray-800 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="text" placeholder="Username" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="text" placeholder="Full Name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="password" placeholder={editAlumni ? 'New Password (leave blank to keep)' : 'Password'} required={!editAlumni} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand dark-theme:border-gray-700 text-sm font-medium text-gray-600 dark-theme:text-gray-400 hover:bg-cream dark-theme:hover:bg-gray-800">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">{editAlumni ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default ManageAlumnis;
