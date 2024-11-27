"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceWithCustomer } from "@/schema/types";
import InvoiceStatusBadge from "./invoice-status-badge";
import InvoiceActions from "./invoice-actions";
import { Badge } from "@/components/ui/badge";
import { useOptimistic } from "react";
import { cn } from "@/lib/utils";

export type OptimisticAction = {
  type: 'DELETE' | 'UPDATE';
  id: number;
  status?: string;
};

type OptimisticInvoice = InvoiceWithCustomer & {
  actionStatus?: string;
};

const InvoiceTable = ({ invoices }: { invoices: InvoiceWithCustomer[] }) => {
  const [optimisticInvoices, addOptimisticUpdate] = useOptimistic(
    invoices as OptimisticInvoice[],
    (state: OptimisticInvoice[], action: OptimisticAction) => {
      return state.map(invoice =>
        invoice.id === action.id
          ? { ...invoice, actionStatus: action.status }
          : invoice
      );
    }
  );

  return (
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
        {optimisticInvoices.map((invoice) => (
          <TableRow 
            key={invoice.id}
            className={cn(
              "transition-all duration-300",
              invoice.actionStatus === "deleting" && "opacity-50 bg-muted"
            )}
          >
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.customers.name}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.due_date}</TableCell>
            <TableCell>₹{invoice.total || 0}</TableCell>
            <TableCell>
              <InvoiceStatusBadge status={invoice.status} />
            </TableCell>
            <TableCell>
              <InvoiceActions
                doOptimisticUpdate={addOptimisticUpdate}
                invoiceId={invoice.id}
                isDeleting={invoice.actionStatus === "deleting"}
              />
            </TableCell>
            {invoice?.actionStatus && (
              <TableCell>
                <Badge variant={"destructive"}>{invoice.actionStatus}</Badge>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
