'use client';

import React, { useState } from 'react';
import {
  FolderLock,
  Folder,
  FileText,
  FileCode,
  FileArchive,
  Search,
  Download,
  UploadCloud,
  ChevronRight,
  Shield,
  Clock,
  HardDrive,
  Eye
} from 'lucide-react';

interface DriveFile {
  id: string;
  name: string;
  category: 'Notes' | 'Labs' | 'Past Papers' | 'Circulars' | 'Manuals';
  size: string;
  date: string;
  uploader: string;
  permission: 'Campus-Wide' | 'Student Only' | 'Faculty Only';
  type: 'pdf' | 'code' | 'zip';
}

const DRIVE_FILES: DriveFile[] = [
  {
    id: 'f1',
    name: 'CS302_DBMS_Complete_Lecture_Slides_2026.pdf',
    category: 'Notes',
    size: '14.2 MB',
    date: 'Sep 20, 2026',
    uploader: 'Prof. Rajesh Sharma',
    permission: 'Campus-Wide',
    type: 'pdf'
  },
  {
    id: 'f2',
    name: 'CS302_BTree_Starter_Code_CPP.tar.gz',
    category: 'Labs',
    size: '1.8 MB',
    date: 'Sep 18, 2026',
    uploader: 'Database Lab TA',
    permission: 'Student Only',
    type: 'code'
  },
  {
    id: 'f3',
    name: 'CS304_Distributed_Systems_MidTerm_2025_Solved.pdf',
    category: 'Past Papers',
    size: '3.4 MB',
    date: 'Aug 28, 2026',
    uploader: 'Computer Science Academic Council',
    permission: 'Campus-Wide',
    type: 'pdf'
  },
  {
    id: 'f4',
    name: 'Academic_Calendar_Fall_2026_Official_Circular.pdf',
    category: 'Circulars',
    size: '850 KB',
    date: 'Aug 15, 2026',
    uploader: 'Office of the Academic Registrar',
    permission: 'Campus-Wide',
    type: 'pdf'
  },
  {
    id: 'f5',
    name: 'Robotics_Lab_Safety_Protocol_Manual_v3.pdf',
    category: 'Manuals',
    size: '2.6 MB',
    date: 'Sep 02, 2026',
    uploader: 'Dean of Student Affairs',
    permission: 'Campus-Wide',
    type: 'pdf'
  },
  {
    id: 'f6',
    name: 'Applied_Physics_Question_Bank_Last_5_Years.pdf',
    category: 'Past Papers',
    size: '7.1 MB',
    date: 'Sep 10, 2026',
    uploader: 'Dept. of Physics',
    permission: 'Campus-Wide',
    type: 'pdf'
  }
];

const FOLDERS = [
  { name: 'Lecture Notes', count: '48 files', category: 'Notes' },
  { name: 'Lab Manuals & Code', count: '32 archives', category: 'Labs' },
  { name: 'Previous Exam Papers', count: '86 papers', category: 'Past Papers' },
  { name: 'Official Circulars', count: '19 notices', category: 'Circulars' },
  { name: 'Hardware Manuals', count: '14 guides', category: 'Manuals' }
];

