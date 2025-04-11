
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';

type EmptyStateProps = {
  title: string;
  description: string;
  actionLabel: string;
  onAction: () => void;
};

export const EmptyState = ({
  title,
  description,
  actionLabel,
  onAction
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center text-center p-8 md:p-12 rounded-lg border border-dashed">
      <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
        <PlusCircle className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground mb-6 max-w-sm">{description}</p>
      <Button onClick={onAction}>
        {actionLabel}
      </Button>
    </div>
  );
};
