import { fetchCustomers } from "@/lib/db/customers/get-customers";
import CreateCustomerDialog from "./create-customer-dialog";
import CustomerTable from "./customer-table";

export default async function CustomerListing() {
  const customers = await fetchCustomers();

  if (!customers) {
    return <div>No invoices found</div>;
  }

  return <CustomerTable customers={customers} />;
}
