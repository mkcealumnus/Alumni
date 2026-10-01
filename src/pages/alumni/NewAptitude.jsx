import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { alumniApi } from '../../utils/api';

const NewAptitude = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', duration: 30, totalMarks: 100, isPublished: false, questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A', marks: 1 }] });

  const fetchTests = async () => {
    setLoading(true);
    const res = await alumniApi.getAptitudeTests();
    if (res.success) setTests(res.tests || []);
    setLoading(false);
  };

  useEffect(() => { fetchTests(); }, []);

  const addQuestion = () => {
    setForm({ ...form, questions: [...form.questions, { question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A', marks: 1 }] });
  };

  const updateQuestion = (idx, field, value) => {
    const q = [...form.questions];
    q[idx] = { ...q[idx], [field]: value };
    setForm({ ...form, questions: q });
  };

  const removeQuestion = (idx) => {
    if (form.questions.length <= 1) return;
    setForm({ ...form, questions: form.questions.filter((_, i) => i !== idx) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const body = { ...form, totalQuestions: form.questions.length };
    const res = await alumniApi.createAptitudeTest(body);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: 'Test Created!', timer: 1500, showConfirmButton: false});
      setShowModal(false); fetchTests();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  const handleDelete = (id) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Test?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete'})
      .then(async r => { if (r.isConfirmed) { await alumniApi.deleteAptitudeTest(id); fetchTests(); } });
  };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Aptitude Tests</h1><p className="text-sm text-gray-500 mt-1">{tests.length} tests</p></div>
          <button onClick={() => { setForm({ title: '', description: '', duration: 30, totalMarks: 100, isPublished: false, questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A', marks: 1 }] }); setShowModal(true); }}
            className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark flex items-center gap-2"><i className="ri-add-line"></i>New Test</button>
        </div>

        {loading ? <Loader text="Loading aptitude tests..." /> :
        tests.length === 0 ? <div className="text-center py-20 text-gray-400"><i className="ri-question-answer-line text-4xl mb-3 block"></i><p>No aptitude tests yet</p></div> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {tests.map(t => (
            <div key={t.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><i className="ri-question-answer-line text-primary"></i></div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${t.isPublished ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>{t.isPublished ? 'Published' : 'Draft'}</span>
              </div>
              <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm mb-1">{t.title}</h3>
              <p className="text-xs text-gray-500 line-clamp-2 mb-3">{t.description}</p>
              <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                <span><i className="ri-time-line mr-1"></i>{t.duration} min</span>
                <span><i className="ri-file-list-line mr-1"></i>{t.totalQuestions} Q</span>
                <span><i className="ri-medal-line mr-1"></i>{t.totalMarks} marks</span>
              </div>
              <button onClick={() => handleDelete(t.id)} className="w-full py-2 rounded-xl bg-red-50 dark-theme:bg-red-900/20 text-red-600 text-xs font-medium hover:bg-red-100"><i className="ri-delete-bin-line mr-1"></i>Delete</button>
            </div>
          ))}
        </div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-2xl mx-4 border border-sand dark-theme:border-gray-800 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">Create Aptitude Test</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-sand flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Test Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <textarea placeholder="Description" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Duration (minutes)" value={form.duration} onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 30 })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
                <input type="number" placeholder="Total Marks" value={form.totalMarks} onChange={e => setForm({ ...form, totalMarks: parseInt(e.target.value) || 100 })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              </div>
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} className="rounded border-sand text-primary" /> Publish
              </label>

              <div className="border-t border-sand dark-theme:border-gray-800 pt-4">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-gray-700 dark-theme:text-gray-300 text-sm">Questions ({form.questions.length})</h4>
                  <button type="button" onClick={addQuestion} className="text-xs text-primary hover:underline flex items-center gap-1"><i className="ri-add-line"></i>Add Question</button>
                </div>
                {form.questions.map((q, idx) => (
                  <div key={idx} className="bg-cream dark-theme:bg-gray-800 rounded-xl p-4 mb-3 space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">Q{idx + 1}</span>
                      <button type="button" onClick={() => removeQuestion(idx)} className="text-xs text-red-400 hover:text-red-600"><i className="ri-close-line"></i></button>
                    </div>
                    <input type="text" placeholder="Question" required value={q.question} onChange={e => updateQuestion(idx, 'question', e.target.value)} className="w-full px-3 py-2 rounded-lg bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-xs" />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Option A" required value={q.optionA} onChange={e => updateQuestion(idx, 'optionA', e.target.value)} className="px-3 py-2 rounded-lg bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-xs" />
                      <input type="text" placeholder="Option B" required value={q.optionB} onChange={e => updateQuestion(idx, 'optionB', e.target.value)} className="px-3 py-2 rounded-lg bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-xs" />
                      <input type="text" placeholder="Option C" required value={q.optionC} onChange={e => updateQuestion(idx, 'optionC', e.target.value)} className="px-3 py-2 rounded-lg bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-xs" />
                      <input type="text" placeholder="Option D" required value={q.optionD} onChange={e => updateQuestion(idx, 'optionD', e.target.value)} className="px-3 py-2 rounded-lg bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-xs" />
                    </div>
                    <div className="flex gap-2">
                      <select value={q.correctOption} onChange={e => updateQuestion(idx, 'correctOption', e.target.value)} className="px-3 py-2 rounded-lg bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 outline-none text-xs">
                        <option value="A">Correct: A</option><option value="B">Correct: B</option><option value="C">Correct: C</option><option value="D">Correct: D</option>
                      </select>
                      <input type="number" placeholder="Marks" value={q.marks} onChange={e => updateQuestion(idx, 'marks', parseInt(e.target.value) || 1)} className="w-20 px-3 py-2 rounded-lg bg-white dark-theme:bg-gray-900 border border-sand dark-theme:border-gray-700 outline-none text-xs" />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand text-sm font-medium text-gray-600 hover:bg-cream">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">Create Test</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default NewAptitude;
