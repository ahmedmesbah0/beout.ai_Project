<?php defined('SITE_NAME') || exit; ?>

<main class="hero" id="hero" role="main">
    <div class="hero-inner" id="main-content">
        <!-- Animated background orbs -->
        <div class="hero-orb hero-orb-1" aria-hidden="true"></div>
        <div class="hero-orb hero-orb-2" aria-hidden="true"></div>
        
        <!-- Logo -->
        <div class="logo-container" id="logo-container">
            <div class="logo-glow" aria-hidden="true"></div>
            <div class="logo-ring logo-ring-1" aria-hidden="true"></div>
            <div class="logo-ring logo-ring-2" aria-hidden="true"></div>
            <div class="logo-ring logo-ring-3" aria-hidden="true"></div>
            <img src="assets/logo.png" alt="<?= SITE_NAME ?>" class="hero-logo" width="90" height="90">
        </div>

        <!-- Title -->
        <h1 class="hero-title" id="hero-title">
            beout<span class="accent">.ai</span>
        </h1>

        <!-- Tagline -->
        <div class="tagline-container" id="tagline-container" aria-live="polite">
            <span class="tagline-text" id="tagline-text"></span>
            <span class="tagline-cursor" aria-hidden="true"></span>
        </div>

        <!-- Description -->
        <p class="hero-description" id="hero-description">
            <?= $t['hero_desc'] ?? "Egypt's first <strong>AI-native cybersecurity</strong> ecosystem.<br>Predictive protection. Autonomous investigation. Zero compromise." ?>
        </p>

        <!-- CTA -->
        <div class="hero-cta">
            <a href="#signup" class="btn-primary" id="hero-cta">
                <span><?= $t['cta_btn'] ?? 'Get Early Access' ?></span>
                <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
        </div>

        <!-- Product Pills -->
        <div class="product-pills" id="product-pills" role="list">
            <div class="pill" role="listitem">
                <svg class="pill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                <div class="pill-text">
                    <span class="pill-name">HORUS</span>
                    <span class="pill-desc"><?= $t['pill_horus'] ?? 'AI Firewall' ?></span>
                </div>
            </div>
            <div class="pill" role="listitem">
                <svg class="pill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>
                <div class="pill-text">
                    <span class="pill-name">ANUBIS</span>
                    <span class="pill-desc"><?= $t['pill_anubis'] ?? 'Endpoint AI' ?></span>
                </div>
            </div>
            <div class="pill" role="listitem">
                <svg class="pill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 2a10 10 0 1 0 10 10H12V2z"/><path d="M12 2a10 10 0 0 1 10 10"/></svg>
                <div class="pill-text">
                    <span class="pill-name">THOTH</span>
                    <span class="pill-desc"><?= $t['pill_thoth'] ?? 'Threat Intel' ?></span>
                </div>
            </div>
            <div class="pill" role="listitem">
                <svg class="pill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                <div class="pill-text">
                    <span class="pill-name">MAAT</span>
                    <span class="pill-desc"><?= $t['pill_maat'] ?? 'Email Guard' ?></span>
                </div>
            </div>
            <div class="pill" role="listitem">
                <svg class="pill-icon-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>
                <div class="pill-text">
                    <span class="pill-name">RA</span>
                    <span class="pill-desc"><?= $t['pill_ra'] ?? 'SOC-as-a-Service' ?></span>
                </div>
            </div>
        </div>
    </div>
</main>
