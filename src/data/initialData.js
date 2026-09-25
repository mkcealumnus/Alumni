export const INITIAL_PATHWAYS = [
  {
    id: 'sde-pathway',
    title: 'Software Engineering (SDE & Full-Stack)',
    branch: 'CSE / IT / CSBS',
    target_branches: ['CSE', 'IT', 'CSBS'],
    icon: 'Code',
    avg_package: '8 - 32 LPA',
    target_roles: ['SDE-1', 'Full-Stack Developer', 'Backend Engineer', 'Cloud Architect'],
    description: 'A comprehensive 4-year roadmap covering Data Structures & Algorithms, System Design, Full-Stack Web Architecture, and Off-Campus Placement Strategies.',
    milestones: [
      {
        year: '1st Year',
        title: 'Programming Foundations & Logic Building',
        description: 'Master core C/C++ or Python programming, basic data structures, and Git version control.',
        topics: [
          { name: 'C++ / Java Syntax & OOP Concepts', description: 'Classes, pointers, memory allocation, polymorphism, and inheritance.' },
          { name: 'Basic Data Structures', description: 'Arrays, Strings, Pointers, Recursion basics, and Time Complexity (Big O).' },
          { name: 'Git & GitHub Version Control', description: 'Creating repos, commits, branches, pull requests, and GitHub profile setup.' },
          { name: 'LeetCode / HackerRank Practice', description: 'Solve 50+ Easy logic-building problems in C++ or Java.' }
        ]
      },
      {
        year: '2nd Year',
        title: 'Advanced DSA & Modern Web Stack',
        description: 'Deep dive into Tree/Graph algorithms, relational databases, and full-stack web development.',
        topics: [
          { name: 'Advanced DSA (Trees, Graphs, DP)', description: 'Binary Trees, BST, Graph Traversals (BFS/DFS), Dynamic Programming, and Heaps.' },
          { name: 'Frontend Engineering (React & Tailwind)', description: 'React 19, Hooks, State Management, Tailwind CSS, and REST API integration.' },
          { name: 'Database Management Systems (DBMS)', description: 'SQL queries, Indexing, Transactions, Normalization, and PostgreSQL/MongoDB.' },
          { name: 'Operating Systems & Computer Networks', description: 'Processes, Threads, Deadlocks, TCP/IP, HTTP/HTTPS protocols, and DNS.' }
        ]
      },
      {
        year: '3rd Year',
        title: 'System Design, Microservices & Competitive Coding',
        description: 'Build production-grade full-stack applications and prepare for 3rd-year internship drives.',
        topics: [
          { name: 'Low-Level Design (LLD) & Design Patterns', description: 'SOLID principles, Factory, Singleton, Observer, and UML diagrams.' },
          { name: 'Backend Engineering & Microservices', description: 'Node.js/Express or Spring Boot, JWT Auth, Redis Caching, and Docker containers.' },
          { name: 'LeetCode Medium Solved (200+ Problems)', description: 'Sliding Window, Two Pointers, Monotonic Stack, Backtracking, and Binary Search.' },
          { name: 'Mock Technical Interviews', description: 'Conduct peer mock interviews and 1-on-1 alumni resume reviews.' }
        ]
      },
      {
        year: '4th Year',
        title: 'Off-Campus Drives & High-Package Offers',
        description: 'Final placement sprint focusing on High-Level Design, ATS resume tailoring, and interview rounds.',
        topics: [
          { name: 'High-Level System Design (HLD)', description: 'Scalability, Load Balancers, Rate Limiters, Message Queues (Kafka), and Sharding.' },
          { name: 'ATS Resume & Portfolio Website', description: 'Craft impact-driven bullet points with quantitative results and live project links.' },
          { name: 'HR & Behavioral Interview Prep', description: 'STAR method for situational questions, leadership principles, and salary negotiation.' },
          { name: 'Off-Campus Application Sprint', description: 'Target referral drives at Tier-1 companies (Amazon, Zoho, Cisco, Walmart, Target).' }
        ]
      }
    ]
  },
  {
    id: 'ai-ds-pathway',
    title: 'AI, Data Science & Machine Learning',
    branch: 'AI & DS / CSE',
    target_branches: ['AI & DS', 'CSE'],
    icon: 'Brain',
    avg_package: '10 - 35 LPA',
    target_roles: ['AI Engineer', 'Machine Learning Engineer', 'Data Scientist', 'MLOps Specialist'],
    description: 'Master Python data pipelines, Classical ML algorithms, PyTorch Deep Learning, Large Language Models (LLMs), and RAG Architecture.',
    milestones: [
      {
        year: '1st Year',
        title: 'Python, Mathematics & Data Foundations',
        description: 'Build mathematical intuition in Linear Algebra, Calculus, Statistics, and Python programming.',
        topics: [
          { name: 'Python for Data Science', description: 'Data structures, list comprehensions, OOP in Python, and file handling.' },
          { name: 'Linear Algebra & Vector Calculus', description: 'Matrices, Eigenvalues, Gradients, Partial Derivatives, and Probability theory.' },
          { name: 'NumPy, Pandas & Data Wrangling', description: 'Array manipulation, DataFrames, data cleaning, and Exploratory Data Analysis (EDA).' },
          { name: 'Data Visualization (Matplotlib & Seaborn)', description: 'Plotting distributions, heatmaps, scatter plots, and statistical charts.' }
        ]
      },
      {
        year: '2nd Year',
        title: 'Classical ML Algorithms & Feature Engineering',
        description: 'Supervised & Unsupervised Learning models with Scikit-Learn and SQL analytics.',
        topics: [
          { name: 'Supervised Machine Learning', description: 'Linear/Logistic Regression, Decision Trees, Random Forests, and Gradient Boosting (XGBoost).' },
          { name: 'Unsupervised Learning & Clustering', description: 'K-Means, Hierarchical Clustering, PCA dimension reduction, and Anomaly Detection.' },
          { name: 'Feature Engineering & Model Evaluation', description: 'Scaling, Encoding, Cross-Validation, Precision/Recall, and ROC-AUC metrics.' },
          { name: 'Advanced SQL for Analytics', description: 'Window functions, CTEs, complex JOINs, and database query optimization.' }
        ]
      },
      {
        year: '3rd Year',
        title: 'Deep Learning, Computer Vision & LLMs',
        description: 'Train neural networks using PyTorch, Transformers, Hugging Face, and Vector Databases.',
        topics: [
          { name: 'Deep Learning with PyTorch', description: 'Neural Network architectures, Backpropagation, Loss functions, and Optimizers (Adam).' },
          { name: 'Computer Vision & Convolutional Nets', description: 'CNNs, ResNet, Transfer Learning, OpenCV, and Object Detection (YOLO).' },
          { name: 'Natural Language Processing & Transformers', description: 'Tokenization, Embeddings, Attention Mechanism, BERT, and Hugging Face Transformers.' },
          { name: 'Generative AI & RAG Pipelines', description: 'LangChain, LlamaIndex, OpenAI/Groq API, ChromaDB/Supabase Vector, and Prompt Engineering.' }
        ]
      },
      {
        year: '4th Year',
        title: 'Production MLOps & AI Product Deployment',
        description: 'Deploy AI models into scalable cloud services with monitoring and CI/CD pipelines.',
        topics: [
          { name: 'FastAPI & Microservice Serving', description: 'Containerizing ML models with Docker, FastAPI REST endpoints, and async workers.' },
          { name: 'MLOps & Experiment Tracking', description: 'MLflow, DVC versioning, Model Registry, and Automated Retraining Workflows.' },
          { name: 'End-to-End AI Capstone Project', description: 'Deploy a full-stack AI SaaS app live on Vercel with real-time vector search.' },
          { name: 'Research Paper & Portfolio Building', description: 'Publish technical blogs on Medium and GitHub showcase for AI Engineer roles.' }
        ]
      }
    ]
  },
  {
    id: 'vlsi-embedded-pathway',
    title: 'VLSI, Embedded & Hardware Core',
    branch: 'ECE / EEE',
    target_branches: ['ECE', 'EEE'],
    icon: 'Cpu',
    avg_package: '7 - 24 LPA',
    target_roles: ['RTL Design Engineer', 'Embedded Hardware Engineer', 'FPGA Engineer', 'Verification Engineer'],
    description: 'Specialized path for Electronics students targeting semiconductor giants like Qualcomm, Intel, Texas Instruments, and Synopsis.',
    milestones: [
      {
        year: '1st Year',
        title: 'Digital Electronics & C Fundamentals',
        description: 'Build strong basics in Boolean logic, combinational circuits, and Embedded C programming.',
        topics: [
          { name: 'Digital Electronics & Logic Design', description: 'Logic gates, Karnaugh maps, Multiplexers, Flip-Flops, and Counters.' },
          { name: 'Embedded C Programming', description: 'Pointers, Bitwise operators, memory-mapped registers, and struct optimization.' },
          { name: 'Basic Circuit Theory & Simulation', description: 'KCL, KVL, Network theorems, and LTSpice/Proteus circuit simulation.' }
        ]
      },
      {
        year: '2nd Year',
        title: 'Microcontrollers & Hardware Description Languages',
        description: 'Program ARM Cortex microcontrollers and write Verilog HDL for digital design.',
        topics: [
          { name: 'Microcontroller Architecture (ARM / 8051)', description: 'Timers, Interrupts, ADC, UART, SPI, and I2C communication protocols.' },
          { name: 'Verilog HDL Fundamentals', description: 'Dataflow, Behavioral, and Structural modeling of digital circuits in Verilog.' },
          { name: 'Sequential Circuit Design & FSM', description: 'Mealy and Moore State Machines, Setup & Hold time constraints, and Clock skew.' }
        ]
      },
      {
        year: '3rd Year',
        title: 'FPGA Prototyping & SystemVerilog',
        description: 'Synthesize designs on Xilinx/Intel FPGAs and learn SystemVerilog for verification.',
        topics: [
          { name: 'FPGA Prototyping (Xilinx Vivado)', description: 'Synthesis, Place & Route, Bitstream generation, and hardware testing on Basys3/Zybo.' },
          { name: 'SystemVerilog for Design & Verification', description: 'Object-oriented testbenches, Randomization, Assertions, and Coverage metrics.' },
          { name: 'Static Timing Analysis (STA)', description: 'Setup time, Hold time violations, Clock Domain Crossing (CDC), and timing closure.' }
        ]
      },
      {
        year: '4th Year',
        title: 'EDA Tools Flow & Semiconductor Hiring',
        description: 'Prepare for core hardware written exams, technical viva, and EDA tool synthesis.',
        topics: [
          { name: 'UVM (Universal Verification Methodology)', description: 'UVM testbench components: Driver, Monitor, Agent, Scoreboard, and Environment.' },
          { name: 'CMOS Analog & Mixed Signal Basics', description: 'MOSFET characteristics, CMOS inverter layout, and parasitic extraction.' },
          { name: 'Qualcomm / Intel Core Written Test Prep', description: 'Solve past technical placement papers on Digital Design, Aptitude, and Verilog RTL.' }
        ]
      }
    ]
  }
];

