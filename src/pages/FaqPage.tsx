import React, { useState } from 'react';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const FaqPage: React.FC = () => {
  const { faqs } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'cow_care', label: 'Cow Care & Adoption' },
    { id: 'products', label: 'A2 Ghee & Store' },
    { id: 'visits', label: 'Visits & Tourism' },
    { id: 'memberships', label: 'Membership Plans' },
  ];

  const filteredFaqs = faqs.filter(
    (f) => selectedCategory === 'all' || f.category === selectedCategory
  );

  return (
    <div className="space-y-12 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="text-center space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Knowledge Base
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Frequently Asked Questions
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed max-w-2xl mx-auto">
          Everything you need to know about cow co-custodianship, our ethical milking charter, authentic Vedic bilona processing, and planning your family visit.
        </p>
      </div>

      {/* Category selector */}
      <div className="flex flex-wrap justify-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs transition-colors cursor-pointer ${
              selectedCategory === cat.id
                ? 'bg-[#2C241E] text-white font-semibold shadow-xs'
                : 'bg-white text-[#6A5A4D] border border-gray-200 hover:text-[#2C241E]'
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>

      {/* Accordion list */}
      <div className="space-y-3">
        {filteredFaqs.map((faq) => {
          const isOpen = openId === faq.id;
          return (
            <div
              key={faq.id}
              className="bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden shadow-xs"
            >
              <button
                onClick={() => setOpenId(isOpen ? null : faq.id)}
                className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-[#FAF8F5] transition-colors"
              >
                <span className="font-serif font-bold text-base text-[#2C241E]">
                  {faq.question}
                </span>
                {isOpen ? (
                  <ChevronUp className="w-4 h-4 text-[#8E412A] shrink-0" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400 shrink-0" />
                )}
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-[#4E3F33] leading-relaxed border-t border-gray-100 bg-[#FAF8F5]/50">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
