"use server";

import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const UpdateInvoiceSchema = z.object({
  id: z.number(),
  unit_price: z.number().min(0.0).optional(),
  description: z.string().optional(),
  quantity: z.number().min(1).optional(),
  total: z.number().min(0.0).optional(),
  dueDate: z.string().optional(),
  status: z.enum(["paid", "unpaid", "overdue"]).optional(),
  customerId: z.string().optional(),
});

export async function updateInvoice(
  values: z.infer<typeof UpdateInvoiceSchema>
) {
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