export const INITIAL_ALUMNI = [
  {
    id: 1,
    full_name: 'Jayanthan Senthilkumar',
    designation: 'AI & Full-Stack Engineer',
    company_or_college: 'Tech Builder & Consultant',
    location: 'Australia / India',
    branch: 'CSE',
    graduation_year: '2024',
    rating: 5.0,
    queries_answered: 42,
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80',
    skills: ['Python', 'TypeScript', 'LLMs / RAG', 'React 19', 'System Design'],
    bio: 'Passionate about building AI products end-to-end. Guides MKCE students on modern web, AI pipelines, and international opportunities.'
  },
  {
    id: 2,
    full_name: 'Vigneshwaran R.',
    designation: 'Senior SDE',
    company_or_college: 'Amazon',
    location: 'Bengaluru, India',
    branch: 'CSE',
    graduation_year: '2021',
    rating: 4.9,
    queries_answered: 38,
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80',
    skills: ['Java', 'AWS', 'Distributed Systems', 'Microservices', 'LeetCode'],
    bio: 'Backend specialist working on high-throughput microservices. Helps students crack Tier-1 product company coding rounds.'
  },
  {
    id: 3,
    full_name: 'Priyanka M.',
    designation: 'Data Scientist',
    company_or_college: 'Google',
    location: 'Hyderabad, India',
    branch: 'AI & DS',
    graduation_year: '2022',
    rating: 5.0,
    queries_answered: 29,
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop&q=80',
    skills: ['PyTorch', 'ML Pipelines', 'NLP', 'SQL', 'FastAPI'],
    bio: 'Focuses on NLP models and machine learning pipelines. Mentors AI & DS undergrads on real-world projects and Kaggle competitions.'
  },
  {
    id: 4,
    full_name: 'Karthik Raja K.',
    designation: 'RTL Design Engineer',
    company_or_college: 'Qualcomm',
    location: 'Bengaluru, India',
    branch: 'ECE',
    graduation_year: '2020',
    rating: 4.8,
    queries_answered: 31,
    avatar_url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80',
    skills: ['Verilog', 'SystemVerilog', 'FPGA', 'STA', 'Digital Design'],
    bio: 'Hardware engineer with experience in chip design and RTL verification. Guides ECE/EEE students for semiconductor placements.'
  },
  {
    id: 5,
    full_name: 'Divya Bharathi',
    designation: 'UI/UX & Full-Stack Lead',
    company_or_college: 'Zoho Corporation',
    location: 'Chennai, India',
    branch: 'IT',
    graduation_year: '2023',
    rating: 4.9,
    queries_answered: 25,
    avatar_url: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&auto=format&fit=crop&q=80',
    skills: ['React', 'Tailwind CSS', 'Node.js', 'Figma', 'REST APIs'],
    bio: 'Full-stack developer building enterprise web platforms. Shares insights on frontend engineering and cracking Zoho recruitment rounds.'
  }
];