export default function CampusDrivePage() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [downloadToast, setDownloadToast] = useState<string | null>(null);

  const handleDownload = (fileName: string) => {
    setDownloadToast(`Starting download: ${fileName}`);
    setTimeout(() => setDownloadToast(null), 3000);
  };

  const filteredFiles = DRIVE_FILES.filter(f => {
    const matchesCat = selectedCategory === 'All' || f.category === selectedCategory;
    const matchesSearch = !search || 
      f.name.toLowerCase().includes(search.toLowerCase()) || 
      f.uploader.toLowerCase().includes(search.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 pt-2">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-line pb-6">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-tide">Repository</span>
          <h1 className="text-3xl lg:text-4xl font-serif text-bone mt-1 tracking-tight">
            Campus Drive
          </h1>
          <p className="text-sm text-mist mt-1">
            Centralized institutional file vault &bull; Searchable lecture slides, lab manuals, and previous year exam papers.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {downloadToast && (
            <span className="text-xs font-mono text-emerald-400 bg-emerald-400/10 px-3 py-1.5 rounded-xl border border-emerald-400/20 animate-in fade-in">
              {downloadToast}
            </span>
          )}
          <button className="flex items-center gap-2 px-4 py-2 rounded-xl bg-tide hover:bg-tide/90 text-white text-xs font-medium transition-colors shadow-lg cursor-pointer">
            <UploadCloud className="w-4 h-4" /> Upload Document
          </button>
        </div>
      </div>

      {/* Search Bar */}
      <div className="flex items-center gap-3 bg-surface border border-line rounded-2xl px-4 py-3 max-w-lg shadow-sm">
        <Search className="w-4 h-4 text-mist" />
        <input
          type="text"
          placeholder="Search all notes, circulars, exam papers, or professors..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-transparent border-none outline-none text-xs text-bone w-full placeholder:text-mist"
        />
      </div>

      {/* Folders Grid */}
      <div>
        <h3 className="text-xs font-mono uppercase tracking-widest text-mist mb-3">
          Campus Directory Folders
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          <div
            onClick={() => setSelectedCategory('All')}
            className={`p-4 rounded-2xl border transition-all cursor-pointer ${
              selectedCategory === 'All'
                ? 'bg-tide/10 border-tide shadow-[0_0_15px_rgba(70,183,255,0.1)]'
                : 'bg-surface border-line hover:border-line-strong'
            }`}
          >
            <Folder className={`w-7 h-7 mb-2 ${selectedCategory === 'All' ? 'text-tide' : 'text-mist'}`} />
            <h4 className="text-xs font-semibold text-bone">All Documents</h4>
            <span className="text-[10px] font-mono text-mist">Root Directory</span>
          </div>

          {FOLDERS.map(f => (
            <div
              key={f.name}
              onClick={() => setSelectedCategory(f.category)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                selectedCategory === f.category
                  ? 'bg-tide/10 border-tide shadow-[0_0_15px_rgba(70,183,255,0.1)]'
                  : 'bg-surface border-line hover:border-line-strong'
              }`}
            >
              <Folder className={`w-7 h-7 mb-2 ${selectedCategory === f.category ? 'text-tide' : 'text-mist'}`} />
              <h4 className="text-xs font-semibold text-bone truncate">{f.name}</h4>
              <span className="text-[10px] font-mono text-mist">{f.count}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Files List Table */}
      <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-line-strong space-y-4">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h3 className="text-lg font-semibold text-bone">
            {selectedCategory === 'All' ? 'All Verified Files' : selectedCategory} ({filteredFiles.length})
          </h3>
          <span className="text-xs font-mono text-mist">
            Storage: Institutional Cloud (Fast CDN)
          </span>
        </div>

        <div className="divide-y divide-line/60">
          {filteredFiles.map(file => (
            <div
              key={file.id}
              className="py-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-surface/40 px-2 rounded-xl transition-colors"
            >
              <div className="flex items-center gap-3.5 min-w-0">
                <div className="p-2.5 rounded-xl bg-ink border border-line shrink-0">
                  {file.type === 'pdf' ? (
                    <FileText className="w-5 h-5 text-rose-400" />
                  ) : file.type === 'code' ? (
                    <FileCode className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <FileArchive className="w-5 h-5 text-amber-400" />
                  )}
                </div>
                <div className="min-w-0">
                  <h4 className="text-sm font-medium text-bone truncate">{file.name}</h4>
                  <div className="flex items-center gap-2 text-[11px] font-mono text-mist mt-0.5">
                    <span>{file.uploader}</span>
                    <span>&bull;</span>
                    <span>{file.date}</span>
                    <span>&bull;</span>
                    <span>{file.size}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-surface border border-line text-mist">
                  {file.permission}
                </span>
                <button
                  onClick={() => handleDownload(file.name)}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface hover:bg-surface-raised border border-line text-xs font-mono text-bone hover:text-tide transition-colors cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
