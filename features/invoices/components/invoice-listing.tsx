import { InvoiceWithCustomer } from "@/schema/types";
import CreateInvoiceDialog from "./create-invoice-dialog";
import InvoiceTable from "./invoice-table";

export default function InvoiceListing({
  invoices,
}: {
  invoices: InvoiceWithCustomer[];
}) {
  const componentType = typeof window === "undefined" ? "server" : "client";
  console.log(componentType, "::invoice listing");
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-primary">Invoices</h1>
      </header>
      <CreateInvoiceDialog />
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
