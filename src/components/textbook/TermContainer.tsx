import React from 'react';
import { Term } from '../../data/textbook/content';
import { TopicSection } from './TopicSection';

interface TermContainerProps {
  term: Term;
}

export const TermContainer: React.FC<TermContainerProps> = ({ term }) => {
  return (
    <div id={`term-${term.number}`} className="mb-24 py-12 border-t-8 border-neutral-100 scroll-mt-20 page-break-before">
      <div className="flex items-center gap-6 mb-16">
        <span className="font-display text-8xl text-neon-green opacity-30 select-none">
          0{term.number}
        </span>
        <div>
          <h2 className="font-display text-5xl md:text-6xl tracking-tighter text-neutral-900 leading-none">
            TERM {term.number}
          </h2>
          <p className="mt-2 text-xl text-neutral-500 font-medium">
            {term.title}
          </p>
        </div>
      </div>

      <div className="space-y-20">
        {term.topics.map((topic) => (
          <TopicSection key={topic.id} topic={topic} />
        ))}
      </div>
    </div>
  );
};
