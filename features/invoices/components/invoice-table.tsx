"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { InvoiceWithCustomer, TCustomerNames } from "@/schema/types";
import InvoiceStatusBadge from "./invoice-status-badge";
import InvoiceActions from "./invoice-actions";
import { Badge } from "@/components/ui/badge";
import { useOptimistic } from "react";
import { cn } from "@/lib/utils";

type OptimisticAction = {
  type: "DELETE" | "UPDATE";
  id: number;
  status?: string;
};

type OptimisticInvoice = InvoiceWithCustomer & {
  actionStatus?: string;
};

type InvoiceTableProps = {
  invoices: InvoiceWithCustomer[];
  customerNames: TCustomerNames;
};

const TABLE_HEADERS = [
  "Invoice ID",
  "Customer Name",
  "Description",
  "Due Date",
  "Total Amount",
  "Status",
  "Actions",
] as const;

const InvoiceTable = ({ invoices, customerNames }: InvoiceTableProps) => {
  const [optimisticInvoices, addOptimisticUpdate] = useOptimistic(
    invoices as OptimisticInvoice[],
    (state: OptimisticInvoice[], action: OptimisticAction) => {
      return state.map((invoice) =>
        invoice.id === action.id
          ? { ...invoice, actionStatus: action.status }
          : invoice
      );
    }
  );

  return (
    <Table id="invoice-table">
      <TableHeader>
        <TableRow>
          {TABLE_HEADERS.map((header) => (
            <TableHead key={header}>{header}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {optimisticInvoices.map((invoice) => (
          <TableRow
            key={invoice.id}
            className={cn(
              "transition-all duration-300",
              invoice.actionStatus === "deleting" && "bg-muted opacity-50"
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
                customerNames={customerNames}
                doOptimisticUpdate={addOptimisticUpdate}
                invoice={invoice}
              />
            </TableCell>
            {invoice.actionStatus && (
              <TableCell>
                <Badge variant="destructive">{invoice.actionStatus}</Badge>
              </TableCell>
            )}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;