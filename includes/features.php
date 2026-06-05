<?php defined('SITE_NAME') || exit; ?>

<section class="features-section" id="features-section" aria-label="Features preview">
    <div class="section-header">
        <h2 class="section-title"><?= $t['features_title'] ?></h2>
        <?php if (isset($t['features_subtitle'])): ?>
        <p class="section-subtitle"><?= $t['features_subtitle'] ?></p>
        <?php endif; ?>
    </div>
    <div class="features-grid">
        <?php
        $features = [
            ['id' => 'feat-ai',   'icon' => '🧠', 'tKey' => 'feat_ai_t',   'dKey' => 'feat_ai_d'],
            ['id' => 'feat-inv',  'icon' => '🔍', 'tKey' => 'feat_inv_t',  'dKey' => 'feat_inv_d'],
            ['id' => 'feat-col',  'icon' => '🌐', 'tKey' => 'feat_col_t',  'dKey' => 'feat_col_d'],
            ['id' => 'feat-comp', 'icon' => '📋', 'tKey' => 'feat_comp_t', 'dKey' => 'feat_comp_d'],
            ['id' => 'feat-dark', 'icon' => '🕵️', 'tKey' => 'feat_dark_t', 'dKey' => 'feat_dark_d'],
            ['id' => 'feat-dep',  'icon' => '⚡', 'tKey' => 'feat_dep_t',  'dKey' => 'feat_dep_d'],
        ];
        foreach ($features as $f): ?>
        <article class="feature-card" id="<?= $f['id'] ?>">
            <div class="feature-icon-wrap"><span class="feature-icon"><?= $f['icon'] ?></span></div>
            <h3><?= $t[$f['tKey']] ?></h3>
            <p><?= $t[$f['dKey']] ?></p>
        </article>
        <?php endforeach; ?>
    </div>
</section>
