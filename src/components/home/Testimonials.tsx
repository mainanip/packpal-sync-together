
export const Testimonials = () => {
  const testimonials = [
    {
      quote: "PackPal made organizing our annual family camping trip so much easier. Everyone knew exactly what they needed to bring!",
      author: "Jordan Smith",
      role: "Family Trip Organizer"
    },
    {
      quote: "As a hackathon organizer, I've been using PackPal to coordinate team equipment. It's a game-changer for making sure nothing gets forgotten.",
      author: "Alex Chen",
      role: "Tech Event Planner"
    },
    {
      quote: "The real-time updates and clear organization helped our wedding planning immensely. Our destination wedding was stress-free thanks to PackPal!",
      author: "Taylor Rodriguez",
      role: "Wedding Coordinator"
    }
  ];

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold">
            What Our Users Say
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Join thousands of happy teams who pack smarter with PackPal.
          </p>
        </div>
        
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index} 
              className="bg-card border rounded-xl p-6 shadow-sm flex flex-col"
            >
              <div className="flex-1">
                <svg className="h-8 w-8 text-packpal-purple opacity-50 mb-4" fill="currentColor" viewBox="0 0 32 32">
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="text-lg">
                  "{testimonial.quote}"
                </p>
              </div>
              <div className="mt-6 pt-6 border-t">
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-sm text-muted-foreground">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
