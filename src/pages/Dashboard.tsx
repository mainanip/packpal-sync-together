
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { EmptyState } from '@/components/dashboard/EmptyState';
import { PackingListCard, PackingListItemProps } from '@/components/dashboard/PackingListCard';
import { TemplateType, TemplateSummary } from '@/components/dashboard/TemplateSummary';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  
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
  
  const handleCreateList = () => {
    // In a real app, this would open a modal or navigate to a create page
    toast({
      title: "Create New Packing List",
      description: "This would open a creation form in a real app.",
    });
  };
  
  const handleUseTemplate = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    toast({
      title: `Using Template: ${template?.name}`,
      description: "This would create a new list from this template.",
    });
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Your Packing Lists</h1>
            <Button onClick={handleCreateList}>
              <Plus className="h-4 w-4 mr-2" />
              New List
            </Button>
          </div>
          
          {packingLists.length === 0 ? (
            <EmptyState
              title="No packing lists yet"
              description="Create your first packing list to get started with collaborative packing."
              actionLabel="Create Packing List"
              onAction={handleCreateList}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {packingLists.map((list) => (
                <PackingListCard key={list.id} {...list} />
              ))}
            </div>
          )}
          
          <div className="mt-12">
            <h2 className="text-2xl font-bold mb-6">Quick Start Templates</h2>
            <TemplateSummary templates={templates} onUseTemplate={handleUseTemplate} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
