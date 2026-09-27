'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Megaphone,
  AlertTriangle,
  ShieldCheck,
  Calendar,
  FileText,
  Download,
  Users,
  Search,
  Filter,
  Plus,
  X,
  Send,
  Pin,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import { useAuth } from '@campus-os/shared/auth-provider';
import { INITIAL_ANNOUNCEMENTS, AnnouncementItem } from '@/lib/communication-data';

export default function AnnouncementsPage() {
  const { user } = useAuth();
  const isAdminOrFaculty = user?.isSuperAdmin || user?.role === 'admin' || user?.role === 'faculty';

  const [announcements, setAnnouncements] = useState<AnnouncementItem[]>(INITIAL_ANNOUNCEMENTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedPriority, setSelectedPriority] = useState<string>('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // New Announcement Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newCategory, setNewCategory] = useState<AnnouncementItem['category']>('Academic');
  const [newPriority, setNewPriority] = useState<AnnouncementItem['priority']>('Important');
  const [newTarget, setNewTarget] = useState<AnnouncementItem['scope']['target']>('Campus-Wide');
  const [isPinned, setIsPinned] = useState(false);

  const handleCreateAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) return;

    const created: AnnouncementItem = {
      id: 'ann_' + Date.now(),
      title: newTitle,
      summary: newSummary || newContent.slice(0, 120) + '...',
      content: newContent,
      category: newCategory,
      priority: newPriority,
      author: {
        name: user?.name || 'Academic Administrator',
        title: user?.isSuperAdmin ? 'Office of the Registrar' : 'Department Faculty In-charge',
        department: 'Academic Administration',
        verified: true
      },
      date: 'Just Now',
      scope: {
        target: newTarget
      },
      pinned: isPinned
    };

    setAnnouncements([created, ...announcements]);
    setIsModalOpen(false);
    setNewTitle('');
    setNewSummary('');
    setNewContent('');
  };

  const filteredAnnouncements = announcements.filter(ann => {
    const matchesSearch =
      ann.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ann.author.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || ann.category === selectedCategory;
    const matchesPriority = selectedPriority === 'All' || ann.priority === selectedPriority;
    return matchesSearch && matchesCategory && matchesPriority;
  });

  const pinnedAnnouncements = filteredAnnouncements.filter(a => a.pinned);
  const regularAnnouncements = filteredAnnouncements.filter(a => !a.pinned);

  const getPriorityStyle = (priority: AnnouncementItem['priority']) => {
    switch (priority) {
      case 'Emergency':
        return 'bg-rose-500/20 text-rose-400 border-rose-500/40';
      case 'Urgent':
        return 'bg-amber-500/20 text-amber-400 border-amber-500/40';
      case 'Important':
        return 'bg-tide/20 text-tide border-tide/40';
      case 'Normal':
        return 'bg-surface text-mist border-line';
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-tide">Institutional Broadcast System</span>
            <span className="text-xs font-mono text-mist">&bull; Verified Campus Directives</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-bone mt-1 flex items-center gap-3">
            <span>Official Announcements</span>
          </h1>
          <p className="text-sm text-mist max-w-2xl mt-1">
            Targeted institutional circulars, academic rescheduling notices, placement recruitment bulletins, and emergency directives.
          </p>
        </div>

        {/* Action Button: Broadcast for Faculty / Admin */}
        {isAdminOrFaculty && (
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-tide text-ink text-xs font-mono font-bold hover:bg-cyan-300 transition-colors shadow-lg shadow-tide/20 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Broadcast Circular</span>
          </button>
        )}
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-surface/50 border border-line p-3 rounded-2xl">
        <div className="relative w-full md:w-80">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-mist" />
          <input
            type="text"
            placeholder="Search circulars, directives, authors..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 bg-ink/50 border border-line rounded-xl text-xs text-bone placeholder-mist focus:outline-none focus:border-tide/50 transition-colors"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2 w-full md:w-auto">
          {/* Category Dropdown/Chips */}
          {(['All', 'Examination', 'Academic', 'Placements', 'Administrative'] as const).map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-tide text-ink font-semibold shadow-md shadow-tide/20'
                  : 'bg-surface/60 hover:bg-surface text-mist hover:text-bone border border-line'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Pinned & Emergency Directives Section */}
      {pinnedAnnouncements.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
            <Pin className="w-3.5 h-3.5" />
            <span className="uppercase tracking-wider font-bold">Pinned Priority Directives</span>
          </div>

          <div className="space-y-4">
            {pinnedAnnouncements.map(ann => {
              const isExpanded = expandedId === ann.id;
              const isEmergency = ann.priority === 'Emergency';

              return (
                <div
                  key={ann.id}
                  className={`glass-panel p-6 rounded-2xl border transition-all ${
                    isEmergency
                      ? 'border-rose-500/60 bg-rose-500/10 shadow-lg shadow-rose-500/10'
                      : 'border-amber-500/50 bg-amber-500/10'
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="space-y-2 max-w-3xl">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className={`px-2.5 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getPriorityStyle(ann.priority)}`}>
                          {ann.priority}
                        </span>
                        <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ink/50 text-mist border border-line">
                          Scope: {ann.scope.target}
                        </span>
                        <span className="text-[11px] font-mono text-mist">&bull; {ann.date}</span>
                      </div>

                      <h3 className="text-xl font-serif text-bone leading-tight">
                        {ann.title}
                      </h3>

                      <p className="text-xs text-bone/90 leading-relaxed font-sans">
                        {ann.summary}
                      </p>

                      {isExpanded && (
                        <div className="pt-4 mt-3 border-t border-line/60 space-y-4 animate-in fade-in duration-200">
                          <div className="text-xs text-bone/80 whitespace-pre-line leading-relaxed">
                            {ann.content}
                          </div>

                          {ann.attachments && ann.attachments.length > 0 && (
                            <div className="pt-2">
                              <div className="text-[11px] font-mono text-mist uppercase mb-2">Attached Documents</div>
                              <div className="flex flex-wrap gap-2">
                                {ann.attachments.map((file, idx) => (
                                  <button
                                    key={idx}
                                    onClick={() => alert(`Downloading ${file.name}...`)}
                                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface/80 hover:bg-surface text-xs font-mono text-tide transition-colors"
                                  >
                                    <Download className="w-3.5 h-3.5" />
                                    <span>{file.name}</span>
                                    <span className="text-[10px] text-mist">({file.size})</span>
                                  </button>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Author Seal */}
                      <div className="flex items-center gap-2 pt-2 text-xs font-mono text-mist">
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-bone">{ann.author.name}</span>
                        <span>&bull;</span>
                        <span>{ann.author.title}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => setExpandedId(isExpanded ? null : ann.id)}
                      className="px-3 py-1.5 rounded-xl border border-line bg-surface/60 hover:bg-surface text-bone text-xs font-mono flex items-center gap-1.5 transition-colors self-start cursor-pointer"
                    >
                      <span>{isExpanded ? 'Collapse' : 'Read Full Directive'}</span>
                      {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Regular Announcements Stream */}
      <div className="space-y-4">
        <h2 className="text-lg font-serif text-bone">All Institutional Bulletins</h2>

        <div className="space-y-4">
          {regularAnnouncements.map(ann => {
            const isExpanded = expandedId === ann.id;

            return (
              <div
                key={ann.id}
                className="glass-panel p-5 sm:p-6 rounded-2xl border border-line bg-surface/30 hover:border-tide/40 transition-all duration-300"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="space-y-2 max-w-3xl">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold uppercase border ${getPriorityStyle(ann.priority)}`}>
                        {ann.priority}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ink/50 text-mist border border-line">
                        {ann.category}
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-ink/50 text-mist border border-line">
                        Scope: {ann.scope.target} {ann.scope.department ? `(${ann.scope.department})` : ''}
                      </span>
                      <span className="text-[11px] font-mono text-mist">&bull; {ann.date}</span>
                    </div>

                    <h3 className="text-lg font-serif text-bone leading-tight">
                      {ann.title}
                    </h3>

                    <p className="text-xs text-mist leading-relaxed font-sans">
                      {ann.summary}
                    </p>

                    {isExpanded && (
                      <div className="pt-4 mt-3 border-t border-line/60 space-y-4 animate-in fade-in duration-200">
                        <div className="text-xs text-bone/80 whitespace-pre-line leading-relaxed">
                          {ann.content}
                        </div>

                        {ann.attachments && ann.attachments.length > 0 && (
                          <div className="pt-2">
                            <div className="text-[11px] font-mono text-mist uppercase mb-2">Attached Documents</div>
                            <div className="flex flex-wrap gap-2">
                              {ann.attachments.map((file, idx) => (
                                <button
                                  key={idx}
                                  onClick={() => alert(`Downloading ${file.name}...`)}
                                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-line bg-surface hover:bg-surface/80 text-xs font-mono text-tide transition-colors"
                                >
                                  <Download className="w-3.5 h-3.5" />
                                  <span>{file.name}</span>
                                  <span className="text-[10px] text-mist">({file.size})</span>
                                </button>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Author Seal */}
                    <div className="flex items-center gap-2 pt-2 text-xs font-mono text-mist">
                      <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      <span className="font-semibold text-bone">{ann.author.name}</span>
                      <span>&bull;</span>
                      <span>{ann.author.department}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setExpandedId(isExpanded ? null : ann.id)}
                    className="px-3 py-1.5 rounded-xl border border-line bg-surface/50 hover:bg-surface text-bone text-xs font-mono flex items-center gap-1.5 transition-colors self-start cursor-pointer"
                  >
                    <span>{isExpanded ? 'Collapse' : 'Read More'}</span>
                    {isExpanded ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Broadcast Modal for Faculty & Admin */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="glass-panel w-full max-w-2xl rounded-3xl border border-line bg-ink-2 p-6 sm:p-8 space-y-6 shadow-2xl overflow-y-auto max-h-[90vh]">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <div>
                <h3 className="text-xl font-serif text-bone">Broadcast Official Circular</h3>
                <p className="text-xs text-mist mt-0.5">Directly routes to student and faculty dashboard announcement feeds.</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-mist hover:text-bone p-1 rounded-lg hover:bg-surface transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateAnnouncement} className="space-y-4">
              <div>
                <label className="block text-xs font-mono text-mist uppercase mb-1">Directive Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Schedule Change for Autumn 2024 Lab Examinations..."
                  value={newTitle}
                  onChange={e => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 bg-ink border border-line rounded-xl text-xs text-bone focus:border-tide outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-mono text-mist uppercase mb-1">Category</label>
                  <select
                    value={newCategory}
                    onChange={e => setNewCategory(e.target.value as any)}
                    className="w-full px-3 py-2 bg-ink border border-line rounded-xl text-xs text-bone focus:border-tide outline-none"
                  >
                    <option value="Academic">Academic</option>
                    <option value="Examination">Examination</option>
                    <option value="Administrative">Administrative</option>
                    <option value="Placements">Placements</option>
                    <option value="Campus Life">Campus Life</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist uppercase mb-1">Priority Severity</label>
                  <select
                    value={newPriority}
                    onChange={e => setNewPriority(e.target.value as any)}
                    className="w-full px-3 py-2 bg-ink border border-line rounded-xl text-xs text-bone focus:border-tide outline-none"
                  >
                    <option value="Normal">Normal</option>
                    <option value="Important">Important</option>
                    <option value="Urgent">Urgent</option>
                    <option value="Emergency">Emergency</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-mono text-mist uppercase mb-1">Audience Scope</label>
                  <select
                    value={newTarget}
                    onChange={e => setNewTarget(e.target.value as any)}
                    className="w-full px-3 py-2 bg-ink border border-line rounded-xl text-xs text-bone focus:border-tide outline-none"
                  >
                    <option value="Campus-Wide">Campus-Wide</option>
                    <option value="Department">Department Specific</option>
                    <option value="Semester">Semester Cohort</option>
                    <option value="Faculty Only">Faculty Only</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-mono text-mist uppercase mb-1">Summary (Short preview)</label>
                <input
                  type="text"
                  placeholder="One sentence synopsis..."
                  value={newSummary}
                  onChange={e => setNewSummary(e.target.value)}
                  className="w-full px-4 py-2 bg-ink border border-line rounded-xl text-xs text-bone focus:border-tide outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-mono text-mist uppercase mb-1">Full Directive Body</label>
                <textarea
                  required
                  rows={5}
                  placeholder="Enter full institutional decree, dates, venues, instructions..."
                  value={newContent}
                  onChange={e => setNewContent(e.target.value)}
                  className="w-full px-4 py-2.5 bg-ink border border-line rounded-xl text-xs text-bone focus:border-tide outline-none font-sans"
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="pinDirective"
                  checked={isPinned}
                  onChange={e => setIsPinned(e.target.checked)}
                  className="rounded border-line bg-ink text-tide focus:ring-0"
                />
                <label htmlFor="pinDirective" className="text-xs font-mono text-bone cursor-pointer">
                  Pin to top of campus dashboard as critical alert
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-line">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-xl border border-line bg-surface text-mist hover:text-bone text-xs font-mono transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex items-center gap-2 px-5 py-2 rounded-xl bg-tide text-ink text-xs font-mono font-bold hover:bg-cyan-300 transition-colors shadow-lg shadow-tide/20"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Publish Directive</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
