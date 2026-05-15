import { Stack } from "expo-router";
import { supabase } from "../constants/Supabase";
import { useEffect, useState } from "react";
import { initializeDatabase } from "../services/Database";

export default function RootLayout() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    //Verificam sesiunea la pornire
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsLoggedIn(!!session);
    });

    //Ascultam schimbarile de autentificare
    supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
    });

    //Initializam baza de date imediat ce porneste aplicatia
    initializeDatabase();
  }, []);

  return (
    <Stack screenOptions={{ headerShown: false }}>
      {isLoggedIn ? (
        //Daca utilizatorul este autentificat, afisam grupul de tabs
        <Stack.Screen name="(tabs)" />
      ) : (
        //Daca nu este autentificat, afisam ecranul de login
        <Stack.Screen name="login" />
      )}
    </Stack>
  );
}
