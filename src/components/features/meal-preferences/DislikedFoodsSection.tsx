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
import type { DislikedFood } from "@/hooks/useMealPreferences";

interface DislikedFoodsSectionProps {
  // From useMealPreferences
  dislikeSeverities: Array<{ value: string; label: string }>;
  newDislike: string;
  setNewDislike: (value: string) => void;
  newDislikeSeverity: string;
  setNewDislikeSeverity: (value: string) => void;
  addDislike: () => void;
  removeDislike: (id: number) => void;
  dislikedFoods: DislikedFood[];

  // From useEditMode
  editingId: number | null;
  editingName: string;
  editingExtra: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  startEdit: (item: DislikedFood) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setEditingName: (name: string) => void;
  setEditingExtra: (extra: string) => void;
}

const DislikedFoodsSection = memo<DislikedFoodsSectionProps>(
  ({
    dislikeSeverities,
    newDislike,
    setNewDislike,
    newDislikeSeverity,
    setNewDislikeSeverity,
    addDislike,
    removeDislike,
    dislikedFoods,
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
    return (
      <section aria-labelledby="disliked-foods-heading">
        <Card>
          <CardHeader>
            <h2 id="disliked-foods-heading" className="text-xl font-bold mb-0">
              Disliked Foods
            </h2>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2 mb-8 w-full">
              <FoodSearchInput
                placeholder="Add a disliked food..."
                value={newDislike}
                onChange={setNewDislike}
                aria-label="Disliked food name"
                className="w-full"
              />
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <Select
                  value={newDislikeSeverity}
                  onValueChange={setNewDislikeSeverity}
                >
                  <SelectTrigger className="w-full md:w-2/3 text-foreground dark:bg-input dark:text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-foreground dark:bg-input dark:text-foreground">
                    {dislikeSeverities.map((severity) => (
                      <SelectItem key={severity.value} value={severity.value}>
                        {severity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={addDislike}
                  className="w-full md:w-1/3 md:min-w-[80px]"
                >
                  Add
                </Button>
              </div>
            </div>

            <ul className="space-y-2">
              {dislikedFoods.length === 0 && (
                <li className="text-muted-foreground text-sm italic">
                  No disliked foods added yet.
                </li>
              )}
              {dislikedFoods.map((food) => (
                <FoodItem
                  key={food.id}
                  name={food.name}
                  extra={food.severity}
                  isEditing={editingId === food.id}
                  editingName={editingName}
                  editingExtra={editingExtra}
                  onStartEdit={() => startEdit(food)}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                  onRemove={() => removeDislike(food.id)}
                  onEditNameChange={setEditingName}
                  onEditExtraChange={setEditingExtra}
                  inputRef={inputRef}
                  extraOptions={dislikeSeverities}
                  extraLabel="Severity"
                  showSeverityBadge={true}
                  severityType="dislike"
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    );
  }
);

DislikedFoodsSection.displayName = "DislikedFoodsSection";

export default DislikedFoodsSection;
