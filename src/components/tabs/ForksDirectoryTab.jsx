import React, { useState } from 'react';
import { 
  GitFork, Star, ExternalLink, Plus, Search, CheckCircle2, 
  Github, Code, MessageSquare, Sparkles, Filter 
} from 'lucide-react';
import { FORKS_PROJECTS } from '../../data/mockData';

export default function ForksDirectoryTab({ currentUser }) {
  const [projects, setProjects] = useState(FORKS_PROJECTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // New Project Form
  const [pTitle, setPTitle] = useState('');
  const [pRepo, setPRepo] = useState('');
  const [pDesc, setPDesc] = useState('');
  const [pTags, setPTags] = useState('React, Node.js');

  const filteredProjects = projects.filter(p => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddProject = (e) => {
    e.preventDefault();
    if (!pTitle.trim()) return;

    const newProj = {
      id: `fork-${Date.now()}`,
      title: pTitle,
      studentName: currentUser?.name || 'MKCE Student',
      branch: `${currentUser?.branch || 'CSE'} ${currentUser?.year || '3rd Year'}`,
      stars: 1,
      forksCount: 0,
      repoUrl: pRepo || 'https://github.com/mkce-student/project',
      demoUrl: 'https://mkce.ac.in',
      description: pDesc,
      tags: pTags.split(',').map(t => t.trim()),
      alumniReview: null
    };

    setProjects([newProj, ...projects]);
    setShowAddModal(false);
    setPTitle('');
    setPRepo('');
    setPDesc('');
  };

  return (
    <div className="space-y-8 animate-in fade-in">
      
      {/* Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-600 via-indigo-600 to-blue-600 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-white text-xs font-semibold mb-2">
            <GitFork className="w-3.5 h-3.5 text-cyan-300" /> Student Open-Source & Capstone Directory
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Forks & Student Projects</h2>
          <p className="text-indigo-100 text-xs sm:text-sm mt-1 max-w-xl">
            Showcase your open-source projects, receive peer stars/forks, and get verified code reviews from MKCE alumni.
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="px-5 py-2.5 rounded-xl bg-white text-indigo-700 font-bold text-xs hover:bg-indigo-50 transition-all shadow-md flex items-center gap-2"
        >
          <Plus className="w-4 h-4 text-indigo-600" />
          <span>Submit Project / Fork</span>
        </button>
      </div>

      {/* Controls Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects, PyTorch, React, ESP32..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-900 text-xs placeholder:text-slate-400 focus:outline-none focus:border-indigo-600 shadow-sm"
          />
        </div>

        <span className="text-xs text-slate-500 font-semibold">
          Showing <strong className="text-slate-900">{filteredProjects.length}</strong> active student repositories
        </span>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredProjects.map((proj) => (
          <div key={proj.id} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm space-y-4 hover:border-indigo-300 transition-all">
            
            <div className="flex items-start justify-between gap-3">
              <div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded bg-indigo-50 text-indigo-700 border border-indigo-200">
                  {proj.branch}
                </span>
                <h3 className="text-lg font-bold text-slate-900 mt-2 hover:text-indigo-600 transition-colors">
                  {proj.title}
                </h3>
                <p className="text-xs text-slate-500">Built by <strong className="text-slate-800">{proj.studentName}</strong></p>
              </div>

              <div className="flex items-center gap-3 text-xs font-bold text-slate-700 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200 shrink-0">
                <span className="flex items-center gap-1">⭐ {proj.stars}</span>
                <span className="flex items-center gap-1">🍴 {proj.forksCount}</span>
              </div>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">{proj.description}</p>

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {proj.tags.map((tag, i) => (
                <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200 font-medium">
                  #{tag}
                </span>
              ))}
            </div>

            {/* Alumni Code Review Badge */}
            {proj.alumniReview ? (
              <div className="p-3.5 rounded-xl bg-purple-50/70 border border-purple-200/80 space-y-1 text-xs">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-[11px] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-purple-600" />
                    Review by {proj.alumniReview.reviewer}
                  </span>
                  <span className="text-[10px] font-bold text-amber-600">★ {proj.alumniReview.rating}</span>
                </div>
                <p className="text-slate-700 text-[11px] italic">"{proj.alumniReview.comment}"</p>
              </div>
            ) : (
              <div className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-500 text-[11px] flex items-center justify-between">
                <span>Awaiting alumni code review...</span>
                <span className="text-[10px] font-bold text-indigo-600">Pending Review</span>
              </div>
            )}

            {/* Footer Buttons */}
            <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
              <a
                href={proj.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>GitHub Repo</span>
              </a>

              <a
                href={proj.demoUrl}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold shadow-sm transition-all"
              >
                <span>Live Demo</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

          </div>
        ))}
      </div>

      {/* Add Project Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 shadow-2xl space-y-4">
            <h3 className="text-lg font-bold text-slate-900">Submit Student Project / Fork</h3>
            <form onSubmit={handleAddProject} className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Project Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. SignBridge AI — ISL Gesture Translator"
                  value={pTitle}
                  onChange={(e) => setPTitle(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">GitHub Repository URL</label>
                <input
                  type="url"
                  placeholder="https://github.com/username/project"
                  value={pRepo}
                  onChange={(e) => setPRepo(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Tech Stack Tags (Comma Separated)</label>
                <input
                  type="text"
                  placeholder="PyTorch, React, FastAPI"
                  value={pTags}
                  onChange={(e) => setPTags(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Briefly describe what your project does..."
                  value={pDesc}
                  onChange={(e) => setPDesc(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 border border-slate-300 text-slate-900 text-xs focus:bg-white focus:border-indigo-600 focus:outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 text-slate-600 text-xs font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-indigo-600 text-white text-xs font-bold shadow-md"
                >
                  Add Project
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
