// Food database for search/autocomplete functionality
export const foodDatabase = {
  breakfast: [
    "Oatmeal",
    "Pancakes",
    "Waffles",
    "French Toast",
    "Cereal",
    "Toast",
    "Bagel",
    "Muffin",
    "Eggs",
    "Bacon",
    "Sausage",
    "Ham",
    "Yogurt",
    "Fruit Salad",
    "Smoothie",
    "Orange Juice",
    "Coffee",
    "Tea",
    "Milk",
    "Granola",
    "Croissant",
    "Danish",
    "Scone",
    "Porridge",
  ],
  lunch: [
    "Sandwich",
    "Soup",
    "Salad",
    "Pasta",
    "Pizza",
    "Burger",
    "Hot Dog",
    "Wrap",
    "Taco",
    "Quesadilla",
    "Stir Fry",
    "Fried Rice",
    "Noodles",
    "Sushi",
    "Fish",
    "Chicken",
    "Turkey",
    "Beef",
    "Pork",
    "Vegetables",
    "Rice",
    "Bread",
    "Cheese",
    "Tomato",
  ],
  dinner: [
    "Steak",
    "Chicken",
    "Fish",
    "Pork Chops",
    "Lamb",
    "Turkey",
    "Meatloaf",
    "Roast Beef",
    "Pasta",
    "Lasagna",
    "Spaghetti",
    "Pizza",
    "Casserole",
    "Stew",
    "Curry",
    "Chili",
    "Potatoes",
    "Rice",
    "Vegetables",
    "Salad",
    "Bread",
    "Rolls",
    "Wine",
    "Water",
  ],
  snacks: [
    "Chips",
    "Crackers",
    "Cookies",
    "Cake",
    "Ice Cream",
    "Chocolate",
    "Candy",
    "Nuts",
    "Fruit",
    "Apple",
    "Banana",
    "Orange",
    "Grapes",
    "Berries",
    "Cheese",
    "Yogurt",
    "Popcorn",
    "Pretzels",
    "Trail Mix",
    "Granola Bar",
    "Muffin",
    "Donut",
  ],
  general: [
    // Common ingredients and foods
    "Chicken",
    "Beef",
    "Pork",
    "Fish",
    "Turkey",
    "Lamb",
    "Eggs",
    "Milk",
    "Cheese",
    "Butter",
    "Bread",
    "Rice",
    "Pasta",
    "Potatoes",
    "Tomatoes",
    "Onions",
    "Garlic",
    "Carrots",
    "Broccoli",
    "Spinach",
    "Lettuce",
    "Mushrooms",
    "Peppers",
    "Beans",
    "Lentils",
    "Quinoa",
    "Oats",
    "Apples",
    "Bananas",
    "Oranges",
    "Strawberries",
    "Blueberries",
    "Grapes",
    "Avocado",
    "Olive Oil",
    "Salt",
    "Pepper",
    "Sugar",
    "Flour",
    "Honey",
    "Vanilla",
    "Cinnamon",
    // Common dishes
    "Soup",
    "Salad",
    "Sandwich",
    "Pizza",
    "Burger",
    "Tacos",
    "Sushi",
    "Curry",
    "Stir Fry",
    "Pancakes",
    "Waffles",
    "French Toast",
    "Omelette",
    "Smoothie",
    "Ice Cream",
    "Cake",
    // Beverages
    "Water",
    "Coffee",
    "Tea",
    "Juice",
    "Soda",
    "Wine",
    "Beer",
    "Milk",
    "Smoothie",
  ],
};

// Get all unique foods from database
export const getAllFoods = (): string[] => {
  const allFoods = new Set<string>();

  Object.values(foodDatabase).forEach((category) => {
    category.forEach((food) => allFoods.add(food));
  });

  return Array.from(allFoods).sort();
};

// Search foods by query
export const searchFoods = (query: string, limit: number = 10): string[] => {
  if (!query.trim()) return [];

  const allFoods = getAllFoods();
  const lowerQuery = query.toLowerCase();

  // Exact matches first, then partial matches
  const exactMatches = allFoods.filter(
    (food) => food.toLowerCase() === lowerQuery
  );

  const partialMatches = allFoods.filter(
    (food) =>
      food.toLowerCase().includes(lowerQuery) &&
      food.toLowerCase() !== lowerQuery
  );

  return [...exactMatches, ...partialMatches].slice(0, limit);
};

// Get foods by category
export const getFoodsByCategory = (
  category: keyof typeof foodDatabase
): string[] => {
  return foodDatabase[category] || [];
};
