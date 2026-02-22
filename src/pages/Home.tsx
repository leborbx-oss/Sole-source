import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';

const BRANDS = [
  { name: 'Nike', logo: 'NIKE', color: 'bg-black text-white' },
  { name: 'Adidas', logo: 'ADIDAS', color: 'bg-neutral-200 text-black' },
  { name: 'Puma', logo: 'PUMA', color: 'bg-black text-white' },
  { name: 'Jordan', logo: 'JORDAN', color: 'bg-brand-red text-white' },
];

export const Home = () => {
  const featuredProducts = PRODUCTS.slice(0, 4);
  const newArrivals = PRODUCTS.filter(p => p.isNew).slice(0, 4);

  return (
    <div className="pt-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1556906781-9a412961c28c?auto=format&fit=crop&q=80&w=1920" 
            alt="Hero Sneaker"
            className="w-full h-full object-cover opacity-60"
            referrerPolicy="no-referrer"
          />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <h1 className="font-display text-7xl md:text-9xl text-white leading-none tracking-tighter mb-6">
              STEP INTO <br />
              <span className="text-neon-green">THE FUTURE</span>
            </h1>
            <p className="text-white/80 text-lg md:text-xl mb-10 max-w-lg">
              Curating the world's most exclusive authentic sneakers. From the streets to the court, we've got you covered.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/shop" 
                className="bg-white text-black px-10 py-5 font-bold tracking-widest hover:bg-neon-green transition-colors uppercase"
              >
                Shop Collection
              </Link>
              <Link 
                to="/shop?limited=true" 
                className="border-2 border-white text-white px-10 py-5 font-bold tracking-widest hover:bg-white hover:text-black transition-colors uppercase"
              >
                Limited Drops
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Floating Text */}
        <div className="absolute bottom-10 right-0 overflow-hidden whitespace-nowrap pointer-events-none opacity-10">
          <motion.div 
            animate={{ x: [0, -1000] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="font-display text-[20vh] text-white leading-none"
          >
            AUTHENTIC SNEAKERS • PREMIUM QUALITY • WORLDWIDE SHIPPING • SOLE SOURCE • 
          </motion.div>
        </div>
      </section>

      {/* Shop by Brand */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-5xl tracking-tighter">SHOP BY BRAND</h2>
              <p className="text-neutral-500 mt-2">The heavy hitters in the game.</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {BRANDS.map((brand) => (
              <Link 
                key={brand.name}
                to={`/shop?brand=${brand.name}`}
                className={`group relative h-48 flex items-center justify-center overflow-hidden ${brand.color}`}
              >
                <span className="font-display text-4xl tracking-widest z-10 transition-transform group-hover:scale-110">
                  {brand.logo}
                </span>
                <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Sneakers */}
      <section className="py-24 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-5xl tracking-tighter">FEATURED HEAT</h2>
              <p className="text-neutral-500 mt-2">Hand-picked for the true enthusiasts.</p>
            </div>
            <Link to="/shop" className="flex items-center gap-2 font-bold text-sm tracking-widest hover:text-brand-red transition-colors">
              VIEW ALL <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="relative py-32 bg-black overflow-hidden">
        <div className="absolute inset-0 opacity-40">
          <img 
            src="https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=1920" 
            alt="New Arrivals"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="font-display text-6xl md:text-8xl text-white mb-6">NEW ARRIVALS</h2>
            <p className="text-white/80 text-xl mb-10 max-w-2xl mx-auto">
              Fresh drops every week. Stay ahead of the curve with our latest selection.
            </p>
            <Link 
              to="/shop?new=true" 
              className="inline-block bg-neon-green text-black px-12 py-5 font-bold tracking-widest hover:bg-white transition-colors uppercase"
            >
              Explore New Drops
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Latest Drops Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="font-display text-5xl tracking-tighter">LATEST DROPS</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {newArrivals.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
