import { supabase } from "@/lib/supabaseClient";

export async function LoginWithGoogle() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "google",
  });
  if (error) {
    console.error("Google login error:", error.message);
  }
}

export async function LoginWithGithub() {
  const { error } = await supabase.auth.signInWithOAuth({
    provider: "github",
  });
  if (error) {
    console.error("GitHub login error:", error.message);
  }
}
