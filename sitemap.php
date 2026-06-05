<?php
/**
 * ╔══════════════════════════════════════════════╗
 * ║  beout.ai — Dynamic XML Sitemap Generator    ║
 * ╚══════════════════════════════════════════════╝
 */

declare(strict_types=1);
require_once __DIR__ . '/config.php';

header('Content-Type: application/xml; charset=utf-8');
header('X-Robots-Tag: noindex');

$lastmod = date('Y-m-d');
echo '<?xml version="1.0" encoding="UTF-8"?>' . "\n";
?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">

    <url>
        <loc><?= SITE_URL ?>/</loc>
        <xhtml:link rel="alternate" hreflang="en" href="<?= SITE_URL ?>/" />
        <xhtml:link rel="alternate" hreflang="ar" href="<?= SITE_URL ?>/?lang=ar" />
        <xhtml:link rel="alternate" hreflang="x-default" href="<?= SITE_URL ?>/" />
        <lastmod><?= $lastmod ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>1.0</priority>
    </url>

    <url>
        <loc><?= SITE_URL ?>/?lang=ar</loc>
        <xhtml:link rel="alternate" hreflang="ar" href="<?= SITE_URL ?>/?lang=ar" />
        <xhtml:link rel="alternate" hreflang="en" href="<?= SITE_URL ?>/" />
        <xhtml:link rel="alternate" hreflang="x-default" href="<?= SITE_URL ?>/" />
        <lastmod><?= $lastmod ?></lastmod>
        <changefreq>weekly</changefreq>
        <priority>0.9</priority>
    </url>

</urlset>