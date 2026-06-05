<?php defined('SITE_NAME') || exit; ?>

<section class="signup-section" id="signup" aria-label="Early access signup">
    <div class="signup-inner">
        <div class="signup-header">
            <h2 class="signup-title"><?= $t['signup_title'] ?? 'Be First In Line' ?></h2>
            <p class="signup-desc"><?= $t['signup_label'] ?? 'Join the waiting list for early access and exclusive launch pricing.' ?></p>
        </div>
        <form class="signup-form" id="signup-form" novalidate>
            <div class="form-group">
                <div class="input-wrapper">
                    <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>
                    <input type="email" id="email-input" placeholder="<?= $t['email_placeholder'] ?? 'Enter your email address' ?>" required autocomplete="email" aria-label="Email address">
                </div>
                <button type="submit" class="btn-primary btn-submit" id="cta-button">
                    <span class="btn-text"><?= $t['cta_btn'] ?? 'Notify Me' ?></span>
                    <svg class="btn-arrow" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
                </button>
            </div>
        </form>
        <p class="signup-trust"><svg class="trust-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg> <?= $t['signup_trust'] ?? 'No spam. Cancel anytime.' ?></p>
        <div class="signup-success" id="signup-success">
            <div class="success-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
            </div>
            <p><?= $t['signup_success'] ?? "You're on the list. We'll notify you at launch." ?></p>
        </div>
    </div>
</section>
