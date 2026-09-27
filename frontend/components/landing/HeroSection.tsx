'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import {
  Play,
  ArrowRight,
  GraduationCap,
  Building2,
  Bus,
  Search,
  CheckCircle2,
  Calendar,
  Sparkles,
  MapPin,
  X,
  Compass,
  Laptop,
  Users
} from 'lucide-react';

const COMMANDS = [
  "Book Lab 3 workstation for AI thesis project...",
  "View CS301 Operating Systems 5-unit syllabus...",
  "Check Semester 6 SGPA & Examination Ledger...",
  "Track Campus Shuttle Route 4 on live GPS...",
  "Reserve Seminar Hall B for Tech Symposium...",
  "Check attendance health across registered courses..."
];

function TypewriterText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % COMMANDS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={index}
        initial={{ y: 8, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -8, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-xs sm:text-sm text-bone font-mono m-0 truncate"
      >
        {COMMANDS[index]}
      </motion.p>
    </AnimatePresence>
  );
}

export function HeroSection() {
  const [tourOpen, setTourOpen] = useState(false);
  const [activeTourStop, setActiveTourStop] = useState(0);

  const tourStops = [
    {
      title: "Alan Turing Computational Sciences Wing",
      desc: "Home to the 128-GPU AI Cluster and high-density engineering workstations bookable via CampusOS.",
      image: "https://images.unsplash.com/photo-1521587760476-6c12a4b040da?auto=format&fit=crop&w=1200&q=80",
      location: "North Sector &bull; Building C",
      specs: "64 Workstations &bull; 10Gbps Fiber Backbone"
    },
    {
      title: "Central Academic Colonnade & Library",
      desc: "Five floors of quiet research pods, collaborative debate chambers, and automated RFID book dispensaries.",
      image: "https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?auto=format&fit=crop&w=1200&q=80",
      location: "Central Quadrangle &bull; Block A",
      specs: "1,200 Reading Desks &bull; 24/7 RFID Turnstiles"
    },
    {
      title: "Innovation Quadrangle & Seminar Complex",
      desc: "Tiered executive auditoriums equipped with multi-stream recording for hybrid university lectures.",
      image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=1200&q=80",
      location: "South Campus &bull; Pavilion 2",
      specs: "450-Seat Capacity &bull; 4K Dual Projection"
    }
  ];

  return (
    <section className="relative min-h-[92vh] w-full overflow-hidden flex flex-col justify-between pt-16 pb-12 border-b border-line/50">
      {/* 1. CINEMATIC BACKGROUND: AERIAL CAMPUS ARCHITECTURE WITH DARK OVERLAYS */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?auto=format&fit=crop&w=2000&q=85"
          alt="Aerial Campus Architecture"
          fill
          priority
          className="object-cover object-center opacity-30 mix-blend-luminosity brightness-75 scale-105"
        />
        {/* Editorial Gradients: Top fade, bottom fade, and side vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/80 to-ink" />
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-ink/60 to-ink" />
        
        {/* Terracotta geometric line accent (Buriver homage) */}
        <div className="absolute top-0 right-1/4 w-px h-64 bg-gradient-to-b from-orange-600/40 via-orange-600/10 to-transparent" />
        <div className="absolute top-20 right-1/4 -translate-x-1/2 w-2 h-2 rounded-full bg-orange-600/60 ring-4 ring-orange-600/20" />
      </div>

      {/* 2. MAIN HERO DISPLAY AREA */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-8 pb-12">
        {/* Ethos / Philosophy quote line (Buriver-style quotation) */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-wrap items-center gap-3 mb-6"
        >
          <span className="font-serif italic text-orange-500/90 text-sm tracking-wide">
            &ldquo;If you plan for a year, manage schedules. If you plan for a lifetime, educate people.&rdquo;
          </span>
          <span className="hidden sm:inline text-line">&bull;</span>
          <span className="text-[11px] font-mono uppercase tracking-widest text-mist">
            Foundational Institutional Principle
          </span>
        </motion.div>

        {/* Hero Title and Subtitle Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="lg:col-span-8 space-y-6"
          >
            {/* Live Operational Beacon */}
            <div className="inline-flex items-center gap-2.5 rounded-full border border-line-strong bg-ink/70 px-4 py-1.5 text-xs font-mono tracking-wider text-mist backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span className="text-bone font-medium">CampusOS Kernel v2.4</span>
              <span className="text-line">|</span>
              <span className="text-blue-400">Autonomous University System</span>
            </div>

            {/* Massive Editorial Serif Headline (Duke + Buriver + AUBG synthesis) */}
            <h1 className="text-4xl sm:text-6xl xl:text-7xl font-serif text-bone leading-[1.08] tracking-tight">
              YOUR CAMPUS.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-bone via-mist to-blue-300">
                ONE OPERATING SYSTEM.
              </span>
            </h1>

            {/* Clear, authoritative institutional subheadline */}
            <p className="text-base sm:text-lg text-mist max-w-2xl font-sans font-light leading-relaxed">
              Unify physical classrooms, master weekly timetables, 10.0 GPA transcripts, smart facility bookings, and transit fleet telemetry into one prestigious, real-time institutional platform.
            </p>

            {/* Action Cluster: Electric Blue CTA + Virtual Tour + Curriculum Link */}
            <div className="flex flex-wrap items-center gap-4 pt-3">
              {/* Electric Blue CTA (Duke reference signature) */}
              <Link
                href="/dashboard"
                className="inline-flex items-center justify-center gap-2.5 h-13 px-8 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm tracking-wide shadow-xl shadow-blue-600/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
              >
                <span>Enter Campus OS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              {/* Floating Virtual Tour Overlay Trigger (AUBG reference signature) */}
              <button
                type="button"
                onClick={() => setTourOpen(true)}
                className="inline-flex items-center justify-center gap-2.5 h-13 px-6 rounded-lg bg-ink-2/80 hover:bg-surface-raised border border-line-strong text-bone text-sm font-medium backdrop-blur-md transition-all group hover:border-blue-500/50"
              >
                <div className="w-6 h-6 rounded-full bg-blue-500/20 group-hover:bg-blue-500/30 flex items-center justify-center text-blue-400">
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
                <span>Virtual Campus Tour</span>
              </button>

              {/* Secondary Academics shortcut */}
              <Link
                href="/courses"
                className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-wider text-mist hover:text-bone px-3 py-2 transition-colors"
              >
                <span>Curriculum &amp; Syllabi</span>
                <span className="text-blue-400">&rarr;</span>
              </Link>
            </div>
          </motion.div>

          {/* Interactive Command Bar Mockup (Right / Lower Column) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="lg:col-span-4"
          >
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-blue-600/20 via-orange-600/10 to-indigo-600/20 rounded-2xl blur-lg opacity-40 group-hover:opacity-75 transition duration-500" />
              
              <div className="relative bg-ink-2/90 border border-line-strong rounded-2xl p-5 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-line/60">
                  <div className="flex items-center gap-2">
                    <Search className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono uppercase tracking-widest text-mist">
                      Campus Dispatch
                    </span>
                  </div>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-ink border border-line text-[10px] font-mono text-mist">
                    <span>⌘</span>
                    <span>K</span>
                  </div>
                </div>

                <div className="h-10 flex items-center bg-ink/80 rounded-lg px-3.5 border border-line/80">
                  <TypewriterText />
                </div>

                {/* Live System Signal Badges */}
                <div className="grid grid-cols-2 gap-2 text-[11px] font-mono text-mist pt-1">
                  <div className="flex items-center gap-1.5 p-2 rounded bg-ink/50 border border-line/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="truncate">Attendance 87.6%</span>
                  </div>
                  <div className="flex items-center gap-1.5 p-2 rounded bg-ink/50 border border-line/40">
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                    <span className="truncate">Next: CS301 (10:15)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* 3. THREE FLOATING ENTRY CARDS (Duke Reference Architecture) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Academic Core */}
          <Link href="/courses" className="group block">
            <div className="h-full p-5 rounded-xl border border-line-strong bg-ink/80 hover:bg-ink-2/90 backdrop-blur-xl transition-all duration-300 hover:border-blue-500/50 hover:shadow-xl hover:shadow-blue-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-105 transition-transform">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-mist group-hover:text-blue-400 transition-colors flex items-center gap-1">
                    <span>Explore</span>
                    <span>&rarr;</span>
                  </span>
                </div>
                <h3 className="font-serif text-lg text-bone font-medium tracking-tight group-hover:text-white">
                  Academic Core &amp; Transcripts
                </h3>
                <p className="text-xs text-mist font-light mt-1.5 leading-relaxed">
                  Interactive 5-unit course syllabi, master timetable clash resolver, and faculty continuous evaluation gradebook.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-line/40 flex items-center justify-between text-[11px] font-mono text-mist">
                <span>10.0 CGPA Scale</span>
                <span className="text-emerald-400">● 42 Courses Active</span>
              </div>
            </div>
          </Link>

          {/* Card 2: Smart Facilities */}
          <Link href="/booking" className="group block">
            <div className="h-full p-5 rounded-xl border border-line-strong bg-ink/80 hover:bg-ink-2/90 backdrop-blur-xl transition-all duration-300 hover:border-orange-500/50 hover:shadow-xl hover:shadow-orange-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 group-hover:scale-105 transition-transform">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-mist group-hover:text-orange-400 transition-colors flex items-center gap-1">
                    <span>Reserve</span>
                    <span>&rarr;</span>
                  </span>
                </div>
                <h3 className="font-serif text-lg text-bone font-medium tracking-tight group-hover:text-white">
                  Smart Facilities &amp; Labs
                </h3>
                <p className="text-xs text-mist font-light mt-1.5 leading-relaxed">
                  Individual student desk booking in AI labs and library pods, plus whole-hall reservation authorization for faculty.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-line/40 flex items-center justify-between text-[11px] font-mono text-mist">
                <span>Live RFID Availability</span>
                <span className="text-blue-400">● 14 Spaces Ready</span>
              </div>
            </div>
          </Link>

          {/* Card 3: Mobility & Directives */}
          <Link href="/transport" className="group block">
            <div className="h-full p-5 rounded-xl border border-line-strong bg-ink/80 hover:bg-ink-2/90 backdrop-blur-xl transition-all duration-300 hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/5 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-105 transition-transform">
                    <Bus className="w-5 h-5" />
                  </div>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-mist group-hover:text-emerald-400 transition-colors flex items-center gap-1">
                    <span>Track</span>
                    <span>&rarr;</span>
                  </span>
                </div>
                <h3 className="font-serif text-lg text-bone font-medium tracking-tight group-hover:text-white">
                  Fleet Telemetry &amp; Directives
                </h3>
                <p className="text-xs text-mist font-light mt-1.5 leading-relaxed">
                  Real-time shuttle GPS telemetry, targeted department announcements, and one-click campus maintenance ticketing.
                </p>
              </div>
              <div className="pt-4 mt-3 border-t border-line/40 flex items-center justify-between text-[11px] font-mono text-mist">
                <span>GPS Live Sync</span>
                <span className="text-emerald-400">● 4 Routes Operating</span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      {/* 4. VIRTUAL TOUR MODAL (AUBG Signature Feature) */}
      <AnimatePresence>
        {tourOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative w-full max-w-4xl bg-ink-2 border border-line-strong rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-line bg-ink/70">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Compass className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-bone font-medium text-base">
                      CampusOS Virtual Architectural Tour
                    </h3>
                    <p className="text-[10px] font-mono uppercase tracking-widest text-mist">
                      Digital Spatial Overview &bull; 360 Degree View
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setTourOpen(false)}
                  className="p-1.5 rounded-lg text-mist hover:text-bone hover:bg-surface-raised transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Modal Body: Active Stop Preview */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <Image
                  src={tourStops[activeTourStop].image}
                  alt={tourStops[activeTourStop].title}
                  fill
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                
                {/* Overlay Details */}
                <div className="absolute bottom-0 left-0 right-0 p-6 space-y-2">
                  <div className="flex items-center gap-3">
                    <span className="px-2.5 py-0.5 rounded text-[10px] font-mono uppercase tracking-widest bg-blue-600/90 text-white">
                      Sector {activeTourStop + 1} of 3
                    </span>
                    <span className="text-xs font-mono text-mist">
                      {tourStops[activeTourStop].location}
                    </span>
                  </div>
                  <h4 className="font-serif text-2xl text-bone">
                    {tourStops[activeTourStop].title}
                  </h4>
                  <p className="text-xs text-bone/80 max-w-xl font-light">
                    {tourStops[activeTourStop].desc}
                  </p>
                  <div className="pt-2 text-[11px] font-mono text-blue-300">
                    {tourStops[activeTourStop].specs}
                  </div>
                </div>
              </div>

              {/* Tour Stop Switchers */}
              <div className="grid grid-cols-3 divide-x divide-line border-t border-line bg-ink/90">
                {tourStops.map((stop, idx) => (
                  <button
                    key={stop.title}
                    type="button"
                    onClick={() => setActiveTourStop(idx)}
                    className={`p-4 text-left transition-colors ${
                      activeTourStop === idx
                        ? 'bg-blue-600/10 border-t-2 border-blue-500'
                        : 'hover:bg-surface-raised/40'
                    }`}
                  >
                    <p className={`text-[10px] font-mono uppercase tracking-widest ${activeTourStop === idx ? 'text-blue-400' : 'text-mist'}`}>
                      Stop 0{idx + 1}
                    </p>
                    <p className="text-xs font-medium text-bone truncate mt-0.5">
                      {stop.title.split(' ')[0]} {stop.title.split(' ')[1]}
                    </p>
                  </button>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
