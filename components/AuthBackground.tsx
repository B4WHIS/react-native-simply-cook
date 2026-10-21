import { View } from "react-native";

export function AuthBackground() {
  return (
    <View pointerEvents="none" className="absolute inset-0 overflow-hidden">
      {/* Top-left organic accent wave */}
      <View className="absolute -top-[70px] -left-[70px] w-[220px] h-[220px] rounded-full bg-[#FFEAB6] opacity-75" />
      {/* Top-left floating pill dot */}
      <View className="absolute top-[65px] left-[42px] w-[13px] h-[24px] rounded-[7px] bg-[#FED885] rotate-[42deg]" />

      {/* Bottom-right organic accent wave */}
      <View className="absolute -bottom-[80px] -right-[80px] w-[250px] h-[250px] rounded-full bg-[#FFEAB6] opacity-75" />
      {/* Bottom-right floating pill dot */}
      <View className="absolute bottom-[78px] right-[48px] w-[13px] h-[24px] rounded-[7px] bg-[#FED885] rotate-[42deg]" />

      {/* Bottom-left floating pill dot */}
      <View className="absolute bottom-[45px] left-[20px] w-[11px] h-[22px] rounded-[6px] bg-[#FED885] opacity-65 rotate-45" />
    </View>
  );
}
