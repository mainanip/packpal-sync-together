import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
// import { Member, PackingListItemProps } from './Dashboard';
import { PackingListItemProps, Member } from '@/pages/Dashboard';

interface AssignTasksModalProps {
  list: PackingListItemProps;
  members: Member[];
  onClose: () => void;
  onSave: (assignedMembers: string[]) => void;
}

export const AssignTasksModal = ({ list, members, onClose, onSave }: AssignTasksModalProps) => {
  const [selectedMembers, setSelectedMembers] = useState<string[]>(list.assignedMembers || []);

  const handleMemberToggle = (memberEmail: string) => {
    setSelectedMembers(prev => 
      prev.includes(memberEmail)
        ? prev.filter(email => email !== memberEmail)
        : [...prev, memberEmail]
    );
  };

  const handleSubmit = () => {
    onSave(selectedMembers);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Assign Tasks for {list.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <p className="text-sm text-muted-foreground">
            Select members to assign tasks to for this packing list.
          </p>
          <div className="space-y-2">
            {members.map(member => (
              <div key={member.id} className="flex items-center space-x-2">
                <Checkbox
                  id={`member-${member.id}`}
                  checked={selectedMembers.includes(member.email)}
                  onCheckedChange={() => handleMemberToggle(member.email)}
                />
                <Label htmlFor={`member-${member.id}`}>
                  {member.name} ({member.email})
                </Label>
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Assignments
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};