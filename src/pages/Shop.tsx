import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { PRODUCTS } from '../data';
import { ProductCard } from '../components/ProductCard';
import { Filter, X, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const BRANDS = ['Nike', 'Adidas', 'Puma', 'Jordan'];
const CATEGORIES = ['Lifestyle', 'Running', 'Basketball'];
const GENDERS = ['Men', 'Women', 'Unisex'];

export const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);

  const activeBrand = searchParams.get('brand');
  const activeCategory = searchParams.get('category');
  const activeGender = searchParams.get('gender');
  const isNew = searchParams.get('new') === 'true';
  const isLimited = searchParams.get('limited') === 'true';

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => {
      if (activeBrand && p.brand !== activeBrand) return false;
      if (activeCategory && p.category !== activeCategory) return false;
      if (activeGender && p.gender !== activeGender) return false;
      if (isNew && !p.isNew) return false;
      if (isLimited && !p.isLimited) return false;
      return true;
    });
  }, [activeBrand, activeCategory, activeGender, isNew, isLimited]);

  const toggleFilter = (key: string, value: string) => {
    const newParams = new URLSearchParams(searchParams);
    if (newParams.get(key) === value) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  const clearFilters = () => {
    setSearchParams(new URLSearchParams());
  };

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <h1 className="font-display text-6xl tracking-tighter">THE COLLECTION</h1>
            <p className="text-neutral-500 mt-2">Showing {filteredProducts.length} results</p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 bg-black text-white px-6 py-3 font-bold text-sm tracking-widest hover:bg-brand-red transition-colors"
            >
              {showFilters ? <X size={18} /> : <Filter size={18} />}
              {showFilters ? 'CLOSE FILTERS' : 'FILTERS'}
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {showFilters && (
              <motion.aside 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="lg:w-64 space-y-10"
              >
                {/* Brands */}
                <div>
                  <h3 className="font-bold text-xs tracking-widest uppercase mb-4">Brand</h3>
                  <div className="flex flex-wrap lg:flex-col gap-2">
                    {BRANDS.map(brand => (
                      <button
                        key={brand}
                        onClick={() => toggleFilter('brand', brand)}
                        className={`text-left px-4 py-2 text-sm font-medium border transition-colors ${
                          activeBrand === brand ? 'bg-black text-white border-black' : 'hover:border-black'
                        }`}
                      >
                        {brand}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <h3 className="font-bold text-xs tracking-widest uppercase mb-4">Category</h3>
                  <div className="flex flex-wrap lg:flex-col gap-2">
                    {CATEGORIES.map(cat => (
                      <button
                        key={cat}
                        onClick={() => toggleFilter('category', cat)}
                        className={`text-left px-4 py-2 text-sm font-medium border transition-colors ${
                          activeCategory === cat ? 'bg-black text-white border-black' : 'hover:border-black'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Gender */}
                <div>
                  <h3 className="font-bold text-xs tracking-widest uppercase mb-4">Gender</h3>
                  <div className="flex flex-wrap lg:flex-col gap-2">
                    {GENDERS.map(gender => (
                      <button
                        key={gender}
                        onClick={() => toggleFilter('gender', gender)}
                        className={`text-left px-4 py-2 text-sm font-medium border transition-colors ${
                          activeGender === gender ? 'bg-black text-white border-black' : 'hover:border-black'
                        }`}
                      >
                        {gender}
                      </button>
                    ))}
                  </div>
                </div>

                <button 
                  onClick={clearFilters}
                  className="w-full py-3 text-xs font-bold tracking-widest underline hover:text-brand-red transition-colors"
                >
                  CLEAR ALL FILTERS
                </button>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Product Grid */}
          <main className="flex-1">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-24 text-center">
                <p className="text-xl font-bold">No sneakers found matching your criteria.</p>
                <button 
                  onClick={clearFilters}
                  className="mt-4 text-brand-red font-bold hover:underline"
                >
                  Clear all filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};
