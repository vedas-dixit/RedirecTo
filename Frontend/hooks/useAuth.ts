// hooks/useAuth.ts
import { useState, useEffect } from "react";
import { User, Session } from "@supabase/supabase-js";
import { supabase } from "../lib/supabaseClient";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      console.log(session);
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
    };

    getSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      setUser(session?.user ?? null);
      setSession(session);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  // Helper functions to access tokens
  const getAccessToken = () => session?.access_token ?? null;
  const getRefreshToken = () => session?.refresh_token ?? null;
  
  // Helper to check if token is expired
  const isTokenExpired = () => {
    if (!session?.expires_at) return true;
    return Date.now() >= session.expires_at * 1000;
  };

  // Helper to refresh the session
  const refreshSession = async () => {
    const { data, error } = await supabase.auth.refreshSession();
    if (error) {
      console.error('Error refreshing session:', error);
      return false;
    }
    return true;
  };

  return { 
    user, 
    session,
    loading, 
    signOut,
    getAccessToken,
    getRefreshToken,
    isTokenExpired,
    refreshSession
  };
};