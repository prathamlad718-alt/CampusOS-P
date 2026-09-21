'use client';

import React, { useState } from 'react';
import {
  MapPin,
  Navigation,
  CornerDownRight,
  Accessibility,
  Footprints,
  Compass,
  Building,
  Layers,
  Search,
  CheckCircle2
} from 'lucide-react';

interface CampusLocation {
  id: string;
  name: string;
  building: string;
  floor: string;
  wing: string;
  facilities: string[];
  steps: { instruction: string; distance: string }[];
}

const LOCATIONS: CampusLocation[] = [
  {
    id: 'r204',
    name: 'Room 204 (DBMS Lab)',
    building: 'Alan Turing Engineering Block',
    floor: '2nd Floor',
    wing: 'West Wing',
    facilities: ['Air Conditioned', '40 Linux Workstations', 'Smart Projector', 'Ramp Accessible'],
    steps: [
      { instruction: 'Start from Student Center Plaza', distance: '0m' },
      { instruction: 'Walk North toward Alan Turing Block Gate A', distance: '120m' },
      { instruction: 'Enter lobby, take Central Elevator or West Stairs to Floor 2', distance: '30m' },
      { instruction: 'Turn left down corridor past High Performance Computing Lab', distance: '25m' },
      { instruction: 'Arrive at Room 204 (Door on your right)', distance: 'Destination' }
    ]
  },
  {
    id: 'l3b',
    name: 'Lab 3B (Advanced Systems Lab)',
    building: 'Alan Turing Engineering Block',
    floor: '3rd Floor',
    wing: 'North Wing',
    facilities: ['Server Racks', 'Dual Monitor Setups', 'High-Speed LAN'],
    steps: [
      { instruction: 'Start from Student Center Plaza', distance: '0m' },
      { instruction: 'Enter Alan Turing Block Main Entrance', distance: '120m' },
      { instruction: 'Take Central Glass Elevator to Floor 3', distance: '50m' },
      { instruction: 'Follow North corridor to end of hall', distance: '40m' },
      { instruction: 'Arrive at Lab 3B', distance: 'Destination' }
    ]
  },
  {
    id: 'lh101',
    name: 'Lecture Hall 101',
    building: 'Ramanujan Mathematical Sciences Block',
    floor: 'Ground Floor',
    wing: 'Main Foyer',
    facilities: ['200 Tiered Seats', 'Acoustic Sound System', 'Wheelchair Accessible'],
    steps: [
      { instruction: 'Start from Central Clocktower Quad', distance: '0m' },
      { instruction: 'Walk East past Central Library Lawn', distance: '90m' },
      { instruction: 'Enter Ramanujan Block Ground Floor Glass Doors', distance: '15m' },
      { instruction: 'Arrive at Lecture Hall 101 on left side', distance: 'Destination' }
    ]
  },
  {
    id: 'lib',
    name: 'Central University Library (Silent Study)',
    building: 'Rabindranath Tagore Learning Complex',
    floor: '1st Floor',
    wing: 'East Wing',
    facilities: ['Silent Reading Cubicles', 'Digital Catalog Terminals', 'Wi-Fi 6'],
    steps: [
      { instruction: 'Start from North Campus Gate', distance: '0m' },
      { instruction: 'Cross Botanical Garden Promenade', distance: '180m' },
      { instruction: 'Swipe ID card at Tagore Complex Turnstile', distance: '10m' },
      { instruction: 'Arrive at Main Stacks & Reading Room', distance: 'Destination' }
    ]
  }
];

