'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Calendar,
  BookOpen,
  GraduationCap,
  Armchair,
  BellRing,
  Bus,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  MapPin,
  ShieldCheck,
  ChevronRight
} from 'lucide-react';

const MODULES = [
  {
    tag: "Core Academic",
    title: "Master Weekly Timetable",
    description: "Zero-clash recurring timetable engine with Day View, Weekly Matrix, and real-time room conflict prevention.",
    link: "/timetable",
    linkText: "Launch Timetable Engine",
    color: "blue",
    previewType: "timetable"
  },
  {
    tag: "Curriculum Hub",
    title: "5-Unit Syllabus & Courses",
    description: "Complete academic syllabus structure with unit breakdown, faculty contact, and live attendance health telemetry.",
    link: "/courses",
    linkText: "Browse Courses Hub",
    color: "indigo",
    previewType: "courses"
  },
  {
    tag: "Evaluation Engine",
    title: "Gradebook & 10.0 Transcripts",
    description: "Continuous assessment ledgers, SGPA / CGPA calculations, and verified semester academic transcripts.",
    link: "/academics",
    linkText: "View Academic Transcripts",
    color: "emerald",
    previewType: "academics"
  },
  {
    tag: "Spatial Operations",
    title: "Smart Seat & Facility Booking",
    description: "Book individual lab workstations and library study pods, or reserve entire lecture halls for departmental faculty.",
    link: "/booking",
    linkText: "Reserve Campus Desks",
    color: "orange",
    previewType: "booking"
  },
  {
    tag: "Directives & Safety",
    title: "Actionable Alerts & Bulletins",
    description: "High-priority circulars with audience targeting (Campus-Wide, Department, Semester) and one-click remediation actions.",
    link: "/announcements",
    linkText: "View Official Bulletins",
    color: "rose",
    previewType: "alerts"
  },
  {
    tag: "Fleet & Mobility",
    title: "Live Transit & Wayfinding",
    description: "Real-time GPS shuttle tracking across campus sectors, route stops, and maintenance dispatch tickets.",
    link: "/transport",
    linkText: "Track Transit Fleet",
    color: "teal",
    previewType: "transport"
  }
];

