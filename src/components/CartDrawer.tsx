import { useCart } from "@/app/context/CartProvider"
import { motion, AnimatePresence } from "framer-motion"
import { X, ShoppingBag } from "lucide-react"
import Link from "next/link"

export default function CartDrawer() {
  const { isOpen, toggleCart, cartItems, removeFromCart, updateQuantity, total } = useCart()

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={toggleCart}
            className="fixed inset-0 bg-black z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed right-0 top-0 h-full w-full sm:w-96 bg-white shadow-xl z-50 p-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-black">Your Cart</h2>
              <button onClick={toggleCart} className="text-black hover:text-black">
                <X size={24} />
              </button>
            </div>
            {cartItems.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64">
                <ShoppingBag size={48} className="text-pblack mb-4" />
                <p className="text-black text-lg">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 mb-6">
                  {cartItems.map((item) => (
                    <div key={item.name} className="flex items-center justify-between bg-white p-4 rounded-lg shadow">
                      <div>
                        <h3 className="font-semibold text-black">{item.name}</h3>
                        <p className="text-sm text-black">₹{item.price.toFixed(2)}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity - 1)}
                          className="bg-black text-white px-2 py-0 rounded-md hover:bg-black transition"
                        >
                          -
                        </button>
                        <span className="font-semibold text-black">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.name, item.quantity + 1)}
                          className="bg-black text-white px-2 py-0 rounded-md hover:bg-black transition"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-pink-200 pt-4 mb-6">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-semibold text-black">Total:</span>
                    <span className="text-xl font-bold text-black">₹{total.toFixed(2)}</span>
                  </div>
                  <Link href="/checkout">
                    <button
                      onClick={toggleCart}
                      className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black transition"
                    >
                      Proceed to Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

