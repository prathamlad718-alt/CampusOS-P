'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  MapPin,
  User,
  Calendar,
  Sparkles,
  ArrowRight,
  TrendingUp,
  FileText,
  Bus,
  Wrench,
  X,
  CornerDownLeft
} from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface SearchItem {
  id: string;
  category: 'answer' | 'class' | 'faculty' | 'room' | 'event' | 'attendance' | 'action';
  title: string;
  subtitle: string;
  highlight?: string;
  badge?: string;
  url: string;
}

const KNOWLEDGE_BASE: SearchItem[] = [
  // Direct natural language question matches
  {
    id: 'q1',
    category: 'answer',
    title: 'DBMS Class Location & Time',
    subtitle: 'Room 204 • Alan Turing Engineering Block, 2nd Floor',
    highlight: 'Next lecture starts at 11:00 AM today (Prof. Rajesh Sharma)',
    badge: 'Direct Answer',
    url: '/navigation?destination=Room+204'
  },
  {
    id: 'q2',
    category: 'answer',
    title: 'Engineering Graphics Faculty',
    subtitle: 'Prof. S. Ranganathan • Dept. of Mechanical & Aerospace',
    highlight: 'Office: Mech-104 • Office hours: Mon & Wed 2:00 PM – 4:00 PM',
    badge: 'Faculty Answer',
    url: '/faculty?name=Prof+Ranganathan'
  },
  {
    id: 'q3',
    category: 'answer',
    title: 'Robotics Club Meeting',
    subtitle: 'Today at 1:00 PM • Student Activity Centre (Innovation Lab)',
    highlight: 'Weekly Standup & Autonomous Rover project sync',
    badge: 'Club Meeting',
    url: '/events?id=robotics-standup'
  },
  {
    id: 'q4',
    category: 'answer',
    title: 'Room 204 Navigation',
    subtitle: 'Alan Turing Engineering Block, 2nd Floor (West Wing)',
    highlight: 'Equipped with Projector, 40 Workstations & High-speed LAN',
    badge: 'Room Details',
    url: '/navigation?destination=Room+204'
  },
  {
    id: 'q5',
    category: 'answer',
    title: 'Physics Attendance Status',
    subtitle: 'PH-102: Applied Physics • Current: 68.5% (24 / 35 attended)',
    highlight: '⚠️ Need to attend next 2 consecutive classes to reach 75% minimum criteria',
    badge: 'Attendance Alert',
    url: '/dashboard'
  },

  // Campus directory items
  {
    id: 'c1',
    category: 'class',
    title: 'CS-302: Database Management Systems',
    subtitle: '11:00 AM – 12:30 PM • Room 204 • Turing Block',
    badge: 'Class',
    url: '/timeline'
  },
  {
    id: 'c2',
    category: 'class',
    title: 'CS-304: Distributed Systems',
    subtitle: '02:30 PM – 04:00 PM • Room 304 • Ramanujan Block',
    badge: 'Class',
    url: '/timeline'
  },
  {
    id: 'f1',
    category: 'faculty',
    title: 'Dr. Elena Vance',
    subtitle: 'Professor of Distributed Computing • Office: Turing-412',
    badge: 'Professor',
    url: '/faculty?id=elena-vance'
  },
  {
    id: 'f2',
    category: 'faculty',
    title: 'Prof. Rajesh Sharma',
    subtitle: 'Head of Database Systems Lab • Office: Turing-208',
    badge: 'Professor',
    url: '/faculty?id=rajesh-sharma'
  },
  {
    id: 'r1',
    category: 'room',
    title: 'Lab 3B (Advanced Computing)',
    subtitle: 'Turing Block 3rd Floor • 60 Linux workstations',
    badge: 'Lab',
    url: '/navigation?destination=Lab+3B'
  },
  {
    id: 'a1',
    category: 'action',
    title: 'Report Broken Projector or IT Issue',
    subtitle: 'Create maintenance work order with photo upload',
    badge: 'Quick Action',
    url: '/issues?new=true'
  },
  {
    id: 'a2',
    category: 'action',
    title: 'Live Campus Bus Fleet Tracker',
    subtitle: 'Check arrival times for Route #1, #2, #3, #4',
    badge: 'Transit',
    url: '/transport'
  },
  {
    id: 'a3',
    category: 'action',
    title: 'Browse Campus Drive Repository',
    subtitle: 'Search notes, past question papers, and lab manuals',
    badge: 'Drive',
    url: '/drive'
  }
];

