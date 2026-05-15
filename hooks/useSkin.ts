import { useState } from "react";
import { db } from "../services/Database";

export const useSkins = () => {
  const [isSyncing, setIsSyncing] = useState(false);

  const syncAssets = async () => {
    setIsSyncing(true);
    console.log("--- SYNC ATTEMPT STARTED ---");

    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/ByMykel/CSGO-API/main/public/api/en/skins.json"
      );
      const data = await response.json();

      // Mapăm datele conform modelului WeaponAsset.swift
      // Luăm primele 200 pentru a menține viteza ca în varianta Swift
      const mappedSkins = data.slice(0, 200).map((skin: any) => ({
        id: skin.id,
        name: skin.name,
        rarity: skin.rarity?.name || "Unknown",
        imageURL: skin.image,
        collection: skin.collections?.[0]?.name || "Global Archive",
        floatValue: Math.random() * 0.08,
        price:
          skin.rarity?.name === "Covert"
            ? Math.random() * (1500 - 150) + 150
            : Math.random() * 50, // Logica de preț din Swift
        rarityColor: skin.rarity?.color || "#808080",
      }));

      // Salvare în SQLite (Echivalentul modelContext.insert în SwiftData)
      const statement = await db.prepareAsync(
        "INSERT OR REPLACE INTO weapons (id, name, rarity, imageURL, collection, floatValue, price, rarityColor) VALUES (?, ?, ?, ?, ?, ?, ?, ?)"
      );

      for (const skin of mappedSkins) {
        await statement.executeAsync([
          skin.id,
          skin.name,
          skin.rarity,
          skin.imageURL,
          skin.collection,
          skin.floatValue,
          skin.price,
          skin.rarityColor,
        ]);
      }

      console.log("--- SUCCESS: DECODED " + mappedSkins.length + " ASSETS ---");
    } catch (error) {
      console.error("--- SYNC ERROR: ", error);
    } finally {
      setIsSyncing(false);
    }
  };

  return { syncAssets, isSyncing };
};
