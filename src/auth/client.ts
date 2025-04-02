import { createBrowserClient } from "@supabase/ssr";

export const createClient = () => {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

  return createBrowserClient(supabaseUrl, supabaseKey, {
    cookies: {
      name: "supabase-auth-session",
      lifetime: 60 * 60 * 24 * 7, // 7 days
      domain:
        process.env.NODE_ENV === "production"
          ? new URL(process.env.NEXT_PUBLIC_SITE_URL || "").hostname
          : "localhost",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
    },
  });
};
