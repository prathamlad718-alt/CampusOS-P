'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Bell,
  CheckCircle2,
  AlertTriangle,
  Clock,
  BookOpen,
  FileText,
  Bus,
  Wrench,
  ShieldAlert,
  Armchair,
  Check,
  Trash2,
  Filter,
  ArrowRight,
  ExternalLink,
  Sparkles,
  ChevronRight
} from 'lucide-react';
import { INITIAL_NOTIFICATIONS, NotificationItem } from '@/lib/communication-data';

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [activeFilter, setActiveFilter] = useState<'all' | 'unread' | 'attendance' | 'academic' | 'assignment' | 'logistics'>('all');

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleMarkAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleToggleRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: !n.read } : n))
    );
  };

  const handleDismiss = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearRead = () => {
    setNotifications(prev => prev.filter(n => !n.read));
  };

  const filteredNotifications = notifications.filter(n => {
    if (activeFilter === 'unread') return !n.read;
    if (activeFilter === 'attendance') return n.category === 'attendance';
    if (activeFilter === 'academic') return n.category === 'academic';
    if (activeFilter === 'assignment') return n.category === 'assignment';
    if (activeFilter === 'logistics') return n.category === 'booking' || n.category === 'transport' || n.category === 'maintenance';
    return true;
  });

  const getCategoryIcon = (category: NotificationItem['category']) => {
    switch (category) {
      case 'attendance':
        return <AlertTriangle className="w-4 h-4 text-rose-400" />;
      case 'assignment':
        return <FileText className="w-4 h-4 text-amber-400" />;
      case 'academic':
        return <BookOpen className="w-4 h-4 text-tide" />;
      case 'booking':
        return <Armchair className="w-4 h-4 text-cyan-300" />;
      case 'transport':
        return <Bus className="w-4 h-4 text-tide" />;
      case 'maintenance':
        return <Wrench className="w-4 h-4 text-emerald-400" />;
      case 'system':
        return <ShieldAlert className="w-4 h-4 text-purple-400" />;
    }
  };

  const getPriorityBadge = (priority: NotificationItem['priority']) => {
    switch (priority) {
      case 'urgent':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-rose-500/20 text-rose-400 border border-rose-500/40 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            URGENT ACTION
          </span>
        );
      case 'high':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/15 text-amber-400 border border-amber-500/30">
            HIGH PRIORITY
          </span>
        );
      case 'normal':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-tide/15 text-tide border border-tide/30">
            NORMAL
          </span>
        );
      case 'low':
        return (
          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-surface text-mist border border-line">
            INFO
          </span>
        );
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 pt-2 pb-16">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-widest text-tide">Actionable Alert Center</span>
            <span className="text-xs font-mono text-mist">&bull; Real-time Event Stream</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif text-bone mt-1 flex items-center gap-3">
            <span>Notifications</span>
            {unreadCount > 0 && (
              <span className="px-3 py-0.5 rounded-full text-xs font-mono bg-tide/20 text-tide border border-tide/40">
                {unreadCount} Unread
              </span>
            )}
          </h1>
          <p className="text-sm text-mist max-w-2xl mt-1">
            Centralized institutional alerts with direct contextual actions for attendance criteria, submission deadlines, grade releases, and fleet updates.
          </p>
        </div>

        {/* Global Action Buttons */}
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-line hover:border-tide/40 text-bone text-xs font-mono transition-colors cursor-pointer"
            >
              <Check className="w-3.5 h-3.5 text-tide" />
              <span>Mark All Read</span>
            </button>
          )}

          <button
            onClick={handleClearRead}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-surface border border-line hover:bg-surface/80 text-mist hover:text-bone text-xs font-mono transition-colors cursor-pointer"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Clear Read</span>
          </button>
        </div>
      </div>

      {/* Filter Chips Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        {[
          { id: 'all', label: `All Alerts (${notifications.length})` },
          { id: 'unread', label: `Unread (${unreadCount})` },
          { id: 'attendance', label: 'Attendance Drops' },
          { id: 'academic', label: 'Academic & Grades' },
          { id: 'assignment', label: 'Coursework Due' },
          { id: 'logistics', label: 'Transit & Facilities' }
        ].map(filter => (
          <button
            key={filter.id}
            onClick={() => setActiveFilter(filter.id as any)}
            className={`px-3.5 py-2 rounded-xl text-xs font-mono whitespace-nowrap transition-all cursor-pointer ${
              activeFilter === filter.id
                ? 'bg-tide text-ink font-semibold shadow-lg shadow-tide/20'
                : 'bg-surface/50 hover:bg-surface text-mist hover:text-bone border border-line'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Notification Stream */}
      <div className="space-y-4">
        {filteredNotifications.length === 0 ? (
          <div className="glass-panel p-12 rounded-3xl border border-line text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
            <h3 className="text-lg font-serif text-bone">All Caught Up!</h3>
            <p className="text-xs text-mist font-mono max-w-sm mx-auto">
              No active alerts matching this filter. You have resolved all pending academic and campus notifications.
            </p>
          </div>
        ) : (
          filteredNotifications.map(notif => {
            const isUnread = !notif.read;

            return (
              <div
                key={notif.id}
                className={`glass-panel p-5 sm:p-6 rounded-2xl border transition-all duration-300 relative overflow-hidden ${
                  isUnread
                    ? notif.priority === 'urgent'
                      ? 'border-rose-500/50 bg-rose-500/5 ring-1 ring-rose-500/30 shadow-lg shadow-rose-500/5'
                      : 'border-tide/40 bg-surface/40 shadow-lg shadow-tide/5'
                    : 'border-line/70 bg-surface/20 opacity-80 hover:opacity-100'
                }`}
              >
                {/* Unread Left Border Highlight */}
                {isUnread && (
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1 ${
                      notif.priority === 'urgent' ? 'bg-rose-500' : 'bg-tide'
                    }`}
                  />
                )}

                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  {/* Left: Icon & Content */}
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-xl bg-ink/70 border border-line flex items-center justify-center flex-shrink-0 mt-0.5">
                      {getCategoryIcon(notif.category)}
                    </div>

                    <div className="space-y-1.5 max-w-2xl">
                      <div className="flex flex-wrap items-center gap-2">
                        {getPriorityBadge(notif.priority)}
                        {notif.sender && (
                          <span className="text-[11px] font-mono text-mist">
                            &bull; {notif.sender}
                          </span>
                        )}
                        <span className="text-[11px] font-mono text-mist/60">&bull; {notif.timestamp}</span>
                      </div>

                      <h3 className={`text-base font-serif font-medium ${isUnread ? 'text-bone' : 'text-mist'}`}>
                        {notif.title}
                      </h3>

                      <p className="text-xs text-mist leading-relaxed">
                        {notif.message}
                      </p>

                      {/* 1-Click Action Button */}
                      <div className="pt-3">
                        <Link
                          href={notif.actionUrl}
                          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-mono font-bold transition-all shadow-md ${
                            notif.priority === 'urgent'
                              ? 'bg-rose-500 hover:bg-rose-600 text-white shadow-rose-500/20'
                              : 'bg-tide hover:bg-cyan-300 text-ink shadow-tide/20'
                          }`}
                        >
                          <span>{notif.actionLabel}</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>

                  {/* Right: Controls */}
                  <div className="flex items-center sm:flex-col items-end gap-2 border-t sm:border-t-0 border-line/60 pt-3 sm:pt-0">
                    <button
                      onClick={() => handleToggleRead(notif.id)}
                      className="text-xs font-mono text-mist hover:text-bone transition-colors"
                      title={isUnread ? 'Mark as read' : 'Mark as unread'}
                    >
                      {isUnread ? 'Mark Read' : 'Unread'}
                    </button>
                    <button
                      onClick={() => handleDismiss(notif.id)}
                      className="text-xs font-mono text-mist/60 hover:text-rose-400 transition-colors"
                      title="Dismiss alert"
                    >
                      Dismiss
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
