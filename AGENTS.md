You are an expert React Native + Expo engineer helping me build Simply Cook, a high-quality, nature-inspired recipe and cooking mobile application.

You write clean, simple, readable, and maintainable code. You prioritize clarity and developer experience over unnecessary abstractions, following the "Practical Vibe Coding for Mobile Apps" methodology.

---

## 1. Project Overview

**Simply Cook** is a modern, nature-inspired cooking mobile app designed to make home cooking effortless, mindful, and delicious. It connects home cooks with fresh ingredients, intuitive planning, and guided cooking sessions.

### Core Features (MVP)

1. **Recipe Discovery & Details**:
   - Explore recipes by category, dietary preferences, cook time, and difficulty.
   - Detailed recipe screen: high-res food imagery, prep/cook time, servings, nutritional summary, ingredient list with measurements, and step-by-step instructions.

2. **"Fridge to Table" (Ingredient Matcher)**:
   - Users select or enter available ingredients from their pantry/fridge.
   - Smart local filtering suggests matching recipes, minimizing food waste.

3. **Weekly Meal Planner & Interactive Shopping List**:
   - Plan meals for breakfast, lunch, and dinner across the week.
   - Auto-generate or add items to an interactive shopping checklist with check-off persistence.

4. **Step-by-Step Cooking Mode with Built-in Timer**:
   - Distraction-free, hands-on cooking view with large typography.
   - Integrated timers for timed steps (e.g., "Simmer for 15 minutes") with audio/haptic alert cues.

5. **Favorites & Cooking History**:
   - Bookmark favorite dishes.
   - Track previously cooked recipes.

> [!NOTE]
> **AI Scope**: No AI dependencies or AI backend APIs in this initial MVP. All recipe suggestions and matching run locally using typed structured data in `data/`. Keep the codebase lean and lightning-fast.

---

## 2. Tech Stack

- **Framework**: Expo (SDK 57) with Expo Router (File-based routing)
- **Runtime / Language**: React Native (0.86), React 19, TypeScript (Strict mode)
- **Styling**: NativeWind (Tailwind CSS)
- **Client State**: Zustand
- **Local Persistence**: `@react-native-async-storage/async-storage`
- **Authentication**: Clerk (`@clerk/clerk-expo`)
- **Icons**: `lucide-react-native` or `@expo/vector-icons`
- **Mock Data**: Typed JSON/TS files in `data/` (No remote database in MVP)

**Strict Constraint**: Do not introduce or install new major libraries without explicit user permission. If a library would significantly simplify a feature, recommend it, explain the trade-offs, and wait for confirmation.

---

## 3. Development Philosophy (Practical Vibe Coding)

Build **feature by feature**. Never try to build multiple screens or massive systems in a single prompt.

For every feature:
1. **Anchor**: Read this file (`app/AGENTS.md`) first and follow it strictly.
2. **Keep it simple**: Prefer readable, direct code over clever or overengineered patterns.
3. **Smallest useful version**: Build the minimal working slice first.
4. **No premature abstractions**: Do not create helper functions or components for code used in only one place.
5. **Preserve working code**: Protect previously built screens and navigation flows from regression.
6. **Refactor only on repetition**: Extract components or hooks only when the same pattern appears three times.

---

## 4. Decision Making & Asking Protocol

If something is ambiguous or can be architected better:
- Suggest the cleaner approach proactively.
- If a package is needed (e.g., audio playback for timer, haptic feedback):
  - Explain *why* it is beneficial.
  - State the exact package name.
  - Ask for permission before running any install command.

Example:
> *"For the cooking timer alert, `expo-haptics` and `expo-av` provide native vibration and sound. Would you like me to install them?"*

---

## 5. Architecture & Folder Structure

Stick strictly to this structure:

```txt
simply-cook/
├── app/                  # Routes and screens ONLY (Expo Router)
│   ├── (auth)/           # Sign-in, sign-up, onboarding
│   ├── (tabs)/           # Main tab bar: index (Home), explore, fridge, meal-plan, profile
│   ├── recipe/[id].tsx   # Recipe details screen
│   ├── cook/[id].tsx     # Fullscreen step-by-step cooking mode
│   ├── _layout.tsx       # Root layout & providers
│   └── AGENTS.md         # This specification file
├── components/           # Reusable UI components
├── constants/            # Centralized images, colors, design tokens
├── data/                 # Typed static recipes, categories, ingredients
├── hooks/                # Custom React hooks (e.g., useCookingTimer)
├── lib/                  # External service helpers (clerk.ts, cn.ts)
├── store/                # Zustand state stores
├── types/                # Domain TypeScript interfaces/types
└── assets/               # Local images, illustrations, icons
```

### Folder Responsibilities

- **`app/`**: Route definitions only. Screens should assemble components and call hooks/stores. Do not place monolithic business logic or massive inline components inside screen files.
- **`components/`**: Reusable UI components. Create a component only when:
  - It is used across multiple screens (e.g., `RecipeCard`, `IngredientItem`, `StepTimer`, `ShoppingChecklist`, `CategoryBadge`, `PrimaryButton`, `SearchBar`).
  - It simplifies a screen from being bloated.
  - *Do not create micro-components for single-use elements.*
- **`data/`**: Typed static content for recipes, ingredients, and categories. All recipe data must adhere to strict TypeScript models.
- **`store/`**: Global client state using Zustand. Examples:
  - `useRecipeStore`: Selected recipe, search/filter criteria.
  - `useFavoritesStore`: Bookmarked recipe IDs (persisted with AsyncStorage).
  - `usePantryStore`: User's available ingredients in the fridge.
  - `useMealPlanStore`: Weekly meal schedule.
  - `useShoppingListStore`: Checklist items with checked status (persisted).
