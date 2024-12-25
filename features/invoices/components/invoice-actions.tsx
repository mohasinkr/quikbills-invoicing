"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, EditIcon, XIcon, LoaderIcon } from "lucide-react";
import { deleteInvoice } from "../actions/delete-invoice";
import { toast } from "sonner";
import { useTransition } from "react";
import { cn } from "@/lib/utils";
import { OptimisticAction } from "./invoice-table";
import DialogForm from "@/components/ui/dialog-form";
import EditInvoiceForm from "./edit-invoice-form";
import { InvoiceWithCustomer, TCustomerNames } from "@/schema/types";
import { updateInvoice } from "../actions/update-invoice";
import LoadingSpinner from "@/components/ui/loading-spinner";

interface InvoiceActionsProps {
  customerNames: TCustomerNames;
  invoice: InvoiceWithCustomer;
  doOptimisticUpdate: (action: OptimisticAction) => void;
}

const InvoiceActions = ({
  customerNames,
  invoice,
  doOptimisticUpdate,
  // isDeleting,
}: InvoiceActionsProps) => {
  const [isPendingDeletion, startDeleteTransition] = useTransition();
  const [isPendingStatusChange, startStatusTransition] = useTransition();

  async function handleDeleteInvoice() {
    if (isPendingDeletion) return;

    startDeleteTransition(async () => {
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

  async function handleMarkAsPaid() {
    console.log("handleMarkAsPaid");
    if (isPendingStatusChange) return;

    startStatusTransition(async () => {
      try {
        const response = await updateInvoice({
          id: invoice.id,
          status: "paid",
        });
        if (response.status === 200) {
          toast.success("Invoice marked as paid");
        } else {
          toast.error(`Failed to mark invoice as paid`);
        }
      } catch (error) {
        toast.error("Failed to mark invoice as paid");
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
      <Button
        variant="outline"
        size="sm"
        onClick={handleMarkAsPaid}
        disabled={isPendingDeletion}
      >
        {isPendingStatusChange ? (
          <LoadingSpinner spinnerClassName="w-4 h-4 text-black" />
        ) : (
          <CheckIcon className="h-4 w-4" />
        )}
      </Button>
      <Button
        variant="outline"
        size="sm"
        onClick={handleDeleteInvoice}
        disabled={isPendingDeletion}
        className={cn(
          "transition-all duration-200",
          isPendingDeletion && "animate-pulse"
        )}
      >
        {isPendingDeletion ? (
          <LoadingSpinner spinnerClassName="w-4 h-4 text-black" />
        ) : (
          <XIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default InvoiceActions;
