<?php defined('SITE_NAME') || exit; ?>

<section class="cta-bottom-section" id="cta-bottom" aria-label="Call to action">
    <div class="cta-bottom-inner">
        <h2 class="cta-bottom-title"><?= $t['cta_bottom_title'] ?? 'Ready to secure your enterprise?' ?></h2>
        <p class="cta-bottom-desc"><?= $t['cta_bottom_desc'] ?? "Join the waiting list for early access to Egypt's first AI-native cybersecurity platform." ?></p>
        <a href="#signup" class="btn-primary cta-bottom-btn">
            <span><?= $t['cta_bottom_btn'] ?? 'Get Early Access' ?></span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
        </a>
    </div>
</section>