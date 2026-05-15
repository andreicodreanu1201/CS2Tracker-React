import { View, Text, TouchableOpacity } from "react-native";
import { supabase } from "../../constants/Supabase";

export default function HomeTab() {
  return (
    <View className="flex-1 bg-[#0e0e0e] items-center justify-center">
      <Text className="text-[#00e639] font-bold text-xl mb-4">TACTICAL COMMAND CENTER</Text>
      <Text className="text-white mb-8">Access Granted. Operator is Online.</Text>
      <TouchableOpacity 
        onPress={() => supabase.auth.signOut()}
        className="bg-red-600 px-6 py-3"
      >
        <Text className="text-white font-bold">TERMINATE CONNECTION (Logout)</Text>
      </TouchableOpacity>
    </View>
  );
}
