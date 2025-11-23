import { fetchCustomers } from "@/lib/db/customers/get-customers";
import { fetchInvoices } from "@/lib/db/invoices/get-invoices";
import InvoiceDownload from "../pdf/invoice/download-invoice";
import CreateInvoiceDialog from "./create-invoice-dialog";
import InvoiceTable from "./invoice-table";

export default async function InvoiceListing() {
  // mapping the customer names to an array
  const customerNames = (await fetchCustomers(["name", "customer_id"]))
    .filter((customer) => customer.name !== null)
    .map((customer) => ({ name: customer.name!, value: customer.customer_id }));

  const invoices = await fetchInvoices();
  if (!invoices) {
    return <div>No invoices found</div>;
  }

  console.log(invoices, "invoices");

  return (
    <>
      <section className="mb-5 flex gap-x-4">
        <CreateInvoiceDialog customerNames={customerNames} />
        <InvoiceDownload invoices={invoices} />
      </section>
      <InvoiceTable invoices={invoices} customerNames={customerNames} />
    </>
  );
}
