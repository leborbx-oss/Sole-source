import React from 'react';
import { Topic } from '../../data/textbook/content';
import { VideoEmbed } from './VideoEmbed';

interface TopicSectionProps {
  topic: Topic;
}

export const TopicSection: React.FC<TopicSectionProps> = ({ topic }) => {
  return (
    <section id={topic.id} className="mb-16 scroll-mt-24 break-inside-avoid">
      <h3 className="mb-6 font-display text-3xl tracking-tight text-neutral-900 border-b-2 border-neon-green pb-2">
        {topic.title}
      </h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        <div className="prose prose-lg text-neutral-700 leading-relaxed">
          <p>{topic.content}</p>
        </div>

        {topic.imageUrl && (
          <figure className="m-0">
            <img
              src={topic.imageUrl}
              alt={topic.title}
              className="rounded-xl shadow-md w-full h-auto object-cover aspect-[4/3]"
              referrerPolicy="no-referrer"
            />
            <figcaption className="mt-3 text-sm text-neutral-500 text-center italic">
              {topic.imageCaption || topic.title}
            </figcaption>
          </figure>
        )}
      </div>

      {topic.youtubeId && <VideoEmbed youtubeId={topic.youtubeId} title={topic.title} />}
    </section>
  );
};
