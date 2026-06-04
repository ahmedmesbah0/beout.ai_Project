/* ==============================================
   beout.ai — Coming Soon | JavaScript
   Bilingual EN / AR with full i18n
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCountdown();
    initThreatTicker();
    initScrollReveal();
    initForm();
    initLangToggle();
    initCurrentYear();
    // Typing starts after a short delay
    setTimeout(() => initTyping(), 1200);
});

/* ============================================
   INTERNATIONALIZATION (i18n)
   ============================================ */
const i18n = {
    en: {
        nav_status: 'Systems Initializing',
        hero_desc: 'Egypt\'s first <strong>AI-native cybersecurity</strong> ecosystem.<br>Predictive protection. Autonomous investigation. Zero compromise.',
        pill_horus: 'AI Firewall',
        pill_anubis: 'Endpoint AI',
        pill_thoth: 'Threat Intel',
        pill_maat: 'Email Guard',
        pill_ra: 'SOC-as-a-Service',
        countdown_label: 'Launching In',
        cd_days: 'Days',
        cd_hours: 'Hours',
        cd_min: 'Minutes',
        cd_sec: 'Seconds',
        signup_label: 'Get early access. Be the first to know.',
        email_placeholder: 'Enter your email address',
        cta_btn: 'Notify Me',
        signup_success: '✅ You\'re on the list! We\'ll notify you at launch.',
        ticker_label: 'LIVE THREAT FEED',
        stat_monitoring: 'AI Monitoring',
        stat_response: 'Threat Response',
        stat_detection: 'Detection Rate',
        stat_api: 'External APIs',
        features_title: 'What\'s Coming',
        feat_ai_t: 'Local AI Detection',
        feat_ai_d: 'On-premise AI engine that detects threats in real-time — no external API calls, no data leaves your network.',
        feat_inv_t: 'Auto Investigation',
        feat_inv_d: 'When an attack hits, our AI automatically investigates — identifies source, timeline, affected devices, and isolates threats.',
        feat_col_t: 'Collective Intelligence',
        feat_col_d: 'Every client\'s detection strengthens the network. A threat found once is blocked everywhere — instantly.',
        feat_comp_t: 'PDPL & ISO 27001',
        feat_comp_d: 'Built-in compliance engine for Egypt\'s PDPL, ISO 27001, and PCI-DSS — automated reports in Arabic & English.',
        feat_dark_t: 'Dark Web Monitoring',
        feat_dark_d: 'AI crawls the dark web 24/7 — detecting leaked credentials, brand impersonation, and threat actor activity.',
        feat_dep_t: '25-Minute Deployment',
        feat_dep_d: 'Download the OVF, plug it in as a network bridge, enter your license key — full protection in under 25 minutes.',
        footer_tagline: 'Egypt\'s First AI-Native Cybersecurity Company',
        footer_rights: 'All rights reserved.',
        lang_toggle: 'العربية',
        taglines: [
            'AI Threat Detection & Response',
            'The Eye That Never Closes',
            'Predictive. Autonomous. Egyptian.',
            'FortiGate Alternative — Powered by AI',
            'Your data stays yours. Threats don\'t stay long.',
            'Zero external APIs. 100% local AI.'
        ]
    },
    ar: {
        nav_status: 'جارٍ تهيئة الأنظمة',
        hero_desc: 'أول منظومة <strong>أمن سيبراني بالذكاء الاصطناعي</strong> في مصر.<br>حماية استباقية. تحقيق تلقائي. بدون تنازل.',
        pill_horus: 'جدار ناري ذكي',
        pill_anubis: 'حماية الأجهزة',
        pill_thoth: 'استخبارات التهديدات',
        pill_maat: 'حماية البريد',
        pill_ra: 'مركز عمليات أمني',
        countdown_label: 'الإطلاق بعد',
        cd_days: 'يوم',
        cd_hours: 'ساعة',
        cd_min: 'دقيقة',
        cd_sec: 'ثانية',
        signup_label: 'احصل على وصول مبكر. كن أول من يعرف.',
        email_placeholder: 'أدخل بريدك الإلكتروني',
        cta_btn: 'أبلغني',
        signup_success: '✅ تمت إضافتك! سنبلغك فور الإطلاق.',
        ticker_label: 'LIVE THREAT FEED',
        stat_monitoring: 'مراقبة بالذكاء الاصطناعي',
        stat_response: 'سرعة الاستجابة',
        stat_detection: 'معدل الكشف',
        stat_api: 'واجهات خارجية',
        features_title: 'ما الذي سيأتي',
        feat_ai_t: 'كشف محلي بالذكاء الاصطناعي',
        feat_ai_d: 'محرك ذكاء اصطناعي محلي يكتشف التهديدات لحظياً — بدون اتصال خارجي، بياناتك لا تغادر شبكتك أبداً.',
        feat_inv_t: 'تحقيق تلقائي',
        feat_inv_d: 'عند حدوث هجوم، الذكاء الاصطناعي يحقق تلقائياً — يحدد المصدر، الجدول الزمني، الأجهزة المتأثرة، ويعزل التهديد.',
        feat_col_t: 'ذكاء جماعي',
        feat_col_d: 'كل اكتشاف عند أي عميل يقوي الشبكة بأكملها. تهديد يُكتشف مرة واحدة يُحظر في كل مكان — فوراً.',
        feat_comp_t: 'PDPL و ISO 27001',
        feat_comp_d: 'محرك امتثال مدمج لقانون حماية البيانات المصري، ISO 27001، و PCI-DSS — تقارير تلقائية بالعربية والإنجليزية.',
        feat_dark_t: 'مراقبة الدارك ويب',
        feat_dark_d: 'الذكاء الاصطناعي يراقب الدارك ويب على مدار الساعة — يكشف تسريب بيانات الاعتماد وانتحال العلامة التجارية.',
        feat_dep_t: 'تشغيل في 25 دقيقة',
        feat_dep_d: 'حمّل ملف الـ OVF، وصّله كجسر شبكة، أدخل مفتاح الترخيص — حماية كاملة في أقل من 25 دقيقة.',
        footer_tagline: 'أول شركة أمن سيبراني بالذكاء الاصطناعي في مصر',
        footer_rights: 'جميع الحقوق محفوظة.',
        lang_toggle: 'English',
        taglines: [
            'كشف التهديدات والاستجابة بالذكاء الاصطناعي',
            'العين التي لا تنام',
            'استباقي. مستقل. مصري.',
            'بديل FortiGate — مدعوم بالذكاء الاصطناعي',
            'بياناتك تبقى لك. التهديدات لا تبقى طويلاً.',
            'بدون واجهات خارجية. ذكاء اصطناعي محلي 100%.'
        ]
    }
};

