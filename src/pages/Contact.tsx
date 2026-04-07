import React from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

export const Contact = () => {
  return (
    <div className="pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="font-display text-7xl tracking-tighter mb-8">GET IN <br /><span className="text-neon-green">TOUCH.</span></h1>
            <p className="text-neutral-500 text-lg mb-12 max-w-md">
              Have a question about a drop? Need help with sizing? Our team is here to help you 24/7.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Email Us</h4>
                  <p className="text-neutral-500">support@solesource.com</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Call Us</h4>
                  <p className="text-neutral-500">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="bg-black text-white p-3">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-widest">Visit Us</h4>
                  <p className="text-neutral-500">123 Sneaker Alley, New York, NY 10001</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-neutral-50 p-8 md:p-12">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="full-name" className="text-xs font-bold uppercase tracking-widest">Full Name</label>
                  <input 
                    id="full-name"
                    type="text" 
                    className="w-full bg-white border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-widest">Email Address</label>
                  <input 
                    id="email"
                    type="email" 
                    className="w-full bg-white border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="subject" className="text-xs font-bold uppercase tracking-widest">Subject</label>
                <input 
                  id="subject"
                  type="text" 
                  className="w-full bg-white border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-bold uppercase tracking-widest">Message</label>
                <textarea 
                  id="message"
                  rows={6}
                  className="w-full bg-white border border-neutral-200 px-4 py-4 focus:outline-none focus:border-black transition-colors resize-none"
                ></textarea>
              </div>
              <button className="w-full bg-black text-white py-5 font-bold tracking-widest hover:bg-brand-red transition-colors uppercase flex items-center justify-center gap-2">
                SEND MESSAGE <Send size={18} />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
