import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { alumniApi } from '../../utils/api';

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

  const diffColors = { easy: 'bg-green-100 text-green-700', medium: 'bg-amber-100 text-amber-700', hard: 'bg-red-100 text-red-700' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Coding Problems</h1><p className="text-sm text-gray-500 mt-1">{problems.length} problems</p></div>
          <button onClick={openCreate} className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark flex items-center gap-2"><i className="ri-add-line"></i>New Problem</button>
        </div>

        {loading ? <Loader text="Loading problems..." /> :
        problems.length === 0 ? <div className="text-center py-20 text-gray-400"><i className="ri-code-s-slash-line text-4xl mb-3 block"></i><p>No problems yet</p></div> :

        <div className="space-y-3">
          {problems.map(p => (
            <div key={p.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:shadow-md transition-shadow">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><i className="ri-code-s-slash-line text-primary"></i></div>
                  <div>
                    <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm">{p.title}</h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${diffColors[p.difficulty] || diffColors.easy}`}>{p.difficulty}</span>
                      {p.category && <span className="text-xs text-gray-400">{p.category}</span>}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button onClick={() => openEdit(p)} className="px-3 py-1.5 rounded-lg bg-blue-50 text-xs text-blue-600 hover:bg-blue-100"><i className="ri-edit-line"></i></button>
                  <button onClick={() => handleDelete(p.id)} className="px-3 py-1.5 rounded-lg bg-red-50 text-xs text-red-600 hover:bg-red-100"><i className="ri-delete-bin-line"></i></button>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-lg mx-4 border border-sand dark-theme:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{editItem ? 'Edit' : 'New'} Problem</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-3">
              <input type="text" placeholder="Problem Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <select value={form.difficulty} onChange={e => setForm({ ...form, difficulty: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm">
                  <option value="easy">Easy</option><option value="medium">Medium</option><option value="hard">Hard</option>
                </select>
                <input type="text" placeholder="Category" value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              </div>
              <input type="text" placeholder="Constraints" value={form.constraints} onChange={e => setForm({ ...form, constraints: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <div className="grid grid-cols-2 gap-3">
                <textarea placeholder="Sample Input" rows={2} value={form.sampleInput} onChange={e => setForm({ ...form, sampleInput: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none font-mono text-xs" />
                <textarea placeholder="Sample Output" rows={2} value={form.sampleOutput} onChange={e => setForm({ ...form, sampleOutput: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none font-mono text-xs" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">{editItem ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default NewProblemSolving;
