
// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Navbar } from '@/components/layout/Navbar';
// import { Footer } from '@/components/layout/Footer';
// import { EmptyState } from '@/components/dashboard/EmptyState';
// import { PackingListCard, PackingListItemProps } from '@/components/dashboard/PackingListCard';
// import { TemplateType, TemplateSummary } from '@/components/dashboard/TemplateSummary';
// import { Button } from '@/components/ui/button';
// import { Plus, Download } from 'lucide-react';
// import { useToast } from "@/hooks/use-toast";
// import { useAuth } from '@/contexts/AuthContext';
// import { TaskStatusChart } from '@/components/tasks/TaskStatusChart';

// const Dashboard = () => {
//   const { toast } = useToast();
//   const { user } = useAuth();
//   const navigate = useNavigate();
  
//   // Sample data - in a real app this would come from an API
//   const [packingLists, setPackingLists] = useState<PackingListItemProps[]>([
//     {
//       id: '1',
//       title: 'Summer Camping Trip',
//       totalItems: 25,
//       packedItems: 18,
//       members: 4,
//       date: 'June 15-20, 2023',
//       status: 'in-progress',
//     },
//     {
//       id: '2',
//       title: 'Tech Hackathon',
//       totalItems: 15,
//       packedItems: 15,
//       members: 3,
//       date: 'July 8-10, 2023',
//       status: 'completed',
//     },
//     {
//       id: '3',
//       title: 'Beach Day',
//       totalItems: 8,
//       packedItems: 0,
//       members: 6,
//       date: 'August 5, 2023',
//       status: 'not-started',
//     },
//   ]);
  
//   const templates: TemplateType[] = [
//     { id: 't1', name: 'Weekend Getaway', categories: 4, items: 28, icon: '✈️' },
//     { id: 't2', name: 'Hackathon', categories: 3, items: 24, icon: '💻' },
//     { id: 't3', name: 'Camping Trip', categories: 5, items: 35, icon: '🏕️' },
//     { id: 't4', name: 'Beach Day', categories: 3, items: 18, icon: '🏖️' },
//   ];

//   // Sample task progress data - in a real app this would come from an API
//   const taskProgressData = {
//     total: 25,
//     packed: 18,
//     delivered: 3,
//     toPack: 4,
//     percentage: 72
//   };
  
//   const handleCreateList = () => {
//     // In a real app, this would open a modal or navigate to a create page
//     toast({
//       title: "Create New Packing List",
//       description: "This would open a creation form in a real app.",
//     });
//   };
  
//   const handleUseTemplate = (templateId: string) => {
//     const template = templates.find(t => t.id === templateId);
//     toast({
//       title: `Using Template: ${template?.name}`,
//       description: "This would create a new list from this template.",
//     });
//   };

//   const handleDownloadChart = () => {
//     toast({
//       title: "Downloading Chart",
//       description: "This would download the chart as a PDF in a real app.",
//     });
//   };
  
//   // Redirect admin users to the admin dashboard
//   useEffect(() => {
//     if (user?.role === 'admin') {
//       navigate('/admin');
//     }
//   }, [user, navigate]);
  
//   return (
//     <div className="min-h-screen flex flex-col">
//       <Navbar />
//       <main className="flex-grow py-8">
//         <div className="container mx-auto px-4">
//           <div className="flex justify-between items-center mb-8">
//             <h1 className="text-3xl font-bold">
//               {user?.role === 'owner' ? 'Your Packing Lists' : 'Assigned Tasks'}
//             </h1>
//             {user?.role === 'owner' && (
//               <Button onClick={handleCreateList}>
//                 <Plus className="h-4 w-4 mr-2" />
//                 New List
//               </Button>
//             )}
//           </div>
          
//           {/* Task Progress Chart - Only show for members and owners */}
//           {(user?.role === 'owner' || user?.role === 'member') && (
//             <div className="mb-8">
//               <TaskStatusChart 
//                 progressData={taskProgressData}
//                 userName={user?.name || ''}
//                 onDownload={handleDownloadChart}
//                 chartType="bar"
//               />
//             </div>
//           )}
          
