import type { Category } from '@/types/recipe';

export const categories: Category[] = [
  {
    id: 'mon-kho',
    name: 'Món kho',
    slug: 'mon-kho',
    icon: 'Flame',
    image: 'catMonKho',
    description: 'Các món kho đậm đà, thơm ngon cho bữa cơm gia đình.',
  },
  {
    id: 'mon-canh',
    name: 'Món canh',
    slug: 'mon-canh',
    icon: 'Soup',
    image: 'catMonCanh',
    description: 'Các món canh thanh mát, bổ dưỡng, đậm đà hương vị.',
  },
  {
    id: 'mon-xao',
    name: 'Món xào',
    slug: 'mon-xao',
    icon: 'UtensilsCrossed',
    image: 'catMonXao',
    description: 'Các món xào giòn ngọt, chế biến nhanh gọn.',
  },
  {
    id: 'mon-chay',
    name: 'Món chay',
    slug: 'mon-chay',
    icon: 'Salad',
    image: 'catMonChay',
    description: 'Món chay thanh đạm, tốt cho sức khỏe.',
  },
  {
    id: 'bua-sang',
    name: 'Bữa sáng',
    slug: 'bua-sang',
    icon: 'Egg',
    image: 'catBuaSang',
    description: 'Món ăn sáng thơm ngon nạp năng lượng ngày mới.',
  },
  {
    id: 'vietnamese-classics',
    name: 'Vietnamese Classics',
    slug: 'vietnamese-classics',
    icon: 'UtensilsCrossed',
    description: 'Timeless home-cooked comfort dishes inspired by traditional Vietnamese family meals.',
  },
  {
    id: 'soups-canh',
    name: 'Soups & Broths',
    slug: 'soups-canh',
    icon: 'Soup',
    description: 'Warm, aromatic soups and comforting clear broths packed with fresh herbs.',
  },
  {
    id: 'quick-easy',
    name: 'Quick & Easy',
    slug: 'quick-easy',
    icon: 'Zap',
    description: 'Wholesome, flavorful meals ready in under 20 minutes for busy weeknights.',
  },
  {
    id: 'braised-stews',
    name: 'Braised & Stews',
    slug: 'braised-stews',
    icon: 'Flame',
    description: 'Richly caramelized, slow-simmered savory dishes perfected with fish sauce and coconut water.',
  },
  {
    id: 'high-protein',
    name: 'High Protein',
    slug: 'high-protein',
    icon: 'Dumbbell',
    description: 'Nutrient-dense, protein-packed recipes to fuel your day and nourish your body.',
  },
];

export const categoriesMap: Record<string, Category> = Object.fromEntries(
  categories.map((cat) => [cat.id, cat])
);

export const getCategoryById = (id: string): Category | undefined =>
  categoriesMap[id];
