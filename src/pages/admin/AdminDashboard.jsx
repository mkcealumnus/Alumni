import React, { useState, useEffect, useRef } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import { adminApi, getImageUrl } from '../../utils/api';
import Swal, { getSwalOpts } from '../../utils/swal';
import { useAuth } from '../../context/AuthContext';



const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ totalStudents: 0, totalMentors: 0, totalCourses: 0, totalEnrollments: 0, avgCompletion: 0, activeStudents: 0, recentActivities: [], pendingVerifications: 0 });
  const [activeLearnersCount, setActiveLearnersCount] = useState(0);
  const [uploadInfo, setUploadInfo] = useState({ count: 0, totalSize: 0, files: [] });
  const [downloadingUploads, setDownloadingUploads] = useState(false);
  
  const studentsChartRef = useRef(null);
  const mentorChartRef = useRef(null);
  const completionChartRef = useRef(null);

  // Initialize charts and counters
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

    // Sample data for charts
    const monthlyData = {
      students: [1847, 2100, 2320, 2500, 2700, 2847],
      completion: [65, 68, 72, 75, 77, 78],
      enrollments: [8500, 9600, 10400, 11200, 12000, 12583]
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June'];

    // Common chart options
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: 'var(--card-bg)',
          titleColor: 'var(--text)',
          bodyColor: 'var(--text)',
          borderColor: 'var(--border-color)',
          borderWidth: 1,
          padding: 10,
          cornerRadius: 8
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grid: {
            color: 'rgba(99, 102, 241, 0.1)'
          }
        },
        x: {
          grid: { display: false }
        }
      }
    };

    // Create chart function
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
              backgroundColor: color + '20',
              tension: 0.4,
              fill: true
            }]
          },
          options: chartOptions
        });
      }
    };

    // Initialize charts
    let charts = [];
    if (studentsChartRef.current) {
      charts.push(createChart(studentsChartRef.current, monthlyData.students, '#c96442'));
    }
    if (completionChartRef.current) {
      charts.push(createChart(completionChartRef.current, monthlyData.completion, '#b5552f'));
    }
    if (mentorChartRef.current) {
      charts.push(createChart(mentorChartRef.current, monthlyData.students, '#e8a98a'));
    }

    // Animate counter function
    const animateCounter = (setValue, targetValue, duration = 2000) => {
      const start = 0;
      const increment = targetValue / (duration / 16);
      let current = start;

      const animate = () => {
        current += increment;
        if (current >= targetValue) {
          setValue(targetValue);
        } else {
          setValue(Math.round(current));
          requestAnimationFrame(animate);
        }
      };

      animate();
    };

    // Animate the counters after a short delay
    setTimeout(() => {
      animateCounter(setActiveLearnersCount, 2847);
    }, 500);

    // Cleanup charts on unmount
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

  return (
    <AdminLayout>
      {/* Welcome Section */}
      <div className="mb-8">
        <div className="bg-gray-950 rounded-2xl p-8 text-white">
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome, <span className="text-primary-light">{user?.fullName || 'Admin'}!</span></h1>
              <p className="text-white/60">Monitor and manage your platform activities from the admin dashboard</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl"><i className="ri-team-line"></i></div>
                <div>
                  <p className="text-white/60 text-sm">Total Mentors</p>
                  <p className="text-xl font-bold">{stats.totalMentors}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-xl p-4">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center text-xl"><i className="ri-user-line"></i></div>
                <div>
                  <p className="text-white/60 text-sm">Total Students</p>
                  <p className="text-xl font-bold">{stats.totalStudents?.toLocaleString()}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark-theme:text-gray-400">Student Enrollment Trends</h3>
            <i className="ri-line-chart-line text-primary text-xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark-theme:text-gray-100 mb-4">{activeLearnersCount.toLocaleString()}</h2>
          <div className="h-40">
            <canvas ref={studentsChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark-theme:text-gray-400">Mentor Performance</h3>
            <i className="ri-team-line text-cyan-500 text-xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark-theme:text-gray-100 mb-4">{stats.totalMentors || 0}</h2>
          <div className="h-40">
            <canvas ref={mentorChartRef}></canvas>
          </div>
        </div>
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-semibold text-gray-500 dark-theme:text-gray-400">Course Completion Rate</h3>
            <i className="ri-medal-line text-violet-500 text-xl"></i>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 dark-theme:text-gray-100 mb-4">{stats.avgCompletion || 0}%</h2>
          <div className="h-40">
            <canvas ref={completionChartRef}></canvas>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
          <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center"><i className="ri-user-add-line"></i></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200 truncate">New Mentor Application: John Smith</p>
                <span className="text-xs text-gray-400">30 minutes ago</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center"><i className="ri-flag-line"></i></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200 truncate">Student Report: Technical Issue</p>
                <span className="text-xs text-gray-400">1 hour ago</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 text-green-500 flex items-center justify-center"><i className="ri-user-star-line"></i></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200 truncate">Mentor Rating Update: Sarah Johnson</p>
                <span className="text-xs text-gray-400">2 hours ago</span>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
          <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-4">System Alerts</h3>
          <div className="space-y-4">
            <div className="flex items-center gap-4 p-3 rounded-xl bg-red-50 dark-theme:bg-red-900/20 border border-red-100 dark-theme:border-red-800/30">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 text-red-500 flex items-center justify-center"><i className="ri-error-warning-line"></i></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200">3 Pending Mentor Applications</p>
                <span className="text-xs text-red-500">Requires Review</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl bg-amber-50 dark-theme:bg-amber-900/20 border border-amber-100 dark-theme:border-amber-800/30">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center"><i className="ri-shield-check-line"></i></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200">5 New Student Verifications</p>
                <span className="text-xs text-amber-500">Awaiting Approval</span>
              </div>
            </div>
            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-cream dark-theme:hover:bg-gray-800 transition-colors">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 text-blue-500 flex items-center justify-center"><i className="ri-question-line"></i></div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-700 dark-theme:text-gray-200">2 Support Tickets Pending</p>
                <span className="text-xs text-gray-400">From Students</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Photos Management */}
      <div className="mt-6">
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                <i className="ri-image-line text-xl"></i>
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">Profile Photos</h3>
                <p className="text-xs text-gray-400">{uploadInfo.count} files · {formatBytes(uploadInfo.totalSize)} total</p>
              </div>
            </div>
            <button
              onClick={handleDownloadUploads}
              disabled={downloadingUploads || uploadInfo.count === 0}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-primary text-white font-medium text-sm hover:bg-primary-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {downloadingUploads ? (
                <><i className="ri-download-2-line"></i> Downloading...</>
              ) : (
                <><i className="ri-download-2-line"></i> Download All</>
              )}
            </button>
          </div>
          {uploadInfo.files.length > 0 && (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 mt-4">
              {uploadInfo.files.slice(0, 12).map((file, idx) => (
                <div key={idx} className="group relative">
                  <div className="aspect-square rounded-xl overflow-hidden bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700">
                    <img src={getImageUrl(`/uploads/profiles/${file.name}`)} alt={file.name} className="w-full h-full object-cover" />
                  </div>
                  <p className="text-[10px] text-gray-500 mt-1 truncate">{file.name}</p>
                </div>
              ))}
              {uploadInfo.count > 12 && (
                <div className="aspect-square rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 flex items-center justify-center">
                  <p className="text-sm font-medium text-gray-500">+{uploadInfo.count - 12} more</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
