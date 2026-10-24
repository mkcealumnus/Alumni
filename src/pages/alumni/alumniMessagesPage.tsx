import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "mentor" | "student";
  text: string;
  time: string;
}

export default function AlumniMessagesPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "mentor",
      text: "Hi Alex! Thanks for reaching out about distributed queues and Stripe's backend architecture. What specific areas would you like to review in our upcoming session?",
      time: "Yesterday, 4:15 PM",
    },
    {
      id: "m-2",
      sender: "student",
      text: "Hello Jordan! I've been implementing write-ahead logs and leader election in Go. I would love your advice on handling network partitions and idempotency keys.",
      time: "Yesterday, 5:30 PM",
    },
    {
      id: "m-3",
      sender: "mentor",
      text: "Excellent project topic. Bring your repository link and architecture diagram to Saturday's call. We will walk through production failure modes together.",
      time: "Today, 9:20 AM",
    },
  ]);

  const [inputVal, setInputVal] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    const newMsg: ChatMessage = {
      id: `m-${Date.now()}`,
      sender: "mentor",
      text: inputVal.trim(),
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Simulate student reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-std-${Date.now()}`,
          sender: "student",
          text: "Understood, Jordan! I have the benchmark metrics and diagrams ready for Saturday.",
          time: "Just now",
        },
      ]);
    }, 1500);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Mentee Communication Channel
          </h1>
          <p className="text-xs text-secondary">
            Direct simulated message threads with student mentees seeking interview coaching and architectural advice.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          2 Active Threads
        </Badge>
      </div>

      <div className="bg-surface border border-border rounded-md shadow-subtle grid grid-cols-1 md:grid-cols-12 min-h-[520px] overflow-hidden">
        {/* Left Mentees List */}
        <div className="md:col-span-4 border-r border-border p-3 space-y-2 bg-[#F8F8F5]/60">
          <div className="p-2 text-xs font-bold text-secondary uppercase tracking-wider font-mono">
            Student Mentees
          </div>

          <div className="p-3 bg-surface border border-accent/40 rounded-sm space-y-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-primary">Alex Rivera</span>
              <span className="text-[10px] font-mono text-secondary">Today</span>
            </div>
            <p className="text-[11px] text-accent font-medium">
              CSE Class of 2026
            </p>
            <p className="text-[11px] text-secondary truncate">
              Distributed Queues &amp; Go Systems
            </p>
          </div>

          <div className="p-3 bg-surface/50 border border-border rounded-sm space-y-1 opacity-70">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-primary">Kavya Sundaram</span>
              <span className="text-[10px] font-mono text-secondary">Oct 22</span>
            </div>
            <p className="text-[11px] text-secondary">
              ECE Class of 2026
            </p>
            <p className="text-[11px] text-secondary truncate">
              Cloud Infrastructure Roadmap
            </p>
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="md:col-span-8 flex flex-col justify-between h-[520px] bg-surface">
          <div className="p-4 border-b border-border flex items-center justify-between bg-[#F8F8F5]/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-accent/20 text-accent font-bold text-xs flex items-center justify-center">
                AR
              </div>
              <div>
                <h3 className="font-bold text-xs text-primary">Alex Rivera</h3>
                <p className="text-[10px] text-secondary">
                  Computer Science &bull; Pre-final Year &bull; 2026
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] font-mono">
              Mentee
            </Badge>
          </div>

          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFAF8]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "mentor" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-md p-3 text-xs leading-relaxed ${
                    m.sender === "mentor"
                      ? "bg-accent text-white rounded-br-xs"
                      : "bg-surface border border-border text-primary rounded-bl-xs shadow-xs"
                  }`}
                >
                  <p>{m.text}</p>
                </div>
                <span className="text-[9px] font-mono text-secondary pt-1 px-1">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          <form onSubmit={handleSend} className="p-3 border-t border-border flex items-center gap-2 bg-surface">
            <Input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Send guidance or meeting instructions to Alex..."
              className="h-9 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
            />
            <Button type="submit" size="sm" className="h-9 px-3 gap-1.5 text-xs font-semibold">
              <Send className="w-3.5 h-3.5" />
              <span>Reply</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
