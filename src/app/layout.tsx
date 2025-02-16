"use client"
import { CartProvider } from "@/app/context/CartProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <html lang="en">
      <body>
        <CartProvider>
          {pathname === "/admin/login" ? (
            children // Only render admin login page without Navbar/Footer
          ) : (
            <>
              <Navbar />
              {children}
              <Footer />
            </>
          )}
        </CartProvider>
      </body>
    </html>
  );
}
