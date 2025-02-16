import type React from "react"
import { Sidebar } from "@/components/ui/sidebar"
import { AdminSidebar } from "@/components/admin/admin-sidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen">
      <Sidebar>
        <AdminSidebar />
      </Sidebar>
      <main className="lg:pl-[280px]">{children}</main>
    </div>
  )
}

