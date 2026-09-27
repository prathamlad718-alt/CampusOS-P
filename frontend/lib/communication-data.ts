export interface NotificationItem {
  id: string;
  category: 'academic' | 'attendance' | 'assignment' | 'booking' | 'transport' | 'maintenance' | 'system';
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  actionLabel: string;
  actionUrl: string;
  sender?: string;
}

export interface AnnouncementItem {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: 'Academic' | 'Administrative' | 'Placements' | 'Examination' | 'Campus Life';
  priority: 'Normal' | 'Important' | 'Urgent' | 'Emergency';
  author: {
    name: string;
    title: string;
    department: string;
    verified: boolean;
  };
  date: string;
  scope: {
    target: 'Campus-Wide' | 'Department' | 'Semester' | 'Faculty Only';
    department?: string;
    semester?: number;
  };
  attachments?: {
    name: string;
    size: string;
    url: string;
  }[];
  pinned?: boolean;
}

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif_1',
    category: 'attendance',
    title: 'Attendance Alert: PH-102 Dropped to 68.5%',
    message: 'Your Applied Physics attendance has fallen below the mandatory 75% threshold. You must attend the next 2 consecutive lectures to restore examination eligibility.',
    timestamp: '15 mins ago',
    read: false,
    priority: 'urgent',
    actionLabel: 'View Attendance Breakdown',
    actionUrl: '/academics',
    sender: 'Academic Monitoring Cell'
  },
  {
    id: 'notif_2',
    category: 'assignment',
    title: 'Coursework Deadline: CS-302 Assignment 2',
    message: 'Query Optimization & EXPLAIN ANALYZE problem set is due tonight at 11:59 PM. 15% course weightage.',
    timestamp: '42 mins ago',
    read: false,
    priority: 'high',
    actionLabel: 'Submit Assignment File',
    actionUrl: '/assignments',
    sender: 'Prof. Rajesh Sharma'
  },
  {
    id: 'notif_3',
    category: 'academic',
    title: 'Midterm Evaluation Released: CS-304 OS & Concurrency',
    message: 'Dr. Elena Vance has finalized and published the continuous assessment scores and letter grades to your academic transcript.',
    timestamp: '2 hours ago',
    read: false,
    priority: 'normal',
    actionLabel: 'Inspect Transcript & Grade',
    actionUrl: '/courses/cs304',
    sender: 'Dept of Computer Science'
  },
  {
    id: 'notif_4',
    category: 'booking',
    title: 'Gate Pass Active: Library Silent Study Pod #A-4',
    message: 'Your reservation for Tagore Central Library Pod #A-4 is active for the 02:00 PM – 04:00 PM session. Scan your gate pass at the entrance.',
    timestamp: '3 hours ago',
    read: false,
    priority: 'high',
    actionLabel: 'Open Digital QR Pass',
    actionUrl: '/booking',
    sender: 'Central Library Estate'
  },
  {
    id: 'notif_5',
    category: 'transport',
    title: 'Transit Advisory: Bus Route #2 Delayed 12 Minutes',
    message: 'Due to municipal bridge repairs near Ring Road, Route #2 arriving at Bay 4 will depart at 05:42 PM instead of 05:30 PM.',
    timestamp: '4 hours ago',
    read: true,
    priority: 'normal',
    actionLabel: 'Track Bus Fleet Telemetry',
    actionUrl: '/transport',
    sender: 'Mobility & Fleet Operations'
  },
  {
    id: 'notif_6',
    category: 'maintenance',
    title: 'Work Order Resolved: Ticket #104 (Lab 204 Projector)',
    message: 'Facilities maintenance has replaced the HDMI controller and optical lamp in Systems Lab 204. The workstation cluster is fully restored.',
    timestamp: 'Yesterday',
    read: true,
    priority: 'low',
    actionLabel: 'Inspect Work Order',
    actionUrl: '/issues',
    sender: 'Campus Estate & Maintenance'
  },
  {
    id: 'notif_7',
    category: 'system',
    title: 'Security Alert: New Session Authorized',
    message: 'A successful login was registered from Chrome on Windows 11 (IP: 192.168.89.113).',
    timestamp: 'Yesterday',
    read: true,
    priority: 'low',
    actionLabel: 'Review Security Settings',
    actionUrl: '/settings',
    sender: 'CampusOS Authentication Guard'
  }
];

