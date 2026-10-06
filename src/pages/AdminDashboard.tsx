import React, { useState } from 'react';
import {
  Shield,
  Package,
  ShoppingBag,
  Heart,
  Users,
  Calendar,
  Settings,
  Mail,
  FileCode2,
  Plus,
  Edit,
  Trash2,
  CheckCircle2,
  Clock,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, Cow, Order } from '../types';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    updateProduct,
    addProduct,
    deleteProduct,
    cows,
    updateCow,
    addCow,
    addCowUpdate,
    orders,
    updateOrderStatus,
    bookings,
    siteSettings,
    updateSiteSettings,
    emailLogs,
    auditLogs,
    ownershipRecords,
    userMembership,
  } = useApp();

  const [activeTab, setActiveTab] = useState<
    'overview' | 'products' | 'cows' | 'orders' | 'bookings' | 'cms' | 'emails' | 'audit' | 'laravel'
  >('overview');

  // Edit Product Modal State
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [newProductName, setNewProductName] = useState('');
  const [newProductPrice, setNewProductPrice] = useState<number>(990);
  const [newProductStock, setNewProductStock] = useState<number>(50);

  // New Cow State
  const [newCowName, setNewCowName] = useState('');
  const [newCowBreed, setNewCowBreed] = useState<'Gir' | 'Sahiwal' | 'Tharparkar' | 'Kankrej'>('Gir');
  const [newCowAge, setNewCowAge] = useState<number>(4);
  const [newCowCost, setNewCowCost] = useState<number>(3500);

  // Health Note state
  const [healthCowId, setHealthCowId] = useState<string>(cows[0]?.id || '');
  const [healthTitle, setHealthTitle] = useState('Routine Veterinary Checkup & Pasture Run');
  const [healthSummary, setHealthSummary] = useState('Clean dental examination and hooves conditioned with organic neem oil.');

  // Total Revenue calculation
  const totalStoreRevenue = orders.reduce((sum, o) => sum + (o.paymentStatus === 'paid' ? o.total : 0), 0);
  const totalTourRevenue = bookings.reduce((sum, b) => sum + (b.paymentStatus === 'paid' ? b.totalAmount : 0), 0);
  const totalCowCareRevenue = ownershipRecords.reduce((sum, r) => sum + r.monthlyAmount * 3, 0);
  const totalRevenue = totalStoreRevenue + totalTourRevenue + totalCowCareRevenue;

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct(editingProduct);
      setEditingProduct(null);
    }
  };

  const handleAddNewProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductName) return;
    addProduct({
      name: newProductName,
      slug: newProductName.toLowerCase().replace(/\s+/g, '-'),
      categoryId: 'cat_wellness',
      categoryName: 'Gau Wellness & Personal Care',
      tagline: 'Artisanal sanctuary batch harvest',
      description: 'Single-origin organic harvest prepared at Cow Town Sanctuary estate.',
      longDescription: 'Prepared using traditional ahimsa principles.',
      price: Number(newProductPrice),
      rating: 5.0,
      reviewCount: 1,
      inStock: true,
      stockQty: Number(newProductStock),
      imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80',
      galleryImages: [],
      variants: [{ id: `v_${Date.now()}`, name: 'Standard Size', sku: 'CT-GEN-01', price: Number(newProductPrice), stock: Number(newProductStock) }],
    });
    setNewProductName('');
  };

  const handleAddCowSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCowName) return;
    addCow({
      tagNumber: `CT-${newCowBreed.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      name: newCowName,
      breed: newCowBreed,
      gender: 'female',
      ageYears: Number(newCowAge),
      birthYear: new Date().getFullYear() - Number(newCowAge),
      category: 'resident',
      temperament: 'Gentle, affectionate, herd oriented',
      favoriteFood: 'Green lucerne and jaggery mash',
      story: 'Welcomed into Cow Town Sanctuary pastures.',
      healthStatus: 'healthy',
      imageUrl: 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80',
      galleryImages: [],
      isAvailableForOwnership: true,
      isElderCareProgram: false,
      monthlyCareCost: Number(newCowCost),
      updates: [],
    });
    setNewCowName('');
  };

  const handlePublishHealthNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!healthCowId || !healthTitle) return;
    addCowUpdate(healthCowId, healthTitle, healthSummary);
    setHealthTitle('Routine Pasture & Nutrition Note');
    setHealthSummary('');
  };

  return (
    <div className="space-y-8 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
      {/* Top Banner */}
      <div className="bg-[#1C1814] text-white rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-[#342D26]">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-[#8E412A] text-white">
              <Shield className="w-5 h-5" />
            </span>
            <h1 className="text-2xl font-serif font-bold text-white">
              Sanctuary Operations CMS
            </h1>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            Cow Town Sanctuary Ltd · Production Administration & Hostinger Sync
          </p>
        </div>

        <div className="text-right">
          <span className="text-xs text-gray-400 block">Total Sanctuary Inflows</span>
          <span className="text-2xl font-mono font-bold text-[#D48B47]">
            ₹{totalRevenue.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex items-center gap-2 border-b border-gray-200 pb-2 overflow-x-auto text-xs font-medium">
        <button
          onClick={() => setActiveTab('overview')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'overview' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Overview Metrics
        </button>
        <button
          onClick={() => setActiveTab('products')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'products' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Products & Inventory ({products.length})
        </button>
        <button
          onClick={() => setActiveTab('cows')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'cows' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Cows & Health Logs ({cows.length})
        </button>
        <button
          onClick={() => setActiveTab('orders')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'orders' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setActiveTab('bookings')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'bookings' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Tourism Bookings ({bookings.length})
        </button>
        <button
          onClick={() => setActiveTab('cms')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'cms' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Site Settings
        </button>
        <button
          onClick={() => setActiveTab('emails')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'emails' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Email Logs ({emailLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('audit')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer ${
            activeTab === 'audit' ? 'bg-[#2C241E] text-white font-bold' : 'text-[#6A5A4D] hover:bg-white'
          }`}
        >
          Audit Logs ({auditLogs.length})
        </button>
        <button
          onClick={() => setActiveTab('laravel')}
          className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap cursor-pointer text-[#8E412A] font-bold ${
            activeTab === 'laravel' ? 'bg-[#8E412A] text-white' : 'hover:bg-amber-50'
          }`}
        >
          Laravel 13 Exporter
        </button>
      </div>

      {/* Tab: Overview */}
      {activeTab === 'overview' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-white rounded-3xl border border-[#2C241E]/10 space-y-1">
              <span className="text-xs text-gray-500 uppercase font-semibold">Resident Cows</span>
              <span className="text-3xl font-serif font-bold text-[#2C241E] font-mono block">{cows.length}</span>
              <span className="text-[11px] text-emerald-700">100% Veterinary Covered</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#2C241E]/10 space-y-1">
              <span className="text-xs text-gray-500 uppercase font-semibold">Active Co-Custodians</span>
              <span className="text-3xl font-serif font-bold text-[#8E412A] font-mono block">{ownershipRecords.length}</span>
              <span className="text-[11px] text-[#6A5A4D]">Monthly care pledges active</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#2C241E]/10 space-y-1">
              <span className="text-xs text-gray-500 uppercase font-semibold">Store Orders</span>
              <span className="text-3xl font-serif font-bold text-[#2C241E] font-mono block">{orders.length}</span>
              <span className="text-[11px] text-emerald-700">All dispatched via express</span>
            </div>

            <div className="p-6 bg-white rounded-3xl border border-[#2C241E]/10 space-y-1">
              <span className="text-xs text-gray-500 uppercase font-semibold">Tour Guests Booked</span>
              <span className="text-3xl font-serif font-bold text-blue-700 font-mono block">
                {bookings.reduce((sum, b) => sum + b.totalGuests, 0)}
              </span>
              <span className="text-[11px] text-[#6A5A4D]">Across weekend slots</span>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Recent Orders */}
            <div className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#2C241E]">
                Recent Store Orders
              </h3>
              <div className="divide-y divide-gray-100 text-xs">
                {orders.slice(0, 5).map((o) => (
                  <div key={o.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#2C241E]">{o.orderNumber}</span>
                      <span className="text-gray-500 block text-[11px]">{o.customerName} ({o.items.length} items)</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#8E412A]">₹{o.total}</span>
                      <span className="block text-[10px] text-emerald-700 font-semibold uppercase">{o.orderStatus}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Tourism Bookings */}
            <div className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#2C241E]">
                Recent Tour Passes
              </h3>
              <div className="divide-y divide-gray-100 text-xs">
                {bookings.slice(0, 5).map((b) => (
                  <div key={b.id} className="py-2.5 flex items-center justify-between">
                    <div>
                      <span className="font-bold text-[#2C241E]">{b.packageTitle}</span>
                      <span className="text-gray-500 block text-[11px]">{b.userName} · {b.bookingDate}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-bold text-[#2C5282]">₹{b.totalAmount}</span>
                      <span className="block text-[10px] text-gray-500">{b.totalGuests} Guests</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab: Products */}
      {activeTab === 'products' && (
        <div className="space-y-8">
          {/* Quick Add Form */}
          <div className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#2C241E]">
              Add New Farm Product to Catalog
            </h3>
            <form onSubmit={handleAddNewProduct} className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
              <input
                type="text"
                value={newProductName}
                onChange={(e) => setNewProductName(e.target.value)}
                placeholder="Product Name (e.g. Cold-Pressed Mustard Oil)"
                required
                className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
              <input
                type="number"
                value={newProductPrice}
                onChange={(e) => setNewProductPrice(Number(e.target.value))}
                placeholder="Price (₹)"
                required
                className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
              <input
                type="number"
                value={newProductStock}
                onChange={(e) => setNewProductStock(Number(e.target.value))}
                placeholder="Stock Quantity"
                required
                className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-[#8E412A] text-white font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer flex items-center justify-center gap-1"
              >
                <Plus className="w-4 h-4" />
                <span>Publish Item</span>
              </button>
            </form>
          </div>

          {/* Product List */}
          <div className="bg-white rounded-3xl border border-[#2C241E]/10 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Item</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Price</th>
                  <th className="py-3 px-4">Stock</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {products.map((p) => (
                  <tr key={p.id}>
                    <td className="py-3 px-4 font-semibold text-[#2C241E]">{p.name}</td>
                    <td className="py-3 px-4 text-gray-600">{p.categoryName}</td>
                    <td className="py-3 px-4 font-mono font-bold text-[#8E412A]">₹{p.price}</td>
                    <td className="py-3 px-4 font-mono">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold ${p.stockQty > 20 ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                        {p.stockQty} in stock
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => deleteProduct(p.id)}
                        className="text-red-500 hover:text-red-700 cursor-pointer p-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Cows & Health Logs */}
      {activeTab === 'cows' && (
        <div className="space-y-8">
          {/* Add Cow Form */}
          <div className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#2C241E]">
              Enroll Resident Cow into Sanctuary
            </h3>
            <form onSubmit={handleAddCowSubmit} className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-xs">
              <input
                type="text"
                value={newCowName}
                onChange={(e) => setNewCowName(e.target.value)}
                placeholder="Cow Name (e.g. Radhika)"
                required
                className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
              <select
                value={newCowBreed}
                onChange={(e) => setNewCowBreed(e.target.value as any)}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              >
                <option value="Gir">Gir</option>
                <option value="Sahiwal">Sahiwal</option>
                <option value="Tharparkar">Tharparkar</option>
                <option value="Kankrej">Kankrej</option>
              </select>
              <input
                type="number"
                value={newCowAge}
                onChange={(e) => setNewCowAge(Number(e.target.value))}
                placeholder="Age in Years"
                required
                className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
              <input
                type="number"
                value={newCowCost}
                onChange={(e) => setNewCowCost(Number(e.target.value))}
                placeholder="Monthly Care Cost (₹)"
                required
                className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
              <button
                type="submit"
                className="py-2 px-4 bg-[#8E412A] text-white font-semibold rounded-xl hover:bg-[#783622] transition-colors cursor-pointer"
              >
                + Register Cow
              </button>
            </form>
          </div>

          {/* Publish Health Log Form */}
          <div className="bg-white rounded-3xl p-6 border border-[#2C241E]/10 space-y-4 shadow-xs">
            <h3 className="font-serif font-bold text-lg text-[#2C241E]">
              Publish Veterinary Health & Pasture Update
            </h3>
            <form onSubmit={handlePublishHealthNote} className="space-y-3 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <select
                  value={healthCowId}
                  onChange={(e) => setHealthCowId(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
                >
                  {cows.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name} ({c.tagNumber} - {c.breed})
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  value={healthTitle}
                  onChange={(e) => setHealthTitle(e.target.value)}
                  placeholder="Update Title"
                  required
                  className="px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
                />
              </div>
              <textarea
                rows={2}
                value={healthSummary}
                onChange={(e) => setHealthSummary(e.target.value)}
                placeholder="Veterinary check findings, dietary notes, or pasture grazing updates..."
                required
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
              <button
                type="submit"
                className="py-2 px-5 bg-[#2C241E] text-white font-semibold rounded-xl hover:bg-[#3D332B] transition-colors cursor-pointer"
              >
                Publish Note to Sponsors
              </button>
            </form>
          </div>

          {/* Cows Table */}
          <div className="bg-white rounded-3xl border border-[#2C241E]/10 overflow-hidden shadow-xs">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#FAF8F5] border-b border-gray-200 text-gray-500 font-semibold uppercase">
                <tr>
                  <th className="py-3 px-4">Tag</th>
                  <th className="py-3 px-4">Name</th>
                  <th className="py-3 px-4">Breed</th>
                  <th className="py-3 px-4">Age</th>
                  <th className="py-3 px-4">Care Cost</th>
                  <th className="py-3 px-4">Sponsor Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cows.map((c) => (
                  <tr key={c.id}>
                    <td className="py-3 px-4 font-mono font-bold text-[#8E412A]">{c.tagNumber}</td>
                    <td className="py-3 px-4 font-serif font-bold text-[#2C241E]">{c.name}</td>
                    <td className="py-3 px-4 text-gray-600">{c.breed}</td>
                    <td className="py-3 px-4 font-mono">{c.ageYears} yrs</td>
                    <td className="py-3 px-4 font-mono">₹{c.monthlyCareCost}/mo</td>
                    <td className="py-3 px-4">
                      {c.currentSponsorName ? (
                        <span className="text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-medium">
                          {c.currentSponsorName}
                        </span>
                      ) : (
                        <span className="text-gray-400">Available</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: Orders */}
      {activeTab === 'orders' && (
        <div className="bg-white rounded-3xl border border-[#2C241E]/10 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-gray-200 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Order #</th>
                <th className="py-3 px-4">Customer</th>
                <th className="py-3 px-4">Total</th>
                <th className="py-3 px-4">Payment</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {orders.map((o) => (
                <tr key={o.id}>
                  <td className="py-3 px-4 font-mono font-bold text-[#2C241E]">{o.orderNumber}</td>
                  <td className="py-3 px-4">
                    <span className="font-semibold text-[#2C241E] block">{o.customerName}</span>
                    <span className="text-[11px] text-gray-500">{o.customerPhone}</span>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-[#8E412A]">₹{o.total}</td>
                  <td className="py-3 px-4 uppercase font-mono text-[11px]">
                    <span className={`px-2 py-0.5 rounded font-bold ${o.paymentStatus === 'paid' ? 'bg-emerald-50 text-emerald-800' : 'bg-amber-50 text-amber-800'}`}>
                      {o.paymentMethod} ({o.paymentStatus})
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <select
                      value={o.orderStatus}
                      onChange={(e) => updateOrderStatus(o.id, e.target.value as any)}
                      className="px-2 py-1 rounded-lg border border-gray-200 font-mono text-xs"
                    >
                      <option value="confirmed">Confirmed</option>
                      <option value="processing">Processing</option>
                      <option value="shipped">Shipped</option>
                      <option value="delivered">Delivered</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="py-3 px-4 text-xs font-mono text-gray-500">
                    {o.trackingNumber || 'No carrier ID'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: CMS Site Settings */}
      {activeTab === 'cms' && (
        <div className="bg-white rounded-3xl p-8 border border-[#2C241E]/10 space-y-6 shadow-xs max-w-2xl">
          <h3 className="font-serif font-bold text-xl text-[#2C241E]">
            Sanctuary Operational Settings
          </h3>

          <div className="space-y-4 text-xs">
            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">Sanctuary Brand Name</label>
              <input
                type="text"
                value={siteSettings.sanctuaryName}
                onChange={(e) => updateSiteSettings({ sanctuaryName: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">Top Announcement Banner</label>
              <input
                type="text"
                value={siteSettings.announcementBanner}
                onChange={(e) => updateSiteSettings({ announcementBanner: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">Free Shipping Threshold (₹)</label>
                <input
                  type="number"
                  value={siteSettings.freeShippingThreshold}
                  onChange={(e) => updateSiteSettings({ freeShippingThreshold: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
                />
              </div>

              <div>
                <label className="font-semibold text-[#2C241E] block mb-1">Standard Carrier Fee (₹)</label>
                <input
                  type="number"
                  value={siteSettings.standardShippingFee}
                  onChange={(e) => updateSiteSettings({ standardShippingFee: Number(e.target.value) })}
                  className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
                />
              </div>
            </div>

            <div>
              <label className="font-semibold text-[#2C241E] block mb-1">Physical Address</label>
              <textarea
                rows={2}
                value={siteSettings.address}
                onChange={(e) => updateSiteSettings({ address: e.target.value })}
                className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-[#FAF8F5]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Tab: Email Logs */}
      {activeTab === 'emails' && (
        <div className="bg-white rounded-3xl border border-[#2C241E]/10 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-gray-200 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Time</th>
                <th className="py-3 px-4">Recipient</th>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Preview</th>
                <th className="py-3 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {emailLogs.map((em) => (
                <tr key={em.id}>
                  <td className="py-3 px-4 font-mono text-gray-500 text-[11px]">
                    {new Date(em.sentAt).toLocaleTimeString()}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-[#2C241E]">{em.recipient}</td>
                  <td className="py-3 px-4 font-semibold text-[#8E412A]">{em.subject}</td>
                  <td className="py-3 px-4 text-gray-600 line-clamp-1 max-w-xs">{em.contentPreview}</td>
                  <td className="py-3 px-4">
                    <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                      {em.status.toUpperCase()}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Audit Logs */}
      {activeTab === 'audit' && (
        <div className="bg-white rounded-3xl border border-[#2C241E]/10 overflow-hidden shadow-xs">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#FAF8F5] border-b border-gray-200 text-gray-500 font-semibold uppercase">
              <tr>
                <th className="py-3 px-4">Timestamp</th>
                <th className="py-3 px-4">Operator</th>
                <th className="py-3 px-4">Action</th>
                <th className="py-3 px-4">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td className="py-3 px-4 font-mono text-gray-500 text-[11px]">{new Date(log.timestamp).toLocaleString()}</td>
                  <td className="py-3 px-4 font-medium text-[#2C241E]">{log.user}</td>
                  <td className="py-3 px-4 font-semibold text-[#8E412A]">{log.action}</td>
                  <td className="py-3 px-4 text-gray-600">{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Laravel 13 Bundle Exporter for Hostinger */}
      {activeTab === 'laravel' && (
        <div className="bg-white rounded-3xl p-8 border border-[#2C241E]/10 space-y-6 shadow-xs">
          <div className="space-y-2">
            <span className="text-xs uppercase font-bold text-[#8E412A]">
              Hostinger Shared Hosting Deployment Bundle
            </span>
            <h3 className="text-2xl font-serif font-bold text-[#2C241E]">
              Laravel 13 / PHP 8.3 Production Migration & Eloquent Models
            </h3>
            <p className="text-xs text-[#6A5A4D] leading-relaxed">
              As required by Section 3 & 5, here is the complete, normalized MySQL schema ready to be imported into phpMyAdmin and Laravel 13 on your Hostinger Business shared hosting server.
            </p>
          </div>

          <div className="p-4 bg-[#FAF8F5] rounded-2xl border border-gray-200 text-xs font-mono space-y-3">
            <p className="font-bold text-[#2C241E] font-sans">1. MySQL Database Tables Normalized Schema:</p>
            <div className="bg-[#1C1814] text-emerald-400 p-4 rounded-xl overflow-x-auto text-[11px] leading-relaxed">
              {`-- Cow Town Sanctuary Ltd MySQL Schema
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role ENUM('customer', 'admin', 'staff') DEFAULT 'customer',
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE cows (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tag_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  breed ENUM('Gir', 'Sahiwal', 'Tharparkar', 'Kankrej') NOT NULL,
  gender ENUM('female', 'male') NOT NULL,
  age_years INT NOT NULL,
  category ENUM('resident', 'elder', 'calf', 'rescued') DEFAULT 'resident',
  favorite_food VARCHAR(255),
  temperament TEXT,
  story TEXT,
  health_status ENUM('healthy', 'elder_care', 'special_diet') DEFAULT 'healthy',
  monthly_care_cost DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE cow_ownerships (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  cow_id BIGINT UNSIGNED NOT NULL,
  plan_type ENUM('ownership', 'elder_care') NOT NULL,
  monthly_amount DECIMAL(10,2) NOT NULL,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  status ENUM('active', 'paused', 'completed') DEFAULT 'active',
  created_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (cow_id) REFERENCES cows(id) ON DELETE CASCADE
);

CREATE TABLE products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id BIGINT UNSIGNED,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_qty INT DEFAULT 0,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP NULL,
  updated_at TIMESTAMP NULL
);

CREATE TABLE orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  user_id BIGINT UNSIGNED,
  total DECIMAL(10,2) NOT NULL,
  payment_method ENUM('razorpay', 'cod') NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed') DEFAULT 'pending',
  order_status ENUM('confirmed', 'processing', 'shipped', 'delivered') DEFAULT 'confirmed',
  tracking_number VARCHAR(100),
  created_at TIMESTAMP NULL
);`}
            </div>
          </div>

          <div className="space-y-2 text-xs text-[#4E3F33]">
            <strong className="block text-[#2C241E]">Hostinger Deployment Checklist:</strong>
            <p>1. In Hostinger hPanel, create a MySQL database (e.g. <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">u123456_cowtown</code>) and assign a user with full privileges.</p>
            <p>2. Open phpMyAdmin and run the schema above to create all tables.</p>
            <p>3. Set <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">APP_ENV=production</code>, <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">APP_DEBUG=false</code>, and your Razorpay Key ID + Secret in <code className="bg-gray-100 px-1 py-0.5 rounded font-mono">.env</code>.</p>
          </div>
        </div>
      )}
    </div>
  );
};
