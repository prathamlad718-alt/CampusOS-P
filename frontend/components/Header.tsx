'use client';

import { useState } from 'react';
import { Search, Bell, ChevronDown, Clock, MapPin } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  SidebarTrigger
} from '@campusos/design-system';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@campus-os/shared/auth-provider';
import { UniversalSearchModal } from '@/components/dashboard/UniversalSearchModal';
import { ThemeToggle } from '@/components/ThemeToggle';

const ROUTE_META: Record<string, { title: string; category: string }> = {
  '/dashboard': { title: 'Command Center', category: 'Core OS' },
  '/timeline': { title: 'Academic Timeline', category: 'Academic' },
  '/assignments': { title: 'Assignments & Deadlines', category: 'Coursework' },
  '/collaboration': { title: 'Student Collaboration', category: 'Ecosystem' },
  '/drive': { title: 'Campus Drive', category: 'Repository' },
  '/navigation': { title: 'Campus Navigation', category: 'Wayfinding' },
  '/transport': { title: 'Bus Transit Fleet', category: 'Mobility' },
  '/services': { title: 'Campus Services', category: 'Facilities' },
  '/issues': { title: 'Issue Reporting', category: 'Maintenance' },
  '/faculty': { title: 'Faculty Workspace', category: 'Instruction' },
  '/settings': { title: 'System & Privacy Settings', category: 'Preferences' },
  '/marketplace': { title: 'Plugin Marketplace', category: 'Ecosystem' },
  '/booking': { title: 'Seat & Space Reservation', category: 'Facilities' },
  '/courses': { title: 'Academic Courses & Curriculum', category: 'Academics' },
  '/timetable': { title: 'Recurring Academic Timetable', category: 'Schedule' },
  '/academics': { title: 'Academic Record & Results', category: 'Transcript' },
  '/profile': { title: 'Student Profile', category: 'Identity' }
};

