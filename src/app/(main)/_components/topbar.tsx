"use client";

import { usePathname } from "next/navigation";
import { BellDot, Search, Settings } from "lucide-react";
import Link from "next/link";

import { useProfileState } from "@/features/settings/store/profile-store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { menuItems } from "./app-sidebar";
import Avatar from "./avatar";
import { cn } from "@/lib/utils";

const Topbar = () => {
  const pathname = usePathname();
  const { profile } = useProfileState();

  const getCurrentTitle = () => {
    const currentItem = menuItems.find((item) => item.url === pathname);
    return currentItem?.label || "Overview";
  };

  const SearchInput = ({
    size,
    className,
  }: {
    size: "sm" | "lg";
    className?: string;
  }) => {
    return (
      <div
        className={cn(
          "flex items-center rounded-full bg-gray-100  px-6 gap-2 text-blue-400 cursor-pointer",
          size === "lg" ? "w-[255px] h-[50px]" : "w-full h-[40px]",
          className
        )}
      >
        <Search className="size-6" />
        <span>Search for something</span>
      </div>
    );
  };

  return (
    <header
      className="flex flex-col lg:flex-row items-center justify-between md:justify-start shrink-0 
      lg:h-24 w-full md:w-[calc(100vw-250px)] fixed top-0 gap-4 p-6 md:p-10 bg-sidebar border-b border-sidebar-border z-10"
    >
      <div className="flex items-center justify-between w-full">
        <SidebarTrigger className="md:hidden" />
        <h1 className="md:text-3xl text-xl font-semibold">
          {getCurrentTitle()}
        </h1>
        <div className="flex items-center gap-8 justify-end md:ml-auto">
          <SearchInput size="lg" className="hidden lg:flex" />
          <Link href="/settings" className="hidden md:block">
            <div className="rounded-full bg-gray-100 p-3">
              <Settings className="size-6 text-blue-400" />
            </div>
          </Link>
          <div className="rounded-full bg-gray-100 p-3 hidden md:block">
            <BellDot className="size-6 text-blue-400" />
          </div>

          <Avatar
            src={`${profile?.avatar || "/avatars/avatar.png"}?t=${profile?.updatedAt || 0}`}
            size={60}
          />
        </div>
      </div>
      <SearchInput size="sm" className="lg:hidden" />
    </header>
  );
};

export default Topbar;
