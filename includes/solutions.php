<?php defined('SITE_NAME') || exit; ?>

<section class="solutions-section" id="solutions" aria-label="Enterprise solutions">
    <div class="section-header">
        <h2 class="section-title"><?= $t['solutions_title'] ?? 'Built for Enterprise' ?></h2>
        <p class="section-subtitle"><?= $t['solutions_subtitle'] ?? 'Solutions that scale with your organization' ?></p>
    </div>
    <div class="solutions-grid">
        <?php
        $solutions = [
            [
                'id' => 'sol-net', 'tKey' => 'sol_net_t', 'dKey' => 'sol_net_d',
                'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"/><rect x="2" y="14" width="20" height="8" rx="2" ry="2"/><line x1="6" y1="6" x2="6.01" y2="6"/><line x1="6" y1="18" x2="6.01" y2="18"/></svg>',
            ],
            [
                'id' => 'sol-end', 'tKey' => 'sol_end_t', 'dKey' => 'sol_end_d',
                'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>',
            ],
            [
                'id' => 'sol-mail', 'tKey' => 'sol_mail_t', 'dKey' => 'sol_mail_d',
                'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 4L12 13L2 4"/></svg>',
            ],
            [
                'id' => 'sol-comp', 'tKey' => 'sol_comp_t', 'dKey' => 'sol_comp_d',
                'icon' => '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>',
            ],
        ];
        foreach ($solutions as $s): ?>
        <article class="solution-card" id="<?= $s['id'] ?>">
            <div class="solution-icon-wrap"><?= $s['icon'] ?></div>
            <h3><?= $t[$s['tKey']] ?></h3>
            <p><?= $t[$s['dKey']] ?></p>
        </article>
        <?php endforeach; ?>
    </div>
</section>