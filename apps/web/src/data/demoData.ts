export interface DemoUser {
  id: string;
  email: string;
  username?: string;
  fullName: string;
  role: "student" | "alumni";
  verification_status?: "pending" | "needs_review" | "verified" | "rejected" | "suspended";
  academic_completion_status?: "studying" | "final_year" | "course_completed" | "graduated";
  academic_year?: "First Year" | "Second Year" | "Third Year" | "Final Year";
  expected_graduation_date?: string;
  verified_graduation_date?: string | null;
  department: string;
  graduationYear: number;
  passed_out_year?: number;
  rollNumber?: string;
  company?: string;
  roleTitle?: string;
  experienceYears?: number;
  locationCity?: string;
  linkedin_url?: string;
  student_id_front_name?: string;
  student_id_back_name?: string;
  graduation_certificate_name?: string;
  initials: string;
  bio: string;
  skills: string[];
  avatarUrl?: string;
}

export type OpportunityType = "Full-time" | "Internship" | "Referral" | "Mentorship";
export type WorkMode = "Remote" | "Hybrid" | "Onsite";

export interface CareerOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  workMode: WorkMode;
  opportunityType: OpportunityType;
  departmentTag: string;
  description: string;
  requirements: string[];
  compensation: string;
  postedByName: string;
  postedByRole: string;
  postedByCompany: string;
  postedByYear: number;
  postedDate: string;
  deadline: string;
  isDemo: true;
  tags: string[];
}

export interface MentorshipRequest {
  id: string;
  studentName: string;
  studentEmail: string;
  studentDepartment: string;
  studentGraduationYear: number;
  topic: string;
  message: string;
  preferredCadence: string;
  requestedDate: string;
  status: "pending" | "accepted" | "declined";
}

export interface DemoActivity {
  id: string;
  title: string;
  detail: string;
  timestamp: string;
  type: "connection" | "mentorship" | "opportunity" | "event";
}

export interface DemoEvent {
  id: string;
  title: string;
  description: string;
  speakerName: string;
  speakerRole: string;
  speakerCompany: string;
  date: string;
  time: string;
  format: "Virtual AMA" | "Interactive Workshop" | "Panel Discussion";
  registeredCount: number;
  tags: string[];
  isDemo: true;
}

export interface DemoNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  type: "info" | "mentorship" | "opportunity";
}

// Preset Demo Accounts
export const DEMO_STUDENT_ACCOUNT: DemoUser = {
  id: "student-demo-alex",
  email: "student@alumnux.demo",
  username: "alexrivera",
  fullName: "Alex Rivera",
  role: "student",
  verification_status: "verified",
  academic_completion_status: "studying",
  academic_year: "Third Year",
  expected_graduation_date: "2026-05-31",
  department: "Computer Science & Engineering",
  graduationYear: 2026,
  rollNumber: "2022CSE1084",
  locationCity: "Chennai",
  initials: "AR",
  bio: "Pre-final year CSE student passionate about cloud distributed systems, Go, and high-performance backend engineering. Preparing for campus internships and product company off-campus drives.",
  skills: ["Go", "TypeScript", "React", "PostgreSQL", "Docker", "Algorithms & DS"],
};

export const DEMO_ALUMNI_ACCOUNT: DemoUser = {
  id: "alumni-demo-jordan",
  email: "alumni@alumnux.demo",
  username: "jordanvance",
  fullName: "Jordan Vance",
  role: "alumni",
  verification_status: "verified",
  academic_completion_status: "graduated",
  passed_out_year: 2018,
  verified_graduation_date: "2018-05-15",
  department: "Information Technology",
  graduationYear: 2018,
  company: "Stripe",
  roleTitle: "Staff Platform Engineer",
  experienceYears: 7,
  locationCity: "Bengaluru",
  initials: "JV",
  bio: "Staff Platform Engineer at Stripe specializing in payment reliability, global distributed architectures, and developer tooling. Offering mock interview guidance and resume critiques for aspiring engineers.",
  skills: ["Distributed Systems", "Cloud Architecture (AWS/GCP)", "System Design", "Go", "Mentorship", "Referrals"],
};

