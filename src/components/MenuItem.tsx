import Image from "next/image"
import { motion } from "framer-motion"
import { useCart } from "@/app/context/CartProvider"

type MenuItemProps = {
  name: string
  price: number
  imageUrl: string  // Updated from "image"
  description: string // Updated from "desc"
  isSignature?: boolean // Updated from "popular"
  tags?: string[] // Updated from "dietaryInfo"
  onAddToCart: () => void
}

export default function MenuItem({ name, price, imageUrl, description, isSignature, tags }: MenuItemProps) {
  const { addToCart, updateQuantity, cartItems } = useCart()
  const cartItem = cartItems.find((item) => item.name === name)
  const quantity = cartItem ? cartItem.quantity : 0

  const handleAddToCart = () => {
    addToCart(name, price)
  }

  const increaseQuantity = () => {
    updateQuantity(name, quantity + 1)
  }

  const decreaseQuantity = () => {
    updateQuantity(name, quantity - 1)
  }

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="bg-white rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 hover:shadow-xl flex flex-col"
      style={{ maxWidth: "250px" }} // Set a max width for the card
    >
      <div className="relative w-full aspect-square">
        <Image
          src={imageUrl || "/placeholder.svg"} // Updated field name
          alt={name}
          layout="fill"
          objectFit="cover"
          className="transition-transform duration-300 hover:scale-110"
        />
        {isSignature && ( // Updated field name
          <div className="absolute top-2 right-2 bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
            Popular
          </div>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold mb-1 text-black">{name}</h3>
        <p className="text-gray-600 text-xs mb-3 line-clamp-2">{description}</p> {/* Updated field name */}
        <div className="flex justify-between items-center">
          <span className="text-black font-bold text-md">₹{price.toFixed(2)}</span>
          {tags && tags.length > 0 && ( // Updated field name
            <div className="flex gap-1">
              {tags.map((info) => (
                <span key={info} className="bg-pink-100 text-pink-800 px-2 py-1 rounded-full text-xs">
                  {info}
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="mt-3">
          {quantity === 0 ? (
            <button
              onClick={handleAddToCart}
              className="w-full bg-black text-white py-1.5 rounded-lg font-medium hover:bg-gray-800 transition text-sm"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between bg-pink-100 p-1.5 rounded-lg">
              <button
                onClick={decreaseQuantity}
                className="bg-black text-white px-2.5 py-0.5 rounded-md hover:bg-gray-800 transition text-sm"
              >
                -
              </button>
              <span className="text-md font-semibold text-pink-800">{quantity}</span>
              <button
                onClick={increaseQuantity}
                className="bg-black text-white px-2.5 py-0.5 rounded-md hover:bg-gray-800 transition text-sm"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
