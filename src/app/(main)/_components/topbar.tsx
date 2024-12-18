"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";
import { menuItems } from "./app-sidebar";
import Image from "next/image";
import { BellDot, Search, Settings } from "lucide-react";
import Link from "next/link";

const Topbar = () => {
  const pathname = usePathname();

  const getCurrentTitle = () => {
    const currentItem = menuItems.find((item) => item.url === pathname);
    return currentItem?.label || "Overview";
  };

  return (
    <header className="flex items-center justify-between sticky h-24 top-0 gap-4 py-8 pl-2 pr-8 bg-sidebar border-b border-sidebar-border">
      <div className="flex items-center gap-4">
        <SidebarTrigger />
        <h1 className="text-3xl font-semibold">{getCurrentTitle()}</h1>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex items-center rounded-full bg-gray-100 w-[255px] h-[50px] px-6 gap-2  text-blue-400 cursor-pointer">
          <Search className="size-6" />
          <span>Search for something</span>
        </div>
        <Link href="/settings">
          <div className="rounded-full bg-gray-100 p-3">
            <Settings className="size-6 text-blue-400" />
          </div>
        </Link>
        <div className="rounded-full bg-gray-100 p-3">
          <BellDot className="size-6 text-blue-400" />
        </div>
        <div className="rounded-full ">
          <Image src="avatars/user.svg" alt="user" width={60} height={60} />
        </div>
      </div>
    </header>
  );
};

export default Topbar;
