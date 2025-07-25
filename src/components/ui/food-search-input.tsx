import React, { useState, useRef, useEffect, forwardRef, memo, useCallback, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { searchFoods } from "@/lib/foodDatabase";
import { cn } from "@/lib/utils";

interface FoodSearchInputProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
  value: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FoodSearchInput = memo(forwardRef<HTMLInputElement, FoodSearchInputProps>(
  ({ value, onChange, onKeyDown, className, ...props }, ref) => {
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const suggestionsRef = useRef<HTMLUListElement>(null);

    // Memoize suggestions to avoid unnecessary recalculations
    const filteredSuggestions = useMemo(() => {
      if (!value.trim()) return [];
      return searchFoods(value).slice(0, 8); // Limit to 8 suggestions for performance
    }, [value]);

    useEffect(() => {
      setSuggestions(filteredSuggestions);
      setSelectedIndex(-1);
    }, [filteredSuggestions]);

    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      onChange(newValue);
      setShowSuggestions(newValue.trim().length > 0);
    }, [onChange]);

    const handleSuggestionClick = useCallback((suggestion: string) => {
      onChange(suggestion);
      setShowSuggestions(false);
      setSelectedIndex(-1);
    }, [onChange]);

    const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
      if (showSuggestions && suggestions.length > 0) {
        switch (e.key) {
          case 'ArrowDown':
            e.preventDefault();
            setSelectedIndex(prev => 
              prev < suggestions.length - 1 ? prev + 1 : prev
            );
            break;
          case 'ArrowUp':
            e.preventDefault();
            setSelectedIndex(prev => prev > 0 ? prev - 1 : -1);
            break;
          case 'Enter':
            if (selectedIndex >= 0) {
              e.preventDefault();
              handleSuggestionClick(suggestions[selectedIndex]);
              return;
            }
            break;
          case 'Escape':
            setShowSuggestions(false);
            setSelectedIndex(-1);
            break;
        }
      }
      onKeyDown?.(e);
    }, [showSuggestions, suggestions, selectedIndex, handleSuggestionClick, onKeyDown]);

    const handleBlur = useCallback(() => {
      // Delay hiding suggestions to allow click events to fire
      setTimeout(() => setShowSuggestions(false), 150);
    }, []);

    const handleFocus = useCallback(() => {
      if (value.trim() && suggestions.length > 0) {
        setShowSuggestions(true);
      }
    }, [value, suggestions.length]);

    return (
      <div className="relative">
        <Input
          ref={ref}
          value={value}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onFocus={handleFocus}
          className={cn("w-full", className)}
          {...props}
        />
        
        {showSuggestions && suggestions.length > 0 && (
          <ul
            ref={suggestionsRef}
            className="absolute z-50 w-full mt-1 bg-popover border border-border rounded-md shadow-lg max-h-60 overflow-auto"
          >
            {suggestions.map((suggestion, index) => (
              <li
                key={suggestion}
                className={cn(
                  "px-3 py-2 cursor-pointer text-sm hover:bg-accent hover:text-accent-foreground",
                  index === selectedIndex && "bg-accent text-accent-foreground"
                )}
                onClick={() => handleSuggestionClick(suggestion)}
              >
                {suggestion}
              </li>
            ))}
          </ul>
        )}
      </div>
    );
  }
));

FoodSearchInput.displayName = "FoodSearchInput";

export default FoodSearchInput; 