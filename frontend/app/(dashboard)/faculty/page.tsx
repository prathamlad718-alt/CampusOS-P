'use client';

import React, { useState } from 'react';
import {
  GraduationCap,
  Users,
  CheckCircle2,
  XCircle,
  Clock,
  BookOpen,
  Calendar,
  AlertCircle,
  FileText,
  UploadCloud,
  CheckSquare,
  Search,
  Building
} from 'lucide-react';

interface StudentRosterItem {
  id: string;
  roll: string;
  name: string;
  attendancePct: number;
  status: 'present' | 'absent' | 'late';
}

const INITIAL_ROSTER: StudentRosterItem[] = [
  { id: 's1', roll: '22CS014', name: 'Aarav Patel', attendancePct: 92, status: 'present' },
  { id: 's2', roll: '22CS015', name: 'Aditi Rao', attendancePct: 88, status: 'present' },
  { id: 's3', roll: '22CS018', name: 'David Chen', attendancePct: 74, status: 'absent' },
  { id: 's4', roll: '22CS021', name: 'Ishita Sharma', attendancePct: 95, status: 'present' },
  { id: 's5', roll: '22CS025', name: 'Karan Mehra', attendancePct: 68, status: 'late' },
  { id: 's6', roll: '22CS029', name: 'Priya Nair', attendancePct: 85, status: 'present' }
];

