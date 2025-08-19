
'use client';

import {
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import {
  Gamepad2,
  Settings2,
  ShoppingCart,
  User,
  PanelLeft,
} from 'lucide-react';
import React from 'react';

const links = [
  { href: '/', label: 'Game', icon: Gamepad2 },
  { href: '/profile', label: 'Profile', icon: User },
  { href: '/store', label: 'Store', icon: ShoppingCart },
  { href: '/settings', label: 'Settings', icon: Settings2 },
];

export default function SidebarNavigation() {
  const pathname = usePathname();

  return (
    <>
      <SidebarHeader className="p-4">
        <div className="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-8 w-8 text-primary"><path d="M12 2a10 10 0 1 0 10 10 10 10 0 0 0-10-10Z"/><path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"/></svg>
            <h2 className="font-headline text-lg font-semibold tracking-tighter text-primary group-data-[collapsible=icon]:hidden">
                Aether Eight
            </h2>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {links.map((link) => (
            <SidebarMenuItem key={link.href}>
              <Link href={link.href} passHref>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === link.href}
                  tooltip={link.label}
                >
                  <>
                    <link.icon />
                    <span>{link.label}</span>
                  </>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <p>&copy; 2024 Aether Eight</p>
          <p>AI-Powered Gaming</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground group-data-[collapsible=icon]:hidden">
          <PanelLeft className="h-4 w-4" />
          <span>(Ctrl+B) to toggle</span>
        </div>
      </SidebarFooter>
    </>
  );
}
