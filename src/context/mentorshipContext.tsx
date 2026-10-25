import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useAuth } from "./authContext";
import {
  OpenChatMessage,
  MentorshipRequestEntity,
  PrivateMentorshipConversation,
  PrivateMentorshipMessage,
  MessageReport,
  ReportReason,
  MentorshipMetrics,
} from "../types/mentorship";

const STORAGE_KEY = "alumnux_mentorship_state_v2";

// -----------------------------------------------------------------------------
// Seed Data: Realistic Open Chat Mentorship Conversations
// -----------------------------------------------------------------------------
const SEED_OPEN_CHAT_MESSAGES: OpenChatMessage[] = [
  {
    id: "ocm-001",
    sender_id: "student-arun",
    sender_name: "Arun Kumar",
    sender_role: "student",
    sender_initials: "AK",
    sender_department: "CSE '26",
    sender_badge: "Student • CSE Class of 2026",
    sender_is_verified: true,
    content: "I'm preparing for my first software engineering interview. Which technical topics should I prioritize for campus product placements?",
    category_tag: "Interview Prep",
    reply_to_message_id: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(), // 26h ago
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    moderation_status: "visible",
    likes_count: 8,
    delivery_status: "read",
  },
  {
    id: "ocm-002",
    sender_id: "alumni-priya",
    sender_name: "Priya Dharshini",
    sender_role: "alumni",
    sender_initials: "PD",
    sender_department: "CSE '19",
    sender_company: "Microsoft",
    sender_badge: "Alumni Mentor • SDE II @ Microsoft",
    sender_is_verified: true,
    content: "Start with data structures (trees, graphs, heaps), SQL indexing fundamentals, and OOP principles. Also practice explaining your project trade-offs clearly under timed conditions.",
    category_tag: "Interview Prep",
    reply_to_message_id: "ocm-001",
    reply_to_preview: {
      id: "ocm-001",
      sender_name: "Arun Kumar",
      sender_role: "student",
      content: "I'm preparing for my first software engineering interview. Which technical topics should I prioritize?",
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    moderation_status: "visible",
    likes_count: 15,
    delivery_status: "read",
  },
  {
    id: "ocm-003",
    sender_id: "alumni-demo-jordan",
    sender_name: "Jordan Vance",
    sender_role: "alumni",
    sender_initials: "JV",
    sender_department: "IT '18",
    sender_company: "Stripe",
    sender_badge: "Alumni Mentor • Staff Platform Engineer @ Stripe",
    sender_is_verified: true,
    content: "To add to Priya's advice: for backend roles, interviewer signals jump dramatically if you understand concurrency primitives, connection pooling, and idempotency in distributed APIs.",
    category_tag: "Interview Prep",
    reply_to_message_id: "ocm-001",
    reply_to_preview: {
      id: "ocm-001",
      sender_name: "Arun Kumar",
      sender_role: "student",
      content: "I'm preparing for my first software engineering interview. Which technical topics should I prioritize?",
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    moderation_status: "visible",
    likes_count: 19,
    delivery_status: "read",
  },
  {
    id: "ocm-004",
    sender_id: "student-karthik-m",
    sender_name: "Karthik Sundar",
    sender_role: "student",
    sender_initials: "KS",
    sender_department: "IT '27",
    sender_badge: "Student • IT Class of 2027",
    sender_is_verified: true,
    content: "How important are portfolio projects compared with online certificates when targeting off-campus referrals?",
    category_tag: "Career Strategy",
    reply_to_message_id: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 14).toISOString(),
    moderation_status: "visible",
    likes_count: 11,
    delivery_status: "read",
  },
  {
    id: "ocm-005",
    sender_id: "alum-102",
    sender_name: "Ananya Ramesh",
    sender_role: "alumni",
    sender_initials: "AR",
    sender_department: "IT '19",
    sender_company: "Google",
    sender_badge: "Alumni Mentor • Senior Software Engineer @ Google",
    sender_is_verified: true,
    content: "Substantial projects win every single time. A single project with real deployment, clean git history, stress testing, and unit tests signals much higher competency than 5 multiple-choice certs.",
    category_tag: "Career Strategy",
    reply_to_message_id: "ocm-004",
    reply_to_preview: {
      id: "ocm-004",
      sender_name: "Karthik Sundar",
      sender_role: "student",
      content: "How important are portfolio projects compared with online certificates?",
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 10).toISOString(),
    moderation_status: "visible",
    likes_count: 24,
    delivery_status: "read",
  },
  {
    id: "ocm-006",
    sender_id: "student-sneha",
    sender_name: "Sneha M.",
    sender_role: "student",
    sender_initials: "SM",
    sender_department: "ECE '26",
    sender_badge: "Student • ECE Class of 2026",
    sender_is_verified: true,
    content: "Can someone from ECE switch into backend engineering? Any specific transition roadmap or pitfalls to avoid?",
    category_tag: "Career Transition",
    reply_to_message_id: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    moderation_status: "visible",
    likes_count: 6,
    delivery_status: "read",
  },
  {
    id: "ocm-007",
    sender_id: "alum-103",
    sender_name: "Vijay Krishna N.",
    sender_role: "alumni",
    sender_initials: "VK",
    sender_department: "ECE '16",
    sender_company: "Freshworks",
    sender_badge: "Alumni Mentor • Engineering Manager @ Freshworks",
    sender_is_verified: true,
    content: "Absolutely! Over 30% of our backend engineers started in ECE or EEE. Focus on Linux OS fundamentals, process memory, TCP/IP networking, and build 2 production-grade backend APIs in Go or Java.",
    category_tag: "Career Transition",
    reply_to_message_id: "ocm-006",
    reply_to_preview: {
      id: "ocm-006",
      sender_name: "Sneha M.",
      sender_role: "student",
      content: "Can someone from ECE switch into backend engineering?",
    },
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
    moderation_status: "visible",
    likes_count: 14,
    delivery_status: "read",
  },
  {
    id: "ocm-008",
    sender_id: "student-demo-alex",
    sender_name: "Alex Rivera",
    sender_role: "student",
    sender_initials: "AR",
    sender_department: "CSE '26",
    sender_badge: "Student • CSE Class of 2026",
    sender_is_verified: true,
    content: "What's the best way to practice distributed queues like Kafka before an interview without setting up a 10-node cluster?",
    category_tag: "System Design",
    reply_to_message_id: null,
    created_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // 45m ago
    updated_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    moderation_status: "visible",
    likes_count: 5,
    delivery_status: "read",
  },
  {
    id: "ocm-009",
    sender_id: "alumni-demo-jordan",
    sender_name: "Jordan Vance",
    sender_role: "alumni",
    sender_initials: "JV",
    sender_department: "IT '18",
    sender_company: "Stripe",
    sender_badge: "Alumni Mentor • Staff Platform Engineer @ Stripe",
    sender_is_verified: true,
    content: "Build a single-node in-memory message broker in Go with commit logs, offsets, and consumer groups. That alone will set you apart from 99% of applicants. Let's discuss further in our 1-on-1 session!",
    category_tag: "System Design",
    reply_to_message_id: "ocm-008",
    reply_to_preview: {
      id: "ocm-008",
      sender_name: "Alex Rivera",
      sender_role: "student",
      content: "What's the best way to practice distributed queues like Kafka before an interview?",
    },
    created_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(), // 15m ago
    updated_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    moderation_status: "visible",
    likes_count: 9,
    delivery_status: "read",
  },
];

// -----------------------------------------------------------------------------
// Seed Data: Realistic 1-on-1 Mentorship Requests
// -----------------------------------------------------------------------------
const SEED_MENTORSHIP_REQUESTS: MentorshipRequestEntity[] = [
  {
    id: "mr-101",
    student_id: "student-priya-d",
    student_name: "Priya Dharshini",
    student_email: "priya.d@student.example.com",
    student_department: "CSE",
    student_graduation_year: 2026,
    student_initials: "PD",
    alumni_id: "alumni-demo-jordan",
    alumni_name: "Jordan Vance",
    alumni_role_title: "Staff Platform Engineer",
    alumni_company: "Stripe",
    alumni_initials: "JV",
    topic: "System Design & Distributed Systems Teardown",
    introductory_message: "Hi Jordan! I've been studying distributed queues and consensus algorithms. I'd love your feedback on my mini Kafka-like project and advice on cracking product backend interviews.",
    preferred_cadence: "Bi-weekly 45-min Zoom calls",
    status: "pending",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
  },
  {
    id: "mr-102",
    student_id: "student-aditya-v",
    student_name: "Aditya Verma",
    student_email: "aditya.v@student.example.com",
    student_department: "IT",
    student_graduation_year: 2025,
    student_initials: "AV",
    alumni_id: "alumni-demo-jordan",
    alumni_name: "Jordan Vance",
    alumni_role_title: "Staff Platform Engineer",
    alumni_company: "Stripe",
    alumni_initials: "JV",
    topic: "Off-Campus Referral & Resume Critique",
    introductory_message: "Hello Jordan, I recently built a full-stack financial dashboard. Could you review my resume and let me know if my backend projects align with Stripe's junior engineer expectations?",
    preferred_cadence: "One-off Resume Review + Written Feedback",
    status: "pending",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "mr-103",
    student_id: "student-kavya-s",
    student_name: "Kavya Sundaram",
    student_email: "kavya.s@student.example.com",
    student_department: "ECE",
    student_graduation_year: 2026,
    student_initials: "KS",
    alumni_id: "alumni-demo-jordan",
    alumni_name: "Jordan Vance",
    alumni_role_title: "Staff Platform Engineer",
    alumni_company: "Stripe",
    alumni_initials: "JV",
    topic: "Transitioning from Core Electronics to Cloud Platform",
    introductory_message: "I am an ECE student passionate about systems programming and Linux internals. Looking for mentorship on bridging the gap into cloud infrastructure engineering.",
    preferred_cadence: "Monthly check-ins",
    status: "accepted",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
    responded_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "mr-104",
    student_id: "student-demo-alex",
    student_name: "Alex Rivera",
    student_email: "student@alumnux.demo",
    student_department: "Computer Science & Engineering",
    student_graduation_year: 2026,
    student_initials: "AR",
    alumni_id: "alumni-demo-jordan",
    alumni_name: "Jordan Vance",
    alumni_role_title: "Staff Platform Engineer",
    alumni_company: "Stripe",
    alumni_initials: "JV",
    topic: "System Design & Distributed Queues",
    introductory_message: "Hello Jordan! I'm preparing for off-campus backend engineering screens. I have built a Go write-ahead log and would value your feedback on high-throughput queue design.",
    preferred_cadence: "Bi-weekly Saturdays (45 mins)",
    status: "accepted",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    responded_at: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
  },
  {
    id: "mr-105",
    student_id: "student-demo-alex",
    student_name: "Alex Rivera",
    student_email: "student@alumnux.demo",
    student_department: "Computer Science & Engineering",
    student_graduation_year: 2026,
    student_initials: "AR",
    alumni_id: "alum-102",
    alumni_name: "Ananya Ramesh",
    alumni_role_title: "Senior Software Engineer",
    alumni_company: "Google",
    alumni_initials: "AR",
    topic: "Off-Campus Core Systems Referral & Algorithms",
    introductory_message: "Hi Ananya! I follow your posts on systems and algorithms. I am solving LeetCode hard graphs and want guidance on getting my resume screened for Google Core Systems.",
    preferred_cadence: "Monthly Check-in",
    status: "pending",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
];

// -----------------------------------------------------------------------------
// Seed Data: 1-on-1 Private Mentorship Conversations
// -----------------------------------------------------------------------------
const SEED_CONVERSATIONS: PrivateMentorshipConversation[] = [
  {
    id: "conv-alex-jordan",
    student_id: "student-demo-alex",
    student_name: "Alex Rivera",
    student_department: "Computer Science & Engineering",
    student_graduation_year: 2026,
    student_initials: "AR",
    alumni_id: "alumni-demo-jordan",
    alumni_name: "Jordan Vance",
    alumni_role_title: "Staff Platform Engineer",
    alumni_company: "Stripe",
    alumni_initials: "JV",
    mentorship_request_id: "mr-104",
    topic: "System Design & Distributed Queues",
    cadence: "Bi-weekly Saturdays (45 mins)",
    status: "active",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 80).toISOString(),
    last_message_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    last_message_preview: "Bring your repository link and architecture diagram to Saturday's call.",
    unread_count_for_current_user: 0,
  },
  {
    id: "conv-kavya-jordan",
    student_id: "student-kavya-s",
    student_name: "Kavya Sundaram",
    student_department: "ECE",
    student_graduation_year: 2026,
    student_initials: "KS",
    alumni_id: "alumni-demo-jordan",
    alumni_name: "Jordan Vance",
    alumni_role_title: "Staff Platform Engineer",
    alumni_company: "Stripe",
    alumni_initials: "JV",
    mentorship_request_id: "mr-103",
    topic: "Transitioning from Core Electronics to Cloud Platform",
    cadence: "Monthly check-ins",
    status: "active",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    last_message_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    last_message_preview: "I am currently reading through the Docker internals documentation.",
    unread_count_for_current_user: 0,
  },
];

// -----------------------------------------------------------------------------
// Seed Data: Private Mentorship Messages
// -----------------------------------------------------------------------------
const SEED_PRIVATE_MESSAGES: Record<string, PrivateMentorshipMessage[]> = {
  "conv-alex-jordan": [
    {
      id: "pm-aj-1",
      conversation_id: "conv-alex-jordan",
      sender_id: "alumni-demo-jordan",
      sender_name: "Jordan Vance",
      sender_role: "alumni",
      content: "Hi Alex! Thanks for reaching out about distributed queues and Stripe's backend architecture. What specific areas would you like to review in our upcoming session?",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    },
    {
      id: "pm-aj-2",
      conversation_id: "conv-alex-jordan",
      sender_id: "student-demo-alex",
      sender_name: "Alex Rivera",
      sender_role: "student",
      content: "Hello Jordan! I've been implementing write-ahead logs and leader election in Go. I would love your advice on handling network partitions and idempotency keys.",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    },
    {
      id: "pm-aj-3",
      conversation_id: "conv-alex-jordan",
      sender_id: "alumni-demo-jordan",
      sender_name: "Jordan Vance",
      sender_role: "alumni",
      content: "Excellent project topic. Bring your repository link and architecture diagram to Saturday's call. We will walk through production failure modes together.",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
    },
  ],
  "conv-kavya-jordan": [
    {
      id: "pm-kj-1",
      conversation_id: "conv-kavya-jordan",
      sender_id: "alumni-demo-jordan",
      sender_name: "Jordan Vance",
      sender_role: "alumni",
      content: "Welcome Kavya! Looking forward to discussing Linux namespaces and cloud infrastructure.",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 40).toISOString(),
    },
    {
      id: "pm-kj-2",
      conversation_id: "conv-kavya-jordan",
      sender_id: "student-kavya-s",
      sender_name: "Kavya Sundaram",
      sender_role: "student",
      content: "Thank you so much Jordan! I am currently reading through the Docker internals documentation and have prepared some questions on cgroups.",
      status: "read",
      created_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
      updated_at: new Date(Date.now() - 1000 * 60 * 60 * 20).toISOString(),
    },
  ],
};

