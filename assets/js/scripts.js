class ProjectorPortfolio {
    constructor() {
        this.root = document.documentElement;
        this.navToggle = document.getElementById('nav-toggle');
        this.navMenu = document.getElementById('nav-menu');
        this.meter = document.getElementById('scroll-meter');
        this.lenses = document.querySelectorAll('.lens');
        this.filterable = document.querySelectorAll('[data-tags]');
        this.init();
    }

    init() {
        this.setupProjectorBeam();
        this.setupMobileNav();
        this.setupLensFiltering();
        this.setupRevealFields();
        this.setupActiveNav();
        this.setupScrollMeter();
    }

    setupProjectorBeam() {
        window.addEventListener('pointermove', (event) => {
            this.root.style.setProperty('--beam-x', `${event.clientX}px`);
            this.root.style.setProperty('--beam-y', `${event.clientY}px`);
        }, { passive: true });
    }

    setupMobileNav() {
        if (!this.navToggle || !this.navMenu) return;

        this.navToggle.addEventListener('click', () => {
            const isOpen = this.navMenu.classList.toggle('active');
            this.navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        this.navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                this.navMenu.classList.remove('active');
                this.navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    setupLensFiltering() {
        this.lenses.forEach(lens => {
            lens.addEventListener('click', () => {
                const activeLens = lens.dataset.lens || 'all';

                this.lenses.forEach(item => {
                    item.classList.toggle('active', item === lens);
                });

                this.filterable.forEach(item => {
                    const tags = (item.dataset.tags || '').split(/\s+/);
                    const matches = activeLens === 'all' || tags.includes(activeLens);

                    item.classList.toggle('is-dimmed', !matches);
                    item.classList.toggle('is-highlighted', matches && activeLens !== 'all');
                });
            });
        });
    }

    setupRevealFields() {
        const revealTargets = document.querySelectorAll([
            '.brand',
            '.nav-links a',
            '.hero-layout > div',
            '.section-head',
            '.focus-card',
            '.lens',
            '.project-slide',
            '.profile-grid article',
            '.method-grid article',
            '.timeline-list article',
            '.contact-grid a'
        ].join(','));

        const allTextNodes = new Set();
        let pointer = { x: -999, y: -999 };
        let frame = null;

        const updateTextMasks = () => {
            allTextNodes.forEach(textNode => {
                const bounds = textNode.getBoundingClientRect();

                textNode.style.setProperty('--text-x', `${pointer.x - bounds.left}px`);
                textNode.style.setProperty('--text-y', `${pointer.y - bounds.top}px`);
            });

            frame = null;
        };

        revealTargets.forEach(target => {
            target.classList.add('reveal-field');
            const textNodes = target.querySelectorAll('h1, h2, h3, p, a, span, strong, time, .kicker, .meta');

            textNodes.forEach(textNode => {
                textNode.classList.add('text-reveal');
                allTextNodes.add(textNode);
                if (!textNode.dataset.text) {
                    textNode.dataset.text = textNode.textContent;
                }
            });
        });

        window.addEventListener('pointermove', (event) => {
            pointer = { x: event.clientX, y: event.clientY };

            if (!frame) {
                frame = requestAnimationFrame(updateTextMasks);
            }
        }, { passive: true });
    }

    setupActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const links = document.querySelectorAll('.nav-links a');

        if (!sections.length || !links.length) return;

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) return;

                links.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
                });
            });
        }, {
            rootMargin: '-42% 0px -48% 0px',
            threshold: 0
        });

        sections.forEach(section => observer.observe(section));
    }

    setupScrollMeter() {
        if (!this.meter) return;

        const updateMeter = () => {
            const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
            const progress = maxScroll > 0 ? (window.scrollY / maxScroll) * 100 : 0;
            this.meter.style.width = `${Math.min(progress, 100)}%`;
        };

        updateMeter();
        window.addEventListener('scroll', updateMeter, { passive: true });
        window.addEventListener('resize', updateMeter);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ProjectorPortfolio();
});
