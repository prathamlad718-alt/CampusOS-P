'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Calendar,
  Clock,
  MapPin,
  ChevronRight,
  ChevronLeft,
  CheckCircle2,
  AlertCircle,
  Filter,
  Download,
  Share2,
  Sparkles,
  BookOpen,
  ArrowRight
} from 'lucide-react';
import { MASTER_TIMETABLE, DaySchedule, TimetablePeriod } from '@/lib/academic-data';

export default function TimetablePage() {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0); // 0 = Monday
  const [viewMode, setViewMode] = useState<'day' | 'week'>('week');

  const days: ('Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday')[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday'
  ];

  const currentDaySchedule = MASTER_TIMETABLE[selectedDayIndex];

  // Simulated active period (Wednesday 11:15 AM CS-302)
  const isPeriodActive = (day: string, time: string) => {
    return day === 'Wednesday' && time.includes('11:15 AM');
  };

  return (
    <div className="max-w-7xl mx-auto space-y-8 pt-2 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-tide">Academic Infrastructure</span>
            <span className="text-xs font-mono text-mist">&bull; Semester 5 Weekly Schedule</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-bone mt-1">Recurring Academic Timetable</h1>
          <p className="text-sm text-mist max-w-2xl mt-1">
            Weekly scheduled lectures, practical laboratory sessions, and tutorial blocks. Feeds the Command Center Next Class Radar.
          </p>
        </div>

        {/* View Switcher & Action Controls */}
        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-surface border border-line rounded-xl">
            <button
              onClick={() => setViewMode('week')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'week' ? 'bg-tide text-ink font-semibold' : 'text-mist hover:text-bone'
              }`}
            >
              Weekly Grid
            </button>
            <button
              onClick={() => setViewMode('day')}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'day' ? 'bg-tide text-ink font-semibold' : 'text-mist hover:text-bone'
              }`}
            >
              Day View
            </button>
          </div>

          <button
            onClick={() => alert('Calendar synced! .ics timetable downloaded.')}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-line bg-surface/50 hover:bg-surface text-bone text-xs font-mono transition-colors"
          >
            <Download className="w-4 h-4 text-tide" />
            <span className="hidden sm:inline">Export .ics</span>
          </button>
        </div>
      </div>

      {/* Live Status Ticker */}
      <div className="glass-panel p-4 rounded-2xl border border-line bg-surface/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div className="text-xs font-mono text-bone">
            <span className="text-tide font-bold">NEXT PERIOD UP:</span> CS-302 Database Management Systems at 11:15 AM &bull; Room 204
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs font-mono text-mist">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>0 Schedule Clashes</span>
          </div>
          <span>&bull;</span>
          <span>19 Lecture Hours / Week</span>
        </div>
      </div>

      {/* Day Selector (for Day View or mobile) */}
      <div className="flex items-center justify-between gap-2 overflow-x-auto pb-1">
        {days.map((day, idx) => (
          <button
            key={day}
            onClick={() => {
              setSelectedDayIndex(idx);
              if (viewMode !== 'day') setViewMode('day');
            }}
            className={`flex-1 min-w-[120px] p-3 rounded-xl border text-center transition-all ${
              selectedDayIndex === idx && viewMode === 'day'
                ? 'border-tide bg-tide/15 text-tide shadow-lg shadow-tide/10'
                : 'border-line bg-surface/40 hover:bg-surface text-mist hover:text-bone'
            }`}
          >
            <div className="text-xs font-mono font-bold">{day}</div>
            <div className="text-[10px] text-mist font-mono mt-0.5">
              {MASTER_TIMETABLE[idx].slots.filter(s => s.period).length} Sessions
            </div>
          </button>
        ))}
      </div>

      {/* View 1: Day View */}
      {viewMode === 'day' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-bone">{currentDaySchedule.day} Schedule</h2>
            <span className="text-xs font-mono text-mist">
              {currentDaySchedule.slots.filter(s => s.period).length} active classes scheduled
            </span>
          </div>

          <div className="space-y-3">
            {currentDaySchedule.slots.map((slot, idx) => {
              if (slot.isBreak) {
                return (
                  <div
                    key={idx}
                    className="py-2.5 px-4 rounded-xl border border-line/40 bg-ink/30 text-center text-xs font-mono text-mist flex items-center justify-center gap-2"
                  >
                    <Clock className="w-3.5 h-3.5 text-tide/60" />
                    <span>{slot.time} &bull; {slot.breakLabel}</span>
                  </div>
                );
              }

              if (!slot.period) {
                return (
                  <div
                    key={idx}
                    className="py-3 px-5 rounded-xl border border-dashed border-line/50 bg-ink/20 text-xs font-mono text-mist flex items-center justify-between"
                  >
                    <span>{slot.time}</span>
                    <span className="text-mist/60 italic">Free Academic Period / Study Slot</span>
                  </div>
                );
              }

              const p = slot.period;
              const active = isPeriodActive(currentDaySchedule.day, slot.time);

              return (
                <div
                  key={idx}
                  className={`glass-panel p-5 rounded-2xl border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    active
                      ? 'border-tide bg-tide/10 shadow-lg shadow-tide/10 ring-1 ring-tide/40'
                      : 'border-line bg-surface/30 hover:border-tide/30'
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-ink/60 border border-line flex flex-col items-center justify-center text-tide flex-shrink-0">
                      <Clock className="w-4 h-4" />
                      <span className="text-[10px] font-mono mt-0.5">{p.type}</span>
                    </div>

                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded text-xs font-mono font-bold bg-tide/20 text-tide">
                          {p.courseCode}
                        </span>
                        <h3 className="text-base font-serif text-bone font-medium">{p.courseName}</h3>
                        {active && (
                          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 animate-pulse">
                            ACTIVE NOW
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-mist">
                        <span>{slot.time}</span>
                        <span>&bull;</span>
                        <div className="flex items-center gap-1 text-bone">
                          <MapPin className="w-3.5 h-3.5 text-tide" />
                          <span>{p.room}</span>
                        </div>
                        <span>&bull;</span>
                        <span>{p.instructor}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <Link
                      href={`/navigation?destination=${encodeURIComponent(p.room)}`}
                      className="px-3.5 py-1.5 rounded-lg border border-line bg-surface hover:bg-surface/80 text-xs font-mono text-bone transition-colors flex items-center gap-1.5"
                    >
                      <MapPin className="w-3.5 h-3.5 text-tide" />
                      <span>Route</span>
                    </Link>

                    <Link
                      href={`/courses/${p.courseId}`}
                      className="px-3.5 py-1.5 rounded-lg bg-tide/15 text-tide hover:bg-tide/25 text-xs font-mono transition-colors flex items-center gap-1"
                    >
                      <span>Course Hub</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* View 2: Master Weekly Matrix (Desktop Grid) */}
      {viewMode === 'week' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-bone">Weekly Academic Grid Matrix</h2>
            <div className="flex items-center gap-4 text-xs font-mono text-mist">
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-tide/20 border border-tide/40" />
                <span>Lecture</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-emerald-500/20 border border-emerald-500/40" />
                <span>Lab / Practical</span>
              </span>
            </div>
          </div>

          <div className="glass-panel rounded-2xl border border-line bg-surface/30 overflow-x-auto">
            <div className="min-w-[900px]">
              {/* Header Days */}
              <div className="grid grid-cols-6 border-b border-line bg-ink/70 text-xs font-mono text-mist uppercase">
                <div className="p-3 border-r border-line text-center">Time Slot</div>
                {days.map(d => (
                  <div key={d} className="p-3 border-r border-line last:border-r-0 text-center font-bold text-bone">
                    {d}
                  </div>
                ))}
              </div>

              {/* Time Slot Rows */}
              {[
                '09:00 AM – 10:00 AM',
                '10:00 AM – 11:00 AM',
                '11:00 AM – 11:15 AM', // Break
                '11:15 AM – 12:15 PM',
                '12:15 PM – 01:15 PM',
                '01:15 PM – 02:00 PM', // Lunch
                '02:00 PM – 04:00 PM',
                '04:00 PM – 05:00 PM'
              ].map((timeLabel, rowIdx) => {
                const isBreak = timeLabel.includes('11:00 AM – 11:15 AM') || timeLabel.includes('01:15 PM – 02:00 PM');

                if (isBreak) {
                  return (
                    <div
                      key={rowIdx}
                      className="grid grid-cols-6 border-b border-line/60 bg-ink/40 text-[11px] font-mono text-mist/70 text-center py-2"
                    >
                      <div className="border-r border-line/40 px-2 font-mono text-[10px]">{timeLabel}</div>
                      <div className="col-span-5 tracking-wider uppercase">
                        {timeLabel.includes('11:00') ? '⚡ 15-Minute Morning Recess' : '🍱 Institutional Lunch Interval'}
                      </div>
                    </div>
                  );
                }

                return (
                  <div key={rowIdx} className="grid grid-cols-6 border-b border-line/60 last:border-b-0">
                    {/* Time Column */}
                    <div className="p-3 border-r border-line bg-ink/30 text-[11px] font-mono text-mist flex items-center justify-center text-center">
                      {timeLabel}
                    </div>

                    {/* Day Columns */}
                    {days.map((day, dIdx) => {
                      const daySchedule = MASTER_TIMETABLE[dIdx];
                      const slotData = daySchedule.slots.find(s => s.time.startsWith(timeLabel.split(' ')[0]));
                      const p = slotData?.period;
                      const active = isPeriodActive(day, timeLabel);

                      if (!p) {
                        return (
                          <div
                            key={dIdx}
                            className="p-3 border-r border-line/40 last:border-r-0 text-center flex items-center justify-center text-[10px] font-mono text-mist/40"
                          >
                            —
                          </div>
                        );
                      }

                      return (
                        <Link
                          key={dIdx}
                          href={`/courses/${p.courseId}`}
                          className={`p-3 border-r border-line/40 last:border-r-0 flex flex-col justify-between transition-colors group ${
                            active
                              ? 'bg-tide/20 ring-1 ring-tide'
                              : p.type === 'Lab'
                              ? 'bg-emerald-500/10 hover:bg-emerald-500/20'
                              : 'bg-surface/50 hover:bg-surface'
                          }`}
                        >
                          <div>
                            <div className="flex items-center justify-between text-[10px] font-mono">
                              <span className="font-bold text-tide">{p.courseCode}</span>
                              <span className="text-mist">{p.type}</span>
                            </div>
                            <div className="text-xs font-serif text-bone font-medium mt-1 line-clamp-1 group-hover:text-tide transition-colors">
                              {p.courseName}
                            </div>
                          </div>

                          <div className="flex items-center justify-between text-[10px] font-mono text-mist mt-2 pt-1 border-t border-line/40">
                            <span>{p.room}</span>
                            <span className="text-[9px] text-mist/70 truncate max-w-[70px]">
                              {p.instructor.split(' ')[1]}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
