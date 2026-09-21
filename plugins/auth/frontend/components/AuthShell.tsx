import Link from 'next/link';
import { ReactNode } from 'react';
import Image from 'next/image';

interface AuthShellProps {
  title: string;
  subtitle: string;
  alternateHref: string;
  alternateActionLabel: string;
  alternateActionText: string;
  children: ReactNode;
}

export default function AuthShell({
  title,
  subtitle,
  alternateHref,
  alternateActionLabel,
  alternateActionText,
  children
}: AuthShellProps) {
  return (
    <div className="min-h-screen bg-ink flex relative overflow-hidden">
      
      {/* Editorial Left Side (Hidden on Mobile) */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-ink items-center justify-center border-r border-line overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=2070"
            alt="Campus Architecture"
            fill
            className="object-cover grayscale opacity-10 dark:grayscale-0 dark:opacity-40 dark:mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-md px-12">
           <div className="flex items-center gap-3 mb-12">
             <div className="w-3 h-3 bg-tide rounded-full animate-pulse" />
             <p className="system-label text-tide m-0">System Auth</p>
           </div>
           
           <h2 className="text-4xl font-serif text-bone leading-tight">
             Connect to the <br/>
             <span className="text-mist">digital campus.</span>
           </h2>
           
           <p className="mt-6 text-mist text-sm max-w-sm">
             Secure access to your timetable, attendance, clubs, and campus events. 
           </p>

           <div className="mt-12 pt-12 border-t border-line/50">
             <p className="text-[10px] font-mono text-mist uppercase tracking-widest">Powered by Campus OS v2.0</p>
           </div>
        </div>
      </div>

      {/* Auth Form Right Side */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 bg-ink relative z-10">
        <div className="w-full max-w-[380px]">
          
          <Link href="/" className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-bone text-ink font-bold tracking-tighter mb-12 hover:scale-105 transition-transform lg:hidden">
            CO
          </Link>
          
          <div className="mb-8">
            <h1 className="text-3xl font-serif text-bone tracking-tight">
              {title}
            </h1>
            <p className="mt-2 text-sm text-mist">{subtitle}</p>
          </div>

          <div className="glass-panel p-8 rounded-2xl border border-line bg-ink-2/30 shadow-2xl">
            {children}
          </div>

          <div className="mt-8 text-center">
            <p className="text-sm text-mist">
              {alternateActionLabel}{' '}
              <Link
                href={alternateHref}
                className="font-medium text-tide hover:text-tide/80 transition-colors"
              >
                {alternateActionText}
              </Link>
            </p>
            
            <div className="mt-12 flex justify-center gap-4">
              <Link href="/" className="text-xs text-mist font-mono hover:text-bone transition-colors uppercase tracking-widest">
                &larr; Back to Home
              </Link>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
}
