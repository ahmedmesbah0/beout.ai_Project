# beout.ai — Coming Soon

> Egypt's First AI-Native Cybersecurity Company

Professional PHP-based landing page with live threat intelligence feed, bilingual support (EN/AR), and server-side rendering.

---

## Quick Start

```bash
# Start local dev server
php -S localhost:8000

# Open in browser
# English:  http://localhost:8000
# Arabic:   http://localhost:8000/?lang=ar
```

---

## Architecture

```
beout.ai_Project/
│
├── index.php                    ← Entry point (assembles partials)
├── config.php                   ← Site constants, language detection, asset versioning
├── .htaccess                    ← Security headers, compression, access control
│
├── includes/                    ← PHP partials (not accessible via HTTP)
│   ├── head.php                 ← SEO meta, hreflang, Open Graph, structured data
│   ├── navbar.php               ← Navigation + language toggle
│   ├── hero.php                 ← Hero section + logo + product pills
│   ├── countdown.php            ← Launch countdown timer
│   ├── signup.php               ← Email signup form
│   ├── ticker.php               ← Live threat feed bar
│   ├── stats.php                ← Statistics section
│   ├── features.php             ← Feature cards grid
│   ├── footer.php               ← Footer
│   ├── translator.php           ← Google Translate API service + caching
│   └── lang/
│       └── en.php               ← English strings (source of truth)
│
├── api/
│   └── threats-stream.php       ← SSE live threat intelligence stream
│
├── assets/
│   ├── css/style.css            ← Stylesheet
│   ├── js/script.js             ← Client-side JS (particles, countdown, SSE)
│   └── logo.png                 ← Logo
│
├── robots.txt                   ← Search engine directives
├── sitemap.xml                  ← XML sitemap with hreflang
├── LICENSE                      ← License
└── .gitignore
```

---

## Features

### Bilingual (EN / AR)
- **English** is the source language — maintained in `includes/lang/en.php`
- **Arabic** is **auto-translated** via Google Translate API at runtime
- Translations are cached in `includes/lang/.cache_en_ar.json` (auto-generated, gitignored)
- Language detected from: `?lang=` param → cookie → browser `Accept-Language` header
- Toggle: click the language button in the navbar (page reloads with `?lang=ar`)

### Live Threat Feed
- SSE (Server-Sent Events) stream from `api/threats-stream.php`
- Attempts real data from Check Point ThreatCloud API first
- Falls back to a procedural threat generator (75+ attack signatures, 52 countries, weighted)
- Streams attacks every 1.5–3.5 seconds — no caching, no polling
- Frontend renders each attack with a cyan flash animation

### SEO
- Dynamic `<title>`, `<meta description>`, Open Graph, Twitter Cards
- `hreflang` tags for EN/AR (in `<head>` and `sitemap.xml`)
- JSON-LD structured data (Organization schema)
- `robots.txt` blocking internal paths
- Semantic HTML5 with ARIA attributes

### Security (.htaccess)
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: SAMEORIGIN`
- `X-XSS-Protection: 1; mode=block`
- `Referrer-Policy: strict-origin-when-cross-origin`
- Directory listing disabled
- `includes/` and `config.php` blocked from HTTP access
- Translation cache files blocked

### Performance
- Auto cache-busting via `filemtime()` — deploy and caches invalidate automatically
- Static assets cached for 1 week (CSS/JS) to 1 month (images/fonts)
- GZIP compression for HTML, CSS, JS, JSON, SSE

---

## Configuration

All site settings live in `config.php`:

| Constant | Purpose |
|----------|---------|
| `SITE_NAME` | Brand name ("beout.ai") |
| `SITE_URL` | Canonical URL |
| `SITE_EMAIL` | Contact email |
| `LAUNCH_DATE` | Countdown target date |
| `THEME_COLOR` | PWA theme color |
| `CSS_PATH` / `JS_PATH` | Asset paths (auto-versioned) |

---

## Adding a New Language

1. Add the language code to the `$supported` array in `config.php`
2. Create `includes/lang/{code}.php` with `lang_code`, `lang_dir`, and `lang_toggle` keys
3. The translator will auto-translate all other strings from English

Or to add a fully manual translation:
1. Copy `includes/lang/en.php` → `includes/lang/{code}.php`
2. Translate all values
3. Add the code to `$supported` in `config.php`

---

## Deployment

Upload all files to any PHP 8.0+ hosting. No database, no composer, no build step.

```bash
# Requirements
PHP >= 8.0
php-curl (for threat stream + translation API)
Apache with mod_rewrite (for .htaccess) or Nginx equivalent
```

---

## License

See [LICENSE](LICENSE) file.
