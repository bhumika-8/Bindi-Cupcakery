"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type CartItem = {
  name: string
  price: number
  quantity: number
}

type CartContextType = {
  cartItems: CartItem[]
  addToCart: (name: string, price: number) => void
  removeFromCart: (name: string) => void
  updateQuantity: (name: string, quantity: number) => void
  total: number
  isOpen: boolean
  toggleCart: () => void
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const useCart = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    const newTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cartItems])

  const addToCart = (name: string, price: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.name === name)
      if (existingItem) {
        return prevItems.map((item) => (item.name === name ? { ...item, quantity: item.quantity + 1 } : item))
      }
      return [...prevItems, { name, price, quantity: 1 }]
    })
  }

  const removeFromCart = (name: string) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.name !== name))
  }

  const updateQuantity = (name: string, quantity: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => (item.name === name ? { ...item, quantity } : item)).filter((item) => item.quantity > 0),
    )
  }

  const toggleCart = () => {
    setIsOpen(!isOpen)
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, total, isOpen, toggleCart }}>
      {children}
    </CartContext.Provider>
  )
}

