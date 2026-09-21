'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    }
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export function FeatureEcosystemSection() {
  return (
    <section className="relative w-full py-32 px-6 bg-ink-2 overflow-hidden" id="features">
      {/* Background depth line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-32 bg-gradient-to-b from-tide/50 to-transparent" />
      
      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <p className="system-label text-tide mb-4">The Interface</p>
          <h2 className="text-4xl lg:text-5xl font-serif text-bone">A complete digital campus</h2>
        </motion.div>

        {/* Asymmetric Ecosystem Grid */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[240px]"
        >
          
          {/* Timetable (Large Card) */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl md:col-span-2 md:row-span-2 flex flex-col relative overflow-hidden group">
            <div className="relative z-10 mb-8">
              <p className="system-label">Timetable</p>
              <h3 className="text-2xl font-serif text-bone mt-2">Synchronized<br/>schedules</h3>
            </div>
            
            {/* Authentic schedule interface preview */}
            <div className="mt-auto space-y-3 relative z-10 w-full max-w-sm">
              <div className="text-xs text-mist font-mono mb-2">TODAY</div>
              {[
                { time: '09:15', name: 'Engineering Graphics', room: 'B-204', active: false },
                { time: '10:15', name: 'Mathematics', room: 'A-101', active: true },
                { time: '11:30', name: 'Physics Lab', room: 'L-04', active: false },
              ].map((item, i) => (
                <div key={i} className={`flex items-center gap-4 p-3 rounded-lg border transition-colors ${item.active ? 'border-tide/50 bg-tide/10' : 'border-line bg-ink/50 group-hover:border-line-strong'}`}>
                  <span className={`text-xs font-mono ${item.active ? 'text-tide' : 'text-mist'}`}>{item.time}</span>
                  <div>
                    <p className={`text-sm font-medium ${item.active ? 'text-bone' : 'text-bone/70'}`}>{item.name}</p>
                    <p className="text-xs text-mist">{item.room}</p>
                  </div>
                  {item.active && <div className="ml-auto w-2 h-2 rounded-full bg-tide animate-pulse" />}
                </div>
              ))}
            </div>
            <div className="absolute right-0 bottom-0 w-64 h-64 bg-tide/5 blur-[100px] rounded-full pointer-events-none" />
          </motion.div>

          {/* Attendance (Small Metric) */}
          <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl flex flex-col relative overflow-hidden group">
            <p className="system-label">Attendance</p>
            <div className="mt-auto">
              <div className="flex items-baseline gap-1">
                <span className="text-5xl font-serif text-bone">92</span>
                <span className="text-lg text-mist">%</span>
              </div>
              <p className="text-xs text-mist mt-2 font-mono group-hover:text-tide transition-colors">Global Average</p>
            </div>
          </motion.div>

          {/* Map (Small Image/Visual) */}
          <motion.div variants={cardVariants} className="glass-panel rounded-2xl flex flex-col relative overflow-hidden bg-ink group">
            <motion.div 
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.8 }}
              className="hidden dark:block absolute inset-0 opacity-50 bg-[url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1000')] bg-cover bg-center mix-blend-luminosity" 
            />
            <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-ink/90 to-transparent" />
            <div className="relative z-10 p-6 mt-auto">
              <p className="system-label text-tide mb-1">Campus Map</p>
              <p className="text-bone text-sm">Spatial navigation</p>
            </div>
          </motion.div>

          {/* Events (Vertical Image Rich) */}
          <Link href="/events" className="md:col-span-2 md:row-span-2 block">
            <motion.div variants={cardVariants} className="glass-panel rounded-2xl h-full flex flex-col relative overflow-hidden group bg-ink">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.8 }}
                className="hidden dark:block absolute inset-0 opacity-40 bg-[url('https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000')] bg-cover bg-center mix-blend-luminosity" 
              />
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />
              
              <div className="relative z-10 p-6 h-full flex flex-col pointer-events-none">
                <p className="system-label">Events</p>
                
                <div className="mt-auto">
                  <div className="inline-block px-3 py-1 bg-tide/20 backdrop-blur border border-tide/30 text-tide text-xs font-mono rounded-full mb-4">
                    UPCOMING
                  </div>
                  <h3 className="text-2xl font-serif text-bone mb-2">AWS Community Day</h3>
                  <p className="text-mist text-sm mb-4">Main Auditorium &middot; 20 Sep, 11:00 AM</p>
                  <div className="flex -space-x-2">
                    {[1,2,3,4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-ink bg-surface-raised flex items-center justify-center text-[10px] text-mist">
                        {i}
                      </div>
                    ))}
                    <div className="w-8 h-8 rounded-full border-2 border-ink bg-tide text-ink flex items-center justify-center text-[10px] font-bold">
                      +42
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </Link>

          {/* Clubs */}
          <Link href="/clubs" className="md:col-span-2 block">
            <motion.div variants={cardVariants} className="glass-panel p-6 rounded-2xl h-full flex flex-col justify-center group hover:bg-ink-2/80 transition-colors cursor-pointer">
              <div className="flex items-center gap-6">
                <div className="w-16 h-16 rounded-full bg-surface-raised border border-line flex items-center justify-center text-xl group-hover:scale-110 transition-transform">
                  🎭
                </div>
                <div>
                  <p className="system-label mb-1 text-tide">Clubs & Communities</p>
                  <h4 className="text-lg font-medium text-bone">Drama Society</h4>
                  <p className="text-mist text-sm mt-1">120 Active Members</p>
                </div>
              </div>
            </motion.div>
          </Link>

        </motion.div>
      </div>
    </section>
  );
}
