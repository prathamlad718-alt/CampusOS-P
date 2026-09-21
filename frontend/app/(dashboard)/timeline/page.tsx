'use client';

import React, { useState } from 'react';
import {
  Clock,
  Calendar as CalendarIcon,
  BookOpen,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Filter
} from 'lucide-react';

interface TimelineItem {
  id: string;
  time: string;
  date: string;
  title: string;
  category: 'class' | 'assignment' | 'exam' | 'event';
  location: string;
  instructor?: string;
  status: 'completed' | 'in-progress' | 'upcoming';
  badge: string;
  details?: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  // Today
  {
    id: '1',
    time: '09:00 AM – 10:30 AM',
    date: 'Today',
    title: 'CS-301: Analysis & Design of Algorithms',
    category: 'class',
    location: 'Lecture Hall 101, Ramanujan Block',
    instructor: 'Prof. K. Menon',
    status: 'completed',
    badge: 'Lecture',
    details: 'Dynamic Programming: Knapsack & Longest Common Subsequence.'
  },
  {
    id: '2',
    time: '11:00 AM – 12:30 PM',
    date: 'Today',
    title: 'CS-302: Database Management Systems (Lab)',
    category: 'class',
    location: 'Lab 204, Alan Turing Block 2F',
    instructor: 'Prof. Rajesh Sharma',
    status: 'in-progress',
    badge: 'Lab Session',
    details: 'Hands-on indexing: B-Tree & Hash index optimization.'
  },
  {
    id: '3',
    time: '01:00 PM – 02:00 PM',
    date: 'Today',
    title: 'AI & Robotics Club Core Team Sync',
    category: 'event',
    location: 'Student Activity Centre (Innovation Hub)',
    status: 'upcoming',
    badge: 'Campus Event',
    details: 'Hardware roster review for upcoming Inter-College Autonomous Drone Showcase.'
  },
  {
    id: '4',
    time: '11:59 PM',
    date: 'Today',
    title: 'DBMS Lab Assignment 4 Submission Deadline',
    category: 'assignment',
    location: 'Campus OS Submission Portal',
    status: 'upcoming',
    badge: 'Due Today',
    details: 'Submit code archive (.sql + Python scripts) and benchmark evaluation PDF.'
  },

  // This Week
  {
    id: '5',
    time: 'Tomorrow, 10:00 AM',
    date: 'This Week',
    title: 'Compiler Design Phase 2: Parser & Lexer Review',
    category: 'assignment',
    location: 'Lab 3B, Turing Block',
    instructor: 'Dr. Anita Desai',
    status: 'upcoming',
    badge: 'Milestone',
    details: 'Team presentations for Group 4. Bring printed grammar specifications.'
  },
  {
    id: '6',
    time: 'Wednesday, 02:00 PM',
    date: 'This Week',
    title: 'Guest Lecture: Cloud Infrastructure at Scale',
    category: 'event',
    location: 'Main Auditorium & Live Stream',
    instructor: 'AWS Solutions Architecture Team',
    status: 'upcoming',
    badge: 'Special Lecture',
    details: 'Serverless event streaming with Amazon Kinesis & Lambda.'
  },
  {
    id: '7',
    time: 'Thursday, 09:00 AM',
    date: 'This Week',
    title: 'Operating Systems Mid-Semester Quiz',
    category: 'exam',
    location: 'Exam Hall B, Central Academic Block',
    instructor: 'Dr. Elena Vance',
    status: 'upcoming',
    badge: 'Examination',
    details: 'Weightage: 15%. Topics: Process Scheduling, Synchronization & Deadlocks.'
  },

  // This Month
  {
    id: '8',
    time: 'Next Week, Oct 2nd',
    date: 'This Month',
    title: 'Annual Campus Hackathon: 36-Hour Sprint',
    category: 'event',
    location: 'Central Library & Innovation Arena',
    status: 'upcoming',
    badge: 'Hackathon',
    details: 'Campus-wide hackathon with $5,000 in sponsor tracks & seed grants.'
  },
  {
    id: '9',
    time: 'Oct 15th – Oct 22nd',
    date: 'This Month',
    title: 'Mid-Term Examination Window',
    category: 'exam',
    location: 'Campus Examination Centers',
    status: 'upcoming',
    badge: 'Official Exam',
    details: 'Full centralized timetable published in Circulars on Campus Drive.'
  }
];

