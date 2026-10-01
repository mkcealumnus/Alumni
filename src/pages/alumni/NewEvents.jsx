import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { alumniApi } from '../../utils/api';
import { Plus, Calendar, Clock, MapPin, Edit, Trash2, X, Video, Wrench, Code, Presentation } from 'lucide-react';

const NewEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({ title: '', description: '', eventDate: '', eventTime: '', eventType: 'webinar', location: '', duration: 60 });

  const fetchEvents = async () => {
    setLoading(true);
    const res = await alumniApi.getEvents();
    if (res.success) setEvents(res.events || []);
    setLoading(false);
  };

  useEffect(() => { fetchEvents(); }, []);

  const openCreate = () => { setEditing(null); setForm({ title: '', description: '', eventDate: '', eventTime: '', eventType: 'webinar', location: '', duration: 60 }); setShowModal(true); };
  const openEdit = (ev) => { setEditing(ev); setForm({ title: ev.title, description: ev.description || '', eventDate: ev.eventDate?.split('T')[0] || '', eventTime: ev.eventTime || '', eventType: ev.eventType || 'webinar', location: ev.location || '', duration: ev.duration || 60 }); setShowModal(true); };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = editing ? await alumniApi.updateEvent(editing.id, form) : await alumniApi.createEvent(form);
    if (res.success) {
      Swal.fire({ ...getSwalOpts(), icon: 'success', title: editing ? 'Event Updated!' : 'Event Created!', timer: 1500, showConfirmButton: false});
      setShowModal(false); fetchEvents();
    } else Swal.fire({ ...getSwalOpts(), icon: 'error', title: 'Error', text: res.message});
  };

  const handleDelete = (id) => {
    Swal.fire({ ...getSwalOpts(), title: 'Delete Event?', icon: 'warning', showCancelButton: true, confirmButtonColor: '#dc2626', confirmButtonText: 'Delete'})
      .then(async r => { if (r.isConfirmed) { await alumniApi.deleteEvent(id); fetchEvents(); } });
  };

  const typeIcons = {
    webinar: Video,
    workshop: Wrench,
    'live-session': Video,
    hackathon: Code,
    seminar: Presentation
  };

  const inputClass = 'w-full px-3.5 py-2.5 rounded-lg border outline-none text-xs font-medium transition-colors focus:border-[var(--color-primary)]';
  const inputStyle = { background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-text)' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold tracking-tight" style={{ color: 'var(--color-text)' }}>Events Management</h1>
            <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>{events.length} institutional events scheduled</p>
          </div>
          <button onClick={openCreate} className="px-4 py-2.5 rounded-lg text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-colors" style={{ background: 'var(--color-primary)' }}>
            <Plus className="w-4 h-4" /> New Event
          </button>
        </div>

        {loading ? <Loader text="Loading events..." /> :
        events.length === 0 ? (
          <div className="text-center py-16 rounded-xl border p-8" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
            <Calendar className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="text-xs font-medium">No events scheduled yet</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {events.map(ev => {
              const EventIcon = typeIcons[ev.eventType] || Calendar;
              return (
                <div key={ev.id} className="rounded-xl border transition-all hover:shadow-xs overflow-hidden flex flex-col justify-between" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
                  <div className="h-1" style={{ background: 'var(--color-primary)' }}></div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(18, 53, 91, 0.08)', color: 'var(--color-primary)' }}>
                          <EventIcon className="w-4 h-4" />
                        </div>
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold uppercase tracking-wider" style={{ background: 'var(--color-background)', color: 'var(--color-text-muted)', border: '1px solid var(--color-border)' }}>
                          {ev.eventType}
                        </span>
                      </div>
                      <h3 className="font-semibold text-xs mb-1" style={{ color: 'var(--color-text)' }}>{ev.title}</h3>
                      <p className="text-xs line-clamp-2 mb-4" style={{ color: 'var(--color-text-muted)' }}>{ev.description}</p>
                    </div>

                    <div>
                      <div className="space-y-1.5 text-xs mb-4" style={{ color: 'var(--color-text-muted)' }}>
                        <div className="flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {ev.eventDate ? new Date(ev.eventDate).toLocaleDateString() : 'TBD'}</div>
                        <div className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {ev.eventTime || 'TBD'} · {ev.duration} min</div>
                        {ev.location && <div className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5 text-[var(--color-primary)]" /> {ev.location}</div>}
                      </div>
                      <div className="flex gap-2">
                        <button onClick={() => openEdit(ev)} className="flex-1 py-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1 hover:opacity-80 transition-colors" style={{ background: 'var(--color-background)', borderColor: 'var(--color-border)', color: 'var(--color-primary)' }}>
                          <Edit className="w-3.5 h-3.5" /> Edit
                        </button>
                        <button onClick={() => handleDelete(ev.id)} className="flex-1 py-2 rounded-lg border text-xs font-semibold flex items-center justify-center gap-1 hover:opacity-80 transition-colors text-red-600" style={{ background: 'rgba(239, 68, 68, 0.05)', borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                          <Trash2 className="w-3.5 h-3.5" /> Delete
                        </button>
                      </div>
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
          <div className="rounded-xl p-6 w-full max-w-lg mx-4 border shadow-lg" style={{ background: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>{editing ? 'Edit Event' : 'Create Event'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg flex items-center justify-center border hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Event Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className={inputClass} style={inputStyle} />
              <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className={`${inputClass} resize-none`} style={inputStyle} />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} className={inputClass} style={inputStyle} />
                <input type="time" value={form.eventTime} onChange={e => setForm({ ...form, eventTime: e.target.value })} className={inputClass} style={inputStyle} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })} className={inputClass} style={inputStyle}>
                  <option value="webinar">Webinar</option><option value="workshop">Workshop</option><option value="live-session">Live Session</option><option value="hackathon">Hackathon</option><option value="seminar">Seminar</option>
                </select>
                <input type="number" placeholder="Duration (min)" value={form.duration} onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 60 })} className={inputClass} style={inputStyle} />
              </div>
              <input type="text" placeholder="Location / Meeting Link" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className={inputClass} style={inputStyle} />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-lg border text-xs font-semibold hover:opacity-80" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-lg text-white text-xs font-semibold hover:opacity-90" style={{ background: 'var(--color-primary)' }}>{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default NewEvents;
