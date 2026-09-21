'use client';

import React, { useState } from 'react';
import {
  Users,
  Plus,
  Search,
  Sparkles,
  Tag,
  MessageSquare,
  CheckCircle2,
  Calendar,
  Layers,
  ArrowUpRight
} from 'lucide-react';

interface TeammateRequest {
  id: string;
  title: string;
  type: 'Hackathon' | 'Course Project' | 'Research' | 'Study Group';
  courseOrEvent: string;
  leadName: string;
  leadRole: string;
  description: string;
  skillsNeeded: string[];
  slotsTotal: number;
  slotsFilled: number;
  joined?: boolean;
}

const INITIAL_REQUESTS: TeammateRequest[] = [
  {
    id: 't1',
    title: 'Autonomous Campus Delivery Drone',
    type: 'Hackathon',
    courseOrEvent: 'Annual AWS Campus Hackathon (Oct 2)',
    leadName: 'Aryan Verma',
    leadRole: '3rd Year &bull; Robotics Club Lead',
    description: 'Building a simulated GPS-waypoint autonomous package drop system. We have the embedded flight controller logic ready; urgently looking for someone with Python computer vision (YOLO) and clean UI/UX for the ground control dashboard.',
    skillsNeeded: ['Python', 'Computer Vision', 'UI/UX', 'ROS 2'],
    slotsTotal: 4,
    slotsFilled: 2
  },
  {
    id: 't2',
    title: 'Distributed Key-Value Store with Raft',
    type: 'Course Project',
    courseOrEvent: 'CS-304: Distributed Systems',
    leadName: 'Sophia Lin',
    leadRole: '3rd Year &bull; Computer Science',
    description: 'Implementing high-performance linearizable consensus with benchmark test suites. Looking for a teammate who loves low-level systems programming in Go or Rust.',
    skillsNeeded: ['Go', 'Rust', 'Distributed Systems'],
    slotsTotal: 3,
    slotsFilled: 2
  },
  {
    id: 't3',
    title: 'Quantum Algorithms & Linear Algebra Study Circle',
    type: 'Study Group',
    courseOrEvent: 'Open Campus Working Group',
    leadName: 'David Chen',
    leadRole: '2nd Year &bull; Mathematics & Computing',
    description: 'Weekly in-person paper discussions on Shor algorithm optimizations and NISQ hardware architectures. Beginners with strong linear algebra welcome!',
    skillsNeeded: ['Linear Algebra', 'Python', 'Qiskit'],
    slotsTotal: 6,
    slotsFilled: 4
  },
  {
    id: 't4',
    title: 'Campus OS Smart Transit Fleet Predictor',
    type: 'Research',
    courseOrEvent: 'Smart Campus Infrastructure Grant',
    leadName: 'Priya Nair',
    leadRole: '4th Year &bull; Data Science',
    description: 'Using campus shuttle telemetry GPS logs to forecast peak-hour bus wait times and optimize dispatch frequency with time-series models.',
    skillsNeeded: ['Python', 'Time-Series ML', 'Data Visualization', 'SQL'],
    slotsTotal: 3,
    slotsFilled: 1
  }
];

const SKILL_TAGS = ['All Skills', 'Python', 'UI/UX', 'Rust', 'Go', 'Computer Vision', 'Distributed Systems', 'Linear Algebra'];