export function FeatureEcosystemSection() {
  return (
    <section className="relative w-full py-28 px-6 bg-ink border-t border-line/60" id="ecosystem">
      {/* Background Subtle Ambience */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-blue-600/5 blur-[140px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto">
        {/* Section Header (AUBG "OUR ADVANTAGE" Reference Signature) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-line"
        >
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400">
                Institutional Architecture
              </span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-bone tracking-tight">
              OUR <span className="font-sans font-light tracking-wide text-mist">ADVANTAGE</span>
            </h2>
            <p className="text-sm sm:text-base text-mist font-light mt-3 max-w-xl">
              Six foundational operating pillars engineered to replace fragmented spreadsheets, departmental silos, and paper workflows.
            </p>
          </div>

          <div className="mt-6 md:mt-0 flex items-center gap-3">
            <Link
              href="/dashboard"
              className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-bone hover:text-blue-400 px-4 py-2 rounded-lg border border-line hover:border-blue-500/40 bg-ink-2/60 transition-colors"
            >
              <span>Explore All 15 Subsystems</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </motion.div>

        {/* 6-Card Institutional Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {MODULES.map((mod, idx) => (
            <motion.div
              key={mod.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="group relative flex flex-col justify-between p-6 rounded-2xl border border-line-strong bg-ink-2/50 hover:bg-ink-2/90 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/40 hover:shadow-2xl hover:shadow-blue-500/5"
            >
              {/* Card Header */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-surface-raised border border-line text-mist group-hover:text-blue-300 group-hover:border-blue-500/30 transition-colors">
                    {mod.tag}
                  </span>
                  <span className="text-[11px] font-mono text-mist">0{idx + 1}</span>
                </div>

                <h3 className="font-serif text-xl text-bone font-medium tracking-tight mb-2 group-hover:text-white transition-colors">
                  {mod.title}
                </h3>
                <p className="text-xs text-mist font-light leading-relaxed mb-6">
                  {mod.description}
                </p>
              </div>

              {/* Dynamic Micro-UI Preview Box */}
              <div className="my-2 p-4 rounded-xl bg-ink/80 border border-line/60 space-y-2.5 font-mono text-xs">
                {mod.previewType === 'timetable' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-mist pb-1 border-b border-line/40">
                      <span>MON &bull; PERIOD 2</span>
                      <span className="text-emerald-400">● LIVE IN SESSION</span>
                    </div>
                    <div className="flex items-center justify-between p-2 rounded bg-blue-500/10 border border-blue-500/30 text-bone">
                      <div>
                        <div className="font-semibold text-xs text-blue-300">CS301 Operating Systems</div>
                        <div className="text-[10px] text-mist">Hall B-204 &bull; Dr. Alistair Ross</div>
                      </div>
                      <span className="text-[10px] text-blue-400 font-bold">10:15 - 11:10</span>
                    </div>
                  </div>
                )}

                {mod.previewType === 'courses' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-mist pb-1 border-b border-line/40">
                      <span>CURRICULUM PROGRESS</span>
                      <span className="text-bone">4 Credits</span>
                    </div>
                    <div className="flex gap-1 pt-1">
                      {['U1', 'U2', 'U3', 'U4', 'U5'].map((u, i) => (
                        <span
                          key={u}
                          className={`flex-1 text-center py-1 text-[10px] rounded ${
                            i < 3 ? 'bg-blue-600/30 text-blue-300 border border-blue-500/40' : 'bg-surface-raised text-mist border border-line'
                          }`}
                        >
                          {u}
                        </span>
                      ))}
                    </div>
                    <div className="flex justify-between text-[10px] text-mist pt-1">
                      <span>Attendance Health</span>
                      <span className="text-emerald-400 font-bold">88.5% (Safe)</span>
                    </div>
                  </div>
                )}

                {mod.previewType === 'academics' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-mist pb-1 border-b border-line/40">
                      <span>CUMULATIVE CGPA</span>
                      <span className="text-emerald-400 font-bold">8.76 / 10.0</span>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5 text-center text-[10px] pt-1">
                      <div className="p-1.5 rounded bg-surface-raised border border-line">
                        <div className="text-mist">Sem 5</div>
                        <div className="text-bone font-bold">8.90</div>
                      </div>
                      <div className="p-1.5 rounded bg-surface-raised border border-line">
                        <div className="text-mist">Sem 4</div>
                        <div className="text-bone font-bold">8.65</div>
                      </div>
                      <div className="p-1.5 rounded bg-surface-raised border border-line">
                        <div className="text-mist">Credits</div>
                        <div className="text-blue-300 font-bold">114 Earned</div>
                      </div>
                    </div>
                  </div>
                )}

                {mod.previewType === 'booking' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-mist pb-1 border-b border-line/40">
                      <span>AI LAB WORKSTATIONS</span>
                      <span className="text-orange-400">8 of 24 Free</span>
                    </div>
                    <div className="grid grid-cols-6 gap-1 pt-1">
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((s) => (
                        <span
                          key={s}
                          className={`h-5 rounded flex items-center justify-center text-[9px] ${
                            [2, 5, 8, 11].includes(s)
                              ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                              : 'bg-surface-raised text-mist/60 border border-line/40'
                          }`}
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                    <div className="text-[10px] text-mist pt-0.5">Faculty Hall Hold &bull; Active</div>
                  </div>
                )}

                {mod.previewType === 'alerts' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-rose-400 pb-1 border-b border-line/40">
                      <span>OFFICIAL DIRECTIVE</span>
                      <span className="font-bold">URGENT</span>
                    </div>
                    <p className="text-[11px] font-sans text-bone/90 line-clamp-1">
                      Midterm schedule updated for all CS Sem 5 students
                    </p>
                    <div className="flex justify-between items-center text-[10px] text-mist">
                      <span>Audience: CS Dept</span>
                      <span className="text-blue-400 underline">1-Click Jump &rarr;</span>
                    </div>
                  </div>
                )}

                {mod.previewType === 'transport' && (
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center text-[10px] text-mist pb-1 border-b border-line/40">
                      <span>SHUTTLE ROUTE 4</span>
                      <span className="text-emerald-400">● ON TIME</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px] text-bone">
                      <span>Approaching Library Hub</span>
                      <span className="text-blue-400 font-bold">3 mins</span>
                    </div>
                    <div className="h-1.5 w-full bg-surface-raised rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 w-3/4 rounded-full" />
                    </div>
                  </div>
                )}
              </div>

              {/* Action Link */}
              <div className="pt-4 border-t border-line/40 flex items-center justify-between">
                <Link
                  href={mod.link}
                  className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-mist group-hover:text-blue-400 transition-colors"
                >
                  <span>{mod.linkText}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <div className="w-2 h-2 rounded-full bg-line-strong group-hover:bg-blue-500 transition-colors" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
