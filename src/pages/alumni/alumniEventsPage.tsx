import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, PlusCircle, CheckCircle2, Video } from "lucide-react";
import { DEMO_EVENTS, DemoEvent } from "../../data/demoData";

export default function AlumniEventsPage() {
  const [events, setEvents] = useState<DemoEvent[]>(DEMO_EVENTS);
  const [modalOpen, setModalOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("Saturday, Nov 21");
  const [time, setTime] = useState("5:00 PM IST");
  const [desc, setDesc] = useState("");
  const [success, setSuccess] = useState(false);

  const handleHostEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newEvt: DemoEvent = {
      id: `evt-${Date.now()}`,
      title: title.trim(),
      description: desc.trim() || "Live interactive technical session hosted by Jordan Vance.",
      speakerName: "Jordan Vance",
      speakerRole: "Staff Platform Engineer",
      speakerCompany: "Stripe",
      date,
      time,
      format: "Virtual AMA",
      registeredCount: 1,
      tags: ["Technical AMA", "Stripe", "System Design"],
      isDemo: true,
    };

    setEvents([newEvt, ...events]);
    setModalOpen(false);
    setTitle("");
    setDesc("");
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Alumni Speaking &amp; Webinars
          </h1>
          <p className="text-xs text-secondary">
            Host live AMAs, technical workshops, and career readiness sessions for the student community.
          </p>
        </div>
        <Button
          onClick={() => setModalOpen(true)}
          size="sm"
          className="text-xs gap-1.5 shadow-subtle self-start sm:self-auto"
        >
          <PlusCircle className="w-3.5 h-3.5" />
          <span>Host an AMA or Workshop</span>
        </Button>
      </div>

      {success && (
        <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-950 rounded-sm flex items-center gap-2 text-xs">
          <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          <span>New alumni event scheduled and published to the student portal!</span>
        </div>
      )}

      {/* Grid of Events */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((evt) => (
          <div
            key={evt.id}
            className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4"
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px] font-mono bg-[#F8F8F5]">
                  {evt.format}
                </Badge>
                <span className="text-[11px] font-mono text-emerald-700 font-semibold">
                  {evt.registeredCount} Students RSVP&apos;d
                </span>
              </div>

              <div>
                <h2 className="font-bold text-sm sm:text-base text-primary">
                  {evt.title}
                </h2>
                <p className="text-xs text-accent font-medium mt-1">
                  Speaker: {evt.speakerName} ({evt.speakerCompany})
                </p>
              </div>

              <div className="space-y-1 text-xs text-secondary font-mono">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-secondary" />
                  <span>{evt.date}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-secondary" />
                  <span>{evt.time}</span>
                </div>
              </div>

              <p className="text-xs text-secondary leading-relaxed line-clamp-3">
                {evt.description}
              </p>
            </div>

            <div className="pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[10px] text-secondary font-mono">
                Format: Google Meet
              </span>
              <Button size="sm" variant="outline" className="text-xs h-8 gap-1 border-border">
                <Video className="w-3 h-3 text-accent" />
                <span>Host Room</span>
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal to Host New Event */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-surface border border-border rounded-md max-w-md w-full p-6 space-y-4 shadow-xl">
            <h3 className="font-bold text-sm text-primary border-b border-border pb-2">
              Host a Virtual AMA or Technical Workshop
            </h3>

            <form onSubmit={handleHostEvent} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-medium text-primary">Session Title</label>
                <Input
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Distributed Database Architecture Q&A"
                  className="h-9 text-xs bg-[#F8F8F5]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-medium text-primary">Date</label>
                  <Input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="h-9 text-xs bg-[#F8F8F5]"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-medium text-primary">Time</label>
                  <Input
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="h-9 text-xs bg-[#F8F8F5]"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-medium text-primary">Session Abstract</label>
                <textarea
                  rows={3}
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  placeholder="Outline what students will learn during this 45-60 minute call..."
                  className="w-full rounded-sm border border-border bg-[#F8F8F5] p-2.5 text-xs text-primary focus:outline-none resize-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-border">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => setModalOpen(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button type="submit" size="sm" className="text-xs">
                  Schedule Event
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
