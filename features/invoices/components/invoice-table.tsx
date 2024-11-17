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

const InvoiceTable = ({ invoices }: { invoices: InvoiceWithCustomer[] }) => {
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
        {invoices.map((invoice) => (
          <TableRow key={invoice.id}>
            <TableCell>{invoice.id}</TableCell>
            <TableCell>{invoice.customers.name}</TableCell>
            <TableCell>{invoice.description}</TableCell>
            <TableCell>{invoice.due_date}</TableCell>
            <TableCell>₹{invoice.total || 0}</TableCell>
            <TableCell>
              <InvoiceStatusBadge status={invoice.status} />
            </TableCell>
            <TableCell>
              <InvoiceActions invoiceId={invoice.id} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default InvoiceTable;
