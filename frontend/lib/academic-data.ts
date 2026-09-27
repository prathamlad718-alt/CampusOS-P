export interface CourseInstructor {
  id: string;
  name: string;
  title: string;
  cabin: string;
  email: string;
  avatar: string;
}

export interface SyllabusModule {
  unit: number;
  title: string;
  hours: number;
  topics: string[];
  status: 'completed' | 'in-progress' | 'upcoming';
}

export interface ScheduleSlot {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday';
  startTime: string;
  endTime: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
}

export interface CourseMaterial {
  id: string;
  name: string;
  type: 'pdf' | 'slides' | 'code' | 'doc';
  size: string;
  date: string;
  downloads: number;
}

export interface CourseAssignment {
  id: string;
  title: string;
  dueDate: string;
  totalMarks: number;
  status: 'pending' | 'submitted' | 'graded';
  score?: number;
  weightage: string;
}

export interface EvaluationComponent {
  component: string;
  maxMarks: number;
  weightage: number;
  scoredMarks?: number;
}

export interface Course {
  id: string;
  code: string;
  name: string;
  department: string;
  semester: number;
  credits: number;
  category: 'Core' | 'Elective' | 'Lab' | 'Foundation';
  color: string;
  instructor: CourseInstructor;
  room: string;
  attendance: {
    attended: number;
    total: number;
    percentage: number;
    criteria: number;
  };
  description: string;
  syllabusModules: SyllabusModule[];
  scheduleSlots: ScheduleSlot[];
  driveMaterials: CourseMaterial[];
  assignments: CourseAssignment[];
  evaluationBreakdown: EvaluationComponent[];
  studentGrade?: {
    letterGrade: string;
    gradePoint: number;
    totalPercentage: number;
    remarks: string;
    published: boolean;
  };
}

