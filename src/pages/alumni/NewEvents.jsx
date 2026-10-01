import { useState, useEffect } from 'react';
import AdminLayout from '@/components/layout/AdminLayout';
import Loader from '@/components/ui/Loader';
import Swal, { getSwalOpts } from '../../utils/swal';

import { alumniApi } from '../../utils/api';

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

  const typeColors = { webinar: 'bg-blue-100 text-blue-700', workshop: 'bg-purple-100 text-purple-700', 'live-session': 'bg-green-100 text-green-700', hackathon: 'bg-red-100 text-red-700', seminar: 'bg-amber-100 text-amber-700' };
  const typeIcons = { webinar: 'ri-live-line', workshop: 'ri-tools-line', 'live-session': 'ri-webcam-line', hackathon: 'ri-code-s-slash-line', seminar: 'ri-presentation-line' };

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div><h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Events</h1><p className="text-sm text-gray-500 mt-1">{events.length} events scheduled</p></div>
          <button onClick={openCreate} className="px-4 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark flex items-center gap-2"><i className="ri-add-line"></i>New Event</button>
        </div>

        {loading ? <Loader text="Loading events..." /> :
        events.length === 0 ? <div className="text-center py-20 text-gray-400"><i className="ri-calendar-event-line text-4xl mb-3 block"></i><p>No events scheduled</p></div> :

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {events.map(ev => (
            <div key={ev.id} className="bg-white dark-theme:bg-gray-900 rounded-2xl border border-sand dark-theme:border-gray-800 hover:shadow-md transition-shadow overflow-hidden">
              <div className="h-2 bg-gradient-to-r from-primary to-primary-dark"></div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center"><i className={`${typeIcons[ev.eventType] || 'ri-calendar-line'} text-primary`}></i></div>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium ${typeColors[ev.eventType] || 'bg-gray-100 text-gray-700'}`}>{ev.eventType}</span>
                </div>
                <h3 className="font-semibold text-gray-800 dark-theme:text-gray-100 text-sm mb-1">{ev.title}</h3>
                <p className="text-xs text-gray-500 line-clamp-2 mb-3">{ev.description}</p>
                <div className="space-y-1 text-xs text-gray-400 mb-4">
                  <div className="flex items-center gap-1"><i className="ri-calendar-line"></i>{ev.eventDate ? new Date(ev.eventDate).toLocaleDateString() : 'TBD'}</div>
                  <div className="flex items-center gap-1"><i className="ri-time-line"></i>{ev.eventTime || 'TBD'} · {ev.duration} min</div>
                  {ev.location && <div className="flex items-center gap-1"><i className="ri-map-pin-line"></i>{ev.location}</div>}
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(ev)} className="flex-1 py-2 rounded-xl bg-primary/10 text-primary text-xs font-medium hover:bg-primary/20"><i className="ri-edit-line mr-1"></i>Edit</button>
                  <button onClick={() => handleDelete(ev.id)} className="flex-1 py-2 rounded-xl bg-red-50 dark-theme:bg-red-900/20 text-red-600 text-xs font-medium hover:bg-red-100"><i className="ri-delete-bin-line mr-1"></i>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>}
      </div>

      {showModal && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/40">
          <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 w-full max-w-lg mx-4 border border-sand dark-theme:border-gray-800">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-bold text-gray-800 dark-theme:text-gray-100">{editing ? 'Edit Event' : 'Create Event'}</h3>
              <button onClick={() => setShowModal(false)} className="w-8 h-8 rounded-lg hover:bg-gray-100 flex items-center justify-center"><i className="ri-close-line text-lg text-gray-500"></i></button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" placeholder="Event Title" required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <textarea placeholder="Description" rows={3} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm resize-none" />
              <div className="grid grid-cols-2 gap-3">
                <input type="date" value={form.eventDate} onChange={e => setForm({ ...form, eventDate: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
                <input type="time" value={form.eventTime} onChange={e => setForm({ ...form, eventTime: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <select value={form.eventType} onChange={e => setForm({ ...form, eventType: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 outline-none text-sm">
                  <option value="webinar">Webinar</option><option value="workshop">Workshop</option><option value="live-session">Live Session</option><option value="hackathon">Hackathon</option><option value="seminar">Seminar</option>
                </select>
                <input type="number" placeholder="Duration (min)" value={form.duration} onChange={e => setForm({ ...form, duration: parseInt(e.target.value) || 60 })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              </div>
              <input type="text" placeholder="Location / Meeting Link" value={form.location} onChange={e => setForm({ ...form, location: e.target.value })} className="w-full px-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-sm" />
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setShowModal(false)} className="flex-1 py-2.5 rounded-xl border border-sand text-sm font-medium text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="flex-1 py-2.5 rounded-xl bg-primary text-white text-sm font-medium hover:bg-primary-dark">{editing ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};
export default NewEvents;
