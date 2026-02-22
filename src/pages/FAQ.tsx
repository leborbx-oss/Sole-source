import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const FAQS = [
  {
    question: "ARE ALL YOUR SNEAKERS AUTHENTIC?",
    answer: "Yes, 100%. Every pair of sneakers sold on Sole Source is guaranteed authentic. We have a team of expert authenticators who inspect every pair before they are listed and again before they ship to you."
  },
  {
    question: "HOW LONG DOES SHIPPING TAKE?",
    answer: "Standard shipping typically takes 3-5 business days within the US. International shipping can take 7-14 business days depending on the destination and customs processing."
  },
  {
    question: "WHAT IS YOUR RETURN POLICY?",
    answer: "We offer a 30-day return policy for all unworn sneakers in their original packaging with all tags attached. Please note that limited edition 'Final Sale' items may not be eligible for return."
  },
  {
    question: "DO YOU SHIP INTERNATIONALLY?",
    answer: "Yes, we ship to over 50 countries worldwide. Shipping costs and delivery times vary by location."
  },
  {
    question: "HOW DO I KNOW MY SIZE?",
    answer: "We provide a comprehensive size guide on every product page. Most Nike and Jordan sneakers run true to size, while some Adidas models may vary. We recommend checking the specific product description for fit advice."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="pt-32 pb-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-display text-7xl tracking-tighter mb-12 text-center">F.A.Q.</h1>
        
        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <div key={index} className="border border-neutral-200">
              <button 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-neutral-50 transition-colors"
              >
                <span className="font-bold tracking-widest text-sm">{faq.question}</span>
                {openIndex === index ? <Minus size={18} /> : <Plus size={18} />}
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    <div className="p-6 pt-0 text-neutral-500 text-sm leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        <div className="mt-20 p-12 bg-black text-white text-center">
          <h3 className="font-display text-3xl mb-4">STILL HAVE QUESTIONS?</h3>
          <p className="text-white/60 mb-8">Our support team is ready to help you find your perfect pair.</p>
          <a href="/contact" className="inline-block bg-neon-green text-black px-10 py-4 font-bold tracking-widest hover:bg-white transition-colors uppercase">
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};
