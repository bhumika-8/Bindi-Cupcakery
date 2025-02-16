"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartProvider";
import CartDrawer from "@/components/CartDrawer";
import LoginModal from "@/components/LoginModal";
import { ShoppingCart, User, Menu } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { toggleCart } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Treats", href: "/menu" },
    { name: "Menus", href: "/gallery" },
    { name: "Location", href: "https://www.google.com/maps/search/Bindi's+Cupcakery", external: true },
    { name: "Contact Us", href: "/#contact", scroll: true },
    { name: "Admin", href: "/admin/dashboard" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 flex items-center justify-between transition-all duration-300 z-50 
        ${isScrolled ? "bg-[#F7418F] shadow-lg" : "bg-transparent"}`}
    >
      {/* Left - Logo */}
      <Link href="/">
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative cursor-pointer">
          <img src="/bindis.png" alt="Bindi's Cupcakery Logo" className="h-[78px] invert" />
        </motion.div>
      </Link>

      {/* Right - Icons and Mobile Menu Toggle */}
      <div className="flex items-center gap-6">
        {/* User Dropdown Button */}
        <div className="relative">
          <motion.button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="relative p-3 rounded-full bg-[#FEC7B4] hover:bg-[#FC819E] transition-colors duration-300"
          >
            <User className="h-7 w-7 text-black" />
          </motion.button>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {isDropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md overflow-hidden z-50"
              >
                <Link href="/api/frontend/register">
                  <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">Register</div>
                </Link>
                <Link href="/api/frontend/login">
                  <div className="px-4 py-2 text-black hover:bg-gray-200 cursor-pointer">Login</div>
                </Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Cart Button */}
        <motion.button
          onClick={toggleCart}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="relative p-3 rounded-full bg-[#FEC7B4] hover:bg-[#FC819E] transition-colors duration-300"
        >
          <ShoppingCart className="h-7 w-7 text-black" />
        </motion.button>

        {/* Mobile Menu Toggle */}
        <motion.button
          className="relative p-3 rounded-full bg-[#FEC7B4] hover:bg-[#FC819E] transition-colors duration-300"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Menu className="h-7 w-7" />
        </motion.button>
      </div>

      {/* Mobile Menu (Dropdown) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="absolute top-full left-0 w-full bg-[#FFF3C7] shadow-lg py-4 px-6"
          >
            {navItems.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                target={item.external ? "_blank" : ""}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <motion.div
                  className="py-2 text-xl tracking-widest font-bold font-robot text-[#F7418F] hover:text-[#FC819E] transition-colors duration-300"
                  whileHover={{ x: 10 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {item.name}
                </motion.div>
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Login Modal */}
      {isLoginOpen && <LoginModal onClose={() => setIsLoginOpen(false)} />}

      {/* Cart Drawer */}
      <CartDrawer />
    </motion.nav>
  );
};

export default Navbar;
