
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Templates = () => {
  const templateCategories = [
    {
      name: 'Travel',
      icon: '✈️',
      templates: [
        { name: 'Weekend Getaway', items: 28 },
        { name: 'International Travel', items: 45 },
        { name: 'Beach Vacation', items: 32 },
      ]
    },
    {
      name: 'Events',
      icon: '🎉',
      templates: [
        { name: 'Hackathon', items: 24 },
        { name: 'Wedding', items: 38 },
        { name: 'Music Festival', items: 27 },
      ]
    },
    {
      name: 'Outdoor',
      icon: '🏕️',
      templates: [
        { name: 'Camping Trip', items: 35 },
        { name: 'Hiking Adventure', items: 22 },
        { name: 'Beach Day', items: 18 },
      ]
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Ready-Made Templates
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Jump-start your packing with our curated templates for any occasion.
          </p>
        </div>
        
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          {templateCategories.map((category, categoryIndex) => (
            <div key={categoryIndex} className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{category.icon}</span>
                <h3 className="text-xl font-semibold">{category.name}</h3>
              </div>
              
              <div className="space-y-3">
                {category.templates.map((template, templateIndex) => (
                  <Link 
                    to="/templates" 
                    key={templateIndex} 
                    className="flex items-center justify-between p-4 rounded-lg border bg-card hover:border-primary/50 hover:bg-accent/50 transition-colors"
                  >
                    <span className="font-medium">{template.name}</span>
                    <span className="text-sm text-muted-foreground">{template.items} items</span>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <Link to="/templates">
              View All Templates
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