// -----------------------------------------------------------------------------
// Context Interface
// -----------------------------------------------------------------------------
interface MentorshipContextType {
  // Open Chat
  openChatMessages: OpenChatMessage[];
  sendOpenChatMessage: (params: {
    content: string;
    categoryTag?: string;
    replyToMessageId?: string | null;
  }) => Promise<{ success: boolean; message?: OpenChatMessage; error?: string }>;
  reportMessage: (params: {
    messageType: "open_chat" | "private_mentorship";
    messageId: string;
    messagePreview?: string;
    reason: ReportReason;
    details?: string;
  }) => Promise<{ success: boolean; reportId?: string }>;
  deleteOpenChatMessage: (messageId: string) => void;

  // 1-on-1 Mentorship Requests
  mentorshipRequests: MentorshipRequestEntity[];
  createMentorshipRequest: (params: {
    alumniId: string;
    alumniName: string;
    alumniRoleTitle?: string;
    alumniCompany?: string;
    alumniInitials?: string;
    topic: string;
    introductoryMessage: string;
    preferredCadence: string;
  }) => Promise<{ success: boolean; request?: MentorshipRequestEntity; error?: string }>;
  respondToMentorshipRequest: (
    requestId: string,
    status: "accepted" | "declined",
    declineReason?: string
  ) => Promise<{ success: boolean; conversationId?: string; error?: string }>;
  cancelMentorshipRequest: (requestId: string) => void;