let currentLang = 'en';

function setLang(lang) {
    currentLang = lang;
    const t = i18n[lang];
    const html = document.documentElement;

    // Direction & lang attribute
    html.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    // Update page title & meta
    document.title = lang === 'ar'
        ? 'beout.ai — أمن سيبراني بالذكاء الاصطناعي | قريباً'
        : 'beout.ai — AI-Powered Cybersecurity | Coming Soon';
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', lang === 'ar'
            ? 'beout.ai تبني أول منظومة أمن سيبراني متكاملة بالذكاء الاصطناعي في مصر. كشف تهديدات، تحقيق تلقائي، حماية استباقية.'
            : 'beout.ai is building Egypt\'s first complete AI cybersecurity ecosystem. AI-powered threat detection, autonomous investigation, and predictive security.');
    }

    // Text content via data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) {
            el.innerHTML = t[key];
        }
    });

    // Placeholders
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    // Toggle button text
    const toggleText = document.getElementById('lang-toggle-text');
    if (toggleText) toggleText.textContent = t.lang_toggle;

    // Restart typing with new language taglines
    restartTyping();

    // Save preference
    try { localStorage.setItem('beout_lang', lang); } catch(e) {}
}

function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
    if (!btn) return;
    btn.addEventListener('click', () => {
        setLang(currentLang === 'en' ? 'ar' : 'en');
    });

    // Restore saved language
    try {
        const saved = localStorage.getItem('beout_lang');
        if (saved === 'ar') setLang('ar');
    } catch(e) {}
}

