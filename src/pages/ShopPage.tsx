import React, { useState } from 'react';
import { Search, Filter, Star, Sparkles, ShoppingBag, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';
import { Product } from '../types';

interface ShopPageProps {
  navigate: (route: string) => void;
}

export const ShopPage: React.FC<ShopPageProps> = ({ navigate }) => {
  const { products, categories, addToCart } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price_low' | 'price_high' | 'rating'>('featured');

  const filteredProducts = products.filter((prod) => {
    const matchesCat = selectedCategory === 'all' || prod.categoryId === selectedCategory;
    const matchesSearch =
      prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      prod.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price_low') return a.price - b.price;
    if (sortBy === 'price_high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
  });

  return (
    <div className="space-y-12 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-3">
        <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
          Sanctuary Organic Store
        </span>
        <h1 className="text-4xl sm:text-5xl font-serif font-bold text-[#2C241E] leading-tight text-balance">
          Pure Vedic A2 Bilona Ghee & Organic Goods
        </h1>
        <p className="text-sm text-[#6A5A4D] leading-relaxed">
          Sourced from our ethical sanctuary pastures and surrounding chemical-free farm fields. 100% of proceeds support fodder, healthcare, and lifelong elder cow retirement.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white rounded-2xl p-4 border border-[#2C241E]/10 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
        <div className="relative grow max-w-md">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Vedic ghee, sambrani cups, honey, soap..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-xl border border-gray-200 bg-[#FAF8F5] focus:outline-hidden focus:border-[#8E412A]"
          />
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex items-center gap-1 p-1 bg-[#FAF8F5] rounded-xl border border-gray-200 text-xs overflow-x-auto">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white font-semibold text-[#2C241E] shadow-xs'
                  : 'text-[#6A5A4D] hover:text-[#2C241E]'
              }`}
            >
              All Items ({products.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-white font-semibold text-[#8E412A] shadow-xs'
                    : 'text-[#6A5A4D] hover:text-[#2C241E]'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Sort Selector */}
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="px-3 py-2 rounded-xl text-xs border border-gray-200 bg-[#FAF8F5] text-[#2C241E] focus:outline-hidden"
          >
            <option value="featured">Featured First</option>
            <option value="price_low">Price: Low to High</option>
            <option value="price_high">Price: High to Low</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {sortedProducts.map((prod) => (
          <div
            key={prod.id}
            className="bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
          >
            <div>
              <div
                onClick={() => navigate(`/shop/${prod.slug}`)}
                className="h-64 overflow-hidden relative cursor-pointer group"
              >
                <FallbackImage
                  src={prod.imageUrl}
                  alt={prod.name}
                  className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  category="product"
                />
                {prod.isFeatured && (
                  <div className="absolute top-3 left-3 bg-[#8E412A] text-white text-[11px] font-semibold px-2.5 py-0.5 rounded-md shadow-xs">
                    Sanctuary Signature
                  </div>
                )}
                {prod.netWeight && (
                  <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#2C241E] text-[11px] font-mono px-2 py-0.5 rounded-md">
                    {prod.netWeight}
                  </div>
                )}
              </div>

              <div className="p-6 space-y-2">
                <span className="text-[11px] uppercase tracking-wider text-[#8E412A] font-semibold">
                  {prod.categoryName}
                </span>

                <h3
                  onClick={() => navigate(`/shop/${prod.slug}`)}
                  className="text-lg font-serif font-bold text-[#2C241E] hover:text-[#8E412A] transition-colors cursor-pointer line-clamp-1"
                >
                  {prod.name}
                </h3>

                <p className="text-xs text-[#6A5A4D] line-clamp-2 leading-relaxed">
                  {prod.tagline}
                </p>

                <div className="pt-3 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-xl font-bold font-mono text-[#2C241E]">
                      ₹{prod.price.toLocaleString('en-IN')}
                    </span>
                    {prod.originalPrice && (
                      <span className="text-xs text-gray-400 line-through font-mono">
                        ₹{prod.originalPrice.toLocaleString('en-IN')}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-xs text-amber-600 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-500 text-amber-500" />
                    <span>{prod.rating}</span>
                    <span className="text-gray-400 text-[11px]">({prod.reviewCount})</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 pt-0 grid grid-cols-2 gap-2">
              <button
                onClick={() => navigate(`/shop/${prod.slug}`)}
                className="py-2.5 px-3 bg-[#FAF8F5] hover:bg-gray-100 text-[#2C241E] text-xs font-medium rounded-xl border border-gray-200 transition-colors cursor-pointer text-center"
              >
                Details
              </button>
              <button
                onClick={() => addToCart(prod, 1)}
                className="py-2.5 px-3 bg-[#2C241E] hover:bg-[#8E412A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center flex items-center justify-center gap-1.5 shadow-xs"
              >
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add to Bag</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
