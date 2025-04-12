
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { PackingListCard, PackingListItemProps } from '@/components/dashboard/PackingListCard';
import { TemplateType, TemplateSummary } from '@/components/dashboard/TemplateSummary';
import { Button } from '@/components/ui/button';
import { Plus, Download } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';
import { TaskStatusChart } from '@/components/tasks/TaskStatusChart';
import { CreateListModal } from '@/components/dashboard/CreateListModal';

const Dashboard = () => {
  const { toast } = useToast();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  
  // Sample data - in a real app this would come from an API
  const [packingLists, setPackingLists] = useState<PackingListItemProps[]>([
    {
      id: '1',
      title: 'Summer Camping Trip',
      totalItems: 25,
      packedItems: 18,
      members: 4,
      date: 'June 15-20, 2023',
      status: 'in-progress',
    },
    {
      id: '2',
      title: 'Tech Hackathon',
      totalItems: 15,
      packedItems: 15,
      members: 3,
      date: 'July 8-10, 2023',
      status: 'completed',
    },
    {
      id: '3',
      title: 'Beach Day',
      totalItems: 8,
      packedItems: 0,
      members: 6,
      date: 'August 5, 2023',
      status: 'not-started',
    },
  ]);
  
  const templates: TemplateType[] = [
    { id: 't1', name: 'Weekend Getaway', categories: 4, items: 28, icon: '✈️' },
    { id: 't2', name: 'Hackathon', categories: 3, items: 24, icon: '💻' },
    { id: 't3', name: 'Camping Trip', categories: 5, items: 35, icon: '🏕️' },
    { id: 't4', name: 'Beach Day', categories: 3, items: 18, icon: '🏖️' },
  ];

  // Sample task progress data - in a real app this would come from an API
  const taskProgressData = {
    total: 25,
    packed: 18,
    delivered: 3,
    toPack: 4,
    percentage: 72
  };
  
  const handleCreateList = () => {
    setSelectedTemplateId(null);
    setIsCreateModalOpen(true);
  };
  
  const handleUseTemplate = (templateId: string) => {
    setSelectedTemplateId(templateId);
    setIsCreateModalOpen(true);
  };

  const handleDownloadChart = () => {
    toast({
      title: "Downloading Chart",
      description: "This would download the chart as a PDF in a real app.",
    });
  };
  
  const handleAddNewList = (newList: PackingListItemProps) => {
    // Add the new list to the packingLists array
    setPackingLists(prevLists => [newList, ...prevLists]);
    
    toast({
      title: "New List Added",
      description: `"${newList.title}" has been added to your dashboard.`,
    });
  };
  
  // Redirect admin users to the admin dashboard
  useEffect(() => {
    if (user?.role === 'admin') {
      navigate('/admin');
    }
  }, [user, navigate]);
  
  return (
    <div className="min-h-screen flex flex-col">
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
          
          {/* Task Progress Chart - Only show for members and owners */}
          {(user?.role === 'owner' || user?.role === 'member') && (
            <div className="mb-8">
              <TaskStatusChart 
                progressData={taskProgressData}
                userName={user?.name || ''}
                onDownload={handleDownloadChart}
                chartType="bar"
              />
            </div>
          )}
          
          {packingLists.length === 0 ? (
            <EmptyState
              title={user?.role === 'owner' ? "No packing lists yet" : "No tasks assigned"}
              description={user?.role === 'owner' 
                ? "Create your first packing list to get started with collaborative packing."
                : "You don't have any tasks assigned to you yet."
              }
              actionLabel={user?.role === 'owner' ? "Create Packing List" : "View Available Lists"}
              onAction={handleCreateList}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {packingLists.map((list) => (
                <PackingListCard key={list.id} {...list} />
              ))}
            </div>
          )}
          
          {/* Only show templates for owners */}
          {user?.role === 'owner' && (
            <div className="mt-12">
              <h2 className="text-2xl font-bold mb-6">Quick Start Templates</h2>
              <TemplateSummary templates={templates} onUseTemplate={handleUseTemplate} />
            </div>
          )}
        </div>
      </main>
      <Footer />
      
      {/* Create New List Modal */}
      <CreateListModal
        open={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        templates={templates}
        onCreateList={handleAddNewList}
      />
    </div>
  );
};

export default Dashboard;
