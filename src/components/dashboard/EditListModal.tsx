import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useState } from 'react';
// import { PackingListItemProps } from '../../pages/Dashboard';
import { PackingListItemProps, Member } from '@/pages/Dashboard';

interface EditListModalProps {
  list: PackingListItemProps;
  onClose: () => void;
  onSave: (updatedList: PackingListItemProps) => void;
}

export const EditListModal = ({ list, onClose, onSave }: EditListModalProps) => {
  const [editedList, setEditedList] = useState<PackingListItemProps>({ ...list });

  const handleChange = (field: keyof PackingListItemProps, value: any) => {
    setEditedList(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    onSave(editedList);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Packing List</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={editedList.title}
              onChange={(e) => handleChange('title', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="date">Date</Label>
            <Input
              id="date"
              value={editedList.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="totalItems">Total Items</Label>
            <Input
              id="totalItems"
              type="number"
              value={editedList.totalItems}
              onChange={(e) => handleChange('totalItems', parseInt(e.target.value))}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="packedItems">Packed Items</Label>
            <Input
              id="packedItems"
              type="number"
              value={editedList.packedItems}
              onChange={(e) => handleChange('packedItems', parseInt(e.target.value))}
            />
          </div>
        </div>
        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit}>
            Save Changes
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};