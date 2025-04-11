
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

export const Usage = () => {
  const steps = [
    {
      number: '01',
      title: 'Create a Packing List',
      description: 'Start a new list for your event or trip with a custom name, date, and description.',
    },
    {
      number: '02',
      title: 'Invite Your Team',
      description: 'Add members with specific roles and permissions to collaborate on packing.',
    },
    {
      number: '03',
      title: 'Add Items & Categories',
      description: 'Create categories and add items with assignees, quantities, and notes.',
    },
    {
      number: '04',
      title: 'Track Progress in Real-Time',
      description: 'Update item status from "To Pack" to "Packed" to "Delivered" as you go.',
    },
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            How PackPal Works
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Get started in minutes and keep your team organized through the entire packing process.
          </p>
        </div>
        
        <div className="mt-16 grid gap-12 md:gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              {/* Connection lines between steps */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gradient-to-r from-packpal-purple to-transparent z-0" style={{ width: '80%' }}></div>
              )}
              
              {/* Step Content */}
              <div className="bg-card border rounded-xl p-6 shadow-sm relative z-10">
                <div className="text-4xl font-bold text-packpal-purple">{step.number}</div>
                <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>
                <p className="mt-2 text-muted-foreground">{step.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Button asChild size="lg">
            <Link to="/dashboard">
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};
