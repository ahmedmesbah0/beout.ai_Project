<?php
/**
 * ╔══════════════════════════════════════════════╗
 * ║  beout.ai — Waitlist Subscribe API           ║
 * ║  Accepts email signups and stores to JSON    ║
 * ╚══════════════════════════════════════════════╝
 */

declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: ' . ($_SERVER['HTTP_ORIGIN'] ?? 'https://beout.ai'));
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('X-Content-Type-Options: nosniff');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(204);
    exit;
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Method not allowed']);
    exit;
}

$input = json_decode(file_get_contents('php://input'), true);
$email = trim($input['email'] ?? '');

if ($email === '' || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Invalid email address']);
    exit;
}

$domain = substr(strrchr($email, '@'), 1);
$disposable = ['mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com', 'yopmail.com', 'throwaway.email', 'sharklasers.com', 'trashmail.com'];
if (in_array($domain, $disposable, true)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'message' => 'Disposable email addresses are not allowed']);
    exit;
}

$dataDir = __DIR__ . '/../data';
if (!is_dir($dataDir)) {
    mkdir($dataDir, 0755, true);
}

$subscribersFile = $dataDir . '/subscribers.json';
$subscribers = [];

if (file_exists($subscribersFile)) {
    $subscribers = json_decode(file_get_contents($subscribersFile), true) ?: [];
}

$alreadySignedUp = false;
foreach ($subscribers as $sub) {
    if (strtolower($sub['email']) === strtolower($email)) {
        $alreadySignedUp = true;
        break;
    }
}

if (!$alreadySignedUp) {
    $subscribers[] = [
        'email'      => $email,
        'ip'         => hash('sha256', $_SERVER['REMOTE_ADDR'] ?? 'unknown'),
        'subscribed' => date('c'),
        'lang'       => $_COOKIE['beout_lang'] ?? 'en',
    ];
    file_put_contents($subscribersFile, json_encode($subscribers, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE), LOCK_EX);

    if (!is_dir($dataDir . '/.git')) {
        $htaccess = $dataDir . '/.htaccess';
        if (!file_exists($htaccess)) {
            file_put_contents($htaccess, "Require all denied\n");
        }
    }
}

http_response_code(200);
echo json_encode([
    'success' => true,
    'message' => 'You are on the list!',
    'count'   => count($subscribers),
]);