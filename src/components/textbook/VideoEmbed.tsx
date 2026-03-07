import React from 'react';

interface VideoEmbedProps {
  youtubeId: string;
  title: string;
}

export const VideoEmbed: React.FC<VideoEmbedProps> = ({ youtubeId, title }) => {
  return (
    <div className="my-8 aspect-video w-full overflow-hidden rounded-xl shadow-lg print:hidden">
      <iframe
        className="h-full w-full"
        src={`https://www.youtube.com/embed/${youtubeId}`}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <p className="mt-2 text-center text-sm text-neutral-500 italic">
        Video: {title} (Scan QR in print version)
      </p>
    </div>
  );
};
