
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { User } from "@/types/auth";

interface EditPackingListModalProps {
  open: boolean;
  onClose: () => void;
  packingListId: string;
  title: string;
  date: string;
  members: number;
}

// Mock list members - in a real app, this would come from an API
const mockListMembersData: Record<string, User[]> = {
  "1": [
    { id: "1", name: "John Doe", email: "john@example.com", role: "member" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "member" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "member" },
  ],
  "2": [
    { id: "1", name: "John Doe", email: "john@example.com", role: "member" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "member" },
  ],
  "3": [
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "member" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "member" },
    { id: "4", name: "Alice Brown", email: "alice@example.com", role: "member" },
  ]
};

export const EditPackingListModal = ({
  open,
  onClose,
  packingListId,
  title: initialTitle,
  date: initialDate,
  members: initialMembers,
}: EditPackingListModalProps) => {
  const [title, setTitle] = useState(initialTitle);
  const [date, setDate] = useState(initialDate);
  const [description, setDescription] = useState("");
  const [listMembers, setListMembers] = useState<User[]>(mockListMembersData[packingListId] || []);
  const { toast } = useToast();

  const handleSave = () => {
    if (!title) {
      toast({
        title: "Error",
        description: "Please provide a title for the packing list.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call to update the list
    toast({
      title: "List Updated",
      description: `"${title}" has been updated successfully.`,
    });
    
    // Update mockListMembersData with current listMembers
    mockListMembersData[packingListId] = listMembers;
    
    onClose();
  };

  const handleRemoveMember = (memberId: string) => {
    // Update the local state to remove the member
    const updatedMembers = listMembers.filter(member => member.id !== memberId);
    setListMembers(updatedMembers);
    
    // In a real app, this would make an API call to remove a member
    toast({
      title: "Member Removed",
      description: `Member has been removed from "${title}".`,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Edit Packing List</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description (optional)</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Add a description..."
                rows={3}
              />
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Members ({listMembers.length})</h3>
            <div className="space-y-2 max-h-[200px] overflow-auto">
              {listMembers.length > 0 ? (
                listMembers.map((member) => (
                  <div key={member.id} className="flex items-center justify-between border rounded-md p-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{member.name}</span>
                      <span className="text-xs text-muted-foreground">{member.email}</span>
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleRemoveMember(member.id)}
                    >
                      Remove
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No members in this list.</p>
              )}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
