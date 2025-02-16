"use client";

import { useState, useEffect } from "react";

interface MenuItem {
  _id: string;
  name_menu: string;
  imageUrl: string;
}

export default function MenuAdmin() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [name_menu, setNameMenu] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [editNameMenu, setEditNameMenu] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/menu");
      if (!res.ok) throw new Error("Failed to fetch menu items");
      const data = await res.json();
      setMenuItems(data);
    } catch (error) {
      console.error("❌ Error fetching menu items:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = async () => {
    if (!image || !name_menu) return alert("Please enter name and upload an image!");
  
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append("upload_preset", "ml_default");
  
      const uploadRes = await fetch("https://api.cloudinary.com/v1_1/dzrqqv9hl/image/upload", {
        method: "POST",
        body: formData,
      });
  
      const uploadData = await uploadRes.json();
      console.log("Cloudinary Response:", uploadData);
  
      if (!uploadRes.ok) {
        throw new Error(uploadData.error?.message || "Image upload failed");
      }
  
      const imageUrl = uploadData.secure_url;
  
      console.log("Sending to backend:", { name_menu, imageUrl });
  
      const res = await fetch("/api/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name_menu, imageUrl }),
      });
  
      const responseData = await res.json();
      console.log("Backend Response:", responseData);
  
      if (res.ok) {
        setNameMenu(""); // ✅ Corrected state update
        setImage(null);
        fetchMenuItems();
      } else {
        console.error("❌ Error from backend:", responseData);
      }
    } catch (error: any) {
      console.error("❌ Error uploading image:", error.message);
    }
  };
  
  const handleDelete = async (id: string) => {
    try {
      const res = await fetch(`/api/menu?id=${id}`, { method: "DELETE" });
      if (res.ok) fetchMenuItems();
    } catch (error) {
      console.error("❌ Error deleting item:", error);
    }
  };

  const handleEdit = (id: string, currentName: string) => {
    setEditMode(true);
    setEditId(id);
    setEditNameMenu(currentName);
  };

  const handleUpdate = async () => {
    if (!editId) return;
    
    try {
      const res = await fetch(`/api/menu`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: editId, name_menu: editNameMenu }),
      });

      if (res.ok) {
        setEditMode(false);
        setEditId(null);
        setEditNameMenu("");
        fetchMenuItems();
      }
    } catch (error) {
      console.error("❌ Error updating item:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="mb-6 text-2xl font-bold text-gray-800">Admin Menu</h1>
      <div className="flex flex-col items-center space-y-4 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
        <input 
          type="text" 
          value={name_menu} 
          onChange={(e) => setNameMenu(e.target.value)} 
          placeholder="Enter menu name" 
          className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input 
          type="file" 
          onChange={(e) => setImage(e.target.files?.[0] || null)} 
          className="w-full"
        />
        <button 
          onClick={handleImageUpload} 
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
        >
          Add Menu Item
        </button>
      </div>

      {editMode && (
        <div className="mt-6 bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-lg font-semibold mb-2">Edit Item</h2>
          <input 
            type="text" 
            value={editNameMenu} 
            onChange={(e) => setEditNameMenu(e.target.value)} 
            className="w-full px-4 py-2 border rounded-lg mb-2"
          />
          <button 
            onClick={handleUpdate} 
            className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600"
          >
            Update
          </button>
          <button 
            onClick={() => setEditMode(false)} 
            className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Cancel
          </button>
        </div>
      )}

      {loading ? (
        <p className="mt-6 text-gray-500">Loading...</p>
      ) : (
        <div className="mt-6 w-full max-w-lg">
          {menuItems.map((item) => (
            <div key={item._id} className="flex items-center justify-between bg-white p-4 rounded-lg shadow mb-4">
              <img src={item.imageUrl} alt={item.name_menu} className="w-16 h-16 rounded object-cover" />
              <p className="text-gray-800 font-medium">{item.name_menu}</p>
              <div className="flex space-x-2">
                <button 
                  onClick={() => handleEdit(item._id, item.name_menu)} 
                  className="bg-yellow-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDelete(item._id)} 
                  className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