export const INITIAL_ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: 'ann_1',
    title: 'Urgent Advisory: Mid-Semester Examination Schedule Rescheduled',
    summary: 'Mid-term examinations originally scheduled for Oct 12–16 are rescheduled to Oct 19–23 due to institutional accreditation inspections.',
    content: 'Following the executive directive of the Academic Council and the National Board of Accreditation (NBA) peer-review visit, all mid-semester theory and practical examinations for B.Tech Semesters 3, 5, and 7 are hereby postponed by one academic week.\n\nAll instructional laboratories and lecture hours will continue per the regular weekly timetable during Oct 12–16. Revised room allotments, seating matrices, and supervisor rosters will be published on the Examination Center portal by Oct 05, 2024.',
    category: 'Examination',
    priority: 'Urgent',
    author: {
      name: 'Dr. K. S. Ramanathan',
      title: 'Controller of Examinations',
      department: 'Office of Academic Governance',
      verified: true
    },
    date: 'Sep 26, 2024',
    scope: {
      target: 'Campus-Wide'
    },
    attachments: [
      { name: 'Revised_MidSem_Schedule_Autumn2024.pdf', size: '2.4 MB', url: '#' },
      { name: 'Academic_Council_Resolution_408.pdf', size: '1.1 MB', url: '#' }
    ],
    pinned: true
  },
  {
    id: 'ann_2',
    title: 'Severe Weather Warning: Evening Transport Bay Schedule Shift',
    summary: 'Heavy precipitation advisory issued by state meteorological centre. Final campus bus fleet departures moved forward to 06:15 PM.',
    content: 'In anticipation of heavy waterlogging along arterial city corridors, all outdoor sports activities and late-evening library study pod reservations beyond 07:00 PM stand suspended for today. University transit fleet bays will operate continuous shuttle departures starting at 04:30 PM with the final batch departing at 06:15 PM sharp.',
    category: 'Administrative',
    priority: 'Emergency',
    author: {
      name: 'Col. Sanjeev Dewan (Retd.)',
      title: 'Chief Security Officer & Registrar (Admin)',
      department: 'Campus Safety & Estate Administration',
      verified: true
    },
    date: 'Sep 25, 2024',
    scope: {
      target: 'Campus-Wide'
    },
    pinned: true
  },
  {
    id: 'ann_3',
    title: 'Google & Microsoft Autumn Placement Drive: Pre-Registration Open',
    summary: 'Tier-1 software engineering and systems infrastructure campus recruitment rounds commence for pre-final and final year cohorts.',
    content: 'The Training & Placement Cell (T&P) invites eligible candidates from CSE, IT, and ECE with CGPA >= 7.50 and zero active backlogs to submit verified resumes. Online coding assessments in Data Structures, Algorithms, and System Concurrency will take place in Turing Labs 204 & 3B on Oct 08, 2024.',
    category: 'Placements',
    priority: 'Important',
    author: {
      name: 'Prof. Ananya Mukherjee',
      title: 'Head of Training & Corporate Placement',
      department: 'Centre for Career Advancement',
      verified: true
    },
    date: 'Sep 24, 2024',
    scope: {
      target: 'Semester',
      semester: 5
    },
    attachments: [
      { name: 'Autumn_Placement_Eligibility_Matrix.pdf', size: '3.8 MB', url: '#' }
    ]
  },
  {
    id: 'ann_4',
    title: 'Nvidia GPU Cluster Access for Machine Learning Projects',
    summary: 'High-performance computing cluster (8x A100 80GB) now open for student research and final-year capstone engineering projects.',
    content: 'The Artificial Intelligence & High-Performance Computing Research Cell has provisioned access tokens for students enrolled in CS-310 (Machine Learning) and allied research groups. JupyterLab environments and Slurm job queue credentials can be requested through your course instructor.',
    category: 'Academic',
    priority: 'Normal',
    author: {
      name: 'Dr. Arun Narang',
      title: 'Coordinator, Advanced Computing Cluster',
      department: 'Department of Computer Science',
      verified: true
    },
    date: 'Sep 22, 2024',
    scope: {
      target: 'Department',
      department: 'Computer Science & Engineering'
    }
  }
];
