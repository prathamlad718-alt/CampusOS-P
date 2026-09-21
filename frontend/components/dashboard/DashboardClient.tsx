'use client';

import React, { useState } from 'react';
import { CommandCenter } from '@/components/dashboard/CommandCenter';
import { UniversalSearchModal } from '@/components/dashboard/UniversalSearchModal';
import { ExtensionPoint } from '@campus-os/shared/extension-point';

interface DashboardClientProps {
  activePlugins: string[];
}

export function DashboardClient({ activePlugins }: DashboardClientProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-80 w-[36rem] -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(70,183,255,0.15),transparent_60%)] blur-3xl" />
        <div className="absolute right-[-8%] top-24 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(139,243,230,0.12),transparent_60%)] blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] opacity-40 dark:opacity-20" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto pt-2">
        {/* Core Feature 1: Campus OS Command Center */}
        <CommandCenter onOpenSearch={() => setIsSearchOpen(true)} />

        {/* Modular Plugin Extension Points underneath the main command deck */}
        <div className="mt-12 space-y-10 border-t border-line/60 pt-10">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-mist">
              Installed Extension Modules ({activePlugins.length})
            </span>
          </div>

          <ExtensionPoint
            id="dashboard-top"
            activePlugins={activePlugins}
            context={{ dashboard: true }}
          />

          <ExtensionPoint
            id="dashboard-stats"
            activePlugins={activePlugins}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          />

          <ExtensionPoint
            id="dashboard-actions"
            activePlugins={activePlugins}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          />

          <ExtensionPoint
            id="dashboard-activity"
            activePlugins={activePlugins}
            className="space-y-4"
          />
        </div>
      </div>

      {/* Core Feature 2: Universal Campus Search (Cmd+K) */}
      <UniversalSearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
    </div>
  );
}
