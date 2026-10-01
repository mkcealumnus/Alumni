import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '@/utils/swal';
import { mentorApi } from '@/utils/api';

const CreatorCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    level: 'intermediate',
    description: '',
  });

  const fetchCourses = async () => {
    try {
      const res = await mentorApi.getCourses();
      if (res?.success && Array.isArray(res.courses)) {
        setCourses(res.courses);
      }
    } catch (err) {
      console.error('Failed to fetch courses for creator:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      category: 'Web Development',
      level: 'intermediate',
      description: '',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title || '',
      category: course.category || 'Web Development',
      level: course.level || 'intermediate',
      description: course.description || '',
    });
    setShowModal(true);
  };

  const handleDeleteCourse = (course) => {
    Swal.fire({
      ...getSwalOpts(),
      title: 'Delete Course?',
      text: `Are you sure you want to delete "${course.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mentorApi.deleteCourse(course.id);
          if (res?.success) {
            Swal.fire({ ...getSwalOpts(), title: 'Deleted!', text: 'Course deleted successfully.', icon: 'success' });
            setCourses(courses.filter((c) => c.id !== course.id));
          } else {
            Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to delete course.', icon: 'error' });
          }
        } catch (err) {
          Swal.fire({ ...getSwalOpts(), title: 'Error', text: 'Network error deleting course.', icon: 'error' });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      Swal.fire({ ...getSwalOpts(), title: 'Required', text: 'Course title is required.', icon: 'warning' });
      return;
    }

    try {
      if (editingCourse) {
        const res = await mentorApi.updateCourse(editingCourse.id, formData);
        if (res?.success) {
          Swal.fire({ ...getSwalOpts(), title: 'Updated!', text: 'Course updated successfully.', icon: 'success' });
          setShowModal(false);
          fetchCourses();
        } else {
          Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to update course.', icon: 'error' });
        }
      } else {
        const res = await mentorApi.createCourse(formData);
        if (res?.success) {
          Swal.fire({ ...getSwalOpts(), title: 'Created!', text: 'Course created successfully.', icon: 'success' });
          setShowModal(false);
          fetchCourses();
        } else {
          Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to create course.', icon: 'error' });
        }
      }
    } catch (err) {
      Swal.fire({ ...getSwalOpts(), title: 'Error', text: 'Network error saving course.', icon: 'error' });
    }
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Course Authoring Studio" role="creator">
        <Loader fullPage text="Loading authoring workspace..." />
      </DashboardLayout>
    );
  }

  const columns = [
    {
      key: 'title',
      label: 'Course Title',
      sortable: true,
      render: (_, course) => (
        <div>
          <p className="font-semibold text-gray-800 dark-theme:text-gray-100">{course.title}</p>
          <p className="text-xs text-gray-400 line-clamp-1">{course.description || 'No description provided'}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (v) => (
        <span className="px-2.5 py-1 rounded-md bg-amber-500/10 text-amber-600 text-xs font-semibold">
          {v || 'General'}
        </span>
      ),
    },
    {
      key: 'level',
      label: 'Level',
      sortable: true,
      render: (v) => (
        <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-semibold capitalize">
          {v || 'Intermediate'}
        </span>
      ),
    },
    {
      key: 'enrolled',
      label: 'Learners',
      sortable: true,
      render: (v) => v || 0,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, course) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEditModal(course)}
            className="px-3 py-1.5 rounded-lg bg-amber-500 text-white text-xs font-medium hover:bg-amber-600 transition-colors flex items-center gap-1"
          >
            <i className="ri-edit-line"></i> Edit
          </button>
          <button
            onClick={() => handleDeleteCourse(course)}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <i className="ri-delete-bin-line"></i> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout pageTitle="Course Authoring Studio" role="creator">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Course Authoring Studio
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Design, publish, and update instructional courses and modules.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            <i className="ri-add-line text-lg"></i> Create New Course
          </button>
        </div>

        {/* Studio Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <i className="ri-book-open-line text-amber-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Published Courses</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {courses.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <i className="ri-video-line text-purple-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Video Modules</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">42</p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <i className="ri-user-star-line text-green-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Enrolled Students</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {courses.reduce((acc, c) => acc + (c.enrolled || 0), 0)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Course Catalog Table */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-4 text-lg">
            Authored Courses Catalog
          </h3>
          <DataTable
            columns={columns}
            data={courses}
            loading={false}
            searchPlaceholder="Search courses..."
            storageKey="sowberry_creator_courses_cols"
            exportTitle="Authored Courses"
            exportFileName="Sowberry_Authored_Courses"
            emptyIcon="ri-book-3-line"
            emptyMessage="No authored courses found"
          />
        </div>

        {/* Create / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-lg border border-sand dark-theme:border-gray-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-sand dark-theme:border-gray-800">
                <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100">
                  {editingCourse ? 'Edit Authored Course' : 'Author New Course'}
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
                    Course Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Master Full-Stack Web Development"
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Category
                    </label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Data Structures">Data Structures</option>
                      <option value="Algorithms">Algorithms</option>
                      <option value="Machine Learning">Machine Learning</option>
                      <option value="Aptitude">Aptitude</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Difficulty Level
                    </label>
                    <select
                      value={formData.level}
                      onChange={(e) => setFormData({ ...formData, level: e.target.value })}
                      className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                    >
                      <option value="beginner">Beginner</option>
                      <option value="intermediate">Intermediate</option>
                      <option value="advanced">Advanced</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Course Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Provide overview of curriculum goals and topics covered..."
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
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
                    className="px-5 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-xs shadow-md"
                  >
                    {editingCourse ? 'Save Changes' : 'Publish Course'}
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

export default CreatorCourses;
