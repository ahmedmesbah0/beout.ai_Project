<?php
/**
 * ╔══════════════════════════════════════════════╗
 * ║  beout.ai — Auto Translation Service          ║
 * ║  Translates EN → AR via Google Translate API  ║
 * ║  Caches results to avoid repeat API calls     ║
 * ╚══════════════════════════════════════════════╝
 */

declare(strict_types=1);

class Translator {
    private string $cacheFile;
    private array  $cache = [];
    private string $sourceLang;
    private string $targetLang;

    public function __construct(string $sourceLang = 'en', string $targetLang = 'ar') {
        $this->sourceLang = $sourceLang;
        $this->targetLang = $targetLang;
        $this->cacheFile  = __DIR__ . '/lang/.cache_' . $sourceLang . '_' . $targetLang . '.json';
        $this->loadCache();
    }

    /**
     * Translate a single string. Returns cached version if available.
     */
    public function translate(string $text): string {
        if (empty(trim($text))) return $text;

        $key = md5($text);
        if (isset($this->cache[$key])) {
            return $this->cache[$key];
        }

        $translated = $this->callGoogleTranslate($text);
        if ($translated !== null) {
            $this->cache[$key] = $translated;
            $this->saveCache();
            return $translated;
        }

        return $text; // Fallback: return original
    }

    /**
     * Translate an entire array of strings (like a lang file).
     * Preserves keys and handles nested arrays (like taglines).
     */
    public function translateArray(array $source): array {
        $result = [];
        foreach ($source as $k => $v) {
            // Skip non-translatable keys
            if (in_array($k, ['lang_code', 'lang_dir', 'lang_toggle'], true)) {
                continue;
            }
            if (is_array($v)) {
                $result[$k] = array_map(fn($s) => $this->translate($s), $v);
            } else {
                $result[$k] = $this->translate($v);
            }
        }
        return $result;
    }

    /**
     * Call Google Translate (free public API — no key needed).
     */
    private function callGoogleTranslate(string $text): ?string {
        // Strip HTML for translation, preserve tags
        $clean = strip_tags($text);
        $hasHtml = ($clean !== $text);

        $url = 'https://translate.googleapis.com/translate_a/single?'
             . http_build_query([
                 'client' => 'gtx',
                 'sl'     => $this->sourceLang,
                 'tl'     => $this->targetLang,
                 'dt'     => 't',
                 'q'      => $text,
             ]);

        $ctx = stream_context_create([
            'http' => [
                'timeout'     => 5,
                'user_agent'  => 'Mozilla/5.0 (compatible; beout.ai/1.0)',
                'ignore_errors' => true,
            ],
        ]);

        $response = @file_get_contents($url, false, $ctx);
        if ($response === false) return null;

        $data = json_decode($response, true);
        if (!$data || !isset($data[0])) return null;

        // Reassemble translated text from segments
        $translated = '';
        foreach ($data[0] as $segment) {
            if (isset($segment[0])) {
                $translated .= $segment[0];
            }
        }

        return $translated ?: null;
    }

    private function loadCache(): void {
        if (file_exists($this->cacheFile)) {
            $data = json_decode(file_get_contents($this->cacheFile), true);
            if (is_array($data)) $this->cache = $data;
        }
    }

    private function saveCache(): void {
        $dir = dirname($this->cacheFile);
        if (!is_dir($dir)) mkdir($dir, 0755, true);
        file_put_contents(
            $this->cacheFile,
            json_encode($this->cache, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE)
        );
    }

    /**
     * Generate a complete lang file from English source.
     * Only re-translates strings that have changed.
     */
    public static function generateLangFile(string $langDir): array {
        $enStrings = require $langDir . '/en.php';
        $translator = new self('en', 'ar');

        $ar = [
            'lang_code'   => 'ar',
            'lang_dir'    => 'rtl',
            'lang_toggle' => 'English',
        ];

        $translated = $translator->translateArray($enStrings);
        return array_merge($ar, $translated);
    }
}
