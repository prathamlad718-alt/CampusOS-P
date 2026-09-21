'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Clock,
  MapPin,
  Calendar,
  AlertTriangle,
  CheckCircle2,
  BookOpen,
  ArrowUpRight,
  Search,
  Bus,
  FolderLock,
  Wrench,
  Users,
  Bell,
  Sparkles,
  ChevronRight,
  TrendingUp,
  FileText,
  UploadCloud,
  CheckSquare2,
  Square
} from 'lucide-react';
import { motion } from 'framer-motion';

interface Task {
  id: string;
  title: string;
  due: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

const INITIAL_TASKS: Task[] = [
  { id: '1', title: 'Submit DBMS B-Tree indexing assignment', due: 'Today, 11:59 PM', completed: false, priority: 'high' },
  { id: '2', title: 'Review Chapter 4 slides on Virtual Memory', due: 'Tomorrow, 9:00 AM', completed: false, priority: 'medium' },
  { id: '3', title: 'Confirm Hackathon team members list', due: 'Wed, 5:00 PM', completed: true, priority: 'low' },
  { id: '4', title: 'Collect IEEE membership pass at Student Centre', due: 'Thursday', completed: false, priority: 'low' }
];

export function CommandCenter({ onOpenSearch }: { onOpenSearch?: () => void }) {
  const [tasks, setTasks] = useState<Task[]>(INITIAL_TASKS);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [currentDate, setCurrentDate] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }));
      setCurrentDate(now.toLocaleDateString([], { weekday: 'long', month: 'short', day: 'numeric', year: 'numeric' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleTask = (id: string) => {
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  return (
    <div className="space-y-8">
      {/* Top OS Broadcast & Quick Status */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono uppercase tracking-widest bg-tide/10 border border-tide/30 text-tide">
              <span className="w-2 h-2 rounded-full bg-tide animate-pulse" />
              Live Command Center
            </span>
            <span className="text-xs font-mono text-mist">
              Term Week 8 &bull; Fall Semester
            </span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-2 tracking-tight">
            What do you need to know right now?
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-surface border border-line rounded-xl px-4 py-2 text-right">
            <div className="text-xs font-mono text-mist uppercase tracking-wider">{currentDate || 'Today'}</div>
            <div className="text-xl font-mono font-semibold text-bone tracking-widest">{currentTime || '11:00:00 AM'}</div>
          </div>
          <button
            onClick={onOpenSearch}
            className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-ink-2 hover:bg-surface border border-line hover:border-tide/50 transition-all text-sm text-mist hover:text-bone group shadow-sm cursor-pointer"
          >
            <Search className="w-4 h-4 text-tide group-hover:scale-110 transition-transform" />
            <span className="font-medium hidden sm:inline">Universal Search</span>
            <kbd className="px-2 py-0.5 text-[10px] font-mono bg-ink border border-line rounded text-mist">⌘K</kbd>
          </button>
        </div>
      </div>

      {/* Campus Emergency / Live Alert Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-surface to-amber-500/5 border border-amber-500/30 rounded-2xl p-4 flex items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 border border-amber-500/30 shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-wider font-semibold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                Campus Alert
              </span>
              <span className="text-xs text-mist">12 mins ago</span>
            </div>
            <p className="text-sm text-bone font-medium mt-1">
              Electrical maintenance in Ramanujan Engineering Block C between 3:00 PM – 4:30 PM. Lab 204 relocated to Turing Block Lab 3B.
            </p>
          </div>
        </div>
        <Link
          href="/navigation"
          className="hidden md:flex items-center gap-1.5 text-xs font-medium text-amber-400 hover:underline shrink-0"
        >
          View alternate route <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* MAIN FOCUS DECK - 3 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* COLUMN 1: Next Class Radar */}
        <div className="glass-panel p-6 rounded-3xl border border-line-strong flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-tide/10 rounded-full blur-2xl pointer-events-none" />
          
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-tide flex items-center gap-2">
              <Clock className="w-3.5 h-3.5" /> Next Class &bull; In 18 Mins
            </span>
            <span className="text-[11px] font-mono text-emerald-400 bg-emerald-400/10 px-2.5 py-0.5 rounded-full border border-emerald-400/20">
              Confirmed
            </span>
          </div>

          <h3 className="text-2xl font-serif text-bone leading-tight">
            Database Management Systems
          </h3>
          <p className="text-sm font-mono text-mist mt-1">CS-302 &bull; Prof. Rajesh Sharma</p>

          <div className="my-6 space-y-3 bg-surface/60 border border-line rounded-2xl p-4">
            <div className="flex items-center justify-between text-sm">
              <span className="text-mist flex items-center gap-2">
                <Clock className="w-4 h-4 text-tide" /> Time Slot
              </span>
              <span className="text-bone font-medium">11:00 AM – 12:30 PM</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-mist flex items-center gap-2">
                <MapPin className="w-4 h-4 text-tide" /> Location
              </span>
              <span className="text-bone font-medium text-right">Room 204 &bull; Turing Block 2F</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-mist flex items-center gap-2">
                <FileText className="w-4 h-4 text-tide" /> Required
              </span>
              <span className="text-bone font-medium text-right">Laptop &bull; SQL Workbench</span>
            </div>
          </div>

          <div className="mt-auto grid grid-cols-2 gap-3 pt-2">
            <Link
              href="/navigation?destination=Room+204"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-ink-2 hover:bg-surface border border-line text-xs font-medium text-bone transition-colors"
            >
              <MapPin className="w-3.5 h-3.5 text-tide" /> Route to Room
            </Link>
            <Link
              href="/drive?subject=CS302"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-tide hover:bg-tide/90 text-xs font-medium text-white transition-colors"
            >
              <BookOpen className="w-3.5 h-3.5" /> Slides & Notes
            </Link>
          </div>
        </div>

        {/* COLUMN 2: Attendance Health Status */}
        <div className="glass-panel p-6 rounded-3xl border border-line-strong flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-mist flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-emerald-400" /> Attendance Health
            </span>
            <span className="text-xs font-mono font-medium text-emerald-400">
              Criteria: &ge; 75%
            </span>
          </div>

          <div className="flex items-baseline gap-3 mb-2">
            <span className="text-5xl font-mono font-bold text-bone tracking-tight">
              84.2%
            </span>
            <span className="text-xs font-medium text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded-full border border-emerald-400/20">
              Safe Standing
            </span>
          </div>
          <p className="text-xs text-mist mb-6">
            Total attended: 144 / 171 sessions this semester.
          </p>

          <div className="space-y-3.5 flex-1">
            {/* Subject 1 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-bone font-medium">CS-302: DBMS</span>
                <span className="font-mono text-emerald-400 font-semibold">91.4% (32/35)</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '91.4%' }} />
              </div>
            </div>

            {/* Subject 2 */}
            <div>
              <div className="flex justify-between text-xs mb-1">
                <span className="text-bone font-medium">CS-304: Distributed Systems</span>
                <span className="font-mono text-emerald-400 font-semibold">82.8% (29/35)</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-emerald-400 rounded-full" style={{ width: '82.8%' }} />
              </div>
            </div>

            {/* Subject 3 - WARNING */}
            <div className="bg-rose-500/10 border border-rose-500/20 p-2.5 rounded-xl">
              <div className="flex justify-between text-xs mb-1">
                <span className="text-rose-300 font-medium flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-rose-400" />
                  PH-102: Applied Physics
                </span>
                <span className="font-mono text-rose-400 font-bold">68.5% (24/35)</span>
              </div>
              <div className="h-1.5 bg-surface rounded-full overflow-hidden">
                <div className="h-full bg-rose-400 rounded-full" style={{ width: '68.5%' }} />
              </div>
              <p className="text-[11px] text-rose-300/90 mt-1.5 font-mono">
                ⚠️ Attend next 2 classes to hit 75% exam eligibility!
              </p>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-line flex justify-between items-center text-xs text-mist">
            <span>Next class attendance check-in: 11:05 AM</span>
            <Link href="/timeline" className="text-tide hover:underline font-medium">
              View Detailed Roster &rarr;
            </Link>
          </div>
        </div>

        {/* COLUMN 3: Upcoming Deadlines & Assignments */}
        <div className="glass-panel p-6 rounded-3xl border border-line-strong flex flex-col relative overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono uppercase tracking-widest text-mist flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-tide" /> Top 3 Due Soon
            </span>
            <Link href="/assignments" className="text-xs text-tide hover:underline">
              All (5) &rarr;
            </Link>
          </div>

          <div className="space-y-3.5 flex-1">
            {/* Assignment 1 */}
            <div className="p-3.5 rounded-2xl bg-surface border border-line hover:border-tide/40 transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-rose-400 font-bold uppercase tracking-wider bg-rose-400/10 px-2 py-0.5 rounded">
                    Due Today &bull; 11:59 PM
                  </span>
                  <h4 className="text-sm font-medium text-bone mt-1.5">
                    DBMS Lab Assignment 4: B-Tree Indexing
                  </h4>
                  <p className="text-xs text-mist mt-0.5">Submit code (.sql + pdf report)</p>
                </div>
                <Link
                  href="/assignments"
                  className="p-2 rounded-xl bg-tide/10 hover:bg-tide text-tide hover:text-white transition-colors"
                >
                  <UploadCloud className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Assignment 2 */}
            <div className="p-3.5 rounded-2xl bg-surface border border-line hover:border-line-strong transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider bg-amber-400/10 px-2 py-0.5 rounded">
                    Tomorrow &bull; 5:00 PM
                  </span>
                  <h4 className="text-sm font-medium text-bone mt-1.5">
                    Compiler Design Phase 2: Lexical Scanner
                  </h4>
                  <p className="text-xs text-mist mt-0.5">Team Submission &bull; Group 4</p>
                </div>
                <Link
                  href="/assignments"
                  className="p-2 rounded-xl bg-surface-raised hover:bg-surface text-mist hover:text-bone border border-line transition-colors"
                >
                  <UploadCloud className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Assignment 3 */}
            <div className="p-3.5 rounded-2xl bg-surface border border-line hover:border-line-strong transition-colors">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-mist font-semibold uppercase tracking-wider bg-ink px-2 py-0.5 rounded border border-line">
                    In 3 Days &bull; Friday
                  </span>
                  <h4 className="text-sm font-medium text-bone mt-1.5">
                    Machine Learning Term Paper Draft
                  </h4>
                  <p className="text-xs text-mist mt-0.5">Peer Review Round 1</p>
                </div>
                <Link
                  href="/assignments"
                  className="p-2 rounded-xl bg-surface-raised hover:bg-surface text-mist hover:text-bone border border-line transition-colors"
                >
                  <UploadCloud className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-line text-center">
            <Link
              href="/assignments"
              className="inline-flex items-center gap-1.5 text-xs text-bone hover:text-tide font-medium transition-colors"
            >
              Open Assignment Submission Hub <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>

      </div>

      {/* SECOND ROW: Today's Full Schedule vs Pending Tasks & Collaboration */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Today's Chronological Schedule Stream */}
        <div className="lg:col-span-2 glass-panel p-6 rounded-3xl border border-line-strong">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-mono uppercase tracking-widest text-tide">Timeline</span>
              <h3 className="text-xl font-serif text-bone mt-0.5">Today&apos;s Academic & Campus Schedule</h3>
            </div>
            <Link
              href="/timeline"
              className="text-xs font-medium text-tide hover:underline flex items-center gap-1"
            >
              Expand to Week / Month <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {/* Slot 1: Passed */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-surface/40 border border-line/40 opacity-60">
              <div className="w-20 text-xs font-mono text-mist text-right pt-0.5">
                09:00 AM
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/50 border-2 border-emerald-500 mt-1 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bone line-through">
                    CS-301: Analysis of Algorithms
                  </span>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded">
                    Attended &bull; Present
                  </span>
                </div>
                <p className="text-xs text-mist">Room 101 &bull; Prof. K. Menon</p>
              </div>
            </div>

            {/* Slot 2: ACTIVE / NEXT UP */}
            <div className="flex items-start gap-4 p-4 rounded-2xl bg-tide/10 border-2 border-tide shadow-[0_0_20px_rgba(70,183,255,0.1)]">
              <div className="w-20 text-xs font-mono text-tide font-bold text-right pt-0.5">
                11:00 AM
              </div>
              <div className="w-3.5 h-3.5 rounded-full bg-tide border-2 border-white mt-1 shrink-0 animate-ping" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-base font-semibold text-bone flex items-center gap-2">
                    CS-302: Database Management Systems
                    <span className="text-[10px] uppercase font-mono tracking-widest text-tide bg-tide/20 px-2 py-0.5 rounded font-bold">
                      Next Up
                    </span>
                  </span>
                  <span className="text-xs font-mono text-bone font-medium">11:00 – 12:30</span>
                </div>
                <p className="text-xs text-bone/80 mt-1">
                  Lab 204 &bull; Turing Block 2F &bull; B-Tree Indexing Hands-on
                </p>
              </div>
            </div>

            {/* Slot 3: Lunch & Club */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-surface border border-line">
              <div className="w-20 text-xs font-mono text-mist text-right pt-0.5">
                01:00 PM
              </div>
              <div className="w-3 h-3 rounded-full bg-line border-2 border-mist mt-1 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bone">
                    AI & Robotics Club Weekly Standup
                  </span>
                  <span className="text-[10px] font-mono text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">
                    Student Activity
                  </span>
                </div>
                <p className="text-xs text-mist">Student Activity Centre &bull; Innovation Lab</p>
              </div>
            </div>

            {/* Slot 4: Afternoon Lecture */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-surface border border-line">
              <div className="w-20 text-xs font-mono text-mist text-right pt-0.5">
                02:30 PM
              </div>
              <div className="w-3 h-3 rounded-full bg-line border-2 border-mist mt-1 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bone">
                    CS-304: Distributed Systems & Cloud
                  </span>
                  <span className="text-[10px] font-mono text-mist bg-ink px-2 py-0.5 rounded">
                    Lecture
                  </span>
                </div>
                <p className="text-xs text-mist">Room 304 &bull; Ramanujan Block 3F</p>
              </div>
            </div>

            {/* Slot 5: Hackathon Event */}
            <div className="flex items-start gap-4 p-3 rounded-2xl bg-surface border border-line">
              <div className="w-20 text-xs font-mono text-mist text-right pt-0.5">
                05:00 PM
              </div>
              <div className="w-3 h-3 rounded-full bg-tide/50 border-2 border-tide mt-1 shrink-0" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-bone">
                    Annual AWS University Hackathon: Opening Ceremony
                  </span>
                  <span className="text-[10px] font-mono text-tide bg-tide/10 px-2 py-0.5 rounded font-semibold">
                    Campus Event
                  </span>
                </div>
                <p className="text-xs text-mist">Main Auditorium &amp; Live Streamed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Tasks & Quick Campus Dock */}
        <div className="space-y-6">
          
          {/* Quick Tasks */}
          <div className="glass-panel p-6 rounded-3xl border border-line-strong">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-mist flex items-center gap-1.5">
                <CheckSquare2 className="w-4 h-4 text-tide" /> Action Items
              </span>
              <span className="text-xs font-mono text-mist">
                {tasks.filter(t => t.completed).length}/{tasks.length} Done
              </span>
            </div>

            <div className="space-y-2.5">
              {tasks.map(task => (
                <div
                  key={task.id}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-start gap-3 p-3 rounded-xl border transition-all cursor-pointer select-none ${
                    task.completed
                      ? 'bg-surface/30 border-line/30 opacity-50'
                      : 'bg-surface border-line hover:border-line-strong'
                  }`}
                >
                  <button className="mt-0.5 text-tide hover:scale-110 transition-transform">
                    {task.completed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Square className="w-4 h-4 text-mist" />
                    )}
                  </button>
                  <div className="flex-1 min-w-0">
                    <p className={`text-xs font-medium text-bone leading-snug ${task.completed ? 'line-through text-mist' : ''}`}>
                      {task.title}
                    </p>
                    <span className="text-[10px] font-mono text-mist mt-0.5 block">
                      {task.due}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Rapid Action Dock */}
          <div className="glass-panel p-6 rounded-3xl border border-line-strong">
            <span className="text-xs font-mono uppercase tracking-widest text-mist block mb-4">
              Campus OS Shortcuts
            </span>
            <div className="grid grid-cols-2 gap-3">
              <Link
                href="/navigation"
                className="p-3 rounded-2xl bg-surface border border-line hover:border-tide/40 transition-colors flex flex-col items-center text-center group"
              >
                <MapPin className="w-5 h-5 text-tide mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-bone">Campus Map</span>
                <span className="text-[10px] text-mist">Room Finder</span>
              </Link>
              <Link
                href="/transport"
                className="p-3 rounded-2xl bg-surface border border-line hover:border-tide/40 transition-colors flex flex-col items-center text-center group"
              >
                <Bus className="w-5 h-5 text-emerald-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-bone">Bus Fleet</span>
                <span className="text-[10px] text-mist">Live Routes</span>
              </Link>
              <Link
                href="/drive"
                className="p-3 rounded-2xl bg-surface border border-line hover:border-tide/40 transition-colors flex flex-col items-center text-center group"
              >
                <FolderLock className="w-5 h-5 text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-bone">Campus Drive</span>
                <span className="text-[10px] text-mist">Notes &amp; Labs</span>
              </Link>
              <Link
                href="/issues"
                className="p-3 rounded-2xl bg-surface border border-line hover:border-tide/40 transition-colors flex flex-col items-center text-center group"
              >
                <Wrench className="w-5 h-5 text-amber-400 mb-2 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-medium text-bone">Report Issue</span>
                <span className="text-[10px] text-mist">IT / Facilities</span>
              </Link>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
