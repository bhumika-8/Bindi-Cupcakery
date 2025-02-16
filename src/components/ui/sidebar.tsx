"use client";
import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { LucideIcon } from "lucide-react";


interface SidebarProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Sidebar({ className, ...props }: SidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Sidebar Toggle Button (Visible on Mobile) */}
      <Button
        variant="outline"
        className="absolute top-4 left-4 z-50 md:hidden"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Sidebar */}
      <div
         className={cn(
          "fixed top-0 left-0 h-full w-[280px] bg-muted/40 border-r transition-transform",
          isOpen ? "translate-x-0" : "-translate-x-full",
          "lg:translate-x-0" // ✅ Always show on large screens
        )}
        {...props}
      />
    </>
  );
}

interface SidebarHeaderProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarHeader({ className, ...props }: SidebarHeaderProps) {
  return <div className={cn("px-6 py-3 border-b", className)} {...props} />;
}

interface SidebarContentProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SidebarContent({ className, ...props }: SidebarContentProps) {
  return <div className={cn("px-3 py-2", className)} {...props} />;
}

interface SidebarMenuProps extends React.HTMLAttributes<HTMLUListElement> {}

export function SidebarMenu({ className, ...props }: SidebarMenuProps) {
  return <ul className={cn("flex flex-col gap-1", className)} {...props} />;
}

interface SidebarMenuItemProps extends React.HTMLAttributes<HTMLLIElement> {}

export function SidebarMenuItem({ className, ...props }: SidebarMenuItemProps) {
  return <li className={cn("", className)} {...props} />;
}

interface SidebarMenuButtonProps extends React.ComponentPropsWithoutRef<typeof Button> {
  icon?: LucideIcon;
  isActive?: boolean;
}

export function SidebarMenuButton({ className, icon: Icon, isActive, children, ...props }: SidebarMenuButtonProps) {
  return (
    <Button variant={isActive ? "secondary" : "ghost"} className={cn("w-full justify-start", className)} {...props}>
      {Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </Button>
  );
}
