<?php
/**
 * ╔══════════════════════════════════════════════╗
 * ║  beout.ai — Site Configuration               ║
 * ╚══════════════════════════════════════════════╝
 */

declare(strict_types=1);

// ─── Site Identity ───────────────────────────
define('SITE_NAME',    'beout.ai');
define('SITE_DOMAIN',  'beout.ai');
define('SITE_URL',     'https://beout.ai');
define('SITE_EMAIL',   'hello@beout.ai');
define('SITE_YEAR',    date('Y'));
define('SITE_TAGLINE', "Egypt's First AI-Native Cybersecurity Company");

// ─── Launch Date ─────────────────────────────
define('LAUNCH_DATE', '2026-10-16T00:00:00Z');

// ─── Asset Versioning (auto cache-bust) ──────
define('CSS_PATH', 'assets/css/style.css');
define('JS_PATH',  'assets/js/script.js');

function assetVersion(string $path): string {
    $file = __DIR__ . '/' . $path;
    return file_exists($file) ? (string) filemtime($file) : '1';
}

function css(): string { return CSS_PATH . '?v=' . assetVersion(CSS_PATH); }
function js():  string { return JS_PATH  . '?v=' . assetVersion(JS_PATH);  }

// ─── Theme ───────────────────────────────────
define('THEME_COLOR', '#06080d');

// ─── Language Detection ──────────────────────
// Priority: ?lang= param → cookie → browser Accept-Language → default en
function detectLang(): string {
    $supported = ['en', 'ar'];

    // 1. URL parameter
    if (isset($_GET['lang']) && in_array($_GET['lang'], $supported, true)) {
        $lang = $_GET['lang'];
        setcookie('beout_lang', $lang, time() + 86400 * 365, '/', '', false, true);
        return $lang;
    }

    // 2. Cookie
    if (isset($_COOKIE['beout_lang']) && in_array($_COOKIE['beout_lang'], $supported, true)) {
        return $_COOKIE['beout_lang'];
    }

    // 3. Browser Accept-Language
    $accept = $_SERVER['HTTP_ACCEPT_LANGUAGE'] ?? '';
    if (stripos($accept, 'ar') === 0) {
        return 'ar';
    }

    return 'en';
}

// ─── Load Translations ──────────────────────
// English is always the source of truth.
// Arabic is auto-translated via Google Translate API and cached.

$lang    = detectLang();
$langDir = __DIR__ . '/includes/lang';

if ($lang === 'en') {
    $t = require $langDir . '/en.php';
} else {
    // Auto-translate Arabic from English using the Translator service
    require_once __DIR__ . '/includes/translator.php';
    $t = Translator::generateLangFile($langDir);
}

define('CURRENT_LANG', $lang);
define('LANG_DIR',     $t['lang_dir'] ?? ($lang === 'ar' ? 'rtl' : 'ltr'));
define('ALT_LANG',     $lang === 'en' ? 'ar' : 'en');
