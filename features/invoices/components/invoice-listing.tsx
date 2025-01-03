import { InvoiceWithCustomer } from "@/schema/types";
import CreateInvoiceDialog from "./create-invoice-dialog";
import InvoiceTable from "./invoice-table";
import { Button } from "@/components/ui/button";
import { LogOutIcon } from "lucide-react";
import { getCustomers } from "@/lib/db/customers/get-customers";
import DownloadInvoice from "./download-as-pdf";
import { logout } from "@/features/auth/actions/logout";
import LogoutButton from "@/components/common/logout-button";

export default async function InvoiceListing({
  invoices,
}: {
  invoices: InvoiceWithCustomer[];
}) {
  // mapping the customer names to an array
  const customerNames = (await getCustomers(["name", "customer_id"])).map(
    (customer) => ({ name: customer.name, value: customer.customer_id })
  );

  return (
    <div className="container mx-auto p-4">
      <header className="mb-8 flex justify-between">
        <h1 className="text-3xl font-bold text-primary">Invoices</h1>
        {/* <Button>
          <LogOutIcon /> Logout
        </Button> */}
        <LogoutButton />
      </header>
      <section className="flex gap-x-4">
        <CreateInvoiceDialog customerNames={customerNames}/>
        <DownloadInvoice />
      </section>
      <InvoiceTable invoices={invoices} customerNames={customerNames}/>
    </div>
  );
}
