import React, { useState } from 'react';
import { FallbackImage } from '../components/ui/FallbackImage';

interface GalleryPageProps {
  navigate: (route: string) => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = () => {
  const [filter, setFilter] = useState<'all' | 'cows' | 'pasture' | 'bilona' | 'family'>('all');

  const galleryItems = [
    {
      title: 'Dawn Pasture Grazing',
      category: 'pasture',
      src: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
      caption: 'Gir cows heading to the lush eastern clover paddocks at sunrise.',
    },
    {
      title: 'Portrait of Nandi',
      category: 'cows',
      src: 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80',
      caption: 'Our magnificent resident Sahiwal bull with his serene morning gaze.',
    },
    {
      title: 'Traditional Wooden Bilona Churning',
      category: 'bilona',
      src: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
      caption: 'Probiotic curd slowly churned in wooden earthen vessels to separate cultured butter.',
    },
    {
      title: 'Family Cow Brushing Session',
      category: 'family',
      src: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
      caption: 'Children and parents experiencing the calming warmth of cow therapy.',
    },
    {
      title: 'Elder Cow Wing Straw Bedding',
      category: 'cows',
      src: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80',
      caption: 'Kamadhenu resting comfortably after her morning warm sesame massage.',
    },
    {
      title: 'Artisan Sambrani Havan Cups',
      category: 'bilona',
      src: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      caption: 'Hand-pressed cow dung cups filled with natural guggal, loban, and camphor.',
    },
  ];

  const filteredItems = galleryItems.filter(
    (item) => filter === 'all' || item.category === filter
  );

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Visual Chronicle
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Sanctuary Life Through the Lens
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Daily moments of gentle companionship, pasture grazing, Vedic bilona churning, and serene family visits at Cow Town Sanctuary Ltd.
        </p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1 p-1 bg-white rounded-xl border border-gray-200 text-xs w-fit">
        {[
          { id: 'all', label: 'All Photos' },
          { id: 'cows', label: 'Resident Cows' },
          { id: 'pasture', label: 'Pasturelands' },
          { id: 'bilona', label: 'Bilona Dairy' },
          { id: 'family', label: 'Family Visits' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setFilter(tab.id as any)}
            className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
              filter === tab.id
                ? 'bg-[#2C241E] text-white font-semibold shadow-xs'
                : 'text-[#6A5A4D] hover:text-[#2C241E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredItems.map((item, idx) => (
          <div
            key={idx}
            className="group bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden shadow-xs hover:shadow-md transition-all"
          >
            <div className="h-72 overflow-hidden relative">
              <FallbackImage
                src={item.src}
                alt={item.title}
                className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                category="nature"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="font-serif font-bold text-base">{item.title}</span>
                <span className="text-xs text-gray-200 mt-0.5">{item.caption}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
