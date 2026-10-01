import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { alumniApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';
import { Plus, ArrowLeft, MessageSquare, Send, X, User, Clock, ChevronRight } from 'lucide-react';

const AlumniDiscussion = () => {
  const { user } = useAuth();
  const [discussions, setDiscussions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedThread, setSelectedThread] = useState(null);
  const [threadData, setThreadData] = useState(null);
  const [showCreate, setShowCreate] = useState(false);
  const [form, setForm] = useState({ title: '', content: '' });
  const [replyText, setReplyText] = useState('');

  const fetchDiscussions = async () => {
    setLoading(true);
    const res = await alumniApi.getDiscussions();
    if (res.success) setDiscussions(res.discussions || []);
    setLoading(false);
  };

  useEffect(() => { fetchDiscussions(); }, []);

  const openThread = async (id) => {
    setSelectedThread(id);
    const res = await alumniApi.getDiscussion(id);
    if (res.success) setThreadData({ ...res.discussion, replies: res.replies || [] });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await alumniApi.createDiscussion(form);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Discussion Created!', timer: 1500, showConfirmButton: false});
      setShowCreate(false); setForm({ title: '', content: '' }); fetchDiscussions();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const res = await alumniApi.replyDiscussion(selectedThread, { content: replyText });
    if (res.success) { setReplyText(''); openThread(selectedThread); }
    else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]';
  const inputStyle = { background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Discussion Forum</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{discussions.length} active discussion threads</p>
          </div>
          <button onClick={() => { setShowCreate(true); setSelectedThread(null); }} className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors" style={{ background: 'var(--color-primary)' }}>
            <Plus className="w-4 h-4" /> New Thread
          </button>
        </div>

        {selectedThread && threadData ? (
          <div className="rounded-xl border p-6" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <button onClick={() => { setSelectedThread(null); setThreadData(null); }} className="text-xs font-semibold hover:underline mb-4 flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
              <ArrowLeft className="w-3.5 h-3.5" /> Back to threads
            </button>
            <h2 className="text-base font-bold mb-2" style={{ color: 'var(--color-text)' }}>{threadData.title}</h2>
            <div className="flex items-center gap-2 text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
              <User className="w-3.5 h-3.5" />
              <span>{threadData.authorName || 'Unknown'}</span>
              <span>·</span>
              <Clock className="w-3.5 h-3.5" />
              <span>{threadData.createdAt ? new Date(threadData.createdAt).toLocaleDateString() : ''}</span>
            </div>
            <p className="text-xs leading-relaxed mb-6 rounded-lg p-4 border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>{threadData.content}</p>

            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Replies ({threadData.replies?.length || 0})</h4>
              {(threadData.replies || []).map((r, i) => (
                <div key={i} className="flex gap-3 p-3 rounded-lg border" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                  <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0" style={{ background: 'var(--color-primary)' }}>
                    {(r.authorName || '?')[0]}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-semibold" style={{ color: 'var(--color-text)' }}>{r.authorName}</span>
                      <span className="text-[10px]" style={{ color: 'var(--color-text-muted)' }}>{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>{r.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleReply} className="flex gap-3">
              <input type="text" placeholder="Write a reply..." value={replyText} onChange={e => setReplyText(e.target.value)} className={inputClass} style={inputStyle} />
              <button type="submit" className="px-5 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center justify-center hover:opacity-90" style={{ background: 'var(--color-primary)' }}>
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : showCreate ? (
          <div className="rounded-xl border p-6 shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>New Discussion Thread</h3>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input type="text" placeholder="Thread Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} style={inputStyle} />
              <textarea placeholder="Write your discussion content..." rows={5} required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className={`${inputClass} resize-none`} style={inputStyle} />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-lg border text-xs font-semibold hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-white text-xs font-semibold hover:opacity-90" style={{ background: 'var(--color-primary)' }}>Post Thread</button>
              </div>
            </form>
          </div>
        ) : (
          loading ? null :
          discussions.length === 0 ? (
            <div className="text-center py-16 rounded-xl border p-8" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              <MessageSquare className="w-10 h-10 mx-auto mb-3 opacity-40" />
              <p className="text-xs font-medium">No discussions yet. Start a thread!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {discussions.map(d => (
                <div key={d.id} onClick={() => openThread(d.id)} className="rounded-xl p-4 border transition-all hover:shadow-xs cursor-pointer group" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex items-start gap-4">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                      <MessageSquare className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-xs mb-1 group-hover:text-[var(--color-primary)] transition" style={{ color: 'var(--color-text)' }}>{d.title}</h3>
                      <p className="text-xs line-clamp-1 mb-2" style={{ color: 'var(--color-text-muted)' }}>{d.content}</p>
                      <div className="flex items-center gap-3 text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                        <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" />{d.authorName || 'Unknown'}</span>
                        <span className="flex items-center gap-1"><MessageSquare className="w-3.5 h-3.5" />{d.replyCount || 0} replies</span>
                        <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ''}</span>
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </AdminLayout>
  );
};

export default AlumniDiscussion;
