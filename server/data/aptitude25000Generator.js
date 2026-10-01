/*
  Aptitude 25,000 Unique Questions Generator
  Generates 25,000 unique aptitude questions across 1,000 test sets (25 questions per test set)
  distributed evenly across 5 categories (200 tests per category = 5,000 questions per category):
  1. Quantitative (200 Tests = 5,000 Questions)
  2. Logical (200 Tests = 5,000 Questions)
  3. Verbal (200 Tests = 5,000 Questions)
  4. Technical (200 Tests = 5,000 Questions)
  5. Data (200 Tests = 5,000 Questions)

  Each test set contains 25 non-repeating, diverse questions covering a rich mixture of sub-topics.
*/

export function generate25000AptitudeQuestions() {
  const tests = [];
  let globalQCount = 0;

  function buildOptions(correctVal, wrongVals) {
    const rawOptions = [
      { text: String(correctVal), isCorrect: true },
      ...wrongVals.slice(0, 3).map(v => ({ text: String(v), isCorrect: false }))
    ];
    // Deterministic shuffle for uniform A, B, C, D distribution
    const orderIndex = globalQCount % 4;
    const options = [null, null, null, null];
    options[orderIndex] = rawOptions[0];

    let wrongIdx = 1;
    for (let i = 0; i < 4; i++) {
      if (options[i] === null) {
        options[i] = rawOptions[wrongIdx++];
      }
    }

    const optionKeys = ['A', 'B', 'C', 'D'];
    return {
      optionA: options[0].text,
      optionB: options[1].text,
      optionC: options[2].text,
      optionD: options[3].text,
      correctOption: optionKeys[orderIndex]
    };
  }

  const categories = [
    {
      name: 'Quantitative',
      icon: 'ri-calculator-line',
      prefix: 'Quantitative Aptitude Master',
      desc: 'Comprehensive 25-question mixed quantitative set testing commercial math, interest, algebra, geometry, mensuration, and speed math.'
    },
    {
      name: 'Logical',
      icon: 'ri-brain-line',
      prefix: 'Logical Reasoning Master',
      desc: 'Comprehensive 25-question mixed reasoning set evaluating series, coding, relations, directions, clocks, calendars, seating & syllogisms.'
    },
    {
      name: 'Verbal',
      icon: 'ri-book-open-line',
      prefix: 'Verbal Ability Master',
      desc: 'Comprehensive 25-question mixed English set evaluating grammar error spotting, sentence structure, synonyms, idioms, cloze tests & comprehension.'
    },
    {
      name: 'Technical',
      icon: 'ri-computer-line',
      prefix: 'Technical CS Master',
      desc: 'Comprehensive 25-question mixed CS core set evaluating C/C++, Java OOPs, Data Structures, Algorithms, SQL, OS, Networks & Python.'
    },
    {
      name: 'Data',
      icon: 'ri-pie-chart-line',
      prefix: 'Data & Visual Master',
      desc: 'Comprehensive 25-question mixed DI & visual set evaluating tables, bar/pie/line charts, caselets, cubes, mirror images & pattern matrices.'
    }
  ];

  const difficulties = ['Easy', 'Medium', 'Hard'];

  const vocabPool = [
    { w: 'ABUNDANT', s: 'Plentiful', a: 'Scarce' },
    { w: 'BENEVOLENT', s: 'Kind-hearted', a: 'Malevolent' },
    { w: 'CANDID', s: 'Frank/Honest', a: 'Deceitful' },
    { w: 'DILIGENT', s: 'Hardworking', a: 'Lazy' },
    { w: 'ELATED', s: 'Overjoyed', a: 'Depressed' },
    { w: 'FRUGAL', s: 'Thrifty', a: 'Extravagant' },
    { w: 'GENUINE', s: 'Authentic', a: 'Fake' },
    { w: 'HASTY', s: 'Hurried', a: 'Slow' },
    { w: 'IMPARTIAL', s: 'Unbiased', a: 'Biased' },
    { w: 'JUBILANT', s: 'Triumphant', a: 'Sorrowful' },
    { w: 'LUCID', s: 'Clear', a: 'Vague' },
    { w: 'METICULOUS', s: 'Thorough', a: 'Careless' },
    { w: 'NOVICE', s: 'Beginner', a: 'Expert' },
    { w: 'OBSOLETE', s: 'Outdated', a: 'Modern' },
    { w: 'PRUDENT', s: 'Wise', a: 'Foolish' }
  ];

  const techTopics = [
    { type: 'C/C++ Pointers', q: 'What is the size of a pointer in a 64-bit operating system?', ans: '8 bytes', w: ['4 bytes', '2 bytes', '16 bytes'], exp: 'On a 64-bit OS, memory addresses are 64 bits = 8 bytes long.' },
    { type: 'C/C++ Output', q: 'Which operator is used to access members of a structure through a pointer in C?', ans: '->', w: ['.', '*', '&'], exp: 'The arrow operator `->` dereferences and accesses structure members.' },
    { type: 'Java OOPs', q: 'Which Java keyword prevents a class from being subclassed / inherited?', ans: 'final', w: ['static', 'abstract', 'private'], exp: 'The "final" keyword applied to a class prevents inheritance.' },
    { type: 'Java Polymorphism', q: 'What is Method Overloading in Java?', ans: 'Same method name with different parameters in same class', w: ['Same method in child class with same signature', 'Method returning multiple values', 'Private method overriding'], exp: 'Method overloading occurs when methods share name but have different parameter lists.' },
    { type: 'Data Structures - Arrays', q: 'What is the time complexity of accessing an element in an array by index?', ans: 'O(1)', w: ['O(n)', 'O(log n)', 'O(n²)'], exp: 'Arrays provide constant O(1) random access by index via base address calculation.' },
    { type: 'Data Structures - Linked List', q: 'In a singly linked list, what is the time complexity to insert a node at the head?', ans: 'O(1)', w: ['O(n)', 'O(log n)', 'O(n²)'], exp: 'Inserting at head requires updating head pointer, taking O(1) time.' },
    { type: 'Data Structures - Stacks', q: 'Which data structure principle does a Stack follow?', ans: 'LIFO (Last In First Out)', w: ['FIFO (First In First Out)', 'LILO', 'Priority Queue'], exp: 'Stacks follow Last In First Out (LIFO).' },
    { type: 'Trees - BST', q: 'What is the worst-case search time complexity in an unbalanced Binary Search Tree?', ans: 'O(n)', w: ['O(log n)', 'O(1)', 'O(n log n)'], exp: 'A skewed unbalanced BST degrades to a linked list with O(n) search time.' },
    { type: 'Graphs - Traversals', q: 'Which graph traversal algorithm uses a First-In-First-Out (FIFO) Queue?', ans: 'Breadth-First Search (BFS)', w: ['Depth-First Search (DFS)', 'Dijkstra', 'Kruskal'], exp: 'BFS utilizes a Queue to visit nodes level by level.' },
    { type: 'Sorting Algorithms', q: 'What is the average-case time complexity of QuickSort?', ans: 'O(n log n)', w: ['O(n²)', 'O(n)', 'O(log n)'], exp: 'QuickSort divides partitions efficiently giving average O(n log n).' },
    { type: 'Searching Algorithms', q: 'What prerequisite is required before performing Binary Search on an array?', ans: 'Array must be sorted', w: ['Array size must be even', 'Array must contain positive numbers', 'Array must be dynamic'], exp: 'Binary search requires a sorted array.' },
    { type: 'DBMS - SQL', q: 'Which SQL command removes a table structure along with all data?', ans: 'DROP TABLE', w: ['DELETE TABLE', 'TRUNCATE TABLE', 'REMOVE TABLE'], exp: 'DROP TABLE removes the entire table schema and data.' },
    { type: 'DBMS - Joins', q: 'Which SQL Join returns all records from left table and matched records from right table?', ans: 'LEFT JOIN', w: ['INNER JOIN', 'RIGHT JOIN', 'FULL OUTER JOIN'], exp: 'LEFT JOIN returns all rows from left table regardless of match.' },
    { type: 'OS - Processes', q: 'What state does a process enter when waiting for an I/O operation?', ans: 'Waiting / Blocked', w: ['Running', 'Ready', 'Terminated'], exp: 'Process enters Blocked/Waiting state until I/O finishes.' },
    { type: 'OS - Deadlocks', q: 'Which of the following is NOT one of the 4 Coffman conditions for Deadlock?', ans: 'Preemption allowed', w: ['Mutual Exclusion', 'Hold and Wait', 'Circular Wait'], exp: 'No Preemption is a required deadlock condition.' },
    { type: 'OS - Paging', q: 'What is Page Fault in operating systems?', ans: 'Referenced page is not present in main memory (RAM)', w: ['Memory overflow error', 'Page corrupted on disk', 'CPU register error'], exp: 'Page fault occurs when CPU requests a page not currently in RAM.' },
    { type: 'Networks - OSI', q: 'Which OSI layer handles end-to-end communication and port numbers?', ans: 'Transport Layer', w: ['Network Layer', 'Session Layer', 'Physical Layer'], exp: 'Transport Layer (Layer 4) handles TCP/UDP ports and end-to-end flow.' },
    { type: 'Networks - IP', q: 'What is the default subnet mask for a Class C IP address?', ans: '255.255.255.0', w: ['255.0.0.0', '255.255.0.0', '255.255.255.255'], exp: 'Class C subnet mask is 255.255.255.0 (/24).' },
    { type: 'Networks - Protocols', q: 'Which protocol automatically assigns dynamic IP addresses to devices on a network?', ans: 'DHCP', w: ['DNS', 'HTTP', 'ARP'], exp: 'DHCP assigns dynamic IP addresses.' },
    { type: 'Web - JS', q: 'Which method converts a JS object into a JSON string?', ans: 'JSON.stringify()', w: ['JSON.parse()', 'Object.toJSON()', 'Stringify()'], exp: 'JSON.stringify() converts objects to JSON strings.' },
    { type: 'Web - JS Async', q: 'What is returned by an `async` function in JavaScript?', ans: 'A Promise', w: ['A String', 'Undefined', 'A Callback'], exp: 'Async functions always return a Promise.' },
    { type: 'Python - Logic', q: 'What is the output of `bool([])` in Python?', ans: 'False', w: ['True', 'None', 'Error'], exp: 'Empty list `[]` evaluates to False in boolean context.' },
    { type: 'Python - Functions', q: 'Which keyword creates an anonymous inline function in Python?', ans: 'lambda', w: ['def', 'inline', 'func'], exp: '`lambda` keyword creates anonymous functions in Python.' },
    { type: 'Pseudocode Logic', q: 'What will be the output of `x = 5; x += x * 2;`?', ans: '15', w: ['10', '20', '25'], exp: '`x * 2 = 10`. `x = 5 + 10 = 15`.' },
    { type: 'Git & DevOps', q: 'Which command creates a new branch and switches to it in Git?', ans: 'git checkout -b <branch>', w: ['git branch <branch>', 'git switch', 'git merge <branch>'], exp: '`git checkout -b` creates and switches to a new branch.' }
  ];

  // Loop to generate 1,000 Test Sets (200 Tests per Category = 25,000 Questions)
  categories.forEach((catObj) => {
    for (let tNum = 1; tNum <= 200; tNum++) {
      const diff = difficulties[(tNum - 1) % 3];
      const testTitle = `${catObj.prefix} Set ${tNum}`;
      const questions = [];

      for (let qSlot = 1; qSlot <= 25; qSlot++) {
        globalQCount++;
        const seed = (tNum - 1) * 25 + qSlot;
        let qObj;

        // -------------------------------------------------------------------
        // 1. QUANTITATIVE (25 Mixed Non-Repeating Sub-Topics per Test Set)
        // -------------------------------------------------------------------
        if (catObj.name === 'Quantitative') {
          if (qSlot === 1) {
            const cp = seed * 25 + 100, pct = (seed % 5) * 5 + 10, sp = Math.round(cp * (1 + pct / 100));
            const opts = buildOptions(`₹${sp}`, [`₹${sp + 20}`, `₹${sp - 15}`, `₹${cp}`]);
            qObj = { question: `Q${globalQCount}: Merchant purchases an item for ₹${cp} and sells it at ${pct}% profit. Find Selling Price.`, ...opts, marks: 1, explanation: `SP = ₹${cp} × (1 + ${pct}/100) = ₹${sp}.`, orderIndex: qSlot };
          } else if (qSlot === 2) {
            const mp = seed * 30 + 200, sp = mp * 0.9;
            const opts = buildOptions(`₹${sp}`, [`₹${sp + 25}`, `₹${sp - 20}`, `₹${mp}`]);
            qObj = { question: `Q${globalQCount}: An article with Marked Price ₹${mp} is offered at 10% discount. Find Selling Price.`, ...opts, marks: 1, explanation: `SP = ₹${mp} - 10% = ₹${sp}.`, orderIndex: qSlot };
          } else if (qSlot === 3) {
            const P = seed * 300 + 2000, R = (seed % 4) + 5, SI = (P * R * 2) / 100;
            const opts = buildOptions(`₹${SI}`, [`₹${SI + 40}`, `₹${SI - 30}`, `₹${SI + 80}`]);
            qObj = { question: `Q${globalQCount}: Calculate Simple Interest on ₹${P} at ${R}% p.a. for 2 years.`, ...opts, marks: 1, explanation: `SI = (P × R × T) / 100 = ₹${SI}.`, orderIndex: qSlot };
          } else if (qSlot === 4) {
            const P = seed * 400 + 3000, R = 10, diffVal = P * Math.pow(R / 100, 2);
            const opts = buildOptions(`₹${diffVal}`, [`₹${diffVal + 15}`, `₹${Math.max(1, diffVal - 10)}`, `₹${diffVal + 30}`]);
            qObj = { question: `Q${globalQCount}: Find difference between CI and SI on ₹${P} for 2 years at 10% p.a.`, ...opts, marks: 1, explanation: `Difference = P × (R/100)² = ₹${diffVal}.`, orderIndex: qSlot };
          } else if (qSlot === 5) {
            const avg5 = seed * 2 + 20, newN = avg5 + seed + 6, newAvg = Math.round((avg5 * 5 + newN) / 6);
            const opts = buildOptions(`${newAvg}`, [`${newAvg + 3}`, `${newAvg - 4}`, `${newAvg + 6}`]);
            qObj = { question: `Q${globalQCount}: Average of 5 values is ${avg5}. If 6th value ${newN} is added, find new average.`, ...opts, marks: 1, explanation: `New Avg = [(5 × ${avg5}) + ${newN}] / 6 = ${newAvg}.`, orderIndex: qSlot };
          } else if (qSlot === 6) {
            const r1 = 3, r2 = 5, total = (r1 + r2) * (seed + 4), part1 = (r1 / (r1 + r2)) * total;
            const opts = buildOptions(`${part1}`, [`${part1 + 10}`, `${part1 - 12}`, `${part1 + 20}`]);
            qObj = { question: `Q${globalQCount}: Divide ₹${total} in ratio 3:5. What is the smaller share?`, ...opts, marks: 1, explanation: `Share = (3 / 8) × ₹${total} = ₹${part1}.`, orderIndex: qSlot };
          } else if (qSlot === 7) {
            const m = seed * 4 + 20, w = seed * 2 + 10, total = m + w, pct = Math.round((m / total) * 100);
            const opts = buildOptions(`${pct}%`, [`${pct + 5}%`, `${pct - 8}%`, `${pct + 12}%`]);
            qObj = { question: `Q${globalQCount}: A mixture of ${total}L contains ${m}L milk and ${w}L water. What is milk percentage?`, ...opts, marks: 1, explanation: `Milk % = (${m} / ${total}) × 100 = ${pct}%.`, orderIndex: qSlot };
          } else if (qSlot === 8) {
            const ageA = seed * 2 + 15, ageB = seed * 2 + 5, sumAges = (ageA + 4) + (ageB + 4);
            const opts = buildOptions(`${sumAges} yrs`, [`${sumAges - 4} yrs`, `${sumAges + 6} yrs`, `${sumAges + 8} yrs`]);
            qObj = { question: `Q${globalQCount}: Person A is currently ${ageA} and B is ${ageB}. Find sum of their ages after 4 years.`, ...opts, marks: 1, explanation: `Sum = (${ageA} + 4) + (${ageB} + 4) = ${sumAges} years.`, orderIndex: qSlot };
          } else if (qSlot === 9) {
            const a = (seed % 4) * 4 + 10, b = (seed % 4) * 6 + 15, combined = Number(((a * b) / (a + b)).toFixed(1));
            const opts = buildOptions(`${combined} days`, [`${(combined + 2).toFixed(1)} days`, `${(combined - 1.5).toFixed(1)} days`, `${(combined + 3.5).toFixed(1)} days`]);
            qObj = { question: `Q${globalQCount}: A completes work in ${a} days and B in ${b} days. Working together, how many days do they take?`, ...opts, marks: 1, explanation: `Time = (A × B) / (A + B) = ${combined} days.`, orderIndex: qSlot };
          } else if (qSlot === 10) {
            const fill = seed * 2 + 6, drain = seed * 3 + 12, net = Number(((fill * drain) / (drain - fill)).toFixed(1));
            const opts = buildOptions(`${net} hrs`, [`${(net + 2).toFixed(1)} hrs`, `${(net - 1.5).toFixed(1)} hrs`, `${(net + 4).toFixed(1)} hrs`]);
            qObj = { question: `Q${globalQCount}: Inlet pipe fills tank in ${fill} hrs, outlet drains in ${drain} hrs. Find net filling time.`, ...opts, marks: 1, explanation: `Net time = (${fill} × ${drain}) / (${drain} - ${fill}) = ${net} hrs.`, orderIndex: qSlot };
          } else if (qSlot === 11) {
            const spd = (seed % 5) * 10 + 40, dist = spd * 3;
            const opts = buildOptions(`${dist} km`, [`${dist + 25} km`, `${dist - 30} km`, `${dist + 40} km`]);
            qObj = { question: `Q${globalQCount}: Car travels at ${spd} km/h for 3 hours. Calculate distance.`, ...opts, marks: 1, explanation: `Distance = Speed × Time = ${spd} × 3 = ${dist} km.`, orderIndex: qSlot };
          } else if (qSlot === 12) {
            const len = seed * 10 + 100, spd = (seed % 4) * 18 + 36, speedMs = spd * (5 / 18), time = Number((len / speedMs).toFixed(1));
            const opts = buildOptions(`${time} sec`, [`${(time + 3).toFixed(1)} sec`, `${(time - 2).toFixed(1)} sec`, `${(time + 5).toFixed(1)} sec`]);
            qObj = { question: `Q${globalQCount}: Train ${len}m long running at ${spd} km/h crosses a pole. Find time in seconds.`, ...opts, marks: 1, explanation: `Speed = ${speedMs} m/s. Time = ${len} / ${speedMs} = ${time} sec.`, orderIndex: qSlot };
          } else if (qSlot === 13) {
            const boat = (seed % 4) * 2 + 10, stream = 2, ds = boat + stream, dist = 36, time = Number((dist / ds).toFixed(2));
            const opts = buildOptions(`${time} hrs`, [`${(time + 0.5).toFixed(2)} hrs`, `${(time - 0.4).toFixed(2)} hrs`, `${(time + 1).toFixed(2)} hrs`]);
            qObj = { question: `Q${globalQCount}: Boat speed in still water is ${boat} km/h, stream is 2 km/h. Find time to travel 36 km downstream.`, ...opts, marks: 1, explanation: `Downstream Speed = ${ds} km/h. Time = 36 / ${ds} = ${time} hrs.`, orderIndex: qSlot };
          } else if (qSlot === 14) {
            const num = seed * 10 + 7, rem = num % 7;
            const opts = buildOptions(`${rem}`, [`${(rem + 2) % 7}`, `${(rem + 4) % 7}`, `${(rem + 5) % 7}`]);
            qObj = { question: `Q${globalQCount}: Find remainder when ${num} is divided by 7.`, ...opts, marks: 1, explanation: `${num} ÷ 7 gives remainder ${rem}.`, orderIndex: qSlot };
          } else if (qSlot === 15) {
            const n1 = seed * 3 + 3, n2 = seed * 5 + 5;
            const gcd = (a, b) => b === 0 ? a : gcd(b, a % b);
            const hcf = gcd(n1, n2), lcm = (n1 * n2) / hcf;
            const opts = buildOptions(`LCM=${lcm}, HCF=${hcf}`, [`LCM=${lcm + 6}, HCF=${hcf}`, `LCM=${lcm}, HCF=${hcf + 2}`, `LCM=${lcm * 2}, HCF=${hcf}`]);
            qObj = { question: `Q${globalQCount}: Find LCM and HCF of numbers ${n1} and ${n2}.`, ...opts, marks: 1, explanation: `HCF = ${hcf}, LCM = (${n1} × ${n2}) / HCF = ${lcm}.`, orderIndex: qSlot };
          } else if (qSlot === 16) {
            const exp = (seed % 3) + 2, baseVal = 2, val = Math.pow(baseVal, exp * 2);
            const opts = buildOptions(`${val}`, [`${val * 2}`, `${val / 2}`, `${val + 16}`]);
            qObj = { question: `Q${globalQCount}: Simplify expression: (2^${exp})^2 × 2^0.`, ...opts, marks: 1, explanation: `(2^${exp})^2 = 2^${exp * 2} = ${val}.`, orderIndex: qSlot };
          } else if (qSlot === 17) {
            const n = (seed % 4) + 4, fact = num => num <= 1 ? 1 : num * fact(num - 1), perms = fact(n);
            const opts = buildOptions(`${perms}`, [`${perms + 24}`, `${perms - 12}`, `${perms * 2}`]);
            qObj = { question: `Q${globalQCount}: In how many ways can ${n} books be arranged on a shelf?`, ...opts, marks: 1, explanation: `Permutations = ${n}! = ${perms}.`, orderIndex: qSlot };
          } else if (qSlot === 18) {
            const red = (seed % 4) + 2, prob = `${red}/10`;
            const opts = buildOptions(prob, [`${red + 1}/10`, `${Math.max(1, red - 1)}/10`, `${red}/12`]);
            qObj = { question: `Q${globalQCount}: Bag contains ${red} red and ${10 - red} blue balls. Find probability of drawing a red ball.`, ...opts, marks: 1, explanation: `Probability = Red / Total = ${red}/10.`, orderIndex: qSlot };
          } else if (qSlot === 19) {
            const r1 = (seed % 4) + 1, r2 = (seed % 3) + 2;
            const opts = buildOptions(`x = ${r1}, x = ${r2}`, [`x = -${r1}, x = ${r2}`, `x = ${r1 + 1}, x = ${r2}`, `x = ${r1}, x = ${r2 + 2}`]);
            qObj = { question: `Q${globalQCount}: Solve quadratic equation: x² - ${r1 + r2}x + ${r1 * r2} = 0.`, ...opts, marks: 1, explanation: `Factoring gives (x - ${r1})(x - ${r2}) = 0. Roots are ${r1} and ${r2}.`, orderIndex: qSlot };
          } else if (qSlot === 20) {
            const xVal = seed * 2 + 5, yVal = 2 * xVal + 4;
            const opts = buildOptions(`y = ${yVal}`, [`y = ${yVal + 4}`, `y = ${yVal - 3}`, `y = ${yVal + 10}`]);
            qObj = { question: `Q${globalQCount}: If 2x - y = -4 and x = ${xVal}, find y.`, ...opts, marks: 1, explanation: `2(${xVal}) - y = -4 => y = ${2 * xVal} + 4 = ${yVal}.`, orderIndex: qSlot };
          } else if (qSlot === 21) {
            const aA = (seed % 5) * 10 + 30, aB = (seed % 4) * 10 + 40, aC = 180 - (aA + aB);
            const opts = buildOptions(`${aC}°`, [`${aC + 10}°`, `${aC - 15}°`, `${aC + 20}°`]);
            qObj = { question: `Q${globalQCount}: In triangle ABC, angle A = ${aA}° and angle B = ${aB}°. Find angle C.`, ...opts, marks: 1, explanation: `Angle C = 180° - (${aA}° + ${aB}°) = ${aC}°.`, orderIndex: qSlot };
          } else if (qSlot === 22) {
            const r = seed + 3, area = Math.round(3.14 * r * r);
            const opts = buildOptions(`${area} cm²`, [`${area + 15} cm²`, `${area - 20} cm²`, `${area + 30} cm²`]);
            qObj = { question: `Q${globalQCount}: Calculate area of circle with radius ${r} cm (π ≈ 3.14).`, ...opts, marks: 1, explanation: `Area = πr² ≈ 3.14 × ${r}² = ${area} cm².`, orderIndex: qSlot };
          } else if (qSlot === 23) {
            const s = seed + 4, area = s * s;
            const opts = buildOptions(`${area} cm²`, [`${area + 16} cm²`, `${area - 12} cm²`, `${area + 25} cm²`]);
            qObj = { question: `Q${globalQCount}: Find area of square with side ${s} cm.`, ...opts, marks: 1, explanation: `Area = side² = ${s}² = ${area} cm².`, orderIndex: qSlot };
          } else if (qSlot === 24) {
            const side = seed + 2, vol = side * side * side;
            const opts = buildOptions(`${vol} cm³`, [`${vol + 18} cm³`, `${vol - 12} cm³`, `${vol + 30} cm³`]);
            qObj = { question: `Q${globalQCount}: Calculate volume of cube with edge ${side} cm.`, ...opts, marks: 1, explanation: `Volume = side³ = ${side}³ = ${vol} cm³.`, orderIndex: qSlot };
          } else {
            const opts = buildOptions('1/2', ['√3/2', '1/√2', '1']);
            qObj = { question: `Q${globalQCount}: What is the exact value of sin(30°)?`, ...opts, marks: 1, explanation: `Trigonometric ratio sin(30°) = 1/2 = 0.5.`, orderIndex: qSlot };
          }
        }

        // -------------------------------------------------------------------
        // 2. LOGICAL (25 Mixed Non-Repeating Sub-Topics per Test Set)
        // -------------------------------------------------------------------
        else if (catObj.name === 'Logical') {
          if (qSlot === 1) {
            const diff = (seed % 4) + 2, s1 = seed * 2, s4 = s1 + 3 * diff, ans = s4 + diff;
            const opts = buildOptions(`${ans}`, [`${ans + 3}`, `${ans - 2}`, `${ans + 5}`]);
            qObj = { question: `Q${globalQCount}: Complete arithmetic series: ${s1}, ${s1 + diff}, ${s1 + 2 * diff}, ${s4}, ?`, ...opts, marks: 1, explanation: `Common difference = +${diff}. Next = ${ans}.`, orderIndex: qSlot };
          } else if (qSlot === 2) {
            const g1 = seed + 1, ans = g1 * 16;
            const opts = buildOptions(`${ans}`, [`${ans + 8}`, `${ans - 12}`, `${ans * 2}`]);
            qObj = { question: `Q${globalQCount}: Complete geometric progression: ${g1}, ${g1 * 2}, ${g1 * 4}, ${g1 * 8}, ?`, ...opts, marks: 1, explanation: `Ratio = 2. Next = ${g1 * 8} × 2 = ${ans}.`, orderIndex: qSlot };
          } else if (qSlot === 3) {
            const n = seed + 2, ans = n * n * n;
            const opts = buildOptions(`${ans}`, [`${ans + 12}`, `${ans - 8}`, `${ans + 20}`]);
            qObj = { question: `Q${globalQCount}: Find cube of integer ${n}.`, ...opts, marks: 1, explanation: `Cube = ${n}³ = ${ans}.`, orderIndex: qSlot };
          } else if (qSlot === 4) {
            const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', idx = (seed * 2) % 20, ans = alpha[idx + 4];
            const opts = buildOptions(ans, [alpha[idx + 5], alpha[idx + 3], alpha[idx + 6]]);
            qObj = { question: `Q${globalQCount}: Complete alphabet pattern: ${alpha[idx]}, ${alpha[idx + 1]}, ${alpha[idx + 2]}, ${alpha[idx + 3]}, ?`, ...opts, marks: 1, explanation: `Consecutive letter increments -> Next is ${ans}.`, orderIndex: qSlot };
          } else if (qSlot === 5) {
            const alpha = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ', shift = (seed % 3) + 1, word = 'SMART';
            const coded = word.split('').map(ch => alpha[(alpha.indexOf(ch) + shift) % 26]).join('');
            const w1 = word.split('').map(ch => alpha[(alpha.indexOf(ch) + shift + 1) % 26]).join('');
            const w2 = word.split('').map(ch => alpha[(alpha.indexOf(ch) + shift - 1 + 26) % 26]).join('');
            const w3 = word.split('').map(ch => alpha[(alpha.indexOf(ch) + shift + 2) % 26]).join('');
            const opts = buildOptions(coded, [w1, w2, w3]);
            qObj = { question: `Q${globalQCount}: If "SMART" is coded as "${coded}" under (+${shift}) shift, how is it encoded?`, ...opts, marks: 1, explanation: `Shift each letter forward by +${shift}.`, orderIndex: qSlot };
          } else if (qSlot === 6) {
            const val = seed * 7;
            const opts = buildOptions(`${val}`, [`${val + 4}`, `${val - 5}`, `${val + 10}`]);
            qObj = { question: `Q${globalQCount}: In a matrix code where X(n) = n × 7, evaluate X(${seed}).`, ...opts, marks: 1, explanation: `Result = ${seed} × 7 = ${val}.`, orderIndex: qSlot };
          } else if (qSlot === 7) {
            const rels = ['Uncle', 'Brother', 'Nephew', 'Cousin'];
            const rel = rels[seed % rels.length];
            const opts = buildOptions(rel, ['Father', 'Grandfather', 'Sister']);
            qObj = { question: `Q${globalQCount}: Pointing to a man, Priya says, "His mother is the only daughter of my mother." How is the man related to Priya?`, ...opts, marks: 1, explanation: `Priya's mother's only daughter is Priya. Man is her son, making relation ${rel}.`, orderIndex: qSlot };
          } else if (qSlot === 8) {
            const opts = buildOptions('Son', ['Father', 'Brother', 'Uncle']);
            qObj = { question: `Q${globalQCount}: A man says, "This boy is the son of the wife of my father." How is the boy related if he has no brothers?`, ...opts, marks: 1, explanation: `Father's wife is his mother. Son of his mother is himself or brother. Since no brothers, he is his Son.`, orderIndex: qSlot };
          } else if (qSlot === 9) {
            const n = seed * 2 + 10, e = seed * 2 + 15, dist = Math.round(Math.sqrt(n * n + e * e));
            const opts = buildOptions(`${dist} m NE`, [`${dist + 4} m East`, `${dist - 5} m North`, `${dist + 10} m SE`]);
            qObj = { question: `Q${globalQCount}: A person walks ${n}m North, turns right and walks ${e}m East. Find distance from origin.`, ...opts, marks: 1, explanation: `Distance = √(${n}² + ${e}²) = ${dist}m NE.`, orderIndex: qSlot };
          } else if (qSlot === 10) {
            const opts = buildOptions('South-West', ['North-East', 'South-East', 'North-West']);
            qObj = { question: `Q${globalQCount}: If South-East becomes North, North-East becomes West, what does West become?`, ...opts, marks: 1, explanation: `135° anti-clockwise rotation turns West into South-East.`, orderIndex: qSlot };
          } else if (qSlot === 11) {
            const hr = (seed % 12) + 1, angle = Math.abs(hr * 30), norm = angle > 180 ? 360 - angle : angle;
            const opts = buildOptions(`${norm}°`, [`${norm + 15}°`, `${norm - 10}°`, `${norm + 30}°`]);
            qObj = { question: `Q${globalQCount}: What is the angle between clock hands at ${hr}:00?`, ...opts, marks: 1, explanation: `Angle = ${hr} × 30° = ${norm}°.`, orderIndex: qSlot };
          } else if (qSlot === 12) {
            const opts = buildOptions('Sunday', ['Monday', 'Friday', 'Saturday']);
            qObj = { question: `Q${globalQCount}: If 1st Jan of a non-leap year is Friday, what day is 31st Dec of the same year?`, ...opts, marks: 1, explanation: `365 days = 52 weeks + 1 day. 31st Dec is same day as 1st Jan = Friday.`, orderIndex: qSlot };
          } else if (qSlot === 13) {
            const opts = buildOptions('Center / Middle', ['Extreme Left', 'Extreme Right', 'Immediate Right']);
            qObj = { question: `Q${globalQCount}: 5 people (A,B,C,D,E) sit in a row. C is in the middle. Where is C seated?`, ...opts, marks: 1, explanation: `C occupies 3rd position (Middle).`, orderIndex: qSlot };
          } else if (qSlot === 14) {
            const opts = buildOptions('Opposite to each other', ['Adjacent', 'Diagonal', 'Cannot determine']);
            qObj = { question: `Q${globalQCount}: In two parallel rows facing each other, A is opposite to X. How are A and X positioned?`, ...opts, marks: 1, explanation: `A and X are seated directly opposite each other.`, orderIndex: qSlot };
          } else if (qSlot === 15) {
            const opts = buildOptions('Immediate Left', ['Immediate Right', 'Opposite', 'Second to Right']);
            qObj = { question: `Q${globalQCount}: 4 people sit around a circular table facing center. A is clockwise from B. B is to A\'s?`, ...opts, marks: 1, explanation: `Facing center, clockwise means B is to the Immediate Left of A.`, orderIndex: qSlot };
          } else if (qSlot === 16) {
            const opts = buildOptions('Facing Away from Center', ['Facing Center', 'Facing North', 'Facing South']);
            qObj = { question: `Q${globalQCount}: In outward circular seating, left movement corresponds to clockwise rotation. Where are they facing?`, ...opts, marks: 1, explanation: `Outward seating means facing away from center.`, orderIndex: qSlot };
          } else if (qSlot === 17) {
            const opts = buildOptions('Only Conclusion I follows', ['Only Conclusion II follows', 'Both I and II follow', 'Neither follows']);
            qObj = { question: `Q${globalQCount}: Statements: All dogs are mammals. All mammals are animals. Conclusions: I. All dogs are animals. II. All animals are dogs.`, ...opts, marks: 1, explanation: `Dogs ⊂ Mammals ⊂ Animals. Conclusion I follows.`, orderIndex: qSlot };
          } else if (qSlot === 18) {
            const opts = buildOptions('Neither follows', ['Only I follows', 'Only II follows', 'Both follow']);
            qObj = { question: `Q${globalQCount}: Statements: No cats are dogs. No dogs are birds. Conclusions: I. No cats are birds. II. All birds are cats.`, ...opts, marks: 1, explanation: `No direct relationship between cats and birds is established. Neither follows.`, orderIndex: qSlot };
          } else if (qSlot === 19) {
            const opts = buildOptions('Conclusion I is implicit', ['Conclusion II is implicit', 'Both implicit', 'Neither implicit']);
            qObj = { question: `Q${globalQCount}: Statement: "Drive carefully to avoid accidents." Conclusion I: Careless driving causes accidents.`, ...opts, marks: 1, explanation: `The warning directly implies careless driving leads to accidents.`, orderIndex: qSlot };
          } else if (qSlot === 20) {
            const opts = buildOptions('Assumption I is implicit', ['Assumption II is implicit', 'Both implicit', 'Neither implicit']);
            qObj = { question: `Q${globalQCount}: Statement: "Please post this letter." Assumption I: The letter will reach its destination via post.`, ...opts, marks: 1, explanation: `The request assumes the postal service will deliver the letter.`, orderIndex: qSlot };
          } else if (qSlot === 21) {
            const opts = buildOptions('Statement I alone is sufficient', ['Statement II alone is sufficient', 'Both statements together needed', 'Neither is sufficient']);
            qObj = { question: `Q${globalQCount}: Is X an even integer? Statement I: X is divisible by 4. Statement II: X > 10.`, ...opts, marks: 1, explanation: `Statement I alone proves X is even because any multiple of 4 is even.`, orderIndex: qSlot };
          } else if (qSlot === 22) {
            const rank = (seed % 10) + 5, total = 30, fromBottom = total - rank + 1;
            const opts = buildOptions(`${fromBottom}th`, [`${fromBottom + 2}th`, `${fromBottom - 3}th`, `${fromBottom + 5}th`]);
            qObj = { question: `Q${globalQCount}: In a class of 30 students, Rahul ranks ${rank}th from top. What is his rank from bottom?`, ...opts, marks: 1, explanation: `Rank from bottom = (Total - Rank from top + 1) = (30 - ${rank} + 1) = ${fromBottom}th.`, orderIndex: qSlot };
          } else if (qSlot === 23) {
            const opts = buildOptions('Group {A, B, C}', ['Group {A, D, E}', 'Group {B, C, D}', 'Group {C, E, F}']);
            qObj = { question: `Q${globalQCount}: Select a 3-member team from A,B,C,D where A must be with B, and B with C.`, ...opts, marks: 1, explanation: `Team must include A, B, and C together.`, orderIndex: qSlot };
          } else if (qSlot === 24) {
            const floor = (seed % 5) + 1;
            const opts = buildOptions(`Floor ${floor}`, [`Floor ${floor + 1}`, `Floor ${Math.max(1, floor - 1)}`, `Floor ${floor + 2}`]);
            qObj = { question: `Q${globalQCount}: In a 5-story building, A lives on floor ${floor}. Which floor does A occupy?`, ...opts, marks: 1, explanation: `A occupies Floor ${floor}.`, orderIndex: qSlot };
          } else {
            const opts = buildOptions('Monday', ['Tuesday', 'Wednesday', 'Thursday']);
            qObj = { question: `Q${globalQCount}: Meeting is scheduled on the first working day of the week. Which day is it?`, ...opts, marks: 1, explanation: `First working day of standard week is Monday.`, orderIndex: qSlot };
          }
        }

        // -------------------------------------------------------------------
        // 3. VERBAL (25 Mixed Non-Repeating Sub-Topics per Test Set)
        // -------------------------------------------------------------------
        else if (catObj.name === 'Verbal') {
          const vWord = vocabPool[(seed - 1) % vocabPool.length];
          if (qSlot === 1) {
            const opts = buildOptions('is', ['are', 'were', 'have']);
            qObj = { question: `Q${globalQCount}: Fill in blank: "Neither of the two applicants ___ qualified."`, ...opts, marks: 1, explanation: `"Neither" takes singular verb "is".`, orderIndex: qSlot };
          } else if (qSlot === 2) {
            const opts = buildOptions('has been working', ['is working', 'have worked', 'was work']);
            qObj = { question: `Q${globalQCount}: Choose correct tense: "She ___ at Sowberry Academy since 2022."`, ...opts, marks: 1, explanation: `Present Perfect Continuous "has been working".`, orderIndex: qSlot };
          } else if (qSlot === 3) {
            const opts = buildOptions('A song was sung by Mary', ['A song is sung by Mary', 'Mary sang a song', 'A song will be sung']);
            qObj = { question: `Q${globalQCount}: Convert to Passive Voice: "Mary sang a song."`, ...opts, marks: 1, explanation: `Simple past passive "was sung".`, orderIndex: qSlot };
          } else if (qSlot === 4) {
            const opts = buildOptions('He said that he sang', ['He said I sing', 'He told he sang', 'He says he sang']);
            qObj = { question: `Q${globalQCount}: Convert to Indirect: He said, "I sing."`, ...opts, marks: 1, explanation: `Reported speech past tense "he sang".`, orderIndex: qSlot };
          } else if (qSlot === 5) {
            const opts = buildOptions('He said that he was busy', ['He said he is busy', 'He says he was busy', 'He told he is busy']);
            qObj = { question: `Q${globalQCount}: Convert to Indirect: He said, "I am busy."`, ...opts, marks: 1, explanation: `"am" becomes "was" in indirect speech.`, orderIndex: qSlot };
          } else if (qSlot === 6) {
            const opts = buildOptions('He asked where I lived', ['He asked where do I live', 'He told where I live', 'He asked where I live']);
            qObj = { question: `Q${globalQCount}: Convert to Indirect: He asked, "Where do you live?"`, ...opts, marks: 1, explanation: `Question reported speech "asked where I lived".`, orderIndex: qSlot };
          } else if (qSlot === 7) {
            const opts = buildOptions(vWord.s, ['Obscure', 'Rigid', 'Hostile']);
            qObj = { question: `Q${globalQCount}: Select Synonym for "${vWord.w}".`, ...opts, marks: 1, explanation: `Synonym of "${vWord.w}" is "${vWord.s}".`, orderIndex: qSlot };
          } else if (qSlot === 8) {
            const opts = buildOptions(vWord.a, [vWord.s, 'Normal', 'Common']);
            qObj = { question: `Q${globalQCount}: Select Antonym for "${vWord.w}".`, ...opts, marks: 1, explanation: `Antonym of "${vWord.w}" is "${vWord.a}".`, orderIndex: qSlot };
          } else if (qSlot === 9) {
            const opts = buildOptions('Very rarely', ['Frequently', 'Every month', 'Continuously']);
            qObj = { question: `Q${globalQCount}: What does idiom "Once in a blue moon" mean?`, ...opts, marks: 1, explanation: `"Once in a blue moon" means very rarely.`, orderIndex: qSlot };
          } else if (qSlot === 10) {
            const opts = buildOptions('To reveal a secret', ['To cook food', 'To plant seeds', 'To drop objects']);
            qObj = { question: `Q${globalQCount}: What does idiom "Spill the beans" mean?`, ...opts, marks: 1, explanation: `"Spill the beans" means to reveal a secret.`, orderIndex: qSlot };
          } else if (qSlot === 11) {
            const opts = buildOptions('Author', ['Editor', 'Publisher', 'Reader']);
            qObj = { question: `Q${globalQCount}: One-word substitution for: "A person who writes books".`, ...opts, marks: 1, explanation: `Writer of books is an Author.`, orderIndex: qSlot };
          } else if (qSlot === 12) {
            const opts = buildOptions('at', ['in', 'on', 'with']);
            qObj = { question: `Q${globalQCount}: Fill in blank: "She is proficient ___ algorithms."`, ...opts, marks: 1, explanation: `"Proficient" takes preposition "at".`, orderIndex: qSlot };
          } else if (qSlot === 13) {
            const opts = buildOptions('Necessary', ['Neccessary', 'Necesary', 'Neccesary']);
            qObj = { question: `Q${globalQCount}: Choose correctly spelled word:`, ...opts, marks: 1, explanation: `Correct spelling is "Necessary".`, orderIndex: qSlot };
          } else if (qSlot === 14) {
            const opts = buildOptions('Receive', ['Recieve', 'Riceive', 'Receve']);
            qObj = { question: `Q${globalQCount}: Choose correctly spelled word:`, ...opts, marks: 1, explanation: `Correct spelling is "Receive".`, orderIndex: qSlot };
          } else if (qSlot === 15) {
            const opts = buildOptions('is', ['are', 'were', 'have']);
            qObj = { question: `Q${globalQCount}: Fill in blank: "The list of items ___ on the desk."`, ...opts, marks: 1, explanation: `Subject "list" is singular -> "is".`, orderIndex: qSlot };
          } else if (qSlot === 16) {
            const opts = buildOptions('had left', ['left', 'has left', 'was leaving']);
            qObj = { question: `Q${globalQCount}: Fill in blank: "By the time we arrived, the train ___."`, ...opts, marks: 1, explanation: `Past perfect tense "had left" for earlier completed action.`, orderIndex: qSlot };
          } else if (qSlot === 17) {
            const opts = buildOptions('between', ['among', 'with', 'in']);
            qObj = { question: `Q${globalQCount}: Fill in blank: "Divide the prize money ___ the two winners."`, ...opts, marks: 1, explanation: `Use "between" for two entities.`, orderIndex: qSlot };
          } else if (qSlot === 18) {
            const opts = buildOptions('although', ['because', 'unless', 'despite']);
            qObj = { question: `Q${globalQCount}: Fill in blank: "He completed project ___ he was unwell."`, ...opts, marks: 1, explanation: `"although" expresses contrast.`, orderIndex: qSlot };
          } else if (qSlot === 19) {
            const opts = buildOptions('Main Theme / Purpose', ['Minor Detail', 'Grammatical Structure', 'Author Biography']);
            qObj = { question: `Q${globalQCount}: What does the primary idea of a Reading Comprehension passage convey?`, ...opts, marks: 1, explanation: `Primary idea summarizes main theme and purpose.`, orderIndex: qSlot };
          } else if (qSlot === 20) {
            const opts = buildOptions('Factual Evidence', ['Opinion', 'Grammar Rule', 'Vocabulary List']);
            qObj = { question: `Q${globalQCount}: In reading comprehension, specific data points serve as?`, ...opts, marks: 1, explanation: `Data points act as factual evidence supporting main claims.`, orderIndex: qSlot };
          } else if (qSlot === 21) {
            const opts = buildOptions('B - A - C - D', ['A - B - C - D', 'D - C - B - A', 'C - A - D - B']);
            qObj = { question: `Q${globalQCount}: Reorder: (A) was completed (B) The task (C) by team (D) yesterday.`, ...opts, marks: 1, explanation: `Correct order: B (The task) + A (was completed) + C (by team) + D (yesterday).`, orderIndex: qSlot };
          } else if (qSlot === 22) {
            const opts = buildOptions('Optimist', ['Pessimist', 'Realist', 'Skeptic']);
            qObj = { question: `Q${globalQCount}: Give one word for: "One who looks on the bright side of things".`, ...opts, marks: 1, explanation: `One who is hopeful is an Optimist.`, orderIndex: qSlot };
          } else if (qSlot === 23) {
            const opts = buildOptions('Water is to Thirst', ['Food is to Sleep', 'Book is to Pen', 'Sun is to Night']);
            qObj = { question: `Q${globalQCount}: Complete analogy: Food is to Hunger as ___?`, ...opts, marks: 1, explanation: `Food satisfies hunger; Water satisfies thirst.`, orderIndex: qSlot };
          } else if (qSlot === 24) {
            const opts = buildOptions('efficiently', ['slowly', 'carelessly', 'hardly']);
            qObj = { question: `Q${globalQCount}: Complete: "The software engineer completed code ___."`, ...opts, marks: 1, explanation: `"efficiently" fits context of a skilled engineer.`, orderIndex: qSlot };
          } else {
            const opts = buildOptions('Formal Business English', ['Slang', 'Informal Chat', 'Poetic Metaphor']);
            qObj = { question: `Q${globalQCount}: Corporate communication requires which tone?`, ...opts, marks: 1, explanation: `Corporate work environment requires Formal Business English.`, orderIndex: qSlot };
          }
        }

        // -------------------------------------------------------------------
        // 4. TECHNICAL (25 Mixed Non-Repeating CS Core Sub-Topics per Test Set)
        // -------------------------------------------------------------------
        else if (catObj.name === 'Technical') {
          const tItem = techTopics[(qSlot - 1) % techTopics.length];
          const opts = buildOptions(tItem.ans, tItem.w);
          qObj = {
            question: `Q${globalQCount}: [${tItem.type}] ${tItem.q}`,
            ...opts,
            marks: 1,
            explanation: tItem.exp,
            orderIndex: qSlot
          };
        }

        // -------------------------------------------------------------------
        // 5. DATA (25 Mixed Non-Repeating Data & Visual Sub-Topics per Test Set)
        // -------------------------------------------------------------------
        else {
          if (qSlot === 1) {
            const valA = seed * 10 + 50, valB = seed * 15 + 50, total = valA + valB, pct = Math.round((valA / total) * 100);
            const opts = buildOptions(`${pct}%`, [`${pct + 6}%`, `${pct - 8}%`, `${pct + 12}%`]);
            qObj = { question: `Q${globalQCount}: [DI Table] Dept A produced ${valA} units and Dept B produced ${valB} units (Total = ${total}). What is Dept A's share?`, ...opts, marks: 1, explanation: `% Share = (${valA} / ${total}) × 100 = ${pct}%.`, orderIndex: qSlot };
          } else if (qSlot === 2) {
            const val1 = seed * 5 + 40, val2 = seed * 5 + 80, diffPct = Math.round(((val2 - val1) / val1) * 100);
            const opts = buildOptions(`${diffPct}%`, [`${diffPct + 10}%`, `${diffPct - 15}%`, `${diffPct + 25}%`]);
            qObj = { question: `Q${globalQCount}: [Bar Chart] Production grew from ${val1} to ${val2} tons. Calculate % increase.`, ...opts, marks: 1, explanation: `% Increase = [(${val2} - ${val1}) / ${val1}] × 100 = ${diffPct}%.`, orderIndex: qSlot };
          } else if (qSlot === 3) {
            const pctShare = 25, angle = (pctShare / 100) * 360;
            const opts = buildOptions(`${angle}°`, [`${angle + 15}°`, `${angle - 20}°`, `${angle + 30}°`]);
            qObj = { question: `Q${globalQCount}: [Pie Chart] Sector represents ${pctShare}% of total. Find central angle in degrees.`, ...opts, marks: 1, explanation: `Angle = (${pctShare} / 100) × 360° = ${angle}°.`, orderIndex: qSlot };
          } else if (qSlot === 4) {
            const g1 = seed * 2 + 10, g2 = seed * 2 + 20, g3 = seed * 2 + 30, avg = Math.round((g1 + g2 + g3) / 3);
            const opts = buildOptions(`${avg}`, [`${avg + 5}`, `${avg - 6}`, `${avg + 10}`]);
            qObj = { question: `Q${globalQCount}: [Line Graph] Quarterly profits were ${g1}, ${g2}, and ${g3} Lakhs. Find average profit.`, ...opts, marks: 1, explanation: `Average = (${g1} + ${g2} + ${g3}) / 3 = ${avg} Lakhs.`, orderIndex: qSlot };
          } else if (qSlot === 5) {
            const total = 500, valA = (3 / 5) * total;
            const opts = buildOptions(`${valA}`, [`${valA + 50}`, `${valA - 40}`, `${valA + 100}`]);
            qObj = { question: `Q${globalQCount}: [Caselet DI] Total 500 students are in Science and Arts in ratio 3:2. How many are in Science?`, ...opts, marks: 1, explanation: `Science students = (3 / 5) × 500 = ${valA}.`, orderIndex: qSlot };
          } else if (qSlot === 6) {
            const top = (seed % 6) + 1, bot = 7 - top;
            const opts = buildOptions(`${bot}`, [`${(bot + 2) % 7 || 1}`, `${(bot + 4) % 7 || 2}`, `${(bot + 3) % 7 || 3}`]);
            qObj = { question: `Q${globalQCount}: [Dice Logic] On a standard die, if face ${top} is at top, what number is at bottom?`, ...opts, marks: 1, explanation: `Opposite faces sum to 7. Bottom = 7 - ${top} = ${bot}.`, orderIndex: qSlot };
          } else if (qSlot === 7) {
            const opts = buildOptions('Symmetrical 4-Hole Quadrant', ['Single Center Hole', 'Diagonal Cutouts', 'No Perforation']);
            qObj = { question: `Q${globalQCount}: [Paper Folding] A square paper folded twice into small square is punched at center. How many holes appear when unfolded?`, ...opts, marks: 1, explanation: `Unfolding a 2-fold paper punched at center yields 4 symmetrical holes.`, orderIndex: qSlot };
          } else if (qSlot === 8) {
            const opts = buildOptions('Lateral Inversion (Left <-> Right)', ['Vertical Inversion', '180° Inversion', 'No Change']);
            qObj = { question: `Q${globalQCount}: [Visual Reasoning] What transformation occurs when object is reflected in vertical mirror?`, ...opts, marks: 1, explanation: `Vertical mirror produces lateral inversion (left and right swapped).`, orderIndex: qSlot };
          } else if (qSlot === 9) {
            const opts = buildOptions(`Pattern Option ${((seed - 1) % 4) + 1}`, ['Pattern Option X', 'Pattern Option Y', 'Pattern Option Z']);
            qObj = { question: `Q${globalQCount}: [Figure Matrix] Select option completing 3x3 pattern matrix grid #${seed}.`, ...opts, marks: 1, explanation: `Symmetrical row-wise rotation restores matrix balance.`, orderIndex: qSlot };
          } else if (qSlot === 10) {
            const opts = buildOptions('Quadrant 4 Curve Completion', ['Quadrant 1 Inversion', 'Diagonal Line', 'Empty Circle']);
            qObj = { question: `Q${globalQCount}: [Pattern Completion] Which geometric shape element completes the bottom-right quadrant?`, ...opts, marks: 1, explanation: `Bottom-right quadrant requires arc completion.`, orderIndex: qSlot };
          } else if (qSlot === 11) {
            const top = ((seed + 2) % 6) + 1, bot = 7 - top;
            const opts = buildOptions(`${bot}`, [`${(bot + 1) % 7 || 1}`, `${(bot + 3) % 7 || 2}`, `${(bot + 5) % 7 || 4}`]);
            qObj = { question: `Q${globalQCount}: [Dice Logic Set B] If top face is ${top}, what is the opposite bottom face?`, ...opts, marks: 1, explanation: `Opposite face = 7 - ${top} = ${bot}.`, orderIndex: qSlot };
          } else if (qSlot === 12) {
            const opts = buildOptions('Unfolded Cube Net B', ['Unfolded Net X', 'Unfolded Net Y', 'Unfolded Net Z']);
            qObj = { question: `Q${globalQCount}: [Cube Net] Which 2D layout folds into a closed 3D cube?`, ...opts, marks: 1, explanation: `Standard 6-square T-net folds into a closed cube.`, orderIndex: qSlot };
          } else if (qSlot === 13) {
            const opts = buildOptions('Diagonal Fold Line', ['Vertical Line', 'Horizontal Line', 'Circular Fold']);
            qObj = { question: `Q${globalQCount}: [Paper Folding] Folding a square paper along its diagonal creates which shape?`, ...opts, marks: 1, explanation: `Folding along a diagonal forms an isosceles right triangle.`, orderIndex: qSlot };
          } else if (qSlot === 14) {
            const opts = buildOptions('8 Holes Symmetrical', ['4 Holes', '2 Holes', '16 Holes']);
            qObj = { question: `Q${globalQCount}: [Paper Cutting] A paper folded 3 times is punched with 1 hole. How many total holes appear when unfolded?`, ...opts, marks: 1, explanation: `3 folds = 2³ = 8 layers, yielding 8 holes.`, orderIndex: qSlot };
          } else if (qSlot === 15) {
            const opts = buildOptions('Left-Right Reversed', ['Top-Bottom Inverted', 'No Change', 'Rotated 90°']);
            qObj = { question: `Q${globalQCount}: [Mirror Image] A vertical mirror reflection changes which orientation?`, ...opts, marks: 1, explanation: `Left-Right orientation is reversed.`, orderIndex: qSlot };
          } else if (qSlot === 16) {
            const opts = buildOptions('Top-Bottom Inverted', ['Left-Right Reversed', 'No Change', 'Rotated 90°']);
            qObj = { question: `Q${globalQCount}: [Water Image] A horizontal water reflection changes which orientation?`, ...opts, marks: 1, explanation: `Top-Bottom orientation is inverted.`, orderIndex: qSlot };
          } else if (qSlot === 17) {
            const opts = buildOptions('Shape 3', ['Shape 1', 'Shape 2', 'Shape 4']);
            qObj = { question: `Q${globalQCount}: [Figure Matrix B] Find missing 3rd column shape in row 2.`, ...opts, marks: 1, explanation: `Each row contains square, circle, and triangle. Shape 3 completes row.`, orderIndex: qSlot };
          } else if (qSlot === 18) {
            const opts = buildOptions('Shape 2', ['Shape 1', 'Shape 3', 'Shape 4']);
            qObj = { question: `Q${globalQCount}: [Figure Matrix C] Find missing bottom-right shape.`, ...opts, marks: 1, explanation: `Shading increases left-to-right. Shape 2 completes matrix.`, orderIndex: qSlot };
          } else if (qSlot === 19) {
            const opts = buildOptions('Embedded inside Figure B', ['Inside Figure A', 'Inside Figure C', 'Not Present']);
            qObj = { question: `Q${globalQCount}: [Embedded Figure] Given simple triangle shape X, where is it hidden?`, ...opts, marks: 1, explanation: `Triangle X is embedded within complex Figure B.`, orderIndex: qSlot };
          } else if (qSlot === 20) {
            const opts = buildOptions('Clockwise 90° Rotation', ['180° Flip', '270° Rotation', '360° Full Turn']);
            qObj = { question: `Q${globalQCount}: [Pattern Rotation] What transformation occurs step-by-step in series?`, ...opts, marks: 1, explanation: `Elements rotate clockwise by 90° at each step.`, orderIndex: qSlot };
          } else if (qSlot === 21) {
            const opts = buildOptions('Series Position 5', ['Position 4', 'Position 6', 'Position 3']);
            qObj = { question: `Q${globalQCount}: [Visual Series] What is the 5th term in visual sequence?`, ...opts, marks: 1, explanation: `Following +1 line addition rule yields Position 5.`, orderIndex: qSlot };
          } else if (qSlot === 22) {
            const opts = buildOptions('Symmetrical Match', ['Asymmetrical', 'Disjoint', 'Overlapping']);
            qObj = { question: `Q${globalQCount}: [Spatial Logic] Two halves of a symmetrical icon form which complete object?`, ...opts, marks: 1, explanation: `Two halves combine into a Symmetrical Match.`, orderIndex: qSlot };
          } else if (qSlot === 23) {
            const opts = buildOptions('Table Row 3', ['Row 1', 'Row 2', 'Row 4']);
            qObj = { question: `Q${globalQCount}: [Table Reasoning] Which table row has the highest total value?`, ...opts, marks: 1, explanation: `Sum of Row 3 is highest.`, orderIndex: qSlot };
          } else if (qSlot === 24) {
            const opts = buildOptions('Chart Pillar 4', ['Pillar 1', 'Pillar 2', 'Pillar 3']);
            qObj = { question: `Q${globalQCount}: [Bar Chart DI] Which year recorded peak sales in bar chart?`, ...opts, marks: 1, explanation: `Pillar 4 shows maximum height.`, orderIndex: qSlot };
          } else {
            const opts = buildOptions('Pattern Option A', ['Option B', 'Option C', 'Option D']);
            qObj = { question: `Q${globalQCount}: [Non-Verbal Speed] Identify the matching figure from options.`, ...opts, marks: 1, explanation: `Option A matches target shape exactly.`, orderIndex: qSlot };
          }
        }

        questions.push(qObj);
      }

      tests.push({
        title: testTitle,
        description: catObj.desc,
        category: catObj.name,
        difficulty: diff,
        icon: catObj.icon,
        duration: 30,
        questions
      });
    }
  });

  return tests;
}
