'use client';

import { useState, useEffect } from 'react';
import { Search, Bell, ChevronDown } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@campusos/design-system';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { apiClient } from '@campus-os/shared/api-client';
import { useAuth } from '@campus-os/shared/auth-provider';
import { UniversalSearchModal } from '@/components/dashboard/UniversalSearchModal';

interface SearchResult {
  type: string;
  title: string;
  subtitle: string;
  url: string;
}

export function Header() {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchResults([]);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      setIsSearching(true);
      try {
        const response = await apiClient.get<{
          success: boolean;
          data: SearchResult[];
        }>(`/api/v1/system/search?q=${encodeURIComponent(searchQuery)}`);
        if (response.success) {
          setSearchResults(response.data);
        }
      } catch (err) {
        console.error('Search failed:', err);
      } finally {
        setIsSearching(false);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);
  return (
    <header className="sticky top-0 z-40 flex items-center justify-between px-6 py-4 bg-ink/40 backdrop-blur-md border-b border-line h-20 transition-colors duration-300">
      <div className="flex-1">
        <h2 className="text-2xl font-semibold text-bone m-0 tracking-tight">
          Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-6 ml-auto">
        {/* Universal Search Bar Trigger */}
        <div 
          onClick={() => setIsSearchModalOpen(true)}
          className="relative w-80 group cursor-pointer"
        >
          <div className="w-full px-4 py-2 border border-line rounded-full text-sm bg-ink-2 text-mist flex items-center justify-between group-hover:border-tide/50 transition-all shadow-sm">
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-tide" />
              <span className="text-xs">Search campus or ask question...</span>
            </span>
            <kbd className="px-2 py-0.5 text-[10px] font-mono text-mist bg-ink border border-line rounded">⌘K</kbd>
          </div>
        </div>

        {/* Notifications */}
        <div className="relative flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="bg-transparent border border-transparent cursor-pointer relative p-2 rounded-full transition-all duration-300 text-mist hover:bg-surface hover:text-bone hover:border-line focus:outline-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-0 right-0 w-5 h-5 bg-tide text-ink rounded-full flex items-center justify-center text-[10px] font-bold border-2 border-ink">
                3
              </span>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-80 bg-ink-2 border-line rounded-2xl shadow-[0_18px_60px_-18px_rgba(70,183,255,0.2)] p-0 overflow-hidden"
            >
              <DropdownMenuLabel className="p-4 border-b border-line text-bone">
                Notifications
              </DropdownMenuLabel>
              <div className="max-h-80 overflow-y-auto">
                <DropdownMenuItem className="p-4 border-b border-line hover:bg-surface transition-colors duration-200 cursor-pointer flex-col items-start gap-1 focus:bg-surface">
                  <p className="text-sm font-medium text-bone m-0 group-hover:text-tide transition-colors">
                    New event created
                  </p>
                  <p className="text-xs text-mist m-0">5 minutes ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 border-b border-line hover:bg-surface transition-colors duration-200 cursor-pointer flex-col items-start gap-1 focus:bg-surface">
                  <p className="text-sm font-medium text-bone m-0 group-hover:text-tide transition-colors">
                    Club request approved
                  </p>
                  <p className="text-xs text-mist m-0">1 hour ago</p>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-4 border-b border-line hover:bg-surface transition-colors duration-200 cursor-pointer flex-col items-start gap-1 focus:bg-surface">
                  <p className="text-sm font-medium text-bone m-0 group-hover:text-tide transition-colors">
                    New member joined
                  </p>
                  <p className="text-xs text-mist m-0">3 hours ago</p>
                </DropdownMenuItem>
              </div>
              <div className="p-2 border-t border-line">
                <DropdownMenuItem className="justify-center text-tide text-sm font-medium hover:bg-surface cursor-pointer focus:bg-surface focus:text-tide">
                  View all notifications
                </DropdownMenuItem>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* User Menu */}
        <div className="flex items-center">
          <DropdownMenu>
            <DropdownMenuTrigger className="flex items-center gap-3 bg-surface border border-line rounded-full p-1.5 pr-4 cursor-pointer transition-all duration-300 text-bone hover:bg-ink hover:border-line-strong hover:scale-[1.02] focus:outline-none">
              <div className="w-8 h-8 bg-gradient-to-tr from-tide to-foam rounded-full flex items-center justify-center text-ink font-bold text-sm shrink-0">
                {user?.name?.charAt(0).toUpperCase() || 'U'}
              </div>
              <span className="text-sm font-medium hidden lg:inline">
                {user?.name || 'User'}
              </span>
              <ChevronDown className="w-3 h-3 text-mist" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-56 bg-ink-2 border-line"
            >
              <DropdownMenuLabel>
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user?.name || 'User'}</p>
                  <p className="text-xs leading-none text-mist">{user?.email}</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-line" />
              <DropdownMenuItem asChild className="cursor-pointer focus:bg-surface">
                <Link href="/dashboard/profile">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild className="cursor-pointer focus:bg-surface">
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator className="bg-line" />
              <DropdownMenuItem 
                onClick={handleLogout}
                className="cursor-pointer text-error focus:bg-error/10 focus:text-error"
              >
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <UniversalSearchModal
        isOpen={isSearchModalOpen}
        onClose={() => setIsSearchModalOpen(false)}
      />
    </header>
  );
}
