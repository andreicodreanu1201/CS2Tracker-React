import * as SQLite from "expo-sqlite";

// Deschidem baza de date locală
export const db = SQLite.openDatabaseSync("cs2_tactical_db");

export const initializeDatabase = async () => {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS weapons (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      rarity TEXT NOT NULL,
      imageURL TEXT NOT NULL,
      collection TEXT NOT NULL,
      floatValue REAL NOT NULL,
      price REAL NOT NULL,
      rarityColor TEXT NOT NULL,
      isFavorite INTEGER DEFAULT 0
    );
  `);
  console.log("--- SQLITE INITIALIZED ---");
};
