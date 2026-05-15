import { supabase } from "../constants/Supabase";

export const signIn = async (email: string, pass: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password: pass,
  });
  if (error) throw error;
  return data;
};

export const signUp = async (email: string, pass: string, fullName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password: pass,
  });

  if (error) throw error;

  if (data.user) {
    // Replicăm inserarea în tabela 'profiles' din RegisterView.swift
    const { error: profileError } = await supabase.from("profiles").insert([
      {
        id: data.user.id,
        full_name: fullName,
        deployment_region: "Europe - Core Sector",
      },
    ]);
    if (profileError) throw profileError;
  }
  return data;
};
