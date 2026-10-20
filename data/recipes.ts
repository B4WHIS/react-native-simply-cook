import type { Recipe, RecipeMatchResult } from '@/types/recipe';

export const recipes: Recipe[] = [
  // 1. Thịt Kho Trứng
  {
    id: 'thit-kho-trung',
    title: 'Thịt kho trứng',
    description:
      'Món thịt kho trứng truyền thống Nam Bộ với thịt ba rọi mềm rục béo ngậy, trứng vịt bùi thơm om cùng nước dừa tươi ngọt thanh đậm đà.',
    categoryId: 'mon-kho',
    image: 'thitKhoTrung',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 4,
    difficulty: 'Medium',
    dietaryPreferences: ['Gluten-Free', 'Dairy-Free', 'High-Protein'],
    rating: 4.8,
    nutritionalSummary: {
      calories: 510,
      protein: 34,
      carbs: 14,
      fat: 36,
    },
    ingredients: [
      {
        ingredientId: 'ing-pork-belly',
        name: 'Pork Belly',
        amount: 600,
        unit: 'g',
      },
      {
        ingredientId: 'ing-eggs',
        name: 'Eggs',
        amount: 6,
        unit: 'pieces',
      },
      {
        ingredientId: 'ing-coconut-water',
        name: 'Fresh Coconut Water',
        amount: 400,
        unit: 'ml',
      },
      {
        ingredientId: 'ing-shallots',
        name: 'Shallots',
        amount: 3,
        unit: 'bulbs',
      },
      {
        ingredientId: 'ing-garlic',
        name: 'Garlic',
        amount: 4,
        unit: 'cloves',
      },
      {
        ingredientId: 'ing-fish-sauce',
        name: 'Fish Sauce',
        amount: 4,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-sugar',
        name: 'Sugar',
        amount: 2,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-black-pepper',
        name: 'Ground Black Pepper',
        amount: 1,
        unit: 'tsp',
      },
      {
        ingredientId: 'ing-chili',
        name: 'Red Chili',
        amount: 1,
        unit: 'pieces',
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Luộc và bóc vỏ trứng',
        instruction:
          'Cho trứng vào nồi nước lạnh, đun sôi và luộc trong 8 phút. Vớt ra ngâm nước đá, bóc sạch vỏ rồi để ráo.',
        timerDurationSeconds: 480,
      },
      {
        stepNumber: 2,
        title: 'Chần và thái thịt ba rọi',
        instruction:
          'Chần thịt ba rọi qua nước sôi 3 phút khử mùi. Rửa sạch lại bằng nước lạnh rồi cắt miếng vuông 3-4 cm.',
        timerDurationSeconds: 180,
      },
      {
        stepNumber: 3,
        title: 'Ướp thịt ngấm gia vị',
        instruction:
          'Ướp thịt với hành tỏi băm, 2 thìa nước mắm, 1 thìa đường và tiêu. Để thịt thấm trong 10 phút.',
        timerDurationSeconds: 600,
      },
      {
        stepNumber: 4,
        title: 'Thắng nước màu & đảo săn thịt',
        instruction:
          'Thắng 1 thìa đường trên lửa vừa cho đến khi ngả màu cánh gián. Trút thịt vào đảo đều cho săn cạnh vàng ươm.',
        timerDurationSeconds: 240,
      },
      {
        stepNumber: 5,
        title: 'Kho thịt cùng nước dừa & trứng',
        instruction:
          'Đổ nước dừa tươi ngập thịt, thêm nước mắm, trứng và ớt tươi. Đun sôi rồi hạ nhỏ lửa đun liu riu cho thịt mềm rục.',
        timerDurationSeconds: 1800,
      },
    ],
  },

  // 2. Canh Chua Cá
  {
    id: 'canh-chua',
    title: 'Canh chua cá',
    description:
      'Canh chua cá bông lau thơm mát kết hợp vị chua thanh của me, vị ngọt thanh của dứa, cà chua, đậu bắp và bạc hà tươi giòn.',
    categoryId: 'mon-canh',
    image: 'canhChua',
    prepTimeMinutes: 15,
    cookTimeMinutes: 30,
    servings: 4,
    difficulty: 'Medium',
    dietaryPreferences: ['Gluten-Free', 'Dairy-Free', 'High-Protein'],
    rating: 4.6,
    nutritionalSummary: {
      calories: 280,
      protein: 26,
      carbs: 18,
      fat: 8,
    },
    ingredients: [
      {
        ingredientId: 'ing-catfish',
        name: 'Catfish or Salmon Steaks',
        amount: 500,
        unit: 'g',
      },
      {
        ingredientId: 'ing-tamarind',
        name: 'Tamarind Paste',
        amount: 2,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-pineapple',
        name: 'Fresh Pineapple Chunks',
        amount: 150,
        unit: 'g',
      },
      {
        ingredientId: 'ing-tomato',
        name: 'Ripe Tomatoes',
        amount: 2,
        unit: 'pieces',
      },
      {
        ingredientId: 'ing-okra',
        name: 'Okra',
        amount: 100,
        unit: 'g',
      },
      {
        ingredientId: 'ing-taro-stem',
        name: 'Taro Stem (Bạc hà)',
        amount: 100,
        unit: 'g',
      },
      {
        ingredientId: 'ing-bean-sprouts',
        name: 'Fresh Bean Sprouts',
        amount: 100,
        unit: 'g',
      },
      {
        ingredientId: 'ing-vietnamese-herbs',
        name: 'Rice Paddy & Sawtooth Herb',
        amount: 20,
        unit: 'g',
      },
      {
        ingredientId: 'ing-garlic',
        name: 'Garlic Cloves',
        amount: 4,
        unit: 'cloves',
      },
      {
        ingredientId: 'ing-chili',
        name: 'Fresh Red Chili',
        amount: 1,
        unit: 'pieces',
      },
      {
        ingredientId: 'ing-fish-sauce',
        name: 'Fish Sauce',
        amount: 3,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-sugar',
        name: 'Sugar',
        amount: 2,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-cooking-oil',
        name: 'Cooking Oil',
        amount: 1,
        unit: 'tbsp',
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Sơ chế nguyên liệu & Lọc cốt me',
        instruction:
          'Cà chua bổ múi cau, thơm cắt lát tam giác. Đậu bắp, bạc hà tước vỏ cắt vát. Dầm me trong nước ấm rồi lọc lấy nước cốt chua.',
      },
      {
        stepNumber: 2,
        title: 'Phi thơm tỏi & áp chảo cá',
        instruction:
          'Phi tỏi băm thơm vàng trong nồi. Cho cá vào áp chảo sơ 2 mặt cho săn thịt và không tanh.',
        timerDurationSeconds: 120,
      },
      {
        stepNumber: 3,
        title: 'Nấu nước dùng chua ngọt',
        instruction:
          'Đổ 1 lít nước lọc và nước cốt me vào nồi. Đun sôi bùng, vớt bọt để nước canh trong vắt.',
        timerDurationSeconds: 480,
      },
      {
        stepNumber: 4,
        title: 'Thêm rau củ',
        instruction:
          'Cho thơm và cà chua vào nấu 3 phút, tiếp tục thêm đậu bắp, bạc hà vào đun chín tới giữ độ giòn.',
        timerDurationSeconds: 240,
      },
      {
        stepNumber: 5,
        title: 'Nêm nếm & Hoàn thiện',
        instruction:
          'Nêm 3 thìa nước mắm, 2 thìa đường cho vừa khẩu vị chua thanh ngọt hậu. Rắc giá đỗ, ớt sừng và rau om, ngò gai.',
      },
    ],
  },

  // 3. Bò Xào Bông Cải
  {
    id: 'bo-xao-bong-cai',
    title: 'Bò xào bông cải',
    description:
      'Thịt bò thăn mềm ngọt xào lửa lớn cùng bông cải xanh giòn ngọt, cà rốt và tiêu đen thơm lừng kích thích vị giác.',
    categoryId: 'mon-xao',
    image: 'boXaoBongCai',
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    servings: 3,
    difficulty: 'Easy',
    dietaryPreferences: ['Dairy-Free', 'High-Protein'],
    rating: 4.7,
    nutritionalSummary: {
      calories: 340,
      protein: 30,
      carbs: 14,
      fat: 16,
    },
    ingredients: [
      {
        ingredientId: 'ing-beef',
        name: 'Beef Tenderloin',
        amount: 350,
        unit: 'g',
      },
      {
        ingredientId: 'ing-broccoli',
        name: 'Broccoli',
        amount: 300,
        unit: 'g',
      },
      {
        ingredientId: 'ing-garlic',
        name: 'Garlic',
        amount: 4,
        unit: 'cloves',
      },
      {
        ingredientId: 'ing-oyster-sauce',
        name: 'Oyster Sauce',
        amount: 2,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-cooking-oil',
        name: 'Cooking Oil',
        amount: 2,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-black-pepper',
        name: 'Black Pepper',
        amount: 1,
        unit: 'tsp',
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Ướp thịt bò',
        instruction:
          'Thái thịt bò mỏng ngang thớ. Ướp với tỏi băm, dầu hào, tiêu và 1/2 thìa dầu ăn để thịt mềm.',
        timerDurationSeconds: 600,
      },
      {
        stepNumber: 2,
        title: 'Chần sơ bông cải',
        instruction:
          'Tách bông cải thành miếng vừa ăn, chần nhanh qua nước sôi 1 phút rồi ngâm nước lạnh để giữ màu xanh mướt.',
        timerDurationSeconds: 60,
      },
      {
        stepNumber: 3,
        title: 'Xào thịt bò lửa lớn',
        instruction:
          'Đun nóng chảo với dầu ăn, phi thơm tỏi rồi cho thịt bò vào xào nhanh tay trên lửa lớn trong 2 phút vừa chín tới, trút ra đĩa riêng.',
        timerDurationSeconds: 120,
      },
      {
        stepNumber: 4,
        title: 'Xào bông cải & hòa quyện',
        instruction:
          'Cho bông cải vào chảo đảo đều với chút gia vị, trút thịt bò vào đảo nhanh tay 30 giây rồi tắt bếp.',
        timerDurationSeconds: 60,
      },
    ],
  },

  // 4. Đậu Hũ Xào Nấm
  {
    id: 'dau-hu-xao-nam',
    title: 'Đậu hũ xào nấm',
    description:
      'Món chay thanh tao kết hợp giữa đậu hũ vàng giòn, nấm đông cô, nấm rơm mọng nước và hành boa-rô thơm dịu nhẹ.',
    categoryId: 'mon-chay',
    image: 'dauHuXaoNam',
    prepTimeMinutes: 10,
    cookTimeMinutes: 30,
    servings: 3,
    difficulty: 'Easy',
    dietaryPreferences: ['Vegetarian', 'Vegan', 'Dairy-Free'],
    rating: 4.5,
    nutritionalSummary: {
      calories: 220,
      protein: 16,
      carbs: 12,
      fat: 10,
    },
    ingredients: [
      {
        ingredientId: 'ing-tofu',
        name: 'Firm Tofu',
        amount: 300,
        unit: 'g',
      },
      {
        ingredientId: 'ing-mushrooms',
        name: 'Fresh Mushrooms',
        amount: 200,
        unit: 'g',
      },
      {
        ingredientId: 'ing-scallions',
        name: 'Leek / Scallions',
        amount: 2,
        unit: 'stalks',
      },
      {
        ingredientId: 'ing-soy-sauce',
        name: 'Soy Sauce',
        amount: 2,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-cooking-oil',
        name: 'Cooking Oil',
        amount: 2,
        unit: 'tbsp',
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Chiên vàng đậu hũ',
        instruction:
          'Cắt đậu hũ thành khối vuông nhỏ vừa ăn. Chiên ngập dầu cho các mặt vàng giòn rồi vớt ra thấm ráo dầu.',
        timerDurationSeconds: 300,
      },
      {
        stepNumber: 2,
        title: 'Sơ chế nấm',
        instruction:
          'Nấm ngâm nước muối loãng, rửa sạch và cắt miếng vừa ăn.',
      },
      {
        stepNumber: 3,
        title: 'Xào nấm & đậu hũ',
        instruction:
          'Phi thơm hành boa-rô, cho nấm vào xào chín tới rồi thêm đậu hũ chiên cùng nước tương và chút tiêu.',
        timerDurationSeconds: 180,
      },
      {
        stepNumber: 4,
        title: 'Hoàn thành món ăn',
        instruction:
          'Đảo đều nhẹ tay cho đậu hũ ngấm vị đậm đà, rắc hành ngò lên trên và tắt bếp.',
        timerDurationSeconds: 30,
      },
    ],
  },

  // 5. Cánh Gà Chiên Nước Mắm
  {
    id: 'canh-ga-chien',
    title: 'Cánh gà chiên nước mắm',
    description:
      'Cánh gà chiên giòn rụm áo lớp sốt nước mắm tỏi ớt kẹo dẻo thơm lừng cay mặn ngọt bùng nổ hương vị.',
    categoryId: 'mon-kho',
    image: 'canhGaChien',
    prepTimeMinutes: 10,
    cookTimeMinutes: 20,
    servings: 3,
    difficulty: 'Easy',
    dietaryPreferences: ['Dairy-Free', 'High-Protein'],
    rating: 4.8,
    nutritionalSummary: {
      calories: 420,
      protein: 32,
      carbs: 12,
      fat: 26,
    },
    ingredients: [
      {
        ingredientId: 'ing-chicken-wings',
        name: 'Chicken Wings',
        amount: 600,
        unit: 'g',
      },
      {
        ingredientId: 'ing-garlic',
        name: 'Garlic',
        amount: 6,
        unit: 'cloves',
      },
      {
        ingredientId: 'ing-fish-sauce',
        name: 'Fish Sauce',
        amount: 3,
        unit: 'tbsp',
      },
      {
        ingredientId: 'ing-sugar',
        name: 'Sugar',
        amount: 2.5,
        unit: 'tbsp',
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Chiên vàng cánh gà',
        instruction:
          'Cánh gà rửa sạch, thấm khô rồi chiên vàng giòn trong dầu nóng.',
        timerDurationSeconds: 720,
      },
      {
        stepNumber: 2,
        title: 'Nấu sốt nước mắm',
        instruction:
          'Phi thơm tỏi ớt băm, thêm nước mắm và đường đun sủi bọt keo lại.',
        timerDurationSeconds: 120,
      },
      {
        stepNumber: 3,
        title: 'Đảo đều cánh gà',
        instruction:
          'Cho cánh gà vào xóc đều cùng sốt cho bám đều quanh từng miếng.',
        timerDurationSeconds: 90,
      },
    ],
  },

  // 6. Thịt Heo Cháy Cạnh
  {
    id: 'thit-heo-chay-canh',
    title: 'Thịt heo cháy cạnh',
    description:
      'Thịt ba chỉ thái mỏng đảo cháy cạnh giòn ngọt ngập tràn vị thơm của hành khô và nước mắm truyền thống.',
    categoryId: 'mon-kho',
    image: 'thitHeoChayCanh',
    prepTimeMinutes: 10,
    cookTimeMinutes: 15,
    servings: 3,
    difficulty: 'Easy',
    dietaryPreferences: ['Gluten-Free', 'Dairy-Free', 'High-Protein'],
    rating: 4.7,
    nutritionalSummary: {
      calories: 380,
      protein: 28,
      carbs: 6,
      fat: 28,
    },
    ingredients: [
      {
        ingredientId: 'ing-pork-belly',
        name: 'Pork Belly',
        amount: 450,
        unit: 'g',
      },
      {
        ingredientId: 'ing-shallots',
        name: 'Shallots',
        amount: 3,
        unit: 'bulbs',
      },
      {
        ingredientId: 'ing-fish-sauce',
        name: 'Fish Sauce',
        amount: 2.5,
        unit: 'tbsp',
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Đảo thịt cháy cạnh',
        instruction:
          'Cho thịt vào chảo đảo trên lửa vừa cho tiết mỡ và xém vàng các cạnh.',
        timerDurationSeconds: 360,
      },
      {
        stepNumber: 2,
        title: 'Nêm gia vị',
        instruction:
          'Cho hành khô, nước mắm và đường vào đảo đều với lửa lớn cho keo thơm.',
        timerDurationSeconds: 120,
      },
    ],
  },

  // 7. Trứng Chiên Hành
  {
    id: 'trung-chien',
    title: 'Trứng chiên hành',
    description:
      'Món trứng chiên hành xốp mềm thơm phức, đậm đà vị nước mắm và tiêu xay, món ăn quen thuộc trong mọi bữa cơm gia đình.',
    categoryId: 'bua-sang',
    image: 'trungChien',
    prepTimeMinutes: 5,
    cookTimeMinutes: 10,
    servings: 2,
    difficulty: 'Easy',
    dietaryPreferences: ['Vegetarian', 'Gluten-Free', 'Dairy-Free', 'Low-Carb'],
    rating: 4.5,
    nutritionalSummary: {
      calories: 210,
      protein: 14,
      carbs: 3,
      fat: 16,
    },
    ingredients: [
      {
        ingredientId: 'ing-eggs',
        name: 'Fresh Eggs',
        amount: 4,
        unit: 'pieces',
      },
      {
        ingredientId: 'ing-scallions',
        name: 'Scallions',
        amount: 4,
        unit: 'stalks',
      },
      {
        ingredientId: 'ing-fish-sauce',
        name: 'Fish Sauce',
        amount: 1.5,
        unit: 'tbsp',
      },
    ],
    instructions: [
      {
        stepNumber: 1,
        title: 'Đánh trứng với hành',
        instruction:
          'Đập trứng vào tô, thêm hành lá cắt nhỏ, nước mắm và tiêu. Đánh đều cho nổi bọt.',
        timerDurationSeconds: 60,
      },
      {
        stepNumber: 2,
        title: 'Chiên vàng trứng',
        instruction:
          'Đun sôi dầu trong chảo, đổ trứng vào chiên nở phồng vàng hai mặt.',
        timerDurationSeconds: 180,
      },
    ],
  },
];

