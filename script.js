// ========================================
// James Ren Portfolio - Chat Widget
// ========================================

// Resume data for AI responses
const resumeData = {
    name: "James Ren, PhD",
    title: "Enterprise Software Architect & Engineering Leader",
    summary: "Strategic technical leader with 15+ years architecting IoT platforms at millions-of-device scale. Led platform modernization reducing costs 60% while improving performance 10x. PhD-level AI expertise (BDI multi-agent systems). Experience scaling consumer IoT to 50K+ devices, 45K+ users.",
    
    experience: [
        {
            title: "Tech Lead / Principal Architect",
            company: "American Homes (AMH)",
            dates: "April 2025 – Present",
            description: "Lead enterprise architecture and IoT platform strategy for smart home ecosystem supporting thousands of residential properties."
        },
        {
            title: "Head of Software / Chief Architect",
            company: "Shared Studios",
            dates: "July 2023 – March 2025",
            description: "Directed software strategy and led enterprise platform modernization. Reduced team from 10 devs to 3 senior engineers using AI."
        },
        {
            title: "Senior Software Engineer III",
            company: "American Homes (AMH)",
            dates: "December 2021 – July 2023",
            description: "Built Azure-based cloud-native applications and IoT integrations. Developed SVM algorithms for HVAC fault detection."
        },
        {
            title: "Lead Software Engineer",
            company: "Fiserv",
            dates: "April 2021 – December 2021",
            description: "Led full-stack engineering for Card Services operations in a high-availability fintech environment."
        },
        {
            title: "Lead Software Engineer",
            company: "GENFARE",
            dates: "January 2019 – April 2021",
            description: "Architected next-generation IoT-based fare collection and transit systems."
        }
    ],
    
    skills: [
        "IoT Platform Architecture",
        "Cloud Architecture (AWS, Azure)",
        "Microservices & Event-Driven Systems",
        "Domain-Driven Design",
        "Kubernetes & Containerization",
        "AI/ML (BDI Multi-Agent Systems)",
        "C#/.NET, Java, TypeScript, Python",
        "MQTT, LoRaWAN, BLE",
        "Real-Time Messaging Systems"
    ],
    
    education: {
        degree: "Ph.D., Electrical & Computer Engineering",
        school: "Temple University",
        focus: "Distributed systems, multi-agent AI, autonomous systems",
        dissertation: "Market-Based Multi-Agent System for Power Balance and Restoration in Power Networks"
    },
    
    contact: {
        email: "rqg0717@gmail.com",
        phone: "+1 (215) 327-7439",
        location: "Naperville, IL",
        github: "github.com/rqg0717",
        linkedin: "linkedin.com/in/rqg0717"
    },
    
    achievements: [
        "Scaled IoT to 50K+ devices serving 45K+ residents",
        "Reduced 12-person team to 3 senior engineers using AI",
        "10x performance improvement in platform modernization",
        "Patent-pending smart home wireless node designs",
        "PhD-level AI expertise (BDI multi-agent systems)",
        "Built integrations with Fortune 500 companies"
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
    
    // Add user message
    addMessage(message, 'user');
    input.value = '';
    
    // Show typing indicator
    showTypingIndicator();
    
    // Generate response
    setTimeout(() => {
        removeTypingIndicator();
        const response = generateResponse(message);
        addMessage(response, 'bot');
    }, 1000);
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

// Generate AI response based on resume
function generateResponse(question) {
    const q = question.toLowerCase();
    
    // Check if question is about resume/work/background
    const resumeRelated = isResumeRelated(q);
    
    if (!resumeRelated) {
        return "I'm Dr. James Ren's personal AI agent. I can only answer questions related to his resume, work experience, skills, or background. Please feel free to ask me about his qualifications!";
    }
    
    // About / Summary
    if (q.includes('about') || q.includes('who') || q.includes('tell me about') || q.includes('introduction')) {
        return resumeData.summary;
    }
    
    // Current role / Current position
    if (q.includes('current') || q.includes('now') || q.includes('present')) {
        return `James is currently working as Tech Lead / Principal Architect at American Homes (AMH) since April 2025. He leads enterprise architecture and IoT platform strategy for their smart home ecosystem.`;
    }
    
    // Experience / Work history
    if (q.includes('experience') || q.includes('work') || q.includes('job') || q.includes('career')) {
        let expText = `James has 15+ years of experience. Here's his work history:\n\n`;
        resumeData.experience.forEach((exp, i) => {
            expText += `${i + 1}. **${exp.title}** at ${exp.company} (${exp.dates})\n   ${exp.description}\n\n`;
        });
        return expText;
    }
    
    // Specific company
    if (q.includes('american homes') || q.includes('amh')) {
        return `James worked at American Homes (AMH) twice:\n\n1. **Senior Software Engineer III** (Dec 2021 - Jul 2023): Built Azure-based cloud-native apps, developed HVAC fault detection ML algorithms saving $2M+ annually\n\n2. **Tech Lead / Principal Architect** (Apr 2025 - Present): Leads enterprise IoT platform strategy for 25,000+ properties`;
    }
    
    if (q.includes('shared studios')) {
        return `James was Head of Software / Chief Architect at Shared Studios (Jul 2023 - Mar 2025). Key achievements: Reduced team from 10 devs to 3 senior engineers using AI throughout SDLC, led DDD architecture overhaul achieving 10x performance improvement, built AI-powered voice interfaces, and deployed to 12 global locations for McKinsey/JLL clients.`;
    }
    
    if (q.includes('fiserv')) {
        return `James was a Lead Software Engineer at Fiserv (Apr 2021 - Dec 2021), leading full-stack development for Card Services serving millions of daily transactions.`;
    }
    
    if (q.includes('genfare')) {
        return `James was a Lead Software Engineer at GENFARE (Jan 2019 - Apr 2021), architecting next-generation IoT fare collection systems. He resolved a 15-year serial port bug and increased wireless communication speed by 5x.`;
    }
    
    // Skills
    if (q.includes('skill') || q.includes('technology') || q.includes('tech') || q.includes('expertise')) {
        return `James's key skills include:\n\n• **Architecture**: Event-Driven & Microservices, Domain-Driven Design, Cloud-Native, Serverless\n• **Cloud**: AWS (IoT Core, Lambda), Azure (Functions, AKS, IoT Hub)\n• **Programming**: C#/.NET, Java, TypeScript, Python, Go\n• **IoT**: MQTT, LoRaWAN, BLE, Zigbee, Z-Wave\n• **AI/ML**: BDI Multi-Agent Systems, Computer Vision, LLM integration\n\nWould you like more details on any specific area?`;
    }
    
    // Education
    if (q.includes('education') || q.includes('degree') || q.includes('phd') || q.includes('ph.d')) {
        return `James holds a **Ph.D. in Electrical & Computer Engineering** from Temple University. His dissertation was on "Market-Based Multi-Agent System for Power Balance and Restoration in Power Networks," sponsored by the Office of Naval Research (ONR) and NSF. He focused on distributed systems, multi-agent AI, and autonomous systems.`;
    }
    
    // Achievements
    if (q.includes('achievement') || q.includes('accomplish') || q.includes('achieved') || q.includes('success')) {
        return `Key achievements:\n\n🏆 Scaled IoT to 50K+ devices serving 45K+ residents\n🏆 Reduced 12-person team to 3 senior engineers using AI\n🏆 10x performance improvement in platform modernization\n🏆 Patent-pending smart home wireless node designs\n🏆 Built integrations with Fortune 500 (McKinsey, JLL)\n🏆 PhD-level AI expertise in BDI multi-agent systems`;
    }
    
    // Contact
    if (q.includes('contact') || q.includes('email') || q.includes('reach') || q.includes('phone')) {
        return `You can reach James at:\n\n📧 Email: rqg0717@gmail.com\n📱 Phone: +1 (215) 327-7439\n📍 Location: Naperville, IL\n🔗 GitHub: github.com/rqg0717\n🔗 LinkedIn: linkedin.com/in/rqg0717`;
    }
    
    // Leadership / Management
    if (q.includes('lead') || q.includes('manage') || q.includes('team') || q.includes('manage')) {
        return `James has extensive leadership experience:\n\n• Reduced engineering team from 10 to 3 people while delivering MORE features using AI\n• Led globally distributed teams across US and offshore (India)\n• Directed entire product lifecycles from concept to launch\n• Partnered with Fortune 500 clients (McKinsey, JLL)\n• Executive-level stakeholder alignment`;
    }
    
    // IoT / Smart Home
    if (q.includes('iot') || q.includes('smart home') || q.includes('device') || q.includes('connected')) {
        return `James is an IoT expert:\n\n• Scaled smart home platform to 50K+ connected devices\n• Architected secure device onboarding & authentication\n• Experience with MQTT, LoRaWAN, BLE, Zigbee, Z-Wave\n• Built integrations with SmartRent, Master Lock, Rently\n• Patent-pending wireless smart home node designs`;
    }
    
    // AI / ML
    if (q.includes('ai') || q.includes('machine learning') || q.includes('ml') || q.includes('agent') || q.includes('bdI')) {
        return `James has PhD-level AI expertise:\n\n• Pioneered first-ever BDI (Belief-Desire-Intention) agent platform for ARM Mbed OS - Tier 3 AI\n• Developed SVM algorithms for HVAC fault detection (80% accuracy, $2M+ savings)\n• Built AI-powered voice interfaces using OpenAI Whisper\n• Research on multi-agent systems for autonomous power grids\n• Expert in LLM integration and AI-assisted development`;
    }
    
    // Azure / AWS / Cloud
    if (q.includes('azure') || q.includes('aws') || q.includes('cloud')) {
        return `James is cloud-agnostic with deep expertise in both:\n\n**Azure**: Functions, AKS, Service Bus, IoT Hub, Cosmos DB, Event Hubs, Stream Analytics\n**AWS**: IoT Core, Lambda, SAM, DynamoDB\n\nHearchitected cloud-native platforms using both, focusing on serverless and event-driven architectures.`;
    }
    
    // Salary / Compensation - redirect
    if (q.includes('salary') || q.includes('compensation') || q.includes('pay')) {
        return "I'm not able to share information about salary or compensation. That would be something you'd need to discuss directly with James.";
    }
    
    // Default - ask for clarification
    return `I'd be happy to tell you more about James! You can ask me about:\n\n• His work experience and career history\n• Technical skills and expertise\n• Education and background\n• Key achievements\n• How to contact him\n\nWhat would you like to know?`;
}

// Check if question is resume-related
function isResumeRelated(question) {
    const generalKeywords = [
        'weather', 'news', 'sports', 'politics', 'religion', 'politics',
        'recipe', 'movie', 'music', 'celebrity', 'stock', 'crypto',
        'weather', 'sports', 'game', 'weather'
    ];
    
    const safe = generalKeywords.every(keyword => !question.includes(keyword));
    
    // Also check for explicit "not related" questions
    const notRelated = [
        'what is your name', 'who are you', 'tell me about yourself',
        'what do you do', 'how are you', 'what is the weather'
    ];
    
    // If it matches general non-work questions, be more lenient
    return true; // Allow most questions but filter in generateResponse
}

// Mobile menu toggle
function toggleMobileMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('mobile-active');
}

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    console.log('James Ren Portfolio loaded');
});
