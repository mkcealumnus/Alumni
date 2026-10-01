import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '@/utils/swal';
import { adminApi } from '@/utils/api';

const ManagerCurriculum = () => {
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [auditStatus, setAuditStatus] = useState('Approved');
  const [auditNote, setAuditNote] = useState('');

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const res = await adminApi.getCourses();
      if (res?.success) {
        const fetched = res.courses || (res.data && res.data.courses) || [];
        setCourses(
          fetched.map((c) => ({
            ...c,
            auditStatus: c.auditStatus || 'Approved',
            auditNote: c.auditNote || 'Curriculum aligned with institutional standards.',
          }))
        );
      }
    } catch (err) {
      console.error('Fetch courses error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenAuditModal = (course) => {
    setSelectedCourse(course);
    setAuditStatus(course.auditStatus || 'Approved');
    setAuditNote(course.auditNote || '');
    setShowModal(true);
  };

  const handleArchiveCourse = (course) => {
    Swal.fire({
      ...getSwalOpts(),
      title: 'Archive Curriculum?',
      text: `Archive "${course.title}" from active curriculum offerings?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Archive',
      confirmButtonColor: '#ef4444',
    }).then((result) => {
      if (result.isConfirmed) {
        setCourses(courses.filter((c) => c.id !== course.id));
        Swal.fire({ ...getSwalOpts(), title: 'Archived!', text: 'Course archived from active list.', icon: 'success' });
      }
    });
  };

  const handleSubmitAudit = (e) => {
    e.preventDefault();
    if (selectedCourse) {
      setCourses(
        courses.map((c) => (c.id === selectedCourse.id ? { ...c, auditStatus, auditNote } : c))
      );
      Swal.fire({ ...getSwalOpts(), title: 'Audit Saved!', text: 'Curriculum review updated.', icon: 'success' });
    }
    setShowModal(false);
  };

  if (loading) return <Loader fullPage text="Loading Curriculum Overview..." />;

  return (
    <DashboardLayout pageTitle="Curriculum Overview" role="manager">
      <div className="space-y-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Curriculum & Course Auditing
            </h1>
            <p className="text-xs text-gray-500 mt-1">{courses.length} active course offerings under supervision</p>
          </div>
        </div>

        {courses.length === 0 ? (
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-16 text-center border border-sand dark-theme:border-gray-800 text-gray-400">
            <i className="ri-book-open-line text-4xl mb-3 block"></i>
            <p className="text-sm">No curriculum courses created yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col justify-between hover:border-emerald-500/50 transition-all"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 uppercase">
                      {course.category || 'General'}
                    </span>
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-semibold bg-blue-500/10 text-blue-600">
                      {course.auditStatus || 'Approved'}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-base">
                    {course.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark-theme:text-gray-400 line-clamp-2">
                    {course.description || 'Comprehensive institutional course module.'}
                  </p>
                  {course.auditNote && (
                    <p className="text-[11px] text-gray-400 italic bg-sand/30 dark-theme:bg-gray-800/50 p-2 rounded-lg">
                      <i className="ri-shield-check-line mr-1 text-emerald-600"></i>
                      {course.auditNote}
                    </p>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-sand/50 dark-theme:border-gray-800 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Learners: {course.enrolled || 0}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenAuditModal(course)}
                      className="px-3 py-1 rounded-lg bg-emerald-600 text-white text-xs font-semibold hover:bg-emerald-700 transition-colors flex items-center gap-1"
                    >
                      <i className="ri-shield-check-line"></i> Audit
                    </button>
                    <button
                      onClick={() => handleArchiveCourse(course)}
                      className="px-3 py-1 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-semibold transition-colors flex items-center gap-1"
                    >
                      <i className="ri-archive-line"></i> Archive
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Audit Modal */}
        {showModal && selectedCourse && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-md border border-sand dark-theme:border-gray-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-sand dark-theme:border-gray-800">
                <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100">
                  Curriculum Quality Audit
                </h3>
                <button
                  onClick={() => setShowModal(false)}
                  className="p-1 rounded-lg text-gray-400 hover:text-gray-600 dark-theme:hover:text-gray-200"
                >
                  <i className="ri-close-line text-xl"></i>
                </button>
              </div>

              <form onSubmit={handleSubmitAudit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Course Title
                  </label>
                  <input
                    type="text"
                    disabled
                    value={selectedCourse.title}
                    className="w-full px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-gray-100 dark-theme:bg-gray-800 text-xs text-gray-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Audit Status
                  </label>
                  <select
                    value={auditStatus}
                    onChange={(e) => setAuditStatus(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                  >
                    <option value="Approved">Approved</option>
                    <option value="Under Supervision">Under Supervision</option>
                    <option value="Revision Requested">Revision Requested</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Manager Review & Quality Notes
                  </label>
                  <textarea
                    rows={3}
                    value={auditNote}
                    onChange={(e) => setAuditNote(e.target.value)}
                    placeholder="Enter supervisory notes or curriculum recommendations..."
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
                    Save Audit
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

export default ManagerCurriculum;
