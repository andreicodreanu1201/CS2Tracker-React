import { useState, useEffect } from "react";
import { db } from "../services/Database";

export const useSkins = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncAssets = async () => {
    setIsSyncing(true);
    console.log("--- SYNC ATTEMPT STARTED ---");

    try {
      const url =
        "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json";
      const response = await fetch(url);
      const data = await response.json();

      // Shuffle ALL items using Fisher-Yates
      const shuffledItems = [...data];
      for (let i = shuffledItems.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledItems[i], shuffledItems[j]] = [
          shuffledItems[j],
          shuffledItems[i],
        ];
      }

      // Pick 200 random items
      const apiSkins = shuffledItems.slice(0, 200);

      // Clear existing items so we don't accumulate thousands of random skins over time
      await db.runAsync("DELETE FROM weapons");

      for (const skin of apiSkins) {
        // Logica de preț bazată pe raritate din DashboardViewModel.swift
        const rarityName = skin.rarity?.name ?? "Unknown";
        let randomPrice = Math.random() * (9.99 - 0.5) + 0.5;

        if (rarityName === "Covert")
          randomPrice = Math.random() * (1500 - 150) + 150;
        else if (rarityName === "Classified")
          randomPrice = Math.random() * (149 - 50) + 50;
        else if (rarityName === "Restricted")
          randomPrice = Math.random() * (49 - 10) + 10;

        await db.runAsync(
          "INSERT OR REPLACE INTO weapons (id, name, rarity, rarityColor, imageURL, collection, floatValue, price) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
          [
            skin.id,
            skin.name,
            rarityName,
            skin.rarity?.color ?? "#808080",
            skin.image,
            skin.collections?.[0]?.name ?? "Global Archive", // Fallback identic cu Swift
            Math.random() * (0.08 - 0.001) + 0.001, // floatValue: Double.random(in: 0.001...0.08)
            randomPrice,
          ]
        );
      }
      console.log("--- DATABASE UPDATED ---");
    } catch (error) {
      console.error("--- DECODING ERROR: ", error);
    } finally {
      setIsSyncing(false);
    }
  };

  useEffect(() => {
    syncAssets();
  }, []);

  return { isSyncing, syncAssets };
};
