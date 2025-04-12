
// import { Button } from '@/components/ui/button';
// import { Share, Download, Users, Calendar, PenSquare, Eye } from 'lucide-react';
// import { Badge } from '@/components/ui/badge';
// import { PackingListStatus } from '../dashboard/PackingListCard';
// import { Link } from 'react-router-dom';

// interface PackingListHeaderProps {
//   title: string;
//   description?: string;
//   status: PackingListStatus;
//   date: string;
//   members: number;
//   onEdit: () => void;
//   onShare: () => void;
//   onExport: () => void;
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

// export const PackingListHeader = ({
//   title,
//   description,
//   status,
//   date,
//   members,
//   onEdit,
//   onShare,
//   onExport
// }: PackingListHeaderProps) => {
//   // Get the current list ID from the URL
//   const listId = window.location.pathname.split('/').pop() || '';
  
//   return (
//     <div className="border-b pb-4 mb-6">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//         <div>
//           <div className="flex items-center gap-3">
//             <h1 className="text-2xl font-bold">{title}</h1>
//             <Badge className={getStatusColor(status)}>{getStatusLabel(status)}</Badge>
//           </div>
          
//           {description && (
//             <p className="text-muted-foreground mt-1">{description}</p>
//           )}
          
//           <div className="flex flex-wrap gap-4 mt-3">
//             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
//               <Calendar className="h-4 w-4" />
//               <span>{date}</span>
//             </div>
//             <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
//               <Users className="h-4 w-4" />
//               <span>{members} members</span>
//             </div>
//           </div>
//         </div>
        
//         <div className="flex flex-wrap gap-2">
//           <Button variant="outline" size="sm" onClick={onEdit}>
//             <PenSquare className="h-4 w-4 mr-1.5" />
//             Edit
//           </Button>
//           <Button variant="outline" size="sm" onClick={onShare}>
//             <Share className="h-4 w-4 mr-1.5" />
//             Share
//           </Button>
//           <Button variant="outline" size="sm" onClick={onExport}>
//             <Download className="h-4 w-4 mr-1.5" />
//             Export
//           </Button>
//           <Button asChild variant="outline" size="sm">
//             <Link to={`/view/${listId}`}>
//               <Eye className="h-4 w-4 mr-1.5" />
//               View Mode
//             </Link>
//           </Button>
//         </div>
//       </div>
//     </div>
//   );
// };
import { Button } from '@/components/ui/button';
import { Share, Download, Users, Calendar, PenSquare, Eye } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PackingListStatus } from '../dashboard/PackingListCard';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

interface PackingListHeaderProps {
  title: string;
  description?: string;
  status: PackingListStatus;
  date: string;
  members: number;
  onEdit?: () => void;
  onShare?: () => void;
  onExport: () => void;
  onAddMember?: () => void;
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

export const PackingListHeader = ({
  title,
  description,
  status,
  date,
  members,
  onEdit,
  onShare,
  onExport,
  onAddMember
}: PackingListHeaderProps) => {
  const { user } = useAuth();
  const listId = window.location.pathname.split('/').pop() || '';
  const isOwner = user?.role === 'owner';
  
  return (
    <div className="border-b pb-4 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">{title}</h1>
            <Badge className={getStatusColor(status)}>
              {getStatusLabel(status)}
            </Badge>
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
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
<<<<<<< HEAD
          {isOwner && (
=======
          {onEdit && (
>>>>>>> e546ee96121b931d656602354d30808e00fc1667
            <Button variant="outline" size="sm" onClick={onEdit}>
              <PenSquare className="h-4 w-4 mr-1.5" />
              Edit
            </Button>
          )}
<<<<<<< HEAD
          <Button variant="outline" size="sm" onClick={onShare}>
            <Share className="h-4 w-4 mr-1.5" />
            Share
          </Button>
=======
          {onShare && (
            <Button variant="outline" size="sm" onClick={onShare}>
              <Share className="h-4 w-4 mr-1.5" />
              Share
            </Button>
          )}
>>>>>>> e546ee96121b931d656602354d30808e00fc1667
          <Button variant="outline" size="sm" onClick={onExport}>
            <Download className="h-4 w-4 mr-1.5" />
            Export
          </Button>
          <Button asChild variant="outline" size="sm">
            <Link to={`/view/${listId}`}>
              <Eye className="h-4 w-4 mr-1.5" />
              View Mode
            </Link>
          </Button>
          {onAddMember && (
            <Button variant="outline" size="sm" onClick={onAddMember}>
              <Users className="h-4 w-4 mr-1.5" />
              Add Member
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};