'use client';

import { motion } from 'framer-motion';

const FEATURES = [
  {
    category: "Core Intelligence",
    items: [
      "Global Command Center",
      "Universal Campus Search",
      "Smart Notification System",
      "Personal Academic Timeline",
      "Privacy Center"
    ]
  },
  {
    category: "Academic OS",
    items: [
      "Dedicated Faculty Workspace",
      "Assignment & Deadline System",
      "Campus Drive File System",
      "Attendance Tracking",
      "Interactive Syllabus"
    ]
  },
  {
    category: "Campus & Logistics",
    items: [
      "Actual Campus Navigation",
      "Transport Module (Buses)",
      "Centralized Campus Services",
      "Smart Issue Reporting",
      "Cafeteria & Facilities"
    ]
  },
  {
    category: "Ecosystem",
    items: [
      "Plugin Marketplace Architecture",
      "Student Collaboration Hub",
      "Club & Community Portals",
      "Alumni Network integration",
      "Role-Based Access Control"
    ]
  }
];

export function OtherFeaturesSection() {
  return (
    <section className="relative w-full px-6 py-32 border-t border-line/30 bg-ink">
      <div className="mx-auto max-w-6xl">
        
        <div className="mb-16">
          <p className="system-label text-tide mb-4">Plugin Architecture</p>
          <h2 className="text-4xl lg:text-5xl font-serif text-bone max-w-2xl">
            Start with the core.<br />
            <span className="text-mist">Install the rest.</span>
          </h2>
          <p className="mt-6 text-mist text-lg max-w-xl font-light">
            Campus OS operates on a modular plugin architecture. Every university is different. Start with Users and Timetables, then simply browse the marketplace to enable Transport, Hostels, or Campus Drive with a single click.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
          {FEATURES.map((group, idx) => (
            <motion.div 
              key={group.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <h3 className="text-sm font-mono text-mist uppercase tracking-widest border-b border-line pb-4 mb-6">
                {group.category}
              </h3>
              <ul className="space-y-4">
                {group.items.map((item, itemIdx) => (
                  <li key={itemIdx} className="flex items-center gap-3 group">
                    <span className="w-1 h-1 rounded-full bg-tide/30 group-hover:bg-tide transition-colors" />
                    <span className="text-bone/80 group-hover:text-bone transition-colors text-sm">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
