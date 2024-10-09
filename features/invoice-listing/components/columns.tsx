"use client";

import { ColumnDef } from "@tanstack/react-table";
import { z } from "zod";

const PaymentSchema = z.object({
    id: z.string(),
    amount: z.number(),
    status: z.enum(["pending", "processing", "success", "failed"]),
    email: z.string(),
})

export type Payment = z.infer<typeof PaymentSchema>;

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
