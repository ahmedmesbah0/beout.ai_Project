<?php defined('SITE_NAME') || exit; ?>

<section class="how-section" id="how-it-works" aria-label="How it works">
    <div class="section-header">
        <h2 class="section-title"><?= $t['how_title'] ?? 'Deploy in 25 Minutes' ?></h2>
        <p class="section-subtitle"><?= $t['how_subtitle'] ?? 'Three steps. Full AI protection.' ?></p>
    </div>
    <div class="how-steps">
        <div class="how-step">
            <div class="step-num">01</div>
            <div class="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            </div>
            <h3><?= $t['how_step1_t'] ?? 'Download OVF' ?></h3>
            <p><?= $t['how_step1_d'] ?? 'Download the beout.ai virtual appliance. No complex setup. No vendor lock-in.' ?></p>
        </div>
        <div class="step-connector" aria-hidden="true"></div>
        <div class="how-step">
            <div class="step-num">02</div>
            <div class="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>
            </div>
            <h3><?= $t['how_step2_t'] ?? 'Deploy as Bridge' ?></h3>
            <p><?= $t['how_step2_d'] ?? 'Plug it in as a network bridge and enter your license key. Works with any existing setup.' ?></p>
        </div>
        <div class="step-connector" aria-hidden="true"></div>
        <div class="how-step">
            <div class="step-num">03</div>
            <div class="step-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <h3><?= $t['how_step3_t'] ?? 'AI Protection Active' ?></h3>
            <p><?= $t['how_step3_d'] ?? 'Autonomous threat detection & response goes live. Zero external APIs. 100% local AI.' ?></p>
        </div>
    </div>
</section>
