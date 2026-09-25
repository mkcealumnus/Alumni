import React, { useState } from 'react';
import { Search, Download, Star, FileText, Eye, Upload, SlidersHorizontal, Plus, CheckCircle2 } from 'lucide-react';
import { INITIAL_RESOURCES } from '../data/initialData';

export default function ResourceLibrary({ initialResources, searchQuery, setSearchQuery }) {
  const [resources, setResources] = useState(initialResources && initialResources.length > 0 ? initialResources : INITIAL_RESOURCES);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('downloads');
  const [activePreviewResource, setActivePreviewResource] = useState(null);
  
  // Upload Modal State
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadTitle, setUploadTitle] = useState('');
  const [uploadCategory, setUploadCategory] = useState('Interview Prep');
  const [uploadBranch, setUploadBranch] = useState('CSE/IT');
  const [uploadAuthor, setUploadAuthor] = useState('');
  const [uploadDesc, setUploadDesc] = useState('');
  const [uploadTags, setUploadTags] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const categories = ['All', 'Interview Prep', 'Resume', 'Core Eng', 'Database', 'Full-Stack'];

  let filteredResources = resources.filter(res => {
    const query = (searchQuery || '').toLowerCase();
    const titleMatch = (res.title || '').toLowerCase().includes(query);
    const authorMatch = (res.author || '').toLowerCase().includes(query);
    const tagsMatch = (res.tags || []).some(t => String(t).toLowerCase().includes(query));
    
    const matchesSearch = titleMatch || authorMatch || tagsMatch;
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'downloads') {
    filteredResources.sort((a, b) => (b.downloads_count || b.downloads || 0) - (a.downloads_count || a.downloads || 0));
  } else if (sortBy === 'rating') {
    filteredResources.sort((a, b) => (b.rating || 5) - (a.rating || 5));
  }

  const handleDownload = (res) => {
    const updatedCount = (res.downloads_count || res.downloads || 0) + 1;
    setResources(prev => prev.map(r => r.id === res.id ? { ...r, downloads_count: updatedCount } : r));
    alert(`Downloading resource: "${res.title}"!\nProvided free for MKCE students.`);
  };

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const tagsArray = uploadTags.split(',').map(t => t.trim()).filter(Boolean);

    const newRes = {
      id: Date.now(),
      title: uploadTitle,
      category: uploadCategory,
      target_branch: uploadBranch,
      type: 'PDF Guide',
      author: uploadAuthor || 'MKCE Alumni',
      author_role: 'Verified Alumni Contributor',
      downloads_count: 0,
      rating: 5.0,
      size: '4.5 MB',
      tags: tagsArray.length > 0 ? tagsArray : ['MKCE', 'Guide'],
      description: uploadDesc
    };

    setResources(prev => [newRes, ...prev]);

    setUploadSuccess(true);
    setTimeout(() => {
      setUploadSuccess(false);
      setShowUploadModal(false);
      setUploadTitle('');
      setUploadDesc('');
      setUploadTags('');
    }, 1500);
  };

  return (
    <section id="resources" className="py-16 sm:py-20 3xl:py-24 bg-[#fcfcfc] relative border-b border-slate-200/80">
      <div className="max-w-7xl 3xl:max-w-[1700px] 4xl:max-w-[2200px] mx-auto px-4 sm:px-6 lg:px-8 3xl:px-12">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <p className="label-mono text-xs text-orange-600 font-bold mb-1">Placement Repository</p>
            <h2 className="text-3xl sm:text-5xl 3xl:text-6xl font-normal text-slate-900 font-sans tracking-tight">
              Free Placement & <span className="font-serif italic text-orange-600">Study Materials</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-2 max-w-xl">
              Cheat-sheets, Overleaf ATS resume templates, and domain notes shared by alumni.
            </p>
          </div>

          {/* Search, Upload & Sort Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full sm:w-auto px-5 py-2.5 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-semibold shadow-md shadow-orange-500/20 flex items-center justify-center gap-2 shrink-0 cursor-pointer"
            >
              <Upload className="w-4 h-4" />
              <span>Upload Resource</span>
            </button>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources, DSA, resume..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-orange-600 font-mono shadow-xs"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3.5 py-2.5 rounded-full bg-white border border-slate-300 text-slate-700 text-xs font-mono font-semibold focus:outline-none shadow-xs"
              >
                <option value="downloads">Sort by Downloads</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters - Scrollable on Mobile */}
        <div className="flex items-center gap-2 mb-8 overflow-x-auto pb-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-mono font-semibold transition-all duration-200 cursor-pointer shrink-0 ${
                selectedCategory === cat
                  ? 'bg-orange-600 text-white shadow-md shadow-orange-500/20 border border-orange-500/30'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-slate-900 hover:border-orange-300 shadow-2xs'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid */}
        {filteredResources.length === 0 ? (
          <div className="py-16 text-center bg-white rounded-3xl border border-slate-200 p-8 max-w-md mx-auto space-y-3 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center mx-auto border border-orange-200">
              <FileText className="w-6 h-6" />
            </div>
            <h3 className="text-base font-bold text-slate-900">No Resources Found</h3>
            <p className="text-xs text-slate-500">
              No study materials matching your search. Click 'Upload Resource' to add one.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 3xl:grid-cols-4 4xl:grid-cols-5 gap-6">
            {filteredResources.map((res) => {
              const currentDownloads = res.downloads_count || res.downloads || 0;
              return (
                <div
                  key={res.id}
                  className="glass-card glass-card-hover p-6 rounded-3xl border-slate-200/90 bg-white flex flex-col justify-between shadow-sm relative group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                        {res.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-700 text-xs font-mono font-bold bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                        <span>{res.rating || 5.0}</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-slate-900 mb-2 group-hover:text-orange-600 transition-colors leading-snug">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-500 mb-3">
                      Shared by <span className="text-slate-900 font-semibold">{res.author}</span>
                      <span className="text-[10px] text-orange-600 block font-mono font-semibold">{res.author_role || res.authorRole}</span>
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {res.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(res.tags || []).map((tag, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-500">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-800">{currentDownloads}</span> downloads
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActivePreviewResource(res)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all border border-slate-200 cursor-pointer"
                        title="Quick Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(res)}
                        className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-orange-600 hover:bg-orange-700 text-white text-xs font-semibold shadow-md shadow-orange-500/20 transition-all cursor-pointer"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Download</span>
                      </button>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>
        )}

        {/* Upload Resource Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-orange-600" />
                  <h3 className="text-base font-bold text-slate-900">Upload Resource</h3>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer">✕</button>
              </div>

              {uploadSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto border border-emerald-200">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Resource Published Successfully!</h4>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Resource Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Master System Design Interview Kit 2026"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-600 font-mono"
                      >
                        <option value="Interview Prep">Interview Prep</option>
                        <option value="Resume">Resume</option>
                        <option value="Core Eng">Core Eng</option>
                        <option value="Database">Database</option>
                        <option value="Full-Stack">Full-Stack</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Target Branch</label>
                      <select
                        value={uploadBranch}
                        onChange={(e) => setUploadBranch(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-orange-600 font-mono"
                      >
                        <option value="All Branches">All Branches</option>
                        <option value="CSE/IT">CSE/IT</option>
                        <option value="ECE/EEE">ECE/EEE</option>
                        <option value="AI&DS">AI&DS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Author Name / Role</label>
                    <input
                      type="text"
                      placeholder="e.g. Karthik Raja (SDE @ Amazon)"
                      value={uploadAuthor}
                      onChange={(e) => setUploadAuthor(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Brief overview of what engineering students will learn..."
                      value={uploadDesc}
                      onChange={(e) => setUploadDesc(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. DSA, SystemDesign, Overleaf"
                      value={uploadTags}
                      onChange={(e) => setUploadTags(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-orange-600"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md cursor-pointer">Publish Resource</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Resource Preview Modal */}
        {activePreviewResource && (
          <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-orange-50 text-orange-700 border border-orange-200">
                    {activePreviewResource.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1.5">{activePreviewResource.title}</h3>
                </div>
                <button onClick={() => setActivePreviewResource(null)} className="text-slate-400 hover:text-slate-700 font-bold text-sm cursor-pointer">✕</button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200 space-y-1.5 font-mono">
                  <div className="flex justify-between text-slate-500">
                    <span>Contributor:</span>
                    <strong className="text-slate-900">{activePreviewResource.author}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Role:</span>
                    <strong className="text-orange-600">{activePreviewResource.author_role || activePreviewResource.authorRole}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>File Details:</span>
                    <strong className="text-slate-900">{activePreviewResource.type || 'PDF Guide'} ({activePreviewResource.size || '5 MB'})</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Resource Overview</h4>
                  <p className="text-slate-600 leading-relaxed">{activePreviewResource.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button onClick={() => setActivePreviewResource(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer">Close</button>
                <button onClick={() => { handleDownload(activePreviewResource); setActivePreviewResource(null); }} className="px-5 py-2 rounded-xl bg-orange-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5 cursor-pointer">
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Resource</span>
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
