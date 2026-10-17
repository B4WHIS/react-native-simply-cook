import { OnboardingBackground } from "@/components/OnboardingBackground";
import { images } from "@/constants/images";
import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function OnboardingScreen() {
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFDF8" }} edges={["top", "bottom"]}>
      <StatusBar style="dark" />
      <OnboardingBackground />

      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 24,
          paddingTop: 8,
          paddingBottom: 20,
        }}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        {/* Top Header: Logo + App Name */}
        <View className="flex-row items-center justify-center mt-2">
          <View className="w-12 h-12 rounded-full overflow-hidden bg-[#FFF9EE] mr-2.5 border border-[#FFE69B] items-center justify-center">
            <Image
              source={images.logo}
              style={{ width: 40, height: 40 }}
              resizeMode="contain"
              accessibilityLabel="Simply Cook logo"
            />
          </View>
          <View className="justify-center">
            <Text className="font-bold text-xl text-ink leading-6 tracking-tight">
              Simply Cook
            </Text>
            
          </View>
        </View>

        {/* Center Section: Hero Illustration + Title + Subtitle */}
        <View className="w-full items-center my-auto py-2">
          <Image
            source={images.onboardingHero}
            style={{ width: 330, height: 260, maxWidth: "100%" }}
            resizeMode="contain"
            accessibilityLabel="Cooking hero illustration"
          />

          <View className="items-center px-4 mt-4 max-w-[340px]">
            <Text className="font-bold text-3xl text-ink text-center tracking-tight">
              Nấu ngon
            </Text>
            <Text className="font-bold text-3xl text-[#FEB11F] text-center tracking-tight mt-0.5">
              mỗi ngày
            </Text>
            <Text className="font-regular text-sm leading-5 text-muted text-center mt-2 px-1">
              {"Công thức đơn giản, nguyên liệu dễ tìm,\nbiến bữa ăn thành niềm vui."}
            </Text>
          </View>
        </View>

        {/* Bottom Section: CTA Button */}
        <View className="w-full max-w-[360px] px-2 mb-2">
          <TouchableOpacity
            activeOpacity={0.88}
            onPress={() => router.push("/")}
            className="w-full h-14 rounded-full bg-[#FEB11F] flex-row items-center justify-center shadow-lg shadow-amber-500/30"
          >
            <Text className="font-bold text-base text-white mr-2">
              Bắt đầu ngay
            </Text>
            <Feather name="arrow-right" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
