<?php defined('SITE_NAME') || exit; ?>

<section class="trust-section" id="trust" aria-label="Enterprise trust and compliance">
    <div class="section-header">
        <h2 class="section-title"><?= $t['trust_title'] ?? 'Enterprise Trust' ?></h2>
        <p class="section-subtitle"><?= $t['trust_subtitle'] ?? 'Security & Compliance' ?></p>
    </div>
    <div class="trust-grid">
        <?php
        $badges = [
            [
                'id' => 'trust-pdpl', 'label' => 'PDPL',
                'tKey' => 'trust_pdpl_t', 'dKey' => 'trust_pdpl_d',
                'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>',
            ],
            [
                'id' => 'trust-iso', 'label' => 'ISO 27001',
                'tKey' => 'trust_iso_t', 'dKey' => 'trust_iso_d',
                'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>',
            ],
            [
                'id' => 'trust-pci', 'label' => 'PCI-DSS',
                'tKey' => 'trust_pci_t', 'dKey' => 'trust_pci_d',
                'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="4" width="22" height="16" rx="2" ry="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>',
            ],
        ];
        foreach ($badges as $b): ?>
        <article class="trust-badge-card" id="<?= $b['id'] ?>">
            <div class="trust-badge-icon"><?= $b['icon'] ?></div>
            <div class="trust-badge-header">
                <span class="trust-badge-label"><?= $b['label'] ?></span>
                <h3><?= $t[$b['tKey']] ?? $b['label'] ?></h3>
            </div>
            <p><?= $t[$b['dKey']] ?? '' ?></p>
        </article>
        <?php endforeach; ?>
    </div>
    <div class="trust-extra">
        <div class="trust-extra-card" aria-label="Data residency information">
            <div class="trust-extra-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            </div>
            <h3><?= $t['trust_residency_t'] ?? 'Data Residency' ?></h3>
            <p><?= $t['trust_residency_d'] ?? 'All data stays in Egypt. Your logs, alerts, and threat intelligence never leave your borders.' ?></p>
        </div>
        <div class="trust-extra-card" aria-label="Deployment model information">
            <div class="trust-extra-icon">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>
            </div>
            <h3><?= $t['trust_deploy_t'] ?? 'Deployment Model' ?></h3>
            <p><?= $t['trust_deploy_d'] ?? 'On-premise, air-gapped capable. Operates fully offline. Zero external API dependencies.' ?></p>
        </div>
    </div>
</section>