
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { User, PackingTask } from "@/types/auth";

interface AssignTaskModalProps {
  open: boolean;
  onClose: () => void;
  packingListId: string;
  packingListTitle: string;
}

// Mock data - in a real app, this would come from an API
const mockMembers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "member" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "member" },
  { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "member" },
];

// Mock tasks - in a real app, this would come from an API
const mockTasks: Record<string, PackingTask[]> = {
  "1": [
    { 
      id: "t1", 
      name: "Tent", 
      status: "to-pack", 
      assignee: "", 
      assigneeId: "", 
      quantity: 1, 
      categoryId: "c1", 
      listId: "1", 
      createdAt: new Date().toISOString() 
    },
    { 
      id: "t2", 
      name: "Sleeping Bag", 
      status: "to-pack", 
      assignee: "", 
      assigneeId: "", 
      quantity: 2, 
      categoryId: "c1", 
      listId: "1", 
      createdAt: new Date().toISOString() 
    },
    { 
      id: "t3", 
      name: "Cooking Set", 
      status: "to-pack", 
      assignee: "Jane Smith", 
      assigneeId: "2", 
      quantity: 1, 
      categoryId: "c2", 
      listId: "1", 
      createdAt: new Date().toISOString() 
    },
  ],
  "2": [
    { 
      id: "t4", 
      name: "Laptop", 
      status: "to-pack", 
      assignee: "", 
      assigneeId: "", 
      quantity: 1, 
      categoryId: "c3", 
      listId: "2", 
      createdAt: new Date().toISOString() 
    },
    { 
      id: "t5", 
      name: "Charger", 
      status: "to-pack", 
      assignee: "", 
      assigneeId: "", 
      quantity: 1, 
      categoryId: "c3", 
      listId: "2", 
      createdAt: new Date().toISOString() 
    },
  ],
  "3": [
    { 
      id: "t6", 
      name: "Sunscreen", 
      status: "to-pack", 
      assignee: "", 
      assigneeId: "", 
      quantity: 1, 
      categoryId: "c4", 
      listId: "3", 
      createdAt: new Date().toISOString() 
    },
    { 
      id: "t7", 
      name: "Towels", 
      status: "to-pack", 
      assignee: "", 
      assigneeId: "", 
      quantity: 2, 
      categoryId: "c4", 
      listId: "3", 
      createdAt: new Date().toISOString() 
    },
  ]
};

export const AssignTaskModal = ({
  open,
  onClose,
  packingListId,
  packingListTitle,
}: AssignTaskModalProps) => {
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [selectedTask, setSelectedTask] = useState<string | null>(null);
  const [availableTasks, setAvailableTasks] = useState<PackingTask[]>([]);
  const { toast } = useToast();

  // Filter tasks that don't have an assignee
  useEffect(() => {
    if (packingListId) {
      const listTasks = mockTasks[packingListId] || [];
      setAvailableTasks(listTasks.filter(task => !task.assigneeId));
    }
  }, [packingListId]);

  // Reset selected task when member changes
  useEffect(() => {
    setSelectedTask(null);
  }, [selectedMember]);

  const handleAssign = () => {
    if (!selectedMember || !selectedTask) {
      toast({
        title: "Error",
        description: "Please select both a member and a task.",
        variant: "destructive",
      });
      return;
    }

    // In a real app, this would make an API call
    const member = mockMembers.find(m => m.id === selectedMember);
    const task = availableTasks.find(t => t.id === selectedTask);

    if (member && task) {
      // Update the mock data to reflect the assignment
      const taskIndex = mockTasks[packingListId].findIndex(t => t.id === task.id);
      if (taskIndex !== -1) {
        mockTasks[packingListId][taskIndex].assignee = member.name;
        mockTasks[packingListId][taskIndex].assigneeId = member.id;
        
        // Update availableTasks to remove the assigned task
        setAvailableTasks(prevTasks => prevTasks.filter(t => t.id !== task.id));
      }
      
      toast({
        title: "Task Assigned",
        description: `"${task.name}" has been assigned to ${member.name}.`,
      });
      
      // Close the modal and reset state
      onClose();
      setSelectedMember(null);
      setSelectedTask(null);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Assign Task</DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-6">
          <div className="space-y-2">
            <h3 className="text-sm font-medium">List: {packingListTitle}</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">1. Select Member</h3>
              <RadioGroup
                value={selectedMember || ""}
                onValueChange={setSelectedMember}
                className="space-y-2"
              >
                {mockMembers.map(member => (
                  <div key={member.id} className="flex items-center space-x-2">
                    <RadioGroupItem value={member.id} id={`member-${member.id}`} />
                    <Label htmlFor={`member-${member.id}`} className="cursor-pointer">
                      {member.name}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
            
            {selectedMember && (
              <div>
                <h3 className="font-medium mb-2">2. Select Task</h3>
                {availableTasks.length > 0 ? (
                  <RadioGroup
                    value={selectedTask || ""}
                    onValueChange={setSelectedTask}
                    className="space-y-2"
                  >
                    {availableTasks.map(task => (
                      <div key={task.id} className="flex items-center space-x-2">
                        <RadioGroupItem value={task.id} id={`task-${task.id}`} />
                        <Label htmlFor={`task-${task.id}`} className="cursor-pointer">
                          {task.name} (Qty: {task.quantity})
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <p className="text-sm text-muted-foreground">No available tasks to assign.</p>
                )}
              </div>
            )}
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAssign}>Assign</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
