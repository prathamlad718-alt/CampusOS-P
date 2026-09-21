'use client';

import React, { useState } from 'react';
import { useAuth } from '@campus-os/shared/auth-provider';
import {
  User,
  Bell,
  Lock,
  Eye,
  Shield,
  Palette,
  Save,
  CheckCircle2
} from 'lucide-react';
import { ThemeToggle } from '@/components/ThemeToggle';

export default function SettingsPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'profile' | 'notifications' | 'privacy' | 'appearance'>('profile');
  const [savedMessage, setSavedMessage] = useState(false);

  // Settings State
  const [name, setName] = useState(user?.name || 'Admin User');
  const [email, setEmail] = useState(user?.email || 'admin@campusos.edu');
  
  // Notification Toggles (Feature 12)
  const [urgentAlerts, setUrgentAlerts] = useState(true);
  const [assignmentDeadlines, setAssignmentDeadlines] = useState(true);
  const [clubAnnouncements, setClubAnnouncements] = useState(false);
  const [busDelays, setBusDelays] = useState(true);

  // Privacy Toggles (Feature 13)
  const [showAttendanceToPeers, setShowAttendanceToPeers] = useState(false);
  const [showProfileInDirectory, setShowProfileInDirectory] = useState(true);
  const [allowFacultyMessages, setAllowFacultyMessages] = useState(true);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pt-2">
      <div className="flex items-center justify-between border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Preferences</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            System &amp; Account Settings
          </h1>
          <p className="text-sm text-mist mt-1">
            Configure your Campus OS environment, notification filters, and privacy defaults.
          </p>
        </div>
        {savedMessage && (
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-in fade-in duration-200">
            <CheckCircle2 className="w-4 h-4" /> Preferences Saved
          </div>
        )}
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-line pb-2 overflow-x-auto text-sm">
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'profile'
              ? 'bg-surface text-tide border border-line-strong'
              : 'text-mist hover:text-bone'
          }`}
        >
          <User className="w-4 h-4" /> Profile &amp; Account
        </button>
        <button
          onClick={() => setActiveTab('notifications')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'notifications'
              ? 'bg-surface text-tide border border-line-strong'
              : 'text-mist hover:text-bone'
          }`}
        >
          <Bell className="w-4 h-4" /> Notifications &amp; Alerts
        </button>
        <button
          onClick={() => setActiveTab('privacy')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'privacy'
              ? 'bg-surface text-tide border border-line-strong'
              : 'text-mist hover:text-bone'
          }`}
        >
          <Shield className="w-4 h-4" /> Privacy &amp; Data
        </button>
        <button
          onClick={() => setActiveTab('appearance')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-colors ${
            activeTab === 'appearance'
              ? 'bg-surface text-tide border border-line-strong'
              : 'text-mist hover:text-bone'
          }`}
        >
          <Palette className="w-4 h-4" /> Appearance
        </button>
      </div>

      {/* TAB CONTENT: PROFILE */}
      {activeTab === 'profile' && (
        <form onSubmit={handleSave} className="glass-panel p-8 rounded-3xl border border-line-strong space-y-6">
          <div className="flex items-center gap-5 pb-6 border-b border-line">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-tide to-foam text-ink flex items-center justify-center font-bold text-2xl shadow-lg">
              {name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-lg font-semibold text-bone">{name}</h3>
              <p className="text-xs text-mist font-mono">{email} &bull; Verified Campus Member</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-xs font-mono text-mist uppercase tracking-wider">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-surface border border-line text-bone text-sm outline-none focus:border-tide transition-colors"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-mono text-mist uppercase tracking-wider">University Email</label>
              <input
                type="email"
                value={email}
                disabled
                className="w-full px-4 py-3 rounded-xl bg-surface/50 border border-line text-mist text-sm outline-none cursor-not-allowed"
              />
            </div>
          </div>

          <div className="pt-4 flex justify-end">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-tide hover:bg-tide/90 text-white text-sm font-medium transition-colors shadow-lg shadow-tide/20 cursor-pointer"
            >
              <Save className="w-4 h-4" /> Save Account Changes
            </button>
          </div>
        </form>
      )}

      {/* TAB CONTENT: NOTIFICATIONS (Smart Notification System - Feature 12) */}
      {activeTab === 'notifications' && (
        <div className="glass-panel p-8 rounded-3xl border border-line-strong space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-bone">Smart Notification Triage</h3>
            <p className="text-xs text-mist mt-1">
              Campus OS categorizes alerts into Urgent, Important, and Normal. Control what reaches your feed.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-line">
            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bone flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  Urgent Campus Alerts &amp; Class Cancellations
                </p>
                <p className="text-xs text-mist mt-0.5">Emergency broadcasts, room re-allocations, exam changes.</p>
              </div>
              <input
                type="checkbox"
                checked={urgentAlerts}
                onChange={(e) => setUrgentAlerts(e.target.checked)}
                className="w-5 h-5 accent-tide cursor-pointer"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bone flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-amber-400" />
                  Assignment &amp; Submission Reminders (24h Before)
                </p>
                <p className="text-xs text-mist mt-0.5">Automated pings when high-weight deadlines are approaching.</p>
              </div>
              <input
                type="checkbox"
                checked={assignmentDeadlines}
                onChange={(e) => setAssignmentDeadlines(e.target.checked)}
                className="w-5 h-5 accent-tide cursor-pointer"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bone flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400" />
                  Live Shuttle &amp; Bus Transit Delays
                </p>
                <p className="text-xs text-mist mt-0.5">Get notified if your registered campus route runs &gt;10m late.</p>
              </div>
              <input
                type="checkbox"
                checked={busDelays}
                onChange={(e) => setBusDelays(e.target.checked)}
                className="w-5 h-5 accent-tide cursor-pointer"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bone flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-mist" />
                  Clubs &amp; Campus Life Announcements
                </p>
                <p className="text-xs text-mist mt-0.5">Social gatherings, hackathon announcements, sports tryouts.</p>
              </div>
              <input
                type="checkbox"
                checked={clubAnnouncements}
                onChange={(e) => setClubAnnouncements(e.target.checked)}
                className="w-5 h-5 accent-tide cursor-pointer"
              />
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: PRIVACY (Privacy Center - Feature 13) */}
      {activeTab === 'privacy' && (
        <div className="glass-panel p-8 rounded-3xl border border-line-strong space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-bone">Campus OS Privacy Center</h3>
            <p className="text-xs text-mist mt-1">
              Your self-hosted privacy controls. Transparent data boundaries between students, faculty, and administration.
            </p>
          </div>

          <div className="space-y-4 divide-y divide-line">
            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bone">Show Attendance To Student Collaboration Finder</p>
                <p className="text-xs text-mist mt-0.5">Allow teammates in study groups to see schedule availability.</p>
              </div>
              <input
                type="checkbox"
                checked={showAttendanceToPeers}
                onChange={(e) => setShowAttendanceToPeers(e.target.checked)}
                className="w-5 h-5 accent-tide cursor-pointer"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bone">List in Universal Campus Directory</p>
                <p className="text-xs text-mist mt-0.5">Allow students to find you in Universal Search via skill tags.</p>
              </div>
              <input
                type="checkbox"
                checked={showProfileInDirectory}
                onChange={(e) => setShowProfileInDirectory(e.target.checked)}
                className="w-5 h-5 accent-tide cursor-pointer"
              />
            </div>

            <div className="pt-4 flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-bone">Direct Messaging from Faculty &amp; TAs</p>
                <p className="text-xs text-mist mt-0.5">Enable private feedback notes on returned assignment rubrics.</p>
              </div>
              <input
                type="checkbox"
                checked={allowFacultyMessages}
                onChange={(e) => setAllowFacultyMessages(e.target.checked)}
                className="w-5 h-5 accent-tide cursor-pointer"
              />
            </div>
          </div>

          <div className="bg-surface/50 border border-line rounded-2xl p-5 mt-6">
            <div className="flex items-center gap-3">
              <Lock className="w-5 h-5 text-tide" />
              <div>
                <h4 className="text-sm font-semibold text-bone">Self-Hosted Cryptographic Vault</h4>
                <p className="text-xs text-mist mt-0.5">
                  Your grades, attendance, and biometric records are stored on institutional on-premise hardware and are never broadcast to third-party ad networks.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB CONTENT: APPEARANCE */}
      {activeTab === 'appearance' && (
        <div className="glass-panel p-8 rounded-3xl border border-line-strong space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-bone">Theme &amp; Visual Comfort</h3>
            <p className="text-xs text-mist mt-1">
              Switch between Campus OS Editorial Light and Cyber Dark modes.
            </p>
          </div>

          <div className="flex items-center justify-between p-4 rounded-2xl bg-surface border border-line">
            <div>
              <p className="text-sm font-medium text-bone">Toggle System Mode</p>
              <p className="text-xs text-mist mt-0.5">Dark (OLED deep black) or Light (Editorial paper crisp)</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      )}
    </div>
  );
}
