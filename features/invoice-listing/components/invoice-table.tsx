"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { PlusIcon, EditIcon, CheckIcon, XIcon } from "lucide-react";
import { Invoice, InvoiceWithCustomer } from "@/schema/types";

// type Invoice = {
//   id: number;
//   invoiceNumber: string;
//   clientName: string;
//   description: string;
//   dueDate: string;
//   totalAmount: number;
//   status: "Paid" | "Unpaid" | "Overdue";
// };

export default function InvoiceTable({ invoices }: { invoices: InvoiceWithCustomer[] }) {
  // const [invoices, setInvoices] = useState<Invoice[]>([
  //   {
  //     id: 1,
  //     invoiceNumber: "INV-001",
  //     clientName: "Acme Corp",
  //     description: "Web Development",
  //     dueDate: "2023-12-31",
  //     totalAmount: 1000,
  //     status: "Unpaid",
  //   },
  //   {
  //     id: 2,
  //     invoiceNumber: "INV-002",
  //     clientName: "Globex Inc",
  //     description: "UI/UX Design",
  //     dueDate: "2023-12-15",
  //     totalAmount: 1500,
  //     status: "Paid",
  //   },
  //   {
  //     id: 3,
  //     invoiceNumber: "INV-003",
  //     clientName: "Umbrella LLC",
  //     description: "Server Maintenance",
  //     dueDate: "2023-11-30",
  //     totalAmount: 2000,
  //     status: "Overdue",
  //   },
  // ]);

  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (editingInvoice) {
      setEditingInvoice({ ...editingInvoice, [e.target.name]: e.target.value });
    }
  };

  const handleStatusChange = (status: "Paid" | "Unpaid" | "Overdue") => {
    if (editingInvoice) {
      setEditingInvoice({ ...editingInvoice, status });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingInvoice) {
      // setInvoices(
      //   invoices.map((inv) =>
      //     inv.id === editingInvoice.id ? editingInvoice : inv
      //   )
      // );
    } else {
      // setInvoices([
      //   ...invoices,
      //   { ...editingInvoice!, id: invoices.length + 1 },
      // ]);
    }
    setEditingInvoice(null);
    setIsDialogOpen(false);
  };

  const openEditDialog = (invoice: Invoice) => {
    setEditingInvoice(invoice);
    setIsDialogOpen(true);
  };

  const openNewInvoiceDialog = () => {
    setEditingInvoice({
      id: 0,
      invoiceNumber: `INV-00${invoices.length + 1}`,
      clientName: "",
      description: "",
      dueDate: "",
      totalAmount: 0,
      status: "Unpaid",
    });
    setIsDialogOpen(true);
  };

  const updateInvoiceStatus = (
    id: number,
    newStatus: "Paid" | "Unpaid" | "Overdue"
  ) => {
    // setInvoices(
    //   invoices.map((inv) =>
    //     inv.id === id ? { ...inv, status: newStatus } : inv
    //   )
    // );
  };

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">QuikBills Invoicing</h1>
      </header>

      <div className="mb-4">
        <Button onClick={openNewInvoiceDialog}>
          <PlusIcon className="mr-2 h-4 w-4" /> Create New Invoice
        </Button>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Due Date</TableHead>
            <TableHead>Total Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {invoices.map((invoice) => (
            <TableRow key={invoice.id}>
              <TableCell>{invoice.id}</TableCell>
              <TableCell>{invoice.customers.name}</TableCell>
              <TableCell>{invoice.description}</TableCell>
              <TableCell>{invoice.due_date}</TableCell>
              <TableCell>${invoice.amount}</TableCell>
              <TableCell>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    invoice.status === "paid"
                      ? "bg-green-100 text-green-800"
                      : invoice.status === "unpaid"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-red-100 text-red-800"
                  }`}
                >
                  {invoice.status}
                </span>
              </TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => openEditDialog(invoice)}
                  >
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateInvoiceStatus(invoice.id, "Paid")}
                  >
                    <CheckIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => updateInvoiceStatus(invoice.id, "Unpaid")}
                  >
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingInvoice?.id ? "Edit Invoice" : "Create New Invoice"}
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="invoiceNumber">Invoice Number</Label>
              <Input
                id="invoiceNumber"
                name="invoiceNumber"
                value={editingInvoice?.id || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="clientName">Client Name</Label>
              <Input
                id="clientName"
                name="clientName"
                value={editingInvoice?.customer_id || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                value={editingInvoice?.description || ""}
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
                value={editingInvoice?.due_date || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="totalAmount">Total Amount</Label>
              <Input
                id="totalAmount"
                name="totalAmount"
                type="number"
                value={editingInvoice?.amount || ""}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={editingInvoice?.status || ""}
                onValueChange={(value: "Paid" | "Unpaid" | "Overdue") =>
                  handleStatusChange(value)
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Paid">Paid</SelectItem>
                  <SelectItem value="Unpaid">Unpaid</SelectItem>
                  <SelectItem value="Overdue">Overdue</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full">
              {editingInvoice?.id ? "Update Invoice" : "Create Invoice"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