export function Header() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  const currentMeta = ROUTE_META[pathname] || {
    title: pathname.replace('/', '').replace(/-/g, ' ').toUpperCase(),
    category: 'Workspace'
  };

  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-4 sm:px-6 bg-ink/70 backdrop-blur-xl border-b border-line h-20 transition-colors duration-300">
      
      {/* Left: Sidebar Toggle + Dynamic Breadcrumb/Title */}
      <div className="flex items-center gap-3 sm:gap-4">
        <SidebarTrigger className="text-mist hover:text-bone hover:bg-surface rounded-xl p-2 transition-colors cursor-pointer" />
        
        <div>
          <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-mist">
            <span>Campus OS</span>
            <span>/</span>
            <span className="text-tide font-semibold">{currentMeta.category}</span>
          </div>
          <h2 className="text-lg sm:text-xl font-serif text-bone m-0 tracking-tight capitalize">
            {currentMeta.title}
          </h2>
        </div>
      </div>

      {/* Center: Live Status Ticker */}
      <div className="hidden xl:flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-surface/80 border border-line text-xs shadow-sm">
        {user?.isSuperAdmin || user?.role === 'admin' ? (
          <>
            <span className="w-2 h-2 rounded-full bg-tide animate-pulse" />
            <span className="font-mono text-mist">Fleet:</span>
            <span className="font-medium text-bone">18 Buses Running</span>
            <span className="font-mono text-amber-400">&bull; 2 Critical Tickets</span>
          </>
        ) : (
          <>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-mist">Next Up:</span>
            <span className="font-medium text-bone">CS-302 DBMS</span>
            <span className="font-mono text-tide">&bull; 11:00 AM (Rm 204)</span>
          </>
        )}
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-3 sm:gap-5 ml-auto">
        
        {/* Universal Search Bar Trigger */}
        <div 
          onClick={() => setIsSearchModalOpen(true)}
          className="relative w-48 sm:w-72 lg:w-80 group cursor-pointer"
        >
          <div className="w-full px-3.5 py-2 border border-line rounded-full text-xs sm:text-sm bg-ink-2 text-mist flex items-center justify-between group-hover:border-tide/50 transition-all shadow-sm">
            <span className="flex items-center gap-2 truncate">
              <Search className="w-4 h-4 text-tide shrink-0" />
              <span className="truncate">Search or ask question...</span>
            </span>
            <kbd className="hidden sm:inline px-2 py-0.5 text-[10px] font-mono text-mist bg-ink border border-line rounded">⌘K</kbd>
          </div>
        </div>

        {/* Theme Mode Toggle Button */}
        <ThemeToggle />

        {/* Notifications Dropdown */}
        <div className="relative flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-transparent border border-transparent cursor-pointer relative p-2 rounded-full transition-all duration-300 text-mist hover:bg-surface hover:text-bone hover:border-line focus:outline-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-4 h-4 bg-tide text-ink rounded-full flex items-center justify-center text-[9px] font-bold border border-ink">
                3
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-ink-2 border-line rounded-2xl shadow-[0_18px_60px_-18px_rgba(70,183,255,0.2)] p-0 overflow-hidden"
            >
              <DropdownMenuLabel className="p-4 border-b border-line text-bone flex items-center justify-between">
                <span className="font-semibold text-sm">Notifications</span>
                <span className="text-[10px] font-mono text-tide">3 Urgent</span>
              </DropdownMenuLabel>
              <div className="max-h-80 overflow-y-auto divide-y divide-line/40">
                <DropdownMenuItem className="p-4 hover:bg-surface transition-colors duration-200 cursor-pointer flex-col items-start gap-1 focus:bg-surface">
                  <div className="flex items-center gap-1.5 text-xs text-rose-400 font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-rose-400" /> URGENT
                  </div>
                  <p className="text-xs font-medium text-bone m-0">
                    Room 204 relocated to Turing Block 3B today
                  </p>
                  <p className="text-[10px] text-mist m-0">12 mins ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-surface transition-colors duration-200 cursor-pointer flex-col items-start gap-1 focus:bg-surface">
                  <div className="flex items-center gap-1.5 text-xs text-amber-400 font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" /> IMPORTANT
                  </div>
                  <p className="text-xs font-medium text-bone m-0">
                    DBMS Lab Assignment 4 due tonight at 11:59 PM
                  </p>
                  <p className="text-[10px] text-mist m-0">1 hour ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 hover:bg-surface transition-colors duration-200 cursor-pointer flex-col items-start gap-1 focus:bg-surface">
                  <div className="flex items-center gap-1.5 text-xs text-tide font-mono font-bold">
                    <span className="w-1.5 h-1.5 rounded-full bg-tide" /> CAMPUS LIFE
                  </div>
                  <p className="text-xs font-medium text-bone m-0">
                    Robotics Club team sync at 1:00 PM in Innovation Lab
                  </p>
                  <p className="text-[10px] text-mist m-0">2 hours ago</p>
                </DropdownMenuItem>
              </div>
              <div className="p-2 border-t border-line text-center">
                <Link href="/settings" className="text-tide text-xs font-medium hover:underline">
                  Configure Notification Rules &rarr;
                </Link>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Account Menu */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-2.5 bg-surface border border-line rounded-full p-1 pr-3 cursor-pointer transition-all duration-300 text-bone hover:bg-ink hover:border-line-strong focus:outline-none">
              <div className="w-7 h-7 bg-gradient-to-tr from-tide to-foam rounded-full flex items-center justify-center text-ink font-bold text-xs shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-xs font-medium hidden md:inline truncate max-w-[100px]">
                {user?.name || 'User'}
              </span>
              <ChevronDown className="w-3 h-3 text-mist" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-ink-2 border-line rounded-2xl shadow-xl p-1"
            >
              <DropdownMenuLabel className="p-3">
                <div className="flex flex-col space-y-0.5">
                  <p className="text-xs font-semibold leading-none text-bone">{user?.name || 'User'}</p>
                  <p className="text-[11px] leading-none text-mist font-mono truncate">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-line" />
              <DropdownMenuItem asChild className="cursor-pointer focus:bg-surface rounded-lg text-xs">
                <Link href="/profile">My Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer focus:bg-surface rounded-lg text-xs">
                <Link href="/settings">Preferences &amp; Privacy</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-line" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-rose-400 focus:bg-rose-500/10 focus:text-rose-400 rounded-lg text-xs"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

      </div>

      {/* Global Universal Search Modal */}
      <UniversalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </header>
  );
}
