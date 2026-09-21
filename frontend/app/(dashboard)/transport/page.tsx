'use client';

import React, { useState } from 'react';
import {
  Bus,
  Clock,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle2,
  Navigation,
  Compass,
  Search
} from 'lucide-react';

interface BusRoute {
  id: string;
  routeNumber: string;
  routeName: string;
  busNumber: string;
  driverName: string;
  driverPhone: string;
  status: 'On-Time' | 'Delayed' | 'Departed';
  delayMinutes?: number;
  nextDeparture: string;
  currentStop: string;
  stops: { name: string; time: string; passed?: boolean }[];
}

const BUS_ROUTES: BusRoute[] = [
  {
    id: 'r1',
    routeNumber: 'Route 1',
    routeName: 'North Metro Interchange &bull; Express',
    busNumber: 'Bus #04 &bull; KA-01-EA-4102',
    driverName: 'Suresh Kumar',
    driverPhone: '+91 98450 12389',
    status: 'On-Time',
    nextDeparture: '04:30 PM (Bay 1)',
    currentStop: 'Approaching Metro Gate 2',
    stops: [
      { name: 'University Main Terminal', time: '04:30 PM' },
      { name: 'North Ring Road Junction', time: '04:45 PM' },
      { name: 'City Science Centre', time: '05:00 PM' },
      { name: 'North Metro Terminal Interchange', time: '05:20 PM' }
    ]
  },
  {
    id: 'r2',
    routeNumber: 'Route 2',
    routeName: 'Central Railway Station &bull; Downtown',
    busNumber: 'Bus #08 &bull; KA-01-EA-8841',
    driverName: 'Mohan Lal',
    driverPhone: '+91 98450 44521',
    status: 'Delayed',
    delayMinutes: 12,
    nextDeparture: '04:45 PM (Delayed 12m)',
    currentStop: 'Traffic halt at MG Road flyover',
    stops: [
      { name: 'University Main Terminal', time: '04:45 PM' },
      { name: 'Civil Lines Crossing', time: '05:05 PM' },
      { name: 'Old City Town Hall', time: '05:25 PM' },
      { name: 'Central Railway Junction', time: '05:45 PM' }
    ]
  },
  {
    id: 'r3',
    routeNumber: 'Route 3',
    routeName: 'Off-Campus Student Housing & Hostels',
    busNumber: 'Bus #12 &bull; KA-01-EA-2209',
    driverName: 'Ramesh Gowda',
    driverPhone: '+91 98450 99103',
    status: 'On-Time',
    nextDeparture: 'Every 20 mins',
    currentStop: 'At West Hostel Terminal',
    stops: [
      { name: 'University Sports Complex', time: 'Every 20m' },
      { name: 'East Hostel Block A/B', time: '+5 mins' },
      { name: 'North Off-Campus Apartment Zone', time: '+12 mins' },
      { name: 'Main Campus Quad', time: '+20 mins' }
    ]
  }
];

export default function TransportPage() {
  const [selectedRoute, setSelectedRoute] = useState<BusRoute>(BUS_ROUTES[0]);

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Mobility OS</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Campus Transit &amp; Bus Fleet
          </h1>
          <p className="text-sm text-mist mt-1">
            Live bus schedules, route stops, driver contact lines, and delay telemetry.
          </p>
        </div>

        <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface border border-line text-xs font-mono text-mist">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          Active Fleet: 18 Buses Running
        </div>
      </div>

      {/* Delay Advisory Banner */}
      <div className="bg-gradient-to-r from-amber-500/10 via-surface to-surface border border-amber-500/30 rounded-2xl p-4 flex items-center gap-3.5">
        <div className="p-2 rounded-xl bg-amber-500/20 text-amber-400 shrink-0">
          <AlertTriangle className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs font-mono text-amber-400 uppercase font-bold tracking-wider">
            Transit Advisory &bull; Peak Hours
          </span>
          <p className="text-xs text-bone font-medium mt-0.5">
            Heavy municipal road repairs on Flyover 2. Route #2 buses are running approximately 10–15 minutes behind schedule.
          </p>
        </div>
      </div>

      {/* Main Grid: Routes List vs Selected Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Routes List */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-mist block">
            Scheduled Bus Routes
          </span>

          <div className="space-y-3">
            {BUS_ROUTES.map(route => {
              const isSelected = route.id === selectedRoute.id;
              const isDelayed = route.status === 'Delayed';

              return (
                <div
                  key={route.id}
                  onClick={() => setSelectedRoute(route)}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-tide/10 border-tide shadow-[0_0_20px_rgba(70,183,255,0.1)]'
                      : 'bg-surface border-line hover:border-line-strong'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-mono font-bold text-tide">
                      {route.routeNumber}
                    </span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                      isDelayed
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                    }`}>
                      {route.status} {isDelayed ? `(+${route.delayMinutes}m)` : ''}
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-bone" dangerouslySetInnerHTML={{ __html: route.routeName }} />
                  <p className="text-xs font-mono text-mist mt-1">{route.busNumber}</p>

                  <div className="mt-3 pt-3 border-t border-line/60 flex items-center justify-between text-xs text-mist">
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-tide" /> {route.nextDeparture}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right: Route Details & Stops Timeline */}
        <div className="lg:col-span-2 glass-panel p-6 sm:p-8 rounded-3xl border border-line-strong space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-xs font-mono font-bold text-tide uppercase tracking-wider">{selectedRoute.routeNumber}</span>
                <span className="text-xs font-mono text-mist">&bull; {selectedRoute.busNumber}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif text-bone" dangerouslySetInnerHTML={{ __html: selectedRoute.routeName }} />
            </div>

            <div className="flex items-center gap-3">
              <a
                href={`tel:${selectedRoute.driverPhone}`}
                className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-surface hover:bg-surface-raised border border-line text-xs font-medium text-bone transition-colors"
              >
                <Phone className="w-3.5 h-3.5 text-tide" />
                <span>Call Driver ({selectedRoute.driverName})</span>
              </a>
            </div>
          </div>

          {/* Current Status Box */}
          <div className="p-4 rounded-2xl bg-surface border border-line flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-tide/10 text-tide">
                <Bus className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[10px] font-mono uppercase tracking-widest text-mist block">Live Fleet Telemetry</span>
                <span className="text-sm font-semibold text-bone">{selectedRoute.currentStop}</span>
              </div>
            </div>
            <span className="text-xs font-mono text-tide font-medium">
              GPS Signal: Strong
            </span>
          </div>

          {/* Route Stops Sequence */}
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-mist block mb-4">
              Designated Stops &amp; Estimated Schedule
            </span>

            <div className="relative border-l-2 border-line ml-4 pl-6 space-y-6">
              {selectedRoute.stops.map((stop, index) => (
                <div key={index} className="relative group">
                  <div className="absolute -left-[31px] top-1 w-4 h-4 rounded-full bg-ink border-2 border-tide flex items-center justify-center">
                    <div className="w-1.5 h-1.5 rounded-full bg-tide" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-bone">{stop.name}</h4>
                      <span className="text-[11px] font-mono text-mist">Stop #{index + 1}</span>
                    </div>
                    <span className="text-xs font-mono font-bold text-bone">
                      {stop.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
