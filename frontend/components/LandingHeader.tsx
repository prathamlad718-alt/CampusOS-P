'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { ThemeToggle } from '@/components/ThemeToggle';
import { useAuth } from '@campus-os/shared/auth-provider';
import { Skeleton } from '@/components/ui/skeleton';

export function LandingHeader() {
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative z-50 border-b border-line/50 bg-ink/80 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center gap-4 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-bone text-ink font-bold tracking-tighter transition-transform group-hover:scale-105">
            CO
          </div>
          <div>
            <p className="text-[10px] font-mono uppercase tracking-[0.3em] text-mist mb-0.5">
              Campus OS
            </p>
            <p className="text-sm font-serif text-bone leading-none">
              Operating System
            </p>
          </div>
        </Link>

        <nav className="hidden items-center gap-10 text-xs font-mono uppercase tracking-widest text-mist lg:flex">
          <Link href="#features" className="transition-colors hover:text-bone">
            Architecture
          </Link>
          <Link href="#pulse" className="transition-colors hover:text-bone">
            Feed
          </Link>
          <Link href="#system" className="transition-colors hover:text-bone">
            System
          </Link>
        </nav>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          {!mounted ? (
            <Skeleton className="h-9 w-24 rounded-md bg-surface-raised" />
          ) : isAuthenticated ? (
            <Link
              href="/dashboard"
              className="hidden lg:inline-flex h-9 items-center justify-center rounded-md bg-tide px-5 text-xs font-medium text-white transition-colors hover:bg-tide/90"
            >
              Dashboard
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                href="/login"
                className="hidden h-9 items-center justify-center rounded-md px-4 text-xs font-medium text-mist transition-colors hover:bg-surface-raised hover:text-bone lg:inline-flex"
              >
                Login
              </Link>
              <Link
                href="/dashboard"
                className="inline-flex h-9 items-center justify-center rounded-md bg-bone px-5 text-xs font-medium text-ink transition-colors hover:bg-bone/90"
              >
                Enter OS
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
