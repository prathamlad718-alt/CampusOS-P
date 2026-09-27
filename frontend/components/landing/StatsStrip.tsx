'use client';

import { motion } from 'framer-motion';

const STATS = [
  {
    value: "12,480",
    label: "Active Students & Scholars",
    description: "Enrolled across 18 undergraduate & postgraduate schools",
    trend: "+8.4% Term over Term",
    trendPositive: true
  },
  {
    value: "640+",
    label: "Accredited Faculty & Mentors",
    description: "Managing continuous evaluation & research advising",
    trend: "100% Digital Gradebook",
    trendPositive: true
  },
  {
    value: "15",
    label: "Connected OS Modules",
    description: "Zero data silos between academics, transit, and facilities",
    trend: "Unified Architecture",
    trendPositive: true
  },
  {
    value: "99.98%",
    label: "Institutional SLA Uptime",
    description: "Real-time fault tolerance across four physical campuses",
    trend: "24/7 Operations",
    trendPositive: true
  }
];

export function StatsStrip() {
  return (
    <section className="relative w-full border-y border-line/60 bg-ink-2/40 backdrop-blur-xl">
      {/* Terracotta top edge highlight (Buriver reference signature) */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 sm:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {STATS.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="relative flex flex-col justify-between"
            >
              {/* Terracotta / blue subtle indicator */}
              <div className="flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 rounded-full bg-orange-500/80" />
                <span className="text-[10px] font-mono uppercase tracking-widest text-orange-400/90">
                  Metric 0{idx + 1}
                </span>
              </div>

              {/* Number */}
              <div className="font-serif text-3xl sm:text-4xl lg:text-5xl text-bone tracking-tight font-normal">
                {stat.value}
              </div>

              {/* Label */}
              <div className="font-sans text-sm font-medium text-bone/90 mt-2">
                {stat.label}
              </div>

              {/* Description */}
              <p className="text-xs text-mist font-light mt-1 leading-relaxed">
                {stat.description}
              </p>

              {/* Subtle tag */}
              <div className="mt-3 pt-2.5 border-t border-line/30 flex items-center gap-1.5 text-[11px] font-mono text-emerald-400">
                <span className="w-1 h-1 rounded-full bg-emerald-400" />
                <span>{stat.trend}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
