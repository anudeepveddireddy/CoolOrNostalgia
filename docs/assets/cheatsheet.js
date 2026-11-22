(function () {
    // 1. Initialize Mermaid with CoolOrNostalgia synthwave dark theme if loaded
    if (typeof mermaid !== 'undefined') {
        mermaid.initialize({
            startOnLoad: true,
            theme: 'dark',
            themeVariables: {
                primaryColor: '#1a112c',
                edgeColor: '#05d9e8',
                primaryBorderColor: '#ff2a6d',
                primaryTextColor: '#e2d9f3',
                background: '#0d0914'
            }
        });
    }

    // 2. iPad-friendly font size toggle (persisted in localStorage)
    const STORAGE_KEY = 'con_font_size';
    const MIN_SIZE = 14;
    const MAX_SIZE = 22;
    let currentSize = parseInt(localStorage.getItem(STORAGE_KEY) || '16', 10);
    if (isNaN(currentSize) || currentSize < MIN_SIZE || currentSize > MAX_SIZE) {
        currentSize = 16;
    }

    function applyFontSize(size) {
        currentSize = Math.max(MIN_SIZE, Math.min(MAX_SIZE, size));
        document.documentElement.style.setProperty('--base-font-size', currentSize + 'px');
        localStorage.setItem(STORAGE_KEY, String(currentSize));
    }

    applyFontSize(currentSize);

    document.addEventListener('DOMContentLoaded', function () {
        const decBtn = document.getElementById('font-dec');
        const incBtn = document.getElementById('font-inc');
        if (decBtn) decBtn.addEventListener('click', () => applyFontSize(currentSize - 1));
        if (incBtn) incBtn.addEventListener('click', () => applyFontSize(currentSize + 1));

        // 3. Highlight active chapter pill on scroll
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
                            pills.forEach((p) => p.classList.toggle('active', p.getAttribute('href') === id));
                        }
                    });
                },
                { rootMargin: '-18% 0px -65% 0px', threshold: 0 }
            );
            sections.forEach((sec) => observer.observe(sec));
        }
    });
})();
