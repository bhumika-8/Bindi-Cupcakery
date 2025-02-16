"use client"

import { useState } from "react"
import { useCart } from "@/app/context/CartProvider"
import { motion } from "framer-motion"
import {QRCodeSVG} from "qrcode.react"

export default function Checkout() {
  const { cartItems, total } = useCart()
  const [deliveryMethod, setDeliveryMethod] = useState<"pickup" | "delivery" | null>(null)
  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    address: "",
  })
  const [showQR, setShowQR] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the order to your backend
    console.log("Order submitted:", { deliveryMethod, customerDetails, cartItems, total })
    setShowQR(true)
  }

  const upiLink = `upi://pay?pa=akshat.agrawal6780@okicici&pn=Bindi's Bakery&am=${total}&cu=INR&tn=Order Payment`

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-black mb-8 pt-20">Checkout</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-semibold text-black mb-4">Delivery Method</h2>
          <div className="flex space-x-4 mb-6">
            <button
              onClick={() => setDeliveryMethod("pickup")}
              className={`px-4 py-2 rounded-lg ${
                deliveryMethod === "pickup" ? "bg-black text-white" : "bg-pink-100 text-pink-800 hover:bg-pink-200"
              } transition`}
            >
              Pickup
            </button>
            <button
              onClick={() => setDeliveryMethod("delivery")}
              className={`px-4 py-2 rounded-lg ${
                deliveryMethod === "delivery" ? "bg-black text-white" : "bg-pink-100 text-pink-800 hover:bg-pink-200"
              } transition`}
            >
              Delivery
            </button>
          </div>
          {deliveryMethod && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                placeholder="Name"
                value={customerDetails.name}
                onChange={(e) => setCustomerDetails({ ...customerDetails, name: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <input
                type="tel"
                placeholder="Phone"
                value={customerDetails.phone}
                onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              {deliveryMethod === "delivery" && (
                <textarea
                  placeholder="Delivery Address"
                  value={customerDetails.address}
                  onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                  className="w-full px-4 py-2 rounded-lg border border-black focus:outline-none focus:ring-2 focus:ring-black"
                  required
                />
              )}
              <button
                type="submit"
                className="w-full bg-black text-white py-3 rounded-lg font-semibold hover:bg-black transition"
              >
                Proceed to Payment
              </button>
            </form>
          )}
        </div>
        <div>
          <h2 className="text-2xl font-semibold text-black mb-4 pt-20">Order Summary</h2>
          <div className="bg-white rounded-lg p-6 shadow-md">
            {cartItems.map((item) => (
              <div key={item.name} className="flex justify-between items-center mb-2">
                <span className="text-black">
                  {item.name} x {item.quantity}
                </span>
                <span className="text-black font-semibold">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
            <div className="border-t border-white mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-semibold text-black">Total:</span>
                <span className="text-xl font-bold text-black">₹{total.toFixed(2)}</span>
              </div>
            </div>
          </div>
          {showQR && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mt-8 text-center">
              <h3 className="text-xl font-semibold text-black mb-4">Scan to Pay</h3>
              <QRCodeSVG value={upiLink} size={200} className="mx-auto" />
              <p className="mt-4 text-black">Scan this QR code with your UPI app to complete the payment</p>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}

