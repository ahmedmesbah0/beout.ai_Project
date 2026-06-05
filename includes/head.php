<?php defined('SITE_NAME') || exit; ?>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary SEO -->
    <title><?= htmlspecialchars($t['page_title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($t['meta_desc']) ?>">
    <meta name="keywords"
        content="cybersecurity, AI, Egypt, <?= SITE_NAME ?>, HORUS, threat detection, network security, firewall, SOC, SIEM, PDPL, ISO 27001, endpoint security, FortiGate alternative">
    <meta name="author" content="<?= SITE_NAME ?>">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="<?= SITE_URL ?>/<?= CURRENT_LANG === 'ar' ? '?lang=ar' : '' ?>">

    <!-- Hreflang for multi-language SEO -->
    <link rel="alternate" hreflang="en" href="<?= SITE_URL ?>/">
    <link rel="alternate" hreflang="ar" href="<?= SITE_URL ?>/?lang=ar">
    <link rel="alternate" hreflang="x-default" href="<?= SITE_URL ?>/">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= SITE_URL ?>/">
    <meta property="og:title" content="<?= htmlspecialchars($t['page_title']) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($t['meta_desc']) ?>">
    <meta property="og:image" content="<?= SITE_URL ?>/assets/logo.png">
    <meta property="og:locale" content="<?= CURRENT_LANG === 'ar' ? 'ar_EG' : 'en_US' ?>">
    <meta property="og:locale:alternate" content="<?= CURRENT_LANG === 'ar' ? 'en_US' : 'ar_EG' ?>">
    <meta property="og:site_name" content="<?= SITE_NAME ?>">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($t['page_title']) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($t['meta_desc']) ?>">
    <meta name="twitter:image" content="<?= SITE_URL ?>/assets/logo.png">

    <!-- Favicon -->
    <link rel="icon" type="image/png" href="assets/logo.png">
    <link rel="apple-touch-icon" href="assets/logo.png">

    <!-- Theme -->
    <meta name="theme-color" content="<?= THEME_COLOR ?>">
    <meta name="msapplication-TileColor" content="<?= THEME_COLOR ?>">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&family=Noto+Kufi+Arabic:wght@300;400;500;600;700;800;900&display=swap"
        rel="stylesheet">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="<?= css() ?>">

    <!-- Structured Data -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "<?= SITE_NAME ?>",
        "url": "<?= SITE_URL ?>",
        "logo": "<?= SITE_URL ?>/assets/logo.png",
        "description": "<?= htmlspecialchars($t['meta_desc']) ?>",
        "foundingDate": "2026",
        "foundingLocation": { "@type": "Place", "name": "Cairo, Egypt" },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "<?= SITE_EMAIL ?>",
            "contactType": "customer service"
        }
    }
    </script>