//           {packingLists.length === 0 ? (
//             <EmptyState
//               title={user?.role === 'owner' ? "No packing lists yet" : "No tasks assigned"}
//               description={user?.role === 'owner' 
//                 ? "Create your first packing list to get started with collaborative packing."
//                 : "You don't have any tasks assigned to you yet."
//               }
//               actionLabel={user?.role === 'owner' ? "Create Packing List" : "View Available Lists"}
//               onAction={handleCreateList}
//             />
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
//               {packingLists.map((list) => (
//                 <PackingListCard key={list.id} {...list} />
//               ))}
//             </div>
//           )}
          
//           {/* Only show templates for owners */}
//           {user?.role === 'owner' && (
//             <div className="mt-12">
//               <h2 className="text-2xl font-bold mb-6">Quick Start Templates</h2>
//               <TemplateSummary templates={templates} onUseTemplate={handleUseTemplate} />
//             </div>
//           )}
//         </div>
//       </main>
//       <Footer />
//     </div>
//   );
// };

// export default Dashboard;
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { PackingListCard } from '@/components/dashboard/PackingListCard';
import { TemplateSummary } from '@/components/dashboard/TemplateSummary';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { TaskStatusChart } from '@/components/tasks/TaskStatusChart';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

export interface PackingListItemProps {
  id: string;
  title: string;
  totalItems: number;
  packedItems: number;
  deliveredItems: number;
  members: number;
  date: string;
  status: 'in-progress' | 'completed' | 'not-started';
  assignedMembers?: string[];
  tasks?: PackingTask[];
}

export interface PackingTask {
  id: string;
  name: string;
  status: 'to-pack' | 'packed' | 'delivered';
  assigneeId: string;
}

export interface TemplateType {
  id: string;
  name: string;
  categories: number;
  items: number;
  icon: string;
  createdBy?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: 'owner' | 'member';
}

