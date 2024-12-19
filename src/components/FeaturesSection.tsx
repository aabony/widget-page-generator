import React from 'react';
import { Sparkles, ShoppingBag, Calendar, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Sparkles,
    title: "Digital Products",
    description: "Sell courses, ebooks, and digital downloads with ease"
  },
  {
    icon: ShoppingBag,
    title: "Online Store",
    description: "Create your own branded storefront in minutes"
  },
  {
    icon: Calendar,
    title: "Booking System",
    description: "Schedule meetings and consultations automatically"
  },
  {
    icon: CreditCard,
    title: "Payment Processing",
    description: "Accept payments worldwide with secure transactions"
  }
];

export function FeaturesSection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-[#1E1B4B] text-4xl font-bold mb-4">
            Everything You Need to Succeed
          </h2>
          <p className="text-gray-600">
            Powerful tools to help you grow your online business
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.title} className="text-center">
              <div className="w-16 h-16 bg-[#6C5CE7]/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-8 h-8 text-[#6C5CE7]" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}