export default function FacultyPage() {
  const [activeTab, setActiveTab] = useState<'roster' | 'grading' | 'rooms'>('roster');
  const [roster, setRoster] = useState<StudentRosterItem[]>(INITIAL_ROSTER);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggleStudentStatus = (id: string, newStatus: 'present' | 'absent' | 'late') => {
    setRoster(prev => prev.map(s => s.id === id ? { ...s, status: newStatus } : s));
  };

  const markAllPresent = () => {
    setRoster(prev => prev.map(s => ({ ...s, status: 'present' })));
    setToastMessage('Marked all students present for CS-302 Section B!');
    setTimeout(() => setToastMessage(null), 3000);
  };

  const saveRoster = () => {
    setToastMessage('Attendance saved & synchronized with Dean Office Academic Records!');
    setTimeout(() => setToastMessage(null), 4000);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Faculty Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-tide to-purple-500 text-white flex items-center justify-center font-bold text-xl shadow-lg">
            <GraduationCap className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono uppercase tracking-widest text-tide font-semibold">Faculty Workspace</span>
              <span className="text-xs font-mono text-mist">&bull; ID: FAC-1049</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-serif text-bone mt-0.5">
              Prof. Rajesh Sharma
            </h1>
            <p className="text-xs text-mist font-mono">
              Dept. of Computer Science &bull; Database &amp; Storage Architecture Lab
            </p>
          </div>
        </div>

        {toastMessage && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4" /> {toastMessage}
          </div>
        )}
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-line">
          <span className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">Today&apos;s Lectures</span>
          <span className="text-3xl font-mono font-bold text-bone">3 Sessions</span>
          <span className="text-[11px] text-tide block mt-1">Next: CS-302 @ 11:00 AM</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-line">
          <span className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">Pending Grading</span>
          <span className="text-3xl font-mono font-bold text-amber-400">14 Papers</span>
          <span className="text-[11px] text-mist block mt-1">B-Tree Indexing Lab</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-line">
          <span className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">Avg Class Attendance</span>
          <span className="text-3xl font-mono font-bold text-emerald-400">88.4%</span>
          <span className="text-[11px] text-emerald-400/80 block mt-1">&ge; Minimum 75% met</span>
        </div>
        <div className="glass-panel p-5 rounded-2xl border border-line">
          <span className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">Booked Labs</span>
          <span className="text-3xl font-mono font-bold text-bone">Lab 204</span>
          <span className="text-[11px] text-mist block mt-1">Turing Block 2nd Floor</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-line pb-2 text-sm">
        <button
          onClick={() => setActiveTab('roster')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
            activeTab === 'roster'
              ? 'bg-surface text-tide border border-line-strong'
              : 'text-mist hover:text-bone'
          }`}
        >
          <Users className="w-4 h-4" /> Take Attendance (CS-302)
        </button>
        <button
          onClick={() => setActiveTab('grading')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
            activeTab === 'grading'
              ? 'bg-surface text-tide border border-line-strong'
              : 'text-mist hover:text-bone'
          }`}
        >
          <FileText className="w-4 h-4" /> Grading Queue (14)
        </button>
        <button
          onClick={() => setActiveTab('rooms')}
          className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium transition-colors ${
            activeTab === 'rooms'
              ? 'bg-surface text-tide border border-line-strong'
              : 'text-mist hover:text-bone'
          }`}
        >
          <Building className="w-4 h-4" /> Room Availability
        </button>
      </div>

      {/* TAB 1: ATTENDANCE ROSTER */}
      {activeTab === 'roster' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-line-strong space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <h3 className="text-lg font-semibold text-bone">
                Live Attendance Marking: CS-302 Section B
              </h3>
              <p className="text-xs text-mist font-mono mt-0.5">
                Lab 204 &bull; 11:00 AM – 12:30 PM &bull; Total Registered: 42 Students
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={markAllPresent}
                className="px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-raised border border-line text-xs font-medium text-bone transition-colors"
              >
                Mark All Present
              </button>
              <button
                onClick={saveRoster}
                className="px-4 py-2 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-md"
              >
                Save Attendance Sheet
              </button>
            </div>
          </div>

          <div className="space-y-2">
            {roster.map(student => (
              <div
                key={student.id}
                className="flex items-center justify-between p-3.5 rounded-2xl bg-surface border border-line"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xs font-mono text-mist w-16">{student.roll}</span>
                  <span className="text-sm font-medium text-bone truncate">{student.name}</span>
                  <span className={`text-[11px] font-mono px-2 py-0.5 rounded-full ${
                    student.attendancePct >= 75 ? 'text-emerald-400 bg-emerald-400/10' : 'text-rose-400 bg-rose-400/10'
                  }`}>
                    {student.attendancePct}% Term Attendance
                  </span>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={() => toggleStudentStatus(student.id, 'present')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      student.status === 'present'
                        ? 'bg-emerald-500 text-white font-bold'
                        : 'bg-ink text-mist hover:text-bone'
                    }`}
                  >
                    Present
                  </button>
                  <button
                    onClick={() => toggleStudentStatus(student.id, 'late')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      student.status === 'late'
                        ? 'bg-amber-500 text-white font-bold'
                        : 'bg-ink text-mist hover:text-bone'
                    }`}
                  >
                    Late
                  </button>
                  <button
                    onClick={() => toggleStudentStatus(student.id, 'absent')}
                    className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                      student.status === 'absent'
                        ? 'bg-rose-500 text-white font-bold'
                        : 'bg-ink text-mist hover:text-bone'
                    }`}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 2: GRADING QUEUE */}
      {activeTab === 'grading' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-line-strong space-y-4">
          <h3 className="text-lg font-semibold text-bone">
            Pending Submissions: Lab 4 (B-Tree Indexing)
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Aditi Rao', roll: '22CS015', time: 'Submitted Yesterday 9:15 PM', file: 'aditi_btree.tar.gz' },
              { name: 'Ishita Sharma', roll: '22CS021', time: 'Submitted Today 1:30 AM', file: 'ishita_btree_repo.zip' },
              { name: 'Aarav Patel', roll: '22CS014', time: 'Submitted Today 8:45 AM', file: 'aarav_p4.tar.gz' }
            ].map((sub, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl bg-surface border border-line gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-bone">{sub.name}</span>
                    <span className="text-xs font-mono text-mist">({sub.roll})</span>
                  </div>
                  <p className="text-xs text-mist font-mono mt-0.5">{sub.time} &bull; File: {sub.file}</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    placeholder="/100"
                    className="w-20 px-3 py-1.5 rounded-xl bg-ink border border-line text-xs font-mono text-bone outline-none focus:border-tide"
                  />
                  <button className="px-4 py-1.5 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors">
                    Post Grade
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: CLASSROOM AVAILABILITY */}
      {activeTab === 'rooms' && (
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-line-strong space-y-4">
          <h3 className="text-lg font-semibold text-bone">
            Live Department Classroom &amp; Lab Availability
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { room: 'Lab 204 (Turing Block 2F)', status: 'Occupied', until: 'Occupied by CS-302 until 12:30 PM' },
              { room: 'Lab 3B (Turing Block 3F)', status: 'Available', until: 'Free until 3:00 PM' },
              { room: 'LH 101 (Ramanujan Hall)', status: 'Available', until: 'Free all afternoon' },
              { room: 'Seminar Hall B', status: 'Booked', until: 'Booked for IEEE Guest Lecture @ 2 PM' }
            ].map((r, i) => (
              <div key={i} className="p-4 rounded-2xl bg-surface border border-line flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-semibold text-bone">{r.room}</h4>
                  <p className="text-xs text-mist mt-0.5">{r.until}</p>
                </div>
                <span className={`text-xs font-mono px-2.5 py-1 rounded-full ${
                  r.status === 'Available' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                }`}>
                  {r.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
