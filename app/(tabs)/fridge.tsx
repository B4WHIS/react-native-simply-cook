import React from "react";
import { View, Text, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { images } from "@/constants/images";

export default function FridgeScreen() {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF9" }}>
      <View className="flex-1 items-center justify-center p-6">
        <Image
          source={images.emptyFridge}
          style={{ width: 140, height: 140, marginBottom: 16 }}
          resizeMode="contain"
        />
        <Text
          className="text-2xl font-bold text-ink mb-2"
          style={{ fontFamily: "FZPoppins-Bold" }}
        >
          Tủ lạnh thông minh
        </Text>
        <Text
          className="text-sm text-muted text-center max-w-[280px]"
          style={{ fontFamily: "FZPoppins-Regular" }}
        >
          Chọn nguyên liệu có sẵn trong tủ lạnh để gợi ý món ăn ngay tức thì!
        </Text>
      </View>
    </SafeAreaView>
  );
}
