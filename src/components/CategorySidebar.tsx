import { motion } from "framer-motion"

type CategorySidebarProps = {
  categories: string[]
  activeCategory: string
  setActiveCategory: (category: string) => void
}

export default function CategorySidebar({ categories, activeCategory, setActiveCategory }: CategorySidebarProps) {
  return (
    <aside className="w-full md:w-64 mb-8 md:mb-0 md:mr-8">
      <h2 className="text-3xl font-script text-[#F7418F] mb-4 font-bold ">Categories</h2>
      <nav className="space-y-2">
        {categories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 * index }}
            onClick={() => setActiveCategory(category)}
            className={`w-full text-left px-4 py-2 text-xl font-medium rounded-lg transition-colors duration-300 ${
              activeCategory === category ? "bg-primary text-white" : "text-[#FC819E] hover:bg-gray-100"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </motion.button>
        ))}
      </nav>
    </aside>
  )
}

