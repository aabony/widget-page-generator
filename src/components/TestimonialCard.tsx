import React from 'react';

interface TestimonialCardProps {
  username: string;
  userImage: string;
  earningsImage: string;
  message: string;
}

export function TestimonialCard({ username, userImage, earningsImage, message }: TestimonialCardProps) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex items-center space-x-2 mb-3">
        <img
          src={userImage}
          alt={username}
          className="w-8 h-8 rounded-full"
        />
        <span className="font-medium">{username}</span>
      </div>
      <img
        src={earningsImage}
        alt="Earnings"
        className="w-full rounded-xl mb-3"
      />
      <p className="text-gray-700">{message}</p>
    </div>
  );
}