import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '@/utils/swal';
import { mentorApi } from '@/utils/api';

const ManagerCohortProgress = () => {
  const [loading, setLoading] = useState(true);
  const [progressList, setProgressList] = useState([
    { id: 1, fullName: 'Vishalini', email: 'vishalini@sowberry.com', completionPercentage: 85, status: 'On Track', note: 'Exceeding weekly milestones.' },
    { id: 2, fullName: 'Jana Sruthi', email: 'janasruthi@sowberry.com', completionPercentage: 92, status: 'Top Performer', note: 'Completed all core modules.' },
    { id: 3, fullName: 'Jayanthan', email: 'jayanthan@sowberry.com', completionPercentage: 78, status: 'On Track', note: 'Active in coding practice.' },
  ]);
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    completionPercentage: 80,
    status: 'On Track',
    note: '',
  });

  const fetchProgress = async () => {
    try {
      const res = await mentorApi.getStudentsProgress();
      if (res?.success && res.data) {
        const fetched = res.data.progress || res.data.students || [];
        if (fetched.length > 0) {
          setProgressList(
            fetched.map((s, idx) => ({
              id: s.id || idx + 1,
              fullName: s.fullName || s.studentName || 'Student Learner',
              email: s.email || 'student@sowberry.com',
              completionPercentage: s.completionPercentage || 80,
              status: s.completionPercentage > 85 ? 'Top Performer' : 'On Track',
              note: s.note || 'Supervised cohort member',
            }))
          );
        }
      }
    } catch (err) {
      console.error('Fetch progress error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProgress();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingItem(null);
    setFormData({
      fullName: '',
      email: '',
      completionPercentage: 80,
      status: 'On Track',
      note: '',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (item) => {
    setEditingItem(item);
    setFormData({
      fullName: item.fullName || '',
      email: item.email || '',
      completionPercentage: item.completionPercentage || 80,
      status: item.status || 'On Track',
      note: item.note || '',
    });
    setShowModal(true);
  };

  const handleDeleteProgress = (item) => {
    Swal.fire({
      ...getSwalOpts(),
      title: 'Remove Record?',
      text: `Remove supervision progress record for "${item.fullName}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Remove',
      confirmButtonColor: '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        setProgressList(progressList.filter((p) => p.id !== item.id));
        Swal.fire({ ...getSwalOpts(), title: 'Removed!', text: 'Supervision record removed.', icon: 'success' });
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName.trim()) {
      Swal.fire({ ...getSwalOpts(), title: 'Required', text: 'Student name is required.', icon: 'warning' });
      return;
    }

    if (editingItem) {
      setProgressList(progressList.map((p) => (p.id === editingItem.id ? { ...p, ...formData } : p)));
      Swal.fire({ ...getSwalOpts(), title: 'Updated!', text: 'Supervision note updated.', icon: 'success' });
    } else {
      const newRecord = { id: Date.now(), ...formData };
      setProgressList([newRecord, ...progressList]);
      Swal.fire({ ...getSwalOpts(), title: 'Added!', text: 'Supervision record added.', icon: 'success' });
    }
    setShowModal(false);
  };

  if (loading) return <Loader fullPage text="Loading Cohort Progress..." />;

  const columns = [
    {
      key: 'fullName',
      label: 'Student Name',
      sortable: true,
      render: (_, item) => (
        <div>
          <p className="font-semibold text-gray-800 dark-theme:text-gray-100">{item.fullName}</p>
          <p className="text-xs text-gray-400">{item.email}</p>
        </div>
      ),
    },
    {
      key: 'completionPercentage',
      label: 'Course Progress',
      sortable: true,
      render: (v) => (
        <div className="flex items-center gap-2">
          <div className="w-32 bg-sand/40 dark-theme:bg-gray-800 h-2 rounded-full overflow-hidden">
            <div className="bg-emerald-600 h-full rounded-full" style={{ width: `${v || 0}%` }}></div>
          </div>
          <span className="font-semibold text-xs text-gray-700 dark-theme:text-gray-300">{v || 0}%</span>
        </div>
      ),
    },
    {
      key: 'status',
      label: 'Supervision Status',
      sortable: true,
      render: (v) => (
        <span className="px-2.5 py-1 rounded-md bg-emerald-500/10 text-emerald-600 text-xs font-semibold">
          {v}
        </span>
      ),
    },
    {
      key: 'note',
      label: 'Manager Note',
      sortable: false,
      render: (v) => <span className="text-xs text-gray-500 line-clamp-1">{v || 'N/A'}</span>,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, item) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEditModal(item)}
            className="px-3 py-1.5 rounded-lg bg-emerald-600 text-white text-xs font-medium hover:bg-emerald-700 transition-colors flex items-center gap-1"
          >
            <i className="ri-edit-line"></i> Edit
          </button>
          <button
            onClick={() => handleDeleteProgress(item)}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <i className="ri-delete-bin-line"></i> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout pageTitle="Cohort Progress Reports" role="manager">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Student Cohort Supervision
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Monitor individual student course completion percentage and add managerial intervention notes.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            <i className="ri-add-line text-lg"></i> Add Supervision Note
          </button>
        </div>

        {/* Progress Table */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-4 text-lg">
            Cohort Members Performance & Notes
          </h3>
          <DataTable
            columns={columns}
            data={progressList}
            loading={false}
            searchPlaceholder="Search student or email..."
            storageKey="sowberry_manager_cohort_cols"
            exportTitle="Cohort Performance Report"
            exportFileName="Sowberry_Cohort_Progress"
            emptyIcon="ri-user-unfollow-line"
            emptyMessage="No cohort progress records found"
          />
        </div>

        {/* Create / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-lg border border-sand dark-theme:border-gray-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-sand dark-theme:border-gray-800">
                <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100">
                  {editingItem ? 'Edit Supervision Note' : 'Add Supervision Record'}
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-200"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Student Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="e.g. Vishalini"
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="student@sowberry.com"
                      className="w-full px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Status
                    </label>
                    <select
                      value={formData.status}
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    >
                      <option value="On Track">On Track</option>
                      <option value="Top Performer">Top Performer</option>
                      <option value="Needs Attention">Needs Attention</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Manager Supervision Note
                  </label>
                  <textarea
                    rows={3}
                    value={formData.note}
                    onChange={(e) => setFormData({ ...formData, note: e.target.value })}
                    placeholder="Add managerial observations or recommended actions..."
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
                  />
                </div>

                <div className="pt-3 border-t border-sand dark-theme:border-gray-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 rounded-xl bg-gray-100 dark-theme:bg-gray-800 text-gray-600 dark-theme:text-gray-300 font-medium text-xs hover:bg-gray-200"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs shadow-md"
                  >
                    {editingItem ? 'Save Note' : 'Add Record'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default ManagerCohortProgress;
