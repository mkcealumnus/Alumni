import { createClient } from '@supabase/supabase-js';

// Initialize Supabase Client with environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://trulyybuehooprkknuoz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_n9492e8repCoQzeSnM4QkA_y_8W50dw';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/*
==============================================================================
SUPABASE DATABASE SERVICES
==============================================================================
*/

// Initial Seed Data used to automatically populate live Supabase tables if empty
export const INITIAL_SEED = {
  pathways: [
    {
      id: 'software-engineering',
      title: 'Software Engineering & SDE',
      target_branches: ['CSE', 'IT', 'ECE'],
      branch: 'CSE / IT / ECE',
      icon: 'Code',
      color: 'from-blue-600 to-indigo-600',
      description: 'Complete 4-year roadmap to master Data Structures, System Design, Full-Stack engineering, and crack Tier-1 SDE placements.',
      target_roles: ['SDE-1', 'Backend Developer', 'Full-Stack Engineer', 'Frontend Engineer'],
      avg_package: '8 - 28 LPA',
      milestones: [
        {
          year: '1st Year',
          title: 'Programming & Logic Foundations',
          description: 'Build strong fundamentals in C++ / Java, basic data structures, version control, and problem solving.',
          topics: [
            { name: 'C++ or Java Programming Basics', description: 'Variables, loops, functions, pointers, and memory management' },
            { name: 'Basic Data Structures (Arrays, Strings, Linked Lists)', description: 'Space & time complexity analysis (Big-O)' },
            { name: 'Git & GitHub Version Control', description: 'Commits, branching, pull requests, and portfolio hosting' },
            { name: 'Competitive Coding Foundations (LeetCode Easy)', description: 'Solve 50+ basic algorithmic problems' }
          ]
        },
        {
          year: '2nd Year',
          title: 'Advanced DSA & Computer Science Core',
          description: 'Master advanced algorithms and fundamental CS concepts required for technical interview rounds.',
          topics: [
            { name: 'Advanced DSA (Trees, Graphs, Dynamic Programming)', description: 'LeetCode Medium (150+ solved problems)' },
            { name: 'Object Oriented Programming (OOPs)', description: 'Abstraction, Encapsulation, Inheritance, Polymorphism' },
            { name: 'Database Management Systems & SQL', description: 'Relational DB design, Normalization, Joins, Indexing' },
            { name: 'Operating Systems & Computer Networks', description: 'Processes, Threads, Deadlocks, TCP/IP, HTTP/HTTPS' }
          ]
        },
        {
          year: '3rd Year',
          title: 'Full-Stack Project Building & System Design',
          description: 'Architect scalable web applications, learn cloud deployment, and secure summer internships.',
          topics: [
            { name: 'Full-Stack Development (React.js + Node.js/Express)', description: 'Build 2 production-grade full-stack projects' },
            { name: 'Low-Level & High-Level System Design Intro', description: 'UML diagrams, design patterns, load balancing, caching' },
            { name: 'Open Source Contributions & Hackathons', description: 'Participate in Smart India Hackathon & open-source repos' },
            { name: 'Resume Building & Internship Applications', description: 'Tailor ATS resume and apply for off-campus internships' }
          ]
        },
        {
          year: '4th Year',
          title: 'Placement Preparation & Company Mocks',
          description: 'Execute focused revision, participate in alumni mock interviews, and conquer campus recruitment drives.',
          topics: [
            { name: 'Company-Specific Coding Revision (Amazon, ZoHo, TCS Digital)', description: 'Top tagged interview questions' },
            { name: '1-on-1 Alumni Mock Technical Interviews', description: 'Live coding & system architecture simulation' },
            { name: 'Behavioral & HR Round Preparation', description: 'STAR method responses for leadership principles' },
            { name: 'Offer Evaluation & Salary Negotiation', description: 'Navigating multiple placement offers' }
          ]
        }
      ]
    },
    {
      id: 'ai-ml',
      title: 'AI, Data Science & Machine Learning',
      target_branches: ['AI & DS', 'CSE', 'IT'],
      branch: 'AI & DS / CSE / IT',
      icon: 'Brain',
      color: 'from-purple-600 to-pink-600',
      description: 'Master Data Analysis, Machine Learning models, Deep Learning architectures, MLOps, and Generative AI applications.',
      target_roles: ['AI Engineer', 'Data Scientist', 'ML Engineer', 'Data Analyst'],
      avg_package: '7 - 24 LPA',
      milestones: [
        {
          year: '1st Year',
          title: 'Python & Mathematical Foundations',
          description: 'Establish linear algebra, probability, and core Python data stack competencies.',
          topics: [
            { name: 'Python Programming for Data Science', description: 'Data structures, list comprehensions, functional programming' },
            { name: 'Linear Algebra, Calculus & Statistics', description: 'Matrix operations, vector spaces, hypothesis testing' },
            { name: 'NumPy, Pandas & Data Wrangling', description: 'Data cleaning, aggregation, and tabular data manipulation' },
            { name: 'Data Visualization (Matplotlib, Seaborn)', description: 'Exploratory data analysis plots and dashboards' }
          ]
        },
        {
          year: '2nd Year',
          title: 'Machine Learning Algorithms & Kaggle',
          description: 'Understand regression, classification, clustering, and competitive data science techniques.',
          topics: [
            { name: 'Supervised Learning Algorithms', description: 'Linear/Logistic Regression, Decision Trees, Random Forests, XGBoost' },
            { name: 'Unsupervised Learning & Clustering', description: 'K-Means, PCA dimensional reduction, Hierarchical clustering' },
            { name: 'Scikit-Learn & Feature Engineering', description: 'Pipeline building, cross-validation, hyperparameter tuning' },
            { name: 'Kaggle Competitions & Portfolio Projects', description: 'Compete in tabular & predictive modelling benchmarks' }
          ]
        },
        {
          year: '3rd Year',
          title: 'Deep Learning, NLP & Computer Vision',
          description: 'Build neural network models using PyTorch and TensorFlow for vision and language tasks.',
          topics: [
            { name: 'Deep Learning with PyTorch / TensorFlow', description: 'ANNs, Backpropagation, Activation functions, Optimizers' },
            { name: 'Computer Vision (CNNs & OpenCV)', description: 'Image classification, Object detection (YOLO), Segmentation' },
            { name: 'Natural Language Processing (NLP & Transformers)', description: 'RNNs, LSTMs, Attention Mechanism, HuggingFace' },
            { name: 'Generative AI & LLM Prompting (RAG)', description: 'Retrieval Augmented Generation with LangChain & Vector DBs' }
          ]
        },
        {
          year: '4th Year',
          title: 'MLOps Pipeline & AI Engineering Roles',
          description: 'Deploy machine learning models to cloud API endpoints and prepare for technical interviews.',
          topics: [
            { name: 'MLOps & Model Deployment (FastAPI, Docker, AWS)', description: 'CI/CD for Machine Learning models' },
            { name: 'Capstone AI Research Paper / Product', description: 'Publish or deploy a real-world AI solution' },
            { name: 'Machine Learning Coding & Math Interviews', description: 'Algorithmic ML interviews and coding challenges' }
          ]
        }
      ]
    },
    {
      id: 'core-hardware',
      title: 'VLSI, Embedded Systems & IoT',
      target_branches: ['ECE', 'EEE'],
      branch: 'ECE / EEE',
      icon: 'Cpu',
      color: 'from-amber-600 to-orange-600',
      description: 'Hardware engineering pathway targeting chip design, digital synthesis, Verilog, RTOS, and semiconductor giants.',
      target_roles: ['VLSI Design Engineer', 'Embedded Firmware Engineer', 'Hardware QA Engineer', 'Digital System Designer'],
      avg_package: '6 - 22 LPA',
      milestones: [
        {
          year: '1st Year',
          title: 'Circuit Analysis & Embedded C',
          description: 'Learn electrical circuit fundamentals, analog devices, and C programming for microcontrollers.',
          topics: [
            { name: 'Electronic Devices & Circuit Theory', description: 'Diodes, Transistors (BJTs, MOSFETs), Op-Amps' },
            { name: 'Embedded C Programming Basics', description: 'Bit manipulation, pointers, register programming' },
            { name: 'Arduino & Microcontroller Lab Projects', description: 'Interfacing sensors, LCDs, motors, and serial communication' }
          ]
        },
        {
          year: '2nd Year',
          title: 'Digital Systems & HDL Design',
          description: 'Master logic gates, FPGA architecture, and hardware description languages (Verilog).',
          topics: [
            { name: 'Digital Logic & Sequential Circuits', description: 'Combinational logic, Flip-Flops, Registers, Counters, FSMs' },
            { name: 'Verilog HDL Programming & Simulation', description: 'RTL coding, Testbenches, ModelSim / EDA Playground' },
            { name: 'Signals & Systems Analysis', description: 'Fourier Transform, Laplace, Z-Transforms, Digital Filters' },
            { name: 'PCB Schematic & Layout Design (KiCAD)', description: 'Component placement, routing, Gerber file generation' }
          ]
        },
        {
          year: '3rd Year',
          title: 'CMOS VLSI Design & Real-Time OS',
          description: 'Diverge into ASIC physical design or embedded real-time systems programming.',
          topics: [
            { name: 'CMOS Digital IC Design Fundamentals', description: 'Stick diagrams, Euler path, Propagation delay, Static CMOS logic' },
            { name: 'Real-Time Operating Systems (FreeRTOS)', description: 'Task scheduling, Semaphores, Mutexes, Inter-task communication' },
            { name: 'Hardware Protocols (I2C, SPI, UART, CAN)', description: 'Serial bus protocols for automotive & industrial electronics' },
            { name: 'FPGA Prototyping (Xilinx / Altera)', description: 'Vivado synthesis, Bitstream generation, Hardware debugging' }
          ]
        },
        {
          year: '4th Year',
          title: 'Semiconductor Core Placement Drive',
          description: 'Prepare for Qualcomm, Texas Instruments, Intel, Bosch, and GATE Core exams.',
          topics: [
            { name: 'Physical Design & Static Timing Analysis (STA)', description: 'Setup/hold time violations, clock tree synthesis' },
            { name: 'Qualcomm / TI Aptitude & Technical Written Tests', description: 'Past paper problem solving' },
            { name: 'GATE ECE / EEE Technical Mastery', description: 'Comprehensive domain review for PSUs & IIT M.Tech' }
          ]
        }
      ]
    }
  ],

  resources: [
    {
      id: 1,
      title: 'Complete SDE Interview Master Kit 2026',
      category: 'Interview Prep',
      target_branch: 'CSE/IT',
      branch: 'CSE/IT',
      type: 'PDF Guide',
      author: 'Karthik Raja',
      author_role: 'SDE-2 @ Amazon (MKCE Batch 2023)',
      authorRole: 'SDE-2 @ Amazon (MKCE Batch 2023)',
      downloads: 1420,
      rating: 4.9,
      size: '14.2 MB',
      tags: ['DSA', 'System Design', 'Behavioral', 'LeetCode'],
      description: 'Comprehensive 120-page hand-written notes covering 15 key DSA patterns, Top 50 System Design questions, and Amazon Leadership Principles STAR templates.'
    },
    {
      id: 2,
      title: 'Official ATS-Friendly Engineering Resume Templates',
      category: 'Resume',
      target_branch: 'All Branches',
      branch: 'All Branches',
      type: 'Overleaf / Word',
      author: 'MKCE Placement Cell & Alumni',
      author_role: 'Verified Institutional Resource',
      authorRole: 'Verified Institutional Resource',
      downloads: 3890,
      rating: 5.0,
      size: '2.8 MB',
      tags: ['Resume', 'Overleaf', 'Placement', 'ATS 95+'],
      description: 'Clean LaTeX & Word templates optimized for ATS parsers (TCS, ZoHo, Wipro, Amazon). Includes bullet point action verbs and project formatting guidelines.'
    },
    {
      id: 3,
      title: 'VLSI Physical Design & Verilog Interview Handbook',
      category: 'Core Eng',
      target_branch: 'ECE/EEE',
      branch: 'ECE/EEE',
      type: 'Study Guide',
      author: 'Priya Dharshini',
      author_role: 'Hardware Engineer @ Qualcomm (Batch 2022)',
      authorRole: 'Hardware Engineer @ Qualcomm (Batch 2022)',
      downloads: 850,
      rating: 4.8,
      size: '8.5 MB',
      tags: ['Verilog', 'VLSI', 'Digital Design', 'STA'],
      description: 'RTL coding syntax cheatsheet, FSM state machines, Setup/Hold slack calculation problems, and Qualcomm interview round questions.'
    },
    {
      id: 4,
      title: 'Top 50 SQL & Relational Database Query Deck',
      category: 'Database',
      target_branch: 'All Branches',
      branch: 'All Branches',
      type: 'Practice Deck',
      author: 'Sanjay Kumar',
      author_role: 'Data Analyst @ ZoHo (Batch 2024)',
      authorRole: 'Data Analyst @ ZoHo (Batch 2024)',
      downloads: 2150,
      rating: 4.9,
      size: '4.1 MB',
      tags: ['SQL', 'DBMS', 'Joins', 'LeetCode SQL'],
      description: 'Frequently asked SQL queries in technical rounds: Nth highest salary, window functions, group by HAVING, indexing performance, and schema design.'
    },
    {
      id: 5,
      title: 'React.js & Modern Web Dev Interview Guide',
      category: 'Full-Stack',
      target_branch: 'CSE/IT/AI&DS',
      branch: 'CSE/IT/AI&DS',
      type: 'PDF Guide',
      author: 'Naveen Prasath',
      author_role: 'Frontend Lead @ Freshworks (Batch 2021)',
      authorRole: 'Frontend Lead @ Freshworks (Batch 2021)',
      downloads: 1780,
      rating: 4.9,
      size: '9.6 MB',
      tags: ['React', 'JavaScript', 'Redux', 'Web Performance'],
      description: 'Core JS concepts (closures, event loop, promises) + React state management, virtual DOM, custom hooks, and live coding interview scenarios.'
    }
  ],

  student_queries: [
    {
      id: 'q-1',
      studentName: 'Aravind M.',
      studentYear: '3rd Year CSE',
      question: 'How do I transition from competitive programming in C++ to building full-stack web projects for my resume?',
      category: 'Career Transition',
      likes: 42,
      status: 'Answered',
      date: '2 days ago',
      answer: {
        alumniName: 'Vigneshwaran R.',
        alumniRole: 'Senior SDE @ Freshworks (Batch 2021)',
        company: 'Freshworks',
        text: 'Great question Aravind! Since your logic building is strong in C++, picking up JavaScript/TypeScript will take less than a week. Start with React.js for frontend and Node.js with Express for backend. Build 2 high-quality projects (e.g., real-time collab tool, SaaS dashboard) rather than 5 generic clones.'
      }
    },
    {
      id: 'q-2',
      studentName: 'Deepika S.',
      studentYear: '2nd Year ECE',
      question: 'Should I prepare for GATE or focus on off-campus core VLSI hardware internships?',
      category: 'Core & Higher Studies',
      likes: 31,
      status: 'Answered',
      date: '4 days ago',
      answer: {
        alumniName: 'Anand Kumar',
        alumniRole: 'Design Engineer @ Texas Instruments (Batch 2020)',
        company: 'Texas Instruments',
        text: 'If your goal is to work in core semiconductor giants (Qualcomm, TI, Nvidia), both paths work! Preparing for GATE alongside Verilog projects gives you dual leverage: top IIT M.Tech programs for direct campus visits, and solid fundamentals for off-campus core drives.'
      }
    },
    {
      id: 'q-3',
      studentName: 'Kavya P.',
      studentYear: '3rd Year AI & DS',
      question: 'Are LeetCode DSA questions mandatory for Data Science and Machine Learning placement roles?',
      category: 'Placement Strategy',
      likes: 24,
      status: 'Answered',
      date: '1 week ago',
      answer: {
        alumniName: 'Siddharth M.',
        alumniRole: 'Data Scientist @ LatentView Analytics (Batch 2022)',
        company: 'LatentView Analytics',
        text: 'Yes! Most tier-1 product companies still conduct an initial online coding assessment with standard DSA problems (Easy-Medium). Once you clear that round, subsequent rounds focus on SQL, ML algorithms, feature engineering, and your portfolio projects.'
      }
    }
  ],

  events: [
    {
      id: 'e-1',
      title: 'Crack Top SDE Roles: Resume & Coding Strategy 2026',
      speaker: 'Surya Narayanan',
      speakerRole: 'Senior Software Engineer @ Microsoft (Batch 2019)',
      date: 'Oct 12, 2026 • 6:30 PM IST',
      type: 'Live Webinar',
      status: 'Upcoming',
      bannerColor: 'from-indigo-600 to-blue-600',
      registrations: 340,
      tags: ['SDE Prep', 'Resume Review', 'Coding Round'],
      agenda: ['15 DSA Patterns to Master', 'ATS Resume Audit live sample', 'Q&A session with Microsoft SDEs']
    },
    {
      id: 'e-2',
      title: '1-on-1 Mock Interview Drive with Verified Alumni Mentors',
      speaker: '15+ MKCE Alumni Mentors',
      speakerRole: 'Amazon, Qualcomm, ZoHo, Freshworks',
      date: 'Oct 18, 2026 • Full Day (10:00 AM - 5:00 PM)',
      type: 'Mock Interview Drive',
      status: 'Registration Open',
      bannerColor: 'from-purple-600 to-pink-600',
      registrations: 180,
      tags: ['1-on-1', 'Mock Technical', 'Feedback Report'],
      agenda: ['45-min live technical coding or core VLSI round', '15-min personalized feedback & resume score card']
    },
    {
      id: 'e-3',
      title: 'Semiconductor & Embedded Career Roadmap Workshop',
      speaker: 'Priya Dharshini',
      speakerRole: 'Hardware Engineer @ Qualcomm (Batch 2022)',
      date: 'Oct 25, 2026 • 5:00 PM IST',
      type: 'Domain Workshop',
      status: 'Registration Open',
      bannerColor: 'from-amber-600 to-orange-600',
      registrations: 210,
      tags: ['ECE / EEE', 'VLSI', 'Verilog', 'Core Jobs'],
      agenda: ['Breakdown of RTL & STA interviews', 'How to get off-campus core hardware internships']
    }
  ],

  alumni: [
    {
      id: 'a-1',
      name: 'Karthik Raja',
      batch: 'Batch of 2023',
      role: 'Software Development Engineer II',
      company: 'Amazon',
      branch: 'CSE',
      location: 'Bengaluru, India',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      skills: ['Data Structures', 'System Design', 'Java', 'AWS'],
      queriesAnswered: 48,
      rating: 4.9,
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'a-2',
      name: 'Priya Dharshini',
      batch: 'Batch of 2022',
      role: 'Hardware Design Engineer',
      company: 'Qualcomm',
      branch: 'ECE',
      location: 'Hyderabad, India',
      avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
      skills: ['Verilog HDL', 'VLSI', 'Digital Design', 'STA'],
      queriesAnswered: 35,
      rating: 5.0,
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'a-3',
      name: 'Vigneshwaran R.',
      batch: 'Batch of 2021',
      role: 'Senior Software Engineer',
      company: 'Freshworks',
      branch: 'IT',
      location: 'Chennai, India',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
      skills: ['React.js', 'Node.js', 'System Architecture', 'PostgreSQL'],
      queriesAnswered: 62,
      rating: 4.9,
      linkedin: 'https://linkedin.com'
    },
    {
      id: 'a-4',
      name: 'Anand Kumar',
      batch: 'Batch of 2020',
      role: 'Analog & Mixed Signal Engineer',
      company: 'Texas Instruments',
      branch: 'EEE',
      location: 'Bengaluru, India',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
      skills: ['Circuit Design', 'Microcontrollers', 'Embedded C', 'GATE ECE'],
      queriesAnswered: 29,
      rating: 4.8,
      linkedin: 'https://linkedin.com'
    }
  ]
};

