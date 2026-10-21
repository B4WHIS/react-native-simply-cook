import { RecipeCard } from "@/components/RecipeCard";
import { images } from "@/constants/images";
import { categories } from "@/data/categories";
import { recipes } from "@/data/recipes";
import type { Recipe } from "@/types/recipe";
import { Ionicons } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import {
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// First 5 dish categories from data/categories.ts as shown in the design
const HOME_CATEGORIES = categories.slice(0, 5).map((cat) => ({
  id: cat.id,
  name: cat.name,
  image: cat.image ? images[cat.image] : images.catMonKho,
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
  const [favorites, setFavorites] = useState<Record<string, boolean>>({
    "thit-kho-trung": true,
    "bo-xao-bong-cai": true,
  });

  const toggleFavorite = (recipeId: string) => {
    setFavorites((prev) => ({
      ...prev,
      [recipeId]: !prev[recipeId],
    }));
  };

  const handleCategoryPress = (categoryId: string) => {
    // Toggle active category or switch
    setSelectedCategoryId((prev) => (prev === categoryId ? null : categoryId));
  };

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
        style={{
          position: "absolute",
          top: -30,
          left: -40,
          width: 220,
          height: 180,
          backgroundColor: "#FFE69B",
          opacity: 0.45,
          borderBottomRightRadius: 150,
          borderBottomLeftRadius: 50,
        }}
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
            <Text
              className="text-[28px] font-bold text-ink leading-[34px]"
              style={{ fontFamily: "FZPoppins-Bold" }}
            >
              Hôm nay bạn
            </Text>

            {/* Title line 2 */}
            <View className="flex-row items-center">
              <Text
                className="text-[28px] font-bold text-[#FFA927] leading-[34px]"
                style={{ fontFamily: "FZPoppins-Bold" }}
              >
                muốn nấu gì?
              </Text>
            </View>
          </View>

          {/* Peeking Chick Mascot Container */}
          <View className="relative w-[130px] h-[105px] items-center justify-end">
            {/* Floating pink heart */}
            <View className="absolute top-2 right-1 rotate-[15deg]">
              <Ionicons name="heart-outline" size={20} color="#FF6584" />
            </View>

            {/* Top-right sparkle accents */}
            <View className="absolute top-4 -right-1 flex-col gap-1">
              <View className="w-3.5 h-1 bg-[#FEB11F] rounded-full rotate-[15deg]" />
              <View className="w-3.5 h-1 bg-[#FEB11F] rounded-full rotate-[-25deg]" />
            </View>

            {/* Left little sparkle */}
            <View className="absolute top-8 left-0 flex-col gap-1">
              <View className="w-3 h-1 bg-[#FEB11F] rounded-full rotate-[-20deg]" />
            </View>

            {/* Chef Chick Mascot */}
            <Image
              source={images.authChick}
              style={{ width: 120, height: 95 }}
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
              className="flex-1 ml-3 text-[14px] text-ink"
              style={{ fontFamily: "FZPoppins-Regular" }}
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
            3. CATEGORY SELECTOR: Horizontal Scrollable List
            ========================================================= */}
        <View className="mb-6">
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: 20,
              alignItems: "center",
              gap: 14,
            }}
          >
            {HOME_CATEGORIES.map((cat) => {
              const isSelected = selectedCategoryId === cat.id;

              return (
                <TouchableOpacity
                  key={cat.id}
                  activeOpacity={0.85}
                  onPress={() => handleCategoryPress(cat.id)}
                  className={`rounded-[22px] px-3 pt-2 pb-2.5 items-center justify-center min-w-[76px] border ${
                    isSelected
                      ? "bg-[#FEB11F] border-[#FFA927]"
                      : "bg-transparent border-transparent"
                  }`}
                  style={
                    isSelected
                      ? {
                          shadowColor: "#FFA927",
                          shadowOffset: { width: 0, height: 3 },
                          shadowOpacity: 0.25,
                          shadowRadius: 6,
                          elevation: 3,
                        }
                      : undefined
                  }
                >
                  <View className="w-[58px] h-[58px] rounded-full bg-[#FFFBF0] items-center justify-center overflow-hidden border border-[#2D2A26] mb-1">
                    <Image
                      source={cat.image}
                      style={{ width: 50, height: 50 }}
                      resizeMode="contain"
                    />
                  </View>
                  <Text
                    className={`text-[12px] text-center ${
                      isSelected
                        ? "font-bold text-ink"
                        : "font-medium text-ink/90"
                    }`}
                    style={{
                      fontFamily: isSelected
                        ? "FZPoppins-Bold"
                        : "FZPoppins-Medium",
                    }}
                  >
                    {cat.name}
                  </Text>
                </TouchableOpacity>
              );
            })}

            {/* Scroll indicator chevron button */}
            <TouchableOpacity
              activeOpacity={0.8}
              className="w-8 h-8 rounded-full bg-[#FFE69B]/60 items-center justify-center ml-1 border border-[#FFB873]/40"
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
            <Text
              className="text-[22px] font-bold text-ink"
              style={{ fontFamily: "FZPoppins-Bold" }}
            >
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
        <View className="px-5">
          {recipePairs.map(([first, second], rowIndex) => (
            <View key={first.id + rowIndex} className="flex-row gap-3.5">
              <RecipeCard
                recipe={first}
                isFavorite={favorites[first.id]}
                onToggleFavorite={toggleFavorite}
              />
              {second ? (
                <RecipeCard
                  recipe={second}
                  isFavorite={favorites[second.id]}
                  onToggleFavorite={toggleFavorite}
                />
              ) : (
                // Invisible placeholder to keep column spacing balanced
                <View className="flex-1" />
              )}
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
