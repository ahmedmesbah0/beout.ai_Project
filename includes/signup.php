<?php defined('SITE_NAME') || exit; ?>

<section class="signup-section" id="signup-section" aria-label="Email signup">
    <p class="signup-label"><?= $t['signup_label'] ?></p>
    <form class="signup-form" id="signup-form">
        <div class="input-wrapper">
            <svg class="input-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="M22 4L12 13L2 4" />
            </svg>
            <input type="email" id="email-input"
                   placeholder="<?= htmlspecialchars($t['email_placeholder']) ?>"
                   required autocomplete="email" aria-label="Email address">
        </div>
        <button type="submit" class="cta-button" id="cta-button">
            <span class="btn-text"><?= $t['cta_btn'] ?></span>
            <span class="btn-arrow" aria-hidden="true">→</span>
        </button>
    </form>
    <p class="signup-success" id="signup-success"><?= $t['signup_success'] ?></p>
</section>
