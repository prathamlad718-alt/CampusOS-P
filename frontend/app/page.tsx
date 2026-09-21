import { LandingHeader } from '@/components/LandingHeader';
import { HeroSection } from '@/components/landing/HeroSection';
import { CampusStorySection } from '@/components/landing/CampusStorySection';
import { FeatureEcosystemSection } from '@/components/landing/FeatureEcosystemSection';
import { CampusPulseSection } from '@/components/landing/CampusPulseSection';
import { ProductPreviewSection } from '@/components/landing/ProductPreviewSection';
import { OtherFeaturesSection } from '@/components/landing/OtherFeaturesSection';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="relative min-h-screen bg-ink text-bone selection:bg-tide/30 selection:text-bone">
      {/* Background Cinematic Texture */}
      <div className="absolute inset-0 z-0 grain opacity-[0.04] pointer-events-none mix-blend-overlay" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.05),transparent_70%)] blur-3xl" />
      </div>

      {/* Persistent Geometric Line connecting the page (Visible on Desktop) */}
      <div className="hidden lg:block absolute top-0 left-12 bottom-0 w-[1px] bg-line z-0 pointer-events-none" />

      <LandingHeader />

      <main className="relative z-10">
        {/* Sections */}
        <HeroSection />

        <div className="relative">
          {/* Node marker on the line */}
          <div className="hidden lg:flex absolute -top-3 left-[42.5px] items-center gap-4 z-20 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-ink border-2 border-tide" />
            <span className="text-[10px] font-mono text-mist uppercase tracking-widest">
              01 &middot; Architecture
            </span>
          </div>
          <CampusStorySection />
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute -top-3 left-[42.5px] items-center gap-4 z-20 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-ink border-2 border-tide" />
            <span className="text-[10px] font-mono text-mist uppercase tracking-widest">
              02 &middot; Ecosystem
            </span>
          </div>
          <FeatureEcosystemSection />
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute -top-3 left-[42.5px] items-center gap-4 z-20 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-ink border-2 border-tide" />
            <span className="text-[10px] font-mono text-mist uppercase tracking-widest">
              03 &middot; Feed
            </span>
          </div>
          <CampusPulseSection />
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute -top-3 left-[42.5px] items-center gap-4 z-20 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-ink border-2 border-tide" />
            <span className="text-[10px] font-mono text-mist uppercase tracking-widest">
              04 &middot; Platform
            </span>
          </div>
          <ProductPreviewSection />
        </div>

        <div className="relative">
          <div className="hidden lg:flex absolute -top-3 left-[42.5px] items-center gap-4 z-20 pointer-events-none">
            <div className="w-3 h-3 rounded-full bg-ink border-2 border-tide" />
            <span className="text-[10px] font-mono text-mist uppercase tracking-widest">
              05 &middot; Capabilities
            </span>
          </div>
          <OtherFeaturesSection />
        </div>

        {/* Final CTA Section */}
        <section className="relative w-full py-40 px-6 bg-tide flex items-center justify-center text-center overflow-hidden">
          {/* Subtle grid background on CTA */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:4rem_4rem] mix-blend-overlay opacity-30" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-10">
            <h2 className="text-5xl lg:text-7xl font-serif text-white tracking-tight">
              Open the campus.
            </h2>
            <Link
              href="/dashboard"
              className="inline-flex h-14 items-center justify-center rounded-md bg-ink px-10 text-sm font-medium tracking-wide text-bone transition-transform hover:scale-105 hover:bg-ink-2 shadow-2xl"
            >
              Enter Campus OS
            </Link>
          </div>
        </section>
      </main>

      <footer className="relative z-10 border-t border-line bg-ink py-12 text-sm text-mist">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-center justify-between gap-6 px-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-bone text-ink flex items-center justify-center font-bold tracking-tighter rounded-md">
              CO
            </div>
            <p className="font-mono text-xs uppercase tracking-widest">
              Campus OS
            </p>
          </div>

          <div className="flex items-center gap-8 text-xs font-medium">
            <Link href="/login" className="hover:text-bone transition-colors">
              Login
            </Link>
            <Link href="/signup" className="hover:text-bone transition-colors">
              Sign up
            </Link>
            <Link
              href="/dashboard"
              className="hover:text-bone transition-colors"
            >
              System Dashboard
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
