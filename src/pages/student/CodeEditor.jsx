import { useState, useEffect, useRef, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { studentApi } from '../../utils/api';
import { useSearchParams } from 'react-router-dom';
import { Keyboard, Play, Send, FlaskConical, Check, X, Lock, Clock, Terminal, Trash2, Info, RotateCcw } from 'lucide-react';

// Language configuration map
const LANGUAGES = {
  python:     { label: 'Python',      ext: 'py',   placeholder: '# Write your solution here\n' },
  javascript: { label: 'JavaScript',  ext: 'js',   placeholder: '// Write your solution here\n' },
  typescript: { label: 'TypeScript',  ext: 'ts',   placeholder: '// Write your solution here\n' },
  java:       { label: 'Java',        ext: 'java', placeholder: '// Write your solution here\n' },
  cpp:        { label: 'C++',         ext: 'cpp',  placeholder: '// Write your solution here\n' },
  c:          { label: 'C',           ext: 'c',    placeholder: '// Write your solution here\n' },
  csharp:     { label: 'C#',          ext: 'cs',   placeholder: '// Write your solution here\n' },
  go:         { label: 'Go',          ext: 'go',   placeholder: '// Write your solution here\n' },
  rust:       { label: 'Rust',        ext: 'rs',   placeholder: '// Write your solution here\n' },
  php:        { label: 'PHP',         ext: 'php',  placeholder: '<?php\n// Write your solution here\n' },
  html:       { label: 'HTML',        ext: 'html', placeholder: '<!-- Write your solution here -->\n' },
  css:        { label: 'CSS',         ext: 'css',  placeholder: '/* Write your solution here */\n' },
  sql:        { label: 'SQL',         ext: 'sql',  placeholder: '-- Write your solution here\n' },
  json:       { label: 'JSON',        ext: 'json', placeholder: '{\n  \n}\n' },
  xml:        { label: 'XML',         ext: 'xml',  placeholder: '<!-- Write your solution here -->\n' },
  markdown:   { label: 'Markdown',    ext: 'md',   placeholder: '# Write your solution here\n' },
  ruby:       { label: 'Ruby',        ext: 'rb',   placeholder: '# Write your solution here\n' },
  swift:      { label: 'Swift',       ext: 'swift',placeholder: '// Write your solution here\n' },
  kotlin:     { label: 'Kotlin',      ext: 'kt',   placeholder: '// Write your solution here\n' },
  scala:      { label: 'Scala',       ext: 'scala', placeholder: '// Write your solution here\n' },
  r:          { label: 'R',           ext: 'r',    placeholder: '# Write your solution here\n' },
  dart:       { label: 'Dart',        ext: 'dart', placeholder: '// Write your solution here\n' },
  lua:        { label: 'Lua',         ext: 'lua',  placeholder: '-- Write your solution here\n' },
  perl:       { label: 'Perl',        ext: 'pl',   placeholder: '# Write your solution here\n' },
  bash:       { label: 'Bash',        ext: 'sh',   placeholder: '#!/bin/bash\n# Write your solution here\n' },
};

const CodeEditor = () => {
  const [searchParams] = useSearchParams();
  const problemId = searchParams.get('problem');
  const [problem, setProblem] = useState(null);
  const [language, setLanguage] = useState('python');
  const [output, setOutput] = useState('');
  const [outputStatus, setOutputStatus] = useState('idle'); // idle | running | success | error
  const [running, setRunning] = useState(false);
  const [loading, setLoading] = useState(!!problemId);
  const [stdin, setStdin] = useState('');
  const [showInput, setShowInput] = useState(false);
  const [executionTime, setExecutionTime] = useState(null);
  const [activeTab, setActiveTab] = useState('output'); // output | input

  const [testResults, setTestResults] = useState(null);
  const [testSummary, setTestSummary] = useState(null);

  const [oneCompilerCode, setOneCompilerCode] = useState('');
  const codeRef = useRef(LANGUAGES.python.placeholder);

  // OneCompiler postMessage listener to capture code from iframe
  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && typeof event.data === 'object') {
        const receivedCode = event.data.code || event.data.files?.[0]?.content;
        if (receivedCode) {
          setOneCompilerCode(receivedCode);
          codeRef.current = receivedCode;
        }
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, []);

  // Get current code from active editor
  const getCode = useCallback(() => {
    if (oneCompilerCode.trim()) {
      return oneCompilerCode;
    }
    return codeRef.current;
  }, [oneCompilerCode]);

  useEffect(() => {
    if (problemId) {
      const fetchProblem = async () => {
        const res = await studentApi.getCodingProblem(problemId);
        if (res.success) {
          setProblem(res.problem);
          if (res.problem.sampleInput) setStdin(res.problem.sampleInput);
        }
        setLoading(false);
      };
      fetchProblem();
    }
  }, [problemId]);

  const handleRun = async () => {
    const code = getCode();
    if (!code.trim()) {
      setOutput('Please write some code before running.');
      setOutputStatus('error');
      return;
    }

    setRunning(true);
    setOutputStatus('running');
    setOutput('Compiling and executing...');
    setActiveTab('output');
    setExecutionTime(null);

    const startTime = performance.now();

    try {
      const res = await studentApi.executeCode({ code, language, stdin });
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecutionTime(elapsed);

      if (res.success) {
        setOutput(res.output || '(No output)');
        setOutputStatus(res.status === 'error' ? 'error' : 'success');
      } else {
        setOutput(res.message || 'Error executing code.');
        setOutputStatus('error');
      }
    } catch (err) {
      setOutput('Network error. Please check your connection and try again.');
      setOutputStatus('error');
    }

    setRunning(false);
  };

  const handleSubmit = async () => {
    if (!problemId) return;
    const code = getCode();
    if (!code || !code.trim()) {
      Swal.fire({ ...getSwalOpts(), icon: 'warning', title: 'Empty Code', text: 'Please write your code solution before submitting.' });
      return;
    }

    setRunning(true);
    setOutputStatus('running');
    setOutput('Evaluating all 18 test cases (3 Open + 15 Hidden)... Please wait.');
    setActiveTab('output');

    const startTime = performance.now();
    try {
      const res = await studentApi.submitCode(problemId, { code, language, stdin });
      const elapsed = ((performance.now() - startTime) / 1000).toFixed(2);
      setExecutionTime(elapsed);
      setRunning(false);

      if (res.data?.testResults) {
        setTestResults(res.data.testResults);
        setTestSummary({
          passedCount: res.data.passedCount,
          totalCount: res.data.totalCount
        });
      }

      const passedCount = res.data?.passedCount ?? 0;
      const totalCount = res.data?.totalCount ?? 18;

      if (res.success && res.data?.status === 'accepted') {
        Swal.fire({
          ...getSwalOpts(),
          icon: 'success',
          title: '🎉 Solution Accepted!',
          html: `<div class="text-left space-y-2 text-xs">
            <p class="text-sm font-semibold text-green-600">All Test Cases Passed!</p>
            <p>Your solution passed <b>all ${passedCount}/${totalCount} test cases</b> (3 Open + 15 Hidden).</p>
            <p class="text-gray-500">Problem marked as Solved.</p>
          </div>`
        });
        setOutput(`✅ SUBMISSION ACCEPTED: All ${passedCount}/${totalCount} test cases passed! (3 Open + 15 Hidden)`);
        setOutputStatus('success');
      } else {
        Swal.fire({
          ...getSwalOpts(),
          icon: 'error',
          title: '❌ Submission Rejected',
          html: `<div class="text-left space-y-2 text-xs">
            <p class="text-sm font-semibold text-red-500">Test Cases Failed (${passedCount}/${totalCount} Passed)</p>
            <p>You passed <b>${passedCount}</b> out of <b>${totalCount}</b> test cases.</p>
            <p class="text-gray-600 font-medium">⚠️ You must pass ALL ${totalCount} test cases (including all 15 hidden test cases) to submit successfully.</p>
          </div>`
        });
        setOutput(`❌ SUBMISSION REJECTED: ${passedCount}/${totalCount} test cases passed (${totalCount - passedCount} failed).\n\nReview the Test Cases panel to view status details for open and hidden test cases.`);
        setOutputStatus('error');
      }
    } catch (err) {
      setRunning(false);
      const resData = err.response?.data;
      if (resData?.data?.testResults) {
        setTestResults(resData.data.testResults);
        setTestSummary({
          passedCount: resData.data.passedCount,
          totalCount: resData.data.totalCount
        });
      }
      const passedCount = resData?.data?.passedCount ?? 0;
      const totalCount = resData?.data?.totalCount ?? 18;

      Swal.fire({
        ...getSwalOpts(),
        icon: 'error',
        title: '❌ Submission Rejected',
        html: `<div class="text-left space-y-2 text-xs">
          <p class="text-sm font-semibold text-red-500">Test Cases Failed (${passedCount}/${totalCount} Passed)</p>
          <p>You passed <b>${passedCount}</b> out of <b>${totalCount}</b> test cases.</p>
          <p class="text-gray-600 font-medium">⚠️ You must pass ALL ${totalCount} test cases (including all 15 hidden test cases) to submit successfully.</p>
        </div>`
      });
      setOutput(`❌ SUBMISSION REJECTED: ${passedCount}/${totalCount} test cases passed (${totalCount - passedCount} failed).\n\nReview the Test Cases panel to view status details for open and hidden test cases.`);
      setOutputStatus('error');
    }
  };

  const handleLanguageChange = (e) => {
    const newLang = e.target.value;
    setLanguage(newLang);
  };

  const handleClearOutput = () => {
    setOutput('');
    setOutputStatus('idle');
    setExecutionTime(null);
  };

  const langConfig = LANGUAGES[language] || LANGUAGES.python;
  const diffColors = { easy: 'bg-emerald-50 text-emerald-700 border-emerald-200', medium: 'bg-amber-50 text-amber-700 border-amber-200', hard: 'bg-red-50 text-red-700 border-red-200' };

  const outputStatusColors = {
    idle:    'text-[var(--color-text-muted)]',
    running: 'text-amber-500',
    success: 'text-emerald-500',
    error:   'text-red-500',
  };

  const openTestResults = testResults ? testResults.slice(0, 3) : null;
  const hiddenTestResults = testResults ? testResults.slice(3) : null;

  if (loading) {
    return (
      <DashboardLayout pageTitle="Code Editor" role="student">
        <Loader fullPage text="Loading problem details..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="Code Editor" role="student">
      <div className="space-y-4 h-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>{problem ? problem.title : 'Code Editor'}</h1>
            {problem && (
              <div className="flex items-center gap-2 mt-1">
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold border ${diffColors[problem.difficulty] || ''}`}>{problem.difficulty}</span>
                {problem.category && <span className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{problem.category}</span>}
              </div>
            )}
          </div>
          <div className="flex items-center gap-2">
            <select
              value={language}
              onChange={handleLanguageChange}
              className="px-3 py-2 rounded-lg border text-xs outline-none font-medium transition-colors focus:border-[var(--color-primary)]"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              {Object.entries(LANGUAGES).map(([key, lang]) => (
                <option key={key} value={key}>{lang.label}</option>
              ))}
            </select>

            <button
              onClick={() => { setShowInput(!showInput); setActiveTab('input'); }}
              className="px-3.5 py-2 rounded-lg border text-xs font-semibold transition-colors flex items-center gap-1.5 shadow-2xs hover:opacity-90"
              style={{
                background: showInput ? 'var(--color-primary)' : 'var(--color-surface)',
                borderColor: showInput ? 'var(--color-primary)' : 'var(--color-border)',
                color: showInput ? '#ffffff' : 'var(--color-text-muted)'
              }}
            >
              <Keyboard className="w-3.5 h-3.5" />
              Input
            </button>

            <button
              onClick={handleRun}
              disabled={running}
              className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold disabled:opacity-50 flex items-center gap-1.5 shadow-2xs transition-colors"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              {running ? 'Running...' : 'Run'}
            </button>

            {problemId && (
              <button
                onClick={handleSubmit}
                disabled={running}
                className="px-4 py-2 rounded-lg text-white text-xs font-semibold disabled:opacity-50 flex items-center gap-1.5 shadow-2xs transition-colors hover:opacity-90"
                style={{ background: 'var(--color-primary)' }}
              >
                <Send className="w-3.5 h-3.5" />
                {running ? 'Evaluating...' : 'Submit'}
              </button>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Problem description panel */}
          {problem && (
            <div className="lg:col-span-1 rounded-xl p-5 border max-h-[70vh] overflow-y-auto shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <h3 className="font-bold text-sm mb-3" style={{ color: 'var(--color-text)' }}>Problem Description</h3>
              <p className="text-xs whitespace-pre-wrap mb-4 leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>{problem.description}</p>
              {problem.constraints && (
                <>
                  <h4 className="font-semibold text-xs mb-1" style={{ color: 'var(--color-text)' }}>Constraints</h4>
                  <p className="text-xs mb-3 whitespace-pre-wrap font-mono" style={{ color: 'var(--color-text-muted)' }}>{problem.constraints}</p>
                </>
              )}
              
              {/* Test Cases Summary */}
              <div className="my-4 pt-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-semibold text-xs flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <FlaskConical className="w-3.5 h-3.5 text-[var(--color-primary)]" /> Test Cases (18 Total)
                  </h4>
                  {testSummary ? (
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold border ${testSummary.passedCount === testSummary.totalCount ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-red-50 text-red-700 border-red-200'}`}>
                      {testSummary.passedCount}/{testSummary.totalCount} Passed
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full font-medium border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                      3 Open • 15 Hidden
                    </span>
                  )}
                </div>

                {/* 3 Open Test Cases */}
                <div className="space-y-2 mb-3">
                  <span className="text-[11px] font-semibold block" style={{ color: 'var(--color-text-muted)' }}>Open Test Cases (Sample)</span>
                  {(problem.openTestCases || [
                    { id: 1, input: problem.sampleInput || 'Sample 1', output: problem.sampleOutput || 'Output 1' },
                    { id: 2, input: 'Sample Input 2', output: 'Sample Output 2' },
                    { id: 3, input: 'Sample Input 3', output: 'Sample Output 3' }
                  ]).slice(0, 3).map((tc, idx) => {
                    const res = openTestResults ? openTestResults[idx] : null;
                    return (
                      <div key={tc.id || idx} className={`p-2.5 rounded-lg border text-[11px] transition-colors ${res ? (res.passed ? 'bg-emerald-50/60 border-emerald-200' : 'bg-red-50/60 border-red-200') : 'bg-[var(--color-background)] border-[var(--color-border)]'}`}>
                        <div className="flex items-center justify-between font-medium mb-1" style={{ color: 'var(--color-text)' }}>
                          <span>Open Case {idx + 1}</span>
                          {res ? (
                            res.passed ? (
                              <span className="text-[9px] bg-emerald-100 text-emerald-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                                <Check className="w-3 h-3" /> Passed
                              </span>
                            ) : (
                              <span className="text-[9px] bg-red-100 text-red-700 px-1.5 py-0.5 rounded font-bold flex items-center gap-0.5">
                                <X className="w-3 h-3" /> Failed
                              </span>
                            )
                          ) : (
                            <span className="text-[9px] bg-emerald-50 text-emerald-700 border border-emerald-200 px-1.5 py-0.5 rounded">Visible</span>
                          )}
                        </div>
                        <div className="text-[10px] font-mono space-y-0.5" style={{ color: 'var(--color-text-muted)' }}>
                          <div><span className="font-sans font-semibold">In:</span> {tc.input}</div>
                          <div><span className="font-sans font-semibold">Out:</span> {tc.output}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* 15 Hidden Test Cases Status Badges */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-semibold block" style={{ color: 'var(--color-text-muted)' }}>15 Hidden Test Cases</span>
                    {hiddenTestResults && (
                      <span className="text-[10px] font-mono" style={{ color: 'var(--color-text-muted)' }}>
                        {hiddenTestResults.filter(r => r.passed).length}/15 Passed
                      </span>
                    )}
                  </div>
                  <div className="grid grid-cols-5 gap-1.5">
                    {Array.from({ length: 15 }, (_, i) => {
                      const res = hiddenTestResults ? hiddenTestResults[i] : null;
                      if (!res) {
                        return (
                          <div key={i} className="px-1.5 py-1 rounded-lg text-[9px] font-mono text-center border flex items-center justify-center gap-0.5" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }} title={`Hidden Test Case #${i + 1} (Locked)`}>
                            <Lock className="w-2.5 h-2.5 text-amber-500" /> H{i + 1}
                          </div>
                        );
                      }
                      return res.passed ? (
                        <div key={i} className="px-1.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-mono text-center border border-emerald-200 text-[9px] flex items-center justify-center gap-0.5 font-bold" title={`Hidden Test Case #${i + 1}: Passed`}>
                          <Check className="w-3 h-3 text-emerald-600" /> H{i + 1}
                        </div>
                      ) : (
                        <div key={i} className="px-1.5 py-1 rounded-lg bg-red-50 text-red-700 font-mono text-center border border-red-200 text-[9px] flex items-center justify-center gap-0.5 font-bold" title={`Hidden Test Case #${i + 1}: Failed`}>
                          <X className="w-3 h-3 text-red-600" /> H{i + 1}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Editor + I/O panels */}
          <div className={`${problem ? 'lg:col-span-2' : 'lg:col-span-3'} space-y-4`}>
            {/* Code Editor Container */}
            <div className="rounded-xl border overflow-hidden shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <div className="px-4 py-2 border-b flex items-center justify-between" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-400"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-400"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-400"></div>
                  <span className="ml-2 text-xs font-mono font-medium" style={{ color: 'var(--color-text)' }}>solution.{langConfig.ext}</span>
                </div>
                <div className="flex items-center gap-3 text-[10px]" style={{ color: 'var(--color-text-muted)' }}>
                  <span>{langConfig.label}</span>
                  {executionTime && (
                    <span className="text-emerald-600 flex items-center gap-0.5 font-semibold">
                      <Clock className="w-3 h-3" />{executionTime}s
                    </span>
                  )}
                </div>
              </div>

              {/* OneCompiler Embedded Editor */}
              <div>
                <iframe
                  src={`https://onecompiler.com/embed/${language}?theme=dark&codeChangeEvent=true&listenToEvents=true`}
                  className="w-full h-[460px] border-0"
                  title="OneCompiler Embedded Code Editor"
                  allow="clipboard-write"
                />
              </div>
            </div>

            {/* Input / Output Panel */}
            <div className="rounded-xl border overflow-hidden shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {/* Tab header */}
              <div className="px-4 py-2 border-b flex items-center justify-between" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setActiveTab('output')}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    style={{
                      background: activeTab === 'output' ? 'var(--color-surface)' : 'transparent',
                      color: activeTab === 'output' ? 'var(--color-text)' : 'var(--color-text-muted)'
                    }}
                  >
                    <Terminal className={`w-3.5 h-3.5 ${outputStatusColors[outputStatus]}`} />
                    Output
                  </button>

                  <button
                    onClick={() => { setActiveTab('input'); setShowInput(true); }}
                    className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    style={{
                      background: activeTab === 'input' ? 'var(--color-surface)' : 'transparent',
                      color: activeTab === 'input' ? 'var(--color-text)' : 'var(--color-text-muted)'
                    }}
                  >
                    <Keyboard className="w-3.5 h-3.5" />
                    Input (stdin)
                    {stdin.trim() && <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  {outputStatus !== 'idle' && outputStatus !== 'running' && (
                    <button onClick={handleClearOutput} className="text-[10px] flex items-center gap-1 transition-colors hover:opacity-80" style={{ color: 'var(--color-text-muted)' }}>
                      <Trash2 className="w-3 h-3" /> Clear
                    </button>
                  )}
                </div>
              </div>

              {/* Output tab */}
              {activeTab === 'output' && (
                <div className="relative">
                  {outputStatus === 'running' && (
                    <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 via-blue-500 to-indigo-500 animate-pulse"></div>
                  )}
                  <pre className={`p-4 text-xs font-mono min-h-[100px] max-h-[200px] overflow-auto whitespace-pre-wrap ${
                    outputStatus === 'error' ? 'text-red-500 font-semibold' : 
                    outputStatus === 'success' ? 'text-emerald-600 font-semibold' : 
                    outputStatus === 'running' ? 'text-amber-600 font-semibold' : 
                    'text-[var(--color-text-muted)]'
                  }`}>{output || 'Click "Run" to execute your code. Your code runs on a real server — output, errors, and inputs are all live.'}</pre>
                </div>
              )}

              {/* Input tab */}
              {activeTab === 'input' && (
                <div className="p-4">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-[11px] flex items-center gap-1" style={{ color: 'var(--color-text-muted)' }}>
                      <Info className="w-3.5 h-3.5 text-[var(--color-primary)] shrink-0" />
                      Provide input values your program will read (e.g., via <code className="px-1 rounded text-[10px] border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>input()</code> in Python, <code className="px-1 rounded text-[10px] border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>scanf</code> in C, <code className="px-1 rounded text-[10px] border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>Scanner</code> in Java)
                    </p>
                    {stdin.trim() && (
                      <button onClick={() => setStdin('')} className="text-[10px] text-red-500 hover:underline flex items-center gap-0.5">
                        <X className="w-3 h-3" /> Clear
                      </button>
                    )}
                  </div>
                  <textarea
                    value={stdin}
                    onChange={(e) => setStdin(e.target.value)}
                    placeholder="Enter input values here, one per line...&#10;&#10;Example:&#10;5&#10;hello world&#10;3.14"
                    spellCheck={false}
                    className="w-full h-[120px] font-mono text-xs p-3 rounded-lg outline-none resize-none border transition-colors focus:border-[var(--color-primary)]"
                    style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{stdin ? `${stdin.split('\n').length} line(s)` : 'No input provided'}</p>
                    {problem?.sampleInput && stdin !== problem.sampleInput && (
                      <button onClick={() => setStdin(problem.sampleInput)} className="text-[10px] font-semibold text-[var(--color-primary)] hover:underline flex items-center gap-1">
                        <RotateCcw className="w-3 h-3" /> Use sample input
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CodeEditor;