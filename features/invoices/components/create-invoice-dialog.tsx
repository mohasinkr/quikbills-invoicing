import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import CreateInvoiceForm from "./create-invoice-form";
import { getCustomers } from "@/features/customers/actions/get-customers";

const CreateInvoiceDialog = async () => {
  // mapping the customer names to an array
  const customerNames = (await getCustomers(["name", "customer_id"])).map(
    (customer) => ({ name: customer.name, value: customer.customer_id })
  );

  const componentType = typeof window === "undefined" ? "server" : "client";
  console.log(componentType, "::invoice dialog component");

  return (
    <Dialog>
      <DialogTrigger asChild className="mb-4">
        <Button>
          <PlusIcon className="mr-2 h-4 w-4" /> Create New Invoice
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Invoice</DialogTitle>
        </DialogHeader>
        <CreateInvoiceForm customerNames={customerNames} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
