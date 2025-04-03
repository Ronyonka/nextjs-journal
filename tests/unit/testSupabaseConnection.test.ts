import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

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
