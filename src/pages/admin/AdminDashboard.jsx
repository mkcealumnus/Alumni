import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { adminApi, getImageUrl } from '../../utils/api';
import Swal, { getSwalOpts } from '../../utils/swal';
import { useAuth } from '../../context/AuthContext';
import {
  Users, GraduationCap, TrendingUp, ShieldCheck,
  UserPlus, Flag, Star, AlertTriangle, Download, Image
} from 'lucide-react';



const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalStudents: 0, totalAlumnis: 0, totalCourses: 0, totalEnrollments: 0, avgCompletion: 0, activeStudents: 0, recentActivities: [], pendingVerifications: 0 });
  const [uploadInfo, setUploadInfo] = useState({ count: 0, totalSize: 0, files: [] });
  const [downloadingUploads, setDownloadingUploads] = useState(false);
  
  const studentsChartRef = useRef(null);
  const alumniChartRef = useRef(null);
  const completionChartRef = useRef(null);

  useEffect(() => {
    const fetchDashboard = async () => {
      const res = await adminApi.getDashboard();
      if (res.success) {
        setStats(res.stats || {});
      }
    };
    fetchDashboard();

    const fetchUploads = async () => {
      const res = await adminApi.listUploads();
      if (res.success) setUploadInfo({ count: res.count || 0, totalSize: res.totalSize || 0, files: res.files || [] });
    };
    fetchUploads();

    // Chart data
    const monthlyData = {
      students: [1847, 2100, 2320, 2500, 2700, 2847],
      completion: [65, 68, 72, 75, 77, 78],
      enrollments: [8500, 9600, 10400, 11200, 12000, 12583]
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#FFFFFF',
          titleColor: '#0F172A',
          bodyColor: '#475569',
          borderColor: '#E2E8F0',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8,
          titleFont: { family: 'Inter' },
          bodyFont: { family: 'Inter' },
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: { color: '#F1F5F9' },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#64748B' }
        },
        x: {
          grid: { display: false },
          ticks: { font: { family: 'Inter', size: 11 }, color: '#64748B' }
        }
      }
    };

    const createChart = (canvasRef, data, color) => {
      if (canvasRef && window.Chart) {
        const ctx = canvasRef.getContext('2d');
        return new window.Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [{
              data: data,
              borderColor: color,
              backgroundColor: color + '15',
              tension: 0.4,
              fill: true,
              pointRadius: 3,
              pointBackgroundColor: color,
              borderWidth: 2,
            }]
          },
          options: chartOptions
        });
      }
    };

    let charts = [];
    if (studentsChartRef.current) {
      charts.push(createChart(studentsChartRef.current, monthlyData.students, '#2563EB'));
    }
    if (completionChartRef.current) {
      charts.push(createChart(completionChartRef.current, monthlyData.completion, '#15803D'));
    }
    if (alumniChartRef.current) {
      charts.push(createChart(alumniChartRef.current, monthlyData.students, '#12355B'));
    }

    return () => {
      charts.forEach(chart => {
        if (chart) chart.destroy();
      });
    };
  }, []);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const handleDownloadUploads = async () => {
    setDownloadingUploads(true);
    try {
      const token = localStorage.getItem('nextstep_token');
      const res = await fetch(adminApi.downloadUploads(), {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (!res.ok) throw new Error('Download failed');
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'profile-photos.zip';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    } catch (err) {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Download Failed', text: err.message});
    } finally {
      setDownloadingUploads(false);
    }
  };

  const firstName = user?.fullName?.split(' ')[0] || 'Admin';

  const statCards = [
    { label: 'Total Students', value: stats.totalStudents?.toLocaleString() || '0', icon: Users, color: '#2563EB', bg: '#E0F2FE' },
    { label: 'Total Alumni', value: stats.totalAlumnis || '0', icon: GraduationCap, color: '#12355B', bg: '#E8F1FB' },
    { label: 'Completion Rate', value: `${stats.avgCompletion || 0}%`, icon: TrendingUp, color: '#15803D', bg: '#DCFCE7' },
    { label: 'Pending Requests', value: stats.pendingVerifications || '0', icon: ShieldCheck, color: '#B45309', bg: '#FEF3C7' },
  ];

  return (
    <AdminLayout>
      {/* Welcome */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-1" style={{ color: 'var(--color-text)' }}>
          Good morning, {firstName}
        </h1>
        <p className="text-[14px]" style={{ color: 'var(--color-text-secondary)' }}>
          Here is what is happening with your alumni network today.
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {statCards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="p-5 rounded-xl"
              style={{
                background: 'var(--color-surface)',
                border: '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between mb-3">
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={{ background: card.bg }}
                >
                  <Icon size={18} style={{ color: card.color }} />
                </div>
              </div>
              <p className="text-2xl font-bold mb-0.5" style={{ color: 'var(--color-text)' }}>
                {card.value}
              </p>
              <p className="text-[13px]" style={{ color: 'var(--color-text-muted)' }}>
                {card.label}
              </p>
            </div>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold" style={{ color: 'var(--color-text)' }}>Student Enrollment</h3>
          </div>
          <div className="h-40">
            <canvas ref={studentsChartRef}></canvas>
          </div>
        </div>
        <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold" style={{ color: 'var(--color-text)' }}>Alumni Performance</h3>
          </div>
          <div className="h-40">
            <canvas ref={alumniChartRef}></canvas>
          </div>
        </div>
        <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-semibold" style={{ color: 'var(--color-text)' }}>Completion Rate</h3>
          </div>
          <div className="h-40">
            <canvas ref={completionChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h3 className="text-[16px] font-semibold mb-4" style={{ color: 'var(--color-text)' }}>Recent Activities</h3>
          <div className="space-y-3">
            {[
              { icon: UserPlus, text: 'New Alumni Application: John Smith', time: '30 minutes ago', color: '#2563EB', bg: '#E0F2FE' },
              { icon: Flag, text: 'Student Report: Technical Issue', time: '1 hour ago', color: '#B45309', bg: '#FEF3C7' },
              { icon: Star, text: 'Alumni Rating Update: Sarah Johnson', time: '2 hours ago', color: '#15803D', bg: '#DCFCE7' },
            ].map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                  onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-surface-muted)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                >
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: item.bg }}>
                    <Icon size={16} style={{ color: item.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-medium truncate" style={{ color: 'var(--color-text)' }}>{item.text}</p>
                    <span className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>{item.time}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
          <h3 className="text-[16px] font-semibold mb-4" style={{ color: 'var(--color-text)' }}>System Alerts</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--color-danger-bg)', border: '1px solid #FECACA' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'white' }}>
                <AlertTriangle size={16} style={{ color: 'var(--color-danger)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium" style={{ color: 'var(--color-text)' }}>3 Pending Alumni Applications</p>
                <span className="text-[12px]" style={{ color: 'var(--color-danger)' }}>Requires Review</span>
              </div>
            </div>
            <div className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'var(--color-warning-bg)', border: '1px solid #FDE68A' }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'white' }}>
                <ShieldCheck size={16} style={{ color: 'var(--color-warning)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium" style={{ color: 'var(--color-text)' }}>5 New Student Verifications</p>
                <span className="text-[12px]" style={{ color: 'var(--color-warning)' }}>Awaiting Approval</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Photos */}
      <div className="p-5 rounded-xl" style={{ background: 'var(--color-surface)', border: '1px solid var(--color-border)' }}>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'var(--color-accent)' }}>
              <Image size={18} style={{ color: 'var(--color-primary)' }} />
            </div>
            <div>
              <h3 className="text-[16px] font-semibold" style={{ color: 'var(--color-text)' }}>Profile Photos</h3>
              <p className="text-[12px]" style={{ color: 'var(--color-text-muted)' }}>
                {uploadInfo.count} files · {formatBytes(uploadInfo.totalSize)} total
              </p>
            </div>
          </div>
          <button
            onClick={handleDownloadUploads}
            disabled={downloadingUploads || uploadInfo.count === 0}
            className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-[14px] font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            style={{ background: 'var(--color-primary)' }}
            onMouseEnter={(e) => !e.currentTarget.disabled && (e.currentTarget.style.background = 'var(--color-primary-hover)')}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            <Download size={16} />
            {downloadingUploads ? 'Downloading...' : 'Download All'}
          </button>
        </div>
        {uploadInfo.files.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
            {uploadInfo.files.slice(0, 12).map((file, idx) => (
              <div key={idx}>
                <div className="aspect-square rounded-lg overflow-hidden" style={{ border: '1px solid var(--color-border)' }}>
                  <img src={getImageUrl(`/uploads/profiles/${file.name}`)} alt={file.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-[10px] mt-1 truncate" style={{ color: 'var(--color-text-muted)' }}>{file.name}</p>
              </div>
            ))}
            {uploadInfo.count > 12 && (
              <div
                className="aspect-square rounded-lg flex items-center justify-center"
                style={{ border: '1px solid var(--color-border)', background: 'var(--color-surface-muted)' }}
              >
                <p className="text-sm font-medium" style={{ color: 'var(--color-text-muted)' }}>+{uploadInfo.count - 12} more</p>
              </div>
            )}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
