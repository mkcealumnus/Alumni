import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '@/utils/swal';
import { mentorApi } from '@/utils/api';

const CreatorAptitude = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingTest, setEditingTest] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Quantitative',
    durationMinutes: 30,
    totalQuestions: 20,
    description: '',
  });

  const fetchTests = async () => {
    try {
      const res = await mentorApi.getAptitudeTests();
      if (res?.success && Array.isArray(res.tests)) {
        setTests(res.tests);
      }
    } catch (err) {
      console.error('Failed to fetch aptitude tests for creator:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTests();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingTest(null);
    setFormData({
      title: '',
      category: 'Quantitative',
      durationMinutes: 30,
      totalQuestions: 20,
      description: '',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (t) => {
    setEditingTest(t);
    setFormData({
      title: t.title || '',
      category: t.category || 'Quantitative',
      durationMinutes: t.durationMinutes || 30,
      totalQuestions: t.totalQuestions || 20,
      description: t.description || '',
    });
    setShowModal(true);
  };

  const handleDeleteTest = (t) => {
    Swal.fire({
      ...getSwalOpts(),
      title: 'Delete Assessment?',
      text: `Are you sure you want to delete "${t.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mentorApi.deleteAptitudeTest(t.id);
          if (res?.success) {
            Swal.fire({ ...getSwalOpts(), title: 'Deleted!', text: 'Aptitude test deleted successfully.', icon: 'success' });
            setTests(tests.filter((item) => item.id !== t.id));
          } else {
            Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to delete test.', icon: 'error' });
          }
        } catch (err) {
          Swal.fire({ ...getSwalOpts(), title: 'Error', text: 'Network error deleting test.', icon: 'error' });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      Swal.fire({ ...getSwalOpts(), title: 'Required', text: 'Test title is required.', icon: 'warning' });
      return;
    }

    try {
      const res = editingTest
        ? await mentorApi.updateAptitudeTest(editingTest.id, formData)
        : await mentorApi.createAptitudeTest(formData);
      if (res?.success) {
        Swal.fire({ ...getSwalOpts(), title: editingTest ? 'Updated!' : 'Created!', text: 'Aptitude test saved successfully.', icon: 'success' });
        setShowModal(false);
        fetchTests();
      } else {
        Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to save aptitude test.', icon: 'error' });
      }
    } catch (err) {
      Swal.fire({ ...getSwalOpts(), title: 'Error', text: 'Network error saving aptitude test.', icon: 'error' });
    }
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Aptitude Test Authoring" role="creator">
        <Loader fullPage text="Loading aptitude test suite..." />
      </DashboardLayout>
    );
  }

  const columns = [
    {
      key: 'title',
      label: 'Test Title',
      sortable: true,
      render: (_, t) => (
        <div>
          <p className="font-semibold text-gray-800 dark-theme:text-gray-100">{t.title}</p>
          <p className="text-xs text-gray-400 line-clamp-1">{t.category || 'General Aptitude'}</p>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Category',
      sortable: true,
      render: (v) => (
        <span className="px-2.5 py-1 rounded-md bg-blue-500/10 text-blue-600 text-xs font-semibold">
          {v || 'Quantitative'}
        </span>
      ),
    },
    {
      key: 'durationMinutes',
      label: 'Duration',
      sortable: true,
      render: (v) => `${v || 30} mins`,
    },
    {
      key: 'totalQuestions',
      label: 'Questions',
      sortable: true,
      render: (v) => `${v || 20} Qs`,
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, t) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEditModal(t)}
            className="px-3 py-1.5 rounded-lg bg-blue-600 text-white text-xs font-medium hover:bg-blue-700 transition-colors flex items-center gap-1"
          >
            <i className="ri-edit-line"></i> Edit
          </button>
          <button
            onClick={() => handleDeleteTest(t)}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <i className="ri-delete-bin-line"></i> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout pageTitle="Aptitude Test Authoring" role="creator">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Aptitude Test Authoring Suite
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Design quantitative, logical, and verbal aptitude assessment modules.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            <i className="ri-task-line text-lg"></i> Author New Assessment
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center">
                <i className="ri-file-list-line text-blue-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Assessments</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {tests.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <i className="ri-questionnaire-line text-green-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Authored Questions</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {tests.reduce((acc, t) => acc + (t.totalQuestions || 0), 0)}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center">
                <i className="ri-time-line text-purple-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Avg Test Time</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">35 mins</p>
              </div>
            </div>
          </div>
        </div>

        {/* Tests Table */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-4 text-lg">
            Authored Aptitude Tests
          </h3>
          <DataTable
            columns={columns}
            data={tests}
            loading={false}
            searchPlaceholder="Search assessment title or category..."
            storageKey="sowberry_creator_aptitude_cols"
            exportTitle="Authored Aptitude Tests"
            exportFileName="Sowberry_Authored_Aptitude_Tests"
            emptyIcon="ri-file-text-line"
            emptyMessage="No aptitude tests authored yet"
          />
        </div>

        {/* Create / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-lg border border-sand dark-theme:border-gray-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-sand dark-theme:border-gray-800">
                <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100">
                  {editingTest ? 'Edit Aptitude Assessment' : 'Author New Aptitude Test'}
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
                    Assessment Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Advanced Quantitative Reasoning Test"
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Logical"
                      className="w-full px-3 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Duration (mins)
                    </label>
                    <input
                      type="number"
                      value={formData.durationMinutes}
                      onChange={(e) => setFormData({ ...formData, durationMinutes: parseInt(e.target.value) || 30 })}
                      className="w-full px-3 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Total Questions
                    </label>
                    <input
                      type="number"
                      value={formData.totalQuestions}
                      onChange={(e) => setFormData({ ...formData, totalQuestions: parseInt(e.target.value) || 20 })}
                      className="w-full px-3 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Instructions & Description
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Enter guidelines, passing criteria, and topics..."
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500/30"
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
                    className="px-5 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md"
                  >
                    {editingTest ? 'Save Assessment' : 'Publish Assessment'}
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

export default CreatorAptitude;