export default function TimelinePage() {
  const [viewMode, setViewMode] = useState<'today' | 'week' | 'month'>('today');
  const [categoryFilter, setCategoryFilter] = useState<'all' | 'class' | 'assignment' | 'exam' | 'event'>('all');

  const filteredItems = TIMELINE_DATA.filter(item => {
    if (viewMode === 'today' && item.date !== 'Today') return false;
    if (viewMode === 'week' && (item.date !== 'Today' && item.date !== 'This Week')) return false;
    if (categoryFilter !== 'all' && item.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Academic OS</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Personal Academic Timeline
          </h1>
          <p className="text-sm text-mist mt-1">
            Classes &bull; Assignments &bull; Exams &bull; Submissions &bull; Events unified into your personal campus rhythm.
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center p-1 bg-surface border border-line rounded-2xl shrink-0">
          <button
            onClick={() => setViewMode('today')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === 'today' ? 'bg-tide text-white font-bold shadow-md' : 'text-mist hover:text-bone'
            }`}
          >
            Today
          </button>
          <button
            onClick={() => setViewMode('week')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === 'week' ? 'bg-tide text-white font-bold shadow-md' : 'text-mist hover:text-bone'
            }`}
          >
            This Week
          </button>
          <button
            onClick={() => setViewMode('month')}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all ${
              viewMode === 'month' ? 'bg-tide text-white font-bold shadow-md' : 'text-mist hover:text-bone'
            }`}
          >
            This Month
          </button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        <span className="text-mist font-mono flex items-center gap-1.5 mr-2">
          <Filter className="w-3.5 h-3.5" /> Filter:
        </span>
        {(['all', 'class', 'assignment', 'exam', 'event'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setCategoryFilter(cat)}
            className={`px-3 py-1.5 rounded-full capitalize font-medium transition-colors ${
              categoryFilter === cat
                ? 'bg-bone text-ink font-semibold'
                : 'bg-surface border border-line text-mist hover:text-bone'
            }`}
          >
            {cat === 'all' ? 'All Activities' : cat + 's'}
          </button>
        ))}
      </div>

      {/* Stream */}
      <div className="relative border-l-2 border-line/60 ml-4 sm:ml-8 pl-6 sm:pl-10 space-y-8">
        {filteredItems.length === 0 ? (
          <div className="glass-panel p-8 rounded-3xl border border-line text-center">
            <p className="text-base text-bone font-medium">No items scheduled for this period.</p>
            <p className="text-xs text-mist mt-1">Try switching to &quot;This Week&quot; or resetting your category filter.</p>
          </div>
        ) : (
          filteredItems.map(item => {
            const isCompleted = item.status === 'completed';
            const isInProgress = item.status === 'in-progress';

            return (
              <div key={item.id} className="relative group">
                {/* Timeline node icon */}
                <div className={`absolute -left-[31px] sm:-left-[47px] top-1 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-transform group-hover:scale-110 ${
                  isCompleted 
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400'
                    : isInProgress
                    ? 'bg-tide border-white text-white shadow-[0_0_15px_rgba(70,183,255,0.8)] animate-pulse'
                    : 'bg-ink-2 border-line text-mist'
                }`}>
                  {isCompleted ? (
                    <CheckCircle2 className="w-3.5 h-3.5" />
                  ) : isInProgress ? (
                    <Clock className="w-3.5 h-3.5" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-mist" />
                  )}
                </div>

                {/* Event Card */}
                <div className={`glass-panel p-5 sm:p-6 rounded-3xl border transition-all ${
                  isInProgress
                    ? 'border-tide/50 shadow-[0_0_30px_rgba(70,183,255,0.08)] bg-surface/80'
                    : 'border-line hover:border-line-strong'
                } ${isCompleted ? 'opacity-65' : ''}`}>
                  
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono font-bold text-tide">
                        {item.time}
                      </span>
                      <span className="text-xs font-mono text-mist">&bull; {item.date}</span>
                    </div>

                    <span className={`self-start sm:self-auto text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold ${
                      item.category === 'exam'
                        ? 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                        : item.category === 'assignment'
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                        : item.category === 'event'
                        ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20'
                        : 'bg-surface border border-line text-tide'
                    }`}>
                      {item.badge}
                    </span>
                  </div>

                  <h3 className={`text-lg sm:text-xl font-serif text-bone ${isCompleted ? 'line-through' : ''}`}>
                    {item.title}
                  </h3>

                  {item.instructor && (
                    <p className="text-xs font-mono text-mist mt-0.5">{item.instructor}</p>
                  )}

                  {item.details && (
                    <p className="text-sm text-bone/90 mt-2 bg-surface/40 p-3 rounded-xl border border-line/40">
                      {item.details}
                    </p>
                  )}

                  <div className="mt-4 pt-3 border-t border-line/60 flex flex-wrap items-center justify-between gap-3 text-xs text-mist">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-tide" />
                      {item.location}
                    </span>

                    {item.category === 'assignment' && (
                      <a href="/assignments" className="text-tide hover:underline font-medium">
                        Go to Submission &rarr;
                      </a>
                    )}
                    {item.category === 'class' && (
                      <a href={`/navigation?destination=${encodeURIComponent(item.location)}`} className="text-tide hover:underline font-medium">
                        Open Room Route &rarr;
                      </a>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
