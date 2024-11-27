"use client";

import { Button } from "@/components/ui/button";
import { CheckIcon, EditIcon, XIcon, LoaderIcon } from "lucide-react";
import { deleteInvoice } from "../actions/delete-invoice";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { cn } from "@/lib/utils";
import { OptimisticAction } from "./invoice-table";

interface InvoiceActionsProps {
  invoiceId: number;
  doOptimisticUpdate: (action: OptimisticAction) => void;
  isDeleting?: boolean;
}

const InvoiceActions = ({ 
  invoiceId, 
  doOptimisticUpdate,
  isDeleting 
}: InvoiceActionsProps) => {
  const [isPending, setIsPending] = useState(false);
  const [isPendingTransition, startTransition] = useTransition();

  async function handleDeleteInvoice() {
    if (isDeleting || isPending) return;
    
    setIsPending(true);
    try {
      startTransition(() => {
        doOptimisticUpdate({
          type: 'DELETE',
          id: invoiceId,
          status: 'deleting'
        });
      });

      const response = await deleteInvoice(invoiceId);

      if (response.status === 204) {
        toast.success("Invoice deleted successfully");
      }
    } catch (error) {
      startTransition(() => {
        doOptimisticUpdate({
          type: 'DELETE',
          id: invoiceId,
          status: undefined
        });
      });
      toast.error("Failed to delete invoice");
    } finally {
      setIsPending(false);
    }
  }

  return (
    <div className="flex space-x-2">
      <Button variant="outline" size="sm">
        <EditIcon className="h-4 w-4" />
      </Button>
      <Button variant="outline" size="sm">
        <CheckIcon className="h-4 w-4" />
      </Button>
      <Button 
        variant="outline" 
        size="sm" 
        onClick={handleDeleteInvoice}
        disabled={isDeleting || isPending || isPendingTransition}
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
