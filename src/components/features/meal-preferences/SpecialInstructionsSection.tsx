import { memo } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";

interface SpecialInstructionsSectionProps {
  specialInstructions: string;
  setSpecialInstructions: (value: string) => void;
  maxInstructions: number;
}

const SpecialInstructionsSection = memo<SpecialInstructionsSectionProps>(
  ({ specialInstructions, setSpecialInstructions, maxInstructions }) => {
    return (
      <section aria-labelledby="special-instructions-heading">
        <Card>
          <CardHeader>
            <h2
              id="special-instructions-heading"
              className="text-xl font-bold mb-0"
            >
              Additional Considerations
            </h2>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Any additional dietary preferences, cooking instructions, or special considerations..."
              value={specialInstructions}
              onChange={(e) => setSpecialInstructions(e.target.value)}
              maxLength={maxInstructions}
              className="min-h-[100px] resize-none"
              aria-label="Special dietary instructions"
            />
            <div className="text-right text-sm text-muted-foreground mt-1">
              {specialInstructions.length}/{maxInstructions} characters
            </div>
          </CardContent>
        </Card>
      </section>
    );
  }
);

SpecialInstructionsSection.displayName = "SpecialInstructionsSection";

export default SpecialInstructionsSection;
