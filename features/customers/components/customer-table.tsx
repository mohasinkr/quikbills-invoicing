import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { fetchCustomers } from "@/lib/db/customers/get-customers";
import CustomerTableRow from "./customer-table-row";

export const CustomerTable = async () => {
  const customers = await fetchCustomers();

  const handleDeleteCustomer = (id: string) => {};

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
              key={customer.customer_id}
              customer={customer}
              onDelete={handleDeleteCustomer}
            />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default CustomerTable;
