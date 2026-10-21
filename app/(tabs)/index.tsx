import { RecipeCard } from "@/components/RecipeCard";
import { images } from "@/constants/images";
import { categories } from "@/data/categories";
import { recipes } from "@/data/recipes";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import type { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useMemo, useState } from "react";
import {
  Image,
  type ImageSourcePropType,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";

interface HomeCategoryItem {
  id: string;
  name: string;
  image: ImageSourcePropType;
}

// First 5 dish categories from data/categories.ts as shown in the design
const HOME_CATEGORIES: HomeCategoryItem[] = categories
  .slice(0, 5)
  .map((cat) => ({
    id: cat.id,
    name: cat.name,
    image:
      cat.image && images[cat.image] ? images[cat.image] : images.catMonKho,
  }));

// Helper to normalize Vietnamese text for diacritic-insensitive search
const normalizeText = (text: string): string =>
  (text || "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase()
    .trim();

export default function HomeScreen() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    "mon-kho",
  );
  const favoriteRecipeIds = useFavoritesStore(
    (state) => state.favoriteRecipeIds
  );
  const toggleFavorite = useFavoritesStore((state) => state.toggleFavorite);

  const [itemLayouts, setItemLayouts] = useState<
    Record<string, { x: number; y: number; width: number; height: number }>
  >({});

  // Sliding indicator shared values (mimics smooth bottom tab indicator glide)
  const indicatorX = useSharedValue(20);
  const indicatorY = useSharedValue(0);
  const indicatorWidth = useSharedValue(74);
  const indicatorHeight = useSharedValue(94);
  const indicatorOpacity = useSharedValue(1);

  // Content cross-fade shared value
  const contentOpacity = useSharedValue(1);

  const handleItemLayout = (
    id: string,
    layout: { x: number; y: number; width: number; height: number }
  ) => {
    setItemLayouts((prev) => {
      if (
        prev[id] &&
        Math.abs(prev[id].x - layout.x) < 0.5 &&
        Math.abs(prev[id].width - layout.width) < 0.5
      ) {
        return prev;
      }
      return { ...prev, [id]: layout };
    });
  };

  const handleCategoryPress = (categoryId: string) => {
    // Toggle active category or switch
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

  // Smoothly slide active indicator to target category position
  useEffect(() => {
    if (selectedCategoryId && itemLayouts[selectedCategoryId]) {
      const layout = itemLayouts[selectedCategoryId];
      indicatorX.value = withTiming(layout.x, {
        duration: 220,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      });
      indicatorY.value = layout.y;
      indicatorWidth.value = withTiming(layout.width, { duration: 220 });
      indicatorHeight.value = withTiming(layout.height, { duration: 220 });
      indicatorOpacity.value = withTiming(1, { duration: 180 });
    } else if (!selectedCategoryId) {
      indicatorOpacity.value = withTiming(0, { duration: 150 });
    }
  }, [
    selectedCategoryId,
    itemLayouts,
    indicatorX,
    indicatorY,
    indicatorWidth,
    indicatorHeight,
    indicatorOpacity,
  ]);

  // Smooth cross-fade transition when switching categories (no sudden white blink)
  useEffect(() => {
    contentOpacity.value = withSequence(
      withTiming(0.4, { duration: 80, easing: Easing.out(Easing.quad) }),
      withTiming(1, { duration: 180, easing: Easing.in(Easing.quad) })
    );
  }, [selectedCategoryId, contentOpacity]);

  const animatedIndicatorStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: indicatorX.value },
      { translateY: indicatorY.value },
    ],
    width: indicatorWidth.value,
    height: indicatorHeight.value,
    opacity: indicatorOpacity.value,
  }));

  const animatedContentStyle = useAnimatedStyle(() => ({
    opacity: contentOpacity.value,
  }));

  // Filter recipes based on search query and category
  const filteredRecipes = useMemo(() => {
    let result = recipes;

    const q = normalizeText(searchQuery);
    if (q) {
      result = result.filter(
        (r) =>
          normalizeText(r.title).includes(q) ||
          normalizeText(r.description).includes(q) ||
          r.ingredients.some((ing) => normalizeText(ing.name).includes(q)),
      );
    } else if (selectedCategoryId) {
      // If a category is selected, show matching ones first or filter
      const categoryMatches = result.filter(
        (r) => r.categoryId === selectedCategoryId,
      );
      if (categoryMatches.length > 0) {
        // Show category matches first, followed by others to keep grid rich
        const others = result.filter(
          (r) => r.categoryId !== selectedCategoryId,
        );
        result = [...categoryMatches, ...others];
      }
    }

    return result;
  }, [searchQuery, selectedCategoryId]);

  // Group recipes into 2-column pairs for fluid layout
  const recipePairs = useMemo(() => {
    const pairs: [Recipe, Recipe | null][] = [];
    for (let i = 0; i < filteredRecipes.length; i += 2) {
      pairs.push([filteredRecipes[i], filteredRecipes[i + 1] || null]);
    }
    return pairs;
  }, [filteredRecipes]);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#FFFDF9" }}
      edges={["top", "left", "right"]}
    >
      {/* Decorative top-left organic blob */}
      <View
        className="absolute -top-[30px] -left-[40px] w-[220px] h-[180px] bg-[#FFE69B] opacity-45 rounded-br-[150px] rounded-bl-[50px]"
        pointerEvents="none"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 32 }}
      >
        {/* =========================================================
            1. TOP HEADER: Greeting + Peeking Chick Mascot
            ========================================================= */}
        <View className="px-5 pt-4 pb-2 flex-row items-end justify-between overflow-visible">
          {/* Greeting text with decorative yellow accents */}
          <View className="flex-1 pr-2 relative">
            {/* Top dashes accent */}
            <View className="flex-row items-center gap-1 mb-1 ml-1">
              <View className="w-4 h-1.5 bg-[#FEB11F] rounded-full rotate-[-25deg]" />
              <View className="w-3 h-1.5 bg-[#FEB11F] rounded-full rotate-[-25deg]" />
            </View>

            {/* Title line 1 */}
            <Text className="text-[28px] font-bold text-ink leading-[34px]">
              Hôm nay bạn
            </Text>

            {/* Title line 2 */}
            <View className="flex-row items-center">
              <Text className="text-[28px] font-bold text-[#FFA927] leading-[34px]">
                muốn nấu gì?
              </Text>

              {/* Trailing exclamation accent mark */}
              <View className="ml-1 mb-1">
                <View className="w-2 h-2 bg-[#FEB11F] rounded-full" />
              </View>
            </View>
          </View>

          {/* Peeking Mascot Graphic */}
          <View className="relative w-28 h-24 items-center justify-end overflow-visible">
            {/* Decorative heart icon floating above chick's head */}
            <View
              className="absolute top-1 right-2 w-6 h-6 rounded-full bg-[#FFF0F2] items-center justify-center shadow-xs"
              style={{
                shadowColor: "#FF4D4F",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.2,
                shadowRadius: 2,
                elevation: 2,
              }}
            >
              <Ionicons name="heart" size={14} color="#FF4D4F" />
            </View>

            {/* Tiny accent spark lines next to chick */}
            <View className="absolute top-6 right-0">
              <View className="w-2.5 h-1 bg-[#FEB11F] rounded-full rotate-[-15deg] mb-1" />
              <View className="w-2 h-1 bg-[#FEB11F] rounded-full rotate-[15deg]" />
            </View>

            <Image
              source={images.authChick}
              className="w-24 h-24"
              resizeMode="contain"
            />
          </View>
        </View>

        {/* =========================================================
            2. SEARCH BAR: Input + Filter Settings Button
            ========================================================= */}
        <View className="px-5 mt-2 mb-4">
          <View
            className="flex-row items-center bg-white rounded-full px-4 h-[50px] border border-[#EFECE6]"
            style={{
              shadowColor: "#0D132B",
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.04,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <Ionicons name="search" size={20} color="#6B7280" />
            <TextInput
              value={searchQuery}
              onChangeText={setSearchQuery}
              placeholder="Tìm món ăn, nguyên liệu..."
              placeholderTextColor="#9CA3AF"
              className="flex-1 ml-3 text-[14px] text-ink font-regular"
            />
            {searchQuery.length > 0 ? (
              <TouchableOpacity
                onPress={() => setSearchQuery("")}
                hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                className="mr-2"
              >
                <Ionicons name="close-circle" size={18} color="#9CA3AF" />
              </TouchableOpacity>
            ) : null}
            <TouchableOpacity
              activeOpacity={0.7}
              hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            >
              <Ionicons name="options-outline" size={20} color="#4B5563" />
            </TouchableOpacity>
          </View>
        </View>

        {/* =========================================================
            3. CATEGORY SELECTOR: Horizontal List with Sliding Active Pill
            ========================================================= */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              alignItems: "center",
              position: "relative",
            }}
          >
            {/* Smoothly Sliding Active Indicator Pill */}
            <Animated.View
              pointerEvents="none"
              className="absolute top-0 left-0 rounded-[22px] bg-[#FEB11F] border border-[#FFA927] z-1"
              style={[
                {
                  shadowColor: "#FFA927",
                  shadowOffset: { width: 0, height: 3 },
                  shadowOpacity: 0.25,
                  shadowRadius: 6,
                  elevation: 3,
                },
                animatedIndicatorStyle,
              ]}
            />

            {HOME_CATEGORIES.map((cat, idx) => {
              const isSelected = selectedCategoryId === cat.id;

              return (
                <View
                  key={cat.id}
                  onLayout={(e) => {
                    const { x, y, width, height } = e.nativeEvent.layout;
                    handleItemLayout(cat.id, { x, y, width, height });
                  }}
                  className={`z-[2] ${idx < HOME_CATEGORIES.length - 1 ? "mr-3" : ""}`}
                >
                  <TouchableOpacity
                    activeOpacity={0.75}
                    onPress={() => handleCategoryPress(cat.id)}
                    accessibilityRole="button"
                    accessibilityState={{ selected: isSelected }}
                    className="rounded-[22px] items-center justify-center px-2 pt-2 pb-2.5 min-w-[74px]"
                  >
                    <Image
                      source={cat.image}
                      className="w-14 h-14"
                      resizeMode="contain"
                    />
                    <Text className="text-[12px] text-center mt-1 font-bold text-ink">
                      {cat.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              );
            })}

            {/* Scroll indicator chevron button */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-8 h-8 rounded-full bg-[#FFE69B]/60 items-center justify-center ml-3 border border-[#FFB873]/40 z-[2]"
            >
              <Ionicons name="chevron-forward" size={18} color="#FFA927" />
            </TouchableOpacity>
          </ScrollView>
        </View>

        {/* =========================================================
            4. SECTION TITLE: "Món ngon gợi ý" with Signature Accents
            ========================================================= */}
        <View className="px-5 mb-4">
          <View className="flex-row items-center gap-2">
            {/* Left title dashes */}
            <View className="flex-col gap-1 items-end">
              <View className="w-3.5 h-[3.5px] bg-[#FEB11F] rounded-full rotate-[-25deg]" />
              <View className="w-3 h-[3.5px] bg-[#FEB11F] rounded-full rotate-[-25deg]" />
            </View>

            {/* Section title */}
            <Text className="text-[22px] font-bold text-ink">
              Món ngon gợi ý
            </Text>

            {/* Right title dashes */}
            <View className="flex-col gap-1 items-start">
              <View className="w-3.5 h-[3.5px] bg-[#FEB11F] rounded-full rotate-[25deg]" />
              <View className="w-3 h-[3.5px] bg-[#FEB11F] rounded-full rotate-[25deg]" />
            </View>
          </View>
        </View>

        {/* =========================================================
            5. RECIPES GRID: 2-Column Responsive Layout
            ========================================================= */}
        <Animated.View className="px-5" style={animatedContentStyle}>
          {filteredRecipes.length === 0 ? (
            <View className="py-12 items-center justify-center bg-white rounded-3xl border border-[#F0EFEA] px-6 mt-2">
              <View className="w-14 h-14 rounded-full bg-[#FFE69B]/40 items-center justify-center mb-3">
                <Ionicons name="restaurant-outline" size={28} color="#FFA927" />
              </View>
              <Text className="text-[16px] font-bold text-ink text-center mb-1">
                Không tìm thấy món ăn phù hợp
              </Text>
              <Text className="text-[13px] text-muted text-center mb-4 leading-5 font-regular">
                Hãy thử tìm với từ khóa khác hoặc bỏ chọn danh mục hiện tại nhé!
              </Text>
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  setSearchQuery("");
                  setSelectedCategoryId(null);
                }}
                className="px-4 py-2.5 rounded-full bg-[#FEB11F] flex-row items-center gap-1.5"
              >
                <Ionicons name="refresh" size={16} color="#0D132B" />
                <Text className="text-[13px] font-bold text-ink">
                  Xem tất cả món ăn
                </Text>
              </TouchableOpacity>
            </View>
          ) : (
            recipePairs.map(([first, second]) => (
              <View
                key={`${first.id}-${second?.id ?? "empty"}`}
                className="flex-row gap-3.5"
              >
                <RecipeCard
                  recipe={first}
                  isFavorite={favoriteRecipeIds.includes(first.id)}
                  onToggleFavorite={toggleFavorite}
                />
                {second ? (
                  <RecipeCard
                    recipe={second}
                    isFavorite={favoriteRecipeIds.includes(second.id)}
                    onToggleFavorite={toggleFavorite}
                  />
                ) : (
                  // Invisible placeholder to keep column spacing balanced
                  <View className="flex-1" />
                )}
              </View>
            ))
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}
