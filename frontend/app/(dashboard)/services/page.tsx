'use client';

import React, { useState } from 'react';
import {
  LifeBuoy,
  BookOpen,
  HeartPulse,
  Shield,
  Utensils,
  Printer,
  Home,
  Wrench,
  Search,
  Phone,
  Clock,
  MapPin,
  ArrowUpRight,
  HelpCircle
} from 'lucide-react';
import Link from 'next/link';

interface CampusService {
  id: string;
  category: 'health' | 'library' | 'security' | 'dining' | 'print' | 'housing';
  name: string;
  location: string;
  hours: string;
  contact: string;
  description: string;
  actionText: string;
  actionUrl: string;
  badge: string;
}

const SERVICES: CampusService[] = [
  {
    id: 's1',
    category: 'health',
    name: 'University Health Centre & Emergency Dispensary',
    location: 'Ground Floor, Student Welfare Pavilion',
    hours: '24/7 Emergency Support &bull; OPD: 9 AM – 6 PM',
    contact: '+91 (0) 80-2345-0911',
    description: 'General physician consultations, first aid, emergency medicine, psychological counseling services, and on-campus ambulance dispatch.',
    actionText: 'Emergency Call Line',
    actionUrl: 'tel:+918023450911',
    badge: 'Medical Room'
  },
  {
    id: 's2',
    category: 'security',
    name: 'Campus Security & Lost and Found Office',
    location: 'Main Campus Security Gatehouse',
    hours: '24 Hours Daily',
    contact: '+91 (0) 80-2345-0999',
    description: 'Campus surveillance, safety escorts, lost ID card reissuance, visitor vehicle passes, and centralized lost-and-found repository.',
    actionText: 'Report Lost Item',
    actionUrl: '/issues?category=security',
    badge: 'Security Desk'
  },
  {
    id: 's3',
    category: 'library',
    name: 'Central University Library & Digital Repository',
    location: 'Rabindranath Tagore Learning Complex',
    hours: 'Open 08:00 AM – 11:00 PM (Reading Room 24/7)',
    contact: 'library@campusos.edu',
    description: 'Over 120,000 physical volumes, IEEE Xplore & ACM digital subscriptions, high-speed Wi-Fi silent study pods, and research thesis archives.',
    actionText: 'Open Library Catalog',
    actionUrl: '/drive?category=Library',
    badge: 'Academic Resource'
  },
  {
    id: 's4',
    category: 'dining',
    name: 'Campus Central Dining Hall & Food Court',
    location: 'Student Activity Centre 1st Floor',
    hours: 'Breakfast: 7:30-9:30 | Lunch: 12:30-2:30 | Dinner: 7:30-9:30',
    contact: 'cafeteria@campusos.edu',
    description: 'Subsidized multi-cuisine student dining hall, daily rotated nutritious meal plans, live crowd occupancy tracker, and hygienic coffee bar.',
    actionText: 'View Today&apos;s Menu',
    actionUrl: '#',
    badge: 'Dining & Food'
  },
  {
    id: 's5',
    category: 'print',
    name: 'Reprographic Printing & 3D Fabrication Lab',
    location: 'Alan Turing Engineering Block, Lower Ground Floor',
    hours: '08:30 AM – 07:00 PM (Mon – Sat)',
    contact: 'printlab@campusos.edu',
    description: 'High-speed color printing, bound thesis binding, large poster plotting, and rapid 3D prototyping print queues for engineering projects.',
    actionText: 'Upload Print Job',
    actionUrl: '/drive',
    badge: 'Printing Lab'
  },
  {
    id: 's6',
    category: 'housing',
    name: 'Hostel Administration & Estate Office',
    location: 'Administration Block C, Room 102',
    hours: '09:30 AM – 05:30 PM (Mon – Fri)',
    contact: 'hostels@campusos.edu',
    description: 'Hostel room allocations, maintenance work tickets, night leave passes, laundry service complaints, and campus guest house booking.',
    actionText: 'Hostel Services Desk',
    actionUrl: '/issues?category=hostel',
    badge: 'Student Housing'
  }
];

export default function ServicesPage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filtered = SERVICES.filter(s => {
    const matchesCat = selectedCategory === 'all' || s.category === selectedCategory;
    const matchesSearch = !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.badge.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Facilities OS</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Centralized Campus Services
          </h1>
          <p className="text-sm text-mist mt-1">
            &ldquo;I need something on campus.&rdquo; Find exact locations, operational hours, emergency lines, and service desks.
          </p>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-surface border border-line rounded-2xl px-4 py-3 max-w-lg shadow-sm">
        <Search className="w-4 h-4 text-mist" />
        <input
          type="text"
          placeholder="What service do you need? (e.g. Medical, Security, Printing, Food)..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-xs text-bone w-full placeholder:text-mist"
        />
      </div>

      {/* Category Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 text-xs">
        {[
          { id: 'all', label: 'All Services' },
          { id: 'health', label: 'Medical & Health' },
          { id: 'security', label: 'Security & Lost' },
          { id: 'library', label: 'Library' },
          { id: 'dining', label: 'Cafeteria & Dining' },
          { id: 'print', label: 'Printing & 3D Lab' },
          { id: 'housing', label: 'Hostel & Housing' }
        ].map(cat => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-full whitespace-nowrap font-medium transition-colors ${
              selectedCategory === cat.id
                ? 'bg-tide text-white font-semibold shadow-sm'
                : 'bg-surface border border-line text-mist hover:text-bone'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filtered.map(service => (
          <div
            key={service.id}
            className="glass-panel p-6 sm:p-7 rounded-3xl border border-line hover:border-line-strong transition-all flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-0.5 rounded-full font-semibold bg-surface border border-line text-tide">
                  {service.badge}
                </span>
              </div>

              <h3 className="text-xl font-serif text-bone mt-1">
                {service.name}
              </h3>

              <div className="my-4 space-y-1.5 text-xs text-mist bg-surface/50 border border-line/60 rounded-2xl p-3.5">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-tide shrink-0" />
                  <span className="text-bone">{service.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-tide shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: service.hours }} />
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-tide shrink-0" />
                  <span className="font-mono text-bone">{service.contact}</span>
                </div>
              </div>

              <p className="text-xs text-bone/85 leading-relaxed">
                {service.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-line flex items-center justify-between">
              <Link
                href={`/navigation?destination=${encodeURIComponent(service.location)}`}
                className="text-xs text-mist hover:text-tide flex items-center gap-1 transition-colors"
              >
                <MapPin className="w-3.5 h-3.5" /> Navigate to Desk
              </Link>

              <a
                href={service.actionUrl}
                className="flex items-center gap-1 px-4 py-2 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-md shadow-tide/20 cursor-pointer"
              >
                <span dangerouslySetInnerHTML={{ __html: service.actionText }} />
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
