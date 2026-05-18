import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { useCart } from '../context/CartContext';
import { motion } from 'motion/react';
import { Star, Truck, ShieldCheck, RefreshCw, ArrowLeft, Plus, Minus } from 'lucide-react';

export const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const product = PRODUCTS.find(p => p.id === id);
  const [selectedSize, setSelectedSize] = useState<number | null>(null);
  const [added, setAdded] = useState(false);

  if (!product) return <div className="pt-40 text-center">Product not found</div>;

  const handleAddToCart = () => {
    if (selectedSize) {
      addToCart(product, selectedSize);
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/shop" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest hover:text-brand-red transition-colors mb-12">
          <ArrowLeft size={16} /> BACK TO SHOP
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Image Gallery */}
          <div className="space-y-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="aspect-square bg-neutral-100 overflow-hidden"
            >
              <img 
                src={product.image} 
                alt={product.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </motion.div>
            <div className="grid grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="aspect-square bg-neutral-100 opacity-50 hover:opacity-100 cursor-pointer transition-opacity">
                   <img 
                    src={product.image} 
                    alt={product.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="flex flex-col">
            <div className="mb-8">
              <p className="text-sm font-bold text-neutral-400 uppercase tracking-[0.2em] mb-2">{product.brand}</p>
              <h1 className="font-display text-5xl md:text-6xl tracking-tighter mb-4">{product.name}</h1>
              <div className="flex items-center gap-4 mb-6">
                <p className="font-display text-3xl">${product.price}</p>
                <div className="flex items-center text-yellow-400" aria-label="4 out of 5 stars from 24 reviews">
                  <Star size={16} fill="currentColor" aria-hidden="true" />
                  <Star size={16} fill="currentColor" aria-hidden="true" />
                  <Star size={16} fill="currentColor" aria-hidden="true" />
                  <Star size={16} fill="currentColor" aria-hidden="true" />
                  <Star size={16} fill="currentColor" className="text-neutral-200" aria-hidden="true" />
                  <span className="ml-2 text-xs text-neutral-500 font-bold" aria-hidden="true">(24 REVIEWS)</span>
                </div>
              </div>
              <p className="text-neutral-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Size Selection */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-bold text-xs tracking-widest uppercase">Select Size (US)</h3>
                <button className="text-[10px] font-bold underline hover:text-brand-red">SIZE GUIDE</button>
              </div>
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`py-3 text-sm font-bold border transition-all ${
                      selectedSize === size 
                        ? 'bg-black text-white border-black' 
                        : 'hover:border-black'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Add to Cart */}
            <div className="space-y-4 mb-12">
              <button
                onClick={handleAddToCart}
                disabled={!selectedSize}
                className={`w-full py-5 font-bold tracking-widest transition-all uppercase flex items-center justify-center gap-2 ${
                  !selectedSize 
                    ? 'bg-neutral-200 text-neutral-400 cursor-not-allowed' 
                    : added 
                      ? 'bg-neon-green text-black'
                      : 'bg-black text-white hover:bg-brand-red'
                }`}
              >
                {added ? 'ADDED TO BAG' : selectedSize ? 'ADD TO BAG' : 'SELECT A SIZE'}
              </button>
              <button className="w-full py-5 border-2 border-black font-bold tracking-widest hover:bg-black hover:text-white transition-all uppercase">
                ADD TO WISHLIST
              </button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-2 gap-6 pt-8 border-t border-neutral-100">
              <div className="flex items-start gap-3">
                <Truck size={20} className="text-neutral-400" />
                <div>
                  <p className="text-xs font-bold uppercase">Free Shipping</p>
                  <p className="text-[10px] text-neutral-500">On orders over $150</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <ShieldCheck size={20} className="text-neutral-400" />
                <div>
                  <p className="text-xs font-bold uppercase">100% Authentic</p>
                  <p className="text-[10px] text-neutral-500">Guaranteed original</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <RefreshCw size={20} className="text-neutral-400" />
                <div>
                  <p className="text-xs font-bold uppercase">Easy Returns</p>
                  <p className="text-[10px] text-neutral-500">30-day return policy</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section Placeholder */}
        <section className="mt-32">
          <h2 className="font-display text-4xl tracking-tighter mb-12">CUSTOMER REVIEWS</h2>
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i} className="border-b border-neutral-100 pb-12">
                <div className="flex items-center gap-2 text-yellow-400 mb-4" aria-label="5 out of 5 stars">
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                  <Star size={14} fill="currentColor" aria-hidden="true" />
                </div>
                <h4 className="font-bold text-lg mb-2">Amazing quality and fit!</h4>
                <p className="text-neutral-600 mb-4">The materials are premium and the comfort is unmatched. Definitely worth the price for a limited edition pair.</p>
                <div className="flex items-center gap-4 text-xs font-bold text-neutral-400">
                  <span>MARCUS J.</span>
                  <span>VERIFIED BUYER</span>
                  <span>2 DAYS AGO</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
