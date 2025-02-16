import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Menu from "@/models/Menu";

// GET all menu items
export async function GET() {
  try {
    console.log("⚡ Fetching menu items...");
    await connectDB();

    const menuItems = await Menu.find().sort({ _id: 1 }); // Removed 'order'
    console.log("✅ Fetched menu items:", menuItems);

    return NextResponse.json(menuItems.length ? menuItems : [], { status: 200 });
  } catch (error) {
    console.error("❌ Error fetching menu items:", error);
    return NextResponse.json(
      { message: "Error fetching menu items", error: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST a new menu item
export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { name_menu, imageUrl } = body; // ✅ Changed 'name' to 'name_menu'

    if (!name_menu || !imageUrl) {
      return NextResponse.json(
        { message: "Name and image URL are required" },
        { status: 400 }
      );
    }

    const newMenuItem = new Menu({ name_menu, imageUrl }); // ✅ Removed 'order'
    await newMenuItem.save();
    return NextResponse.json(newMenuItem, { status: 201 });
  } catch (error) {
    console.error("❌ Error adding menu item:", error);
    return NextResponse.json({ message: "Error adding menu item" }, { status: 500 });
  }
}

// PUT (Update) menu item
export async function PUT(req: NextRequest) {
  try {
    await connectDB();
    const body = await req.json();
    const { id, name_menu, imageUrl } = body; // ✅ Changed 'name' to 'name_menu'

    if (!id) return NextResponse.json({ message: "Menu item ID is required" }, { status: 400 });

    const updatedMenuItem = await Menu.findByIdAndUpdate(
      id,
      { name_menu, imageUrl },
      { new: true }
    );

    if (!updatedMenuItem) {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json(updatedMenuItem, { status: 200 });
  } catch (error) {
    console.error("❌ Error updating menu item:", error);
    return NextResponse.json({ message: "Error updating menu item" }, { status: 500 });
  }
}

// DELETE menu item
export async function DELETE(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) return NextResponse.json({ message: "Menu item ID is required" }, { status: 400 });

    const deletedItem = await Menu.findByIdAndDelete(id);
    if (!deletedItem) {
      return NextResponse.json({ message: "Menu item not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Menu item deleted successfully" }, { status: 200 });
  } catch (error) {
    console.error("❌ Error deleting menu item:", error);
    return NextResponse.json({ message: "Error deleting menu item" }, { status: 500 });
  }
}
