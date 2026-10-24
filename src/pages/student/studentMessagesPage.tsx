import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Send } from "lucide-react";

interface ChatMessage {
  id: string;
  sender: "me" | "mentor";
  text: string;
  time: string;
}

export default function StudentMessagesPage() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "m-1",
      sender: "mentor",
      text: "Hi Alex! Thanks for reaching out about distributed queues and Stripe's backend architecture. What specific areas would you like to review in our upcoming session?",
      time: "Yesterday, 4:15 PM",
    },
    {
      id: "m-2",
      sender: "me",
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
      sender: "me",
      text: inputVal.trim(),
      time: "Just now",
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputVal("");

    // Simulate automatic mentor reply after 1.5s
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: `m-bot-${Date.now()}`,
          sender: "mentor",
          text: "Thanks for the update, Alex! I've noted that down for our scheduled call.",
          time: "Just now",
        },
      ]);
    }, 1200);
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            Mentorship Direct Messages
          </h1>
          <p className="text-xs text-secondary">
            Simulated 1-on-1 messaging channel with your verified alumni mentors.
          </p>
        </div>
        <Badge variant="outline" className="text-xs font-mono self-start sm:self-auto">
          Demo Messaging Active
        </Badge>
      </div>

      <div className="bg-surface border border-border rounded-md shadow-subtle grid grid-cols-1 md:grid-cols-12 min-h-[520px] overflow-hidden">
        {/* Active Chats Sidebar (Left) */}
        <div className="md:col-span-4 border-r border-border p-3 space-y-2 bg-[#F8F8F5]/60">
          <div className="p-2 text-xs font-bold text-secondary uppercase tracking-wider font-mono">
            Active Mentor Threads
          </div>

          <div className="p-3 bg-surface border border-accent/40 rounded-sm space-y-1 cursor-pointer">
            <div className="flex items-center justify-between">
              <span className="font-bold text-xs text-primary">Jordan Vance</span>
              <span className="text-[10px] font-mono text-secondary">9:20 AM</span>
            </div>
            <p className="text-[11px] text-accent font-medium">
              Staff Platform Engineer @ Stripe
            </p>
            <p className="text-[11px] text-secondary truncate">
              Excellent project topic. Bring your repository link...
            </p>
          </div>

          <div className="p-3 bg-surface/50 border border-border rounded-sm space-y-1 opacity-70">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-xs text-primary">Ananya Ramesh</span>
              <span className="text-[10px] font-mono text-secondary">Oct 22</span>
            </div>
            <p className="text-[11px] text-secondary">
              Senior Software Engineer @ Google
            </p>
            <p className="text-[11px] text-secondary truncate">
              Thanks for sharing your profile link...
            </p>
          </div>
        </div>

        {/* Message Thread Area (Right) */}
        <div className="md:col-span-8 flex flex-col justify-between h-[520px] bg-surface">
          {/* Thread Header */}
          <div className="p-4 border-b border-border flex items-center justify-between bg-[#F8F8F5]/40">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-sm bg-accent text-white font-bold text-xs flex items-center justify-center">
                JV
              </div>
              <div>
                <h3 className="font-bold text-xs text-primary">Jordan Vance</h3>
                <p className="text-[10px] text-secondary">
                  Staff Platform Engineer &bull; Stripe
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-[10px] bg-emerald-50 text-emerald-800 border-emerald-200">
              Online
            </Badge>
          </div>

          {/* Messages Container */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#FAFAF8]">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col ${
                  m.sender === "me" ? "items-end" : "items-start"
                }`}
              >
                <div
                  className={`max-w-[80%] rounded-md p-3 text-xs leading-relaxed ${
                    m.sender === "me"
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

          {/* Input Box */}
          <form onSubmit={handleSend} className="p-3 border-t border-border flex items-center gap-2 bg-surface">
            <Input
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Type your message to Jordan..."
              className="h-9 text-xs bg-[#F8F8F5] border-border focus-visible:ring-accent"
            />
            <Button type="submit" size="sm" className="h-9 px-3 gap-1.5 text-xs font-semibold">
              <Send className="w-3.5 h-3.5" />
              <span>Send</span>
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
