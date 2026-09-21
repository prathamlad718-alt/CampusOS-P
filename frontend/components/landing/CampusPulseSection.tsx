'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export function CampusPulseSection() {
  return (
    <section className="relative w-full py-32 px-6 bg-ink border-t border-line" id="pulse">
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <p className="system-label m-0">Live Feed</p>
          </div>
          <h2 className="text-4xl lg:text-5xl font-serif text-bone">Campus Pulse</h2>
        </motion.div>

        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            visible: { transition: { staggerChildren: 0.1 } }
          }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[minmax(200px,auto)]"
        >
          
          {/* Large Story (col-span-8) */}
          <Link href="/events" className="md:col-span-8 md:row-span-2 block">
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="glass-panel rounded-2xl overflow-hidden relative group bg-ink h-full"
            >
              <div className="hidden dark:block absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070')] bg-cover bg-center transition-transform duration-1000 group-hover:scale-105 mix-blend-luminosity" />
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/40 to-transparent" />
              
              <div className="relative z-10 p-8 h-full flex flex-col justify-end">
                <span className="inline-block px-3 py-1 bg-white/10 backdrop-blur text-bone text-[10px] font-mono uppercase tracking-widest rounded-sm mb-4 w-fit border border-white/20">
                  Hackathon
                </span>
                <h3 className="text-3xl font-serif text-bone mb-3">Spring Innovation Hackathon 2026</h3>
                <p className="text-mist max-w-xl text-sm">Join 500+ students for 48 hours of building, designing, and coding. Registration is now open across all departments.</p>
              </div>
            </motion.div>
          </Link>

          {/* Event (col-span-4) */}
          <Link href="/events" className="md:col-span-4 block">
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:border-tide/50 transition-colors cursor-pointer h-full flex flex-col"
            >
              <p className="system-label text-tide mb-4">Workshop</p>
              <h4 className="text-xl font-medium text-bone mb-2">Introduction to Robotics AI</h4>
              <p className="text-mist text-sm mb-4">Learn the fundamentals of computer vision and autonomous navigation.</p>
              <div className="mt-auto flex items-center justify-between text-xs font-mono text-mist">
                <span>Today &middot; 14:00</span>
                <span className="text-tide group-hover:underline cursor-pointer">Register &rarr;</span>
              </div>
            </motion.div>
          </Link>

          {/* Announcement (col-span-4) */}
          <Link href="/dashboard" className="md:col-span-4 block">
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="glass-panel rounded-2xl p-6 bg-surface-raised flex flex-col h-full hover:bg-surface-raised/80 transition-colors"
            >
              <p className="system-label mb-4">Announcement</p>
              <h4 className="text-lg font-medium text-bone mb-2">Library extended hours</h4>
              <p className="text-mist text-sm">The central library will now remain open until 2:00 AM during the mid-semester examination week.</p>
            </motion.div>
          </Link>

          {/* Club Activity (col-span-4) */}
          <Link href="/clubs" className="md:col-span-4 block">
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="glass-panel rounded-2xl p-6 border-tide/30 bg-tide/5 flex flex-col justify-between h-full hover:bg-tide/10 transition-colors"
            >
              <div>
                <p className="system-label text-tide mb-4">Club Activity</p>
                <h4 className="text-lg font-medium text-bone mb-2">Debate Society Tryouts</h4>
              </div>
              <div className="flex -space-x-2 mt-4">
                {[1,2,3].map(i => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 border-ink bg-surface-raised flex items-center justify-center text-[10px] text-mist">
                    U{i}
                  </div>
                ))}
                <div className="text-xs text-mist ml-4 pl-2 my-auto">30+ Attending</div>
              </div>
            </motion.div>
          </Link>

          {/* Featured Event (col-span-8) */}
          <Link href="/events" className="md:col-span-8 block">
            <motion.div 
              variants={{ hidden: { opacity: 0, y: 30 }, visible: { opacity: 1, y: 0 } }}
              className="glass-panel rounded-2xl p-6 flex items-center gap-6 group hover:bg-surface-raised transition-colors cursor-pointer h-full"
            >
               <div className="w-24 h-24 rounded-xl bg-[url('https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=1000')] bg-cover bg-center shrink-0 grayscale opacity-80 group-hover:grayscale-0 transition-all duration-500" />
               <div>
                 <p className="system-label mb-2">Featured Event</p>
                 <h4 className="text-xl font-medium text-bone mb-1">Alumni Tech Panel</h4>
                 <p className="text-mist text-sm">Listen to graduates from Google, Microsoft, and Amazon share their journey.</p>
               </div>
            </motion.div>
          </Link>

        </motion.div>
      </div>
    </section>
  );
}
