'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@campus-os/shared/auth-provider';
import {
  Calendar,
  Home,
  Users,
  Ticket,
  CheckSquare,
  Settings,
  ShieldAlert,
  ChevronsUpDown,
  Blocks,
  Clock,
  BookOpen,
  FolderLock,
  MapPin,
  Bus,
  LifeBuoy,
  Wrench,
  GraduationCap
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@campusos/design-system';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar
} from '@campusos/design-system';

const navigation = [
  { name: 'Command Center', href: '/dashboard', icon: Home },
  { name: 'Academic Timeline', href: '/timeline', icon: Clock },
  { name: 'Assignments', href: '/assignments', icon: BookOpen },
  { name: 'Collaboration', href: '/collaboration', icon: Users },
  { name: 'Campus Drive', href: '/drive', icon: FolderLock },
  { name: 'Navigation Map', href: '/navigation', icon: MapPin },
  { name: 'Bus Fleet', href: '/transport', icon: Bus },
  { name: 'Campus Services', href: '/services', icon: LifeBuoy },
  { name: 'Issue Reporting', href: '/issues', icon: Wrench },
  { name: 'Faculty Workspace', href: '/faculty', icon: GraduationCap },
  { name: 'Settings', href: '/settings', icon: Settings }
];

import { registry } from '@campus-os/shared/plugin-registry';
import { initializePlugins } from '@/lib/plugins/init';
import { useClubs } from '@plugins/club/frontend/hooks';

// Call it once when module is loaded on client
initializePlugins();

export function AppSidebar({
  activePlugins = [],
  clubId
}: {
  activePlugins?: string[];
  clubId?: string;
}) {
  const pathname = usePathname();
  const { user } = useAuth();
  const { isMobile } = useSidebar();

  const { data: clubs } = useClubs();

  // Map string icons back to Lucide components
  const iconMap: Record<string, React.ElementType> = {
    Ticket,
    CheckSquare,
    Calendar,
    Users,
    Settings,
    Home,
    ShieldAlert
  };

  // Combine core navigation with plugin navigation
  const pluginLinks = registry
    .getSidebarLinks()
    .filter((link) => activePlugins.includes(link.pluginId))
    .filter((link) => {
      const isWorkspace = link.context !== 'global';
      // If we are in a club context, show workspace links.
      // If we are in global context, show global links.
      return clubId ? isWorkspace : !isWorkspace;
    })
    .map((link) => ({
      name: link.title,
      href:
        clubId && link.context !== 'global'
          ? `/workspace/${clubId}${link.url}`
          : link.url,
      icon: link.icon && iconMap[link.icon] ? iconMap[link.icon] : Settings
    }));

  const allNavigation = clubId
    ? [
        { name: 'Dashboard', href: `/workspace/${clubId}`, icon: Home },
        ...pluginLinks,
        {
          name: 'Settings',
          href: `/workspace/${clubId}/settings`,
          icon: Settings
        }
      ]
    : [...navigation, ...pluginLinks];

  if (!clubId && user?.isSuperAdmin) {
    allNavigation.push({
      name: 'Admin Panel',
      href: '/admin',
      icon: ShieldAlert
    });
    allNavigation.push({
      name: 'Marketplace',
      href: '/marketplace',
      icon: Blocks
    });
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-line bg-ink/60 backdrop-blur-2xl"
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent mb-2"
              asChild
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-xl bg-gradient-to-tr from-tide to-foam text-ink shadow-[0_0_20px_rgba(70,183,255,0.3)]">
                  <span className="text-xl font-extrabold tracking-tighter">
                    C
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none ml-1">
                  <span className="font-semibold tracking-tight text-lg text-bone">
                    CampusOS
                  </span>
                  {clubId && (
                    <span className="text-[11px] text-mist font-medium truncate">
                      / {clubs?.find((c) => c.slug === clubId)?.name || clubId}
                    </span>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-mist font-mono uppercase tracking-wider text-[10px]">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {allNavigation.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' &&
                    item.href !== `/workspace/${clubId}` &&
                    pathname?.startsWith(item.href + '/'));
                return (
                  <SidebarMenuItem key={item.name} className="px-1 py-0.5">
                    <SidebarMenuButton
                      asChild
                      isActive={isActive}
                      tooltip={item.name}
                      className={`min-h-[44px] transition-all duration-300 rounded-xl ${isActive ? 'bg-surface border border-line-strong text-tide shadow-[0_0_15px_rgba(70,183,255,0.1)]' : 'hover:bg-surface hover:text-bone text-mist border border-transparent'}`}
                    >
                      <Link href={item.href}>
                        <item.icon className="size-5" />
                        <span className="text-[15px] font-medium">
                          {item.name}
                        </span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-surface data-[state=open]:text-bone border border-line bg-ink-2 shadow-[0_8px_30px_rgba(0,0,0,0.5)] rounded-xl transition-colors hover:border-line-strong hover:bg-surface"
                >
                  <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-surface text-tide border border-line">
                    <span className="text-sm font-bold">
                      {clubId ? clubId.charAt(0).toUpperCase() : 'G'}
                    </span>
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none overflow-hidden">
                    <span className="font-semibold tracking-tight text-sm text-bone truncate">
                      {clubId
                        ? clubs?.find((c) => c.slug === clubId)?.name || clubId
                        : 'Global Dashboard'}
                    </span>
                    <span className="text-xs text-mist truncate">
                      {clubId ? 'Workspace' : 'System'}
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-4 text-mist" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="rounded-lg"
                style={{ width: 'var(--radix-dropdown-menu-trigger-width)' }}
                side={isMobile ? 'bottom' : 'top'}
                align="start"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Switch Workspace
                </DropdownMenuLabel>
                <DropdownMenuItem asChild>
                  <Link
                    href="/dashboard"
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <div className="flex size-6 items-center justify-center rounded-sm border">
                      <Home className="size-3" />
                    </div>
                    Global Dashboard
                  </Link>
                </DropdownMenuItem>

                {clubs && clubs.length > 0 && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel className="text-xs text-muted-foreground">
                      Your Clubs
                    </DropdownMenuLabel>
                    {clubs.map((club) => (
                      <DropdownMenuItem key={club.id} asChild>
                        <Link
                          href={`/workspace/${club.slug}`}
                          className="flex items-center gap-2 cursor-pointer"
                        >
                          <div className="flex size-6 items-center justify-center rounded-sm border bg-primary/10">
                            {club.name.charAt(0)}
                          </div>
                          <span className="truncate">{club.name}</span>
                        </Link>
                      </DropdownMenuItem>
                    ))}
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
