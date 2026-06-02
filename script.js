/* ==============================================
   beout.ai — JavaScript
   Bilingual EN / AR with full i18n
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCountdown();
    initThreatTicker();
    initScrollReveal();
    initForm();
    initLangToggle();
    initNavbarScroll();
    setTimeout(() => initTyping(), 1000);
    requestAnimationFrame(() => document.body.classList.add('loaded'));
});

/* ============================================
   NAVBAR SCROLL
   ============================================ */
function initNavbarScroll() {
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const y = window.scrollY;
        navbar.classList.toggle('scrolled', y > 60);
        lastScroll = y;
    }, { passive: true });
}

/* ============================================
   INTERNATIONALIZATION (i18n)
   ============================================ */
const i18n = {
    en: {
        nav_status: 'Systems Online',
        hero_desc: 'Egypt\'s first <strong>AI-native cybersecurity</strong> ecosystem. Predictive protection. Autonomous investigation. Zero compromise.',
        cta_get_access: 'Get Early Access',
        pill_horus: 'AI Firewall',
        pill_anubis: 'Endpoint AI',
        pill_thoth: 'Threat Intel',
        pill_maat: 'Email Guard',
        pill_ra: 'SOC-as-a-Service',
        countdown_badge: 'COUNTDOWN TO LAUNCH',
        countdown_date_prefix: 'Launch Date: ',
        cd_days: 'Days',
        cd_hours: 'Hours',
        cd_min: 'Minutes',
        cd_sec: 'Seconds',
        countdown_live: 'We Are Live',
        signup_title: 'Be First In Line',
        signup_label: 'Join the waiting list for early access and exclusive launch pricing.',
        email_placeholder: 'Enter your email address',
        cta_btn: 'Notify Me',
        signup_success: 'You\'re on the list. We\'ll notify you at launch.',
        ticker_label: 'LIVE THREAT FEED',
        stat_monitoring: 'AI Monitoring',
        stat_response: 'Threat Response',
        stat_detection: 'Detection Rate',
        stat_api: 'External APIs',
        features_title: 'What\'s Coming',
        features_subtitle: 'A complete cybersecurity ecosystem purpose-built for the Egyptian market.',
        feat_ai_t: 'Local AI Detection',
        feat_ai_d: 'On-premise AI engine that detects threats in real-time. No external API calls. No data leaves your network.',
        feat_inv_t: 'Auto Investigation',
        feat_inv_d: 'When an attack hits, our AI automatically investigates. Identifies source, timeline, affected devices, and isolates threats.',
        feat_col_t: 'Collective Intelligence',
        feat_col_d: 'Every client\'s detection strengthens the network. A threat found once is blocked everywhere — instantly.',
        feat_comp_t: 'PDPL & ISO 27001',
        feat_comp_d: 'Built-in compliance engine for Egypt\'s PDPL, ISO 27001, and PCI-DSS. Automated reports in Arabic & English.',
        feat_dark_t: 'Dark Web Monitoring',
        feat_dark_d: 'AI crawls the dark web 24/7. Detecting leaked credentials, brand impersonation, and threat actor activity.',
        feat_dep_t: '25-Minute Deployment',
        feat_dep_d: 'Download the OVF, plug it in as a network bridge, enter your license key. Full protection in under 25 minutes.',
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
        nav_status: 'الأنظمة متصلة',
        hero_desc: 'أول منظومة <strong>أمن سيبراني بالذكاء الاصطناعي</strong> في مصر. حماية استباقية. تحقيق تلقائي. بدون تنازل.',
        cta_get_access: 'احصل على وصول مبكر',
        pill_horus: 'جدار ناري ذكي',
        pill_anubis: 'حماية الأجهزة',
        pill_thoth: 'استخبارات التهديدات',
        pill_maat: 'حماية البريد',
        pill_ra: 'مركز عمليات أمني',
        countdown_badge: 'العد التنازلي للإطلاق',
        countdown_date_prefix: 'تاريخ الإطلاق: ',
        cd_days: 'يوم',
        cd_hours: 'ساعة',
        cd_min: 'دقيقة',
        cd_sec: 'ثانية',
        countdown_live: 'نحن الآن مباشرون',
        signup_title: 'كن أول المنتظرين',
        signup_label: 'انضم لقائمة الانتظار للوصول المبكر وأسعار الإطلاق الحصرية.',
        email_placeholder: 'أدخل بريدك الإلكتروني',
        cta_btn: 'أبلغني',
        signup_success: 'تمت إضافتك للقائمة. سنبلغك فور الإطلاق.',
        ticker_label: 'تغذية التهديدات المباشرة',
        stat_monitoring: 'مراقبة بالذكاء الاصطناعي',
        stat_response: 'سرعة الاستجابة',
        stat_detection: 'معدل الكشف',
        stat_api: 'واجهات خارجية',
        features_title: 'ما الذي سيأتي',
        features_subtitle: 'منظومة أمن سيبراني متكاملة صُممت خصيصاً للسوق المصري.',
        feat_ai_t: 'كشف محلي بالذكاء الاصطناعي',
        feat_ai_d: 'محرك ذكاء اصطناعي محلي يكتشف التهديدات لحظياً. بدون اتصال خارجي. بياناتك لا تغادر شبكتك أبداً.',
        feat_inv_t: 'تحقيق تلقائي',
        feat_inv_d: 'عند حدوث هجوم، الذكاء الاصطناعي يحقق تلقائياً. يحدد المصدر، الجدول الزمني، الأجهزة المتأثرة، ويعزل التهديد.',
        feat_col_t: 'ذكاء جماعي',
        feat_col_d: 'كل اكتشاف عند أي عميل يقوي الشبكة بأكملها. تهديد يُكتشف مرة واحدة يُحظر في كل مكان — فوراً.',
        feat_comp_t: 'PDPL و ISO 27001',
        feat_comp_d: 'محرك امتثال مدمج لقانون حماية البيانات المصري، ISO 27001، و PCI-DSS. تقارير تلقائية بالعربية والإنجليزية.',
        feat_dark_t: 'مراقبة الدارك ويب',
        feat_dark_d: 'الذكاء الاصطناعي يراقب الدارك ويب على مدار الساعة. يكشف تسريب بيانات الاعتماد وانتحال العلامة التجارية.',
        feat_dep_t: 'تشغيل في 25 دقيقة',
        feat_dep_d: 'حمّل ملف الـ OVF، وصّله كجسر شبكة، أدخل مفتاح الترخيص. حماية كاملة في أقل من 25 دقيقة.',
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

    html.setAttribute('lang', lang === 'ar' ? 'ar' : 'en');
    html.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');

    document.title = lang === 'ar'
        ? 'beout.ai — أمن سيبراني بالذكاء الاصطناعي | قريباً'
        : 'beout.ai — AI-Powered Cybersecurity | Coming Soon';

    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
        metaDesc.setAttribute('content', lang === 'ar'
            ? 'beout.ai تبني أول منظومة أمن سيبراني متكاملة بالذكاء الاصطناعي في مصر.'
            : 'beout.ai is building Egypt\'s first complete AI cybersecurity ecosystem.');
    }

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (t[key] !== undefined) el.innerHTML = t[key];
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (t[key] !== undefined) el.placeholder = t[key];
    });

    document.getElementById('lang-toggle-text').textContent = t.lang_toggle;

    // Update countdown date label
    updateCountdownDateLabel();

    restartTyping();

    try { localStorage.setItem('beout_lang', lang); } catch(e) {}
}

