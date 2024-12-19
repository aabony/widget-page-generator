import React from 'react';
import { CircleDollarSign, GraduationCap } from 'lucide-react';

export function CreatorCard() {
  return (
    <div className="relative">
      <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 shadow-lg w-[300px] rotate-3 relative z-20">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
          <div>
            <h3 className="font-semibold">Alexandra Silva</h3>
            <div className="flex space-x-2">
              {['Twitter', 'Instagram', 'LinkedIn'].map((platform) => (
                <div key={platform} className="w-4 h-4 bg-gray-200 rounded-full"></div>
              ))}
            </div>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-[#6C5CE7]/10 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <CircleDollarSign className="text-[#6C5CE7]" />
              <span>Creator Course</span>
            </div>
            <span className="font-semibold">$47</span>
          </div>
          <div className="bg-[#6C5CE7]/10 p-3 rounded-xl flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="text-[#6C5CE7]" />
              <span>Courses</span>
            </div>
            <span className="font-semibold">$22</span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-20 -right-20 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg rotate-12">
        <CircleDollarSign size={32} className="text-[#6C5CE7]" />
      </div>
      <div className="absolute bottom-0 -left-16 bg-white/90 backdrop-blur-sm rounded-full p-4 shadow-lg -rotate-12">
        <GraduationCap size={32} className="text-[#6C5CE7]" />
      </div>
    </div>
  );
}