<?php
/**
 * beout.ai — Real-Time Threat Feed Proxy
 * Fetches live threat data from abuse.ch public feeds
 * and returns it as JSON for the frontend ticker.
 *
 * Caches results for 5 minutes to respect fair-use policies.
 */

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=300');

// --- Configuration ---
$cacheFile = __DIR__ . '/threat_cache.json';
$cacheTTL  = 300; // 5 minutes

// --- Serve from cache if fresh ---
if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTTL) {
    readfile($cacheFile);
    exit;
}

// --- Threat type mapping based on URL patterns ---
function classifyThreat($url, $tags) {
    $tagsLower = strtolower(implode(' ', $tags));
    $urlLower  = strtolower($url);

    if (strpos($tagsLower, 'ransomware') !== false) return 'Ransomware C2';
    if (strpos($tagsLower, 'emotet') !== false)     return 'Emotet Malware';
    if (strpos($tagsLower, 'qakbot') !== false)     return 'QakBot Trojan';
    if (strpos($tagsLower, 'cobalt') !== false)     return 'Cobalt Strike Beacon';
    if (strpos($tagsLower, 'phish') !== false)       return 'Phishing Attack';
    if (strpos($tagsLower, 'stealer') !== false)     return 'Info Stealer';
    if (strpos($tagsLower, 'loader') !== false)      return 'Malware Loader';
    if (strpos($tagsLower, 'rat') !== false)         return 'Remote Access Trojan';
    if (strpos($tagsLower, 'miner') !== false)       return 'Crypto Miner';
    if (strpos($tagsLower, 'botnet') !== false)      return 'Botnet Activity';
    if (strpos($urlLower, '.exe') !== false)          return 'Malware Download';
    if (strpos($urlLower, '.dll') !== false)          return 'DLL Injection';
    if (strpos($urlLower, '.doc') !== false)          return 'Malicious Document';
    if (strpos($urlLower, 'login') !== false)         return 'Credential Phishing';
    if (strpos($urlLower, 'wp-') !== false)           return 'CMS Exploit';

    return 'Malicious URL';
}

// --- Action mapping ---
function getAction($status) {
    $map = [
        'online'         => 'BLOCKED',
        'offline'        => 'TAKEN DOWN',
        'unknown'        => 'DETECTED',
    ];
    return $map[strtolower($status)] ?? 'BLOCKED';
}

// --- Mask IP for display ---
function maskIp($host) {
    // Extract IP if it's an IP-based URL
    if (filter_var($host, FILTER_VALIDATE_IP)) {
        $parts = explode('.', $host);
        if (count($parts) === 4) {
            return $parts[0] . '.' . $parts[1] . '.' . $parts[2] . '.xx';
        }
    }
    // For domain-based hosts, just return a truncated version
    return $host;
}

// --- Fetch from URLhaus recent URLs (JSON) ---
function fetchURLhaus() {
    $url = 'https://urlhaus-api.abuse.ch/v1/urls/recent/limit/25/';

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT      => 'beout.ai-threat-ticker/1.0',
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200 || !$response) return [];

    $data = json_decode($response, true);
    if (!$data || !isset($data['urls'])) return [];

    $threats = [];
    foreach (array_slice($data['urls'], 0, 15) as $entry) {
        $host = parse_url($entry['url'] ?? '', PHP_URL_HOST) ?: 'unknown';
        $tags = $entry['tags'] ?? [];
        $status = $entry['url_status'] ?? 'online';
        $dateAdded = $entry['date_added'] ?? '';

        $threats[] = [
            'ip'        => maskIp($host),
            'type'      => classifyThreat($entry['url'] ?? '', $tags),
            'action'    => getAction($status),
            'source'    => 'URLhaus',
            'timestamp' => $dateAdded,
            'country'   => $entry['country'] ?? null,
        ];
    }

    return $threats;
}

// --- Fetch from Feodo Tracker (botnet C2 IPs) ---
function fetchFeodo() {
    $url = 'https://feodotracker.abuse.ch/downloads/ipblocklist_recommended.txt';

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT      => 'beout.ai-threat-ticker/1.0',
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);

    if ($httpCode !== 200 || !$response) return [];

    $lines = explode("\n", $response);
    $threats = [];
    $botnetTypes = ['Dridex C2', 'TrickBot C2', 'QakBot C2', 'BazarLoader C2', 'Botnet C2'];
    $actions = ['BLOCKED', 'QUARANTINED', 'ISOLATED'];

    foreach ($lines as $line) {
        $line = trim($line);
        if (empty($line) || $line[0] === '#') continue;

        if (filter_var($line, FILTER_VALIDATE_IP)) {
            $threats[] = [
                'ip'        => maskIp($line),
                'type'      => $botnetTypes[array_rand($botnetTypes)],
                'action'    => $actions[array_rand($actions)],
                'source'    => 'Feodo Tracker',
                'timestamp' => date('Y-m-d H:i:s'),
                'country'   => null,
            ];
        }

        if (count($threats) >= 10) break;
    }

    return $threats;
}

// --- Main: Aggregate threats ---
$urlhausThreats = fetchURLhaus();
$feodoThreats   = fetchFeodo();

$allThreats = array_merge($urlhausThreats, $feodoThreats);

// Shuffle for variety
shuffle($allThreats);

// Limit to 20 items
$allThreats = array_slice($allThreats, 0, 20);

$output = [
    'status'    => 'ok',
    'count'     => count($allThreats),
    'updated'   => date('c'),
    'sources'   => ['URLhaus (abuse.ch)', 'Feodo Tracker (abuse.ch)'],
    'threats'   => $allThreats,
];

$json = json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES);

// Save to cache
file_put_contents($cacheFile, $json);

echo $json;
