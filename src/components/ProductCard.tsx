import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Product } from '../data';
import { ShoppingCart, ArrowRight } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="group relative"
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-neutral-100">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            referrerPolicy="no-referrer"
          />
          
          {/* Badges */}
          <div className="absolute top-4 left-4 flex flex-col gap-2">
            {product.isNew && (
              <span className="bg-neon-green text-black text-[10px] font-black px-2 py-1 uppercase tracking-tighter">
                New Arrival
              </span>
            )}
            {product.isLimited && (
              <span className="bg-brand-red text-white text-[10px] font-black px-2 py-1 uppercase tracking-tighter">
                Limited Edition
              </span>
            )}
          </div>

          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="bg-white text-black px-6 py-3 font-bold text-sm flex items-center gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform">
              VIEW DETAILS <ArrowRight size={16} />
            </div>
          </div>
        </div>

        <div className="mt-4 space-y-1">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{product.brand}</p>
              <h3 className="text-sm font-bold group-hover:text-brand-red transition-colors">{product.name}</h3>
            </div>
            <p className="font-display text-lg">${product.price}</p>
          </div>
          <p className="text-xs text-neutral-500">{product.category}</p>
        </div>
      </Link>
    </motion.div>
  );
};
