import { useCallback } from 'react';
import { supabase } from '@/lib/supabase';
import type { Database } from '@/types/supabase';

type Profile = Database['public']['Tables']['profiles']['Row'];
type Visualization = Database['public']['Tables']['visualizations']['Row'];

export function useSupabase() {
  const createProfile = useCallback(async (userId: string, username: string) => {
    // First check if profile already exists
    const { data: existingProfile } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single();

    if (existingProfile) {
      return existingProfile;
    }

    // Create new profile if it doesn't exist
    const { data, error } = await supabase
      .from('profiles')
      .insert([{ 
        id: userId, 
        username,
      }])
      .select()
      .single();

    if (error) {
      console.error('Profile creation error:', error);
      throw error;
    }

    return data;
  }, []);

  const getProfile = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('profiles')
      .select()
      .eq('id', userId)
      .single();

    if (error) throw error;
    return data as Profile;
  }, []);

  const updateProfile = useCallback(async (userId: string, updates: Partial<Profile>) => {
    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data as Profile;
  }, []);

  const createVisualization = useCallback(async (
    userId: string,
    question: string,
    answer: string,
    visualizationData: any
  ) => {
    const { data, error } = await supabase
      .from('visualizations')
      .insert([{
        user_id: userId,
        question,
        answer,
        visualization_data: visualizationData
      }])
      .select()
      .single();

    if (error) throw error;
    return data as Visualization;
  }, []);

  const getVisualizations = useCallback(async (userId: string) => {
    const { data, error } = await supabase
      .from('visualizations')
      .select()
      .eq('user_id', userId)
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Visualization[];
  }, []);

  const getVisualization = useCallback(async (id: string) => {
    const { data, error } = await supabase
      .from('visualizations')
      .select()
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as Visualization;
  }, []);

  return {
    createProfile,
    getProfile,
    updateProfile,
    createVisualization,
    getVisualizations,
    getVisualization,
  };
}