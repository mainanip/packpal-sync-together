
import { useState } from 'react';
import { CheckCircle2, Circle, User, Package2, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export type ItemStatus = 'to-pack' | 'packed' | 'delivered';

export interface ViewerItemProps {
  id: string;
  name: string;
  category: string;
  status: ItemStatus;
  assignee: string;
  quantity: number;
  notes?: string;
}

const getStatusStyle = (status: ItemStatus) => {
  switch (status) {
    case 'to-pack':
      return 'status-to-pack';
    case 'packed':
      return 'status-packed';
    case 'delivered':
      return 'status-delivered';
    default:
      return '';
  }
};

const getStatusLabel = (status: ItemStatus) => {
  switch (status) {
    case 'to-pack':
      return 'To Pack';
    case 'packed':
      return 'Packed';
    case 'delivered':
      return 'Delivered';
    default:
      return status;
  }
};

const getStatusIcon = (status: ItemStatus) => {
  switch (status) {
    case 'delivered':
      return <CheckCircle2 className="h-4 w-4 text-packpal-purple" />;
    case 'packed':
      return <Circle className="h-4 w-4 text-packpal-purple fill-packpal-light-purple stroke-packpal-purple" />;
    default:
      return <Circle className="h-4 w-4 text-muted-foreground" />;
  }
};

export const ViewerItem = ({
  id,
  name,
  category,
  status,
  assignee,
  quantity,
  notes
}: ViewerItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden bg-card">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-8 w-8 flex items-center justify-center shrink-0">
            {getStatusIcon(status)}
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium truncate">{name}</h3>
              {quantity > 1 && (
                <Badge variant="outline" className="bg-muted/50 text-xs">
                  x{quantity}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-xs mt-0.5">
              <span className="truncate">{category}</span>
              <span>•</span>
              <span className="flex items-center">
                <User className="h-3 w-3 mr-1" />
                {assignee}
              </span>
            </div>
          </div>
        </div>
        
        <div className="flex items-center gap-2 shrink-0">
          <span className={`text-xs py-1 px-2 rounded-full ${getStatusStyle(status)}`}>
            {getStatusLabel(status)}
          </span>
          
          {notes && (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8" 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>
      
      {isExpanded && notes && (
        <div className="px-4 pb-4 pt-0 border-t mt-1">
          <div className="text-sm bg-muted/40 p-2 rounded-md">
            <p className="text-muted-foreground">{notes}</p>
          </div>
        </div>
      )}
    </div>
  );
};
