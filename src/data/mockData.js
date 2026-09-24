export const MOCK_USERS = {
  student: {
    id: 'user-student-1',
    name: 'Aravind Mukund',
    email: 'aravind.m@mkce.ac.in',
    role: 'student',
    branch: 'CSE',
    year: '3rd Year',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    bio: 'Aspiring Full-Stack Developer & Competitive Programmer.',
    github: 'https://github.com/aravind-mkce',
    linkedin: 'https://linkedin.com/in/aravindm',
    progress: 72
  },
  alumni: {
    id: 'user-alumni-1',
    name: 'Vigneshwaran R.',
    email: 'vignesh.r@alumni.mkce.ac.in',
    role: 'alumni',
    branch: 'CSE',
    graduationYear: 2021,
    company: 'Freshworks',
    designation: 'Senior SDE',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    bio: 'Backend Specialist & Open Source Contributor. Passionate about mentoring MKCE juniors.',
    github: 'https://github.com/vignesh-freshworks',
    linkedin: 'https://linkedin.com/in/vigneshwaran-r',
    queriesAnswered: 48,
    resourcesShared: 12
  },
  admin: {
    id: 'user-admin-1',
    name: 'Dr. K. Senthil Nathan',
    email: 'admin.alumni@mkce.ac.in',
    role: 'admin',
    branch: 'Placement Cell',
    designation: 'Alumni Coordinator & Dean Placement',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=80',
    bio: 'MKCE Alumni Network Administrator & Career Lead.'
  }
};

export const PATHWAYS = [
  {
    id: 'software-engineering',
    title: 'Software Engineering & SDE',
    branch: 'CSE / IT / ECE',
    icon: 'Code',
    color: 'from-blue-600 to-indigo-600',
    description: 'Complete year-by-year roadmap to crack Tier-1 product roles and high-paying tech placements.',
    milestones: [
      { year: '1st Year', title: 'Programming Foundations', topics: ['C++ / Java Basics', 'Data Structures Intro', 'Git & GitHub', 'Problem Solving Skills'] },
      { year: '2nd Year', title: 'Core Computer Science', topics: ['Advanced DSA & LeetCode (150+)', 'OOPs Concepts', 'DBMS & SQL', 'OS & Computer Networks'] },
      { year: '3rd Year', title: 'Full-Stack & System Design', topics: ['React.js / Node.js Stack', 'System Design Fundamentals', 'Open Source / Hackathons', 'Internship Prep'] },
      { year: '4th Year', title: 'Placement Rush', topics: ['Company Specific Questions', 'Mock Interviews with Alumni', 'Resume Tailoring', 'Offer Negotiation'] }
    ]
  },
  {
    id: 'ai-ml',
    title: 'AI, Data Science & ML',
    branch: 'AI & DS / CSE',
    icon: 'Brain',
    color: 'from-purple-600 to-pink-600',
    description: 'Master Machine Learning algorithms, Deep Learning frameworks, and MLOps deployment pipelines.',
    milestones: [
      { year: '1st Year', title: 'Maths & Python Foundation', topics: ['Linear Algebra & Probability', 'Python Data Science Stack (NumPy, Pandas)', 'Data Visualization'] },
      { year: '2nd Year', title: 'Machine Learning Core', topics: ['Supervised & Unsupervised Learning', 'Scikit-Learn', 'Feature Engineering', 'Kaggle Competitions'] },
      { year: '3rd Year', title: 'Deep Learning & GenAI', topics: ['Neural Networks (PyTorch/TensorFlow)', 'Computer Vision & NLP', 'LLM Prompt Engineering', 'RAG Applications'] },
      { year: '4th Year', title: 'Portfolio & Research', topics: ['End-to-End MLOps Pipeline', 'Publishing Papers / Capstone Project', 'AI Engineer Interview Prep'] }
    ]
  },
  {
    id: 'core-engineering',
    title: 'Embedded, VLSI & IoT',
    branch: 'ECE / EEE',
    icon: 'Cpu',
    color: 'from-amber-500 to-orange-600',
    description: 'Pathway for electronics hardware design, Verilog, Microcontrollers, and Core Chip companies.',
    milestones: [
      { year: '1st Year', title: 'Circuit Theory & C', topics: ['Basic Electronics & Circuit Analysis', 'Embedded C Programming', 'Arduino & Microcontrollers'] },
      { year: '2nd Year', title: 'Digital & Signals', topics: ['Digital System Design', 'Verilog / VHDL Coding', 'Signal Processing Basics', 'PCB Layout Design'] },
      { year: '3rd Year', title: 'VLSI & RTOS', topics: ['CMOS Digital IC Design', 'RTOS (FreeRTOS)', 'ARM Cortex Architectures', 'Protocols (I2C, SPI, UART)'] },
      { year: '4th Year', title: 'Core Placement Prep', topics: ['Texas Instruments / Intel Mock Prep', 'FPGA Prototyping', 'GATE / Core Company Aptitude'] }
    ]
  }
];

