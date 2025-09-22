// AI Portfolio JavaScript - Interactive Terminal Experience

class AIPortfolio {
    constructor() {
        this.currentSection = 'home';
        this.typingSpeed = 50;
        this.commands = [
            'initializing portfolio system...',
            'loading cognitive science data...',
            'analyzing AI capabilities...',
            'establishing neural networks...',
            'portfolio system ready!'
        ];
        this.currentCommandIndex = 0;
        
        this.init();
    }

    init() {
        this.setupNavigation();
        this.startTypingAnimation();
        this.initializeSkillBars();
        this.setupTabSwitching();
        this.createParticleEffect();
        this.setupAIAssistant();
    }

    // Navigation System
    setupNavigation() {
        const navItems = document.querySelectorAll('.nav-item');
        const sections = document.querySelectorAll('.content-section');

        navItems.forEach(item => {
            item.addEventListener('click', () => {
                const targetSection = item.dataset.section;
                
                // Update navigation
                navItems.forEach(nav => nav.classList.remove('active'));
                item.classList.add('active');
                
                // Update sections
                sections.forEach(section => section.classList.remove('active'));
                document.getElementById(targetSection).classList.add('active');
                
                this.currentSection = targetSection;
                this.updateCommandLine(targetSection);
            });
        });
    }

    // Typing Animation
    startTypingAnimation() {
        const typingElement = document.getElementById('typing-text');
        this.typeCommand(typingElement, this.commands[0]);
    }

