'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  BookOpen,
  Calendar,
  Building2,
  BellRing,
  ArrowRight,
  Quote,
  CheckCircle2,
  Award
} from 'lucide-react';

const QUICK_ACTIONS = [
  {
    icon: BookOpen,
    label: "Academic Course Catalog",
    sub: "Browse 42 verified departmental syllabi",
    href: "/courses"
  },
  {
    icon: Calendar,
    label: "Master Weekly Timetable",
    sub: "Day View & recurring weekly schedules",
    href: "/timetable"
  },
  {
    icon: Building2,
    label: "Reserve Facility or Lab",
    sub: "Real-time seat & hall reservation",
    href: "/booking"
  },
  {
    icon: BellRing,
    label: "Emergency & Dean Directives",
    sub: "Verified broadcast bulletins",
    href: "/announcements"
  }
];

export function CampusStorySection() {
  return (
    <section className="relative w-full py-28 px-6 bg-ink-2/30 border-t border-line/60 overflow-hidden">
      {/* Editorial Terracotta Decorative Line Accent (Buriver signature) */}
      <div className="absolute top-0 right-1/3 w-px h-full bg-line/30 pointer-events-none hidden lg:block" />

      <div className="max-w-7xl mx-auto space-y-20">
        
        {/* 1. EDITORIAL STUDENT SPOTLIGHT SPREAD */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Quick Action Directory (AUBG Homage) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-4 space-y-4"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
              <p className="text-[11px] font-mono uppercase tracking-widest text-orange-400">
                Institutional Access
              </p>
            </div>
            <h3 className="font-serif text-2xl sm:text-3xl text-bone tracking-tight mb-6">
              Direct Portals
            </h3>

            <div className="space-y-3">
              {QUICK_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    className="group flex items-start gap-4 p-4 rounded-xl border border-line-strong bg-ink/70 hover:bg-ink-2 hover:border-orange-500/40 backdrop-blur-md transition-all duration-300"
                  >
                    <div className="w-9 h-9 rounded-lg bg-orange-500/10 border border-orange-500/20 text-orange-400 flex items-center justify-center shrink-0 group-hover:scale-105 group-hover:bg-orange-500 group-hover:text-white transition-all">
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className="font-medium text-xs text-bone group-hover:text-orange-300 transition-colors">
                          {action.label}
                        </span>
                        <ArrowRight className="w-3.5 h-3.5 text-mist group-hover:text-orange-400 group-hover:translate-x-1 transition-all" />
                      </div>
                      <p className="text-[11px] text-mist font-light truncate mt-0.5">
                        {action.sub}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="p-4 rounded-xl bg-orange-500/5 border border-orange-500/20 text-xs text-mist font-light">
              <div className="flex items-center gap-2 text-orange-400 font-mono text-[11px] font-medium mb-1">
                <Award className="w-3.5 h-3.5" />
                <span>Accreditation Ready</span>
              </div>
              All transcripts, grade sheets, and attendance ledgers adhere to official university academic council bylaws.
            </div>
          </motion.div>

          {/* Center Column: Big Editorial Pull Quote (Buriver & AUBG synthesis) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="lg:col-span-5 space-y-6"
          >
            {/* Terracotta quote mark badge */}
            <div className="w-12 h-12 rounded-xl bg-orange-600/15 border border-orange-600/30 flex items-center justify-center text-orange-500">
              <Quote className="w-6 h-6 fill-current" />
            </div>

            <blockquote className="font-serif italic text-xl sm:text-2xl lg:text-3xl text-bone leading-snug">
              &ldquo;Before CampusOS, every department ran on disconnected silos—one portal for attendance, paper slips for lab desks, and lost emails for circulars. CampusOS transformed our university into one coherent digital institution.&rdquo;
            </blockquote>

            <div className="pt-4 border-t border-line/50 space-y-1">
              <div className="font-sans font-medium text-base text-bone">
                Elena Rostova
              </div>
              <p className="text-xs font-mono text-orange-400 tracking-wide">
                President &bull; University Student Council &bull; B.Tech Computer Science &apos;25
              </p>
              <p className="text-xs text-mist font-light pt-2 leading-relaxed">
                Elena led the student body pilot across 3 engineering departments, coordinating continuous feedback on the seat booking and 5-unit syllabus interfaces.
              </p>
            </div>
          </motion.div>

          {/* Right Column: Overlapping Portrait with Terracotta Frame (Buriver Signature) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-3 relative flex justify-center"
          >
            {/* Terracotta geometric backing box (Buriver reference) */}
            <div className="absolute -top-4 -right-4 w-full h-full border-2 border-orange-500/30 rounded-2xl pointer-events-none hidden sm:block" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 bg-orange-500/10 rounded-2xl blur-xl pointer-events-none" />

            {/* Portrait Image Card */}
            <div className="relative aspect-[3/4] w-full max-w-xs rounded-2xl overflow-hidden border border-line-strong bg-ink shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80"
                alt="Student Leader Portrait"
                fill
                className="object-cover object-top mix-blend-luminosity brightness-90 hover:mix-blend-normal transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
              
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-lg bg-ink/80 border border-line/60 backdrop-blur-md">
                <p className="text-[10px] font-mono text-orange-400 uppercase tracking-widest">
                  Verified Scholar
                </p>
                <p className="text-xs font-medium text-bone">
                  Elena Rostova &middot; 9.42 SGPA
                </p>
              </div>
            </div>
          </motion.div>

        </div>

        {/* 2. FACULTY & ADMINISTRATION ENDORSEMENT BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-2xl border border-line-strong bg-ink/80 p-8 lg:p-10 backdrop-blur-xl overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/5 blur-[100px] pointer-events-none" />
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-8 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span className="text-[11px] font-mono uppercase tracking-widest text-blue-400">
                  Academic Governance Perspective
                </span>
              </div>
              <h4 className="font-serif text-xl sm:text-2xl text-bone leading-relaxed">
                &ldquo;Automating the 10.0 GPA scale gradebook and publishing instantaneous hall holds for midterms reduced exam office administration overhead by seventy percent.&rdquo;
              </h4>
              <div className="flex items-center gap-3 pt-2">
                <div className="w-10 h-10 rounded-full bg-blue-500/20 border border-blue-500/30 flex items-center justify-center font-serif text-blue-300 font-bold">
                  AV
                </div>
                <div>
                  <div className="text-sm font-medium text-bone">Prof. Arthur Vance</div>
                  <div className="text-xs font-mono text-mist">Dean of Academic Systems &bull; Faculty of Engineering</div>
                </div>
              </div>
            </div>

            <div className="md:col-span-4 flex flex-col justify-center border-t md:border-t-0 md:border-l border-line/60 pt-6 md:pt-0 md:pl-8 space-y-3">
              <div className="text-xs font-mono uppercase tracking-widest text-mist">
                System Compliance
              </div>
              <div className="flex items-center gap-2 text-xs text-bone">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NAAC &amp; ABET Audit Ready</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-bone">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Role-Based Access Control (RBAC)</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-bone">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Cryptographic Transcript Verification</span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
