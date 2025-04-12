
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Users, Calendar, MoreVertical, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export type PackingListStatus = 'in-progress' | 'completed' | 'not-started';

export interface PackingListItemProps {
  id: string;
  title: string;
  totalItems: number;
  packedItems: number;
  members: number;
  date: string;
  status: PackingListStatus;
}

const getStatusColor = (status: PackingListStatus) => {
  switch (status) {
    case 'completed':
      return 'bg-packpal-soft-green text-green-700';
    case 'in-progress':
      return 'bg-packpal-soft-yellow text-amber-700';
    case 'not-started':
      return 'bg-packpal-soft-orange text-orange-700';
    default:
      return 'bg-packpal-soft-gray text-gray-700';
  }
};

const getStatusLabel = (status: PackingListStatus) => {
  switch (status) {
    case 'completed':
      return 'Completed';
    case 'in-progress':
      return 'In Progress';
    case 'not-started':
      return 'Not Started';
    default:
      return status;
  }
};

export const PackingListCard = ({ id, title, totalItems, packedItems, members, date, status }: PackingListItemProps) => {
  return (
    <Card className="card-hover">
      <CardHeader className="p-4 flex flex-row justify-between items-start">
        <div>
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm text-muted-foreground flex items-center mt-1">
            <Calendar className="w-3.5 h-3.5 mr-1.5" />
            {date}
          </p>
        </div>
        <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
      </CardHeader>
      <CardContent className="p-4 pt-0">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <Package className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{packedItems}/{totalItems} packed</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm">{members} members</span>
            </div>
          </div>
        </div>
        {totalItems > 0 && (
          <div className="mt-4 h-1.5 w-full bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary rounded-full" 
              style={{ width: `${(packedItems / totalItems) * 100}%` }}
            ></div>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex justify-between">
        <Button asChild variant="outline" size="sm">
          <Link to={`/lists/${id}`}>View Details</Link>
        </Button>
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <MoreVertical className="h-4 w-4" />
          <span className="sr-only">Actions</span>
        </Button>
      </CardFooter>
    </Card>
  );
};
