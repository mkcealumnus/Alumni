import { useState, useEffect } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import Loader from '@/components/ui/Loader';
import { studentApi } from '../../utils/api';


// Comprehensive, rich built-in learning materials for all courses
const COMPREHENSIVE_MATERIALS = [
  // ── Web Development ──
  {
    id: 'web-1',
    title: 'HTML5 Semantics & Modern CSS3 Layouts',
    courseName: 'Web Development',
    type: 'document',
    readTime: '15 min read',
    description: 'Master HTML5 semantic tags, CSS Box Model, Flexbox, CSS Grid, and Mobile-First Responsive Design.',
    url: 'https://developer.mozilla.org/en-US/docs/Learn/HTML',
    sections: [
      {
        title: '1. Semantic HTML5 Elements',
        content: `Semantic HTML elements clearly describe their meaning to both the browser and the developer. Using semantic tags improves accessibility (a11y) and SEO.

Key Semantic Tags:
- <header>: Header section for a document or article
- <nav>: Navigation links block
- <main>: Primary content unique to the document
- <article>: Self-contained independent content (blog post, news item)
- <section>: Thematic grouping of content
- <aside>: Indirectly related sidebar content
- <footer>: Footer section containing metadata or copyright information`
      },
      {
        title: '2. CSS Flexbox Layout',
        content: `Flexbox is designed for 1D layout (rows OR columns).

Key Container Properties:
- display: flex;
- flex-direction: row | column;
- justify-content: flex-start | center | space-between | space-around;
- align-items: flex-start | center | stretch | baseline;
- flex-wrap: nowrap | wrap;`,
        code: `/* Flexbox Centering Example */
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}`
      },
      {
        title: '3. CSS Grid Layout',
        content: `CSS Grid is a 2D layout system for rows AND columns simultaneously.`,
        code: `/* Responsive Grid without Media Queries */
.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
}`
      }
    ],
    quiz: [
      { q: 'Which tag should be used for main navigation links?', options: ['<menu>', '<nav>', '<links>', '<header>'], answer: 1 },
      { q: 'What property creates a responsive grid automatically?', options: ['grid-auto-flow', 'repeat(auto-fit, minmax(...))', 'flex-wrap: wrap', 'display: inline-grid'], answer: 1 }
    ]
  },
  {
    id: 'web-2',
    title: 'JavaScript ES6+ Deep Dive & Asynchronous Programming',
    courseName: 'Web Development',
    type: 'notes',
    readTime: '20 min read',
    description: 'Arrow functions, destructuring, spread/rest operators, Promises, Async/Await, and Event Loop.',
    url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide',
    sections: [
      {
        title: '1. ES6 Syntax Features',
        content: `Modern JavaScript introduced syntax that makes code cleaner and safer.

- let & const: Block-scoped variable declarations replacing var.
- Arrow Functions: Concise syntax with lexical 'this' binding.
- Destructuring: Unpacking values from arrays or properties from objects.
- Template Literals: String interpolation using backticks.`,
        code: `// Array Destructuring & Spread
const numbers = [1, 2, 3, 4, 5];
const [first, second, ...rest] = numbers;
console.log(first); // 1
console.log(rest);  // [3, 4, 5]

// Object Destructuring with Default Values
const user = { name: 'Jay', role: 'Student' };
const { name, role, status = 'Active' } = user;`
      },
      {
        title: '2. Promises & Async/Await',
        content: `Asynchronous operations allow non-blocking I/O in single-threaded JavaScript via the Event Loop.`,
        code: `// Fetching data with async/await
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    if (!response.ok) throw new Error('User not found');
    const data = await response.json();
    return data;
  } catch (err) {
    console.error('Fetch error:', err.message);
  }
}`
      }
    ],
    quiz: [
      { q: 'What is the scope of variables declared with `let`?', options: ['Global', 'Function scope', 'Block scope', 'Module scope'], answer: 2 },
      { q: 'Which keyword pauses execution inside an async function until a Promise settles?', options: ['yield', 'await', 'pause', 'defer'], answer: 1 }
    ]
  },
  {
    id: 'web-3',
    title: 'React.js Component Architecture & State Management',
    courseName: 'Web Development',
    type: 'cheat-sheet',
    readTime: '18 min read',
    description: 'Functional Components, Hooks (useState, useEffect, useMemo), Context API, and Performance Optimization.',
    url: 'https://react.dev/learn',
    sections: [
      {
        title: '1. React Core Hooks Reference',
        content: `Hooks allow functional components to manage state, side-effects, and refs.

- useState: Local component state
- useEffect: Side-effects (API calls, subscriptions, DOM mutations)
- useRef: Mutable ref object that persists across renders without triggering re-render
- useMemo / useCallback: Performance memoization`,
        code: `import { useState, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = \`Count: \${count}\`;
  }, [count]);

  return (
    <button onClick={() => setCount(c => c + 1)}>
      Clicked {count} times
    </button>
  );
}`
      }
    ],
    quiz: [
      { q: 'When does `useEffect` with an empty dependency array `[]` run?', options: ['On every render', 'Only once when mounted', 'Never', 'On state update'], answer: 1 }
    ]
  },

  // ── Data Structures & Algorithms ──
  {
    id: 'dsa-1',
    title: 'Arrays, Linked Lists & Pointer Techniques',
    courseName: 'Data Structures & Algorithms',
    type: 'pdf',
    readTime: '25 min read',
    description: 'Contiguous vs Dynamic Memory, Singly/Doubly Linked Lists, Two Pointers, and Sliding Window techniques.',
    url: 'https://www.geeksforgeeks.org/data-structures/',
    sections: [
      {
        title: '1. Array vs Linked List Complexity',
        content: `Comparison of core operations:

Operation          | Array (Static) | Dynamic Array | Singly Linked List
-------------------|----------------|---------------|-------------------
Access by Index    | O(1)           | O(1)          | O(n)
Search Element     | O(n)           | O(n)          | O(n)
Insert at Start    | O(n)           | O(n)          | O(1)
Insert at End      | O(1)*          | O(1) amortized| O(n) [O(1) with tail]
Delete at Start    | O(n)           | O(n)          | O(1)`
      },
      {
        title: '2. Reverse Singly Linked List (Python)',
        code: `class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next

def reverseList(head: ListNode) -> ListNode:
    prev = None
    curr = head
    while curr:
        nxt = curr.next
        curr.next = prev
        prev = curr
        curr = nxt
    return prev`
      }
    ],
    quiz: [
      { q: 'What is the time complexity of prepending an element to a Singly Linked List?', options: ['O(n)', 'O(1)', 'O(log n)', 'O(n^2)'], answer: 1 }
    ]
  },
  {
    id: 'dsa-2',
    title: 'Mastering Sorting & Searching Algorithms',
    courseName: 'Data Structures & Algorithms',
    type: 'document',
    readTime: '22 min read',
    description: 'Binary Search, QuickSort, MergeSort, HeapSort, and Divide-and-Conquer strategy.',
    url: 'https://visualgo.net/en/sorting',
    sections: [
      {
        title: '1. Binary Search Algorithm',
        content: `Binary Search works on SORTED arrays by repeatedly dividing the search interval in half. Time Complexity: O(log n). Space Complexity: O(1) iterative.`,
        code: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1`
      },
      {
        title: '2. QuickSort Algorithm',
        content: `QuickSort selects a 'pivot' element and partitions the array into sub-arrays of smaller and larger elements. Average: O(n log n), Worst case: O(n^2).`
      }
    ],
    quiz: [
      { q: 'What is the worst-case time complexity of QuickSort?', options: ['O(n log n)', 'O(n)', 'O(n^2)', 'O(1)'], answer: 2 }
    ]
  },

  // ── Python Programming ──
  {
    id: 'py-1',
    title: 'Python 3 Complete Fundamentals & Data Structures',
    courseName: 'Python Programming',
    type: 'document',
    readTime: '18 min read',
    description: 'Lists, Tuples, Dictionaries, Sets, Comprehensions, Decorators, and File I/O.',
    url: 'https://docs.python.org/3/tutorial/',
    sections: [
      {
        title: '1. Python Data Collections',
        content: `- List: Mutable, ordered, allows duplicates -> [1, 2, 3]
- Tuple: Immutable, ordered, allows duplicates -> (1, 2, 3)
- Set: Mutable, unordered, NO duplicates -> {1, 2, 3}
- Dictionary: Key-Value pairs, ordered (3.7+), unique keys -> {'a': 1}`
      },
      {
        title: '2. List & Dict Comprehensions',
        code: `# Filter even squares
numbers = range(10)
even_squares = [x**2 for x in numbers if x % 2 == 0]
print(even_squares) # [0, 4, 16, 36, 64]

# Character count dictionary
word = 'sowberry'
char_count = {char: word.count(char) for char in set(word)}`
      }
    ],
    quiz: [
      { q: 'Which Python data structure is immutable?', options: ['List', 'Set', 'Tuple', 'Dictionary'], answer: 2 }
    ]
  },

  // ── Database Management Systems ──
  {
    id: 'db-1',
    title: 'SQL Masterclass — Queries, Joins & Indexing',
    courseName: 'Database Management',
    type: 'cheat-sheet',
    readTime: '20 min read',
    description: 'SELECT queries, GROUP BY, Aggregations, INNER/LEFT/RIGHT JOINs, Indexing, and Normalization.',
    url: 'https://www.w3schools.com/sql/',
    sections: [
      {
        title: '1. SQL JOIN Types Visualized',
        content: `- INNER JOIN: Returns records that have matching values in both tables
- LEFT JOIN: Returns all records from left table, and matched records from right
- RIGHT JOIN: Returns all records from right table, and matched records from left
- FULL OUTER JOIN: Returns all records when there is a match in left or right`
      },
      {
        title: '2. Complex SQL Query Example',
        code: `-- Top 5 students by average grade with course enrollment count
SELECT 
  u.id, 
  u.fullName, 
  COUNT(DISTINCT ce.courseId) as totalCourses,
  ROUND(AVG(g.percentage), 2) as avgGrade
FROM users u
JOIN courseEnrollments ce ON u.id = ce.studentId
JOIN grades g ON u.id = g.studentId
WHERE u.role = 'student'
GROUP BY u.id, u.fullName
HAVING AVG(g.percentage) >= 75
ORDER BY avgGrade DESC
LIMIT 5;`
      }
    ],
    quiz: [
      { q: 'Which SQL clause filters groups produced by GROUP BY?', options: ['WHERE', 'ORDER BY', 'HAVING', 'FILTER'], answer: 2 }
    ]
  },

  // ── Machine Learning & AI ──
  {
    id: 'ml-1',
    title: 'Machine Learning Workflow & Scikit-Learn',
    courseName: 'Machine Learning',
    type: 'document',
    readTime: '22 min read',
    description: 'Supervised vs Unsupervised Learning, Feature Engineering, Model Training, Evaluation Metrics, and Cross-Validation.',
    url: 'https://scikit-learn.org/stable/tutorial/',
    sections: [
      {
        title: '1. ML Pipeline Steps',
        content: `1. Problem Definition (Classification vs Regression vs Clustering)
2. Data Collection & Preprocessing (Handling missing values, Scaling)
3. Feature Selection & Engineering
4. Train/Test Split (e.g. 80/20 ratio)
5. Model Training (Fit estimator)
6. Model Evaluation (Accuracy, Precision, Recall, F1-Score, RMSE)`
      },
      {
        title: '2. Scikit-Learn Example',
        code: `from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import accuracy_score

# Split dataset
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train Random Forest Model
model = RandomForestClassifier(n_estimators=100)
model.fit(X_train, y_train)

# Evaluate
predictions = model.predict(X_test)
acc = accuracy_score(y_test, predictions)
print(f"Model Accuracy: {acc * 100:.2f}%")`
      }
    ],
    quiz: [
      { q: 'Which metric measures classification balance between Precision and Recall?', options: ['RMSE', 'R2 Score', 'F1-Score', 'Mean Absolute Error'], answer: 2 }
    ]
  },

  // ── Computer Networks ──
  {
    id: 'net-1',
    title: 'Computer Networks, TCP/IP Stack & HTTP/HTTPS Protocols',
    courseName: 'Computer Networks',
    type: 'notes',
    readTime: '16 min read',
    description: 'OSI 7-Layer model, TCP 3-Way Handshake, IPv4 Subnetting, DNS, and TLS Encryption.',
    url: 'https://www.cloudflare.com/learning/',
    sections: [
      {
        title: '1. OSI 7-Layer vs TCP/IP Model',
        content: `Layer 7: Application (HTTP, DNS, FTP, SSH)
Layer 6: Presentation (SSL/TLS, ASCII, Encryption)
Layer 5: Session (Sockets, SOCKS)
Layer 4: Transport (TCP, UDP - Port numbers)
Layer 3: Network (IP, ICMP, Routing - IP addresses)
Layer 2: Data Link (Ethernet, MAC addresses, Switches)
Layer 1: Physical (Cables, Fiber, Hubs, Signal Bits)`
      }
    ],
    quiz: [
      { q: 'Which OSI layer handles IP addressing and packet routing?', options: ['Transport Layer', 'Network Layer', 'Data Link Layer', 'Session Layer'], answer: 1 }
    ]
  },

  // ── Operating Systems ──
  {
    id: 'os-1',
    title: 'Operating Systems — Process Management & Paging',
    courseName: 'Operating Systems',
    type: 'pdf',
    readTime: '19 min read',
    description: 'Process Life Cycle, CPU Scheduling, Deadlocks, Virtual Memory, and Paging.',
    url: 'https://www.geeksforgeeks.org/operating-systems/',
    sections: [
      {
        title: '1. Process States',
        content: `New -> Ready -> Running -> Waiting/Blocked -> Terminated.

CPU Scheduling Algorithms:
- First-Come, First-Served (FCFS)
- Shortest Job First (SJF)
- Round Robin (RR) with time quantum
- Priority Scheduling`
      }
    ],
    quiz: [
      { q: 'What technique prevents Deadlocks by verifying safe states before allocation?', options: ['Peterson Algorithm', 'Banker Algorithm', 'LRU Algorithm', 'Round Robin'], answer: 1 }
    ]
  },

  // ── Software Engineering ──
  {
    id: 'se-1',
    title: 'Git & GitHub Professional Version Control Workflow',
    courseName: 'Software Engineering',
    type: 'cheat-sheet',
    readTime: '14 min read',
    description: 'Git Commands, Branching Strategies, Resolving Merge Conflicts, Rebasing, and Pull Requests.',
    url: 'https://docs.github.com/en/get-started',
    sections: [
      {
        title: '1. Essential Git Command Reference',
        code: `# Clone repository
git clone https://github.com/user/repo.git

# Create and switch to new branch
git checkout -b feature/new-login

# Stage and Commit
git add .
git commit -m "feat: implement responsive login page"

# Push branch to remote
git push -u origin feature/new-login`
      }
    ],
    quiz: [
      { q: 'Which command creates and immediately switches to a new branch?', options: ['git branch <name>', 'git checkout -b <name>', 'git switch create <name>', 'git new <name>'], answer: 1 }
    ]
  }
];

const StudyMaterial = () => {
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [selectedCourse, setSelectedCourse] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [viewingMaterial, setViewingMaterial] = useState(null);
  
  // Interactive Quiz state inside reader
  const [userAnswers, setUserAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const res = await studentApi.getStudyMaterials();
        const dbMaterials = res.success ? (res.data?.materials || res.materials || []) : [];
        const merged = [...dbMaterials, ...COMPREHENSIVE_MATERIALS.filter(b => !dbMaterials.some(d => d.title === b.title))];
        setMaterials(merged);
      } catch (e) {
        setMaterials(COMPREHENSIVE_MATERIALS);
      }
      setLoading(false);
    };
    fetchMaterials();
  }, []);

  const courses = ['all', 'Web Development', 'Data Structures & Algorithms', 'Python Programming', 'Database Management', 'Machine Learning', 'Computer Networks', 'Operating Systems', 'Software Engineering'];
  const types = ['all', 'document', 'notes', 'cheat-sheet', 'pdf', 'video', 'link'];

  const typeIcons = {
    pdf: 'ri-file-pdf-2-line',
    video: 'ri-video-line',
    document: 'ri-file-text-line',
    link: 'ri-link',
    presentation: 'ri-slideshow-line',
    notes: 'ri-sticky-note-line',
    'cheat-sheet': 'ri-code-box-line'
  };

  const typeColors = {
    pdf: 'bg-red-500/15 text-red-500',
    video: 'bg-blue-500/15 text-blue-500',
    document: 'bg-green-500/15 text-green-500',
    link: 'bg-indigo-500/15 text-indigo-500',
    presentation: 'bg-amber-500/15 text-amber-500',
    notes: 'bg-teal-500/15 text-teal-500',
    'cheat-sheet': 'bg-purple-500/15 text-purple-500'
  };

  const filtered = materials.filter(m => {
    const matchSearch = m.title?.toLowerCase().includes(search.toLowerCase()) || m.courseName?.toLowerCase().includes(search.toLowerCase()) || m.description?.toLowerCase().includes(search.toLowerCase());
    const matchCourse = selectedCourse === 'all' || m.courseName === selectedCourse;
    const matchType = filterType === 'all' || (m.type || 'document') === filterType;
    return matchSearch && matchCourse && matchType;
  });

  const openMaterial = (m) => {
    setViewingMaterial(m);
    setUserAnswers({});
    setQuizSubmitted(false);
    setScore(0);
  };

  const handleOptionSelect = (qIdx, optIdx) => {
    if (quizSubmitted) return;
    setUserAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleQuizSubmit = () => {
    if (!viewingMaterial?.quiz) return;
    let s = 0;
    viewingMaterial.quiz.forEach((q, idx) => {
      if (userAnswers[idx] === q.answer) s++;
    });
    setScore(s);
    setQuizSubmitted(true);
  };

  return (
    <DashboardLayout pageTitle="Study Material" role="student">
      <div className="space-y-6">
        {/* Reader View */}
        {viewingMaterial ? (
          <div className="space-y-5 animate-fade-in">
            {/* Reader Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white dark-theme:bg-gray-900 p-5 rounded-2xl border border-sand dark-theme:border-gray-800 shadow-sm">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setViewingMaterial(null)}
                  className="px-3 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 text-gray-700 dark-theme:text-gray-200 text-xs font-semibold hover:border-primary transition-colors flex items-center gap-1.5"
                >
                  <i className="ri-arrow-left-line"></i> Back to Materials
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-primary/10 text-primary">
                      {viewingMaterial.courseName}
                    </span>
                    {viewingMaterial.readTime && (
                      <span className="text-[11px] text-gray-400 dark-theme:text-gray-500">
                        <i className="ri-time-line mr-0.5"></i>{viewingMaterial.readTime}
                      </span>
                    )}
                  </div>
                  <h2 className="text-xl font-bold text-gray-800 dark-theme:text-gray-100 mt-1">
                    {viewingMaterial.title}
                  </h2>
                </div>
              </div>
              {viewingMaterial.url && (
                <a
                  href={viewingMaterial.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark transition-colors flex items-center gap-1.5 flex-shrink-0"
                >
                  <i className="ri-external-link-line"></i> External Reference
                </a>
              )}
            </div>

            {/* Reader Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
              {/* Main Reading Section */}
              <div className="lg:col-span-3 space-y-5">
                <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 space-y-6">
                  <p className="text-sm text-gray-600 dark-theme:text-gray-300 leading-relaxed font-medium bg-cream dark-theme:bg-gray-800/60 p-4 rounded-xl border border-sand dark-theme:border-gray-700/50">
                    <i className="ri-information-line text-primary mr-1"></i>
                    {viewingMaterial.description}
                  </p>

                  {/* Built-in Sections */}
                  {viewingMaterial.sections ? (
                    viewingMaterial.sections.map((sec, idx) => (
                      <div key={idx} className="space-y-3 pt-3 border-t border-sand dark-theme:border-gray-800 first:border-none first:pt-0">
                        <h3 className="text-base font-bold text-gray-800 dark-theme:text-gray-100 flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-primary/10 text-primary text-xs flex items-center justify-center font-bold">
                            {idx + 1}
                          </span>
                          {sec.title}
                        </h3>
                        {sec.content && (
                          <p className="text-xs text-gray-600 dark-theme:text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                            {sec.content}
                          </p>
                        )}
                        {sec.code && (
                          <div className="relative rounded-xl overflow-hidden bg-gray-950 border border-gray-800">
                            <div className="px-4 py-1.5 bg-gray-900 text-[11px] font-mono text-gray-400 border-b border-gray-800 flex justify-between items-center">
                              <span>Code Snippet</span>
                              <button
                                onClick={() => navigator.clipboard.writeText(sec.code)}
                                className="text-[10px] text-blue-400 hover:underline flex items-center gap-1"
                              >
                                <i className="ri-file-copy-line"></i> Copy
                              </button>
                            </div>
                            <pre className="p-4 text-xs font-mono text-green-400 overflow-x-auto whitespace-pre">
                              {sec.code}
                            </pre>
                          </div>
                        )}
                      </div>
                    ))
                  ) : viewingMaterial.url ? (
                    <div className="h-[600px] rounded-xl overflow-hidden border border-sand dark-theme:border-gray-800">
                      <iframe
                        src={viewingMaterial.url}
                        title={viewingMaterial.title}
                        className="w-full h-full border-0"
                      />
                    </div>
                  ) : null}
                </div>

                {/* Self-Assessment Quiz Section */}
                {viewingMaterial.quiz && viewingMaterial.quiz.length > 0 && (
                  <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-6 border border-sand dark-theme:border-gray-800 space-y-5">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-bold text-gray-800 dark-theme:text-gray-100 flex items-center gap-2">
                        <i className="ri-questionnaire-line text-primary"></i>
                        Knowledge Check & Quiz
                      </h3>
                      {quizSubmitted && (
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/10 text-green-500">
                          Score: {score} / {viewingMaterial.quiz.length}
                        </span>
                      )}
                    </div>

                    <div className="space-y-4">
                      {viewingMaterial.quiz.map((q, qIdx) => (
                        <div key={qIdx} className="bg-cream dark-theme:bg-gray-800/50 p-4 rounded-xl border border-sand dark-theme:border-gray-700/50 space-y-3">
                          <p className="text-xs font-semibold text-gray-800 dark-theme:text-gray-200">
                            {qIdx + 1}. {q.q}
                          </p>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            {q.options.map((opt, optIdx) => {
                              const isSelected = userAnswers[qIdx] === optIdx;
                              const isCorrect = q.answer === optIdx;
                              let btnStyle = 'bg-white dark-theme:bg-gray-900 border-sand dark-theme:border-gray-700 text-gray-700 dark-theme:text-gray-300';
                              
                              if (isSelected) {
                                btnStyle = 'bg-primary text-white border-primary';
                              }
                              if (quizSubmitted) {
                                if (isCorrect) btnStyle = 'bg-green-500 text-white border-green-500';
                                else if (isSelected && !isCorrect) btnStyle = 'bg-red-500 text-white border-red-500';
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => handleOptionSelect(qIdx, optIdx)}
                                  className={`p-2.5 rounded-lg border text-xs text-left transition-all font-medium ${btnStyle}`}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>

                    {!quizSubmitted ? (
                      <button
                        onClick={handleQuizSubmit}
                        disabled={Object.keys(userAnswers).length < viewingMaterial.quiz.length}
                        className="px-5 py-2.5 rounded-xl bg-primary text-white text-xs font-semibold hover:bg-primary-dark disabled:opacity-50 transition-colors"
                      >
                        Submit Quiz
                      </button>
                    ) : (
                      <button
                        onClick={() => { setQuizSubmitted(false); setUserAnswers({}); }}
                        className="px-4 py-2 rounded-xl bg-cream dark-theme:bg-gray-800 text-xs font-semibold text-gray-700 dark-theme:text-gray-200 border border-sand dark-theme:border-gray-700 hover:border-primary transition-colors"
                      >
                        Retake Quiz
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Sidebar Info & Table of Contents */}
              <div className="lg:col-span-1 space-y-4">
                <div className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 space-y-4 sticky top-4">
                  <h4 className="font-bold text-gray-800 dark-theme:text-gray-100 text-xs uppercase tracking-wider">
                    Material Overview
                  </h4>
                  <div className="space-y-2.5 text-xs text-gray-600 dark-theme:text-gray-400">
                    <div className="flex justify-between items-center py-1 border-b border-sand dark-theme:border-gray-800">
                      <span>Course:</span>
                      <span className="font-semibold text-gray-800 dark-theme:text-gray-200">{viewingMaterial.courseName}</span>
                    </div>
                    <div className="flex justify-between items-center py-1 border-b border-sand dark-theme:border-gray-800">
                      <span>Type:</span>
                      <span className="font-semibold capitalize text-primary">{viewingMaterial.type || 'Document'}</span>
                    </div>
                    {viewingMaterial.readTime && (
                      <div className="flex justify-between items-center py-1 border-b border-sand dark-theme:border-gray-800">
                        <span>Read Time:</span>
                        <span className="font-semibold text-gray-800 dark-theme:text-gray-200">{viewingMaterial.readTime}</span>
                      </div>
                    )}
                  </div>

                  {viewingMaterial.sections && (
                    <div className="pt-2">
                      <h5 className="font-semibold text-gray-700 dark-theme:text-gray-300 text-xs mb-2">
                        Chapters & Topics
                      </h5>
                      <ul className="space-y-1.5 text-xs">
                        {viewingMaterial.sections.map((s, idx) => (
                          <li key={idx} className="text-gray-500 dark-theme:text-gray-400 hover:text-primary transition-colors flex items-center gap-1.5">
                            <i className="ri-checkbox-blank-circle-fill text-[6px] text-primary"></i>
                            {s.title}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Materials Grid View */
          <>
            {/* Top Bar Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold text-gray-800 dark-theme:text-gray-100">Study Materials</h1>
                <p className="text-sm text-gray-500 mt-1">{filtered.length} comprehensive resources available across courses</p>
              </div>
              <div className="relative w-full sm:w-72">
                <i className="ri-search-line absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                <input
                  type="text"
                  placeholder="Search topics, courses..."
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-cream dark-theme:bg-gray-800 border border-sand dark-theme:border-gray-700 focus:border-primary outline-none text-xs text-gray-800 dark-theme:text-gray-100"
                />
              </div>
            </div>

            {/* Course Category Selector */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {courses.map(c => (
                <button
                  key={c}
                  onClick={() => setSelectedCourse(c)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                    selectedCourse === c
                      ? 'bg-primary text-white shadow-sm'
                      : 'bg-cream dark-theme:bg-gray-800 text-gray-600 dark-theme:text-gray-400 border border-sand dark-theme:border-gray-700 hover:border-primary'
                  }`}
                >
                  {c === 'all' ? 'All Courses' : c}
                </button>
              ))}
            </div>

            {/* Type Filter Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {types.map(t => (
                <button
                  key={t}
                  onClick={() => setFilterType(t)}
                  className={`px-3 py-1 rounded-lg text-[11px] font-medium transition-colors capitalize ${
                    filterType === t
                      ? 'bg-gray-800 dark-theme:bg-gray-100 text-white dark-theme:text-gray-900'
                      : 'text-gray-500 hover:text-gray-800 dark-theme:text-gray-400'
                  }`}
                >
                  {t === 'all' ? 'All Formats' : t}
                </button>
              ))}
            </div>

            {/* Material Cards Grid */}
            {loading ? (
              <Loader text="Loading study materials..." />
            ) : filtered.length === 0 ? (

              <div className="text-center py-20 text-gray-400 dark-theme:text-gray-500">
                <i className="ri-file-text-line text-4xl mb-3 block"></i>
                <p>{search ? 'No materials match your search.' : 'No materials available in this category.'}</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filtered.map((m, i) => {
                  const mType = m.type || 'document';
                  return (
                    <div
                      key={m.id || i}
                      onClick={() => openMaterial(m)}
                      className="bg-white dark-theme:bg-gray-900 rounded-2xl p-5 border border-sand dark-theme:border-gray-800 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all cursor-pointer group flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-start justify-between gap-3 mb-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${typeColors[mType] || typeColors.document}`}>
                            <i className={`${typeIcons[mType] || typeIcons.document} text-lg`}></i>
                          </div>
                          <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-semibold ${typeColors[mType] || typeColors.document}`}>
                            {mType}
                          </span>
                        </div>

                        <h3 className="font-bold text-gray-800 dark-theme:text-gray-100 text-sm mb-1 group-hover:text-primary transition-colors line-clamp-1">
                          {m.title}
                        </h3>
                        <p className="text-[11px] font-semibold text-primary/80 mb-2">
                          {m.courseName || 'General'}
                        </p>
                        {m.description && (
                          <p className="text-xs text-gray-500 dark-theme:text-gray-400 line-clamp-2 leading-relaxed mb-4">
                            {m.description}
                          </p>
                        )}
                      </div>

                      <div className="flex items-center justify-between pt-3 border-t border-sand dark-theme:border-gray-800 text-xs">
                        <span className="text-gray-400 text-[11px]">
                          <i className="ri-book-read-line mr-1"></i>
                          {m.readTime || 'Structured Guide'}
                        </span>
                        <span className="text-primary font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                          Read <i className="ri-arrow-right-line"></i>
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
};

export default StudyMaterial;
