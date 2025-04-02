"use server";

import { createClient } from "@/auth/server";
import { redirect } from "next/navigation";

export async function login(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const { auth } = await createClient();

  const { error } = await auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw error;
  }

  redirect("/");
}

export async function logout() {
  const { auth } = await createClient();

  try {
    await auth.signOut();
    redirect("/login");
  } catch (error) {
    console.error("Error during logout:", error);
    throw new Error("Failed to logout");
  }
}

export async function signup(email: string, password: string) {
  const supabase = createClient();

  const { error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || "https://your-deployed-url.vercel.app"}/login`,
    },
  });

  if (error) {
    return { error: error.message };
  }

  return {
    success: true,
    message: "Please check your email to confirm your account.",
  };
}
