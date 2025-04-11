
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export const CTA = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="relative overflow-hidden rounded-3xl border bg-background">
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-packpal-purple to-packpal-dark-purple"></div>
          <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-packpal-purple rounded-full opacity-10 blur-3xl"></div>
          <div className="absolute -top-24 -left-24 w-64 h-64 bg-packpal-purple rounded-full opacity-10 blur-3xl"></div>
          
          <div className="relative z-10 px-6 py-16 md:px-12 md:py-20 text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to pack smarter together?
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Join thousands of teams who use PackPal to make their group packing organized, efficient, and stress-free.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="font-medium">
                <Link to="/dashboard">
                  Get Started Free
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link to="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