  // 1-on-1 Private Conversations
  conversations: PrivateMentorshipConversation[];
  privateMessages: Record<string, PrivateMentorshipMessage[]>;
  getConversationById: (conversationId: string) => PrivateMentorshipConversation | undefined;
  getMessagesForConversation: (conversationId: string) => PrivateMentorshipMessage[];
  sendPrivateMessage: (params: {
    conversationId: string;
    content: string;
  }) => Promise<{ success: boolean; message?: PrivateMentorshipMessage; error?: string }>;
  closeMentorship: (conversationId: string) => Promise<{ success: boolean; error?: string }>;

  // Reports
  reports: MessageReport[];

  // Metrics
  metrics: MentorshipMetrics;

  // Reset
  resetMentorshipData: () => void;
}

const MentorshipContext = createContext<MentorshipContextType | undefined>(undefined);

export const MentorshipProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user } = useAuth();

  const [openChatMessages, setOpenChatMessages] = useState<OpenChatMessage[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_open_chat`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed reading open chat messages from localStorage", e);
    }
    return SEED_OPEN_CHAT_MESSAGES;
  });

  const [mentorshipRequests, setMentorshipRequests] = useState<MentorshipRequestEntity[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_requests`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed reading mentorship requests from localStorage", e);
    }
    return SEED_MENTORSHIP_REQUESTS;
  });

  const [conversations, setConversations] = useState<PrivateMentorshipConversation[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_conversations`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed reading conversations from localStorage", e);
    }
    return SEED_CONVERSATIONS;
  });

  const [privateMessages, setPrivateMessages] = useState<Record<string, PrivateMentorshipMessage[]>>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_private_msgs`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed reading private messages from localStorage", e);
    }
    return SEED_PRIVATE_MESSAGES;
  });

  const [reports, setReports] = useState<MessageReport[]>(() => {
    try {
      const stored = localStorage.getItem(`${STORAGE_KEY}_reports`);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn("Failed reading reports from localStorage", e);
    }
    return [];
  });

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_open_chat`, JSON.stringify(openChatMessages));
    } catch (e) {
      console.warn("Failed writing open chat messages to localStorage", e);
    }
  }, [openChatMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_requests`, JSON.stringify(mentorshipRequests));
    } catch (e) {
      console.warn("Failed writing mentorship requests to localStorage", e);
    }
  }, [mentorshipRequests]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_conversations`, JSON.stringify(conversations));
    } catch (e) {
      console.warn("Failed writing conversations to localStorage", e);
    }
  }, [conversations]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_private_msgs`, JSON.stringify(privateMessages));
    } catch (e) {
      console.warn("Failed writing private messages to localStorage", e);
    }
  }, [privateMessages]);

  useEffect(() => {
    try {
      localStorage.setItem(`${STORAGE_KEY}_reports`, JSON.stringify(reports));
    } catch (e) {
      console.warn("Failed writing reports to localStorage", e);
    }
  }, [reports]);

  // ---------------------------------------------------------------------------
  // Action 1: Send Open Chat Message
  // ---------------------------------------------------------------------------
  const sendOpenChatMessage = async ({
    content,
    categoryTag = "General",
    replyToMessageId = null,
  }: {
    content: string;
    categoryTag?: string;
    replyToMessageId?: string | null;
  }) => {
    if (!content.trim()) {
      return { success: false, error: "Message content cannot be blank." };
    }

    // Determine current sender info
    const senderRole = user?.role || "student";
    const senderId = user?.id || (senderRole === "alumni" ? "alumni-demo-jordan" : "student-demo-alex");
    const senderName = user?.fullName || (senderRole === "alumni" ? "Jordan Vance" : "Alex Rivera");
    const senderInitials = user?.initials || (senderRole === "alumni" ? "JV" : "AR");
    const senderCompany = user?.company || (senderRole === "alumni" ? "Stripe" : undefined);
    const senderDept = user?.department || (senderRole === "alumni" ? "IT '18" : "CSE '26");
    const senderBadge =
      senderRole === "alumni"
        ? `Alumni Mentor • ${user?.roleTitle || "Staff Platform Engineer"} @ ${user?.company || "Stripe"}`
        : `Student • ${senderDept}`;

    let replyPreview: OpenChatMessage["reply_to_preview"] = null;
    if (replyToMessageId) {
      const original = openChatMessages.find((m) => m.id === replyToMessageId);
      if (original) {
        replyPreview = {
          id: original.id,
          sender_name: original.sender_name,
          sender_role: original.sender_role,
          content: original.content.slice(0, 100),
        };
      }
    }

    const newMsg: OpenChatMessage = {
      id: `ocm-${Date.now()}`,
      sender_id: senderId,
      sender_name: senderName,
      sender_role: senderRole,
      sender_initials: senderInitials,
      sender_department: senderDept,
      sender_badge: senderBadge,
      sender_company: senderCompany,
      sender_is_verified: true,
      content: content.trim(),
      category_tag: categoryTag,
      reply_to_message_id: replyToMessageId,
      reply_to_preview: replyPreview,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      moderation_status: "visible",
      likes_count: 0,
      delivery_status: "read",
    };

    setOpenChatMessages((prev) => [...prev, newMsg]);

    // If a student posts a question, simulate an alumni response after 2.5s if none was a direct reply
    if (senderRole === "student" && !replyToMessageId) {
      setTimeout(() => {
        const autoReply: OpenChatMessage = {
          id: `ocm-reply-${Date.now()}`,
          sender_id: "alumni-demo-jordan",
          sender_name: "Jordan Vance",
          sender_role: "alumni",
          sender_initials: "JV",
          sender_department: "IT '18",
          sender_company: "Stripe",
          sender_badge: "Alumni Mentor • Staff Platform Engineer @ Stripe",
          sender_is_verified: true,
          content: "Great question! Make sure to also check the Alumnux alumni directory to request a 1-on-1 deep dive if you'd like targeted feedback on this specific topic.",
          category_tag: categoryTag,
          reply_to_message_id: newMsg.id,
          reply_to_preview: {
            id: newMsg.id,
            sender_name: newMsg.sender_name,
            sender_role: "student",
            content: newMsg.content.slice(0, 100),
          },
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          moderation_status: "visible",
          likes_count: 2,
          delivery_status: "read",
        };
        setOpenChatMessages((prev) => [...prev, autoReply]);
      }, 2500);
    }

    return { success: true, message: newMsg };
  };

  // ---------------------------------------------------------------------------
  // Action 2: Report Message
  // ---------------------------------------------------------------------------
  const reportMessage = async ({
    messageType,
    messageId,
    messagePreview,
    reason,
    details,
  }: {
    messageType: "open_chat" | "private_mentorship";
    messageId: string;
    messagePreview?: string;
    reason: ReportReason;
    details?: string;
  }) => {
    const report: MessageReport = {
      id: `rep-${Date.now()}`,
      reporter_id: user?.id || "anonymous-user",
      reporter_name: user?.fullName || "Anonymous Member",
      reporter_role: user?.role || "student",
      message_type: messageType,
      message_id: messageId,
      message_preview: messagePreview,
      reason,
      details,
      status: "pending_review",
      created_at: new Date().toISOString(),
    };

    setReports((prev) => [report, ...prev]);
    return { success: true, reportId: report.id };
  };

  const deleteOpenChatMessage = (messageId: string) => {
    setOpenChatMessages((prev) => prev.filter((m) => m.id !== messageId));
  };

  // ---------------------------------------------------------------------------
  // Action 3: Create 1-on-1 Mentorship Request
  // ---------------------------------------------------------------------------
  const createMentorshipRequest = async ({
    alumniId,
    alumniName,
    alumniRoleTitle = "Alumni Mentor",
    alumniCompany = "Alumnux Network",
    alumniInitials = "AM",
    topic,
    introductoryMessage,
    preferredCadence,
  }: {
    alumniId: string;
    alumniName: string;
    alumniRoleTitle?: string;
    alumniCompany?: string;
    alumniInitials?: string;
    topic: string;
    introductoryMessage: string;
    preferredCadence: string;
  }) => {
    const studentId = user?.id || "student-demo-alex";
    const studentName = user?.fullName || "Alex Rivera";
    const studentEmail = user?.email || "student@alumnux.demo";
    const studentDept = user?.department || "Computer Science & Engineering";
    const studentGradYear = user?.graduationYear || 2026;
    const studentInitials = user?.initials || "AR";

    // 1. Prevent duplicate pending requests between same student and alumnus (Section 3 Requirement)
    const existingPending = mentorshipRequests.find(
      (r) =>
        r.student_id === studentId &&
        r.alumni_id === alumniId &&
        r.status === "pending"
    );

    if (existingPending) {
      return {
        success: false,
        error: `You already have an active pending mentorship request with ${alumniName}. Please wait for their response or review your existing requests.`,
      };
    }

    // 2. Prevent duplicate active mentorship
    const existingActive = conversations.find(
      (c) =>
        c.student_id === studentId &&
        c.alumni_id === alumniId &&
        c.status === "active"
    );

    if (existingActive) {
      return {
        success: false,
        error: `You already have an active 1-on-1 mentorship with ${alumniName}. You can chat directly via Private Conversations.`,
      };
    }

    const newRequest: MentorshipRequestEntity = {
      id: `mr-${Date.now()}`,
      student_id: studentId,
      student_name: studentName,
      student_email: studentEmail,
      student_department: studentDept,
      student_graduation_year: studentGradYear,
      student_initials: studentInitials,
      alumni_id: alumniId,
      alumni_name: alumniName,
      alumni_role_title: alumniRoleTitle,
      alumni_company: alumniCompany,
      alumni_initials: alumniInitials,
      topic,
      introductory_message: introductoryMessage.trim(),
      preferred_cadence: preferredCadence,
      status: "pending",
      created_at: new Date().toISOString(),
    };

    setMentorshipRequests((prev) => [newRequest, ...prev]);

    return { success: true, request: newRequest };
  };

  // ---------------------------------------------------------------------------
  // Action 4: Respond to Mentorship Request (Accept / Decline)
  // ---------------------------------------------------------------------------
  const respondToMentorshipRequest = async (
    requestId: string,
    action: "accepted" | "declined",
    declineReason?: string
  ) => {
    const target = mentorshipRequests.find((r) => r.id === requestId);
    if (!target) {
      return { success: false, error: "Request not found." };
    }

    const now = new Date().toISOString();

    setMentorshipRequests((prev) =>
      prev.map((r) =>
        r.id === requestId
          ? {
              ...r,
              status: action,
              responded_at: now,
              decline_reason: declineReason,
            }
          : r
      )
    );

    // If accepted, activate/create the private mentorship conversation (Section 3 Requirement)
    if (action === "accepted") {
      const convId = `conv-${target.student_id}-${target.alumni_id}`;
      const existingConv = conversations.find((c) => c.id === convId);

      if (existingConv) {
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  status: "active",
                  last_message_at: now,
                  topic: target.topic,
                }
              : c
          )
        );
        return { success: true, conversationId: convId };
      }

      // Create new private conversation
      const newConv: PrivateMentorshipConversation = {
        id: convId,
        student_id: target.student_id,
        student_name: target.student_name,
        student_department: target.student_department,
        student_graduation_year: target.student_graduation_year,
        student_initials: target.student_initials || "ST",
        alumni_id: target.alumni_id,
        alumni_name: target.alumni_name,
        alumni_role_title: target.alumni_role_title || "Alumni Mentor",
        alumni_company: target.alumni_company || "Alumnux Network",
        alumni_initials: target.alumni_initials || "AM",
        mentorship_request_id: target.id,
        topic: target.topic,
        cadence: target.preferred_cadence,
        status: "active",
        created_at: now,
        last_message_at: now,
        last_message_preview: `Mentorship request accepted: "${target.topic}"`,
        unread_count_for_current_user: 0,
      };

      // Seed initial welcoming message from alumnus
      const welcomeMsg: PrivateMentorshipMessage = {
        id: `pm-welcome-${Date.now()}`,
        conversation_id: convId,
        sender_id: target.alumni_id,
        sender_name: target.alumni_name,
        sender_role: "alumni",
        content: `Hi ${target.student_name}! I have accepted your mentorship request on "${target.topic}". Looking forward to working together. Please feel free to share your specific questions, repo links, or topics you want to discuss first.`,
        status: "read",
        created_at: now,
        updated_at: now,
      };

      setConversations((prev) => [newConv, ...prev]);
      setPrivateMessages((prev) => ({
        ...prev,
        [convId]: [welcomeMsg],
      }));

      return { success: true, conversationId: convId };
    }

    return { success: true };
  };

  const cancelMentorshipRequest = (requestId: string) => {
    setMentorshipRequests((prev) => prev.filter((r) => r.id !== requestId));
  };

  // ---------------------------------------------------------------------------
  // Action 5: Send Private Mentorship Message
  // ---------------------------------------------------------------------------
  const sendPrivateMessage = async ({
    conversationId,
    content,
  }: {
    conversationId: string;
    content: string;
  }) => {
    if (!content.trim()) {
      return { success: false, error: "Message cannot be empty." };
    }

    const conv = conversations.find((c) => c.id === conversationId);
    if (!conv) {
      return { success: false, error: "Conversation not found." };
    }

    if (conv.status === "closed") {
      return {
        success: false,
        error: "This mentorship conversation has been closed and is read-only.",
      };
    }

    const senderRole = user?.role || "student";
    const senderId =
      user?.id || (senderRole === "alumni" ? conv.alumni_id : conv.student_id);
    const senderName =
      user?.fullName || (senderRole === "alumni" ? conv.alumni_name : conv.student_name);

    const now = new Date().toISOString();
    const newMsg: PrivateMentorshipMessage = {
      id: `pm-${Date.now()}`,
      conversation_id: conversationId,
      sender_id: senderId,
      sender_name: senderName,
      sender_role: senderRole,
      content: content.trim(),
      status: "read",
      created_at: now,
      updated_at: now,
    };

    setPrivateMessages((prev) => ({
      ...prev,
      [conversationId]: [...(prev[conversationId] || []), newMsg],
    }));

    // Update conversation metadata
    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              last_message_at: now,
              last_message_preview: newMsg.content.slice(0, 80),
            }
          : c
      )
    );

    // Simulate smart interactive reply after 1.5s if current user is student
    if (senderRole === "student") {
      setTimeout(() => {
        const replyMsg: PrivateMentorshipMessage = {
          id: `pm-reply-${Date.now()}`,
          conversation_id: conversationId,
          sender_id: conv.alumni_id,
          sender_name: conv.alumni_name,
          sender_role: "alumni",
          content: `Thanks for the details, ${conv.student_name.split(" ")[0]}! I've reviewed your note and made some pointers for our discussion on ${conv.topic}. Keep iterating!`,
          status: "read",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };

        setPrivateMessages((prev) => ({
          ...prev,
          [conversationId]: [...(prev[conversationId] || []), replyMsg],
        }));

        setConversations((prev) =>
          prev.map((c) =>
            c.id === conversationId
              ? {
                  ...c,
                  last_message_at: replyMsg.created_at,
                  last_message_preview: replyMsg.content.slice(0, 80),
                }
              : c
          )
        );
      }, 1500);
    }

    return { success: true, message: newMsg };
  };

  // ---------------------------------------------------------------------------
  // Action 6: Close Mentorship
  // ---------------------------------------------------------------------------
  const closeMentorship = async (conversationId: string) => {
    const now = new Date().toISOString();
    const userId = user?.id || "current-user";

    setConversations((prev) =>
      prev.map((c) =>
        c.id === conversationId
          ? {
              ...c,
              status: "closed",
              closed_at: now,
              closed_by_user_id: userId,
            }
          : c
      )
    );

    // Also close the underlying request if exists
    const conv = conversations.find((c) => c.id === conversationId);
    if (conv) {
      setMentorshipRequests((prev) =>
        prev.map((r) =>
          r.id === conv.mentorship_request_id
            ? { ...r, status: "closed", closed_at: now }
            : r
        )
      );
    }

    return { success: true };
  };

  // ---------------------------------------------------------------------------
  // Helpers
  // ---------------------------------------------------------------------------
  const getConversationById = (conversationId: string) => {
    return conversations.find((c) => c.id === conversationId);
  };

  const getMessagesForConversation = (conversationId: string) => {
    return privateMessages[conversationId] || [];
  };

  const resetMentorshipData = () => {
    localStorage.removeItem(`${STORAGE_KEY}_open_chat`);
    localStorage.removeItem(`${STORAGE_KEY}_requests`);
    localStorage.removeItem(`${STORAGE_KEY}_conversations`);
    localStorage.removeItem(`${STORAGE_KEY}_private_msgs`);
    localStorage.removeItem(`${STORAGE_KEY}_reports`);
    setOpenChatMessages(SEED_OPEN_CHAT_MESSAGES);
    setMentorshipRequests(SEED_MENTORSHIP_REQUESTS);
    setConversations(SEED_CONVERSATIONS);
    setPrivateMessages(SEED_PRIVATE_MESSAGES);
    setReports([]);
  };

  // ---------------------------------------------------------------------------
  // Dynamic Metrics
  // ---------------------------------------------------------------------------
  const metrics: MentorshipMetrics = {
    openChatDiscussionsCount: openChatMessages.length,
    openChatUnansweredCount: openChatMessages.filter(
      (m) =>
        m.sender_role === "student" &&
        !openChatMessages.some((r) => r.reply_to_message_id === m.id)
    ).length,
    pendingRequestsCount: mentorshipRequests.filter((r) => r.status === "pending").length,
    activeMentorshipsCount: conversations.filter((c) => c.status === "active").length,
    totalAlumniMentorsCount: 6,
  };

  return (
    <MentorshipContext.Provider
      value={{
        openChatMessages,
        sendOpenChatMessage,
        reportMessage,
        deleteOpenChatMessage,
        mentorshipRequests,
        createMentorshipRequest,
        respondToMentorshipRequest,
        cancelMentorshipRequest,
        conversations,
        privateMessages,
        getConversationById,
        getMessagesForConversation,
        sendPrivateMessage,
        closeMentorship,
        reports,
        metrics,
        resetMentorshipData,
      }}
    >
      {children}
    </MentorshipContext.Provider>
  );
};

export const useMentorship = () => {
  const context = useContext(MentorshipContext);
  if (!context) {
    throw new Error("useMentorship must be used within a MentorshipProvider");
  }
  return context;
};
