"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Customer } from "@/types/customer";
import { useActionState } from "react";
import LoadingSpinner from "@/components/ui/loading-spinner";
import { deleteCustomer } from "@/actions/customer/delete-customer";
import { toast } from "sonner";

interface DeleteCustomerModalProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const DeleteCustomerModal = ({
  customer,
  open,
  onOpenChange
}: DeleteCustomerModalProps) => {
  const deleteAction = async (prevState: any, formData: FormData) => {
    if (!customer?.customerId) return prevState;

    try {
      await deleteCustomer(customer.customerId);
      toast.success("Customer deleted successfully");
      onOpenChange(false);
      return { success: true };
    } catch (error) {
      console.error("Error deleting customer:", error);
      toast.error("Failed to delete customer. Please try again.");
      return { success: false, error: "Failed to delete customer" };
    }
  };

  const [state, action, isPending] = useActionState(deleteAction, null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Customer</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete the customer{" "}
            <span className="font-semibold">{customer?.name}</span>? This action cannot be undone and will permanently remove all associated data.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
            Cancel
          </Button>
          <form action={action}>
            <Button
              type="submit"
              variant="destructive"
              disabled={isPending || !customer?.customerId}
            >
              {isPending ? (
                <LoadingSpinner label="Deleting Customer" />
              ) : (
                "Delete Customer"
              )}
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteCustomerModal;
