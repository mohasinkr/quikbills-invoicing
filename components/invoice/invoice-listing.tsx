import { fetchCustomers } from "@/lib/db/customers/get-customers";
import { fetchInvoices } from "@/lib/db/invoices/get-invoices";
import ButtonWithIcon from "@/components/ui/button-with-icon";
import InvoiceDownload from "../pdf/invoice/download-invoice";
import InvoiceTable from "./invoice-table";
import { PlusIcon } from "lucide-react";
import Link from "next/link";

export default async function InvoiceListing() {
  // mapping the customer names to an array
  const customerNames = (await fetchCustomers(["name", "customer_id"]))
    .filter((customer) => customer.name !== null)
    .map((customer) => ({ name: customer.name!, value: customer.customer_id }));

  const invoices = await fetchInvoices();
  if (!invoices) {
    return <div>No invoices found</div>;
  }

  return (
    <>
      <section className="mb-5 flex gap-x-4">
        <Link href="/invoice/create">
          <ButtonWithIcon icon={PlusIcon}>Create Invoice</ButtonWithIcon>
        </Link>
        <InvoiceDownload invoices={invoices} />
      </section>
      <InvoiceTable invoices={invoices} customerNames={customerNames} />
    </>
  );
}
