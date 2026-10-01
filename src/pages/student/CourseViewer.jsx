import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';
import {
  ArrowLeft, BookOpen, FileText, Video, FileCode, Check, Search,
  ChevronDown, ChevronUp, ExternalLink, Info, ChevronLeft, ChevronRight,
  QrCode, BarChart2, Clock, Calendar, Play
} from 'lucide-react';

// Helper component to render rich text & code snippets for course reading lessons
const TextLessonRenderer = ({ contentText }) => {
  const [copiedCodeIndex, setCopiedCodeIndex] = useState(null);

  if (!contentText) return null;

  const handleCopyCode = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCodeIndex(index);
    setTimeout(() => setCopiedCodeIndex(null), 2000);
  };

  // Simple, robust markdown-like parser for lesson reading materials
  const renderFormattedContent = (text) => {
    const lines = text.split('\n');
    const elements = [];
    let inCodeBlock = false;
    let codeLanguage = '';
    let currentCodeBuffer = [];
    let inTable = false;
    let tableRows = [];
    let listBuffer = [];
    let listType = null;
    let codeBlockCount = 0;

    const flushList = (key) => {
      if (listBuffer.length > 0) {
        if (listType === 'ol') {
          elements.push(
            <ol key={key} className="list-decimal list-inside space-y-1 my-3 text-sm pl-2" style={{ color: 'var(--color-text)' }}>
              {listBuffer.map((item, idx) => <li key={idx}>{parseInlineFormatting(item)}</li>)}
            </ol>
          );
        } else {
          elements.push(
            <ul key={key} className="list-disc list-inside space-y-1 my-3 text-sm pl-2" style={{ color: 'var(--color-text)' }}>
              {listBuffer.map((item, idx) => <li key={idx}>{parseInlineFormatting(item)}</li>)}
            </ul>
          );
        }
        listBuffer = [];
        listType = null;
      }
    };

    const flushTable = (key) => {
      if (tableRows.length > 0) {
        const headerRow = tableRows[0];
        const bodyRows = tableRows.slice(1).filter(r => !r.every(c => c.trim().startsWith('---') || c.trim() === ''));

        elements.push(
          <div key={key} className="overflow-x-auto my-4 rounded-xl border shadow-2xs" style={{ borderColor: 'var(--color-border)' }}>
            <table className="w-full text-left text-xs border-collapse">
              {headerRow && (
                <thead>
                  <tr className="border-b" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                    {headerRow.map((cell, cIdx) => (
                      <th key={cIdx} className="px-3.5 py-2.5 font-bold" style={{ color: 'var(--color-text)' }}>
                        {parseInlineFormatting(cell.trim())}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-slate-50 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2" style={{ color: 'var(--color-text)' }}>
                        {parseInlineFormatting(cell.trim())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
    };

    const parseInlineFormatting = (inlineText) => {
      if (!inlineText) return null;

      const inlineRegex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|__[^_]+__|_[^_]+_)/g;
      const tokens = inlineText.split(inlineRegex);

      return tokens.map((token, i) => {
        if (token.startsWith('`') && token.endsWith('`')) {
          return (
            <code key={i} className="px-1.5 py-0.5 rounded font-mono text-[13px] border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
              {token.slice(1, -1)}
            </code>
          );
        } else if ((token.startsWith('**') && token.endsWith('**')) || (token.startsWith('__') && token.endsWith('__'))) {
          return <strong key={i} className="font-bold" style={{ color: 'var(--color-text)' }}>{token.slice(2, -2)}</strong>;
        } else if ((token.startsWith('*') && token.endsWith('*')) || (token.startsWith('_') && token.endsWith('_'))) {
          return <em key={i} className="italic" style={{ color: 'var(--color-text)' }}>{token.slice(1, -1)}</em>;
        }
        return token;
      });
    };

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];

      // Code blocks ```
      if (line.trim().startsWith('```')) {
        if (inCodeBlock) {
          // Flush code block
          const codeString = currentCodeBuffer.join('\n');
          const currentBlockIdx = codeBlockCount;
          const isCopied = copiedCodeIndex === currentBlockIdx;

          elements.push(
            <div key={`code-${i}`} className="my-4 rounded-xl overflow-hidden border border-gray-800 bg-gray-950 text-gray-100 font-mono text-xs shadow-md">
              <div className="px-4 py-2 bg-gray-900 border-b border-gray-800 flex items-center justify-between text-[11px] text-gray-400">
                <span className="uppercase tracking-wider font-semibold text-primary">{codeLanguage || 'code'}</span>
                <button
                  onClick={() => handleCopyCode(codeString, currentBlockIdx)}
                  className="px-2.5 py-1 rounded bg-gray-800 hover:bg-gray-700 text-gray-200 transition-colors flex items-center gap-1.5 text-[11px]"
                >
                  <i className={isCopied ? "ri-check-line text-green-400" : "ri-file-copy-line"}></i>
                  {isCopied ? "Copied!" : "Copy Code"}
                </button>
              </div>
              <pre className="p-4 overflow-x-auto leading-relaxed text-gray-200">
                <code>{codeString}</code>
              </pre>
            </div>
          );

          codeBlockCount++;
          currentCodeBuffer = [];
          inCodeBlock = false;
          codeLanguage = '';
        } else {
          flushList(`list-before-code-${i}`);
          flushTable(`table-before-code-${i}`);
          inCodeBlock = true;
          codeLanguage = line.trim().replace('```', '').trim();
        }
        continue;
      }

      if (inCodeBlock) {
        currentCodeBuffer.push(line);
        continue;
      }

      // Tables | col 1 | col 2 |
      if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
        flushList(`list-before-table-${i}`);
        inTable = true;
        const cells = line.split('|').slice(1, -1);
        tableRows.push(cells);
        continue;
      } else if (inTable) {
        flushTable(`table-${i}`);
      }

      // Headings (# through ######)
      const headingMatch = line.match(/^(#{1,6})\s+(.*)/);
      if (headingMatch) {
        flushList(`list-${i}`);
        const level = headingMatch[1].length;
        const headingText = headingMatch[2];
        const parsedHeading = parseInlineFormatting(headingText);

        if (level === 1) {
          elements.push(<h1 key={i} className="text-xl sm:text-2xl font-bold mt-6 mb-3 pb-2 border-b" style={{ color: 'var(--color-text)', borderColor: 'var(--color-border)' }}>{parsedHeading}</h1>);
        } else if (level === 2) {
          elements.push(<h2 key={i} className="text-lg font-bold mt-5 mb-2.5" style={{ color: 'var(--color-text)' }}>{parsedHeading}</h2>);
        } else if (level === 3) {
          elements.push(<h3 key={i} className="text-sm sm:text-base font-bold mt-4 mb-2" style={{ color: 'var(--color-primary)' }}>{parsedHeading}</h3>);
        } else if (level === 4) {
          elements.push(<h4 key={i} className="text-xs sm:text-sm font-bold text-amber-700 mt-3.5 mb-1.5">{parsedHeading}</h4>);
        } else if (level === 5) {
          elements.push(<h5 key={i} className="text-xs font-bold mt-3 mb-1" style={{ color: 'var(--color-text)' }}>{parsedHeading}</h5>);
        } else {
          elements.push(<h6 key={i} className="text-[11px] font-bold mt-2 mb-1" style={{ color: 'var(--color-text-muted)' }}>{parsedHeading}</h6>);
        }
        continue;
      }

      // Blockquotes / Callouts >
      if (line.startsWith('> ')) {
        flushList(`list-${i}`);
        elements.push(
          <div key={i} className="my-3 p-4 rounded-xl border-l-4 text-xs sm:text-sm leading-relaxed flex items-start gap-3" style={{ background: 'rgba(18, 53, 91, 0.04)', borderColor: 'var(--color-primary)', color: 'var(--color-text)' }}>
            <div>{parseInlineFormatting(line.replace('> ', ''))}</div>
          </div>
        );
        continue;
      }

      // Lists (*, -, 1.)
      const ulMatch = line.match(/^(\*|-)\s+(.*)/);
      const olMatch = line.match(/^(\d+)\.\s+(.*)/);

      if (ulMatch) {
        if (listType === 'ol') flushList(`list-${i}`);
        listType = 'ul';
        listBuffer.push(ulMatch[2]);
        continue;
      } else if (olMatch) {
        if (listType === 'ul') flushList(`list-${i}`);
        listType = 'ol';
        listBuffer.push(olMatch[2]);
        continue;
      } else {
        flushList(`list-${i}`);
      }

      // Horizontal Rule
      if (line.trim() === '---' || line.trim() === '***') {
        elements.push(<hr key={i} className="my-5 border" style={{ borderColor: 'var(--color-border)' }} />);
        continue;
      }

      // Paragraph / Blank line
      if (line.trim() === '') {
        continue;
      }

      elements.push(
        <p key={i} className="my-2.5 text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text)' }}>
          {parseInlineFormatting(line)}
        </p>
      );
    }

    // Flush any remaining buffered elements
    flushList('list-end');
    flushTable('table-end');

    return elements;
  };

  return <div className="lesson-content space-y-1">{renderFormattedContent(contentText)}</div>;
};

const CourseViewer = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [enrollment, setEnrollment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeContent, setActiveContent] = useState(null);
  const [expandedSubjects, setExpandedSubjects] = useState({});
  const [completedTopics, setCompletedTopics] = useState([]);
  const [sidebarTab, setSidebarTab] = useState('lessons'); // 'lessons' | 'units'
  const [lessonSearch, setLessonSearch] = useState('');

  const fetchCourse = async () => {
    setLoading(true);
    const res = await studentApi.getCourseView(id);
    if (res.success) {
      const courseData = res.course;
      const enrollmentData = courseData?.enrollment || null;
      setCourse(courseData);
      setEnrollment(enrollmentData);
      setCompletedTopics(enrollmentData?.completedTopics || []);
      // Expand all subjects by default so users can browse topics easily
      if (courseData?.subjects?.length > 0) {
        const initialExpanded = {};
        courseData.subjects.forEach(s => { initialExpanded[s.id] = true; });
        setExpandedSubjects(initialExpanded);
      }
      // Auto-select first content
      if (courseData?.content?.length > 0) {
        setActiveContent(courseData.content[0]);
      }
    } else {
      Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not load course' });
    }
    setLoading(false);
  };

  useEffect(() => { fetchCourse(); }, [id]);

  const toggleSubject = (subjectId) => {
    setExpandedSubjects(prev => ({ ...prev, [subjectId]: !prev[subjectId] }));
  };

  const toggleTopic = async (topicId) => {
    let updated;
    if (completedTopics.includes(topicId)) {
      updated = completedTopics.filter(t => t !== topicId);
    } else {
      updated = [...completedTopics, topicId];
    }
    setCompletedTopics(updated);

    // Calculate progress
    const allTopics = (course?.subjects || []).reduce((acc, s) => acc + (s.topics?.length || 0), 0);
    const newProgress = allTopics > 0 ? Math.round((updated.length / allTopics) * 100) : 0;

    const res = await studentApi.updateCourseProgress(id, { progress: newProgress, completedTopics: updated });
    if (res.success) {
      setEnrollment(prev => ({ ...prev, completionPercentage: newProgress }));
    }
  };

  const totalTopics = (course?.subjects || []).reduce((acc, s) => acc + (s.topics?.length || 0), 0);
  const progress = enrollment?.completionPercentage || 0;

  const contentIcons = { video: 'ri-play-circle-line', pdf: 'ri-file-pdf-2-line', text: 'ri-file-text-line' };
  const contentColors = { video: 'text-blue-500 bg-blue-500/10', pdf: 'text-red-500 bg-red-500/10', text: 'text-green-500 bg-green-500/10' };

  // Lesson Navigation helpers
  const allContents = course?.content || [];
  const activeIndex = allContents.findIndex(c => c.id === activeContent?.id);
  const prevContent = activeIndex > 0 ? allContents[activeIndex - 1] : null;
  const nextContent = activeIndex < allContents.length - 1 ? allContents[activeIndex + 1] : null;

  if (loading) {
    return (
      <DashboardLayout pageTitle="Course Viewer" role="student">
        <Loader fullPage text="Loading course content..." />
      </DashboardLayout>
    );
  }

  if (!course) {
    return (
      <DashboardLayout pageTitle="Course Viewer" role="student">
        <div className="text-center py-20">
          <i className="ri-error-warning-line text-5xl text-gray-300 mb-4 block"></i>
          <p className="text-gray-500 mb-4">Course not found or not accessible</p>
          <button onClick={() => navigate('/student/my-courses')} className="px-4 py-2 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark transition-colors">Back to Courses</button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle={course.title} role="student">
      <div className="space-y-5 max-w-7xl mx-auto">
        {/* Back + Header + Inline Course Information Badges */}
        <div className="rounded-xl p-4 border shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center gap-3 min-w-0">
            <button
              onClick={() => navigate('/student/my-courses')}
              className="w-9 h-9 rounded-lg border flex items-center justify-center transition-colors hover:opacity-80 shrink-0"
              style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <ArrowLeft className="w-4 h-4" />
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold truncate" style={{ color: 'var(--color-text)' }}>{course.title}</h1>
              <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{course.mentorName && `By ${course.mentorName} • `}{course.category || 'General'} • {course.courseType || 'Theory'}</p>
            </div>
          </div>

          {/* Inline Course Information Badges */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap text-xs shrink-0">
            {course.courseCode && (
              <div className="px-3 py-1.5 rounded-lg font-bold border flex items-center gap-1.5" style={{ background: 'rgba(18, 53, 91, 0.08)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                <QrCode className="w-3.5 h-3.5" />
                <span>{course.courseCode}</span>
              </div>
            )}
            {course.difficulty && (
              <div className="px-3 py-1.5 rounded-lg font-semibold border flex items-center gap-1.5" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                <BarChart2 className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span className="capitalize">{course.difficulty}</span>
              </div>
            )}
            {course.duration && (
              <div className="px-3 py-1.5 rounded-lg font-semibold border flex items-center gap-1.5" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                <Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>{course.duration}</span>
              </div>
            )}
            {course.semester && (
              <div className="px-3 py-1.5 rounded-lg font-semibold border flex items-center gap-1.5" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                <Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" />
                <span>{course.semester}</span>
              </div>
            )}
            <div className="px-3 py-1.5 rounded-lg font-semibold border flex items-center gap-1.5" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
              <BookOpen className="w-3.5 h-3.5 text-[var(--color-primary)]" />
              <span>{(course.content || []).length} lessons</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="rounded-xl p-4 border shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>Course Completion Progress</span>
            <div className="flex items-center gap-3 text-xs" style={{ color: 'var(--color-text-muted)' }}>
              <span>{completedTopics.length}/{totalTopics} topics completed</span>
              <span className="font-bold text-sm" style={{ color: 'var(--color-primary)' }}>{progress}%</span>
            </div>
          </div>
          <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'var(--color-border)' }}>
            <div className="h-full rounded-full transition-all duration-500" style={{ width: `${progress}%`, background: 'var(--color-primary)' }}></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Sidebar Navigation Panel */}
          <div className="lg:col-span-1 space-y-3 lg:sticky lg:top-20 self-start">
            {/* Sidebar Tab Switcher */}
            <div className="rounded-xl p-1 border flex items-center gap-1 shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              <button
                onClick={() => setSidebarTab('lessons')}
                className="flex-1 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                style={{
                  background: sidebarTab === 'lessons' ? 'var(--color-primary)' : 'transparent',
                  color: sidebarTab === 'lessons' ? '#ffffff' : 'var(--color-text-muted)'
                }}
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>All Lessons ({(course.content || []).length})</span>
              </button>
              <button
                onClick={() => setSidebarTab('units')}
                className="flex-1 py-2 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-1.5"
                style={{
                  background: sidebarTab === 'units' ? 'var(--color-primary)' : 'transparent',
                  color: sidebarTab === 'units' ? '#ffffff' : 'var(--color-text-muted)'
                }}
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Units & Topics</span>
              </button>
            </div>

            {/* SIDEBAR TAB 1: ALL READING LESSONS DIRECTORY */}
            {sidebarTab === 'lessons' && (
              <div className="rounded-xl border shadow-2xs overflow-hidden" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                {/* Search Filter */}
                <div className="p-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search lessons..."
                      value={lessonSearch}
                      onChange={(e) => setLessonSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-lg text-xs outline-none border transition-colors focus:border-[var(--color-primary)]"
                      style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                  </div>
                </div>

                {/* Lessons Scrollable List */}
                <div className="divide-y max-h-[calc(100vh-230px)] overflow-y-auto" style={{ borderColor: 'var(--color-border)' }}>
                  {(course.content || [])
                    .filter(c => !lessonSearch || c.title.toLowerCase().includes(lessonSearch.toLowerCase()) || (c.subjectTitle || '').toLowerCase().includes(lessonSearch.toLowerCase()))
                    .map((c, idx) => {
                      const isActive = activeContent?.id === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setActiveContent(c)}
                          className="w-full px-3.5 py-3 flex items-center gap-2.5 text-left transition-colors"
                          style={{
                            background: isActive ? 'rgba(18, 53, 91, 0.08)' : 'transparent',
                            borderLeft: isActive ? '3px solid var(--color-primary)' : '3px solid transparent'
                          }}
                        >
                          <span className="text-xs font-bold w-5 text-center shrink-0" style={{ color: 'var(--color-text-muted)' }}>{idx + 1}</span>
                          <span className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                            <FileText className="w-3.5 h-3.5" />
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-bold truncate" style={{ color: isActive ? 'var(--color-primary)' : 'var(--color-text)' }}>{c.title}</p>
                            <p className="text-[10px] truncate mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{c.subjectTitle || 'General'}</p>
                          </div>
                          {isActive && <Play className="w-3.5 h-3.5 fill-current text-[var(--color-primary)] shrink-0" />}
                        </button>
                      );
                    })}
                </div>
              </div>
            )}

            {/* SIDEBAR TAB 2: COURSE UNITS & TOPICS */}
            {sidebarTab === 'units' && (
              <div className="space-y-3 max-h-[calc(100vh-230px)] overflow-y-auto pr-1">
                {(course.subjects || []).length === 0 ? (
                  <div className="rounded-xl p-4 border text-center" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>No units available</p>
                  </div>
                ) : (
                  (course.subjects || []).map((sub, si) => (
                    <div key={sub.id} className="rounded-xl border overflow-hidden shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                      <button onClick={() => toggleSubject(sub.id)} className="w-full px-4 py-3 flex items-center justify-between transition-colors hover:opacity-90">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full text-[10px] font-bold flex items-center justify-center shrink-0" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>{si + 1}</span>
                          <span className="text-xs font-bold text-left line-clamp-1" style={{ color: 'var(--color-text)' }}>{sub.title}</span>
                        </div>
                        {expandedSubjects[sub.id] ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
                      </button>
                      {expandedSubjects[sub.id] && (sub.topics || []).length > 0 && (
                        <div className="px-3 pb-3 space-y-1 border-t pt-2" style={{ borderColor: 'var(--color-border)' }}>
                          {sub.topics.map((topic, ti) => {
                            const isCompleted = completedTopics.includes(topic.id);
                            return (
                              <div key={topic.id} className="flex items-center gap-2 pl-3 py-1.5 rounded-lg transition-colors group">
                                <button
                                  onClick={() => toggleTopic(topic.id)}
                                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${isCompleted ? 'bg-emerald-600 border-emerald-600 text-white' : 'border-gray-300 hover:border-[var(--color-primary)]'}`}
                                  title={isCompleted ? "Mark incomplete" : "Mark complete"}
                                >
                                  {isCompleted && <Check className="w-3 h-3" />}
                                </button>
                                <span
                                  onClick={() => {
                                    const matchingContent = allContents.find(c => c.subjectId === sub.id && c.title.includes(topic.title.split(' ')[0]));
                                    if (matchingContent) setActiveContent(matchingContent);
                                  }}
                                  className={`text-xs cursor-pointer select-none transition-colors ${isCompleted ? 'line-through opacity-60' : 'hover:text-[var(--color-primary)]'}`}
                                  style={{ color: 'var(--color-text)' }}
                                >
                                  {si + 1}.{ti + 1} {topic.title}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ))
                )}
              </div>
            )}
          </div>

          {/* Main Content Reader */}
          <div className="lg:col-span-2 space-y-4">
            {(course.content || []).length === 0 ? (
              <div className="rounded-xl p-12 border text-center shadow-2xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" style={{ color: 'var(--color-text-muted)' }} />
                <p className="text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>No content available for this course yet</p>
              </div>
            ) : (
              <>
                {/* Active Content Display */}
                {activeContent && (
                  <div className="rounded-xl border overflow-hidden shadow-2xs flex flex-col h-[calc(100vh-200px)] min-h-[520px]" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                    {/* Lesson Header */}
                    <div className="px-5 py-4 border-b flex items-center justify-between shrink-0" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                      <div>
                        <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>{activeContent.title}</h3>
                        <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>{activeContent.subjectTitle || 'General'} • {activeContent.contentType.toUpperCase()} Lesson</p>
                      </div>
                      <span className="w-9 h-9 rounded-lg border flex items-center justify-center shrink-0" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                        <FileText className="w-4 h-4" />
                      </span>
                    </div>

                    {/* Lesson Body */}
                    <div className="p-5 sm:p-6 flex-1 overflow-y-auto">
                      {activeContent.contentType === 'video' && activeContent.contentData && (
                        <div className="relative w-full mb-4" style={{ paddingBottom: '56.25%' }}>
                          {activeContent.contentData.includes('youtube') || activeContent.contentData.includes('youtu.be') ? (
                            <iframe
                              src={activeContent.contentData.replace('watch?v=', 'embed/').replace('youtu.be/', 'youtube.com/embed/')}
                              className="absolute inset-0 w-full h-full rounded-xl"
                              frameBorder="0" allowFullScreen allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            />
                          ) : (
                            <video src={activeContent.contentData} controls className="absolute inset-0 w-full h-full rounded-xl object-contain bg-black" />
                          )}
                        </div>
                      )}

                      {activeContent.contentType === 'pdf' && activeContent.contentData && (
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center justify-end">
                            <a href={activeContent.contentData} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors hover:bg-red-100">
                              <ExternalLink className="w-3.5 h-3.5" /> Open in New Tab
                            </a>
                          </div>
                          <div className="rounded-xl overflow-hidden border" style={{ height: '70vh', borderColor: 'var(--color-border)' }}>
                            <iframe src={activeContent.contentData} title={activeContent.title} className="w-full h-full border-0" />
                          </div>
                        </div>
                      )}

                      {activeContent.contentType === 'text' && (
                        <TextLessonRenderer contentText={activeContent.contentData} />
                      )}

                      {activeContent.description && (
                        <div className="mt-6 text-xs border-t pt-4 flex items-center gap-2" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                          <Info className="w-4 h-4 text-[var(--color-primary)] shrink-0" />
                          <span>{activeContent.description}</span>
                        </div>
                      )}
                    </div>

                    {/* Lesson Reader Navigation Footer */}
                    <div className="px-5 py-3.5 border-t flex items-center justify-between gap-3 shrink-0" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                      {prevContent ? (
                        <button
                          onClick={() => setActiveContent(prevContent)}
                          className="px-4 py-2 rounded-lg border text-xs font-semibold inline-flex items-center gap-1.5 transition-colors hover:opacity-80"
                          style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                        >
                          <ChevronLeft className="w-4 h-4" />
                          <span className="truncate max-w-[150px] sm:max-w-[200px]">Previous Lesson</span>
                        </button>
                      ) : <div />}

                      {nextContent ? (
                        <button
                          onClick={() => setActiveContent(nextContent)}
                          className="px-4 py-2 rounded-lg text-white text-xs font-semibold inline-flex items-center gap-1.5 transition-colors hover:opacity-90 ml-auto shadow-2xs"
                          style={{ background: 'var(--color-primary)' }}
                        >
                          <span className="truncate max-w-[150px] sm:max-w-[200px]">Next Lesson</span>
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      ) : <div />}
                    </div>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default CourseViewer;
