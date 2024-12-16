"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { menuItems } from "./app-sidebar";

const Topbar = () => {
  const pathname = usePathname();

  const getCurrentTitle = () => {
    const currentItem = menuItems.find((item) => item.url === pathname);
    return currentItem?.label || "Overview";
  };

  return (
    <header className="flex items-center gap-4 py-8 px-2 bg-sidebar border-b border-sidebar-border">
      <SidebarTrigger />

      <h1 className="text-2xl font-bold">{getCurrentTitle()}</h1>
    </header>
  );
};

export default Topbar;