/* ============================================
   TYPING EFFECT
   ============================================ */
let typingTimeout = null;

function restartTyping() {
    if (typingTimeout) clearTimeout(typingTimeout);
    const el = document.getElementById('tagline-text');
    if (el) el.textContent = '';
    setTimeout(() => initTyping(), 400);
}

function initTyping() {
    const el = document.getElementById('tagline-text');
    if (!el) return;
    const phrases = i18n[currentLang].taglines;
    let pi = 0, ci = 0, deleting = false;

    function step() {
        const txt = phrases[pi];
        if (!deleting) {
            el.textContent = txt.substring(0, ci + 1);
            ci++;
            if (ci === txt.length) {
                deleting = true;
                typingTimeout = setTimeout(step, 2500);
                return;
            }
            typingTimeout = setTimeout(step, 55);
        } else {
            el.textContent = txt.substring(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
            typingTimeout = setTimeout(step, 30);
        }
    }
    step();
}

/* ============================================
   PARTICLE BACKGROUND
   ============================================ */
function initParticles() {
    const c = document.getElementById('particle-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let particles = [];
    let mouse = { x: null, y: null };

    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; });

    class P {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * c.width;
            this.y = Math.random() * c.height;
            this.s = Math.random() * 1.8 + 0.3;
            this.vx = (Math.random() - 0.5) * 0.4;
            this.vy = (Math.random() - 0.5) * 0.4;
            this.o = Math.random() * 0.5 + 0.1;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (mouse.x !== null) {
                const dx = mouse.x - this.x, dy = mouse.y - this.y;
                const d = Math.sqrt(dx*dx + dy*dy);
                if (d < 120) { this.x -= dx * 0.008; this.y -= dy * 0.008; }
            }
            if (this.x < 0 || this.x > c.width) this.vx *= -1;
            if (this.y < 0 || this.y > c.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath(); ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,229,255,${this.o})`; ctx.fill();
        }
    }

    const n = Math.min(80, Math.floor(window.innerWidth / 15));
    for (let i = 0; i < n; i++) particles.push(new P());

    function lines() {
        for (let i = 0; i < particles.length; i++)
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x, dy = particles[i].y - particles[j].y;
                const d = Math.sqrt(dx*dx + dy*dy);
                if (d < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0,229,255,${0.06 * (1 - d / 140)})`;
                    ctx.lineWidth = 0.5; ctx.stroke();
                }
            }
    }

    (function animate() {
        ctx.clearRect(0, 0, c.width, c.height);
        particles.forEach(p => { p.update(); p.draw(); });
        lines();
        requestAnimationFrame(animate);
    })();
}

/* ============================================
   COUNTDOWN
   ============================================ */
function initCountdown() {
    // Fixed launch date: 16 October 2026 at midnight UTC
    const launchDate = new Date('2026-10-16T00:00:00Z');
    let intervalId = null;

    function tick() {
        const now = new Date();
        const diff = launchDate - now;

        if (diff <= 0) {
            // Launch date has passed — hide countdown
            clearInterval(intervalId);
            const section = document.getElementById('countdown-section');
            if (section) section.style.display = 'none';
            return;
        }

        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);

        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minEl = document.getElementById('cd-min');
        const secEl = document.getElementById('cd-sec');

        if (daysEl) daysEl.textContent = String(d).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(h).padStart(2, '0');
        if (minEl) minEl.textContent = String(m).padStart(2, '0');
        if (secEl) secEl.textContent = String(s).padStart(2, '0');
    }

    tick();
    intervalId = setInterval(tick, 1000);
}

/* ============================================
   THREAT TICKER — Live Feed with Dynamic Generator
   Real CheckPoint SSE when available, otherwise
   procedurally generated realistic threats.
   ============================================ */

