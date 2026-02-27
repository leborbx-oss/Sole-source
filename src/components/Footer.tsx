import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-black text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="space-y-6">
            <h3 className="font-display text-3xl tracking-tighter">FPS FIGHTER</h3>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs">
              The world's first high-precision fighting game engine running at 10,000 logic updates per second.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-neon-green transition-colors"><Instagram size={20} /></a>
              <a href="#" className="hover:text-neon-green transition-colors"><Twitter size={20} /></a>
              <a href="#" className="hover:text-neon-green transition-colors"><Facebook size={20} /></a>
              <a href="#" className="hover:text-neon-green transition-colors"><Youtube size={20} /></a>
            </div>
          </div>

          {/* Game */}
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-6">Game</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/" className="hover:text-white transition-colors">Play Now</Link></li>
              <li><Link to="/about" className="hover:text-white transition-colors">Engine Specs</Link></li>
              <li><Link to="/faq" className="hover:text-white transition-colors">Controls FAQ</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-6">Support</h4>
            <ul className="space-y-4 text-sm text-white/60">
              <li><Link to="/faq" className="hover:text-white transition-colors">FAQ</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Contact Us</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Authenticity Guarantee</a></li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-sm tracking-widest uppercase mb-6">Newsletter</h4>
            <p className="text-white/60 text-sm mb-4">Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.</p>
            <form className="flex flex-col space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-white/10 border border-white/20 px-4 py-3 text-sm focus:outline-none focus:border-neon-green transition-colors"
              />
              <button className="bg-white text-black font-bold py-3 text-sm hover:bg-neon-green transition-colors uppercase tracking-widest">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-white/10 pt-10 flex flex-col md:flex-row justify-between items-center text-xs text-white/40 space-y-4 md:space-y-0">
          <p>© 2026 FPS FIGHTER. ALL RIGHTS RESERVED.</p>
          <div className="flex space-x-8">
            <a href="#" className="hover:text-white">Privacy Policy</a>
            <a href="#" className="hover:text-white">Terms of Service</a>
            <a href="#" className="hover:text-white">Cookies Settings</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
