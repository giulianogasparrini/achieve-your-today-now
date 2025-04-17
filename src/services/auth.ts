
import { supabase } from "@/integrations/supabase/client";
import { Provider } from "@supabase/supabase-js";

export interface User {
  id: string;
  firstName: string;
  email: string;
  avatarUrl?: string;
}

export const signInWithSocial = async (provider: Provider) => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + '/auth/callback'
    }
  });
  
  if (error) throw error;
  return data;
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
};

export const getCurrentSession = async () => {
  const { data: { session }, error } = await supabase.auth.getSession();
  if (error) throw error;
  return session;
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
};

export const isAuthenticated = async () => {
  const session = await getCurrentSession();
  return !!session;
};
