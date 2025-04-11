
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { X, AlertTriangle } from "lucide-react";
import { useState } from "react";

interface DuplicateTaskAlertProps {
  taskName: string;
  assignees: string[];
  onResolve: () => void;
}

export const DuplicateTaskAlert = ({ taskName, assignees, onResolve }: DuplicateTaskAlertProps) => {
  const [visible, setVisible] = useState(true);

  const handleDismiss = () => {
    setVisible(false);
    onResolve();
  };

  if (!visible) return null;

  return (
    <Alert variant="destructive" className="mb-4 flex items-start justify-between">
      <div className="flex gap-2">
        <AlertTriangle className="h-5 w-5" />
        <div>
          <AlertTitle>Duplicate Task Assignment</AlertTitle>
          <AlertDescription>
            <p>"{taskName}" is assigned to multiple people: {assignees.join(', ')}</p>
            <p className="text-xs mt-1">This may cause confusion. Consider reassigning to a single person.</p>
          </AlertDescription>
        </div>
      </div>
      <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-6 w-6 p-0">
        <X className="h-4 w-4" />
      </Button>
    </Alert>
  );
};
