'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

const TABS = ['Timeline', 'Assignments', 'Campus Drive', 'Faculty Space', 'Marketplace'];

export function ProductPreviewSection() {
  const [activeTab, setActiveTab] = useState('Timeline');

  return (
    <section className="relative w-full py-32 px-6 bg-ink border-t border-line overflow-hidden" id="system">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="system-label text-tide mb-4">The System</p>
          <h2 className="text-4xl lg:text-5xl font-serif text-bone">Step inside the campus</h2>
        </motion.div>

        {/* Product UI Window Frame */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="w-full max-w-5xl mx-auto rounded-xl border border-line bg-ink-2 shadow-2xl overflow-hidden shadow-tide/10"
        >
          {/* Mac-style title bar */}
          <div className="h-10 border-b border-line bg-ink/50 flex items-center px-4 gap-2">
            <div className="w-3 h-3 rounded-full bg-surface-raised border border-line-strong hover:bg-red-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-surface-raised border border-line-strong hover:bg-yellow-500 transition-colors" />
            <div className="w-3 h-3 rounded-full bg-surface-raised border border-line-strong hover:bg-green-500 transition-colors" />
            <div className="mx-auto text-[10px] font-mono text-mist uppercase tracking-widest">Campus OS v2.0</div>
          </div>
          
          {/* Application Layout */}
          <div className="grid grid-cols-1 md:grid-cols-[240px_1fr] h-[600px]">
            
            {/* Sidebar */}
            <div className="border-r border-line bg-ink/30 p-4 hidden md:flex flex-col gap-6">
              <div>
                <div className="text-xl font-bold tracking-tight text-bone mb-6">CO.</div>
                <div className="space-y-1 relative">
                  {TABS.map((item) => (
                    <button
                      key={item}
                      onClick={() => setActiveTab(item)}
                      className={`w-full text-left px-3 py-2 text-sm rounded-md transition-all relative z-10 ${
                        activeTab === item ? 'text-tide font-medium' : 'text-mist hover:text-bone hover:bg-surface-raised'
                      }`}
                    >
                      {activeTab === item && (
                        <motion.div 
                          layoutId="active-pill" 
                          className="absolute inset-0 bg-tide/10 rounded-md -z-10"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      {item}
                    </button>
                  ))}
                </div>
              </div>
              
              <div className="mt-auto">
                <div className="flex items-center gap-3 px-3 py-2">
                  <div className="w-8 h-8 rounded-full bg-surface-raised" />
                  <div>
                    <p className="text-xs font-medium text-bone">Alex Student</p>
                    <p className="text-[10px] text-mist font-mono">B.Tech CS</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content Area */}
            <div className="bg-ink-2 overflow-y-auto relative">
              <header className="absolute top-0 left-0 right-0 p-8 pb-4 bg-ink-2/90 backdrop-blur-md z-20 flex justify-between items-end border-b border-line/50">
                <div>
                  <p className="text-mist font-mono text-xs mb-1">Tuesday &middot; 20 September</p>
                  <h1 className="text-2xl font-serif text-bone">
                    {activeTab === 'Dashboard' ? 'Good morning, Alex' : activeTab}
                  </h1>
                </div>
                <div className="px-3 py-1.5 border border-line rounded-full text-xs font-mono text-mist">
                  Term 1, Week 4
                </div>
              </header>

              <div className="p-8 pt-32 h-full">
                <AnimatePresence mode="wait">
                  {activeTab === 'Dashboard' && (
                    <motion.div 
                      key="dashboard"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                    >
                      {/* Column 1: Next Class & Attendance */}
                      <div className="space-y-6">
                        <div className="p-5 rounded-xl border border-line bg-ink/50 group hover:border-tide/50 transition-colors cursor-pointer">
                          <p className="system-label text-tide mb-3">Next Class</p>
                          <h3 className="text-lg text-bone font-medium">Engineering Graphics</h3>
                          <p className="text-sm text-mist mb-4">10:15 AM &middot; Room B-204</p>
                          <Link href="/dashboard" className="block w-full text-center py-2 bg-surface-raised group-hover:bg-tide group-hover:text-white text-bone rounded-md text-xs font-medium transition-colors">
                            View Material
                          </Link>
                        </div>
                        
                        <div className="p-5 rounded-xl border border-line bg-ink/50 flex justify-between items-center">
                          <div>
                            <p className="system-label mb-1">Attendance</p>
                            <p className="text-2xl font-serif text-bone">87.4%</p>
                          </div>
                          <div className="w-12 h-12 rounded-full border-4 border-tide border-r-surface-raised flex items-center justify-center rotate-45" />
                        </div>
                      </div>

                      {/* Column 2 & 3: Feed / Pulse */}
                      <div className="col-span-1 lg:col-span-2 space-y-6">
                        <h3 className="text-sm font-medium text-bone border-b border-line pb-2">Campus Pulse</h3>
                        
                        {[
                          { type: 'EVENT', title: 'AWS Community Day', time: 'Tomorrow, 11:00 AM' },
                          { type: 'ANNOUNCEMENT', title: 'Library Hours Extended', time: 'Today, 09:00 AM' },
                          { type: 'CLUB', title: 'Debate Society Meeting', time: 'Thu, 18:00 PM' },
                        ].map((item, i) => (
                          <div key={i} className="flex gap-4 p-4 rounded-xl border border-line bg-ink/30 hover:bg-surface-raised transition-colors cursor-pointer group">
                            <div className="w-2 h-2 rounded-full bg-tide mt-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                            <div>
                              <p className="text-[10px] font-mono text-mist mb-1 uppercase tracking-wider">{item.type}</p>
                              <p className="text-sm font-medium text-bone">{item.title}</p>
                              <p className="text-xs text-mist mt-1">{item.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {activeTab === 'Timetable' && (
                    <motion.div 
                      key="timetable"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-4"
                    >
                      {[
                        { time: '09:15 - 10:00', title: 'Data Structures', room: 'L-01', type: 'Lecture' },
                        { time: '10:15 - 11:00', title: 'Engineering Graphics', room: 'B-204', type: 'Lab', active: true },
                        { time: '11:15 - 12:00', title: 'Linear Algebra', room: 'A-102', type: 'Lecture' },
                        { time: '13:00 - 15:00', title: 'Physics Practicals', room: 'Physics Lab', type: 'Lab' },
                      ].map((session, i) => (
                        <div key={i} className={`p-4 rounded-lg border ${session.active ? 'border-tide/50 bg-tide/5' : 'border-line bg-ink/30'} flex items-center justify-between`}>
                          <div className="flex items-center gap-6">
                            <span className={`font-mono text-xs ${session.active ? 'text-tide' : 'text-mist'}`}>{session.time}</span>
                            <div>
                              <p className="text-sm font-medium text-bone">{session.title}</p>
                              <p className="text-xs text-mist">{session.room}</p>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono uppercase tracking-widest text-mist bg-surface-raised px-2 py-1 rounded-full">{session.type}</span>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {activeTab === 'Events' && (
                    <motion.div 
                      key="events"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="grid grid-cols-2 gap-4"
                    >
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="aspect-video rounded-lg border border-line bg-ink/50 relative overflow-hidden group">
                           <div className="absolute inset-0 bg-surface-raised opacity-50 group-hover:opacity-100 transition-opacity" />
                           <div className="absolute bottom-4 left-4 z-10">
                             <div className="text-[10px] bg-tide/20 text-tide font-mono px-2 py-0.5 rounded mb-2 w-fit border border-tide/30">UPCOMING</div>
                             <p className="text-sm font-medium text-bone">Tech Symposium {i}</p>
                           </div>
                        </div>
                      ))}
                    </motion.div>
                  )}

                  {/* Fallback for other tabs */}
                  {['Attendance', 'Communities'].includes(activeTab) && (
                    <motion.div 
                      key="fallback"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.3 }}
                      className="h-full flex flex-col items-center justify-center text-mist border-2 border-dashed border-line rounded-xl"
                    >
                      <p className="text-sm font-mono">Module UI Loading...</p>
                      <p className="text-xs mt-2 opacity-50">Data sync in progress</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
