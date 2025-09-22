// Human-AI Interaction Portfolio JavaScript

class HumanAIPortfolio {
    constructor() {
        this.messages = [];
        this.isTyping = false;
        this.currentMood = 'ready';
        this.cognitiveLoad = 0;
        this.emotionParticles = [];
        this.conversationData = this.initializeConversationData();
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.startInitialConversation();
        this.initializeWidgets();
        this.startNeuralActivity();
        this.setupFloatingActions();
    }

    initializeConversationData() {
        return {
            about: {
                response: "I'm Sabrina, an AI Consultant and Cognitive Scientist! I'm passionate about bridging the gap between human cognition and artificial intelligence. Currently pursuing my Master's in Cognitive Science at Aarhus University while working as an AI Consultant at Gejst Studio.",
                emotion: "excited",
                complexity: 40
            },
            skills: {
                response: "My expertise spans across AI & Machine Learning (Python, Neural Networks), Cognitive Science research, and human-AI interaction design. I'm particularly skilled in translating complex AI concepts for human understanding and vice versa. I also have experience in research design, data analysis, and building AI systems that respect human cognitive patterns.",
                emotion: "confident",
                complexity: 70
            },
            experience: {
                response: "I've been on quite a journey! Currently, I'm an AI Consultant at Gejst Studio and IT Employee at Aarhus University's Interacting Minds Center. I co-founded a startup creating LLM-powered flashcards, and I've held various research and teaching positions. I've also been deeply involved in volunteer work, including serving as Chairperson for the Cognitive Science student council.",
                emotion: "proud",
                complexity: 60
            },
            projects: {
                response: "One of my most exciting projects is the AI Flashcard Generator - an LLM-powered platform that transforms any content into personalized learning flashcards. I'm also conducting research on integrating cognitive science principles into AI system design. These projects represent my core mission: making AI more human-centered and accessible.",
                emotion: "innovative",
                complexity: 80
            },
            greeting: {
                response: "Hello! I'm excited to share my journey with you. I'm Sabrina, and I work at the fascinating intersection of human cognition and artificial intelligence. What would you like to know about my background?",
                emotion: "welcoming",
                complexity: 30
            }
        };
    }

