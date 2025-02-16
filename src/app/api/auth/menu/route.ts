import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Menu from "@/models/Menu";

export async function GET() {
  try {
    await connectDB();
    const menuItems = await Menu.find({});
    return NextResponse.json(menuItems, { status: 200 });
  } catch (error) {
    console.error("Error fetching menu items:", error);
    return NextResponse.json({ error: "Error fetching menu" }, { status: 500 });
  }
}
