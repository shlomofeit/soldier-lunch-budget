import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";

dotenv.config();

export async function supa() {
  try {
    await createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY);
    console.log("Connected to supabase...");
  } catch (error) {
    const error = new Error("Connection to DB failed");
    throw error;
  }
}
