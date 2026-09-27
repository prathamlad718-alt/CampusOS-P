import { LandingHeader } from '@/components/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { StatsStrip } from '@/components/landing/StatsStrip';
import { FeatureEcosystemSection } from '@/components/landing/FeatureEcosystemSection';
import { CampusStorySection } from '@/components/landing/CampusStorySection';
import { CampusPulseSection } from '@/components/landing/CampusPulseSection';
import { ProductPreviewSection } from '@/components/landing/ProductPreviewSection';
import { OtherFeaturesSection } from '@/components/landing/OtherFeaturesSection';
import Link from 'next/link';
import { ArrowRight, ShieldCheck, Radio, Sparkles } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-ink text-bone selection:bg-blue-600/30 selection:text-white">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 grain opacity-[0.035] pointer-events-none mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.06),transparent_70%)] blur-3xl" />
      </div>

      {/* Persistent Left Geometric Guide Line (Desktop Editorial Accent) */}
      <div className="hidden 2xl:block absolute top-0 left-12 bottom-0 w-[1px] bg-line/40 z-0 pointer-events-none" />

      {/* Dual-Level Institutional Navigation Header */}
      <LandingHeader />

      <main className="relative z-10">
        {/* 1. HERO SECTION: Full-width aerial campus, editorial serif typography, virtual tour modal, 3 entry cards */}
        <HeroSection />

        {/* 2. STATS STRIP: Buriver + AUBG 4-metric institutional strip */}
        <StatsStrip />

        {/* 3. OUR ADVANTAGE: AUBG institutional architecture with 6 micro-UI module cards */}
        <FeatureEcosystemSection />

        {/* 4. EDITORIAL STORY SPREAD: Buriver Dr. Eric Bond + AUBG quote with terracotta framing & student portrait */}
        <CampusStorySection />

        {/* 5. CAMPUS PULSE: Duke-style asymmetric news + interactive academic calendar widget */}
        <CampusPulseSection />

        {/* 6. PRODUCT PREVIEW: Interactive OS desktop window with Timetable, Courses, Transcripts, Booking, Bulletins */}
        <ProductPreviewSection />

        {/* 7. CAPABILITIES DIRECTORY: 20 interconnected capabilities across 4 institutional categories */}
        <OtherFeaturesSection />

        {/* 8. FINAL INSTITUTIONAL CALL-TO-ACTION (Duke & Buriver High-Impact Finish) */}
        <section className="relative w-full py-32 px-6 bg-gradient-to-b from-ink via-blue-950/20 to-ink border-t border-line/60 flex items-center justify-center text-center overflow-hidden">
          {/* Subtle grid background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-overlay opacity-30" />
          
          <div className="relative z-10 max-w-4xl mx-auto space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-mono">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Autumn Term 2024 &bull; Official Digital Campus</span>
            </div>

            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif text-bone tracking-tight leading-[1.1]">
              Open the campus.
            </h2>

            <p className="text-base sm:text-lg text-mist max-w-2xl mx-auto font-light leading-relaxed">
              Join thousands of students, faculty mentors, and academic administrators operating on one unified, intelligent campus platform.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
              <Link
                href="/dashboard"
                className="inline-flex h-14 items-center justify-center gap-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 px-8 text-sm font-medium tracking-wide text-white transition-all shadow-2xl shadow-blue-600/30 hover:scale-105 active:scale-100"
              >
                <span>Enter Campus OS</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/login"
                className="inline-flex h-14 items-center justify-center rounded-lg border border-line-strong bg-ink-2/80 hover:bg-surface-raised px-8 text-sm font-medium tracking-wide text-bone transition-colors"
              >
                Sign In to University Portal
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* 9. DEEP 5-COLUMN INSTITUTIONAL FOOTER (Duke + AUBG Architecture) */}
      <footer className="relative z-10 border-t border-line/70 bg-ink-2/90 pt-16 pb-12 text-sm text-mist">
        <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 space-y-12">
          
          {/* 5-Column Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
            
            {/* Col 1: Institutional Identity */}
            <div className="lg:col-span-1 space-y-4">
              <Link href="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-xl bg-bone text-ink font-serif font-bold text-lg flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors shadow-lg">
                  CO
                </div>
                <div>
                  <div className="font-serif font-bold text-bone text-base tracking-tight leading-none">
                    CAMPUS OS
                  </div>
                  <div className="text-[9px] font-mono uppercase tracking-widest text-blue-400 mt-1">
                    Institutional OS
                  </div>
                </div>
              </Link>

              <p className="text-xs text-mist font-light leading-relaxed">
                The unified digital operating fabric connecting classrooms, master timetables, facility bookings, transit fleets, and academic records.
              </p>

              <div className="pt-2">
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-ink border border-line text-[11px] font-mono text-emerald-400">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>15 Subsystems Operational</span>
                </div>
              </div>
            </div>

            {/* Col 2: Academics */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold border-b border-line/60 pb-2">
                Academics
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/courses" className="hover:text-bone transition-colors">
                    Course Catalog &amp; Syllabi
                  </Link>
                </li>
                <li>
                  <Link href="/timetable" className="hover:text-bone transition-colors">
                    Master Weekly Timetable
                  </Link>
                </li>
                <li>
                  <Link href="/academics" className="hover:text-bone transition-colors">
                    10.0 GPA Transcripts
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-bone transition-colors">
                    Faculty Gradebook
                  </Link>
                </li>
                <li>
                  <Link href="/courses" className="hover:text-bone transition-colors">
                    Attendance Health Guards
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Facilities & Logistics */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold border-b border-line/60 pb-2">
                Campus Facilities
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/booking" className="hover:text-bone transition-colors">
                    Seat &amp; Desk Reservation
                  </Link>
                </li>
                <li>
                  <Link href="/booking" className="hover:text-bone transition-colors">
                    Faculty Lecture Hall Hold
                  </Link>
                </li>
                <li>
                  <Link href="/transport" className="hover:text-bone transition-colors">
                    Live Transit Fleet GPS
                  </Link>
                </li>
                <li>
                  <Link href="/issues" className="hover:text-bone transition-colors">
                    Maintenance Issue Dispatch
                  </Link>
                </li>
                <li>
                  <Link href="/navigation" className="hover:text-bone transition-colors">
                    Spatial Campus Wayfinding
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 4: Community & Bulletins */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold border-b border-line/60 pb-2">
                Campus Life
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/announcements" className="hover:text-bone transition-colors">
                    Official Dean Bulletins
                  </Link>
                </li>
                <li>
                  <Link href="/notifications" className="hover:text-bone transition-colors">
                    Actionable Alert Center
                  </Link>
                </li>
                <li>
                  <Link href="/collaboration" className="hover:text-bone transition-colors">
                    Student Council Chapter
                  </Link>
                </li>
                <li>
                  <Link href="/announcements" className="hover:text-bone transition-colors">
                    Term Academic Calendar
                  </Link>
                </li>
                <li>
                  <Link href="/collaboration" className="hover:text-bone transition-colors">
                    Technical Clubs &amp; Societies
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 5: Security & Platform */}
            <div className="space-y-3">
              <h4 className="text-xs font-mono uppercase tracking-wider text-bone font-semibold border-b border-line/60 pb-2">
                Governance &amp; OS
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <Link href="/academics" className="hover:text-bone transition-colors flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Cryptographic Seal</span>
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-bone transition-colors">
                    Role-Based Access (RBAC)
                  </Link>
                </li>
                <li>
                  <Link href="/plugins" className="hover:text-bone transition-colors">
                    Plugin Architecture SDK
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-bone transition-colors">
                    Universal Dispatch (⌘K)
                  </Link>
                </li>
                <li>
                  <Link href="/dashboard" className="hover:text-bone transition-colors">
                    System Audit Telemetry
                  </Link>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Legal & Copyright Bar */}
          <div className="pt-8 border-t border-line/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
            <div className="flex items-center gap-2">
              <span>&copy; 2024–2026 CampusOS Autonomous Institutional Operating System.</span>
              <span className="hidden sm:inline text-line">&bull;</span>
              <span className="hidden sm:inline text-mist">All rights reserved.</span>
            </div>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-bone transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-bone transition-colors">
                Terms of Governance
              </Link>
              <Link href="/dashboard" className="hover:text-blue-400 text-bone transition-colors">
                System Status (99.98%)
              </Link>
            </div>
          </div>

        </div>
      </footer>
    </div>
  );
}
