"use server";

import { createClient } from "@/utils/supabase/server";

export const invoiceDownload = async () => {
  const supabase = await createClient();
};
