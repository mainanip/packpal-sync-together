
import { Badge } from '@/components/ui/badge';
import { Download, Users, Calendar, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { PackingListStatus } from '@/components/dashboard/PackingListCard';

interface ViewerHeaderProps {
  title: string;
  description?: string;
  status: PackingListStatus;
  date: string;
  members: number;
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

export const ViewerHeader = ({
  title,
  description,
  status,
  date,
  members
}: ViewerHeaderProps) => {
  return (
    <div className="border-b pb-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
          </div>
          
          {description && (
            <p className="text-muted-foreground mt-1">{description}</p>
          )}
          
          <div className="flex flex-wrap gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{members} members</span>
            </div>
            <div className="flex items-center gap-1.5 text-sm text-packpal-purple">
              <Eye className="h-4 w-4" />
              <span>Viewer Mode</span>
            </div>
          </div>
        </div>
        
        <div>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-1.5" />
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
};
