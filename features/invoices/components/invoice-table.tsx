"use client";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { EditIcon, CheckIcon, XIcon } from "lucide-react";
import { InvoiceWithCustomer } from "@/schema/types";
import CreateInvoiceDialog from "./create-invoice-dialog";

export default function InvoiceTable({
  invoices,
}: {
  invoices: InvoiceWithCustomer[];
}) {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Invoices</h1>
      </header>

      <CreateInvoiceDialog />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice ID</TableHead>
            <TableHead>Customer Name</TableHead>
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
                  className={`px-2 py-1 rounded-full text-xs font-semibold uppercase ${
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
                  <Button variant="outline" size="sm">
                    <EditIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <CheckIcon className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" size="sm">
                    <XIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
