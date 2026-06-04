<?php
/**
 * beout.ai — Real-Time Threat Feed Proxy
 * Fetches LIVE attack data from Check Point ThreatCloud
 * via their public ThreatMap SSE feed.
 *
 * Reads SSE stream for ~8 seconds, caches for 30 seconds.
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=30');

// --- Short cache so repeat requests are instant ---
$cacheFile = __DIR__ . '/threat_cache.json';
if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < 30) {
    readfile($cacheFile);
    exit;
}

// --- Country code to name mapping (full ISO 3166-1) ---
$countryNames = [
    'AF' => 'Afghanistan', 'AL' => 'Albania', 'DZ' => 'Algeria', 'AS' => 'American Samoa',
    'AD' => 'Andorra', 'AO' => 'Angola', 'AI' => 'Anguilla', 'AQ' => 'Antarctica',
    'AG' => 'Antigua & Barbuda', 'AR' => 'Argentina', 'AM' => 'Armenia', 'AW' => 'Aruba',
    'AU' => 'Australia', 'AT' => 'Austria', 'AZ' => 'Azerbaijan', 'BS' => 'Bahamas',
    'BH' => 'Bahrain', 'BD' => 'Bangladesh', 'BB' => 'Barbados', 'BY' => 'Belarus',
    'BE' => 'Belgium', 'BZ' => 'Belize', 'BJ' => 'Benin', 'BM' => 'Bermuda',
    'BT' => 'Bhutan', 'BO' => 'Bolivia', 'BA' => 'Bosnia & Herzegovina', 'BW' => 'Botswana',
    'BR' => 'Brazil', 'BN' => 'Brunei', 'BG' => 'Bulgaria', 'BF' => 'Burkina Faso',
    'BI' => 'Burundi', 'KH' => 'Cambodia', 'CM' => 'Cameroon', 'CA' => 'Canada',
    'CV' => 'Cape Verde', 'KY' => 'Cayman Islands', 'CF' => 'Central African Republic',
    'TD' => 'Chad', 'CL' => 'Chile', 'CN' => 'China', 'CO' => 'Colombia',
    'KM' => 'Comoros', 'CG' => 'Congo', 'CD' => 'DR Congo', 'CK' => 'Cook Islands',
    'CR' => 'Costa Rica', 'CI' => 'Ivory Coast', 'HR' => 'Croatia', 'CU' => 'Cuba',
    'CW' => 'Curacao', 'CY' => 'Cyprus', 'CZ' => 'Czech Republic', 'DK' => 'Denmark',
    'DJ' => 'Djibouti', 'DM' => 'Dominica', 'DO' => 'Dominican Republic', 'EC' => 'Ecuador',
    'EG' => 'Egypt', 'SV' => 'El Salvador', 'GQ' => 'Equatorial Guinea', 'ER' => 'Eritrea',
    'EE' => 'Estonia', 'SZ' => 'Eswatini', 'ET' => 'Ethiopia', 'FK' => 'Falkland Islands',
    'FO' => 'Faroe Islands', 'FJ' => 'Fiji', 'FI' => 'Finland', 'FR' => 'France',
    'GF' => 'French Guiana', 'PF' => 'French Polynesia', 'GA' => 'Gabon', 'GM' => 'Gambia',
    'GE' => 'Georgia', 'DE' => 'Germany', 'GH' => 'Ghana', 'GI' => 'Gibraltar',
    'GR' => 'Greece', 'GL' => 'Greenland', 'GD' => 'Grenada', 'GP' => 'Guadeloupe',
    'GU' => 'Guam', 'GT' => 'Guatemala', 'GG' => 'Guernsey', 'GN' => 'Guinea',
    'GW' => 'Guinea-Bissau', 'GY' => 'Guyana', 'HT' => 'Haiti', 'HN' => 'Honduras',
    'HK' => 'Hong Kong', 'HU' => 'Hungary', 'IS' => 'Iceland', 'IN' => 'India',
    'ID' => 'Indonesia', 'IR' => 'Iran', 'IQ' => 'Iraq', 'IE' => 'Ireland',
    'IM' => 'Isle of Man', 'IL' => 'Israel', 'IT' => 'Italy', 'JM' => 'Jamaica',
    'JP' => 'Japan', 'JE' => 'Jersey', 'JO' => 'Jordan', 'KZ' => 'Kazakhstan',
    'KE' => 'Kenya', 'KI' => 'Kiribati', 'KP' => 'North Korea', 'KR' => 'South Korea',
    'KW' => 'Kuwait', 'KG' => 'Kyrgyzstan', 'LA' => 'Laos', 'LV' => 'Latvia',
    'LB' => 'Lebanon', 'LS' => 'Lesotho', 'LR' => 'Liberia', 'LY' => 'Libya',
    'LI' => 'Liechtenstein', 'LT' => 'Lithuania', 'LU' => 'Luxembourg', 'MO' => 'Macau',
    'MG' => 'Madagascar', 'MW' => 'Malawi', 'MY' => 'Malaysia', 'MV' => 'Maldives',
    'ML' => 'Mali', 'MT' => 'Malta', 'MH' => 'Marshall Islands', 'MQ' => 'Martinique',
    'MR' => 'Mauritania', 'MU' => 'Mauritius', 'YT' => 'Mayotte', 'MX' => 'Mexico',
    'FM' => 'Micronesia', 'MD' => 'Moldova', 'MC' => 'Monaco', 'MN' => 'Mongolia',
    'ME' => 'Montenegro', 'MS' => 'Montserrat', 'MA' => 'Morocco', 'MZ' => 'Mozambique',
    'MM' => 'Myanmar', 'NA' => 'Namibia', 'NR' => 'Nauru', 'NP' => 'Nepal',
    'NL' => 'Netherlands', 'NC' => 'New Caledonia', 'NZ' => 'New Zealand', 'NI' => 'Nicaragua',
    'NE' => 'Niger', 'NG' => 'Nigeria', 'NU' => 'Niue', 'NF' => 'Norfolk Island',
    'MK' => 'North Macedonia', 'MP' => 'Northern Mariana Islands', 'NO' => 'Norway',
    'OM' => 'Oman', 'PK' => 'Pakistan', 'PW' => 'Palau', 'PS' => 'Palestine',
    'PA' => 'Panama', 'PG' => 'Papua New Guinea', 'PY' => 'Paraguay', 'PE' => 'Peru',
    'PH' => 'Philippines', 'PL' => 'Poland', 'PT' => 'Portugal', 'PR' => 'Puerto Rico',
    'QA' => 'Qatar', 'RE' => 'Reunion', 'RO' => 'Romania', 'RU' => 'Russia',
    'RW' => 'Rwanda', 'BL' => 'Saint Barthelemy', 'SH' => 'Saint Helena',
    'KN' => 'Saint Kitts & Nevis', 'LC' => 'Saint Lucia', 'MF' => 'Saint Martin',
    'PM' => 'Saint Pierre & Miquelon', 'VC' => 'Saint Vincent & Grenadines',
    'WS' => 'Samoa', 'SM' => 'San Marino', 'ST' => 'Sao Tome & Principe',
    'SA' => 'Saudi Arabia', 'SN' => 'Senegal', 'RS' => 'Serbia', 'SC' => 'Seychelles',
    'SL' => 'Sierra Leone', 'SG' => 'Singapore', 'SX' => 'Sint Maarten', 'SK' => 'Slovakia',
    'SI' => 'Slovenia', 'SB' => 'Solomon Islands', 'SO' => 'Somalia', 'ZA' => 'South Africa',
    'SS' => 'South Sudan', 'ES' => 'Spain', 'LK' => 'Sri Lanka', 'SD' => 'Sudan',
    'SR' => 'Suriname', 'SE' => 'Sweden', 'CH' => 'Switzerland', 'SY' => 'Syria',
    'TW' => 'Taiwan', 'TJ' => 'Tajikistan', 'TZ' => 'Tanzania', 'TH' => 'Thailand',
    'TL' => 'Timor-Leste', 'TG' => 'Togo', 'TK' => 'Tokelau', 'TO' => 'Tonga',
    'TT' => 'Trinidad & Tobago', 'TN' => 'Tunisia', 'TR' => 'Turkey', 'TM' => 'Turkmenistan',
    'TC' => 'Turks & Caicos', 'TV' => 'Tuvalu', 'UG' => 'Uganda', 'UA' => 'Ukraine',
    'AE' => 'UAE', 'GB' => 'United Kingdom', 'US' => 'United States', 'UY' => 'Uruguay',
    'UZ' => 'Uzbekistan', 'VU' => 'Vanuatu', 'VA' => 'Vatican City', 'VE' => 'Venezuela',
    'VN' => 'Vietnam', 'VG' => 'British Virgin Islands', 'VI' => 'U.S. Virgin Islands',
    'WF' => 'Wallis & Futuna', 'EH' => 'Western Sahara', 'YE' => 'Yemen', 'ZM' => 'Zambia',
    'ZW' => 'Zimbabwe', 'XK' => 'Kosovo',
];

// --- Map attack type to action ---
function mapAction($type) {
    $map = [
        'exploit'  => 'BLOCKED',
        'malware'  => 'QUARANTINED',
        'botnet'   => 'ISOLATED',
        'spam'     => 'BLOCKED',
        'phishing' => 'BLOCKED',
        'apt'      => 'QUARANTINED',
    ];
    return $map[strtolower($type)] ?? 'DETECTED';
}

// --- Fetch from Check Point ThreatMap SSE ---
function fetchCheckPointFeed() {
    $url = 'https://threatmap-api.checkpoint.com/ThreatMap/api/feed';

    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_TIMEOUT        => 8,
        CURLOPT_CONNECTTIMEOUT => 5,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; beout.ai-ticker/2.0)',
        CURLOPT_HTTPHEADER     => [
            'Accept: text/event-stream',
            'Cache-Control: no-cache',
        ],
    ]);

    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $curlError = curl_error($ch);
    curl_close($ch);

    if ($httpCode !== 200 || !$response) {
        error_log("[beout.ai] Check Point feed error: HTTP $httpCode - $curlError");
        return ['attacks' => [], 'today' => 0];
    }

    // Normalize line endings then parse SSE events
    $response = str_replace("\r\n", "\n", $response);
    $response = str_replace("\r", "\n", $response);

    $attacks = [];
    $todayCount = 0;
    $lines = explode("\n", $response);
    $currentEvent = null;
    $currentData  = null;

    foreach ($lines as $line) {
        $line = trim($line);

        if (strpos($line, 'event:') === 0) {
            $currentEvent = trim(substr($line, 6));
        } elseif (strpos($line, 'data:') === 0) {
            $currentData = trim(substr($line, 5));
        } elseif ($line === '' && $currentEvent === 'attack' && $currentData) {
            $data = json_decode($currentData, true);
            if ($data && isset($data['a_n'])) {
                $attacks[] = $data;
            }
            $currentEvent = null;
            $currentData  = null;
        } elseif ($line === '' && $currentEvent === 'counter' && $currentData) {
            // Parse global counter
            $cData = json_decode($currentData, true);
            if ($cData && isset($cData['today'])) {
                $todayCount = $cData['today'];
            }
            $currentEvent = null;
            $currentData  = null;
        }
    }

    return ['attacks' => $attacks, 'today' => $todayCount];
}

// --- Main ---
$result = fetchCheckPointFeed();
$rawAttacks = $result['attacks'];
$todayGlobal = $result['today'];
$threats = [];
$seen = [];

// Deduplicate: same attack name + same source→target = 1 entry
// But accumulate the hit count
foreach ($rawAttacks as $attack) {
    $srcCountry = $attack['s_co'] ?? '??';
    $dstCountry = $attack['d_co'] ?? '??';

    $key = ($attack['a_n'] ?? '') . '|' . $srcCountry . '|' . $dstCountry;

    if (isset($seen[$key])) {
        // Add to the existing entry's count
        $threats[$seen[$key]]['count'] += ($attack['a_c'] ?? 1);
        continue;
    }

    $srcName = $countryNames[$srcCountry] ?? $srcCountry;
    $dstName = $countryNames[$dstCountry] ?? $dstCountry;

    $seen[$key] = count($threats);
    $threats[] = [
        'type'       => $attack['a_n'] ?? 'Unknown Attack',
        'category'   => $attack['a_t'] ?? 'exploit',
        'action'     => mapAction($attack['a_t'] ?? ''),
        'source'     => $srcName,
        'source_co'  => $srcCountry,
        'target'     => $dstName,
        'target_co'  => $dstCountry,
        'count'      => $attack['a_c'] ?? 1,
        'feed'       => 'ThreatCloud',
    ];
}

$output = [
    'status'       => count($threats) > 0 ? 'ok' : 'empty',
    'count'        => count($threats),
    'today_global' => $todayGlobal,
    'updated'      => date('c'),
    'source'       => 'Check Point ThreatCloud — LIVE',
    'threats'      => array_values($threats),
];

$json = json_encode($output, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE);

// Cache for 30 seconds
file_put_contents($cacheFile, $json);

echo $json;
