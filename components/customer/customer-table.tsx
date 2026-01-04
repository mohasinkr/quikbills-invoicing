"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CustomerTableRow from "./customer-table-row";
import { Customer } from "@/types/customer";

export const CustomerTable = ({ customers }: { customers: Customer[] }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Company Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <CustomerTableRow
              key={customer.customerId}
              customer={customer}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
