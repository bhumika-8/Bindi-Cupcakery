"use client"

import React, { useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"

export default function AddProductPage() {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [price, setPrice] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [isSignature, setIsSignature] = useState(false) // New state for isSignature (radio buttons)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState("")

  const handleAddProduct = async () => {
    if (!name || !description || !price || !imageUrl) {
      setMessage("Please fill in all fields.")
      return
    }

    setLoading(true)
    setMessage("")

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,
          price: Number(price),
          imageUrl,
          isSignature, // Send the isSignature value
        }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage("Product added successfully!")
        setName("")
        setDescription("")
        setPrice("")
        setImageUrl("")
        setIsSignature(false) // Reset the radio button
      } else {
        setMessage(data.error || "Failed to add product")
      }
    } catch (error) {
      setMessage("Error adding product")
    }

    setLoading(false)
  }

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-3xl font-bold mb-6">Add Product</h1>
      {message && <p className="mb-4 text-red-500">{message}</p>}

      <Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Product Name" className="mb-4" />
      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" className="mb-4" />
      <Input value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price" type="number" className="mb-4" />
      <Input value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="Image URL" className="mb-4" />

      {/* Product Signature Radio Buttons */}
      <div className="mb-4">
        <label className="block text-sm font-semibold mb-2">Product Signature</label>
        <div className="flex items-center space-x-4">
          <label>
            <input
              type="radio"
              name="isSignature"
              value="yes"
              checked={isSignature === true}
              onChange={() => setIsSignature(true)}
            />
            Yes
          </label>
          <label>
            <input
              type="radio"
              name="isSignature"
              value="no"
              checked={isSignature === false}
              onChange={() => setIsSignature(false)}
            />
            No
          </label>
        </div>
      </div>

      <Button onClick={handleAddProduct} disabled={loading}>
        {loading ? "Adding..." : "Add Product"}
      </Button>
    </div>
  )
}
