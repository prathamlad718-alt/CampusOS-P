'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@campus-os/shared/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';
import {
  Search,
  ArrowRight,
  Sparkles,
  BookOpen,
  Calendar,
  Armchair,
  GraduationCap,
  ShieldCheck,
  Menu,
  X
} from 'lucide-react';

export function LandingHeader() {
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated, user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative z-50 w-full border-b border-line/60 bg-ink/95 backdrop-blur-2xl">
      {/* 1. TOP UTILITY NAVIGATION BAR */}
      <div className="hidden lg:block border-b border-line/40 bg-ink/60 py-1.5 px-6">
        <div className="mx-auto flex max-w-7xl items-center justify-between text-[11px] font-mono text-mist">
          <div className="flex items-center gap-6">
            <span className="text-tide flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-tide animate-pulse" />
              Autumn Term 2024 &bull; Official Digital Campus
            </span>
            <span className="text-line">|</span>
            <Link href="/courses" className="hover:text-bone transition-colors">Courses &amp; Curriculum</Link>
            <Link href="/timetable" className="hover:text-bone transition-colors">Weekly Timetable</Link>
            <Link href="/booking" className="hover:text-bone transition-colors">Seat &amp; Space Reservation</Link>
            <Link href="/announcements" className="hover:text-bone transition-colors">Official Directives</Link>
          </div>

          <div className="flex items-center gap-5">
            <Link href="/faculty" className="hover:text-bone transition-colors flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-tide" />
              <span>Faculty Portal</span>
            </Link>
            <Link href="/issues" className="hover:text-bone transition-colors">Campus Maintenance</Link>
            <Link href="/transport" className="hover:text-bone transition-colors">Transit Fleet</Link>
            <span className="text-line">|</span>
            <span className="text-emerald-400 font-mono text-[10px]">● 15 Systems Operational</span>
          </div>
        </div>
      </div>

      {/* 2. MAIN INSTITUTIONAL NAVIGATION BAR */}
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        {/* Brand Anchor */}
        <Link href="/" className="flex items-center gap-3.5 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-bone text-ink font-bold tracking-tighter transition-all group-hover:scale-105 group-hover:bg-tide group-hover:text-white shadow-lg">
            <span className="font-serif text-lg font-bold">CO</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-serif text-lg font-bold tracking-tight text-bone group-hover:text-tide transition-colors">
                CAMPUS OS
              </span>
              <span className="hidden sm:inline-block px-2 py-0.5 rounded text-[9px] font-mono uppercase tracking-widest bg-tide/15 text-tide border border-tide/30">
                Institutional OS
              </span>
            </div>
            <p className="text-[10px] font-mono text-mist uppercase tracking-widest leading-none mt-0.5">
              Operating System for Higher Education
            </p>
          </div>
        </Link>

        {/* Primary Desktop Navigation */}
        <nav className="hidden items-center gap-8 text-xs font-mono uppercase tracking-wider text-mist xl:flex">
          <Link href="/courses" className="transition-colors hover:text-bone">
            Academics
          </Link>
          <Link href="/timetable" className="transition-colors hover:text-bone">
            Timetable
          </Link>
          <Link href="/academics" className="transition-colors hover:text-bone">
            Transcripts
          </Link>
          <Link href="/booking" className="transition-colors hover:text-bone">
            Facilities
          </Link>
          <Link href="/announcements" className="transition-colors hover:text-bone">
            Bulletins
          </Link>
          <Link href="/collaboration" className="transition-colors hover:text-bone">
            Campus Life
          </Link>
        </nav>

        {/* Action Controls & Enter OS Button */}
        <div className="flex items-center gap-3">
          <ThemeToggle />

          {!mounted ? (
            <Skeleton className="h-10 w-28 rounded-xl bg-surface-raised" />
          ) : isAuthenticated ? (
            <Link
              href="/dashboard"
              className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-tide px-5 text-xs font-mono font-bold text-ink shadow-lg shadow-tide/20 transition-all hover:bg-cyan-300 hover:scale-[1.02]"
            >
              <span>Command Center</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="hidden sm:inline-flex h-10 items-center justify-center rounded-xl px-4 text-xs font-mono text-mist transition-colors hover:bg-surface hover:text-bone border border-line"
              >
                Sign In
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-10 items-center justify-center gap-2 rounded-xl bg-tide px-5 text-xs font-mono font-bold text-ink shadow-lg shadow-tide/20 transition-all hover:bg-cyan-300 hover:scale-[1.02]"
              >
                <span>Enter Campus OS</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          )}

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="xl:hidden p-2 rounded-xl border border-line text-mist hover:text-bone hover:bg-surface"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden border-t border-line bg-ink-2 px-6 py-6 space-y-4 animate-in fade-in duration-200">
          <nav className="flex flex-col space-y-3 text-xs font-mono uppercase tracking-wider text-mist">
            <Link href="/courses" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5 border-b border-line/40">
              Academics &amp; Syllabi
            </Link>
            <Link href="/timetable" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5 border-b border-line/40">
              Weekly Timetable
            </Link>
            <Link href="/academics" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5 border-b border-line/40">
              Academic Transcript (10.0 GPA)
            </Link>
            <Link href="/booking" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5 border-b border-line/40">
              Seat &amp; Space Reservation
            </Link>
            <Link href="/announcements" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5 border-b border-line/40">
              Official Campus Announcements
            </Link>
            <Link href="/notifications" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5 border-b border-line/40">
              Alert Center
            </Link>
            <Link href="/navigation" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5 border-b border-line/40">
              Campus Wayfinding
            </Link>
            <Link href="/transport" onClick={() => setMobileMenuOpen(false)} className="hover:text-bone py-1.5">
              Bus Fleet Tracker
            </Link>
          </nav>

          <div className="pt-2 flex flex-col gap-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-tide text-ink font-mono font-bold text-xs"
            >
              <span>Launch Command Center</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
