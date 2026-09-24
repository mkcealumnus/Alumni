import React, { useState } from 'react';
import { RESOURCES } from '../data/mockData';
import { Search, Download, Star, FileText, Filter, Eye, CheckCircle2, Bookmark, Sparkles, SlidersHorizontal } from 'lucide-react';

export default function ResourceLibrary({ searchQuery, setSearchQuery }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState('downloads');
  const [activePreviewResource, setActivePreviewResource] = useState(null);
  const [downloadedResources, setDownloadedResources] = useState({});

  const categories = ['All', 'Interview Prep', 'Resume', 'Core Eng', 'Database', 'Full-Stack'];

  let filteredResources = RESOURCES.filter(res => {
    const query = (searchQuery || '').toLowerCase();
    const matchesSearch = res.title.toLowerCase().includes(query) ||
                          res.tags.some(t => t.toLowerCase().includes(query)) ||
                          res.author.toLowerCase().includes(query);
    const matchesCategory = selectedCategory === 'All' || res.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (sortBy === 'downloads') {
    filteredResources.sort((a, b) => b.downloads - a.downloads);
  } else if (sortBy === 'rating') {
    filteredResources.sort((a, b) => b.rating - a.rating);
  }

  const handleDownload = (res) => {
    setDownloadedResources(prev => ({ ...prev, [res.id]: (prev[res.id] || res.downloads) + 1 }));
    alert(`Downloading official resource: "${res.title}"\nProvided free by MKCE Alumni (${res.authorRole})!`);
  };

  return (
    <section id="resources" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-50 text-cyan-700 border border-cyan-200 text-xs font-semibold mb-3">
              <FileText className="w-3.5 h-3.5" /> Curated Resource Repository
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
              Free Placement & <span className="gradient-text">Study Materials</span>
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-1 max-w-xl">
              Cheat sheets, ATS resume templates, and domain notes verified by MKCE alumni.
            </p>
          </div>

          {/* Search Bar & Sort Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
            <div className="relative w-full sm:w-72">
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
                <option value="downloads">Sort by Most Downloaded</option>
                <option value="rating">Sort by Highest Rated</option>
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

        {/* Resources Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((res) => {
            const currentDownloads = downloadedResources[res.id] || res.downloads;
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
                      <span>{res.rating}</span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 mb-1 hover:text-indigo-600 transition-colors">
                    {res.title}
                  </h3>

                  <p className="text-xs text-slate-500 mb-3">
                    Shared by <span className="text-slate-800 font-semibold">{res.author}</span>
                    <span className="text-[10px] text-indigo-600 block font-medium">{res.authorRole}</span>
                  </p>

                  <p className="text-xs text-slate-600 leading-relaxed mb-4 line-clamp-2">
                    {res.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {res.tags.map((tag, i) => (
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
                <button
                  onClick={() => setActivePreviewResource(null)}
                  className="text-slate-400 hover:text-slate-700 font-bold text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-3 text-xs text-slate-700">
                <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 space-y-1">
                  <div className="flex justify-between text-slate-500">
                    <span>Contributor:</span>
                    <strong className="text-slate-900">{activePreviewResource.author}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>Designation:</span>
                    <strong className="text-indigo-600">{activePreviewResource.authorRole}</strong>
                  </div>
                  <div className="flex justify-between text-slate-500">
                    <span>File Format & Size:</span>
                    <strong className="text-slate-900">{activePreviewResource.type} ({activePreviewResource.size})</strong>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-slate-900 mb-1">Resource Overview</h4>
                  <p className="text-slate-600 leading-relaxed">{activePreviewResource.description}</p>
                </div>

                <div className="flex flex-wrap gap-1.5 pt-2">
                  {activePreviewResource.tags.map((t, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 border border-indigo-100 font-medium">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-3">
                <button
                  onClick={() => setActivePreviewResource(null)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-700 text-xs font-semibold hover:bg-slate-200"
                >
                  Close
                </button>
                <button
                  onClick={() => {
                    handleDownload(activePreviewResource);
                    setActivePreviewResource(null);
                  }}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-indigo-600 to-cyan-600 text-white text-xs font-bold shadow-md flex items-center gap-1.5"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download Free Resource</span>
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
}
