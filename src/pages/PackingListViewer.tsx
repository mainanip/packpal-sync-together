
import { useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { ViewerHeader } from '@/components/viewer/ViewerHeader';
import { ViewerCategorySection } from '@/components/viewer/ViewerCategorySection';
import { ItemStatus } from '@/components/packing-list/PackingItem';
import { useAuth } from '@/contexts/AuthContext';

const PackingListViewer = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  
  // In a real app, this data would be fetched from an API
  const [packingList] = useState({
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
  
  // If the user is logged in with 'owner' or 'admin' role, redirect to the edit mode
  if (user && (user.role === 'owner' || user.role === 'admin')) {
    return <Navigate to={`/lists/${id}`} />;
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <ViewerHeader
            title={packingList.title}
            description={packingList.description}
            status={packingList.status as any}
            date={packingList.date}
            members={packingList.members}
          />
          
          <div className="mt-6">
            {packingList.categories.map(category => (
              <ViewerCategorySection
                key={category.id}
                name={category.name}
                icon={category.icon}
                items={category.items}
              />
            ))}
          </div>
          
          <div className="mt-8 p-4 border rounded-lg bg-muted/30">
            <div className="text-sm text-muted-foreground text-center">
              <p>You are viewing this list in read-only mode.</p>
              {!user ? (
                <p>
                  <a href="/login" className="text-primary hover:underline">Login</a> to get edit access.
                </p>
              ) : user.role === 'viewer' ? (
                <p>Contact the list owner to request edit permissions.</p>
              ) : (
                <p>You have view-only permissions for this list.</p>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PackingListViewer;
