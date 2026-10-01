import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import Swal, { getSwalOpts } from '../../utils/swal';
import { adminApi, getImageUrl } from '../../utils/api';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

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
    Swal.fire({ ...getSwalOpts(), title: 'Delete Student?', text: `Remove ${name}? This cannot be undone.`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#B91C1C', confirmButtonText: 'Delete' })
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
        <img src={s.profileImage ? getImageUrl(s.profileImage) : `https://ui-avatars.com/api/?name=${encodeURIComponent(s.fullName)}&size=36&background=12355B&color=fff`} className="w-8 h-8 rounded-lg object-cover" alt="" />
        <span className="font-medium" style={{ color: 'var(--color-text)' }}>{s.fullName}</span>
      </div>
    ), exportValue: (s) => s.fullName },
    { key: 'username', label: 'Username', sortable: true, visible: false, render: (v) => <span style={{ color: 'var(--color-text-muted)' }}>@{v}</span> },
    { key: 'email', label: 'Email', sortable: true },
    { key: 'phone', label: 'Phone', sortable: false, render: (v) => v || '—' },
    { key: 'college', label: 'College', sortable: true, render: (v) => <span className="max-w-[180px] truncate block" title={v || ''}>{v || '—'}</span>, exportValue: (s) => s.college || '—' },
    { key: 'department', label: 'Department', sortable: true, render: (v) => v || '—' },
    { key: 'year', label: 'Year', sortable: true, visible: false, render: (v) => v || '—' },
    { key: 'rollNumber', label: 'Roll No', sortable: true, render: (v) => v || '—' },
    { key: 'gender', label: 'Gender', sortable: true, visible: false, render: (v) => v || '—' },
    { key: 'dateOfBirth', label: 'DOB', sortable: true, visible: false, render: (v) => v ? new Date(v).toLocaleDateString() : '—', exportValue: (s) => s.dateOfBirth ? new Date(s.dateOfBirth).toLocaleDateString() : '—' },
    { key: 'enrolledCourses', label: 'Courses', sortable: true, visible: false, render: (v) => <span className="px-2 py-0.5 rounded-md text-xs font-medium" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }}>{v || 0}</span> },
    { key: 'isVerified', label: 'Verified', sortable: true, visible: false, render: (v) => <span className={`px-2 py-0.5 rounded-md text-xs font-medium`} style={{ background: v ? 'var(--color-success-bg)' : 'var(--color-warning-bg)', color: v ? 'var(--color-success)' : 'var(--color-warning)' }}>{v ? 'Yes' : 'No'}</span>, exportValue: (s) => s.isVerified ? 'Yes' : 'No' },
    { key: 'isActive', label: 'Status', sortable: true, render: (_, s) => (
      <button onClick={(e) => { e.stopPropagation(); handleToggleStatus(s); }} className="px-2.5 py-1 rounded-md text-xs font-medium" style={{ background: s.isActive ? 'var(--color-success-bg)' : 'var(--color-danger-bg)', color: s.isActive ? 'var(--color-success)' : 'var(--color-danger)' }}>
        {s.isActive ? 'Active' : 'Inactive'}
      </button>
    ), exportValue: (s) => s.isActive ? 'Active' : 'Inactive' },
    { key: 'createdAt', label: 'Joined', sortable: true, render: (v) => new Date(v).toLocaleDateString(), exportValue: (s) => new Date(s.createdAt).toLocaleDateString() },
    { key: 'actions', label: 'Actions', render: (_, s) => (
      <div className="flex items-center justify-end gap-2">
        <button onClick={(e) => { e.stopPropagation(); openEdit(s); }} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--color-info-bg)', color: 'var(--color-info)' }} title="Edit"><Pencil size={14} /></button>
        <button onClick={(e) => { e.stopPropagation(); handleDelete(s.id, s.fullName); }} className="w-8 h-8 rounded-lg flex items-center justify-center transition-colors" style={{ background: 'var(--color-danger-bg)', color: 'var(--color-danger)' }} title="Delete"><Trash2 size={14} /></button>
      </div>
    ) },
  ];

  return (
    <AdminLayout pageTitle="Manage Students">
      <div className="space-y-5">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: 'var(--color-text)' }}>Manage Students</h1>
          <p className="text-[14px] mt-1" style={{ color: 'var(--color-text-muted)' }}>{students.length} total students</p>
        </div>

        <DataTable
          columns={columns}
          data={students}
          loading={loading}
          searchPlaceholder="Search students..."
          storageKey="nextstep_students_cols"
          exportTitle="Students Report"
          exportFileName="MKCE_Students"
          emptyMessage="No students found"
          headerActions={
            <button
              onClick={openCreate}
              className="px-4 py-2 rounded-lg text-white text-sm font-medium flex items-center gap-2 transition-colors"
              style={{ background: 'var(--color-primary)' }}
              onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
            >
              <Plus size={16} /> Add Student
            </button>
          }
        />
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 animate-fade-in">
          <div className="w-full max-w-md mx-4 p-6 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)', boxShadow: 'var(--shadow-lg)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-[16px] font-semibold" style={{ color: 'var(--color-text)' }}>{editStudent ? 'Edit Student' : 'Add Student'}</h3>
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
                { type: 'password', placeholder: editStudent ? 'New Password (leave blank to keep)' : 'Password', required: !editStudent, key: 'password' },
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
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-sm font-medium text-white transition-colors" style={{ background: 'var(--color-primary)' }} onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'} onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}>{editStudent ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default ManageStudents;
