<?php defined('SITE_NAME') || exit; ?>

<div class="threat-ticker" id="threat-ticker" aria-label="Live threat feed">
    <div class="ticker-label">
        <span class="ticker-dot" aria-hidden="true"></span>
        <span><?= $t['ticker_label'] ?></span>
    </div>
    <div class="ticker-track" id="ticker-track"></div>
</div>
