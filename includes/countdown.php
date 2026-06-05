<?php defined('SITE_NAME') || exit; ?>

<section class="countdown-section" id="countdown-section" aria-label="Launch countdown">
    <div class="countdown-inner">
        <div class="countdown-header">
            <div class="countdown-badge" aria-hidden="true">
                <span class="badge-dot"></span>
                <span class="badge-text"><?= $t['countdown_label'] ?? 'COUNTDOWN TO LAUNCH' ?></span>
            </div>
        </div>
        <div class="countdown-display" id="countdown">
            <?php
            $units = [
                ['id' => 'cd-days',  'key' => 'cd_days', 'fallback' => 'Days'],
                ['id' => 'cd-hours', 'key' => 'cd_hours', 'fallback' => 'Hours'],
                ['id' => 'cd-min',   'key' => 'cd_min', 'fallback' => 'Minutes'],
                ['id' => 'cd-sec',   'key' => 'cd_sec', 'fallback' => 'Seconds'],
            ];
            foreach ($units as $i => $u):
                if ($i > 0): ?>
            <div class="cd-sep" aria-hidden="true"></div>
                <?php endif; ?>
            <div class="cd-unit">
                <div class="cd-value" id="<?= $u['id'] ?>">00</div>
                <div class="cd-label"><?= $t[$u['key']] ?? $u['fallback'] ?></div>
            </div>
            <?php endforeach; ?>
        </div>
        <p class="countdown-date" id="countdown-date"></p>
    </div>
</section>
