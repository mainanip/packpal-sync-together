
import { useState } from 'react';
import { Check, MoreVertical, User, Package2, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';

export type ItemStatus = 'to-pack' | 'packed' | 'delivered';

export interface PackingItemProps {
  id: string;
  name: string;
  category: string; // This is needed for display purposes
  status: ItemStatus;
  assignee: string;
  quantity: number;
  notes?: string;
  onStatusChange: (id: string, status: ItemStatus) => void;
  onEdit?: () => void;  // Optional edit handler
  onDelete?: () => void; // Optional delete handler
  disabled?: boolean;    // Optional disable flag for non-editable items
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

export const PackingItem = ({
  id,
  name,
  category,
  status,
  assignee,
  quantity,
  notes,
  onStatusChange,
  onEdit,
  onDelete,
  disabled = false
}: PackingItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const handleStatusUpdate = () => {
    if (disabled) return;
    
    const nextStatus: Record<ItemStatus, ItemStatus> = {
      'to-pack': 'packed',
      'packed': 'delivered',
      'delivered': 'to-pack'
    };
    onStatusChange(id, nextStatus[status]);
  };

  return (
    <div className={`border rounded-lg overflow-hidden bg-card ${disabled ? 'opacity-70' : ''}`}>
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <Button 
            variant="ghost" 
            size="icon" 
            className={`h-8 w-8 shrink-0 ${status === 'delivered' ? 'bg-packpal-purple/10 text-packpal-purple' : ''}`} 
            onClick={handleStatusUpdate}
            disabled={disabled}
          >
            {status === 'delivered' ? (
              <Check className="h-4 w-4" />
            ) : (
              <div className={`h-4 w-4 rounded-full border-2 ${status === 'packed' ? 'border-packpal-purple/50 bg-packpal-light-purple' : 'border-muted-foreground'}`}></div>
            )}
          </Button>
          
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
          
          {disabled ? (
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8"
              onClick={() => setIsExpanded(!isExpanded)}
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {onEdit && (
                  <DropdownMenuItem onClick={onEdit}>
                    <Edit className="h-4 w-4 mr-2" /> Edit
                  </DropdownMenuItem>
                )}
                {onDelete && (
                  <DropdownMenuItem onClick={onDelete} className="text-destructive">
                    <Trash2 className="h-4 w-4 mr-2" /> Delete
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={() => setIsExpanded(!isExpanded)}>
                  {isExpanded ? 'Hide Details' : 'Show Details'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
