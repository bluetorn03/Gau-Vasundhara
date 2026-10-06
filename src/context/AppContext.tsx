import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  Product,
  ProductCategory,
  Cow,
  CowCarePlan,
  MembershipPlan,
  TourPackage,
  TourBooking,
  Order,
  CartItem,
  Coupon,
  SiteSettings,
  FAQItem,
  Testimonial,
  EmailLog,
  AuditLog,
  CowOwnershipRecord,
  UserMembership,
  Address,
} from '../types';
import {
  INITIAL_USER,
  INITIAL_CATEGORIES,
  INITIAL_PRODUCTS,
  INITIAL_COWS,
  INITIAL_CARE_PLANS,
  INITIAL_MEMBERSHIPS,
  INITIAL_TOUR_PACKAGES,
  INITIAL_FAQS,
  INITIAL_TESTIMONIALS,
  INITIAL_SETTINGS,
  INITIAL_COUPONS,
  INITIAL_ORDERS,
  INITIAL_BOOKINGS,
  INITIAL_OWNERSHIP_RECORDS,
  INITIAL_USER_MEMBERSHIP,
} from '../data/initialData';

interface AppContextType {
  currentUser: User | null;
  setCurrentUser: (user: User | null) => void;
  switchUserRole: (role: 'customer' | 'admin' | 'guest') => void;

  // Products
  products: Product[];
  categories: ProductCategory[];
  updateProduct: (product: Product) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  deleteProduct: (id: string) => void;

  // Cows
  cows: Cow[];
  carePlans: CowCarePlan[];
  ownershipRecords: CowOwnershipRecord[];
  updateCow: (cow: Cow) => void;
  addCow: (cow: Omit<Cow, 'id'>) => void;
  addCowUpdate: (cowId: string, title: string, summary: string, vetNotes?: string) => void;
  adoptCow: (cowId: string, planId: string, billingCycle: 'monthly' | 'annual') => boolean;

  // Memberships
  membershipPlans: MembershipPlan[];
  userMembership: UserMembership | null;
  subscribeMembership: (planId: string) => boolean;

