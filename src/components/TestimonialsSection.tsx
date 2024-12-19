import React from 'react';
import { TestimonialCard } from './TestimonialCard';

const testimonials = [
  {
    username: "@jennyheart",
    userImage: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    earningsImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    message: "Wow, $1k a week 🌟"
  },
  {
    username: "@sarahsmith",
    userImage: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    earningsImage: "https://images.unsplash.com/photo-1611162616305-c69b3037c7bb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    message: "Just hit $32k in a week 🎉"
  },
  {
    username: "@lisamarie",
    userImage: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-1.2.1&auto=format&fit=crop&w=100&q=80",
    earningsImage: "https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
    message: "$8,086.38! 🚀"
  }
];

export function TestimonialsSection() {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#1E1B4B] text-4xl font-bold mb-4">
            See What People Are Saying
          </h2>
          <p className="text-gray-600">
            Stan is the easiest way to start selling online.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="space-y-6">
            <TestimonialCard {...testimonials[0]} />
          </div>
          <div className="space-y-6 mt-12">
            <TestimonialCard {...testimonials[1]} />
          </div>
          <div className="space-y-6">
            <TestimonialCard {...testimonials[2]} />
          </div>
        </div>
      </div>
    </section>
  );
}