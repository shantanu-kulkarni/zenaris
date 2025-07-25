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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import FoodSearchInput from "@/components/ui/food-search-input";
import FoodItem from "./FoodItem";
import type { Allergy } from "@/hooks/useMealPreferences";

interface AllergiesSectionProps {
  // From useMealPreferences
  commonAllergies: string[];
  quickAllergies: string[];
  toggleQuickAllergy: (name: string) => void;
  newAllergy: string;
  setNewAllergy: (value: string) => void;
  newAllergySeverity: string;
  setNewAllergySeverity: (value: string) => void;
  handleAddAllergy: () => void;
  removeAllergy: (id: number) => void;
  allergies: Allergy[];
  allergySeverities: Array<{ value: string; label: string }>;

  // From useEditMode
  editingId: number | null;
  editingName: string;
  editingExtra: string;
  inputRef: React.RefObject<HTMLInputElement | null>;
  startEdit: (item: Allergy) => void;
  saveEdit: () => void;
  cancelEdit: () => void;
  setEditingName: (name: string) => void;
  setEditingExtra: (extra: string) => void;
}

const AllergiesSection = memo<AllergiesSectionProps>(
  ({
    commonAllergies,
    quickAllergies,
    toggleQuickAllergy,
    newAllergy,
    setNewAllergy,
    newAllergySeverity,
    setNewAllergySeverity,
    handleAddAllergy,
    removeAllergy,
    allergies,
    allergySeverities,
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
      <section aria-labelledby="allergies-heading">
        <Card className="border-red-500">
          <CardHeader>
            <h2 id="allergies-heading" className="text-xl font-bold mb-2">
              Food Intolerances / Allergies
            </h2>
            <Alert
              variant="destructive"
              className="mb-2 bg-red-500/10 border-red-500"
            >
              <AlertTriangle className="w-8 h-8" />
              <AlertDescription>
                Please list all allergies and intolerances. This section is
                critical for medical dietary restrictions.
              </AlertDescription>
            </Alert>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <h3 className="font-semibold mb-2">
                Quick Select Common Allergies:
              </h3>
              <div className="flex flex-wrap gap-2">
                {commonAllergies.map((allergy) => (
                  <Button
                    key={allergy}
                    type="button"
                    size="sm"
                    variant={
                      quickAllergies.includes(allergy) ? "default" : "outline"
                    }
                    onClick={() => toggleQuickAllergy(allergy)}
                    className="hover:cursor-pointer"
                  >
                    {allergy}
                  </Button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-8 w-full">
              <FoodSearchInput
                placeholder="Add an allergy or intolerance..."
                value={newAllergy}
                onChange={setNewAllergy}
                aria-label="Allergy name"
                className="w-full"
              />
              <div className="flex flex-col md:flex-row gap-2 w-full">
                <Select
                  value={newAllergySeverity}
                  onValueChange={setNewAllergySeverity}
                >
                  <SelectTrigger className="w-full md:w-2/3 text-foreground dark:bg-input dark:text-foreground">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent className="text-foreground dark:bg-input dark:text-foreground">
                    {allergySeverities.map((severity) => (
                      <SelectItem key={severity.value} value={severity.value}>
                        {severity.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button
                  type="button"
                  onClick={handleAddAllergy}
                  className="w-full md:w-1/3 md:min-w-[80px]"
                >
                  Add
                </Button>
              </div>
            </div>

            <ul className="space-y-2">
              {allergies.length === 0 && (
                <li className="text-muted-foreground text-sm italic">
                  No allergies or intolerances added yet.
                </li>
              )}
              {allergies.map((allergy) => (
                <FoodItem
                  key={allergy.id}
                  name={allergy.name}
                  extra={allergy.severity}
                  isEditing={editingId === allergy.id}
                  editingName={editingName}
                  editingExtra={editingExtra}
                  onStartEdit={() => startEdit(allergy)}
                  onSaveEdit={saveEdit}
                  onCancelEdit={cancelEdit}
                  onRemove={() => removeAllergy(allergy.id)}
                  onEditNameChange={setEditingName}
                  onEditExtraChange={setEditingExtra}
                  inputRef={inputRef}
                  extraOptions={allergySeverities}
                  extraLabel="Severity"
                  showSeverityBadge={true}
                  severityType="allergy"
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </section>
    );
  }
);

AllergiesSection.displayName = "AllergiesSection";

export default AllergiesSection;
