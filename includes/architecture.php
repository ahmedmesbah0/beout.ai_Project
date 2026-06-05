<?php defined('SITE_NAME') || exit; ?>

<section class="architecture-section" id="architecture" aria-label="Security architecture overview">
    <div class="section-header">
        <h2 class="section-title"><?= $t['arch_title'] ?? 'Security Architecture' ?></h2>
        <p class="section-subtitle"><?= $t['arch_subtitle'] ?? 'How We Protect Your Network' ?></p>
    </div>
    <div class="architecture-flow">
        <div class="arch-endpoint arch-source" aria-label="Internet traffic source">
            <div class="arch-endpoint-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
            </div>
            <span class="arch-endpoint-label"><?= $t['arch_internet'] ?? 'Internet' ?></span>
        </div>
        <div class="arch-connector" aria-hidden="true">
            <svg viewBox="0 0 60 8" fill="none"><path d="M0 4h50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="60,4 50,0 50,8"/></svg>
        </div>
        <div class="arch-core" aria-label="beout.ai AI detection engine">
            <div class="arch-core-glow" aria-hidden="true"></div>
            <div class="arch-core-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M12 7v4"/><circle cx="12" cy="16" r="1"/></svg>
            </div>
            <span class="arch-core-label"><?= SITE_NAME ?> AI Engine</span>
        </div>
        <div class="arch-connector" aria-hidden="true">
            <svg viewBox="0 0 60 8" fill="none"><path d="M0 4h50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 3"/><polygon points="60,4 50,0 50,8"/></svg>
        </div>
        <div class="arch-endpoint arch-destination" aria-label="Protected enterprise network">
            <div class="arch-endpoint-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>
            </div>
            <span class="arch-endpoint-label"><?= $t['arch_network'] ?? 'Your Network' ?></span>
        </div>
    </div>
    <div class="architecture-layers">
        <?php
        $layers = [
            ['num' => '01', 'tKey' => 'arch_l1_t', 'dKey' => 'arch_l1_d', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>'],
            ['num' => '02', 'tKey' => 'arch_l2_t', 'dKey' => 'arch_l2_d', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>'],
            ['num' => '03', 'tKey' => 'arch_l3_t', 'dKey' => 'arch_l3_d', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>'],
            ['num' => '04', 'tKey' => 'arch_l4_t', 'dKey' => 'arch_l4_d', 'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>'],
        ];
        foreach ($layers as $l): ?>
        <div class="arch-layer-card">
            <div class="arch-layer-num"><?= $l['num'] ?></div>
            <div class="arch-layer-icon"><?= $l['icon'] ?></div>
            <h3><?= $t[$l['tKey']] ?? 'Layer ' . $l['num'] ?></h3>
            <p><?= $t[$l['dKey']] ?? '' ?></p>
        </div>
        <?php endforeach; ?>
    </div>
</section>