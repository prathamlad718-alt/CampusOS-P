'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  GraduationCap,
  Users,
  Clock,
  MapPin,
  Calendar,
  Search,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  FileText,
  Sparkles,
  BarChart2,
  Layers,
  ChevronRight,
  ShieldCheck,
  FolderLock
} from 'lucide-react';
import { useAuth } from '@campus-os/shared/auth-provider';
import { COURSES, Course } from '@/lib/academic-data';

export default function CoursesPage() {
  const { user } = useAuth();
  const isAdmin = user?.isSuperAdmin || user?.role === 'admin' || user?.role === 'super-admin';
  const isFaculty = user?.role === 'faculty';

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Core' | 'Elective' | 'Lab'>('All');

  const filteredCourses = COURSES.filter(course => {
    const matchesSearch =
      course.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
      course.instructor.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const totalCredits = COURSES.reduce((acc, c) => acc + c.credits, 0);
  const avgAttendance = (
    COURSES.reduce((acc, c) => acc + c.attendance.percentage, 0) / COURSES.length
  ).toFixed(1);
  const totalPendingAssignments = COURSES.reduce(
    (acc, c) => acc + c.assignments.filter(a => a.status === 'pending').length,
    0
  );

  return (
    <div className="max-w-7xl mx-auto space-y-8 pt-2 pb-16">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-tide">Core Academic Backbone</span>
            <span className="text-xs font-mono text-mist">&bull; Semester 5 (Autumn 2024)</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-bone mt-1">
            {isAdmin ? 'Institutional Curriculum & Courses' : isFaculty ? 'Assigned Courses & Instruction' : 'My Academic Courses'}
          </h1>
          <p className="text-sm text-mist max-w-2xl mt-1">
            {isAdmin
              ? 'Departmental curriculum registry, syllabus definitions, faculty workload allocations, and course schedules.'
              : isFaculty
              ? 'Manage course syllabus progress, student rosters, continuous assessments, and gradebook allocations.'
              : 'The central hub connecting your syllabus, instructors, timetable periods, lecture notes, assignments, and attendance.'}
          </p>
        </div>

        {/* Quick Hub Jump Actions */}
        <div className="flex items-center gap-3">
          <Link
            href="/timetable"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-line bg-surface/60 hover:bg-surface text-bone text-xs font-mono transition-colors"
          >
            <Clock className="w-4 h-4 text-tide" />
            <span>Weekly Timetable</span>
          </Link>
          <Link
            href="/academics"
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-tide/10 border border-tide/30 hover:bg-tide/20 text-tide text-xs font-mono transition-colors"
          >
            <BarChart2 className="w-4 h-4" />
            <span>Academic Transcript</span>
          </Link>
        </div>
      </div>

      {/* KPI Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="glass-panel p-5 rounded-2xl border border-line bg-surface/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-mist text-xs font-mono">
            <span>TOTAL CREDITS</span>
            <Layers className="w-4 h-4 text-tide" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif text-bone">{totalCredits}</span>
            <span className="text-xs text-mist ml-1">Credits Enrolled</span>
          </div>
          <div className="text-[11px] text-mist mt-1 font-mono">5 Courses Active in Sem 5</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-line bg-surface/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-mist text-xs font-mono">
            <span>ATTENDANCE HEALTH</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif text-bone">{avgAttendance}%</span>
            <span className="text-xs text-emerald-400 ml-2 font-mono">Above 75% Criteria</span>
          </div>
          <div className="text-[11px] text-mist mt-1 font-mono">All subjects safely eligible</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-line bg-surface/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-mist text-xs font-mono">
            <span>DUE COURSEWORK</span>
            <FileText className="w-4 h-4 text-amber-400" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif text-bone">{totalPendingAssignments}</span>
            <span className="text-xs text-amber-400 ml-1 font-mono">Pending Tasks</span>
          </div>
          <div className="text-[11px] text-mist mt-1 font-mono">Next: TOC Pumping Lemma (Sep 28)</div>
        </div>

        <div className="glass-panel p-5 rounded-2xl border border-line bg-surface/40 flex flex-col justify-between">
          <div className="flex items-center justify-between text-mist text-xs font-mono">
            <span>PROVISIONAL GPA</span>
            <Sparkles className="w-4 h-4 text-tide" />
          </div>
          <div className="mt-3">
            <span className="text-3xl font-serif text-bone">8.89</span>
            <span className="text-xs text-mist ml-1">/ 10.0 SGPA</span>
          </div>
          <div className="text-[11px] text-tide mt-1 font-mono">Cumulative CGPA: 8.76</div>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-surface/50 border border-line p-3 rounded-2xl">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
          <input
            type="text"
            placeholder="Search by code, title, or instructor..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-ink/50 border border-line rounded-xl text-xs text-bone placeholder-mist focus:outline-none focus:border-tide/50 transition-colors"
          />
        </div>

        <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {(['All', 'Core', 'Elective', 'Lab'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-tide text-ink font-semibold shadow-lg shadow-tide/20'
                  : 'bg-surface/60 hover:bg-surface text-mist hover:text-bone border border-line'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Course Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredCourses.map(course => {
          const isAttendanceLow = course.attendance.percentage < 75;
          const pendingCount = course.assignments.filter(a => a.status === 'pending').length;

          return (
            <div
              key={course.id}
              className="glass-panel rounded-2xl border border-line bg-surface/30 hover:border-tide/40 transition-all duration-300 flex flex-col justify-between overflow-hidden group"
            >
              <div className="p-6 space-y-4">
                {/* Card Top Line */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-md text-[11px] font-mono font-bold bg-tide/15 text-tide border border-tide/30">
                        {course.code}
                      </span>
                      <span className="text-[11px] font-mono text-mist uppercase tracking-wider">
                        {course.credits} Credits &bull; {course.category}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif text-bone mt-2 group-hover:text-tide transition-colors">
                      {course.name}
                    </h3>
                  </div>

                  {course.studentGrade && (
                    <div className="text-right flex flex-col items-end">
                      <span className="text-2xl font-serif text-bone">{course.studentGrade.letterGrade}</span>
                      <span className="text-[10px] font-mono text-mist">
                        {course.studentGrade.gradePoint}.0 / 10 GP
                      </span>
                    </div>
                  )}
                </div>

                <p className="text-xs text-mist line-clamp-2 leading-relaxed">
                  {course.description}
                </p>

                {/* Instructor & Location Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-line/60">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-tide/20 border border-tide/40 flex items-center justify-center text-xs font-mono font-bold text-tide">
                      {course.instructor.avatar}
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs text-bone font-medium truncate">{course.instructor.name}</div>
                      <div className="text-[10px] text-mist truncate">{course.instructor.cabin}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs text-mist font-mono">
                    <MapPin className="w-4 h-4 text-tide flex-shrink-0" />
                    <span className="truncate">{course.room}</span>
                  </div>
                </div>

                {/* Progress Indicators */}
                <div className="grid grid-cols-2 gap-4 pt-3 border-t border-line/60">
                  {/* Attendance Gauge */}
                  <div>
                    <div className="flex items-center justify-between text-xs mb-1.5">
                      <span className="font-mono text-mist text-[11px]">Attendance</span>
                      <span
                        className={`font-mono text-[11px] font-semibold ${
                          isAttendanceLow ? 'text-amber-400' : 'text-emerald-400'
                        }`}
                      >
                        {course.attendance.percentage}% ({course.attendance.attended}/{course.attendance.total})
                      </span>
                    </div>
                    <div className="w-full h-1.5 bg-ink/70 rounded-full overflow-hidden relative">
                      {/* 75% Criteria Marker */}
                      <div className="absolute left-[75%] top-0 bottom-0 w-0.5 bg-rose-500/80 z-10" />
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          isAttendanceLow ? 'bg-amber-400' : 'bg-emerald-400'
                        }`}
                        style={{ width: `${course.attendance.percentage}%` }}
                      />
                    </div>
                  </div>

                  {/* Coursework Status */}
                  <div className="flex items-center justify-between pl-2">
                    <div>
                      <div className="text-[11px] font-mono text-mist">Coursework</div>
                      <div className="text-xs text-bone font-medium mt-0.5">
                        {pendingCount > 0 ? (
                          <span className="text-amber-400 font-mono">{pendingCount} Due Soon</span>
                        ) : (
                          <span className="text-emerald-400 font-mono">All Submitted</span>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-[11px] font-mono text-mist">Materials</div>
                      <div className="text-xs text-bone font-mono">{course.driveMaterials.length} PDFs</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer: Navigation Link */}
              <div className="px-6 py-3.5 bg-ink/40 border-t border-line flex items-center justify-between">
                <div className="flex items-center gap-2 text-[11px] font-mono text-mist">
                  <Clock className="w-3.5 h-3.5 text-tide" />
                  <span>{course.scheduleSlots[0]?.day} {course.scheduleSlots[0]?.startTime}</span>
                </div>

                <Link
                  href={`/courses/${course.id}`}
                  className="flex items-center gap-1.5 text-xs font-mono font-semibold text-tide hover:text-cyan-300 transition-colors"
                >
                  <span>Enter Subject Workspace</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
