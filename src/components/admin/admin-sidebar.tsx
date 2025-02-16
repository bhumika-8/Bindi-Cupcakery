"use client"

import { Home, Package, Users, ShoppingCart, FileSpreadsheet } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

import { SidebarContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar"

export function AdminSidebar() {
  const pathname = usePathname()

  const menuItems = [
    {
      title: "Dashboard",
      icon: Home,
      href: "/admin",
    },
    {
      title: "Products",
      icon: Package,
      href: "/admin/products",
    },
    {
      title: "Customers",
      icon: Users,
      href: "/admin/customers",
    },
    {
      title: "Orders",
      icon: ShoppingCart,
      href: "/admin/orders",
    },
    {
      title: "Menu",
      icon: FileSpreadsheet,
      href: "/admin/menu",
    }
  ]

  return (
    <>
      {/* <SidebarHeader className="border-b px-6 py-6">
        <h2 className="font-semibold">Admin Dashboard</h2>
      </SidebarHeader> */}
      <SidebarContent className="mt-20">
        <SidebarMenu>
          {menuItems.map((item) => (
      <SidebarMenuItem key={item.href}>
      <Link href={item.href} className="block w-full">
        <SidebarMenuButton icon={item.icon} isActive={pathname === item.href}>
          {item.title}
        </SidebarMenuButton>
      </Link>
    </SidebarMenuItem>
    
          ))}
        </SidebarMenu>
      </SidebarContent>
    </>
  )
}
