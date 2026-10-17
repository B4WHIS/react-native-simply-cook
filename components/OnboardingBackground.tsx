import { View } from "react-native";

export function OnboardingBackground() {
  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      {/* Top-left organic accent */}
      <View className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-[#FFE9B8]/80" />
      {/* Bottom-right organic accent */}
      <View className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-[#FFE9B8]/80" />
    </View>
  );
}
