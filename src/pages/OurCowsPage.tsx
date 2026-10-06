import React, { useState } from 'react';
import { Search, Heart, Sparkles, Filter, ArrowRight, ShieldCheck, Calendar, Activity, Info, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';
import { Cow, CowBreed } from '../types';

interface OurCowsPageProps {
  navigate: (route: string) => void;
  onSelectCowForCare?: (cow: Cow) => void;
}

export const OurCowsPage: React.FC<OurCowsPageProps> = ({ navigate }) => {
  const { cows } = useApp();
  const [selectedBreed, setSelectedBreed] = useState<string>('all');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeModalCow, setActiveModalCow] = useState<Cow | null>(null);

  const breeds: CowBreed[] = ['Gir', 'Sahiwal', 'Tharparkar', 'Kankrej'];

  const filteredCows = cows.filter((cow) => {
    const matchesBreed = selectedBreed === 'all' || cow.breed === selectedBreed;
    const matchesCategory =
      selectedCategory === 'all' ||
      (selectedCategory === 'elder' && cow.category === 'elder') ||
      (selectedCategory === 'resident' && cow.category !== 'elder');
    const matchesSearch =
      cow.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cow.tagNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
      cow.breed.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBreed && matchesCategory && matchesSearch;
  });

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Indigenous Heritage Herds
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Meet the Revered Cows of Cow Town Sanctuary
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Each resident has an official identification tag, veterinary medical dossier, genealogical lineage history, and a gentle spirit. Choose a cow to co-own or sponsor in our elder retirement wing.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#2C241E]/10 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        {/* Search */}
        <div className="relative grow max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by cow name, tag (e.g. CT-GIR-014), or breed..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
          />
        </div>

        {/* Filter Controls (Buttons / Segmented tabs per constitution) */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Category Filter */}
          <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] rounded-xl border border-gray-200 text-xs">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white font-semibold text-[#2C241E] shadow-xs'
                  : 'text-[#6A5A4D] hover:text-[#2C241E]'
              }`}
            >
              All Residents ({cows.length})
            </button>
            <button
              onClick={() => setSelectedCategory('resident')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'resident'
                  ? 'bg-white font-semibold text-[#2C241E] shadow-xs'
                  : 'text-[#6A5A4D] hover:text-[#2C241E]'
              }`}
            >
              Available for Co-Ownership
            </button>
            <button
              onClick={() => setSelectedCategory('elder')}
              className={`px-3 py-1.5 rounded-lg transition-colors cursor-pointer ${
                selectedCategory === 'elder'
                  ? 'bg-white font-semibold text-[#8E412A] shadow-xs'
                  : 'text-[#6A5A4D] hover:text-[#2C241E]'
              }`}
            >
              Elder Care Wing
            </button>
          </div>

          {/* Breed Filter Dropdown */}
          <select
            value={selectedBreed}
            onChange={(e) => setSelectedBreed(e.target.value)}
            className="px-3 py-2 rounded-xl text-xs border border-gray-200 bg-[#FAF8F5] text-[#2C241E] focus:outline-hidden"
          >
            <option value="all">All Breeds</option>
            {breeds.map((b) => (
              <option key={b} value={b}>
                {b} Breed
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Cows Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredCows.map((cow) => (
          <div
            key={cow.id}
            className="bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              {/* Image & Badges */}
              <div
                onClick={() => setActiveModalCow(cow)}
                className="h-60 relative cursor-pointer group overflow-hidden"
              >
                <FallbackImage
                  src={cow.imageUrl}
                  alt={cow.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  category="cow"
                />
                <div className="absolute top-3 left-3 bg-[#1C1713]/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                  {cow.tagNumber}
                </div>
                {cow.category === 'elder' ? (
                  <div className="absolute top-3 right-3 bg-[#B85D36] text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                    Elder Care Wing
                  </div>
                ) : cow.currentSponsorName ? (
                  <div className="absolute top-3 right-3 bg-emerald-800 text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                    Co-Custodians Enrolled
                  </div>
                ) : (
                  <div className="absolute top-3 right-3 bg-[#8E412A] text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                    Needs Custodian
                  </div>
                )}
              </div>

              {/* Body */}
              <div className="p-6 space-y-3">
                <div className="flex items-center justify-between">
                  <h3
                    onClick={() => setActiveModalCow(cow)}
                    className="text-2xl font-serif font-bold text-[#2C241E] hover:text-[#8E412A] transition-colors cursor-pointer"
                  >
                    {cow.name}
                  </h3>
                  <div className="text-right">
                    <span className="text-xs font-mono text-[#8C7A6B] block">
                      {cow.breed} · {cow.gender === 'female' ? 'Cow' : 'Bull'}
                    </span>
                    <span className="text-[11px] text-gray-500 font-mono">
                      Age: {cow.ageYears} yrs ({cow.birthYear})
                    </span>
                  </div>
                </div>

                <p className="text-xs text-[#6A5A4D] line-clamp-3 leading-relaxed">
                  {cow.story}
                </p>

                <div className="p-3 rounded-xl bg-[#FAF8F5] text-xs space-y-1">
                  <div className="flex items-center justify-between text-[#6A5A4D]">
                    <span>Favorite Food:</span>
                    <span className="font-medium text-[#2C241E]">{cow.favoriteFood}</span>
                  </div>
                  <div className="flex items-center justify-between text-[#6A5A4D]">
                    <span>Temperament:</span>
                    <span className="font-medium text-[#2C241E]">{cow.temperament.split(',')[0]}</span>
                  </div>
                </div>

                {cow.currentSponsorName && (
                  <div className="text-[11px] text-[#4A6B3B] bg-emerald-50 px-2.5 py-1.5 rounded-lg border border-emerald-100 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 shrink-0" />
                    <span className="truncate">Sponsor: {cow.currentSponsorName}</span>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="p-6 pt-0 space-y-2">
              <div className="flex items-center justify-between text-xs pb-2 border-b border-gray-100">
                <span className="text-[#8C7A6B]">Monthly Feed & Care:</span>
                <span className="font-bold text-[#2C241E] font-mono text-sm">
                  ₹{cow.monthlyCareCost.toLocaleString('en-IN')}/mo
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => setActiveModalCow(cow)}
                  className="py-2.5 px-3 bg-[#FAF8F5] hover:bg-gray-100 text-[#2C241E] text-xs font-medium rounded-xl border border-gray-200 transition-colors cursor-pointer text-center"
                >
                  View Dossier
                </button>
                <button
                  onClick={() =>
                    navigate(cow.category === 'elder' ? '/elder-cow-care' : '/own-a-cow')
                  }
                  className="py-2.5 px-3 bg-[#8E412A] hover:bg-[#783622] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                >
                  {cow.category === 'elder' ? 'Sponsor Care' : 'Co-Own Now'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Cow Detail Modal */}
      {activeModalCow && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#2C241E]/10 p-6 sm:p-8 relative shadow-2xl">
            <button
              onClick={() => setActiveModalCow(null)}
              className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-lg cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex flex-col sm:flex-row gap-6 items-start">
              <div className="w-full sm:w-1/2 h-64 rounded-xl overflow-hidden shrink-0">
                <FallbackImage
                  src={activeModalCow.imageUrl}
                  alt={activeModalCow.name}
                  className="w-full h-full"
                  category="cow"
                />
              </div>

              <div className="space-y-3 w-full">
                <div className="flex items-center gap-2">
                  <span className="bg-[#1C1713] text-white text-xs font-mono px-2 py-0.5 rounded">
                    {activeModalCow.tagNumber}
                  </span>
                  <span className="text-xs text-[#8E412A] font-medium font-mono">
                    {activeModalCow.breed} Breed
                  </span>
                </div>

                <h3 className="text-3xl font-serif font-bold text-[#2C241E]">
                  {activeModalCow.name}
                </h3>

                <p className="text-xs text-[#6A5A4D] leading-relaxed">
                  {activeModalCow.story}
                </p>

                <div className="space-y-1.5 text-xs text-[#4E3F33] pt-2">
                  <p><strong>Age:</strong> {activeModalCow.ageYears} years (Born {activeModalCow.birthYear})</p>
                  <p><strong>Temperament:</strong> {activeModalCow.temperament}</p>
                  <p><strong>Favorite Food:</strong> {activeModalCow.favoriteFood}</p>
                  <p><strong>Clinical Status:</strong> {activeModalCow.healthStatus.replace('_', ' ').toUpperCase()}</p>
                </div>
              </div>
            </div>

            {/* Health Logs & Updates */}
            {activeModalCow.updates && activeModalCow.updates.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#2C241E]">
                  Recent Veterinary Logs & Updates
                </h4>
                <div className="space-y-2">
                  {activeModalCow.updates.map((upd) => (
                    <div key={upd.id} className="p-3 bg-[#FAF8F5] rounded-xl text-xs space-y-1">
                      <div className="flex items-center justify-between text-[#8E412A] font-semibold">
                        <span>{upd.title}</span>
                        <span className="font-mono text-[11px] text-gray-500">{upd.date}</span>
                      </div>
                      <p className="text-[#6A5A4D]">{upd.summary}</p>
                      {upd.vetNotes && (
                        <p className="text-[11px] text-gray-500 italic">Dr. Notes: {upd.vetNotes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <span className="text-xs text-[#8C7A6B] block">Monthly Care Allotment:</span>
                <span className="text-lg font-bold font-mono text-[#2C241E]">
                  ₹{activeModalCow.monthlyCareCost.toLocaleString('en-IN')}/mo
                </span>
              </div>
              <button
                onClick={() => {
                  const target = activeModalCow.category === 'elder' ? '/elder-cow-care' : '/own-a-cow';
                  setActiveModalCow(null);
                  navigate(target);
                }}
                className="px-6 py-2.5 bg-[#8E412A] text-white text-xs font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
              >
                Proceed to Care Program
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
