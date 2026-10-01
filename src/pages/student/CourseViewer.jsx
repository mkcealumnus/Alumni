import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';

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
            <ol key={key} className="list-decimal list-inside space-y-1 my-3 text-sm text-gray-700 dark-theme:text-gray-300 pl-2">
              {listBuffer.map((item, idx) => <li key={idx}>{parseInlineFormatting(item)}</li>)}
            </ol>
          );
        } else {
          elements.push(
            <ul key={key} className="list-disc list-inside space-y-1 my-3 text-sm text-gray-700 dark-theme:text-gray-300 pl-2">
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
          <div key={key} className="overflow-x-auto my-4 rounded-xl border border-sand dark-theme:border-gray-800">
            <table className="w-full text-left text-xs border-collapse">
              {headerRow && (
                <thead>
                  <tr className="bg-sand/30 dark-theme:bg-gray-800/80 border-b border-sand dark-theme:border-gray-800">
                    {headerRow.map((cell, cIdx) => (
                      <th key={cIdx} className="px-3.5 py-2.5 font-bold text-gray-800 dark-theme:text-gray-200">
                        {parseInlineFormatting(cell.trim())}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody className="divide-y divide-sand/50 dark-theme:divide-gray-800">
                {bodyRows.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-sand/10 dark-theme:hover:bg-gray-800/40 transition-colors">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="px-3.5 py-2 text-gray-700 dark-theme:text-gray-300">
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
            <code key={i} className="px-1.5 py-0.5 rounded bg-amber-500/10 dark-theme:bg-gray-800 text-amber-700 dark-theme:text-amber-300 font-mono text-[13px] border border-amber-500/20 dark-theme:border-gray-700">
              {token.slice(1, -1)}
            </code>
          );
        } else if ((token.startsWith('**') && token.endsWith('**')) || (token.startsWith('__') && token.endsWith('__'))) {
          return <strong key={i} className="font-bold text-gray-900 dark-theme:text-white">{token.slice(2, -2)}</strong>;
        } else if ((token.startsWith('*') && token.endsWith('*')) || (token.startsWith('_') && token.endsWith('_'))) {
          return <em key={i} className="italic text-gray-800 dark-theme:text-gray-200">{token.slice(1, -1)}</em>;
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
          elements.push(<h1 key={i} className="text-xl sm:text-2xl font-bold text-gray-900 dark-theme:text-white mt-6 mb-3 pb-2 border-b border-sand dark-theme:border-gray-800">{parsedHeading}</h1>);
        } else if (level === 2) {
          elements.push(<h2 key={i} className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mt-5 mb-2.5">{parsedHeading}</h2>);
        } else if (level === 3) {
          elements.push(<h3 key={i} className="text-sm sm:text-base font-bold text-primary mt-4 mb-2">{parsedHeading}</h3>);
        } else if (level === 4) {
          elements.push(<h4 key={i} className="text-xs sm:text-sm font-bold text-amber-700 dark-theme:text-amber-400 mt-3.5 mb-1.5">{parsedHeading}</h4>);
        } else if (level === 5) {
          elements.push(<h5 key={i} className="text-xs font-bold text-gray-700 dark-theme:text-gray-300 mt-3 mb-1">{parsedHeading}</h5>);
        } else {
          elements.push(<h6 key={i} className="text-[11px] font-bold text-gray-600 dark-theme:text-gray-400 mt-2 mb-1">{parsedHeading}</h6>);
        }
        continue;
      }

      // Blockquotes / Callouts >
      if (line.startsWith('> ')) {
        flushList(`list-${i}`);
        elements.push(
          <div key={i} className="my-3 p-4 rounded-xl bg-primary/5 border-l-4 border-primary text-gray-700 dark-theme:text-gray-300 text-xs sm:text-sm leading-relaxed flex items-start gap-3">
            <i className="ri-information-line text-lg text-primary flex-shrink-0 mt-0.5"></i>
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
        elements.push(<hr key={i} className="my-5 border-sand dark-theme:border-gray-800" />);
        continue;
      }

      // Paragraph / Blank line
      if (line.trim() === '') {
        continue;
      }

      elements.push(
        <p key={i} className="my-2.5 text-xs sm:text-sm text-gray-700 dark-theme:text-gray-300 leading-relaxed">
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
      <div className="space-y-5">
        {/* Back + Header + Inline Course Information Badges */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand dark-theme:border-gray-800 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <button onClick={() => navigate('/student/my-courses')} className="w-9 h-9 rounded-xl bg-sand/30 dark-theme:bg-gray-800 flex items-center justify-center hover:bg-sand/60 dark-theme:hover:bg-gray-700 transition-colors flex-shrink-0">
              <i className="ri-arrow-left-line text-gray-600 dark-theme:text-gray-300 text-lg"></i>
            </button>
            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-gray-800 dark-theme:text-gray-100 truncate">{course.title}</h1>
              <p className="text-xs text-gray-400 mt-0.5">{course.mentorName && `By ${course.mentorName} • `}{course.category || 'General'} • {course.courseType || 'Theory'}</p>
            </div>
          </div>

          {/* Inline Course Information Badges (Code, Difficulty, Duration, Semester, Lessons Count) */}
          <div className="flex items-center gap-2 sm:gap-2.5 flex-wrap text-xs flex-shrink-0">
            {course.courseCode && (
              <div className="px-3 py-1.5 rounded-xl bg-primary/10 text-primary font-bold border border-primary/20 flex items-center gap-1.5">
                <i className="ri-qr-code-line text-sm"></i>
                <span>{course.courseCode}</span>
              </div>
            )}
            {course.difficulty && (
              <div className="px-3 py-1.5 rounded-xl bg-sand/40 dark-theme:bg-gray-800 text-gray-700 dark-theme:text-gray-200 font-semibold border border-sand dark-theme:border-gray-700 flex items-center gap-1.5">
                <i className="ri-bar-chart-line text-xs text-gray-400"></i>
                <span className="capitalize">{course.difficulty}</span>
              </div>
            )}
            {course.duration && (
              <div className="px-3 py-1.5 rounded-xl bg-sand/40 dark-theme:bg-gray-800 text-gray-700 dark-theme:text-gray-200 font-semibold border border-sand dark-theme:border-gray-700 flex items-center gap-1.5">
                <i className="ri-time-line text-xs text-gray-400"></i>
                <span>{course.duration}</span>
              </div>
            )}
            {course.semester && (
              <div className="px-3 py-1.5 rounded-xl bg-sand/40 dark-theme:bg-gray-800 text-gray-700 dark-theme:text-gray-200 font-semibold border border-sand dark-theme:border-gray-700 flex items-center gap-1.5">
                <i className="ri-calendar-line text-xs text-gray-400"></i>
                <span>{course.semester}</span>
              </div>
            )}
            <div className="px-3 py-1.5 rounded-xl bg-sand/40 dark-theme:bg-gray-800 text-gray-700 dark-theme:text-gray-200 font-semibold border border-sand dark-theme:border-gray-700 flex items-center gap-1.5">
              <i className="ri-book-read-line text-xs text-gray-400"></i>
              <span>{(course.content || []).length} lessons</span>
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-4 border border-sand dark-theme:border-gray-800 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-gray-600 dark-theme:text-gray-400">Course Completion Progress</span>
            <div className="flex items-center gap-3 text-xs text-gray-400">
              <span>{completedTopics.length}/{totalTopics} topics marked complete</span>
              <span className="font-bold text-primary text-sm">{progress}%</span>
            </div>
          </div>
          <div className="w-full h-2.5 bg-gray-200 dark-theme:bg-gray-700 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-primary-dark rounded-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 items-start">
          {/* Sidebar Navigation Panel (Sticky / Constant on Scroll) */}
          <div className="lg:col-span-1 space-y-3 lg:sticky lg:top-20 self-start">
            {/* Sidebar Tab Switcher */}
            <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-1.5 border border-sand dark-theme:border-gray-800 flex items-center gap-1 shadow-xs">
              <button
                onClick={() => setSidebarTab('lessons')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${sidebarTab === 'lessons' ? 'bg-primary text-white shadow-xs' : 'text-gray-500 hover:text-gray-800 dark-theme:hover:text-gray-200'}`}
              >
                <i className="ri-list-check-2 text-sm"></i>
                <span>All Lessons ({(course.content || []).length})</span>
              </button>
              <button
                onClick={() => setSidebarTab('units')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${sidebarTab === 'units' ? 'bg-primary text-white shadow-xs' : 'text-gray-500 hover:text-gray-800 dark-theme:hover:text-gray-200'}`}
              >
                <i className="ri-folders-line text-sm"></i>
                <span>Units & Topics</span>
              </button>
            </div>

            {/* SIDEBAR TAB 1: ALL READING LESSONS DIRECTORY */}
            {sidebarTab === 'lessons' && (
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 shadow-sm overflow-hidden">
                {/* Search Filter */}
                <div className="p-3 border-b border-sand dark-theme:border-gray-800">
                  <div className="relative">
                    <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs"></i>
                    <input
                      type="text"
                      placeholder="Search lessons..."
                      value={lessonSearch}
                      onChange={(e) => setLessonSearch(e.target.value)}
                      className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-sand/30 dark-theme:bg-gray-800 text-xs text-gray-800 dark-theme:text-gray-200 focus:outline-none focus:ring-1 focus:ring-primary border border-transparent"
                    />
                    {lessonSearch && (
                      <button onClick={() => setLessonSearch('')} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                        <i className="ri-close-line text-xs"></i>
                      </button>
                    )}
                  </div>
                </div>

                {/* Lessons Scrollable List (Constant height tied to viewport) */}
                <div className="divide-y divide-sand/50 dark-theme:divide-gray-800 max-h-[calc(100vh-230px)] overflow-y-auto">
                  {(course.content || [])
                    .filter(c => !lessonSearch || c.title.toLowerCase().includes(lessonSearch.toLowerCase()) || (c.subjectTitle || '').toLowerCase().includes(lessonSearch.toLowerCase()))
                    .map((c, idx) => {
                      const isActive = activeContent?.id === c.id;
                      return (
                        <button
                          key={c.id}
                          onClick={() => setActiveContent(c)}
                          className={`w-full px-3.5 py-3 flex items-center gap-2.5 text-left hover:bg-sand/30 dark-theme:hover:bg-gray-800/50 transition-all ${isActive ? 'bg-primary/10 dark-theme:bg-primary/20 border-l-4 border-primary font-medium' : ''}`}
                        >
                          <span className="text-xs font-bold text-gray-400 w-5 text-center flex-shrink-0">{idx + 1}</span>
                          <span className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${contentColors[c.contentType] || 'bg-gray-100 text-gray-500'}`}>
                            <i className={`${contentIcons[c.contentType] || 'ri-file-line'} text-xs`}></i>
                          </span>
                          <div className="flex-1 min-w-0">
                            <p className={`text-xs font-semibold truncate ${isActive ? 'text-primary' : 'text-gray-800 dark-theme:text-gray-200'}`}>{c.title}</p>
                            <p className="text-[10px] text-gray-400 truncate mt-0.5">{c.subjectTitle || 'General'}</p>
                          </div>
                          {isActive && <i className="ri-play-fill text-primary text-sm flex-shrink-0"></i>}
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
                  <div className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 border border-sand dark-theme:border-gray-800 text-center">
                    <p className="text-xs text-gray-400">No units available</p>
                  </div>
                ) : (
                  (course.subjects || []).map((sub, si) => (
                    <div key={sub.id} className="bg-white dark-theme:bg-gray-900 rounded-xl border border-sand dark-theme:border-gray-800 overflow-hidden shadow-sm">
                      <button onClick={() => toggleSubject(sub.id)} className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark-theme:hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-center gap-2.5">
                          <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center flex-shrink-0">{si + 1}</span>
                          <span className="text-xs font-semibold text-gray-800 dark-theme:text-gray-100 text-left line-clamp-1">{sub.title}</span>
                        </div>
                        <i className={`ri-arrow-${expandedSubjects[sub.id] ? 'up' : 'down'}-s-line text-gray-400`}></i>
                      </button>
                      {expandedSubjects[sub.id] && (sub.topics || []).length > 0 && (
                        <div className="px-3 pb-3 space-y-1 border-t border-sand/40 dark-theme:border-gray-800/60 pt-2">
                          {sub.topics.map((topic, ti) => {
                            const isCompleted = completedTopics.includes(topic.id);
                            return (
                              <div key={topic.id} className="flex items-center gap-2 pl-3 py-1.5 rounded-lg hover:bg-sand/30 dark-theme:hover:bg-gray-800/40 transition-colors group">
                                <button
                                  onClick={() => toggleTopic(topic.id)}
                                  className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors ${isCompleted ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300 dark-theme:border-gray-600 hover:border-primary'}`}
                                  title={isCompleted ? "Mark incomplete" : "Mark complete"}
                                >
                                  {isCompleted && <i className="ri-check-line text-[10px]"></i>}
                                </button>
                                <span
                                  onClick={() => {
                                    // Locate matching content if available
                                    const matchingContent = allContents.find(c => c.subjectId === sub.id && c.title.includes(topic.title.split(' ')[0]));
                                    if (matchingContent) setActiveContent(matchingContent);
                                  }}
                                  className={`text-xs cursor-pointer select-none transition-colors ${isCompleted ? 'text-gray-400 line-through' : 'text-gray-700 dark-theme:text-gray-300 hover:text-primary'}`}
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
              <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-12 border border-sand dark-theme:border-gray-800 text-center">
                <i className="ri-folder-open-line text-5xl text-gray-300 mb-3 block"></i>
                <p className="text-gray-500 text-sm">No content available for this course yet</p>
              </div>
            ) : (
              <>
                {/* Active Content Display */}
                {activeContent && (
                  <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 overflow-hidden shadow-sm flex flex-col h-[calc(100vh-200px)] min-h-[520px]">
                    {/* Lesson Header (Fixed Top) */}
                    <div className="px-5 py-4 border-b border-sand dark-theme:border-gray-800 flex items-center justify-between bg-sand/10 dark-theme:bg-gray-800/30 flex-shrink-0">
                      <div>
                        <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-base">{activeContent.title}</h3>
                        <p className="text-xs text-gray-400 mt-0.5">{activeContent.subjectTitle || 'General'} • {activeContent.contentType.toUpperCase()} Lesson</p>
                      </div>
                      <span className={`w-9 h-9 rounded-xl ${contentColors[activeContent.contentType] || 'bg-gray-100 text-gray-500'} flex items-center justify-center shadow-xs`}>
                        <i className={`${contentIcons[activeContent.contentType] || 'ri-file-line'} text-lg`}></i>
                      </span>
                    </div>

                    {/* Lesson Body (Independently Scrollable Content Area) */}
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
                            <a href={activeContent.contentData} target="_blank" rel="noopener noreferrer" className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-500 text-xs font-medium hover:bg-red-500/20 inline-flex items-center gap-1.5 transition-colors"><i className="ri-external-link-line"></i>Open in New Tab</a>
                          </div>
                          <div className="rounded-xl overflow-hidden border border-sand dark-theme:border-gray-800" style={{ height: '70vh' }}>
                            <iframe src={activeContent.contentData} title={activeContent.title} className="w-full h-full border-0" />
                          </div>
                        </div>
                      )}

                      {activeContent.contentType === 'text' && (
                        <TextLessonRenderer contentText={activeContent.contentData} />
                      )}

                      {activeContent.description && (
                        <div className="mt-6 text-xs text-gray-500 border-t border-sand dark-theme:border-gray-800 pt-4 flex items-center gap-2">
                          <i className="ri-information-line text-primary text-sm"></i>
                          <span>{activeContent.description}</span>
                        </div>
                      )}
                    </div>

                    {/* Lesson Reader Navigation Footer (Fixed Bottom) */}
                    <div className="px-5 py-3.5 border-t border-sand dark-theme:border-gray-800 flex items-center justify-between gap-3 flex-shrink-0 bg-sand/10 dark-theme:bg-gray-800/30">
                      {prevContent ? (
                        <button
                          onClick={() => setActiveContent(prevContent)}
                          className="px-4 py-2 rounded-xl bg-sand/30 dark-theme:bg-gray-800 hover:bg-sand/60 dark-theme:hover:bg-gray-700 text-gray-700 dark-theme:text-gray-200 text-xs font-medium inline-flex items-center gap-2 transition-colors"
                        >
                          <i className="ri-arrow-left-s-line text-base"></i>
                          <span className="truncate max-w-[150px] sm:max-w-[200px]">Previous Lesson</span>
                        </button>
                      ) : <div />}

                      {nextContent ? (
                        <button
                          onClick={() => setActiveContent(nextContent)}
                          className="px-4 py-2 rounded-xl bg-primary text-white hover:bg-primary-dark text-xs font-medium inline-flex items-center gap-2 transition-colors ml-auto shadow-xs"
                        >
                          <span className="truncate max-w-[150px] sm:max-w-[200px]">Next Lesson</span>
                          <i className="ri-arrow-right-s-line text-base"></i>
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