export const INITIAL_RESOURCES = [
  {
    id: 101,
    title: 'FAANG-Approved Overleaf LaTeX ATS Resume Template',
    category: 'Resume',
    target_branch: 'All Branches',
    type: 'LaTeX & PDF',
    author: 'Jayanthan Senthilkumar',
    author_role: 'AI & Full-Stack Engineer',
    downloads_count: 342,
    rating: 5.0,
    size: '1.2 MB',
    tags: ['Resume', 'Overleaf', 'ATS', 'Placement'],
    description: 'Clean single-page resume format engineered for high ATS parsing scores. Includes action verbs and quantifiable achievement structures.'
  },
  {
    id: 102,
    title: 'Ultimate SDE Placement Prep & DSA 450 Sheet 2026',
    category: 'Interview Prep',
    target_branch: 'CSE/IT',
    type: 'PDF Guide',
    author: 'Vigneshwaran R.',
    author_role: 'Senior SDE @ Amazon',
    downloads_count: 512,
    rating: 4.9,
    size: '4.8 MB',
    tags: ['DSA', 'LeetCode', 'C++', 'Java', 'Amazon'],
    description: 'Curated 450 topic-wise coding problems covering Graphs, Dynamic Programming, Trees, Sliding Window, and Tries with optimal solutions.'
  },
  {
    id: 103,
    title: 'System Design & Microservices Architecture Handbook',
    category: 'Full-Stack',
    target_branch: 'CSE/IT',
    type: 'PDF Guide',
    author: 'MKCE Alumni Tech Core',
    author_role: 'Verified Industry Contributors',
    downloads_count: 289,
    rating: 5.0,
    size: '6.5 MB',
    tags: ['SystemDesign', 'NodeJS', 'Kafka', 'Redis', 'Docker'],
    description: 'High-Level & Low-Level System Design fundamentals including Load Balancers, Rate Limiters, Caching strategies, and Database Sharding.'
  },
  {
    id: 104,
    title: 'Verilog HDL & RTL Verification Crash Cheat Sheet',
    category: 'Core Eng',
    target_branch: 'ECE/EEE',
    type: 'PDF Guide',
    author: 'Karthik Raja K.',
    author_role: 'RTL Design Eng @ Qualcomm',
    downloads_count: 195,
    rating: 4.8,
    size: '3.1 MB',
    tags: ['Verilog', 'VLSI', 'FPGA', 'Qualcomm', 'ECE'],
    description: 'Quick reference guide for FSM state machine coding, timing constraints (Setup/Hold), and SystemVerilog testbench structures.'
  },
  {
    id: 105,
    title: 'SQL & Database Indexing Quick Reference Guide',
    category: 'Database',
    target_branch: 'All Branches',
    type: 'PDF Guide',
    author: 'Divya Bharathi',
    author_role: 'Full-Stack Lead @ Zoho',
    downloads_count: 240,
    rating: 4.9,
    size: '2.4 MB',
    tags: ['SQL', 'PostgreSQL', 'DBMS', 'Zoho', 'Queries'],
    description: 'Master complex SQL JOINs, Window Functions, B-Tree Indexing, Query Optimization, and ACID transaction guarantees.'
  }
];

