import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { adminApi } from '../../utils/api';
import { exportToPDF, exportToExcel } from '../../utils/exportData';

const CoursesOverview = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editCourse, setEditCourse] = useState(null);
  const [detailCourse, setDetailCourse] = useState(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('subjects');
  const [contentList, setContentList] = useState([]);
  const [contentLoading, setContentLoading] = useState(false);
  const defaultForm = { title: '', courseCode: '', description: '', category: '', courseType: 'theory', difficulty: 'beginner', semester: '', duration: '', maxStudents: 50, subjects: [{ title: '', code: '', description: '' }] };
  const [form, setForm] = useState({ ...defaultForm });

  const fetchCourses = async () => {
    setLoading(true);
    const res = await adminApi.getCourses();
    if (res.success) setCourses(res.courses || []);
    setLoading(false);
  };

  useEffect(() => { fetchCourses(); }, []);

  // ---- Create / Edit ----
  const openCreate = () => { setEditCourse(null); setForm({ ...defaultForm }); setShowModal(true); };
  const openEdit = (c) => {
    setEditCourse(c);
    setForm({ title: c.title || '', courseCode: c.courseCode || '', description: c.description || '', category: c.category || '', courseType: c.courseType || 'theory', difficulty: c.difficulty || 'beginner', semester: c.semester || '', duration: c.duration || '', maxStudents: c.maxStudents || 50, subjects: [] });
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title.trim()) return Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Title required' });
    const payload = { ...form, subjects: form.subjects?.filter(s => s.title?.trim()) };
    const res = editCourse ? await adminApi.updateCourse(editCourse.id, payload) : await adminApi.createCourse(payload);
    if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: editCourse ? 'Updated!' : 'Created!', timer: 1500, showConfirmButton: false }); setShowModal(false); fetchCourses(); }
    else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
  };

  // ---- Detail View ----
  const openDetail = async (c) => {
    setDetailLoading(true); setDetailCourse(null); setActiveTab('subjects'); setContentList([]);
    const res = await adminApi.getCourseDetail(c.id);
    if (res.success) setDetailCourse(res.course);
    else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
    setDetailLoading(false);
  };

  const refreshDetail = async () => { if (detailCourse) { const res = await adminApi.getCourseDetail(detailCourse.id); if (res.success) setDetailCourse(res.course); } };

  const loadContent = async () => {
    if (!detailCourse) return;
    setContentLoading(true);
    const res = await adminApi.getCourseContent(detailCourse.id);
    if (res.success) setContentList(res.content || []);
    setContentLoading(false);
  };

  useEffect(() => { if (activeTab === 'content' && detailCourse) loadContent(); }, [activeTab, detailCourse?.id]);

  // ---- Subject / Topic / Content CRUD ----
  const addSubject = async () => {
    const { value } = await Swal.fire({ ...getSwalOpts(), title: 'Add Subject', html: '<input id="s-title" class="swal2-input" placeholder="Subject Title"><input id="s-code" class="swal2-input" placeholder="Subject Code (optional)"><textarea id="s-desc" class="swal2-textarea" placeholder="Description (optional)"></textarea>', showCancelButton: true, confirmButtonColor: '#d4a574', preConfirm: () => { const t = document.getElementById('s-title').value; if (!t) { Swal.showValidationMessage('Title required'); return; } return { title: t, code: document.getElementById('s-code').value, description: document.getElementById('s-desc').value }; } });
    if (value) { const res = await adminApi.addSubject(detailCourse.id, value); if (res.success) refreshDetail(); }
  };

  const deleteSubject = async (id, title) => {
    const r = await Swal.fire({ ...getSwalOpts(), title: 'Delete Subject?', text: `Remove "${title}" and all its topics?`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' });
    if (r.isConfirmed) { const res = await adminApi.deleteSubject(id); if (res.success) refreshDetail(); }
  };

  const addTopic = async (subjectId) => {
    const { value } = await Swal.fire({ ...getSwalOpts(), title: 'Add Topic', html: '<input id="t-title" class="swal2-input" placeholder="Topic Title"><textarea id="t-desc" class="swal2-textarea" placeholder="Description (optional)"></textarea>', showCancelButton: true, confirmButtonColor: '#d4a574', preConfirm: () => { const t = document.getElementById('t-title').value; if (!t) { Swal.showValidationMessage('Title required'); return; } return { title: t, description: document.getElementById('t-desc').value }; } });
    if (value) { const res = await adminApi.addTopic(subjectId, value); if (res.success) refreshDetail(); }
  };

  const deleteTopic = async (id) => {
    const r = await Swal.fire({ ...getSwalOpts(), title: 'Delete Topic?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' });
    if (r.isConfirmed) { const res = await adminApi.deleteTopic(id); if (res.success) refreshDetail(); }
  };

  const addContent = async () => {
    const subjects = detailCourse?.subjects || [];
    const { value } = await Swal.fire({ ...getSwalOpts(), title: 'Add Content', width: 520,
      html: `<select id="c-sub" class="swal2-select" style="width:100%;margin-bottom:8px"><option value="">No Subject</option>${subjects.map(s => `<option value="${s.id}">${s.title}</option>`).join('')}</select><input id="c-title" class="swal2-input" placeholder="Content Title" style="width:100%"><select id="c-type" class="swal2-select" style="width:100%;margin-bottom:8px"><option value="text">Text</option><option value="video">Video URL</option><option value="document">Document URL</option><option value="link">Link</option></select><textarea id="c-data" class="swal2-textarea" placeholder="Content / URL" style="width:100%"></textarea>`,
      showCancelButton: true, confirmButtonColor: '#d4a574',
      preConfirm: () => { const t = document.getElementById('c-title').value; if (!t) { Swal.showValidationMessage('Title required'); return; } return { subjectId: document.getElementById('c-sub').value || null, title: t, contentType: document.getElementById('c-type').value, contentData: document.getElementById('c-data').value }; }
    });
    if (value) { const res = await adminApi.addContent(detailCourse.id, value); if (res.success) loadContent(); }
  };

  const deleteContent = async (id) => {
    const r = await Swal.fire({ ...getSwalOpts(), title: 'Delete Content?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' });
    if (r.isConfirmed) { const res = await adminApi.deleteContent(id); if (res.success) loadContent(); }
  };

  // ---- Actions ----
  const handleApprove = (id, title) => {
    Swal.fire({ ...getSwalOpts(), title: 'Approve Course?', text: `Approve "${title}"?`, icon: 'question', showCancelButton: true, confirmButtonColor: '#16a34a', confirmButtonText: 'Approve' })
      .then(async r => { if (r.isConfirmed) { const res = await adminApi.approveCourse(id); if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Approved!', timer: 1500, showConfirmButton: false }); fetchCourses(); } } });
  };

  const handleReject = async (id, title) => {
    const { value: reason } = await Swal.fire({ ...getSwalOpts(), title: 'Reject Course?', input: 'textarea', inputLabel: `Reason for rejecting "${title}"`, inputPlaceholder: 'Enter rejection reason...', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Reject', inputValidator: v => { if (!v) return 'Reason required'; } });
    if (reason) { const res = await adminApi.rejectCourse(id, reason); if (res.success) { Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Rejected', timer: 1500, showConfirmButton: false }); fetchCourses(); } }
  };

  const handleDelete = (id, title) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Course?', text: `Remove "${title}"?`, icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete' })
      .then(async r => { if (r.isConfirmed) { const res = await adminApi.deleteCourse(id); if (res.success) { fetchCourses(); if (detailCourse?.id === id) setDetailCourse(null); Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Deleted!', timer: 1500, showConfirmButton: false }); } } });
  };

  const handleStatusChange = async (id, status) => {
    const res = await adminApi.updateCourseStatus(id, status);
    if (res.success) fetchCourses();
  };

  // ---- Form Helpers ----
  const addSubjectRow = () => setForm(f => ({ ...f, subjects: [...f.subjects, { title: '', code: '', description: '' }] }));
  const removeSubjectRow = i => setForm(f => ({ ...f, subjects: f.subjects.filter((_, idx) => idx !== i) }));
  const updateSubjectRow = (i, field, val) => setForm(f => { const s = [...f.subjects]; s[i] = { ...s[i], [field]: val }; return { ...f, subjects: s }; });

  const statusBadge = (s) => ({ pending: 'bg-amber-500/15 text-amber-400', active: 'bg-green-500/15 text-green-400', rejected: 'bg-red-500/15 text-red-400', draft: 'bg-gray-500/15 text-gray-400', inactive: 'bg-gray-500/15 text-gray-500' })[s] || 'bg-gray-100 text-gray-800';

  const filtered = statusFilter === 'all' ? courses : courses.filter(c => c.status === statusFilter);
  const pending = courses.filter(c => c.status === 'pending');

  const getExportData = () => {
    const columns = ['Title', 'Code', 'Mentor', 'Category', 'Type', 'Difficulty', 'Status', 'Enrolled'];
    const rows = filtered.map(c => [
      c.title,
      c.courseCode,
      c.mentorName || '—',
      c.category || '—',
      c.courseType,
      c.difficulty,
      c.status,
      c.enrollmentCount || 0,
    ]);
    return { title: 'Courses Report', columns, rows, fileName: 'Sowberry_Courses' };
  };

  // ===================== DETAIL VIEW =====================
  if (detailCourse || detailLoading) {
    return (
      <AdminLayout>
        <div className="max-w-5xl mx-auto">
          <button onClick={() => setDetailCourse(null)} className="flex items-center gap-2 text-primary hover:text-primary-dark mb-4 font-medium">
            <i className="ri-arrow-left-line"></i> Back to Courses
          </button>
          {detailLoading && !detailCourse ? null : (
            <div className="bg-white dark-theme:bg-gray-800 rounded-xl shadow-lg">
              {/* Course Header */}
              <div className="p-6 border-b dark-theme:border-gray-700 flex items-start justify-between">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 dark-theme:text-gray-100">{detailCourse.title}</h2>
                  <div className="flex items-center gap-3 mt-2 text-sm text-gray-500 dark-theme:text-gray-400">
                    {detailCourse.courseCode && <span className="bg-primary/10 dark-theme:bg-primary/20 text-primary-dark dark-theme:text-primary-light px-2 py-0.5 rounded text-xs font-mono">{detailCourse.courseCode}</span>}
                    <span><i className="ri-user-star-line mr-1"></i>{detailCourse.mentorName}</span>
                    <span><i className="ri-team-line mr-1"></i>{detailCourse.enrollmentCount || 0} enrolled</span>
                    {detailCourse.contentCount > 0 && <span><i className="ri-file-text-line mr-1"></i>{detailCourse.contentCount} content items</span>}
                  </div>
                  {detailCourse.description && <p className="mt-2 text-sm text-gray-600 dark-theme:text-gray-400">{detailCourse.description}</p>}
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(detailCourse)} className="px-3 py-1.5 bg-blue-100 dark-theme:bg-blue-900/30 text-blue-700 dark-theme:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 transition"><i className="ri-edit-line mr-1"></i>Edit</button>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusBadge(detailCourse.status)}`}>{detailCourse.status}</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b dark-theme:border-gray-700 flex">
                {['subjects', 'content'].map(t => (
                  <button key={t} onClick={() => setActiveTab(t)} className={`px-6 py-3 text-sm font-medium border-b-2 transition ${activeTab === t ? 'border-purple-600 text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 dark-theme:text-gray-400'}`}>
                    {t.charAt(0).toUpperCase() + t.slice(1)}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {activeTab === 'subjects' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark-theme:text-gray-100">Subjects & Topics</h3>
                      <button onClick={addSubject} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition"><i className="ri-add-line mr-1"></i>Add Subject</button>
                    </div>
                    {(!detailCourse.subjects || detailCourse.subjects.length === 0) ? (
                      <p className="text-center text-gray-500 py-8">No subjects yet. Click "Add Subject" to begin organizing the course.</p>
                    ) : (
                      <div className="space-y-4">
                        {detailCourse.subjects.map(sub => (
                          <div key={sub.id} className="border dark-theme:border-gray-700 rounded-xl overflow-hidden">
                            <div className="flex items-center justify-between p-4 bg-gray-50 dark-theme:bg-gray-700/50">
                              <div>
                                <h4 className="font-semibold text-gray-900 dark-theme:text-gray-100">{sub.title}</h4>
                                <div className="flex items-center gap-3 mt-1">
                                  {sub.code && <span className="text-xs text-gray-500 font-mono">{sub.code}</span>}
                                  <span className="text-xs text-gray-400">{sub.topicCount || 0} topics</span>
                                </div>
                              </div>
                              <div className="flex items-center gap-2">
                                <button onClick={() => addTopic(sub.id)} className="text-blue-600 hover:text-blue-800 text-sm font-medium"><i className="ri-add-circle-line mr-1"></i>Add Topic</button>
                                <button onClick={() => deleteSubject(sub.id, sub.title)} className="text-red-500 hover:text-red-700 text-sm"><i className="ri-delete-bin-line"></i></button>
                              </div>
                            </div>
                            {sub.topics && sub.topics.length > 0 && (
                              <div className="divide-y dark-theme:divide-gray-700">
                                {sub.topics.map(t => (
                                  <div key={t.id} className="flex items-center justify-between p-3 px-6">
                                    <span className="text-sm text-gray-700 dark-theme:text-gray-300"><i className="ri-bookmark-line mr-2 text-primary"></i>{t.title}</span>
                                    <button onClick={() => deleteTopic(t.id)} className="text-red-400 hover:text-red-600 text-xs opacity-0 group-hover:opacity-100 transition"><i className="ri-close-line"></i></button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'content' && (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900 dark-theme:text-gray-100">Course Content</h3>
                      <button onClick={addContent} className="px-4 py-2 bg-primary text-white text-sm rounded-lg hover:bg-primary-dark transition"><i className="ri-add-line mr-1"></i>Add Content</button>
                    </div>
                    {contentList.length === 0 ? (
                      <p className="text-center text-gray-500 py-8">No content yet. Add videos, documents, or text content.</p>
                    ) : (
                      <div className="space-y-3">
                        {contentList.map(c => (
                          <div key={c.id} className="flex items-center justify-between p-4 bg-gray-50 dark-theme:bg-gray-700/50 rounded-lg group">
                            <div>
                              <p className="font-medium text-gray-900 dark-theme:text-gray-100">{c.title}</p>
                              <div className="flex items-center gap-3 text-xs text-gray-500 mt-1">
                                <span className="bg-primary/10 dark-theme:bg-primary/20 text-primary px-2 py-0.5 rounded">{c.contentType}</span>
                                {c.subjectTitle && <span><i className="ri-bookmark-line mr-1"></i>{c.subjectTitle}</span>}
                                {c.uploaderName && <span><i className="ri-user-line mr-1"></i>{c.uploaderName}</span>}
                              </div>
                            </div>
                            <button onClick={() => deleteContent(c.id)} className="text-red-500 hover:text-red-700"><i className="ri-delete-bin-line"></i></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </AdminLayout>
    );
  }

  // ===================== MAIN LIST VIEW =====================
  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark-theme:text-gray-100">Courses Overview</h1>
            <p className="text-gray-500 dark-theme:text-gray-400 text-sm mt-1">Manage all courses, subjects, and content</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 rounded-xl px-1">
              <button onClick={() => exportToPDF(getExportData())} className="px-3 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50 dark-theme:hover:bg-red-900/20 transition-colors flex items-center gap-1.5" title="Download PDF">
                <i className="ri-file-pdf-2-line text-sm"></i> PDF
              </button>
              <div className="w-px h-5 bg-sand dark-theme:bg-gray-700"></div>
              <button onClick={() => exportToExcel(getExportData())} className="px-3 py-2 rounded-lg text-xs font-medium text-green-600 hover:bg-green-50 dark-theme:hover:bg-green-900/20 transition-colors flex items-center gap-1.5" title="Download Excel">
                <i className="ri-file-excel-2-line text-sm"></i> Excel
              </button>
            </div>
            <button onClick={openCreate} className="px-5 py-2.5 bg-primary text-white rounded-xl hover:bg-primary-dark transition shadow-lg hover:shadow-xl font-medium">
              <i className="ri-add-line mr-1"></i>Create Course
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
          {[
            { label: 'Total', val: courses.length, color: 'purple', icon: 'ri-book-open-line' },
            { label: 'Active', val: courses.filter(c => c.status === 'active').length, color: 'green', icon: 'ri-checkbox-circle-line' },
            { label: 'Pending', val: pending.length, color: 'amber', icon: 'ri-time-line' },
            { label: 'Rejected', val: courses.filter(c => c.status === 'rejected').length, color: 'red', icon: 'ri-close-circle-line' },
            { label: 'Enrollments', val: courses.reduce((s, c) => s + (c.enrollmentCount || 0), 0), color: 'blue', icon: 'ri-team-line' }
          ].map((s, i) => (
            <div key={i} className="bg-white dark-theme:bg-gray-800 rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg bg-${s.color}-100 dark-theme:bg-${s.color}-900/30 flex items-center justify-center`}>
                  <i className={`${s.icon} text-${s.color}-600 text-lg`}></i>
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark-theme:text-gray-100">{s.val}</p>
                  <p className="text-xs text-gray-500 dark-theme:text-gray-400">{s.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Alert */}
        {pending.length > 0 && (
          <div className="mb-6 p-4 bg-amber-50 dark-theme:bg-amber-900/20 border border-amber-200 dark-theme:border-amber-800 rounded-xl flex items-center gap-3">
            <i className="ri-alarm-warning-line text-amber-600 text-xl"></i>
            <span className="text-amber-800 dark-theme:text-amber-300 font-medium">{pending.length} course{pending.length > 1 ? 's' : ''} awaiting approval</span>
            <button onClick={() => setStatusFilter('pending')} className="ml-auto px-3 py-1.5 rounded-lg bg-amber-100 dark-theme:bg-amber-900/30 text-amber-700 text-xs font-medium hover:bg-amber-200">Review Now</button>
          </div>
        )}

        {/* Status Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'active', 'pending', 'rejected', 'draft', 'inactive'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              statusFilter === s
                ? 'bg-primary text-white shadow'
                : 'bg-white dark-theme:bg-gray-800 text-gray-600 dark-theme:text-gray-300 hover:bg-gray-50 dark-theme:hover:bg-gray-700 border dark-theme:border-gray-700'
            }`}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)} ({s === 'all' ? courses.length : courses.filter(c => c.status === s).length})
            </button>
          ))}
        </div>

        {/* Course Grid */}
        {loading ? (
          <Loader text="Loading courses..." />
        ) : filtered.length === 0 ? (

          <div className="text-center py-16 bg-white dark-theme:bg-gray-800 rounded-xl">
            <i className="ri-book-open-line text-5xl text-gray-300 dark-theme:text-gray-600 mb-3 block"></i>
            <h3 className="text-lg font-semibold text-gray-600 dark-theme:text-gray-400">No courses found</h3>
            <p className="text-gray-400 text-sm mt-1">Click "Create Course" to add your first course</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filtered.map(c => (
              <div key={c.id} className="bg-white dark-theme:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition overflow-hidden group border border-transparent hover:border-primary/20 dark-theme:hover:border-purple-800">
                <div className="p-5">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-bold text-gray-900 dark-theme:text-gray-100 truncate">{c.title}</h3>
                      {c.courseCode && <span className="text-xs text-gray-500 font-mono">{c.courseCode}</span>}
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ml-2 whitespace-nowrap ${statusBadge(c.status)}`}>{c.status}</span>
                  </div>
                  <p className="text-sm text-gray-500 dark-theme:text-gray-400 line-clamp-2 mb-3">{c.description || 'No description'}</p>
                  <div className="flex items-center gap-3 text-xs text-gray-500 dark-theme:text-gray-400 mb-4 flex-wrap">
                    <span><i className="ri-user-star-line mr-1"></i>{c.mentorName || 'Unassigned'}</span>
                    <span><i className="ri-team-line mr-1"></i>{c.enrollmentCount || 0} enrolled</span>
                    {c.difficulty && <span className="capitalize">{c.difficulty}</span>}
                    {c.subjectCount > 0 && <span><i className="ri-book-2-line mr-1"></i>{c.subjectCount} subjects</span>}
                  </div>

                  {c.status === 'rejected' && c.rejectionReason && (
                    <div className="bg-red-50 dark-theme:bg-red-900/20 rounded-lg p-2 mb-3 text-xs text-red-600"><i className="ri-information-line mr-1"></i>{c.rejectionReason}</div>
                  )}

                  <div className="flex items-center gap-2 flex-wrap">
                    <button onClick={() => openDetail(c)} className="px-3 py-1.5 bg-primary/10 dark-theme:bg-primary/20 text-primary-dark dark-theme:text-primary-light rounded-lg text-sm font-medium hover:bg-purple-200 dark-theme:hover:bg-purple-900/50 transition"><i className="ri-eye-line mr-1"></i>View</button>
                    <button onClick={() => openEdit(c)} className="px-3 py-1.5 bg-blue-100 dark-theme:bg-blue-900/30 text-blue-700 dark-theme:text-blue-300 rounded-lg text-sm font-medium hover:bg-blue-200 transition"><i className="ri-edit-line mr-1"></i>Edit</button>
                    {c.status === 'pending' && (
                      <>
                        <button onClick={() => handleApprove(c.id, c.title)} className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg text-sm font-medium hover:bg-green-200 transition"><i className="ri-check-line"></i></button>
                        <button onClick={() => handleReject(c.id, c.title)} className="px-3 py-1.5 bg-red-100 text-red-700 rounded-lg text-sm font-medium hover:bg-red-200 transition"><i className="ri-close-line"></i></button>
                      </>
                    )}
                    {c.status === 'active' && (
                      <button onClick={() => handleStatusChange(c.id, 'inactive')} className="px-3 py-1.5 bg-gray-100 dark-theme:bg-gray-700 text-gray-600 dark-theme:text-gray-300 rounded-lg text-sm font-medium hover:bg-gray-200 transition"><i className="ri-pause-line"></i></button>
                    )}
                    {c.status === 'inactive' && (
                      <button onClick={() => handleStatusChange(c.id, 'active')} className="px-3 py-1.5 bg-green-50 dark-theme:bg-green-900/20 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition"><i className="ri-play-line"></i></button>
                    )}
                    {c.status === 'rejected' && (
                      <button onClick={() => handleApprove(c.id, c.title)} className="px-3 py-1.5 bg-green-50 dark-theme:bg-green-900/20 text-green-600 rounded-lg text-sm font-medium hover:bg-green-100 transition"><i className="ri-check-line"></i></button>
                    )}
                    <button onClick={() => handleDelete(c.id, c.title)} className="px-3 py-1.5 bg-red-50 dark-theme:bg-red-900/20 text-red-500 rounded-lg text-sm font-medium hover:bg-red-100 transition ml-auto"><i className="ri-delete-bin-line"></i></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ---- Create / Edit Modal ---- */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white dark-theme:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-6 border-b dark-theme:border-gray-700">
              <h2 className="text-xl font-bold text-gray-900 dark-theme:text-gray-100">{editCourse ? 'Edit Course' : 'Create New Course'}</h2>
              <button onClick={() => setShowModal(false)} className="p-2 hover:bg-gray-100 dark-theme:hover:bg-gray-700 rounded-lg transition"><i className="ri-close-line text-xl"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Course Title *</label>
                  <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent" required />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Course Code</label>
                  <input value={form.courseCode} onChange={e => setForm({ ...form, courseCode: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Category</label>
                  <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="e.g. Computer Science" className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Type</label>
                  <select value={form.courseType} onChange={e => setForm({ ...form, courseType: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="theory">Theory</option><option value="practical">Practical</option><option value="hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Difficulty</label>
                  <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent">
                    <option value="beginner">Beginner</option><option value="intermediate">Intermediate</option><option value="advanced">Advanced</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Semester</label>
                  <input value={form.semester} onChange={e => setForm({ ...form, semester: e.target.value })} className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Duration</label>
                  <input value={form.duration} onChange={e => setForm({ ...form, duration: e.target.value })} placeholder="e.g. 12 weeks" className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Max Students</label>
                  <input type="number" value={form.maxStudents} onChange={e => setForm({ ...form, maxStudents: parseInt(e.target.value) || 50 })} className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-medium text-gray-700 dark-theme:text-gray-300 mb-1">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows="3" className="w-full px-4 py-2.5 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"></textarea>
                </div>
              </div>

              {/* Subjects (only for create) */}
              {!editCourse && (
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-700 dark-theme:text-gray-300">Initial Subjects</label>
                    <button type="button" onClick={addSubjectRow} className="text-sm text-primary hover:text-primary-dark"><i className="ri-add-line mr-1"></i>Add Row</button>
                  </div>
                  {form.subjects.map((s, i) => (
                    <div key={i} className="flex items-center gap-2 mb-2">
                      <input value={s.title} onChange={e => updateSubjectRow(i, 'title', e.target.value)} placeholder="Subject title" className="flex-1 px-3 py-2 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 text-sm focus:ring-2 focus:ring-primary focus:border-transparent" />
                      <input value={s.code} onChange={e => updateSubjectRow(i, 'code', e.target.value)} placeholder="Code" className="w-24 px-3 py-2 border rounded-lg dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 text-sm focus:ring-2 focus:ring-primary focus:border-transparent" />
                      {form.subjects.length > 1 && <button type="button" onClick={() => removeSubjectRow(i)} className="text-red-500 hover:text-red-700"><i className="ri-close-circle-line"></i></button>}
                    </div>
                  ))}
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t dark-theme:border-gray-700">
                <button type="button" onClick={() => setShowModal(false)} className="px-5 py-2.5 border dark-theme:border-gray-600 rounded-lg text-gray-700 dark-theme:text-gray-300 hover:bg-gray-50 dark-theme:hover:bg-gray-700 font-medium">Cancel</button>
                <button type="submit" className="px-5 py-2.5 bg-primary text-white rounded-lg hover:bg-primary-dark transition font-medium">{editCourse ? 'Update Course' : 'Create Course'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default CoursesOverview;
