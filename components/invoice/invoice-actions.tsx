"use client";

import { deleteInvoice } from "@/actions/invoice/delete-invoice";
import { updateInvoice } from "@/actions/invoice/update-invoice";
import { Button } from "@/components/ui/button";
import DialogForm from "@/components/ui/dialog-form";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { cn } from "@/lib/utils";
import { TCustomerNames } from "@/types/customer";
import { InvoiceWithCustomer } from "@/types/invoice";
import { CheckIcon, EditIcon, TicketX, XIcon } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";
import EditInvoiceForm from "./edit-invoice-form";
import { OptimisticAction } from "./invoice-table";

interface InvoiceActionsProps {
  customerNames: TCustomerNames;
  invoice: InvoiceWithCustomer;
  doOptimisticUpdate: (action: OptimisticAction) => void;
}

const InvoiceActions = ({
  customerNames,
  invoice,
  doOptimisticUpdate,
}: InvoiceActionsProps) => {
  const [isPendingDelete, startDeleteTransition] = useTransition();
  const [isPendingStatusChange, startStatusTransition] = useTransition();

  const handleDeleteInvoice = () => {
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
  };

  const handleInvoiceStatusChange = (status: "paid" | "unpaid") => {
    startStatusTransition(async () => {
      try {
        const response = await updateInvoice({ id: invoice.id, status });
        if (response.status === 200) {
          toast.info(`Invoice marked as ${status}`);
        } else {
          throw new Error("Failed to update invoice status");
        }
      } catch (error) {
        toast.error("Failed to update invoice status");
      }
    });
  };

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
      {invoice.status !== "paid" ? (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleInvoiceStatusChange("paid")}
          disabled={isPendingStatusChange}
        >
          {isPendingStatusChange ? (
            <LoadingSpinner spinnerClassName="w-4 h-4 text-black" />
          ) : (
            <CheckIcon className="h-4 w-4" />
          )}
        </Button>
      ) : (
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleInvoiceStatusChange("unpaid")}
          disabled={isPendingStatusChange}
        >
          {isPendingStatusChange ? (
            <LoadingSpinner spinnerClassName="w-4 h-4 text-black" />
          ) : (
            <TicketX className="h-4 w-4" />
          )}
        </Button>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handleDeleteInvoice}
        disabled={isPendingDelete}
        className={cn(
          "transition-all duration-200",
          isPendingDelete && "animate-pulse"
        )}
      >
        {isPendingDelete ? (
          <LoadingSpinner spinnerClassName="w-4 h-4 text-black" />
        ) : (
          <XIcon className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
};

export default InvoiceActions;
