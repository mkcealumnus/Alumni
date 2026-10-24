import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, CheckCircle2 } from "lucide-react";
import { DEMO_EVENTS } from "../../data/demoData";

export default function StudentEventsPage() {
  const [registeredEventIds, setRegisteredEventIds] = useState<string[]>(["evt-01"]);

  const toggleRSVP = (id: string) => {
    setRegisteredEventIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Alumni Events &amp; AMAs
          </h1>
          <p className="text-xs text-secondary">
            Participate in interactive technical workshops, career roadmap AMAs, and panel sessions.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          {DEMO_EVENTS.length} Scheduled Events
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEMO_EVENTS.map((evt) => {
          const isRegistered = registeredEventIds.includes(evt.id);
          return (
            <div
              key={evt.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px] font-mono bg-[#F8F8F5]">
                    {evt.format}
                  </Badge>
                  {isRegistered && (
                    <Badge variant="default" className="text-[10px] bg-emerald-600 text-white gap-1">
                      <CheckCircle2 className="w-3 h-3" />
                      Registered
                    </Badge>
                  )}
                </div>

                <div>
                  <h2 className="font-bold text-sm sm:text-base text-primary">
                    {evt.title}
                  </h2>
                  <p className="text-xs text-accent font-medium mt-1">
                    {evt.speakerName} ({evt.speakerCompany})
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

                <p className="text-xs text-secondary leading-relaxed">
                  {evt.description}
                </p>

                <div className="flex flex-wrap gap-1 pt-1">
                  {evt.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#F8F8F5] border border-border text-secondary font-mono"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <span className="text-[10px] font-mono text-secondary">
                  {evt.registeredCount + (isRegistered ? 1 : 0)} students attending
                </span>
                <Button
                  size="sm"
                  variant={isRegistered ? "outline" : "primary"}
                  onClick={() => toggleRSVP(evt.id)}
                  className="text-xs h-8"
                >
                  {isRegistered ? "Cancel RSVP" : "Register Free"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