export default function NavigationPage() {
  const [selectedLocation, setSelectedLocation] = useState<CampusLocation>(LOCATIONS[0]);
  const [routeType, setRouteType] = useState<'shortest' | 'accessible'>('shortest');
  const [search, setSearch] = useState('');

  const filtered = LOCATIONS.filter(loc =>
    loc.name.toLowerCase().includes(search.toLowerCase()) ||
    loc.building.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Wayfinding OS</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Campus Navigation
          </h1>
          <p className="text-sm text-mist mt-1">
            Turn-by-turn indoor routing: Building &rarr; Floor &rarr; Wing &rarr; Room with accessibility options.
          </p>
        </div>

        <div className="flex items-center p-1 bg-surface border border-line rounded-2xl shrink-0">
          <button
            onClick={() => setRouteType('shortest')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              routeType === 'shortest' ? 'bg-tide text-white shadow-sm' : 'text-mist hover:text-bone'
            }`}
          >
            <Footprints className="w-3.5 h-3.5" /> Shortest Route
          </button>
          <button
            onClick={() => setRouteType('accessible')}
            className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
              routeType === 'accessible' ? 'bg-tide text-white shadow-sm' : 'text-mist hover:text-bone'
            }`}
          >
            <Accessibility className="w-3.5 h-3.5" /> Accessible (Elevator / Ramp)
          </button>
        </div>
      </div>

      {/* Main Layout: Selector & Map View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Search & Destination Picker */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 bg-surface border border-line rounded-2xl px-4 py-2.5">
            <Search className="w-4 h-4 text-mist" />
            <input
              type="text"
              placeholder="Search room or building..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-transparent border-none outline-none text-xs text-bone w-full placeholder:text-mist"
            />
          </div>

          <span className="text-xs font-mono uppercase tracking-widest text-mist block pt-2">
            Campus Destinations ({filtered.length})
          </span>

          <div className="space-y-2.5">
            {filtered.map(loc => {
              const isSelected = loc.id === selectedLocation.id;
              return (
                <div
                  key={loc.id}
                  onClick={() => setSelectedLocation(loc)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-tide/10 border-tide shadow-[0_0_20px_rgba(70,183,255,0.1)]'
                      : 'bg-surface border-line hover:border-line-strong'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-semibold text-bone">{loc.name}</h4>
                    <span className="text-[10px] font-mono text-tide bg-tide/20 px-2 py-0.5 rounded">
                      {loc.floor}
                    </span>
                  </div>
                  <p className="text-xs text-mist mt-1">{loc.building} &bull; {loc.wing}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right: Route View & Visual Map */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Destination Header Card */}
          <div className="glass-panel p-6 rounded-3xl border border-line-strong">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <span className="text-xs font-mono text-tide uppercase tracking-widest">Active Destination</span>
                <h3 className="text-2xl font-serif text-bone mt-0.5">{selectedLocation.name}</h3>
                <p className="text-xs text-mist font-mono mt-0.5">
                  {selectedLocation.building} &bull; {selectedLocation.floor} ({selectedLocation.wing})
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-medium">
                  Est. Walk: 3 mins (215m)
                </span>
              </div>
            </div>

            {/* Turn-by-Turn Wayfinding Steps */}
            <div className="mt-6 space-y-4">
              <span className="text-xs font-mono uppercase tracking-widest text-mist block">
                Turn-by-Turn Directions ({routeType === 'accessible' ? 'Elevator & Ramp Preferred' : 'Fast Walk'})
              </span>
              <div className="relative border-l-2 border-tide/40 ml-3 pl-6 space-y-4">
                {selectedLocation.steps.map((step, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-ink border-2 border-tide flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-tide" />
                    </div>
                    <div className="flex items-baseline justify-between gap-4">
                      <p className="text-xs font-medium text-bone leading-relaxed">
                        {step.instruction}
                      </p>
                      <span className="text-[10px] font-mono text-mist shrink-0">
                        {step.distance}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Room Features */}
            <div className="mt-6 pt-4 border-t border-line flex flex-wrap gap-2">
              {selectedLocation.facilities.map((fac, i) => (
                <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface border border-line text-mist">
                  &bull; {fac}
                </span>
              ))}
            </div>
          </div>

          {/* Interactive 2D/3D Blueprint Canvas Simulation */}
          <div className="glass-panel p-6 rounded-3xl border border-line-strong overflow-hidden relative">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono uppercase tracking-widest text-mist flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-tide" /> Digital Architectural Blueprint (Floor Level 2)
              </span>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" /> Live Navigation GPS
              </span>
            </div>

            <div className="h-64 sm:h-72 w-full rounded-2xl bg-ink/90 border border-line flex items-center justify-center relative overflow-hidden">
              {/* Floorplan grid */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(70,183,255,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(70,183,255,0.06)_1px,transparent_1px)] bg-[size:30px_30px]" />

              {/* Wayfinding nodes */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path
                  d="M 60 220 L 180 220 L 180 120 L 340 120 L 340 70"
                  fill="none"
                  stroke="#46b7ff"
                  strokeWidth="3"
                  strokeDasharray="6 4"
                  className="animate-pulse"
                />
              </svg>

              <div className="absolute left-10 bottom-8 flex items-center gap-2 bg-surface/90 border border-line px-3 py-1.5 rounded-xl text-xs text-bone shadow-md">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                <span>You: Entrance Lobby</span>
              </div>

              <div className="absolute top-10 right-1/3 flex items-center gap-2 bg-tide text-white px-3 py-1.5 rounded-xl text-xs font-bold shadow-lg animate-bounce">
                <MapPin className="w-3.5 h-3.5" />
                <span>Target: {selectedLocation.name}</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
