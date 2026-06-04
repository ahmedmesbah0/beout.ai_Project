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
   THREAT TICKER — Real-Time Check Point ThreatCloud
   ============================================ */

// Static fallback threats with country codes for proper flag rendering
const FALLBACK_THREATS = [
    { type: 'HTTP Headers Remote Code Execution', source: 'Germany', source_co: 'DE', target: 'Israel', target_co: 'IL', action: 'BLOCKED', category: 'exploit' },
    { type: 'EMC AlphaStor command injection', source: 'United States', source_co: 'US', target: 'United States', target_co: 'US', action: 'BLOCKED', category: 'exploit' },
    { type: 'OpenSSL TLS Downgrade Attack', source: 'Canada', source_co: 'CA', target: 'Russia', target_co: 'RU', action: 'DETECTED', category: 'exploit' },
    { type: 'Apache Log4j RCE (CVE-2021-44228)', source: 'China', source_co: 'CN', target: 'Germany', target_co: 'DE', action: 'QUARANTINED', category: 'exploit' },
    { type: 'SQL Injection via Web Form', source: 'Brazil', source_co: 'BR', target: 'France', target_co: 'FR', action: 'BLOCKED', category: 'exploit' },
    { type: 'Emotet Trojan Distribution', source: 'Ukraine', source_co: 'UA', target: 'United Kingdom', target_co: 'GB', action: 'QUARANTINED', category: 'malware' },
    { type: 'Dridex Banking Trojan C2', source: 'Russia', source_co: 'RU', target: 'Japan', target_co: 'JP', action: 'ISOLATED', category: 'botnet' },
    { type: 'WordPress Remote Code Execution', source: 'Netherlands', source_co: 'NL', target: 'India', target_co: 'IN', action: 'BLOCKED', category: 'exploit' },
    { type: 'SSH Brute Force Attack', source: 'Vietnam', source_co: 'VN', target: 'Singapore', target_co: 'SG', action: 'BLOCKED', category: 'exploit' },
    { type: 'DNS Amplification DDoS', source: 'South Korea', source_co: 'KR', target: 'Australia', target_co: 'AU', action: 'MITIGATED', category: 'exploit' },
];

// Country code → flag emoji
const countryFlag = (co) => {
    if (!co || co.length !== 2) return '';
    return String.fromCodePoint(...[...co.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};

function renderTicker(threats) {
    const track = document.getElementById('ticker-track');
    if (!track) return;
    track.innerHTML = '';

    // Duplicate for seamless scroll loop
    [...threats, ...threats].forEach(t => {
        const s = document.createElement('span');
        s.className = 'ticker-item';

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

        // Show source → target country with flags
        const srcFlag = t.source_co ? countryFlag(t.source_co) : '';
        const dstFlag = t.target_co ? countryFlag(t.target_co) : '';
        const srcLabel = t.source || 'Unknown';
        const dstLabel = t.target || 'Unknown';

        s.innerHTML = `${categoryTag}<span class="tt">${t.type}</span> ${srcFlag} ${srcLabel} → ${dstFlag} ${dstLabel} — <span class="ta ${actionClass}">${t.action}</span>`;
        track.appendChild(s);
    });
}

async function fetchLiveThreats() {
    try {
        const res = await fetch('/api/threats.php', { cache: 'no-cache' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (data.status === 'ok' && data.threats && data.threats.length > 0) {
            return data.threats;
        }
    } catch (e) {
        console.warn('[beout.ai] Live threat feed unavailable, using fallback:', e.message);
    }
    return null;
}

async function initThreatTicker() {
    // Try live Check Point ThreatCloud feed first
    const liveThreats = await fetchLiveThreats();

    if (liveThreats) {
        renderTicker(liveThreats);
        console.log(`[beout.ai] 🔴 Live threat feed: ${liveThreats.length} attacks from Check Point ThreatCloud`);
    } else {
        renderTicker(FALLBACK_THREATS);
        console.log('[beout.ai] Using static threat data (fallback)');
    }

    // Refresh every 2 minutes
    setInterval(async () => {
        const fresh = await fetchLiveThreats();
        if (fresh) renderTicker(fresh);
    }, 2 * 60 * 1000);
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
