"use server";

import { createClient } from "@/auth/server";
import { prisma } from "@/db/prisma";
import { handleError } from "@/lib/utils";
import { withRetry } from "@/lib/withRetry";

export const loginAction = async (email: string, password: string) => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const logOutAction = async () => {
  try {
    const { auth } = await createClient();

    const { error } = await auth.signOut();
    if (error) throw error;

    return { errorMessage: null };
  } catch (error) {
    return handleError(error);
  }
};

export const signUpAction = async (
  email: string,
  password: string,
  name: string,
) => {
  try {
    const { auth } = await createClient();

    const { data, error } = await auth.signUp({
      email,
      password,
      options: {
        data: { name }, // Save the name in Supabase's user metadata
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/login`,
      },
    });
    if (error) throw error;

    const userId = data.user?.id;
    if (!userId) throw new Error("No user ID returned");

    // Save the user in your database
    await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
      },
    });

    return { redirectTo: "/signup-confirmation" };
  } catch (error) {
    return handleError(error);
  }
};