export const INITIAL_QUERIES = [
  {
    id: 201,
    studentName: 'Aravind M.',
    studentYear: '3rd Year CSE',
    category: 'Placement Strategy',
    question: 'How should 3rd Year MKCE students prepare for off-campus hiring at Tier-1 product companies like Amazon and Cisco?',
    likes_count: 24,
    status: 'Answered',
    date: '2 hours ago',
    answer: {
      alumniName: 'Vigneshwaran R.',
      alumniRole: 'Senior SDE @ Amazon',
      company: 'Amazon',
      text: 'Start with 250+ solved LeetCode Medium problems focusing on Graphs, Trees, and DP. Build 1 solid production full-stack or AI project deployed live with a GitHub link. Optimize your ATS resume and get alumni referrals early in 4th year!'
    }
  },
  {
    id: 202,
    studentName: 'Kaviya S.',
    studentYear: '3rd Year ECE',
    category: 'Core & Higher Studies',
    question: 'Is Verilog and SystemVerilog enough for getting placed in VLSI core companies like Qualcomm, Intel, and Texas Instruments?',
    likes_count: 19,
    status: 'Answered',
    date: 'Yesterday',
    answer: {
      alumniName: 'Karthik Raja K.',
      alumniRole: 'RTL Design Eng @ Qualcomm',
      company: 'Qualcomm',
      text: 'Yes! Verilog and SystemVerilog are essential. Make sure you practice Static Timing Analysis (STA), setup/hold time calculations, and build 2 FPGA projects using Xilinx Vivado. Also solve past digital design written test questions.'
    }
  },
  {
    id: 203,
    studentName: 'Praveen Kumar',
    studentYear: '2nd Year AI & DS',
    category: 'Career Transition',
    question: 'What projects will stand out on an AI & DS resume for internships in 2026?',
    likes_count: 15,
    status: 'Pending',
    date: '3 hours ago',
    answer: null
  }
];

