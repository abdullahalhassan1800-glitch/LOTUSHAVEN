/* ============================================
   LOTUSHAVEN — MAIN JAVASCRIPT
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    const preloaderPetals = document.querySelectorAll('.lotus-petal');
    const preloaderGlow = document.querySelector('.lotus-glow');
    const preloaderBrand = document.querySelector('.preloader-brand');
    const preloaderSub = document.querySelector('.preloader-sub');
    const preloaderBarWrap = document.querySelector('.preloader-bar-wrap');
    const preloaderBar = document.querySelector('.preloader-bar');
    const preloaderTagline = document.querySelector('.preloader-tagline');
    const taglineWords = document.querySelectorAll('.tagline-word');
    const preloaderParticlesContainer = document.getElementById('preloaderParticles');

    // Create preloader particles
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'preloader-particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = 50 + Math.random() * 50 + '%';
        particle.style.width = (1 + Math.random() * 3) + 'px';
        particle.style.height = particle.style.width;
        particle.style.animation = `preloaderParticleFloat ${2 + Math.random() * 3}s ease infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        preloaderParticlesContainer.appendChild(particle);
    }

    // Preloader animation sequence
    function runPreloader() {
        const tl = [
            { delay: 300, fn: () => animatePetals() },
            { delay: 800, fn: () => { preloaderBrand.style.opacity = '1'; }},
            { delay: 400, fn: () => { preloaderSub.style.opacity = '1'; preloaderSub.style.transition = 'opacity 0.6s'; }},
            { delay: 300, fn: () => { preloaderBarWrap.style.opacity = '1'; preloaderBarWrap.style.transition = 'opacity 0.4s'; }},
            { delay: 100, fn: () => { preloaderBar.style.width = '100%'; }},
            { delay: 800, fn: () => { preloaderTagline.style.opacity = '1'; preloaderTagline.style.transition = 'opacity 0.5s'; }},
            { delay: 200, fn: () => animateTaglineWords() },
            { delay: 1200, fn: () => hidePreloader() },
        ];

        let cumulative = 0;
        tl.forEach(step => {
            cumulative += step.delay;
            setTimeout(step.fn, cumulative);
        });
    }

    function animatePetals() {
        preloaderPetals.forEach((petal, i) => {
            const delay = i * 120;
            const opacity = parseFloat(petal.getAttribute('opacity')) || 0.7;
            petal.style.setProperty('--petal-opacity', opacity);
            setTimeout(() => {
                petal.style.animation = `lotusPetalBloom 0.8s ease forwards`;
                petal.style.animationDelay = `${delay}ms`;
            }, delay);
        });
        if (preloaderGlow) {
            setTimeout(() => {
                preloaderGlow.style.animation = 'lotusGlow 1s ease forwards';
            }, 300);
        }
    }

    function animateTaglineWords() {
        taglineWords.forEach((word, i) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
                word.style.transition = 'all 0.5s ease';
            }, i * 200);
        });
    }

    function hidePreloader() {
        preloader.classList.add('hidden');
        document.body.style.overflow = '';
        initHeroAnimations();
        initParticles();
    }

    // Start preloader
    document.body.style.overflow = 'hidden';
    runPreloader();

    // ========== HERO ANIMATIONS ==========
    function initHeroAnimations() {
        const heroReveals = document.querySelectorAll('.hero-content .reveal-up');
        heroReveals.forEach((el, i) => {
            const delay = parseFloat(el.dataset.delay || 0) * 1000;
            setTimeout(() => {
                el.classList.add('revealed');
            }, delay + 200);
        });

        // Animate stat counters
        setTimeout(animateCounters, 1000);
    }

    // ========== PARTICLES ==========
    function initParticles() {
        const container = document.getElementById('heroParticles');
        if (!container) return;

        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'hero-particle';
            const size = 1 + Math.random() * 3;
            particle.style.width = size + 'px';
            particle.style.height = size + 'px';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = 60 + Math.random() * 40 + '%';
            particle.style.setProperty('--drift-x', (Math.random() * 100 - 50) + 'px');
            particle.style.animationDuration = (5 + Math.random() * 10) + 's';
            particle.style.animationDelay = Math.random() * 8 + 's';
            container.appendChild(particle);
        }

        // Investment section particles
        const investContainer = document.getElementById('investParticles');
        if (investContainer) {
            for (let i = 0; i < 30; i++) {
                const particle = document.createElement('div');
                particle.className = 'hero-particle';
                const size = 1 + Math.random() * 2;
                particle.style.width = size + 'px';
                particle.style.height = size + 'px';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.setProperty('--drift-x', (Math.random() * 80 - 40) + 'px');
                particle.style.animationDuration = (6 + Math.random() * 12) + 's';
                particle.style.animationDelay = Math.random() * 6 + 's';
                investContainer.appendChild(particle);
            }
        }
    }

    // ========== COUNTER ANIMATION ==========
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const start = performance.now();

            function update(now) {
                const elapsed = now - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3);
                counter.textContent = Math.floor(target * eased);

                if (progress < 1) {
                    requestAnimationFrame(update);
                } else {
                    counter.textContent = target;
                }
            }
            requestAnimationFrame(update);
        });
    }

    // ========== SCROLL REVEAL ==========
    const revealElements = document.querySelectorAll('.reveal-up:not(.hero-content .reveal-up), .reveal-left, .reveal-right, .reveal-scale');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = parseFloat(entry.target.dataset.delay || 0) * 1000;
                setTimeout(() => {
                    entry.target.classList.add('revealed');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link[data-section]');
    const sections = document.querySelectorAll('section[id]');

    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;

        // Navbar background
        if (scrollY > 80) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active nav link
        sections.forEach(section => {
            const top = section.offsetTop - 120;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.dataset.section === id) {
                        link.classList.add('active');
                    }
                });
            }
        });

        // Back to top
        const backToTop = document.getElementById('backToTop');
        if (scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    // ========== MOBILE MENU ==========
    const hamburger = document.getElementById('navHamburger');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
    });

    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // ========== CUSTOM CURSOR ==========
    const cursorOuter = document.getElementById('cursorOuter');
    const cursorInner = document.getElementById('cursorInner');

    if (window.innerWidth > 768) {
        let mouseX = 0, mouseY = 0;
        let outerX = 0, outerY = 0;

        document.addEventListener('mousemove', e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursorInner.style.left = mouseX + 'px';
            cursorInner.style.top = mouseY + 'px';
        });

        function animateCursor() {
            outerX += (mouseX - outerX) * 0.12;
            outerY += (mouseY - outerY) * 0.12;
            cursorOuter.style.left = outerX + 'px';
            cursorOuter.style.top = outerY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .gallery-item, .plot-card, .why-card, .amenity-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    // ========== CARD MOUSE TRACKING ==========
    const trackCards = document.querySelectorAll('.plot-card, .why-card');
    trackCards.forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mouse-x', x + '%');
            card.style.setProperty('--mouse-y', y + '%');
        });
    });

    // ========== BUTTON RIPPLE ==========
    document.querySelectorAll('.btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'btn-ripple';
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = (e.clientX - rect.left - size / 2) + 'px';
            ripple.style.top = (e.clientY - rect.top - size / 2) + 'px';
            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const top = target.offsetTop - offset;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });

    // ========== CONTACT FORM ==========
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.classList.add('loading');
            submitBtn.innerHTML = '<span>Submitting...</span>';

            // Simulate form submission
            setTimeout(() => {
                this.innerHTML = `
                    <div class="form-success">
                        <i class="fas fa-check-circle"></i>
                        <h3>Thank You!</h3>
                        <p>Your enquiry has been submitted successfully.<br>Our team will contact you within 24 hours.</p>
                    </div>
                `;
            }, 1500);
        });
    }

    // ========== PARALLAX EFFECT ON SCROLL ==========
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                const heroFloats = document.querySelectorAll('.hero-float-card');
                heroFloats.forEach((card, i) => {
                    const speed = 0.02 + i * 0.01;
                    card.style.transform = `translateY(${scrollY * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    });

    // ========== LAZY ANIMATE MAP LANDMARKS ==========
    const mapArea = document.querySelector('.location-map-placeholder');
    if (mapArea) {
        const mapObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const landmarks = entry.target.querySelectorAll('.map-landmark');
                    landmarks.forEach((landmark, i) => {
                        setTimeout(() => {
                            landmark.style.opacity = '1';
                            landmark.style.transform = 'translateY(0)';
                        }, i * 200);
                    });
                    mapObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });

        const landmarks = mapArea.querySelectorAll('.map-landmark');
        landmarks.forEach(lm => {
            lm.style.opacity = '0';
            lm.style.transform = 'translateY(10px)';
            lm.style.transition = 'all 0.5s ease';
        });

        mapObserver.observe(mapArea);
    }

    // ========== THEME TOGGLE (Day/Night) ==========
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;
    
    // Load saved theme
    const savedTheme = localStorage.getItem('lotushaven-theme');
    if (savedTheme) {
        html.setAttribute('data-theme', savedTheme);
    }
    
    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const current = html.getAttribute('data-theme');
            const next = current === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', next);
            localStorage.setItem('lotushaven-theme', next);
            
            // Rotate animation
            themeToggle.style.transform = 'rotate(360deg)';
            setTimeout(() => { themeToggle.style.transform = ''; }, 500);
        });
    }
});
