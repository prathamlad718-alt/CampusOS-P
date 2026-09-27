'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Layers, Cpu, ShieldCheck, Zap } from 'lucide-react';

const CAPABILITIES = [
  {
    category: "Academic Operating Core",
    icon: Layers,
    items: [
      { name: "5-Unit Syllabus Management", link: "/courses" },
      { name: "Master Weekly Timetable & Day View", link: "/timetable" },
      { name: "10.0 Scale SGPA / CGPA Transcripts", link: "/academics" },
      { name: "Faculty Continuous Evaluation Gradebook", link: "/courses" },
      { name: "75% Attendance Health Guardrails", link: "/courses" }
    ]
  },
  {
    category: "Smart Facilities & Logistics",
    icon: Cpu,
    items: [
      { name: "AI Lab Workstation Booking", link: "/booking" },
      { name: "Faculty Whole-Hall Reservation", link: "/booking" },
      { name: "Library Quiet Pod Allocation", link: "/booking" },
      { name: "Live Transit Fleet GPS Telemetry", link: "/transport" },
      { name: "Campus Maintenance Issue Dispatch", link: "/issues" }
    ]
  },
  {
    category: "Directives & Telemetry",
    icon: Zap,
    items: [
      { name: "Targeted Bulletins (Dept & Sem)", link: "/announcements" },
      { name: "Emergency Broadcast Directives", link: "/announcements" },
      { name: "1-Click Contextual Action Reminders", link: "/notifications" },
      { name: "Interactive Academic Term Calendar", link: "/announcements" },
      { name: "Student Council Chapter Portals", link: "/collaboration" }
    ]
  },
  {
    category: "Security & Governance",
    icon: ShieldCheck,
    items: [
      { name: "Role-Based Access Control (RBAC)", link: "/dashboard" },
      { name: "Cryptographic Transcript Verification", link: "/academics" },
      { name: "Zero-Clash Scheduling Constraint Solver", link: "/timetable" },
      { name: "Universal Dispatch Command Bar (⌘K)", link: "/dashboard" },
      { name: "Modular Plugin Architecture SDK", link: "/plugins" }
    ]
  }
];

export function OtherFeaturesSection() {
  return (
    <section className="relative w-full px-6 py-28 border-t border-line/60 bg-ink-2/40" id="capabilities">
      <div className="mx-auto max-w-7xl">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-6 border-b border-line gap-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 rounded-full bg-blue-500" />
              <p className="text-[11px] font-mono uppercase tracking-widest text-blue-400">
                Complete Institutional Breadth
              </p>
            </div>
            <h2 className="text-3xl sm:text-5xl font-serif text-bone max-w-2xl tracking-tight">
              One coherent system.<br />
              <span className="text-mist">Twenty interconnected capabilities.</span>
            </h2>
          </div>
          <p className="text-sm text-mist max-w-md font-light leading-relaxed">
            Every module in CampusOS communicates with the central kernel. When an exam schedule is updated, timetables, room bookings, and student notifications synchronize automatically.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {CAPABILITIES.map((group, idx) => {
            const Icon = group.icon;
            return (
              <motion.div
                key={group.category}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="p-6 rounded-2xl border border-line-strong bg-ink/70 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center gap-2.5 pb-4 mb-5 border-b border-line">
                    <div className="w-8 h-8 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-mono text-bone uppercase tracking-wider font-semibold">
                      {group.category}
                    </h3>
                  </div>

                  <ul className="space-y-3.5">
                    {group.items.map((item, itemIdx) => (
                      <li key={itemIdx}>
                        <Link
                          href={item.link}
                          className="flex items-center gap-2.5 group text-xs text-mist hover:text-bone transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover:bg-blue-400 group-hover:scale-125 transition-all shrink-0" />
                          <span className="leading-snug">{item.name}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 mt-6 border-t border-line/40 flex items-center justify-between text-[11px] font-mono text-mist">
                  <span>Subsystem 0{idx + 1}</span>
                  <span className="text-emerald-400">● Verified</span>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
