/* ==============================================
   beout.ai — Coming Soon | JavaScript
   Server-side i18n (PHP) — JS handles only
   particles, countdown, typing, ticker, and UX.
   ============================================== */

document.addEventListener('DOMContentLoaded', () => {
    initParticles();
    initCountdown();
    initThreatTicker();
    initScrollReveal();
    initForm();
    setTimeout(() => initTyping(), 1200);
});

/* ============================================
   TYPING EFFECT
   Taglines injected server-side via window.BEOUT_TAGLINES
   ============================================ */
let typingTimeout = null;

function initTyping() {
    const el = document.getElementById('tagline-text');
    if (!el) return;
    const phrases = window.BEOUT_TAGLINES || ['AI Threat Detection & Response'];
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
    const launchDate = new Date('2026-10-16T00:00:00Z');
    let intervalId = null;

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
   THREAT TICKER — SSE Consumer
   ============================================ */

const countryFlag = co => {
    if (!co || co.length !== 2) return '';
    return String.fromCodePoint(...[...co.toUpperCase()].map(c => 0x1F1E6 + c.charCodeAt(0) - 65));
};

const MAX_TICKER_ITEMS = 30;
let liveThreats = [];
let sseRetryCount = 0;

function buildTickerHTML(t) {
    const ac = { BLOCKED:'ta-blocked', QUARANTINED:'ta-quarantined', ISOLATED:'ta-isolated', DETECTED:'ta-detected', MITIGATED:'ta-mitigated' }[t.action] || '';
    const cat = t.category ? `<span class="ts">${t.category}</span>` : '';
    const sf = t.source_co ? countryFlag(t.source_co) : '';
    const df = t.target_co ? countryFlag(t.target_co) : '';
    return `${cat}<span class="tt">${t.type}</span> ${sf} ${t.source||'Unknown'} → ${df} ${t.target||'Unknown'} — <span class="ta ${ac}">${t.action}</span>`;
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
    [...threats, ...threats].forEach(t => track.appendChild(makeTickerEl(t, false)));
}

function injectThreat(threat) {
    const track = document.getElementById('ticker-track');
    if (!track) return;
    liveThreats.unshift(threat);
    if (liveThreats.length > MAX_TICKER_ITEMS) liveThreats = liveThreats.slice(0, MAX_TICKER_ITEMS);

    track.innerHTML = '';
    liveThreats.forEach((t, i) => track.appendChild(makeTickerEl(t, i === 0)));
    liveThreats.forEach(t => track.appendChild(makeTickerEl(t, false)));

    const n = track.querySelector('.ticker-item-new');
    if (n) n.addEventListener('animationend', () => n.classList.remove('ticker-item-new'), { once: true });
}

function connectSSE() {
    if (typeof EventSource === 'undefined') return;

    const src = new EventSource('/api/threats-stream.php');

    src.addEventListener('connected', () => {
        sseRetryCount = 0;
        const dot = document.querySelector('.ticker-dot');
        if (dot) dot.classList.add('ticker-dot-live');
    });

    src.addEventListener('attack', e => {
        try { injectThreat(JSON.parse(e.data)); } catch (_) {}
    });

    src.addEventListener('counter', e => {
        try { const d = JSON.parse(e.data); if (d.today) console.log(`[beout.ai] Attacks today: ${d.today.toLocaleString()}`); } catch (_) {}
    });

    src.addEventListener('reconnect', () => {
        src.close();
        setTimeout(connectSSE, 1000);
    });

    src.onerror = () => {
        sseRetryCount++;
        const dot = document.querySelector('.ticker-dot');
        if (dot) dot.classList.remove('ticker-dot-live');
        if (sseRetryCount > 10) src.close();
    };
}

async function initThreatTicker() {
    renderTicker([]);
    connectSSE();
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
function initForm() {
    const form = document.getElementById('signup-form');
    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();
        const btn = document.getElementById('cta-button');
        const success = document.getElementById('signup-success');
        if (!btn || !success) return;

        const btnText = btn.querySelector('.btn-text');
        const lang = window.BEOUT_LANG || 'en';
        if (btnText) btnText.textContent = lang === 'ar' ? 'جارٍ الإرسال...' : 'Sending...';
        btn.disabled = true;

        setTimeout(() => {
            form.style.display = 'none';
            success.classList.add('show');
        }, 800);
    });
}
