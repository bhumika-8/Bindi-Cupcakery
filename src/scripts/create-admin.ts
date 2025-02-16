import { connect } from "mongoose"
import bcrypt from "bcryptjs"
import User from "../models/User"

async function createAdmin() {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("Please add your Mongo URI to .env")
    }

    await connect(process.env.MONGODB_URI)

    const adminEmail = "admin@bindiscupcakery.com"
    const existingAdmin = await User.findOne({ email: adminEmail })

    if (existingAdmin) {
      console.log("Admin user already exists")
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash("admin123", 10)

    await User.create({
      name: "Admin User",
      email: adminEmail,
      password: hashedPassword,
      role: "admin",
    })

    console.log("Admin user created successfully")
    process.exit(0)
  } catch (error) {
    console.error("Error creating admin user:", error)
    process.exit(1)
  }
}

createAdmin()

