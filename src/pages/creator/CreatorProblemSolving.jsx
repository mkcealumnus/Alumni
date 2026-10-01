import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import DataTable from '@/components/ui/DataTable';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '@/utils/swal';
import { mentorApi } from '@/utils/api';

const CreatorProblemSolving = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProblem, setEditingProblem] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Algorithms',
    difficulty: 'Easy',
    points: 100,
    description: '',
    sampleInput: '',
    sampleOutput: '',
    testCases: '[{"input": "1 2", "output": "3"}]',
  });

  const fetchProblems = async () => {
    try {
      const res = await mentorApi.getProblems();
      if (res?.success && Array.isArray(res.problems)) {
        setProblems(res.problems);
      }
    } catch (err) {
      console.error('Failed to fetch coding problems for creator:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProblems();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingProblem(null);
    setFormData({
      title: '',
      category: 'Algorithms',
      difficulty: 'Easy',
      points: 100,
      description: '',
      sampleInput: '',
      sampleOutput: '',
      testCases: '[{"input": "1 2", "output": "3"}]',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (p) => {
    setEditingProblem(p);
    let tcStr = '[{"input": "1 2", "output": "3"}]';
    if (p.testCases) {
      tcStr = typeof p.testCases === 'string' ? p.testCases : JSON.stringify(p.testCases, null, 2);
    }
    setFormData({
      title: p.title || '',
      category: p.category || 'Algorithms',
      difficulty: p.difficulty || 'Easy',
      points: p.points || 100,
      description: p.description || '',
      sampleInput: p.sampleInput || '',
      sampleOutput: p.sampleOutput || '',
      testCases: tcStr,
    });
    setShowModal(true);
  };

  const handleDeleteProblem = (p) => {
    Swal.fire({
      ...getSwalOpts(),
      title: 'Delete Problem?',
      text: `Are you sure you want to delete "${p.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mentorApi.deleteProblem(p.id);
          if (res?.success) {
            Swal.fire({ ...getSwalOpts(), title: 'Deleted!', text: 'Coding problem deleted successfully.', icon: 'success' });
            setProblems(problems.filter((item) => item.id !== p.id));
          } else {
            Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to delete problem.', icon: 'error' });
          }
        } catch (err) {
          Swal.fire({ ...getSwalOpts(), title: 'Error', text: 'Network error deleting problem.', icon: 'error' });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      Swal.fire({ ...getSwalOpts(), title: 'Required', text: 'Problem title is required.', icon: 'warning' });
      return;
    }

    try {
      if (editingProblem) {
        const res = await mentorApi.updateProblem(editingProblem.id, formData);
        if (res?.success) {
          Swal.fire({ ...getSwalOpts(), title: 'Updated!', text: 'Problem updated successfully.', icon: 'success' });
          setShowModal(false);
          fetchProblems();
        } else {
          Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to update problem.', icon: 'error' });
        }
      } else {
        const res = await mentorApi.createProblem(formData);
        if (res?.success) {
          Swal.fire({ ...getSwalOpts(), title: 'Created!', text: 'Problem authored successfully.', icon: 'success' });
          setShowModal(false);
          fetchProblems();
        } else {
          Swal.fire({ ...getSwalOpts(), title: 'Error', text: res?.message || 'Failed to author problem.', icon: 'error' });
        }
      }
    } catch (err) {
      Swal.fire({ ...getSwalOpts(), title: 'Error', text: 'Network error saving problem.', icon: 'error' });
    }
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Problem Authoring Studio" role="creator">
        <Loader fullPage text="Loading problem authoring tools..." />
      </DashboardLayout>
    );
  }

  const columns = [
    {
      key: 'title',
      label: 'Problem Title',
      sortable: true,
      render: (_, p) => (
        <div>
          <p className="font-semibold text-gray-800 dark-theme:text-gray-100">{p.title}</p>
          <p className="text-xs text-gray-400 line-clamp-1">{p.category || 'General'}</p>
        </div>
      ),
    },
    {
      key: 'difficulty',
      label: 'Difficulty',
      sortable: true,
      render: (v) => {
        const colors = {
          Easy: 'bg-green-500/10 text-green-600',
          Medium: 'bg-amber-500/10 text-amber-600',
          Hard: 'bg-red-500/10 text-red-600',
        };
        return (
          <span className={`px-2.5 py-1 rounded-md text-xs font-semibold ${colors[v] || 'bg-gray-100 text-gray-600'}`}>
            {v || 'Medium'}
          </span>
        );
      },
    },
    {
      key: 'points',
      label: 'Points',
      sortable: true,
      render: (v) => v || 100,
    },
    {
      key: 'testCases',
      label: 'Test Cases',
      sortable: false,
      render: (_, p) => {
        let count = 0;
        try {
          const tc = typeof p.testCases === 'string' ? JSON.parse(p.testCases) : p.testCases;
          count = Array.isArray(tc) ? tc.length : 0;
        } catch (e) {
          count = 0;
        }
        return <span className="text-xs font-medium text-gray-600">{count} test cases</span>;
      },
    },
    {
      key: 'actions',
      label: 'Actions',
      sortable: false,
      render: (_, p) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleOpenEditModal(p)}
            className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium hover:bg-indigo-700 transition-colors flex items-center gap-1"
          >
            <i className="ri-edit-line"></i> Edit
          </button>
          <button
            onClick={() => handleDeleteProblem(p)}
            className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-medium transition-colors flex items-center gap-1"
          >
            <i className="ri-delete-bin-line"></i> Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <DashboardLayout pageTitle="Problem Authoring Studio" role="creator">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Coding Problem Authoring Studio
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Create and manage algorithmic coding challenges, test cases, and solution templates.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            <i className="ri-code-s-slash-line text-lg"></i> Author New Problem
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center">
                <i className="ri-code-box-line text-indigo-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Total Authoring Bank</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {problems.length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-green-500/10 flex items-center justify-center">
                <i className="ri-checkbox-circle-line text-green-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Easy Problems</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {problems.filter((p) => p.difficulty === 'Easy').length}
                </p>
              </div>
            </div>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center">
                <i className="ri-fire-line text-amber-600 text-lg"></i>
              </div>
              <div>
                <p className="text-xs text-gray-400">Medium & Hard Problems</p>
                <p className="text-xl font-bold text-gray-800 dark-theme:text-gray-100">
                  {problems.filter((p) => p.difficulty !== 'Easy').length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 shadow-sm">
          <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mb-4 text-lg">
            Problem Bank Directory
          </h3>
          <DataTable
            columns={columns}
            data={problems}
            loading={false}
            searchPlaceholder="Search problem title or category..."
            storageKey="sowberry_creator_problems_cols"
            exportTitle="Coding Problems Bank"
            exportFileName="Sowberry_Coding_Problems"
            emptyIcon="ri-code-line"
            emptyMessage="No coding problems available"
          />
        </div>

        {/* Create / Edit Problem Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-xl border border-sand dark-theme:border-gray-800 shadow-2xl space-y-5 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between pb-3 border-b border-sand dark-theme:border-gray-800">
                <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100">
                  {editingProblem ? 'Edit Coding Problem' : 'Author New Problem'}
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
                    Problem Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Reverse a Linked List"
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Data Structures"
                      className="w-full px-3 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Difficulty
                    </label>
                    <select
                      value={formData.difficulty}
                      onChange={(e) => setFormData({ ...formData, difficulty: e.target.value })}
                      className="w-full px-3 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    >
                      <option value="Easy">Easy</option>
                      <option value="Medium">Medium</option>
                      <option value="Hard">Hard</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Points
                    </label>
                    <input
                      type="number"
                      value={formData.points}
                      onChange={(e) => setFormData({ ...formData, points: parseInt(e.target.value) || 100 })}
                      className="w-full px-3 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Problem Description & Constraints
                  </label>
                  <textarea
                    rows={3}
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe problem problem statement, constraints, time complexity..."
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500/30"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Test Cases (JSON Format)
                  </label>
                  <textarea
                    rows={3}
                    value={formData.testCases}
                    onChange={(e) => setFormData({ ...formData, testCases: e.target.value })}
                    className="w-full px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-gray-900 text-green-400 font-mono text-xs focus:outline-none"
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
                    className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-xs shadow-md"
                  >
                    {editingProblem ? 'Save Problem' : 'Publish Problem'}
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

export default CreatorProblemSolving;
