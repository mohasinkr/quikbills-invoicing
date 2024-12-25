"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

const UpdateInvoiceSchema = z.object({
  id: z.number(),
  description: z.string().min(1, "Description is required"),
  unit_price: z.number().min(0, "Unit price must be positive"),
  quantity: z.number().min(1, "Quantity must be at least 1"),
  total: z.number().min(0, "Total must be positive"),
  due_date: z.string(),
  status: z.enum(["paid", "unpaid", "overdue"]),
  customer_id: z.string().min(1, "Customer is required"),
});

export async function updateInvoice(values: z.infer<typeof UpdateInvoiceSchema>) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from("invoices")
    .update(values)
    .eq("id", values.id);

  if (error) {
    throw error;
  }

  revalidatePath("/invoice");
  return { status: 200 };
} 