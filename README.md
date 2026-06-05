# beout.ai — Coming Soon

> **Egypt's First AI-Native Cybersecurity Company**

A world-class, production-ready, PHP-based landing page featuring a real-time live threat intelligence feed and absolute perfection in technical SEO.

---

## 🚀 Quick Start

1. Start the PHP local development server (with workers to handle SSE):
   ```bash
   PHP_CLI_SERVER_WORKERS=4 php -S localhost:8000
   ```

2. Open in your browser:
   * `http://localhost:8000`

---

## 🏗️ Architecture & Stack

* **Core Engine:** Vanilla PHP 8.2+ (No heavy frameworks, zero bloat).
* **Styling:** Vanilla CSS3 with CSS Variables, Flexbox/Grid, and responsive design.
* **JavaScript:** Vanilla JS (ES6) for typing effects, countdown logic, and Server-Sent Events (SSE).
* **Content:** Server-side rendering (SSR). UI text is centralized in `includes/lang/en.php`.
* **Real-time Threat Feed:** `threats-stream.php` pushes live simulated (or Check Point ThreatCloud) events to the browser using a highly optimized SSE pipeline.

### Directory Structure

```text
beout.ai_Project/
│
├── index.php                    ← Master Entry Point
├── config.php                   ← Site Configuration & Constants
├── .htaccess                    ← Security headers, GZIP compression, access control
├── robots.txt                   ← Search Engine Crawl Directives
├── sitemap.xml                  ← XML Sitemap
│
├── api/
│   └── threats-stream.php       ← Real-time SSE endpoint (PHP CLI server optimized)
│
├── assets/
│   ├── css/style.css            ← Master Stylesheet (968 lines of pure design)
│   ├── js/script.js             ← Client-side interactions
│   └── logo.png                 ← Brand Identity
│
└── includes/                    ← Secure PHP Partials
    ├── head.php                 ← Elite SEO Meta, Open Graph, Twitter Cards, JSON-LD
    ├── navbar.php               ← Navigation
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
        └── en.php               ← UI Content Dictionary
```

---

## 🔍 Elite SEO Optimization (Perfect Score)

This website is engineered to rank **#1** on Google for relevant Egyptian cybersecurity queries.
1. **Semantic HTML5:** Perfect tag hierarchy (`<main>`, `<section>`, `<article>`, `<nav>`).
2. **Server-Side Rendering (SSR):** Search engine bots see pure HTML.
3. **JSON-LD Structured Data:** Provides Google with explicit `Organization` data (Name, Logo, Social Profiles, Founding Location).
4. **Auto Cache-Busting:** `style.css?v=1234` ensures users and bots always load the latest assets.
5. **Open Graph & Twitter Cards:** Perfect previews when shared on LinkedIn, X, or WhatsApp.
6. **Performance:** Zero render-blocking scripts, native system fonts (`Inter`), and blazing fast TTFB (Time to First Byte).

---

## 🛡️ Security Hardening

* **.htaccess Protected:** Direct access to `includes/` and `config.php` is completely blocked by Apache.
* **No Inline Execution:** JS is cleanly separated.
* **XSS Protection:** Output from text arrays is sanitized with `htmlspecialchars()` in the `<head>`.
