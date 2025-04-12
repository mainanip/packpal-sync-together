
// import { Badge } from '@/components/ui/badge';
// import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
// import { Users, Calendar, MoreVertical, Package } from 'lucide-react';
// import { Button } from '@/components/ui/button';
// import { Link } from 'react-router-dom';

// export type PackingListStatus = 'in-progress' | 'completed' | 'not-started';

// export interface PackingListItemProps {
//   id: string;
//   title: string;
//   totalItems: number;
//   packedItems: number;
//   members: number;
//   date: string;
//   status: PackingListStatus;
// }

// const getStatusColor = (status: PackingListStatus) => {
//   switch (status) {
//     case 'completed':
//       return 'bg-packpal-soft-green text-green-700';
//     case 'in-progress':
//       return 'bg-packpal-soft-yellow text-amber-700';
//     case 'not-started':
//       return 'bg-packpal-soft-orange text-orange-700';
//     default:
//       return 'bg-packpal-soft-gray text-gray-700';
//   }
// };

// const getStatusLabel = (status: PackingListStatus) => {
//   switch (status) {
//     case 'completed':
//       return 'Completed';
//     case 'in-progress':
//       return 'In Progress';
//     case 'not-started':
//       return 'Not Started';
//     default:
//       return status;
//   }
// };

// export const PackingListCard = ({ id, title, totalItems, packedItems, members, date, status }: PackingListItemProps) => {
//   return (
//     <Card className="card-hover">
//       <CardHeader className="p-4 flex flex-row justify-between items-start">
//         <div>
//           <h3 className="font-semibold text-lg">{title}</h3>
//           <p className="text-sm text-muted-foreground flex items-center mt-1">
//             <Calendar className="w-3.5 h-3.5 mr-1.5" />
//             {date}
//           </p>
//         </div>
//         <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
//       </CardHeader>
//       <CardContent className="p-4 pt-0">
//         <div className="flex justify-between items-center">
//           <div className="flex items-center gap-4">
//             <div className="flex items-center gap-1.5">
//               <Package className="w-4 h-4 text-muted-foreground" />
//               <span className="text-sm">{packedItems}/{totalItems} packed</span>
//             </div>
//             <div className="flex items-center gap-1.5">
//               <Users className="w-4 h-4 text-muted-foreground" />
//               <span className="text-sm">{members} members</span>
//             </div>
//           </div>
//         </div>
//         {totalItems > 0 && (
//           <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
//             <div 
//               className="h-full bg-primary rounded-full" 
//               style={{ width: `${(packedItems / totalItems) * 100}%` }}
//             ></div>
//           </div>
//         )}
//       </CardContent>
//       <CardFooter className="p-4 pt-0 flex justify-between">
//         <Button asChild variant="outline" size="sm">
//           <Link to={`/lists/${id}`}>View Details</Link>
//         </Button>
//         <Button variant="ghost" size="icon" className="h-8 w-8">
//           <MoreVertical className="h-4 w-4" />
//           <span className="sr-only">Actions</span>
//         </Button>
//       </CardFooter>
//     </Card>
//   );
// };
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Users, Calendar, MoreVertical, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export type PackingListStatus = 'in-progress' | 'completed' | 'not-started';

export interface PackingListCardProps {
  id: string;
  title: string;
  totalItems: number;
  packedItems: number;
  deliveredItems: number;
  members: number;
  date: string;
  status: PackingListStatus;
  tasks?: {
    id: string;
    name: string;
    status: 'to-pack' | 'packed' | 'delivered';
    assigneeId: string;
  }[];
  onAssignTasks?: () => void;
  onTaskStatusChange?: (taskId: string, newStatus: 'to-pack' | 'packed' | 'delivered') => void;
  members?: {
    id: string;
    name: string;
    email: string;
    role: 'owner' | 'member';
  }[];
  currentUserId?: string;
}

const getStatusColor = (status: PackingListStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'in-progress':
      return 'bg-yellow-100 text-yellow-800';
    case 'not-started':
      return 'bg-orange-100 text-orange-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

export const PackingListCard = ({
  id,
  title,
  totalItems,
  packedItems,
  deliveredItems,
  members: memberCount,
  date,
  status,
  tasks,
  onAssignTasks,
  onTaskStatusChange,
  members = [],
  currentUserId
}: PackingListCardProps) => {
  const { user } = useAuth();
  const isOwner = user?.role === 'owner';
  const isAssignedMember = tasks?.some(task => task.assigneeId === user?.id);

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader className="p-4 flex flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {date}
          </p>
        </div>
        <Badge className={getStatusColor(status)}>
          {status === 'completed' ? 'Completed' : status === 'in-progress' ? 'In Progress' : 'Not Started'}
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">
                {packedItems + deliveredItems}/{totalItems} completed
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{memberCount} members</span>
            </div>
          </div>
        </div>

        {totalItems > 0 && (
          <div className="mt-4 space-y-2">
            <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full"
                style={{
                  width: `${((packedItems + deliveredItems) / totalItems) * 100}%`,
                  background: 'linear-gradient(90deg, #3b82f6 0%, #10b981 100%)'
                }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>To Pack: {totalItems - packedItems - deliveredItems}</span>
              <span>Packed: {packedItems}</span>
              <span>Delivered: {deliveredItems}</span>
            </div>
          </div>
        )}

        {(isAssignedMember || isOwner) && tasks && tasks.length > 0 && (
          <div className="mt-4 space-y-2">
            <h4 className="text-sm font-medium">Your Tasks</h4>
            <div className="space-y-2">
              {tasks
                .filter(task => isOwner || task.assigneeId === currentUserId)
                .map(task => (
                  <div key={task.id} className="flex items-center justify-between">
                    <span className="text-sm">{task.name}</span>
                    <Select
                      value={task.status}
                      onValueChange={(value: 'to-pack' | 'packed' | 'delivered') =>
                        onTaskStatusChange?.(task.id, value)
                      }
                    >
                      <SelectTrigger className="w-32 h-8">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="to-pack">To Pack</SelectItem>
                        <SelectItem value="packed">Packed</SelectItem>
                        <SelectItem value="delivered">Delivered</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                ))}
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to={`/lists/${id}`}>View Details</Link>
        </Button>
        {isOwner && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreVertical className="h-4 w-4" />
                <span className="sr-only">Actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={onAssignTasks}>
                Assign Tasks
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </CardFooter>
    </Card>
  );
};