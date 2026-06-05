<?php defined('SITE_NAME') || exit; ?>

<nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="nav-brand">
        <img src="assets/logo.png" alt="<?= SITE_NAME ?> logo" class="nav-logo" width="36" height="36">
        <span class="nav-name">beout<span class="accent">.ai</span></span>
    </div>
    <ul class="nav-links" id="nav-links">
        <li><a href="#features-section"><?= $t['nav_features'] ?? 'Features' ?></a></li>
        <li><a href="#how-it-works"><?= $t['nav_how'] ?? 'How It Works' ?></a></li>
        <li><a href="#signup"><?= $t['nav_signup'] ?? 'Sign Up' ?></a></li>
    </ul>
    <div class="nav-actions">
        <div class="nav-status" aria-hidden="true">
            <span class="status-dot"></span>
            <span class="status-text"><?= $t['nav_status'] ?? 'Systems Initializing' ?></span>
        </div>

        <button class="nav-hamburger" id="nav-hamburger" type="button" aria-label="Toggle menu" aria-expanded="false">
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
            <span class="hamburger-line"></span>
        </button>
    </div>
</nav>
