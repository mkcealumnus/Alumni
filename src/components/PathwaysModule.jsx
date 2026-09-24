import React, { useState, useEffect } from 'react';
import { dbService } from '../lib/supabase';
import { Code, Brain, Cpu, CheckCircle2, Circle, ChevronDown, ChevronUp, Layers, Sparkles, Trophy, Plus, Loader2 } from 'lucide-react';

const DEFAULT_PATHWAYS = [
  {
    id: 'software-engineering',
    title: 'Software Engineering & SDE',
    branch: 'CSE / IT / ECE',
    icon: 'Code',
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
    branch: 'AI & DS / CSE / IT',
    icon: 'Brain',
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
    branch: 'ECE / EEE',
    icon: 'Cpu',
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
];

const iconMap = { Code, Brain, Cpu };

export default function PathwaysModule() {
  const [pathways, setPathways] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPathwayId, setSelectedPathwayId] = useState('');
  const [completedTopics, setCompletedTopics] = useState({});
  const [expandedMilestones, setExpandedMilestones] = useState({ '1st Year': true, '2nd Year': true, '3rd Year': true, '4th Year': true });

  useEffect(() => {
    async function loadPathways() {
      setLoading(true);
      const data = await dbService.getPathways();
      if (data && data.length > 0) {
        setPathways(data);
        setSelectedPathwayId(data[0].id);
      } else {
        setPathways(DEFAULT_PATHWAYS);
        setSelectedPathwayId(DEFAULT_PATHWAYS[0].id);
      }
      setLoading(false);
    }
    loadPathways();
  }, []);

  const activePathway = pathways.find(p => p.id === selectedPathwayId) || pathways[0] || DEFAULT_PATHWAYS[0];

  const totalTopicsCount = (activePathway.milestones || []).reduce((acc, m) => acc + (m.topics ? m.topics.length : 0), 0);
  const completedCount = (activePathway.milestones || []).reduce((acc, m) => {
    return acc + (m.topics || []).filter(t => completedTopics[`${activePathway.id}-${t.name}`]).length;
  }, 0);
  const progressPercent = totalTopicsCount > 0 ? Math.round((completedCount / totalTopicsCount) * 100) : 0;

  const toggleTopic = (topicName) => {
    const key = `${activePathway.id}-${topicName}`;
    setCompletedTopics(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleMilestone = (year) => {
    setExpandedMilestones(prev => ({ ...prev, [year]: !prev[year] }));
  };

  return (
    <section id="pathways" className="py-20 bg-slate-50 relative border-t border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200 text-xs font-semibold">
            <Layers className="w-3.5 h-3.5" /> Supabase Connected Domain Roadmaps
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900">
            From <span className="gradient-text">1st Year Beginner</span> to High-Paying Placement
          </h2>
          <p className="text-slate-600 text-sm sm:text-base">
            Track your year-by-year technical milestone progress live in your Supabase database.
          </p>
        </div>

        {loading ? (
          <div className="py-12 flex flex-col items-center justify-center gap-3 text-slate-500 text-xs font-semibold">
            <Loader2 className="w-6 h-6 animate-spin text-indigo-600" />
            <span>Loading career pathways from Supabase database...</span>
          </div>
        ) : (
          <>
            {/* Branch / Pathway Selector Tabs */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
              {pathways.map((path) => {
                const Icon = iconMap[path.icon] || Code;
                const isSelected = path.id === selectedPathwayId;
                return (
                  <button
                    key={path.id}
                    onClick={() => setSelectedPathwayId(path.id)}
                    className={`flex items-center gap-3 px-6 py-3.5 rounded-xl font-semibold text-sm transition-all duration-300 ${
                      isSelected
                        ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-500/20 scale-105'
                        : 'bg-white border border-slate-200 text-slate-700 hover:text-indigo-600 hover:border-indigo-300 shadow-sm'
                    }`}
                  >
                    <div className={`p-2 rounded-lg ${isSelected ? 'bg-white/20' : 'bg-slate-100'}`}>
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-white' : 'text-indigo-600'}`} />
                    </div>
                    <div className="text-left">
                      <div>{path.title}</div>
                      <div className={`text-[10px] ${isSelected ? 'text-indigo-100' : 'text-slate-500'}`}>{path.branch || (path.target_branches ? path.target_branches.join(' / ') : '')}</div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Pathway Details Header & Interactive Progress Bar */}
            <div className="glass-card p-6 sm:p-8 rounded-2xl border border-indigo-200 mb-8 bg-gradient-to-r from-indigo-50/70 via-white to-purple-50/70 shadow-sm">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="space-y-2">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="px-2.5 py-0.5 rounded-md text-[11px] font-bold bg-indigo-600 text-white">
                      Target Roadmap
                    </span>
                    <span className="text-xs font-semibold text-slate-600">
                      Branches: {activePathway.branch || (activePathway.target_branches ? activePathway.target_branches.join(' / ') : 'Engineering')}
                    </span>
                    <span className="text-xs font-extrabold text-emerald-700 bg-emerald-100 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Avg Package: {activePathway.avg_package || activePathway.avgPackage || '8 - 25 LPA'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{activePathway.title}</h3>
                  <p className="text-slate-600 text-sm max-w-2xl">{activePathway.description}</p>
                  
                  {/* Target Roles */}
                  {(activePathway.target_roles || activePathway.targetRoles) && (
                    <div className="flex flex-wrap items-center gap-1.5 pt-1">
                      <span className="text-xs font-bold text-slate-500">Target Roles:</span>
                      {(activePathway.target_roles || activePathway.targetRoles).map((role, idx) => (
                        <span key={idx} className="text-[10px] px-2 py-0.5 rounded-md bg-white border border-slate-200 text-slate-700 font-semibold shadow-2xs">
                          {role}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Live Interactive Progress Card */}
                <div className="w-full lg:w-72 p-4 rounded-xl bg-white border border-indigo-100 shadow-sm space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <Trophy className="w-4 h-4 text-indigo-600" />
                      <span className="text-xs font-bold text-slate-900">Your Learning Progress</span>
                    </div>
                    <span className="text-xs font-black text-indigo-600">{progressPercent}%</span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-500 rounded-full"
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500">
                    <span>{completedCount} of {totalTopicsCount} skills completed</span>
                    {progressPercent === 100 && (
                      <span className="text-emerald-600 font-bold flex items-center gap-1">
                        <Sparkles className="w-3 h-3" /> Completed!
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline Grid (1st Year to 4th Year) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {(activePathway.milestones || []).map((milestone, idx) => {
                const isExpanded = expandedMilestones[milestone.year];
                return (
                  <div
                    key={idx}
                    className="glass-card p-6 rounded-2xl border-slate-200 bg-white flex flex-col justify-between shadow-sm"
                  >
                    <div>
                      {/* Year Tag & Toggle */}
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-extrabold px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                            {milestone.year}
                          </span>
                          <span className="text-xs font-bold text-slate-400">Phase {idx + 1}</span>
                        </div>

                        <button
                          onClick={() => toggleMilestone(milestone.year)}
                          className="p-1 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                        >
                          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                      </div>

                      {/* Title */}
                      <h4 className="text-lg font-bold text-slate-900 mb-1">
                        {milestone.title}
                      </h4>
                      <p className="text-xs text-slate-500 mb-4">{milestone.description}</p>

                      {/* Topics List with Interactive Checkboxes */}
                      {isExpanded && (
                        <div className="space-y-3 mb-4 animate-in fade-in duration-200">
                          {(milestone.topics || []).map((topic, i) => {
                            const isDone = completedTopics[`${activePathway.id}-${topic.name}`];
                            return (
                              <div
                                key={i}
                                onClick={() => toggleTopic(topic.name)}
                                className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex items-start gap-3 ${
                                  isDone
                                    ? 'bg-emerald-50/60 border-emerald-200 text-slate-800'
                                    : 'bg-slate-50/70 border-slate-200 text-slate-700 hover:bg-indigo-50/40 hover:border-indigo-200'
                                }`}
                              >
                                <button className="mt-0.5 shrink-0">
                                  {isDone ? (
                                    <CheckCircle2 className="w-4 h-4 text-emerald-600 fill-emerald-100" />
                                  ) : (
                                    <Circle className="w-4 h-4 text-slate-400 hover:text-indigo-600" />
                                  )}
                                </button>
                                <div className="flex-1">
                                  <span className={`font-semibold block ${isDone ? 'line-through text-slate-500' : 'text-slate-900'}`}>
                                    {topic.name}
                                  </span>
                                  <span className="text-[11px] text-slate-500 block mt-0.5">{topic.description}</span>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Card Footer */}
                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
                      <span>Pace: 2-3 hrs/day</span>
                      <span className="text-indigo-600 font-semibold">
                        {(milestone.topics || []).filter(t => completedTopics[`${activePathway.id}-${t.name}`]).length} / {(milestone.topics || []).length} Done
                      </span>
                    </div>

                  </div>
                );
              })}
            </div>
          </>
        )}

      </div>
    </section>
  );
}
