"use client";

import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { TCustomerNames } from "@/types/customer";
import { InvoiceWithCustomer } from "@/types/invoice";
import { moneyFormatter } from "@/utils/format-money";
import { useOptimistic } from "react";
import InvoiceActions from "./invoice-actions";
import InvoiceStatusBadge from "./invoice-status-badge";

export type OptimisticAction = {
  type: "DELETE" | "UPDATE";
  id: number;
  status?: string;
};

type OptimisticInvoice = {
  actionStatus?: string;
} & InvoiceWithCustomer;

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
            <TableCell>INV-{invoice.id}</TableCell>
            <TableCell>{invoice.customer.name}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.dueDate}</TableCell>
            <TableCell>
              {moneyFormatter(parseFloat(invoice.total.toFixed(2))) || 0}
            </TableCell>
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
