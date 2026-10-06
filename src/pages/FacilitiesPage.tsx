import React from 'react';
import { ShieldCheck, Heart, Leaf, Sun, CheckCircle2, ArrowRight } from 'lucide-react';
import { FallbackImage } from '../components/ui/FallbackImage';

interface FacilitiesPageProps {
  navigate: (route: string) => void;
}

export const FacilitiesPage: React.FC<FacilitiesPageProps> = ({ navigate }) => {
  const facilities = [
    {
      title: 'Rotational Organic Pasture Meadows',
      tagline: '28 acres of free-grazing clover, alfalfa, and medicinal grasses.',
      description: 'Divided into 6 rotational paddocks allowing natural forage regeneration. Shaded by ancient neem, banyan, and peepal trees with automated freshwater drinking troughs filled from deep underground sweetwater aquifers.',
      imageUrl: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Traditional Vedic Bilona Dairy Pavilion',
      tagline: 'Zero electricity woodfire churning under copper ventilation domes.',
      description: 'Crafted from unbaked mud bricks and lime plaster for natural cooling. Whole milk is boiled in heavy brass vessels, cultured overnight in earthen pots, and hand-churned in wooden vats using clockwise and counter-clockwise wooden whisks.',
      imageUrl: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Veterinary Hospital & Geriatric Hospice Wing',
      tagline: 'Full-time resident veterinary surgeon and specialized elder cow rehab.',
      description: 'Equipped with hydraulic cow lifts for immobile patients, herbal dispensary, ultrasound diagnostics, soft wheat straw bedding, and dedicated recovery stalls with radiant heating for cold winter nights.',
      imageUrl: 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: '200 kW Biogas Generator & Compost Yard',
      tagline: 'Closed-loop zero-waste energy powering the entire estate.',
      description: 'Converts 2 tons of daily cow dung into clean methane gas and electricity. Slurry is aerated and enriched with neem leaves and trichoderma to produce certified microbial bio-fertilizer for our farm fields.',
      imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Mud & Lime Eco-Cottages for Farmstays',
      tagline: 'Handcrafted vernacular guest suites nestled beside grazing meadows.',
      description: 'Built with rammed earth, bamboo thatch, and natural river stone. Enjoy passive cooling, open courtyards, private stargazing verandas, and peaceful views of the evening herd return.',
      imageUrl: 'https://images.unsplash.com/photo-1592150621744-aca64f48394a?auto=format&fit=crop&w=800&q=80',
    },
    {
      title: 'Organic Farm Apiary & Herb Garden',
      tagline: 'Pesticide-free mustard, tulsi, and ashwagandha cultivation.',
      description: 'Our sanctuary apiaries pollinate chemical-free flora, yielding raw single-origin floral honey while medicinal herbs provide decoctions for cow joint therapy and human wellness products.',
      imageUrl: 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80',
    },
  ];

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Estate Architecture
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Sanctuary Facilities & Sustainable Infrastructure
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Designed in harmony with indigenous architectural wisdom and modern veterinary science. Every square foot of Cow Town Sanctuary Ltd serves cow health, ecological renewal, and peaceful family interaction.
        </p>
      </div>

      {/* Facilities Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {facilities.map((fac, idx) => (
          <div
            key={idx}
            className="bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div className="h-56 overflow-hidden">
                <FallbackImage src={fac.imageUrl} alt={fac.title} className="w-full h-full" category="nature" />
              </div>
              <div className="p-6 space-y-2">
                <h3 className="font-serif font-bold text-lg text-[#2C241E]">{fac.title}</h3>
                <p className="text-xs font-semibold text-[#8E412A]">{fac.tagline}</p>
                <p className="text-xs text-[#6A5A4D] leading-relaxed pt-1">{fac.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CTA */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#2C241E]/10 text-center space-y-4">
        <h3 className="text-2xl font-serif font-bold text-[#2C241E]">
          Tour Our Facilities in Person
        </h3>
        <p className="text-xs text-[#6A5A4D] max-w-md mx-auto">
          We offer daily guided walking tours for families, architects, and veterinary students.
        </p>
        <button
          onClick={() => navigate('/cow-tourism')}
          className="px-6 py-3 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
        >
          Book an Estate Tour
        </button>
      </div>
    </div>
  );
};