    setupEventListeners() {
        const sendBtn = document.getElementById('sendBtn');
        const userInput = document.getElementById('userInput');
        const quickBtns = document.querySelectorAll('.quick-btn');

        sendBtn.addEventListener('click', () => this.handleUserInput());
        userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.handleUserInput();
        });

        quickBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.dataset.action;
                this.handleQuickAction(action);
            });
        });
    }

    async startInitialConversation() {
        await this.delay(1000);
        await this.addAIMessage(this.conversationData.greeting.response, 'welcoming');
    }

    async handleUserInput() {
        const userInput = document.getElementById('userInput');
        const message = userInput.value.trim();
        
        if (!message) return;

        this.addHumanMessage(message);
        userInput.value = '';
        
        await this.delay(800);
        await this.processAIResponse(message);
    }

    async handleQuickAction(action) {
        const actionData = this.conversationData[action];
        if (!actionData) return;

        // Add human message for the quick action
        const quickMessages = {
            about: "Tell me about yourself",
            skills: "What are your skills?",
            experience: "Show me your experience",
            projects: "What projects have you worked on?"
        };

        this.addHumanMessage(quickMessages[action]);
        await this.delay(800);
        await this.addAIMessage(actionData.response, actionData.emotion, actionData.complexity);
    }

    addHumanMessage(content) {
        const message = {
            type: 'human',
            content: content,
            timestamp: new Date()
        };
        
        this.messages.push(message);
        this.renderMessage(message);
        this.createEmotionParticles('human');
        this.updateCognitiveLoad(20);
    }

    async addAIMessage(content, emotion = 'neutral', complexity = 50) {
        await this.showTypingIndicator();
        
        const message = {
            type: 'ai',
            content: content,
            timestamp: new Date(),
            emotion: emotion
        };
        
        this.messages.push(message);
        this.hideTypingIndicator();
        this.renderMessage(message);
        this.updateAIMood(emotion);
        this.updateCognitiveLoad(complexity);
        this.createEmotionParticles('ai');
        this.updateNeuralStats();
    }

    async processAIResponse(userMessage) {
        // Simple keyword matching for responses
        const keywords = {
            about: ['about', 'who', 'yourself', 'introduction', 'background'],
            skills: ['skills', 'abilities', 'expertise', 'capabilities', 'good at'],
            experience: ['experience', 'work', 'career', 'job', 'positions'],
            projects: ['projects', 'work', 'built', 'created', 'portfolio']
        };

        let responseType = 'general';
        let maxMatches = 0;

        Object.keys(keywords).forEach(type => {
            const matches = keywords[type].filter(keyword => 
                userMessage.toLowerCase().includes(keyword)
            ).length;
            
            if (matches > maxMatches) {
                maxMatches = matches;
                responseType = type;
            }
        });

        if (responseType === 'general') {
            const generalResponses = [
                "That's an interesting question! Let me think about how my experience in cognitive science and AI can help answer that.",
                "Great question! My work focuses on making AI more human-centered. Could you be more specific about what you'd like to know?",
                "I love discussing the intersection of human cognition and AI! What aspect interests you most?"
            ];
            
            const randomResponse = generalResponses[Math.floor(Math.random() * generalResponses.length)];
            await this.addAIMessage(randomResponse, 'thoughtful', 45);
        } else {
            const data = this.conversationData[responseType];
            await this.addAIMessage(data.response, data.emotion, data.complexity);
        }
    }

    renderMessage(message) {
        const messagesContainer = document.getElementById('messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.type}`;
        
        const time = message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
        
        messageElement.innerHTML = `
            <div class="message-bubble">
                <div class="message-content">${message.content}</div>
                <div class="message-time">${time}</div>
            </div>
        `;
        
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    async showTypingIndicator() {
        const messagesContainer = document.getElementById('messages');
        const typingElement = document.createElement('div');
        typingElement.className = 'message ai typing-message';
        typingElement.innerHTML = `
            <div class="typing-indicator">
                <div class="typing-dots">
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                    <div class="typing-dot"></div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(typingElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        this.isTyping = true;
        
        await this.delay(1500 + Math.random() * 1000); // Variable typing time
    }

    hideTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
        this.isTyping = false;
    }

    // Widget Functions
    initializeWidgets() {
        this.createSkillRadar();
        this.createMiniTimeline();
        this.updateAIMood('ready');
        this.updateCognitiveLoad(30);
    }

    createSkillRadar() {
        const canvas = document.getElementById('skillRadar');
        const ctx = canvas.getContext('2d');
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        const radius = 80;

        const skills = [
            { name: 'AI/ML', value: 0.9 },
            { name: 'Research', value: 0.95 },
            { name: 'Python', value: 0.88 },
            { name: 'Cognitive Science', value: 0.92 },
            { name: 'Data Analysis', value: 0.85 },
            { name: 'Communication', value: 0.9 }
        ];

        // Clear canvas
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw radar background
        ctx.strokeStyle = '#e2e8f0';
        ctx.lineWidth = 1;
        for (let i = 1; i <= 5; i++) {
            ctx.beginPath();
            ctx.arc(centerX, centerY, (radius / 5) * i, 0, 2 * Math.PI);
            ctx.stroke();
        }

        // Draw axes
        ctx.strokeStyle = '#cbd5e0';
        for (let i = 0; i < skills.length; i++) {
            const angle = (i * 2 * Math.PI) / skills.length - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(centerX, centerY);
            ctx.lineTo(
                centerX + Math.cos(angle) * radius,
                centerY + Math.sin(angle) * radius
            );
            ctx.stroke();
        }

        // Draw skill polygon
        ctx.fillStyle = 'rgba(102, 126, 234, 0.3)';
        ctx.strokeStyle = '#667eea';
        ctx.lineWidth = 2;
        ctx.beginPath();
        
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const x = centerX + Math.cos(angle) * radius * skill.value;
            const y = centerY + Math.sin(angle) * radius * skill.value;
            
            if (index === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        });
        
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Add skill labels
        ctx.fillStyle = '#4a5568';
        ctx.font = '10px Space Grotesk';
        ctx.textAlign = 'center';
        
        skills.forEach((skill, index) => {
            const angle = (index * 2 * Math.PI) / skills.length - Math.PI / 2;
            const labelRadius = radius + 15;
            const x = centerX + Math.cos(angle) * labelRadius;
            const y = centerY + Math.sin(angle) * labelRadius;
            ctx.fillText(skill.name, x, y);
        });
    }

    createMiniTimeline() {
        const timeline = document.getElementById('miniTimeline');
        const experiences = [
            { title: 'AI Consultant', date: '2025 - Present', type: 'current' },
            { title: 'IT Employee', date: '2024 - Present', type: 'current' },
            { title: 'Co-founder', date: '2024 - Present', type: 'current' },
            { title: 'Research Assistant', date: '2023', type: 'past' }
        ];

        timeline.innerHTML = experiences.map(exp => `
            <div class="timeline-item">
                <div class="timeline-dot ${exp.type === 'current' ? 'current' : ''}"></div>
                <div class="timeline-content">
                    <div class="timeline-title">${exp.title}</div>
                    <div class="timeline-date">${exp.date}</div>
                </div>
            </div>
        `).join('');
    }

    updateAIMood(emotion) {
        const moodFace = document.getElementById('aiMood');
        const moodText = document.getElementById('moodText');
        const mouth = moodFace.querySelector('.mouth');
        
        const emotions = {
            ready: { color: '#667eea', text: 'Ready to assist', mouth: 'smile' },
            excited: { color: '#48bb78', text: 'Excited to share!', mouth: 'wide-smile' },
            thoughtful: { color: '#9f7aea', text: 'Processing...', mouth: 'neutral' },
            confident: { color: '#3182ce', text: 'Confident', mouth: 'smile' },
            welcoming: { color: '#38b2ac', text: 'Welcome!', mouth: 'wide-smile' },
            proud: { color: '#d69e2e', text: 'Proud to share', mouth: 'smile' },
            innovative: { color: '#e53e3e', text: 'Innovation mode', mouth: 'excited' }
        };

        const currentEmotion = emotions[emotion] || emotions.ready;
        
        moodFace.style.background = currentEmotion.color;
        moodText.textContent = currentEmotion.text;
        
        // Animate mood change
        moodFace.style.transform = 'scale(1.1)';
        setTimeout(() => {
            moodFace.style.transform = 'scale(1)';
        }, 300);
    }

    updateCognitiveLoad(complexity) {
        const cognitiveLoad = document.getElementById('cognitiveLoad');
        this.cognitiveLoad = Math.min(complexity, 100);
        cognitiveLoad.style.width = this.cognitiveLoad + '%';
    }

    startNeuralActivity() {
        setInterval(() => {
            this.updateNeuralStats();
        }, 2000);
    }

    updateNeuralStats() {
        const synapseCount = document.getElementById('synapseCount');
        const connectionCount = document.getElementById('connectionCount');
        
        const baseSynapses = 1247;
        const baseConnections = 15892;
        
        const variation = Math.floor(Math.random() * 100) - 50;
        synapseCount.textContent = (baseSynapses + variation).toLocaleString();
        connectionCount.textContent = (baseConnections + variation * 10).toLocaleString();
    }

    createEmotionParticles(type) {
        const particleContainer = document.getElementById('emotionParticles');
        const colors = {
            human: '#4fd1c7',
            ai: '#667eea'
        };

        for (let i = 0; i < 5; i++) {
            const particle = document.createElement('div');
            particle.className = 'emotion-particle';
            particle.style.background = colors[type];
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            
            particleContainer.appendChild(particle);
            
            setTimeout(() => {
                particle.remove();
            }, 3000);
        }
    }

    setupFloatingActions() {
        const actions = document.querySelectorAll('.action-item');
        
        actions.forEach(action => {
            action.addEventListener('click', () => {
                const actionType = action.dataset.action;
                this.handleFloatingAction(actionType);
            });
        });
    }

    async handleFloatingAction(actionType) {
        const responses = {
            voice: "Voice input would be amazing! I'd love to hear your questions spoken. For now, feel free to type them!",
            empathy: "I'm switching to empathy mode - I'll focus on understanding the human aspect of your questions and providing more emotionally aware responses.",
            creative: "Creative mode activated! Let's explore innovative ideas and think outside the box about AI and human collaboration.",
            analytical: "Analytical mode engaged. I'll provide more data-driven, structured responses with detailed analysis."
        };

        const emotions = {
            voice: 'excited',
            empathy: 'welcoming',
            creative: 'innovative',
            analytical: 'confident'
        };

        await this.addAIMessage(responses[actionType], emotions[actionType], 65);
    }

    delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize the portfolio when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const portfolio = new HumanAIPortfolio();
    
    // Add some interactive enhancements
    
    // Panel toggle functionality
    const panelToggle = document.querySelector('.panel-toggle');
    const interactionPanel = document.querySelector('.interaction-panel');
    
    panelToggle?.addEventListener('click', () => {
        interactionPanel.classList.toggle('collapsed');
        panelToggle.style.transform = interactionPanel.classList.contains('collapsed') 
            ? 'rotate(180deg)' : 'rotate(0deg)';
    });
    
    // Add hover effects to messages
    document.addEventListener('mouseover', (e) => {
        if (e.target.closest('.message')) {
            e.target.closest('.message').style.transform = 'translateX(2px)';
        }
    });
    
    document.addEventListener('mouseout', (e) => {
        if (e.target.closest('.message')) {
            e.target.closest('.message').style.transform = 'translateX(0)';
        }
    });
    
    // Add breathing animation to AI avatar
    const aiAvatar = document.querySelector('.ai-avatar');
    if (aiAvatar) {
        setInterval(() => {
            aiAvatar.style.transform = 'scale(1.05)';
            setTimeout(() => {
                aiAvatar.style.transform = 'scale(1)';
            }, 1000);
        }, 3000);
    }
    
    // Simulate real-time neural activity
    setInterval(() => {
        const neuralNodes = document.querySelector('.neural-nodes');
        if (neuralNodes) {
            neuralNodes.style.filter = `hue-rotate(${Math.random() * 30}deg)`;
            setTimeout(() => {
                neuralNodes.style.filter = 'hue-rotate(0deg)';
            }, 500);
        }
    }, 5000);
});

// Add CSS for additional animations
const additionalCSS = `
.conversation-container {
    transition: all 0.3s ease;
}

.interaction-panel.collapsed {
    transform: translateX(100%);
}

.message {
    transition: transform 0.2s ease;
}

.timeline-dot.current {
    background: #48bb78;
    box-shadow: 0 0 10px rgba(72, 187, 120, 0.5);
    animation: pulse 2s infinite;
}

@keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.1); }
}
`;

const style = document.createElement('style');
style.textContent = additionalCSS;
document.head.appendChild(style);