export const COURSES: Course[] = [
  {
    id: 'cs302',
    code: 'CS-302',
    name: 'Database Management Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    category: 'Core',
    color: '#3b82f6',
    instructor: {
      id: 'inst_rajesh',
      name: 'Prof. Rajesh Sharma',
      title: 'Associate Professor & Lab Head',
      cabin: 'Alan Turing Block, Rm 208',
      email: 'rajesh.sharma@campusos.edu',
      avatar: 'RS'
    },
    room: 'Room 204 (Turing Block)',
    attendance: {
      attended: 28,
      total: 32,
      percentage: 87.5,
      criteria: 75.0
    },
    description: 'Relational data models, formal query languages (SQL/Relational Algebra), indexing, transaction processing, concurrency control, and distributed storage engines.',
    syllabusModules: [
      {
        unit: 1,
        title: 'Relational Model & Relational Algebra',
        hours: 8,
        topics: ['Tuple Relational Calculus', 'Domain Relational Calculus', 'Relational Operations', 'Integrity Constraints'],
        status: 'completed'
      },
      {
        unit: 2,
        title: 'SQL & Advanced Query Optimization',
        hours: 10,
        topics: ['Nested Subqueries', 'Window Functions', 'Cost-based Query Planning', 'B+ Tree Indexing'],
        status: 'completed'
      },
      {
        unit: 3,
        title: 'Normalization & Schema Refinement',
        hours: 8,
        topics: ['Functional Dependencies', '1NF, 2NF, 3NF, BCNF', 'Lossless Joins', 'Dependency Preservation'],
        status: 'in-progress'
      },
      {
        unit: 4,
        title: 'Transaction Processing & Concurrency',
        hours: 10,
        topics: ['ACID Properties', 'Two-Phase Locking (2PL)', 'Timestamp Ordering', 'Deadlock Detection & Recovery'],
        status: 'upcoming'
      },
      {
        unit: 5,
        title: 'Distributed Databases & NoSQL',
        hours: 6,
        topics: ['CAP Theorem', 'Sharding & Replication', 'Document Stores', 'Eventual Consistency'],
        status: 'upcoming'
      }
    ],
    scheduleSlots: [
      { day: 'Monday', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 204', type: 'Lecture' },
      { day: 'Wednesday', startTime: '11:15 AM', endTime: '12:15 PM', room: 'Room 204', type: 'Lecture' },
      { day: 'Thursday', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Lab 204', type: 'Lab' }
    ],
    driveMaterials: [
      { id: 'm1', name: 'CS302_L01_Relational_Algebra_Notes.pdf', type: 'pdf', size: '3.4 MB', date: 'Aug 14', downloads: 142 },
      { id: 'm2', name: 'CS302_L07_BTree_Indexing_Mechanisms.pdf', type: 'pdf', size: '5.1 MB', date: 'Sep 02', downloads: 128 },
      { id: 'm3', name: 'CS302_Normalization_Cheatsheet.pdf', type: 'pdf', size: '1.2 MB', date: 'Sep 12', downloads: 195 },
      { id: 'm4', name: 'PostgreSQL_Lab_Docker_Setup.zip', type: 'code', size: '12.8 MB', date: 'Sep 18', downloads: 89 }
    ],
    assignments: [
      { id: 'asg_db1', title: 'Assignment 1: Relational Algebra & Calculus Proofs', dueDate: 'Sep 05', totalMarks: 20, status: 'graded', score: 19, weightage: '10%' },
      { id: 'asg_db2', title: 'Assignment 2: Query Optimization & EXPLAIN ANALYZE', dueDate: 'Sep 20', totalMarks: 25, status: 'submitted', weightage: '15%' },
      { id: 'asg_db3', title: 'Assignment 3: Concurrency Engine & 2PL Simulator', dueDate: 'Oct 08', totalMarks: 30, status: 'pending', weightage: '20%' }
    ],
    evaluationBreakdown: [
      { component: 'Continuous Assessment & Quizzes', maxMarks: 20, weightage: 20, scoredMarks: 18.5 },
      { component: 'Mid-Semester Examination', maxMarks: 30, weightage: 30, scoredMarks: 27 },
      { component: 'Practical Lab Experiments & Viva', maxMarks: 20, weightage: 20, scoredMarks: 19 },
      { component: 'End-Semester Theory Exam', maxMarks: 50, weightage: 30, scoredMarks: 44 }
    ],
    studentGrade: {
      letterGrade: 'A+',
      gradePoint: 9,
      totalPercentage: 88.5,
      remarks: 'Outstanding conceptual clarity in Query Optimization and Schema Normalization.',
      published: true
    }
  },
  {
    id: 'cs304',
    code: 'CS-304',
    name: 'Operating Systems & Concurrency',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    category: 'Core',
    color: '#06b6d4',
    instructor: {
      id: 'inst_elena',
      name: 'Dr. Elena Vance',
      title: 'Professor & Systems Group Lead',
      cabin: 'Alan Turing Block, Rm 412',
      email: 'elena.vance@campusos.edu',
      avatar: 'EV'
    },
    room: 'Room 304 (Ramanujan Block)',
    attendance: {
      attended: 30,
      total: 34,
      percentage: 88.2,
      criteria: 75.0
    },
    description: 'Process abstractions, kernel architectures, thread synchronization, memory virtualization, paging/segmentation, file systems, and distributed concurrency primitives.',
    syllabusModules: [
      {
        unit: 1,
        title: 'Kernel Architecture & Process Control',
        hours: 8,
        topics: ['System Calls', 'Context Switching', 'Process State Models', 'IPC & Sockets'],
        status: 'completed'
      },
      {
        unit: 2,
        title: 'CPU Scheduling & Synchronization',
        hours: 10,
        topics: ['Multi-level Feedback Queues', 'Semaphores & Mutexes', 'Peterson Algorithm', 'Dining Philosophers'],
        status: 'completed'
      },
      {
        unit: 3,
        title: 'Virtual Memory & Page Replacement',
        hours: 10,
        topics: ['Multi-level Page Tables', 'TLB Management', 'LRU & Clock Algorithms', 'Thrashing'],
        status: 'in-progress'
      },
      {
        unit: 4,
        title: 'Storage Architecture & File Systems',
        hours: 8,
        topics: ['Inodes & Superblocks', 'Journaling Systems (ext4)', 'RAID Configurations', 'SSD Wear Leveling'],
        status: 'upcoming'
      }
    ],
    scheduleSlots: [
      { day: 'Tuesday', startTime: '10:00 AM', endTime: '11:00 AM', room: 'Room 304', type: 'Lecture' },
      { day: 'Thursday', startTime: '11:15 AM', endTime: '12:15 PM', room: 'Room 304', type: 'Lecture' },
      { day: 'Friday', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Lab 3B', type: 'Lab' }
    ],
    driveMaterials: [
      { id: 'os1', name: 'CS304_Process_Scheduling_Algorithms.pdf', type: 'pdf', size: '4.2 MB', date: 'Aug 20', downloads: 160 },
      { id: 'os2', name: 'CS304_Virtual_Memory_Walkthrough.pdf', type: 'pdf', size: '6.8 MB', date: 'Sep 10', downloads: 135 },
      { id: 'os3', name: 'xv6_Kernel_Source_Annotated.tar.gz', type: 'code', size: '18.4 MB', date: 'Sep 15', downloads: 110 }
    ],
    assignments: [
      { id: 'asg_os1', title: 'xv6 Priority Scheduler Implementation', dueDate: 'Sep 18', totalMarks: 30, status: 'graded', score: 28, weightage: '15%' },
      { id: 'asg_os2', title: 'Lock-Free Ring Buffer in C', dueDate: 'Oct 04', totalMarks: 25, status: 'pending', weightage: '15%' }
    ],
    evaluationBreakdown: [
      { component: 'Continuous Assessment & Quizzes', maxMarks: 20, weightage: 20, scoredMarks: 18 },
      { component: 'Mid-Semester Examination', maxMarks: 30, weightage: 30, scoredMarks: 26 },
      { component: 'Practical Lab Experiments & Viva', maxMarks: 20, weightage: 20, scoredMarks: 19.5 },
      { component: 'End-Semester Theory Exam', maxMarks: 50, weightage: 30, scoredMarks: 45 }
    ],
    studentGrade: {
      letterGrade: 'O',
      gradePoint: 10,
      totalPercentage: 92.0,
      remarks: 'Flawless kernel modification in xv6 scheduling task. Outstanding student.',
      published: true
    }
  },
  {
    id: 'cs306',
    code: 'CS-306',
    name: 'Computer Networks & Protocols',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    category: 'Core',
    color: '#8b5cf6',
    instructor: {
      id: 'inst_vikram',
      name: 'Prof. Vikram Malhotra',
      title: 'Associate Professor',
      cabin: 'Alan Turing Block, Rm 310',
      email: 'vikram.m@campusos.edu',
      avatar: 'VM'
    },
    room: 'Room 202 (Turing Block)',
    attendance: {
      attended: 26,
      total: 32,
      percentage: 81.25,
      criteria: 75.0
    },
    description: 'Layered architectures, OSI & TCP/IP stack, sliding window protocols, congestion control (TCP Reno/BBR), routing algorithms (BGP/OSPF), and transport security (TLS 1.3).',
    syllabusModules: [
      { unit: 1, title: 'Physical & Data Link Layers', hours: 8, topics: ['Framing', 'CRC Error Detection', 'CSMA/CD & Ethernet', 'VLANs'], status: 'completed' },
      { unit: 2, title: 'Network Layer & Routing', hours: 10, topics: ['IPv4/IPv6 Subnetting', 'Distance Vector vs Link State', 'BGP Peering', 'NAT'], status: 'completed' },
      { unit: 3, title: 'Transport Layer Protocols', hours: 10, topics: ['TCP Handshake & Teardown', 'Congestion Window Tuning', 'UDP Architecture', 'QUIC'], status: 'in-progress' }
    ],
    scheduleSlots: [
      { day: 'Monday', startTime: '11:15 AM', endTime: '12:15 PM', room: 'Room 202', type: 'Lecture' },
      { day: 'Wednesday', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 202', type: 'Lecture' },
      { day: 'Friday', startTime: '10:00 AM', endTime: '11:00 AM', room: 'Room 202', type: 'Lecture' }
    ],
    driveMaterials: [
      { id: 'net1', name: 'CS306_TCP_Congestion_Control_DeepDive.pdf', type: 'pdf', size: '5.2 MB', date: 'Sep 04', downloads: 112 },
      { id: 'net2', name: 'Wireshark_Packet_Analysis_Lab_Guide.pdf', type: 'pdf', size: '3.9 MB', date: 'Sep 14', downloads: 140 }
    ],
    assignments: [
      { id: 'asg_net1', title: 'Wireshark Packet Trace & TCP Reno Analysis', dueDate: 'Sep 22', totalMarks: 25, status: 'submitted', weightage: '15%' },
      { id: 'asg_net2', title: 'Custom Reliable Transport over UDP (Go/Rust)', dueDate: 'Oct 12', totalMarks: 35, status: 'pending', weightage: '20%' }
    ],
    evaluationBreakdown: [
      { component: 'Continuous Assessment & Quizzes', maxMarks: 20, weightage: 20, scoredMarks: 16.5 },
      { component: 'Mid-Semester Examination', maxMarks: 30, weightage: 30, scoredMarks: 24 },
      { component: 'Practical Lab Experiments & Viva', maxMarks: 20, weightage: 20, scoredMarks: 18 },
      { component: 'End-Semester Theory Exam', maxMarks: 50, weightage: 30, scoredMarks: 41 }
    ],
    studentGrade: {
      letterGrade: 'A',
      gradePoint: 8,
      totalPercentage: 83.5,
      remarks: 'Strong comprehension of routing protocols and packet flow dynamics.',
      published: true
    }
  },
  {
    id: 'cs308',
    code: 'CS-308',
    name: 'Theory of Computation & Automata',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 3,
    category: 'Core',
    color: '#ec4899',
    instructor: {
      id: 'inst_sunita',
      name: 'Dr. Sunita Kulkarni',
      title: 'Professor of Theoretical CS',
      cabin: 'Ramanujan Block, Rm 105',
      email: 'sunita.k@campusos.edu',
      avatar: 'SK'
    },
    room: 'Room 101 (Ramanujan Block)',
    attendance: {
      attended: 24,
      total: 30,
      percentage: 80.0,
      criteria: 75.0
    },
    description: 'Deterministic and nondeterministic finite automata, regular expressions, context-free grammars, pushdown automata, Turing machines, undecidability, and Chomsky hierarchy.',
    syllabusModules: [
      { unit: 1, title: 'Finite Automata & Regular Languages', hours: 8, topics: ['DFA/NFA Equivalence', 'Subset Construction', 'Myhill-Nerode Theorem', 'Pumping Lemma'], status: 'completed' },
      { unit: 2, title: 'Context-Free Languages & Pushdown Automata', hours: 10, topics: ['CFG Simplification', 'Chomsky Normal Form', 'DPDA vs NPDA', 'Pumping Lemma for CFLs'], status: 'in-progress' }
    ],
    scheduleSlots: [
      { day: 'Tuesday', startTime: '11:15 AM', endTime: '12:15 PM', room: 'Room 101', type: 'Lecture' },
      { day: 'Thursday', startTime: '09:00 AM', endTime: '10:00 AM', room: 'Room 101', type: 'Lecture' }
    ],
    driveMaterials: [
      { id: 'toc1', name: 'CS308_Automata_State_Minimization.pdf', type: 'pdf', size: '2.8 MB', date: 'Aug 25', downloads: 98 }
    ],
    assignments: [
      { id: 'asg_toc1', title: 'Automata Minimization & Pumping Lemma Problems', dueDate: 'Sep 28', totalMarks: 20, status: 'pending', weightage: '15%' }
    ],
    evaluationBreakdown: [
      { component: 'Continuous Assessment & Quizzes', maxMarks: 20, weightage: 20, scoredMarks: 17 },
      { component: 'Mid-Semester Examination', maxMarks: 30, weightage: 30, scoredMarks: 25.5 },
      { component: 'End-Semester Theory Exam', maxMarks: 50, weightage: 50, scoredMarks: 42 }
    ],
    studentGrade: {
      letterGrade: 'A',
      gradePoint: 8,
      totalPercentage: 84.5,
      remarks: 'Rigorous proof formulations and mathematical precision.',
      published: true
    }
  },
  {
    id: 'cs310',
    code: 'CS-310',
    name: 'Machine Learning & Statistical Systems',
    department: 'Computer Science & Engineering',
    semester: 5,
    credits: 4,
    category: 'Elective',
    color: '#10b981',
    instructor: {
      id: 'inst_arun',
      name: 'Dr. Arun Narang',
      title: 'Assistant Professor (AI Lab)',
      cabin: 'Alan Turing Block, Rm 401',
      email: 'arun.narang@campusos.edu',
      avatar: 'AN'
    },
    room: 'Room 204 (Turing Block)',
    attendance: {
      attended: 29,
      total: 32,
      percentage: 90.6,
      criteria: 75.0
    },
    description: 'Supervised & unsupervised learning, gradient descent optimization, regularization, SVMs, decision forests, neural backpropagation, and statistical evaluation metrics.',
    syllabusModules: [
      { unit: 1, title: 'Linear Models & Optimization', hours: 8, topics: ['Loss Formulations', 'Stochastic Gradient Descent', 'L1/L2 Regularization', 'Convexity'], status: 'completed' },
      { unit: 2, title: 'Tree Models & Ensembles', hours: 8, topics: ['Information Gain', 'Random Forests', 'Gradient Boosted Trees (XGBoost)'], status: 'completed' },
      { unit: 3, title: 'Deep Neural Networks', hours: 12, topics: ['Computational Graphs', 'Backpropagation Calculus', 'Batch Normalization', 'Adam Optimizer'], status: 'in-progress' }
    ],
    scheduleSlots: [
      { day: 'Tuesday', startTime: '02:00 PM', endTime: '04:00 PM', room: 'Lab 204', type: 'Lab' },
      { day: 'Wednesday', startTime: '02:00 PM', endTime: '03:00 PM', room: 'Room 204', type: 'Lecture' },
      { day: 'Friday', startTime: '11:15 AM', endTime: '12:15 PM', room: 'Room 204', type: 'Lecture' }
    ],
    driveMaterials: [
      { id: 'ml1', name: 'CS310_Backpropagation_Matrix_Calculus.pdf', type: 'pdf', size: '4.8 MB', date: 'Sep 08', downloads: 155 },
      { id: 'ml2', name: 'PyTorch_Vectorized_Training_Tutorial.ipynb', type: 'code', size: '2.1 MB', date: 'Sep 16', downloads: 178 }
    ],
    assignments: [
      { id: 'asg_ml1', title: 'Vectorized Neural Net from Scratch (NumPy)', dueDate: 'Sep 15', totalMarks: 30, status: 'graded', score: 29, weightage: '15%' },
      { id: 'asg_ml2', title: 'Transformer Attention Block Implementation', dueDate: 'Oct 15', totalMarks: 40, status: 'pending', weightage: '20%' }
    ],
    evaluationBreakdown: [
      { component: 'Continuous Assessment & Quizzes', maxMarks: 20, weightage: 20, scoredMarks: 19 },
      { component: 'Mid-Semester Examination', maxMarks: 30, weightage: 30, scoredMarks: 28 },
      { component: 'Practical Lab Experiments & Viva', maxMarks: 20, weightage: 20, scoredMarks: 20 },
      { component: 'End-Semester Theory Exam', maxMarks: 50, weightage: 30, scoredMarks: 46 }
    ],
    studentGrade: {
      letterGrade: 'O',
      gradePoint: 10,
      totalPercentage: 94.0,
      remarks: 'Exemplary code quality and mathematical intuition in gradient derivations.',
      published: true
    }
  }
];

// Master Weekly Timetable Grid
export interface TimetablePeriod {
  id: string;
  courseCode: string;
  courseName: string;
  instructor: string;
  room: string;
  type: 'Lecture' | 'Lab' | 'Tutorial';
  color: string;
  courseId: string;
}

export interface DaySchedule {
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
  slots: {
    time: string;
    period: TimetablePeriod | null;
    isBreak?: boolean;
    breakLabel?: string;
  }[];
}

export const MASTER_TIMETABLE: DaySchedule[] = [
  {
    day: 'Monday',
    slots: [
      { time: '09:00 AM – 10:00 AM', period: { id: 'm1', courseCode: 'CS-302', courseName: 'Database Management Systems', instructor: 'Prof. Rajesh Sharma', room: 'Room 204', type: 'Lecture', color: '#3b82f6', courseId: 'cs302' } },
      { time: '10:00 AM – 11:00 AM', period: null },
      { time: '11:00 AM – 11:15 AM', period: null, isBreak: true, breakLabel: 'Morning Break' },
      { time: '11:15 AM – 12:15 PM', period: { id: 'm3', courseCode: 'CS-306', courseName: 'Computer Networks & Protocols', instructor: 'Prof. Vikram Malhotra', room: 'Room 202', type: 'Lecture', color: '#8b5cf6', courseId: 'cs306' } },
      { time: '12:15 PM – 01:15 PM', period: null },
      { time: '01:15 PM – 02:00 PM', period: null, isBreak: true, breakLabel: 'Campus Lunch Interval' },
      { time: '02:00 PM – 03:30 PM', period: null },
      { time: '03:30 PM – 05:00 PM', period: null }
    ]
  },
  {
    day: 'Tuesday',
    slots: [
      { time: '09:00 AM – 10:00 AM', period: null },
      { time: '10:00 AM – 11:00 AM', period: { id: 't2', courseCode: 'CS-304', courseName: 'Operating Systems & Concurrency', instructor: 'Dr. Elena Vance', room: 'Room 304', type: 'Lecture', color: '#06b6d4', courseId: 'cs304' } },
      { time: '11:00 AM – 11:15 AM', period: null, isBreak: true, breakLabel: 'Morning Break' },
      { time: '11:15 AM – 12:15 PM', period: { id: 't3', courseCode: 'CS-308', courseName: 'Theory of Computation & Automata', instructor: 'Dr. Sunita Kulkarni', room: 'Room 101', type: 'Lecture', color: '#ec4899', courseId: 'cs308' } },
      { time: '12:15 PM – 01:15 PM', period: null },
      { time: '01:15 PM – 02:00 PM', period: null, isBreak: true, breakLabel: 'Campus Lunch Interval' },
      { time: '02:00 PM – 04:00 PM', period: { id: 't4', courseCode: 'CS-310', courseName: 'Machine Learning Practical Lab', instructor: 'Dr. Arun Narang', room: 'Lab 204', type: 'Lab', color: '#10b981', courseId: 'cs310' } },
      { time: '04:00 PM – 05:00 PM', period: null }
    ]
  },
  {
    day: 'Wednesday',
    slots: [
      { time: '09:00 AM – 10:00 AM', period: { id: 'w1', courseCode: 'CS-306', courseName: 'Computer Networks & Protocols', instructor: 'Prof. Vikram Malhotra', room: 'Room 202', type: 'Lecture', color: '#8b5cf6', courseId: 'cs306' } },
      { time: '10:00 AM – 11:00 AM', period: null },
      { time: '11:00 AM – 11:15 AM', period: null, isBreak: true, breakLabel: 'Morning Break' },
      { time: '11:15 AM – 12:15 PM', period: { id: 'w3', courseCode: 'CS-302', courseName: 'Database Management Systems', instructor: 'Prof. Rajesh Sharma', room: 'Room 204', type: 'Lecture', color: '#3b82f6', courseId: 'cs302' } },
      { time: '12:15 PM – 01:15 PM', period: null },
      { time: '01:15 PM – 02:00 PM', period: null, isBreak: true, breakLabel: 'Campus Lunch Interval' },
      { time: '02:00 PM – 03:00 PM', period: { id: 'w4', courseCode: 'CS-310', courseName: 'Machine Learning & Statistical Systems', instructor: 'Dr. Arun Narang', room: 'Room 204', type: 'Lecture', color: '#10b981', courseId: 'cs310' } },
      { time: '03:00 PM – 05:00 PM', period: null }
    ]
  },
  {
    day: 'Thursday',
    slots: [
      { time: '09:00 AM – 10:00 AM', period: { id: 'th1', courseCode: 'CS-308', courseName: 'Theory of Computation & Automata', instructor: 'Dr. Sunita Kulkarni', room: 'Room 101', type: 'Lecture', color: '#ec4899', courseId: 'cs308' } },
      { time: '10:00 AM – 11:00 AM', period: null },
      { time: '11:00 AM – 11:15 AM', period: null, isBreak: true, breakLabel: 'Morning Break' },
      { time: '11:15 AM – 12:15 PM', period: { id: 'th3', courseCode: 'CS-304', courseName: 'Operating Systems & Concurrency', instructor: 'Dr. Elena Vance', room: 'Room 304', type: 'Lecture', color: '#06b6d4', courseId: 'cs304' } },
      { time: '12:15 PM – 01:15 PM', period: null },
      { time: '01:15 PM – 02:00 PM', period: null, isBreak: true, breakLabel: 'Campus Lunch Interval' },
      { time: '02:00 PM – 04:00 PM', period: { id: 'th4', courseCode: 'CS-302', courseName: 'Database Systems Hands-on Lab', instructor: 'Prof. Rajesh Sharma', room: 'Lab 204', type: 'Lab', color: '#3b82f6', courseId: 'cs302' } },
      { time: '04:00 PM – 05:00 PM', period: null }
    ]
  },
  {
    day: 'Friday',
    slots: [
      { time: '09:00 AM – 10:00 AM', period: null },
      { time: '10:00 AM – 11:00 AM', period: { id: 'f2', courseCode: 'CS-306', courseName: 'Computer Networks & Protocols', instructor: 'Prof. Vikram Malhotra', room: 'Room 202', type: 'Lecture', color: '#8b5cf6', courseId: 'cs306' } },
      { time: '11:00 AM – 11:15 AM', period: null, isBreak: true, breakLabel: 'Morning Break' },
      { time: '11:15 AM – 12:15 PM', period: { id: 'f3', courseCode: 'CS-310', courseName: 'Machine Learning & Statistical Systems', instructor: 'Dr. Arun Narang', room: 'Room 204', type: 'Lecture', color: '#10b981', courseId: 'cs310' } },
      { time: '12:15 PM – 01:15 PM', period: null },
      { time: '01:15 PM – 02:00 PM', period: null, isBreak: true, breakLabel: 'Campus Lunch Interval' },
      { time: '02:00 PM – 04:00 PM', period: { id: 'f4', courseCode: 'CS-304', courseName: 'Systems & Kernel Programming Lab', instructor: 'Dr. Elena Vance', room: 'Lab 3B', type: 'Lab', color: '#06b6d4', courseId: 'cs304' } },
      { time: '04:00 PM – 05:00 PM', period: null }
    ]
  }
];

// Student Complete Academic History & Results Record (10-Point Scale)
export interface SemesterResult {
  semesterNumber: number;
  semesterName: string;
  academicYear: string;
  sgpa: number;
  creditsRegistered: number;
  creditsEarned: number;
  status: 'Completed' | 'Current';
  courses: {
    code: string;
    name: string;
    credits: number;
    internalMarks: number; // out of 40
    endSemMarks: number;   // out of 60
    totalMarks: number;    // out of 100
    letterGrade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'P' | 'F';
    gradePoint: number;
    status: 'Pass' | 'Backlog';
  }[];
}

export interface StudentAcademicProfile {
  studentName: string;
  rollNumber: string;
  enrollmentId: string;
  program: string;
  department: string;
  batch: string;
  currentSemester: number;
  cgpa: number;
  totalCreditsEarned: number;
  totalCreditsRequired: number;
  activeBacklogs: number;
  clearedBacklogs: number;
  semesters: SemesterResult[];
}

export const STUDENT_ACADEMIC_RECORD: StudentAcademicProfile = {
  studentName: 'Aarav Patel',
  rollNumber: '22CS084',
  enrollmentId: 'EN-2022-CSE-0084',
  program: 'Bachelor of Technology (B.Tech)',
  department: 'Computer Science & Engineering',
  batch: '2022 – 2026',
  currentSemester: 5,
  cgpa: 8.76,
  totalCreditsEarned: 88,
  totalCreditsRequired: 160,
  activeBacklogs: 0,
  clearedBacklogs: 0,
  semesters: [
    {
      semesterNumber: 1,
      semesterName: 'Autumn 2022',
      academicYear: '2022-2023',
      sgpa: 8.45,
      creditsRegistered: 20,
      creditsEarned: 20,
      status: 'Completed',
      courses: [
        { code: 'MA-101', name: 'Engineering Mathematics I (Calculus & Linear Algebra)', credits: 4, internalMarks: 34, endSemMarks: 51, totalMarks: 85, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'PH-101', name: 'Applied Physics & Electromagnetics', credits: 4, internalMarks: 32, endSemMarks: 48, totalMarks: 80, letterGrade: 'A', gradePoint: 8, status: 'Pass' },
        { code: 'CS-101', name: 'Introduction to Computer Programming (C/C++)', credits: 4, internalMarks: 38, endSemMarks: 54, totalMarks: 92, letterGrade: 'O', gradePoint: 10, status: 'Pass' },
        { code: 'EE-101', name: 'Basic Electrical & Electronics Engineering', credits: 4, internalMarks: 30, endSemMarks: 45, totalMarks: 75, letterGrade: 'B+', gradePoint: 7, status: 'Pass' },
        { code: 'CS-102', name: 'Computing & UNIX Laboratory', credits: 4, internalMarks: 36, endSemMarks: 52, totalMarks: 88, letterGrade: 'A+', gradePoint: 9, status: 'Pass' }
      ]
    },
    {
      semesterNumber: 2,
      semesterName: 'Spring 2023',
      academicYear: '2022-2023',
      sgpa: 8.60,
      creditsRegistered: 22,
      creditsEarned: 22,
      status: 'Completed',
      courses: [
        { code: 'MA-102', name: 'Engineering Mathematics II (Differential Equations & Vector)', credits: 4, internalMarks: 35, endSemMarks: 50, totalMarks: 85, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'CS-104', name: 'Data Structures & Algorithms', credits: 4, internalMarks: 39, endSemMarks: 55, totalMarks: 94, letterGrade: 'O', gradePoint: 10, status: 'Pass' },
        { code: 'CS-106', name: 'Digital Logic & Computer Organization', credits: 4, internalMarks: 31, endSemMarks: 49, totalMarks: 80, letterGrade: 'A', gradePoint: 8, status: 'Pass' },
        { code: 'CY-101', name: 'Engineering Chemistry & Materials', credits: 3, internalMarks: 30, endSemMarks: 44, totalMarks: 74, letterGrade: 'B+', gradePoint: 7, status: 'Pass' },
        { code: 'HS-101', name: 'Professional Communication & Ethics', credits: 3, internalMarks: 36, endSemMarks: 50, totalMarks: 86, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'CS-108', name: 'Data Structures Laboratory', credits: 4, internalMarks: 38, endSemMarks: 54, totalMarks: 92, letterGrade: 'O', gradePoint: 10, status: 'Pass' }
      ]
    },
    {
      semesterNumber: 3,
      semesterName: 'Autumn 2023',
      academicYear: '2023-2024',
      sgpa: 8.85,
      creditsRegistered: 24,
      creditsEarned: 24,
      status: 'Completed',
      courses: [
        { code: 'CS-201', name: 'Design & Analysis of Algorithms', credits: 4, internalMarks: 38, endSemMarks: 53, totalMarks: 91, letterGrade: 'O', gradePoint: 10, status: 'Pass' },
        { code: 'CS-203', name: 'Computer Architecture & Microprocessors', credits: 4, internalMarks: 33, endSemMarks: 51, totalMarks: 84, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'MA-201', name: 'Discrete Mathematical Structures & Graph Theory', credits: 4, internalMarks: 35, endSemMarks: 52, totalMarks: 87, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'CS-205', name: 'Object Oriented Programming with Java', credits: 4, internalMarks: 37, endSemMarks: 52, totalMarks: 89, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'HS-201', name: 'Economics for Engineers', credits: 4, internalMarks: 29, endSemMarks: 46, totalMarks: 75, letterGrade: 'B+', gradePoint: 7, status: 'Pass' },
        { code: 'CS-207', name: 'Algorithms & Architecture Lab', credits: 4, internalMarks: 39, endSemMarks: 56, totalMarks: 95, letterGrade: 'O', gradePoint: 10, status: 'Pass' }
      ]
    },
    {
      semesterNumber: 4,
      semesterName: 'Spring 2024',
      academicYear: '2023-2024',
      sgpa: 9.10,
      creditsRegistered: 22,
      creditsEarned: 22,
      status: 'Completed',
      courses: [
        { code: 'CS-202', name: 'Software Engineering Principles', credits: 4, internalMarks: 37, endSemMarks: 54, totalMarks: 91, letterGrade: 'O', gradePoint: 10, status: 'Pass' },
        { code: 'CS-204', name: 'Microcontroller Systems & Embedded Devices', credits: 4, internalMarks: 34, endSemMarks: 49, totalMarks: 83, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'MA-202', name: 'Probability, Random Variables & Statistics', credits: 4, internalMarks: 38, endSemMarks: 53, totalMarks: 91, letterGrade: 'O', gradePoint: 10, status: 'Pass' },
        { code: 'CS-206', name: 'Web Technology & Distributed Architectures', credits: 4, internalMarks: 39, endSemMarks: 56, totalMarks: 95, letterGrade: 'O', gradePoint: 10, status: 'Pass' },
        { code: 'CS-208', name: 'Embedded Systems Laboratory', credits: 3, internalMarks: 36, endSemMarks: 50, totalMarks: 86, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'PR-202', name: 'Comprehensive Engineering Design Project', credits: 3, internalMarks: 39, endSemMarks: 56, totalMarks: 95, letterGrade: 'O', gradePoint: 10, status: 'Pass' }
      ]
    },
    {
      semesterNumber: 5,
      semesterName: 'Autumn 2024 (Current)',
      academicYear: '2024-2025',
      sgpa: 8.89,
      creditsRegistered: 19,
      creditsEarned: 19,
      status: 'Current',
      courses: [
        { code: 'CS-302', name: 'Database Management Systems', credits: 4, internalMarks: 37, endSemMarks: 52, totalMarks: 89, letterGrade: 'A+', gradePoint: 9, status: 'Pass' },
        { code: 'CS-304', name: 'Operating Systems & Concurrency', credits: 4, internalMarks: 38, endSemMarks: 54, totalMarks: 92, letterGrade: 'O', gradePoint: 10, status: 'Pass' },
        { code: 'CS-306', name: 'Computer Networks & Protocols', credits: 4, internalMarks: 34, endSemMarks: 50, totalMarks: 84, letterGrade: 'A', gradePoint: 8, status: 'Pass' },
        { code: 'CS-308', name: 'Theory of Computation & Automata', credits: 3, internalMarks: 35, endSemMarks: 50, totalMarks: 85, letterGrade: 'A', gradePoint: 8, status: 'Pass' },
        { code: 'CS-310', name: 'Machine Learning & Statistical Systems', credits: 4, internalMarks: 39, endSemMarks: 55, totalMarks: 94, letterGrade: 'O', gradePoint: 10, status: 'Pass' }
      ]
    }
  ]
};

// Faculty Gradebook Roster for CS-302 DBMS
export interface StudentGradebookEntry {
  id: string;
  rollNumber: string;
  name: string;
  quiz1: number;       // Max 10
  assignment1: number; // Max 15
  midterm: number;     // Max 25
  labViva: number;     // Max 20
  endSem: number;      // Max 30
  total: number;       // Max 100
  letterGrade: 'O' | 'A+' | 'A' | 'B+' | 'B' | 'C' | 'F';
  status: 'Draft' | 'Published';
}

export const CS302_GRADEBOOK_STUDENTS: StudentGradebookEntry[] = [
  { id: 'st1', rollNumber: '22CS084', name: 'Aarav Patel', quiz1: 9.5, assignment1: 14.0, midterm: 23.5, labViva: 19.0, endSem: 27.5, total: 93.5, letterGrade: 'O', status: 'Published' },
  { id: 'st2', rollNumber: '22CS085', name: 'Ananya Sharma', quiz1: 8.5, assignment1: 13.5, midterm: 21.0, labViva: 18.0, endSem: 25.0, total: 86.0, letterGrade: 'A+', status: 'Published' },
  { id: 'st3', rollNumber: '22CS086', name: 'Devendra Rao', quiz1: 7.0, assignment1: 12.0, midterm: 18.5, labViva: 16.5, endSem: 22.0, total: 76.0, letterGrade: 'B+', status: 'Draft' },
  { id: 'st4', rollNumber: '22CS087', name: 'Ishita Sen', quiz1: 9.0, assignment1: 14.5, midterm: 22.5, labViva: 19.5, endSem: 26.5, total: 92.0, letterGrade: 'O', status: 'Published' },
  { id: 'st5', rollNumber: '22CS088', name: 'Kunal Verma', quiz1: 6.5, assignment1: 11.0, midterm: 17.0, labViva: 15.0, endSem: 20.5, total: 70.0, letterGrade: 'B', status: 'Draft' },
  { id: 'st6', rollNumber: '22CS089', name: 'Pooja Hegde', quiz1: 8.0, assignment1: 13.0, midterm: 20.0, labViva: 17.5, endSem: 24.5, total: 83.0, letterGrade: 'A', status: 'Draft' },
  { id: 'st7', rollNumber: '22CS090', name: 'Rohan Mehra', quiz1: 9.0, assignment1: 14.0, midterm: 22.0, labViva: 18.5, endSem: 26.0, total: 89.5, letterGrade: 'A+', status: 'Published' },
  { id: 'st8', rollNumber: '22CS091', name: 'Siddharth Roy', quiz1: 7.5, assignment1: 12.5, midterm: 19.0, labViva: 16.0, endSem: 23.0, total: 78.0, letterGrade: 'B+', status: 'Draft' }
];
