<?php defined('SITE_NAME') || exit; ?>

<section class="countdown-section" id="countdown-section" aria-label="Launch countdown">
    <h2 class="countdown-label"><?= $t['countdown_label'] ?></h2>
    <div class="countdown" id="countdown">
        <?php
        $units = [
            ['id' => 'cd-days',  'key' => 'cd_days'],
            ['id' => 'cd-hours', 'key' => 'cd_hours'],
            ['id' => 'cd-min',   'key' => 'cd_min'],
            ['id' => 'cd-sec',   'key' => 'cd_sec'],
        ];
        foreach ($units as $i => $u):
            if ($i > 0): ?>
        <div class="countdown-sep" aria-hidden="true">:</div>
            <?php endif; ?>
        <div class="countdown-block">
            <span class="countdown-number" id="<?= $u['id'] ?>">00</span>
            <span class="countdown-unit"><?= $t[$u['key']] ?></span>
        </div>
        <?php endforeach; ?>
    </div>
</section>
