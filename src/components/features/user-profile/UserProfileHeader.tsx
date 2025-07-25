import { memo, useCallback } from "react";
import { MapPin, Mail, Phone, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

interface AppHeaderProps {
  userName?: string;
  userRole?: string;
  location?: string;
  description?: string;
  dateOfBirth?: string;
  onEmail?: () => void;
  onPhone?: () => void;
}

const AppHeader = memo<AppHeaderProps>(
  ({
    userName = "Michael Mohr",
    userRole = "Zenaris Nutzer",
    location = "Zurich, Switzerland",
    description = "Elderly care recipient with specific dietary preferences and nutritional requirements. This profile helps caregivers and family members manage meal planning effectively.",
    dateOfBirth = "16.12.1970",
    onEmail,
    onPhone,
  }) => {
    const getInitials = useCallback((name: string) => {
      return name
        .split(" ")
        .map((n) => n[0])
        .join("");
    }, []);

    const handleEmailClick = useCallback(() => {
      onEmail?.();
    }, [onEmail]);

    const handlePhoneClick = useCallback(() => {
      onPhone?.();
    }, [onPhone]);

    return (
      <Card className="w-full">
        <CardHeader className="pb-4">
          <div className="flex flex-col items-center text-center">
            <Avatar className="h-20 w-20 bg-muted mb-4">
              <AvatarFallback className="text-2xl font-semibold">
                {getInitials(userName)}
              </AvatarFallback>
            </Avatar>

            <h1 className="text-2xl font-bold text-foreground mb-1">
              {userName}
            </h1>
            <p className="text-lg text-muted-foreground mb-2">{userRole}</p>

            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-4 w-4" />
              <span>{location}</span>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="text-center mb-6">
            <p className="text-sm text-muted-foreground max-w-md mx-auto leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4 mb-6">
            <div className="flex items-center gap-2 text-sm">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-muted-foreground">Birthday:</span>
              <span className="font-medium">{dateOfBirth}</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 w-full">
            <Button
              variant="outline"
              size="sm"
              onClick={handleEmailClick}
              className="flex items-center gap-2 w-1/2 md:w-1/3"
            >
              <Mail className="h-4 w-4" />
              Email
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={handlePhoneClick}
              className="flex items-center gap-2 w-1/2 md:w-1/3"
            >
              <Phone className="h-4 w-4" />
              Call
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
);

AppHeader.displayName = "AppHeader";

export default AppHeader;
