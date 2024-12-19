import React from 'react';
import { 
  Users, 
  Smartphone, 
  MessageSquare, 
  Gift, 
  Briefcase, 
  Rocket, 
  CreditCard, 
  TrendingUp,
  Mail
} from 'lucide-react';

const features = [
  {
    text: "Exclusive access to High-Value Affiliate Programs",
    icon: Users
  },
  {
    text: "Customizeable mobile-ready Offers Page for your Link in Bio",
    icon: Smartphone
  },
  {
    text: "1:1 Curation of new affiliate offers",
    icon: MessageSquare
  },
  {
    text: "1:1 Strategy sessions with Adbloom team",
    icon: Briefcase
  },
  {
    text: "Unique Bday Freebies Page for your Link in Bio",
    icon: Gift
  },
  {
    text: "Expert-Network: Get Paid for your domain expertise $300+ per hour",
    icon: Rocket
  },
  {
    text: "Wicked Fast payments direct to your bank account",
    icon: CreditCard
  },
  {
    text: "Boosted Bonus program",
    icon: TrendingUp
  },
  {
    text: "RateKard: Paid Story post offers direct to your inbox",
    icon: Mail
  }
];

export function PricingSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-[#1E1B4B] text-4xl font-bold mb-4">
            Simpler Solution, Better Results
          </h2>
          <p className="text-gray-600 text-lg">
            Everything you need to start, grow, and scale your creator business
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-lg overflow-hidden">
          <div className="p-8 md:p-12">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h3 className="text-2xl font-bold text-[#1E1B4B] mb-2">
                  Free Plan
                </h3>
                <p className="text-gray-600">
                  Everything you need to succeed
                </p>
              </div>
              <div className="text-right">
                <div className="text-4xl font-bold text-[#1E1B4B]">
                  $0<span className="text-lg font-normal text-gray-600">/mo</span>
                </div>
                <p className="text-sm text-gray-600">Forever free</p>
              </div>
            </div>

            <div className="space-y-6">
              {features.map((feature) => (
                <div key={feature.text} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0 w-5 h-5 bg-[#6C5CE7]/10 rounded-full flex items-center justify-center">
                      <div className="w-3 h-3 bg-[#6C5CE7] rounded-full"></div>
                    </div>
                    <span className="text-gray-700">{feature.text}</span>
                  </div>
                  <feature.icon className="w-5 h-5 text-[#6C5CE7] flex-shrink-0" />
                </div>
              ))}
            </div>

            <div className="mt-10">
              <button className="w-full bg-[#6C5CE7] text-white px-8 py-4 rounded-full font-medium hover:bg-[#6C5CE7]/90 transition-colors">
                Get Started Now
              </button>
              <p className="text-center text-sm text-gray-600 mt-4">
                No credit card required • Start instantly
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}