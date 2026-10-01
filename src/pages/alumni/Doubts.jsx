import { useState, useEffect, useRef, useCallback } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { alumniApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { ArrowLeft, User, BookOpen, Clock, Flag, Send, CheckCircle2, MessageSquare, ArrowDown, HelpCircle, UserCheck, AlertCircle } from 'lucide-react';

const POLL_INTERVAL = 3000;

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

const AlumniDoubts = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';
  const Layout = isAdmin ? AdminLayout : DashboardLayout;
  const layoutProps = isAdmin ? {} : { pageTitle: 'Student Doubts', role: 'alumni' };
  const [doubts, setDoubts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDoubt, setSelectedDoubt] = useState(null);
  const [replies, setReplies] = useState([]);
  const [replyText, setReplyText] = useState('');
  const [detailLoading, setDetailLoading] = useState(false);
  const [filter, setFilter] = useState('all');
  const [sending, setSending] = useState(false);
  const [showScrollBtn, setShowScrollBtn] = useState(false);

  const chatEndRef = useRef(null);
  const chatContainerRef = useRef(null);
  const textareaRef = useRef(null);
  const pollRef = useRef(null);
  const selectedDoubtRef = useRef(null);

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

  const fetchDoubts = async () => {
    setLoading(true);
    const res = await alumniApi.getDoubts();
    if (res.success) setDoubts(res.doubts || []);
    setLoading(false);
  };

  useEffect(() => { fetchDoubts(); }, []);

  const fetchRepliesSilent = useCallback(async () => {
    const doubt = selectedDoubtRef.current;
    if (!doubt) return;
    try {
      const res = await alumniApi.getDoubt(doubt.id);
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
    const res = await alumniApi.getDoubt(doubt.id);
    if (res.success) {
      setSelectedDoubt(res.doubt);
      setReplies(res.replies || []);
      setTimeout(() => scrollToBottom(false), 100);
    }
    setDetailLoading(false);
  };

  const handleReply = async () => {
    if (!replyText.trim() || !selectedDoubt || sending) return;
    const messageContent = replyText.trim();
    setReplyText('');
    setSending(true);

    const wasUnassigned = !selectedDoubt.assignedAlumniId;

    // Optimistic update
    const optimisticReply = {
      id: `temp-${Date.now()}`,
      authorName: user?.fullName || 'You',
      authorRole: user?.role || 'alumni',
      content: messageContent,
      createdAt: new Date().toISOString(),
      _sending: true
    };
    setReplies(prev => [...prev, optimisticReply]);
    setTimeout(() => scrollToBottom(), 50);

    const res = await alumniApi.replyDoubt(selectedDoubt.id, { content: messageContent });
    setSending(false);
    if (res.success) {
      if (wasUnassigned) {
        Swal.fire({ ...getSwalOpts(), icon: 'success',
          title: 'You are now assigned!',
          text: 'This doubt has been assigned to you.',
          timer: 2500,
          showConfirmButton: false
        });
      }
      fetchRepliesSilent();
      fetchDoubts();
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

  const handleResolve = async () => {
    const result = await Swal.fire({ ...getSwalOpts(), title: 'Resolve Doubt?',
      text: 'Mark this doubt as resolved?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      confirmButtonText: 'Yes, Resolve'
    });
    if (result.isConfirmed) {
      const res = await alumniApi.resolveDoubt(selectedDoubt.id);
      if (res.success) {
        Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Resolved!', timer: 1500, showConfirmButton: false });
        setSelectedDoubt(prev => ({ ...prev, status: 'resolved' }));
        fetchDoubts();
      } else {
        Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message || 'Could not resolve. You may not be assigned to this doubt.' });
      }
    }
  };

  const statusBadge = (s) => {
    switch (s) {
      case 'open':
        return { bg: 'rgba(245, 158, 11, 0.1)', color: '#D97706', label: 'Open' };
      case 'in-progress':
        return { bg: 'rgba(59, 130, 246, 0.1)', color: '#2563EB', label: 'In Progress' };
      case 'resolved':
        return { bg: 'rgba(16, 185, 129, 0.1)', color: '#059669', label: 'Resolved' };
      default:
        return { bg: 'var(--color-background)', color: 'var(--color-text-muted)', label: s };
    }
  };

  const priorityColor = (p) => ({
    high: '#DC2626',
    medium: '#D97706',
    low: '#059669'
  })[p] || 'var(--color-text-muted)';

  const filtered = filter === 'all' ? doubts : doubts.filter(d => d.status === filter);

  // ===================== DETAIL VIEW (REAL-TIME CHAT) =====================
  if (selectedDoubt) {
    return (
      <Layout {...layoutProps}>
        <div className="max-w-4xl mx-auto flex flex-col" style={{ height: 'calc(100vh - 7rem)' }}>
          {/* Top bar */}
          <div className="flex items-center gap-3 mb-3">
            <button onClick={() => setSelectedDoubt(null)} className="flex items-center gap-2 text-xs font-semibold transition hover:opacity-80" style={{ color: 'var(--color-primary)' }}>
              <ArrowLeft className="w-4 h-4" /> Back to Doubts
            </button>
            <div className="ml-auto flex items-center gap-2 text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </div>
          </div>

          {detailLoading && !selectedDoubt ? null : (
            <div className="flex-1 flex flex-col rounded-xl border shadow-xs overflow-hidden min-h-0" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
              {/* Chat Header */}
              <div className="px-5 py-4 border-b flex-shrink-0" style={{ borderColor: 'var(--color-border)', background: 'var(--color-surface)' }}>
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <h2 className="text-base font-bold truncate" style={{ color: 'var(--color-text)' }}>{selectedDoubt.title}</h2>
                    <div className="flex items-center gap-3 mt-1 text-xs flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{selectedDoubt.studentName}</span>
                      {selectedDoubt.studentEmail && <span>{selectedDoubt.studentEmail}</span>}
                      {selectedDoubt.courseTitle && <span className="flex items-center gap-1 font-semibold" style={{ color: 'var(--color-primary)' }}><BookOpen className="w-3.5 h-3.5" />{selectedDoubt.courseTitle}</span>}
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{relativeTime(selectedDoubt.createdAt)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    {(() => {
                      const badge = statusBadge(selectedDoubt.status);
                      return (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: badge.bg, color: badge.color }}>
                          {badge.label}
                        </span>
                      );
                    })()}
                    <Flag className="w-4 h-4" style={{ color: priorityColor(selectedDoubt.priority) }} />
                  </div>
                </div>
                {selectedDoubt.description && (
                  <p className="mt-2 text-xs line-clamp-2" style={{ color: 'var(--color-text-muted)' }}>{selectedDoubt.description}</p>
                )}
                <div className="mt-2 flex items-center gap-2 text-xs flex-wrap">
                  {selectedDoubt.alumniName && (
                    <span className="px-2 py-0.5 rounded font-medium flex items-center gap-1" style={{ background: 'rgba(18,53,91,0.08)', color: 'var(--color-primary)' }}>
                      <UserCheck className="w-3.5 h-3.5" /> Assigned: {selectedDoubt.alumniName}
                    </span>
                  )}
                  {!selectedDoubt.assignedAlumniId && (
                    <span className="px-2 py-0.5 rounded font-medium flex items-center gap-1 animate-pulse" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706' }}>
                      <AlertCircle className="w-3.5 h-3.5" /> Unassigned — reply to claim
                    </span>
                  )}
                </div>
              </div>

              {/* Chat Messages */}
              <div
                ref={chatContainerRef}
                onScroll={handleChatScroll}
                className="flex-1 overflow-y-auto px-5 py-4 space-y-3 relative"
                style={{ scrollBehavior: 'smooth', background: 'var(--color-background)' }}
              >
                {replies.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full" style={{ color: 'var(--color-text-muted)' }}>
                    <MessageSquare className="w-10 h-10 mb-3 opacity-40" />
                    <p className="text-xs font-semibold">No replies yet</p>
                    <p className="text-[11px] mt-1">Be the first to respond — your reply will appear here live</p>
                  </div>
                ) : (
                  <>
                    {replies.map((r, idx) => {
                      const isStudent = r.authorRole === 'student';
                      const showAvatar = idx === 0 || replies[idx - 1]?.authorRole !== r.authorRole;
                      return (
                        <div
                          key={r.id}
                          className={`flex ${isStudent ? 'justify-start' : 'justify-end'} ${r._sending ? 'opacity-70' : ''}`}
                        >
                          {/* Avatar for student */}
                          {isStudent && (
                            <div className="flex-shrink-0 mr-2 mt-auto">
                              {showAvatar ? (
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--color-accent)' }}>
                                  {r.authorName?.charAt(0)?.toUpperCase() || 'S'}
                                </div>
                              ) : <div className="w-7" />}
                            </div>
                          )}

                          <div className={`max-w-[75%] ${!isStudent ? 'order-1' : ''}`}>
                            {showAvatar && (
                              <p className={`text-[10px] font-semibold mb-1 ${!isStudent ? 'text-right' : ''}`} style={{ color: 'var(--color-text-muted)' }}>
                                {r.authorName}
                                {r.authorRole === 'student' && ' · Student'}
                                {r.authorRole === 'alumni' && ' · Alumni'}
                                {r.authorRole === 'admin' && ' · Admin'}
                              </p>
                            )}
                            <div className="rounded-2xl px-4 py-2.5 shadow-2xs" style={{
                              background: !isStudent ? 'var(--color-primary)' : 'var(--color-surface)',
                              color: !isStudent ? '#ffffff' : 'var(--color-text)',
                              border: isStudent ? '1px solid var(--color-border)' : 'none'
                            }}>
                              <p className="text-xs whitespace-pre-wrap leading-relaxed">{r.content}</p>
                            </div>
                            <p className={`text-[10px] mt-1 ${!isStudent ? 'text-right' : ''}`} style={{ color: 'var(--color-text-muted)' }}>
                              {r._sending ? 'Sending...' : relativeTime(r.createdAt)}
                            </p>
                          </div>

                          {/* Avatar for me */}
                          {!isStudent && (
                            <div className="flex-shrink-0 ml-2 mt-auto">
                              {showAvatar ? (
                                <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--color-primary)' }}>
                                  {user?.fullName?.charAt(0)?.toUpperCase() || 'M'}
                                </div>
                              ) : <div className="w-7" />}
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
                    className="text-white rounded-full px-4 py-1.5 text-xs shadow-md hover:opacity-90 transition flex items-center gap-1"
                    style={{ background: 'var(--color-primary)' }}
                  >
                    <ArrowDown className="w-3.5 h-3.5" /> New messages
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
                      placeholder={selectedDoubt.assignedAlumniId ? 'Type a message...' : 'Reply to claim this doubt...'}
                      rows={1}
                      className="flex-1 px-3.5 py-2.5 border rounded-xl outline-none text-xs transition-colors focus:border-[var(--color-primary)] resize-none max-h-32 overflow-y-auto"
                      style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)', minHeight: '40px' }}
                      onInput={e => {
                        e.target.style.height = 'auto';
                        e.target.style.height = Math.min(e.target.scrollHeight, 128) + 'px';
                      }}
                    />
                    <button
                      onClick={handleReply}
                      disabled={!replyText.trim() || sending}
                      className="p-2.5 rounded-xl transition text-white disabled:opacity-40 flex-shrink-0"
                      style={{ background: 'var(--color-primary)' }}
                    >
                      <Send className="w-4 h-4" />
                    </button>
                    {selectedDoubt.status === 'in-progress' && (
                      <button onClick={handleResolve} className="px-3.5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition font-semibold text-xs flex items-center gap-1 flex-shrink-0">
                        <CheckCircle2 className="w-4 h-4" /> Resolve
                      </button>
                    )}
                  </div>
                  <p className="text-[10px] mt-1.5 text-center" style={{ color: 'var(--color-text-muted)' }}>
                    Press Enter to send · Shift+Enter for new line
                  </p>
                </div>
              ) : (
                <div className="px-4 py-3 border-t text-center text-xs font-semibold flex items-center justify-center gap-1.5" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)', background: 'var(--color-background)' }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" /> This conversation has been {selectedDoubt.status}
                </div>
              )}
            </div>
          )}
        </div>
      </Layout>
    );
  }

  if (loading) {
    return (
      <Layout {...layoutProps}>
        <Loader fullPage text="Loading student doubts..." />
      </Layout>
    );
  }

  // ===================== LIST VIEW =====================
  return (
    <Layout {...layoutProps}>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Student Doubts Hub</h1>
          <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Answer student questions — first alumni to reply gets auto-assigned
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="rounded-xl border p-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-xl font-bold text-amber-600">{doubts.filter(d => d.status === 'open').length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Open (Unassigned)</p>
          </div>
          <div className="rounded-xl border p-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-xl font-bold text-blue-600">{doubts.filter(d => d.status === 'in-progress').length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>In Progress</p>
          </div>
          <div className="rounded-xl border p-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-xl font-bold text-emerald-600">{doubts.filter(d => d.status === 'resolved').length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Resolved</p>
          </div>
          <div className="rounded-xl border p-4" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <p className="text-xl font-bold" style={{ color: 'var(--color-primary)' }}>{doubts.length}</p>
            <p className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>Total Visible</p>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          {['all', 'open', 'in-progress', 'resolved'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
              filter === s
                ? 'text-white shadow-xs'
                : 'border hover:opacity-80'
            }`} style={{
              background: filter === s ? 'var(--color-primary)' : 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: filter === s ? '#ffffff' : 'var(--color-text-muted)'
            }}>
              {s === 'all' ? 'All' : s.charAt(0).toUpperCase() + s.slice(1)}
              {' '}({s === 'all' ? doubts.length : doubts.filter(d => d.status === s).length})
            </button>
          ))}
        </div>

        {/* Doubt List */}
        {filtered.length === 0 ? (
          <div className="text-center py-16 rounded-xl border p-8" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
            <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <h3 className="text-xs font-semibold">No doubts found</h3>
            <p className="text-[11px] mt-1">Student doubts will appear here when posted</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filtered.map(d => {
              const badge = statusBadge(d.status);
              return (
                <div
                  key={d.id}
                  onClick={() => openDetail(d)}
                  className="rounded-xl p-4 border transition-all hover:shadow-xs cursor-pointer group"
                  style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-3 mb-1 flex-wrap">
                        <h3 className="font-semibold text-xs truncate group-hover:text-[var(--color-primary)] transition" style={{ color: 'var(--color-text)' }}>{d.title}</h3>
                        <Flag className="w-3.5 h-3.5" style={{ color: priorityColor(d.priority) }} />
                        {!d.assignedAlumniId && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold" style={{ background: 'rgba(245, 158, 11, 0.1)', color: '#D97706' }}>
                            Unassigned
                          </span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-xs flex-wrap" style={{ color: 'var(--color-text-muted)' }}>
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{d.studentName}</span>
                        {d.courseTitle && <span className="flex items-center gap-1"><BookOpen className="w-3.5 h-3.5" />{d.courseTitle}</span>}
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{d.replyCount || 0} replies</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{new Date(d.createdAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider whitespace-nowrap" style={{ background: badge.bg, color: badge.color }}>
                      {badge.label}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AlumniDoubts;