export const RESOURCES = [
  {
    id: 1,
    title: 'Complete SDE Interview Cheat Sheet 2026',
    category: 'Interview Prep',
    branch: 'CSE/IT',
    type: 'PDF Guide',
    author: 'Karthik Raja (Batch 2023 - SDE @ Amazon)',
    downloads: 1420,
    rating: 4.9,
    status: 'Approved',
    tags: ['DSA', 'System Design', 'Behavioral']
  },
  {
    id: 2,
    title: 'ATS-Friendly Engineering Resume Templates',
    category: 'Resume',
    branch: 'All Branches',
    type: 'Overleaf / Word',
    author: 'MKCE Placement Cell & Alumni',
    downloads: 3890,
    rating: 5.0,
    status: 'Approved',
    tags: ['Resume', 'Overleaf', 'Placement']
  },
  {
    id: 3,
    title: 'VLSI Physical Design & Verilog Interview Kit',
    category: 'Core Eng',
    branch: 'ECE/EEE',
    type: 'Study Guide',
    author: 'Priya Dharshini (Batch 2022 - Hardware Eng @ Qualcomm)',
    downloads: 850,
    rating: 4.8,
    status: 'Approved',
    tags: ['Verilog', 'VLSI', 'Digital Design']
  },
  {
    id: 4,
    title: 'Top 50 SQL & Database Query Questions',
    category: 'Database',
    branch: 'All Branches',
    type: 'Practice Deck',
    author: 'Sanjay Kumar (Batch 2024 - Data Analyst @ ZoHo)',
    downloads: 2150,
    rating: 4.9,
    status: 'Approved',
    tags: ['SQL', 'DBMS', 'Practice']
  },
  {
    id: 5,
    title: 'System Design Interview & Microservices Architecture',
    category: 'Interview Prep',
    branch: 'CSE/IT',
    type: 'PDF Guide',
    author: 'Vigneshwaran R. (Batch 2021 - SDE @ Freshworks)',
    downloads: 410,
    rating: 4.9,
    status: 'Pending Approval',
    tags: ['SystemDesign', 'Microservices', 'Architecture']
  }
];

export const STUDENT_QUERIES = [
  {
    id: 1,
    studentName: 'Aravind M.',
    studentYear: '3rd Year CSE',
    question: 'How do I transition from competitive programming in C++ to building full-stack web projects for my resume?',
    category: 'Career Transition',
    likes: 42,
    status: 'Answered',
    answer: {
      alumniName: 'Vigneshwaran R.',
      alumniRole: 'Senior SDE @ Freshworks (Batch 2021)',
      text: 'Great question Aravind! Since your logic building is strong in C++, picking up JavaScript/TypeScript will take you less than a week. Start with React.js for frontend and Node.js with Express for backend. Build 2 high-quality projects (e.g., real-time collab tool, SaaS dashboard) rather than 5 generic clones.'
    }
  },
  {
    id: 2,
    studentName: 'Deepika S.',
    studentYear: '2nd Year ECE',
    question: 'Should I prepare for GATE or focus on off-campus core VLSI hardware internships?',
    category: 'Core & Higher Studies',
    likes: 31,
    status: 'Answered',
    answer: {
      alumniName: 'Anand Kumar',
      alumniRole: 'Design Engineer @ Texas Instruments (Batch 2020)',
      text: 'If your goal is to work in core semiconductor giants (Qualcomm, TI, Nvidia), both paths work! Preparing for GATE alongside Verilog projects gives you dual leverage: top IIT M.Tech programs for direct campus visits, and solid fundamentals for off-campus core drives.'
    }
  },
  {
    id: 3,
    studentName: 'Kavitha P.',
    studentYear: '3rd Year AI&DS',
    question: 'What are the most valued GenAI projects for entry-level Machine Learning roles?',
    category: 'Career Transition',
    likes: 18,
    status: 'Pending',
    answer: null
  }
];

