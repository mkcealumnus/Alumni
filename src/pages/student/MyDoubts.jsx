import { useState, useEffect, useRef, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';
import { studentApi } from '../../utils/api';
import { 
  ArrowLeft, BookOpen, UserCheck, Clock, Flag, 
  MessageSquare, ArrowDown, Send, CheckCircle2, Plus, MessageCircle 
} from 'lucide-react';

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
      confirmButtonColor: '#12355B',
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
      fetchRepliesSilent();
    } else {
      setReplies(prev => prev.filter(r => r.id !== optimisticReply.id));
      setReplyText(messageContent);
    }

    textareaRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleReply();
    }
  };

  const getStatusStyle = (s) => {
    switch (s) {
      case 'open': return { background: 'var(--color-warning-bg)', color: 'var(--color-warning)' };
      case 'in-progress': return { background: 'var(--color-info-bg)', color: 'var(--color-info)' };
      case 'resolved': return { background: 'var(--color-success-bg)', color: 'var(--color-success)' };
      case 'closed': return { background: 'var(--color-surface-muted)', color: 'var(--color-text-muted)' };
      default: return { background: 'var(--color-surface-muted)', color: 'var(--color-text-secondary)' };
    }
  };

  const priorityColor = (p) => ({
    high: 'text-red-600',
    medium: 'text-amber-600',
    low: 'text-emerald-600'
  })[p] || 'text-gray-400';

  const filtered = filter === 'all' ? doubts : doubts.filter(d => d.status === filter);

  // ===================== DETAIL VIEW (REAL-TIME CHAT) =====================
  if (selectedDoubt) {
    return (
      <DashboardLayout pageTitle="Doubt Discussion" role="student">
        <style>{`
          @keyframes msgSlideIn {
            from { opacity: 0; transform: translateY(12px) scale(0.97); }
            to { opacity: 1; transform: translateY(0) scale(1); }
          }
          .chat-msg { animation: msgSlideIn 0.25s ease-out both; }
          .chat-msg-sending { opacity: 0.7; }
          @keyframes livePulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.4; }
          }
          .live-dot { animation: livePulse 2s infinite; }
        `}</style>
        <div className="max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 7rem)' }}>
          {/* Top bar */}
          <div className="flex items-center gap-3 mb-3">
            <button 
              onClick={() => setSelectedDoubt(null)} 
              className="flex items-center gap-1.5 font-medium transition text-xs border px-3 py-1.5 rounded-lg"
              style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <ArrowLeft className="h-4 w-4" /> Back to Doubts
            </button>
            <div className="ml-auto flex items-center gap-2 text-xs font-semibold" style={{ color: 'var(--color-text-muted)' }}>
              <span className="live-dot inline-block w-2 h-2 rounded-full" style={{ background: 'var(--color-success)' }}></span>
              Live Session
            </div>
          </div>

          {detailLoading && !selectedDoubt ? null : (
            <div className="flex-1 flex flex-col rounded-xl border shadow-sm overflow-hidden min-h-0" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {/* Chat Header */}
              <div className="px-5 py-4 border-b flex-shrink-0" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold truncate" style={{ color: 'var(--color-text)' }}>{selectedDoubt.title}</h2>
                    <div className="flex items-center gap-3 mt-1 text-xs font-medium flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
                      {selectedDoubt.courseTitle && (
                        <span className="flex items-center gap-1" style={{ color: 'var(--color-primary)' }}><BookOpen className="h-3.5 w-3.5" />{selectedDoubt.courseTitle}</span>
                      )}
                      {selectedDoubt.mentorName && (
                        <span className="flex items-center gap-1"><UserCheck className="h-3.5 w-3.5" />{selectedDoubt.mentorName}</span>
                      )}
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{relativeTime(selectedDoubt.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize" style={getStatusStyle(selectedDoubt.status)}>
                      {selectedDoubt.status}
                    </span>
                    <Flag className={`h-4 w-4 ${priorityColor(selectedDoubt.priority)}`} />
                  </div>
                </div>
                {selectedDoubt.description && (
                  <p className="mt-2 text-xs line-clamp-2 leading-relaxed" style={{ color: 'var(--color-text-secondary)' }}>{selectedDoubt.description}</p>
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
                  <div className="flex flex-col items-center justify-center h-full" style={{ color: 'var(--color-text-muted)' }}>
                    <MessageSquare className="h-10 w-10 mb-3 opacity-40" />
                    <p className="text-sm font-medium">No replies yet</p>
                    <p className="text-xs mt-1">A mentor will respond soon — replies will appear live</p>
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
                          {!isMe && (
                            <div className="flex-shrink-0 mr-2 mt-auto">
                              {showAvatar ? (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs" style={{ background: 'var(--color-primary)' }}>
                                  {r.authorName?.charAt(0)?.toUpperCase() || 'M'}
                                </div>
                              ) : <div className="w-8" />}
                            </div>
                          )}

                          <div className={`max-w-[75%] ${isMe ? 'order-1' : ''}`}>
                            {showAvatar && (
                              <p className="text-xs font-semibold mb-1" style={{ textAlign: isMe ? 'right' : 'left', color: isMe ? 'var(--color-primary)' : 'var(--color-text-muted)' }}>
                                {isMe ? 'You' : r.authorName}
                                {r.authorRole === 'mentor' && ' · Mentor'}
                                {r.authorRole === 'admin' && ' · Admin'}
                              </p>
                            )}
                            <div 
                              className="rounded-2xl px-4 py-2.5 shadow-xs border"
                              style={{
                                background: isMe ? 'var(--color-primary)' : 'var(--color-surface-muted)',
                                color: isMe ? '#FFFFFF' : 'var(--color-text)',
                                borderColor: isMe ? 'transparent' : 'var(--color-border)',
                                borderBottomRightRadius: isMe ? '2px' : '16px',
                                borderBottomLeftRadius: isMe ? '16px' : '2px'
                              }}
                            >
                              <p className="text-xs whitespace-pre-wrap leading-relaxed">{r.content}</p>
                            </div>
                            <p className="text-[10px] mt-1" style={{ textAlign: isMe ? 'right' : 'left', color: 'var(--color-text-muted)' }}>
                              {r._sending ? (
                                <span className="inline-flex items-center gap-1">
                                  <Clock className="h-3 w-3" /> Sending...
                                </span>
                              ) : relativeTime(r.createdAt)}
                            </p>
                          </div>

                          {isMe && (
                            <div className="flex-shrink-0 ml-2 mt-auto">
                              {showAvatar ? (
                                <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shadow-xs" style={{ background: 'var(--color-secondary)' }}>
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
                <div className="absolute bottom-20 left-1/2 -translate-y-1/2 z-10">
                  <button
                    onClick={() => scrollToBottom()}
                    className="text-white rounded-full px-4 py-1.5 text-xs shadow-md transition flex items-center gap-1.5 font-medium"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    <ArrowDown className="h-3.5 w-3.5" /> New messages
                  </button>
                </div>
              )}

              {/* Chat Input */}
              {selectedDoubt.status !== 'resolved' && selectedDoubt.status !== 'closed' ? (
                <div className="px-4 py-3 border-t flex-shrink-0" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                  <div className="flex items-end gap-2">
                    <textarea
                      ref={textareaRef}
                      value={replyText}
                      onChange={e => setReplyText(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message..."
                      rows={1}
                      className="flex-1 px-3.5 py-2.5 border rounded-xl text-xs transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/20 resize-none max-h-32 overflow-y-auto"
                      style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)', minHeight: '40px' }}
                      onInput={e => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                      }}
                    />
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim() || sending}
                      className="p-2.5 rounded-xl transition shadow-xs flex-shrink-0"
                      style={{
                        background: replyText.trim() && !sending ? 'var(--color-primary)' : 'var(--color-surface-muted)',
                        color: replyText.trim() && !sending ? '#FFFFFF' : 'var(--color-text-muted)',
                        cursor: replyText.trim() && !sending ? 'pointer' : 'not-allowed'
                      }}
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="text-[10px] mt-1.5 text-center font-medium" style={{ color: 'var(--color-text-muted)' }}>
                    Press Enter to send · Shift+Enter for new line
                  </p>
                </div>
              ) : (
                <div className="px-4 py-3 border-t text-center text-xs font-semibold flex items-center justify-center gap-1.5" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface-muted)', color: 'var(--color-text-muted)' }}>
                  <CheckCircle2 className="h-4 w-4" style={{ color: 'var(--color-success)' }} /> This conversation has been {selectedDoubt.status}
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
            <h1 className="text-xl font-bold" style={{ color: 'var(--color-text)' }}>My Doubts</h1>
            <p className="text-xs mt-0.5 font-medium" style={{ color: 'var(--color-text-secondary)' }}>Ask questions and get help from expert mentors</p>
          </div>
          <button
            onClick={handleCreate}
            className="px-4 py-2 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs self-start sm:self-auto"
            style={{ background: 'var(--color-primary)' }}
            onMouseEnter={(e) => e.currentTarget.style.background = 'var(--color-primary-hover)'}
            onMouseLeave={(e) => e.currentTarget.style.background = 'var(--color-primary)'}
          >
            <Plus className="h-4 w-4" /> Ask a Doubt
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl p-4 border text-center shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-warning)' }}>{doubts.filter(d => d.status === 'open').length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Open</p>
          </div>
          <div className="rounded-xl p-4 border text-center shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-info)' }}>{doubts.filter(d => d.status === 'in-progress').length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>In Progress</p>
          </div>
          <div className="rounded-xl p-4 border text-center shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-success)' }}>{doubts.filter(d => d.status === 'resolved').length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Resolved</p>
          </div>
          <div className="rounded-xl p-4 border text-center shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>{doubts.length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Total Doubts</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {['all', 'open', 'in-progress', 'resolved', 'closed'].map(s => (
            <button 
              key={s} 
              onClick={() => setFilter(s)} 
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap border transition-colors"
              style={{
                background: filter === s ? 'var(--color-primary)' : 'var(--color-surface)',
                borderColor: filter === s ? 'var(--color-primary)' : 'var(--color-border)',
                color: filter === s ? '#FFFFFF' : 'var(--color-text-secondary)'
              }}
            >
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              {' '}({s === 'all' ? doubts.length : doubts.filter(d => d.status === s).length})
            </button>
          ))}
        </div>

        {/* Doubt List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-xl border" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
            <MessageCircle className="h-10 w-10 mx-auto mb-3 opacity-40" />
            <h3 className="text-sm font-semibold" style={{ color: 'var(--color-text)' }}>No doubts yet</h3>
            <p className="text-xs mt-1">Click "Ask a Doubt" to post your first question</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(d => (
              <div
                key={d.id}
                onClick={() => openDetail(d)}
                className="rounded-xl p-5 border shadow-xs transition-all cursor-pointer"
                style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-border-strong)'; e.currentTarget.style.boxShadow = 'var(--shadow-sm)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; e.currentTarget.style.boxShadow = 'none'; }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-sm truncate" style={{ color: 'var(--color-text)' }}>{d.title}</h3>
                      <Flag className={`h-3.5 w-3.5 ${priorityColor(d.priority)}`} />
                    </div>
                    <div className="flex items-center gap-3 text-xs font-medium flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
                      {d.courseTitle && <span className="flex items-center gap-1"><BookOpen className="h-3.5 w-3.5" />{d.courseTitle}</span>}
                      {d.mentorName && <span className="flex items-center gap-1"><UserCheck className="h-3.5 w-3.5" />{d.mentorName}</span>}
                      <span className="flex items-center gap-1"><MessageSquare className="h-3.5 w-3.5" />{d.replyCount || 0} replies</span>
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{new Date(d.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold capitalize whitespace-nowrap" style={getStatusStyle(d.status)}>
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