export default function CollaborationPage() {
  const [requests, setRequests] = useState<TeammateRequest[]>(INITIAL_REQUESTS);
  const [selectedSkill, setSelectedSkill] = useState('All Skills');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // New Request Form State
  const [newTitle, setNewTitle] = useState('');
  const [newType, setNewType] = useState<'Hackathon' | 'Course Project' | 'Research' | 'Study Group'>('Hackathon');
  const [newCourse, setNewCourse] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newSkills, setNewSkills] = useState('');

  const handleJoin = (id: string) => {
    setRequests(prev => prev.map(r => {
      if (r.id === id) {
        const isJoined = !r.joined;
        return {
          ...r,
          joined: isJoined,
          slotsFilled: isJoined ? r.slotsFilled + 1 : r.slotsFilled - 1
        };
      }
      return r;
    }));
    setSuccessToast('Team join request transmitted to project lead!');
    setTimeout(() => setSuccessToast(null), 3000);
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newReq: TeammateRequest = {
      id: 't_' + Date.now(),
      title: newTitle,
      type: newType,
      courseOrEvent: newCourse || 'Open Campus Initiative',
      leadName: 'You (Current User)',
      leadRole: 'Verified Student Member',
      description: newDesc,
      skillsNeeded: newSkills.split(',').map(s => s.trim()).filter(Boolean),
      slotsTotal: 4,
      slotsFilled: 1,
      joined: true
    };

    setRequests([newReq, ...requests]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDesc('');
    setNewSkills('');
    setSuccessToast('Teammate post published across Campus OS Collaboration Hub!');
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const filtered = requests.filter(r => {
    const matchesSkill = selectedSkill === 'All Skills' || r.skillsNeeded.includes(selectedSkill);
    const matchesQuery = !searchQuery || 
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      r.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.skillsNeeded.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesSkill && matchesQuery;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Ecosystem</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Student Collaboration Hub
          </h1>
          <p className="text-sm text-mist mt-1">
            Purpose-driven campus teams &bull; Find hackathon partners, project teammates, and study groups by skill tag.
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-lg shadow-tide/20 shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> Post Teammate Request
        </button>
      </div>

      {successToast && (
        <div className="flex items-center gap-2 px-4 py-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono animate-in fade-in duration-200">
          <CheckCircle2 className="w-4 h-4" /> {successToast}
        </div>
      )}

      {/* Search & Skill Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <div className="flex items-center gap-3 bg-surface border border-line rounded-2xl px-4 py-2.5 w-full sm:max-w-md shadow-sm">
          <Search className="w-4 h-4 text-mist" />
          <input
            type="text"
            placeholder="Search projects by keyword, course, or skills..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent border-none outline-none text-xs text-bone w-full placeholder:text-mist"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto w-full pb-1 text-xs">
          {SKILL_TAGS.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedSkill(tag)}
              className={`px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                selectedSkill === tag
                  ? 'bg-tide text-white font-semibold shadow-sm'
                  : 'bg-surface border border-line text-mist hover:text-bone'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Teammate Listings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(req => {
          const isFull = req.slotsFilled >= req.slotsTotal;

          return (
            <div
              key={req.id}
              className="glass-panel p-6 sm:p-7 rounded-3xl border border-line hover:border-line-strong transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-2">
                  <span className={`text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold border ${
                    req.type === 'Hackathon'
                      ? 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                      : req.type === 'Research'
                      ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                      : req.type === 'Course Project'
                      ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                      : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                  }`}>
                    {req.type} &bull; {req.courseOrEvent}
                  </span>

                  <span className="text-xs font-mono text-mist">
                    {req.slotsFilled} / {req.slotsTotal} Slots
                  </span>
                </div>

                <h3 className="text-xl font-serif text-bone mt-1">
                  {req.title}
                </h3>
                <p className="text-xs font-mono text-mist mt-0.5">
                  Posted by <span className="text-bone">{req.leadName}</span> ({req.leadRole})
                </p>

                <p className="text-xs text-bone/90 mt-4 leading-relaxed line-clamp-3">
                  {req.description}
                </p>

                {/* Needed Skills */}
                <div className="mt-5">
                  <span className="text-[10px] font-mono text-mist uppercase tracking-wider block mb-2">
                    Looking For:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {req.skillsNeeded.map(s => (
                      <span
                        key={s}
                        className="px-2.5 py-1 rounded-lg bg-surface border border-line text-[11px] font-mono text-tide font-medium"
                      >
                        +{s}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Action */}
              <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
                <span className="text-[11px] font-mono text-mist">
                  {isFull ? 'Team Roster Full' : `${req.slotsTotal - req.slotsFilled} spots left`}
                </span>

                <button
                  onClick={() => handleJoin(req.id)}
                  disabled={isFull && !req.joined}
                  className={`px-4 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    req.joined
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                      : isFull
                      ? 'bg-surface text-mist border border-line cursor-not-allowed'
                      : 'bg-tide hover:bg-tide/90 text-white shadow-md shadow-tide/20'
                  }`}
                >
                  {req.joined ? 'Request Sent ✓' : isFull ? 'Roster Closed' : 'Join Team &rarr;'}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Modal: Create Post */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-xl bg-ink-2 border border-line-strong rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-line pb-4">
              <h3 className="text-xl font-serif text-bone">Post Teammate Opening</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-mist hover:text-bone"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="space-y-4">
              <div>
                <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                  Project or Team Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AWS Hackathon Campus Copilot"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                    Category
                  </label>
                  <select
                    value={newType}
                    onChange={(e: any) => setNewType(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                  >
                    <option value="Hackathon">Hackathon</option>
                    <option value="Course Project">Course Project</option>
                    <option value="Research">Research</option>
                    <option value="Study Group">Study Group</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                    Course / Event
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. CS-304 or AWS Hackathon"
                    value={newCourse}
                    onChange={(e) => setNewCourse(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                  Skills You Need (comma separated)
                </label>
                <input
                  type="text"
                  placeholder="e.g. Python, UI/UX, React, FastApi"
                  value={newSkills}
                  onChange={(e) => setNewSkills(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                />
              </div>

              <div>
                <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                  Description &amp; Goals
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe your project, current progress, and what you expect from a teammate..."
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                />
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-line">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-xs text-mist hover:text-bone"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-lg"
                >
                  Publish Post
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