// API Services reading/writing to Supabase with seamless local fallback
export const dbService = {
  // Fetch Career Pathways
  getPathways: async () => {
    try {
      const { data, error } = await supabase.from('career_pathways').select('*');
      if (error || !data || data.length === 0) {
        return INITIAL_SEED.pathways;
      }
      return data;
    } catch (e) {
      return INITIAL_SEED.pathways;
    }
  },

  // Fetch Resources
  getResources: async () => {
    try {
      const { data, error } = await supabase.from('resources').select('*');
      if (error || !data || data.length === 0) {
        return INITIAL_SEED.resources;
      }
      return data;
    } catch (e) {
      return INITIAL_SEED.resources;
    }
  },

  // Increment resource download count
  incrementDownload: async (resourceId) => {
    try {
      await supabase.rpc('increment_downloads', { resource_id: resourceId });
    } catch (e) {
      console.warn('Supabase update notification:', e);
    }
  },

  // Fetch Q&A Queries
  getStudentQueries: async () => {
    try {
      const { data, error } = await supabase.from('student_queries').select('*').order('created_at', { ascending: false });
      if (error || !data || data.length === 0) {
        return INITIAL_SEED.student_queries;
      }
      return data;
    } catch (e) {
      return INITIAL_SEED.student_queries;
    }
  },

  // Post New Student Question
  submitQuery: async (newQuery) => {
    const queryObj = {
      student_name: newQuery.name || 'MKCE Student',
      student_year: newQuery.year || '3rd Year CSE',
      question: newQuery.question,
      category: newQuery.category || 'Career Transition',
      likes_count: 0,
      status: 'Pending'
    };

    try {
      const { data, error } = await supabase.from('student_queries').insert([queryObj]).select();
      if (error || !data) throw error;
      return data[0];
    } catch (e) {
      // Return formatted local fallback object if table is missing
      return {
        id: Date.now(),
        studentName: queryObj.student_name,
        studentYear: queryObj.student_year,
        question: queryObj.question,
        category: queryObj.category,
        likes: 0,
        status: 'Pending',
        date: 'Just now',
        answer: null
      };
    }
  },

  // Upvote Question
  upvoteQuery: async (id) => {
    try {
      await supabase.from('student_queries').update({ likes_count: supabase.raw('likes_count + 1') }).eq('id', id);
    } catch (e) {
      // Local handle
    }
  },

  // Fetch Events / Notice Board
  getEvents: async () => {
    try {
      const { data, error } = await supabase.from('events').select('*');
      if (error || !data || data.length === 0) {
        return INITIAL_SEED.events;
      }
      return data;
    } catch (e) {
      return INITIAL_SEED.events;
    }
  },

  // Register for Event
  registerEvent: async (eventId, studentName, studentEmail) => {
    try {
      await supabase.from('event_registrations').insert([{ event_id: eventId, student_name: studentName, student_email: studentEmail }]);
    } catch (e) {
      console.warn('Event registration logged.');
    }
  },

  // Fetch Alumni Mentors Directory
  getAlumniMentors: async () => {
    try {
      const { data, error } = await supabase.from('profiles').select('*').eq('role', 'alumni');
      if (error || !data || data.length === 0) {
        return INITIAL_SEED.alumni;
      }
      return data;
    } catch (e) {
      return INITIAL_SEED.alumni;
    }
  },

  // Submit Mentorship 1-on-1 Request
  submitMentorshipRequest: async (mentorId, studentInfo, goal) => {
    try {
      await supabase.from('mentorship_requests').insert([{ alumni_id: mentorId, department_info: studentInfo, goal_statement: goal }]);
    } catch (e) {
      console.warn('Mentorship request logged.');
    }
  }
};
