import { NextResponse } from "next/server"
import Product from "@/models/Product"
import connectDB from "@/lib/mongodb"

export async function GET() {
  try {
    await connectDB()
    console.log("✅ Connected to MongoDB")

    const products = await Product.find({}).lean()

    if (!Array.isArray(products)) {
      console.error("⚠ Unexpected response format from MongoDB:", products)
      return NextResponse.json({ message: "Invalid product data", products: [] }, { status: 500 })
    }

    console.log(`📦 Retrieved ${products.length} products`)
    return NextResponse.json(products, { status: 200 })
  } catch (error) {
    console.error("❌ Failed to fetch products:", error)
    return NextResponse.json({ message: "Error fetching products", products: [] }, { status: 500 })
  }
}

// POST handler to add a new product
export async function POST(req: Request) {
  try {
    const { name, description, price, imageUrl, isSignature } = await req.json()

    // Ensure all necessary fields are provided
    if (!name || !description || !price || !imageUrl) {
      return NextResponse.json({ error: "Please provide all required fields" }, { status: 400 })
    }

    // Create the product in the database
    const newProduct = new Product({ name, description, price, imageUrl, isSignature })
    await newProduct.save()

    return NextResponse.json({ message: "Product added successfully!" }, { status: 201 })
  } catch (error) {
    console.error("❌ Failed to add product:", error)
    return NextResponse.json({ error: "Failed to add product" }, { status: 500 })
  }
}
