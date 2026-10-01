import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi } from '../../utils/api';

import { useNavigate } from 'react-router-dom';

const CodingPractice = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const [playgroundModal, setPlaygroundModal] = useState(false);
  const [activeProblem, setActiveProblem] = useState(null);
  const [selectedLang, setSelectedLang] = useState('python');
  
  // Quick Try execution state
  const [modalCode, setModalCode] = useState('');
  const [modalStdin, setModalStdin] = useState('');
  const [modalOutput, setModalOutput] = useState('');
  const [modalOutputStatus, setModalOutputStatus] = useState('idle'); // idle | running | success | error
  const [runningInModal, setRunningInModal] = useState(false);

  const navigate = useNavigate();

  const fetchProblems = useCallback(async () => {
    const res = await studentApi.getCodingProblems();
    if (res.success) setProblems(res.problems || []);
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchProblems();
  }, [fetchProblems]);

  // Listen to OneCompiler postMessage events inside modal
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && typeof event.data === 'object') {
        const receivedCode = event.data.code || event.data.files?.[0]?.content;
        if (receivedCode) {
          setModalCode(receivedCode);
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Filter problems by difficulty, category, and search query
  const filteredProblems = problems.filter(p => {
    const matchDiff = filter === 'all' || p.difficulty === filter;
    const matchCat = selectedCategory === 'all' || p.category === selectedCategory;
    const matchQuery = !searchQuery.trim() || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.category && p.category.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchDiff && matchCat && matchQuery;
  });

  const categoriesList = ['all', ...new Set(problems.map(p => p.category).filter(Boolean))];
  const diffColors = { easy: 'bg-green-100 text-green-700 dark-theme:bg-green-900/40 dark-theme:text-green-300', medium: 'bg-amber-100 text-amber-700 dark-theme:bg-amber-900/40 dark-theme:text-amber-300', hard: 'bg-red-100 text-red-700 dark-theme:bg-red-900/40 dark-theme:text-red-300' };

  // Pagination calculation
  const totalPages = Math.ceil(filteredProblems.length / itemsPerPage) || 1;
  const paginatedProblems = filteredProblems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleRunInModal = async () => {
    const codeToRun = modalCode.trim();
    if (!codeToRun) {
      setModalOutput('Please write or edit code in the editor before running.');
      setModalOutputStatus('error');
      return;
    }

    setRunningInModal(true);
    setModalOutputStatus('running');
    setModalOutput('Executing via OneCompiler API...');

    const inputToUse = modalStdin || activeProblem?.sampleInput || '';

    try {
      const res = await studentApi.executeCode({
        code: codeToRun,
        language: selectedLang,
        stdin: inputToUse,
      });

      if (res.success) {
        setModalOutput(res.output || '(No output)');
        setModalOutputStatus(res.status === 'error' ? 'error' : 'success');
      } else {
        setModalOutput(res.message || 'Execution error.');
        setModalOutputStatus('error');
      }
    } catch (err) {
      setModalOutput('Network error executing code.');
      setModalOutputStatus('error');
    }

    setRunningInModal(false);
  };

  return (
    <DashboardLayout pageTitle="Coding Practice" role="student">
      <div className="space-y-6">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Coding Practice</h1>
            <p className="text-xs text-gray-500 mt-1 flex items-center gap-2">
              <span>{filteredProblems.length} Problems Available</span>
              <span className="text-gray-300">•</span>
              <span className="text-primary font-medium">18 Test Cases Each (3 Open • 15 Hidden)</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
              <input
                type="text"
                placeholder="Search 150 problems..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className="w-full pl-8 pr-3 py-2 rounded-xl bg-white dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-xs outline-none focus:border-primary transition-colors"
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 rounded-xl bg-white dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-xs outline-none font-medium"
            >
              <option value="all">All Categories</option>
              {categoriesList.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Difficulty Tabs */}
            <div className="flex bg-cream dark-theme:bg-gray-800 rounded-xl p-1 border border-sand/50 dark-theme:border-gray-700">
              {['all', 'easy', 'medium', 'hard'].map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setCurrentPage(1); }}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors capitalize ${
                    filter === f ? 'bg-primary text-white shadow-sm' : 'text-gray-500 hover:text-gray-700 dark-theme:text-gray-400'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>
        </div>

        {loading ? (
          <Loader text="Loading coding problems..." />
        ) : filteredProblems.length === 0 ? (

          <div className="text-center py-20 text-gray-400">
            <i className="ri-code-s-slash-line text-4xl mb-3 block"></i>
            <p className="text-sm">No problems match your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedProblems.map((p, i) => (
                <div
                  key={p.id || i}
                  className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:shadow-lg transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-bold text-primary">#{p.id || (currentPage - 1) * itemsPerPage + i + 1}</span>
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold capitalize ${diffColors[p.difficulty] || diffColors.easy}`}>
                          {p.difficulty}
                        </span>
                        {p.category && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-gray-100 dark-theme:bg-gray-800 text-gray-600 dark-theme:text-gray-400">
                            {p.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-base line-clamp-1">{p.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1.5 min-h-[32px] leading-relaxed">{p.description}</p>
                    
                    {/* Test Cases Badge (3 Open • 15 Hidden) */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded-md bg-blue-50 dark-theme:bg-blue-900/30 text-blue-600 dark-theme:text-blue-300 text-[10px] font-medium flex items-center gap-1">
                        <i className="ri-flask-line"></i> 18 Test Cases (3 Open • 15 Hidden)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-sand/50 dark-theme:border-gray-800">
                    <button
                      onClick={() => navigate(`/student/code-editor?problem=${p.id}`)}
                      className="w-full py-2.5 rounded-xl bg-primary hover:bg-primary-dark text-white text-xs font-semibold transition-all flex items-center justify-center gap-1.5 shadow-sm"
                    >
                      <i className="ri-code-line text-sm"></i> Solve
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t border-sand dark-theme:border-gray-800 text-xs">
                <p className="text-gray-500">
                  Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length} problems
                </p>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border border-sand dark-theme:border-gray-700 bg-white dark-theme:bg-gray-800 text-gray-600 dark-theme:text-gray-300 disabled:opacity-40"
                  >
                    Previous
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`w-8 h-8 rounded-lg font-medium ${currentPage === page ? 'bg-primary text-white' : 'hover:bg-cream dark-theme:hover:bg-gray-800 text-gray-600 dark-theme:text-gray-400'}`}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border border-sand dark-theme:border-gray-700 bg-white dark-theme:bg-gray-800 text-gray-600 dark-theme:text-gray-300 disabled:opacity-40"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Quick OneCompiler IDE Modal */}
        {playgroundModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl w-full max-w-5xl border border-sand dark-theme:border-gray-800 overflow-hidden shadow-2xl flex flex-col max-h-[92vh]">
              {/* Modal Header */}
              <div className="px-5 py-3 bg-cream dark-theme:bg-gray-800 border-b border-sand dark-theme:border-gray-700 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                    <i className="ri-code-box-line text-lg"></i>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-sm">
                      {activeProblem ? activeProblem.title : 'OneCompiler Sandbox'}
                    </h3>
                    <p className="text-[11px] text-gray-500">
                      Connected to OneCompiler API Engine
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg bg-white dark-theme:bg-gray-700 border border-sand dark-theme:border-gray-600 text-xs outline-none"
                  >
                    <option value="python">Python</option>
                    <option value="javascript">JavaScript</option>
                    <option value="java">Java</option>
                    <option value="cpp">C++</option>
                    <option value="c">C</option>
                    <option value="csharp">C#</option>
                    <option value="go">Go</option>
                    <option value="rust">Rust</option>
                  </select>

                  <button
                    onClick={handleRunInModal}
                    disabled={runningInModal}
                    className="px-3.5 py-1.5 rounded-lg bg-green-500 text-white text-xs font-semibold hover:bg-green-600 disabled:opacity-50 transition-colors flex items-center gap-1"
                  >
                    <i className="ri-play-line"></i>
                    {runningInModal ? 'Running...' : 'Run Code'}
                  </button>

                  {activeProblem && (
                    <button
                      onClick={() => navigate(`/student/code-editor?problem=${activeProblem.id}`)}
                      className="px-3 py-1.5 rounded-lg bg-primary text-white text-xs font-medium hover:bg-primary-dark transition-colors flex items-center gap-1"
                    >
                      <i className="ri-external-link-line"></i> Full Workspace
                    </button>
                  )}
                  <button
                    onClick={() => setPlaygroundModal(false)}
                    className="w-8 h-8 rounded-lg hover:bg-gray-200 dark-theme:hover:bg-gray-700 flex items-center justify-center text-gray-500 hover:text-gray-800 transition-colors"
                  >
                    <i className="ri-close-line text-lg"></i>
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 bg-gray-950 p-3 overflow-y-auto">
                {activeProblem ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-full">
                    {/* Problem Statement Sidebar */}
                    <div className="lg:col-span-1 bg-white dark-theme:bg-gray-900 rounded-xl p-4 border border-sand dark-theme:border-gray-800 max-h-[520px] overflow-y-auto text-xs space-y-3">
                      <div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${diffColors[activeProblem.difficulty] || diffColors.easy}`}>
                          {activeProblem.difficulty}
                        </span>
                        {activeProblem.category && (
                          <span className="ml-2 text-gray-400 dark-theme:text-gray-500 font-medium">
                            {activeProblem.category}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-800 dark-theme:text-gray-100 text-sm mb-1">
                          Problem Statement
                        </h4>
                        <p className="text-gray-600 dark-theme:text-gray-300 leading-relaxed whitespace-pre-wrap">
                          {activeProblem.description}
                        </p>
                      </div>
                      {activeProblem.constraints && (
                        <div>
                          <h5 className="font-semibold text-gray-700 dark-theme:text-gray-300 mb-0.5">Constraints</h5>
                          <p className="text-gray-500 font-mono text-[11px] whitespace-pre-wrap">{activeProblem.constraints}</p>
                        </div>
                      )}
                      {activeProblem.sampleInput && (
                        <div>
                          <h5 className="font-semibold text-gray-700 dark-theme:text-gray-300 mb-0.5">Sample Input</h5>
                          <pre className="bg-cream dark-theme:bg-gray-800 p-2 rounded-lg font-mono text-[11px] overflow-x-auto text-green-400">{activeProblem.sampleInput}</pre>
                        </div>
                      )}
                      {activeProblem.sampleOutput && (
                        <div>
                          <h5 className="font-semibold text-gray-700 dark-theme:text-gray-300 mb-0.5">Sample Output</h5>
                          <pre className="bg-cream dark-theme:bg-gray-800 p-2 rounded-lg font-mono text-[11px] overflow-x-auto text-blue-400">{activeProblem.sampleOutput}</pre>
                        </div>
                      )}

                      {/* Execution Output Panel */}
                      {modalOutputStatus !== 'idle' && (
                        <div className="pt-2 border-t border-sand dark-theme:border-gray-800">
                          <h5 className="font-semibold text-gray-700 dark-theme:text-gray-300 mb-1 flex items-center gap-1">
                            <i className="ri-terminal-line"></i> Run Output:
                          </h5>
                          <pre className={`p-2 rounded-lg font-mono text-[11px] whitespace-pre-wrap max-h-[140px] overflow-y-auto ${
                            modalOutputStatus === 'error' ? 'bg-red-950/40 text-red-400 border border-red-900/50' :
                            modalOutputStatus === 'success' ? 'bg-green-950/40 text-green-400 border border-green-900/50' :
                            'bg-amber-950/40 text-amber-400 border border-amber-900/50'
                          }`}>{modalOutput}</pre>
                        </div>
                      )}
                    </div>

                    {/* OneCompiler Editor */}
                    <div className="lg:col-span-2">
                      <iframe
                        src={`https://onecompiler.com/embed/${selectedLang}?theme=dark&codeChangeEvent=true`}
                        className="w-full h-[520px] border-0 rounded-xl"
                        title="OneCompiler Problem Editor"
                        allow="clipboard-write"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <iframe
                      src={`https://onecompiler.com/embed/${selectedLang}?theme=dark&codeChangeEvent=true`}
                      className="w-full h-[450px] border-0 rounded-xl"
                      title="OneCompiler Sandbox"
                      allow="clipboard-write"
                    />
                    {modalOutputStatus !== 'idle' && (
                      <div className="bg-gray-900 p-3 rounded-xl border border-gray-800">
                        <p className="text-xs font-semibold text-gray-400 mb-1"><i className="ri-terminal-line mr-1"></i>Output Console:</p>
                        <pre className={`text-xs font-mono whitespace-pre-wrap ${modalOutputStatus === 'error' ? 'text-red-400' : 'text-green-400'}`}>{modalOutput}</pre>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CodingPractice;
