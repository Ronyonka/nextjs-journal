import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  process.env.SUPABASE_URL || "https://hgeznfusgysfuvvzeduz.supabase.co";
const SUPABASE_ANON_KEY =
  process.env.SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhnZXpuZnVzZ3lzZnV2dnplZHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNjQ0MjUsImV4cCI6MjA1ODY0MDQyNX0.u5Vpz5tdNpPZ1BXvlojutWEh2uVPWKKfN3ZslioQq_c";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

async function testConnection() {
  try {
    const { data, error } = await supabase.from("User").select("*").limit(1);

    if (error) {
      console.error("Error connecting to Supabase:", error.message);
    } else {
      console.log("Successfully connected to Supabase. Sample data:", data);
    }
  } catch (err) {
    console.error("Unexpected error:", err);
  }
}

testConnection();
