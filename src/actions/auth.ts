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
