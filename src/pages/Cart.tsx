import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';

export const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-40 pb-24 text-center">
        <div className="max-w-md mx-auto px-4">
          <ShoppingBag size={64} className="mx-auto text-neutral-200 mb-6" />
          <h1 className="font-display text-4xl tracking-tighter mb-4">YOUR BAG IS EMPTY</h1>
          <p className="text-neutral-500 mb-10">Looks like you haven't added any heat to your bag yet.</p>
          <Link to="/shop" className="inline-block bg-black text-white px-10 py-5 font-bold tracking-widest hover:bg-brand-red transition-colors uppercase">
            START SHOPPING
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-6xl tracking-tighter mb-12">YOUR BAG ({totalItems})</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            {cart.map((item) => (
              <div key={`${item.id}-${item.selectedSize}`} className="flex gap-6 pb-8 border-b border-neutral-100">
                <div className="w-32 h-32 bg-neutral-100 flex-shrink-0">
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-[10px] font-bold text-neutral-400 uppercase tracking-widest">{item.brand}</p>
                      <h3 className="font-bold text-lg">{item.name}</h3>
                      <p className="text-sm text-neutral-500 mt-1">Size: US {item.selectedSize}</p>
                    </div>
                    <p className="font-display text-xl">${item.price}</p>
                  </div>
                  
                  <div className="flex justify-between items-center mt-4">
                    <div className="flex items-center border border-neutral-200">
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, -1)}
                        className="p-2 hover:bg-neutral-100 transition-colors"
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="px-4 font-bold text-sm" aria-label={`Quantity: ${item.quantity}`}>{item.quantity}</span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.selectedSize, 1)}
                        className="p-2 hover:bg-neutral-100 transition-colors"
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button 
                      onClick={() => removeFromCart(item.id, item.selectedSize)}
                      className="text-neutral-400 hover:text-brand-red transition-colors"
                      aria-label={`Remove ${item.name} (Size ${item.selectedSize}) from bag`}
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-neutral-50 p-8 sticky top-32">
              <h2 className="font-bold text-sm tracking-widest uppercase mb-8">Order Summary</h2>
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Subtotal</span>
                  <span className="font-bold">${totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Shipping</span>
                  <span className="font-bold">FREE</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-neutral-500">Estimated Tax</span>
                  <span className="font-bold">$0.00</span>
                </div>
                <div className="pt-4 border-t border-neutral-200 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-display text-2xl">${totalPrice}</span>
                </div>
              </div>
              <Link 
                to="/checkout" 
                className="w-full bg-black text-white py-5 font-bold tracking-widest hover:bg-brand-red transition-colors uppercase flex items-center justify-center gap-2"
              >
                CHECKOUT <ArrowRight size={18} />
              </Link>
              <div className="mt-6 flex items-center justify-center gap-4">
                <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-4 opacity-50" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-6 opacity-50" />
                <img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" className="h-4 opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
