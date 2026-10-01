import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi } from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import { Code, Search, FlaskConical, ChevronLeft, ChevronRight, Play, X, ExternalLink, Terminal } from 'lucide-react';

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
  const diffColors = { easy: 'bg-emerald-50 text-emerald-700 border-emerald-200', medium: 'bg-amber-50 text-amber-700 border-amber-200', hard: 'bg-red-50 text-red-700 border-red-200' };

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

  const inputClass = "w-full pl-9 pr-3 py-2 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]";
  const inputStyle = { background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <DashboardLayout pageTitle="Coding Practice" role="student">
      <div className="space-y-6 max-w-7xl mx-auto">
        {/* Header & Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Coding Practice</h1>
            <p className="text-xs mt-1 flex items-center gap-2" style={{ color: 'var(--color-text-muted)' }}>
              <span>{filteredProblems.length} Problems Available</span>
              <span>•</span>
              <span className="font-semibold text-[var(--color-primary)]">18 Test Cases Each (3 Open • 15 Hidden)</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto">
            {/* Search Input */}
            <div className="relative flex-1 sm:w-64">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search 150 problems..."
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                className={inputClass}
                style={inputStyle}
              />
            </div>

            {/* Category Dropdown */}
            <select
              value={selectedCategory}
              onChange={(e) => { setSelectedCategory(e.target.value); setCurrentPage(1); }}
              className="px-3 py-2 rounded-lg border text-xs outline-none font-medium transition-colors focus:border-[var(--color-primary)]"
              style={inputStyle}
            >
              <option value="all">All Categories</option>
              {categoriesList.filter(c => c !== 'all').map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>

            {/* Difficulty Tabs */}
            <div className="flex p-1 rounded-lg border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {['all', 'easy', 'medium', 'hard'].map(f => (
                <button
                  key={f}
                  onClick={() => { setFilter(f); setCurrentPage(1); }}
                  className="px-3 py-1.5 rounded-md text-xs font-semibold transition-colors capitalize"
                  style={{
                    background: filter === f ? 'var(--color-primary)' : 'transparent',
                    color: filter === f ? '#ffffff' : 'var(--color-text-muted)',
                  }}
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
          <div className="text-center py-20 rounded-xl border shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <Code className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--color-text-muted)' }} />
            <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>No problems match your search criteria</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {paginatedProblems.map((p, i) => (
                <div
                  key={p.id || i}
                  className="rounded-xl p-5 border transition-all hover:shadow-xs flex flex-col justify-between group cursor-pointer"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0 font-bold text-xs" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                        #{p.id || (currentPage - 1) * itemsPerPage + i + 1}
                      </div>
                      <div className="flex items-center gap-1.5 flex-wrap justify-end">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border capitalize ${diffColors[p.difficulty] || diffColors.easy}`}>
                          {p.difficulty}
                        </span>
                        {p.category && (
                          <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                            {p.category}
                          </span>
                        )}
                      </div>
                    </div>

                    <h3 className="font-bold text-sm line-clamp-1 group-hover:text-[var(--color-primary)] transition-colors" style={{ color: 'var(--color-text)' }}>{p.title}</h3>
                    <p className="text-xs line-clamp-2 mt-1.5 min-h-[32px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{p.description}</p>
                    
                    {/* Test Cases Badge */}
                    <div className="mt-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md border text-[10px] font-semibold flex items-center gap-1" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                        <FlaskConical className="w-3 h-3" /> 18 Test Cases (3 Open • 15 Hidden)
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                    <button
                      onClick={() => navigate(`/student/code-editor?problem=${p.id}`)}
                      className="w-full py-2.5 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90 flex items-center justify-center gap-1.5 shadow-2xs"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      <Code className="w-3.5 h-3.5" /> Solve Problem
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-4 border-t text-xs" style={{ borderColor: 'var(--color-border)' }}>
                <p style={{ color: 'var(--color-text-muted)' }}>
                  Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, filteredProblems.length)} of {filteredProblems.length} problems
                </p>
                <div className="flex items-center gap-1">
                  <button
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    className="px-3 py-1.5 rounded-lg border text-xs font-semibold disabled:opacity-40 transition-colors hover:opacity-80"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className="w-8 h-8 rounded-lg text-xs font-semibold transition-colors"
                      style={{
                        background: currentPage === page ? 'var(--color-primary)' : 'var(--color-surface)',
                        color: currentPage === page ? '#ffffff' : 'var(--color-text)',
                        border: '1px solid var(--color-border)'
                      }}
                    >
                      {page}
                    </button>
                  ))}
                  <button
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    className="px-3 py-1.5 rounded-lg border text-xs font-semibold disabled:opacity-40 transition-colors hover:opacity-80"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Quick OneCompiler IDE Modal */}
        {playgroundModal && (
          <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
            <div className="rounded-xl w-full max-w-5xl border overflow-hidden shadow-xl flex flex-col max-h-[92vh]" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {/* Modal Header */}
              <div className="px-5 py-3 border-b flex items-center justify-between" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                    <Code className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>
                      {activeProblem ? activeProblem.title : 'OneCompiler Sandbox'}
                    </h3>
                    <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                      Connected to OneCompiler API Engine
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <select
                    value={selectedLang}
                    onChange={(e) => setSelectedLang(e.target.value)}
                    className="px-2.5 py-1.5 rounded-lg border text-xs outline-none font-medium"
                    style={inputStyle}
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
                    className="px-3.5 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-50 transition-colors flex items-center gap-1 shadow-2xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    {runningInModal ? 'Running...' : 'Run Code'}
                  </button>

                  {activeProblem && (
                    <button
                      onClick={() => navigate(`/student/code-editor?problem=${activeProblem.id}`)}
                      className="px-3 py-1.5 rounded-lg text-white text-xs font-semibold transition-colors hover:opacity-90 flex items-center gap-1 shadow-2xs"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      <ExternalLink className="w-3.5 h-3.5" /> Full Workspace
                    </button>
                  )}
                  <button
                    onClick={() => setPlaygroundModal(false)}
                    className="w-8 h-8 rounded-lg border flex items-center justify-center transition-colors hover:opacity-80"
                    style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Modal Body */}
              <div className="flex-1 p-3 overflow-y-auto" style={{ background: 'var(--color-background)' }}>
                {activeProblem ? (
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 h-full">
                    {/* Problem Statement Sidebar */}
                    <div className="lg:col-span-1 rounded-lg p-4 border max-h-[520px] overflow-y-auto text-xs space-y-3" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                      <div>
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold border ${diffColors[activeProblem.difficulty] || diffColors.easy}`}>
                          {activeProblem.difficulty}
                        </span>
                        {activeProblem.category && (
                          <span className="ml-2 font-medium text-xs" style={{ color: 'var(--color-text-muted)' }}>
                            {activeProblem.category}
                          </span>
                        )}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm mb-1" style={{ color: 'var(--color-text)' }}>
                          Problem Statement
                        </h4>
                        <p className="leading-relaxed whitespace-pre-wrap" style={{ color: 'var(--color-text-muted)' }}>
                          {activeProblem.description}
                        </p>
                      </div>
                      {activeProblem.constraints && (
                        <div>
                          <h5 className="font-semibold mb-0.5" style={{ color: 'var(--color-text)' }}>Constraints</h5>
                          <p className="font-mono text-[11px] whitespace-pre-wrap" style={{ color: 'var(--color-text-muted)' }}>{activeProblem.constraints}</p>
                        </div>
                      )}
                      {activeProblem.sampleInput && (
                        <div>
                          <h5 className="font-semibold mb-0.5" style={{ color: 'var(--color-text)' }}>Sample Input</h5>
                          <pre className="p-2 rounded-lg font-mono text-[11px] overflow-x-auto text-emerald-600 border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>{activeProblem.sampleInput}</pre>
                        </div>
                      )}
                      {activeProblem.sampleOutput && (
                        <div>
                          <h5 className="font-semibold mb-0.5" style={{ color: 'var(--color-text)' }}>Sample Output</h5>
                          <pre className="p-2 rounded-lg font-mono text-[11px] overflow-x-auto text-blue-600 border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>{activeProblem.sampleOutput}</pre>
                        </div>
                      )}

                      {/* Execution Output Panel */}
                      {modalOutputStatus !== 'idle' && (
                        <div className="pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                          <h5 className="font-semibold mb-1 flex items-center gap-1" style={{ color: 'var(--color-text)' }}>
                            <Terminal className="w-3.5 h-3.5" /> Run Output:
                          </h5>
                          <pre className={`p-2 rounded-lg font-mono text-[11px] whitespace-pre-wrap max-h-[140px] overflow-y-auto border ${
                            modalOutputStatus === 'error' ? 'bg-red-50 text-red-600 border-red-200' :
                            modalOutputStatus === 'success' ? 'bg-emerald-50 text-emerald-600 border-emerald-200' :
                            'bg-amber-50 text-amber-600 border-amber-200'
                          }`}>{modalOutput}</pre>
                        </div>
                      )}
                    </div>

                    {/* OneCompiler Editor */}
                    <div className="lg:col-span-2">
                      <iframe
                        src={`https://onecompiler.com/embed/${selectedLang}?theme=dark&codeChangeEvent=true`}
                        className="w-full h-[520px] border-0 rounded-lg"
                        title="OneCompiler Problem Editor"
                        allow="clipboard-write"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <iframe
                      src={`https://onecompiler.com/embed/${selectedLang}?theme=dark&codeChangeEvent=true`}
                      className="w-full h-[450px] border-0 rounded-lg"
                      title="OneCompiler Sandbox"
                      allow="clipboard-write"
                    />
                    {modalOutputStatus !== 'idle' && (
                      <div className="p-3 rounded-lg border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                        <p className="text-xs font-semibold mb-1 flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}><Terminal className="w-3.5 h-3.5" /> Output Console:</p>
                        <pre className={`text-xs font-mono whitespace-pre-wrap ${modalOutputStatus === 'error' ? 'text-red-500 font-semibold' : 'text-emerald-600 font-semibold'}`}>{modalOutput}</pre>
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
