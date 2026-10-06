import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Leaf, Sun, CheckCircle2 } from 'lucide-react';
import { FallbackImage } from '../components/ui/FallbackImage';

interface AboutPageProps {
  navigate: (route: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ navigate }) => {
  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Our Heritage & Non-Profit Charter
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Restoring Dignity to Indigenous Cows Through Sustainable Stewardship
        </h1>
        <p className="text-base text-[#6A5A4D] leading-relaxed">
          Cow Town Sanctuary Ltd was founded to create an enduring, economically viable sanctuary model that honors the sacred bond between Indian society, sustainable soil biology, and indigenous cow genetics.
        </p>
      </div>

      {/* Hero photo showcase */}
      <div className="rounded-3xl overflow-hidden shadow-xs h-96 relative">
        <FallbackImage
          src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1600&q=80"
          alt="Cow Town Sanctuary Pasture and indigenous herds"
          className="w-full h-full"
          category="nature"
        />
        <div className="absolute bottom-6 left-6 bg-black/60 backdrop-blur-md text-white px-4 py-2 rounded-xl text-xs">
          <span>45-Acre Sanctuary Estate · Mathura-Bharatpur Ecological Belt</span>
        </div>
      </div>

      {/* 3 Core Pillars */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-white border border-[#2C241E]/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#8E412A]/10 text-[#8E412A] flex items-center justify-center">
            <Heart className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2C241E]">
            Lifelong Ahimsa Care
          </h3>
          <p className="text-xs text-[#6A5A4D] leading-relaxed">
            Every cow, bull, and calf resides with us for their entire natural lifespan. Male calves are celebrated and trained for soil aeration and pasture regeneration, not abandoned.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#2C241E]/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#4A6B3B]/10 text-[#4A6B3B] flex items-center justify-center">
            <Leaf className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2C241E]">
            Closed-Loop Circular Economy
          </h3>
          <p className="text-xs text-[#6A5A4D] leading-relaxed">
            Cow dung and urine are converted on-site into biogas electricity, organic microbial bio-fertilizers (Jeevamrutha), seed pots, and non-toxic incense, funding healthcare self-sustainably.
          </p>
        </div>

        <div className="p-8 rounded-2xl bg-white border border-[#2C241E]/10 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-amber-600/10 text-amber-700 flex items-center justify-center">
            <Sun className="w-5 h-5" />
          </div>
          <h3 className="text-xl font-serif font-bold text-[#2C241E]">
            Family & Community Bond
          </h3>
          <p className="text-xs text-[#6A5A4D] leading-relaxed">
            We bridge the gap between urban households and rural soil. Through cow co-ownership, school visits, and tourism, modern generations rekindle their ancestral spiritual connection.
          </p>
        </div>
      </div>

      {/* 7-Point Ethical Sanctuary Charter */}
      <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#2C241E]/10 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
            Our Immutable Covenant
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2C241E]">
            The 7-Point Ethical Sanctuary Charter
          </h2>
          <p className="text-xs text-[#6A5A4D]">
            These non-negotiable operational principles govern every day at Cow Town Sanctuary Ltd.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-[#4E3F33]">
          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#2C241E]/5">
            <CheckCircle2 className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C241E] text-xs font-bold uppercase tracking-wider mb-1">
                1. The Calf Feeds First
              </strong>
              <p className="text-xs text-[#6A5A4D]">
                Calves are never separated from their mothers and always nurse to fullness before any surplus milk is gathered.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#2C241E]/5">
            <CheckCircle2 className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C241E] text-xs font-bold uppercase tracking-wider mb-1">
                2. Zero Artificial Hormones
              </strong>
              <p className="text-xs text-[#6A5A4D]">
                Strict ban on oxytocin, rBST, growth promoters, or synthetic lactation stimulators.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#2C241E]/5">
            <CheckCircle2 className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C241E] text-xs font-bold uppercase tracking-wider mb-1">
                3. Lifelong Retirement
              </strong>
              <p className="text-xs text-[#6A5A4D]">
                Cows that cease lactating and aging bulls receive specialized geriatric care, soft straw bedding, and vet support until natural passing.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#2C241E]/5">
            <CheckCircle2 className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C241E] text-xs font-bold uppercase tracking-wider mb-1">
                4. Authentic Vedic Bilona
              </strong>
              <p className="text-xs text-[#6A5A4D]">
                Milk is cultured into curd and bi-directionally hand-churned in wooden vats before slow woodfire clarification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#2C241E]/5">
            <CheckCircle2 className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C241E] text-xs font-bold uppercase tracking-wider mb-1">
                5. Rotational Pasture Grazing
              </strong>
              <p className="text-xs text-[#6A5A4D]">
                Herds graze freely in sunlight across organic clover and lucerne pastures, never tethered in cramped industrial stalls.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#2C241E]/5">
            <CheckCircle2 className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C241E] text-xs font-bold uppercase tracking-wider mb-1">
                6. Transparent Sponsor Health Dossiers
              </strong>
              <p className="text-xs text-[#6A5A4D]">
                Quarterly veterinary logs, dental checks, and open visitor access ensure complete accountability to every co-custodian.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-white rounded-xl border border-[#2C241E]/5 md:col-span-2">
            <CheckCircle2 className="w-5 h-5 text-[#8E412A] shrink-0 mt-0.5" />
            <div>
              <strong className="block text-[#2C241E] text-xs font-bold uppercase tracking-wider mb-1">
                7. Circular Organic Integration
              </strong>
              <p className="text-xs text-[#6A5A4D]">
                All sanctuary agricultural byproducts are returned directly to soil restoration and solar/biogas clean energy generation.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA section */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="text-2xl font-serif font-bold text-[#2C241E]">
          Experience Cow Town in Person
        </h3>
        <p className="text-xs text-[#6A5A4D] max-w-md mx-auto">
          We welcome families, students, and seniors to walk our pastures and meet the caretakers.
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/cow-tourism')}
            className="px-6 py-3 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
          >
            Book a Sanctuary Tour
          </button>
          <button
            onClick={() => navigate('/our-cows')}
            className="px-6 py-3 bg-white border border-[#2C241E]/15 text-[#2C241E] text-xs font-semibold rounded-xl hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Meet Our Resident Cows
          </button>
        </div>
      </div>
    </div>
  );
};
