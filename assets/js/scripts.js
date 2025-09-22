// Modern Portfolio JavaScript
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupNavigation();
        this.setupAnimations();
        this.setupParticles();
        this.setupRoleRotation();
        this.setupSkillBars();
        this.setupScrollEffects();
        this.setupFormHandling();
    }

    // Navigation functionality
    setupNavigation() {
        const nav = document.getElementById('floating-nav');
        const navToggle = document.getElementById('nav-toggle');
        const navMenu = document.getElementById('nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        // Mobile menu toggle
        if (navToggle) {
            navToggle.addEventListener('click', () => {
                navToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        // Smooth scrolling and active link management
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }

                // Close mobile menu
                navToggle?.classList.remove('active');
                navMenu?.classList.remove('active');

                // Update active link
                navLinks.forEach(l => l.classList.remove('active'));
                link.classList.add('active');
            });
        });

        // Scroll-based nav styling
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                nav?.classList.add('scrolled');
            } else {
                nav?.classList.remove('scrolled');
            }

            // Update active link based on scroll position
            this.updateActiveNavLink();
        });
    }

    updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 200;
            const sectionHeight = section.offsetHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // Particle system for hero section
    setupParticles() {
        const particlesContainer = document.getElementById('particles');
        if (!particlesContainer) return;

        const particleCount = 50;
        const particles = [];

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                pointer-events: none;
            `;
            
            particlesContainer.appendChild(particle);
            particles.push({
                element: particle,
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5
            });
        }

        const animateParticles = () => {
            particles.forEach(particle => {
                particle.x += particle.vx;
                particle.y += particle.vy;

                // Wrap around screen
                if (particle.x < 0) particle.x = window.innerWidth;
                if (particle.x > window.innerWidth) particle.x = 0;
                if (particle.y < 0) particle.y = window.innerHeight;
                if (particle.y > window.innerHeight) particle.y = 0;

                particle.element.style.transform = `translate(${particle.x}px, ${particle.y}px)`;
            });

            requestAnimationFrame(animateParticles);
        };

        animateParticles();
    }

    // Role rotation animation
    setupRoleRotation() {
        const roles = document.querySelectorAll('.role');
        if (roles.length === 0) return;

        let currentRole = 0;
        
        const rotateRoles = () => {
            roles.forEach(role => role.classList.remove('active'));
            roles[currentRole].classList.add('active');
            currentRole = (currentRole + 1) % roles.length;
        };

        // Initial activation
        roles[0]?.classList.add('active');
        
        // Rotate every 3 seconds
        setInterval(rotateRoles, 3000);
    }

    // Skill bar animations
    setupSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkillBar = (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progress = entry.target.dataset.progress;
                    entry.target.style.setProperty('--progress', `${progress}%`);
                    entry.target.style.width = `${progress}%`;
                    observer.unobserve(entry.target);
                }
            });
        };

        const skillObserver = new IntersectionObserver(animateSkillBar, {
            threshold: 0.5
        });

        skillBars.forEach(bar => skillObserver.observe(bar));
    }

    // Scroll-based animations
    setupAnimations() {
        const observeElements = (selector, animationClass = 'animate-in') => {
            const elements = document.querySelectorAll(selector);
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add(animationClass);
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '0px 0px -50px 0px'
            });

            elements.forEach(el => observer.observe(el));
        };

        // Animate various elements on scroll
        observeElements('.stat-item');
        observeElements('.skill-category');
        observeElements('.timeline-item');
        observeElements('.project-card');
        observeElements('.interest-item');

        // Add CSS for animations
        this.addAnimationStyles();
    }

    addAnimationStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .stat-item,
            .skill-category,
            .timeline-item,
            .project-card,
            .interest-item {
                opacity: 0;
                transform: translateY(30px);
                transition: all 0.6s ease;
            }
            
            .stat-item.animate-in,
            .skill-category.animate-in,
            .timeline-item.animate-in,
            .project-card.animate-in,
            .interest-item.animate-in {
                opacity: 1;
                transform: translateY(0);
            }
            
            .interest-item {
                transition-delay: calc(var(--index, 0) * 0.1s);
            }
        `;
        document.head.appendChild(style);

        // Add index for staggered animations
        document.querySelectorAll('.interest-item').forEach((item, index) => {
            item.style.setProperty('--index', index);
        });
    }

    // Scroll effects
    setupScrollEffects() {
        // Parallax effect for hero section
        const hero = document.querySelector('.hero-section');
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            
            if (hero) {
                hero.style.transform = `translateY(${rate}px)`;
            }
        });

        // Add scroll progress indicator
        this.setupScrollProgress();
    }

    setupScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = `${scrollPercent}%`;
        });
    }

    // Form handling
    setupFormHandling() {
        const form = document.querySelector('.contact-form');
        const submitBtn = document.querySelector('.submit-btn');
        
        if (!form || !submitBtn) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Add loading state
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Simulate form submission (replace with actual form handling)
            setTimeout(() => {
                submitBtn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
                submitBtn.style.background = '#10b981';
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                    submitBtn.style.background = '';
                    form.reset();
                }, 2000);
            }, 1500);
        });

        // Real-time form validation
        const inputs = form.querySelectorAll('input, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', () => {
                this.validateField(input);
            });
        });
    }

    validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let message = '';

        switch (field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                if (!emailRegex.test(value)) {
                    isValid = false;
                    message = 'Please enter a valid email address';
                }
                break;
            default:
                if (field.hasAttribute('required') && !value) {
                    isValid = false;
                    message = 'This field is required';
                }
        }

        // Update field styling
        if (isValid) {
            field.style.borderColor = '#10b981';
        } else {
            field.style.borderColor = '#ef4444';
        }

        // Show/hide error message
        let errorMsg = field.parentNode.querySelector('.error-message');
        if (!isValid && message) {
            if (!errorMsg) {
                errorMsg = document.createElement('div');
                errorMsg.className = 'error-message';
                errorMsg.style.cssText = 'color: #ef4444; font-size: 0.875rem; margin-top: 0.25rem;';
                field.parentNode.appendChild(errorMsg);
            }
            errorMsg.textContent = message;
        } else if (errorMsg) {
            errorMsg.remove();
        }
    }

    // Interest cloud interactions
    setupInterestCloud() {
        const interestItems = document.querySelectorAll('.interest-item');
        
        interestItems.forEach(item => {
            item.addEventListener('mouseenter', () => {
                const category = item.dataset.category;
                interestItems.forEach(otherItem => {
                    if (otherItem.dataset.category !== category) {
                        otherItem.style.opacity = '0.3';
                    }
                });
            });

            item.addEventListener('mouseleave', () => {
                interestItems.forEach(otherItem => {
                    otherItem.style.opacity = '1';
                });
            });
        });
    }

    // Utility methods
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Typewriter effect for hero text
    typewriterEffect(element, texts, speed = 100) {
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        const type = () => {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            let typeSpeed = speed;
            if (isDeleting) typeSpeed /= 2;

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before next text
            }

            setTimeout(type, typeSpeed);
        };

        type();
    }
}

