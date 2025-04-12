
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreVertical, UserPlus, Edit } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from "@/components/ui/tooltip";

interface MoreOptionsMenuProps {
  onAssignTask: () => void;
  onEditList: () => void;
}

export const MoreOptionsMenu = ({ onAssignTask, onEditList }: MoreOptionsMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">More options</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent side="left">More options</TooltipContent>
        </Tooltip>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={onAssignTask} className="flex items-center gap-2 cursor-pointer">
          <UserPlus className="h-4 w-4" />
          <span>Assign Task</span>
        </DropdownMenuItem>
        <DropdownMenuItem onClick={onEditList} className="flex items-center gap-2 cursor-pointer">
          <Edit className="h-4 w-4" />
          <span>Edit List</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
