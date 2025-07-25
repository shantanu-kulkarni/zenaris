import React, { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FoodSearchInput from "@/components/ui/food-search-input";
import FoodItem from "./FoodItem";
import type { FavoriteFood } from "@/hooks/useMealPreferences";

interface FavoriteFoodsSectionProps {
  // From useMealPreferences
  foodCategories: string[];
  newFood: string;
  setNewFood: (value: string) => void;
  newCategory: string;
  setNewCategory: (value: string) => void;
  addFood: () => void;
  removeFood: (id: number) => void;
  groupedFavorites: Array<{ category: string; foods: FavoriteFood[] }>;

  // From useEditMode
  editingId: number | null;
  editingName: string;
  editingExtra: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  startEdit: (item: FavoriteFood) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setEditingName: (name: string) => void;
  setEditingExtra: (extra: string) => void;
}

const FavoriteFoodsSection = memo<FavoriteFoodsSectionProps>(
  ({
    foodCategories,
    newFood,
    setNewFood,
    newCategory,
    setNewCategory,
    addFood,
    removeFood,
    groupedFavorites,
    editingId,
    editingName,
    editingExtra,
    inputRef,
    startEdit,
    saveEdit,
    cancelEdit,
    setEditingName,
    setEditingExtra,
  }) => {
    const categoryOptions = foodCategories.map((cat) => ({
      value: cat,
      label: cat,
    }));

    return (
      <section aria-labelledby="favorite-foods-heading">
        <Card>
          <CardHeader>
            <h2 id="favorite-foods-heading" className="text-xl font-bold mb-0">
              Favorite Foods
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-8 w-full">
              <FoodSearchInput
                placeholder="Add a favorite food..."
                value={newFood}
                onChange={setNewFood}
                aria-label="Favorite food name"
                className="w-full"
              />
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger className="w-full md:w-2/3 text-foreground dark:bg-input dark:text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-foreground dark:bg-input dark:text-foreground">
                    {foodCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={addFood}
                  className="w-full md:w-1/3 md:min-w-[80px]"
                >
                  Add
                </Button>
              </div>
            </div>

            {groupedFavorites.map((group) => (
              <div key={group.category} className="mb-4">
                <div className="font-semibold text-primary mb-2 text-lg">
                  {group.category}
                </div>
                <ul className="space-y-2">
                  {group.foods.length === 0 && (
                    <li className="text-muted-foreground text-sm italic">
                      No favorites added for {group.category.toLowerCase()}.
                    </li>
                  )}
                  {group.foods.map((food) => (
                    <FoodItem
                      key={food.id}
                      name={food.name}
                      extra={food.category}
                      isEditing={editingId === food.id}
                      editingName={editingName}
                      editingExtra={editingExtra}
                      onStartEdit={() => startEdit(food)}
                      onSaveEdit={saveEdit}
                      onCancelEdit={cancelEdit}
                      onRemove={() => removeFood(food.id)}
                      onEditNameChange={setEditingName}
                      onEditExtraChange={setEditingExtra}
                      inputRef={inputRef}
                      extraOptions={categoryOptions}
                      extraLabel="Category"
                      showSeverityBadge={false}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </CardContent>
        </Card>
      </section>
    );
  }
);

FavoriteFoodsSection.displayName = "FavoriteFoodsSection";

export default FavoriteFoodsSection;
