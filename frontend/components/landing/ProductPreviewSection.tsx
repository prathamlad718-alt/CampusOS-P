'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  BookOpen,
  GraduationCap,
  Armchair,
  BellRing,
  ArrowRight,
  ExternalLink,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  Award
} from 'lucide-react';

const TABS = [
  { id: 'timetable', label: 'Weekly Timetable', icon: Calendar },
  { id: 'courses', label: 'Courses & Syllabus', icon: BookOpen },
  { id: 'transcripts', label: '10.0 Transcripts', icon: GraduationCap },
  { id: 'booking', label: 'Seat Reservation', icon: Armchair },
  { id: 'bulletins', label: 'Actionable Alerts', icon: BellRing }
];

export function ProductPreviewSection() {
  const [activeTab, setActiveTab] = useState('timetable');

  return (
    <section className="relative w-full py-28 px-6 bg-ink border-t border-line/60 overflow-hidden" id="system-preview">
      {/* Background Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Operational Workspace</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-serif text-bone tracking-tight">
            Step inside Campus OS
          </h2>
          <p className="text-sm sm:text-base text-mist font-light mt-3">
            Switch between core subsystem consoles to experience how students, faculty, and administrators orchestrate university life.
          </p>
        </motion.div>

        {/* Product UI Window Frame */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto rounded-2xl border border-line-strong bg-ink-2 shadow-2xl overflow-hidden shadow-blue-500/5"
        >
          {/* Mac-style title bar */}
          <div className="h-11 border-b border-line bg-ink/70 flex items-center justify-between px-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <span className="ml-3 text-[11px] font-mono text-mist">
                CampusOS Desktop Engine &bull; https://campus.edu/workspace
              </span>
            </div>
            <div className="flex items-center gap-2 text-[10px] font-mono text-emerald-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Zero Clash Telemetry Active</span>
            </div>
          </div>

          {/* Subsystem Navigation Bar */}
          <div className="flex items-center border-b border-line bg-ink/50 px-4 overflow-x-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-3 text-xs font-mono uppercase tracking-wider whitespace-nowrap transition-colors border-b-2 ${
                    isActive
                      ? 'border-blue-500 text-bone bg-blue-500/10 font-medium'
                      : 'border-transparent text-mist hover:text-bone hover:bg-surface-raised/40'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-mist'}`} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Interactive Subsystem Body */}
          <div className="p-6 sm:p-8 min-h-[460px] bg-ink-2/60">
            <AnimatePresence mode="wait">
              
              {/* TAB 1: TIMETABLE */}
              {activeTab === 'timetable' && (
                <motion.div
                  key="timetable"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl text-bone">Monday Master Schedule</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          Semester 6 CSE
                        </span>
                      </div>
                      <p className="text-xs text-mist font-mono mt-0.5">
                        5 Periods Scheduled &bull; 0 Room Conflicts Detected
                      </p>
                    </div>
                    <Link
                      href="/timetable"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300"
                    >
                      <span>Open Full Timetable Engine</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {[
                      { time: "09:00 - 09:55", code: "CS302", name: "Database Management Systems", room: "Hall B-201", instructor: "Dr. Elena Rostova", active: false, type: "Lecture" },
                      { time: "10:15 - 11:10", code: "CS301", name: "Operating Systems Principles", room: "Hall B-204", instructor: "Dr. Alistair Ross", active: true, type: "Active Now" },
                      { time: "11:20 - 12:15", code: "CS304", name: "Design & Analysis of Algorithms", room: "Hall A-102", instructor: "Prof. Sarah Miller", active: false, type: "Lecture" },
                      { time: "13:30 - 15:30", code: "CS301-L", name: "UNIX Kernel Lab Workstation", room: "Advanced Lab 3", instructor: "Er. K. Verma", active: false, type: "Hands-on Lab" }
                    ].map((slot) => (
                      <div
                        key={slot.time}
                        className={`p-4 rounded-xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                          slot.active
                            ? 'border-blue-500 bg-blue-600/10 shadow-lg shadow-blue-500/5'
                            : 'border-line/60 bg-ink/40'
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div className={`font-mono text-xs px-2.5 py-1 rounded ${
                            slot.active ? 'bg-blue-600 text-white font-bold' : 'bg-surface-raised text-mist'
                          }`}>
                            {slot.time}
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-medium text-sm text-bone">{slot.name}</span>
                              <span className="text-xs font-mono text-blue-400">({slot.code})</span>
                            </div>
                            <div className="text-xs text-mist font-light">
                              {slot.room} &bull; {slot.instructor}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-wider ${
                            slot.active ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-surface-raised text-mist'
                          }`}>
                            {slot.type}
                          </span>
                          {slot.active && (
                            <Link
                              href="/courses/CS301"
                              className="text-xs font-mono text-blue-400 hover:underline"
                            >
                              Join Session &rarr;
                            </Link>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* TAB 2: COURSES & SYLLABUS */}
              {activeTab === 'courses' && (
                <motion.div
                  key="courses"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl text-bone">CS301 &bull; Operating Systems</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/20 text-blue-300 border border-blue-500/30">
                          4 Credits &bull; Core Course
                        </span>
                      </div>
                      <p className="text-xs text-mist font-mono mt-0.5">
                        Dr. Alistair Ross &bull; 88.5% Attendance Health (Above Mandatory 75%)
                      </p>
                    </div>
                    <Link
                      href="/courses/CS301"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300"
                    >
                      <span>Open Course Workspace</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* 5-Unit Syllabus Breakdown Grid */}
                  <div className="grid grid-cols-1 sm:grid-cols-5 gap-3">
                    {[
                      { unit: "Unit 1", title: "OS Structures & System Calls", progress: "100%", status: "Completed" },
                      { unit: "Unit 2", title: "Process Scheduling & IPC", progress: "100%", status: "Completed" },
                      { unit: "Unit 3", title: "Synchronization & Semaphores", progress: "70%", status: "In Progress" },
                      { unit: "Unit 4", title: "Virtual Memory & Paging", progress: "0%", status: "Upcoming" },
                      { unit: "Unit 5", title: "Storage & File Systems", progress: "0%", status: "Upcoming" }
                    ].map((u, i) => (
                      <div
                        key={u.unit}
                        className={`p-3.5 rounded-xl border flex flex-col justify-between ${
                          u.status === 'Completed'
                            ? 'bg-ink/60 border-blue-500/30'
                            : u.status === 'In Progress'
                            ? 'bg-blue-600/10 border-blue-500'
                            : 'bg-ink/30 border-line/50 opacity-60'
                        }`}
                      >
                        <div>
                          <div className="flex items-center justify-between text-[10px] font-mono text-mist mb-1">
                            <span>{u.unit}</span>
                            <span className={u.status === 'In Progress' ? 'text-blue-400 font-bold' : ''}>
                              {u.progress}
                            </span>
                          </div>
                          <div className="font-serif text-xs text-bone font-medium leading-tight">
                            {u.title}
                          </div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-line/30 text-[10px] font-mono text-mist">
                          {u.status}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-ink/70 border border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        88%
                      </div>
                      <div>
                        <div className="font-medium text-bone">Attendance Safeguard: Safe</div>
                        <div className="text-mist text-[11px]">23 of 26 sessions attended. Minimum 75% required for exam hall ticket.</div>
                      </div>
                    </div>
                    <Link
                      href="/courses"
                      className="px-4 py-2 rounded-lg bg-surface-raised hover:bg-surface-raised/80 text-bone font-mono text-xs shrink-0 text-center"
                    >
                      View All 6 Courses
                    </Link>
                  </div>
                </motion.div>
              )}

              {/* TAB 3: TRANSCRIPTS */}
              {activeTab === 'transcripts' && (
                <motion.div
                  key="transcripts"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl text-bone">10.0 Scale Academic Transcript</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                          CGPA: 8.76 / 10.0
                        </span>
                      </div>
                      <p className="text-xs text-mist font-mono mt-0.5">
                        Bachelor of Technology in Computer Science &bull; Student ID: STU-2022-8921
                      </p>
                    </div>
                    <Link
                      href="/academics"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300"
                    >
                      <span>Full Academic Transcript</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Semester Progress Progression */}
                  <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
                    {[
                      { sem: "Sem 1", sgpa: "8.40", credits: "22", status: "Verified" },
                      { sem: "Sem 2", sgpa: "8.65", credits: "24", status: "Verified" },
                      { sem: "Sem 3", sgpa: "8.80", credits: "22", status: "Verified" },
                      { sem: "Sem 4", sgpa: "8.72", credits: "24", status: "Verified" },
                      { sem: "Sem 5", sgpa: "8.90", credits: "22", status: "Verified" }
                    ].map((s) => (
                      <div key={s.sem} className="p-4 rounded-xl border border-line bg-ink/60 text-center space-y-1">
                        <div className="text-[10px] font-mono uppercase text-mist">{s.sem}</div>
                        <div className="font-serif text-2xl text-emerald-400 font-bold">{s.sgpa}</div>
                        <div className="text-[10px] font-mono text-mist">{s.credits} Credits</div>
                        <div className="text-[9px] font-mono text-blue-300">● {s.status}</div>
                      </div>
                    ))}
                  </div>

                  <div className="p-4 rounded-xl bg-ink/70 border border-line flex items-center justify-between text-xs font-mono">
                    <span className="text-mist">Total Earned Credits: 114 &bull; Backlogs: 0 (Zero)</span>
                    <span className="text-emerald-400 flex items-center gap-1">
                      <ShieldCheck className="w-4 h-4" />
                      <span>Registrar Cryptographic Seal</span>
                    </span>
                  </div>
                </motion.div>
              )}

              {/* TAB 4: BOOKING */}
              {activeTab === 'booking' && (
                <motion.div
                  key="booking"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl text-bone">Alan Turing AI Lab 3 &bull; Desks</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-orange-500/20 text-orange-300 border border-orange-500/30">
                          16 of 24 Available
                        </span>
                      </div>
                      <p className="text-xs text-mist font-mono mt-0.5">
                        Dual RTX 4090 Workstations &bull; Student single-seat and Faculty hall booking
                      </p>
                    </div>
                    <Link
                      href="/booking"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300"
                    >
                      <span>Interactive Seat Map</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  {/* Seat Grid Visual */}
                  <div className="p-6 rounded-xl border border-line bg-ink/60 space-y-4">
                    <div className="flex items-center justify-between text-xs font-mono pb-2 border-b border-line/50">
                      <span className="text-mist">LAB WORKSTATION CLUSTER</span>
                      <div className="flex items-center gap-4 text-[10px]">
                        <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded bg-emerald-500" /> Free</span>
                        <span className="flex items-center gap-1 text-rose-400"><span className="w-2 h-2 rounded bg-rose-500" /> In Use</span>
                        <span className="flex items-center gap-1 text-blue-400"><span className="w-2 h-2 rounded bg-blue-500" /> Reserved</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-4 sm:grid-cols-8 gap-2.5">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16].map((num) => {
                        const isOccupied = [2, 7, 10, 15].includes(num);
                        const isMine = num === 5;
                        return (
                          <div
                            key={num}
                            className={`p-3 rounded-lg border text-center transition-all ${
                              isMine
                                ? 'bg-blue-600/30 border-blue-400 text-blue-200'
                                : isOccupied
                                ? 'bg-rose-500/10 border-rose-500/30 text-rose-300'
                                : 'bg-surface-raised border-line text-bone hover:border-emerald-500/50 cursor-pointer'
                            }`}
                          >
                            <div className="text-[10px] font-mono opacity-60">WS</div>
                            <div className="font-bold text-sm">{num < 10 ? `0${num}` : num}</div>
                            <div className="text-[9px] font-mono mt-1">
                              {isMine ? 'Your Hold' : isOccupied ? 'Occupied' : 'Free'}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </motion.div>
              )}

              {/* TAB 5: BULLETINS */}
              {activeTab === 'bulletins' && (
                <motion.div
                  key="bulletins"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.25 }}
                  className="space-y-6"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-line/60">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-xl text-bone">Official Directives &amp; Circulars</span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-rose-500/20 text-rose-300 border border-rose-500/30">
                          1 High Priority Active
                        </span>
                      </div>
                      <p className="text-xs text-mist font-mono mt-0.5">
                        Targeted broadcasts: Campus-Wide, Department, or Semester
                      </p>
                    </div>
                    <Link
                      href="/announcements"
                      className="inline-flex items-center gap-1.5 text-xs font-mono text-blue-400 hover:text-blue-300"
                    >
                      <span>View Announcements Hub</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>

                  <div className="space-y-3">
                    {[
                      { priority: "CRITICAL", title: "Mandatory Midterm Exam Hall Ticket Verification", audience: "All B.Tech Sem 6 Students", time: "1 hour ago", remedy: "Download Hall Ticket", link: "/timetable" },
                      { priority: "INFO", title: "Library Reading Room Night Access Extended to 02:00 AM", audience: "Campus-Wide", time: "5 hours ago", remedy: "View Facility Schedule", link: "/booking" },
                      { priority: "TRANSIT", title: "Shuttle Route 2 Diversion around North Amphitheater", audience: "North Campus Commuters", time: "Yesterday", remedy: "Track Route 2 GPS", link: "/transport" }
                    ].map((item, i) => (
                      <div
                        key={i}
                        className="p-4 rounded-xl border border-line bg-ink/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-line-strong transition-colors"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-[10px] font-mono">
                            <span className={`px-2 py-0.5 rounded font-semibold ${
                              item.priority === 'CRITICAL'
                                ? 'bg-rose-600 text-white'
                                : 'bg-surface-raised text-mist'
                            }`}>
                              {item.priority}
                            </span>
                            <span className="text-mist">{item.time}</span>
                            <span>&bull;</span>
                            <span className="text-blue-300">{item.audience}</span>
                          </div>
                          <div className="font-serif text-sm text-bone font-medium">
                            {item.title}
                          </div>
                        </div>

                        <Link
                          href={item.link}
                          className="px-3.5 py-1.5 rounded-lg bg-surface-raised hover:bg-blue-600 hover:text-white text-bone font-mono text-xs transition-colors shrink-0 text-center"
                        >
                          {item.remedy} &rarr;
                        </Link>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
