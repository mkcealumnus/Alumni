
import React from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';

const StudentJobPortal = ({ role }) => {
  const Layout = role === 'admin' ? AdminLayout : DashboardLayout;
  return (
    <Layout pageTitle="Job Portal" role={role}>
      <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 lg:p-8 border border-sand dark-theme:border-gray-800 shadow-sm">
        <h2 className="text-xl font-bold text-gray-800 dark-theme:text-white mb-4">Job Portal</h2>
        <p className="text-gray-500 dark-theme:text-gray-400">
          This feature is currently under active development. Check back soon for updates!
        </p>
      </div>
    </Layout>
  );
};

export default StudentJobPortal;
