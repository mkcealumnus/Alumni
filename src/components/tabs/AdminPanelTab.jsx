import React, { useState } from 'react';
import { 
  Shield, Users, BookOpen, CheckCircle, XCircle, 
  Settings, RefreshCw, BarChart2, Layers, AlertCircle, Instagram 
} from 'lucide-react';
import { RESOURCES, STUDENT_QUERIES } from '../../data/mockData';

export default function AdminPanelTab({ currentUser }) {
  const [resources, setResources] = useState(RESOURCES);

  const handleApprove = (id) => {
    setResources(resources.map(r => r.id === id ? { ...r, status: 'Approved' } : r));
  };

  const handleReject = (id) => {
    setResources(resources.filter(r => r.id !== id));
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-emerald-600 via-indigo-600 to-purple-700 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-2">
            <Shield className="w-3.5 h-3.5 text-emerald-300" /> Administrative Control & Network Governance
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Admin Control Center</h2>
          <p className="text-emerald-100 text-xs sm:text-sm mt-1 max-w-xl">
            Monitor student engagement, verify alumni resource submissions, and manage Instagram feed synchronization.
          </p>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => alert('Instagram @mkce.alumni feed sync triggered!')}
            className="px-4 py-2.5 rounded-xl bg-white text-emerald-700 font-bold text-xs hover:bg-emerald-50 transition-all shadow-md flex items-center gap-2"
          >
            <RefreshCw className="w-4 h-4 text-emerald-600" />
            <span>Sync Instagram Feed</span>
          </button>
        </div>
      </div>

      {/* Analytics Widgets */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 border border-indigo-100">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">1,450</span>
            <span className="text-xs text-slate-500 font-medium">Registered Students</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-purple-50 text-purple-600 border border-purple-100">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">32</span>
            <span className="text-xs text-slate-500 font-medium">Verified Alumni Mentors</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-cyan-50 text-cyan-600 border border-cyan-100">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">{resources.length}</span>
            <span className="text-xs text-slate-500 font-medium">Published Resources</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="p-3 rounded-xl bg-emerald-50 text-emerald-600 border border-emerald-100">
            <BarChart2 className="w-6 h-6" />
          </div>
          <div>
            <span className="text-2xl font-extrabold text-slate-900 block">94.2%</span>
            <span className="text-xs text-slate-500 font-medium">Query Resolution Rate</span>
          </div>
        </div>
      </div>

      {/* Resource Approval Queue */}
      <div className="space-y-4">
        <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-indigo-600" />
          <span>Resource Verification Queue ({resources.filter(r => r.status !== 'Approved').length} Pending)</span>
        </h3>

        <div className="space-y-3">
          {resources.map((res) => (
            <div key={res.id} className="p-5 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-900">{res.title}</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 font-semibold">{res.category}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded font-bold ${
                    res.status === 'Approved' ? 'bg-emerald-50 text-emerald-700' : 'bg-amber-50 text-amber-700'
                  }`}>
                    {res.status}
                  </span>
                </div>
                <p className="text-xs text-slate-500">Submitted by <strong className="text-slate-700">{res.author}</strong></p>
              </div>

              {res.status !== 'Approved' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleApprove(res.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-sm transition-all flex items-center gap-1"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>Approve</span>
                  </button>
                  <button
                    onClick={() => handleReject(res.id)}
                    className="px-3.5 py-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold transition-all flex items-center gap-1"
                  >
                    <XCircle className="w-3.5 h-3.5" />
                    <span>Reject</span>
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
