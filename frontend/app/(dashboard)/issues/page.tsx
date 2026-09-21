'use client';

import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Camera,
  CheckCircle2,
  Clock,
  AlertCircle,
  MapPin,
  Tag,
  ArrowRight,
  Filter,
  UploadCloud
} from 'lucide-react';

interface IssueTicket {
  id: string;
  ticketNumber: string;
  title: string;
  location: string;
  category: 'AV / Projector' | 'Wi-Fi / Network' | 'Electrical' | 'Facilities' | 'Hostel';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  status: 'Reported' | 'Assigned' | 'In Progress' | 'Fixed';
  reportedAt: string;
  assignedTo?: string;
  photoAttached?: boolean;
}

const INITIAL_TICKETS: IssueTicket[] = [
  {
    id: 't1',
    ticketNumber: 'TK-842',
    title: 'Ceiling Projector in Room 302 won\'t sync HDMI input',
    location: 'Alan Turing Block, Room 302',
    category: 'AV / Projector',
    priority: 'Critical',
    status: 'In Progress',
    reportedAt: 'Today, 09:15 AM',
    assignedTo: 'Media & Classroom Tech Team',
    photoAttached: true
  },
  {
    id: 't2',
    ticketNumber: 'TK-839',
    title: 'Air conditioning condensate dripping near workstation 14',
    location: 'Alan Turing Block, Lab 204',
    category: 'Facilities',
    priority: 'High',
    status: 'Fixed',
    reportedAt: 'Yesterday, 02:40 PM',
    assignedTo: 'Campus HVAC Maintenance',
    photoAttached: true
  },
  {
    id: 't3',
    ticketNumber: 'TK-840',
    title: 'Wi-Fi AP #4 intermittent disconnects during high load',
    location: 'Ramanujan Mathematical Sciences Hall',
    category: 'Wi-Fi / Network',
    priority: 'Medium',
    status: 'Assigned',
    reportedAt: 'Yesterday, 04:10 PM',
    assignedTo: 'Network Infrastructure NOC',
    photoAttached: false
  }
];

