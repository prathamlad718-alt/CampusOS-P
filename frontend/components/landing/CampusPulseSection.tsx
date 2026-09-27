'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  ExternalLink,
  Flame,
  Radio
} from 'lucide-react';

const CALENDAR_EVENTS = [
  {
    day: "27",
    month: "SEP",
    fullDate: "September 27, 2024",
    title: "Course Add/Drop Period Final Cutoff",
    time: "23:59 IST",
    location: "Online via CampusOS Courses Hub",
    type: "Academic",
    status: "Mandatory",
    desc: "Last day for undergraduate and graduate scholars to modify registered elective courses without academic penalty."
  },
  {
    day: "03",
    month: "OCT",
    fullDate: "October 03, 2024",
    title: "Dean's Colloquium on Autonomous Robotics",
    time: "14:00 - 17:30 IST",
    location: "Main Auditorium & Hybrid Stream",
    type: "Symposium",
    status: "RSVP Open",
    desc: "Keynote lectures by visiting research fellows from MIT Media Lab and Stanford AI Institute."
  },
  {
    day: "19",
    month: "OCT",
    fullDate: "October 19, 2024",
    title: "Mid-Semester Examination Commencement",
    time: "09:30 IST",
    location: "Designated Examination Blocks A & B",
    type: "Examination",
    status: "Admit Card Req.",
    desc: "Centralized seating allocations and digital hall tickets are published directly inside the Timetable module."
  },
  {
    day: "28",
    month: "OCT",
    fullDate: "October 28, 2024",
    title: "Annual HackCampus 48-Hour Invitational",
    time: "18:00 IST",
    location: "Innovation Hub & GPU Lab",
    type: "Hackathon",
    status: "Registration Live",
    desc: "Over $25,000 in project grants for student teams deploying on the CampusOS Plugin SDK."
  }
];

