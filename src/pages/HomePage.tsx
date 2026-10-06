import React from 'react';
import { ArrowRight, ShieldCheck, Heart, Sparkles, Compass, Check, Users, Leaf, Sun, Calendar, Star } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { FallbackImage } from '../components/ui/FallbackImage';

interface HomePageProps {
  navigate: (route: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigate }) => {
  const { products, cows, tourPackages, addToCart } = useApp();

  const featuredCows = cows.slice(0, 3);
  const featuredProducts = products.filter((p) => p.isFeatured).slice(0, 3);
  const featuredTour = tourPackages[0];

  return (
    <div className="space-y-20 pb-20">
      {/* 1. CINEMATIC HERO */}
      <section className="relative min-h-[82vh] flex items-center bg-[#241E19] text-white overflow-hidden">
        {/* Ambient background photograph with measured scrim */}
        <div className="absolute inset-0 opacity-40 mix-blend-luminosity">
          <FallbackImage
            src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=1600&q=80"
            alt="Cow Town Sanctuary Pastures at Golden Dawn"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#1C1713] via-[#1C1713]/85 to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <div className="max-w-2xl space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs text-[#E8DCCF]">
              <span className="w-2 h-2 rounded-full bg-[#D48B47]" />
              <span>Sanctuary & Sustainable Cow Ecosystem</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold tracking-tight text-[#FAF7F2] leading-[1.15] text-balance">
              Where Families and Indigenous Cows Live in Lifelong Harmony
            </h1>

            <p className="text-base sm:text-lg text-[#D5CBC0] leading-relaxed">
              Cow Town Sanctuary Ltd is a sustainable sanctuary estate where Indian families co-own and care for cows, receive fresh Vedic A2 bilona ghee at home, and experience regenerative rural tourism.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button
                onClick={() => navigate('/own-a-cow')}
                className="px-6 py-3.5 bg-[#8E412A] hover:bg-[#A34B30] text-white font-semibold text-sm rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Own / Care for a Cow</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/shop')}
                className="px-6 py-3.5 bg-white/10 hover:bg-white/20 text-[#FAF7F2] border border-white/25 font-semibold text-sm rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Shop Pure Vedic Ghee</span>
              </button>
            </div>

            {/* Quick trust metrics */}
            <div className="pt-8 border-t border-white/15 grid grid-cols-3 gap-6 text-left">
              <div>
                <span className="block text-2xl font-serif font-bold text-[#EADFCF] font-mono">45+</span>
                <span className="text-xs text-[#A89C8F]">Acres Pastureland</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#EADFCF] font-mono">100%</span>
                <span className="text-xs text-[#A89C8F]">A2 Vedic Bilona</span>
              </div>
              <div>
                <span className="block text-2xl font-serif font-bold text-[#EADFCF] font-mono">Zero</span>
                <span className="text-xs text-[#A89C8F]">Slaughter Guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CLEAR COW TOWN EXPLANATION (WHAT / WHY / NEXT) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#2C241E]/10 p-8 sm:p-12 shadow-xs">
          <div className="text-center max-w-3xl mx-auto mb-10 space-y-2">
            <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
              The Cow Town Purpose
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C241E] text-balance">
              Not a Generic Gaushala. A Living Sustainable Ecosystem.
            </h2>
            <p className="text-sm text-[#6A5A4D] leading-relaxed">
              Traditional gaushalas depend on unpredictable donations. Cow Town Sanctuary Ltd replaces charity with dignity, circular agriculture, and authentic family connection.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#2C241E]/5 space-y-3">
              <span className="text-xs font-mono font-semibold text-[#8E412A] uppercase tracking-wider">
                01. WHAT IS THIS?
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C241E]">
                A World-Class Cow Sanctuary & Eco-Estate
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                A home for indigenous Indian Gir, Sahiwal, Tharparkar, and Kankrej breeds. Free pasture grazing, veterinary hospital, organic farms, and dedicated elder cow retirement shelters.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#2C241E]/5 space-y-3">
              <span className="text-xs font-mono font-semibold text-[#8E412A] uppercase tracking-wider">
                02. WHY DOES IT MATTER?
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C241E]">
                Lifelong Care Regardless of Milk Yield
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Commercial dairies discard male calves and aging cows. At Cow Town, every cow lives their natural lifespan. Calves nurse first, and elder cows receive geriatric healthcare.
              </p>
            </div>

            <div className="p-6 rounded-xl bg-[#FAF8F5] border border-[#2C241E]/5 space-y-3">
              <span className="text-xs font-mono font-semibold text-[#8E412A] uppercase tracking-wider">
                03. WHAT CAN I DO NEXT?
              </span>
              <h3 className="text-lg font-serif font-bold text-[#2C241E]">
                Adopt, Visit, or Bring Wellness Home
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Co-own a resident cow, become an annual sanctuary member, receive doorstep A2 ghee, or book a family weekend tour to brush, feed, and bond with our gentle herds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. FOUR PRIMARY ACTIONS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            onClick={() => navigate('/own-a-cow')}
            className="group p-6 rounded-2xl bg-[#F5EFE6] border border-[#E4D5C7] hover:border-[#8E412A]/40 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#8E412A]/10 text-[#8E412A] flex items-center justify-center">
                <Heart className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2C241E] group-hover:text-[#8E412A] transition-colors">
                Own / Care for a Cow
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Become a recognized co-custodian. Receive your official certificate, monthly ghee, and quarterly veterinary reports.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#8E412A] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Choose your cow</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/membership')}
            className="group p-6 rounded-2xl bg-[#EBF0E6] border border-[#D5E0CC] hover:border-[#4A6B3B]/40 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#4A6B3B]/10 text-[#4A6B3B] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2C241E] group-hover:text-[#4A6B3B] transition-colors">
                Sanctuary Membership
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Annual privileges for families including free guest tour passes, 15% store savings, and guaranteed ghee quotas.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#4A6B3B] gap-1 group-hover:translate-x-1 transition-transform">
              <span>View tiers</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/shop')}
            className="group p-6 rounded-2xl bg-[#FAF0E6] border border-[#EED7C5] hover:border-[#B85D36]/40 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#B85D36]/10 text-[#B85D36] flex items-center justify-center">
                <Sparkles className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2C241E] group-hover:text-[#B85D36] transition-colors">
                Shop Pure Vedic Ghee
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Handcrafted A2 curd-churned bilona ghee, herbal dhoop cups, raw forest honey, and organic seed pots.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#B85D36] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Browse store</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => navigate('/cow-tourism')}
            className="group p-6 rounded-2xl bg-[#E8EDF2] border border-[#CFDBE5] hover:border-[#2C5282]/40 transition-all hover:shadow-md cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-xl bg-[#2C5282]/10 text-[#2C5282] flex items-center justify-center">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#2C241E] group-hover:text-[#2C5282] transition-colors">
                Book a Visit / Tour
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Cow cuddling therapy, organic satvik lunches, sunrise Gau Puja, and overnight eco-cottage stays for families.
              </p>
            </div>
            <div className="pt-4 flex items-center text-xs font-semibold text-[#2C5282] gap-1 group-hover:translate-x-1 transition-transform">
              <span>Reserve slots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE COW TOWN MODEL (Circular Economy & Ethics) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 space-y-5">
            <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
              Ethical Milking Charter
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2C241E] text-balance">
              The Calf Always Drinks First. Surplus Becomes Medicine.
            </h2>
            <p className="text-sm text-[#6A5A4D] leading-relaxed">
              Industrial dairy exploits the maternal instinct of cows for volume. At Cow Town, calves nurse to full satiety from both front teats. Only the natural gentle surplus is milked at dawn.
            </p>
            <ul className="space-y-3 text-sm text-[#4E3F33]">
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#8E412A]/10 text-[#8E412A] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Zero commercial hormones (oxytocin/rBST) or forced lactation.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#8E412A]/10 text-[#8E412A] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Free-range rotational grazing across open organic clover meadows.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <div className="w-5 h-5 rounded-full bg-[#8E412A]/10 text-[#8E412A] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3.5 h-3.5" />
                </div>
                <span>Natural curd fermentation before traditional wooden bilona churning.</span>
              </li>
            </ul>
            <div className="pt-2">
              <button
                onClick={() => navigate('/about')}
                className="text-xs font-semibold text-[#8E412A] hover:text-[#A34B30] flex items-center gap-1.5 cursor-pointer"
              >
                <span>Read our complete 7-point ethical sanctuary charter</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="h-64 rounded-2xl overflow-hidden shadow-xs">
                  <FallbackImage
                    src="https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80"
                    alt="Free-grazing indigenous Gir cows"
                    className="w-full h-full"
                    category="cow"
                  />
                </div>
                <div className="p-4 rounded-xl bg-white border border-[#2C241E]/10">
                  <span className="text-xs font-bold text-[#2C241E] block">Rotational Pastures</span>
                  <span className="text-[11px] text-[#6A5A4D]">Natural sunlight, herb foraging & seasonal fresh fodder</span>
                </div>
              </div>

              <div className="space-y-4 pt-8">
                <div className="p-4 rounded-xl bg-white border border-[#2C241E]/10">
                  <span className="text-xs font-bold text-[#2C241E] block">Bilona Wooden Churn</span>
                  <span className="text-[11px] text-[#6A5A4D]">Bi-directional hand movement preserves natural micro-crystals</span>
                </div>
                <div className="h-64 rounded-2xl overflow-hidden shadow-xs">
                  <FallbackImage
                    src="https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80"
                    alt="Sahiwal guardian cows"
                    className="w-full h-full"
                    category="cow"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURED COWS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
              Meet the Residents
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2C241E]">
              Our Revered Cows & Bulls
            </h2>
            <p className="text-sm text-[#6A5A4D]">
              Each resident has a name, lineage dossier, medical log, and distinct personality.
            </p>
          </div>
          <button
            onClick={() => navigate('/our-cows')}
            className="text-xs font-semibold text-[#8E412A] hover:text-[#A34B30] flex items-center gap-1.5 shrink-0 cursor-pointer"
          >
            <span>View all resident cows</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featuredCows.map((cow) => (
            <div
              key={cow.id}
              className="bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="h-56 relative">
                  <FallbackImage
                    src={cow.imageUrl}
                    alt={cow.name}
                    className="w-full h-full"
                    category="cow"
                  />
                  <div className="absolute top-3 left-3 bg-[#1C1713]/80 backdrop-blur-xs text-white text-[11px] font-mono px-2.5 py-1 rounded-md">
                    {cow.tagNumber}
                  </div>
                  {cow.category === 'elder' && (
                    <div className="absolute top-3 right-3 bg-[#B85D36] text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                      Elder Care Wing
                    </div>
                  )}
                </div>

                <div className="p-6 space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-serif font-bold text-[#2C241E]">
                      {cow.name}
                    </h3>
                    <span className="text-xs text-[#8C7A6B] font-mono">
                      {cow.breed} · {cow.ageYears} yrs
                    </span>
                  </div>

                  <p className="text-xs text-[#6A5A4D] line-clamp-2 leading-relaxed">
                    {cow.story}
                  </p>

                  <div className="pt-2 border-t border-gray-100 flex items-center justify-between text-xs">
                    <span className="text-[#8C7A6B]">Monthly Care:</span>
                    <span className="font-bold text-[#2C241E] font-mono">
                      ₹{cow.monthlyCareCost.toLocaleString('en-IN')}/mo
                    </span>
                  </div>
                </div>
              </div>

              <div className="px-6 pb-6 pt-2">
                <button
                  onClick={() => navigate(cow.category === 'elder' ? '/elder-cow-care' : '/own-a-cow')}
                  className="w-full py-2.5 bg-[#FAF8F5] hover:bg-[#8E412A] text-[#2C241E] hover:text-white border border-[#2C241E]/15 hover:border-transparent text-xs font-semibold rounded-xl transition-all cursor-pointer text-center"
                >
                  {cow.category === 'elder' ? 'Sponsor Elder Care' : 'Co-Own / Care for ' + cow.name}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FAF8F5] rounded-3xl p-8 sm:p-12 border border-[#2C241E]/10">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
                Sanctuary Farm Store
              </span>
              <h2 className="text-3xl font-serif font-bold text-[#2C241E]">
                Pure Vedic Bilona Ghee & Organic Goods
              </h2>
              <p className="text-sm text-[#6A5A4D]">
                Every purchase directly finances the feed and geriatric healthcare of our resident cows.
              </p>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="text-xs font-semibold text-[#8E412A] hover:text-[#A34B30] flex items-center gap-1.5 shrink-0 cursor-pointer"
            >
              <span>Explore all farm products</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {featuredProducts.map((prod) => (
              <div
                key={prod.id}
                className="bg-white rounded-2xl border border-[#2C241E]/10 overflow-hidden hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div
                    onClick={() => navigate(`/shop/${prod.slug}`)}
                    className="h-56 overflow-hidden cursor-pointer"
                  >
                    <FallbackImage
                      src={prod.imageUrl}
                      alt={prod.name}
                      className="w-full h-full hover:scale-105 transition-transform duration-500"
                      category="product"
                    />
                  </div>

                  <div className="p-6 space-y-2">
                    <span className="text-[11px] uppercase tracking-wider text-[#8E412A] font-semibold">
                      {prod.categoryName}
                    </span>
                    <h3
                      onClick={() => navigate(`/shop/${prod.slug}`)}
                      className="text-base font-serif font-bold text-[#2C241E] hover:text-[#8E412A] transition-colors cursor-pointer line-clamp-1"
                    >
                      {prod.name}
                    </h3>
                    <p className="text-xs text-[#6A5A4D] line-clamp-2 leading-relaxed">
                      {prod.tagline}
                    </p>

                    <div className="pt-3 flex items-center justify-between">
                      <div className="flex items-baseline gap-2">
                        <span className="text-lg font-bold font-mono text-[#2C241E]">
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
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    onClick={() => addToCart(prod, 1)}
                    className="w-full py-2.5 bg-[#2C241E] hover:bg-[#8E412A] text-white text-xs font-semibold rounded-xl transition-colors cursor-pointer text-center"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. COW TOURISM / EXPERIENCE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C2826] text-white rounded-3xl overflow-hidden shadow-lg grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 p-8 sm:p-14 space-y-6 flex flex-col justify-center">
            <div className="inline-flex items-center gap-2 text-xs font-medium text-emerald-300">
              <Compass className="w-4 h-4" />
              <span>Cow Town Tourism & Experiences</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#F3F7F5] leading-tight text-balance">
              Reconnect Your Children with Gentle Giant Friends and Sacred Soil
            </h2>

            <p className="text-sm text-[#CCD9D4] leading-relaxed">
              Step away from screen exhaustion. Join our curated family day tours, participate in cow brushing and cuddling therapy, enjoy a satvik lunch cooked in brass vessels over slow woodfire, and learn Vedic seed potting.
            </p>

            <div className="grid grid-cols-2 gap-4 pt-2 text-xs text-[#CCD9D4]">
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Hands-on Cow Brushing</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Satvik Organic Farm Lunch</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Vedic Bilona Churning Demo</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Senior Buggy Transport</span>
              </div>
            </div>

            <div className="pt-4 flex flex-wrap items-center gap-4">
              <button
                onClick={() => navigate('/cow-tourism')}
                className="px-6 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer flex items-center gap-2 shadow-xs"
              >
                <span>Book Family Experience</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => navigate('/experiences')}
                className="px-5 py-3.5 bg-white/10 hover:bg-white/15 text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer"
              >
                <span>View All 4 Tour Packages</span>
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 relative min-h-[320px]">
            <FallbackImage
              src={featuredTour.imageUrl}
              alt="Family visiting sanctuary"
              className="w-full h-full object-cover"
              category="tourism"
            />
            <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/60 backdrop-blur-md border border-white/15 text-xs">
              <span className="font-semibold text-white block">{featuredTour.title}</span>
              <span className="text-emerald-300 font-mono">₹{featuredTour.pricePerAdult}/adult · {featuredTour.timing}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SANCTUARY / COW HOSTEL STORY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-4">
            <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
              Cow Hostel & Retirement Wing
            </span>
            <h2 className="text-3xl font-serif font-bold text-[#2C241E] text-balance">
              Lifelong Retirement for Elders & Boarding for Family Cows
            </h2>
            <p className="text-sm text-[#6A5A4D] leading-relaxed">
              Many families across India revere cows but live in urban apartments where keeping a cow is impossible. Our Cow Hostel provides premium boarding, lifelong custodianship, and transparent health care for your family’s cow.
            </p>
            <p className="text-sm text-[#6A5A4D] leading-relaxed">
              Additionally, our specialized Elder Cow Wing houses over 30 senior cows who receive daily joint massages with warm sesame oil, easily chewable fermented silage, and round-the-clock veterinary oversight.
            </p>
            <div className="pt-2">
              <button
                onClick={() => navigate('/elder-cow-care')}
                className="px-5 py-3 bg-[#FAF8F5] hover:bg-[#8E412A] text-[#2C241E] hover:text-white border border-[#2C241E]/15 text-xs font-semibold rounded-xl transition-all cursor-pointer"
              >
                Learn About Elder Cow Sponsorship
              </button>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="rounded-2xl overflow-hidden border border-[#2C241E]/10 shadow-xs h-80">
              <FallbackImage
                src="https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80"
                alt="Elder cow resting peacefully on soft straw"
                className="w-full h-full"
                category="elder"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 9. SUSTAINABILITY & CIRCULAR BIO-ECOSYSTEM */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-[#FAF8F5] border border-[#2C241E]/10 text-center max-w-4xl mx-auto space-y-6">
          <span className="text-xs font-semibold text-[#4A6B3B] uppercase tracking-wider">
            Closed-Loop Regenerative Agriculture
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2C241E] text-balance">
            Zero Waste. Pure Prana. Complete Circularity.
          </h2>
          <p className="text-sm text-[#6A5A4D] leading-relaxed max-w-2xl mx-auto">
            Cow dung powers our on-site 200 kW biogas generator and is compressed into tree planting pots and sambrani havan cups. Urine is fermented with neem leaves to create natural pest repellents for our organic mustard and wheat fields.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 text-left">
            <div className="p-4 rounded-xl bg-white border border-[#2C241E]/5">
              <Sun className="w-5 h-5 text-amber-600 mb-2" />
              <h4 className="text-sm font-bold text-[#2C241E]">100% Solar & Biogas</h4>
              <p className="text-xs text-[#6A5A4D] mt-1">Sanctuary dairy pumps, cold storage, and lighting powered off-grid.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#2C241E]/5">
              <Leaf className="w-5 h-5 text-emerald-600 mb-2" />
              <h4 className="text-sm font-bold text-[#2C241E]">Organic Fodder Farming</h4>
              <p className="text-xs text-[#6A5A4D] mt-1">Zero synthetic chemical fertilizers or pesticides used on fodder pastures.</p>
            </div>
            <div className="p-4 rounded-xl bg-white border border-[#2C241E]/5">
              <Sparkles className="w-5 h-5 text-[#8E412A] mb-2" />
              <h4 className="text-sm font-bold text-[#2C241E]">Seed Pot Nursery</h4>
              <p className="text-xs text-[#6A5A4D] mt-1">Transforming agricultural waste into plastic-free biodegradable planting pots.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 10. TRUST & VETERINARY TRANSPARENCY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl border border-[#2C241E]/10 p-8 sm:p-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-[#2C241E]">
                Resident Veterinary Doctor
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Full-time veterinary surgeon and 8 certified animal caretakers on premises 24/7 with a dedicated veterinary recovery station and dispensary.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-[#2C241E]">
                Transparent Sponsor Dossiers
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Every co-owner receives quarterly health records, dietary logs, and weight graphs accessible in their online portal.
              </p>
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-[#2C241E]">
                Open-Gate Policy
              </h3>
              <p className="text-xs text-[#6A5A4D] leading-relaxed">
                Sponsoring families can visit the sanctuary any time during public hours to inspect enclosures, pastures, and bilona kitchens in complete transparency.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. STORIES & TESTIMONIALS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 space-y-2">
          <span className="text-xs font-semibold text-[#8E412A] uppercase tracking-wider">
            Voices of the Sanctuary
          </span>
          <h2 className="text-3xl font-serif font-bold text-[#2C241E]">
            Stories of Connection & Peace
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#2C241E]/10 space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#4E3F33] italic leading-relaxed">
              "Bringing our grandchildren to visit Ganga at Cow Town was a transformative experience. They learned where food really comes from and the joy of gentle service. The monthly A2 ghee has become a sacred staple in our home."
            </p>
            <div className="border-t border-[#2C241E]/10 pt-3">
              <span className="text-xs font-bold text-[#2C241E] block">Rajesh & Meera Singhania</span>
              <span className="text-[11px] text-[#8C7A6B]">Family Custodians · Mumbai</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#2C241E]/10 space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#4E3F33] italic leading-relaxed">
              "As an ayurvedic practitioner, seeing the clinical care, clean straw bedding, and herbal joint massages given to senior cows like Kamadhenu brought tears to my eyes. This is genuine sanctuary work, transparent and filled with devotion."
            </p>
            <div className="border-t border-[#2C241E]/10 pt-3">
              <span className="text-xs font-bold text-[#2C241E] block">Dr. Sunita Deshmukh</span>
              <span className="text-[11px] text-[#8C7A6B]">Elder Cow Patron · Pune</span>
            </div>
          </div>

          <div className="p-6 rounded-2xl bg-[#FAF8F5] border border-[#2C241E]/10 space-y-4 flex flex-col justify-between">
            <p className="text-xs text-[#4E3F33] italic leading-relaxed">
              "The weekend farmstay was the calmest two days we have spent in years. Waking up to dew on the pastures and participating in sunrise Gau Puja gave our family peace that no city resort ever could."
            </p>
            <div className="border-t border-[#2C241E]/10 pt-3">
              <span className="text-xs font-bold text-[#2C241E] block">Vikram & Ananya Iyer</span>
              <span className="text-[11px] text-[#8C7A6B]">Sanctuary Members · Bengaluru</span>
            </div>
          </div>
        </div>
      </section>

      {/* 12. FINAL COMMUNITY CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-10 sm:p-16 rounded-3xl bg-[#2C241E] text-white text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-[#FAF7F2] text-balance max-w-2xl mx-auto">
            Become a Guardian of India's Sacred Indigenous Cows
          </h2>
          <p className="text-sm text-[#D5CBC0] max-w-xl mx-auto leading-relaxed">
            Whether you adopt a cow, become a sanctuary member, or visit our green pastures with your children, your presence strengthens a self-sustaining refuge.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <button
              onClick={() => navigate('/own-a-cow')}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#8E412A] hover:bg-[#A34B30] text-white font-semibold text-xs rounded-xl transition-colors cursor-pointer shadow-md"
            >
              Own / Care for a Cow
            </button>
            <button
              onClick={() => navigate('/membership')}
              className="w-full sm:w-auto px-8 py-3.5 bg-white/10 hover:bg-white/20 text-white font-semibold text-xs rounded-xl border border-white/20 transition-colors cursor-pointer"
            >
              Become an Annual Member
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
