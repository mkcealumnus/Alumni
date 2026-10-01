import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, getImageUrl } from '../../utils/api';

const ManageMentors = () => {
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editMentor, setEditMentor] = useState(null);
  const [form, setForm] = useState({ email: '', username: '', fullName: '', phone: '', password: '' });

  const fetchMentors = async () => {
    setLoading(true);
    const res = await adminApi.getMentors('');
    if (res.success) setMentors(res.mentors || []);
    setLoading(false);
  };

  useEffect(() => { fetchMentors(); }, []);

  const openCreate = () => { setEditMentor(null); setForm({ email: '', username: '', fullName: '', phone: '', password: '' }); setShowModal(true); };
  const openEdit = (m) => { setEditMentor(m); setForm({ email: m.email, username: m.username, fullName: m.fullName, phone: m.phone || '', password: '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editMentor) {
      const body = { ...form }; if (!body.password) delete body.password;
      const res = await adminApi.updateMentor(editMentor.id, body);
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Updated!', timer: 1500, showConfirmButton: false }); setShowModal(false); fetchMentors(); }
      else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    } else {
      const res = await adminApi.createMentor({ ...form, role: 'mentor' });
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Mentor Created!', timer: 1500, showConfirmButton: false }); setShowModal(false); fetchMentors(); }
      else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const handleDelete = (id, name) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Mentor?', text: `Remove ${name}? This cannot be undone.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' })
      .then(async (r) => { if (r.isConfirmed) { const res = await adminApi.deleteMentor(id); if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false }); fetchMentors(); } } });
  };

  const handleToggleStatus = async (m) => {
    const res = await adminApi.updateMentor(m.id, { isActive: !m.isActive });
    if (res.success) fetchMentors();
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
    <AdminLayout pageTitle="Manage Mentors">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Manage Mentors</h1>
          <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">{mentors.length} total mentors</p>
        </div>

        <DataTable
          columns={columns}
          data={mentors}
          loading={loading}
          searchPlaceholder="Search mentors..."
          storageKey="sowberry_mentors_cols"
          exportTitle="Mentors Report"
          exportFileName="Sowberry_Mentors"
          emptyIcon="ri-team-line"
          emptyMessage="No mentors found"
          headerActions={
            <button onClick={openCreate} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
              <i className="ri-add-line"></i> Add Mentor
            </button>
          }
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{editMentor ? 'Edit Mentor' : 'Add Mentor'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 dark-theme:hover:bg-gray-800 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="text" placeholder="Username" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="text" placeholder="Full Name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="password" placeholder={editMentor ? 'New Password (leave blank to keep)' : 'Password'} required={!editMentor} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand dark-theme:border-gray-700 text-sm font-medium text-gray-600 dark-theme:text-gray-400 hover:bg-gray-50 dark-theme:hover:bg-gray-800">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">{editMentor ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default ManageMentors;
