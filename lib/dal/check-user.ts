import { createClient } from "@/utils/supabase/server";

export const checkUser = async () => {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();

  if (error || !data?.claims) {
    throw new Error("Unauthorized. Invalid or expired session.");
  }

  return {
    userId: data.claims.sub!,
    email: data.claims.email!,
  };
};