export const INITIAL_EVENTS = [
  {
    id: 301,
    title: 'Cracking Off-Campus SDE Hiring: Zero to FAANG Offer',
    speaker: 'Vigneshwaran R.',
    speaker_role: 'Senior SDE @ Amazon (MKCE Batch 2021)',
    date: 'Oct 15, 2026 • 6:30 PM IST',
    type: 'Live Webinar',
    status: 'Upcoming',
    banner_color: 'from-orange-600 to-amber-600',
    registrations: 148,
    agenda: ['Off-Campus Referral Hacks', 'Coding Round Strategy', 'Live Resume Roast']
  },
  {
    id: 302,
    title: 'Building Production AI & LLM Applications in 2026',
    speaker: 'Jayanthan Senthilkumar',
    speaker_role: 'AI & Full-Stack Engineer (MKCE Batch 2024)',
    date: 'Oct 22, 2026 • 7:00 PM IST',
    type: 'Domain Workshop',
    status: 'Upcoming',
    banner_color: 'from-cyan-600 to-indigo-600',
    registrations: 192,
    agenda: ['RAG Pipeline Architecture', 'Vector Search with Supabase', 'Vercel AI Deployment']
  },
  {
    id: 303,
    title: 'VLSI & Semiconductor Placement Masterclass',
    speaker: 'Karthik Raja K.',
    speaker_role: 'RTL Design Engineer @ Qualcomm',
    date: 'Nov 02, 2026 • 6:00 PM IST',
    type: 'Mock Interview Drive',
    status: 'Upcoming',
    banner_color: 'from-emerald-600 to-teal-600',
    registrations: 110,
    agenda: ['Digital Logic Written Test Guide', 'RTL Verilog Coding Questions', '1-on-1 Viva Prep']
  }
];

export const INITIAL_INSTAGRAM_POSTS = [
  {
    id: 401,
    caption: 'Top 5 LeetCode Patterns Every MKCE Student Must Master in 2026 🚀 (Sliding Window, Two Pointers, Monotonic Stack & Fast/Slow Pointers). Save this post for your placement sprint!',
    tag: 'SDEPrep',
    likes: 480,
    comments: 42,
    link: 'https://instagram.com/mkce.alumni'
  },
  {
    id: 402,
    caption: 'Free ATS Resume Checklist — How 3 MKCE Alumni Got Called by Top Tech Companies without campus placement. Download the Overleaf template on our portal! 📄✨',
    tag: 'ResumeGuide',
    likes: 620,
    comments: 65,
    link: 'https://instagram.com/mkce.alumni'
  },
  {
    id: 403,
    caption: 'Alumni Spotlight: From MKCE Campus to Amazon Senior SDE 🌟 Vigneshwaran shares his 4-year engineering roadmap and how consistent coding changed his career trajectory.',
    tag: 'AlumniSuccess',
    likes: 890,
    comments: 94,
    link: 'https://instagram.com/mkce.alumni'
  }
];