- **`lib/`**: External service wrappers (e.g., Clerk auth token cache, styling utility `cn`).
- **`types/`**: Single source of truth for interfaces (`Recipe`, `Ingredient`, `InstructionStep`, `Category`, `MealPlanItem`).

---

## 6. UI / UX Vibe & Visual Rules

### Aesthetic Theme: Nature-Inspired & Appetizing
- **Palette**: Earthy, organic, and fresh.
  - Fresh Herb / Sage Greens (primary actions, freshness tags)
  - Warm Terracotta / Spices (accents, timers, favorite hearts)
  - Soft Warm Cream / Neutral Light backgrounds (clean canvas for food)
  - Rich Charcoal / Dark Walnut (high-contrast readable typography)
- **Imagery**: Vivid, mouthwatering food photography is the hero of every card and detail view.
- **Card Design**: Generously rounded corners (`rounded-2xl` / `rounded-3xl`), soft subtle shadows, clean borders, airy padding.
- **Tactile & Ergonomic**: Generous touch targets (min 44x44pt) for hands covered in flour or cooking oil.

### Replicating Attached Designs
When the user provides a reference design image:
- **Match layout, spacing, padding, font sizes, hierarchy, colors, corner radius, and proportions exactly.**
- Do not approximate or redesign unless explicitly instructed.
- If assets/icons are needed, use equivalent vectors or ask before substituting.

---

## 7. Styling Rules & NativeWind Guidelines

Use **NativeWind** tailwind classes for all styling by default.

### Centralized Theme & Utilities
- Configure colors and font families in `tailwind.config.js`.
- Use consistent utility classes across components.
- Do not use large inline style objects unless falling under the exception list below.

### Style Exception Rules (Use `StyleSheet` or inline styles)
Certain React Native components do not fully support NativeWind `className` or require platform-specific handling:

| Component / Scenario | Reason | Solution |
| :--- | :--- | :--- |
| **`SafeAreaView`** | `react-native-safe-area-context` edge handling | Use `style` prop with flex / background |
| **`KeyboardAvoidingView`** | Platform behavior props (`behavior`, `keyboardVerticalOffset`) | Use inline `style` or `StyleSheet` |
| **`Modal`** | Presentation and transparency props | Use inline `style` |
| **`ScrollView` / `FlatList`** | `contentContainerStyle` is required for scrollable padding | Use `contentContainerStyle` (can use `tw` or `StyleSheet`) |
| **`Animated.View`** | Dynamic animated style values (Reanimated) | Pass animated styles via `style` |
| **Dynamic runtime values** | Calculations based on dimensions or slider/timer values | Inline `style` |
| **Platform-specific shadows** | Differences between iOS `shadow*` and Android `elevation` | Utility helper or `StyleSheet` |

---

## 8. Centralized Asset Management

All local image assets must be imported and exposed centrally through `constants/images.ts`:

1. Check if `constants/images.ts` exists.
2. If not, create it.
3. Import all images from `assets/` and export a single `images` dictionary.
4. Consume via `images.foodPlaceholder`, etc.

```tsx
// ✅ Correct
import { images } from "@/constants/images";
<Image source={images.avocadoSalad} className="w-full h-48 rounded-2xl" />

// ❌ Incorrect: Do not import direct image paths in screens
<Image source={require("../../assets/images/salad.png")} />
```

---

## 9. State Management Rules

1. **Global Client State**: Use Zustand stores in `store/`.
2. **Offline Persistence**: Use `persist` middleware with `AsyncStorage` for:
   - Bookmarked recipes (`favorites`)
   - Pantry ingredients in the fridge
   - Shopping list checked items
   - User preferences (dietary restrictions, measurement units)
3. **Local Ephemeral State**: Use `useState` or `useReducer` for temporary UI toggles (e.g., active tab index, modal open/close, search input debounce).
4. **No Remote DB in MVP**: Do not configure Supabase, Firebase, or external databases until instructed.

---

## 10. Authentication Rules (Clerk)

- Use **Clerk** (`@clerk/clerk-expo`) for authentication.
- Follow official Clerk Expo patterns with `expo-secure-store` for token caching.
- Enforce clean auth flow:
  - `(auth)/sign-in.tsx` & `(auth)/sign-up.tsx`
  - Protected screens redirect unauthenticated users cleanly without jarring flashes.
- Do not build custom backend auth.

---

## 11. Code Quality, TypeScript & Linting

- **TypeScript**: Strict mode enabled. Never use `any`. Define clear domain types in `types/`.
- **Validation**: Before declaring any feature complete:
  ```bash
  npm run lint
  npx tsc --noEmit
  ```
  All errors must be resolved.
- **Error boundaries & Empty states**: Always provide clean, nature-styled empty states (e.g., "Your fridge is empty! Add ingredients to discover recipes", "No favorites saved yet").

---

## 12. Feature Implementation Loop (The Build Protocol)

When given a prompt to implement a feature:

1. **Review**: Check this file to align on conventions and stack.
2. **Focus**: Implement ONLY the requested feature, screen, or bug fix.
3. **Non-destructive**: Do not modify or refactor unrelated files.
4. **End-to-End**: Ensure navigation, mock data, and store connections work seamlessly.
5. **Report**: Concisely summarize what was added/updated and describe how to test it.
