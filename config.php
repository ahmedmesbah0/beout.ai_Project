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
define('SITE_EMAIL',   'contact@beout.ai');
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
$lang = 'en';
if (isset($_GET['lang']) && in_array($_GET['lang'], ['en', 'ar'], true)) {
    $lang = $_GET['lang'];
    setcookie('beout_lang', $lang, [
        'expires'  => time() + 86400 * 365,
        'path'     => '/',
        'domain'   => '',
        'secure'   => true,
        'httponly' => true,
        'samesite' => 'Lax',
    ]);
} elseif (isset($_COOKIE['beout_lang']) && in_array($_COOKIE['beout_lang'], ['en', 'ar'], true)) {
    $lang = $_COOKIE['beout_lang'];
}

$langFile = __DIR__ . '/includes/lang/' . $lang . '.php';
if (!file_exists($langFile)) {
    $langFile = __DIR__ . '/includes/lang/en.php';
    $lang = 'en';
}

$t = require $langFile;

define('CURRENT_LANG', $lang);
define('LANG_DIR',     $lang === 'ar' ? 'rtl' : 'ltr');
