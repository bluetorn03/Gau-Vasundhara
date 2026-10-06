-- =====================================================================
-- COW TOWN SANCTUARY LTD - PRODUCTION MYSQL DATABASE SCHEMA
-- Target Environment: Hostinger Business Shared Hosting (MySQL 8.0 / MariaDB 10.6+)
-- Database Management: phpMyAdmin
-- =====================================================================

SET FOREIGN_KEY_CHECKS = 0;
DROP TABLE IF EXISTS audit_logs;
DROP TABLE IF EXISTS email_logs;
DROP TABLE IF EXISTS booking_guests;
DROP TABLE IF EXISTS bookings;
DROP TABLE IF EXISTS tour_slots;
DROP TABLE IF EXISTS tour_packages;
DROP TABLE IF EXISTS user_memberships;
DROP TABLE IF EXISTS membership_plans;
DROP TABLE IF EXISTS cow_updates;
DROP TABLE IF EXISTS cow_ownerships;
DROP TABLE IF EXISTS cow_care_plans;
DROP TABLE IF EXISTS cows;
DROP TABLE IF EXISTS coupons;
DROP TABLE IF EXISTS order_items;
DROP TABLE IF EXISTS orders;
DROP TABLE IF EXISTS cart_items;
DROP TABLE IF EXISTS carts;
DROP TABLE IF EXISTS product_variants;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS product_categories;
DROP TABLE IF EXISTS addresses;
DROP TABLE IF EXISTS users;
SET FOREIGN_KEY_CHECKS = 1;

