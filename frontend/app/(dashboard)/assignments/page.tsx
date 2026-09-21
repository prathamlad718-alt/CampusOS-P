'use client';

import React, { useState } from 'react';
import {
  BookOpen,
  Calendar,
  Clock,
  FileText,
  UploadCloud,
  CheckCircle2,
  AlertTriangle,
  Download,
  MessageSquare,
  Award,
  ChevronRight,
  Filter
} from 'lucide-react';

interface Assignment {
  id: string;
  course: string;
  title: string;
  instructor: string;
  deadline: string;
  dueCountdown: string;
  status: 'pending' | 'submitted' | 'graded';
  grade?: string;
  submissionDate?: string;
  description: string;
  files: { name: string; size: string }[];
  feedback?: string;
}

const INITIAL_ASSIGNMENTS: Assignment[] = [
  {
    id: 'a1',
    course: 'CS-302: Database Management Systems',
    title: 'Lab Assignment 4: B-Tree Indexing Engine',
    instructor: 'Prof. Rajesh Sharma',
    deadline: 'Today, September 22, 11:59 PM',
    dueCountdown: '5 hours remaining',
    status: 'pending',
    description: 'Implement an in-memory B-Tree index structure in C++ or Python supporting insert, delete, and range scan queries. Include a 2-page benchmark comparison against hash indexing.',
    files: [
      { name: 'btree_specification_v2.pdf', size: '1.4 MB' },
      { name: 'test_dataset_100k.csv', size: '8.2 MB' }
    ]
  },
  {
    id: 'a2',
    course: 'CS-305: Compiler Design',
    title: 'Phase 2: Lexical Scanner & AST Generator',
    instructor: 'Dr. Anita Desai',
    deadline: 'Tomorrow, September 23, 5:00 PM',
    dueCountdown: '1 day remaining',
    status: 'pending',
    description: 'Construct a Flex/Bison scanner capable of tokenizing the C-Minus language syntax. Must produce concrete abstract syntax tree visualizations in JSON format.',
    files: [
      { name: 'cminus_grammar_spec.pdf', size: '640 KB' }
    ]
  },
  {
    id: 'a3',
    course: 'CS-304: Distributed Systems',
    title: 'Lab 2: Raft Consensus Protocol Simulation',
    instructor: 'Dr. Elena Vance',
    deadline: 'Friday, September 25, 11:59 PM',
    dueCountdown: '3 days remaining',
    status: 'pending',
    description: 'Simulate leader election and heartbeat log replication across 5 simulated nodes with network partitions.',
    files: [
      { name: 'raft_handout.pdf', size: '2.1 MB' }
    ]
  },
  {
    id: 'a4',
    course: 'CS-301: Analysis of Algorithms',
    title: 'Problem Set 3: Network Flow & Maximum Bipartite Matching',
    instructor: 'Prof. K. Menon',
    deadline: 'September 18, 11:59 PM',
    dueCountdown: 'Submitted',
    status: 'graded',
    grade: '96 / 100 (Grade A+)',
    submissionDate: 'Submitted on-time &bull; Sep 18, 9:30 PM',
    description: 'Ford-Fulkerson augmentation algorithms applied to university course allocation problem.',
    files: [
      { name: 'ps3_solutions.pdf', size: '880 KB' }
    ],
    feedback: 'Outstanding mathematical rigor on Proof 2. Your reduction to bipartite matching was exceptionally clean.'
  },
  {
    id: 'a5',
    course: 'HS-201: Technical Writing & Ethics',
    title: 'Ethical Implications of Autonomous AI on Campus',
    instructor: 'Dr. Marcus Brody',
    deadline: 'September 15, 5:00 PM',
    dueCountdown: 'Submitted',
    status: 'submitted',
    submissionDate: 'Submitted on-time &bull; Sep 15, 3:12 PM',
    description: '1,500-word critical evaluation of algorithmic decision-making in university admissions and grading.',
    files: [
      { name: 'essay_guidelines.pdf', size: '420 KB' }
    ],
    feedback: 'Evaluation in progress by teaching assistants.'
  }
];

