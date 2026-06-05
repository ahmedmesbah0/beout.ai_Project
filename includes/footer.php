<?php defined('SITE_NAME') || exit; ?>

<footer class="footer" id="footer" role="contentinfo">
    <div class="footer-inner">
        <div class="footer-brand">
            <img src="assets/logo.png" alt="<?= SITE_NAME ?>" class="footer-logo" width="28" height="28">
            <span class="footer-name">beout<span class="accent">.ai</span></span>
        </div>
        <p class="footer-tagline"><?= $t['footer_tagline'] ?></p>
        <div class="footer-links">
            <a href="mailto:<?= SITE_EMAIL ?>" class="footer-link" id="fl-email"><?= SITE_EMAIL ?></a>
            <span class="footer-sep" aria-hidden="true">•</span>
            <a href="#" class="footer-link" id="fl-li">LinkedIn</a>
            <span class="footer-sep" aria-hidden="true">•</span>
            <a href="#" class="footer-link" id="fl-tw">X / Twitter</a>
        </div>
        <p class="footer-copy">© <?= SITE_YEAR ?> <?= SITE_NAME ?> — <?= $t['footer_rights'] ?></p>
    </div>
</footer>
