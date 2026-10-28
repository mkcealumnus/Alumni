import { useState, useMemo, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Users,
  Search,
  GraduationCap,
  MessageSquare,
  ShieldCheck,
  Clock,
  Lock,
  CheckCircle2,
  XCircle,
  Eye,
} from "lucide-react";
import { useMentorship } from "../../context/mentorshipContext";
import { useAuth } from "../../context/authContext";
import { MOCK_ALUMNI } from "../../lib/mockData";
import { UserProfile } from "../../lib/types";
import { RequestMentorshipModal } from "../../components/mentorship/requestMentorshipModal";
import { MentorProfileModal } from "../../components/mentorship/mentorProfileModal";
import { PrivateConversationView } from "../../components/mentorship/privateConversationView";

interface StudentOneOnOnePageProps {
  initialTab?: "discover" | "requests" | "conversations";
}

export default function StudentOneOnOnePage({ initialTab = "discover" }: StudentOneOnOnePageProps) {
  const { conversationId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const {
    mentorshipRequests,
    conversations,
    getConversationById,
  } = useMentorship();

  const [activeTab, setActiveTab] = useState<"discover" | "requests" | "conversations">(
    conversationId ? "conversations" : initialTab
  );

  const [search, setSearch] = useState("");
  const [domainFilter, setDomainFilter] = useState("all");

  // Modals state
  const [selectedAlumForProfile, setSelectedAlumForProfile] = useState<UserProfile | null>(null);
  const [selectedAlumForRequest, setSelectedAlumForRequest] = useState<UserProfile | null>(null);

  // Selected conversation
  const [selectedConvId, setSelectedConvId] = useState<string | null>(
    conversationId || (conversations.length > 0 ? conversations[0].id : null)
  );

  useEffect(() => {
    if (conversationId) {
      setSelectedConvId(conversationId);
      setActiveTab("conversations");
    }
  }, [conversationId]);

  // Current student's requests
  const myRequests = useMemo(() => {
    const studentId = user?.id || "student-demo-alex";
    return mentorshipRequests.filter((r) => r.student_id === studentId);
  }, [mentorshipRequests, user]);

  // Current student's conversations
  const myConversations = useMemo(() => {
    const studentId = user?.id || "student-demo-alex";
    return conversations.filter((c) => c.student_id === studentId);
  }, [conversations, user]);

  // Filtered alumni for directory
  const filteredAlumni = useMemo(() => {
    return MOCK_ALUMNI.filter((alum) => {
      const matchesSearch =
        search === "" ||
        alum.full_name.toLowerCase().includes(search.toLowerCase()) ||
        alum.current_company?.toLowerCase().includes(search.toLowerCase()) ||
        alum.current_role?.toLowerCase().includes(search.toLowerCase()) ||
        alum.skills.some((s) => s.toLowerCase().includes(search.toLowerCase()));

      const matchesDomain =
        domainFilter === "all" ||
        (domainFilter === "system-design" &&
          alum.skills.some((s) => s.toLowerCase().includes("system") || s.toLowerCase().includes("cloud"))) ||
        (domainFilter === "embedded" &&
          alum.skills.some((s) => s.toLowerCase().includes("embedded") || s.toLowerCase().includes("hardware"))) ||
        (domainFilter === "ai-ml" &&
          alum.skills.some((s) => s.toLowerCase().includes("machine") || s.toLowerCase().includes("ai"))) ||
        (domainFilter === "swe" &&
          alum.skills.some((s) => s.toLowerCase().includes("typescript") || s.toLowerCase().includes("node") || s.toLowerCase().includes("python")));

      return matchesSearch && matchesDomain;
    });
  }, [search, domainFilter]);

  const activeConversation = selectedConvId ? getConversationById(selectedConvId) : null;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* 1. PAGE HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono uppercase tracking-wider text-accent font-semibold px-1.5 py-0.5 bg-accent/10 rounded-xs">
              Private Guidance Track
            </span>
            <Badge variant="outline" className="text-[9px] bg-white font-mono flex items-center gap-1">
              <Lock className="w-2.5 h-2.5 text-accent" />
              <span>Confidential 1-on-1</span>
            </Badge>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-primary">
            1-on-1 Mentorship
          </h1>
          <p className="text-xs text-secondary mt-0.5">
            Connect with an alumnus who can guide your next step.
          </p>
        </div>

        {/* Switch to Open Chat */}
        <div className="flex items-center gap-2">
          <Link to="/student/mentorship/open-chat">
            <Button
              variant="outline"
              size="sm"
              className="text-xs gap-1.5 border-border bg-surface shadow-subtle hover:bg-[#F8F8F5]"
            >
              <Users className="w-3.5 h-3.5 text-accent" />
              <span>Community Open Chat</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* 2. NAVIGABLE VIEW TABS */}
      <div className="flex border-b border-border gap-2 overflow-x-auto scrollbar-none">
        <button
          type="button"
          onClick={() => {
            setActiveTab("discover");
            navigate("/student/mentorship/one-on-one");
          }}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "discover"
              ? "border-accent text-accent"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <Search className="w-3.5 h-3.5" />
          <span>Discover Alumni Mentors</span>
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("requests");
            navigate("/student/mentorship/requests");
          }}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "requests"
              ? "border-accent text-accent"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <GraduationCap className="w-3.5 h-3.5" />
          <span>My Mentorship Requests</span>
          {myRequests.length > 0 && (
            <Badge variant="outline" className="text-[9px] py-0 px-1 font-mono">
              {myRequests.length}
            </Badge>
          )}
        </button>

        <button
          type="button"
          onClick={() => {
            setActiveTab("conversations");
            if (myConversations.length > 0 && !selectedConvId) {
              setSelectedConvId(myConversations[0].id);
            }
          }}
          className={`pb-3 px-3 text-xs font-semibold border-b-2 flex items-center gap-2 transition-colors whitespace-nowrap ${
            activeTab === "conversations"
              ? "border-accent text-accent"
              : "border-transparent text-secondary hover:text-primary"
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Private Conversations</span>
          {myConversations.length > 0 && (
            <Badge className="text-[9px] py-0 px-1.5 bg-accent text-white font-mono">
              {myConversations.length}
            </Badge>
          )}
        </button>
      </div>

      {/* 3. TAB 1: DISCOVER ALUMNI MENTORS */}
      {activeTab === "discover" && (
        <div className="space-y-6">
          {/* Search & Domain Filter Bar */}
          <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center justify-between">
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none text-xs">
              {[
                { id: "all", label: "All Mentorship Areas" },
                { id: "system-design", label: "System Design & Cloud" },
                { id: "swe", label: "Software Engineering" },
                { id: "ai-ml", label: "AI & Machine Learning" },
                { id: "embedded", label: "Core Electronics / Embedded" },
              ].map((domain) => (
                <button
                  key={domain.id}
                  type="button"
                  onClick={() => setDomainFilter(domain.id)}
                  className={`px-3 py-1.5 rounded-sm text-xs font-medium whitespace-nowrap border transition-colors ${
                    domainFilter === domain.id
                      ? "bg-primary text-white border-primary"
                      : "bg-surface text-secondary border-border hover:bg-[#F2F2EC] hover:text-primary"
                  }`}
                >
                  {domain.label}
                </button>
              ))}
            </div>

            <div className="relative w-full sm:w-72 shrink-0">
              <Search className="w-3.5 h-3.5 text-secondary absolute left-2.5 top-1/2 -translate-y-1/2" />
              <Input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name, company, skill..."
                className="pl-8 text-xs h-9 bg-surface border-border"
              />
            </div>
          </div>

          {/* Alumni Directory Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredAlumni.map((alum) => {
              // Check if student already has a pending or active request with this alumnus
              const existingPending = myRequests.find(
                (r) => r.alumni_id === alum.id && r.status === "pending"
              );
              const existingActive = myConversations.find(
                (c) => c.alumni_id === alum.id && c.status === "active"
              );

              return (
                <div
                  key={alum.id}
                  className="bg-surface border border-border rounded-md p-5 shadow-subtle flex flex-col justify-between space-y-4 hover:border-accent/40 transition-colors"
                >
                  <div className="space-y-3">
                    {/* Alumnus Header */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-sm bg-accent/15 text-accent font-bold text-sm flex items-center justify-center shrink-0">
                          {alum.full_name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")
                            .slice(0, 2)
                            .toUpperCase()}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-bold text-sm text-primary">
                              {alum.full_name}
                            </h3>
                            <ShieldCheck className="w-3.5 h-3.5 text-accent shrink-0" />
                          </div>
                          <p className="text-xs text-accent font-medium mt-0.5">
                            {alum.current_role}
                          </p>
                          <p className="text-[11px] text-secondary">
                            {alum.current_company} &bull; {alum.department_code} &apos;{alum.graduation_year.toString().slice(-2)}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Bio Snippet */}
                    <p className="text-xs text-secondary leading-relaxed line-clamp-2">
                      {alum.bio || "Experienced alumnus offering 1-on-1 guidance on career paths, interview prep, and technical architecture."}
                    </p>

                    {/* Mentorship Competencies */}
                    <div className="flex flex-wrap gap-1">
                      {alum.skills.slice(0, 3).map((s) => (
                        <span
                          key={s}
                          className="text-[10px] font-mono px-2 py-0.5 bg-[#F8F8F5] border border-border rounded-xs text-secondary"
                        >
                          {s}
                        </span>
                      ))}
                      {alum.skills.length > 3 && (
                        <span className="text-[10px] font-mono px-1.5 py-0.5 bg-[#F8F8F5] text-secondary">
                          +{alum.skills.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-3 border-t border-border flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedAlumForProfile(alum)}
                      className="text-xs h-8 flex-1 border-border gap-1"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Profile</span>
                    </Button>

                    {existingActive ? (
                      <Button
                        size="sm"
                        onClick={() => {
                          setSelectedConvId(existingActive.id);
                          setActiveTab("conversations");
                        }}
                        className="text-xs h-8 flex-1 gap-1 bg-semantic-success hover:bg-emerald-700 text-white"
                      >
                        <MessageSquare className="w-3.5 h-3.5" />
                        <span>Chat Now</span>
                      </Button>
                    ) : existingPending ? (
                      <Button
                        size="sm"
                        variant="outline"
                        disabled
                        className="text-xs h-8 flex-1 border-border text-secondary bg-[#F8F8F5]"
                      >
                        <Clock className="w-3.5 h-3.5 mr-1" />
                        <span>Request Pending</span>
                      </Button>
                    ) : (
                      <Button
                        size="sm"
                        onClick={() => setSelectedAlumForRequest(alum)}
                        className="text-xs h-8 flex-1 gap-1 shadow-subtle"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        <span>Request Mentorship</span>
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* 4. TAB 2: MY MENTORSHIP REQUESTS */}
      {activeTab === "requests" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between pb-2">
            <div>
              <h2 className="font-bold text-sm text-primary">Sent Mentorship Requests</h2>
              <p className="text-xs text-secondary">
                Track the approval status of your 1-on-1 mentorship inquiries.
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setActiveTab("discover")}
              className="text-xs h-8 border-border"
            >
              + Find Another Mentor
            </Button>
          </div>

          {myRequests.length === 0 ? (
            <div className="bg-surface border border-border rounded-md p-12 text-center space-y-3">
              <GraduationCap className="w-10 h-10 text-secondary mx-auto" />
              <h3 className="font-bold text-sm text-primary">No mentorship requests sent yet</h3>
              <p className="text-xs text-secondary max-w-sm mx-auto">
                Discover verified alumni working at Stripe, AWS, Google, and more. Send an introductory note to request 1-on-1 guidance.
              </p>
              <Button
                size="sm"
                onClick={() => setActiveTab("discover")}
                className="text-xs mt-2"
              >
                Browse Alumni Directory
              </Button>
            </div>
          ) : (
            <div className="space-y-3">
              {myRequests.map((req) => {
                const isAccepted = req.status === "accepted";
                const isPending = req.status === "pending";
                const isDeclined = req.status === "declined";

                return (
                  <div
                    key={req.id}
                    className="bg-surface border border-border rounded-md p-5 shadow-subtle space-y-3"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-sm bg-accent/15 text-accent font-bold text-xs flex items-center justify-center shrink-0">
                          {req.alumni_initials || "AL"}
                        </div>
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-sm text-primary">
                              {req.alumni_name}
                            </span>
                            <span className="text-xs text-secondary">
                              &bull; {req.alumni_role_title} ({req.alumni_company})
                            </span>
                          </div>
                          <p className="text-xs text-accent font-medium mt-0.5">
                            Focus: {req.topic}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {isPending && (
                          <Badge variant="outline" className="text-xs font-mono border-amber-300 text-amber-700 bg-amber-50 gap-1">
                            <Clock className="w-3 h-3" />
                            <span>Pending Review</span>
                          </Badge>
                        )}
                        {isAccepted && (
                          <Badge className="text-xs font-mono bg-semantic-success text-white gap-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Accepted</span>
                          </Badge>
                        )}
                        {isDeclined && (
                          <Badge variant="outline" className="text-xs font-mono text-secondary bg-[#F8F8F5] gap-1">
                            <XCircle className="w-3 h-3" />
                            <span>Declined</span>
                          </Badge>
                        )}
                      </div>
                    </div>

                    <p className="text-xs text-secondary bg-[#F8F8F5] p-3 rounded-sm border border-border leading-relaxed">
                      &ldquo;{req.introductory_message}&rdquo;
                    </p>

                    <div className="flex flex-col sm:flex-row sm:items-center justify-between text-[11px] text-secondary font-mono gap-2 pt-1 border-t border-border">
                      <span>Cadence: {req.preferred_cadence}</span>
                      <div className="flex items-center gap-3">
                        <span>Requested {new Date(req.created_at).toLocaleDateString()}</span>
                        {isAccepted && (
                          <Button
                            size="sm"
                            onClick={() => {
                              const matchingConv = myConversations.find(
                                (c) => c.alumni_id === req.alumni_id
                              );
                              if (matchingConv) {
                                setSelectedConvId(matchingConv.id);
                                setActiveTab("conversations");
                              }
                            }}
                            className="text-xs h-7 px-3 gap-1 shadow-xs"
                          >
                            <MessageSquare className="w-3 h-3" />
                            <span>Open Conversation</span>
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* 5. TAB 3: PRIVATE CONVERSATIONS (Dual Panel or Full View) */}
      {activeTab === "conversations" && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[580px]">
          {/* Left: Active Conversations List (4 cols) */}
          <div className="lg:col-span-4 bg-surface border border-border rounded-md shadow-subtle p-3 flex flex-col space-y-3">
            <div className="p-2 border-b border-border flex items-center justify-between">
              <div>
                <h3 className="font-bold text-xs text-primary uppercase font-mono tracking-wider">
                  Active Mentorships
                </h3>
                <p className="text-[10px] text-secondary">
                  Participant-level authorization
                </p>
              </div>
              <Badge variant="outline" className="text-[10px] font-mono">
                {myConversations.length} Active
              </Badge>
            </div>

            {myConversations.length === 0 ? (
              <div className="py-12 text-center space-y-2 p-4">
                <Lock className="w-8 h-8 text-secondary mx-auto" />
                <p className="text-xs font-semibold text-primary">No active conversations</p>
                <p className="text-[11px] text-secondary">
                  Private conversations become available once an alumnus accepts your mentorship request.
                </p>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setActiveTab("discover")}
                  className="text-xs mt-2 border-border"
                >
                  Request a Mentor
                </Button>
              </div>
            ) : (
              <div className="space-y-1.5 overflow-y-auto flex-1">
                {myConversations.map((conv) => {
                  const isSelected = conv.id === selectedConvId;
                  return (
                    <button
                      key={conv.id}
                      type="button"
                      onClick={() => setSelectedConvId(conv.id)}
                      className={`w-full text-left p-3 rounded-sm border transition-colors flex items-start gap-3 ${
                        isSelected
                          ? "bg-accent/10 border-accent text-primary shadow-xs"
                          : "bg-surface border-border hover:bg-[#F8F8F5] text-secondary"
                      }`}
                    >
                      <div className="w-9 h-9 rounded-sm bg-accent/20 text-accent font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                        {conv.alumni_initials}
                      </div>
                      <div className="overflow-hidden flex-1 space-y-0.5">
                        <div className="flex items-center justify-between">
                          <span className="font-bold text-xs text-primary truncate">
                            {conv.alumni_name}
                          </span>
                          <span className="text-[10px] font-mono text-secondary shrink-0">
                            {new Date(conv.last_message_at).toLocaleTimeString([], {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <p className="text-[11px] text-accent font-medium truncate">
                          {conv.topic}
                        </p>
                        <p className="text-[11px] text-secondary truncate">
                          {conv.last_message_preview || "Conversation active"}
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Right: Private Conversation Chat Stream (8 cols) */}
          <div className="lg:col-span-8 min-h-[500px]">
            {activeConversation ? (
              <PrivateConversationView conversation={activeConversation} />
            ) : (
              <div className="h-full bg-surface border border-border rounded-md p-12 flex flex-col items-center justify-center text-center space-y-3">
                <Lock className="w-10 h-10 text-secondary" />
                <h3 className="font-bold text-sm text-primary">Select a Conversation</h3>
                <p className="text-xs text-secondary max-w-sm">
                  Choose an active mentorship track from the left panel to review messages and communicate privately with your mentor.
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <MentorProfileModal
        isOpen={Boolean(selectedAlumForProfile)}
        onClose={() => setSelectedAlumForProfile(null)}
        alumnus={selectedAlumForProfile}
        onRequestMentorship={(alum) => setSelectedAlumForRequest(alum)}
        isPendingRequest={Boolean(
          selectedAlumForProfile &&
            myRequests.some(
              (r) => r.alumni_id === selectedAlumForProfile.id && r.status === "pending"
            )
        )}
        isActiveMentorship={Boolean(
          selectedAlumForProfile &&
            myConversations.some(
              (c) => c.alumni_id === selectedAlumForProfile.id && c.status === "active"
            )
        )}
      />

      <RequestMentorshipModal
        isOpen={Boolean(selectedAlumForRequest)}
        onClose={() => setSelectedAlumForRequest(null)}
        alumnus={selectedAlumForRequest}
        onSuccess={() => {
          setActiveTab("requests");
        }}
      />
    </div>
  );
}
