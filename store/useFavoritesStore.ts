import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export interface FavoritesState {
  favoriteRecipeIds: string[];
  toggleFavorite: (recipeId: string) => void;
  isFavorite: (recipeId: string) => boolean;
  clearFavorites: () => void;
}

export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      // Default bookmarked recipes to match the initial mock design state
      favoriteRecipeIds: ["thit-kho-trung", "bo-xao-bong-cai"],

      toggleFavorite: (recipeId: string) => {
        const { favoriteRecipeIds } = get();
        const exists = favoriteRecipeIds.includes(recipeId);
        set({
          favoriteRecipeIds: exists
            ? favoriteRecipeIds.filter((id) => id !== recipeId)
            : [...favoriteRecipeIds, recipeId],
        });
      },

      isFavorite: (recipeId: string) => {
        return get().favoriteRecipeIds.includes(recipeId);
      },

      clearFavorites: () => {
        set({ favoriteRecipeIds: [] });
      },
    }),
    {
      name: "simply-cook-favorites",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
