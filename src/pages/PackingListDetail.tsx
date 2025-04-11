
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PackingListHeader } from '@/components/packing-list/PackingListHeader';
import { CategorySection } from '@/components/packing-list/CategorySection';
import { ItemStatus } from '@/components/packing-list/PackingItem';
import { useToast } from "@/hooks/use-toast";

const PackingListDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { toast } = useToast();
  
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
            category: 'Equipment',
            status: 'packed' as ItemStatus,
            assignee: 'Alex',
            quantity: 1,
            notes: 'Make sure to pack the rain cover as well!'
          },
          {
            id: 'i2',
            name: 'Sleeping bags',
            category: 'Equipment',
            status: 'packed' as ItemStatus,
            assignee: 'Jordan',
            quantity: 3,
            notes: 'One for each person'
          },
          {
            id: 'i3',
            name: 'Camping chairs',
            category: 'Equipment',
            status: 'to-pack' as ItemStatus,
            assignee: 'Taylor',
            quantity: 4
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
            category: 'Cooking',
            status: 'to-pack' as ItemStatus,
            assignee: 'Jordan',
            quantity: 1
          },
          {
            id: 'i5',
            name: 'Cooler',
            category: 'Cooking',
            status: 'delivered' as ItemStatus,
            assignee: 'Casey',
            quantity: 1,
            notes: 'The large blue one'
          },
          {
            id: 'i6',
            name: 'Cooking utensils',
            category: 'Cooking',
            status: 'packed' as ItemStatus,
            assignee: 'Alex',
            quantity: 1,
            notes: 'Spatula, tongs, knives, etc.'
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
            category: 'Safety',
            status: 'delivered' as ItemStatus,
            assignee: 'Taylor',
            quantity: 1
          },
          {
            id: 'i8',
            name: 'Flashlights',
            category: 'Safety',
            status: 'to-pack' as ItemStatus,
            assignee: 'Casey',
            quantity: 4,
            notes: 'One for each person + extra batteries'
          }
        ]
      }
    ]
  });
  
  const handleItemStatusChange = (itemId: string, newStatus: ItemStatus) => {
    // Update the item status in our state
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
    
    // In a real app, this would also update the backend via an API call
    toast({
      title: "Item status updated",
      description: `Item has been marked as ${newStatus.replace('-', ' ')}`,
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
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <PackingListHeader
            title={packingList.title}
            description={packingList.description}
            status={packingList.status as any}
            date={packingList.date}
            members={packingList.members}
            onEdit={handleEdit}
            onShare={handleShare}
            onExport={handleExport}
          />
          
          <div>
            {packingList.categories.map(category => (
              <CategorySection
                key={category.id}
                name={category.name}
                icon={category.icon}
                items={category.items}
                onItemStatusChange={handleItemStatusChange}
              />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackingListDetail;