// Seeded realistic career opportunities (All clearly marked as demo content)
export const DEMO_CAREER_OPPORTUNITIES: CareerOpportunity[] = [
  {
    id: "opp-01",
    title: "Junior Backend Engineer (Go / Distributed Systems)",
    organization: "Stripe",
    location: "Bengaluru",
    workMode: "Hybrid",
    opportunityType: "Full-time",
    departmentTag: "CSE / IT",
    description: "Build robust, low-latency API infrastructure supporting millions of global merchants. Work alongside seasoned alumni on transaction routing and idempotent processing pipelines.",
    requirements: ["Solid understanding of CS fundamentals and data structures", "Proficiency in Go, Java, or C++", "Knowledge of relational databases and ACID principles"],
    compensation: "₹18,00,000 - ₹24,00,000 CTC (Sample)",
    postedByName: "Jordan Vance",
    postedByRole: "Staff Platform Engineer",
    postedByCompany: "Stripe",
    postedByYear: 2018,
    postedDate: "2 days ago",
    deadline: "Nov 30, 2026",
    isDemo: true,
    tags: ["Go", "Distributed Systems", "API Engineering", "Full-time"],
  },
  {
    id: "opp-02",
    title: "Cloud Infrastructure Engineering Intern (Summer 2027)",
    organization: "Amazon Web Services (AWS)",
    location: "Bengaluru",
    workMode: "Hybrid",
    opportunityType: "Internship",
    departmentTag: "All Engineering Branches",
    description: "Join the AWS Infrastructure group for a 6-month hands-on internship. Contribute to automated container orchestration, telemetry ingestion, and cloud security frameworks.",
    requirements: ["Currently enrolled in B.Tech/B.E (Class of 2026 or 2027)", "Hands-on experience with Linux and scripting (Python/Bash)", "Basic networking and containerization concepts"],
    compensation: "₹85,000 / month stipend (Sample)",
    postedByName: "Karthik Subramanian",
    postedByRole: "Staff Cloud Architect",
    postedByCompany: "AWS",
    postedByYear: 2017,
    postedDate: "3 days ago",
    deadline: "Dec 15, 2026",
    isDemo: true,
    tags: ["AWS", "Linux", "Docker", "Internship"],
  },
  {
    id: "opp-03",
    title: "Software Engineer — Core Search & Intelligence (Referral)",
    organization: "Google",
    location: "Hyderabad",
    workMode: "Onsite",
    opportunityType: "Referral",
    departmentTag: "CSE / IT / ECE",
    description: "Direct alumni employee referral for early-career software engineers. Fast-tracks your profile directly to the internal technical recruiting screen for Core Systems.",
    requirements: ["Strong algorithmic problem-solving ability (LeetCode / Codeforces)", "Experience in C++, Java, or Python", "Clear architectural understanding of multi-threaded programs"],
    compensation: "Competitive Product Band (Sample)",
    postedByName: "Ananya Ramesh",
    postedByRole: "Senior Software Engineer",
    postedByCompany: "Google",
    postedByYear: 2019,
    postedDate: "Yesterday",
    deadline: "Rolling Demo",
    isDemo: true,
    tags: ["Alumni Referral", "Algorithms", "C++", "Python"],
  },
  {
    id: "opp-04",
    title: "1-on-1 System Design & Off-Campus Strategy Mentorship",
    organization: "Freshworks Alumni Group",
    location: "Remote",
    workMode: "Remote",
    opportunityType: "Mentorship",
    departmentTag: "All Branches",
    description: "4-week structured mentorship track covering real-world architecture teardowns, resume optimization, and mock technical design rounds for Tier-1 product roles.",
    requirements: ["Enthusiastic 3rd/4th year student", "Ready with 1-2 substantial portfolio projects", "Commitment of 2 hours per weekend"],
    compensation: "Pro-bono Alumni Guidance",
    postedByName: "Vijay Krishna N.",
    postedByRole: "Engineering Manager",
    postedByCompany: "Freshworks",
    postedByYear: 2016,
    postedDate: "5 days ago",
    deadline: "Dec 05, 2026",
    isDemo: true,
    tags: ["Mentorship", "System Design", "Career Guidance", "Remote"],
  },
  {
    id: "opp-05",
    title: "Embedded Firmware Engineer (IoT & Connected Edge)",
    organization: "Texas Instruments",
    location: "Bengaluru",
    workMode: "Onsite",
    opportunityType: "Full-time",
    departmentTag: "ECE / EEE",
    description: "Design low-power micro-controller firmware and real-time operating system (RTOS) drivers for industrial automation sensors. Core engineering track.",
    requirements: ["Proficiency in Embedded C and assembly", "Experience with ARM Cortex-M or RISC-V architectures", "Familiarity with I2C, SPI, UART protocols"],
    compensation: "₹14,00,000 - ₹19,00,000 CTC (Sample)",
    postedByName: "Meera Natarajan",
    postedByRole: "Lead Embedded Engineer",
    postedByCompany: "Texas Instruments",
    postedByYear: 2018,
    postedDate: "1 week ago",
    deadline: "Dec 10, 2026",
    isDemo: true,
    tags: ["Embedded C", "RTOS", "VLSI / Hardware", "Full-time"],
  },
  {
    id: "opp-06",
    title: "Machine Learning Research Intern (Computer Vision)",
    organization: "Microsoft AI",
    location: "Bengaluru",
    workMode: "Hybrid",
    opportunityType: "Internship",
    departmentTag: "AI & Data Science / CSE",
    description: "Research and implement transformer-based visual perception architectures. Experiment with quantization and distillation for edge deployment.",
    requirements: ["Background in PyTorch and OpenCV", "Familiarity with transformer models and vision architectures", "Strong linear algebra and calculus foundations"],
    compensation: "₹90,000 / month stipend (Sample)",
    postedByName: "Siddharth Mohan",
    postedByRole: "Senior ML Engineer",
    postedByCompany: "Microsoft AI",
    postedByYear: 2021,
    postedDate: "4 days ago",
    deadline: "Nov 28, 2026",
    isDemo: true,
    tags: ["PyTorch", "Computer Vision", "Transformers", "Internship"],
  },
];

