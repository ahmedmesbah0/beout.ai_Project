<?php
/**
 * ╔══════════════════════════════════════════════╗
 * ║  beout.ai — Coming Soon | Entry Point        ║
 * ║  AI-Powered Cybersecurity from Egypt          ║
 * ╚══════════════════════════════════════════════╝
 */

declare(strict_types=1);
require_once __DIR__ . '/config.php';
?>
<!DOCTYPE html>
<html lang="<?= CURRENT_LANG ?>" dir="<?= LANG_DIR ?>">

<head>
<?php include __DIR__ . '/includes/head.php'; ?>
</head>

<body>
    <!-- Particle canvas -->
    <canvas id="particle-canvas" aria-hidden="true"></canvas>
    <!-- Scan line -->
    <div class="scan-line" aria-hidden="true"></div>

    <?php include __DIR__ . '/includes/navbar.php'; ?>
    <?php include __DIR__ . '/includes/hero.php'; ?>
    <?php include __DIR__ . '/includes/countdown.php'; ?>
    <?php include __DIR__ . '/includes/stats.php'; ?>
    <?php include __DIR__ . '/includes/trust-strip.php'; ?>
    <?php include __DIR__ . '/includes/ticker.php'; ?>
    <?php include __DIR__ . '/includes/features.php'; ?>
    <?php include __DIR__ . '/includes/how-it-works.php'; ?>
    <?php include __DIR__ . '/includes/signup.php'; ?>
    <?php include __DIR__ . '/includes/footer.php'; ?>

    <!-- Pass server-side data to JS -->
    <script>
        window.BEOUT_TAGLINES = <?= json_encode($t['taglines'], JSON_UNESCAPED_UNICODE) ?>;
    </script>
    <script src="<?= js() ?>"></script>
</body>

</html>
