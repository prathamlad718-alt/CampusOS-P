'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft,
  BookOpen,
  Calendar,
  Clock,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  FileText,
  Download,
  Upload,
  UserCheck,
  Award,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Layers,
  Send,
  Eye,
  Lock,
  Check,
  FolderLock
} from 'lucide-react';
import { useAuth } from '@campus-os/shared/auth-provider';
import {
  COURSES,
  CS302_GRADEBOOK_STUDENTS,
  StudentGradebookEntry,
  Course
} from '@/lib/academic-data';

export default function CourseDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const courseId = (params?.id as string) || 'cs302';

  const isAdmin = user?.isSuperAdmin || user?.role === 'admin' || user?.role === 'super-admin';
  const isFaculty = user?.role === 'faculty';

  const course = COURSES.find(c => c.id === courseId) || COURSES[0];

  const [activeTab, setActiveTab] = useState<
    'syllabus' | 'timetable' | 'materials' | 'assignments' | 'attendance' | 'grades' | 'gradebook'
  >('syllabus');

  // Faculty Gradebook State
  const [gradebookStudents, setGradebookStudents] = useState<StudentGradebookEntry[]>(CS302_GRADEBOOK_STUDENTS);
  const [publishing, setPublishing] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);

  const handlePublishAllGrades = () => {
    setPublishing(true);
    setTimeout(() => {
      setGradebookStudents(prev =>
        prev.map(s => ({
          ...s,
          status: 'Published'
        }))
      );
      setPublishing(false);
      setPublishSuccess(true);
      setTimeout(() => setPublishSuccess(false), 3000);
    }, 600);
  };

  const handleUpdateStudentMark = (id: string, field: 'quiz1' | 'assignment1' | 'midterm' | 'labViva' | 'endSem', value: number) => {
    setGradebookStudents(prev =>
      prev.map(s => {
        if (s.id !== id) return s;
        const updated = { ...s, [field]: value };
        const total = updated.quiz1 + updated.assignment1 + updated.midterm + updated.labViva + updated.endSem;
        let letterGrade: StudentGradebookEntry['letterGrade'] = 'F';
        if (total >= 90) letterGrade = 'O';
        else if (total >= 85) letterGrade = 'A+';
        else if (total >= 80) letterGrade = 'A';
        else if (total >= 75) letterGrade = 'B+';
        else if (total >= 65) letterGrade = 'B';
        else if (total >= 50) letterGrade = 'C';

        return {
          ...updated,
          total: parseFloat(total.toFixed(1)),
          letterGrade
        };
      })
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2 pb-16">
      {/* Top Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-line pb-4">
        <div className="flex items-center gap-2 text-xs font-mono text-mist">
          <Link href="/courses" className="hover:text-tide flex items-center gap-1 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Courses</span>
          </Link>
          <span>/</span>
          <span className="text-bone">{course.code}</span>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href={`/navigation?destination=${encodeURIComponent(course.room)}`}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface/50 hover:bg-surface text-bone text-xs font-mono transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-tide" />
            <span>Locate {course.room.split(' ')[0]}</span>
          </Link>
        </div>
      </div>

      {/* Course Hero Banner */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-line bg-surface/30 relative overflow-hidden">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-3 py-1 rounded-lg text-xs font-mono font-bold bg-tide/20 text-tide border border-tide/40">
                {course.code}
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-surface border border-line text-mist">
                {course.credits} Credits
              </span>
              <span className="px-2.5 py-1 rounded-lg text-xs font-mono bg-surface border border-line text-mist">
                Semester {course.semester} &bull; {course.category}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif text-bone leading-tight">
              {course.name}
            </h1>

            <p className="text-sm text-mist leading-relaxed">
              {course.description}
            </p>
          </div>

          {/* Instructor & Location Mini Panel */}
          <div className="glass-panel p-5 rounded-2xl border border-line bg-ink/40 lg:w-80 flex flex-col justify-between space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-tide/20 border border-tide/40 flex items-center justify-center text-sm font-mono font-bold text-tide">
                {course.instructor.avatar}
              </div>
              <div className="min-w-0">
                <div className="text-xs font-mono text-tide">Course Instructor</div>
                <div className="text-sm font-serif text-bone font-medium truncate">{course.instructor.name}</div>
                <div className="text-[11px] text-mist truncate">{course.instructor.title}</div>
              </div>
            </div>

            <div className="space-y-1.5 text-xs font-mono text-mist border-t border-line/60 pt-3">
              <div className="flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5 text-tide flex-shrink-0" />
                <span className="truncate">{course.instructor.cabin}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-tide flex-shrink-0" />
                <span>{course.scheduleSlots.length} Weekly Sessions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="flex items-center gap-2 border-b border-line overflow-x-auto pb-px">
        {[
          { id: 'syllabus', label: 'Overview & Syllabus', icon: BookOpen },
          { id: 'timetable', label: 'Timetable Slots', icon: Clock },
          { id: 'materials', label: `Materials (${course.driveMaterials.length})`, icon: FolderLock },
          { id: 'assignments', label: `Assignments (${course.assignments.length})`, icon: FileText },
          { id: 'attendance', label: `Attendance (${course.attendance.percentage}%)`, icon: UserCheck },
          ...(isFaculty || isAdmin
            ? [{ id: 'gradebook', label: 'Faculty Gradebook', icon: Award }]
            : [{ id: 'grades', label: 'My Performance & Marks', icon: Award }])
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-3 text-xs font-mono whitespace-nowrap transition-all border-b-2 -mb-px ${
                isActive
                  ? 'border-tide text-tide font-semibold bg-tide/5'
                  : 'border-transparent text-mist hover:text-bone hover:border-line'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Syllabus & Overview */}
      {activeTab === 'syllabus' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-bone">Course Syllabus & Curriculum Units</h2>
            <span className="text-xs font-mono text-mist">
              {course.syllabusModules.filter(m => m.status === 'completed').length} / {course.syllabusModules.length} Units Completed
            </span>
          </div>

          <div className="space-y-4">
            {course.syllabusModules.map(mod => (
              <div
                key={mod.unit}
                className="glass-panel p-5 rounded-2xl border border-line bg-surface/30 space-y-3"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-8 h-8 rounded-lg bg-surface border border-line flex items-center justify-center text-xs font-mono font-bold text-bone">
                      0{mod.unit}
                    </span>
                    <div>
                      <h3 className="text-sm font-serif text-bone font-medium">{mod.title}</h3>
                      <span className="text-[11px] font-mono text-mist">{mod.hours} Lecture Hours Allocated</span>
                    </div>
                  </div>

                  <span
                    className={`px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-wider ${
                      mod.status === 'completed'
                        ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                        : mod.status === 'in-progress'
                        ? 'bg-tide/15 text-tide border border-tide/30'
                        : 'bg-surface text-mist border border-line'
                    }`}
                  >
                    {mod.status}
                  </span>
                </div>

                <div className="flex flex-wrap gap-2 pt-2 border-t border-line/60">
                  {mod.topics.map(topic => (
                    <span
                      key={topic}
                      className="px-2.5 py-1 rounded-md text-xs font-mono bg-ink/50 border border-line/70 text-mist"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Evaluation Scheme */}
          <div className="glass-panel p-6 rounded-2xl border border-line bg-surface/20 space-y-4">
            <h3 className="text-sm font-mono uppercase tracking-widest text-tide">Official Evaluation Weightage</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {course.evaluationBreakdown.map(ev => (
                <div key={ev.component} className="p-4 rounded-xl border border-line bg-ink/40">
                  <div className="text-[11px] font-mono text-mist line-clamp-1">{ev.component}</div>
                  <div className="text-2xl font-serif text-bone mt-2">{ev.weightage}%</div>
                  <div className="text-[10px] font-mono text-mist mt-1">Max Marks: {ev.maxMarks}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Timetable Slots */}
      {activeTab === 'timetable' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-bone">Weekly Academic Schedule Slots</h2>
            <Link
              href="/timetable"
              className="text-xs font-mono text-tide hover:underline flex items-center gap-1"
            >
              <span>View Full Weekly Timetable Grid</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {course.scheduleSlots.map((slot, idx) => (
              <div
                key={idx}
                className="glass-panel p-5 rounded-2xl border border-line bg-surface/30 space-y-4 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-tide/20 text-tide">
                      {slot.day}
                    </span>
                    <span className="text-[11px] font-mono text-mist uppercase">{slot.type}</span>
                  </div>

                  <div className="text-lg font-serif text-bone mt-3 flex items-center gap-2">
                    <Clock className="w-4 h-4 text-tide" />
                    <span>{slot.startTime} – {slot.endTime}</span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-mist mt-2">
                    <MapPin className="w-3.5 h-3.5 text-mist" />
                    <span>{slot.room}</span>
                  </div>
                </div>

                <Link
                  href={`/navigation?destination=${encodeURIComponent(slot.room)}`}
                  className="w-full flex items-center justify-center gap-2 py-2 rounded-xl border border-line bg-surface/60 hover:bg-surface text-bone text-xs font-mono transition-colors"
                >
                  <MapPin className="w-3.5 h-3.5 text-tide" />
                  <span>Navigate to {slot.room}</span>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Drive Materials */}
      {activeTab === 'materials' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-serif text-bone">Lecture Materials & Repositories</h2>
              <p className="text-xs text-mist mt-1">Official course syllabus handouts, lecture slides, and lab code assets.</p>
            </div>
            <Link
              href="/drive"
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl border border-line bg-surface/50 hover:bg-surface text-xs font-mono text-bone transition-colors"
            >
              <FolderLock className="w-3.5 h-3.5 text-tide" />
              <span>Campus Drive</span>
            </Link>
          </div>

          <div className="space-y-3">
            {course.driveMaterials.map(mat => (
              <div
                key={mat.id}
                className="glass-panel p-4 rounded-xl border border-line bg-surface/30 flex items-center justify-between gap-4 hover:border-tide/40 transition-colors"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-ink/60 border border-line flex items-center justify-center text-xs font-mono font-bold text-tide">
                    {mat.type.toUpperCase()}
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-bone truncate">{mat.name}</div>
                    <div className="text-[11px] font-mono text-mist mt-0.5">
                      {mat.size} &bull; Uploaded {mat.date} &bull; {mat.downloads} downloads
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => alert(`Downloading ${mat.name}...`)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface/60 hover:bg-surface text-xs font-mono text-tide transition-colors flex-shrink-0"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Assignments */}
      {activeTab === 'assignments' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-bone">Coursework & Assignments</h2>
            <Link
              href="/assignments"
              className="text-xs font-mono text-tide hover:underline flex items-center gap-1"
            >
              <span>Assignments Hub</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-4">
            {course.assignments.map(asg => (
              <div
                key={asg.id}
                className="glass-panel p-5 rounded-2xl border border-line bg-surface/30 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-serif text-bone">{asg.title}</h3>
                    <span className="text-[11px] font-mono text-mist">({asg.weightage})</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono text-mist">
                    <span>Due: {asg.dueDate}</span>
                    <span>&bull;</span>
                    <span>Max Marks: {asg.totalMarks}</span>
                    {asg.score !== undefined && (
                      <>
                        <span>&bull;</span>
                        <span className="text-emerald-400 font-semibold">Awarded: {asg.score}/{asg.totalMarks}</span>
                      </>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs font-mono font-medium ${
                      asg.status === 'graded'
                        ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                        : asg.status === 'submitted'
                        ? 'bg-tide/15 text-tide border border-tide/30'
                        : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                    }`}
                  >
                    {asg.status === 'graded' ? 'Graded' : asg.status === 'submitted' ? 'Submitted' : 'Pending Submission'}
                  </span>

                  <Link
                    href="/assignments"
                    className="px-3.5 py-1.5 rounded-lg border border-line bg-surface hover:bg-surface/80 text-xs font-mono text-bone transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Attendance Standing */}
      {activeTab === 'attendance' && (
        <div className="space-y-6">
          <h2 className="text-xl font-serif text-bone">Official Attendance Health</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-line bg-surface/30 flex flex-col items-center text-center justify-center space-y-3">
              <div className="text-5xl font-serif text-bone text-emerald-400">
                {course.attendance.percentage}%
              </div>
              <div className="text-xs font-mono text-mist">Current Semester Standing</div>
              <div className="px-3 py-1 rounded-full text-[11px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                Above 75% Criteria
              </div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-line bg-surface/30 md:col-span-2 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-tide">Attendance Statistics</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl border border-line bg-ink/40">
                  <div className="text-[11px] font-mono text-mist">Attended Sessions</div>
                  <div className="text-2xl font-serif text-bone mt-1">{course.attendance.attended}</div>
                </div>
                <div className="p-4 rounded-xl border border-line bg-ink/40">
                  <div className="text-[11px] font-mono text-mist">Total Conducted</div>
                  <div className="text-2xl font-serif text-bone mt-1">{course.attendance.total}</div>
                </div>
                <div className="p-4 rounded-xl border border-line bg-ink/40">
                  <div className="text-[11px] font-mono text-mist">Buffer Margin</div>
                  <div className="text-2xl font-serif text-emerald-400 mt-1">4 Classes</div>
                </div>
              </div>

              <p className="text-xs text-mist leading-relaxed pt-2">
                You can safely miss up to 4 more classes in this course without dropping below the mandatory 75% institutional attendance requirement.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Tab 6 (Student): My Performance & Marks */}
      {activeTab === 'grades' && course.studentGrade && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-serif text-bone">Academic Evaluation & Marks Breakdown</h2>
            <Link
              href="/academics"
              className="text-xs font-mono text-tide hover:underline flex items-center gap-1"
            >
              <span>Full Semester Transcript</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-panel p-6 rounded-2xl border border-line bg-surface/30 flex flex-col items-center justify-center text-center space-y-3">
              <div className="text-6xl font-serif text-tide">{course.studentGrade.letterGrade}</div>
              <div className="text-xs font-mono text-mist">{course.studentGrade.gradePoint}.0 / 10.0 Grade Point</div>
              <div className="text-xs font-mono text-bone font-medium">{course.studentGrade.totalPercentage}% Overall Score</div>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-line bg-surface/30 md:col-span-2 space-y-4">
              <h3 className="text-sm font-mono uppercase tracking-widest text-tide">Component Assessment Scores</h3>
              <div className="space-y-3">
                {course.evaluationBreakdown.map(comp => (
                  <div key={comp.component} className="flex items-center justify-between p-3 rounded-xl border border-line bg-ink/40">
                    <div>
                      <div className="text-xs text-bone font-medium">{comp.component}</div>
                      <div className="text-[10px] font-mono text-mist">Weightage: {comp.weightage}% &bull; Max: {comp.maxMarks}</div>
                    </div>
                    <div className="text-right">
                      <span className="text-base font-serif text-bone font-semibold">{comp.scoredMarks}</span>
                      <span className="text-xs text-mist font-mono"> / {comp.maxMarks}</span>
                    </div>
                  </div>
                ))}
              </div>

              {course.studentGrade.remarks && (
                <div className="p-3.5 rounded-xl border border-tide/30 bg-tide/10 text-xs text-tide font-mono">
                  <span className="font-bold">Faculty Remarks:</span> {course.studentGrade.remarks}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 7 (Faculty): Gradebook Roster Management */}
      {activeTab === 'gradebook' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-serif text-bone">Official Faculty Gradebook</h2>
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono bg-tide/20 text-tide border border-tide/40">
                  {gradebookStudents.length} Students Enrolled
                </span>
              </div>
              <p className="text-xs text-mist mt-1">
                Enter continuous assessment marks, practical lab viva, and end-sem scores. Automatic 10-point letter grade assignment.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handlePublishAllGrades}
                disabled={publishing}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tide text-ink text-xs font-mono font-bold hover:bg-cyan-300 transition-colors shadow-lg shadow-tide/20"
              >
                {publishSuccess ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Published to Transcripts!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>{publishing ? 'Publishing...' : 'Publish All Grades'}</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Gradebook Spreadsheet Matrix */}
          <div className="glass-panel rounded-2xl border border-line bg-surface/30 overflow-x-auto">
            <table className="w-full text-left text-xs font-mono">
              <thead className="bg-ink/60 border-b border-line text-mist uppercase text-[10px] tracking-wider">
                <tr>
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-3">Quiz 1 (10)</th>
                  <th className="py-3 px-3">Asg 1 (15)</th>
                  <th className="py-3 px-3">Midterm (25)</th>
                  <th className="py-3 px-3">Lab Viva (20)</th>
                  <th className="py-3 px-3">End-Sem (30)</th>
                  <th className="py-3 px-3">Total (100)</th>
                  <th className="py-3 px-3">Grade</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line/60">
                {gradebookStudents.map(student => (
                  <tr key={student.id} className="hover:bg-surface/50 transition-colors">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div className="text-bone font-medium">{student.name}</div>
                      <div className="text-[10px] text-mist">{student.rollNumber}</div>
                    </td>

                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="0"
                        max="10"
                        step="0.5"
                        value={student.quiz1}
                        onChange={e => handleUpdateStudentMark(student.id, 'quiz1', parseFloat(e.target.value) || 0)}
                        className="w-14 px-2 py-1 bg-ink/70 border border-line rounded text-bone text-xs focus:border-tide outline-none"
                      />
                    </td>

                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="0"
                        max="15"
                        step="0.5"
                        value={student.assignment1}
                        onChange={e => handleUpdateStudentMark(student.id, 'assignment1', parseFloat(e.target.value) || 0)}
                        className="w-14 px-2 py-1 bg-ink/70 border border-line rounded text-bone text-xs focus:border-tide outline-none"
                      />
                    </td>

                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="0"
                        max="25"
                        step="0.5"
                        value={student.midterm}
                        onChange={e => handleUpdateStudentMark(student.id, 'midterm', parseFloat(e.target.value) || 0)}
                        className="w-14 px-2 py-1 bg-ink/70 border border-line rounded text-bone text-xs focus:border-tide outline-none"
                      />
                    </td>

                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="0"
                        max="20"
                        step="0.5"
                        value={student.labViva}
                        onChange={e => handleUpdateStudentMark(student.id, 'labViva', parseFloat(e.target.value) || 0)}
                        className="w-14 px-2 py-1 bg-ink/70 border border-line rounded text-bone text-xs focus:border-tide outline-none"
                      />
                    </td>

                    <td className="py-3 px-3">
                      <input
                        type="number"
                        min="0"
                        max="30"
                        step="0.5"
                        value={student.endSem}
                        onChange={e => handleUpdateStudentMark(student.id, 'endSem', parseFloat(e.target.value) || 0)}
                        className="w-14 px-2 py-1 bg-ink/70 border border-line rounded text-bone text-xs focus:border-tide outline-none"
                      />
                    </td>

                    <td className="py-3 px-3 font-serif font-bold text-bone text-sm">
                      {student.total}
                    </td>

                    <td className="py-3 px-3">
                      <span className="px-2 py-0.5 rounded font-bold text-xs bg-tide/15 text-tide border border-tide/30">
                        {student.letterGrade}
                      </span>
                    </td>

                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] uppercase ${
                          student.status === 'Published'
                            ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
                            : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
                        }`}
                      >
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
