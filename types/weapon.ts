export interface WeaponAsset {
  id: string; // @Attribute(.unique)
  name: string;
  rarity: string;
  imageURL: string;
  collection: string;
  floatValue: number;
  isFavorite: boolean;
  price: number;
  rarityColor: string; // Codul HEX extras din API
}
