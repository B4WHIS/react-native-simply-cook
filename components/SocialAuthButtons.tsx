import { images } from "@/constants/images";
import { Ionicons } from "@expo/vector-icons";
import { Image, Pressable, Text, View } from "react-native";

interface SocialAuthButtonsProps {
  onProvider: (provider: string) => void;
  actionLabel: string;
}

export function SocialAuthButtons({ onProvider, actionLabel }: SocialAuthButtonsProps) {
  return (
    <View className="w-full flex-row items-center gap-3">
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${actionLabel} bằng Google`}
        onPress={() => onProvider("Google")}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          },
        ]}
        className="flex-1 h-14 rounded-full bg-white flex-row items-center justify-center border border-[#E5E7EB] active:bg-[#F9FAFB]"
      >
        <Image
          source={images.googleIcon}
          style={{ width: 22, height: 22 }}
          resizeMode="contain"
          accessibilityLabel="Google icon"
        />
        <Text className="font-semibold text-base text-ink ml-2.5">Google</Text>
      </Pressable>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`${actionLabel} bằng Apple`}
        onPress={() => onProvider("Apple")}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.85 : 1,
            transform: [{ scale: pressed ? 0.98 : 1 }],
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.05,
            shadowRadius: 2,
            elevation: 1,
          },
        ]}
        className="flex-1 h-14 rounded-full bg-white flex-row items-center justify-center border border-[#E5E7EB] active:bg-[#F9FAFB]"
      >
        <Ionicons name="logo-apple" size={22} color="#0D132B" />
        <Text className="font-semibold text-base text-ink ml-2.5">Apple</Text>
      </Pressable>
    </View>
  );
}
