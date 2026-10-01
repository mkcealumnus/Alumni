import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, getImageUrl } from '../../utils/api';

const ManageStudents = () => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [form, setForm] = useState({ email: '', username: '', fullName: '', phone: '', password: '' });

  const fetchStudents = async () => {
    setLoading(true);
    const res = await adminApi.getStudents('');
    if (res.success) setStudents(res.students || []);
    setLoading(false);
  };

  useEffect(() => { fetchStudents(); }, []);

  const openCreate = () => { setEditStudent(null); setForm({ email: '', username: '', fullName: '', phone: '', password: '' }); setShowModal(true); };
  const openEdit = (s) => { setEditStudent(s); setForm({ email: s.email, username: s.username, fullName: s.fullName, phone: s.phone || '', password: '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editStudent) {
      const body = { ...form }; if (!body.password) delete body.password;
      const res = await adminApi.updateStudent(editStudent.id, body);
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Updated!', timer: 1500, showConfirmButton: false }); setShowModal(false); fetchStudents(); }
      else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    } else {
      const res = await adminApi.createStudent({ ...form, role: 'student' });
      if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Student Created!', timer: 1500, showConfirmButton: false }); setShowModal(false); fetchStudents(); }
      else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    }
  };

  const handleDelete = (id, name) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Student?', text: `Remove ${name}? This cannot be undone.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' })
      .then(async (r) => { if (r.isConfirmed) { const res = await adminApi.deleteStudent(id); if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false }); fetchStudents(); } } });
  };

  const handleToggleStatus = async (s) => {
    const res = await adminApi.updateStudent(s.id, { isActive: !s.isActive });
    if (res.success) fetchStudents();
  };

  const columns = [
    { key: 'id', label: 'ID', sortable: true, visible: true },
    { key: 'fullName', label: 'Name', sortable: true, render: (_, s) => (
      <div className="flex items-center gap-2.5">
        <img src={s.profileImage ? getImageUrl(s.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(s.fullName)}&size=36&background=c96442&color=fff`} className="w-8 h-8 rounded-lg object-cover" alt="" />
        <span className="font-medium text-gray-800 dark-theme:text-gray-200">{s.fullName}</span>
      </div>
    ), exportValue: (s) => s.fullName },
    { key: 'username', label: 'Username', sortable: true, visible: false, render: (v) => <span className="text-gray-500">@{v}</span> },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false, render: (v) => v || '—' },
    { key: 'college', label: 'College', sortable: true, render: (v) => <span className="max-w-[180px] truncate block" title={v || ''}>{v || '—'}</span>, exportValue: (s) => s.college || '—' },
    { key: 'department', label: 'Department', sortable: true, render: (v) => v || '—' },
    { key: 'year', label: 'Year', sortable: true, visible: false, render: (v) => v || '—' },
    { key: 'rollNumber', label: 'Roll No', sortable: true, render: (v) => v || '—' },
    { key: 'gender', label: 'Gender', sortable: true, visible: false, render: (v) => v || '—' },
    { key: 'dateOfBirth', label: 'DOB', sortable: true, visible: false, render: (v) => v ? new Date(v).toLocaleDateString() : '—', exportValue: (s) => s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString() : '—' },
    { key: 'enrolledCourses', label: 'Courses', sortable: true, visible: false, render: (v) => <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700 dark-theme:bg-blue-900/30 dark-theme:text-blue-400">{v || 0}</span> },
    { key: 'isVerified', label: 'Verified', sortable: true, visible: false, render: (v) => <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${v ? 'bg-green-100 text-green-700 dark-theme:bg-green-900/30 dark-theme:text-green-400' : 'bg-amber-100 text-amber-700 dark-theme:bg-amber-900/30 dark-theme:text-amber-400'}`}>{v ? 'Yes' : 'No'}</span>, exportValue: (s) => s.isVerified ? 'Yes' : 'No' },
    { key: 'isActive', label: 'Status', sortable: true, render: (_, s) => (
      <button onClick={(e) => { e.stopPropagation(); handleToggleStatus(s); }} className={`px-2.5 py-1 rounded-full text-xs font-medium ${s.isActive ? 'bg-green-100 text-green-700 dark-theme:bg-green-900/30 dark-theme:text-green-400' : 'bg-red-100 text-red-700 dark-theme:bg-red-900/30 dark-theme:text-red-400'}`}>
        {s.isActive ? 'Active' : 'Inactive'}
      </button>
    ), exportValue: (s) => s.isActive ? 'Active' : 'Inactive' },
    { key: 'createdAt', label: 'Joined', sortable: true, render: (v) => new Date(v).toLocaleDateString(), exportValue: (s) => new Date(s.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (_, s) => (
      <div className="flex items-center justify-end gap-2">
        <button onClick={(e) => { e.stopPropagation(); openEdit(s); }} className="w-8 h-8 rounded-lg bg-blue-50 dark-theme:bg-blue-900/20 text-blue-500 flex items-center justify-center hover:bg-blue-100 transition-colors" title="Edit"><i className="ri-edit-line text-sm"></i></button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(s.id, s.fullName); }} className="w-8 h-8 rounded-lg bg-red-50 dark-theme:bg-red-900/20 text-red-500 flex items-center justify-center hover:bg-red-100 transition-colors" title="Delete"><i className="ri-delete-bin-line text-sm"></i></button>
      </div>
    ) },
  ];

  return (
    <AdminLayout pageTitle="Manage Students">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Manage Students</h1>
          <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">{students.length} total students</p>
        </div>

        <DataTable
          columns={columns}
          data={students}
          loading={loading}
          searchPlaceholder="Search students..."
          storageKey="nextstep_students_cols"
          exportTitle="Students Report"
          exportFileName="NextStep_Students"
          emptyIcon="ri-user-line"
          emptyMessage="No students found"
          headerActions={
            <button onClick={openCreate} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors flex items-center gap-2">
              <i className="ri-add-line"></i> Add Student
            </button>
          }
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-md mx-4 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{editStudent ? 'Edit Student' : 'Add Student'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 dark-theme:hover:bg-gray-800 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="email" placeholder="Email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="text" placeholder="Username" required value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="text" placeholder="Full Name" required value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="tel" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <input type="password" placeholder={editStudent ? 'New Password (leave blank to keep)' : 'Password'} required={!editStudent} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand dark-theme:border-gray-700 text-sm font-medium text-gray-600 dark-theme:text-gray-400 hover:bg-gray-50 dark-theme:hover:bg-gray-800">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">{editStudent ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default ManageStudents;
