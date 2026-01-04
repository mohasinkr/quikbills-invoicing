"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { TableCell, TableRow } from "@/components/ui/table";
import type { Customer } from "@/types/customer";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { useState } from "react";
import EditCustomerModal from "./edit-customer-modal";
import DeleteCustomerModal from "./delete-customer-modal";

interface CustomerTableRowProps {
  customer: Customer;
  onDelete: (id: string) => void;
}

export default function CustomerTableRow({
  customer,
  onDelete,
}: CustomerTableRowProps) {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);

  return (
    <>
      <TableRow>
        <TableCell className="font-medium">{customer?.name || "-"}</TableCell>
        <TableCell>{customer?.email || "-"}</TableCell>
        <TableCell>{customer?.phone || "-"}</TableCell>
        <TableCell>
          <div className="flex items-center">
            <div
              className={cn(
                "mr-2 h-2 w-2 rounded-full",
                customer.status === "active" ? "bg-green-500" : "bg-red-500"
              )}
            />
            {customer?.status}
          </div>
        </TableCell>
        <TableCell>
          {customer?.lastPurchase
            ? // eg: Jan 12, 2025, 2:50 AM
              format(new Date(customer?.lastPurchase), "PPp")
            : "-"}
        </TableCell>
        <TableCell>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setEditModalOpen(true)}>
                Edit
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive"
                onClick={() => setDeleteModalOpen(true)}
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <EditCustomerModal
        customer={customer}
        open={editModalOpen}
        onOpenChange={setEditModalOpen}
      />

      <DeleteCustomerModal
        customer={customer}
        open={deleteModalOpen}
        onOpenChange={setDeleteModalOpen}
        onConfirm={() => {
          onDelete(customer?.customerId);
          setDeleteModalOpen(false);
        }}
      />
    </>
  );
}
