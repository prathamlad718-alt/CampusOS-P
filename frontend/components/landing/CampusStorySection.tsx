'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function CampusStorySection() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const imageY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={containerRef} className="relative w-full py-32 px-6 overflow-hidden bg-ink">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-2 lg:order-1 relative aspect-[3/4] w-full max-w-md mx-auto lg:mx-0"
          >
            {/* Cinematic crop image */}
            <div className="absolute inset-0 rounded-2xl overflow-hidden glass-panel border-line-strong bg-ink">
              <motion.div style={{ y: imageY }} className="absolute inset-0 h-[120%] -top-[10%] hidden dark:block">
                <Image
                  src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=2070"
                  alt="Students walking on campus"
                  fill
                  className="object-cover opacity-80 mix-blend-luminosity"
                />
              </motion.div>
              <div className="hidden dark:block absolute inset-0 bg-gradient-to-t from-ink/90 via-transparent to-transparent" />
            </div>
            
            {/* Floating geometric detail */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute -bottom-6 -right-6 w-32 h-32 bg-ink-2 border border-line rounded-xl p-4 flex flex-col justify-end shadow-2xl z-10"
            >
              <div className="w-8 h-8 rounded-full bg-tide/20 flex items-center justify-center mb-auto">
                <div className="w-2 h-2 rounded-full bg-tide" />
              </div>
              <p className="system-label text-[10px]">System Sync</p>
              <p className="text-bone font-mono text-xs mt-1">Active</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="order-1 lg:order-2 space-y-10"
          >
            <div>
              <p className="system-label mb-6 text-tide">The Architecture</p>
              <h2 className="text-4xl lg:text-5xl font-serif text-bone leading-[1.2]">
                Every university already has a system.<br/>
                <span className="text-mist">Campus OS makes it visible.</span>
              </h2>
            </div>
            
            <div className="space-y-6 text-mist text-lg font-sans font-light max-w-lg">
              <p>
                Beneath the pathways, lecture halls, and libraries is an invisible network of information. Events, schedules, clubs, and academic life—all running simultaneously.
              </p>
              <p>
                Campus OS doesn&apos;t replace your campus. It surfaces it. By connecting students, faculty, and resources into a single intelligent interface, the physical campus becomes digitally accessible.
              </p>
            </div>

            <div className="pt-6 border-t border-line grid grid-cols-2 gap-6">
              {[
                { label: 'Students', value: 'Unified experience' },
                { label: 'Faculty', value: 'Streamlined workflow' },
                { label: 'Events', value: 'Centralized discovery' },
                { label: 'Spaces', value: 'Intelligent routing' },
              ].map((item, i) => (
                <motion.div 
                  key={item.label}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.1) }}
                >
                  <p className="system-label text-[10px] text-tide">{item.label}</p>
                  <p className="text-bone text-sm mt-1">{item.value}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
          
        </div>
      </div>
    </section>
  );
}
