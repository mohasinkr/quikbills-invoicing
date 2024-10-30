import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import React from "react";
import CreateInvoiceForm from "./create-invoice-form";

const CreateInvoiceDialog = () => {
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
        <CreateInvoiceForm />
      </DialogContent>
    </Dialog>
  );
};

export default CreateInvoiceDialog;
