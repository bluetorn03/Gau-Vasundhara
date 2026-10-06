import React, { useState, useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { HomePage } from './pages/HomePage';
import { AboutPage } from './pages/AboutPage';
import { OurCowsPage } from './pages/OurCowsPage';
import { OwnCowPage } from './pages/OwnCowPage';
import { ElderCowCarePage } from './pages/ElderCowCarePage';
import { MembershipPage } from './pages/MembershipPage';
import { ShopPage } from './pages/ShopPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CowTourismPage } from './pages/CowTourismPage';
import { FacilitiesPage } from './pages/FacilitiesPage';
import { GalleryPage } from './pages/GalleryPage';
import { StoriesPage } from './pages/StoriesPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { LegalPage } from './pages/LegalPage';
import { CustomerDashboard } from './pages/CustomerDashboard';
import { AdminDashboard } from './pages/AdminDashboard';
import { CheckCircle2, X } from 'lucide-react';

const MainApp: React.FC = () => {
  const [currentRoute, setCurrentRoute] = useState<string>(() => {
    return window.location.pathname || '/';
  });

  const { notification } = useApp();

  const navigate = (route: string) => {
    setCurrentRoute(route);
    window.history.pushState({}, '', route);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Router resolution
  const renderCurrentPage = () => {
    if (currentRoute === '/') {
      return <HomePage navigate={navigate} />;
    }
    if (currentRoute === '/about') {
      return <AboutPage navigate={navigate} />;
    }
    if (currentRoute === '/our-cows') {
      return <OurCowsPage navigate={navigate} />;
    }
    if (currentRoute === '/own-a-cow') {
      return <OwnCowPage navigate={navigate} />;
    }
    if (currentRoute === '/elder-cow-care') {
      return <ElderCowCarePage navigate={navigate} />;
    }
    if (currentRoute === '/membership') {
      return <MembershipPage navigate={navigate} />;
    }
    if (currentRoute === '/shop') {
      return <ShopPage navigate={navigate} />;
    }
    if (currentRoute.startsWith('/shop/')) {
      const slug = currentRoute.replace('/shop/', '');
      return <ProductDetailPage slug={slug} navigate={navigate} />;
    }
    if (currentRoute === '/cart') {
      return <CartPage navigate={navigate} />;
    }
    if (currentRoute === '/checkout') {
      return <CheckoutPage navigate={navigate} />;
    }
    if (currentRoute === '/cow-tourism' || currentRoute === '/experiences') {
      return <CowTourismPage navigate={navigate} />;
    }
    if (currentRoute === '/facilities') {
      return <FacilitiesPage navigate={navigate} />;
    }
    if (currentRoute === '/gallery') {
      return <GalleryPage navigate={navigate} />;
    }
    if (currentRoute === '/stories') {
      return <StoriesPage navigate={navigate} />;
    }
    if (currentRoute === '/contact') {
      return <ContactPage />;
    }
    if (currentRoute === '/faq') {
      return <FaqPage />;
    }
    if (currentRoute === '/privacy') {
      return <LegalPage type="privacy" navigate={navigate} />;
    }
    if (currentRoute === '/terms') {
      return <LegalPage type="terms" navigate={navigate} />;
    }
    if (currentRoute === '/shipping-policy') {
      return <LegalPage type="shipping" navigate={navigate} />;
    }
    if (currentRoute === '/refund-policy') {
      return <LegalPage type="refund" navigate={navigate} />;
    }
    if (currentRoute === '/dashboard') {
      return <CustomerDashboard navigate={navigate} />;
    }
    if (currentRoute === '/admin') {
      return <AdminDashboard />;
    }

    // Default fallback to home
    return <HomePage navigate={navigate} />;
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#2C241E]">
      <Header currentRoute={currentRoute} navigate={navigate} />

      <main className="grow">
        {renderCurrentPage()}
      </main>

      <Footer navigate={navigate} />

      {/* Global Notification Toast */}
      {notification && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm p-4 bg-[#2C241E] text-white rounded-2xl shadow-2xl border border-white/10 flex items-start gap-3 animate-in slide-in-from-bottom-5 duration-200">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
          <div className="text-xs leading-relaxed grow">{notification}</div>
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainApp />
    </AppProvider>
  );
}
