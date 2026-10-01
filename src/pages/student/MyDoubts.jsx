import { useState, useEffect, useRef, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { studentApi } from '../../utils/api';

const POLL_INTERVAL = 3000; // 3 seconds

const relativeTime = (dateStr) => {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = Math.floor((now - date) / 1000);
  if (diff < 10) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return date.toLocaleDateString();
};

const MyDoubts = () => {
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [detailLoading, setDetailLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [courses, setCourses] = useState([]);
  const [sending, setSending] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const pollRef = useRef(null);
  const selectedDoubtRef = useRef(null);
  const prevReplyCountRef = useRef(0);

  // Keep ref in sync so polling callback always reads latest
  useEffect(() => { selectedDoubtRef.current = selectedDoubt; }, [selectedDoubt]);

  const scrollToBottom = useCallback((smooth = true) => {
    chatEndRef.current?.scrollIntoView({ behavior: smooth ? 'smooth' : 'instant' });
  }, []);

  const handleChatScroll = useCallback(() => {
    const el = chatContainerRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 80;
    setShowScrollBtn(!atBottom);
  }, []);

  const fetchDoubts = useCallback(async () => {
    const res = await studentApi.getDoubts();
    if (res.success) setDoubts(res.doubts || []);
    setLoading(false);
  }, []);

  const fetchCourses = useCallback(async () => {
    const res = await studentApi.getCourses();
    if (res.success) setCourses(res.courses || res.data?.courses || []);
  }, []);

  useEffect(() => {
    fetchDoubts();
    fetchCourses();
  }, [fetchDoubts, fetchCourses]);

  // Silent poll for new replies when a doubt is open
  const fetchRepliesSilent = useCallback(async () => {
    const doubt = selectedDoubtRef.current;
    if (!doubt) return;
    try {
      const res = await studentApi.getDoubt(doubt.id);
      if (res.success) {
        const newReplies = res.replies || [];
        setReplies(prev => {
          if (newReplies.length !== prev.length || JSON.stringify(newReplies.map(r => r.id)) !== JSON.stringify(prev.map(r => r.id))) {
            // New messages arrived — scroll to bottom if user is near bottom
            const el = chatContainerRef.current;
            const atBottom = !el || (el.scrollHeight - el.scrollTop - el.clientHeight < 80);
            if (atBottom) setTimeout(() => scrollToBottom(), 50);
            return newReplies;
          }
          return prev;
        });
        if (res.doubt) setSelectedDoubt(res.doubt);
      }
    } catch { /* silent fail */ }
  }, [scrollToBottom]);

  // Start/stop polling when detail view opens/closes
  useEffect(() => {
    if (selectedDoubt) {
      pollRef.current = setInterval(fetchRepliesSilent, POLL_INTERVAL);
    }
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
  }, [selectedDoubt?.id, fetchRepliesSilent]);

  const openDetail = async (doubt) => {
    setDetailLoading(true);
    setSelectedDoubt(doubt);
    setReplies([]);
    setReplyText('');
    prevReplyCountRef.current = 0;
    const res = await studentApi.getDoubt(doubt.id);
    if (res.success) {
      setSelectedDoubt(res.doubt);
      setReplies(res.replies || []);
      prevReplyCountRef.current = (res.replies || []).length;
      setTimeout(() => scrollToBottom(false), 100);
    }
    setDetailLoading(false);
  };

  const handleCreate = async () => {
    const { value: formValues } = await Swal.fire({
      ...getSwalOpts(),
      title: 'Ask a Doubt',
      html: `
        <div style="display:flex; flex-direction:column; gap:14px; text-align:left; width:100%; box-sizing:border-box;">
          <div>
            <label style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; opacity:0.8; margin-bottom:6px; display:block;">
              Enrolled Course <span style="color:#ef4444;">*</span>
            </label>
            <select id="swal-course" class="swal2-select" style="width:100%; margin:0; box-sizing:border-box;">
              <option value="">Select Enrolled Course *</option>
              ${
                courses && courses.length > 0
                  ? courses.map(c => `<option value="${c.id}">${c.title}</option>`).join('')
                  : '<option value="" disabled>No enrolled courses available</option>'
              }
            </select>
          </div>
          <div>
            <label style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; opacity:0.8; margin-bottom:6px; display:block;">
              Doubt Title <span style="color:#ef4444;">*</span>
            </label>
            <input id="swal-title" class="swal2-input" placeholder="e.g. How does recursion work in Python? *" style="width:100%; margin:0; box-sizing:border-box;">
          </div>
          <div>
            <label style="font-size:12px; font-weight:700; text-transform:uppercase; letter-spacing:0.5px; opacity:0.8; margin-bottom:6px; display:block;">
              Description <span style="color:#ef4444;">*</span>
            </label>
            <textarea id="swal-desc" class="swal2-textarea" placeholder="Describe your doubt in detail... *" style="width:100%; margin:0; box-sizing:border-box; min-height:95px;"></textarea>
          </div>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Submit Doubt',
      confirmButtonColor: '#d4a574',
      preConfirm: () => {
        const courseId = document.getElementById('swal-course').value;
        const title = document.getElementById('swal-title').value.trim();
        const description = document.getElementById('swal-desc').value.trim();

        if (!courseId) {
          Swal.showValidationMessage('Please select an enrolled course');
          return false;
        }
        if (!title) {
          Swal.showValidationMessage('Doubt title is required');
          return false;
        }
        if (!description) {
          Swal.showValidationMessage('Description is required');
          return false;
        }

        return {
          courseId,
          title,
          description,
          priority: 'medium'
        };
      }
    });
    if (formValues) {
      const res = await studentApi.createDoubt(formValues);
      if (res.success) {
        Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Doubt Posted!', text: 'A mentor will respond soon.', timer: 2000, showConfirmButton: false });
        fetchDoubts();
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message });
      }
    }
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedDoubt || sending) return;
    const messageContent = replyText.trim();
    setReplyText('');
    setSending(true);

    // Optimistic: add message immediately
    const optimisticReply = {
      id: `temp-${Date.now()}`,
      authorName: 'You',
      authorRole: 'student',
      content: messageContent,
      createdAt: new Date().toISOString(),
      _sending: true
    };
    setReplies(prev => [...prev, optimisticReply]);
    setTimeout(() => scrollToBottom(), 50);

    const res = await studentApi.replyDoubt(selectedDoubt.id, { content: messageContent });
    setSending(false);
    if (res.success) {
      // Replace optimistic with real data on next poll
      fetchRepliesSilent();
    } else {
      // Remove optimistic message on failure
      setReplies(prev => prev.filter(r => r.id !== optimisticReply.id));
      setReplyText(messageContent);
    }

    // Refocus textarea
    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  const statusColor = (s) => ({
    open: 'bg-amber-100 text-amber-800 dark-theme:bg-amber-900/30 dark-theme:text-amber-300',
    'in-progress': 'bg-blue-100 text-blue-800 dark-theme:bg-blue-900/30 dark-theme:text-blue-300',
    resolved: 'bg-green-100 text-green-800 dark-theme:bg-green-900/30 dark-theme:text-green-300',
    closed: 'bg-sand text-gray-800 dark-theme:bg-gray-700 dark-theme:text-gray-300'
  })[s] || 'bg-sand text-gray-800';

  const priorityColor = (p) => ({
    high: 'text-red-500',
    medium: 'text-amber-500',
    low: 'text-green-500'
  })[p] || 'text-gray-500';

  const filtered = filter === 'all' ? doubts : doubts.filter(d => d.status === filter);

  // ===================== DETAIL VIEW (REAL-TIME CHAT) =====================
  if (selectedDoubt) {
    return (
      <DashboardLayout>
        <style>{`
          @keyframes msgSlideIn {
            from { opacity: 0; transform: translateY(12px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .chat-msg { animation: msgSlideIn 0.25s ease-out both; }
          .chat-msg-sending { opacity: 0.7; }
          @keyframes dotPulse {
            0%, 80%, 100% { transform: scale(0.6); opacity: 0.4; }
            40% { transform: scale(1); opacity: 1; }
          }
          .typing-dot { animation: dotPulse 1.4s infinite ease-in-out both; }
          .typing-dot:nth-child(2) { animation-delay: 0.16s; }
          .typing-dot:nth-child(3) { animation-delay: 0.32s; }
          @keyframes livePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .live-dot { animation: livePulse 2s infinite; }
        `}</style>
        <div className="max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 7rem)' }}>
          {/* Top bar */}
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setSelectedDoubt(null)} className="flex items-center gap-2 text-primary hover:text-primary-dark font-medium transition">
              <i className="ri-arrow-left-line text-lg"></i> Back
            </button>
            <div className="ml-auto flex items-center gap-2 text-xs text-gray-400 dark-theme:text-gray-500">
              <span className="live-dot inline-block w-2 h-2 rounded-full bg-green-500"></span>
              Live
            </div>
          </div>

          {detailLoading && !activeDoubt ? null : (
            <div className="flex-1 flex flex-col bg-white dark-theme:bg-gray-900 rounded-xl shadow-lg overflow-hidden min-h-0">
              {/* Chat Header */}
              <div className="px-5 py-4 border-b dark-theme:border-gray-700 bg-white/80 dark-theme:bg-gray-800/80 backdrop-blur-sm flex-shrink-0">
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 dark-theme:text-gray-100 truncate">{selectedDoubt.title}</h2>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500 dark-theme:text-gray-400 flex-wrap">
                      {selectedDoubt.courseTitle && (
                        <span className="text-primary"><i className="ri-book-open-line mr-1"></i>{selectedDoubt.courseTitle}</span>
                      )}
                      {selectedDoubt.mentorName && (
                        <span><i className="ri-user-star-line mr-1"></i>{selectedDoubt.mentorName}</span>
                      )}
                      <span><i className="ri-time-line mr-1"></i>{relativeTime(selectedDoubt.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColor(selectedDoubt.status)}`}>
                      {selectedDoubt.status}
                    </span>
                    <span className={priorityColor(selectedDoubt.priority)}><i className="ri-flag-fill"></i></span>
                  </div>
                </div>
                {selectedDoubt.description && (
                  <p className="mt-2 text-sm text-gray-500 dark-theme:text-gray-400 line-clamp-2">{selectedDoubt.description}</p>
                )}
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                onScroll={handleChatScroll}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-3 relative"
                style={{ scrollBehavior: 'smooth' }}
              >
                {replies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 dark-theme:text-gray-500">
                    <i className="ri-chat-smile-3-line text-5xl mb-3 opacity-40"></i>
                    <p className="text-sm font-medium">No replies yet</p>
                    <p className="text-xs mt-1">A mentor will respond soon — you'll see it appear here live</p>
                  </div>
                ) : (
                  <>
                    {replies.map((r, idx) => {
                      const isMe = r.authorRole === 'student';
                      const showAvatar = idx === 0 || replies[idx - 1]?.authorRole !== r.authorRole;
                      return (
                        <div
                          key={r.id}
                          className={`flex ${isMe ? 'justify-end' : 'justify-start'} chat-msg ${r._sending ? 'chat-msg-sending' : ''}`}
                          style={{ animationDelay: `${Math.min(idx * 0.03, 0.3)}s` }}
                        >
                          {/* Avatar for others */}
                          {!isMe && (
                            <div className="flex-shrink-0 mr-2 mt-auto">
                              {showAvatar ? (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                  {r.authorName?.charAt(0)?.toUpperCase() || 'M'}
                                </div>
                              ) : <div className="w-8" />}
                            </div>
                          )}

                          <div className={`max-w-[75%] ${isMe ? 'order-1' : ''}`}>
                            {showAvatar && (
                              <p className={`text-xs font-medium mb-1 ${isMe ? 'text-right text-primary/70' : 'text-gray-500 dark-theme:text-gray-400'}`}>
                                {isMe ? 'You' : r.authorName}
                                {r.authorRole === 'mentor' && ' · Mentor'}
                                {r.authorRole === 'admin' && ' · Admin'}
                              </p>
                            )}
                            <div className={`rounded-2xl px-4 py-2.5 shadow-sm ${
                              isMe
                                ? 'bg-primary text-white rounded-br-md'
                                : 'bg-sand dark-theme:bg-gray-700 text-gray-900 dark-theme:text-gray-100 rounded-bl-md'
                            }`}>
                              <p className="text-sm whitespace-pre-wrap leading-relaxed">{r.content}</p>
                            </div>
                            <p className={`text-[10px] mt-1 ${isMe ? 'text-right' : ''} text-gray-400 dark-theme:text-gray-500`}>
                              {r._sending ? (
                                <span className="inline-flex items-center gap-1">
                                  <i className="ri-time-line"></i> Sending...
                                </span>
                              ) : relativeTime(r.createdAt)}
                            </p>
                          </div>

                          {/* Avatar for me */}
                          {isMe && (
                            <div className="flex-shrink-0 ml-2 mt-auto">
                              {showAvatar ? (
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-pink-500 flex items-center justify-center text-white text-xs font-bold shadow-sm">
                                  You
                                </div>
                              ) : <div className="w-8" />}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </>
                )}
                <div ref={chatEndRef} />
              </div>

              {/* Scroll to bottom button */}
              {showScrollBtn && (
                <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10">
                  <button
                    onClick={() => scrollToBottom()}
                    className="bg-primary text-white rounded-full px-4 py-1.5 text-xs shadow-lg hover:bg-primary-dark transition flex items-center gap-1"
                  >
                    <i className="ri-arrow-down-line"></i> New messages
                  </button>
                </div>
              )}

              {/* Chat Input */}
              {selectedDoubt.status !== 'resolved' && selectedDoubt.status !== 'closed' ? (
                <div className="px-4 py-3 border-t dark-theme:border-gray-700 bg-white/80 dark-theme:bg-gray-800/80 backdrop-blur-sm flex-shrink-0">
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={textareaRef}
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      rows={1}
                      className="flex-1 px-4 py-2.5 border rounded-2xl dark-theme:bg-gray-700 dark-theme:border-gray-600 dark-theme:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent resize-none text-sm max-h-32 overflow-y-auto"
                      style={{ minHeight: '42px' }}
                      onInput={e => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                      }}
                    />
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim() || sending}
                      className={`p-2.5 rounded-full transition shadow-sm flex-shrink-0 ${
                        replyText.trim() && !sending
                          ? 'bg-primary text-white hover:bg-primary-dark hover:shadow-md'
                          : 'bg-sand dark-theme:bg-gray-700 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      <i className="ri-send-plane-2-fill text-lg"></i>
                    </button>
                  </div>
                  <p className="text-[10px] text-gray-400 dark-theme:text-gray-500 mt-1.5 text-center">
                    Press Enter to send · Shift+Enter for new line
                  </p>
                </div>
              ) : (
                <div className="px-4 py-3 border-t dark-theme:border-gray-700 text-center text-sm text-gray-400 dark-theme:text-gray-500 bg-cream dark-theme:bg-gray-950/30">
                  <i className="ri-check-double-line mr-1"></i> This conversation has been {selectedDoubt.status}
                </div>
              )}
            </div>
          )}
        </div>
      </DashboardLayout>
    );
  }

  if (loading) {
    return (
      <DashboardLayout pageTitle="My Doubts" role="student">
        <Loader fullPage text="Loading doubts..." />
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout pageTitle="My Doubts" role="student">

      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark-theme:text-gray-100">My Doubts</h1>
            <p className="text-gray-500 text-sm mt-1">Ask questions and get help from expert mentors</p>
          </div>
          <button
            onClick={() => setShowAskModal(true)}
            className="px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-lg text-sm font-semibold flex items-center gap-2 transition"
          >
            <i className="ri-add-line text-lg"></i> Ask a Doubt
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
          <div className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-amber-600">{doubts.filter(d => d.status === 'open').length}</p>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400">Open</p>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-blue-600">{doubts.filter(d => d.status === 'in-progress').length}</p>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400">In Progress</p>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-green-600">{doubts.filter(d => d.status === 'resolved').length}</p>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400">Resolved</p>
          </div>
          <div className="bg-white dark-theme:bg-gray-900 rounded-xl p-4 shadow-sm">
            <p className="text-2xl font-bold text-primary">{doubts.length}</p>
            <p className="text-sm text-gray-500 dark-theme:text-gray-400">Total Doubts</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {['all', 'open', 'in-progress', 'resolved', 'closed'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition ${
              filter === s
                ? 'bg-primary text-white shadow'
                : 'bg-white dark-theme:bg-gray-900 text-gray-600 dark-theme:text-gray-300 hover:bg-cream dark-theme:hover:bg-gray-700 border dark-theme:border-gray-700'
            }`}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              {' '}({s === 'all' ? doubts.length : doubts.filter(d => d.status === s).length})
            </button>
          ))}
        </div>

        {/* Doubt List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 bg-white dark-theme:bg-gray-900 rounded-xl">
            <i className="ri-question-answer-line text-5xl text-gray-300 dark-theme:text-gray-600 mb-3 block"></i>
            <h3 className="text-lg font-semibold text-gray-600 dark-theme:text-gray-400">No doubts yet</h3>
            <p className="text-gray-400 dark-theme:text-gray-500 text-sm mt-1">Click "Ask a Doubt" to post your first question</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(d => (
              <div
                key={d.id}
                onClick={() => openDetail(d)}
                className="bg-white dark-theme:bg-gray-900 rounded-xl p-5 shadow-sm hover:shadow-md transition cursor-pointer border border-transparent hover:border-primary/20 dark-theme:hover:border-purple-800 group"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-semibold text-gray-900 dark-theme:text-gray-100 truncate group-hover:text-primary transition">{d.title}</h3>
                      <span className={priorityColor(d.priority)}><i className="ri-flag-fill text-sm"></i></span>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark-theme:text-gray-400 flex-wrap">
                      {d.courseTitle && <span><i className="ri-book-open-line mr-1"></i>{d.courseTitle}</span>}
                      {d.mentorName && <span><i className="ri-user-star-line mr-1"></i>{d.mentorName}</span>}
                      <span><i className="ri-chat-3-line mr-1"></i>{d.replyCount || 0} replies</span>
                      <span><i className="ri-time-line mr-1"></i>{new Date(d.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap ${statusColor(d.status)}`}>
                    {d.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default MyDoubts;
