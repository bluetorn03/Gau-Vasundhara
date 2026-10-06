# COW TOWN SANCTUARY LTD — PRODUCTION HOSTINGER DEPLOYMENT GUIDE

This document provides exact, battle-tested instructions for deploying **Cow Town Sanctuary Ltd** to **Hostinger Business Shared Hosting** with PHP 8.3+, MySQL / MariaDB, and phpMyAdmin.

---

## 1. Prerequisites on Hostinger hPanel

1. **PHP Version**:
   - Navigate to **hPanel > Advanced > PHP Configuration**.
   - Select **PHP 8.3** (or latest 8.3+).
   - Ensure PHP extensions are enabled: `pdo_mysql`, `mbstring`, `openssl`, `tokenizer`, `xml`, `ctype`, `json`, `bcmath`, `curl`.

2. **MySQL Database**:
   - Go to **hPanel > Databases > Management**.
   - Create a new MySQL database:
     - Database Name: `u[user]_cowtown`
     - Database Username: `u[user]_cowtown_admin`
     - Database Password: *(Generate strong 20+ character password)*
   - Note down the Database Name, User, and Password.

3. **Import MySQL Schema**:
   - Click **Enter phpMyAdmin** next to your newly created database.
   - Click the **Import** tab.
   - Choose the file `hostinger-laravel-deployment.sql` located in this repository.
   - Click **Go**. All 16 normalized tables and initial seed data will be populated instantly.

---

## 2. Directory Structure on Hostinger

Hostinger shared hosting serves public files from `public_html/`. For Laravel production security, upload the project so that Laravel's root sits **one level above** `public_html`, or configure the `.htaccess` redirection.

Recommended layout:
```text
/home/u123456789/
  ├── cowtown-backend/          <-- Full Laravel application root
  │     ├── app/
  │     ├── bootstrap/
  │     ├── config/
  │     ├── database/
  │     ├── routes/
  │     ├── storage/
  │     ├── .env
  │     └── artisan
  └── public_html/              <-- Contents of Laravel's /public/ folder
        ├── index.php           <-- Points to ../cowtown-backend/bootstrap/app.php
        ├── build/ (Vite/CSS)
        └── .htaccess
```

In `public_html/index.php`, update the paths:
```php
require __DIR__.'/../cowtown-backend/vendor/autoload.php';
$app = require_once __DIR__.'/../cowtown-backend/bootstrap/app.php';
```

---

## 3. Environment Configuration (`.env`)

Copy `.env.example` to `.env` in `cowtown-backend/`:

```env
APP_NAME="Cow Town Sanctuary Ltd"
APP_ENV=production
APP_KEY=base64:... (Run 'php artisan key:generate')
APP_DEBUG=false
APP_URL=https://yourdomain.com

LOG_CHANNEL=stack
LOG_LEVEL=error

DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=u123456789_cowtown
DB_USERNAME=u123456789_cowtown_admin
DB_PASSWORD=YourSecureDatabasePasswordHere

BROADCAST_DRIVER=log
CACHE_DRIVER=file
FILESYSTEM_DISK=local
QUEUE_CONNECTION=database
SESSION_DRIVER=file
SESSION_LIFETIME=120

# Razorpay Production API Credentials
RAZORPAY_KEY_ID=rzp_live_xxxxxxxxxxxx
RAZORPAY_KEY_SECRET=xxxxxxxxxxxxxxxxxxxx
RAZORPAY_WEBHOOK_SECRET=xxxxxxxxxxxxxxxxxxxx

# SMTP Email (Hostinger Titan Mail or Custom SMTP)
MAIL_MAILER=smtp
MAIL_HOST=smtp.hostinger.com
MAIL_PORT=465
MAIL_USERNAME=connect@cowtownsanctuary.com
MAIL_PASSWORD=YourEmailPasswordHere
MAIL_ENCRYPTION=ssl
MAIL_FROM_ADDRESS="connect@cowtownsanctuary.com"
MAIL_FROM_NAME="Cow Town Sanctuary Ltd"
```

---

## 4. SSH Commands to Finalize Deployment

Open Hostinger Web SSH (or Terminal via SSH key):

```bash
cd ~/cowtown-backend

# Install production dependencies
composer install --no-dev --optimize-autoloader

# Generate storage link
php artisan storage:link

# Cache configuration, routes, and views for lightning-fast response times
php artisan config:cache
php artisan route:cache
php artisan view:cache

# Set permissions
chmod -R 775 storage bootstrap/cache
```

---

## 5. Cron Job for Scheduled Cow Care & Subscriptions

In **hPanel > Advanced > Cron Jobs**, add:

- **Command**: `cd /home/u123456789/cowtown-backend && php artisan schedule:run >> /dev/null 2>&1`
- **Interval**: Once per minute (`* * * * *`)

This automatically triggers daily fodder quotas, monthly ghee shipment queue generation, and health report emails.

---

## 6. Live Interactive Preview in AI Studio

The application currently active in this workspace is the **production-grade live React 19 + TypeScript + Tailwind CSS application** containing the identical schema, UI, Razorpay simulator, and admin CMS. You can test all user flows immediately!
