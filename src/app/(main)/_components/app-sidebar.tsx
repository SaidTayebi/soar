"use client";

import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import Link from "next/link";
import { ClipboardCheck, Home, Settings } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export const menuItems = [
  {
    title: "Dashboard",
    label: "Overview",
    url: "/",
    icon: <Home className="size-7" />,
  },

  {
    title: "Settings",
    label: "Settings",
    url: "/settings",
    icon: <Settings className="size-7" />,
  },
];

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const pathname = usePathname();

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <div className="flex items-center gap-2 self-center">
          <ClipboardCheck className="size-8 text-primary" />
          <h1 className="text-2xl font-bold py-4">Soar Task</h1>
        </div>
      </SidebarHeader>
      <SidebarContent className="mt-6">
        {menuItems.map((item) => (
          <SidebarMenu key={item.title} className="pl-[0.25px]">
            <Link href={item.url}>
              <SidebarMenuItem
                key={item.title}
                className={cn(
                  "py-4 hover:bg-muted border-l-4 border-transparent",
                  pathname === item.url && " border-primary"
                )}
              >
                <SidebarMenuButton
                  className={cn(
                    "flex items-center gap-2 py-4 px-6 hover:bg-transparent rounded-none text-muted-foreground",
                    pathname === item.url && "text-primary font-semibold"
                  )}
                >
                  <div className="">{item.icon}</div>
                  <span className="text-base">{item.title}</span>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </Link>
          </SidebarMenu>
        ))}
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
};

export default AppSidebar;
