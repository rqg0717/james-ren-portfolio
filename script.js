/* ============================================
   James Ren Portfolio - Interactions
   Motion: Hierarchy reinforcement, interaction feedback
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation scroll effect
    const nav = document.querySelector('.nav');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle - use nav slider
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            document.querySelector(".nav-links").classList.toggle("active"); document.querySelector(".mobile-menu-btn").classList.toggle("active");
            mobileMenuBtn.classList.toggle('active');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const target = document.querySelector(targetId);
            
            if (target) {
                // Close mobile slider if open
                const slider = document.getElementById('nav-slider');
                const overlay = document.getElementById('nav-slider-overlay');
                if (slider) slider.classList.remove('active');
                if (overlay) overlay.classList.remove('active');
                
                // Smooth scroll
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Intersection Observer for scroll animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger animation for child elements
                const children = entry.target.querySelectorAll('.timeline-item, .expertise-category, .stat-card, .achievement-card');
                children.forEach((child, index) => {
                    child.style.animationDelay = `${index * 0.1}s`;
                });
            }
        });
    }, observerOptions);

    // Observe sections
    document.querySelectorAll('.section, .timeline-item, .expertise-category, .about-stats, .achievement-cards').forEach(el => {
        el.classList.add('fade-on-scroll');
        observer.observe(el);
    });

    // Add visible class styles
    const style = document.createElement('style');
    style.textContent = `
        .fade-on-scroll {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
        }
        
        .fade-on-scroll.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        .timeline-item, .expertise-category, .stat-card {
            opacity: 1;
            transform: none;
        }
        
        .mobile-menu-btn.active span:nth-child(1) {
            transform: rotate(45deg) translate(5px, 5px);
        }
        
        .mobile-menu-btn.active span:nth-child(2) {
            opacity: 0;
        }
        
        .mobile-menu-btn.active span:nth-child(3) {
            transform: rotate(-45deg) translate(5px, -5px);
        }
    `;
    document.head.appendChild(style);

    // Parallax effect for hero (subtle)
    const heroSection = document.querySelector('.hero');
    const bgLayer = document.querySelector('.bg-layer');
    
    if (heroSection && bgLayer) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            bgLayer.style.transform = `translateY(${rate}px)`;
        });
    }

    // Button hover effects
    document.querySelectorAll('.btn, .contact-btn').forEach(btn => {
        btn.addEventListener('mouseenter', function(e) {
            // Add ripple effect
            const ripple = document.createElement('span');
            ripple.classList.add('ripple');
            this.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Add ripple styles
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        .btn, .contact-btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.3);
            transform: scale(0);
            animation: ripple-effect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes ripple-effect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(rippleStyle);
});

// ========================================
// James Ren Portfolio - Chat Widget
// ========================================

// Resume data for AI responses
const resumeData = {
    name: "James Ren, PhD",
    title: "Enterprise Software Architect & Engineering Leader",
    summary: "Strategic technical leader with 15+ years architecting IoT platforms at millions-of-device scale. Led platform modernization reducing costs 60% while improving performance 10x. PhD-level AI expertise (BDI multi-agent systems). Experience scaling IoT to 60K+ devices.",
    
    experience: [
        {
            title: "Tech Lead / Principal Architect",
            company: "American Homes (AMH)",
            dates: "April 2025 – Present",
            description: "Lead enterprise architecture and IoT platform strategy for smart home ecosystem supporting 60,000+ properties."
        },
        {
            title: "Head of Software / Chief Architect",
            company: "Shared Studios",
            dates: "July 2023 – March 2025",
            description: "Directed software strategy. Reduced team from 10 devs to 3 senior engineers using AI."
        },
        {
            title: "Senior Software Engineer III",
            company: "American Homes (AMH)",
            dates: "December 2021 – July 2023",
            description: "Built Azure-based cloud-native apps. Developed SVM algorithms for HVAC fault detection."
        },
        {
            title: "Lead Software Engineer",
            company: "Fiserv",
            dates: "April 2021 – December 2021",
            description: "Led full-stack engineering for card services serving millions of daily transactions."
        },
        {
            title: "Lead Software Engineer",
            company: "GENFARE",
            dates: "January 2019 – April 2021",
            description: "Architected next-generation IoT fare collection and transit systems."
        }
    ],
    
    skills: [
        "IoT Platform Architecture",
        "Cloud Architecture (AWS, Azure)",
        "Microservices & Event-Driven Systems",
        "Domain-Driven Design",
        "AI/ML (BDI Multi-Agent Systems)",
        "C#/.NET, Java, TypeScript, Python",
        "MQTT, LoRaWAN, BLE, Zigbee, Z-Wave"
    ],
    
    education: {
        degree: "Ph.D., Electrical & Computer Engineering",
        school: "Temple University",
        focus: "Distributed systems, multi-agent AI, autonomous systems",
        dissertation: "Market-Based Multi-Agent System for Power Balance and Restoration in Power Networks"
    },
    
    achievements: [
        "Scaled IoT to 60K+ properties",
        "Reduced team from 10 to 3 using AI",
        "10x performance improvement",
        "PhD-level AI expertise (BDI multi-agent systems)",
        "$2M+ annual savings from HVAC ML"
    ]
};

// Toggle chat panel
function toggleChat() {
    const panel = document.getElementById('chat-panel');
    panel.classList.toggle('hidden');
}

// Send message
function sendMessage(event) {
    event.preventDefault();
    
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage(message, 'user');
    input.value = '';
    
    showTypingIndicator();
    
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 800);
}

// Add message to chat
function addMessage(text, sender) {
    const messagesContainer = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `chat-message ${sender}`;
    messageDiv.innerHTML = `<p>${text}</p>`;
    messagesContainer.appendChild(messageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Show typing indicator
function showTypingIndicator() {
    const messagesContainer = document.getElementById('chat-messages');
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing';
    typingDiv.innerHTML = '<p>typing...</p>';
    typingDiv.id = 'typing-indicator';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Remove typing indicator
function removeTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) typing.remove();
}

// Generate AI response
function generateResponse(question) {
    const q = question.toLowerCase();
    
    if (q.includes('about') || q.includes('who')) {
        return resumeData.summary;
    }
    
    if (q.includes('current') || q.includes('present')) {
        return `James is currently Tech Lead / Principal Architect at American Homes (AMH), leading enterprise IoT platform strategy for 60,000+ properties.`;
    }
    
    if (q.includes('experience') || q.includes('work') || q.includes('career')) {
        let expText = `James has 15+ years of experience:\n\n`;
        resumeData.experience.forEach((exp, i) => {
            expText += `${i + 1}. <strong>${exp.title}</strong> at ${exp.company} (${exp.dates})\n   ${exp.description}\n\n`;
        });
        return expText;
    }
    
    if (q.includes('skill') || q.includes('tech') || q.includes('expertise')) {
        return `James's key skills:\n\n• <strong>Architecture</strong>: Event-Driven, DDD, Cloud-Native, Serverless\n• <strong>Cloud</strong>: AWS (IoT Core, Lambda), Azure (Functions, AKS, IoT Hub)\n• <strong>Programming</strong>: C#/.NET, Java, TypeScript, Python, Go\n• <strong>IoT</strong>: MQTT, LoRaWAN, BLE, Zigbee, Z-Wave\n• <strong>AI/ML</strong>: BDI Multi-Agent Systems, Computer Vision, LLM`;
    }
    
    if (q.includes('education') || q.includes('degree') || q.includes('phd') || q.includes('temple')) {
        return `James has a <strong>Ph.D. in Electrical & Computer Engineering</strong> from Temple University. His dissertation: "Market-Based Multi-Agent System for Power Balance and Restoration in Power Networks" (sponsored by ONR & NSF).`;
    }
    
    if (q.includes('achievement') || q.includes('accomplish')) {
        return `Key achievements:\n\n🏆 Scaled IoT to 60K+ properties\n🏆 Reduced team from 10 to 3 using AI\n🏆 10x performance improvement\n🏆 $2M+ annual savings from HVAC ML\n🏆 PhD-level AI expertise (BDI multi-agent)`;
    }
    
    if (q.includes('contact') || q.includes('email') || q.includes('reach')) {
        return `Contact James:\n\n📧 Email: rqg0717@gmail.com\n🔗 GitHub: github.com/rqg0717\n🔗 LinkedIn: linkedin.com/in/rqg0717`;
    }
    
    if (q.includes('iot') || q.includes('device') || q.includes('smart home')) {
        return `James is an IoT expert:\n\n• Scaled smart home platform to 60K+ devices\n• Architected secure device onboarding\n• MQTT, LoRaWAN, BLE, Zigbee, Z-Wave\n• Built integrations with Master Lock, SmartRent`;
    }
    
    if (q.includes('ai') || q.includes('machine learning') || q.includes('ml') || q.includes('agent')) {
        return `James has PhD-level AI expertise:\n\n• Pioneered BDI agent platform for ARM Mbed OS\n• Developed SVM for HVAC fault detection (80% accuracy)\n• Built AI voice interfaces with OpenAI Whisper\n• Expert in LLM integration`;
    }
    
    return `Ask me about:\n\n• His experience & career history\n• Technical skills & expertise\n• Education & background\n• Key achievements\n• How to contact him\n\nWhat would you like to know?`;
}

// ========================================
// Mobile Navigation Slider
// ========================================

function toggleNavSlider() {
    const slider = document.getElementById('nav-slider');
    const overlay = document.getElementById('nav-slider-overlay');
    const body = document.body;
    
    slider.classList.toggle('active');
    overlay.classList.toggle('active');
    
    // Prevent body scroll when slider is open
    body.style.overflow = slider.classList.contains('active') ? 'hidden' : '';
}

// Close slider when clicking overlay
document.addEventListener('click', function(e) {
    const slider = document.getElementById('nav-slider');
    const overlay = document.getElementById('nav-slider-overlay');
    
    if (overlay && overlay.classList.contains('active') && e.target === overlay) {
        toggleNavSlider();
    }
});
