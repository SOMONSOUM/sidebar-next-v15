"use client";

import {
  Calendar,
  ChevronRight,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "../ui/sidebar";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { getMenuList } from "@/lib/menuList";
import React from "react";
import { Collapsible } from "@radix-ui/react-collapsible";
import { CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";

const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Inbox",
    url: "#",
    icon: Inbox,
  },
  {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
];

const SIDEBAR_WIDTH = "16rem";
const SIDEBAR_WIDTH_MOBILE = "18rem";

export const AppSideBar = () => {
  const pathname = usePathname();
  const menuList = getMenuList(pathname);
  return (
    <Sidebar variant="sidebar" collapsible="icon">
      <SidebarHeader className="space-y-4 border-b border-[#adadad91] py-4">
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/">
              <div className="flex flex-col items-center">
                <Image
                  src="/logo/logo.svg"
                  width={180}
                  height={180}
                  alt="Ministry of Commerce Logo"
                  priority
                  className="object-contain"
                />
              </div>
            </Link>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          {menuList.map(({ groupLabel, menus }, index) => (
            <React.Fragment key={index}>
              <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menus.map(
                    ({ active, href, icon: Icon, label, submenus }, index) => (
                      <Collapsible
                        key={index}
                        asChild
                        defaultOpen={active}
                        className="group/collapsible"
                      >
                        <SidebarMenuItem className="text-[#fefefe]">
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton tooltip={label}>
                              {Icon && <Icon />}
                              <span>{label}</span>
                              <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {submenus.map(({ active, href, label }) => (
                                <SidebarMenuSubItem
                                  key={label}
                                  className="text-[#fefefe]"
                                >
                                  <SidebarMenuSubButton asChild>
                                    <Link href={href}>
                                      <span>{label}</span>
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              ))}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                    )
                  )}
                </SidebarMenu>
              </SidebarGroupContent>
            </React.Fragment>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};
