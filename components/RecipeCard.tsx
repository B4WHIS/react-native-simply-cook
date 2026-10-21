import React from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Pressable,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { images } from "@/constants/images";
import type { Recipe } from "@/types/recipe";
import { useFavoritesStore } from "@/store/useFavoritesStore";

interface RecipeCardProps {
  recipe: Recipe;
  isFavorite?: boolean;
  onToggleFavorite?: (id: string) => void;
  onPress?: (recipe: Recipe) => void;
}

export function RecipeCard({
  recipe,
  isFavorite: externalIsFavorite,
  onToggleFavorite,
  onPress,
}: RecipeCardProps) {
  const isStoredFavorite = useFavoritesStore((state) =>
    state.favoriteRecipeIds.includes(recipe.id)
  );
  const toggleFavoriteInStore = useFavoritesStore(
    (state) => state.toggleFavorite
  );

  const isFavorite =
    externalIsFavorite !== undefined ? externalIsFavorite : isStoredFavorite;

  const handleFavoritePress = () => {
    if (onToggleFavorite) {
      onToggleFavorite(recipe.id);
    } else {
      toggleFavoriteInStore(recipe.id);
    }
  };

  const recipeImage = images[recipe.image] || images.canhChua;

  return (
    <Pressable
      onPress={() => onPress?.(recipe)}
      className="bg-white rounded-[24px] overflow-hidden border border-[#F0EFEA] shadow-xs flex-1 mb-4"
      style={{
        shadowColor: "#0D132B",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
      }}
    >
      {/* Food Photography & Favorite Button */}
      <View className="relative w-full h-[135px] overflow-hidden bg-[#F6F7FB]">
        <Image
          source={recipeImage}
          className="w-full h-full"
          resizeMode="cover"
        />

        {/* Favorite Heart Button */}
        <TouchableOpacity
          activeOpacity={0.75}
          onPress={handleFavoritePress}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          className="absolute top-2.5 right-2.5 w-9 h-9 rounded-full bg-white/95 items-center justify-center shadow-sm"
          style={{
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.15,
            shadowRadius: 3,
            elevation: 3,
          }}
        >
          <Ionicons
            name={isFavorite ? "heart" : "heart-outline"}
            size={19}
            color={isFavorite ? "#FF4D4F" : "#2D2A26"}
          />
        </TouchableOpacity>
      </View>

      {/* Card Content */}
      <View className="p-3 pt-2.5">
        {/* Title: Supports up to 2 lines cleanly without decorative dash clutter */}
        <View className="h-[40px] justify-center px-0.5">
          <Text
            className="font-bold text-[14px] text-ink text-center leading-[19px]"
            numberOfLines={2}
          >
            {recipe.title}
          </Text>
        </View>

        {/* Cook Time & Rating Row */}
        <View className="flex-row items-center justify-between mt-2 px-1">
          {/* Cook time */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="time-outline" size={14} color="#6B7280" />
            <Text className="text-[12px] text-muted font-medium">
              {recipe.cookTimeMinutes} phút
            </Text>
          </View>

          {/* Rating */}
          <View className="flex-row items-center gap-1">
            <Ionicons name="star" size={13} color="#FEB11F" />
            <Text className="text-[12px] text-ink font-bold">
              {recipe.rating ?? 4.8}
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
