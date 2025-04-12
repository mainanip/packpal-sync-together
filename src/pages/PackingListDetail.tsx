import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PackingListHeader } from '@/components/packing-list/PackingListHeader';
import { CategorySection } from '@/components/packing-list/CategorySection';
import { ItemStatus } from '@/components/packing-list/PackingItem';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { DuplicateTaskAlert } from '@/components/tasks/DuplicateTaskAlert';
import { TaskStatusChart } from '@/components/tasks/TaskStatusChart';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserRole, PackingTask } from '@/types/auth';
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectLabel, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { User, Trash2, UserPlus, Edit, Download, BarChart } from 'lucide-react';

// Type for a complete category with items
interface Category {
  id: string;
  name: string;
  icon: string;
  items: PackingTask[];
}

// Type for a task assignment conflict
interface TaskConflict {
  taskId: string;
  taskName: string;
  assignees: string[];
}

const PackingListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  const { user } = useAuth();
  
  const [isAddMemberOpen, setIsAddMemberOpen] = useState(false);
  const [isEditTaskOpen, setIsEditTaskOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<string>('');
  const [members, setMembers] = useState<{ id: string; name: string }[]>([
    { id: 'user1', name: 'Alex' },
    { id: 'user2', name: 'Jordan' },
    { id: 'user3', name: 'Taylor' },
    { id: 'user4', name: 'Casey' }
  ]);
  
  // Task being edited
  const [currentTask, setCurrentTask] = useState<PackingTask | null>(null);
  
  // Task conflicts detection
  const [taskConflicts, setTaskConflicts] = useState<TaskConflict[]>([]);
  
  // In a real app, this data would be fetched from an API
  const [packingList, setPackingList] = useState({
    id: id || '1',
    title: 'Summer Camping Trip',
    description: 'Annual camping trip to Lake Tahoe',
    status: 'in-progress' as const,
    date: 'June 15-20, 2023',
    members: 4,
    categories: [
      {
        id: 'c1',
        name: 'Equipment',
        icon: '⛺',
        items: [
          {
            id: 'i1',
            name: 'Tent (3-person)',
            status: 'packed' as ItemStatus,
            assignee: 'Alex',
            assigneeId: 'user1',
            quantity: 1,
            notes: 'Make sure to pack the rain cover as well!',
            categoryId: 'c1',
            listId: '1',
            createdAt: new Date().toISOString()
          },
          {
            id: 'i2',
            name: 'Sleeping bags',
            status: 'packed' as ItemStatus,
            assignee: 'Jordan',
            assigneeId: 'user2',
            quantity: 3,
            notes: 'One for each person',
            categoryId: 'c1',
            listId: '1',
            createdAt: new Date().toISOString()
          },
          {
            id: 'i3',
            name: 'Camping chairs',
            status: 'to-pack' as ItemStatus,
            assignee: 'Taylor',
            assigneeId: 'user3',
            quantity: 4,
            categoryId: 'c1',
            listId: '1',
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: 'c2',
        name: 'Cooking',
        icon: '🍳',
        items: [
          {
            id: 'i4',
            name: 'Portable stove',
            status: 'to-pack' as ItemStatus,
            assignee: 'Jordan',
            assigneeId: 'user2',
            quantity: 1,
            categoryId: 'c2',
            listId: '1',
            createdAt: new Date().toISOString()
          },
          {
            id: 'i5',
            name: 'Cooler',
            status: 'delivered' as ItemStatus,
            assignee: 'Casey',
            assigneeId: 'user4',
            quantity: 1,
            notes: 'The large blue one',
            categoryId: 'c2',
            listId: '1',
            createdAt: new Date().toISOString()
          },
          {
            id: 'i6',
            name: 'Cooking utensils',
            status: 'packed' as ItemStatus,
            assignee: 'Alex',
            assigneeId: 'user1',
            quantity: 1,
            notes: 'Spatula, tongs, knives, etc.',
            categoryId: 'c2',
            listId: '1',
            createdAt: new Date().toISOString()
          }
        ]
      },
      {
        id: 'c3',
        name: 'Safety',
        icon: '🚑',
        items: [
          {
            id: 'i7',
            name: 'First aid kit',
            status: 'delivered' as ItemStatus,
            assignee: 'Taylor',
            assigneeId: 'user3',
            quantity: 1,
            categoryId: 'c3',
            listId: '1',
            createdAt: new Date().toISOString()
          },
          {
            id: 'i8',
            name: 'Flashlights',
            status: 'to-pack' as ItemStatus,
            assignee: 'Casey',
            assigneeId: 'user4',
            quantity: 4,
            notes: 'One for each person + extra batteries',
            categoryId: 'c3',
            listId: '1',
            createdAt: new Date().toISOString()
          }
        ]
      }
    ] as Category[]
  });
  
  // Task progress data for charts
  const [memberTaskProgress, setMemberTaskProgress] = useState({
    user1: {
      name: 'Alex',
      total: 3,
      packed: 2,
      delivered: 0,
      toPack: 1,
      percentage: 66.7
    },
    user2: {
      name: 'Jordan',
      total: 2,
      packed: 1,
      delivered: 0,
      toPack: 1,
      percentage: 50
    },
    user3: {
      name: 'Taylor',
      total: 2,
      packed: 0,
      delivered: 1,
      toPack: 1,
      percentage: 50
    },
    user4: {
      name: 'Casey',
      total: 2,
      packed: 0,
      delivered: 1,
      toPack: 1,
      percentage: 50
    }
  });
  
  // Check for task conflicts (same task assigned to multiple people)
  useEffect(() => {
    const assignmentMap = new Map<string, string[]>();
    
    packingList.categories.forEach(category => {
      category.items.forEach(item => {
        if (item.assignee) {
          const assignees = assignmentMap.get(item.name) || [];
          if (!assignees.includes(item.assignee)) {
            assignees.push(item.assignee);
            assignmentMap.set(item.name, assignees);
          }
        }
      });
    });
    
    const conflicts: TaskConflict[] = [];
    assignmentMap.forEach((assignees, taskName) => {
      if (assignees.length > 1) {
        let taskId = '';
        outer: for (const category of packingList.categories) {
          for (const item of category.items) {
            if (item.name === taskName) {
              taskId = item.id;
              break outer;
            }
          }
        }
        
        conflicts.push({
          taskId,
          taskName,
          assignees
        });
      }
    });
    
    setTaskConflicts(conflicts);
  }, [packingList]);
  
  const handleItemStatusChange = (itemId: string, newStatus: ItemStatus) => {
    const updatedCategories = packingList.categories.map(category => {
      const updatedItems = category.items.map(item => {
        if (item.id === itemId) {
          return { ...item, status: newStatus };
        }
        return item;
      });
      return { ...category, items: updatedItems };
    });
    
    setPackingList({ ...packingList, categories: updatedCategories });
    
    toast({
      title: "Item status updated",
      description: `Item has been marked as ${newStatus.replace('-', ' ')}`,
    });
    
    updateTaskProgress(itemId, newStatus);
  };
  
  const updateTaskProgress = (itemId: string, newStatus: ItemStatus) => {
    let assigneeId = '';
    packingList.categories.forEach(category => {
      const item = category.items.find(i => i.id === itemId);
      if (item && item.assigneeId) {
        assigneeId = item.assigneeId;
      }
    });
    
    if (!assigneeId) return;
    
    setMemberTaskProgress(prev => {
      if (!prev[assigneeId as keyof typeof prev]) return prev;
      
      const memberProgress = {...prev[assigneeId as keyof typeof prev]};
      
      if (newStatus === 'packed') {
        memberProgress.packed += 1;
        memberProgress.toPack -= 1;
      } else if (newStatus === 'delivered') {
        memberProgress.delivered += 1;
        memberProgress.packed -= 1;
      }
      
      memberProgress.percentage = ((memberProgress.packed + memberProgress.delivered) / memberProgress.total) * 100;
      
      return {
        ...prev,
        [assigneeId]: memberProgress
      };
    });
  };
  
  const handleEdit = () => {
    toast({
      title: "Edit List",
      description: "This would open the list editing form in a real app.",
    });
  };
  
  const handleShare = () => {
    toast({
      title: "Share List",
      description: "This would open sharing options in a real app.",
    });
  };
  
  const handleExport = () => {
    toast({
      title: "Export List",
      description: "This would generate a PDF export in a real app.",
    });
  };
  
  const handleAddMember = () => {
    if (!selectedMember) return;
    
    toast({
      title: "Member Added",
      description: `${selectedMember} has been added to this packing list.`,
    });
    
    setIsAddMemberOpen(false);
    setSelectedMember('');
  };
  
  const handleEditTask = () => {
    if (!currentTask) return;
    
    const updatedCategories = packingList.categories.map(category => {
      if (category.id === currentTask.categoryId) {
        const updatedItems = category.items.map(item => {
          if (item.id === currentTask.id) {
            return currentTask;
          }
          return item;
        });
        return { ...category, items: updatedItems };
      }
      return category;
    });
    
    setPackingList({ ...packingList, categories: updatedCategories });
    
    toast({
      title: "Task Updated",
      description: `"${currentTask.name}" has been updated.`,
    });
    
    setIsEditTaskOpen(false);
    setCurrentTask(null);
  };
  
  const handleDeleteTask = (taskId: string) => {
    let taskCategory: Category | null = null;
    
    for (const category of packingList.categories) {
      if (category.items.some(item => item.id === taskId)) {
        taskCategory = category;
        break;
      }
    }
    
    if (!taskCategory) return;
    
    const updatedCategories = packingList.categories.map(category => {
      if (category.id === taskCategory?.id) {
        return {
          ...category,
          items: category.items.filter(item => item.id !== taskId)
        };
      }
      return category;
    });
    
    setPackingList({ ...packingList, categories: updatedCategories });
    
    toast({
      title: "Task Deleted",
      description: "The task has been removed from the packing list.",
    });
  };
  
  const handleEditTaskClick = (taskId: string) => {
    let task: PackingTask | null = null;
    
    packingList.categories.forEach(category => {
      const found = category.items.find(item => item.id === taskId);
      if (found) {
        task = found;
      }
    });
    
    if (task) {
      setCurrentTask(task);
      setIsEditTaskOpen(true);
    }
  };
  
  const handleDownloadChart = (memberId: string) => {
    const memberName = memberTaskProgress[memberId as keyof typeof memberTaskProgress]?.name || 'Member';
    
    toast({
      title: "Downloading Chart",
      description: `${memberName}'s task progress chart would be downloaded as a PDF in a real app.`,
    });
  };
  
  const handleResolveConflict = (taskId: string) => {
    setTaskConflicts(prev => prev.filter(conflict => conflict.taskId !== taskId));
  };
  
  const isOwner = user?.role === 'owner';
  const isAdmin = user?.role === 'admin';
  const isMember = user?.role === 'member';
  const isViewer = user?.role === 'viewer';
  
  const canEditTask = (assigneeId?: string) => {
    if (isOwner || isAdmin) return true;
    if (isMember && user && assigneeId === user.id) return true;
    return false;
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          {isOwner && taskConflicts.map((conflict) => (
            <DuplicateTaskAlert 
              key={conflict.taskId}
              taskName={conflict.taskName}
              assignees={conflict.assignees}
              onResolve={() => handleResolveConflict(conflict.taskId)}
            />
          ))}
          
          <PackingListHeader
            title={packingList.title}
            description={packingList.description}
            status={packingList.status}
            date={packingList.date}
            members={packingList.members}
            onEdit={isOwner ? handleEdit : undefined}
            onShare={isOwner ? handleShare : undefined}
            onExport={handleExport}
            onAddMember={isOwner ? () => setIsAddMemberOpen(true) : undefined}
          />
          
          {isOwner && (
            <div className="mb-8 mt-6">
              <h2 className="text-xl font-semibold mb-4">Member Progress</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.keys(memberTaskProgress).map((memberId) => (
                  <TaskStatusChart
                    key={memberId}
                    progressData={memberTaskProgress[memberId as keyof typeof memberTaskProgress]}
                    userName={memberTaskProgress[memberId as keyof typeof memberTaskProgress].name}
                    onDownload={() => handleDownloadChart(memberId)}
                    chartType="pie"
                  />
                ))}
              </div>
            </div>
          )}
          
          {isMember && user && (
            <div className="mb-8 mt-6">
              <h2 className="text-xl font-semibold mb-4">Your Progress</h2>
              <TaskStatusChart
                progressData={{
                  total: 5,
                  packed: 3,
                  delivered: 1,
                  toPack: 1,
                  percentage: 80
                }}
                userName={user.name}
                onDownload={() => handleDownloadChart(user.id)}
                chartType="bar"
              />
            </div>
          )}
          
          <div>
            {packingList.categories.map(category => (
              <CategorySection
                key={category.id}
                name={category.name}
                icon={category.icon}
                items={category.items.map(item => {
                  const canEdit = canEditTask(item.assigneeId);
                  
                  return {
                    ...item,
                    onEdit: canEdit ? () => handleEditTaskClick(item.id) : undefined,
                    onDelete: isOwner ? () => handleDeleteTask(item.id) : undefined,
                    disabled: isMember && user && item.assigneeId !== user.id
                  };
                })}
                onItemStatusChange={handleItemStatusChange}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
      
      <Dialog open={isAddMemberOpen} onOpenChange={setIsAddMemberOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Member to Packing List</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <Select value={selectedMember} onValueChange={setSelectedMember}>
              <SelectTrigger>
                <SelectValue placeholder="Select a member" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Available Members</SelectLabel>
                  {members.map(member => (
                    <SelectItem key={member.id} value={member.id}>
                      {member.name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddMemberOpen(false)}>Cancel</Button>
            <Button onClick={handleAddMember}>
              <UserPlus className="h-4 w-4 mr-2" />
              Add Member
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Dialog open={isEditTaskOpen} onOpenChange={setIsEditTaskOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Task</DialogTitle>
          </DialogHeader>
          {currentTask && (
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Task Name</label>
                <Input 
                  value={currentTask.name} 
                  onChange={(e) => setCurrentTask({...currentTask, name: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Quantity</label>
                <Input 
                  type="number" 
                  value={currentTask.quantity} 
                  onChange={(e) => setCurrentTask({...currentTask, quantity: parseInt(e.target.value) || 1})}
                />
              </div>
              <div>
                <label className="text-sm font-medium">Assignee</label>
                <Select 
                  value={currentTask.assigneeId} 
                  onValueChange={(value) => {
                    const member = members.find(m => m.id === value);
                    setCurrentTask({
                      ...currentTask, 
                      assigneeId: value,
                      assignee: member ? member.name : ''
                    });
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Assign to member" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Members</SelectLabel>
                      {members.map(member => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium">Notes</label>
                <Input 
                  value={currentTask.notes || ''} 
                  onChange={(e) => setCurrentTask({...currentTask, notes: e.target.value})}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditTaskOpen(false)}>Cancel</Button>
            <Button onClick={handleEditTask}>
              <Edit className="h-4 w-4 mr-2" />
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PackingListDetail;
