import React from 'react';

export const About = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-7xl tracking-tighter mb-12">WE ARE <br /><span className="text-brand-red">SOLE SOURCE.</span></h1>
        
        <div className="aspect-video bg-neutral-100 mb-16 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1200" 
            alt="Boutique"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="space-y-12 text-lg leading-relaxed text-neutral-600">
          <p className="font-bold text-black text-2xl">
            Founded in 2022, Sole Source was born out of a simple frustration: the difficulty of finding 100% authentic, premium sneakers in a market flooded with replicas.
          </p>
          <p>
            We aren't just a store; we're a community of sneakerheads, athletes, and urban explorers. Our mission is to provide a curated selection of the most sought-after footwear from Nike, Adidas, Puma, and Jordan, ensuring that every pair that leaves our warehouse is verified authentic by our team of experts.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-12">
            <div>
              <h3 className="font-display text-3xl text-black mb-4">AUTHENTICITY</h3>
              <p className="text-sm">Every single pair of sneakers we sell goes through a rigorous multi-point inspection process. We guarantee 100% authenticity or your money back.</p>
            </div>
            <div>
              <h3 className="font-display text-3xl text-black mb-4">COMMUNITY</h3>
              <p className="text-sm">We host local events, sponsor urban athletes, and collaborate with designers to keep the sneaker culture alive and thriving.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
