# Zenaris - Elderly Meal Preferences Interface

A user-friendly web application designed for caregivers and family members to manage comprehensive meal preference information for elderly individuals. Built with empathy and accessibility in mind to reduce cognitive load for stressed caregivers.

## 🌟 Features

### Core Functionality
- **Favorite Foods Management** - Add, edit, and categorize preferred foods by meal type
- **Disliked Foods Tracking** - Record food dislikes with severity levels (mild dislike vs. absolutely won't eat)
- **Allergy & Intolerance Management** - Critical medical dietary restrictions with severity indicators
- **Special Instructions** - Free-form text area for additional dietary considerations (500 character limit)

### Enhanced User Experience
- **Food Search & Autocomplete** - Comprehensive database of 100+ common foods with intelligent search
- **Quick-Select Allergies** - One-click selection for common allergens (nuts, dairy, gluten, etc.)
- **Smart Pill Management** - Automatic synchronization between manual entries and quick-select options
- **Real-time Feedback** - Toast notifications for all user actions
- **Form Validation** - Prevents empty submissions with helpful error messages

### Accessibility & Design
- **Mobile-First Responsive Design** - Optimized for all device sizes
- **Professional User Profile** - Clear context for meal planning
- **Visual Hierarchy** - Card-based layout with consistent styling
- **Keyboard Navigation** - Full accessibility support
- **Dark/Light Mode** - Automatic theme support

### Performance Optimizations
- **React.memo** - All components memoized to prevent unnecessary re-renders
- **Custom Hooks** - Centralized state management with `useMealPreferences` and `useEditMode`
- **useCallback & useMemo** - Optimized event handlers and computed values
- **Component Reusability** - Shared `FoodItem` component reduces code duplication
- **Efficient Search** - Memoized food search with limited results for better performance

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd zenaris

# Install dependencies
npm install

# Start development server
npm run dev

# Open in browser
# Navigate to http://localhost:5173
```

### Build for Production

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

## Tech Stack

### Core Technologies
- **React 19** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first styling

### UI Components
- **Radix UI** - Accessible component primitives
- **Shadcn/ui** - Beautiful, reusable components
- **Lucide React** - Consistent iconography
- **Sonner** - Toast notifications

### Architecture
- **Component-Based** - Modular, reusable components
- **Feature-Level Organization** - Logical code separation
- **TypeScript Interfaces** - Strong typing throughout
- **Custom Hooks** - Reusable logic patterns
- **Performance Optimized** - Memoization and efficient re-rendering

## Project Structure

```
src/
├── components/
│   ├── ui/                     # Base UI components
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── food-search-input.tsx
│   │   └── ...
│   ├── meal-preferences/       # Feature components
│   │   ├── FavoriteFoodsSection.tsx
│   │   ├── DislikedFoodsSection.tsx
│   │   ├── AllergiesSection.tsx
│   │   ├── SpecialInstructionsSection.tsx
│   │   ├── SeverityBadge.tsx
│   │   └── FoodItem.tsx        # Reusable item component
│   ├── common/                 # Shared components
│   ├── forms/                  # Form-specific components
│   └── AppHeader.tsx
├── hooks/                      # Custom hooks
│   ├── useMealPreferences.ts   # Main state management
│   ├── useEditMode.ts          # Edit mode logic
│   └── use-mobile.ts           # Mobile detection
├── lib/
│   ├── utils.ts               # Utility functions
│   └── foodDatabase.ts        # Food search database
├── App.tsx                    # Main application
├── MealPreferencesForm.tsx    # Form container
└── main.tsx                   # Application entry point
```

## Key Features in Detail

### Performance Architecture
- **useMealPreferences Hook** - Centralized state management with memoized actions
- **useEditMode Hook** - Reusable edit functionality across all sections
- **FoodItem Component** - Single, flexible component for all food items
- **Memoized Components** - All components use React.memo for optimal performance
- **Optimized Search** - Intelligent food search with result limiting and memoization

### Food Search System
- **Intelligent Matching** - Exact matches first, then partial matches
- **Categorized Database** - Foods organized by breakfast, lunch, dinner, snacks
- **Keyboard Navigation** - Arrow keys, Enter, Escape support
- **Mobile Optimized** - Touch-friendly dropdown interactions
- **Performance Optimized** - Limited results and memoized calculations

### Allergy Management
- **Medical Priority** - Visual distinction with red borders and warning icons
- **Smart Synchronization** - Pills automatically update when editing allergy names
- **Bidirectional Sync** - Manual entries can become quick-select pills
- **Severity Indicators** - Clear badges for mild intolerance vs. severe allergy

### Responsive Design
- **Mobile-First** - Optimized for touch interactions
- **Full-Width Elements** - Easy targeting on small screens
- **Flexible Layouts** - Adapts to different screen sizes
- **Consistent Spacing** - Uniform margins and padding

## Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

### Code Style
- **TypeScript** - Strict type checking enabled
- **ESLint** - Code quality enforcement
- **Prettier** - Consistent code formatting
- **Component Props** - Properly typed interfaces
- **Performance First** - All components optimized with memo and callbacks

### Adding New Foods
To extend the food database, edit `src/lib/foodDatabase.ts`:

```typescript
export const foodDatabase = {
  breakfast: ["Oatmeal", "Pancakes", ...],
  lunch: ["Sandwich", "Soup", ...],
  // Add new categories or foods here
};
```

### Creating New Components
Follow the established patterns:

```typescript
import React, { memo, useCallback } from "react";

interface ComponentProps {
  // Define props with proper types
}

const Component = memo<ComponentProps>(({ prop1, prop2 }) => {
  const handleAction = useCallback(() => {
    // Memoize event handlers
  }, [dependencies]);

  return (
    // Component JSX
  );
});

Component.displayName = "Component";
export default Component;
```

## Design Philosophy

### Empathetic Design
- **Reduce Cognitive Load** - Clear, intuitive interfaces
- **Prevent Errors** - Smart defaults and validation
- **Immediate Feedback** - Toast notifications for all actions
- **Stress-Free Editing** - In-place editing with easy cancellation

### Performance First
- **Optimized Re-rendering** - Strategic use of memo and callbacks
- **Efficient State Management** - Centralized hooks with minimal updates
- **Code Reusability** - Shared components and logic
- **Bundle Optimization** - Tree-shaking and efficient imports

### Accessibility First
- **ARIA Labels** - Screen reader support
- **Keyboard Navigation** - Full keyboard accessibility
- **High Contrast** - Clear visual distinctions
- **Touch Targets** - Appropriate sizing for mobile

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Radix UI** - For accessible component primitives
- **Shadcn** - For beautiful component designs
- **TailwindCSS** - For utility-first styling
- **Lucide** - For consistent iconography

---

Built with ❤️ for caregivers and families managing elderly care nutrition.
