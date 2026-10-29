/**
 * Alumnux Mobile Feature Data Models & Shared Data
 * Provides full parity with website data (Careers, Events, Admin Verification Queue)
 */

export interface MobileCareerOpportunity {
  id: string;
  title: string;
  organization: string;
  location: string;
  workMode: "Remote" | "Hybrid" | "Onsite";
  opportunityType: "Full-time" | "Internship" | "Referral" | "Contract";
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
  tags: string[];
}

export interface MobileEvent {
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
}

export interface MobileVerificationItem {
  id: string;
  userId: string;
  fullName: string;
  email: string;
  accountType: "STUDENT" | "ALUMNI";
  departmentCode: string;
  graduationYear: number;
  rollNumber?: string;
  currentCompany?: string;
  currentRole?: string;
  status: "PENDING" | "NEEDS_REVIEW" | "VERIFIED" | "REJECTED";
  submittedAt: string;
  documentType: string;
  fileName: string;
  reviewNotes?: string;
}

export const INITIAL_CAREER_OPPORTUNITIES: MobileCareerOpportunity[] = [
  {
    id: "opp-01",
    title: "Junior Cloud Infrastructure Engineer",
    organization: "Amazon Web Services",
    location: "Bengaluru, India",
    workMode: "Hybrid",
    opportunityType: "Full-time",
    departmentTag: "CSE / IT",
    description: "Seeking 2024/2025/2026 graduates with foundational Linux, Docker, and distributed systems knowledge. Direct referral into cloud support & systems engineering teams.",
    requirements: [
      "Solid understanding of OS fundamentals, TCP/IP networking, and Linux CLI",
      "Hands-on experience with Python, Go, or Node.js",
      "Familiarity with container concepts (Docker, ECS, Kubernetes)",
    ],
    compensation: "₹14L – ₹18L CTC",
    postedByName: "Karthik Subramanian",
    postedByRole: "Staff Cloud Architect",
    postedByCompany: "AWS",
    postedByYear: 2017,
    postedDate: "2026-10-22",
    deadline: "2026-11-15",
    tags: ["AWS", "Linux", "Docker", "Go", "Cloud"],
  },
  {
    id: "opp-02",
    title: "Platform Software Engineering Intern",
    organization: "Stripe",
    location: "Bengaluru (Remote Friendly)",
    workMode: "Remote",
    opportunityType: "Internship",
    departmentTag: "CSE / IT / ECE",
    description: "6-month high-impact backend engineering internship with conversion potential. Work directly on global ledger reliability and financial APIs.",
    requirements: [
      "Strong proficiency in data structures and algorithmic problem solving",
      "Experience with typed languages (Go, Java, TypeScript, or Rust)",
      "Strong written communication and collaborative git workflow",
    ],
    compensation: "₹85,000 / month stipend",
    postedByName: "Jordan Vance",
    postedByRole: "Staff Platform Engineer",
    postedByCompany: "Stripe",
    postedByYear: 2018,
    postedDate: "2026-10-25",
    deadline: "2026-11-20",
    tags: ["Stripe", "FinTech", "Distributed Systems", "APIs"],
  },
  {
    id: "opp-03",
    title: "Full-Stack Software Engineer (Referral)",
    organization: "Zoho Corporation",
    location: "Chennai / Tenkasi",
    workMode: "Onsite",
    opportunityType: "Referral",
    departmentTag: "All Engineering Branches",
    description: "Internal alumni referral fast-track for software engineers. Join core product teams building enterprise SaaS applications for global customers.",
    requirements: [
      "Strong understanding of relational databases and SQL query optimization",
      "Experience with modern web stacks (React, Fastify, Java, Node.js)",
      "Passion for building customer-facing resilient software",
    ],
    compensation: "₹9L – ₹13L CTC",
    postedByName: "Praveen Kumar",
    postedByRole: "Principal Architect",
    postedByCompany: "Zoho",
    postedByYear: 2016,
    postedDate: "2026-10-18",
    deadline: "2026-11-30",
    tags: ["Zoho", "SaaS", "React", "PostgreSQL", "Full-Stack"],
  },
];

