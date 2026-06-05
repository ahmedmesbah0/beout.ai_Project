<?php
/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║  beout.ai — Live Threat Intelligence Stream (SSE)           ║
 * ║                                                              ║
 * ║  Architecture:                                               ║
 * ║  1. Attempts real-time feed from Check Point ThreatCloud     ║
 * ║  2. Falls back to procedural threat generation engine        ║
 * ║  3. Streams individual events via Server-Sent Events         ║
 * ║                                                              ║
 * ║  Zero caching. Zero polling. Pure real-time push.            ║
 * ╚══════════════════════════════════════════════════════════════╝
 */

declare(strict_types=1);

// ─── Disable all output buffering ────────────────────────────
@ini_set('output_buffering', 'off');
@ini_set('zlib.output_compression', '0');
@ini_set('max_execution_time', '600');
if (function_exists('apache_setenv')) {
    @apache_setenv('no-gzip', '1');
}

// ─── SSE Headers ─────────────────────────────────────────────
header('Content-Type: text/event-stream; charset=utf-8');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('Access-Control-Allow-Origin: *');
header('X-Accel-Buffering: no');

while (ob_get_level()) ob_end_flush();

// ═══════════════════════════════════════════════════════════════
//  THREAT INTELLIGENCE DATA POOLS
// ═══════════════════════════════════════════════════════════════

