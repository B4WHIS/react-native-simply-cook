import type { ImageKey } from '@/constants/images';

export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export type DietaryPreference =
  | 'Vegetarian'
  | 'Vegan'
  | 'Gluten-Free'
  | 'Dairy-Free'
  | 'Low-Carb'
  | 'High-Protein'
  | 'Nut-Free';

export type IngredientCategory =
  | 'produce'
  | 'meat'
  | 'seafood'
  | 'dairy'
  | 'pantry'
  | 'spices'
  | 'condiments'
  | 'other';

export interface Category {
  id: string;
  name: string;
  slug: string;
  icon: string;
  description: string;
  image?: ImageKey;
}

export interface Ingredient {
  id: string;
  name: string;
  category: IngredientCategory;
  commonUnit: string;
  pantryKeywords: string[];
}

export interface RecipeIngredient {
  ingredientId: string;
  name: string;
  amount: number;
  unit: string;
}

export interface InstructionStep {
  stepNumber: number;
  title: string;
  instruction: string;
  timerDurationSeconds?: number;
}

export interface NutritionalSummary {
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  image: ImageKey;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  servings: number;
  difficulty: Difficulty;
  dietaryPreferences: DietaryPreference[];
  nutritionalSummary: NutritionalSummary;
  rating?: number;
  ingredients: RecipeIngredient[];
  instructions: InstructionStep[];
}

export interface RecipeMatchResult {
  recipe: Recipe;
  matchedIngredients: RecipeIngredient[];
  missingIngredients: RecipeIngredient[];
  matchPercentage: number;
}
