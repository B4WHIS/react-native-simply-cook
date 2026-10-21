import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { useUser, useClerk } from "@clerk/expo";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";

export default function ProfileScreen() {
  const router = useRouter();
  const { user } = useUser();
  const { signOut } = useClerk();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF9" }}>
      <View className="flex-1 items-center justify-center p-6">
        <View className="w-24 h-24 rounded-full bg-[#FFE69B] items-center justify-center mb-4 border-2 border-[#FEB11F] overflow-hidden shadow-sm">
          <Image
            source={images.authChick}
            style={{ width: 70, height: 70 }}
            resizeMode="contain"
          />
        </View>
        <Text
          className="text-2xl font-bold text-ink mb-1"
          style={{ fontFamily: "FZPoppins-Bold" }}
        >
          {user?.fullName || "Bếp Trưởng Tập Sự"}
        </Text>
        <Text
          className="text-sm text-muted mb-8"
          style={{ fontFamily: "FZPoppins-Regular" }}
        >
          {user?.primaryEmailAddress?.emailAddress || "Chưa có email"}
        </Text>

        {/* Developer Design System Link */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => router.push("/design-system")}
          className="w-full max-w-[280px] py-3.5 px-4 mb-4 rounded-2xl bg-white border border-[#E5E7EB] flex-row items-center justify-between shadow-xs"
        >
          <View className="flex-row items-center gap-2.5">
            <Ionicons name="color-palette-outline" size={20} color="#FFA927" />
            <Text
              className="text-sm font-semibold text-ink"
              style={{ fontFamily: "FZPoppins-SemiBold" }}
            >
              Design System Spec
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={18} color="#9CA3AF" />
        </TouchableOpacity>

        {/* Sign Out Button */}
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => signOut()}
          className="w-full max-w-[280px] py-3.5 rounded-full bg-white border border-[#E5E7EB] items-center justify-center shadow-xs"
        >
          <Text
            className="text-sm font-semibold text-error"
            style={{ fontFamily: "FZPoppins-SemiBold" }}
          >
            Đăng xuất
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
