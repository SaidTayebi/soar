"use client";

import { usePathname } from "next/navigation";
import { Banknote, BellDot, Home, Search, Settings, User } from "lucide-react";
import Link from "next/link";

import { useProfileState } from "@/features/settings/store/profile-store";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { menuItems } from "./app-sidebar";
import Avatar from "./avatar";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";

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
    const [open, setOpen] = useState(false);

    useEffect(() => {
      const down = (e: KeyboardEvent) => {
        if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
          e.preventDefault();
          setOpen((open) => !open);
        }
      };
      document.addEventListener("keydown", down);
      return () => document.removeEventListener("keydown", down);
    }, []);

    return (
      <>
        <div
          className={cn(
            "flex items-center justify-between rounded-full bg-gray-100  px-6 gap-2 text-blue-400 cursor-pointer",
            size === "lg" ? "w-[300px] h-[50px]" : "w-full h-[40px]",
            className
          )}
          onClick={() => setOpen(true)}
        >
          <div className="flex items-center gap-2">
            <Search className="size-6" />
            <span>Search for something</span>
          </div>
          <kbd className="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
            <span className="text-xs">⌘</span>K
          </kbd>
        </div>

        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Dashboard">
              <CommandItem>
                <Link
                  className="flex items-center justify-between gap-2 w-full "
                  href="/"
                >
                  <Home />
                  Overview
                  <CommandShortcut>⌘D</CommandShortcut>
                </Link>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <Link
                  className="flex items-center justify-between gap-2 w-full "
                  href="/settings"
                >
                  <User />
                  Profile
                  <CommandShortcut>⌘P</CommandShortcut>
                </Link>
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup>
              <CommandItem>
                <Banknote />
                Quick Transfer
                <CommandShortcut>⌘T</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </CommandDialog>
      </>
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
