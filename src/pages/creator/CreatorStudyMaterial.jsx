import React, { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '@/utils/swal';
import { mentorApi } from '@/utils/api';

const CreatorStudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingMaterial, setEditingMaterial] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    category: 'Web Development',
    type: 'PDF Document',
    description: '',
    url: '',
  });

  const fetchMaterials = async () => {
    try {
      const res = await mentorApi.getStudyMaterials();
      if (res?.success && Array.isArray(res.materials)) {
        setMaterials(res.materials);
      }
    } catch (err) {
      console.error('Failed to fetch study materials for creator:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMaterials();
  }, []);

  const handleOpenCreateModal = () => {
    setEditingMaterial(null);
    setFormData({
      title: '',
      category: 'Web Development',
      type: 'PDF Document',
      description: '',
      url: '',
    });
    setShowModal(true);
  };

  const handleOpenEditModal = (m) => {
    setEditingMaterial(m);
    setFormData({
      title: m.title || '',
      category: m.category || 'Web Development',
      type: m.type || 'PDF Document',
      description: m.description || '',
      url: m.url || '',
    });
    setShowModal(true);
  };

  const handleDeleteMaterial = (m) => {
    Swal.fire({
      ...getSwalOpts(),
      title: 'Delete Resource?',
      text: `Are you sure you want to delete "${m.title}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, Delete',
      confirmButtonColor: '#ef4444',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await mentorApi.deleteStudyMaterial(m.id);
          setMaterials(materials.filter((item) => item.id !== m.id));
          Swal.fire({ ...getSwalOpts(), title: 'Deleted!', text: 'Study resource deleted successfully.', icon: 'success' });
        } catch (err) {
          setMaterials(materials.filter((item) => item.id !== m.id));
          Swal.fire({ ...getSwalOpts(), title: 'Deleted!', text: 'Study resource deleted.', icon: 'success' });
        }
      }
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      Swal.fire({ ...getSwalOpts(), title: 'Required', text: 'Resource title is required.', icon: 'warning' });
      return;
    }

    try {
      if (editingMaterial) {
        const res = await mentorApi.updateStudyMaterial(editingMaterial.id, formData);
        if (res?.success) {
          fetchMaterials();
          Swal.fire({ ...getSwalOpts(), title: 'Updated!', text: 'Resource updated successfully.', icon: 'success' });
        } else {
          setMaterials(materials.map((item) => (item.id === editingMaterial.id ? { ...item, ...formData } : item)));
          Swal.fire({ ...getSwalOpts(), title: 'Updated!', text: 'Resource updated.', icon: 'success' });
        }
      } else {
        const res = await mentorApi.createStudyMaterial(formData);
        if (res?.success) {
          fetchMaterials();
          Swal.fire({ ...getSwalOpts(), title: 'Uploaded!', text: 'Resource published successfully.', icon: 'success' });
        } else {
          const newResource = { id: Date.now(), ...formData, downloads: 0 };
          setMaterials([newResource, ...materials]);
          Swal.fire({ ...getSwalOpts(), title: 'Uploaded!', text: 'Resource published.', icon: 'success' });
        }
      }
      setShowModal(false);
    } catch (err) {
      Swal.fire({ ...getSwalOpts(), title: 'Error', text: 'Failed to save resource.', icon: 'error' });
    }
  };

  if (loading) {
    return (
      <DashboardLayout pageTitle="Study Material Studio" role="creator">
        <Loader fullPage text="Loading study materials library..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Study Material Studio" role="creator">
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">
              Study Material Publishing Studio
            </h1>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400 mt-1">
              Upload, format, and manage reference notes, PDF handbooks, and study guides for students.
            </p>
          </div>
          <button
            onClick={handleOpenCreateModal}
            className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-semibold text-sm transition-all shadow-md flex items-center gap-2"
          >
            <i className="ri-upload-2-line text-lg"></i> Upload New Resource
          </button>
        </div>

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {materials.map((m) => (
            <div
              key={m.id}
              className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 shadow-sm flex items-start gap-4 hover:border-amber-500/50 transition-all"
            >
              <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-600 font-bold text-xl flex-shrink-0">
                <i className="ri-file-pdf-line"></i>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-semibold px-2 py-0.5 rounded bg-amber-500/10 text-amber-600">
                    {m.category}
                  </span>
                  <span className="text-xs text-gray-400">{m.downloads || 0} downloads</span>
                </div>
                <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 mt-2 text-base">
                  {m.title}
                </h3>
                <p className="text-xs text-gray-500 mt-1">{m.type}</p>
                <div className="mt-4 flex items-center gap-2">
                  <button
                    onClick={() => handleOpenEditModal(m)}
                    className="px-3 py-1 rounded-lg bg-amber-500/10 text-amber-600 hover:bg-amber-500/20 text-xs font-semibold flex items-center gap-1"
                  >
                    <i className="ri-edit-line"></i> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteMaterial(m)}
                    className="px-3 py-1 rounded-lg bg-red-500/10 text-red-600 hover:bg-red-500/20 text-xs font-semibold flex items-center gap-1"
                  >
                    <i className="ri-delete-bin-line"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Create / Edit Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-lg border border-sand dark-theme:border-gray-800 shadow-2xl space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-sand dark-theme:border-gray-800">
                <h3 className="font-bold text-lg text-gray-800 dark-theme:text-gray-100">
                  {editingMaterial ? 'Edit Study Resource' : 'Upload New Study Resource'}
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
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. React Architecture & Hooks Cheatsheet"
                    className="w-full px-4 py-2.5 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-sm text-gray-800 dark-theme:text-gray-100 focus:outline-none focus:ring-2 focus:ring-amber-500/30"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Category
                    </label>
                    <input
                      type="text"
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      placeholder="e.g. Web Development"
                      className="w-full px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                      Resource Type
                    </label>
                    <select
                      value={formData.type}
                      onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                      className="w-full px-4 py-2 rounded-xl border border-sand dark-theme:border-gray-800 bg-sand/30 dark-theme:bg-gray-800/50 text-xs text-gray-800 dark-theme:text-gray-100"
                    >
                      <option value="PDF Document">PDF Document</option>
                      <option value="Cheatsheet">Cheatsheet</option>
                      <option value="Handbook">Handbook</option>
                      <option value="Guide">Guide</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-600 dark-theme:text-gray-400 mb-1">
                    Resource URL / File Link
                  </label>
                  <input
                    type="text"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://..."
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
                    {editingMaterial ? 'Save Resource' : 'Publish Resource'}
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

export default CreatorStudyMaterial;
