<?php defined('SITE_NAME') || exit; ?>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <!-- Primary SEO -->
    <title><?= htmlspecialchars($t['page_title']) ?></title>
    <meta name="description" content="<?= htmlspecialchars($t['meta_desc']) ?>">
    <meta name="keywords"
        content="cybersecurity, AI, Egypt, <?= SITE_NAME ?>, HORUS, threat detection, network security, firewall, SOC, SIEM, PDPL, ISO 27001, endpoint security, AI firewall, SOC-as-a-Service, dark web monitoring, Egyptian cybersecurity">
    <meta name="author" content="<?= SITE_NAME ?>">
    <meta name="robots" content="index, follow, max-image-preview:large">
    <link rel="canonical" href="<?= SITE_URL ?>/">

    <!-- Hreflang for multi-language SEO -->
    <link rel="alternate" hreflang="en" href="<?= SITE_URL ?>/">
    <link rel="alternate" hreflang="ar" href="<?= SITE_URL ?>/?lang=ar">
    <link rel="alternate" hreflang="x-default" href="<?= SITE_URL ?>/">

    <!-- Open Graph -->
    <meta property="og:type" content="website">
    <meta property="og:url" content="<?= SITE_URL ?>/">
    <meta property="og:title" content="<?= htmlspecialchars($t['page_title']) ?>">
    <meta property="og:description" content="<?= htmlspecialchars($t['meta_desc']) ?>">
    <meta property="og:image" content="<?= SITE_URL ?>/assets/og-image.png">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="beout.ai — AI-Powered Cybersecurity">
    <meta property="og:locale" content="en_US">
    <meta property="og:locale:alternate" content="ar_EG">
    <meta property="og:site_name" content="<?= SITE_NAME ?>">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="<?= htmlspecialchars($t['page_title']) ?>">
    <meta name="twitter:description" content="<?= htmlspecialchars($t['meta_desc']) ?>">
    <meta name="twitter:image" content="<?= SITE_URL ?>/assets/og-image.png">
    <meta name="twitter:image:alt" content="beout.ai — AI-Powered Cybersecurity">
    <meta name="twitter:site" content="@beout_ai">

    <!-- Favicon -->
    <link rel="icon" type="image/png" sizes="32x32" href="assets/logo.png">
    <link rel="icon" type="image/png" sizes="192x192" href="assets/logo.png">
    <link rel="apple-touch-icon" sizes="180x180" href="assets/logo.png">
    <link rel="mask-icon" href="assets/logo.png" color="<?= THEME_COLOR ?>">

    <!-- Theme -->
    <meta name="theme-color" content="<?= THEME_COLOR ?>">
    <meta name="msapplication-TileColor" content="<?= THEME_COLOR ?>">

    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap"
        rel="stylesheet">

    <!-- Stylesheet -->
    <link rel="stylesheet" href="<?= css() ?>">

    <!-- Structured Data: Organization -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Organization",
        "@id": "<?= SITE_URL ?>/#organization",
        "name": "<?= SITE_NAME ?>",
        "url": "<?= SITE_URL ?>",
        "logo": { "@type": "ImageObject", "url": "<?= SITE_URL ?>/assets/logo.png", "width": 512, "height": 512 },
        "description": "<?= htmlspecialchars($t['meta_desc']) ?>",
        "foundingDate": "2026",
        "foundingLocation": { "@type": "Place", "name": "Cairo, Egypt" },
        "contactPoint": {
            "@type": "ContactPoint",
            "email": "<?= SITE_EMAIL ?>",
            "contactType": "customer service",
            "availableLanguage": ["English", "Arabic"]
        },
        "sameAs": [
            "https://linkedin.com/company/beout-ai",
            "https://x.com/beout_ai"
        ]
    }
    </script>

    <!-- Structured Data: WebSite -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebSite",
        "@id": "<?= SITE_URL ?>/#website",
        "url": "<?= SITE_URL ?>",
        "name": "<?= SITE_NAME ?>",
        "inLanguage": "en",
        "publisher": { "@id": "<?= SITE_URL ?>/#organization" }
    }
    </script>

    <!-- Structured Data: ComingSoon (pending launch) -->
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "WebPage",
        "@id": "<?= SITE_URL ?>/#webpage",
        "url": "<?= SITE_URL ?>",
        "name": "beout.ai — AI-Powered Cybersecurity | Coming Soon",
        "about": { "@id": "<?= SITE_URL ?>/#organization" },
        "isPartOf": { "@id": "<?= SITE_URL ?>/#website" },
        "datePublished": "2026-06-05",
        "dateModified": "<?= date('Y-m-d') ?>"
    }
    </script>
