import { memo } from "react";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Frown } from "lucide-react";

interface SeverityBadgeProps {
  severity: string;
  type: "dislike" | "allergy";
}

const SeverityBadge = memo<SeverityBadgeProps>(({ severity, type }) => {
  const getSeverityConfig = () => {
    if (type === "allergy") {
      switch (severity) {
        case "mild":
          return {
            variant: "secondary" as const,
            icon: <Frown className="w-3 h-3" />,
            label: "Mild Intolerance",
          };
        case "severe":
          return {
            variant: "destructive" as const,
            icon: <AlertTriangle className="w-3 h-3" />,
            label: "Severe Allergy",
          };
        default:
          return {
            variant: "secondary" as const,
            icon: null,
            label: severity,
          };
      }
    } else {
      switch (severity) {
        case "mild":
          return {
            variant: "secondary" as const,
            icon: <Frown className="w-3 h-3" />,
            label: "Mild Dislike",
          };
        case "absolute":
          return {
            variant: "destructive" as const,
            icon: <AlertTriangle className="w-3 h-3" />,
            label: "Won't Eat",
          };
        default:
          return {
            variant: "secondary" as const,
            icon: null,
            label: severity,
          };
      }
    }
  };

  const config = getSeverityConfig();

  return (
    <Badge variant={config.variant} className="flex items-center gap-1 text-xs">
      {config.icon}
      {config.label}
    </Badge>
  );
});

SeverityBadge.displayName = "SeverityBadge";

export default SeverityBadge;
