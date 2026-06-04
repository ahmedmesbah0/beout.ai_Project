<?php
/**
 * beout.ai — Real-Time SSE Threat Stream Proxy
 * 
 * Opens a persistent SSE connection to Check Point ThreatCloud
 * and re-broadcasts each attack event to the browser in real-time.
 * 
 * The browser connects once via EventSource and receives
 * individual attack events as they happen — no polling, no repeats.
 */

// Prevent PHP from buffering output
@ini_set('output_buffering', 'off');
@ini_set('zlib.output_compression', false);
if (function_exists('apache_setenv')) {
    @apache_setenv('no-gzip', '1');
}

// SSE headers
header('Content-Type: text/event-stream');
header('Cache-Control: no-cache, no-store, must-revalidate');
header('Pragma: no-cache');
header('Expires: 0');
header('Access-Control-Allow-Origin: *');
header('X-Accel-Buffering: no'); // Nginx

// Flush any existing buffers
while (ob_get_level()) ob_end_flush();

// Country code to name mapping
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

/**
 * Send a single SSE event to the browser.
 */
function sendSSE($event, $data) {
    echo "event: {$event}\n";
    echo "data: " . json_encode($data, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . "\n\n";
    flush();
}

/**
 * Transform a raw CheckPoint attack object into our format.
 */
function transformAttack($attack, $countryNames) {
    $srcCountry = $attack['s_co'] ?? '??';
    $dstCountry = $attack['d_co'] ?? '??';
    $srcName = $countryNames[$srcCountry] ?? $srcCountry;
    $dstName = $countryNames[$dstCountry] ?? $dstCountry;

    return [
        'type'       => $attack['a_n'] ?? 'Unknown Attack',
        'category'   => $attack['a_t'] ?? 'exploit',
        'action'     => mapAction($attack['a_t'] ?? ''),
        'source'     => $srcName,
        'source_co'  => $srcCountry,
        'target'     => $dstName,
        'target_co'  => $dstCountry,
        'count'      => $attack['a_c'] ?? 1,
        'feed'       => 'ThreatCloud',
        'ts'         => date('c'),
    ];
}

// Send initial connection event
sendSSE('connected', ['status' => 'ok', 'message' => 'Live stream connected']);

$eventId = 0;
$connectionStart = time();
$maxDuration = 300; // Keep connection open for 5 minutes max, then browser reconnects

// Keep reconnecting to CheckPoint's feed and streaming results
while (true) {
    // Check if browser disconnected
    if (connection_aborted()) break;
    
    // Check max connection duration
    if ((time() - $connectionStart) >= $maxDuration) {
        sendSSE('reconnect', ['message' => 'Stream duration limit reached, please reconnect']);
        break;
    }

    // Open a curl connection to CheckPoint's SSE feed
    $url = 'https://threatmap-api.checkpoint.com/ThreatMap/api/feed';
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL            => $url,
        CURLOPT_RETURNTRANSFER => false,
        CURLOPT_TIMEOUT        => 30,
        CURLOPT_CONNECTTIMEOUT => 10,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; beout.ai-ticker/3.0)',
        CURLOPT_HTTPHEADER     => [
            'Accept: text/event-stream',
            'Cache-Control: no-cache',
        ],
        // Use a write callback to process data as it arrives — NO caching, NO dedup
        CURLOPT_WRITEFUNCTION  => function($ch, $chunk) use (&$eventId, $countryNames) {
            static $buffer = '';
            $buffer .= $chunk;
            
            // Process complete SSE events (double newline separated)
            while (($pos = strpos($buffer, "\n\n")) !== false) {
                $eventBlock = substr($buffer, 0, $pos);
                $buffer = substr($buffer, $pos + 2);
                
                // Parse the SSE event block
                $currentEvent = null;
                $currentData = null;
                
                $lines = explode("\n", $eventBlock);
                foreach ($lines as $line) {
                    $line = trim($line);
                    if (strpos($line, 'event:') === 0) {
                        $currentEvent = trim(substr($line, 6));
                    } elseif (strpos($line, 'data:') === 0) {
                        $currentData = trim(substr($line, 5));
                    }
                }
                
                if ($currentEvent === 'attack' && $currentData) {
                    $data = json_decode($currentData, true);
                    if ($data && isset($data['a_n'])) {
                        $eventId++;
                        
                        $threat = transformAttack($data, $countryNames);
                        $threat['id'] = $eventId;
                        
                        // Stream every single attack — zero filtering
                        sendSSE('attack', $threat);
                    }
                } elseif ($currentEvent === 'counter' && $currentData) {
                    $cData = json_decode($currentData, true);
                    if ($cData && isset($cData['today'])) {
                        sendSSE('counter', ['today' => $cData['today']]);
                    }
                }
            }
            
            // Check if browser disconnected
            if (connection_aborted()) return 0;
            
            return strlen($chunk);
        }
    ]);
    
    curl_exec($ch);
    $curlError = curl_error($ch);
    curl_close($ch);
    
    // If CheckPoint connection dropped, wait a moment and reconnect
    if (connection_aborted()) break;
    
    // Send a heartbeat / reconnecting notice
    sendSSE('info', ['message' => 'Reconnecting to ThreatCloud...', 'error' => $curlError]);
    sleep(2);
}
