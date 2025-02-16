"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

interface MenuItem {
  _id: string;
  imageUrl: string;
  name_menu: string;
  order: number;
}

const Gallery = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [selectedImage, setSelectedImage] = useState<MenuItem | null>(null);

  useEffect(() => {
    const fetchMenuItems = async () => {
      try {
        const response = await fetch("/api/menu");
        const data = await response.json();
        setMenuItems(data.sort((a: MenuItem, b: MenuItem) => a.order - b.order));
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenuItems();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-r from-[#FEC7B4] to-[#FFF3C7] py-12 px-4 md:px-6 pt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl md:text-5xl font-script font-bold text-[#F7418F] mb-4">
          Explore Our Menus
        </h1>
        <p className="text-[#FC819E] max-w-2xl mx-auto font-medium font-robot tracking-wide text-xl">
          Not sure what to order? Explore our full menu collection of homemade delights to find your next favorite treat!
        </p>
      </motion.div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {menuItems.map((item) => (
          <motion.div
            key={item._id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative group cursor-pointer rounded-xl overflow-hidden shadow-lg"
            onClick={() => setSelectedImage(item)}
          >
            <div className="aspect-w-4 aspect-h-3">
              <Image
                src={item.imageUrl}
                alt={item.name_menu}
                width={400}
                height={300}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </div>
            <div className="absolute bottom-0 left-0 w-full bg-black/60 text-white text-center py-2">
              <p className="text-lg font-semibold">{item.name_menu}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="relative max-w-4xl w-full">
            <div className="relative">
              <Image
                src={selectedImage.imageUrl}
                alt={selectedImage.name_menu}
                width={800}
                height={600}
                className="w-full h-auto rounded-lg"
                priority
              />
            </div>
            <button
              className="absolute -top-4 -right-4 bg-white text-gray-800 p-2 rounded-full shadow-lg hover:bg-gray-100 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
            >
              <FaTimes size={24} />
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Gallery;