// Seeded Mentorship Requests for Alumni Dashboard
export const INITIAL_MENTORSHIP_REQUESTS: MentorshipRequest[] = [
  {
    id: "mr-101",
    studentName: "Priya Dharshini",
    studentEmail: "priya.d@student.example.com",
    studentDepartment: "Computer Science & Engineering",
    studentGraduationYear: 2026,
    topic: "System Design & Distributed Systems Teardown",
    message: "Hi Jordan! I've been studying distributed queues and consensus algorithms. I'd love your feedback on my mini Kafka-like project and advice on cracking product backend interviews.",
    preferredCadence: "Bi-weekly 45-min Zoom calls",
    requestedDate: "Today at 10:15 AM",
    status: "pending",
  },
  {
    id: "mr-102",
    studentName: "Aditya Verma",
    studentEmail: "aditya.v@student.example.com",
    studentDepartment: "Information Technology",
    studentGraduationYear: 2025,
    topic: "Off-Campus Referral & Resume Critique",
    message: "Hello Jordan, I recently built a full-stack financial dashboard. Could you review my resume and let me know if my backend projects align with Stripe's junior engineer expectations?",
    preferredCadence: "One-off Resume Review + Written Feedback",
    requestedDate: "Yesterday at 4:20 PM",
    status: "pending",
  },
  {
    id: "mr-103",
    studentName: "Kavya Sundaram",
    studentEmail: "kavya.s@student.example.com",
    studentDepartment: "ECE",
    studentGraduationYear: 2026,
    topic: "Transitioning from Core Electronics to Cloud Platform",
    message: "I am an ECE student passionate about systems programming and Linux internals. Looking for mentorship on bridging the gap into cloud infrastructure engineering.",
    preferredCadence: "Monthly check-ins",
    requestedDate: "Oct 22, 2026",
    status: "accepted",
  },
];

