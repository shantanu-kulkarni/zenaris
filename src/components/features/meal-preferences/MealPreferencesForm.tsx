import { memo } from "react";
import { Button } from "@/components/ui/button";
import { useMealPreferences } from "@/hooks/useMealPreferences";
import { useEditMode } from "@/hooks/useEditMode";
import FavoriteFoodsSection from "./FavoriteFoodsSection";
import DislikedFoodsSection from "./DislikedFoodsSection";
import AllergiesSection from "./AllergiesSection";
import SpecialInstructionsSection from "./SpecialInstructionsSection";

const MealPreferencesForm = memo(() => {
  const mealPrefs = useMealPreferences();

  // Edit modes for each section
  const favoriteEditMode = useEditMode(
    mealPrefs.updateFood,
    (item) => item.category || ""
  );

  const dislikeEditMode = useEditMode(
    mealPrefs.updateDislike,
    (item) => item.severity || ""
  );

  const allergyEditMode = useEditMode(
    mealPrefs.updateAllergy,
    (item) => item.severity || ""
  );

  return (
    <div className="max-w-2xl mx-auto">
      <form
        aria-label="Meal Preferences Form"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="my-4">
          <FavoriteFoodsSection {...mealPrefs} {...favoriteEditMode} />
        </div>

        <div className="my-4">
          <DislikedFoodsSection {...mealPrefs} {...dislikeEditMode} />
        </div>

        <div className="my-4">
          <AllergiesSection {...mealPrefs} {...allergyEditMode} />
        </div>

        <div className="my-4">
          <SpecialInstructionsSection
            specialInstructions={mealPrefs.specialInstructions}
            setSpecialInstructions={mealPrefs.setSpecialInstructions}
            maxInstructions={mealPrefs.maxInstructions}
          />
        </div>

        <div className="w-full my-8">
          <Button
            type="button"
            onClick={mealPrefs.handleSave}
            size="lg"
            className="w-full hover:cursor-pointer"
          >
            Save Meal Preferences
          </Button>
        </div>
      </form>
    </div>
  );
});

MealPreferencesForm.displayName = "MealPreferencesForm";

export default MealPreferencesForm;
