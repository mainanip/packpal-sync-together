
// import { PackingItem, ItemStatus, PackingItemProps } from './PackingItem';
// import { Badge } from '@/components/ui/badge';
// import { ChevronDown, ChevronUp } from 'lucide-react';
// import { useState } from 'react';
// import { Button } from '@/components/ui/button';

// interface CategorySectionProps {
//   name: string;
//   icon: string;
//   items: Omit<PackingItemProps, 'onStatusChange'>[];
//   onItemStatusChange: (id: string, status: ItemStatus) => void;
// }

// export const CategorySection = ({
//   name,
//   icon,
//   items,
//   onItemStatusChange
// }: CategorySectionProps) => {
//   const [isCollapsed, setIsCollapsed] = useState(false);
  
//   const totalItems = items.length;
//   const packedItems = items.filter(item => item.status === 'packed' || item.status === 'delivered').length;
  
//   return (
//     <div className="mb-6">
//       <div 
//         className="flex items-center justify-between bg-muted/40 p-3 rounded-lg cursor-pointer"
//         onClick={() => setIsCollapsed(!isCollapsed)}
//       >
//         <div className="flex items-center gap-2">
//           <span className="text-lg">{icon}</span>
//           <h3 className="font-medium text-lg">{name}</h3>
//           <Badge variant="outline" className="ml-2 bg-background">
//             {packedItems}/{totalItems}
//           </Badge>
//         </div>
//         <Button variant="ghost" size="icon" className="h-8 w-8">
//           {isCollapsed ? (
//             <ChevronDown className="h-4 w-4" />
//           ) : (
//             <ChevronUp className="h-4 w-4" />
//           )}
//         </Button>
//       </div>
      
//       {!isCollapsed && (
//         <div className="mt-3 space-y-2">
//           {items.map((item) => (
//             <PackingItem
//               key={item.id}
//               {...item}
//               onStatusChange={onItemStatusChange}
//             />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };
import { PackingItem, ItemStatus, PackingItemProps } from './PackingItem';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';

interface CategorySectionProps {
  name: string;
  icon: string;
  items: Omit<PackingItemProps, 'onStatusChange'>[];
  onItemStatusChange: (id: string, status: ItemStatus) => void;
}

export const CategorySection = ({
  name,
  icon,
  items,
  onItemStatusChange
}: CategorySectionProps) => {
  const { user } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const totalItems = items.length;
  const packedItems = items.filter(item => item.status === 'packed' || item.status === 'delivered').length;
  
  return (
    <div className="mb-6">
      <div 
        className="flex items-center justify-between bg-muted/40 p-3 rounded-lg cursor-pointer hover:bg-muted/60"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <span className="text-lg">{icon}</span>
          <h3 className="font-medium text-lg">{name}</h3>
          <Badge variant="outline" className="ml-2 bg-background">
            {packedItems}/{totalItems}
          </Badge>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          {isCollapsed ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronUp className="h-4 w-4" />
          )}
        </Button>
      </div>
      
      {!isCollapsed && (
        <div className="mt-3 space-y-2">
          {items.map((item) => (
            <PackingItem
              key={item.id}
              {...item}
              onStatusChange={onItemStatusChange}
              editable={item.assignee === user?.id}
            />
          ))}
        </div>
      )}
    </div>
  );
};