export default function IssuesPage() {
  const [tickets, setTickets] = useState<IssueTicket[]>(INITIAL_TICKETS);
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [showModal, setShowModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Form
  const [title, setTitle] = useState('');
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState<any>('AV / Projector');
  const [priority, setPriority] = useState<any>('High');
  const [hasPhoto, setHasPhoto] = useState(true);

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const newTicket: IssueTicket = {
      id: 'tk_' + Date.now(),
      ticketNumber: 'TK-' + (843 + tickets.length),
      title,
      location,
      category,
      priority,
      status: 'Reported',
      reportedAt: 'Just now',
      assignedTo: 'Campus Dispatch Triage Desk',
      photoAttached: hasPhoto
    };

    setTickets([newTicket, ...tickets]);
    setShowModal(false);
    setTitle('');
    setLocation('');
    setSuccessToast(`Ticket #${newTicket.ticketNumber} lodged! Dispatched to facilities admin queue.`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const filteredTickets = tickets.filter(t => {
    if (filterStatus === 'All') return true;
    return t.status === filterStatus;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Infrastructure OS</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Smart Issue &amp; Maintenance Reporting
          </h1>
          <p className="text-sm text-mist mt-1">
            Report broken campus equipment with photo verification &bull; Real-time automated lifecycle workflow.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-lg shadow-tide/20 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Report Campus Issue
        </button>
      </div>

      {successToast && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" /> {successToast}
        </div>
      )}

      {/* Lifecycle Workflow Bar */}
      <div className="glass-panel p-5 rounded-2xl border border-line bg-surface/40">
        <span className="text-[10px] font-mono uppercase tracking-widest text-mist block mb-3">
          Campus OS Automated Resolution Pipeline
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
          <div className="p-3 rounded-xl bg-surface border border-line">
            <span className="text-xs font-mono font-bold text-bone">1. Reported</span>
            <p className="text-[11px] text-mist mt-0.5">Photo &amp; Geo-tag logged</p>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-line">
            <span className="text-xs font-mono font-bold text-amber-400">2. Assigned</span>
            <p className="text-[11px] text-mist mt-0.5">Routed to staff roster</p>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-line">
            <span className="text-xs font-mono font-bold text-tide">3. In Progress</span>
            <p className="text-[11px] text-mist mt-0.5">Technician on-site</p>
          </div>
          <div className="p-3 rounded-xl bg-surface border border-line">
            <span className="text-xs font-mono font-bold text-emerald-400">4. Fixed</span>
            <p className="text-[11px] text-mist mt-0.5">Student verification</p>
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-line pb-2">
        {['All', 'Reported', 'Assigned', 'In Progress', 'Fixed'].map(st => (
          <button
            key={st}
            onClick={() => setFilterStatus(st)}
            className={`px-4 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-colors ${
              filterStatus === st
                ? 'bg-surface text-tide border border-line-strong font-bold'
                : 'text-mist hover:text-bone'
            }`}
          >
            {st} ({st === 'All' ? tickets.length : tickets.filter(t => t.status === st).length})
          </button>
        ))}
      </div>

      {/* Tickets Feed */}
      <div className="space-y-4">
        {filteredTickets.map(ticket => {
          const isFixed = ticket.status === 'Fixed';
          const isInProgress = ticket.status === 'In Progress';

          return (
            <div
              key={ticket.id}
              className={`glass-panel p-6 rounded-3xl border transition-all ${
                isFixed ? 'opacity-70 border-line' : isInProgress ? 'border-tide/50 shadow-[0_0_20px_rgba(70,183,255,0.08)]' : 'border-line hover:border-line-strong'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                <div className="flex items-center gap-2.5">
                  <span className="text-xs font-mono font-bold text-tide bg-tide/10 px-2.5 py-0.5 rounded-full border border-tide/20">
                    {ticket.ticketNumber}
                  </span>
                  <span className="text-xs font-mono text-mist">&bull; {ticket.category}</span>
                  <span className="text-xs font-mono text-mist">&bull; {ticket.reportedAt}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full font-semibold border ${
                    ticket.status === 'Fixed'
                      ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                      : ticket.status === 'In Progress'
                      ? 'bg-tide/10 text-tide border-tide/30'
                      : 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                  }`}>
                    Status: {ticket.status}
                  </span>
                </div>
              </div>

              <h3 className="text-lg font-semibold text-bone">
                {ticket.title}
              </h3>

              <div className="flex flex-wrap items-center gap-4 mt-3 text-xs text-mist">
                <span className="flex items-center gap-1 text-bone">
                  <MapPin className="w-3.5 h-3.5 text-tide" />
                  {ticket.location}
                </span>
                {ticket.assignedTo && (
                  <span className="text-mist">
                    Assigned: <span className="text-bone font-medium">{ticket.assignedTo}</span>
                  </span>
                )}
                {ticket.photoAttached && (
                  <span className="flex items-center gap-1 text-emerald-400 font-mono text-[11px]">
                    <Camera className="w-3.5 h-3.5" /> Photo Attached
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: New Issue Ticket */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-ink-2 border border-line-strong rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="text-xl font-serif text-bone">Report Broken Campus Equipment</h3>
              <button onClick={() => setShowModal(false)} className="text-mist hover:text-bone">✕</button>
            </div>

            <form onSubmit={handleCreateTicket} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                  What is broken?
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Projector in Room 302 flickering or won't turn on"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                    Location / Room
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Turing Block 302"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                  />
                </div>
                <div>
                  <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e: any) => setCategory(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                  >
                    <option value="AV / Projector">AV / Projector</option>
                    <option value="Wi-Fi / Network">Wi-Fi / Network</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Facilities">Facilities &amp; AC</option>
                    <option value="Hostel">Hostel Maintenance</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload Box Simulation */}
              <div className="p-4 rounded-2xl bg-surface border border-dashed border-line-strong text-center">
                <Camera className="w-6 h-6 text-tide mx-auto mb-1.5" />
                <p className="text-xs font-medium text-bone">Take Photo / Upload Attachment</p>
                <p className="text-[10px] text-mist mt-0.5">Captures visual evidence for fast dispatch</p>
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-mist hover:text-bone"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-lg"
                >
                  Submit Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
