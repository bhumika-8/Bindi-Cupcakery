"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("admin-auth");
    if (!auth) {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [router]);

  if (!isAuthenticated) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <p>Welcome, Admin!</p>

      <div className="mt-6">
        <button
          onClick={() => router.push("/admin/menu")}
          className="bg-green-500 text-white px-4 py-2 rounded mr-4"
        >
          Manage Menu
        </button>
        <button
          onClick={() => router.push("/admin/orders")}
          className="bg-yellow-500 text-white px-4 py-2 rounded mr-4"
        >
          View Orders
        </button>
        <button
          onClick={() => router.push("/admin/reviews")}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Read Reviews
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
