import React from 'react';
import { TEXTBOOK_DATA } from '../data/textbook/content';
import { TermContainer } from '../components/textbook/TermContainer';
import { Printer, BookOpen, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

export const Textbook = () => {
  const handlePrint = () => window.print();

  return (
    <div className="pt-24 min-h-screen bg-white">
      {/* Header */}
      <div className="bg-neutral-50 border-b border-neutral-100 py-16 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <span className="inline-block px-4 py-1.5 bg-neon-green/10 text-neon-green font-bold text-xs tracking-widest uppercase rounded-full mb-4">
                CAPS ALIGNED • GRADE 7
              </span>
              <h1 className="font-display text-5xl md:text-7xl tracking-tighter leading-tight">
                LIFE ORIENTATION <br />
                <span className="text-neutral-400 font-normal">DIGITAL TEXTBOOK</span>
              </h1>
            </motion.div>

            <button
              onClick={handlePrint}
              className="flex items-center gap-3 bg-black text-white px-8 py-4 font-bold tracking-widest hover:bg-neon-green hover:text-black transition-all shadow-xl active:scale-95"
            >
              <Printer size={20} /> PRINT TO PDF
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          {/* Table of Contents - Sidebar */}
          <aside className="lg:col-span-1 sticky top-32 h-fit hidden lg:block print:hidden">
            <nav className="space-y-8">
              <div>
                <h4 className="font-display text-xl tracking-tight mb-6 flex items-center gap-2">
                  <BookOpen size={20} className="text-neon-green" /> CONTENTS
                </h4>
                <ul className="space-y-4">
                  {TEXTBOOK_DATA.map((term) => (
                    <li key={term.number}>
                      <a
                        href={`#term-${term.number}`}
                        className="group flex items-start gap-2 text-neutral-500 hover:text-black transition-colors"
                      >
                        <ChevronRight size={16} className="mt-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                        <div>
                          <span className="font-bold text-xs uppercase tracking-widest block">Term {term.number}</span>
                          <span className="text-sm">{term.title}</span>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            {TEXTBOOK_DATA.map((term) => (
              <TermContainer key={term.number} term={term} />
            ))}
          </main>
        </div>
      </div>
    </div>
  );
};
