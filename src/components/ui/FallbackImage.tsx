import React, { useState } from 'react';
import { Heart, Sparkles, Feather } from 'lucide-react';

interface FallbackImageProps {
  src: string;
  alt: string;
  className?: string;
  category?: 'cow' | 'product' | 'tourism' | 'nature' | 'elder';
  aspectRatio?: '16:9' | '4:3' | '1:1' | '3:4';
}

export const FallbackImage: React.FC<FallbackImageProps> = ({
  src,
  alt,
  className = '',
  category = 'nature',
}) => {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden bg-[#F0EBE1] ${className}`}>
      {!hasError && (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setHasError(true)}
          className={`w-full h-full object-cover transition-opacity duration-500 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          }`}
        />
      )}

      {/* Styled Fallback / Loading State */}
      {(hasError || !isLoaded) && (
        <div
          className={`absolute inset-0 flex flex-col items-center justify-center p-4 text-center select-none bg-gradient-to-br from-[#F5EFE6] via-[#EFE7DC] to-[#E3D8C8] ${
            isLoaded && !hasError ? 'pointer-events-none' : ''
          }`}
          aria-hidden={isLoaded && !hasError}
        >
          <div className="w-12 h-12 rounded-full bg-[#E5D7C5]/60 flex items-center justify-center text-[#5A4535] mb-2 shadow-xs">
            {category === 'cow' || category === 'elder' ? (
              <Heart className="w-5 h-5 text-[#8E412A]" />
            ) : category === 'product' ? (
              <Sparkles className="w-5 h-5 text-[#8E412A]" />
            ) : (
              <Feather className="w-5 h-5 text-[#556B2F]" />
            )}
          </div>
          <span className="text-xs font-serif tracking-wide text-[#5A4535] font-medium line-clamp-1 max-w-[85%]">
            {alt || 'Cow Town Sanctuary'}
          </span>
          <span className="text-[10px] text-[#8C7A6B] tracking-wider uppercase mt-0.5">
            Sanctuary Natural Heritage
          </span>
        </div>
      )}
    </div>
  );
};
