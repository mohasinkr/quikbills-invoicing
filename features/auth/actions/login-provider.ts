"use server";

import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function handleGithubAuth() {
  console.log("handling github auth");
  const supabase = createClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: "http://localhost:3000/api/auth/callback",
    },
  });

  if (data.url) {

    console.log(data.url, "data.url");
    redirect(data.url); // use the redirect API for your server framework
  }
} 