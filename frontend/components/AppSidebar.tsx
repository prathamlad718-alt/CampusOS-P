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
  GraduationCap,
  Sparkles,
  UserCheck
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

interface NavGroup {
  label: string;
  items: {
    name: string;
    href: string;
    icon: React.ElementType;
    badge?: string;
  }[];
}

function getNavGroupsForRole(user: any): NavGroup[] {
  const isAdmin = user?.isSuperAdmin || user?.role === 'admin' || user?.role === 'super-admin';
  const isFaculty = user?.role === 'faculty';

  // 1. ADMIN NAVIGATION: Zero student homework, high-power administrative control
  if (isAdmin) {
    return [
      {
        label: 'Administration & Operations',
        items: [
          { name: 'Operations Center', href: '/dashboard', icon: Home },
          { name: 'Admin Console', href: '/admin', icon: ShieldAlert, badge: 'Root' },
          { name: 'Plugin Marketplace', href: '/marketplace', icon: Blocks, badge: 'Modules' }
        ]
      },
      {
        label: 'Campus Infrastructure',
        items: [
          { name: 'Maintenance Issues', href: '/issues', icon: Wrench, badge: '12 Open' },
          { name: 'Bus Transit Fleet', href: '/transport', icon: Bus, badge: 'Live' },
          { name: 'Campus Navigation', href: '/navigation', icon: MapPin },
          { name: 'Campus Services Hub', href: '/services', icon: LifeBuoy }
        ]
      },
      {
        label: 'Academic Governance',
        items: [
          { name: 'Faculty Registry', href: '/faculty', icon: GraduationCap },
          { name: 'Central Drive', href: '/drive', icon: FolderLock },
          { name: 'Institutional Timeline', href: '/timeline', icon: Clock }
        ]
      },
      {
        label: 'System & Security',
        items: [
          { name: 'Settings & Privacy', href: '/settings', icon: Settings }
        ]
      }
    ];
  }

  // 2. FACULTY NAVIGATION: Teaching, grading, and lecture tools
  if (isFaculty) {
    return [
      {
        label: 'Instruction Portal',
        items: [
          { name: 'Faculty Workspace', href: '/faculty', icon: GraduationCap, badge: 'Primary' },
          { name: 'Lecture Schedule', href: '/timeline', icon: Clock },
          { name: 'Course Materials', href: '/drive', icon: FolderLock }
        ]
      },
      {
        label: 'Campus & Facilities',
        items: [
          { name: 'Campus Navigation', href: '/navigation', icon: MapPin },
          { name: 'Campus Services', href: '/services', icon: LifeBuoy },
          { name: 'Report IT Issue', href: '/issues', icon: Wrench }
        ]
      },
      {
        label: 'Preferences',
        items: [
          { name: 'Settings & Privacy', href: '/settings', icon: Settings }
        ]
      }
    ];
  }

  // 3. STUDENT NAVIGATION: Personal academic stream, assignments, and campus life
  return [
    {
      label: 'Academic Hub',
      items: [
        { name: 'Command Center', href: '/dashboard', icon: Home },
        { name: 'Academic Timeline', href: '/timeline', icon: Clock },
        { name: 'Assignments', href: '/assignments', icon: BookOpen, badge: '3 Due' }
      ]
    },
    {
      label: 'Campus & Mobility',
      items: [
        { name: 'Collaboration', href: '/collaboration', icon: Users },
        { name: 'Campus Navigation', href: '/navigation', icon: MapPin },
        { name: 'Bus Transit Fleet', href: '/transport', icon: Bus, badge: 'Live' },
        { name: 'Campus Services', href: '/services', icon: LifeBuoy }
      ]
    },
    {
      label: 'Institutional',
      items: [
        { name: 'Campus Drive', href: '/drive', icon: FolderLock },
        { name: 'Issue Reporting', href: '/issues', icon: Wrench }
      ]
    },
    {
      label: 'System & Platform',
      items: [
        { name: 'Settings & Privacy', href: '/settings', icon: Settings }
      ]
    }
  ];
}