    typeCommand(element, text) {
        element.textContent = '';
        let i = 0;
        
        const typeWriter = () => {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, this.typingSpeed);
            } else {
                setTimeout(() => {
                    this.currentCommandIndex = (this.currentCommandIndex + 1) % this.commands.length;
                    this.typeCommand(element, this.commands[this.currentCommandIndex]);
                }, 3000);
            }
        };
        
        typeWriter();
    }

    updateCommandLine(section) {
        const typingElement = document.getElementById('typing-text');
        const sectionCommands = {
            'home': 'profile initialized successfully',
            'about': 'bio data loaded',
            'skills': 'capabilities analyzed',
            'experience': 'experience query completed',
            'projects': 'project scan finished',
            'contact': 'connection established'
        };
        
        this.typeCommand(typingElement, sectionCommands[section] || 'command executed');
    }

    // Skill Bars Animation
    initializeSkillBars() {
        const skillBars = document.querySelectorAll('.skill-progress');
        
        const animateSkills = () => {
            skillBars.forEach(bar => {
                const progress = bar.dataset.progress;
                bar.style.width = progress + '%';
            });
        };

        // Animate when skills section becomes visible
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.target.id === 'skills') {
                    setTimeout(animateSkills, 500);
                }
            });
        });

        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            observer.observe(skillsSection);
        }
    }

    // Tab Switching for Experience
    setupTabSwitching() {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetTab = btn.dataset.tab;
                
                // Update buttons
                tabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Update panels
                tabPanels.forEach(panel => panel.classList.remove('active'));
                document.getElementById(targetTab).classList.add('active');
            });
        });
    }

    // Particle Effect
    createParticleEffect() {
        const particleContainer = document.querySelector('.particle-background');
        const particleCount = 50;

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: absolute;
                width: 2px;
                height: 2px;
                background: #00ff88;
                border-radius: 50%;
                pointer-events: none;
                opacity: ${Math.random() * 0.5 + 0.2};
            `;
            
            this.animateParticle(particle);
            particleContainer.appendChild(particle);
        }
    }

    animateParticle(particle) {
        const resetParticle = () => {
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = '100%';
            particle.style.animationDuration = (Math.random() * 20 + 10) + 's';
        };

        resetParticle();
        
        particle.animate([
            { transform: 'translateY(0px)', opacity: 0 },
            { transform: 'translateY(-20px)', opacity: 1 },
            { transform: `translateY(-${window.innerHeight + 100}px)`, opacity: 0 }
        ], {
            duration: parseInt(particle.style.animationDuration) * 1000,
            iterations: Infinity
        });
    }

    // AI Assistant
    setupAIAssistant() {
        const assistant = document.querySelector('.ai-assistant');
        const responses = [
            'AI systems initialized ✓',
            'Cognitive analysis complete ✓',
            'Neural pathways optimized ✓',
            'Ready for collaboration ✓',
            'How can I assist you today?'
        ];

        let responseIndex = 0;

        assistant.addEventListener('click', () => {
            this.showAIResponse(responses[responseIndex]);
            responseIndex = (responseIndex + 1) % responses.length;
        });
    }

    showAIResponse(message) {
        // Create floating response
        const response = document.createElement('div');
        response.style.cssText = `
            position: fixed;
            bottom: 100px;
            right: 20px;
            background: #1a1a1a;
            color: #00ff88;
            padding: 12px 16px;
            border-radius: 4px;
            border: 1px solid #333;
            font-family: 'JetBrains Mono', monospace;
            font-size: 0.9rem;
            z-index: 1001;
            box-shadow: 0 4px 20px rgba(0, 255, 136, 0.2);
            transform: translateY(20px);
            opacity: 0;
            transition: all 0.3s ease;
            pointer-events: none;
            max-width: 250px;
        `;
        
        response.textContent = message;
        document.body.appendChild(response);
        
        // Animate in
        requestAnimationFrame(() => {
            response.style.transform = 'translateY(0)';
            response.style.opacity = '1';
        });
        
        // Remove after delay
        setTimeout(() => {
            response.style.transform = 'translateY(-20px)';
            response.style.opacity = '0';
            setTimeout(() => response.remove(), 300);
        }, 3000);
    }

    // Matrix Rain Effect (Easter Egg)
    createMatrixRain() {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            pointer-events: none;
            z-index: -1;
            opacity: 0.1;
        `;
        
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        
        const matrix = "ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}";
        const characters = matrix.split('');
        
        const fontSize = 10;
        const columns = canvas.width / fontSize;
        const drops = [];
        
        for (let x = 0; x < columns; x++) {
            drops[x] = 1;
        }
        
        const draw = () => {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.04)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            ctx.fillStyle = '#00ff88';
            ctx.font = fontSize + 'px JetBrains Mono';
            
            for (let i = 0; i < drops.length; i++) {
                const text = characters[Math.floor(Math.random() * characters.length)];
                ctx.fillText(text, i * fontSize, drops[i] * fontSize);
                
                if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }
        };
        
        document.body.appendChild(canvas);
        setInterval(draw, 35);
    }

    // Konami Code Easter Egg
    setupKonamiCode() {
        const konamiCode = [
            'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
            'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
            'KeyB', 'KeyA'
        ];
        
        let konamiIndex = 0;
        
        document.addEventListener('keydown', (e) => {
            if (e.code === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    this.activateMatrixMode();
                    konamiIndex = 0;
                }
            } else {
                konamiIndex = 0;
            }
        });
    }

    activateMatrixMode() {
        this.showAIResponse('Matrix mode activated! 🤖');
        this.createMatrixRain();
        
        // Change color scheme temporarily
        document.documentElement.style.setProperty('--text-primary', '#ff0040');
        document.documentElement.style.setProperty('--glow-color', '#ff0040');
        
        setTimeout(() => {
            document.documentElement.style.setProperty('--text-primary', '#00ff88');
            document.documentElement.style.setProperty('--glow-color', '#00ff88');
        }, 10000);
    }
}

// Initialize the AI Portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new AIPortfolio();
    
    // Add some extra interactive features
    portfolio.setupKonamiCode();
    
    // Add glitch effect on certain elements occasionally
    setInterval(() => {
        const elements = document.querySelectorAll('.glow-text, .status-active');
        const randomElement = elements[Math.floor(Math.random() * elements.length)];
        
        if (randomElement && Math.random() > 0.7) {
            randomElement.style.animation = 'glitch 0.3s ease';
            setTimeout(() => {
                randomElement.style.animation = '';
            }, 300);
        }
    }, 5000);
});

// Add CSS for glitch effect
const glitchCSS = `
@keyframes glitch {
    0% { transform: translate(0); }
    20% { transform: translate(-2px, 2px); }
    40% { transform: translate(-2px, -2px); }
    60% { transform: translate(2px, 2px); }
    80% { transform: translate(2px, -2px); }
    100% { transform: translate(0); }
}
`;

const style = document.createElement('style');
style.textContent = glitchCSS;
document.head.appendChild(style);