// Seeded Events
export const DEMO_EVENTS: DemoEvent[] = [
  {
    id: "evt-01",
    title: "Off-Campus Playbook: Cracking Tier-1 Product Roles",
    description: "Practical guide to networking, crafting high-signal GitHub projects, and landing off-campus interviews without relying on placement offices.",
    speakerName: "Jordan Vance & Karthik Subramanian",
    speakerRole: "Staff Engineers @ Stripe & AWS",
    speakerCompany: "Stripe & AWS",
    date: "Saturday, Nov 07",
    time: "6:00 PM - 7:30 PM IST",
    format: "Virtual AMA",
    registeredCount: 168,
    tags: ["Career Strategy", "Off-Campus", "Q&A"],
    isDemo: true,
  },
  {
    id: "evt-02",
    title: "Real-World System Design: High-Throughput Payment Gateways",
    description: "An architectural deep-dive into idempotency keys, distributed transaction locking, and failure recovery in modern fintech.",
    speakerName: "Jordan Vance",
    speakerRole: "Staff Platform Engineer",
    speakerCompany: "Stripe",
    date: "Sunday, Nov 15",
    time: "4:00 PM - 5:30 PM IST",
    format: "Interactive Workshop",
    registeredCount: 124,
    tags: ["System Design", "Fintech", "Distributed Systems"],
    isDemo: true,
  },
  {
    id: "evt-03",
    title: "From College Projects to Production Machine Learning",
    description: "How to package models with ONNX, serve predictions with low latency, and present end-to-end ML engineering projects on your resume.",
    speakerName: "Siddharth Mohan",
    speakerRole: "Senior ML Engineer",
    speakerCompany: "Microsoft AI",
    date: "Thursday, Nov 19",
    time: "7:00 PM - 8:15 PM IST",
    format: "Panel Discussion",
    registeredCount: 95,
    tags: ["Machine Learning", "MLOps", "Interview Prep"],
    isDemo: true,
  },
];

// Seeded Student Activities
export const DEMO_STUDENT_ACTIVITIES: DemoActivity[] = [
  {
    id: "act-s1",
    title: "Connected with Karthik Subramanian (AWS)",
    detail: "Mentorship connection request accepted",
    timestamp: "2 hours ago",
    type: "connection",
  },
  {
    id: "act-s2",
    title: "Bookmarked Stripe Junior Backend Engineer",
    detail: "Saved to your career opportunities watchlist",
    timestamp: "Yesterday",
    type: "opportunity",
  },
  {
    id: "act-s3",
    title: "Registered for Off-Campus Playbook AMA",
    detail: "Event scheduled for Saturday, Nov 07",
    timestamp: "2 days ago",
    type: "event",
  },
  {
    id: "act-s4",
    title: "Submitted Resume for Review",
    detail: "Feedback pending from Jordan Vance",
    timestamp: "4 days ago",
    type: "mentorship",
  },
];

// Seeded Alumni Activities
export const DEMO_ALUMNI_ACTIVITIES: DemoActivity[] = [
  {
    id: "act-a1",
    title: "Received Mentorship Request from Priya Dharshini",
    detail: "Topic: System Design & Distributed Systems",
    timestamp: "Today, 10:15 AM",
    type: "mentorship",
  },
  {
    id: "act-a2",
    title: "Shared New Opportunity: Junior Backend Engineer",
    detail: "Stripe Bengaluru (Hybrid) — 14 students viewed",
    timestamp: "2 days ago",
    type: "opportunity",
  },
  {
    id: "act-a3",
    title: "Accepted Mentorship Request from Kavya Sundaram",
    detail: "First mentoring session scheduled for Nov 04",
    timestamp: "Oct 22, 2026",
    type: "mentorship",
  },
  {
    id: "act-a4",
    title: "Co-hosting Upcoming AMA Session",
    detail: "168 students registered for Off-Campus Playbook",
    timestamp: "Oct 20, 2026",
    type: "event",
  },
];

// Seeded Notifications
export const DEMO_NOTIFICATIONS: DemoNotification[] = [
  {
    id: "notif-01",
    title: "Mentorship session confirmed",
    message: "Your upcoming 1-on-1 session is set for Saturday at 5 PM.",
    timestamp: "10 mins ago",
    read: false,
    type: "mentorship",
  },
  {
    id: "notif-02",
    title: "New opportunity matches your skills",
    message: "Stripe posted Junior Backend Engineer (Go / Distributed Systems).",
    timestamp: "2 hours ago",
    read: false,
    type: "opportunity",
  },
  {
    id: "notif-03",
    title: "Welcome to Alumnux Demo",
    message: "You are currently exploring in client-side demonstration mode.",
    timestamp: "1 day ago",
    read: true,
    type: "info",
  },
];
