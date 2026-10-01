import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import DataTable from '@/components/ui/DataTable';
import Loader from '@/components/ui/Loader';
import { adminApi } from '../../utils/api';
import Swal, { getSwalOpts } from '../../utils/swal';

const SystemReports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newLog, setNewLog] = useState({
    action: 'System Maintenance',
    description: '',
    fullName: '',
  });

  const fetchReports = async () => {
    try {
      const res = await adminApi.getReports();
      if (res?.success) {
        const { success, message, ...data } = res;
        setReports(data);
      }
    } catch (err) {
      console.error('Failed to fetch system reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const handleCreateLog = (e) => {
    e.preventDefault();
    if (!newLog.description.trim()) {
      Swal.fire({
        ...getSwalOpts(),
        title: 'Validation Error',
        text: 'Please enter a description for the log entry.',
        icon: 'warning',
      });
      return;
    }

    const createdEntry = {
      id: Date.now(),
      fullName: newLog.fullName || 'System Admin',
      action: newLog.action,
      description: newLog.description,
      createdAt: new Date().toISOString(),
    };

    setReports((prev) => ({
      ...prev,
      activityLogs: [createdEntry, ...(prev?.activityLogs || [])],
    }));

    setShowLogModal(false);
    setNewLog({ action: 'System Maintenance', description: '', fullName: '' });

    Swal.fire({
      ...getSwalOpts(),
      title: 'Event Logged',
      text: 'System activity event recorded in audit log.',
      icon: 'success',
    });
  };

  if (loading) {
    return (
      <AdminLayout pageTitle="System Reports">
        <Loader fullPage text="Loading system reports..." />
      </AdminLayout>
    );
  }

  const logs = reports?.activityLogs || [];

  const columns = [
    {
      key: 'fullName',
      label: 'User / Admin',
      sortable: true,
      render: (_, log) => (
        <span className="font-medium text-gray-700 dark-theme:text-gray-300">
          {log.fullName || log.userId || 'System'}
        </span>
      ),
      exportValue: (log) => log.fullName || log.userId || 'System',
    },
    {
      key: 'action',
      label: 'Action',
      sortable: true,
      render: (v) => (
        <span className="px-2.5 py-1 rounded-md bg-primary/10 text-primary text-xs font-semibold">
          {v}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      sortable: false,
      render: (v) => (
        <span className="text-gray-500 dark-theme:text-gray-400">{v || 'N/A'}</span>
      ),
    },
    {
      key: 'createdAt',
      label: 'Timestamp',
      sortable: true,
      render: (v) => (v ? new Date(v).toLocaleString() : 'N/A'),
      exportValue: (log) => (log.createdAt ? new Date(log.createdAt).toLocaleString() : 'N/A'),
    },
  ];

  return (
    <AdminLayout pageTitle="System Reports">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              System Audit & Activity Reports
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Platform usage metrics, user registrations, and system event activity logs.
            </p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-4 py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-primary/20"
          >
            <i className="ri-file-add-line text-lg"></i>
            Log System Event
          </button>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <i className="ri-user-line text-primary text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Users</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {reports?.totalUsers || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <i className="ri-check-double-line text-green-500 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Submissions</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {reports?.totalSubmissions || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <i className="ri-book-open-line text-blue-500 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Enrollments</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {reports?.totalEnrollments || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <i className="ri-mail-line text-amber-500 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Contact Messages</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {reports?.totalContactMessages || 0}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs DataTable */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-4 text-lg">
            Recent System Activity Logs
          </h3>
          <DataTable
            columns={columns}
            data={logs}
            loading={false}
            searchPlaceholder="Search logs..."
            storageKey="nextstep_activity_logs_cols"
            exportTitle="Activity Logs Report"
            exportFileName="NextStep_Activity_Logs"
            emptyIcon="ri-file-list-3-line"
            emptyMessage="No activity logs recorded yet"
          />
        </div>
      </div>

      {/* Log System Event Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl max-w-lg w-full p-6 border border-sand dark-theme:border-gray-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand dark-theme:border-gray-800 pb-3">
              <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100 flex items-center gap-2">
                <i className="ri-shield-flash-line text-primary"></i> Log System Activity Event
              </h3>
              <button
                onClick={() => setShowLogModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl"
              >
                <i className="ri-close-line"></i>
              </button>
            </div>

            <form onSubmit={handleCreateLog} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Action Category
                </label>
                <select
                  value={newLog.action}
                  onChange={(e) => setNewLog({ ...newLog, action: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                >
                  <option value="System Maintenance">System Maintenance</option>
                  <option value="Security Audit">Security Audit</option>
                  <option value="User Permission Grant">User Permission Grant</option>
                  <option value="Database Backup">Database Backup</option>
                  <option value="Platform Policy Update">Platform Policy Update</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Administrator Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jayanthan (Admin)"
                  value={newLog.fullName}
                  onChange={(e) => setNewLog({ ...newLog, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Event Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter detailed audit event logs..."
                  value={newLog.description}
                  onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-primary/30"
                />
              </div>

              <div className="pt-2 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowLogModal(false)}
                  className="px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 text-gray-600 dark-theme:text-gray-300 text-sm font-medium hover:bg-sand/30"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-primary hover:bg-primary-dark text-white text-sm font-semibold shadow-md shadow-primary/20"
                >
                  Record System Log
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default SystemReports;
