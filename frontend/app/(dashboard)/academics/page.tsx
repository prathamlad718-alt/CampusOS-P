'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Award,
  GraduationCap,
  Layers,
  CheckCircle2,
  AlertCircle,
  Download,
  Printer,
  Sparkles,
  TrendingUp,
  FileText,
  Calendar,
  ShieldCheck,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { STUDENT_ACADEMIC_RECORD, SemesterResult } from '@/lib/academic-data';

export default function AcademicsPage() {
  const profile = STUDENT_ACADEMIC_RECORD;
  const [selectedSemNumber, setSelectedSemNumber] = useState<number>(profile.currentSemester);

  const selectedSemester =
    profile.semesters.find(s => s.semesterNumber === selectedSemNumber) ||
    profile.semesters[profile.semesters.length - 1];

  const handlePrintTranscript = () => {
    alert('Generating signed digital grade transcript PDF with cryptographic institutional watermark...');
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2 pb-16">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-tide">Academic Record & Results</span>
            <span className="text-xs font-mono text-mist">&bull; 10.0 Grading Standard</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-bone mt-1">Student Academic Profile</h1>
          <p className="text-sm text-mist max-w-2xl mt-1">
            Complete institutional academic transcript, semester-wise SGPA, cumulative CGPA progression, and official examination results.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePrintTranscript}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tide/15 text-tide border border-tide/30 hover:bg-tide/25 text-xs font-mono transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Official Grade Transcript</span>
          </button>
        </div>
      </div>

      {/* Student Meta Identity Card */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-line bg-surface/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="flex items-start sm:items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-tide/20 border border-tide/40 flex items-center justify-center text-xl font-mono font-bold text-tide flex-shrink-0">
              {profile.studentName.split(' ').map(n => n[0]).join('')}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-serif text-bone">{profile.studentName}</h2>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Active Enrollment
                </span>
              </div>
              <div className="text-xs font-mono text-mist mt-1">
                {profile.rollNumber} &bull; {profile.enrollmentId}
              </div>
              <div className="text-xs text-bone font-medium mt-1">
                {profile.program} &bull; {profile.department}
              </div>
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-3 gap-4 border-t lg:border-t-0 lg:border-l border-line/60 pt-4 lg:pt-0 lg:pl-8">
            <div>
              <div className="text-[10px] font-mono text-mist uppercase tracking-wider">Cumulative CGPA</div>
              <div className="text-3xl font-serif text-tide font-bold mt-1">{profile.cgpa}</div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">Top 5% of Cohort</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-mist uppercase tracking-wider">Credits Earned</div>
              <div className="text-3xl font-serif text-bone font-bold mt-1">
                {profile.totalCreditsEarned}
              </div>
              <div className="text-[10px] font-mono text-mist mt-0.5">/ {profile.totalCreditsRequired} Required</div>
            </div>
            <div>
              <div className="text-[10px] font-mono text-mist uppercase tracking-wider">Active Backlogs</div>
              <div className="text-3xl font-serif text-emerald-400 font-bold mt-1">
                {profile.activeBacklogs}
              </div>
              <div className="text-[10px] font-mono text-emerald-400 mt-0.5">Clean Record</div>
            </div>
          </div>
        </div>
      </div>

      {/* SGPA Progression Ribbon */}
      <div className="glass-panel p-6 rounded-2xl border border-line bg-surface/20 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-tide" />
            <h3 className="text-sm font-mono uppercase tracking-widest text-tide">Semester GPA Progression</h3>
          </div>
          <span className="text-xs font-mono text-mist">Target: Maintain &ge; 8.50 for Honours</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
          {profile.semesters.map(sem => (
            <button
              key={sem.semesterNumber}
              onClick={() => setSelectedSemNumber(sem.semesterNumber)}
              className={`p-4 rounded-xl border text-left transition-all ${
                selectedSemNumber === sem.semesterNumber
                  ? 'border-tide bg-tide/15 text-bone ring-1 ring-tide/30'
                  : 'border-line bg-ink/40 hover:bg-surface/50 text-mist'
              }`}
            >
              <div className="flex items-center justify-between text-xs font-mono">
                <span>Semester {sem.semesterNumber}</span>
                {sem.status === 'Current' && (
                  <span className="text-[9px] px-1.5 py-0.5 rounded bg-tide/20 text-tide">Provisional</span>
                )}
              </div>
              <div className="text-2xl font-serif text-bone mt-2 font-bold">{sem.sgpa}</div>
              <div className="text-[10px] font-mono text-mist mt-0.5">{sem.creditsEarned} Credits Earned</div>
            </button>
          ))}
        </div>
      </div>

      {/* Detailed Semester Results Table */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-serif text-bone">
              {selectedSemester.semesterName} Detailed Ledger
            </h2>
            <p className="text-xs text-mist mt-0.5 font-mono">
              Academic Year: {selectedSemester.academicYear} &bull; SGPA: {selectedSemester.sgpa} &bull; Total Credits: {selectedSemester.creditsRegistered}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded-md text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
              Status: {selectedSemester.status}
            </span>
          </div>
        </div>

        <div className="glass-panel rounded-2xl border border-line bg-surface/30 overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-ink/60 border-b border-line text-mist uppercase text-[10px] tracking-wider">
              <tr>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-3">Credits</th>
                <th className="py-3 px-3">Internal (40)</th>
                <th className="py-3 px-3">End-Sem (60)</th>
                <th className="py-3 px-3">Total (100)</th>
                <th className="py-3 px-3">Letter Grade</th>
                <th className="py-3 px-3">Grade Point</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line/60">
              {selectedSemester.courses.map((course, idx) => (
                <tr key={idx} className="hover:bg-surface/50 transition-colors">
                  <td className="py-3 px-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-tide/15 text-tide">
                        {course.code}
                      </span>
                      <span className="text-bone font-medium">{course.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-bone">{course.credits}</td>
                  <td className="py-3 px-3 text-mist">{course.internalMarks}</td>
                  <td className="py-3 px-3 text-mist">{course.endSemMarks}</td>
                  <td className="py-3 px-3 text-bone font-bold">{course.totalMarks}</td>
                  <td className="py-3 px-3">
                    <span
                      className={`px-2 py-0.5 rounded font-bold text-xs ${
                        course.letterGrade === 'O'
                          ? 'bg-tide/20 text-tide border border-tide/30'
                          : course.letterGrade === 'A+'
                          ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                          : 'bg-surface text-bone border border-line'
                      }`}
                    >
                      {course.letterGrade}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-bone font-medium">{course.gradePoint}.0</td>
                  <td className="py-3 px-4">
                    <span className="flex items-center gap-1 text-emerald-400 font-semibold text-[11px]">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{course.status}</span>
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Institutional Verification Footer */}
      <div className="glass-panel p-5 rounded-2xl border border-line bg-surface/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono text-mist">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-emerald-400 flex-shrink-0" />
          <span>Verified by Office of Controller of Examinations &bull; Digital Signature Hash: #8F3A-792B-CAMPUS-OS</span>
        </div>
        <div className="text-[11px]">Last Updated: Sep 23, 2026</div>
      </div>
    </div>
  );
}
