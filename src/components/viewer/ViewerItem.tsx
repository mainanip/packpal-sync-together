
// import { useState } from 'react';
// import { CheckCircle2, Circle, User, Package2, MoreVertical } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { Button } from '@/components/ui/button';

// export type ItemStatus = 'to-pack' | 'packed' | 'delivered';

// export interface ViewerItemProps {
//   id: string;
//   name: string;
//   category: string;
//   status: ItemStatus;
//   assignee: string;
//   quantity: number;
//   notes?: string;
// }

// const getStatusStyle = (status: ItemStatus) => {
//   switch (status) {
//     case 'to-pack':
//       return 'status-to-pack';
//     case 'packed':
//       return 'status-packed';
//     case 'delivered':
//       return 'status-delivered';
//     default:
//       return '';
//   }
// };

// const getStatusLabel = (status: ItemStatus) => {
//   switch (status) {
//     case 'to-pack':
//       return 'To Pack';
//     case 'packed':
//       return 'Packed';
//     case 'delivered':
//       return 'Delivered';
//     default:
//       return status;
//   }
// };

// const getStatusIcon = (status: ItemStatus) => {
//   switch (status) {
//     case 'delivered':
//       return <CheckCircle2 className="h-4 w-4 text-packpal-purple" />;
//     case 'packed':
//       return <Circle className="h-4 w-4 text-packpal-purple fill-packpal-light-purple stroke-packpal-purple" />;
//     default:
//       return <Circle className="h-4 w-4 text-muted-foreground" />;
//   }
// };

// export const ViewerItem = ({
//   id,
//   name,
//   category,
//   status,
//   assignee,
//   quantity,
//   notes
// }: ViewerItemProps) => {
//   const [isExpanded, setIsExpanded] = useState(false);

//   return (
//     <div className="border rounded-lg overflow-hidden bg-card">
//       <div className="p-4 flex items-center justify-between">
//         <div className="flex items-center gap-3 overflow-hidden">
//           <div className="h-8 w-8 flex items-center justify-center shrink-0">
//             {getStatusIcon(status)}
//           </div>
          
//           <div className="min-w-0">
//             <div className="flex items-center gap-2">
//               <h3 className="font-medium truncate">{name}</h3>
//               {quantity > 1 && (
//                 <Badge variant="outline" className="bg-muted/50 text-xs">
//                   x{quantity}
//                 </Badge>
//               )}
//             </div>
//             <div className="flex items-center gap-2 text-muted-foreground text-xs mt-0.5">
//               <span className="truncate">{category}</span>
//               <span>•</span>
//               <span className="flex items-center">
//                 <User className="h-3 w-3 mr-1" />
//                 {assignee}
//               </span>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex items-center gap-2 shrink-0">
//           <span className={`text-xs py-1 px-2 rounded-full ${getStatusStyle(status)}`}>
//             {getStatusLabel(status)}
//           </span>
          
//           {notes && (
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               className="h-8 w-8" 
//               onClick={() => setIsExpanded(!isExpanded)}
//             >
//               <MoreVertical className="h-4 w-4" />
//             </Button>
//           )}
//         </div>
//       </div>
      
//       {isExpanded && notes && (
//         <div className="px-4 pb-4 pt-0 border-t mt-1">
//           <div className="text-sm bg-muted/40 p-2 rounded-md">
//             <p className="text-muted-foreground">{notes}</p>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };
import { useState } from 'react';
import { CheckCircle2, Circle, User, MoreVertical } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

export type ItemStatus = 'to-pack' | 'packed' | 'delivered';

export interface ViewerItemProps {
  id: string;
  name: string;
  category: string;
  status: ItemStatus;
  assignee: string;
  quantity: number;
  notes?: string;
  editable?: boolean;
  onStatusChange?: (id: string, newStatus: ItemStatus) => void;
  onEdit?: (id: string) => void;
}

const statusStyles = {
  'to-pack': 'bg-yellow-100 text-yellow-800',
  'packed': 'bg-blue-100 text-blue-800',
  'delivered': 'bg-green-100 text-green-800'
};

const statusIcons = {
  'to-pack': <Circle className="h-4 w-4 text-gray-400" />,
  'packed': <Circle className="h-4 w-4 text-blue-500 fill-blue-200 stroke-blue-500" />,
  'delivered': <CheckCircle2 className="h-4 w-4 text-green-500" />
};

export const ViewerItem = ({
  id,
  name,
  category,
  status,
  assignee,
  quantity,
  notes,
  editable = false,
  onStatusChange,
  onEdit
}: ViewerItemProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleStatusChange = () => {
    if (!onStatusChange) return;
    const newStatus = status === 'to-pack' ? 'packed' : 'delivered';
    onStatusChange(id, newStatus);
  };

  return (
    <div className="border rounded-lg overflow-hidden bg-white shadow-sm">
      <div className="p-4 flex items-center justify-between">
        <div className="flex items-center gap-3 overflow-hidden">
          <div className="h-8 w-8 flex items-center justify-center shrink-0">
            {statusIcons[status]}
          </div>
          
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h3 className="font-medium truncate">{name}</h3>
              {quantity > 1 && (
                <Badge variant="outline" className="bg-gray-100 text-xs">
                  x{quantity}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-500 text-xs mt-0.5">
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
          <span className={`text-xs py-1 px-2 rounded-full ${statusStyles[status]}`}>
            {status.replace('-', ' ')}
          </span>
          
          {(editable || notes) && (
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
      
      {isExpanded && (
        <div className="px-4 pb-4 pt-0 border-t">
          {notes && (
            <div className="text-sm bg-gray-100 p-2 rounded-md mb-3">
              <p className="text-gray-600">{notes}</p>
            </div>
          )}
          {editable && (
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onEdit?.(id)}>
                Edit Item
              </Button>
              {status !== 'delivered' && (
                <Button variant="outline" size="sm" onClick={handleStatusChange}>
                  Mark as {status === 'to-pack' ? 'Packed' : 'Delivered'}
                </Button>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};