export const recipesMap: Record<string, Recipe> = Object.fromEntries(
  recipes.map((recipe) => [recipe.id, recipe])
);

export const getRecipeById = (id: string): Recipe | undefined =>
  recipesMap[id];

export const getRecipesByCategory = (categoryId: string): Recipe[] =>
  recipes.filter((recipe) => recipe.categoryId === categoryId);

/**
 * "Fridge to Table" smart matching:
 * Matches available pantry ingredient IDs against all recipes.
 * Returns match results sorted by match percentage descending.
 */
export const matchRecipesByPantry = (
  pantryIngredientIds: string[]
): RecipeMatchResult[] => {
  const pantrySet = new Set(pantryIngredientIds);

  return recipes
    .map((recipe) => {
      const matchedIngredients = recipe.ingredients.filter((item) =>
        pantrySet.has(item.ingredientId)
      );
      const missingIngredients = recipe.ingredients.filter(
        (item) => !pantrySet.has(item.ingredientId)
      );
      const total = recipe.ingredients.length;
      const matchPercentage =
        total > 0 ? Math.round((matchedIngredients.length / total) * 100) : 0;

      return {
        recipe,
        matchedIngredients,
        missingIngredients,
        matchPercentage,
      };
    })
    .sort((a, b) => b.matchPercentage - a.matchPercentage);
};
