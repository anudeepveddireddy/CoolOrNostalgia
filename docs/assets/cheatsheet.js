(function () {
    const FONT_KEY = 'con_font_size';
    const THEME_KEY = 'con_theme';
    const CHECKS_KEY = 'con_checks:' + window.location.pathname;

    // 1. Apply persisted theme immediately (defaults to Studio Dark)
    function getSavedTheme() {
        return localStorage.getItem(THEME_KEY) === 'light' ? 'light' : 'dark';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_KEY, theme);
        const btn = document.getElementById('theme-toggle');
        if (btn) {
            const isLight = theme === 'light';
            btn.setAttribute('aria-label', isLight ? 'Switch to studio dark mode' : 'Switch to daylight paper mode');
            btn.setAttribute('title', isLight ? 'Switch to studio dark mode' : 'Switch to daylight paper mode');
            btn.innerHTML = isLight
                ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>'
                : '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>';
        }
    }

    applyTheme(getSavedTheme());

    // 2. Apply persisted iPad font size immediately
    const MIN_SIZE = 14;
    const MAX_SIZE = 23;
    let currentSize = parseInt(localStorage.getItem(FONT_KEY) || '17', 10);
    if (isNaN(currentSize) || currentSize < MIN_SIZE || currentSize > MAX_SIZE) {
        currentSize = 17;
    }

    function applyFontSize(size) {
        currentSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, size));
        document.documentElement.style.setProperty('--base-font-size', currentSize + 'px');
        localStorage.setItem(FONT_KEY, String(currentSize));
    }

    applyFontSize(currentSize);

    // 3. Initialize Mermaid with theme-aware styling if loaded
    if (typeof mermaid !== 'undefined') {
        const isLight = getSavedTheme() === 'light';
        mermaid.initialize({
            startOnLoad: true,
            theme: isLight ? 'default' : 'dark',
            themeVariables: isLight
                ? {
                      primaryColor: '#ece9e0',
                      edgeColor: '#0e6f8c',
                      primaryBorderColor: '#0e6f8c',
                      primaryTextColor: '#18191c',
                      background: '#f6f4ee'
                  }
                : {
                      primaryColor: '#1b1d21',
                      edgeColor: '#63c2df',
                      primaryBorderColor: '#63c2df',
                      primaryTextColor: '#ecebe6',
                      background: '#131416'
                  }
        });
    }

    document.addEventListener('DOMContentLoaded', function () {
        // Inject Hub back link & Theme/Progress controls into .chapter-nav if missing
        const navInner = document.querySelector('.chapter-nav-inner');
        const navControls = document.querySelector('.nav-controls');

        if (navInner && !navInner.querySelector('.nav-hub-link')) {
            const hubLink = document.createElement('a');
            hubLink.className = 'nav-hub-link';
            hubLink.href = '../index.html';
            hubLink.setAttribute('aria-label', 'Back to Podcast Hub');
            hubLink.innerHTML =
                '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5"/><path d="m12 19-7-7 7-7"/></svg>' +
                '<span class="nav-hub-label">Hub</span>';
            navInner.insertBefore(hubLink, navInner.firstChild);
        }

        if (navControls && !document.getElementById('theme-toggle')) {
            const themeBtn = document.createElement('button');
            themeBtn.id = 'theme-toggle';
            themeBtn.className = 'theme-btn';
            themeBtn.type = 'button';
            navControls.appendChild(themeBtn);
            applyTheme(getSavedTheme());
        }

        // Bind font size & theme controls
        const decBtn = document.getElementById('font-dec');
        const incBtn = document.getElementById('font-inc');
        const themeBtn = document.getElementById('theme-toggle');

        if (decBtn) decBtn.addEventListener('click', () => applyFontSize(currentSize - 1));
        if (incBtn) incBtn.addEventListener('click', () => applyFontSize(currentSize + 1));
        if (themeBtn) {
            themeBtn.addEventListener('click', () => {
                const next = getSavedTheme() === 'light' ? 'dark' : 'light';
                applyTheme(next);
            });
        }

        // 4. Collapsible Ground Facts drawer behavior:
        // Open on desktop/iPad landscape (> 980px), collapsed on iPad portrait/mobile (<= 980px)
        const sidebar = document.querySelector('.sidebar');
        if (sidebar) {
            let drawer = sidebar.querySelector('details.facts-drawer');
            const factBox = sidebar.querySelector('.fact-box');

            if (!drawer && factBox) {
                drawer = document.createElement('details');
                drawer.className = 'facts-drawer';

                const heading = factBox.querySelector('h2');
                const titleText = heading ? heading.textContent.replace(/[^\w\s&/-]/g, '').trim() : 'Ground Facts';
                if (heading) heading.remove();

                // Pull a compact summary preview from the first fact (e.g. Release Date)
                const firstVal = factBox.querySelector('.fact-value');
                const preview = firstVal ? firstVal.textContent.trim().split('(')[0].trim() : '';

                const summary = document.createElement('summary');
                summary.className = 'facts-drawer-summary';
                summary.innerHTML =
                    '<span class="facts-drawer-title">' +
                    titleText +
                    '</span>' +
                    '<span style="display:inline-flex;align-items:center;gap:0.5rem;min-width:0;">' +
                    (preview ? '<span class="facts-drawer-meta">' + preview + '</span>' : '') +
                    '<svg class="facts-drawer-chevron" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>' +
                    '</span>';

                drawer.appendChild(summary);
                factBox.parentNode.insertBefore(drawer, factBox);
                drawer.appendChild(factBox);
            }

            if (drawer) {
                const mq = window.matchMedia('(min-width: 981px)');
                const syncDrawer = (e) => {
                    drawer.open = e.matches;
                };
                syncDrawer(mq);
                mq.addEventListener('change', syncDrawer);
            }
        }

        // 5. Tap-to-check talking points (persisted per episode in localStorage)
        const trackables = Array.from(
            document.querySelectorAll('.main-content .card li, .main-content .issue-block, .main-content .pitch-block, .main-content .clip-hook')
        );

        let checkedSet = new Set();
        try {
            const saved = JSON.parse(localStorage.getItem(CHECKS_KEY) || '[]');
            if (Array.isArray(saved)) checkedSet = new Set(saved);
        } catch (_) {
            checkedSet = new Set();
        }

        function saveChecks() {
            localStorage.setItem(CHECKS_KEY, JSON.stringify(Array.from(checkedSet)));
        }

        // Progress counter pill in top bar (tap to clear all checks)
        let progressPill = document.getElementById('progress-pill');
        if (navControls && trackables.length > 0 && !progressPill) {
            progressPill = document.createElement('button');
            progressPill.id = 'progress-pill';
            progressPill.className = 'progress-pill';
            progressPill.type = 'button';
            progressPill.title = 'Checked talking points — tap to reset';
            navControls.insertBefore(progressPill, navControls.firstChild);

            progressPill.addEventListener('click', () => {
                if (checkedSet.size === 0) return;
                if (window.confirm('Clear all ' + checkedSet.size + ' checked talking points for this episode?')) {
                    checkedSet.clear();
                    trackables.forEach((el) => {
                        el.classList.remove('is-done');
                        el.setAttribute('aria-checked', 'false');
                    });
                    saveChecks();
                    updateProgress();
                }
            });
        }

        function updateProgress() {
            if (!progressPill) return;
            const count = checkedSet.size;
            progressPill.textContent = count + '/' + trackables.length;
            progressPill.classList.toggle('has-progress', count > 0);
        }

        trackables.forEach((el, idx) => {
            el.classList.add('trackable');
            el.setAttribute('role', 'checkbox');
            el.setAttribute('tabindex', '0');

            const isDone = checkedSet.has(idx);
            el.classList.toggle('is-done', isDone);
            el.setAttribute('aria-checked', String(isDone));

            function toggle(e) {
                // Ignore clicks on links or text selection
                if (e.target && e.target.closest('a, summary, button')) return;
                const sel = window.getSelection && window.getSelection().toString();
                if (sel && sel.length > 0) return;

                if (checkedSet.has(idx)) {
                    checkedSet.delete(idx);
                    el.classList.remove('is-done');
                    el.setAttribute('aria-checked', 'false');
                } else {
                    checkedSet.add(idx);
                    el.classList.add('is-done');
                    el.setAttribute('aria-checked', 'true');
                }
                saveChecks();
                updateProgress();
            }

            el.addEventListener('click', toggle);
            el.addEventListener('keydown', (e) => {
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggle(e);
                }
            });
        });

        updateProgress();

        // 6. Active chapter pill highlight on scroll
        const pills = Array.from(document.querySelectorAll('.chapter-pill[href^="#"]'));
        const sections = pills
            .map((pill) => document.querySelector(pill.getAttribute('href')))
            .filter(Boolean);

        if (sections.length && 'IntersectionObserver' in window) {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        if (entry.isIntersecting) {
                            const id = '#' + entry.target.id;
                            pills.forEach((p) => {
                                const isActive = p.getAttribute('href') === id;
                                p.classList.toggle('active', isActive);
                                if (isActive && p.scrollIntoView) {
                                    p.scrollIntoView({ behavior: 'smooth', inline: 'nearest', block: 'nearest' });
                                }
                            });
                        }
                    });
                },
                { rootMargin: '-15% 0px -68% 0px', threshold: 0 }
            );
            sections.forEach((sec) => observer.observe(sec));
        }
    });
})();