export default function AssignmentsPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'submitted' | 'graded'>('all');
  const [assignments, setAssignments] = useState<Assignment[]>(INITIAL_ASSIGNMENTS);
  const [activeSubmissionId, setActiveSubmissionId] = useState<string | null>(null);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);

  const filtered = assignments.filter(a => {
    if (filter === 'pending') return a.status === 'pending';
    if (filter === 'submitted') return a.status === 'submitted';
    if (filter === 'graded') return a.status === 'graded';
    return true;
  });

  const handleSimulateSubmit = (id: string) => {
    setAssignments(prev => prev.map(a => {
      if (a.id === id) {
        return {
          ...a,
          status: 'submitted',
          dueCountdown: 'Submitted On-Time',
          submissionDate: 'Submitted just now &bull; ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
      }
      return a;
    }));
    setActiveSubmissionId(null);
    setSubmittedMessage('Assignment successfully submitted on-time to Professor Roster!');
    setTimeout(() => setSubmittedMessage(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Coursework</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Assignments &amp; Deadlines
          </h1>
          <p className="text-sm text-mist mt-1">
            Track problem sets, submit deliverables, and review faculty grading rubrics.
          </p>
        </div>

        {submittedMessage && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4" /> {submittedMessage}
          </div>
        )}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-line pb-2">
        <button
          onClick={() => setFilter('all')}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
            filter === 'all' ? 'bg-surface text-tide border border-line-strong font-bold' : 'text-mist hover:text-bone'
          }`}
        >
          All ({assignments.length})
        </button>
        <button
          onClick={() => setFilter('pending')}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
            filter === 'pending' ? 'bg-surface text-tide border border-line-strong font-bold' : 'text-mist hover:text-bone'
          }`}
        >
          Pending Submission ({assignments.filter(a => a.status === 'pending').length})
        </button>
        <button
          onClick={() => setFilter('submitted')}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
            filter === 'submitted' ? 'bg-surface text-tide border border-line-strong font-bold' : 'text-mist hover:text-bone'
          }`}
        >
          Submitted ({assignments.filter(a => a.status === 'submitted').length})
        </button>
        <button
          onClick={() => setFilter('graded')}
          className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
            filter === 'graded' ? 'bg-surface text-tide border border-line-strong font-bold' : 'text-mist hover:text-bone'
          }`}
        >
          Graded &amp; Feedback ({assignments.filter(a => a.status === 'graded').length})
        </button>
      </div>

      {/* Assignment Cards */}
      <div className="space-y-6">
        {filtered.map(assignment => {
          const isPending = assignment.status === 'pending';
          const isGraded = assignment.status === 'graded';

          return (
            <div
              key={assignment.id}
              className={`glass-panel p-6 sm:p-8 rounded-3xl border transition-all ${
                isPending && assignment.dueCountdown.includes('hour')
                  ? 'border-rose-500/40 shadow-[0_0_25px_rgba(244,63,94,0.06)]'
                  : 'border-line hover:border-line-strong'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-mono text-tide font-semibold">
                      {assignment.course}
                    </span>
                    <span className="text-xs text-mist">&bull; {assignment.instructor}</span>
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif text-bone">
                    {assignment.title}
                  </h3>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  <span className={`text-xs font-mono px-3 py-1 rounded-full font-bold uppercase tracking-wider border ${
                    assignment.status === 'pending'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : assignment.status === 'graded'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                  }`}>
                    {assignment.dueCountdown}
                  </span>
                </div>
              </div>

              <p className="text-sm text-bone/90 mt-4 leading-relaxed max-w-4xl">
                {assignment.description}
              </p>

              {/* Attachments from teacher */}
              <div className="mt-6 pt-4 border-t border-line/60">
                <span className="text-xs font-mono uppercase tracking-widest text-mist block mb-3">
                  Instructor Attachments
                </span>
                <div className="flex flex-wrap gap-3">
                  {assignment.files.map((file, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-surface border border-line text-xs text-bone hover:border-tide/40 transition-colors cursor-pointer"
                    >
                      <FileText className="w-4 h-4 text-tide" />
                      <span>{file.name}</span>
                      <span className="text-mist font-mono text-[10px]">({file.size})</span>
                      <Download className="w-3.5 h-3.5 text-mist ml-1 hover:text-bone" />
                    </div>
                  ))}
                </div>
              </div>

              {/* Graded Feedback Box */}
              {isGraded && (
                <div className="mt-6 p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                      <Award className="w-4 h-4" /> Grade Awarded: {assignment.grade}
                    </div>
                    <span className="text-xs font-mono text-mist">{assignment.submissionDate}</span>
                  </div>
                  <p className="text-xs text-bone/90 italic">
                    &ldquo;{assignment.feedback}&rdquo;
                  </p>
                </div>
              )}

              {/* Action Bar */}
              <div className="mt-6 pt-4 border-t border-line/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="text-xs font-mono text-mist flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5" />
                  Deadline: <span className="text-bone">{assignment.deadline}</span>
                </div>

                {isPending ? (
                  <button
                    onClick={() => handleSimulateSubmit(assignment.id)}
                    className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-lg shadow-tide/20 cursor-pointer"
                  >
                    <UploadCloud className="w-4 h-4" /> Submit Work Files
                  </button>
                ) : (
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
                    <CheckCircle2 className="w-4 h-4" /> Verified On-Time Submission
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
