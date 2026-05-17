import {
  SHOPPING_SECTIONS,
  type IngredientCategoryOverrides,
  type ShoppingSection,
  type SortedIngredient,
} from "../../types";
import { getCanonicalIngredientName } from "../shopping-list/shopping-list.utils";

export type SectionedIngredients = {
  section: ShoppingSection;
  ingredients: SortedIngredient[];
};

const SECTION_KEYWORDS: Record<ShoppingSection, string[]> = {
  Produce: [
    "apple",
    "apples",
    "aubergine",
    "avocado",
    "banana",
    "bananas",
    "basil",
    "beansprout",
    "beetroot",
    "broccoli",
    "cabbage",
    "carrot",
    "carrots",
    "cauliflower",
    "celery",
    "chilli",
    "chillies",
    "coriander",
    "cress",
    "courgette",
    "cucumber",
    "garlic",
    "ginger",
    "green beans",
    "herbs",
    "leek",
    "leeks",
    "lemon",
    "lemons",
    "lettuce",
    "lime",
    "limes",
    "mango",
    "mushroom",
    "mushrooms",
    "onion",
    "onions",
    "parsley",
    "pepper",
    "peppers",
    "potato",
    "potatoes",
    "salad",
    "spinach",
    "spring onion",
    "squash",
    "sweet potato",
    "tomato",
    "tomatoes",
  ],
  "Meat & Fish": [
    "anchovies",
    "anchovy",
    "bacon",
    "beef",
    "chicken",
    "cod",
    "fish",
    "lamb",
    "mince",
    "pancetta",
    "pork",
    "prawn",
    "prawns",
    "salmon",
    "sausage",
    "sausages",
    "steak",
    "turkey",
  ],
  "Dairy & Eggs": [
    "butter",
    "cheddar",
    "cheese",
    "cream",
    "creme fraiche",
    "egg",
    "eggs",
    "feta",
    "milk",
    "mozzarella",
    "parmesan",
    "yoghurt",
    "yogurt",
  ],
  Bakery: [
    "bagel",
    "bagels",
    "bread",
    "brioche",
    "bun",
    "buns",
    "ciabatta",
    "garlic bread",
    "naan",
    "pitta",
    "rolls",
    "tortilla",
    "wrap",
    "wraps",
  ],
  Pantry: [
    "beans",
    "chickpeas",
    "chopped tomatoes",
    "coconut milk",
    "couscous",
    "flour",
    "gnocchi",
    "honey",
    "lentils",
    "macaroni",
    "mustar",
    "mustard",
    "noodles",
    "oil",
    "olive oil",
    "pasta",
    "peppercorn",
    "rice",
    "sauce",
    "soy sauce",
    "spice",
    "spices",
    "stock",
    "sugar",
    "tinned",
    "vinegar",
  ],
  Frozen: ["frozen", "ice cream", "peas", "pizza"],
  Household: [
    "cling film",
    "foil",
    "kitchen roll",
    "napkins",
    "parchment",
    "toilet roll",
  ],
  Other: [],
};

const SECTION_OVERRIDES: Array<[string, ShoppingSection]> = [
  ["chopped tomatoes", "Pantry"],
  ["canned tomatoes", "Pantry"],
  ["tinned tomatoes", "Pantry"],
  ["chicken stock", "Pantry"],
  ["beef stock", "Pantry"],
  ["vegetable stock", "Pantry"],
  ["coconut milk", "Pantry"],
  ["bay leaf", "Pantry"],
  ["dijon", "Pantry"],
  ["foil", "Household"],
  ["green beans", "Produce"],
  ["garlic bread", "Bakery"],
  ["sweet potato", "Produce"],
];

const normalizeName = (name: string): string => name.toLowerCase().trim();

const isShoppingSection = (value: string): value is ShoppingSection =>
  SHOPPING_SECTIONS.includes(value as ShoppingSection);

export const getIngredientSection = (
  name: string,
  overrides: IngredientCategoryOverrides = {},
): ShoppingSection => {
  const override = overrides[getCanonicalIngredientName(name)];
  if (override && isShoppingSection(override)) {
    return override;
  }

  const normalized = normalizeName(name);

  const builtInOverride = SECTION_OVERRIDES.find(([phrase]) =>
    normalized.includes(phrase),
  );
  if (builtInOverride) {
    return builtInOverride[1];
  }

  for (const section of SHOPPING_SECTIONS) {
    if (section === "Other") continue;
    const keywords = SECTION_KEYWORDS[section];
    if (keywords.some((keyword) => normalized.includes(keyword))) {
      return section;
    }
  }

  return "Other";
};

export const groupIngredientsBySection = (
  ingredients: SortedIngredient[],
  overrides: IngredientCategoryOverrides = {},
): SectionedIngredients[] => {
  const groups = new Map<ShoppingSection, SortedIngredient[]>();

  for (const ingredient of ingredients) {
    const section = getIngredientSection(ingredient.name, overrides);
    const group = groups.get(section) || [];
    group.push(ingredient);
    groups.set(section, group);
  }

  return SHOPPING_SECTIONS.map((section) => ({
    section,
    ingredients: groups.get(section) || [],
  })).filter((group) => group.ingredients.length > 0);
};
