import { Stack, useRouter, useSegments } from "expo-router";
import { supabase } from "../constants/Supabase";
import { useEffect, useState } from "react";
import { initializeDatabase } from "../services/Database";
import "../global.css";

export default function RootLayout() {
  const [isInitialized, setIsInitialized] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Verificam sesiunea la pornire
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
      setIsInitialized(true);
    });

    // Ascultam schimbarile de autentificare
    supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    // Initializam baza de date
    initializeDatabase();
  }, []);

  useEffect(() => {
    if (!isInitialized) return;
    if (!segments || !segments[0]) return;

    const inUnauthGroup = segments[0] === "login" || segments[0] === "register";

    if (isLoggedIn && inUnauthGroup) {
      router.replace("/(tabs)");
    } else if (!isLoggedIn && !inUnauthGroup) {
      router.replace("/login");
    }
  }, [isLoggedIn, isInitialized, segments]);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="login" />
      <Stack.Screen name="register" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="details/[id]" />
    </Stack>
  );
}
