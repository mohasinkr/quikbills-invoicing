"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, EditIcon, XIcon } from "lucide-react";
import { deleteInvoice } from "../actions/delete-invoice";
import { toast } from "sonner";
import { revalidatePath } from "next/cache";

const InvoiceActions = ({ invoiceId }: { invoiceId: number }) => {
  async function handleDeleteInvoice() {
    const response = await deleteInvoice(invoiceId);
    console.log(response);
    if (response.status === 204) {
      toast.message("Invoice deleted successfully");
    }
  }

  return (
    <div className="flex space-x-2">
      <Button
        variant="outline"
        size="sm"
        //   onClick={() => onEditInvoice(invoiceId)}
      >
        <EditIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        //  onClick={() => onMarkPaid(invoiceId)}
      >
        <CheckIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm" onClick={handleDeleteInvoice}>
        <XIcon className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default InvoiceActions;