import { registry } from '@campus-os/shared/plugin-registry';
import { initializePlugins } from '@/lib/plugins/init';
import { useClubs } from '@plugins/club/frontend/hooks';

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

  // Role preview override state for easy testing
  const [roleOverride, setRoleOverride] = React.useState<string | null>(null);

  const effectiveUser = React.useMemo(() => {
    if (!roleOverride) return user;
    if (roleOverride === 'admin') return { ...user, isSuperAdmin: true, role: 'admin' };
    if (roleOverride === 'faculty') return { ...user, isSuperAdmin: false, role: 'faculty' };
    return { ...user, isSuperAdmin: false, role: 'student' };
  }, [user, roleOverride]);

  const navGroups = React.useMemo(() => getNavGroupsForRole(effectiveUser), [effectiveUser]);

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
      className="border-r border-line bg-ink/75 backdrop-blur-2xl"
    >
      {/* Brand Header */}
      <SidebarHeader className="p-3 border-b border-line/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="hover:bg-transparent"
              asChild
            >
              <Link href="/dashboard" className="flex items-center gap-3">
                <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-gradient-to-tr from-tide to-foam text-ink shadow-[0_0_20px_rgba(70,183,255,0.3)]">
                  <span className="text-xl font-extrabold tracking-tighter">
                    C
                  </span>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <div className="flex items-center gap-2">
                    <span className="font-semibold tracking-tight text-base text-bone font-serif">
                      Campus OS
                    </span>
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  </div>
                  <span className="text-[10px] font-mono text-mist">
                    {effectiveUser?.isSuperAdmin ? 'Institutional Root' : effectiveUser?.role === 'faculty' ? 'Faculty Portal' : 'Student Workstation'}
                  </span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Role-Filtered Navigation Groups */}
      <SidebarContent className="px-2 py-3 space-y-4">
        {navGroups.map((group) => (
          <SidebarGroup key={group.label} className="p-0">
            <SidebarGroupLabel className="text-mist font-mono uppercase tracking-wider text-[10px] px-3 mb-1 font-semibold">
              {group.label}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive =
                    pathname === item.href ||
                    (item.href !== '/dashboard' && pathname?.startsWith(item.href + '/'));

                  return (
                    <SidebarMenuItem key={item.name} className="px-1 py-0.5">
                      <SidebarMenuButton
                        asChild
                        isActive={isActive}
                        tooltip={item.name}
                        className={`min-h-[40px] transition-all duration-200 rounded-xl ${
                          isActive
                            ? 'bg-surface border border-tide/40 text-tide shadow-[0_0_15px_rgba(70,183,255,0.08)] font-semibold'
                            : 'hover:bg-surface hover:text-bone text-mist border border-transparent'
                        }`}
                      >
                        <Link href={item.href} className="flex items-center justify-between w-full">
                          <div className="flex items-center gap-2.5 min-w-0">
                            <item.icon className={`size-4 shrink-0 ${isActive ? 'text-tide' : 'text-mist'}`} />
                            <span className="text-xs truncate">
                              {item.name}
                            </span>
                          </div>
                          {item.badge && (
                            <span className={`text-[9px] font-mono px-1.5 py-0.5 rounded-md shrink-0 ${
                              isActive
                                ? 'bg-tide text-white font-bold'
                                : 'bg-surface border border-line text-mist'
                            }`}>
                              {item.badge}
                            </span>
                          )}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>

      {/* Workspace & Role Persona Switcher Footer */}
      <SidebarFooter className="p-3 border-t border-line/50">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-surface border border-line bg-ink-2 shadow-sm rounded-xl transition-colors hover:border-line-strong hover:bg-surface cursor-pointer"
                >
                  <div className="flex aspect-square size-7 items-center justify-center rounded-lg bg-surface text-tide border border-line font-bold text-xs">
                    {effectiveUser?.isSuperAdmin ? 'A' : effectiveUser?.role === 'faculty' ? 'F' : 'S'}
                  </div>
                  <div className="flex flex-col gap-0.5 leading-none overflow-hidden text-left">
                    <span className="font-medium tracking-tight text-xs text-bone truncate">
                      {effectiveUser?.isSuperAdmin ? 'Administrator' : effectiveUser?.role === 'faculty' ? 'Faculty Member' : 'Student Mode'}
                    </span>
                    <span className="text-[10px] text-mist font-mono truncate">
                      Click to switch persona
                    </span>
                  </div>
                  <ChevronsUpDown className="ml-auto size-3.5 text-mist" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="rounded-xl bg-ink-2 border-line w-60"
                side={isMobile ? 'bottom' : 'top'}
                align="start"
              >
                <DropdownMenuLabel className="text-[10px] font-mono text-mist uppercase">
                  Switch Active Role Persona
                </DropdownMenuLabel>
                <DropdownMenuItem 
                  onClick={() => setRoleOverride('admin')}
                  className={`rounded-lg text-xs cursor-pointer ${effectiveUser?.isSuperAdmin ? 'bg-surface font-semibold text-tide' : ''}`}
                >
                  <ShieldAlert className="size-3.5 text-rose-400 mr-2" />
                  <span>Admin / Staff Console</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setRoleOverride('faculty')}
                  className={`rounded-lg text-xs cursor-pointer ${effectiveUser?.role === 'faculty' && !effectiveUser?.isSuperAdmin ? 'bg-surface font-semibold text-tide' : ''}`}
                >
                  <GraduationCap className="size-3.5 text-purple-400 mr-2" />
                  <span>Faculty / Professor</span>
                </DropdownMenuItem>
                <DropdownMenuItem 
                  onClick={() => setRoleOverride('student')}
                  className={`rounded-lg text-xs cursor-pointer ${!effectiveUser?.isSuperAdmin && effectiveUser?.role !== 'faculty' ? 'bg-surface font-semibold text-tide' : ''}`}
                >
                  <Home className="size-3.5 text-tide mr-2" />
                  <span>Student View (Homework &amp; Class)</span>
                </DropdownMenuItem>

                {clubs && clubs.length > 0 && (
                  <>
                    <DropdownMenuSeparator className="bg-line" />
                    <DropdownMenuLabel className="text-[10px] font-mono text-mist uppercase">
                      Student Organizations
                    </DropdownMenuLabel>
                    {clubs.map((club) => (
                      <DropdownMenuItem key={club.id} asChild className="rounded-lg text-xs">
                        <Link href={`/workspace/${club.slug}`} className="flex items-center gap-2 cursor-pointer">
                          <span className="size-4 rounded-sm bg-tide/10 text-tide flex items-center justify-center font-bold text-[10px]">
                            {club.name.charAt(0)}
                          </span>
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
