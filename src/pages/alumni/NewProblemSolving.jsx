import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { alumniApi } from '../../utils/api';
import { Plus, Code2, Edit, Trash2, X } from 'lucide-react';

const NewProblemSolving = () => {
  const [problems, setProblems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', difficulty: 'easy', category: '', inputFormat: '', outputFormat: '', constraints: '', sampleInput: '', sampleOutput: '' });

  const fetchProblems = async () => {
    setLoading(true);
    const res = await alumniApi.getProblems();
    if (res.success) setProblems(res.problems || []);
    setLoading(false);
  };

  useEffect(() => { fetchProblems(); }, []);

  const openCreate = () => { setEditItem(null); setForm({ title: '', description: '', difficulty: 'easy', category: '', inputFormat: '', outputFormat: '', constraints: '', sampleInput: '', sampleOutput: '' }); setShowModal(true); };
  const openEdit = (p) => { setEditItem(p); setForm({ title: p.title, description: p.description || '', difficulty: p.difficulty || 'easy', category: p.category || '', inputFormat: p.inputFormat || '', outputFormat: p.outputFormat || '', constraints: p.constraints || '', sampleInput: p.sampleInput || '', sampleOutput: p.sampleOutput || '' }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editItem ? await alumniApi.updateProblem(editItem.id, form) : await alumniApi.createProblem(form);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: editItem ? 'Updated!' : 'Created!', timer: 1500, showConfirmButton: false});
      setShowModal(false); fetchProblems();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  const handleDelete = (id) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Problem?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete'})
      .then(async r => { if (r.isConfirmed) { await alumniApi.deleteProblem(id); fetchProblems(); } });
  };

  const diffColors = {
    easy: { bg: 'rgba(16, 185, 129, 0.1)', text: '#059669' },
    medium: { bg: 'rgba(245, 158, 11, 0.1)', text: '#D97706' },
    hard: { bg: 'rgba(239, 68, 68, 0.1)', text: '#DC2626' }
  };

  const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]';
  const inputStyle = { background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Coding Problems</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{problems.length} practice problems configured</p>
          </div>
          <button onClick={openCreate} className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors" style={{ background: 'var(--color-primary)' }}>
            <Plus className="w-4 h-4" /> New Problem
          </button>
        </div>

        {loading ? <Loader text="Loading problems..." /> :
        problems.length === 0 ? (
          <div className="text-center py-16 rounded-xl border p-8" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
            <Code2 className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-xs font-medium">No problems added yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {problems.map(p => {
              const diffStyle = diffColors[p.difficulty] || diffColors.easy;
              return (
                <div key={p.id} className="rounded-xl p-4 border transition-all hover:shadow-xs" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                        <Code2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-xs" style={{ color: 'var(--color-text)' }}>{p.title}</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: diffStyle.bg, color: diffStyle.text }}>{p.difficulty}</span>
                          {p.category && <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>{p.category}</span>}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button onClick={() => openEdit(p)} className="p-2 rounded-lg border transition-colors hover:opacity-80" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button onClick={() => handleDelete(p.id)} className="p-2 rounded-lg border transition-colors hover:opacity-80 text-red-600" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="rounded-xl p-6 w-full max-w-lg mx-4 border max-h-[90vh] overflow-y-auto shadow-lg" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{editItem ? 'Edit' : 'New'} Problem</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Problem Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} style={inputStyle} />
              <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} style={inputStyle} />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className={inputClass} style={inputStyle}>
                  <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
                </select>
                <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <input type="text" placeholder="Constraints" value={form.constraints} onChange={e => setForm({ ...form, constraints: e.target.value })} className={inputClass} style={inputStyle} />
              <div className="grid grid-cols-2 gap-3">
                <textarea placeholder="Sample Input" rows={2} value={form.sampleInput} onChange={e => setForm({ ...form, sampleInput: e.target.value })} className={`${inputClass} resize-none font-mono text-[11px]`} style={inputStyle} />
                <textarea placeholder="Sample Output" rows={2} value={form.sampleOutput} onChange={e => setForm({ ...form, sampleOutput: e.target.value })} className={`${inputClass} resize-none font-mono text-[11px]`} style={inputStyle} />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border text-xs font-semibold hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-white text-xs font-semibold hover:opacity-90" style={{ background: 'var(--color-primary)' }}>{editItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default NewProblemSolving;
