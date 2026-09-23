'use client';

import React, { useState } from 'react';
import {
  Armchair,
  Building,
  Calendar,
  Clock,
  CheckCircle2,
  Users,
  Search,
  BookOpen,
  Monitor,
  Mic,
  GraduationCap,
  Sparkles,
  QrCode,
  X,
  AlertCircle,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';
import { useAuth } from '@campus-os/shared/auth-provider';

interface Venue {
  id: string;
  name: string;
  type: 'library' | 'lab' | 'lecture' | 'seminar';
  building: string;
  totalSeats: number;
  availableSeats: number;
  features: string[];
  imageDesc: string;
  allowWholeRoomBooking: boolean;
  timeSlots: string[];
}

const VENUES: Venue[] = [
  {
    id: 'v_lib_quiet',
    name: 'Central Library Silent Study Pods',
    type: 'library',
    building: 'Tagore Complex, 2nd Floor (East Wing)',
    totalSeats: 32,
    availableSeats: 14,
    features: ['Noise-cancelling partitions', 'Universal Power Socket', 'Wi-Fi 6 Dedicated', 'Desk Lamp'],
    imageDesc: 'Silent individual cubicles with ergonomic seating',
    allowWholeRoomBooking: false,
    timeSlots: ['09:00 AM – 11:00 AM', '11:00 AM – 01:00 PM', '02:00 PM – 04:00 PM', '04:00 PM – 07:00 PM']
  },
  {
    id: 'v_lab_204',
    name: 'Lab 204: Systems & Database Workstations',
    type: 'lab',
    building: 'Alan Turing Engineering Block, 2nd Floor',
    totalSeats: 40,
    availableSeats: 19,
    features: ['Linux Workstations', 'Dual Monitors', 'SQL & Docker Pre-installed', 'Gigabit Ethernet'],
    imageDesc: 'High-speed computing lab with workstation clusters',
    allowWholeRoomBooking: true,
    timeSlots: ['09:00 AM – 11:00 AM', '11:30 AM – 01:30 PM', '02:00 PM – 04:00 PM', '04:30 PM – 06:30 PM']
  },
  {
    id: 'v_lh_101',
    name: 'Lecture Hall 101: Tiered Amphitheatre',
    type: 'lecture',
    building: 'Ramanujan Mathematical Sciences Block',
    totalSeats: 120,
    availableSeats: 48,
    features: ['Acoustic sound system', 'Dual 4K Projectors', 'Recording Camera', 'Microphone Podium'],
    imageDesc: 'Tiered university auditorium with desk outlets',
    allowWholeRoomBooking: true,
    timeSlots: ['08:30 AM – 10:00 AM', '10:30 AM – 12:00 PM', '01:00 PM – 02:30 PM', '03:00 PM – 05:00 PM']
  },
  {
    id: 'v_sem_aud',
    name: 'Vivekananda Central Seminar Hall',
    type: 'seminar',
    building: 'Student Activity Centre, 3rd Floor',
    totalSeats: 250,
    availableSeats: 110,
    features: ['Stage & Stage Lighting', 'Surround PA System', 'Live Streaming Setup', 'VIP Front Rows'],
    imageDesc: 'Conference & symposium hall for campus-wide keynotes',
    allowWholeRoomBooking: true,
    timeSlots: ['10:00 AM – 01:00 PM', '02:00 PM – 05:00 PM', '05:30 PM – 08:30 PM']
  }
];

interface BookingPass {
  id: string;
  venueName: string;
  type: 'Single Seat' | 'Whole Facility';
  seatNumber?: string;
  date: string;
  timeSlot: string;
  purpose?: string;
  bookedBy: string;
  role: string;
}

export default function BookingPage() {
  const { user } = useAuth();
  const isTeacherOrAdmin = user?.isSuperAdmin || user?.role === 'admin' || user?.role === 'faculty';

  const [bookingMode, setBookingMode] = useState<'seat' | 'whole'>('seat');
  const [selectedVenue, setSelectedVenue] = useState<Venue>(VENUES[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>(VENUES[0].timeSlots[0]);
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);
  
  // Teacher Whole Room Form
  const [wholeRoomPurpose, setWholeRoomPurpose] = useState('');
  const [expectedStudents, setExpectedStudents] = useState(60);

  // Active Passes
  const [activePasses, setActivePasses] = useState<BookingPass[]>([
    {
      id: 'pass_1',
      venueName: 'Lab 204: Systems & Database Workstations',
      type: 'Single Seat',
      seatNumber: 'Seat D-14',
      date: 'Today, Sep 23',
      timeSlot: '02:00 PM – 04:00 PM',
      bookedBy: user?.name || 'Verified User',
      role: user?.role || 'Student'
    }
  ]);

  const [showConfirmation, setShowConfirmation] = useState<BookingPass | null>(null);

  // Simulated 32 Seat Layout for visual picker
  const generateSeatGrid = () => {
    const rows = ['A', 'B', 'C', 'D'];
    const cols = [1, 2, 3, 4, 5, 6, 7, 8];
    const occupiedSeats = ['A-2', 'A-3', 'B-1', 'B-6', 'C-4', 'C-5', 'D-2', 'D-7'];

    return rows.map(r => 
      cols.map(c => {
        const seatId = `${r}-${c}`;
        const isOccupied = occupiedSeats.includes(seatId);
        return {
          id: seatId,
          occupied: isOccupied
        };
      })
    );
  };

  const seatGrid = generateSeatGrid();

  const handleConfirmSeatBooking = () => {
    if (!selectedSeat) return;

    const newPass: BookingPass = {
      id: 'pass_' + Date.now(),
      venueName: selectedVenue.name,
      type: 'Single Seat',
      seatNumber: selectedSeat,
      date: 'Today, Sep 23',
      timeSlot: selectedSlot,
      bookedBy: user?.name || 'Campus Member',
      role: user?.isSuperAdmin ? 'Admin' : user?.role || 'Student'
    };

    setActivePasses([newPass, ...activePasses]);
    setShowConfirmation(newPass);
    setSelectedSeat(null);
  };

  const handleConfirmWholeRoomBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!wholeRoomPurpose.trim()) return;

    const newPass: BookingPass = {
      id: 'pass_' + Date.now(),
      venueName: selectedVenue.name,
      type: 'Whole Facility',
      date: 'Today, Sep 23',
      timeSlot: selectedSlot,
      purpose: wholeRoomPurpose,
      bookedBy: user?.name || 'Prof. Rajesh Sharma',
      role: user?.isSuperAdmin ? 'Administrator' : 'Faculty Member'
    };

    setActivePasses([newPass, ...activePasses]);
    setShowConfirmation(newPass);
    setWholeRoomPurpose('');
  };

  const handleCancelPass = (id: string) => {
    setActivePasses(prev => prev.filter(p => p.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-tide">Smart Campus Spaces</span>
            <span className="text-xs font-mono text-mist">&bull; Instant Access Passes</span>
          </div>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Seat &amp; Space Reservation
          </h1>
          <p className="text-sm text-mist mt-1">
            Book specific seats in libraries, labs, and lecture halls — or reserve entire halls for faculty instruction.
          </p>
        </div>

        {/* Role Capability Badge & Mode Switcher */}
        <div className="flex items-center gap-3">
          {isTeacherOrAdmin && (
            <div className="flex items-center p-1 bg-surface border border-line rounded-2xl">
              <button
                onClick={() => setBookingMode('seat')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  bookingMode === 'seat'
                    ? 'bg-tide text-white shadow-sm font-semibold'
                    : 'text-mist hover:text-bone'
                }`}
              >
                <Armchair className="w-3.5 h-3.5" /> Book a Seat
              </button>
              <button
                onClick={() => setBookingMode('whole')}
                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  bookingMode === 'whole'
                    ? 'bg-purple-600 text-white shadow-sm font-semibold'
                    : 'text-mist hover:text-bone'
                }`}
              >
                <GraduationCap className="w-3.5 h-3.5" /> Reserve Entire Hall (Faculty)
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-ink/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="w-full max-w-md bg-ink-2 border border-line-strong rounded-3xl p-6 sm:p-8 shadow-2xl text-center relative">
            <button
              onClick={() => setShowConfirmation(null)}
              className="absolute top-4 right-4 text-mist hover:text-bone"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7" />
            </div>

            <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold bg-emerald-400/10 px-2.5 py-0.5 rounded-full">
              Reservation Confirmed
            </span>

            <h3 className="text-xl font-serif text-bone mt-2">
              {showConfirmation.venueName}
            </h3>

            <div className="my-5 p-4 rounded-2xl bg-surface border border-line text-xs space-y-2 text-left">
              <div className="flex justify-between">
                <span className="text-mist">Reservation Type:</span>
                <span className="text-bone font-medium">{showConfirmation.type}</span>
              </div>
              {showConfirmation.seatNumber && (
                <div className="flex justify-between">
                  <span className="text-mist">Reserved Seat:</span>
                  <span className="text-tide font-mono font-bold">{showConfirmation.seatNumber}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-mist">Time Slot:</span>
                <span className="text-bone font-mono">{showConfirmation.timeSlot}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-mist">Holder:</span>
                <span className="text-bone">{showConfirmation.bookedBy} ({showConfirmation.role})</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-ink border border-line flex items-center justify-center gap-3 text-xs text-mist font-mono">
              <QrCode className="w-8 h-8 text-tide" />
              <span>Digital Gate QR generated &bull; Present at door scanner</span>
            </div>

            <button
              onClick={() => setShowConfirmation(null)}
              className="w-full mt-6 py-2.5 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-lg"
            >
              Done &bull; View Active Passes
            </button>
          </div>
        </div>
      )}

      {/* Active Passes Ribbon */}
      {activePasses.length > 0 && (
        <div className="glass-panel p-5 rounded-3xl border border-line">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-mono uppercase tracking-widest text-mist flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-tide" /> Your Active Campus Passes ({activePasses.length})
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {activePasses.map(pass => (
              <div
                key={pass.id}
                className="p-4 rounded-2xl bg-surface border border-line flex items-center justify-between gap-3"
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-tide/10 text-tide font-bold">
                      {pass.type === 'Whole Facility' ? '🏛️ Whole Room' : `💺 ${pass.seatNumber}`}
                    </span>
                    <span className="text-xs font-mono text-mist">{pass.timeSlot}</span>
                  </div>
                  <h4 className="text-sm font-semibold text-bone mt-1 truncate">
                    {pass.venueName}
                  </h4>
                  <p className="text-[11px] text-mist font-mono mt-0.5">
                    {pass.date} &bull; {pass.bookedBy}
                  </p>
                </div>

                <button
                  onClick={() => handleCancelPass(pass.id)}
                  className="text-xs text-rose-400 hover:text-rose-300 font-mono px-3 py-1.5 rounded-xl hover:bg-rose-500/10 transition-colors shrink-0"
                >
                  Cancel
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Main Layout: Venue Picker & Reservation Deck */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left: Venue List */}
        <div className="space-y-4">
          <span className="text-xs font-mono uppercase tracking-widest text-mist block">
            Select Facility or Venue
          </span>

          <div className="space-y-3">
            {VENUES.map(venue => {
              const isSelected = venue.id === selectedVenue.id;

              return (
                <div
                  key={venue.id}
                  onClick={() => {
                    setSelectedVenue(venue);
                    setSelectedSlot(venue.timeSlots[0]);
                    setSelectedSeat(null);
                  }}
                  className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-tide/10 border-tide shadow-[0_0_20px_rgba(70,183,255,0.1)]'
                      : 'bg-surface border-line hover:border-line-strong'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold border ${
                      venue.type === 'library'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : venue.type === 'lab'
                        ? 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                        : venue.type === 'lecture'
                        ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                        : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                    }`}>
                      {venue.type.toUpperCase()}
                    </span>

                    <span className="text-xs font-mono text-emerald-400">
                      {venue.availableSeats} Available
                    </span>
                  </div>

                  <h4 className="text-sm font-semibold text-bone">
                    {venue.name}
                  </h4>
                  <p className="text-xs text-mist mt-1">
                    {venue.building}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Center/Right: Interactive Booking View */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Active Facility Header */}
          <div className="glass-panel p-6 sm:p-7 rounded-3xl border border-line-strong">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-4">
              <div>
                <span className="text-xs font-mono text-tide uppercase tracking-widest">Active Facility</span>
                <h3 className="text-2xl font-serif text-bone mt-0.5">
                  {selectedVenue.name}
                </h3>
                <p className="text-xs text-mist font-mono mt-0.5">
                  {selectedVenue.building} &bull; Capacity: {selectedVenue.totalSeats}
                </p>
              </div>

              {/* Time Slot Picker */}
              <div>
                <label className="text-[10px] font-mono text-mist uppercase tracking-widest block mb-1">
                  Available Slots
                </label>
                <select
                  value={selectedSlot}
                  onChange={(e) => setSelectedSlot(e.target.value)}
                  className="px-3 py-1.5 rounded-xl bg-surface border border-line text-bone text-xs font-mono outline-none focus:border-tide"
                >
                  {selectedVenue.timeSlots.map(slot => (
                    <option key={slot} value={slot}>{slot}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Venue Features */}
            <div className="flex flex-wrap gap-2 mt-4">
              {selectedVenue.features.map((feat, i) => (
                <span key={i} className="text-[11px] font-mono px-2.5 py-1 rounded-lg bg-surface border border-line text-mist">
                  &bull; {feat}
                </span>
              ))}
            </div>

            {/* ================= MODE 1: SEAT MAP PICKER (STUDENTS & TEACHERS) ================= */}
            {bookingMode === 'seat' ? (
              <div className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h4 className="text-sm font-semibold text-bone flex items-center gap-2">
                      <Armchair className="w-4 h-4 text-tide" /> Interactive Seat &amp; Desk Map
                    </h4>
                    <p className="text-xs text-mist mt-0.5">
                      Click any available seat to select your desk for {selectedSlot}.
                    </p>
                  </div>

                  {/* Legend */}
                  <div className="flex items-center gap-3 text-[10px] font-mono text-mist">
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-surface border border-line" /> Available
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-tide" /> Selected
                    </span>
                    <span className="flex items-center gap-1">
                      <span className="w-2.5 h-2.5 rounded bg-rose-500/30 border border-rose-500/50" /> Occupied
                    </span>
                  </div>
                </div>

                {/* Simulated Front of Room / Screen Indicator */}
                <div className="w-full py-1.5 rounded-lg bg-surface/50 border border-line text-center text-[10px] font-mono text-mist uppercase tracking-widest mb-6">
                  ▲ Front Stage / Digital Projector Screen ▲
                </div>

                {/* Seat Matrix */}
                <div className="space-y-3">
                  {seatGrid.map((row, rIdx) => (
                    <div key={rIdx} className="flex items-center justify-center gap-2.5 sm:gap-3">
                      <span className="w-4 text-xs font-mono text-mist font-bold text-center">
                        {String.fromCharCode(65 + rIdx)}
                      </span>
                      {row.map(seat => {
                        const isSelected = selectedSeat === seat.id;
                        return (
                          <button
                            key={seat.id}
                            disabled={seat.occupied}
                            onClick={() => setSelectedSeat(seat.id)}
                            className={`w-8 h-8 sm:w-9 sm:h-9 rounded-xl flex items-center justify-center text-xs font-mono transition-all ${
                              seat.occupied
                                ? 'bg-ink border border-line text-mist/40 cursor-not-allowed opacity-50'
                                : isSelected
                                ? 'bg-tide text-white font-bold shadow-md scale-110 border-2 border-white'
                                : 'bg-surface hover:bg-surface-raised border border-line text-bone hover:border-tide'
                            }`}
                          >
                            {seat.id.split('-')[1]}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>

                {/* Seat Confirmation CTA */}
                <div className="mt-8 pt-5 border-t border-line flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="text-xs">
                    {selectedSeat ? (
                      <span className="text-bone font-medium">
                        Selected: <span className="font-mono text-tide font-bold">Seat {selectedSeat}</span> ({selectedSlot})
                      </span>
                    ) : (
                      <span className="text-mist">Please select an available desk or workstation from the grid above.</span>
                    )}
                  </div>

                  <button
                    disabled={!selectedSeat}
                    onClick={handleConfirmSeatBooking}
                    className={`px-6 py-2.5 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                      selectedSeat
                        ? 'bg-tide hover:bg-tide/90 text-white shadow-lg shadow-tide/20 font-semibold'
                        : 'bg-surface text-mist border border-line cursor-not-allowed'
                    }`}
                  >
                    Confirm Seat Reservation &rarr;
                  </button>
                </div>
              </div>
            ) : (
              /* ================= MODE 2: WHOLE ROOM RESERVATION (FACULTY ONLY) ================= */
              <div className="mt-8 space-y-6">
                <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 flex items-start gap-3">
                  <GraduationCap className="w-5 h-5 text-purple-400 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-semibold text-purple-300 uppercase tracking-wider font-mono">
                      Faculty Facility Reservation Authority
                    </h4>
                    <p className="text-xs text-bone/90 mt-0.5">
                      You are reserving the entire space ({selectedVenue.totalSeats} total capacity) for academic lectures, departmental practicals, or symposiums.
                    </p>
                  </div>
                </div>

                <form onSubmit={handleConfirmWholeRoomBooking} className="space-y-4">
                  <div>
                    <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                      Reason / Academic Purpose
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. CS-302 Makeup Lab Exam / IEEE Autonomous Robotics Workshop"
                      value={wholeRoomPurpose}
                      onChange={(e) => setWholeRoomPurpose(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                        Expected Headcount
                      </label>
                      <input
                        type="number"
                        min={1}
                        max={selectedVenue.totalSeats}
                        value={expectedStudents}
                        onChange={(e) => setExpectedStudents(parseInt(e.target.value))}
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide font-mono"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-mono text-mist uppercase tracking-wider block mb-1">
                        Equipment Setup
                      </label>
                      <input
                        type="text"
                        defaultValue="Podium Mic + Dual 4K Projectors"
                        className="w-full px-4 py-2.5 rounded-xl bg-surface border border-line text-bone text-xs outline-none focus:border-tide"
                      />
                    </div>
                  </div>

                  <div className="pt-4 flex justify-end gap-3 border-t border-line">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold transition-colors shadow-lg shadow-purple-600/20"
                    >
                      Issue Whole-Facility Faculty Pass &rarr;
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}
