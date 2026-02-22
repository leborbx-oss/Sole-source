import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { ShieldCheck, ArrowLeft, CheckCircle2 } from 'lucide-react';

export const Checkout = () => {
  const { totalPrice, clearCart } = useCart();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSuccess(true);
    clearCart();
  };

  if (isSuccess) {
    return (
      <div className="pt-40 pb-24 text-center">
        <div className="max-w-md mx-auto px-4">
          <CheckCircle2 size={64} className="mx-auto text-neon-green mb-6" />
          <h1 className="font-display text-4xl tracking-tighter mb-4">ORDER CONFIRMED</h1>
          <p className="text-neutral-500 mb-10">Thank you for your purchase! Your order #SS-8291 is being processed and will ship within 24 hours.</p>
          <Link to="/" className="inline-block bg-black text-white px-10 py-5 font-bold tracking-widest hover:bg-brand-red transition-colors uppercase">
            BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link to="/cart" className="inline-flex items-center gap-2 text-sm font-bold tracking-widest hover:text-brand-red transition-colors mb-12">
          <ArrowLeft size={16} /> BACK TO BAG
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Checkout Form */}
          <div>
            <h1 className="font-display text-5xl tracking-tighter mb-12">SECURE CHECKOUT</h1>
            
            <form onSubmit={handleSubmit} className="space-y-8">
              <section>
                <h3 className="font-bold text-xs tracking-widest uppercase mb-6">Contact Information</h3>
                <div className="space-y-4">
                  <input 
                    required
                    type="email" 
                    placeholder="Email Address" 
                    className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </section>

              <section>
                <h3 className="font-bold text-xs tracking-widest uppercase mb-6">Shipping Address</h3>
                <div className="grid grid-cols-2 gap-4">
                  <input 
                    required
                    type="text" 
                    placeholder="First Name" 
                    className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="Last Name" 
                    className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="Address" 
                    className="col-span-2 w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="City" 
                    className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                  <input 
                    required
                    type="text" 
                    placeholder="Postal Code" 
                    className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </section>

              <section>
                <h3 className="font-bold text-xs tracking-widest uppercase mb-6">Payment Method</h3>
                <div className="space-y-4">
                  <div className="border border-black p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full border-4 border-black" />
                      <span className="font-bold text-sm">Credit Card</span>
                    </div>
                    <div className="flex gap-2">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" className="h-3" />
                      <img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" className="h-5" />
                    </div>
                  </div>
                  <input 
                    required
                    type="text" 
                    placeholder="Card Number" 
                    className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input 
                      required
                      type="text" 
                      placeholder="MM / YY" 
                      className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                    />
                    <input 
                      required
                      type="text" 
                      placeholder="CVV" 
                      className="w-full bg-neutral-50 border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                    />
                  </div>
                </div>
              </section>

              <button 
                type="submit"
                className="w-full bg-black text-white py-6 font-bold tracking-widest hover:bg-brand-red transition-colors uppercase flex items-center justify-center gap-2"
              >
                PAY ${totalPrice}
              </button>
              
              <div className="flex items-center justify-center gap-2 text-neutral-400 text-xs">
                <ShieldCheck size={14} />
                <span>Your payment is encrypted and secure.</span>
              </div>
            </form>
          </div>

          {/* Order Summary Sidebar */}
          <div className="hidden lg:block">
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
                <div className="pt-4 border-t border-neutral-200 flex justify-between">
                  <span className="font-bold">Total</span>
                  <span className="font-display text-2xl">${totalPrice}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
