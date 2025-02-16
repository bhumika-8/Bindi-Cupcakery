"use client"; // Important! This makes it a client component

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname === "/admin/login") {
    return <>{children}</>; // Render only the login page
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}