interface UniversalSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UniversalSearchModal({ isOpen, onClose }: UniversalSearchModalProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      setQuery('');
      setSelectedIndex(0);
    }
  }, [isOpen]);

  // Handle global keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else {
          // Open triggered from outside
        }
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  // Smart Query Filter
  const q = query.toLowerCase().trim();
  const results = KNOWLEDGE_BASE.filter(item => {
    if (!q) return item.category === 'answer' || item.category === 'action';
    
    // Natural language matching rules
    if ((q.includes('dbms') || q.includes('database')) && item.id === 'q1') return true;
    if ((q.includes('graphics') || q.includes('ranganathan') || q.includes('engineering graphics')) && item.id === 'q2') return true;
    if ((q.includes('robotics') || q.includes('robot')) && (item.id === 'q3' || item.title.toLowerCase().includes('robotics'))) return true;
    if (q.includes('204') && (item.id === 'q4' || item.subtitle.includes('204'))) return true;
    if (q.includes('physics') || (q.includes('attendance') && item.id === 'q5')) return true;

    return (
      item.title.toLowerCase().includes(q) ||
      item.subtitle.toLowerCase().includes(q) ||
      (item.highlight && item.highlight.toLowerCase().includes(q))
    );
  });

  const handleSelect = (url: string) => {
    onClose();
    router.push(url);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex(prev => (prev + 1) % Math.max(1, results.length));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex(prev => (prev - 1 + results.length) % Math.max(1, results.length));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (results[selectedIndex]) {
        handleSelect(results[selectedIndex].url);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-ink/80 backdrop-blur-xl animate-in fade-in duration-200">
      <div 
        className="w-full max-w-2xl bg-ink-2 border border-line-strong rounded-3xl shadow-[0_25px_80px_-15px_rgba(0,0,0,0.8),0_0_40px_rgba(70,183,255,0.15)] overflow-hidden flex flex-col max-h-[80vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="flex items-center px-5 py-4 border-b border-line gap-3 bg-surface">
          <Search className="w-5 h-5 text-tide shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
            onKeyDown={handleKeyDown}
            placeholder="Ask anything: 'Where is DBMS class?', 'Who teaches Graphics?', 'Find room 204'..."
            className="flex-1 bg-transparent border-none outline-none text-base text-bone placeholder:text-mist/70 font-sans"
          />
          {query && (
            <button 
              onClick={() => setQuery('')}
              className="p-1 rounded-lg text-mist hover:text-bone hover:bg-ink transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <kbd className="hidden sm:inline px-2 py-1 text-[10px] font-mono text-mist bg-ink border border-line rounded-lg">
            ESC
          </kbd>
        </div>

        {/* Quick Suggestion Chips */}
        {!query && (
          <div className="px-5 py-3 border-b border-line/60 bg-surface/50 flex items-center gap-2 overflow-x-auto text-xs">
            <span className="text-mist font-mono shrink-0 flex items-center gap-1 text-[11px]">
              <Sparkles className="w-3.5 h-3.5 text-tide" /> Try asking:
            </span>
            <button 
              onClick={() => setQuery('Where is DBMS class?')}
              className="px-2.5 py-1 rounded-full bg-ink hover:bg-surface border border-line text-bone shrink-0 transition-colors"
            >
              Where is DBMS class?
            </button>
            <button 
              onClick={() => setQuery('Find room 204')}
              className="px-2.5 py-1 rounded-full bg-ink hover:bg-surface border border-line text-bone shrink-0 transition-colors"
            >
              Find room 204
            </button>
            <button 
              onClick={() => setQuery('Show my Physics attendance')}
              className="px-2.5 py-1 rounded-full bg-ink hover:bg-surface border border-line text-bone shrink-0 transition-colors"
            >
              Physics attendance
            </button>
          </div>
        )}

        {/* Search Results List */}
        <div className="overflow-y-auto p-3 space-y-1.5 flex-1">
          {results.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm font-medium text-bone">No campus records found for &ldquo;{query}&rdquo;</p>
              <p className="text-xs text-mist mt-1">Try querying a course code (CS-302), a faculty name, or a room number.</p>
            </div>
          ) : (
            results.map((item, idx) => {
              const isSelected = idx === selectedIndex;
              const isAnswer = item.category === 'answer';

              return (
                <div
                  key={item.id}
                  onClick={() => handleSelect(item.url)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`p-3.5 rounded-2xl cursor-pointer transition-all flex items-start gap-3.5 ${
                    isSelected
                      ? 'bg-surface border border-tide/50 shadow-[0_0_15px_rgba(70,183,255,0.1)]'
                      : 'border border-transparent hover:bg-surface/50'
                  } ${isAnswer ? 'bg-gradient-to-r from-tide/10 via-surface to-surface' : ''}`}
                >
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isAnswer 
                      ? 'bg-tide text-white shadow-md' 
                      : item.category === 'action'
                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                      : 'bg-ink border border-line text-tide'
                  }`}>
                    {isAnswer ? <Sparkles className="w-4 h-4" /> :
                     item.category === 'room' ? <MapPin className="w-4 h-4" /> :
                     item.category === 'faculty' ? <User className="w-4 h-4" /> :
                     item.category === 'attendance' ? <TrendingUp className="w-4 h-4" /> :
                     item.category === 'action' ? <Wrench className="w-4 h-4" /> :
                     <FileText className="w-4 h-4" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-bone truncate">
                        {item.title}
                      </span>
                      {item.badge && (
                        <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full ${
                          isAnswer 
                            ? 'bg-tide/20 text-tide border border-tide/30 font-bold'
                            : 'bg-surface border border-line text-mist'
                        }`}>
                          {item.badge}
                        </span>
                      )}
                    </div>

                    <p className="text-xs text-mist mt-0.5 truncate">
                      {item.subtitle}
                    </p>

                    {item.highlight && (
                      <p className="text-xs text-bone font-medium mt-1.5 bg-ink/60 border border-line/60 rounded-lg p-2 leading-relaxed">
                        {item.highlight}
                      </p>
                    )}
                  </div>

                  {isSelected && (
                    <div className="flex items-center gap-1 text-[11px] font-mono text-tide shrink-0 mt-1">
                      <span>Jump</span>
                      <CornerDownLeft className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>

        {/* Footer Navigation Hints */}
        <div className="px-5 py-2.5 bg-ink border-t border-line flex items-center justify-between text-[11px] font-mono text-mist">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface border border-line rounded">↑</kbd>
              <kbd className="px-1.5 py-0.5 bg-surface border border-line rounded">↓</kbd> to navigate
            </span>
            <span className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 bg-surface border border-line rounded">↵</kbd> to select
            </span>
          </div>
          <span className="text-tide">Campus OS Universal Search Engine</span>
        </div>
      </div>
    </div>
  );
}
