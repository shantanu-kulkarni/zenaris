import { useState, useCallback } from "react";
import { toast } from "sonner";

export interface FavoriteFood {
  id: number;
  name: string;
  category: string;
}

export interface DislikedFood {
  id: number;
  name: string;
  severity: string;
}

export interface Allergy {
  id: number;
  name: string;
  severity: string;
}

const foodCategories = ["Breakfast", "Lunch", "Dinner", "Snacks"];

const dislikeSeverities = [
  { value: "mild", label: "Mild Dislike" },
  { value: "absolute", label: "Absolutely Won't Eat" },
];

const allergySeverities = [
  { value: "mild", label: "Mild Intolerance" },
  { value: "severe", label: "Severe Allergy" },
];

const commonAllergies = [
  "Nuts",
  "Dairy",
  "Gluten",
  "Eggs",
  "Soy",
  "Fish",
  "Shellfish",
  "Sesame",
];

export const useMealPreferences = () => {
  // Favorite Foods State
  const [favoriteFoods, setFavoriteFoods] = useState<FavoriteFood[]>([]);
  const [newFood, setNewFood] = useState("");
  const [newCategory, setNewCategory] = useState(foodCategories[0]);

  // Disliked Foods State
  const [dislikedFoods, setDislikedFoods] = useState<DislikedFood[]>([]);
  const [newDislike, setNewDislike] = useState("");
  const [newDislikeSeverity, setNewDislikeSeverity] = useState(
    dislikeSeverities[0].value
  );

  // Allergies State
  const [allergies, setAllergies] = useState<Allergy[]>([]);
  const [newAllergy, setNewAllergy] = useState("");
  const [newAllergySeverity, setNewAllergySeverity] = useState(
    allergySeverities[0].value
  );
  const [quickAllergies, setQuickAllergies] = useState<string[]>([]);

  // Special Instructions State
  const [specialInstructions, setSpecialInstructions] = useState("");

  // Utility function to normalize strings for comparison
  const normalizeString = useCallback((str: string) => {
    return str.trim().toLowerCase();
  }, []);

  // Check if favorite food already exists
  const isFavoriteFoodDuplicate = useCallback(
    (name: string, category: string) => {
      const normalizedName = normalizeString(name);
      return favoriteFoods.some(
        (food) =>
          normalizeString(food.name) === normalizedName &&
          food.category === category
      );
    },
    [favoriteFoods, normalizeString]
  );

  // Check if disliked food already exists
  const isDislikedFoodDuplicate = useCallback(
    (name: string) => {
      const normalizedName = normalizeString(name);
      return dislikedFoods.some(
        (food) => normalizeString(food.name) === normalizedName
      );
    },
    [dislikedFoods, normalizeString]
  );

  // Check if allergy already exists
  const isAllergyDuplicate = useCallback(
    (name: string) => {
      const normalizedName = normalizeString(name);
      return allergies.some(
        (allergy) => normalizeString(allergy.name) === normalizedName
      );
    },
    [allergies, normalizeString]
  );

  // Favorite Foods Actions
  const addFood = useCallback(() => {
    if (!newFood.trim()) return;

    const trimmedName = newFood.trim();

    // Check for duplicates
    if (isFavoriteFoodDuplicate(trimmedName, newCategory)) {
      toast.error(
        `"${trimmedName}" is already in your ${newCategory.toLowerCase()} favorites`
      );
      return;
    }

    const newFavoriteFood: FavoriteFood = {
      id: Date.now(),
      name: trimmedName,
      category: newCategory,
    };

    setFavoriteFoods((prev) => [...prev, newFavoriteFood]);
    toast.success(`Added "${trimmedName}" to ${newCategory.toLowerCase()}`);
    setNewFood("");
  }, [newFood, newCategory, isFavoriteFoodDuplicate]);

  const removeFood = useCallback(
    (id: number) => {
      const foodToRemove = favoriteFoods.find((f) => f.id === id);
      setFavoriteFoods((prev) => prev.filter((f) => f.id !== id));
      if (foodToRemove) {
        toast.success(`Removed "${foodToRemove.name}" from favorites`);
      }
    },
    [favoriteFoods]
  );

  const updateFood = useCallback(
    (id: number, name: string, category: string) => {
      // Check if the new name/category combination would create a duplicate
      const trimmedName = name.trim();
      const existingDuplicate = favoriteFoods.find(
        (food) =>
          food.id !== id &&
          normalizeString(food.name) === normalizeString(trimmedName) &&
          food.category === category
      );

      if (existingDuplicate) {
        toast.error(
          `"${trimmedName}" is already in your ${category.toLowerCase()} favorites`
        );
        return;
      }

      setFavoriteFoods((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, name: trimmedName, category } : f
        )
      );
    },
    [favoriteFoods, normalizeString]
  );

  // Disliked Foods Actions
  const addDislike = useCallback(() => {
    if (!newDislike.trim()) return;

    const trimmedName = newDislike.trim();

    // Check for duplicates
    if (isDislikedFoodDuplicate(trimmedName)) {
      toast.error(`"${trimmedName}" is already in your disliked foods`);
      return;
    }

    const severityLabel =
      dislikeSeverities.find((s) => s.value === newDislikeSeverity)?.label ||
      newDislikeSeverity;
    const newDislikedFood: DislikedFood = {
      id: Date.now(),
      name: trimmedName,
      severity: newDislikeSeverity,
    };

    setDislikedFoods((prev) => [...prev, newDislikedFood]);
    toast.success(`Added "${trimmedName}" to dislikes (${severityLabel})`);
    setNewDislike("");
  }, [newDislike, newDislikeSeverity, isDislikedFoodDuplicate]);

  const removeDislike = useCallback(
    (id: number) => {
      const dislikeToRemove = dislikedFoods.find((f) => f.id === id);
      setDislikedFoods((prev) => prev.filter((f) => f.id !== id));
      if (dislikeToRemove) {
        toast.success(`Removed "${dislikeToRemove.name}" from dislikes`);
      }
    },
    [dislikedFoods]
  );

  const updateDislike = useCallback(
    (id: number, name: string, severity: string) => {
      // Check if the new name would create a duplicate
      const trimmedName = name.trim();
      const existingDuplicate = dislikedFoods.find(
        (food) =>
          food.id !== id &&
          normalizeString(food.name) === normalizeString(trimmedName)
      );

      if (existingDuplicate) {
        toast.error(`"${trimmedName}" is already in your disliked foods`);
        return;
      }

      setDislikedFoods((prev) =>
        prev.map((f) =>
          f.id === id ? { ...f, name: trimmedName, severity } : f
        )
      );
    },
    [dislikedFoods, normalizeString]
  );

  // Allergies Actions
  const addAllergy = useCallback(
    (name: string, severity: string) => {
      if (!name.trim()) return;

      const trimmedName = name.trim();

      // Check for duplicates
      if (isAllergyDuplicate(trimmedName)) {
        toast.error(`"${trimmedName}" is already in your allergies list`);
        return;
      }

      const severityLabel =
        allergySeverities.find((s) => s.value === severity)?.label || severity;
      const newAllergyItem: Allergy = {
        id: Date.now(),
        name: trimmedName,
        severity,
      };

      setAllergies((prev) => [...prev, newAllergyItem]);
      toast.success(`Added "${trimmedName}" allergy (${severityLabel})`);
    },
    [isAllergyDuplicate]
  );

  const handleAddAllergy = useCallback(() => {
    if (!newAllergy.trim()) return;
    addAllergy(newAllergy, newAllergySeverity);
    setNewAllergy("");
  }, [newAllergy, newAllergySeverity, addAllergy]);

  const removeAllergy = useCallback(
    (id: number) => {
      const allergyToRemove = allergies.find((a) => a.id === id);
      setAllergies((prev) => prev.filter((a) => a.id !== id));

      // If the removed allergy was in quickAllergies, remove it from there too
      if (allergyToRemove && quickAllergies.includes(allergyToRemove.name)) {
        setQuickAllergies((prev) =>
          prev.filter((qa) => qa !== allergyToRemove.name)
        );
        toast.success(
          `Removed "${allergyToRemove.name}" allergy and unchecked pill`
        );
      } else if (allergyToRemove) {
        toast.success(`Removed "${allergyToRemove.name}" allergy`);
      }
    },
    [allergies, quickAllergies]
  );

  const updateAllergy = useCallback(
    (id: number, name: string, severity: string) => {
      const originalAllergy = allergies.find((a) => a.id === id);
      const originalName = originalAllergy?.name;
      const trimmedName = name.trim();

      // Check if the new name would create a duplicate (excluding the current item)
      const existingDuplicate = allergies.find(
        (allergy) =>
          allergy.id !== id &&
          normalizeString(allergy.name) === normalizeString(trimmedName)
      );

      if (existingDuplicate) {
        toast.error(`"${trimmedName}" is already in your allergies list`);
        return;
      }

      setAllergies((prev) =>
        prev.map((a) =>
          a.id === id ? { ...a, name: trimmedName, severity } : a
        )
      );

      // Handle quick allergy pill synchronization
      if (originalName && originalName !== trimmedName) {
        // Remove original name from quick allergies if it was there
        if (quickAllergies.includes(originalName)) {
          setQuickAllergies((prev) => prev.filter((qa) => qa !== originalName));
          toast.info(`Unchecked "${originalName}" pill since name was changed`);
        }

        // Add new name to quick allergies if it matches a common allergy
        if (
          commonAllergies.includes(trimmedName) &&
          !quickAllergies.includes(trimmedName)
        ) {
          setQuickAllergies((prev) => [...prev, trimmedName]);
          toast.info(
            `Checked "${trimmedName}" pill since name matches common allergy`
          );
        }
      }
    },
    [allergies, quickAllergies, normalizeString]
  );

  const toggleQuickAllergy = useCallback(
    (name: string) => {
      if (quickAllergies.includes(name)) {
        setQuickAllergies((prev) => prev.filter((a) => a !== name));
        setAllergies((prev) => prev.filter((a) => a.name !== name));
        toast.success(`Removed "${name}" allergy`);
      } else {
        // Check if allergy already exists before adding
        if (isAllergyDuplicate(name)) {
          toast.error(`"${name}" is already in your allergies list`);
          return;
        }

        setQuickAllergies((prev) => [...prev, name]);
        addAllergy(name, "severe");
      }
    },
    [quickAllergies, addAllergy, isAllergyDuplicate]
  );

  // Computed values
  const groupedFavorites = foodCategories.map((category) => ({
    category,
    foods: favoriteFoods.filter((f) => f.category === category),
  }));

  // Form validation
  const validateForm = useCallback(() => {
    return (
      favoriteFoods.length > 0 ||
      dislikedFoods.length > 0 ||
      allergies.length > 0 ||
      specialInstructions.trim().length > 0
    );
  }, [
    favoriteFoods.length,
    dislikedFoods.length,
    allergies.length,
    specialInstructions,
  ]);

  const handleSave = useCallback(() => {
    if (!validateForm()) {
      toast.error(
        "Please add at least one preference or instruction before saving."
      );
      return;
    }

    const formData = {
      favoriteFoods,
      dislikedFoods,
      allergies,
      specialInstructions,
    };

    console.log("Saving meal preferences:", formData);
    toast.success("Meal preferences saved successfully!");
  }, [
    validateForm,
    favoriteFoods,
    dislikedFoods,
    allergies,
    specialInstructions,
  ]);

  return {
    // Constants
    foodCategories,
    dislikeSeverities,
    allergySeverities,
    commonAllergies,
    maxInstructions: 500,

    // State
    favoriteFoods,
    newFood,
    newCategory,
    dislikedFoods,
    newDislike,
    newDislikeSeverity,
    allergies,
    newAllergy,
    newAllergySeverity,
    quickAllergies,
    specialInstructions,

    // Computed
    groupedFavorites,

    // Actions
    setNewFood,
    setNewCategory,
    addFood,
    removeFood,
    updateFood,

    setNewDislike,
    setNewDislikeSeverity,
    addDislike,
    removeDislike,
    updateDislike,

    setNewAllergy,
    setNewAllergySeverity,
    addAllergy,
    handleAddAllergy,
    removeAllergy,
    updateAllergy,
    toggleQuickAllergy,

    setSpecialInstructions,
    handleSave,
  };
};
