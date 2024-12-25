"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, EditIcon, XIcon, LoaderIcon } from "lucide-react";
import { deleteInvoice } from "../actions/delete-invoice";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { OptimisticAction } from "./invoice-table";
import DialogForm from "@/components/ui/dialog-form";
import EditInvoiceForm from "./edit-invoice-form";
import { InvoiceWithCustomer, TCustomerNames } from "@/schema/types";

interface InvoiceActionsProps {
  customerNames: TCustomerNames;
  invoice: InvoiceWithCustomer;
  doOptimisticUpdate: (action: OptimisticAction) => void;
  isDeleting?: boolean;
}

const InvoiceActions = ({
  customerNames,
  invoice,
  doOptimisticUpdate,
  isDeleting,
}: InvoiceActionsProps) => {
  const [isPendingTransition, startTransition] = useTransition();

  async function handleDeleteInvoice() {
    if (isDeleting || isPendingTransition) return;

    startTransition(async () => {
      doOptimisticUpdate({
        type: "DELETE",
        id: invoice.id,
        status: "deleting",
      });

      try {
        const response = await deleteInvoice(invoice.id);
        if (response.status === 204) {
          toast.success("Invoice deleted successfully");
        } else {
          toast.error(`Failed to delete invoice`);
        }
      } catch (error) {
        doOptimisticUpdate({
          type: "DELETE",
          id: invoice.id,
          status: undefined,
        });
        toast.error("Failed to delete invoice");
      }
    });
  }

  return (
    <div className="flex space-x-2">
      <DialogForm
        title="Edit Invoice"
        trigger={
          <Button variant="outline" size="sm">
            <EditIcon className="h-4 w-4" />
          </Button>
        }
        form={
          <EditInvoiceForm invoice={invoice} customerNames={customerNames} />
        }
      />
      <Button variant="outline" size="sm" >
        <CheckIcon className="h-4 w-4" />
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDeleteInvoice}
        disabled={isDeleting || isPendingTransition}
        className={cn(
          "transition-all duration-200",
          isDeleting && "animate-pulse"
        )}
      >
        {isDeleting ? (
          <LoaderIcon className="h-4 w-4 animate-spin" />
        ) : (
          <XIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default InvoiceActions;
