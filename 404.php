<?php
/**
 * ╔══════════════════════════════════════════════╗
 * ║  beout.ai — 404 Error Page                   ║
 * ╚══════════════════════════════════════════════╝
 */

declare(strict_types=1);
require_once __DIR__ . '/config.php';
http_response_code(404);
?>
<!DOCTYPE html>
<html lang="<?= CURRENT_LANG ?>" dir="<?= LANG_DIR ?>">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>404 — Page Not Found | <?= SITE_NAME ?></title>
    <meta name="robots" content="noindex, follow">
    <link rel="icon" type="image/png" sizes="32x32" href="assets/logo.png">
    <meta name="theme-color" content="<?= THEME_COLOR ?>">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap" rel="stylesheet">
    <style>
        *,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
        body{font-family:'Inter',-apple-system,BlinkMacSystemFont,sans-serif;background:#06080d;color:#e8ecf4;display:flex;align-items:center;justify-content:center;min-height:100vh;min-height:100dvh;overflow:hidden}
        .e404{text-align:center;z-index:1;padding:40px 24px}
        .e404-code{font-family:'JetBrains Mono','Fira Code',monospace;font-size:clamp(6rem,15vw,10rem);font-weight:900;background:linear-gradient(135deg,#00e5ff 0%,#2979ff 50%,#7c4dff 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text;line-height:1}
        .e404-text{font-size:clamp(1rem,2vw,1.2rem);color:#7a8499;margin:24px 0 36px;line-height:1.6}
        .e404-btn{display:inline-flex;align-items:center;gap:10px;padding:14px 32px;background:linear-gradient(135deg,#00e5ff 0%,#2979ff 50%,#7c4dff 100%);border:none;border-radius:12px;color:#fff;font-family:inherit;font-size:0.95rem;font-weight:600;text-decoration:none;cursor:pointer;transition:all .3s ease;box-shadow:0 4px 24px rgba(0,229,255,0.15)}
        .e404-btn:hover{transform:translateY(-3px);box-shadow:0 0 30px rgba(0,229,255,0.25),0 0 80px rgba(0,229,255,0.1)}
        body::before{content:'';position:fixed;inset:0;pointer-events:none;background-image:linear-gradient(rgba(0,229,255,0.018) 1px,transparent 1px),linear-gradient(90deg,rgba(0,229,255,0.018) 1px,transparent 1px);background-size:80px 80px;mask-image:radial-gradient(ellipse at 50% 50%,black 20%,transparent 70%)}
    </style>
</head>
<body>
    <div class="e404">
        <div class="e404-code">404</div>
        <p class="e404-text">The page you're looking for doesn't exist.<br>It may have been moved, deleted, or was never here.</p>
        <a href="/" class="e404-btn">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="m12 5-7 7 7 7"/></svg>
            Back to Home
        </a>
    </div>
</body>
</html>