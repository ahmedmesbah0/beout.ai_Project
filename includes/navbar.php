<?php defined('SITE_NAME') || exit; ?>

<nav class="navbar" id="navbar" role="navigation" aria-label="Main navigation">
    <div class="nav-brand">
        <img src="assets/logo.png" alt="<?= SITE_NAME ?> logo" class="nav-logo" width="36" height="36">
        <span class="nav-name">beout<span class="accent">.ai</span></span>
    </div>
    <div class="nav-actions">
        <div class="nav-status">
            <span class="status-dot" aria-hidden="true"></span>
            <span class="status-text"><?= $t['nav_status'] ?></span>
        </div>
        <a href="?lang=<?= ALT_LANG ?>" class="lang-toggle" id="lang-toggle" aria-label="Switch language">
            <span class="lang-toggle-text" id="lang-toggle-text"><?= $t['lang_toggle'] ?></span>
        </a>
    </div>
</nav>
