import { CustomersTable } from "@/components/admin/customers-table"

export default function CustomersPage() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mt-20 mb-10">Customers</h1>
      <CustomersTable />
    </div>
  )
}

