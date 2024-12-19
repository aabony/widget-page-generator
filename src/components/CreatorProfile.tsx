import React from 'react';

interface CreatorProfileProps {
  name: string;
  title: string;
  image: string;
  mobilePreview: string;
}

export function CreatorProfile({ name, title, image, mobilePreview }: CreatorProfileProps) {
  return (
    <div className="relative flex items-end">
      <div className="bg-gradient-to-t from-black/60 to-transparent absolute inset-0 rounded-2xl" />
      <img
        src={image}
        alt={name}
        className="w-full h-[400px] object-cover rounded-2xl"
      />
      <div className="absolute p-8 text-white">
        <h3 className="text-2xl font-bold mb-2">{name}</h3>
        <span className="bg-white/20 px-4 py-1 rounded-full text-sm backdrop-blur-sm">
          {title}
        </span>
      </div>
      <div className="absolute -right-8 top-1/2 -translate-y-1/2 w-48 rotate-6">
        <img
          src={mobilePreview}
          alt="Mobile preview"
          className="w-full rounded-2xl shadow-xl"
        />
      </div>
    </div>
  );
}