import { OrdersTable } from "@/components/admin/orders-table"

export default function OrdersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mt-20 mb-10">Orders</h1>
      <OrdersTable />
    </div>
  )
}

