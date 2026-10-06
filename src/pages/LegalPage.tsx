import React from 'react';

interface LegalPageProps {
  type: 'privacy' | 'terms' | 'shipping' | 'refund';
  navigate: (route: string) => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ type }) => {
  const content = {
    privacy: {
      title: 'Privacy Policy',
      tagline: 'Last updated: March 2026',
      body: [
        {
          heading: '1. Information We Collect',
          text: 'We collect personal identification information including name, email address, postal shipping address, and phone number when you register as a cow custodian, order sanctuary products, or book tourism passes. We never store credit card or bank credentials; all transactions are encrypted and processed through RBI-authorized payment aggregators (Razorpay).',
        },
        {
          heading: '2. Purpose of Processing',
          text: 'Your details are strictly utilized to coordinate product delivery, issue digital cow custodianship certificates, transmit quarterly veterinary dossiers, and ensure seamless entry at the sanctuary reception desk.',
        },
        {
          heading: '3. Data Security & Protection',
          text: 'We implement 256-bit SSL encryption across all web traffic. We do not sell, rent, or trade your personal information with any third-party advertisers.',
        },
      ],
    },
    terms: {
      title: 'Terms of Custodianship & Service',
      tagline: 'Governing relationships at Cow Town Sanctuary Ltd',
      body: [
        {
          heading: '1. Nature of Cow Co-Ownership',
          text: 'Cow co-ownership and adoption under Cow Town Sanctuary Ltd constitutes a sacred guardianship and care sponsorship relationship. The physical animals remain housed within the sanctuary grounds under dedicated professional veterinary custody and shall never be removed for slaughter, industrial exploitation, or commercial reselling.',
        },
        {
          heading: '2. Milk & Surplus Allotments',
          text: 'All A2 ghee allotments provided to custodians and members are derived from natural dawn surplus after calves nurse to fullness. Product distributions occur on scheduled monthly or bi-monthly dispatch cycles.',
        },
        {
          heading: '3. Sanctuary Visitor Etiquette',
          text: 'Guests must adhere to veterinary handler guidelines, maintain gentle conduct around animals, and refrain from feeding outside food without prior handler approval.',
        },
      ],
    },
    shipping: {
      title: 'Shipping & Transit Policy',
      tagline: 'Careful Pan-India Delivery for Fragile Vedic Glass Jars',
      body: [
        {
          heading: '1. Packaging Standards',
          text: 'All A2 Bilona Ghee glass jars are encased in biodegradable honey-comb paper cushioning and thermally stable outer cartons to protect granular crystallization during transit.',
        },
        {
          heading: '2. Delivery Timelines',
          text: 'Orders are dispatched within 24 to 48 hours of order confirmation. Metro deliveries arrive in 2–4 business days; rest of India takes 4–6 business days via air and surface express carriers (Delhivery / Bluedart).',
        },
        {
          heading: '3. Shipping Rates',
          text: 'Orders exceeding ₹1,999 qualify for Free Pan-India Shipping. For orders below this threshold, a flat nominal carrier fee of ₹150 is applied.',
        },
      ],
    },
    refund: {
      title: 'Refund & Cancellation Policy',
      tagline: 'Clear, ethical guarantees for our community',
      body: [
        {
          heading: '1. Store Product Returns',
          text: 'If an item arrives damaged in transit or if a seal is compromised, please photograph the parcel and notify us within 48 hours at connect@cowtownsanctuary.com. We will immediately issue a replacement or 100% refund.',
        },
        {
          heading: '2. Tourism Booking Rescheduling',
          text: 'Tour passes can be rescheduled or cancelled with full refund up to 48 hours prior to your scheduled arrival time. Cancellations within 48 hours can be converted into sanctuary store credits.',
        },
        {
          heading: '3. Cow Sponsorship Cancellations',
          text: 'Monthly care plans may be paused or cancelled anytime through your Customer Dashboard with no cancellation penalties.',
        },
      ],
    },
  }[type];

  return (
    <div className="space-y-8 pb-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      <div className="space-y-2 border-b border-gray-200 pb-4">
        <h1 className="text-3xl sm:text-4xl font-serif font-bold text-[#2C241E]">
          {content.title}
        </h1>
        <p className="text-xs text-[#8E412A] font-semibold">{content.tagline}</p>
      </div>

      <div className="bg-white rounded-3xl p-8 border border-[#2C241E]/10 space-y-6 shadow-xs">
        {content.body.map((section, idx) => (
          <div key={idx} className="space-y-2 text-xs leading-relaxed text-[#4E3F33]">
            <h3 className="font-serif font-bold text-base text-[#2C241E]">
              {section.heading}
            </h3>
            <p className="text-[#6A5A4D]">{section.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
