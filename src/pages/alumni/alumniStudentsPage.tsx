import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, CheckCircle2, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";

export default function AlumniStudentsPage() {
  const [search, setSearch] = useState("");
  const [offeredIds, setOfferedIds] = useState<string[]>([]);

  const mockStudents = [
    {
      id: "std-01",
      name: "Alex Rivera",
      department: "Computer Science & Engineering",
      year: 2026,
      aspirations: "Distributed systems, Go microservices, Cloud infrastructure",
      skills: ["Go", "TypeScript", "React", "Docker"],
      initials: "AR",
    },
    {
      id: "std-02",
      name: "Priya Dharshini",
      department: "Information Technology",
      year: 2026,
      aspirations: "Backend engineering, PostgreSQL optimization, System design",
      skills: ["Java", "Spring Boot", "PostgreSQL", "Kafka"],
      initials: "PD",
    },
    {
      id: "std-03",
      name: "Aditya Verma",
      department: "Electronics & Communication",
      year: 2025,
      aspirations: "Embedded firmware, RTOS, IoT devices",
      skills: ["Embedded C", "ARM Cortex", "Linux Drivers"],
      initials: "AV",
    },
    {
      id: "std-04",
      name: "Kavya Sundaram",
      department: "AI & Data Science",
      year: 2026,
      aspirations: "Machine learning research, Transformer fine-tuning, PyTorch",
      skills: ["Python", "PyTorch", "ONNX", "FastAPI"],
      initials: "KS",
    },
  ];

  const filtered = mockStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.aspirations.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase())
  );

  const handleOfferMentorship = (id: string) => {
    setOfferedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Student Directory
          </h1>
          <p className="text-xs text-secondary">
            Discover ambitious students seeking guidance in distributed systems, core engineering, and software development.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          {mockStudents.length} Students in Directory
        </Badge>
      </div>

      <div className="bg-surface border border-border rounded-md p-4 shadow-subtle">
        <div className="relative">
          <Search className="w-4 h-4 text-secondary absolute left-3 top-1/2 -translate-y-1/2" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by name, interest (e.g. Distributed systems, PyTorch), or department..."
            className="pl-9 h-9 text-xs bg-[#F8F8F5] border-border"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filtered.map((s) => {
          const isOffered = offeredIds.includes(s.id);
          return (
            <div
              key={s.id}
              className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-accent/15 text-accent font-bold text-sm flex items-center justify-center shrink-0">
                    {s.initials}
                  </div>
                  <div>
                    <h2 className="font-bold text-sm text-primary">{s.name}</h2>
                    <p className="text-[11px] text-secondary">
                      {s.department} (Class of {s.year})
                    </p>
                  </div>
                </div>

                <div className="space-y-1">
                  <p className="text-xs font-semibold text-primary">Career Aspirations:</p>
                  <p className="text-xs text-secondary leading-relaxed bg-[#F8F8F5] p-2.5 rounded-sm border border-border">
                    {s.aspirations}
                  </p>
                </div>

                <div className="flex flex-wrap gap-1 pt-1">
                  {s.skills.map((skill) => (
                    <span
                      key={skill}
                      className="text-[10px] px-1.5 py-0.5 rounded-xs bg-[#F8F8F5] border border-border text-secondary font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-border flex items-center justify-between gap-2">
                <Link to="/alumni/messages">
                  <Button variant="outline" size="sm" className="text-xs h-8 gap-1 border-border">
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Message</span>
                  </Button>
                </Link>
                <Button
                  size="sm"
                  variant={isOffered ? "outline" : "primary"}
                  onClick={() => handleOfferMentorship(s.id)}
                  className="text-xs h-8 gap-1"
                >
                  {isOffered ? (
                    <>
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Guidance Offered</span>
                    </>
                  ) : (
                    <span>Offer 1-on-1 Guidance</span>
                  )}
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
