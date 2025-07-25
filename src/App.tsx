import "./App.css";
import MealPreferencesForm from "./components/layout/MealPreferencesForm";
import AppHeader from "./components/features/user-profile/UserProfileHeader";
import { Toaster } from "sonner";
import { Analytics } from "@vercel/analytics/react"

function App() {
  const handleEmail = () => {
    console.log("Email button clicked");
  };

  const handlePhone = () => {
    console.log("Phone button clicked");
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto p-4">
        <div className="my-4">
          <AppHeader
            userName="Michael Mohr"
            userRole="Zenaris Health User"
            location="Zürich, Switzerland"
            description="Elderly care recipient with specific dietary preferences and nutritional requirements. This profile helps caregivers and family members manage meal planning effectively."
            dateOfBirth="16.12.1970"
            onEmail={handleEmail}
            onPhone={handlePhone}
          />
        </div>
        <MealPreferencesForm />
      </div>
      <Toaster />
      <Analytics />
    </div>
  );
}

export default App;
