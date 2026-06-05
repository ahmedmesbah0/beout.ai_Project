# beout.ai — Coming Soon

> **Egypt's First AI-Native Cybersecurity Company**

A world-class, production-ready, PHP-based landing page featuring a real-time live threat intelligence feed and absolute perfection in technical SEO.

---

## Quick Start

1. Start the PHP local development server (with workers to handle SSE):
   ```bash
   PHP_CLI_SERVER_WORKERS=4 php -S localhost:8000
   ```

2. Open in your browser:
   * `http://localhost:8000`

---

## Architecture & Stack

* **Core Engine:** Vanilla PHP 8.2+ (No heavy frameworks, zero bloat).
* **Styling:** Vanilla CSS3 with CSS Variables, Flexbox/Grid, and responsive design.
* **JavaScript:** Vanilla JS (ES6) for typing effects, countdown logic, particles, and Server-Sent Events (SSE).
* **Content:** Server-side rendering (SSR). UI text is centralized in `includes/lang/en.php` and `includes/lang/ar.php`.
* **Real-time Threat Feed:** `threats-stream.php` pushes live simulated threat events to the browser using a highly optimized SSE pipeline.
* **Email Signup:** Real backend API (`api/subscribe.php`) stores subscribers to `data/subscribers.json`.

### Directory Structure

```text
beout.ai_Project/
│
├── index.php                    ← Master Entry Point (SSR)
├── config.php                   ← Site Configuration, Constants & Language Detection
├── sitemap.php                  ← Dynamic XML Sitemap Generator
├── sitemap.xml                  ← → Rewrites to sitemap.php (via .htaccess)
├── 404.php                      ← Custom 404 Error Page
├── .htaccess                    ← Security headers, GZIP, access control, HSTS
├── robots.txt                   ← Search Engine Crawl Directives
│
├── api/
│   ├── threats-stream.php       ← Real-time SSE endpoint (threat feed)
│   └── subscribe.php            ← Email waitlist signup API
│
├── assets/
│   ├── css/style.css            ← Master Stylesheet (CSS3 + RTL support)
│   ├── js/script.js             ← Client-side interactions
│   └── logo.png                 ← Brand Identity
│
├── data/                        ← Protected data store (blocked by .htaccess)
│   └── subscribers.json         ← Waitlist subscriber records
│
└── includes/                    ← Secure PHP Partials (blocked by .htaccess)
    ├── head.php                 ← SEO Meta, Open Graph, Twitter Cards, JSON-LD
    ├── navbar.php               ← Navigation + Language Toggle
    ├── hero.php                 ← Hero Section (Orbs, Glowing Logo, Products)
    ├── countdown.php            ← Animated Countdown Timer
    ├── stats.php                ← Live Statistics
    ├── trust-strip.php          ← Compliance Badges (PDPL, ISO)
    ├── ticker.php               ← Live Threat Feed Bar
    ├── features.php             ← Grid of Capabilities
    ├── how-it-works.php         ← 3-Step Deployment Guide
    ├── signup.php               ← Waitlist Form
    ├── footer.php               ← Footer & Social Links
    └── lang/
        ├── en.php               ← English UI Content Dictionary
        └── ar.php               ← Arabic UI Content Dictionary (RTL)
```

---

## Production Deployment

### Apache (Recommended)

```bash
# 1. Copy files to your web root
cp -r beout.ai_Project/* /var/www/beout.ai/

# 2. Ensure .htaccess is enabled
sudo a2enmod rewrite headers expires deflate
sudo systemctl restart apache2

# 3. Set permissions
sudo chown -R www-data:www-data /var/www/beout.ai/
sudo chmod -R 755 /var/www/beout.ai/
sudo chmod 640 /var/www/beout.ai/data/subscribers.json
```

### Nginx

```nginx
server {
    listen 80;
    server_name beout.ai www.beout.ai;
    root /var/www/beout.ai;
    index index.php;

    location / {
        try_files $uri $uri/ /index.php?$query_string;
    }

    location ~ ^/(includes|config\.php|data/) {
        return 403;
    }

    location ~ \.php$ {
        fastcgi_pass unix:/var/run/php/php8.2-fpm.sock;
        fastcgi_index index.php;
        fastcgi_param SCRIPT_FILENAME $document_root$fastcgi_script_name;
        include fastcgi_params;
    }

    location ~* \.(png|jpg|svg|woff2)$ {
        expires 1M;
        add_header Cache-Control "public, immutable";
    }

    location ~* \.(css|js)$ {
        expires 1w;
        add_header Cache-Control "public";
    }

    add_header X-Content-Type-Options "nosniff";
    add_header X-Frame-Options "SAMEORIGIN";
    add_header Strict-Transport-Security "max-age=31536000; includeSubDomains";
}
```

---

## SEO Optimization

This website is engineered to rank #1 on Google for relevant Egyptian cybersecurity queries.

1. **Semantic HTML5:** Perfect tag hierarchy (`<main>`, `<section>`, `<article>`, `<nav>`).
2. **Server-Side Rendering (SSR):** Search engine bots see pure HTML.
3. **JSON-LD Structured Data:** Organization, WebSite, and WebPage schemas with Egyptian founding location.
4. **Hreflang Tags:** Full English + Arabic hreflang annotations for multi-language SEO.
5. **Dynamic Sitemap:** Auto-generated XML sitemap with both language variants.
6. **Open Graph & Twitter Cards:** 1200×630px social share image, image dimensions, Twitter site handle.
7. **Auto Cache-Busting:** `style.css?v=1234` ensures users and bots always load the latest assets.
8. **Performance:** Zero render-blocking scripts, system fonts, and blazing fast TTFB.
9. **Canonical URLs:** Proper canonicalization for all language variants.

---

## Internationalization (i18n)

The site supports **English** and **Arabic** (RTL) out of the box.

* **Language detection:** `?lang=ar` query parameter or `beout_lang` cookie.
* **Content files:** `includes/lang/en.php` and `includes/lang/ar.php`.
* **RTL Support:** Full CSS RTL support with mirrored layouts, animations, and icons.
* **Adding a language:** Create a new file in `includes/lang/` and add it to `config.php`.

---

## Security Hardening

* **.htaccess Protected:** Direct access to `includes/`, `config.php`, and `data/` is completely blocked.
* **HSTS Header:** `Strict-Transport-Security` with 1-year max-age and subdomains.
* **No Inline Execution:** JS is cleanly separated.
* **XSS Protection:** Output from text arrays is sanitized with `htmlspecialchars()`.
* **Email Validation:** Server-side validation with disposable email blocking.
* **IP Hashing:** Subscriber IPs are SHA-256 hashed before storage.
* **Data Protection:** `data/` directory is blocked from direct access.

---

## API Endpoints

| Endpoint | Method | Description |
|---|---|---|
| `/api/threats-stream.php` | GET (SSE) | Live threat intelligence feed |
| `/api/subscribe.php` | POST | Email waitlist signup |

### Subscribe API

```bash
curl -X POST https://beout.ai/api/subscribe.php \
  -H "Content-Type: application/json" \
  -d '{"email": "user@example.com"}'
```

Response:
```json
{"success": true, "message": "You are on the list!", "count": 1}
```

---

## License

GNU GPL v3 — see [LICENSE](LICENSE) for details.