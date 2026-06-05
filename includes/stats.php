<?php defined('SITE_NAME') || exit; ?>

<section class="stats-section" id="stats-section" aria-label="Key statistics">
    <?php
    $stats = [
        ['target' => '24', 'suffix' => '/7',  'key' => 'stat_monitoring'],
        ['target' => '50', 'suffix' => 'ms',  'key' => 'stat_response'],
        ['target' => '99', 'suffix' => '.9%', 'key' => 'stat_detection'],
        ['target' => '0',  'suffix' => '$',   'key' => 'stat_api'],
    ];
    foreach ($stats as $s): ?>
    <div class="stat-card">
        <div class="stat-value">
            <span class="stat-num" data-target="<?= $s['target'] ?>">0</span>
            <span class="stat-suffix"><?= $s['suffix'] ?></span>
        </div>
        <span class="stat-label"><?= $t[$s['key']] ?></span>
    </div>
    <?php endforeach; ?>
</section>
