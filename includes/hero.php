<?php defined('SITE_NAME') || exit; ?>

<main class="hero" id="hero" role="main">
    <div class="hero-content">

        <!-- Logo -->
        <div class="logo-container" id="logo-container">
            <div class="logo-glow" aria-hidden="true"></div>
            <div class="logo-ring logo-ring-1" aria-hidden="true"></div>
            <div class="logo-ring logo-ring-2" aria-hidden="true"></div>
            <div class="logo-ring logo-ring-3" aria-hidden="true"></div>
            <img src="assets/logo.png" alt="<?= SITE_NAME ?> — The Eye That Never Closes"
                 class="hero-logo" width="100" height="100">
        </div>

        <!-- Title -->
        <h1 class="hero-title" id="hero-title">
            beout<span class="accent">.ai</span>
        </h1>

        <!-- Typing Tagline -->
        <div class="tagline-container" id="tagline-container" aria-live="polite">
            <span class="tagline-bracket" aria-hidden="true">[</span>
            <span class="tagline-text" id="tagline-text"></span>
            <span class="tagline-cursor" aria-hidden="true">|</span>
            <span class="tagline-bracket" aria-hidden="true">]</span>
        </div>

        <!-- Description -->
        <p class="hero-description" id="hero-description">
            <?= $t['hero_desc'] ?>
        </p>

        <!-- Product Pills -->
        <div class="product-pills" id="product-pills" role="list">
            <?php
            $pills = [
                ['icon' => '👁️', 'name' => 'HORUS',  'key' => 'pill_horus'],
                ['icon' => '🛡️', 'name' => 'ANUBIS', 'key' => 'pill_anubis'],
                ['icon' => '📡', 'name' => 'THOTH',  'key' => 'pill_thoth'],
                ['icon' => '✉️', 'name' => 'MAAT',   'key' => 'pill_maat'],
                ['icon' => '☀️', 'name' => 'RA',     'key' => 'pill_ra'],
            ];
            foreach ($pills as $p): ?>
            <div class="pill" role="listitem">
                <span class="pill-icon" aria-hidden="true"><?= $p['icon'] ?></span>
                <span class="pill-name"><?= $p['name'] ?></span>
                <span class="pill-desc"><?= $t[$p['key']] ?></span>
            </div>
            <?php endforeach; ?>
        </div>

        <?php include __DIR__ . '/countdown.php'; ?>
        <?php include __DIR__ . '/signup.php'; ?>

    </div>
</main>
