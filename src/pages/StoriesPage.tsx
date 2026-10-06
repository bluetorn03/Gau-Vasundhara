import React from 'react';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { FallbackImage } from '../components/ui/FallbackImage';
import { sanctuaryImages } from '../images';

interface StoriesPageProps {
  navigate: (route: string) => void;
}

export const StoriesPage: React.FC<StoriesPageProps> = ({ navigate }) => {
  const stories = [
    {
      title: 'How Kaveri Found Her Peace in the Elder Cow Wing',
      slug: 'kaveri-peaceful-retirement',
      date: 'March 2026',
      readTime: '4 min read',
      author: 'Dr. Rameshwar Rao (Chief Veterinarian)',
      category: 'Sanctuary Care',
      summary: 'After sixteen years of devoted service to a small farmer in Rajasthan, Kaveri was retired to Cow Town. Here is how specialized herbal joint therapy and soft straw restored her spirit.',
      imageUrl: sanctuaryImages.cows.kaveriElder,
    },
    {
      title: 'The Vedic Science of Bi-Directional Bilona Churning',
      slug: 'science-of-vedic-bilona-churning',
      date: 'February 2026',
      readTime: '6 min read',
      author: 'Cow Town Research Circle',
      category: 'Vedic Agriculture',
      summary: 'Why modern stainless-steel centrifugal cream separators destroy the fat-globule membrane, and why traditional clockwise/counter-clockwise wooden whisks yield medicinal-grade A2 lipids.',
      imageUrl: sanctuaryImages.stories.bilonaChurning,
    },
    {
      title: 'Transforming City Children Through Cow Cuddling Therapy',
      slug: 'transforming-children-cow-therapy',
      date: 'January 2026',
      readTime: '5 min read',
      author: 'Pooja Varma (Child Educator)',
      category: 'Sanctuary Life',
      summary: 'Observing the physiological drop in stress, anxiety, and hyperactivity when children spend two quiet hours brushing and leaning against warm, rhythmic cows.',
      imageUrl: sanctuaryImages.tours.cowCuddling,
    },
  ];

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Sanctuary Gazette
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Stories, Research & Sanctuary Chronicles
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Essays on cow psychology, regenerative biodynamic agriculture, geriatric veterinary insights, and heartfelt updates from our caretakers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {stories.map((story, idx) => (
          <article
            key={idx}
            className="bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-56 overflow-hidden">
                <FallbackImage src={story.imageUrl} alt={story.title} className="w-full h-full" category="nature" />
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-center gap-2 text-xs text-[#8C7A6B]">
                  <span className="text-[#8E412A] font-semibold">{story.category}</span>
                  <span>·</span>
                  <span>{story.date}</span>
                </div>
                <h3 className="font-serif font-bold text-lg text-[#2C241E] leading-snug hover:text-[#8E412A] transition-colors">
                  {story.title}
                </h3>
                <p className="text-xs text-[#6A5A4D] line-clamp-3 leading-relaxed">
                  {story.summary}
                </p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-gray-100 flex items-center justify-between text-xs text-[#8C7A6B]">
              <span>{story.author}</span>
              <span className="font-medium text-[#8E412A]">{story.readTime}</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