function initLangToggle() {
    document.getElementById('lang-toggle').addEventListener('click', () => {
        setLang(currentLang === 'en' ? 'ar' : 'en');
    });
    try {
        const saved = localStorage.getItem('beout_lang');
        if (saved === 'ar') setLang('ar');
    } catch(e) {}
}

/* ============================================
   COUNTDOWN
   ============================================ */
let countdownInterval = null;

function initCountdown() {
    // ------------------------------------------
    // LAUNCH DATE: Configure this to your real target date
    // Format: YYYY-MM-DDTHH:MM:SS (local time)
    // ------------------------------------------
    const LAUNCH_DATE = '2026-09-01T00:00:00';

    const launch = new Date(LAUNCH_DATE);
    const cdDays = document.getElementById('cd-days');
    const cdHours = document.getElementById('cd-hours');
    const cdMin = document.getElementById('cd-min');
    const cdSec = document.getElementById('cd-sec');
    const badgeText = document.querySelector('.badge-text');
    const badgeDot = document.querySelector('.badge-dot');

    // Show the human-readable launch date below countdown
    updateCountdownDateLabel();

    function tick() {
        const now = new Date();
        const diff = launch - now;

        if (diff <= 0) {
            cdDays.textContent = '00';
            cdHours.textContent = '00';
            cdMin.textContent = '00';
            cdSec.textContent = '00';
            badgeText.textContent = i18n[currentLang].countdown_live;
            badgeText.style.color = 'var(--green)';
            badgeDot.style.background = 'var(--green)';
            badgeDot.style.boxShadow = '0 0 8px rgba(0,230,118,0.5)';
            return;
        }

        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);

        cdDays.textContent = String(d).padStart(2, '0');
        cdHours.textContent = String(h).padStart(2, '0');
        cdMin.textContent = String(m).padStart(2, '0');
        cdSec.textContent = String(s).padStart(2, '0');
    }

    tick();
    if (countdownInterval) clearInterval(countdownInterval);
    countdownInterval = setInterval(tick, 1000);
}