  // Cart & Checkout
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variantId?: string) => void;
  updateCartQuantity: (itemId: string, quantity: number) => void;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => { success: boolean; message: string };
  removeCoupon: () => void;
  cartSubtotal: number;
  cartDiscount: number;
  cartShipping: number;
  cartTotal: number;

  // Orders
  orders: Order[];
  createOrder: (address: Address, paymentMethod: 'razorpay' | 'cod', notes?: string) => Promise<Order>;
  updateOrderStatus: (orderId: string, status: Order['orderStatus'], trackingNumber?: string) => void;

  // Tour Bookings
  tourPackages: TourPackage[];
  bookings: TourBooking[];
  bookTour: (
    packageId: string,
    bookingDate: string,
    timeSlot: string,
    adultsCount: number,
    childrenCount: number,
    specialRequests?: string
  ) => Promise<TourBooking>;
  cancelBooking: (bookingId: string) => void;

  // CMS & Settings
  siteSettings: SiteSettings;
  updateSiteSettings: (settings: Partial<SiteSettings>) => void;
  faqs: FAQItem[];
  testimonials: Testimonial[];
  coupons: Coupon[];
  emailLogs: EmailLog[];
  auditLogs: AuditLog[];
  addAuditLog: (action: string, details: string) => void;

  // Notifications
  notification: string | null;
  showNotification: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Load state from localStorage or seed
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('cts_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('cts_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  const [categories] = useState<ProductCategory[]>(INITIAL_CATEGORIES);

  const [cows, setCows] = useState<Cow[]>(() => {
    const saved = localStorage.getItem('cts_cows');
    return saved ? JSON.parse(saved) : INITIAL_COWS;
  });

  const [carePlans] = useState<CowCarePlan[]>(INITIAL_CARE_PLANS);

  const [ownershipRecords, setOwnershipRecords] = useState<CowOwnershipRecord[]>(() => {
    const saved = localStorage.getItem('cts_ownership_records');
    return saved ? JSON.parse(saved) : INITIAL_OWNERSHIP_RECORDS;
  });

  const [membershipPlans] = useState<MembershipPlan[]>(INITIAL_MEMBERSHIPS);

  const [userMembership, setUserMembership] = useState<UserMembership | null>(() => {
    const saved = localStorage.getItem('cts_user_membership');
    return saved ? JSON.parse(saved) : INITIAL_USER_MEMBERSHIP;
  });

  const [tourPackages] = useState<TourPackage[]>(INITIAL_TOUR_PACKAGES);

  const [bookings, setBookings] = useState<TourBooking[]>(() => {
    const saved = localStorage.getItem('cts_bookings');
    return saved ? JSON.parse(saved) : INITIAL_BOOKINGS;
  });

  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('cts_orders');
    return saved ? JSON.parse(saved) : INITIAL_ORDERS;
  });

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cts_cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const [siteSettings, setSiteSettings] = useState<SiteSettings>(() => {
    const saved = localStorage.getItem('cts_settings');
    return saved ? JSON.parse(saved) : INITIAL_SETTINGS;
  });

  const [faqs, setFaqs] = useState<FAQItem[]>(INITIAL_FAQS);
  const [testimonials] = useState<Testimonial[]>(INITIAL_TESTIMONIALS);
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);

  const [emailLogs, setEmailLogs] = useState<EmailLog[]>(() => {
    const saved = localStorage.getItem('cts_email_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'em_init_1',
        recipient: 'aditi.sharma@example.com',
        subject: 'Welcome to the Cow Town Sanctuary Family',
        templateType: 'membership_welcome',
        sentAt: '2025-11-15T10:05:00Z',
        status: 'delivered',
        contentPreview: 'Pranam Aditi, your Family Custodian membership is active. Certificate ID: CTS-GOLD-2025-412.',
      }
    ];
  });

  const [auditLogs, setAuditLogs] = useState<AuditLog[]>(() => {
    const saved = localStorage.getItem('cts_audit_logs');
    return saved ? JSON.parse(saved) : [
      {
        id: 'aud_1',
        timestamp: new Date().toISOString(),
        user: 'System Setup',
        action: 'System Initialized',
        details: 'Loaded 6 indigenous cows, 6 farm products, and initial sanctuary schemas.',
        ipAddress: '127.0.0.1',
      }
    ];
  });

  const [notification, setNotification] = useState<string | null>(null);

  const showNotification = (msg: string) => {
    setNotification(msg);
    setTimeout(() => {
      setNotification((curr) => (curr === msg ? null : curr));
    }, 4500);
  };

  const addAuditLog = (action: string, details: string) => {
    const newLog: AuditLog = {
      id: `aud_${Date.now()}`,
      timestamp: new Date().toISOString(),
      user: currentUser ? currentUser.name : 'Guest/Visitor',
      action,
      details,
      ipAddress: '192.168.1.1',
    };
    setAuditLogs((prev) => [newLog, ...prev]);
  };

  // Sync state to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('cts_user', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('cts_user');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('cts_products', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('cts_cows', JSON.stringify(cows));
  }, [cows]);

  useEffect(() => {
    localStorage.setItem('cts_ownership_records', JSON.stringify(ownershipRecords));
  }, [ownershipRecords]);

  useEffect(() => {
    localStorage.setItem('cts_user_membership', JSON.stringify(userMembership));
  }, [userMembership]);

  useEffect(() => {
    localStorage.setItem('cts_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('cts_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('cts_bookings', JSON.stringify(bookings));
  }, [bookings]);

  useEffect(() => {
    localStorage.setItem('cts_settings', JSON.stringify(siteSettings));
  }, [siteSettings]);

  useEffect(() => {
    localStorage.setItem('cts_email_logs', JSON.stringify(emailLogs));
  }, [emailLogs]);

  useEffect(() => {
    localStorage.setItem('cts_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  const switchUserRole = (role: 'customer' | 'admin' | 'guest') => {
    if (role === 'guest') {
      setCurrentUser(null);
      showNotification('Browsing as Guest Visitor');
    } else if (role === 'admin') {
      const adminUser: User = {
        id: 'usr_admin_ops',
        name: 'Sanctuary Director (Admin)',
        email: 'director@cowtownsanctuary.com',
        phone: '+91 800 269 8696',
        role: 'admin',
        createdAt: '2024-01-01T00:00:00Z',
      };
      setCurrentUser(adminUser);
      showNotification('Switched to Admin Role: Accessing Sanctuary Operations CMS');
      addAuditLog('Admin Session Started', 'Switched to Sanctuary Director privileges');
    } else {
      setCurrentUser(INITIAL_USER);
      showNotification('Signed in as Aditi Sharma (Family Custodian)');
    }
  };

  // Cart Calculations
  const cartSubtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const cartDiscount = appliedCoupon
    ? Math.min(
        (cartSubtotal * appliedCoupon.discountPercentage) / 100,
        appliedCoupon.maxDiscount || Infinity
      )
    : 0;

  const cartShipping =
    cartSubtotal === 0 || cartSubtotal >= siteSettings.freeShippingThreshold
      ? 0
      : siteSettings.standardShippingFee;

  const cartTotal = Math.max(0, cartSubtotal - cartDiscount + cartShipping);

  const addToCart = (product: Product, quantity = 1, variantId?: string) => {
    const variant = variantId
      ? product.variants.find((v) => v.id === variantId)
      : product.variants[0];

    const price = variant ? variant.price : product.price;
    const variantName = variant ? variant.name : undefined;
    const itemId = `${product.id}_${variantId || 'default'}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === itemId);
      if (existing) {
        return prev.map((item) =>
          item.id === itemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: itemId,
          productId: product.id,
          product,
          variantId,
          variantName,
          price,
          quantity,
        },
      ];
    });

    showNotification(`Added ${product.name} (${quantity}) to cart`);
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, quantity } : item))
    );
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== itemId));
    showNotification('Item removed from cart');
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const applyCoupon = (code: string) => {
    const cleanCode = code.trim().toUpperCase();
    const found = coupons.find((c) => c.code.toUpperCase() === cleanCode);

    if (!found) {
      return { success: false, message: 'Invalid coupon code.' };
    }

    if (cartSubtotal < found.minOrderValue) {
      return {
        success: false,
        message: `Coupon requires minimum order value of ₹${found.minOrderValue}.`,
      };
    }

    setAppliedCoupon(found);
    showNotification(`Coupon ${found.code} applied! Saved ₹${Math.round((cartSubtotal * found.discountPercentage) / 100)}`);
    return { success: true, message: `Coupon applied: ${found.discountPercentage}% discount!` };
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showNotification('Coupon removed');
  };

  // Orders
  const createOrder = async (
    shippingAddress: Address,
    paymentMethod: 'razorpay' | 'cod',
    notes?: string
  ): Promise<Order> => {
    const orderNumber = `CTS-ORD-${1000 + orders.length + 1}`;
    const newOrder: Order = {
      id: `ord_${Date.now()}`,
      orderNumber,
      userId: currentUser ? currentUser.id : 'usr_guest',
      customerName: shippingAddress.fullName,
      customerEmail: currentUser ? currentUser.email : 'guest@example.com',
      customerPhone: shippingAddress.phone,
      shippingAddress,
      items: cart.map((item) => ({
        productId: item.productId,
        productName: item.product.name,
        variantName: item.variantName,
        price: item.price,
        quantity: item.quantity,
        subtotal: item.price * item.quantity,
        imageUrl: item.product.imageUrl,
      })),
      subtotal: cartSubtotal,
      discount: cartDiscount,
      shippingFee: cartShipping,
      total: cartTotal,
      paymentMethod,
      paymentStatus: paymentMethod === 'razorpay' ? 'paid' : 'pending',
      paymentId: paymentMethod === 'razorpay' ? `pay_rzp_${Date.now()}` : undefined,
      razorpayOrderId: paymentMethod === 'razorpay' ? `order_rzp_${Date.now()}` : undefined,
      orderStatus: 'confirmed',
      notes,
      trackingNumber: `DELHIVERY-${orderNumber}`,
      createdAt: new Date().toISOString(),
    };

    setOrders((prev) => [newOrder, ...prev]);

    // Send simulated email
    const emailLog: EmailLog = {
      id: `em_${Date.now()}`,
      recipient: newOrder.customerEmail,
      subject: `Order Confirmation: ${orderNumber} - Cow Town Sanctuary`,
      templateType: 'order_confirmed',
      sentAt: new Date().toISOString(),
      status: 'delivered',
      contentPreview: `Thank you for supporting Cow Town Sanctuary. Your order ${orderNumber} for ₹${newOrder.total} is confirmed and scheduled for dispatch via express cold/dry transit.`,
    };
    setEmailLogs((prev) => [emailLog, ...prev]);

    addAuditLog('Order Created', `Order ${orderNumber} created for amount ₹${newOrder.total}`);
    clearCart();
    return newOrder;
  };

  const updateOrderStatus = (
    orderId: string,
    status: Order['orderStatus'],
    trackingNumber?: string
  ) => {
    setOrders((prev) =>
      prev.map((o) =>
        o.id === orderId
          ? {
              ...o,
              orderStatus: status,
              trackingNumber: trackingNumber || o.trackingNumber,
            }
          : o
      )
    );
    addAuditLog('Order Updated', `Order ${orderId} status changed to ${status}`);
    showNotification(`Order status updated to ${status}`);
  };

  // Tourism Booking
  const bookTour = async (
    packageId: string,
    bookingDate: string,
    timeSlot: string,
    adultsCount: number,
    childrenCount: number,
    specialRequests?: string
  ): Promise<TourBooking> => {
    const pkg = tourPackages.find((p) => p.id === packageId);
    if (!pkg) throw new Error('Package not found');

    const totalGuests = adultsCount + childrenCount;
    const totalAmount =
      adultsCount * pkg.pricePerAdult + childrenCount * pkg.pricePerChild;
    const bookingRef = `CTS-TOUR-${Math.floor(100 + Math.random() * 900)}`;

    const newBooking: TourBooking = {
      id: `bk_${Date.now()}`,
      bookingRef,
      userId: currentUser ? currentUser.id : 'usr_guest',
      userName: currentUser ? currentUser.name : 'Guest Visitor',
      userEmail: currentUser ? currentUser.email : 'guest@example.com',
      userPhone: currentUser ? currentUser.phone : '+91 99999 88888',
      packageId,
      packageTitle: pkg.title,
      bookingDate,
      timeSlot,
      adultsCount,
      childrenCount,
      totalGuests,
      totalAmount,
      paymentStatus: 'paid',
      paymentId: `pay_tour_${Date.now()}`,
      bookingStatus: 'confirmed',
      specialRequests,
      createdAt: new Date().toISOString(),
    };

    setBookings((prev) => [newBooking, ...prev]);

    // Send confirmation email
    const emailLog: EmailLog = {
      id: `em_${Date.now()}`,
      recipient: newBooking.userEmail,
      subject: `Tour Pass Confirmed: ${pkg.title} (${bookingRef})`,
      templateType: 'booking_confirmed',
      sentAt: new Date().toISOString(),
      status: 'delivered',
      contentPreview: `Your visit pass for ${newBooking.totalGuests} guests on ${bookingDate} (${timeSlot}) is confirmed. Please show this ref ${bookingRef} at the Sanctuary Reception Gate.`,
    };
    setEmailLogs((prev) => [emailLog, ...prev]);

    addAuditLog(
      'Tour Booked',
      `Booking ${bookingRef} for ${pkg.title} on ${bookingDate} by ${newBooking.userName}`
    );

    return newBooking;
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, bookingStatus: 'cancelled' } : b))
    );
    showNotification('Booking cancelled');
    addAuditLog('Tour Booking Cancelled', `Booking ${bookingId} was marked as cancelled.`);
  };

  // Cow Care & Adoption
  const adoptCow = (
    cowId: string,
    planId: string,
    billingCycle: 'monthly' | 'annual'
  ): boolean => {
    const cow = cows.find((c) => c.id === cowId);
    const plan = carePlans.find((p) => p.id === planId);
    if (!cow || !plan || !currentUser) return false;

    const monthlyAmount =
      billingCycle === 'annual' ? plan.annualFee / 12 : plan.monthlyFee;
    const certNum = `CTS-${plan.type === 'elder_care' ? 'ELDER' : 'CUST'}-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newRecord: CowOwnershipRecord = {
      id: `own_rec_${Date.now()}`,
      userId: currentUser.id,
      userName: currentUser.name,
      userEmail: currentUser.email,
      cowId: cow.id,
      cowName: cow.name,
      cowTag: cow.tagNumber,
      planId: plan.id,
      planTitle: plan.title,
      planType: plan.type === 'elder_care' ? 'elder_care' : 'ownership',
      monthlyAmount,
      billingCycle,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      nextRenewalDate: new Date(Date.now() + 30 * 24 * 3600 * 1000)
        .toISOString()
        .split('T')[0],
      certificateNumber: certNum,
      monthlyGheeAllotmentKg: plan.type === 'family_ownership' ? 0.5 : 0,
      allowedVisitsPerYear: plan.type === 'family_ownership' ? 12 : 6,
      visitsUsed: 0,
    };

    setOwnershipRecords((prev) => [newRecord, ...prev]);

    // Update cow state
    setCows((prev) =>
      prev.map((c) =>
        c.id === cowId
          ? {
              ...c,
              currentSponsorId: currentUser.id,
              currentSponsorName: `${currentUser.name} (${plan.type === 'elder_care' ? 'Elder Care Patron' : 'Family Co-Custodian'})`,
            }
          : c
      )
    );

    // Email dispatch
    const emailLog: EmailLog = {
      id: `em_${Date.now()}`,
      recipient: currentUser.email,
      subject: `Cow Care Confirmation: Certificate ${certNum} for ${cow.name}`,
      templateType: 'care_plan_started',
      sentAt: new Date().toISOString(),
      status: 'delivered',
      contentPreview: `Pranam ${currentUser.name}, you are now the lifelong guardian of ${cow.name} (${cow.tagNumber}) under the ${plan.title}. Certificate ${certNum} generated.`,
    };
    setEmailLogs((prev) => [emailLog, ...prev]);

    addAuditLog(
      'Cow Care Started',
      `${currentUser.name} enrolled ${cow.name} under ${plan.title}`
    );
    showNotification(`Congratulations! You are now the proud custodian of ${cow.name}!`);
    return true;
  };

  // Membership
  const subscribeMembership = (planId: string): boolean => {
    const plan = membershipPlans.find((p) => p.id === planId);
    if (!plan || !currentUser) return false;

    const startDate = new Date();
    const expiryDate = new Date();
    expiryDate.setFullYear(startDate.getFullYear() + 1);

    const memberIdCard = `CTS-${plan.tier.toUpperCase()}-${new Date().getFullYear()}-${Math.floor(100 + Math.random() * 900)}`;

    const newMembership: UserMembership = {
      id: `mem_${Date.now()}`,
      userId: currentUser.id,
      planId: plan.id,
      planName: `${plan.name} Membership`,
      annualFee: plan.annualFee,
      startDate: startDate.toISOString().split('T')[0],
      expiryDate: expiryDate.toISOString().split('T')[0],
      status: 'active',
      gheeQuotaUsedKg: 0,
      gheeQuotaTotalKg: plan.gheeQuotaKg,
      freeVisitsRemaining: plan.freeVisitsCount,
      totalVisitsAllowed: plan.freeVisitsCount,
      memberIdCard,
    };

    setUserMembership(newMembership);

    const emailLog: EmailLog = {
      id: `em_${Date.now()}`,
      recipient: currentUser.email,
      subject: `Welcome to Cow Town Membership: ${plan.name}`,
      templateType: 'membership_welcome',
      sentAt: new Date().toISOString(),
      status: 'delivered',
      contentPreview: `Pranam ${currentUser.name}, your ${plan.name} annual membership is active! Member ID: ${memberIdCard}. Enjoy annual A2 Ghee quotas, priority visit passes, and 15% store privileges.`,
    };
    setEmailLogs((prev) => [emailLog, ...prev]);

    addAuditLog('Membership Activated', `${currentUser.name} purchased ${plan.name}`);
    showNotification(`Welcome to ${plan.name}! Your membership is active.`);
    return true;
  };

  // Admin CMS handlers
  const updateProduct = (updated: Product) => {
    setProducts((prev) => prev.map((p) => (p.id === updated.id ? updated : p)));
    addAuditLog('Product Updated', `Updated catalog details for ${updated.name}`);
    showNotification('Product details saved successfully');
  };

  const addProduct = (item: Omit<Product, 'id'>) => {
    const id = `prod_${Date.now()}`;
    const newProd: Product = { ...item, id };
    setProducts((prev) => [newProd, ...prev]);
    addAuditLog('Product Created', `Added new product: ${item.name}`);
    showNotification(`Product ${item.name} added to catalog`);
  };

  const deleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    addAuditLog('Product Deleted', `Deleted product ID: ${id}`);
    showNotification('Product removed from catalog');
  };

  const updateCow = (updated: Cow) => {
    setCows((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
    addAuditLog('Cow Record Updated', `Updated dossier for ${updated.name}`);
    showNotification(`Dossier for ${updated.name} updated`);
  };

  const addCow = (item: Omit<Cow, 'id'>) => {
    const id = `cow_${Date.now()}`;
    const newCow: Cow = { ...item, id };
    setCows((prev) => [newCow, ...prev]);
    addAuditLog('Cow Registered', `Registered new resident cow: ${item.name}`);
    showNotification(`New cow ${item.name} added to sanctuary`);
  };

  const addCowUpdate = (
    cowId: string,
    title: string,
    summary: string,
    vetNotes?: string
  ) => {
    const newUpdate = {
      id: `upd_${Date.now()}`,
      cowId,
      date: new Date().toISOString().split('T')[0],
      title,
      summary,
      vetNotes,
    };
    setCows((prev) =>
      prev.map((c) =>
        c.id === cowId ? { ...c, updates: [newUpdate, ...c.updates] } : c
      )
    );
    addAuditLog('Cow Health Update Published', `Added health note for cow ${cowId}`);
    showNotification('Health & pasture update published for sponsors');
  };

  const updateSiteSettings = (settings: Partial<SiteSettings>) => {
    setSiteSettings((prev) => ({ ...prev, ...settings }));
    addAuditLog('Site Settings Updated', 'Modified sanctuary operational parameters');
    showNotification('Site settings updated');
  };

  return (
    <AppContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        switchUserRole,
        products,
        categories,
        updateProduct,
        addProduct,
        deleteProduct,
        cows,
        carePlans,
        ownershipRecords,
        updateCow,
        addCow,
        addCowUpdate,
        adoptCow,
        membershipPlans,
        userMembership,
        subscribeMembership,
        cart,
        addToCart,
        updateCartQuantity,
        removeFromCart,
        clearCart,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        cartSubtotal,
        cartDiscount,
        cartShipping,
        cartTotal,
        orders,
        createOrder,
        updateOrderStatus,
        tourPackages,
        bookings,
        bookTour,
        cancelBooking,
        siteSettings,
        updateSiteSettings,
        faqs,
        testimonials,
        coupons,
        emailLogs,
        auditLogs,
        addAuditLog,
        notification,
        showNotification,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
