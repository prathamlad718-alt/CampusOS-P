'use client';

import Image from 'next/image';
import { Button } from '@campusos/design-system';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const COMMANDS = [
  "Book library room at 2 PM",
  "RSVP for AWS Hackathon",
  "Where is my next class?",
  "Pay tuition fee",
  "Join AI Robotics Club"
];

function TypewriterText() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % COMMANDS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait">
      <motion.p
        key={index}
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="text-sm text-bone font-mono m-0"
      >
        {COMMANDS[index]}
      </motion.p>
    </AnimatePresence>
  );
}

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] w-full overflow-hidden flex items-center justify-center pt-24 pb-16">
      {/* Background Image (Plane 1) */}
      <motion.div 
        initial={{ scale: 1.05 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=2070"
          alt="Campus Architecture"
          fill
          className="hidden dark:block object-cover object-center opacity-60 mix-blend-luminosity"
          priority
        />
        {/* Gradient Overlay (Plane 3) */}
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-ink via-ink/80 to-transparent dark:to-ink/30" />
        <div className="hidden dark:block absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/50 to-transparent dark:via-ink/40" />
      </motion.div>

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        {/* Typography (Plane 2) */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="space-y-8"
        >
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-line-strong bg-surface/50 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-bone shadow-sm backdrop-blur-md mb-8">
              <span className="h-2 w-2 rounded-full bg-tide animate-pulse" />
              Campus OS
            </div>
            <h1 className="text-5xl lg:text-7xl font-serif text-bone leading-[1.1]">
              The campus,<br />
              <span className="text-mist">connected.</span>
            </h1>
            <p className="mt-6 text-lg lg:text-xl text-mist max-w-md font-sans font-light">
              Unify your physical spaces, academic schedules, and student communities into one intelligent operating system.
            </p>
          </div>

          {/* Command Bar Mockup */}
          <div className="relative w-full max-w-md group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-tide/30 to-purple-500/30 rounded-xl blur opacity-30 group-hover:opacity-75 transition duration-1000 group-hover:duration-200" />
            <div className="relative flex items-center h-14 bg-ink-2/80 backdrop-blur-xl border border-line-strong rounded-xl px-4 shadow-2xl">
              <svg className="w-5 h-5 text-tide shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div className="flex-1 ml-3 overflow-hidden">
                <TypewriterText />
              </div>
              <div className="hidden sm:flex items-center gap-1 px-2 py-1 rounded bg-ink border border-line shrink-0">
                <span className="text-[10px] text-mist font-mono">⌘</span>
                <span className="text-[10px] text-mist font-mono">K</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 pt-2">
            <Button asChild className="h-12 px-8 bg-tide hover:bg-tide/90 text-white rounded-md text-sm font-medium tracking-wide">
              <Link href="/dashboard">Enter Campus OS</Link>
            </Button>
            <Button asChild variant="outline" className="h-12 px-8 border-line hover:bg-surface rounded-md text-sm font-medium tracking-wide bg-transparent">
              <Link href="#features">Explore System</Link>
            </Button>
          </div>
        </motion.div>

        {/* Floating UI Cards (Plane 4 & 5) */}
        <div className="relative h-[500px] w-full hidden lg:block perspective-[1000px]">
          <motion.div 
            initial={{ opacity: 0, x: 50, rotateY: -15 }}
            animate={{ opacity: 1, x: 0, rotateY: -10 }}
            transition={{ duration: 1, delay: 0.4, type: "spring" }}
            className="absolute top-10 right-0 w-72 glass-panel p-5 rounded-xl shadow-2xl transform rotate-x-[5deg]"
          >
            <p className="system-label mb-4 text-tide">Next Class</p>
            <h3 className="text-lg font-sans font-medium text-bone">Engineering Graphics</h3>
            <p className="text-mist text-sm mt-1">10:15 AM &middot; Room B-204</p>
            <div className="mt-4 h-1 w-full bg-surface-raised rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }} 
                animate={{ width: "40%" }} 
                transition={{ duration: 1, delay: 1 }} 
                className="h-full bg-tide" 
              />
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6, type: "spring" }}
            className="absolute top-48 left-10 w-64 glass-panel p-5 rounded-xl shadow-2xl z-20"
          >
            <p className="system-label mb-3">Attendance</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-serif text-bone">87.4<span className="text-2xl text-mist">%</span></span>
            </div>
            <p className="text-emerald-400 text-xs mt-2 font-medium tracking-wider uppercase">+2.1% This week</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.8, type: "spring" }}
            className="absolute bottom-10 right-10 w-80 glass-panel p-5 rounded-xl shadow-2xl z-10"
          >
            <p className="system-label mb-3 text-tide">Campus Event</p>
            <div className="flex gap-4 items-center">
              <div className="h-12 w-12 rounded-lg bg-surface-raised flex flex-col items-center justify-center">
                <span className="text-xs text-mist font-medium uppercase">Sep</span>
                <span className="text-lg text-bone font-semibold leading-none">20</span>
              </div>
              <div>
                <h4 className="text-bone font-medium text-sm">Innovation Day</h4>
                <p className="text-mist text-xs mt-0.5">Tomorrow &middot; 11:00 AM</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