// Initialize portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
});

// Handle window resize
window.addEventListener('resize', () => {
    // Recalculate particle positions if needed
    const particlesContainer = document.getElementById('particles');
    if (particlesContainer) {
        // Re-initialize particles for new screen size
        particlesContainer.innerHTML = '';
        // Could re-run particle setup here if needed
    }
});

// Add smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const smoothScrollPolyfill = () => {
        const links = document.querySelectorAll('a[href^="#"]');
        links.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(link.getAttribute('href'));
                if (target) {
                    const targetPosition = target.offsetTop - 100;
                    const startPosition = window.pageYOffset;
                    const distance = targetPosition - startPosition;
                    const duration = 800;
                    let start = null;

                    const animation = (currentTime) => {
                        if (start === null) start = currentTime;
                        const timeElapsed = currentTime - start;
                        const run = ease(timeElapsed, startPosition, distance, duration);
                        window.scrollTo(0, run);
                        if (timeElapsed < duration) requestAnimationFrame(animation);
                    };

                    const ease = (t, b, c, d) => {
                        t /= d / 2;
                        if (t < 1) return c / 2 * t * t + b;
                        t--;
                        return -c / 2 * (t * (t - 2) - 1) + b;
                    };

                    requestAnimationFrame(animation);
                }
            });
        });
    };
    
    smoothScrollPolyfill();
}