-- 1. USERS & AUTHENTICATION
CREATE TABLE users (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  role ENUM('customer', 'admin', 'staff') DEFAULT 'customer',
  avatar_url VARCHAR(500),
  remember_token VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_users_email (email),
  INDEX idx_users_role (role)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 2. ADDRESSES
CREATE TABLE addresses (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  phone VARCHAR(50) NOT NULL,
  line1 VARCHAR(255) NOT NULL,
  line2 VARCHAR(255),
  city VARCHAR(100) NOT NULL,
  state VARCHAR(100) NOT NULL,
  postal_code VARCHAR(20) NOT NULL,
  is_default BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_addresses_user (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 3. PRODUCT CATEGORIES
CREATE TABLE product_categories (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  description TEXT,
  item_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 4. PRODUCTS
CREATE TABLE products (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  category_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  tagline VARCHAR(255),
  description TEXT NOT NULL,
  long_description LONGTEXT,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  rating DECIMAL(3,2) DEFAULT 5.00,
  review_count INT DEFAULT 0,
  in_stock BOOLEAN DEFAULT TRUE,
  stock_qty INT DEFAULT 50,
  net_weight VARCHAR(50),
  image_url VARCHAR(500) NOT NULL,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (category_id) REFERENCES product_categories(id) ON DELETE RESTRICT,
  INDEX idx_products_category (category_id),
  INDEX idx_products_slug (slug),
  INDEX idx_products_featured (is_featured)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 5. PRODUCT VARIANTS
CREATE TABLE product_variants (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  product_id BIGINT UNSIGNED NOT NULL,
  name VARCHAR(255) NOT NULL,
  sku VARCHAR(100) UNIQUE NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  original_price DECIMAL(10,2),
  stock INT DEFAULT 20,
  size VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 6. COUPONS
CREATE TABLE coupons (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) UNIQUE NOT NULL,
  discount_percentage INT NOT NULL,
  max_discount DECIMAL(10,2),
  min_order_value DECIMAL(10,2) DEFAULT 0,
  description VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 7. ORDERS & PAYMENTS
CREATE TABLE orders (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_number VARCHAR(100) UNIQUE NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  customer_name VARCHAR(255) NOT NULL,
  customer_email VARCHAR(255) NOT NULL,
  customer_phone VARCHAR(50) NOT NULL,
  shipping_address_json JSON NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  discount DECIMAL(10,2) DEFAULT 0,
  shipping_fee DECIMAL(10,2) DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  payment_method ENUM('razorpay', 'cod') NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'pending',
  payment_id VARCHAR(255),
  razorpay_order_id VARCHAR(255),
  order_status ENUM('confirmed', 'processing', 'shipped', 'delivered', 'cancelled') DEFAULT 'confirmed',
  tracking_number VARCHAR(100),
  notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
  INDEX idx_orders_number (order_number),
  INDEX idx_orders_status (order_status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 8. ORDER ITEMS
CREATE TABLE order_items (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  order_id BIGINT UNSIGNED NOT NULL,
  product_id BIGINT UNSIGNED NOT NULL,
  product_name VARCHAR(255) NOT NULL,
  variant_name VARCHAR(255),
  price DECIMAL(10,2) NOT NULL,
  quantity INT NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 9. COWS
CREATE TABLE cows (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  tag_number VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  breed ENUM('Gir', 'Sahiwal', 'Tharparkar', 'Kankrej', 'Red Sindhi', 'Rathi') NOT NULL,
  gender ENUM('female', 'male') NOT NULL,
  age_years INT NOT NULL,
  birth_year INT NOT NULL,
  category ENUM('resident', 'elder', 'calf', 'rescued', 'mother') DEFAULT 'resident',
  temperament TEXT,
  favorite_food VARCHAR(255),
  story LONGTEXT,
  health_status ENUM('healthy', 'elder_care', 'special_diet', 'under_vet_observation') DEFAULT 'healthy',
  image_url VARCHAR(500) NOT NULL,
  is_available_for_ownership BOOLEAN DEFAULT TRUE,
  is_elder_care_program BOOLEAN DEFAULT FALSE,
  monthly_care_cost DECIMAL(10,2) NOT NULL,
  current_sponsor_id BIGINT UNSIGNED,
  current_sponsor_name VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_cows_tag (tag_number),
  INDEX idx_cows_breed (breed),
  INDEX idx_cows_category (category)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 10. COW OWNERSHIP & CARE SUBSCRIPTIONS
CREATE TABLE cow_ownerships (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  cow_id BIGINT UNSIGNED NOT NULL,
  cow_name VARCHAR(255) NOT NULL,
  cow_tag VARCHAR(50) NOT NULL,
  plan_type ENUM('ownership', 'elder_care') NOT NULL,
  monthly_amount DECIMAL(10,2) NOT NULL,
  billing_cycle ENUM('monthly', 'annual') DEFAULT 'monthly',
  status ENUM('active', 'paused', 'completed') DEFAULT 'active',
  start_date DATE NOT NULL,
  next_renewal_date DATE NOT NULL,
  certificate_number VARCHAR(100) UNIQUE NOT NULL,
  monthly_ghee_allotment_kg DECIMAL(4,2) DEFAULT 0.50,
  allowed_visits_per_year INT DEFAULT 12,
  visits_used INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (cow_id) REFERENCES cows(id) ON DELETE CASCADE,
  INDEX idx_ownership_cert (certificate_number)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 11. COW UPDATES & VET DOSSIERS
CREATE TABLE cow_updates (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  cow_id BIGINT UNSIGNED NOT NULL,
  date DATE NOT NULL,
  title VARCHAR(255) NOT NULL,
  summary TEXT NOT NULL,
  vet_notes TEXT,
  image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (cow_id) REFERENCES cows(id) ON DELETE CASCADE,
  INDEX idx_cow_updates_cow (cow_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 12. MEMBERSHIP PLANS
CREATE TABLE membership_plans (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  tier ENUM('silver', 'gold', 'patron') NOT NULL,
  annual_fee DECIMAL(10,2) NOT NULL,
  tagline VARCHAR(255),
  description TEXT,
  ghee_quota_kg DECIMAL(4,2) NOT NULL,
  free_visits_count INT NOT NULL,
  product_discount_percent INT DEFAULT 10,
  is_recommended BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 13. USER MEMBERSHIPS
CREATE TABLE user_memberships (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  user_id BIGINT UNSIGNED NOT NULL,
  plan_id BIGINT UNSIGNED NOT NULL,
  plan_name VARCHAR(255) NOT NULL,
  annual_fee DECIMAL(10,2) NOT NULL,
  start_date DATE NOT NULL,
  expiry_date DATE NOT NULL,
  status ENUM('active', 'expired') DEFAULT 'active',
  ghee_quota_used_kg DECIMAL(4,2) DEFAULT 0,
  ghee_quota_total_kg DECIMAL(4,2) NOT NULL,
  free_visits_remaining INT NOT NULL,
  total_visits_allowed INT NOT NULL,
  member_id_card VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (plan_id) REFERENCES membership_plans(id) ON DELETE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 14. TOUR PACKAGES
CREATE TABLE tour_packages (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  tagline VARCHAR(255),
  duration_hours INT NOT NULL,
  price_per_adult DECIMAL(10,2) NOT NULL,
  price_per_child DECIMAL(10,2) NOT NULL,
  min_guests INT DEFAULT 1,
  max_guests INT DEFAULT 40,
  description LONGTEXT NOT NULL,
  timing VARCHAR(100) NOT NULL,
  image_url VARCHAR(500) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 15. TOUR BOOKINGS
CREATE TABLE bookings (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  booking_ref VARCHAR(100) UNIQUE NOT NULL,
  user_id BIGINT UNSIGNED NOT NULL,
  user_name VARCHAR(255) NOT NULL,
  user_email VARCHAR(255) NOT NULL,
  user_phone VARCHAR(50) NOT NULL,
  package_id BIGINT UNSIGNED NOT NULL,
  package_title VARCHAR(255) NOT NULL,
  booking_date DATE NOT NULL,
  time_slot VARCHAR(100) NOT NULL,
  adults_count INT NOT NULL,
  children_count INT DEFAULT 0,
  total_guests INT NOT NULL,
  total_amount DECIMAL(10,2) NOT NULL,
  payment_status ENUM('pending', 'paid', 'failed', 'refunded') DEFAULT 'paid',
  payment_id VARCHAR(255),
  booking_status ENUM('confirmed', 'completed', 'cancelled') DEFAULT 'confirmed',
  special_requests TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE RESTRICT,
  FOREIGN KEY (package_id) REFERENCES tour_packages(id) ON DELETE RESTRICT,
  INDEX idx_bookings_ref (booking_ref)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- 16. AUDIT & EMAIL LOGS
CREATE TABLE email_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  recipient VARCHAR(255) NOT NULL,
  subject VARCHAR(255) NOT NULL,
  template_type VARCHAR(100) NOT NULL,
  content_preview TEXT,
  status ENUM('delivered', 'queued', 'failed') DEFAULT 'delivered',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE audit_logs (
  id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  operator_name VARCHAR(255) NOT NULL,
  action VARCHAR(255) NOT NULL,
  details TEXT,
  ip_address VARCHAR(45),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- =====================================================================
-- INITIAL SEED DATA INSERTION
-- =====================================================================
INSERT INTO users (id, name, email, password, phone, role) VALUES
(1, 'Aditi Sharma', 'aditi.sharma@example.com', '$2y$12$e8pA7nZ.mockHashedPasswordForCustomer', '+91 98201 54321', 'customer'),
(2, 'Sanctuary Director', 'director@cowtownsanctuary.com', '$2y$12$e8pA7nZ.mockHashedPasswordForAdmin', '+91 800 269 8696', 'admin');

INSERT INTO product_categories (id, name, slug, description, item_count) VALUES
(1, 'A2 Vedic Bilona Ghee', 'a2-bilona-ghee', 'Curd-churned golden elixir from free-range Gir cows.', 2),
(2, 'Sacred Home & Puja', 'sacred-home-puja', 'Natural cow dung sambrani cups, dhoop, and seed pots.', 2),
(3, 'Sanctuary Farm Harvest', 'sanctuary-farm-harvest', 'Cold-pressed oils, raw mustard bloom honey.', 1),
(4, 'Gau Wellness & Personal Care', 'gau-wellness', 'Herbal abhyanga oils and cold-process soaps.', 1);

INSERT INTO products (id, category_id, name, slug, tagline, description, price, in_stock, stock_qty, net_weight, image_url, is_featured) VALUES
(1, 1, 'A2 Vedic Cultured Gir Cow Bilona Ghee', 'a2-gir-bilona-ghee-500ml', 'Hand-churned from cultured curd in earthen bilona pots over slow woodfire.', 'Whole A2 milk from free-range Gir cows is boiled over gentle firewood, cultured overnight into curd, and hand-churned in wooden vats.', 1450.00, TRUE, 85, '500 ml', 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?auto=format&fit=crop&w=800&q=80', TRUE),
(2, 2, 'Handcrafted Gomaya Herbal Sambrani Cups', 'gomaya-herbal-sambrani-cups', 'Natural cow dung cups filled with loban, camphor, and guggal.', 'Natural space cleansing and air purification with zero charcoal.', 360.00, TRUE, 120, 'Box of 12 Cups', 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=800&q=80', TRUE),
(3, 3, 'Raw Sanctuary Mustard Bloom Honey', 'raw-mustard-bloom-honey-500g', 'Single-origin unheated honey harvested from our farm apiary.', 'Cold-extracted raw honey from pesticide-free organic mustard fields.', 520.00, TRUE, 54, '500 grams', 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?auto=format&fit=crop&w=800&q=80', TRUE);

INSERT INTO cows (id, tag_number, name, breed, gender, age_years, birth_year, category, favorite_food, temperament, story, health_status, image_url, is_available_for_ownership, is_elder_care_program, monthly_care_cost) VALUES
(1, 'CT-GIR-014', 'Ganga', 'Gir', 'female', 5, 2021, 'resident', 'Fresh green lucerne, sweet jaggery', 'Gentle, affectionate, loves neck scratches', 'Ganga leads the herd to eastern clover pastures each morning with her calf Nandini.', 'healthy', 'https://images.unsplash.com/photo-1546445317-29f4545e9d53?auto=format&fit=crop&w=800&q=80', TRUE, FALSE, 3500.00),
(2, 'CT-SAH-007', 'Nandi', 'Sahiwal', 'male', 4, 2022, 'resident', 'Mustard cake and sorghum stalks', 'Playful guardian with prominent hump', 'Nandi is the protector spirit of the sanctuary perimeter.', 'healthy', 'https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&w=800&q=80', TRUE, FALSE, 4000.00),
(3, 'CT-ELD-029', 'Kamadhenu', 'Tharparkar', 'female', 16, 2010, 'elder', 'Steamed mash of barley, fennel, and jaggery', 'Deeply calm matriarch', 'Retired matriarch receiving soft bedding and warm herbal joint therapy.', 'elder_care', 'https://images.unsplash.com/photo-1527153857715-3908f2bae5e8?auto=format&fit=crop&w=800&q=80', FALSE, TRUE, 2800.00);

INSERT INTO coupons (code, discount_percentage, max_discount, min_order_value, description) VALUES
('WELCOMEGAU', 10, 500.00, 999.00, '10% off on your first order'),
('GAU2026', 15, 1000.00, 2000.00, '15% patron discount');