// Country code → flag emoji
const countryFlag = (co) => {
    if (!co || co.length !== 2) return '';
    return String.fromCodePoint(...[...co.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};

// Rolling live threat queue
const MAX_TICKER_ITEMS = 30;
let liveThreats = [];
let isLiveConnected = false;
let sseRetryCount = 0;
let generatorInterval = null;

/* ---------- THREAT DATA POOLS ---------- */
const ATTACK_SIGNATURES = [
    // Exploits
    { type: 'Apache Log4j RCE (CVE-2021-44228)', category: 'exploit' },
    { type: 'Spring4Shell RCE (CVE-2022-22965)', category: 'exploit' },
    { type: 'Microsoft Exchange ProxyShell', category: 'exploit' },
    { type: 'Fortinet FortiOS Path Traversal', category: 'exploit' },
    { type: 'Citrix ADC Remote Code Execution', category: 'exploit' },
    { type: 'VMware vCenter Server RCE', category: 'exploit' },
    { type: 'Confluence OGNL Injection (CVE-2022-26134)', category: 'exploit' },
    { type: 'SolarWinds Orion Supply Chain', category: 'exploit' },
    { type: 'MOVEit Transfer SQL Injection', category: 'exploit' },
    { type: 'Ivanti Connect Secure Auth Bypass', category: 'exploit' },
    { type: 'HTTP Headers Remote Code Execution', category: 'exploit' },
    { type: 'OpenSSL TLS Downgrade Attack', category: 'exploit' },
    { type: 'SQL Injection via Web Form', category: 'exploit' },
    { type: 'WordPress Remote Code Execution', category: 'exploit' },
    { type: 'SSH Brute Force Attack', category: 'exploit' },
    { type: 'DNS Amplification DDoS', category: 'exploit' },
    { type: 'Apache Struts2 OGNL Injection', category: 'exploit' },
    { type: 'PHP CGI Argument Injection', category: 'exploit' },
    { type: 'Pulse Secure VPN Auth Bypass', category: 'exploit' },
    { type: 'F5 BIG-IP iControl REST RCE', category: 'exploit' },
    { type: 'Zyxel Firewall OS Command Injection', category: 'exploit' },
    { type: 'Palo Alto PAN-OS GlobalProtect RCE', category: 'exploit' },
    { type: 'Oracle WebLogic Deserialization', category: 'exploit' },
    { type: 'Cisco IOS XE Web UI Privilege Escalation', category: 'exploit' },
    { type: 'Atlassian Bitbucket Command Injection', category: 'exploit' },
    { type: 'Nginx Path Traversal (CVE-2024-7347)', category: 'exploit' },
    { type: 'GitLab CE/EE Pipeline Execution', category: 'exploit' },
    { type: 'Redis Unauthorized Access RCE', category: 'exploit' },
    { type: 'Elasticsearch Remote Code Execution', category: 'exploit' },
    { type: 'Jenkins Script Console RCE', category: 'exploit' },
    // Malware
    { type: 'Emotet Trojan Distribution', category: 'malware' },
    { type: 'LockBit 3.0 Ransomware Deployment', category: 'malware' },
    { type: 'BlackCat ALPHV Ransomware', category: 'malware' },
    { type: 'QakBot Loader Activity', category: 'malware' },
    { type: 'Cobalt Strike Beacon C2', category: 'malware' },
    { type: 'AsyncRAT Payload Delivery', category: 'malware' },
    { type: 'Formbook Infostealer Distribution', category: 'malware' },
    { type: 'AgentTesla Keylogger Delivery', category: 'malware' },
    { type: 'Remcos RAT C2 Communication', category: 'malware' },
    { type: 'RedLine Stealer Exfiltration', category: 'malware' },
    { type: 'Raccoon Stealer v2 Distribution', category: 'malware' },
    { type: 'IcedID Banking Trojan Dropper', category: 'malware' },
    { type: 'SmokeLoader Payload Delivery', category: 'malware' },
    { type: 'Vidar Infostealer Campaign', category: 'malware' },
    { type: 'XWorm RAT Activity Detected', category: 'malware' },
    // Botnet
    { type: 'Dridex Banking Trojan C2', category: 'botnet' },
    { type: 'Mirai Botnet Propagation', category: 'botnet' },
    { type: 'TrickBot C2 Communication', category: 'botnet' },
    { type: 'Mozi IoT Botnet Activity', category: 'botnet' },
    { type: 'Androxgh0st Botnet Scan', category: 'botnet' },
    { type: 'Volt Typhoon Infrastructure Probe', category: 'botnet' },
    // Phishing
    { type: 'Microsoft 365 Credential Phishing', category: 'phishing' },
    { type: 'DocuSign Impersonation Campaign', category: 'phishing' },
    { type: 'Google OAuth Phishing Kit', category: 'phishing' },
    { type: 'Amazon AWS SES Abuse Phishing', category: 'phishing' },
    { type: 'LinkedIn Business Phishing', category: 'phishing' },
    { type: 'DHL Shipping Notification Phish', category: 'phishing' },
    // APT
    { type: 'APT29 Cozy Bear Lateral Movement', category: 'apt' },
    { type: 'APT41 Double Dragon Backdoor', category: 'apt' },
    { type: 'Lazarus Group Crypto Theft', category: 'apt' },
    { type: 'Sandworm Destructive Payload', category: 'apt' },
    { type: 'Fancy Bear Spear Phishing', category: 'apt' },
    { type: 'Charming Kitten OAuth Abuse', category: 'apt' },
];

const COUNTRIES = [
    { name: 'United States', co: 'US' }, { name: 'China', co: 'CN' },
    { name: 'Russia', co: 'RU' }, { name: 'Germany', co: 'DE' },
    { name: 'United Kingdom', co: 'GB' }, { name: 'France', co: 'FR' },
    { name: 'Brazil', co: 'BR' }, { name: 'India', co: 'IN' },
    { name: 'Japan', co: 'JP' }, { name: 'South Korea', co: 'KR' },
    { name: 'Canada', co: 'CA' }, { name: 'Australia', co: 'AU' },
    { name: 'Netherlands', co: 'NL' }, { name: 'Ukraine', co: 'UA' },
    { name: 'Israel', co: 'IL' }, { name: 'Iran', co: 'IR' },
    { name: 'Turkey', co: 'TR' }, { name: 'Singapore', co: 'SG' },
    { name: 'Vietnam', co: 'VN' }, { name: 'Indonesia', co: 'ID' },
    { name: 'Pakistan', co: 'PK' }, { name: 'Egypt', co: 'EG' },
    { name: 'Saudi Arabia', co: 'SA' }, { name: 'UAE', co: 'AE' },
    { name: 'South Africa', co: 'ZA' }, { name: 'Mexico', co: 'MX' },
    { name: 'Argentina', co: 'AR' }, { name: 'Colombia', co: 'CO' },
    { name: 'Poland', co: 'PL' }, { name: 'Romania', co: 'RO' },
    { name: 'Sweden', co: 'SE' }, { name: 'Norway', co: 'NO' },
    { name: 'Finland', co: 'FI' }, { name: 'Italy', co: 'IT' },
    { name: 'Spain', co: 'ES' }, { name: 'Portugal', co: 'PT' },
    { name: 'Switzerland', co: 'CH' }, { name: 'Austria', co: 'AT' },
    { name: 'Belgium', co: 'BE' }, { name: 'Czech Republic', co: 'CZ' },
    { name: 'Thailand', co: 'TH' }, { name: 'Malaysia', co: 'MY' },
    { name: 'Philippines', co: 'PH' }, { name: 'Taiwan', co: 'TW' },
    { name: 'Hong Kong', co: 'HK' }, { name: 'Nigeria', co: 'NG' },
    { name: 'Kenya', co: 'KE' }, { name: 'Morocco', co: 'MA' },
    { name: 'Chile', co: 'CL' }, { name: 'Peru', co: 'PE' },
    { name: 'Bangladesh', co: 'BD' }, { name: 'Sri Lanka', co: 'LK' },
];

const ACTIONS_BY_CATEGORY = {
    exploit:  ['BLOCKED', 'BLOCKED', 'BLOCKED', 'DETECTED', 'MITIGATED'],
    malware:  ['QUARANTINED', 'QUARANTINED', 'BLOCKED', 'DETECTED'],
    botnet:   ['ISOLATED', 'ISOLATED', 'BLOCKED', 'DETECTED'],
    phishing: ['BLOCKED', 'BLOCKED', 'DETECTED'],
    apt:      ['QUARANTINED', 'ISOLATED', 'DETECTED'],
};

const pick = arr => arr[Math.floor(Math.random() * arr.length)];

/**
 * Generate a single randomized realistic threat
 */
function generateThreat() {
    const sig = pick(ATTACK_SIGNATURES);
    let src = pick(COUNTRIES);
    let dst = pick(COUNTRIES);
    // Ensure source ≠ target most of the time (90%)
    if (Math.random() > 0.1) {
        while (dst.co === src.co) dst = pick(COUNTRIES);
    }
    const actions = ACTIONS_BY_CATEGORY[sig.category] || ['DETECTED'];
    return {
        type: sig.type,
        category: sig.category,
        action: pick(actions),
        source: src.name,
        source_co: src.co,
        target: dst.name,
        target_co: dst.co,
        feed: 'ThreatCloud',
        ts: new Date().toISOString(),
    };
}

/* ---------- TICKER RENDERING ---------- */

function buildTickerItemHTML(t) {
    const actionClass = {
        'BLOCKED': 'ta-blocked',
        'QUARANTINED': 'ta-quarantined',
        'ISOLATED': 'ta-isolated',
        'DETECTED': 'ta-detected',
        'MITIGATED': 'ta-mitigated',
    }[t.action] || '';

    const categoryTag = t.category
        ? `<span class="ts">${t.category}</span>`
        : '';

    const srcFlag = t.source_co ? countryFlag(t.source_co) : '';
    const dstFlag = t.target_co ? countryFlag(t.target_co) : '';
    const srcLabel = t.source || 'Unknown';
    const dstLabel = t.target || 'Unknown';

    return `${categoryTag}<span class="tt">${t.type}</span> ${srcFlag} ${srcLabel} → ${dstFlag} ${dstLabel} — <span class="ta ${actionClass}">${t.action}</span>`;
}

function createTickerEl(t, animate = false) {
    const s = document.createElement('span');
    s.className = 'ticker-item' + (animate ? ' ticker-item-new' : '');
    s.innerHTML = buildTickerItemHTML(t);
    return s;
}

function renderTicker(threats) {
    const track = document.getElementById('ticker-track');
    if (!track) return;
    track.innerHTML = '';
    [...threats, ...threats].forEach(t => {
        track.appendChild(createTickerEl(t, false));
    });
}

/**
 * Inject a single new threat into the ticker with animation
 */
function injectLiveThreat(threat) {
    const track = document.getElementById('ticker-track');
    if (!track) return;

    liveThreats.unshift(threat);
    if (liveThreats.length > MAX_TICKER_ITEMS) {
        liveThreats = liveThreats.slice(0, MAX_TICKER_ITEMS);
    }

    track.innerHTML = '';
    liveThreats.forEach((t, i) => {
        track.appendChild(createTickerEl(t, i === 0));
    });
    liveThreats.forEach(t => {
        track.appendChild(createTickerEl(t, false));
    });

    const newEl = track.querySelector('.ticker-item-new');
    if (newEl) {
        newEl.addEventListener('animationend', () => {
            newEl.classList.remove('ticker-item-new');
        }, { once: true });
    }
}

/* ---------- DYNAMIC GENERATOR ---------- */

/**
 * Start generating threats at random intervals (2-4 seconds)
 * Keeps the ticker alive even without the API
 */
function startThreatGenerator() {
    if (generatorInterval) return; // Already running

    function scheduleNext() {
        const delay = 2000 + Math.random() * 2000; // 2–4 seconds
        generatorInterval = setTimeout(() => {
            // Only generate if SSE is NOT connected
            if (!isLiveConnected) {
                const threat = generateThreat();
                injectLiveThreat(threat);
            }
            scheduleNext();
        }, delay);
    }
    scheduleNext();
    console.log('[beout.ai] 🎲 Dynamic threat generator started');
}

function stopThreatGenerator() {
    if (generatorInterval) {
        clearTimeout(generatorInterval);
        generatorInterval = null;
        console.log('[beout.ai] 🎲 Dynamic threat generator stopped (live SSE active)');
    }
}

/* ---------- SSE LIVE STREAM ---------- */

function connectLiveStream() {
    if (typeof EventSource === 'undefined') {
        console.warn('[beout.ai] EventSource not supported');
        return;
    }

    console.log('[beout.ai] 🔌 Connecting to live SSE stream...');
    const source = new EventSource('/api/threats-stream.php');

    source.addEventListener('connected', () => {
        isLiveConnected = true;
        sseRetryCount = 0;
        stopThreatGenerator();
        console.log('[beout.ai] ✅ Live SSE stream connected — real data flowing');

        const tickerDot = document.querySelector('.ticker-dot');
        if (tickerDot) tickerDot.classList.add('ticker-dot-live');
    });

    source.addEventListener('attack', (e) => {
        try {
            const threat = JSON.parse(e.data);
            injectLiveThreat(threat);
        } catch (err) {
            console.warn('[beout.ai] Failed to parse attack event:', err);
        }
    });

    source.addEventListener('counter', (e) => {
        try {
            const data = JSON.parse(e.data);
            if (data.today) {
                console.log(`[beout.ai] 📊 Global attacks today: ${data.today.toLocaleString()}`);
            }
        } catch (err) {}
    });

    source.addEventListener('reconnect', () => {
        source.close();
        setTimeout(() => connectLiveStream(), 1000);
    });

    source.onerror = () => {
        isLiveConnected = false;
        sseRetryCount++;

        const tickerDot = document.querySelector('.ticker-dot');
        if (tickerDot) tickerDot.classList.remove('ticker-dot-live');

        // Restart generator if SSE dies
        startThreatGenerator();

        if (sseRetryCount > 5) {
            console.warn('[beout.ai] SSE unavailable — generator keeps the feed alive');
            source.close();
        }
    };
}

/* ---------- INIT ---------- */

async function initThreatTicker() {
    // Seed with a few generated threats immediately
    for (let i = 0; i < 8; i++) {
        liveThreats.push(generateThreat());
    }
    renderTicker(liveThreats);

    // Start the dynamic generator immediately — always-live feed
    startThreatGenerator();

    // Try SSE in background — if it connects, generator pauses
    connectLiveStream();
}

/* ============================================
   SCROLL REVEAL + STAT COUNTERS
   ============================================ */
function initScrollReveal() {
    const obs = new IntersectionObserver(entries => {
        entries.forEach(e => {
            if (e.isIntersecting) {
                e.target.classList.add('visible');
                const num = e.target.querySelector('.stat-num');
                if (num) animateNum(num);
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.feature-card, .stat-card').forEach(el => {
        el.classList.add('reveal');
        obs.observe(el);
    });
}

function animateNum(el) {
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseInt(el.dataset.target);
    const start = performance.now();
    const dur = 1500;
    (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.floor(target * ease);
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
    })(start);
}

/* ============================================
   EMAIL FORM
   ============================================ */
function initCurrentYear() {
    const yearEl = document.getElementById('current-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();
}

function initForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('cta-button');
        const success = document.getElementById('signup-success');
        if (!btn || !success) return;

        const btnText = btn.querySelector('.btn-text');
        if (btnText) btnText.textContent = currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
        }, 800);
    });
}
