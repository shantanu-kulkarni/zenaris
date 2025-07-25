import React, { memo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import FoodSearchInput from "@/components/ui/food-search-input";
import SeverityBadge from "./SeverityBadge";

interface FoodItemProps {
  name: string;
  extra?: string;
  isEditing: boolean;
  editingName: string;
  editingExtra: string;
  onStartEdit: () => void;
  onSaveEdit: () => void;
  onCancelEdit: () => void;
  onRemove: () => void;
  onEditNameChange: (value: string) => void;
  onEditExtraChange: (value: string) => void;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  extraOptions?: Array<{ value: string; label: string }>;
  extraLabel?: string;
  showSeverityBadge?: boolean;
  severityType?: "dislike" | "allergy";
  className?: string;
}

const FoodItem = memo<FoodItemProps>(
  ({
    name,
    extra,
    isEditing,
    editingName,
    editingExtra,
    onStartEdit,
    onSaveEdit,
    onCancelEdit,
    onRemove,
    onEditNameChange,
    onEditExtraChange,
    inputRef,
    extraOptions = [],
    extraLabel = "Category",
    showSeverityBadge = false,
    severityType = "dislike",
    className = "flex items-center justify-between bg-card border border-border shadow-sm rounded-lg p-4",
  }) => {
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") onSaveEdit();
      if (e.key === "Escape") onCancelEdit();
    };

    return (
      <li className={className}>
        {isEditing ? (
          <div className="flex flex-col gap-2 w-full">
            <FoodSearchInput
              ref={inputRef}
              value={editingName}
              onChange={onEditNameChange}
              className="w-full"
              aria-label={`Edit ${extraLabel.toLowerCase()} food name`}
              onKeyDown={handleKeyDown}
            />
            <div className="flex flex-col md:flex-row gap-2 w-full">
              <Select value={editingExtra} onValueChange={onEditExtraChange}>
                <SelectTrigger className="w-full md:w-2/3 text-foreground dark:bg-input dark:text-foreground">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="text-foreground dark:bg-input dark:text-foreground">
                  {extraOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <div className="flex gap-2 w-full md:w-auto">
                <Button
                  type="button"
                  onClick={onSaveEdit}
                  className="flex-1 md:flex-none hover:cursor-pointer w-1/2"
                >
                  Save
                </Button>
                <Button
                  type="button"
                  onClick={onCancelEdit}
                  variant="outline"
                  className="flex-1 md:flex-none hover:cursor-pointer w-1/2"
                >
                  Cancel
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <>
            <span className="flex flex-col md:flex-row md:items-center gap-1">
              <span className="font-medium">{name}</span>
              {showSeverityBadge && extra && (
                <SeverityBadge severity={extra} type={severityType} />
              )}
            </span>
            <div className="flex gap-2">
              <Button
                size="sm"
                className="hover:cursor-pointer w-auto"
                variant="outline"
                onClick={onStartEdit}
              >
                Edit
              </Button>
              <Button
                variant="destructive"
                size="sm"
                className="hover:cursor-pointer w-auto"
                onClick={onRemove}
              >
                Remove
              </Button>
            </div>
          </>
        )}
      </li>
    );
  }
);

FoodItem.displayName = "FoodItem";

export default FoodItem;
