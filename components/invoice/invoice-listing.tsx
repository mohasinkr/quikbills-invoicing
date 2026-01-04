import ButtonWithIcon from "@/components/ui/button-with-icon";
import { fetchCustomerNames } from "@/lib/dal/customers/get-customers";
import { fetchInvoices } from "@/lib/dal/invoices/get-invoices";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import InvoiceDownload from "../pdf/invoice/download-invoice";
import InvoiceTable from "./invoice-table";

export default async function InvoiceListing() {
  // mapping the customer names to an array
  const customerNames = await fetchCustomerNames();

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
