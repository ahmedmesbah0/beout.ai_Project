/* ==============================================
   beout.ai — Coming Soon | JavaScript
   Server-side i18n (PHP) — JS handles only
   particles, countdown, typing, ticker, and UX.
   ============================================== */

/* ============================================
   UTILITY — debounce & throttle
   ============================================ */
function debounce(fn, ms) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

function throttle(fn, ms) {
    let last = 0;
    return (...args) => {
        const now = performance.now();
        if (now - last >= ms) { last = now; fn(...args); }
    };
}

/* ============================================
   DOM READY
   ============================================ */
document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('loaded');

    initParticles();
    initCountdown();
    initTyping();
    initThreatTicker();
    initScrollReveal();
    initForm();
    initNavigation();
    initArchitectureAnim();

    // Cleanup on unload
    window.addEventListener('beforeunload', () => cleanupAll());
});

let _cleanups = [];

function onCleanup(fn) {
    _cleanups.push(fn);
}

function cleanupAll() {
    _cleanups.forEach(fn => { try { fn(); } catch (_) {} });
    _cleanups = [];
}

/* ============================================
   TYPING EFFECT
   ============================================ */
function initTyping() {
    const el = document.getElementById('tagline-text');
    if (!el) return;

    const phrases = window.BEOUT_TAGLINES || ['AI Threat Detection & Response'];
    let pi = 0, ci = 0, deleting = false;
    let timeout = null;

    function step() {
        const txt = phrases[pi];
        if (!deleting) {
            el.textContent = txt.substring(0, ci + 1);
            ci++;
            if (ci === txt.length) {
                deleting = true;
                timeout = setTimeout(step, 2800);
                return;
            }
            timeout = setTimeout(step, 70);
        } else {
            el.textContent = txt.substring(0, ci - 1);
            ci--;
            if (ci === 0) {
                deleting = false;
                pi = (pi + 1) % phrases.length;
                timeout = setTimeout(step, 400);
                return;
            }
            timeout = setTimeout(step, 35);
        }
    }

    setTimeout(step, 1200);

    onCleanup(() => clearTimeout(timeout));
}

/* ============================================
   PARTICLE BACKGROUND
   ============================================ */
