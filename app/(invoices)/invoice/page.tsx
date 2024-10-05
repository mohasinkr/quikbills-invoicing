"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PlusIcon, TrashIcon } from "lucide-react"

type Invoice = {
  id: number
  client: string
  amount: number
  dueDate: string
  status: "Paid" | "Pending" | "Overdue"
}

export default function InvoiceTable() {
  const [invoices, setInvoices] = useState<Invoice[]>([
    { id: 1, client: "Acme Corp", amount: 1000, dueDate: "2023-12-31", status: "Pending" },
    { id: 2, client: "Globex Inc", amount: 1500, dueDate: "2023-12-15", status: "Paid" },
    { id: 3, client: "Umbrella LLC", amount: 2000, dueDate: "2023-11-30", status: "Overdue" },
  ])

  const [newInvoice, setNewInvoice] = useState<Omit<Invoice, "id">>({
    client: "",
    amount: 0,
    dueDate: "",
    status: "Pending",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setNewInvoice((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setInvoices((prev) => [...prev, { ...newInvoice, id: prev.length + 1 }])
    setNewInvoice({ client: "", amount: 0, dueDate: "", status: "Pending" })
  }

  const deleteInvoice = (id: number) => {
    setInvoices((prev) => prev.filter((invoice) => invoice.id !== id))
  }

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Invoicing App</h1>
      </header>
      
      <div className="grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary">Invoices</h2>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Client</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Due Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.id}>
                  <TableCell>{invoice.client}</TableCell>
                  <TableCell>${invoice.amount.toFixed(2)}</TableCell>
                  <TableCell>{invoice.dueDate}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        invoice.status === "Paid"
                          ? "bg-green-100 text-green-800"
                          : invoice.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <Button variant="destructive" size="sm" onClick={() => deleteInvoice(invoice.id)}>
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <div>
          <h2 className="text-2xl font-semibold mb-4 text-primary">Create New Invoice</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="client">Client</Label>
              <Input
                id="client"
                name="client"
                value={newInvoice.client}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="amount">Amount</Label>
              <Input
                id="amount"
                name="amount"
                type="number"
                value={newInvoice.amount}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="dueDate">Due Date</Label>
              <Input
                id="dueDate"
                name="dueDate"
                type="date"
                value={newInvoice.dueDate}
                onChange={handleInputChange}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              <PlusIcon className="mr-2 h-4 w-4" /> Add Invoice
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}