export function CampusPulseSection() {
  const [selectedEventIndex, setSelectedEventIndex] = useState(0);

  const selectedEvent = CALENDAR_EVENTS[selectedEventIndex];

  return (
    <section className="relative w-full py-28 px-6 bg-ink border-t border-line/60" id="bulletins">
      {/* Background radial glow */}
      <div className="absolute top-1/3 right-10 w-[500px] h-[500px] bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="max-w-7xl mx-auto space-y-12">
        
        {/* Header: Duke "News." signature with electric blue dot + Buriver elegance */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-line">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <p className="text-[11px] font-mono uppercase tracking-widest text-blue-400">
                Live Institutional Telemetry &amp; Bulletins
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-bone tracking-tight">
              News<span className="text-blue-500">.</span>
            </h2>
          </div>

          <Link
            href="/announcements"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-mist hover:text-blue-400 transition-colors"
          >
            <span>View All Institutional Directives</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Asymmetric Layout: 60% Editorial News Stories (Left) + 40% Interactive Calendar & Citizen Card (Right) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: NEWS STORIES (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* BIG FEATURED STORY CARD (Duke / Buriver signature) */}
            <Link href="/announcements" className="group block">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative rounded-2xl overflow-hidden border border-line-strong bg-ink-2 shadow-2xl transition-all duration-300 hover:border-blue-500/50"
              >
                {/* Featured Story Image */}
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
                  <Image
                    src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1600&q=80"
                    alt="Campus High-Tech Lab"
                    fill
                    className="object-cover object-center brightness-90 group-hover:scale-105 transition-transform duration-700 mix-blend-luminosity hover:mix-blend-normal"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
                  
                  {/* Top badges */}
                  <div className="absolute top-4 left-4 flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-orange-600 text-white font-medium shadow-md">
                      Featured Bulletin
                    </span>
                    <span className="px-2.5 py-1 rounded text-[10px] font-mono uppercase tracking-wider bg-ink/80 text-bone border border-line backdrop-blur-md">
                      Autumn Term &bull; 2024
                    </span>
                  </div>
                </div>

                {/* Featured Story Details */}
                <div className="p-6 sm:p-8 space-y-3">
                  <div className="flex items-center gap-3 text-xs font-mono text-mist">
                    <span className="text-blue-400 font-medium">Research Infrastructure</span>
                    <span>&bull;</span>
                    <span>Department of Computer Science</span>
                  </div>

                  <h3 className="font-serif text-2xl sm:text-3xl text-bone leading-tight group-hover:text-blue-300 transition-colors">
                    128-GPU AI Research Cluster Deployed: Open for Undergraduate Thesis Reservations
                  </h3>

                  <p className="text-xs sm:text-sm text-mist font-light leading-relaxed">
                    Senior engineering scholars and doctoral candidates can now reserve dedicated computational nodes directly through CampusOS Facility Booking for deep learning workloads.
                  </p>

                  <div className="pt-4 flex items-center justify-between border-t border-line/40 text-xs font-mono">
                    <span className="text-bone group-hover:text-blue-400 flex items-center gap-1.5 transition-colors">
                      <span>Read Full Directive</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </span>
                    <span className="text-emerald-400">● Live on CampusOS Booking</span>
                  </div>
                </div>
              </motion.div>
            </Link>

            {/* 2 SECONDARY NEWS CARDS IN SUB-GRID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              
              {/* Secondary Card 1 */}
              <Link href="/timetable" className="group block">
                <div className="h-full p-5 rounded-xl border border-line-strong bg-ink-2/60 hover:bg-ink-2 hover:border-line-strong backdrop-blur-md transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-orange-400 uppercase tracking-widest">Academics</span>
                      <span className="text-mist">Yesterday</span>
                    </div>
                    <h4 className="font-serif text-base text-bone font-medium group-hover:text-orange-300 transition-colors">
                      Mid-Term Examination Hall Allocations Published
                    </h4>
                    <p className="text-xs text-mist font-light leading-relaxed">
                      Seating rosters with room clash prevention are now synchronized to each student&apos;s personal timetable view.
                    </p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-line/30 flex items-center justify-between text-[11px] font-mono text-mist group-hover:text-bone">
                    <span>Inspect Rooms</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </Link>

              {/* Secondary Card 2 */}
              <Link href="/transport" className="group block">
                <div className="h-full p-5 rounded-xl border border-line-strong bg-ink-2/60 hover:bg-ink-2 hover:border-line-strong backdrop-blur-md transition-all flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-emerald-400 uppercase tracking-widest">Transit Fleet</span>
                      <span className="text-mist">2 days ago</span>
                    </div>
                    <h4 className="font-serif text-base text-bone font-medium group-hover:text-emerald-300 transition-colors">
                      Route 4 Direct Express Added Between North Quad and Central Library
                    </h4>
                    <p className="text-xs text-mist font-light leading-relaxed">
                      15-minute scheduled frequency with live GPS telemetry accessible on student mobile dashboards.
                    </p>
                  </div>
                  <div className="pt-3 mt-4 border-t border-line/30 flex items-center justify-between text-[11px] font-mono text-mist group-hover:text-bone">
                    <span>Live GPS Telemetry</span>
                    <span>&rarr;</span>
                  </div>
                </div>
              </Link>

            </div>

          </div>

          {/* RIGHT: INTERACTIVE ACADEMIC CALENDAR & CITIZEN CARD (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* 1. INTERACTIVE ACADEMIC CALENDAR WIDGET (Duke Reference Signature) */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="rounded-2xl border border-line-strong bg-ink-2 p-6 shadow-2xl backdrop-blur-xl space-y-5"
            >
              {/* Calendar Widget Top */}
              <div className="flex items-center justify-between pb-3 border-b border-line">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-blue-400" />
                  <span className="font-serif text-base text-bone font-medium">
                    Autumn Term Calendar
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-blue-500/10 text-blue-300 border border-blue-500/20">
                  Oct 2024
                </span>
              </div>

              {/* Event Date Cards Selector */}
              <div className="space-y-2.5">
                {CALENDAR_EVENTS.map((event, idx) => (
                  <button
                    key={event.title}
                    type="button"
                    onClick={() => setSelectedEventIndex(idx)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-start gap-3.5 ${
                      selectedEventIndex === idx
                        ? 'bg-blue-600/15 border-blue-500/60 shadow-lg shadow-blue-500/5'
                        : 'bg-ink/50 border-line/60 hover:bg-surface-raised/40 hover:border-line'
                    }`}
                  >
                    {/* Date Badge (Duke Style) */}
                    <div className={`w-12 h-12 rounded-lg flex flex-col items-center justify-center shrink-0 border ${
                      selectedEventIndex === idx
                        ? 'bg-blue-600 text-white border-blue-400'
                        : 'bg-surface-raised text-mist border-line'
                    }`}>
                      <span className="text-[10px] font-mono font-bold leading-none uppercase">
                        {event.month}
                      </span>
                      <span className="text-base font-serif font-bold leading-none mt-1">
                        {event.day}
                      </span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono uppercase tracking-wider ${
                          selectedEventIndex === idx ? 'text-blue-400 font-semibold' : 'text-mist'
                        }`}>
                          {event.type}
                        </span>
                        <span className="text-[10px] font-mono text-mist">
                          {event.status}
                        </span>
                      </div>
                      <h5 className="font-serif text-xs sm:text-sm text-bone font-medium truncate mt-0.5">
                        {event.title}
                      </h5>
                      <p className="text-[11px] font-mono text-mist truncate mt-0.5">
                        {event.time} &bull; {event.location.split('&')[0]}
                      </p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Selected Event Expanded Details */}
              <div className="p-4 rounded-xl bg-ink/70 border border-line space-y-2">
                <div className="flex items-center justify-between text-[11px] font-mono">
                  <span className="text-blue-400 font-semibold">{selectedEvent.fullDate}</span>
                  <span className="text-mist">{selectedEvent.time}</span>
                </div>
                <h6 className="font-serif text-sm text-bone font-medium">
                  {selectedEvent.title}
                </h6>
                <p className="text-xs text-mist font-light leading-relaxed">
                  {selectedEvent.desc}
                </p>
                <div className="pt-2 flex items-center justify-between text-xs font-mono">
                  <span className="text-mist text-[10px] truncate max-w-[200px]">
                    📍 {selectedEvent.location}
                  </span>
                  <Link
                    href="/timetable"
                    className="text-blue-400 hover:underline flex items-center gap-1 text-[11px]"
                  >
                    <span>Sync to Timetable</span>
                    <ExternalLink className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </motion.div>

            {/* 2. DUKE-STYLE VIBRANT ELECTRIC BLUE CITIZEN CARD */}
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="relative rounded-2xl p-6 sm:p-7 bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-2xl shadow-blue-600/30 overflow-hidden"
            >
              {/* Diagonal decorative geometric bands */}
              <div className="absolute -top-12 -right-12 w-40 h-40 bg-white/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="relative z-10 space-y-4">
                <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded bg-white/15 backdrop-blur-md text-[10px] font-mono uppercase tracking-widest text-white">
                  <Radio className="w-3 h-3 animate-pulse" />
                  <span>Student &amp; Faculty Console</span>
                </div>

                <h3 className="font-serif text-2xl text-white font-medium leading-tight">
                  Single Sign-On for All 15 Campus Subsystems
                </h3>

                <p className="text-xs text-blue-100 font-light leading-relaxed">
                  Authenticate using your university email or RFID credential to instantly access your timetable, 10.0 GPA transcripts, seat reservations, and maintenance tickets.
                </p>

                <div className="pt-2 flex items-center gap-3">
                  <Link
                    href="/dashboard"
                    className="inline-flex items-center justify-center gap-2 h-11 px-5 rounded-lg bg-ink hover:bg-ink-2 text-bone font-medium text-xs font-mono uppercase tracking-wider shadow-lg transition-transform hover:scale-105 active:scale-100"
                  >
                    <span>Launch Console</span>
                    <ArrowRight className="w-3.5 h-3.5 text-blue-400" />
                  </Link>
                  <Link
                    href="/login"
                    className="inline-flex items-center justify-center h-11 px-4 rounded-lg bg-white/10 hover:bg-white/20 text-white font-mono text-xs uppercase tracking-wider transition-colors"
                  >
                    <span>Sign In</span>
                  </Link>
                </div>
              </div>
            </motion.div>

          </div>

        </div>

      </div>
    </section>
  );
}