export const INITIAL_EVENTS: MobileEvent[] = [
  {
    id: "ev-01",
    title: "System Design & Distributed Patterns for Campus Off-Campus Drives",
    description: "Interactive breakdown of modern distributed systems, horizontal scaling, caching strategies, and mock interviews for product tech giants.",
    speakerName: "Jordan Vance",
    speakerRole: "Staff Platform Engineer",
    speakerCompany: "Stripe",
    date: "Saturday, Nov 07, 2026",
    time: "6:00 PM – 7:30 PM IST",
    format: "Virtual AMA",
    registeredCount: 142,
    tags: ["System Design", "Distributed Systems", "Interviews"],
  },
  {
    id: "ev-02",
    title: "Transitioning from College to High-Scale Cloud Architecture",
    description: "A candid roadmap on mastering AWS, container orchestrators, infrastructure as code, and securing referrals into Tier-1 tech firms.",
    speakerName: "Karthik Subramanian",
    speakerRole: "Staff Cloud Architect",
    speakerCompany: "AWS",
    date: "Wednesday, Nov 11, 2026",
    time: "7:00 PM – 8:30 PM IST",
    format: "Interactive Workshop",
    registeredCount: 98,
    tags: ["Cloud", "DevOps", "AWS", "Career Path"],
  },
  {
    id: "ev-03",
    title: "Machine Learning & AI Engineering: Real-World Industry Transition",
    description: "Practical insights into LLM infrastructure, PyTorch pipelines, and breaking into production AI engineering without a PhD.",
    speakerName: "Siddharth Mohan",
    speakerRole: "Senior ML Engineer",
    speakerCompany: "Microsoft AI",
    date: "Sunday, Nov 15, 2026",
    time: "5:00 PM – 6:30 PM IST",
    format: "Panel Discussion",
    registeredCount: 176,
    tags: ["AI/ML", "PyTorch", "LLMs", "Data Science"],
  },
];

export const INITIAL_ADMIN_VERIFICATION_QUEUE: MobileVerificationItem[] = [
  {
    id: "ver-101",
    userId: "usr-student-priya",
    fullName: "Priya Dharshini R.",
    email: "priya.dharshini@student.demo",
    accountType: "STUDENT",
    departmentCode: "CSE",
    graduationYear: 2026,
    rollNumber: "2022CSE1042",
    status: "PENDING",
    submittedAt: "2026-10-28T09:30:00Z",
    documentType: "Student College ID (Front & Back)",
    fileName: "college_id_2022CSE1042_verified.jpg",
  },
  {
    id: "ver-102",
    userId: "usr-alumni-ganesh",
    fullName: "Ganesh Balaji",
    email: "ganesh.balaji@oracle.demo",
    accountType: "ALUMNI",
    departmentCode: "IT",
    graduationYear: 2019,
    currentCompany: "Oracle",
    currentRole: "Principal Database Engineer",
    status: "NEEDS_REVIEW",
    submittedAt: "2026-10-27T14:15:00Z",
    documentType: "Anna University Degree Certificate",
    fileName: "anna_university_degree_ganesh.pdf",
    reviewNotes: "University hologram slightly obscured in scan. High-res copy requested.",
  },
  {
    id: "ver-103",
    userId: "usr-student-vikram",
    fullName: "Vikram Seth",
    email: "vikram.seth@student.demo",
    accountType: "STUDENT",
    departmentCode: "ECE",
    graduationYear: 2025,
    rollNumber: "2021ECE0814",
    status: "VERIFIED",
    submittedAt: "2026-10-25T11:00:00Z",
    documentType: "Student College ID (Front)",
    fileName: "college_id_vikram_ece.jpg",
  },
];
