
import { CheckCircle, Users, Layers, Bell, FileText, BookTemplate } from 'lucide-react';

export const Features = () => {
  const features = [
    {
      icon: <CheckCircle className="h-8 w-8 text-packpal-purple" />,
      title: 'Real-time Updates',
      description: 'See item status changes instantly across all team members.',
    },
    {
      icon: <Users className="h-8 w-8 text-packpal-purple" />,
      title: 'Role-based Access',
      description: 'Assign Owner, Admin, Member, or Viewer roles to your team.',
    },
    {
      icon: <Layers className="h-8 w-8 text-packpal-purple" />,
      title: 'Categorized Lists',
      description: 'Organize items by categories like Tech, Hygiene, and more.',
    },
    {
      icon: <Bell className="h-8 w-8 text-packpal-purple" />,
      title: 'Conflict Alerts',
      description: 'Get notified instantly about duplicate item conflicts.',
    },
    {
      icon: <FileText className="h-8 w-8 text-packpal-purple" />,
      title: 'Export Ready',
      description: 'Generate PDF checklists for offline access and peace of mind.',
    },
    {
      icon: <BookTemplate className="h-8 w-8 text-packpal-purple" />,
      title: 'Prebuilt Templates',
      description: 'Start quickly with templates for hackathons, vacations, and more.',
    }
  ];

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            Why PackPal Stands Out
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Our powerful features make group packing effortless and organized.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-xl p-6 shadow-sm card-hover"
            >
              <div className="bg-accent/50 p-3 rounded-lg w-fit">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {feature.title}
              </h3>
              <p className="mt-2 text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
