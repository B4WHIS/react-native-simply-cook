import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF9" }}>
      <View className="flex-1 items-center justify-center p-6">
        <View className="w-16 h-16 rounded-full bg-[#FFE69B]/50 items-center justify-center mb-4 border border-[#FFB873]/30">
          <Ionicons name="search" size={32} color="#FFA927" />
        </View>
        <Text
          className="text-2xl font-bold text-ink mb-2"
          style={{ fontFamily: "FZPoppins-Bold" }}
        >
          Khám phá công thức
        </Text>
        <Text
          className="text-sm text-muted text-center"
          style={{ fontFamily: "FZPoppins-Regular" }}
        >
          Tìm kiếm hàng trăm món ngon hấp dẫn cho bữa cơm gia đình bạn.
        </Text>
      </View>
    </SafeAreaView>
  );
}
