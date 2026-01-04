"use server";

import { db } from "@/drizzle";
import type { NewInvoice } from "@/types/invoice";
import { invoices } from "@/drizzle/schemas";
import { revalidatePath } from "next/cache";

export const createInvoice = async (invoice: NewInvoice) => {
  console.log(invoice, "invoices");
  try {
    const result = await db.insert(invoices).values(invoice).returning();
    revalidatePath("/invoice");
    return { data: result, error: null };
  } catch (error) {
    console.log(error);
    throw error;
  }
};
