
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Hero = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 md:pr-12">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-packpal-purple to-packpal-dark-purple bg-clip-text text-transparent animate-fade-in">
              Pack Together. Stress Never.
            </h1>
            <p className="mt-6 text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: "0.2s" }}>
              A collaborative packing platform that makes group preparation effortless, organized, and fun.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Button asChild size="lg" className="font-medium">
                <Link to="/dashboard">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/templates">
                  Browse Templates
                </Link>
              </Button>
            </div>
          </div>
          <div className="md:w-1/2 mt-12 md:mt-0 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-packpal-purple to-packpal-dark-purple rounded-3xl blur opacity-30"></div>
              <div className="relative overflow-hidden rounded-3xl border bg-card p-4 md:p-8">
                <div className="grid gap-4 md:gap-6">
                  <div className="flex items-center justify-between">
                    <div className="text-lg font-bold">Camping Trip Checklist</div>
                    <div className="flex gap-2">
                      <span className="bg-packpal-soft-gray text-xs font-semibold py-1 px-2 rounded-full">5 Members</span>
                      <span className="bg-packpal-soft-yellow text-xs font-semibold py-1 px-2 rounded-full">7 Items Left</span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { name: 'Tent (3-person)', category: 'Equipment', status: 'packed', assignee: 'Alex' },
                      { name: 'Portable stove', category: 'Cooking', status: 'to-pack', assignee: 'Jordan' },
                      { name: 'Sleeping bag', category: 'Equipment', status: 'packed', assignee: 'Casey' },
                      { name: 'First aid kit', category: 'Safety', status: 'delivered', assignee: 'Taylor' },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg border animate-slide-in" style={{ animationDelay: `${0.1 * i}s`, backgroundColor: 'rgba(255, 255, 255, 0.5)' }}>
                        <div>
                          <div className="font-medium">{item.name}</div>
                          <div className="text-xs text-muted-foreground">{item.category} • {item.assignee}</div>
                        </div>
                        <span className={`text-xs font-semibold py-1 px-2 rounded-full ${
                          item.status === 'to-pack' ? 'status-to-pack' : 
                          item.status === 'packed' ? 'status-packed' : 'status-delivered'
                        }`}>
                          {item.status === 'to-pack' ? 'To Pack' : 
                           item.status === 'packed' ? 'Packed' : 'Delivered'}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
