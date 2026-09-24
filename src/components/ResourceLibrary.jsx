import React, { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { Search, Download, Star, FileText, Eye, Upload, SlidersHorizontal, Loader2, Plus, CheckCircle2 } from 'lucide-react';

const DEFAULT_RESOURCES = [
  {
    id: 1,
    title: 'Complete SDE Interview Master Kit 2026',
    category: 'Interview Prep',
    target_branch: 'CSE/IT',
    type: 'PDF Guide',
    author: 'Karthik Raja',
    author_role: 'SDE-2 @ Amazon (MKCE Batch 2023)',
    downloads_count: 1420,
    rating: 4.9,
    size: '14.2 MB',
    tags: ['DSA', 'System Design', 'Behavioral', 'LeetCode'],
    description: 'Comprehensive 120-page hand-written notes covering 15 key DSA patterns, Top 50 System Design questions, and Amazon Leadership Principles STAR templates.'
  },
  {
    id: 2,
    title: 'Official ATS-Friendly Engineering Resume Templates',
    category: 'Resume',
    target_branch: 'All Branches',
    type: 'Overleaf / Word',
    author: 'MKCE Placement Cell & Alumni',
    author_role: 'Verified Institutional Resource',
    downloads_count: 3890,
    rating: 5.0,
    size: '2.8 MB',
    tags: ['Resume', 'Overleaf', 'Placement', 'ATS 95+'],
    description: 'Clean LaTeX & Word templates optimized for ATS parsers (TCS, ZoHo, Wipro, Amazon). Includes bullet point action verbs and project formatting guidelines.'
  },
  {
    id: 3,
    title: 'VLSI Physical Design & Verilog Interview Handbook',
    category: 'Core Eng',
    target_branch: 'ECE/EEE',
    type: 'Study Guide',
    author: 'Priya Dharshini',
    author_role: 'Hardware Engineer @ Qualcomm (Batch 2022)',
    downloads_count: 850,
    rating: 4.8,
    size: '8.5 MB',
    tags: ['Verilog', 'VLSI', 'Digital Design', 'STA'],
    description: 'RTL coding syntax cheatsheet, FSM state machines, Setup/Hold slack calculation problems, and Qualcomm interview round questions.'
  },
  {
    id: 4,
    title: 'Top 50 SQL & Relational Database Query Deck',
    category: 'Database',
    target_branch: 'All Branches',
    type: 'Practice Deck',
    author: 'Sanjay Kumar',
    author_role: 'Data Analyst @ ZoHo (Batch 2024)',
    downloads_count: 2150,
    rating: 4.9,
    size: '4.1 MB',
    tags: ['SQL', 'DBMS', 'Joins', 'LeetCode SQL'],
    description: 'Frequently asked SQL queries in technical rounds: Nth highest salary, window functions, group by HAVING, indexing performance, and schema design.'
  }
];

export default function ResourceLibrary({ searchQuery, setSearchQuery }) {
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(true);
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

  useEffect(() => {
    async function loadResources() {
      setLoading(true);
      const data = await dbService.getResources();
      if (data && data.length > 0) {
        setResources(data);
      } else {
        setResources(DEFAULT_RESOURCES);
      }
      setLoading(false);
    }
    loadResources();
  }, []);

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

  const handleDownload = async (res) => {
    const updatedCount = (res.downloads_count || res.downloads || 0) + 1;
    setResources(prev => prev.map(r => r.id === res.id ? { ...r, downloads_count: updatedCount } : r));
    await dbService.incrementDownload(res.id, updatedCount);
    alert(`Downloading resource: "${res.title}" from Supabase storage!\nProvided free by MKCE Alumni.`);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    if (!uploadTitle.trim()) return;

    const tagsArray = uploadTags.split(',').map(t => t.trim()).filter(Boolean);

    const newRes = await dbService.uploadResource({
      title: uploadTitle,
      category: uploadCategory,
      target_branch: uploadBranch,
      author: uploadAuthor || 'MKCE Alumni',
      author_role: 'Verified Alumni Contributor',
      description: uploadDesc,
      tags: tagsArray,
      size: '4.5 MB'
    });

    if (newRes) {
      setResources([newRes, ...resources]);
    } else {
      setResources([{
        id: Date.now(),
        title: uploadTitle,
        category: uploadCategory,
        target_branch: uploadBranch,
        type: 'PDF Guide',
        author: uploadAuthor || 'MKCE Alumni',
        author_role: 'Verified Alumni Contributor',
        downloads_count: 1,
        rating: 5.0,
        size: '4.5 MB',
        tags: tagsArray,
        description: uploadDesc
      }, ...resources]);
    }

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
    <section id="resources" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" /> Supabase Connected Repository
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Free Placement & <span className="gradient-text">Study Materials</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Cheat sheets, ATS resume templates, and domain notes saved directly in Supabase.
            </p>
          </div>

          {/* Search, Upload & Sort */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <button
              onClick={() => setShowUploadModal(true)}
              className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-bold shadow-md flex items-center justify-center gap-2 shrink-0"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Resource to Supabase</span>
            </button>

            <div className="relative w-full sm:w-64">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search resources, DSA, resume..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 shadow-sm transition-all"
              />
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <SlidersHorizontal className="w-4 h-4 text-slate-500 shrink-0" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full sm:w-auto px-3 py-2.5 rounded-xl bg-white border border-slate-300 text-slate-700 text-xs font-semibold focus:outline-none focus:border-indigo-600 shadow-sm"
              >
                <option value="downloads">Sort by Downloads</option>
                <option value="rating">Sort by Rating</option>
              </select>
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all duration-200 ${
                selectedCategory === cat
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-sm'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resources Grid / Loader */}
        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500 text-xs font-semibold">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span>Fetching resources from Supabase database...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredResources.map((res) => {
              const currentDownloads = res.downloads_count || res.downloads || 0;
              return (
                <div
                  key={res.id}
                  className="glass-card glass-card-hover p-6 rounded-2xl border-slate-200 bg-white flex flex-col justify-between shadow-sm relative group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[11px] font-bold px-2.5 py-1 rounded-md bg-indigo-50 text-indigo-700 border border-indigo-200">
                        {res.category}
                      </span>
                      <div className="flex items-center gap-1 text-amber-500 text-xs font-bold bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                        <Star className="w-3.5 h-3.5 fill-amber-400" />
                        <span>{res.rating || 5.0}</span>
                      </div>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 mb-1 hover:text-indigo-600 transition-colors">
                      {res.title}
                    </h3>

                    <p className="text-xs text-slate-500 mb-3">
                      Shared by <span className="text-slate-800 font-semibold">{res.author}</span>
                      <span className="text-[10px] text-indigo-600 block font-medium">{res.author_role || res.authorRole}</span>
                    </p>

                    <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                      {res.description}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {(res.tags || []).map((tag, i) => (
                        <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Card Footer */}
                  <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-500">
                      <Download className="w-3.5 h-3.5 text-slate-400" />
                      <span className="font-semibold text-slate-700">{currentDownloads}</span> downloads
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setActivePreviewResource(res)}
                        className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-all"
                        title="Quick Preview"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDownload(res)}
                        className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 text-white text-xs font-semibold shadow-md shadow-indigo-500/20 transition-all"
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
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-2">
                  <Upload className="w-5 h-5 text-indigo-600" />
                  <h3 className="text-base font-bold text-slate-900">Upload Resource to Supabase</h3>
                </div>
                <button onClick={() => setShowUploadModal(false)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
              </div>

              {uploadSuccess ? (
                <div className="py-6 text-center space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm">Resource Published to Supabase!</h4>
                </div>
              ) : (
                <form onSubmit={handleUploadSubmit} className="space-y-3">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Resource Title</label>
                    <input
                      type="text"
                      placeholder="e.g. Master System Design Interview Kit 2026"
                      value={uploadTitle}
                      onChange={(e) => setUploadTitle(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Category</label>
                      <select
                        value={uploadCategory}
                        onChange={(e) => setUploadCategory(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="Interview Prep">Interview Prep</option>
                        <option value="Resume">Resume</option>
                        <option value="Core Eng">Core Eng</option>
                        <option value="Database">Database</option>
                        <option value="Full-Stack">Full-Stack</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">Target Branch</label>
                      <select
                        value={uploadBranch}
                        onChange={(e) => setUploadBranch(e.target.value)}
                        className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      >
                        <option value="All Branches">All Branches</option>
                        <option value="CSE/IT">CSE/IT</option>
                        <option value="ECE/EEE">ECE/EEE</option>
                        <option value="AI&DS">AI&DS</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Author Name / Designation</label>
                    <input
                      type="text"
                      placeholder="e.g. Karthik Raja (SDE @ Amazon)"
                      value={uploadAuthor}
                      onChange={(e) => setUploadAuthor(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Description</label>
                    <textarea
                      rows={3}
                      placeholder="Brief overview of what engineering students will learn..."
                      value={uploadDesc}
                      onChange={(e) => setUploadDesc(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">Tags (comma separated)</label>
                    <input
                      type="text"
                      placeholder="e.g. DSA, SystemDesign, Overleaf"
                      value={uploadTags}
                      onChange={(e) => setUploadTags(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-slate-50 border border-slate-300 text-xs text-slate-900 focus:outline-none focus:border-indigo-600"
                    />
                  </div>

                  <div className="pt-2 flex justify-end gap-2">
                    <button type="button" onClick={() => setShowUploadModal(false)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">Cancel</button>
                    <button type="submit" className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-md">Upload to Supabase</button>
                  </div>
                </form>
              )}
            </div>
          </div>
        )}

        {/* Resource Preview Modal */}
        {activePreviewResource && (
          <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-2xl border border-slate-200 space-y-4 animate-in fade-in zoom-in-95">
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                    {activePreviewResource.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">{activePreviewResource.title}</h3>
                </div>
                <button onClick={() => setActivePreviewResource(null)} className="text-slate-400 hover:text-slate-700 font-bold text-sm">✕</button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Contributor:</span>
                    <strong className="text-slate-900">{activePreviewResource.author}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Designation:</span>
                    <strong className="text-indigo-600">{activePreviewResource.author_role || activePreviewResource.authorRole}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>File Format & Size:</span>
                    <strong className="text-slate-900">{activePreviewResource.type || 'PDF Guide'} ({activePreviewResource.size || '5 MB'})</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Resource Overview</h4>
                  <p className="text-slate-600 leading-relaxed">{activePreviewResource.description}</p>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button onClick={() => setActivePreviewResource(null)} className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold">Close</button>
                <button onClick={() => { handleDownload(activePreviewResource); setActivePreviewResource(null); }} className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5">
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