function updateCountdownDateLabel() {
    const el = document.getElementById('countdown-date');
    if (!el) return;
    const LAUNCH_DATE = new Date('2026-09-01T00:00:00');
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    const prefix = i18n[currentLang].countdown_date_prefix;
    const locale = currentLang === 'ar' ? 'ar-EG' : 'en-US';
    el.textContent = prefix + LAUNCH_DATE.toLocaleDateString(locale, options) + ' UTC';
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
                typingTimeout = setTimeout(step, 2800);
                return;
            }
            typingTimeout = setTimeout(step, 50);
        } else {
            el.textContent = txt.substring(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
            }
            typingTimeout = setTimeout(step, 28);
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
    let animId;

    function resize() { c.width = window.innerWidth; c.height = window.innerHeight; }
    resize();
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', e => { mouse.x = e.clientX; mouse.y = e.clientY; }, { passive: true });

    class P {
        constructor() { this.reset(); }
        reset() {
            this.x = Math.random() * c.width;
            this.y = Math.random() * c.height;
            this.s = Math.random() * 1.5 + 0.2;
            this.vx = (Math.random() - 0.5) * 0.3;
            this.vy = (Math.random() - 0.5) * 0.3;
            this.o = Math.random() * 0.4 + 0.1;
        }
        update() {
            this.x += this.vx; this.y += this.vy;
            if (mouse.x !== null) {
                const dx = mouse.x - this.x, dy = mouse.y - this.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 14400) { // 120^2
                    const d = Math.sqrt(d2);
                    this.x -= dx / d * 0.5;
                    this.y -= dy / d * 0.5;
                }
            }
            if (this.x < 0 || this.x > c.width) this.vx *= -1;
            if (this.y < 0 || this.y > c.height) this.vy *= -1;
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.s, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0,229,255,${this.o})`;
            ctx.fill();
        }
    }

    const n = Math.min(60, Math.floor(window.innerWidth / 20));
    for (let i = 0; i < n; i++) particles.push(new P());

    function lines() {
        const len = particles.length;
        for (let i = 0; i < len; i++) {
            const pi = particles[i];
            for (let j = i + 1; j < len; j++) {
                const pj = particles[j];
                const dx = pi.x - pj.x, dy = pi.y - pj.y;
                const d2 = dx * dx + dy * dy;
                if (d2 < 19600) { // 140^2
                    const d = Math.sqrt(d2);
                    ctx.beginPath();
                    ctx.moveTo(pi.x, pi.y);
                    ctx.lineTo(pj.x, pj.y);
                    ctx.strokeStyle = `rgba(0,229,255,${0.05 * (1 - d / 140)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }
    }

    (function animate() {
        ctx.clearRect(0, 0, c.width, c.height);
        particles.forEach(p => { p.update(); p.draw(); });
        lines();
        animId = requestAnimationFrame(animate);
    })();

    // Cleanup on page hide
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) cancelAnimationFrame(animId);
        else animate();
    });
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
    // Triple for seamless loop
    [...threats, ...threats, ...threats].forEach(t => {
        const s = document.createElement('span');
        s.className = 'ticker-item';
        s.innerHTML = `<span class="tt">${t.type}</span> &middot; ${t.ip} &middot; <span class="ta">${t.action}</span>`;
        track.appendChild(s);
    });
    // Slower scroll for triple content
    track.style.animationDuration = '60s';
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
    }, { threshold: 0.2 });

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
    const dur = 1800;
    (function step(now) {
        const p = Math.min((now - start) / dur, 1);
        const ease = 1 - Math.pow(1 - p, 4);
        const val = Math.floor(target * ease);
        el.textContent = val === 0 && target === 0 ? '0' : val;
        if (p < 1) requestAnimationFrame(step);
        else el.textContent = target;
    })(start);
}

/* ============================================
   EMAIL FORM
   ============================================ */
function initForm() {
    const form = document.getElementById('signup-form');
    const emailInput = document.getElementById('email-input');
    const btn = document.getElementById('cta-button');
    const success = document.getElementById('signup-success');
    const inputWrapper = form.querySelector('.input-wrapper');
    let submitted = false;

    function clearError() {
        const prev = inputWrapper.querySelector('.input-error');
        if (prev) prev.remove();
        emailInput.style.borderColor = '';
    }

    function showError(msg) {
        clearError();
        const err = document.createElement('span');
        err.className = 'input-error';
        err.textContent = msg;
        err.style.cssText = 'position:absolute;bottom:-22px;left:0;font-size:0.7rem;color:var(--red);font-family:var(--font-mono);white-space:nowrap;';
        inputWrapper.style.position = 'relative';
        inputWrapper.appendChild(err);
        emailInput.style.borderColor = 'var(--red)';
    }

    emailInput.addEventListener('input', clearError);
    emailInput.addEventListener('focus', clearError);

    form.addEventListener('submit', e => {
        e.preventDefault();
        if (submitted) return;

        const email = emailInput.value.trim();
        clearError();

        if (!email) {
            showError(currentLang === 'ar' ? 'يرجى إدخال بريد إلكتروني' : 'Please enter your email');
            emailInput.focus();
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showError(currentLang === 'ar' ? 'بريد إلكتروني غير صالح' : 'Please enter a valid email');
            emailInput.focus();
            return;
        }

        submitted = true;
        btn.querySelector('.btn-text').textContent = currentLang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
            try {
                localStorage.setItem('beout_email', email);
                localStorage.setItem('beout_signed_up', '1');
            } catch(e) {}
        }, 1000);
    });

    try {
        if (localStorage.getItem('beout_signed_up') === '1') {
            form.style.display = 'none';
            success.classList.add('show');
        }
    } catch(e) {}
}