// ------------------- AssignTasksModal -------------------
const AssignTasksModal = ({
  list,
  members,
  onClose,
  onSave,
}: {
  list: PackingListItemProps;
  members: Member[];
  onClose: () => void;
  onSave: (assignments: { taskId: string; assigneeId: string }[]) => void;
}) => {
  const [assignments, setAssignments] = useState<Record<string, string>>(
    list.tasks?.reduce((acc, task) => {
      if (task.assigneeId) acc[task.id] = task.assigneeId;
      return acc;
    }, {} as Record<string, string>) || {}
  );

  const handleAssignmentChange = (taskId: string, memberId: string) => {
    setAssignments(prev => ({
      ...prev,
      [taskId]: memberId
    }));
  };

  const handleSubmit = () => {
    const assignmentList = Object.entries(assignments).map(([taskId, assigneeId]) => ({
      taskId,
      assigneeId
    }));
    onSave(assignmentList);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Assign Tasks for {list.title}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="grid grid-cols-4 gap-2 items-center">
            <div className="font-medium">Task</div>
            <div className="font-medium">Status</div>
            <div className="font-medium">Assigned To</div>
            <div className="font-medium">Action</div>

            {list.tasks?.map(task => (
              <>
                <div>{task.name}</div>
                <div className="capitalize">{task.status.replace('-', ' ')}</div>
                <div>
                  <select
                    className="w-full p-2 border rounded"
                    value={assignments[task.id] || ''}
                    onChange={(e) => handleAssignmentChange(task.id, e.target.value)}
                  >
                    <option value="">Unassigned</option>
                    {members.map(member => (
                      <option key={member.id} value={member.id}>
                        {member.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleAssignmentChange(task.id, '')}
                  >
                    Clear
                  </Button>
                </div>
              </>
            ))}
          </div>
        </div>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save Assignments</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ------------------- Dashboard -------------------
const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [packingLists, setPackingLists] = useState<PackingListItemProps[]>([
    {
      id: '1',
      title: 'Summer Camping Trip',
      totalItems: 8,
      packedItems: 4,
      deliveredItems: 1,
      members: 4,
      date: 'June 15-20, 2023',
      status: 'in-progress',
      assignedMembers: ['member1@example.com', 'member2@example.com'],
      tasks: [
        { id: 't1', name: 'Tent', status: 'packed', assigneeId: '1' },
        { id: 't2', name: 'Sleeping Bags', status: 'packed', assigneeId: '1' },
        { id: 't3', name: 'Camping Chairs', status: 'to-pack', assigneeId: '2' },
        { id: 't4', name: 'Portable Stove', status: 'to-pack', assigneeId: '2' },
        { id: 't5', name: 'Cooler', status: 'delivered', assigneeId: '3' },
        { id: 't6', name: 'Cooking Utensils', status: 'packed', assigneeId: '3' },
        { id: 't7', name: 'First Aid Kit', status: 'packed', assigneeId: '4' },
        { id: 't8', name: 'Flashlights', status: 'to-pack', assigneeId: '4' },
      ]
    }
  ]);

  const [templates] = useState<TemplateType[]>([
    { id: 't1', name: 'Weekend Getaway', categories: 4, items: 28, icon: '✈️', createdBy: user?.email }
  ]);

  const [members] = useState<Member[]>([
    { id: '1', name: 'John Doe', email: 'member1@example.com', role: 'member' },
    { id: '2', name: 'Jane Smith', email: 'member2@example.com', role: 'member' },
    { id: '3', name: 'Bob Johnson', email: 'member3@example.com', role: 'member' },
    { id: '4', name: 'Alice Brown', email: 'member4@example.com', role: 'member' }
  ]);

  const [selectedList, setSelectedList] = useState<PackingListItemProps | null>(null);
  const [showAssignModal, setShowAssignModal] = useState(false);

  // Calculate task progress
  const taskProgressData = {
    total: packingLists.reduce((sum, list) => sum + list.totalItems, 0),
    packed: packingLists.reduce((sum, list) => sum + list.packedItems, 0),
    delivered: packingLists.reduce((sum, list) => sum + list.deliveredItems, 0),
    toPack: packingLists.reduce((sum, list) => sum + (list.totalItems - list.packedItems - list.deliveredItems), 0),
    percentage: Math.round(
      (packingLists.reduce((sum, list) => sum + list.packedItems + list.deliveredItems, 0) /
        Math.max(packingLists.reduce((sum, list) => sum + list.totalItems, 0), 1)) * 100
    )
  };

  const handleAssignTasks = (list: PackingListItemProps) => {
    setSelectedList(list);
    setShowAssignModal(true);
  };

  const handleSaveAssignments = (assignments: { taskId: string; assigneeId: string }[]) => {
    if (!selectedList) return;

    // Update tasks with new assignments
    const updatedTasks = selectedList.tasks?.map(task => {
      const assignment = assignments.find(a => a.taskId === task.id);
      return assignment ? { ...task, assigneeId: assignment.assigneeId } : task;
    }) || [];

    // Count members with assignments
    const assignedMemberIds = new Set(
      assignments.map(a => a.assigneeId).filter(Boolean)
    );

    // Update the packing list
    setPackingLists(prev =>
      prev.map(list =>
        list.id === selectedList.id
          ? {
              ...list,
              tasks: updatedTasks,
              members: assignedMemberIds.size
            }
          : list
      )
    );

    toast({
      title: "Tasks Assigned",
      description: `Tasks have been assigned to ${assignedMemberIds.size} members.`,
    });
    setShowAssignModal(false);
  };

  const handleTaskStatusChange = (listId: string, taskId: string, newStatus: 'to-pack' | 'packed' | 'delivered') => {
    setPackingLists(prev =>
      prev.map(list => {
        if (list.id !== listId) return list;

        const updatedTasks = list.tasks?.map(task =>
          task.id === taskId ? { ...task, status: newStatus } : task
        ) || [];

        // Calculate new counts
        const packedItems = updatedTasks.filter(t => t.status === 'packed').length;
        const deliveredItems = updatedTasks.filter(t => t.status === 'delivered').length;
        const totalItems = updatedTasks.length;

        // Determine overall status
        let status: 'in-progress' | 'completed' | 'not-started' = 'in-progress';
        if (deliveredItems === totalItems) status = 'completed';
        else if (packedItems + deliveredItems === 0) status = 'not-started';

        return {
          ...list,
          tasks: updatedTasks,
          packedItems,
          deliveredItems,
          status
        };
      })
    );
  };

  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      const newList: PackingListItemProps = {
        id: `list-${Date.now()}`,
        title: `New ${template.name}`,
        totalItems: template.items,
        packedItems: 0,
        deliveredItems: 0,
        members: 0,
        date: new Date().toLocaleDateString(),
        status: 'not-started',
        assignedMembers: [],
        tasks: Array.from({ length: template.items }, (_, i) => ({
          id: `task-${Date.now()}-${i}`,
          name: `Task ${i + 1}`,
          status: 'to-pack',
          assigneeId: ''
        }))
      };
      setPackingLists([...packingLists, newList]);
      toast({
        title: "New List Created",
        description: `A new list "${newList.title}" has been created from template.`,
      });
    }
  };

  const handleCreateList = () => {
    const newList: PackingListItemProps = {
      id: `list-${Date.now()}`,
      title: 'New Packing List',
      totalItems: 0,
      packedItems: 0,
      deliveredItems: 0,
      members: 0,
      date: new Date().toLocaleDateString(),
      status: 'not-started',
      assignedMembers: [],
      tasks: []
    };
    setPackingLists([...packingLists, newList]);
    toast({
      title: "New List Created",
      description: "You can now add tasks to your new packing list.",
    });
  };

  useEffect(() => {
    if (user?.role === 'admin') navigate('/admin');
  }, [user, navigate]);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">
              {user?.role === 'owner' ? 'Your Packing Lists' : 'Assigned Tasks'}
            </h1>
            {user?.role === 'owner' && (
              <Button onClick={handleCreateList}>
                <Plus className="h-4 w-4 mr-2" />
                New List
              </Button>
            )}
          </div>

          {(user?.role === 'owner' || user?.role === 'member') && (
            <div className="mb-8">
              <TaskStatusChart
                progressData={taskProgressData}
                userName={user?.name || ''}
                onDownload={() => toast({ title: "Download initiated" })}
                chartType="bar"
              />
            </div>
          )}

          {packingLists.length === 0 ? (
            <EmptyState
              title={user?.role === 'owner' ? "No packing lists yet" : "No tasks assigned"}
              description={user?.role === 'owner'
                ? "Create your first packing list to get started."
                : "You don't have any tasks assigned to you yet."
              }
              actionLabel={user?.role === 'owner' ? "Create Packing List" : "View Lists"}
              onAction={handleCreateList}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {packingLists.map((list) => (
                <PackingListCard
                  key={list.id}
                  {...list}
                  onAssignTasks={() => handleAssignTasks(list)}
                  onTaskStatusChange={(taskId, newStatus) =>
                    handleTaskStatusChange(list.id, taskId, newStatus)
                  }
                  members={members}
                  currentUserId={user?.id}
                />
              ))}
            </div>
          )}

          {user?.role === 'owner' && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Quick Start Templates</h2>
              <TemplateSummary
                templates={templates}
                onUseTemplate={handleUseTemplate}
              />
            </div>
          )}
        </div>
      </main>
      <Footer />

      {showAssignModal && selectedList && (
        <AssignTasksModal
          list={selectedList}
          members={members}
          onClose={() => setShowAssignModal(false)}
          onSave={handleSaveAssignments}
        />
      )}
    </div>
  );
};

export default Dashboard;