import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { alumniApi } from '../../utils/api';
import { Plus, HelpCircle, Clock, ListChecks, Award, Trash2, X } from 'lucide-react';

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

  const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]';
  const inputStyle = { background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Aptitude Tests</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{tests.length} assessment tests created</p>
          </div>
          <button onClick={() => { setForm({ title: '', description: '', duration: 30, totalMarks: 100, isPublished: false, questions: [{ question: '', optionA: '', optionB: '', optionC: '', optionD: '', correctOption: 'A', marks: 1 }] }); setShowModal(true); }}
            className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors" style={{ background: 'var(--color-primary)' }}>
            <Plus className="w-4 h-4" /> New Test
          </button>
        </div>

        {loading ? <Loader text="Loading aptitude tests..." /> :
        tests.length === 0 ? (
          <div className="text-center py-16 rounded-xl border p-8" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
            <HelpCircle className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-xs font-medium">No aptitude tests created yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {tests.map(t => (
              <div key={t.id} className="rounded-xl p-5 border transition-all hover:shadow-xs flex flex-col justify-between" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{
                      background: t.isPublished ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                      color: t.isPublished ? '#059669' : '#D97706'
                    }}>
                      {t.isPublished ? 'Published' : 'Draft'}
                    </span>
                  </div>
                  <h3 className="font-semibold text-xs mb-1" style={{ color: 'var(--color-text)' }}>{t.title}</h3>
                  <p className="text-xs line-clamp-2 mb-3" style={{ color: 'var(--color-text-muted)' }}>{t.description}</p>
                </div>

                <div>
                  <div className="flex items-center gap-3 text-[11px] font-medium mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    <span className="flex items-center gap-1"><Clock className="w-3 h-3 text-[var(--color-primary)]" />{t.duration} min</span>
                    <span className="flex items-center gap-1"><ListChecks className="w-3 h-3 text-[var(--color-primary)]" />{t.totalQuestions} Q</span>
                    <span className="flex items-center gap-1"><Award className="w-3 h-3 text-[var(--color-primary)]" />{t.totalMarks} marks</span>
                  </div>
                  <button onClick={() => handleDelete(t.id)} className="w-full py-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1 text-red-600 hover:opacity-80 transition-colors" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                    <Trash2 className="w-3.5 h-3.5" /> Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40 backdrop-blur-xs">
          <div className="rounded-xl p-6 w-full max-w-2xl mx-4 border max-h-[90vh] overflow-y-auto shadow-lg" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>Create Aptitude Test</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Test Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} style={inputStyle} />
              <textarea placeholder="Description" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} style={inputStyle} />
              <div className="grid grid-cols-2 gap-3">
                <input type="number" placeholder="Duration (minutes)" value={form.duration} onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 30 })} className={inputClass} style={inputStyle} />
                <input type="number" placeholder="Total Marks" value={form.totalMarks} onChange={e => setForm({ ...form, totalMarks: parseInt(e.target.value) || 100 })} className={inputClass} style={inputStyle} />
              </div>
              <label className="flex items-center gap-2 text-xs font-semibold cursor-pointer" style={{ color: 'var(--color-text)' }}>
                <input type="checkbox" checked={form.isPublished} onChange={e => setForm({ ...form, isPublished: e.target.checked })} className="rounded text-[var(--color-primary)]" /> Publish Immediately
              </label>

              <div className="border-t pt-4 space-y-3" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-xs uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Questions ({form.questions.length})</h4>
                  <button type="button" onClick={addQuestion} className="text-xs font-semibold hover:underline flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                    <Plus className="w-3 h-3" /> Add Question
                  </button>
                </div>
                {form.questions.map((q, idx) => (
                  <div key={idx} className="rounded-xl p-4 border space-y-2.5" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold" style={{ color: 'var(--color-primary)' }}>Question {idx + 1}</span>
                      <button type="button" onClick={() => removeQuestion(idx)} className="text-xs text-red-500 hover:text-red-700">
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                    <input type="text" placeholder="Question Text" required value={q.question} onChange={e => updateQuestion(idx, 'question', e.target.value)} className={inputClass} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                    <div className="grid grid-cols-2 gap-2">
                      <input type="text" placeholder="Option A" required value={q.optionA} onChange={e => updateQuestion(idx, 'optionA', e.target.value)} className={inputClass} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                      <input type="text" placeholder="Option B" required value={q.optionB} onChange={e => updateQuestion(idx, 'optionB', e.target.value)} className={inputClass} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                      <input type="text" placeholder="Option C" required value={q.optionC} onChange={e => updateQuestion(idx, 'optionC', e.target.value)} className={inputClass} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                      <input type="text" placeholder="Option D" required value={q.optionD} onChange={e => updateQuestion(idx, 'optionD', e.target.value)} className={inputClass} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                    </div>
                    <div className="flex gap-2">
                      <select value={q.correctOption} onChange={e => updateQuestion(idx, 'correctOption', e.target.value)} className={inputClass} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
                        <option value="A">Correct: Option A</option><option value="B">Correct: Option B</option><option value="C">Correct: Option C</option><option value="D">Correct: Option D</option>
                      </select>
                      <input type="number" placeholder="Marks" value={q.marks} onChange={e => updateQuestion(idx, 'marks', parseInt(e.target.value) || 1)} className={`${inputClass} w-24`} style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }} />
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border text-xs font-semibold hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-white text-xs font-semibold hover:opacity-90" style={{ background: 'var(--color-primary)' }}>Create Test</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default NewAptitude;
