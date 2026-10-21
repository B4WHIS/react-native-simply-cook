import type { Ingredient } from '@/types/recipe';

export const ingredients: Ingredient[] = [
  // ---- Meat & Poultry ----
  {
    id: 'ing-pork-belly',
    name: 'Pork Belly (Thịt ba chỉ)',
    category: 'meat',
    commonUnit: 'g',
    pantryKeywords: [
      'pork belly',
      'pork',
      'thịt ba chỉ',
      'thịt ba rọi',
      'thịt heo',
      'thịt lợn',
      'ba chỉ',
    ],
  },
  {
    id: 'ing-chicken-wings',
    name: 'Chicken Wings (Cánh gà)',
    category: 'meat',
    commonUnit: 'g',
    pantryKeywords: [
      'chicken wings',
      'chicken',
      'cánh gà',
      'gà',
      'thịt gà',
    ],
  },
  {
    id: 'ing-pork-shoulder',
    name: 'Pork Shoulder / Lean Pork (Thịt nạc vai)',
    category: 'meat',
    commonUnit: 'g',
    pantryKeywords: [
      'pork shoulder',
      'lean pork',
      'thịt nạc',
      'nạc vai',
      'thịt heo nạc',
    ],
  },

  // ---- Seafood ----
  {
    id: 'ing-catfish',
    name: 'Catfish / Salmon Steaks (Cá basa / Cá lóc / Cá hồi)',
    category: 'seafood',
    commonUnit: 'g',
    pantryKeywords: [
      'fish',
      'catfish',
      'salmon',
      'cá',
      'cá basa',
      'cá lóc',
      'cá quả',
      'cá hồi',
      'cá hú',
    ],
  },
  {
    id: 'ing-shrimp',
    name: 'Shrimp (Tôm)',
    category: 'seafood',
    commonUnit: 'g',
    pantryKeywords: [
      'shrimp',
      'prawn',
      'tôm',
      'tôm sú',
      'tôm thẻ',
    ],
  },

  // ---- Dairy & Eggs ----
  {
    id: 'ing-eggs',
    name: 'Eggs (Trứng)',
    category: 'dairy',
    commonUnit: 'pieces',
    pantryKeywords: [
      'egg',
      'eggs',
      'trứng',
      'trứng gà',
      'trứng vịt',
      'hột gà',
      'hột vịt',
    ],
  },

  // ---- Fresh Produce ----
  {
    id: 'ing-scallions',
    name: 'Scallions / Green Onions (Hành lá)',
    category: 'produce',
    commonUnit: 'stalks',
    pantryKeywords: [
      'scallion',
      'scallions',
      'green onion',
      'spring onion',
      'hành lá',
      'hành hoa',
    ],
  },
  {
    id: 'ing-shallots',
    name: 'Shallots (Hành tím)',
    category: 'produce',
    commonUnit: 'bulbs',
    pantryKeywords: [
      'shallot',
      'shallots',
      'hành tím',
      'hành củ',
      'red onion',
    ],
  },
  {
    id: 'ing-garlic',
    name: 'Garlic (Tỏi)',
    category: 'produce',
    commonUnit: 'cloves',
    pantryKeywords: [
      'garlic',
      'tỏi',
      'tỏi băm',
      'tỏi củ',
    ],
  },
  {
    id: 'ing-chili',
    name: 'Fresh Red Chili (Ớt tươi)',
    category: 'produce',
    commonUnit: 'peppers',
    pantryKeywords: [
      'chili',
      'red chili',
      'hot pepper',
      'ớt',
      'ớt hiểm',
      'ớt sừng',
    ],
  },
  {
    id: 'ing-tomato',
    name: 'Tomato (Cà chua)',
    category: 'produce',
    commonUnit: 'pieces',
    pantryKeywords: [
      'tomato',
      'tomatoes',
      'cà chua',
    ],
  },
  {
    id: 'ing-pineapple',
    name: 'Pineapple (Dứa / Thơm)',
    category: 'produce',
    commonUnit: 'pieces',
    pantryKeywords: [
      'pineapple',
      'dứa',
      'thơm',
      'khóm',
    ],
  },
  {
    id: 'ing-okra',
    name: 'Okra (Đậu bắp)',
    category: 'produce',
    commonUnit: 'g',
    pantryKeywords: [
      'okra',
      'lady fingers',
      'đậu bắp',
    ],
  },
  {
    id: 'ing-taro-stem',
    name: 'Taro Stem / Elephant Ear (Dọc mùng / Bạc hà)',
    category: 'produce',
    commonUnit: 'stalks',
    pantryKeywords: [
      'taro stem',
      'elephant ear',
      'dọc mùng',
      'bạc hà',
    ],
  },
  {
    id: 'ing-bean-sprouts',
    name: 'Bean Sprouts (Giá đỗ)',
    category: 'produce',
    commonUnit: 'g',
    pantryKeywords: [
      'bean sprouts',
      'sprouts',
      'giá đỗ',
      'giá',
      'giá sống',
    ],
  },
  {
    id: 'ing-vietnamese-herbs',
    name: 'Rice Paddy & Sawtooth Herb (Ngò om & Ngò gai)',
    category: 'produce',
    commonUnit: 'g',
    pantryKeywords: [
      'ngò gai',
      'ngò om',
      'rau ngổ',
      'sawtooth herb',
      'rice paddy herb',
      'culantro',
    ],
  },
  {
    id: 'ing-lime',
    name: 'Fresh Lime (Chanh)',
    category: 'produce',
    commonUnit: 'pieces',
    pantryKeywords: [
      'lime',
      'lemon',
      'chanh',
      'nước cốt chanh',
    ],
  },

  // ---- Pantry & Liquids ----
  {
    id: 'ing-coconut-water',
    name: 'Fresh Coconut Water (Nước dừa tươi)',
    category: 'pantry',
    commonUnit: 'ml',
    pantryKeywords: [
      'coconut water',
      'coconut juice',
      'nước dừa',
      'dừa tươi',
      'nước dừa tươi',
    ],
  },
  {
    id: 'ing-tamarind',
    name: 'Tamarind Paste / Pulp (Nước cốt me)',
    category: 'pantry',
    commonUnit: 'tbsp',
    pantryKeywords: [
      'tamarind',
      'tamarind paste',
      'tamarind pulp',
      'me',
      'me chua',
      'nước cốt me',
    ],
  },
  {
    id: 'ing-cornstarch',
    name: 'Cornstarch / Crispy Batter (Bột bắp / Bột chiên giòn)',
    category: 'pantry',
    commonUnit: 'tbsp',
    pantryKeywords: [
      'cornstarch',
      'crispy flour',
      'bột bắp',
      'bột chiên giòn',
      'bột năng',
    ],
  },
  {
    id: 'ing-cooking-oil',
    name: 'Cooking Oil (Dầu ăn)',
    category: 'pantry',
    commonUnit: 'tbsp',
    pantryKeywords: [
      'cooking oil',
      'oil',
      'vegetable oil',
      'dầu ăn',
    ],
  },

  // ---- Condiments & Spices ----
  {
    id: 'ing-fish-sauce',
    name: 'Fish Sauce (Nước mắm ngon)',
    category: 'condiments',
    commonUnit: 'tbsp',
    pantryKeywords: [
      'fish sauce',
      'nước mắm',
      'nước mắm nhĩ',
    ],
  },
  {
    id: 'ing-sugar',
    name: 'Sugar (Đường cát)',
    category: 'pantry',
    commonUnit: 'tbsp',
    pantryKeywords: [
      'sugar',
      'granulated sugar',
      'đường',
      'đường cát',
      'đường phèn',
    ],
  },
  {
    id: 'ing-black-pepper',
    name: 'Ground Black Pepper (Tiêu xay)',
    category: 'spices',
    commonUnit: 'tsp',
    pantryKeywords: [
      'black pepper',
      'ground pepper',
      'pepper',
      'tiêu',
      'tiêu đen',
      'tiêu xay',
    ],
  },
];

export const ingredientsMap: Record<string, Ingredient> = Object.fromEntries(
  ingredients.map((item) => [item.id, item])
);

export const getIngredientById = (id: string): Ingredient | undefined =>
  ingredientsMap[id];

/**
 * Match a raw query term or keyword against all ingredients.
 * Useful for search bar and quick pantry entry.
 */
export const findIngredientByKeyword = (query: string): Ingredient | undefined => {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return undefined;

  return ingredients.find(
    (item) =>
      item.name.toLowerCase().includes(normalized) ||
      item.pantryKeywords.some((keyword) =>
        keyword.toLowerCase().includes(normalized) || normalized.includes(keyword.toLowerCase())
      )
  );
};
