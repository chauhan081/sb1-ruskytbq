import { useState, useEffect } from 'react';
import { AuthError, User, Provider } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { useSupabase } from './useSupabase';

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { createProfile } = useSupabase();

  useEffect(() => {
    // Check active sessions and sets the user
    const getSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        setUser(session?.user ?? null);
      } catch (error) {
        console.error('Session error:', error);
      } finally {
        setLoading(false);
      }
    };

    getSession();

    // Listen for changes on auth state (signed in, signed out, etc.)
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signInWithProvider = async (provider: Provider) => {
    try {
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/dashboard`
        }
      });

      if (error) throw error;
      return data;
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error('Failed to sign in with provider');
      }
      throw error;
    }
  };

  const signUp = async (email: string, password: string, username: string) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username
          }
        }
      });

      if (error) throw error;

      if (data.user) {
        try {
          await createProfile(data.user.id, username);
          return data.user;
        } catch (profileError) {
          // If profile creation fails, clean up the auth user
          await supabase.auth.signOut();
          throw new Error('Failed to create user profile');
        }
      }

      return null;
    } catch (error) {
      if (error instanceof AuthError) {
        if (error.message.includes('already registered')) {
          throw new Error('An account with this email already exists');
        }
      }
      throw error;
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === 'Invalid login credentials') {
          throw new Error('Invalid email or password');
        }
        throw error;
      }

      return data.user;
    } catch (error) {
      if (error instanceof AuthError) {
        throw new Error('Invalid email or password');
      }
      throw error;
    }
  };

  const signOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  };

  return {
    user,
    loading,
    signIn,
    signUp,
    signOut,
    signInWithProvider,
  };
}