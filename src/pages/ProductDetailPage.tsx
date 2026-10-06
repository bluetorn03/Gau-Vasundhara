import React, { useState } from 'react';
import { Star, ShieldCheck, Check, ShoppingBag, ArrowLeft, Truck, RefreshCw, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';
import { Product } from '../types';

interface ProductDetailPageProps {
  slug: string;
  navigate: (route: string) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ slug, navigate }) => {
  const { products, addToCart, siteSettings } = useApp();
  const product = products.find((p) => p.slug === slug) || products[0];

  const [selectedVariantId, setSelectedVariantId] = useState<string>(
    product.variants[0]?.id || ''
  );
  const [quantity, setQuantity] = useState<number>(1);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <p>Product not found.</p>
        <button onClick={() => navigate('/shop')} className="mt-4 px-4 py-2 bg-[#8E412A] text-white rounded-lg">
          Back to Shop
        </button>
      </div>
    );
  }

  const selectedVariant =
    product.variants.find((v) => v.id === selectedVariantId) || product.variants[0];
  const currentPrice = selectedVariant ? selectedVariant.price : product.price;
  const originalPrice = selectedVariant?.originalPrice || product.originalPrice;

  const handleAddToCart = () => {
    addToCart(product, quantity, selectedVariantId);
  };

  const relatedProducts = products
    .filter((p) => p.id !== product.id && p.categoryId === product.categoryId)
    .slice(0, 3);

  return (
    <div className="space-y-16 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-xs text-[#8C7A6B]">
        <button onClick={() => navigate('/shop')} className="hover:text-[#2C241E] flex items-center gap-1 cursor-pointer">
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Shop</span>
        </button>
        <span>/</span>
        <span>{product.categoryName}</span>
        <span>/</span>
        <span className="text-[#2C241E] font-medium truncate">{product.name}</span>
      </div>

      {/* Contiguous PDP Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Gallery / Left (lg:col-span-7) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="rounded-3xl overflow-hidden border border-[#2C241E]/10 h-[460px] bg-[#FAF8F5] relative shadow-xs">
            <FallbackImage
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full"
              category="product"
            />
            {product.isFeatured && (
              <div className="absolute top-4 left-4 bg-[#8E412A] text-white text-xs font-semibold px-3 py-1 rounded-md shadow-xs">
                Vedic Sanctuary Batch
              </div>
            )}
          </div>
        </div>

        {/* Purchase Module / Right (lg:col-span-5) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 border border-[#2C241E]/10 shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="text-xs uppercase font-semibold tracking-wider text-[#8E412A]">
              {product.categoryName}
            </span>
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-[#2C241E] leading-snug">
              {product.name}
            </h1>
            <p className="text-xs text-[#6A5A4D] leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Rating */}
          <div className="flex items-center gap-2 text-xs">
            <div className="flex items-center gap-0.5 text-amber-500">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'fill-amber-500 text-amber-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="font-bold text-[#2C241E]">{product.rating}</span>
            <span className="text-[#8C7A6B]">({product.reviewCount} verified reviews)</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline gap-3 pt-2 border-t border-gray-100">
            <span className="text-3xl font-serif font-bold text-[#2C241E] font-mono">
              ₹{currentPrice.toLocaleString('en-IN')}
            </span>
            {originalPrice && (
              <span className="text-sm text-gray-400 line-through font-mono">
                ₹{originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            <span className="text-xs text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
              Tax Included
            </span>
          </div>

          {/* Variants Selector */}
          {product.variants.length > 1 && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-[#2C241E] block">
                Select Packaging Size:
              </label>
              <div className="grid grid-cols-2 gap-2">
                {product.variants.map((variant) => (
                  <button
                    key={variant.id}
                    onClick={() => setSelectedVariantId(variant.id)}
                    className={`p-3 rounded-xl border text-xs font-medium text-left transition-all cursor-pointer ${
                      variant.id === selectedVariantId
                        ? 'border-[#8E412A] bg-[#FAF8F5] text-[#8E412A] font-bold ring-1 ring-[#8E412A]'
                        : 'border-gray-200 text-[#4E3F33] hover:border-gray-300'
                    }`}
                  >
                    <div>{variant.name}</div>
                    <div className="font-mono mt-0.5">₹{variant.price.toLocaleString('en-IN')}</div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity & CTA */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-gray-200 rounded-xl bg-[#FAF8F5] p-1">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-white transition-colors cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center text-xs font-mono font-bold">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold hover:bg-white transition-colors cursor-pointer"
                >
                  +
                </button>
              </div>

              <button
                onClick={handleAddToCart}
                className="grow py-3.5 bg-[#8E412A] hover:bg-[#783622] text-white text-xs font-semibold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Bag · ₹{(currentPrice * quantity).toLocaleString('en-IN')}</span>
              </button>
            </div>

            <button
              onClick={() => {
                addToCart(product, quantity, selectedVariantId);
                navigate('/checkout');
              }}
              className="w-full py-3 bg-[#2C241E] hover:bg-[#3D332B] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
            >
              Instant Express Checkout
            </button>
          </div>

          {/* Trust assurances */}
          <div className="space-y-2 pt-4 border-t border-gray-100 text-xs text-[#6A5A4D]">
            <p className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#8E412A]" />
              <span>Free Pan-India Delivery on orders over ₹{siteSettings.freeShippingThreshold}</span>
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#8E412A]" />
              <span>Certified A2 Beta-Casein Tested · Traditional Vedic Bilona</span>
            </p>
          </div>
        </div>
      </div>

      {/* Product Details, Ingredients & Benefits */}
      <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#2C241E]/10 space-y-8">
        <div className="max-w-3xl space-y-4">
          <h2 className="text-2xl font-serif font-bold text-[#2C241E]">
            About this Sanctuary Product
          </h2>
          <p className="text-sm text-[#4E3F33] leading-relaxed">
            {product.longDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4 border-t border-gray-100">
          {product.ingredients && product.ingredients.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#8E412A]">
                Pure Single-Origin Ingredients
              </h3>
              <ul className="space-y-2 text-xs text-[#4E3F33]">
                {product.ingredients.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.benefits && product.benefits.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-xs uppercase font-bold tracking-wider text-[#8E412A]">
                Key Benefits & Qualities
              </h3>
              <ul className="space-y-2 text-xs text-[#4E3F33]">
                {product.benefits.map((b, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <Sparkles className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Related items */}
      {relatedProducts.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-2xl font-serif font-bold text-[#2C241E]">
            More from {product.categoryName}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => navigate(`/shop/${p.slug}`)}
                className="bg-white rounded-2xl border border-[#2C241E]/10 p-4 hover:shadow-md transition-all cursor-pointer flex gap-4 items-center"
              >
                <div className="w-20 h-20 rounded-xl overflow-hidden shrink-0">
                  <FallbackImage src={p.imageUrl} alt={p.name} className="w-full h-full" category="product" />
                </div>
                <div>
                  <h4 className="font-serif font-bold text-sm text-[#2C241E] line-clamp-1">{p.name}</h4>
                  <p className="text-xs font-mono font-bold text-[#8E412A] mt-1">₹{p.price.toLocaleString('en-IN')}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
