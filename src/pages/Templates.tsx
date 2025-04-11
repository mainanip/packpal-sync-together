
import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useToast } from "@/hooks/use-toast";

interface TemplateItem {
  name: string;
  category: string;
}

interface Template {
  id: string;
  name: string;
  description: string;
  icon: string;
  categories: string[];
  itemCount: number;
  popularityScore: number;
  items: TemplateItem[];
}

const Templates = () => {
  const { toast } = useToast();
  
  const templates: Template[] = [
    {
      id: 't1',
      name: 'Weekend Getaway',
      description: 'Essential items for a quick weekend trip',
      icon: '✈️',
      categories: ['Clothing', 'Toiletries', 'Electronics', 'Documents'],
      itemCount: 28,
      popularityScore: 95,
      items: [
        { name: 'T-shirts', category: 'Clothing' },
        { name: 'Underwear', category: 'Clothing' },
        { name: 'Socks', category: 'Clothing' },
        { name: 'Toothbrush', category: 'Toiletries' },
        { name: 'Phone charger', category: 'Electronics' },
        // More items would be included here
      ]
    },
    {
      id: 't2',
      name: 'Hackathon',
      description: 'Everything you need for a coding competition',
      icon: '💻',
      categories: ['Tech', 'Personal', 'Miscellaneous'],
      itemCount: 24,
      popularityScore: 90,
      items: [
        { name: 'Laptop', category: 'Tech' },
        { name: 'Charger', category: 'Tech' },
        { name: 'Mouse', category: 'Tech' },
        { name: 'Water bottle', category: 'Personal' },
        { name: 'Snacks', category: 'Miscellaneous' },
        // More items would be included here
      ]
    },
    {
      id: 't3',
      name: 'Camping Trip',
      description: 'Complete gear list for outdoor adventures',
      icon: '🏕️',
      categories: ['Equipment', 'Cooking', 'Clothing', 'Safety', 'Personal'],
      itemCount: 35,
      popularityScore: 88,
      items: [
        { name: 'Tent', category: 'Equipment' },
        { name: 'Sleeping bag', category: 'Equipment' },
        { name: 'Portable stove', category: 'Cooking' },
        { name: 'First aid kit', category: 'Safety' },
        { name: 'Hiking boots', category: 'Clothing' },
        // More items would be included here
      ]
    },
    {
      id: 't4',
      name: 'Beach Day',
      description: 'Everything needed for a day at the beach',
      icon: '🏖️',
      categories: ['Beach Gear', 'Food & Drinks', 'Personal'],
      itemCount: 18,
      popularityScore: 85,
      items: [
        { name: 'Towels', category: 'Beach Gear' },
        { name: 'Sunscreen', category: 'Personal' },
        { name: 'Umbrella', category: 'Beach Gear' },
        { name: 'Cooler', category: 'Food & Drinks' },
        { name: 'Water bottles', category: 'Food & Drinks' },
        // More items would be included here
      ]
    },
    {
      id: 't5',
      name: 'International Travel',
      description: 'Comprehensive list for traveling abroad',
      icon: '🌍',
      categories: ['Documents', 'Clothing', 'Electronics', 'Toiletries', 'Miscellaneous'],
      itemCount: 45,
      popularityScore: 92,
      items: [
        { name: 'Passport', category: 'Documents' },
        { name: 'Travel insurance', category: 'Documents' },
        { name: 'Universal adapter', category: 'Electronics' },
        { name: 'Travel-size toiletries', category: 'Toiletries' },
        { name: 'Local currency', category: 'Miscellaneous' },
        // More items would be included here
      ]
    },
    {
      id: 't6',
      name: 'Wedding',
      description: 'Planning checklist for wedding preparations',
      icon: '💍',
      categories: ['Attire', 'Accessories', 'Emergency Kit', 'Documents'],
      itemCount: 38,
      popularityScore: 87,
      items: [
        { name: 'Wedding outfits', category: 'Attire' },
        { name: 'Rings', category: 'Accessories' },
        { name: 'Marriage license', category: 'Documents' },
        { name: 'Sewing kit', category: 'Emergency Kit' },
        { name: 'Vows/speech notes', category: 'Documents' },
        // More items would be included here
      ]
    },
  ];
  
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(null);
  
  const handleUseTemplate = (template: Template) => {
    toast({
      title: `Using Template: ${template.name}`,
      description: "This would create a new list from this template.",
    });
  };
  
  const handleViewTemplate = (template: Template) => {
    setSelectedTemplate(template);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow py-8">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Packing List Templates</h1>
            <p className="text-muted-foreground mt-2">
              Start with a pre-built template and customize it to your needs.
            </p>
          </div>
          
          <Tabs defaultValue="all">
            <TabsList className="mb-6">
              <TabsTrigger value="all">All Templates</TabsTrigger>
              <TabsTrigger value="travel">Travel</TabsTrigger>
              <TabsTrigger value="events">Events</TabsTrigger>
              <TabsTrigger value="outdoor">Outdoor</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates.map((template) => (
                  <Card key={template.id} className="overflow-hidden card-hover">
                    <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-2">
                      <span className="text-2xl">{template.icon}</span>
                      <div>
                        <h3 className="font-semibold">{template.name}</h3>
                        <p className="text-sm text-muted-foreground">{template.description}</p>
                      </div>
                    </CardHeader>
                    <CardContent className="p-4 pt-0">
                      <div className="flex flex-wrap gap-2 mt-3">
                        {template.categories.slice(0, 3).map((category, index) => (
                          <Badge key={index} variant="outline" className="bg-muted/50">
                            {category}
                          </Badge>
                        ))}
                        {template.categories.length > 3 && (
                          <Badge variant="outline" className="bg-muted/50">
                            +{template.categories.length - 3} more
                          </Badge>
                        )}
                      </div>
                      <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                        <span>{template.itemCount} items</span>
                        <span>Used by {template.popularityScore}% of users</span>
                      </div>
                    </CardContent>
                    <CardFooter className="p-4 pt-0 flex justify-between">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleViewTemplate(template)}
                      >
                        View Details
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => handleUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="travel" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter(t => ['Weekend Getaway', 'International Travel'].includes(t.name))
                  .map((template) => (
                    <Card key={template.id} className="overflow-hidden card-hover">
                      <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-2">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 mt-3">
                          {template.categories.slice(0, 3).map((category, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {category}
                            </Badge>
                          ))}
                          {template.categories.length > 3 && (
                            <Badge variant="outline" className="bg-muted/50">
                              +{template.categories.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                          <span>{template.itemCount} items</span>
                          <span>Used by {template.popularityScore}% of users</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTemplate(template)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleUseTemplate(template)}
                        >
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="events" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter(t => ['Hackathon', 'Wedding'].includes(t.name))
                  .map((template) => (
                    <Card key={template.id} className="overflow-hidden card-hover">
                      <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-2">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 mt-3">
                          {template.categories.slice(0, 3).map((category, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {category}
                            </Badge>
                          ))}
                          {template.categories.length > 3 && (
                            <Badge variant="outline" className="bg-muted/50">
                              +{template.categories.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                          <span>{template.itemCount} items</span>
                          <span>Used by {template.popularityScore}% of users</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTemplate(template)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleUseTemplate(template)}
                        >
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="outdoor" className="mt-0">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {templates
                  .filter(t => ['Camping Trip', 'Beach Day'].includes(t.name))
                  .map((template) => (
                    <Card key={template.id} className="overflow-hidden card-hover">
                      <CardHeader className="p-4 flex flex-row items-center space-y-0 gap-2">
                        <span className="text-2xl">{template.icon}</span>
                        <div>
                          <h3 className="font-semibold">{template.name}</h3>
                          <p className="text-sm text-muted-foreground">{template.description}</p>
                        </div>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <div className="flex flex-wrap gap-2 mt-3">
                          {template.categories.slice(0, 3).map((category, index) => (
                            <Badge key={index} variant="outline" className="bg-muted/50">
                              {category}
                            </Badge>
                          ))}
                          {template.categories.length > 3 && (
                            <Badge variant="outline" className="bg-muted/50">
                              +{template.categories.length - 3} more
                            </Badge>
                          )}
                        </div>
                        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
                          <span>{template.itemCount} items</span>
                          <span>Used by {template.popularityScore}% of users</span>
                        </div>
                      </CardContent>
                      <CardFooter className="p-4 pt-0 flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewTemplate(template)}
                        >
                          View Details
                        </Button>
                        <Button 
                          size="sm"
                          onClick={() => handleUseTemplate(template)}
                        >
                          Use Template
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
              </div>
            </TabsContent>
          </Tabs>
          
          {selectedTemplate && (
            <div className="mt-12 pt-12 border-t border-border">
              <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{selectedTemplate.icon}</span>
                  <h2 className="text-2xl font-bold">{selectedTemplate.name} Template</h2>
                </div>
                <Button onClick={() => handleUseTemplate(selectedTemplate)}>
                  Use This Template
                </Button>
              </div>
              
              <p className="text-lg text-muted-foreground mb-6">
                {selectedTemplate.description}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {selectedTemplate.categories.map((category, index) => {
                  const categoryItems = selectedTemplate.items.filter(item => item.category === category);
                  return (
                    <Card key={index} className="overflow-hidden">
                      <CardHeader className="p-4">
                        <h3 className="font-semibold">{category}</h3>
                      </CardHeader>
                      <CardContent className="p-4 pt-0">
                        <ul className="space-y-2">
                          {categoryItems.map((item, itemIndex) => (
                            <li key={itemIndex} className="flex items-center gap-2">
                              <div className="w-2 h-2 rounded-full bg-muted-foreground"></div>
                              <span>{item.name}</span>
                            </li>
                          ))}
                          {categoryItems.length === 0 && (
                            <li className="text-muted-foreground">No items in this category</li>
                          )}
                        </ul>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Templates;
