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
    document.getElementById('lang-toggle-text').textContent = t.lang_toggle;

    // Restart typing with new language taglines
    restartTyping();

    // Save preference
    try { localStorage.setItem('beout_lang', lang); } catch(e) {}
}

function initLangToggle() {
    const btn = document.getElementById('lang-toggle');
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
    document.getElementById('tagline-text').textContent = '';
    setTimeout(() => initTyping(), 400);
}

function initTyping() {
    const el = document.getElementById('tagline-text');
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
    // Fixed launch target (UTC midnight, 16 Oct 2026)
    const launchTarget = new Date('2026-10-16T00:00:00Z');
    // Persist the end timestamp so the countdown never resets to a full duration on refresh
    const STORAGE_KEY = 'beoutLaunchEnd';
    if (!localStorage.getItem(STORAGE_KEY)) {
        localStorage.setItem(STORAGE_KEY, launchTarget.getTime().toString());
    }
    const launchEnd = parseInt(localStorage.getItem(STORAGE_KEY), 10);

    // Helper to stop the interval once the launch date is reached
    let intervalId = null;

    function tick() {
        const now = Date.now();
        const diff = launchEnd - now;
        if (diff <= 0) {
            // Launch date passed – stop updating and optionally hide the countdown UI
            clearInterval(intervalId);
            const section = document.getElementById('countdown-section');
            if (section) section.style.display = 'none';
            return;
        }
        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);
        document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
        document.getElementById('cd-min').textContent = String(m).padStart(2, '0');
        document.getElementById('cd-sec').textContent = String(s).padStart(2, '0');
    }
    tick();
    intervalId = setInterval(tick, 1000);

    // Fixed launch target (UTC midnight, 16 Oct 2026)
    const launchTarget = new Date('2026-10-16T00:00:00Z');

    // Helper to stop the interval once the launch date is reached
    let intervalId = null;

    function tick() {
        const now = new Date();
        const diff = launchTarget - now;
        if (diff <= 0) {
            // Launch date passed – stop updating and optionally show a message
            clearInterval(intervalId);
            document.getElementById('countdown-section').style.display = 'none';
            return;
        }
        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);
        document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
        document.getElementById('cd-min').textContent = String(m).padStart(2, '0');
        document.getElementById('cd-sec').textContent = String(s).padStart(2, '0');
    }
    tick();
    intervalId = setInterval(tick, 1000);

    const launch = new Date('2026-10-16T00:00:00');

    function tick() {
        const diff = launch - new Date();
        if (diff <= 0) return;
        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);
        document.getElementById('cd-days').textContent = String(d).padStart(2, '0');
        document.getElementById('cd-hours').textContent = String(h).padStart(2, '0');
        document.getElementById('cd-min').textContent = String(m).padStart(2, '0');
        document.getElementById('cd-sec').textContent = String(s).padStart(2, '0');
    }
    tick();
    setInterval(tick, 1000);
}

/* ============================================
   THREAT TICKER
   ============================================ */
function initThreatTicker() {
    const threats = [
        { ip: '185.220.101.xx', type: 'Brute Force SSH', action: 'BLOCKED' },
        { ip: '45.155.205.xx', type: 'Ransomware C2', action: 'QUARANTINED' },
        { ip: '194.26.135.xx', type: 'SQL Injection', action: 'BLOCKED' },
        { ip: '89.248.163.xx', type: 'Port Scan', action: 'DETECTED' },
        { ip: '162.142.125.xx', type: 'Phishing Link', action: 'BLOCKED' },
        { ip: '198.235.24.xx', type: 'DDoS Attempt', action: 'MITIGATED' },
        { ip: '91.219.237.xx', type: 'Malware Download', action: 'BLOCKED' },
        { ip: '23.129.64.xx', type: 'Data Exfiltration', action: 'ISOLATED' },
        { ip: '104.244.73.xx', type: 'Zero-Day Exploit', action: 'QUARANTINED' },
        { ip: '171.25.193.xx', type: 'Credential Stuffing', action: 'BLOCKED' },
    ];
    const track = document.getElementById('ticker-track');
    [...threats, ...threats].forEach(t => {
        const s = document.createElement('span');
        s.className = 'ticker-item';
        s.innerHTML = `<span class="tt">${t.type}</span> from ${t.ip} — <span class="ta">${t.action}</span>`;
        track.appendChild(s);
    });
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
    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('cta-button');
        const success = document.getElementById('signup-success');

        btn.querySelector('.btn-text').textContent = currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
        }, 800);
    });
}