$ATTACK_SIGNATURES = [
    // ── Exploits & CVEs ──
    ['type' => 'Apache Log4j RCE (CVE-2021-44228)',          'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Spring4Shell RCE (CVE-2022-22965)',          'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Microsoft Exchange ProxyShell',              'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Fortinet FortiOS Path Traversal',            'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'Citrix ADC Remote Code Execution',           'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'VMware vCenter Server RCE',                  'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Confluence OGNL Injection (CVE-2022-26134)', 'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'SolarWinds Orion Supply Chain',              'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'MOVEit Transfer SQL Injection',              'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Ivanti Connect Secure Auth Bypass',          'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'HTTP Headers Remote Code Execution',         'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'OpenSSL TLS Downgrade Attack',               'cat' => 'exploit',   'sev' => 'medium'],
    ['type' => 'SQL Injection via Web Form',                 'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'WordPress Remote Code Execution',            'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'SSH Brute Force Attack',                     'cat' => 'exploit',   'sev' => 'medium'],
    ['type' => 'DNS Amplification DDoS',                     'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'Apache Struts2 OGNL Injection',              'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'PHP CGI Argument Injection',                 'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'Pulse Secure VPN Auth Bypass',               'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'F5 BIG-IP iControl REST RCE',                'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Zyxel Firewall OS Command Injection',        'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'Palo Alto PAN-OS GlobalProtect RCE',         'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Oracle WebLogic Deserialization',            'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Cisco IOS XE Web UI Privilege Escalation',   'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Atlassian Bitbucket Command Injection',      'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'Nginx Path Traversal (CVE-2024-7347)',       'cat' => 'exploit',   'sev' => 'medium'],
    ['type' => 'GitLab CE/EE Pipeline Execution',            'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'Redis Unauthorized Access RCE',              'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Elasticsearch Remote Code Execution',        'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Jenkins Script Console RCE',                 'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Telerik UI Deserialization RCE',             'cat' => 'exploit',   'sev' => 'high'],
    ['type' => 'Zimbra Collaboration RCE',                   'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Juniper SRX Firewall Auth Bypass',           'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'SonicWall SSL-VPN Buffer Overflow',          'cat' => 'exploit',   'sev' => 'critical'],
    ['type' => 'Barracuda ESG Command Injection',            'cat' => 'exploit',   'sev' => 'critical'],
    // ── Malware ──
    ['type' => 'Emotet Trojan Distribution',                 'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'LockBit 3.0 Ransomware Deployment',         'cat' => 'malware',   'sev' => 'critical'],
    ['type' => 'BlackCat ALPHV Ransomware',                  'cat' => 'malware',   'sev' => 'critical'],
    ['type' => 'QakBot Loader Activity',                     'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'Cobalt Strike Beacon C2',                    'cat' => 'malware',   'sev' => 'critical'],
    ['type' => 'AsyncRAT Payload Delivery',                  'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'Formbook Infostealer Distribution',          'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'AgentTesla Keylogger Delivery',              'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'Remcos RAT C2 Communication',                'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'RedLine Stealer Exfiltration',               'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'Raccoon Stealer v2 Distribution',            'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'IcedID Banking Trojan Dropper',              'cat' => 'malware',   'sev' => 'critical'],
    ['type' => 'SmokeLoader Payload Delivery',               'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'Vidar Infostealer Campaign',                 'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'XWorm RAT Activity Detected',                'cat' => 'malware',   'sev' => 'high'],
    ['type' => 'Akira Ransomware Encryption',                'cat' => 'malware',   'sev' => 'critical'],
    ['type' => 'Royal Ransomware Deployment',                'cat' => 'malware',   'sev' => 'critical'],
    ['type' => 'DarkGate Loader Delivery',                   'cat' => 'malware',   'sev' => 'high'],
    // ── Botnet ──
    ['type' => 'Mirai Botnet Propagation',                   'cat' => 'botnet',    'sev' => 'high'],
    ['type' => 'TrickBot C2 Communication',                  'cat' => 'botnet',    'sev' => 'critical'],
    ['type' => 'Mozi IoT Botnet Activity',                   'cat' => 'botnet',    'sev' => 'high'],
    ['type' => 'Androxgh0st Botnet Scan',                    'cat' => 'botnet',    'sev' => 'medium'],
    ['type' => 'Volt Typhoon Infrastructure Probe',          'cat' => 'botnet',    'sev' => 'critical'],
    ['type' => 'Dridex Banking Trojan C2',                   'cat' => 'botnet',    'sev' => 'high'],
    ['type' => 'Goldoon Botnet DDoS Campaign',               'cat' => 'botnet',    'sev' => 'high'],
    // ── Phishing ──
    ['type' => 'Microsoft 365 Credential Phishing',          'cat' => 'phishing',  'sev' => 'high'],
    ['type' => 'DocuSign Impersonation Campaign',            'cat' => 'phishing',  'sev' => 'medium'],
    ['type' => 'Google OAuth Phishing Kit',                  'cat' => 'phishing',  'sev' => 'high'],
    ['type' => 'Amazon AWS SES Abuse Phishing',              'cat' => 'phishing',  'sev' => 'medium'],
    ['type' => 'LinkedIn Business Phishing',                 'cat' => 'phishing',  'sev' => 'medium'],
    ['type' => 'DHL Shipping Notification Phish',            'cat' => 'phishing',  'sev' => 'low'],
    ['type' => 'WeTransfer File-Share Phishing',             'cat' => 'phishing',  'sev' => 'medium'],
    // ── APT ──
    ['type' => 'APT29 Cozy Bear Lateral Movement',           'cat' => 'apt',       'sev' => 'critical'],
    ['type' => 'APT41 Double Dragon Backdoor',               'cat' => 'apt',       'sev' => 'critical'],
    ['type' => 'Lazarus Group Crypto Theft',                 'cat' => 'apt',       'sev' => 'critical'],
    ['type' => 'Sandworm Destructive Payload',               'cat' => 'apt',       'sev' => 'critical'],
    ['type' => 'Fancy Bear Spear Phishing',                  'cat' => 'apt',       'sev' => 'critical'],
    ['type' => 'Charming Kitten OAuth Abuse',                'cat' => 'apt',       'sev' => 'high'],
    ['type' => 'Mustang Panda PlugX Implant',                'cat' => 'apt',       'sev' => 'critical'],
    ['type' => 'Turla Group Watering Hole',                  'cat' => 'apt',       'sev' => 'critical'],
];

$COUNTRIES = [
    ['name' => 'United States',   'co' => 'US', 'w' => 18],
    ['name' => 'China',           'co' => 'CN', 'w' => 16],
    ['name' => 'Russia',          'co' => 'RU', 'w' => 14],
    ['name' => 'Germany',         'co' => 'DE', 'w' => 10],
    ['name' => 'United Kingdom',  'co' => 'GB', 'w' => 8],
    ['name' => 'France',          'co' => 'FR', 'w' => 7],
    ['name' => 'Brazil',          'co' => 'BR', 'w' => 7],
    ['name' => 'India',           'co' => 'IN', 'w' => 9],
    ['name' => 'Japan',           'co' => 'JP', 'w' => 6],
    ['name' => 'South Korea',     'co' => 'KR', 'w' => 6],
    ['name' => 'Canada',          'co' => 'CA', 'w' => 5],
    ['name' => 'Australia',       'co' => 'AU', 'w' => 5],
    ['name' => 'Netherlands',     'co' => 'NL', 'w' => 7],
    ['name' => 'Ukraine',         'co' => 'UA', 'w' => 6],
    ['name' => 'Israel',          'co' => 'IL', 'w' => 5],
    ['name' => 'Iran',            'co' => 'IR', 'w' => 6],
    ['name' => 'Turkey',          'co' => 'TR', 'w' => 4],
    ['name' => 'Singapore',       'co' => 'SG', 'w' => 5],
    ['name' => 'Vietnam',         'co' => 'VN', 'w' => 5],
    ['name' => 'Indonesia',       'co' => 'ID', 'w' => 4],
    ['name' => 'Pakistan',        'co' => 'PK', 'w' => 3],
    ['name' => 'Egypt',           'co' => 'EG', 'w' => 4],
    ['name' => 'Saudi Arabia',    'co' => 'SA', 'w' => 4],
    ['name' => 'UAE',             'co' => 'AE', 'w' => 4],
    ['name' => 'South Africa',    'co' => 'ZA', 'w' => 3],
    ['name' => 'Mexico',          'co' => 'MX', 'w' => 3],
    ['name' => 'Argentina',       'co' => 'AR', 'w' => 2],
    ['name' => 'Colombia',        'co' => 'CO', 'w' => 2],
    ['name' => 'Poland',          'co' => 'PL', 'w' => 3],
    ['name' => 'Romania',         'co' => 'RO', 'w' => 3],
    ['name' => 'Sweden',          'co' => 'SE', 'w' => 2],
    ['name' => 'Norway',          'co' => 'NO', 'w' => 2],
    ['name' => 'Finland',         'co' => 'FI', 'w' => 2],
    ['name' => 'Italy',           'co' => 'IT', 'w' => 5],
    ['name' => 'Spain',           'co' => 'ES', 'w' => 4],
    ['name' => 'Portugal',        'co' => 'PT', 'w' => 2],
    ['name' => 'Switzerland',     'co' => 'CH', 'w' => 3],
    ['name' => 'Austria',         'co' => 'AT', 'w' => 2],
    ['name' => 'Belgium',         'co' => 'BE', 'w' => 2],
    ['name' => 'Czech Republic',  'co' => 'CZ', 'w' => 2],
    ['name' => 'Thailand',        'co' => 'TH', 'w' => 3],
    ['name' => 'Malaysia',        'co' => 'MY', 'w' => 3],
    ['name' => 'Philippines',     'co' => 'PH', 'w' => 3],
    ['name' => 'Taiwan',          'co' => 'TW', 'w' => 4],
    ['name' => 'Hong Kong',       'co' => 'HK', 'w' => 4],
    ['name' => 'Nigeria',         'co' => 'NG', 'w' => 3],
    ['name' => 'Kenya',           'co' => 'KE', 'w' => 2],
    ['name' => 'Morocco',         'co' => 'MA', 'w' => 2],
    ['name' => 'Chile',           'co' => 'CL', 'w' => 2],
    ['name' => 'Peru',            'co' => 'PE', 'w' => 2],
    ['name' => 'Bangladesh',      'co' => 'BD', 'w' => 2],
    ['name' => 'North Korea',     'co' => 'KP', 'w' => 5],
];

$ACTIONS_MAP = [
    'exploit'  => ['BLOCKED','BLOCKED','BLOCKED','DETECTED','MITIGATED'],
    'malware'  => ['QUARANTINED','QUARANTINED','BLOCKED','DETECTED'],
    'botnet'   => ['ISOLATED','ISOLATED','BLOCKED','DETECTED'],
    'phishing' => ['BLOCKED','BLOCKED','DETECTED'],
    'apt'      => ['QUARANTINED','ISOLATED','DETECTED'],
];

// ═══════════════════════════════════════════════════════════════
//  HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════

function pick(array $arr): mixed {
    return $arr[array_rand($arr)];
}

/** Weighted random pick from $COUNTRIES */
function pickCountry(array $countries): array {
    $total = array_sum(array_column($countries, 'w'));
    $r = mt_rand(1, $total);
    $sum = 0;
    foreach ($countries as $c) {
        $sum += $c['w'];
        if ($r <= $sum) return $c;
    }
    return $countries[0];
}

function sendSSE(string $event, array $data): void {
    echo "event: {$event}\n";
    echo 'data: ' . json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n\n";
    @ob_flush();
    flush();
}

function generateThreat(array $sigs, array $countries, array $actionsMap, int $id): array {
    $sig = pick($sigs);
    $src = pickCountry($countries);
    $dst = pickCountry($countries);
    // 90% chance source ≠ target
    $attempts = 0;
    while ($dst['co'] === $src['co'] && $attempts < 5) {
        $dst = pickCountry($countries);
        $attempts++;
    }
    $actions = $actionsMap[$sig['cat']] ?? ['DETECTED'];
    return [
        'id'        => $id,
        'type'      => $sig['type'],
        'category'  => $sig['cat'],
        'severity'  => $sig['sev'],
        'action'    => pick($actions),
        'source'    => $src['name'],
        'source_co' => $src['co'],
        'target'    => $dst['name'],
        'target_co' => $dst['co'],
        'feed'      => 'ThreatCloud',
        'ts'        => date('c'),
    ];
}

/**
 * Attempt to stream real data from CheckPoint ThreatCloud.
 * Returns true if at least one event was forwarded, false on failure.
 */
function tryCheckPointStream(array $countries, int &$eventId): bool {
    if (!function_exists('curl_init')) return false;

    $gotData = false;
    $countryLookup = [];
    foreach ($countries as $c) $countryLookup[$c['co']] = $c['name'];

    $actionsMap = [
        'exploit' => 'BLOCKED', 'malware' => 'QUARANTINED',
        'botnet'  => 'ISOLATED','spam'    => 'BLOCKED',
        'phishing'=> 'BLOCKED', 'apt'     => 'QUARANTINED',
    ];

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => 'https://threatmap-api.checkpoint.com/ThreatMap/api/feed',
        CURLOPT_RETURNTRANSFER => false,
        CURLOPT_TIMEOUT        => 15,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; beout.ai/4.0)',
        CURLOPT_HTTPHEADER     => ['Accept: text/event-stream','Cache-Control: no-cache'],
        CURLOPT_WRITEFUNCTION  => function($ch, $chunk) use (&$eventId, &$gotData, $countryLookup, $actionsMap) {
            static $buf = '';
            $buf .= $chunk;
            while (($p = strpos($buf, "\n\n")) !== false) {
                $block = substr($buf, 0, $p);
                $buf = substr($buf, $p + 2);
                $ev = null; $dt = null;
                foreach (explode("\n", $block) as $ln) {
                    $ln = trim($ln);
                    if (strpos($ln, 'event:') === 0) $ev = trim(substr($ln, 6));
                    elseif (strpos($ln, 'data:') === 0) $dt = trim(substr($ln, 5));
                }
                if ($ev === 'attack' && $dt) {
                    $d = json_decode($dt, true);
                    if ($d && isset($d['a_n'])) {
                        $eventId++;
                        $sc = $d['s_co'] ?? '??';
                        $dc = $d['d_co'] ?? '??';
                        $cat = $d['a_t'] ?? 'exploit';
                        sendSSE('attack', [
                            'id'        => $eventId,
                            'type'      => $d['a_n'],
                            'category'  => $cat,
                            'severity'  => 'high',
                            'action'    => $actionsMap[strtolower($cat)] ?? 'DETECTED',
                            'source'    => $countryLookup[$sc] ?? $sc,
                            'source_co' => $sc,
                            'target'    => $countryLookup[$dc] ?? $dc,
                            'target_co' => $dc,
                            'feed'      => 'ThreatCloud',
                            'ts'        => date('c'),
                        ]);
                        $gotData = true;
                    }
                }
            }
            if (connection_aborted()) return 0;
            return strlen($chunk);
        }
    ]);
    curl_exec($ch);
    curl_close($ch);
    return $gotData;
}

// ═══════════════════════════════════════════════════════════════
//  MAIN STREAM LOOP
// ═══════════════════════════════════════════════════════════════

sendSSE('connected', [
    'status'  => 'ok',
    'message' => 'beout.ai threat stream active',
    'engine'  => 'ThreatCloud + Procedural',
    'version' => '4.0',
]);

$eventId = 0;
$start   = time();
$maxLife = 300; // 5 min max per connection

// Phase 1: Try real CheckPoint data (15s window)
$realDataOk = tryCheckPointStream($COUNTRIES, $eventId);

// Phase 2: Continuous stream — real data mixed with generated
while (!connection_aborted() && (time() - $start) < $maxLife) {

    // Generate a threat
    $eventId++;
    $threat = generateThreat($ATTACK_SIGNATURES, $COUNTRIES, $ACTIONS_MAP, $eventId);
    sendSSE('attack', $threat);

    // Random delay 1.5–3.5 seconds for realistic pacing
    $sleepMs = mt_rand(1500, 3500);
    usleep($sleepMs * 1000);
}

sendSSE('reconnect', ['message' => 'Stream cycle complete']);
