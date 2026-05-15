import { View, Text, TextInput } from "react-native";

interface Props {
  label: string;
  value: string;
  onChangeText: (t: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
}

export const TacticalInput = ({
  label,
  value,
  onChangeText,
  placeholder,
  secureTextEntry = false,
}: Props) => (
  <View className="mb-6 w-full">
    <Text className="text-[#acabaa] font-bold text-[10px] tracking-[1.5px] mb-2 uppercase">
      {label}
    </Text>
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      placeholderTextColor="rgba(255,255,255,0.2)"
      secureTextEntry={secureTextEntry}
      className="text-white text-[14px] py-3 border-b border-[#484848]"
      autoCapitalize="none"
    />
  </View>
);
