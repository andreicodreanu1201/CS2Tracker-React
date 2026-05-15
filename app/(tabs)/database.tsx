import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { db } from "../../services/Database";
import { useIsFocused } from "@react-navigation/native";

export default function WeaponryDatabase() {
  const [assets, setAssets] = useState<any[]>([]);
  const [searchText, setSearchText] = useState("");
  const router = useRouter();
  const isFocused = useIsFocused();

  const fetchAssets = async () => {
    const result = await db.getAllAsync(
      "SELECT * FROM weapons ORDER BY RANDOM()"
    );
    setAssets(result);
  };

  useEffect(() => {
    if (isFocused) fetchAssets();
  }, [isFocused]);

  const filteredAssets = assets.filter((asset) =>
    asset.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <View className="flex-1 bg-[#0e0e0e] pt-14">
      {/* SEARCH BAR - Identic Swift */}
      <View className="px-4 mb-6">
        <Text className="text-[#00e639] font-bold text-[10px] mb-2 tracking-widest">
          SEARCH DATABASE
        </Text>
        <View className="bg-white/5 border border-[#00e639]/30 p-3 flex-row items-center">
          <Text className="text-gray-500 mr-2 font-bold">⌕</Text>
          <TextInput
            placeholder="FILTER ASSETS..."
            placeholderTextColor="#484848"
            className="flex-1 text-white text-[12px] font-medium"
            value={searchText}
            onChangeText={setSearchText}
            autoCapitalize="none"
          />
        </View>
      </View>

      <ScrollView className="flex-1 px-4" showsVerticalScrollIndicator={false}>
        {filteredAssets.map((asset) => (
          <TouchableOpacity
            key={asset.id}
            // MODIFICARE CRITICĂ: Navigare explicită către ruta de detalii
            onPress={() => router.push(`/details/${asset.id}` as any)}
            activeOpacity={0.8}
            className="bg-[#131313] mb-[1px] flex-row items-center p-4 relative"
          >
            {/* Raritate Laterală - Identic AssetRow din Swift */}
            <View
              className="absolute left-0 top-0 bottom-0 w-[3px]"
              style={{ backgroundColor: asset.rarityColor }}
            />

            <View className="bg-black/20 p-2 mr-4">
              <Image
                source={{ uri: asset.imageURL }}
                className="w-14 h-10"
                resizeMode="contain"
              />
            </View>

            <View className="flex-1">
              <Text
                className="text-white font-bold text-[11px] uppercase tracking-tight"
                numberOfLines={1}
              >
                {asset.name}
              </Text>
              <View className="flex-row items-center mt-1">
                <View className="bg-white/10 px-2 py-[2px] mr-2">
                  <Text className="text-gray-400 font-black text-[8px] uppercase">
                    {asset.rarity}
                  </Text>
                </View>
              </View>
            </View>

            <View className="items-end">
              <Text className="text-[#00e639] font-bold text-[12px]">
                ${asset.price.toFixed(2)}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
        <View className="h-24" />
      </ScrollView>
    </View>
  );
}