export const EVENTS = [
  {
    id: 1,
    title: 'Crack Top SDE Roles: Resume & Coding Strategy',
    speaker: 'Surya Narayanan (Senior Software Engineer @ Microsoft)',
    date: 'Oct 12, 2026 • 6:30 PM IST',
    type: 'Live Webinar',
    status: 'Upcoming',
    bannerColor: 'from-blue-600 to-indigo-600',
    registrations: 340
  },
  {
    id: 2,
    title: '1-on-1 Mock Interview Drive with Alumni',
    speaker: '15+ Verified MKCE Alumni Mentors',
    date: 'Oct 18, 2026 • Full Day',
    type: 'Mock Interview',
    status: 'Registration Open',
    bannerColor: 'from-purple-600 to-pink-600',
    registrations: 180
  }
];

export const FORKS_PROJECTS = [
  {
    id: 'fork-1',
    title: 'SignBridge AI — Real-time Indian Sign Language Translator',
    studentName: 'Aravind Mukund & Team',
    branch: 'CSE 3rd Year',
    stars: 124,
    forksCount: 42,
    repoUrl: 'https://github.com/jayanthansenthilkumar/SignBridgeAI',
    demoUrl: 'https://signbridge.mkce.ac.in',
    description: 'Deep learning pipeline translating ISL video gestures to speech using Mediapipe and PyTorch.',
    tags: ['PyTorch', 'Computer Vision', 'React', 'FastAPI'],
    alumniReview: {
      reviewer: 'Vigneshwaran R. (Freshworks)',
      rating: 5.0,
      comment: 'Outstanding capstone project! The real-time inference latency is impressive. High placement potential.'
    }
  },
  {
    id: 'fork-2',
    title: 'Smart Grid IoT Monitor & Fault Analyzer',
    studentName: 'Gokulnath R.',
    branch: 'EEE 4th Year',
    stars: 88,
    forksCount: 29,
    repoUrl: 'https://github.com/gokul-eee/smart-grid-iot',
    demoUrl: 'https://smartgrid-mkce.vercel.app',
    description: 'ESP32 micro-controller sensor network monitoring line voltage anomalies with real-time Telegram alerts.',
    tags: ['ESP32', 'Embedded C', 'MQTT', 'Node-RED'],
    alumniReview: {
      reviewer: 'Priya Dharshini (Qualcomm)',
      rating: 4.8,
      comment: 'Great hardware-software integration. Recommended for core EEE placement profiles.'
    }
  },
  {
    id: 'fork-3',
    title: 'EduQuery — Campus Q&A & Resource Sharing Portal',
    studentName: 'Swetha V. & Praveen K.',
    branch: 'IT 3rd Year',
    stars: 96,
    forksCount: 35,
    repoUrl: 'https://github.com/swetha-it/eduquery-portal',
    demoUrl: 'https://eduquery.mkce.ac.in',
    description: 'Full-stack campus forum supporting markdown notes, PDF previews, and peer answer upvoting.',
    tags: ['Next.js', 'Supabase', 'Tailwind', 'PostgreSQL'],
    alumniReview: null
  }
];

export const NOTIFICATIONS = [
  {
    id: 1,
    title: 'New Alumni Answer Received',
    desc: 'Vigneshwaran R. answered your query regarding Full-Stack transition.',
    time: '10 mins ago',
    unread: true,
    type: 'answer'
  },
  {
    id: 2,
    title: 'Webinar Starting Soon',
    desc: '"Crack Top SDE Roles" begins in 2 hours. Click to join.',
    time: '2 hours ago',
    unread: true,
    type: 'event'
  },
  {
    id: 3,
    title: 'New Resource Approved',
    desc: 'ATS Engineering Resume Template was published by Placement Cell.',
    time: '1 day ago',
    unread: false,
    type: 'resource'
  }
];

export const INSTAGRAM_POSTS = [
  {
    id: 1,
    caption: '🚀 5 Essential DSA Patterns every MKCEian must master before 3rd Year Placements!',
    likes: 890,
    comments: 45,
    tag: 'PlacementTips',
    link: 'https://instagram.com/mkce.alumni'
  },
  {
    id: 2,
    caption: '💡 Alumni Spotlight: Meet Swetha (Batch 2022) sharing her journey to Google SDE 2!',
    likes: 1240,
    comments: 88,
    tag: 'AlumniSpotlight',
    link: 'https://instagram.com/mkce.alumni'
  },
  {
    id: 3,
    caption: '📚 Free Download: Resume Template that got 40+ MKCE students shortlisted in 2025.',
    likes: 1560,
    comments: 112,
    tag: 'FreeResource',
    link: 'https://instagram.com/mkce.alumni'
  }
];
