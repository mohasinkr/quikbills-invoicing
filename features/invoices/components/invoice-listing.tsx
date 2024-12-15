import { InvoiceWithCustomer } from "@/schema/types";
import CreateInvoiceDialog from "./create-invoice-dialog";
import InvoiceTable from "./invoice-table";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";

export default function InvoiceListing({
  invoices,
}: {
  invoices: InvoiceWithCustomer[];
}) {
  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold text-primary">Invoices</h1>
        <Button>
          <LogOutIcon /> Logout
        </Button>
      </header>
      <CreateInvoiceDialog />
      <InvoiceTable invoices={invoices} />
    </div>
  );
}
