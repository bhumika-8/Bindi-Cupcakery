"use client"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Temporary mock data
const orders = [
  {
    id: "1",
    customer: "John Doe",
    date: "2024-02-14",
    status: "pending",
    total: 19.99,
  },
  {
    id: "2",
    customer: "Jane Smith",
    date: "2024-02-13",
    status: "completed",
    total: 29.99,
  },
  {
    id: "3",
    customer: "Bob Johnson",
    date: "2024-02-12",
    status: "canceled",
    total: 15.99,
  },
]

const statusStyles = {
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-green-100 text-green-800",
  canceled: "bg-red-100 text-red-800",
}

export function OrdersTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">#{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge variant="secondary" className={statusStyles[order.status as keyof typeof statusStyles]}>
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">${order.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

