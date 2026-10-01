import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Swal, { getSwalOpts } from '../../utils/swal';
import { mentorApi } from '../../utils/api';
import { useAuth } from '../../context/AuthContext';

const MentorDiscussion = () => {
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
    const res = await mentorApi.getDiscussions();
    if (res.success) setDiscussions(res.discussions || []);
    setLoading(false);
  };

  useEffect(() => { fetchDiscussions(); }, []);

  const openThread = async (id) => {
    setSelectedThread(id);
    const res = await mentorApi.getDiscussion(id);
    if (res.success) setThreadData({ ...res.discussion, replies: res.replies || [] });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    const res = await mentorApi.createDiscussion(form);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Discussion Created!', timer: 1500, showConfirmButton: false});
      setShowCreate(false); setForm({ title: '', content: '' }); fetchDiscussions();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  const handleReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim()) return;
    const res = await mentorApi.replyDiscussion(selectedThread, { content: replyText });
    if (res.success) { setReplyText(''); openThread(selectedThread); }
    else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Discussion Forum</h1><p className="text-sm text-gray-500 mt-1">{discussions.length} threads</p></div>
          <button onClick={() => { setShowCreate(true); setSelectedThread(null); }} className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark flex items-center gap-2"><i className="ri-add-line"></i>New Thread</button>
        </div>

        {selectedThread && threadData ? (
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 p-6">
            <button onClick={() => { setSelectedThread(null); setThreadData(null); }} className="text-sm text-primary hover:underline mb-4 flex items-center gap-1"><i className="ri-arrow-left-line"></i>Back to threads</button>
            <h2 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100 mb-2">{threadData.title}</h2>
            <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
              <span>{threadData.authorName || 'Unknown'}</span><span>·</span><span>{threadData.createdAt ? new Date(threadData.createdAt).toLocaleDateString() : ''}</span>
            </div>
            <p className="text-sm text-gray-600 dark-theme:text-gray-300 mb-6 bg-cream dark-theme:bg-gray-800 rounded-xl p-4">{threadData.content}</p>

            <div className="space-y-3 mb-6">
              <h4 className="font-semibold text-gray-700 dark-theme:text-gray-300 text-sm">Replies ({threadData.replies?.length || 0})</h4>
              {(threadData.replies || []).map((r, i) => (
                <div key={i} className="flex gap-3 p-3 bg-cream dark-theme:bg-gray-800 rounded-xl">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-xs font-bold text-primary flex-shrink-0">{(r.authorName || '?')[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-700 dark-theme:text-gray-300">{r.authorName}</span>
                      <span className="text-[10px] text-gray-400">{r.createdAt ? new Date(r.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                    <p className="text-xs text-gray-600 dark-theme:text-gray-400">{r.content}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={handleReply} className="flex gap-3">
              <input type="text" placeholder="Write a reply..." value={replyText} onChange={e => setReplyText(e.target.value)} className="flex-1 px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <button type="submit" className="px-5 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark"><i className="ri-send-plane-line"></i></button>
            </form>
          </div>
        ) : showCreate ? (
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">New Discussion Thread</h3>
              <button onClick={() => setShowCreate(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleCreate} className="space-y-4">
              <input type="text" placeholder="Thread Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <textarea placeholder="Write your discussion content..." rows={5} required value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none" />
              <div className="flex gap-3">
                <button type="button" onClick={() => setShowCreate(false)} className="flex-1 py-2.5 rounded-xl border border-sand text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">Post Thread</button>
              </div>
            </form>
          </div>
        ) : (
          loading ? null :
          discussions.length === 0 ? <div className="text-center py-20 text-gray-400"><i className="ri-discuss-line text-4xl mb-3 block"></i><p>No discussions yet. Start a thread!</p></div> :
          <div className="space-y-3">
            {discussions.map(d => (
              <div key={d.id} onClick={() => openThread(d.id)} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0"><i className="ri-discuss-line text-primary"></i></div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm mb-1">{d.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-1 mb-2">{d.content}</p>
                    <div className="flex items-center gap-3 text-[11px] text-gray-400">
                      <span><i className="ri-user-line mr-1"></i>{d.authorName || 'Unknown'}</span>
                      <span><i className="ri-chat-3-line mr-1"></i>{d.replyCount || 0} replies</span>
                      <span><i className="ri-time-line mr-1"></i>{d.createdAt ? new Date(d.createdAt).toLocaleDateString() : ''}</span>
                    </div>
                  </div>
                  <i className="ri-arrow-right-s-line text-gray-400"></i>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </AdminLayout>
  );
};
export default MentorDiscussion;
