'use client';
//import { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { ChevronRight, Star, Gift } from "lucide-react";

interface Product {
  name: string
  description: string
  price: number
  imageUrl: string
  tags: string[]
  isSignature: boolean
  createdAt: Date
}
const HomePage = () => {
  const router = useRouter();
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const [products, setProducts] = useState<Product[]>([]) // Explicitly type the products state
  const [loading, setLoading] = useState(true)
  const ref = useRef(null);
  

  // Parallax effect for hero section
  const y = useTransform(scrollY, [0, 500], [0, 150]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products")
        const data = await res.json()
        const signatureProducts = data.filter((product: Product) => product.isSignature)
        setProducts(signatureProducts)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    // Handle scroll event
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 },
  }

  if (loading) {
    return <p>Loading...</p>
  }
  return (
    <div className="bg-[#FC819E]">
      {/* Floating Navigation */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: isScrolled ? 0 : -100 }}
        transition={{ duration: 0.3 }}
        className="fixed top-0 left-0 right-0 z-50 bg-pink-100/90 backdrop-blur-md shadow-lg"
      ></motion.nav>

      {/* Hero Section with Parallax */}
      <section className="relative w-full h-screen flex items-center justify-center text-center text-white overflow-hidden">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-full">
          <Image
            src="https://res.cloudinary.com/dzrqqv9hl/image/upload/v1739598982/WhatsApp_Image_2025-02-04_at_14.59.28_884d496a_i3tfgl.jpg"
            alt="Delicious Pastries"
            layout="fill"
            objectFit="cover"
            quality={100}
            className="opacity-90 scale-110"
          />
        </motion.div>

        <div className="absolute inset-0 bg-black/50" />

<motion.div
  initial={{ opacity: 0, y: 100 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, delay: 0.2 }}
  className="relative max-w-3xl px-6 text-center mx-auto"
>
  <h1 className="text-8xl font-bold font-script mb-4">Bindi's Cupcakery</h1>
  <p className="text-2xl font-robot font-normal tracking-wide mb-6">
  Purely homemade, 100% veg, and crafted with love—sweetness made just for you!
  </p>
  <div className="flex justify-center">
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => router.push("/menu")}
      className="px-8 py-3 bg-transparent text-white rounded-full text-lg font-medium shadow-xl border-2 border-white transition-all flex items-center justify-center"
    >
      Explore Our Treats <ChevronRight className="ml-2" />
    </motion.button>
  </div>
</motion.div>

      </section>

      {/* Featured Products with Hover Effects */}
      <section className="py-24 overflow-hidden bg-gradient-to-r from-[#FEC7B4] to-[#FFF3C7] skew-y-3">
        <div className="container mx-auto -skew-y-3">
          <motion.div {...fadeInUp} className="text-center mb-16">
            <h2 className="text-6xl font-script mb-4 text-[#F7418F]">Our Signature Delights</h2>
            <p className="text-2xl font-robot tracking-wider text-[#FC819E]">💖 Handcrafted with Love, Baked to Perfection 💖</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6">
            {products.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ scale: 1.05, rotate: 3 }}
                className="relative group"
              >
                <div className="overflow-hidden rounded-3xl shadow-xl bg-gradient-to-b from-[#FEC7B4] to-[#FC819E] p-2">
                  <Image
                    src={item.imageUrl || "/placeholder.svg"}
                    alt={item.name}
                    width={400}
                    height={400}
                    className="w-full h-[300px] object-cover transition-transform duration-500 group-hover:scale-110 rounded-xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl flex items-end justify-center pb-4">
                    <p className="text-white text-lg font-semibold">{item.name}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive Hamper Builder Section */}
      <section className="relative py-24 overflow-hidden bg-gradient-to-r from-[#FFF3C7] to-[#FEC7B4] -skew-y-3">
        <div className="container mx-auto px-6 skew-y-3">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <motion.div
              initial={{ opacity: 0, x: -100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <h2 className="text-6xl font-script mb-6 text-[#F7418F]">Craft Your Perfect Indulgence</h2>
              <p className="text-2xl font-robot tracking-wide text-[#FC819E] mb-8">
                Design a dessert hamper as unique as your taste buds! Mix, match, and personalize your sweet escape.
                It's not just a gift; it's a journey through flavors! 🎁🍰
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-pink-500 text-white rounded-full shadow-xl transition-all duration-300 flex items-center text-3xl"
              >
                Create Your Hamper <Gift className="ml-2" />
              </motion.button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="relative">
                <motion.div
                  animate={{ rotate: [0, 5, 0] }}
                  transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Image
                    src="https://res.cloudinary.com/duu2djsav/image/upload/v1739454532/GWOC/Bindi%27s%20cupcakery%20pics%20without%20text/mvxgrpc0e0rawxhflrfg.jpg"
                    alt="Luxury Dessert Hamper"
                    width={600}
                    height={400}
                    className="rounded-2xl shadow-2xl"
                  />
                </motion.div>
                <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-xl shadow-lg">
                  <p className="text-sm font-medium text-pink-800">Starting from</p>
                  <p className="text-2xl font-bold text-pink-500">₹999</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials with Interactive Cards */}
      <section className="py-24 bg-gradient-to-r from-[#FEC7B4] to-[#FFF3C7]">
        <div className="container mx-auto px-6">
          <motion.h2 {...fadeInUp} className="text-6xl font-script text-center mb-16 text-pink-800">
            Sweet Words from Happy Hearts 💝
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah L.",
                role: "Food Blogger",
                text: "Bindi's pastries are a flavor explosion! Each bite is a journey through texture and taste. Absolutely divine!",
                rating: 5,
              },
              {
                name: "Mike R.",
                role: "Event Planner",
                text: "The dessert spread from Bindi's was the highlight of our wedding. Our guests are still raving about it!",
                rating: 5,
              },
              {
                name: "Emily T.",
                role: "Regular Customer",
                text: "Finally, vegan desserts that don't compromise on taste! Bindi's attention to dietary needs is truly remarkable.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ scale: 1.03 }}
                className="bg-white p-8 rounded-2xl shadow-lg"
              >
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {testimonial.name[0]}
                  </div>
                  <div className="ml-4">
                    <p className="font-bold text-pink-800">{testimonial.name}</p>
                    <p className="text-sm text-pink-700">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-pink-700 mb-4">"{testimonial.text}"</p>
                <div className="flex text-[#FFD700]">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="fill-current" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
