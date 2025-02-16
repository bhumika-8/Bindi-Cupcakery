"use client"

import { useState, useEffect } from "react"
import { Search } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import MenuItem from "@/components/MenuItem"
import CategorySidebar from "@/components/CategorySidebar"
import { useCart } from "@/app/context/CartProvider"

type Product = {
  _id: string
  name: string
  description: string
  price: number
  imageUrl: string
  tags: string[]
  isSignature: boolean
}

export default function Menu() {
  const [products, setProducts] = useState<Product[]>([])
  const [activeCategory, setActiveCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const { addToCart } = useCart()

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products")
        const data: Product[] = await response.json()
        setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products", error)
      }
    }
    fetchProducts()
  }, [])

  const categories = ["all", ...new Set(products.flatMap((item) => item.tags || []))]
  const filteredItems = activeCategory === "all" ? products : products.filter((item) => item.tags?.includes(activeCategory))
  const searchedItems = filteredItems.filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.description.toLowerCase().includes(searchQuery.toLowerCase()))

  return (
    <div className="min-h-screen bg-white">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="relative h-[40vh] overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('/bakery-hero.jpg')" }}>
        <div className="absolute inset-0 bg-black/50 bg-gradient-to-r from-[#FEC7B4] to-[#FFF3C7] flex flex-col justify-center px-6">
          <motion.h1 initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-5xl md:text-6xl text-black font-script mb-4">
            Handcrafted Sweet Delights
          </motion.h1>
          <p className="text-xl md:text-2xl text-black font-robot tracking-normal max-w-2xl">
            From rich pastries to melt-in-your-mouth cookies, choose from our selection of handcrafted treats and place your order today!
          </p>
        </div>
      </motion.div>

      <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row gap-8">
        <CategorySidebar categories={categories} activeCategory={activeCategory} setActiveCategory={setActiveCategory} />

        <div className="flex-1">
          <div className="relative mb-8">
            <input type="text" placeholder="Find your cravings..." className="w-full pl-10 pr-4 py-3 rounded-xl border-2 border-gray-200 focus:border-primary focus:outline-none transition-colors duration-300" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            <Search className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div key={activeCategory} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-8">
              <h2 className="text-3xl font-serif text-pink-500 mb-8">
                {activeCategory === "all" ? "All Items" : activeCategory.charAt(0).toUpperCase() + activeCategory.slice(1)}
              </h2>
              {searchedItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {searchedItems.map((item, index) => (
                    <motion.div key={item._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }}>
                      <MenuItem {...item} onAddToCart={() => addToCart(item.name, item.price)} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
                  <p className="text-gray-500 text-xl">No items found matching your search criteria</p>
                </motion.div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
