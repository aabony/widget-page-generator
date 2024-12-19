import React from 'react';
import { Rocket } from 'lucide-react';
import { CreatorProfile } from './CreatorProfile';

export function CreatorsSection() {
  return (
    <section className="container mx-auto px-6 py-20">
      <div className="text-center mb-16">
        <h2 className="text-[#1E1B4B] text-4xl font-bold mb-4 flex items-center justify-center">
          The Best Creators Use Stan <Rocket className="ml-2" />
        </h2>
        <p className="text-gray-600">
          See how our creators use Stan to superpower their businesses!
        </p>
      </div>

      <div className="grid grid-cols-2 gap-8">
        <CreatorProfile
          name="Abigail Peugh"
          title="Business Coach"
          image="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          mobilePreview="https://images.unsplash.com/photo-1605236453806-6ff36851218e?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        />
        <CreatorProfile
          name="Millie Adrian"
          title="Social Media Coach"
          image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
          mobilePreview="https://images.unsplash.com/photo-1611162617474-5b21e879e113?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
        />
      </div>
    </section>
  );
}