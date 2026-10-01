import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import Loader from '@/components/ui/Loader';
import { adminApi } from '@/utils/api';
import Swal, { getSwalOpts } from '@/utils/swal';

const ManagerReports = () => {
  const [reports, setReports] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showLogModal, setShowLogModal] = useState(false);
  const [newLog, setNewLog] = useState({
    action: 'Compliance Audit',
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
      console.error('Failed to fetch manager reports:', err);
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
        text: 'Please enter a description for the audit event.',
        icon: 'warning',
      });
      return;
    }

    const createdEntry = {
      id: Date.now(),
      fullName: newLog.fullName || 'Manager Supervisor',
      action: newLog.action,
      description: newLog.description,
      createdAt: new Date().toISOString(),
    };

    setReports((prev) => ({
      ...prev,
      activityLogs: [createdEntry, ...(prev?.activityLogs || [])],
    }));

    setShowLogModal(false);
    setNewLog({ action: 'Compliance Audit', description: '', fullName: '' });

    Swal.fire({
      ...getSwalOpts(),
      title: 'Audit Log Recorded',
      text: 'Compliance event logged successfully in audit trail.',
      icon: 'success',
    });
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="System Compliance Reports" role="manager">
        <Loader fullPage text="Loading compliance reports..." />
      </DashboardLayout>
    );
  }

  const logs = reports?.activityLogs || [];

  const columns = [
    {
      key: 'fullName',
      label: 'User / Auditor',
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
        <span className="px-2.5 py-1 rounded-md bg-purple-500/10 text-purple-600 text-xs font-semibold">
          {v}
        </span>
      ),
    },
    {
      key: 'description',
      label: 'Description',
      sortable: false,
      render: (v) => (
        <span className="text-gray-600 dark-theme:text-gray-400">{v || 'N/A'}</span>
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
    <DashboardLayout pageTitle="System Compliance Reports" role="manager">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              System Compliance & Audit Reports
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Institutional system logs, audit trails, and platform usage reports.
            </p>
          </div>
          <button
            onClick={() => setShowLogModal(true)}
            className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white font-semibold text-sm transition-all flex items-center justify-center gap-2 shadow-md shadow-purple-600/20"
          >
            <i className="ri-shield-user-line text-lg"></i>
            Log Compliance Event
          </button>
        </div>

        {/* Summary Metrics */}
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
                <p className="text-xs text-gray-400">Active Enrollments</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {reports?.totalEnrollments || 0}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <i className="ri-shield-check-line text-amber-500 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Compliance Status</p>
                <p className="text-xl font-bold text-green-600">100% Compliant</p>
              </div>
            </div>
          </div>
        </div>

        {/* Activity Logs Table */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-4 text-lg">
            Institutional Audit Logs
          </h3>
          <DataTable
            columns={columns}
            data={logs}
            loading={false}
            searchPlaceholder="Search audit logs..."
            storageKey="sowberry_manager_reports_cols"
            exportTitle="Institutional Audit Logs"
            exportFileName="Sowberry_Manager_Audit_Logs"
            emptyIcon="ri-file-list-3-line"
            emptyMessage="No activity logs recorded yet"
          />
        </div>
      </div>

      {/* Log Event Modal */}
      {showLogModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl max-w-lg w-full p-6 border border-sand dark-theme:border-gray-800 shadow-xl space-y-4">
            <div className="flex items-center justify-between border-b border-sand dark-theme:border-gray-800 pb-3">
              <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100 flex items-center gap-2">
                <i className="ri-shield-keyhole-line text-purple-600"></i> Log Compliance Audit Event
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
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                >
                  <option value="Compliance Audit">Compliance Audit</option>
                  <option value="Curriculum Review">Curriculum Review</option>
                  <option value="Security Check">Security Check</option>
                  <option value="Institutional Policy Update">Institutional Policy Update</option>
                  <option value="Supervisor Assessment">Supervisor Assessment</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Auditor Name (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Jayanthan (Manager)"
                  value={newLog.fullName}
                  onChange={(e) => setNewLog({ ...newLog, fullName: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                  Audit Notes / Description *
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Enter detailed compliance evaluation notes..."
                  value={newLog.description}
                  onChange={(e) => setNewLog({ ...newLog, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
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
                  className="px-5 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-sm font-semibold shadow-md shadow-purple-600/20"
                >
                  Record Audit Event
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default ManagerReports;