function initParticles() {
    const c = document.getElementById('particle-canvas');
    if (!c) return;
    const ctx = c.getContext('2d');
    let particles = [];
    let animId = null;
    let mouse = { x: null, y: null, tx: null, ty: null };
    let w, h;

    function resize() {
        w = c.width = window.innerWidth;
        h = c.height = window.innerHeight;
    }
    resize();

    const onResize = debounce(resize, 150);
    window.addEventListener('resize', onResize);
    onCleanup(() => window.removeEventListener('resize', onResize));

    const onMouse = (e) => {
        mouse.tx = e.clientX;
        mouse.ty = e.clientY;
    };
    window.addEventListener('mousemove', onMouse, { passive: true });
    onCleanup(() => window.removeEventListener('mousemove', onMouse));

    class Particle {
        constructor() {
            this.x = Math.random() * w;
            this.y = Math.random() * h;
            this.size = Math.random() * 1.4 + 0.4;
            this.vx = (Math.random() - 0.5) * 0.25;
            this.vy = (Math.random() - 0.5) * 0.25;
            this.opacity = Math.random() * 0.3 + 0.05;
        }

        update() {
            // Gentle mouse follow (lerp cursor position)
            if (mouse.tx !== null) {
                mouse.x += (mouse.tx - mouse.x) * 0.05;
                mouse.y += (mouse.ty - mouse.y) * 0.05;
            }
            if (mouse.x !== null) {
                const dx = mouse.x - this.x;
                const dy = mouse.y - this.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 150) {
                    const f = (1 - dist / 150) * 0.003;
                    this.x -= dx * f;
                    this.y -= dy * f;
                }
            }

            this.x += this.vx;
            this.y += this.vy;

            if (this.x <= 0 || this.x >= w) this.vx *= -1;
            if (this.y <= 0 || this.y >= h) this.vy *= -1;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(59,130,246,${this.opacity})`;
            ctx.fill();
        }
    }

    const count = Math.min(45, Math.floor((w * h) / 18000));
    for (let i = 0; i < count; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, w, h);
        particles.forEach(p => { p.update(); p.draw(); });
        animId = requestAnimationFrame(animate);
    }
    animId = requestAnimationFrame(animate);

    onCleanup(() => cancelAnimationFrame(animId));
}

/* ============================================
   COUNTDOWN — with flip animation
   ============================================ */
function initCountdown() {
    const launchDate = new Date('2026-10-16T00:00:00Z');
    let intervalId = null;
    let prevDays, prevHours, prevMins, prevSecs;

    const dateEl = document.getElementById('countdown-date');
    if (dateEl) {
        const opts = { year: 'numeric', month: 'long', day: 'numeric' };
        dateEl.textContent = launchDate.toLocaleDateString(undefined, opts);
    }

    function flip(el, value) {
        if (!el) return;
        const oldVal = el.textContent;
        if (oldVal === value) return;
        el.classList.add('flip-out');
        el.addEventListener('animationend', function handler() {
            el.removeEventListener('animationend', handler);
            el.textContent = value;
            el.classList.remove('flip-out');
            el.classList.add('flip-in');
            el.addEventListener('animationend', function done() {
                el.removeEventListener('animationend', done);
                el.classList.remove('flip-in');
            });
        });
    }

    function tick() {
        const now = new Date();
        const diff = launchDate - now;

        if (diff <= 0) {
            clearInterval(intervalId);
            const section = document.getElementById('countdown-section');
            if (section) section.style.display = 'none';
            return;
        }

        const d = Math.floor(diff / 864e5);
        const h = Math.floor((diff % 864e5) / 36e5);
        const m = Math.floor((diff % 36e5) / 6e4);
        const s = Math.floor((diff % 6e4) / 1e3);

        if (prevDays === undefined) {
            prevDays = d; prevHours = h; prevMins = m; prevSecs = s;
            updateText(d, h, m, s);
            return;
        }

        // Only animate if value changed
        const daysEl = document.getElementById('cd-days');
        const hoursEl = document.getElementById('cd-hours');
        const minEl = document.getElementById('cd-min');
        const secEl = document.getElementById('cd-sec');

        const sd = String(d).padStart(2, '0');
        const sh = String(h).padStart(2, '0');
        const sm = String(m).padStart(2, '0');
        const ss = String(s).padStart(2, '0');

        // Only flip seconds (avoids too much animation noise)
        flip(secEl, ss);
        if (minEl && minEl.textContent !== sm) minEl.textContent = sm;
        if (hoursEl && hoursEl.textContent !== sh) hoursEl.textContent = sh;
        if (daysEl && daysEl.textContent !== sd) daysEl.textContent = sd;

        prevDays = d; prevHours = h; prevMins = m; prevSecs = s;
    }

    function updateText(d, h, m, s) {
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
    onCleanup(() => clearInterval(intervalId));
}

/* ============================================
   THREAT TICKER — SSE Consumer
   ============================================ */
const countryFlag = (co) => {
    if (!co || co.length !== 2) return '';
    return String.fromCodePoint(...[...co.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};

const MAX_TICKER_ITEMS = 30;
let liveThreats = [];

function buildTickerHTML(t) {
    const acMap = { BLOCKED: 'ta-blocked', QUARANTINED: 'ta-quarantined', ISOLATED: 'ta-isolated', DETECTED: 'ta-detected', MITIGATED: 'ta-mitigated' };
    const ac = acMap[t.action] || '';
    const cat = t.category ? `<span class="ts">${t.category}</span>` : '';
    const sf = t.source_co ? countryFlag(t.source_co) : '';
    const df = t.target_co ? countryFlag(t.target_co) : '';
    return `${cat}<span class="tt">${t.type}</span> ${sf} ${t.source || 'Unknown'} → ${df} ${t.target || 'Unknown'} — <span class="ta ${ac}">${t.action}</span>`;
}

function makeTickerEl(t, isNew) {
    const el = document.createElement('span');
    el.className = 'ticker-item' + (isNew ? ' ticker-item-new' : '');
    el.innerHTML = buildTickerHTML(t);
    return el;
}

function renderTicker(threats) {
    const track = document.getElementById('ticker-track');
    if (!track) return;
    track.innerHTML = '';
    threats.forEach(t => track.appendChild(makeTickerEl(t, false)));
}

function injectThreat(threat) {
    const track = document.getElementById('ticker-track');
    if (!track) return;

    const el = makeTickerEl(threat, true);
    track.prepend(el);
    liveThreats.unshift(threat);

    if (liveThreats.length > MAX_TICKER_ITEMS) {
        liveThreats.pop();
        if (track.lastElementChild) {
            track.removeChild(track.lastElementChild);
        }
    }

    el.addEventListener('animationend', () => el.classList.remove('ticker-item-new'), { once: true });
}

const threatQueue = [];
let isProcessingQueue = false;

function processThreatQueue() {
    if (threatQueue.length === 0) {
        isProcessingQueue = false;
        return;
    }

    isProcessingQueue = true;
    const threat = threatQueue.shift();
    injectThreat(threat);

    let delay = 1500;
    if (threatQueue.length > 5) delay = 800;
    if (threatQueue.length > 15) delay = 300;

    setTimeout(processThreatQueue, delay);
}

function connectSSE() {
    if (typeof EventSource === 'undefined') return;

    const src = new EventSource('/api/threats-stream.php');

    src.addEventListener('connected', () => {
        const dot = document.querySelector('.ticker-dot');
        if (dot) dot.classList.add('ticker-dot-live');
    });

    src.addEventListener('attack', e => {
        try {
            threatQueue.push(JSON.parse(e.data));
            if (!isProcessingQueue) processThreatQueue();
        } catch (_) {}
    });

    src.addEventListener('reconnect', () => {
        src.close();
        setTimeout(connectSSE, 1000);
    });

    src.onerror = () => {
        const dot = document.querySelector('.ticker-dot');
        if (dot) dot.classList.remove('ticker-dot-live');
    };

    onCleanup(() => src.close());
}

async function initThreatTicker() {
    renderTicker([]);
    connectSSE();
}

/* ============================================
   SCROLL REVEAL + STAT COUNTERS
   ============================================ */
function initScrollReveal() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger: each child within a parent reveals with delay
                const parent = entry.target;

                setTimeout(() => {
                    entry.target.classList.add('visible');
                    const num = entry.target.querySelector('.stat-num');
                    if (num) animateNum(num);
                }, entry.target.dataset.revealDelay ? parseInt(entry.target.dataset.revealDelay) : 0);

                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.feature-card, .stat-card, .how-step, .solution-card, .arch-layer-card, .trust-badge-card, .trust-extra-card, .enterprise-card').forEach((el, i) => {
        el.classList.add('reveal');
        el.dataset.revealDelay = i * 100; // stagger delay
        observer.observe(el);
    });

    onCleanup(() => observer.disconnect());
}

function animateNum(el) {
    if (el.dataset.animDone) return;
    el.dataset.animDone = '1';

    const target = parseInt(el.dataset.target, 10);
    if (isNaN(target)) return;

    const duration = 1800;
    const start = performance.now();

    function step(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);

        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * eased);

        if (progress < 1) {
            requestAnimationFrame(step);
        } else {
            el.textContent = target;
        }
    }

    requestAnimationFrame(step);
}

/* ============================================
   EMAIL FORM — with validation & API submit
   ============================================ */
function initForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    const emailInput = document.getElementById('email-input');
    const btn = document.getElementById('cta-button');
    const success = document.getElementById('signup-success');
    const btnText = btn ? btn.querySelector('.btn-text') : null;

    function showError(msg) {
        if (emailInput) {
            emailInput.setCustomValidity(msg);
            emailInput.reportValidity();
        }
    }

    function validateEmail(email) {
        if (!email || !email.includes('@')) return 'Please enter a valid email address.';
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!re.test(email)) return 'Please enter a valid email address.';
        const domain = email.split('@')[1].toLowerCase();
        const disposable = [
            'mailinator.com', 'tempmail.com', '10minutemail.com',
            'guerrillamail.com', 'yopmail.com', 'throwaway.email',
            'sharklasers.com', 'trashmail.com'
        ];
        if (disposable.includes(domain)) return 'Disposable email addresses are not allowed.';
        return null;
    }

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = emailInput ? emailInput.value.trim() : '';
        const err = validateEmail(email);
        if (err) {
            showError(err);
            return;
        }
        emailInput.setCustomValidity('');

        if (!btn || !success) return;

        // Loading state
        btn.classList.add('btn-loading');
        if (btnText) btnText.textContent = 'Sending...';
        btn.disabled = true;

        try {
            const res = await fetch('/api/subscribe.php', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (data.success) {
                form.style.display = 'none';
                success.classList.add('show');
            } else {
                btn.classList.remove('btn-loading');
                if (btnText) btnText.textContent = 'Notify Me';
                btn.disabled = false;
                showError(data.message || 'Something went wrong. Please try again.');
            }
        } catch (_) {
            btn.classList.remove('btn-loading');
            if (btnText) btnText.textContent = 'Notify Me';
            btn.disabled = false;
            showError('Network error. Please check your connection and try again.');
        }
    });
}

/* ============================================
   NAVIGATION — scroll spy, smooth scroll, hamburger
   ============================================ */
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    // --- Hamburger toggle ---
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            const expanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !expanded);
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });

        // Close mobile nav when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.setAttribute('aria-expanded', 'false');
                hamburger.classList.remove('open');
                navLinks.classList.remove('open');
            });
        });
    }

    // --- Navbar background on scroll ---
    const onScrollBg = throttle(() => {
        if (window.scrollY > 60) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }, 100);

    window.addEventListener('scroll', onScrollBg, { passive: true });
    onScrollBg(); // initial check
    onCleanup(() => window.removeEventListener('scroll', onScrollBg));

    // --- Smooth scroll for anchor links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;
            e.preventDefault();
            const navbarHeight = navbar ? navbar.offsetHeight : 0;
            const top = target.getBoundingClientRect().top + window.pageYOffset - navbarHeight - 20;
            window.scrollTo({ top, behavior: 'smooth' });
        });
    });

    // --- Scroll spy ---
    const sections = document.querySelectorAll('section[id], main[id]');
    const navItems = document.querySelectorAll('.nav-links a');

    if (!sections.length || !navItems.length) return;

    const spyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && entry.intersectionRatio >= 0.2) {
                const id = entry.target.getAttribute('id');
                navItems.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { threshold: [0.2], rootMargin: '-80px 0px -60% 0px' });

    sections.forEach(s => spyObserver.observe(s));
    onCleanup(() => spyObserver.disconnect());
}

/* ============================================
   ARCHITECTURE ANIMATION
   ============================================ */
function initArchitectureAnim() {
    const section = document.querySelector('.architecture-section');
    if (!section) return;

    const lines = section.querySelectorAll('.arch-flow-line');
    if (!lines.length) return;

    let animId = null;
    const speeds = [];

    lines.forEach((line, i) => {
        speeds.push(0.3 + Math.random() * 0.6);
        line.style.strokeDasharray = '8,4';
    });

    let offset = 0;

    function animate() {
        offset = (offset + 0.15) % 24;
        lines.forEach((line, i) => {
            line.style.strokeDashoffset = offset * speeds[i];
        });
        animId = requestAnimationFrame(animate);
    }

    const obs = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animId) animId = requestAnimationFrame(animate);
            } else {
                if (animId) {
                    cancelAnimationFrame(animId);
                    animId = null;
                }
            }
        });
    }, { threshold: 0.1 });

    obs.observe(section);
    onCleanup(() => {
        obs.disconnect();
        if (animId) cancelAnimationFrame(animId);
    });
}