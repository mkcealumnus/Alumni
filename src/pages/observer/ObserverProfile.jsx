import React, { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/context/AuthContext';

const ObserverProfile = () => {
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    fullName: user?.fullName || 'Observer Guest',
    email: user?.email || 'observer@sowberry.com',
    username: user?.username || 'observer_sow',
    role: user?.role || 'observer',
    accessLevel: 'Read-Only Quality Inspector',
  });

  return (
    <DashboardLayout pageTitle="Observer Profile" role="observer">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header Banner */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-tr from-teal-500 to-emerald-600 text-white font-bold text-3xl flex items-center justify-center shadow-lg">
            {(formData.fullName || 'O')[0].toUpperCase()}
          </div>
          <div className="text-center md:text-left flex-1">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
                {formData.fullName}
              </h1>
              <span className="px-3 py-1 rounded-full bg-teal-500/10 text-teal-600 font-medium text-xs border border-teal-500/20 capitalize">
                {formData.role}
              </span>
            </div>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              {formData.accessLevel}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              <i className="ri-mail-line mr-1"></i>{formData.email}
            </p>
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm space-y-4">
          <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">
            Guest Access Privileges
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="p-4 rounded-xl bg-sand/30 dark-theme:bg-gray-800/50 border border-sand dark-theme:border-gray-800">
              <p className="text-xs text-gray-400 font-medium">Username</p>
              <p className="font-semibold text-gray-800 dark-theme:text-gray-100 mt-1">{formData.username}</p>
            </div>
            <div className="p-4 rounded-xl bg-sand/30 dark-theme:bg-gray-800/50 border border-sand dark-theme:border-gray-800">
              <p className="text-xs text-gray-400 font-medium">Permissions</p>
              <p className="font-semibold text-teal-600 mt-1">Inspection & Catalog Access Only</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ObserverProfile;
