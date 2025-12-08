(function() {
    // DOM elements
    const aiToggleBtn = document.getElementById('ai-toggle-btn');
    const aiCloseBtn = document.getElementById('ai-close-btn');
    const aiAssistant = document.getElementById('ai-assistant');
    const aiInput = document.getElementById('ai-input');
    const aiSendBtn = document.getElementById('ai-send-btn');
    const aiMessages = document.getElementById('ai-messages');
    const aiSuggestions = document.querySelectorAll('.ai-suggestion-chip');
    
    // Add voice input button
    const aiVoiceBtn = document.createElement('button');
    aiVoiceBtn.id = 'ai-voice-btn';
    aiVoiceBtn.innerHTML = '<i class="ri-mic-line"></i>';
    aiVoiceBtn.title = "Voice Input";
    document.querySelector('.ai-input-container').insertBefore(aiVoiceBtn, aiSendBtn);
    
    // Add clear chat button in header
    const aiClearBtn = document.createElement('button');
    aiClearBtn.className = 'ai-action-btn';
    aiClearBtn.innerHTML = '<i class="ri-delete-bin-line"></i>';
    aiClearBtn.title = "Clear Chat";
    document.querySelector('.ai-assistant-header').insertBefore(aiClearBtn, aiCloseBtn);

    // Add conversation context and memory
    let conversationHistory = [];
    const maxHistoryLength = 6; // Keep last 6 exchanges for context

    // AI responses database - Shorter, more concise responses
    const responses = {
        greeting: [
            "Hello! How can I help you with PrisolTech's services today?",
            "Hi there! Welcome to PrisolTech. How may I assist you?",
            "Welcome! I'm your PrisolTech assistant. What can I help you with?"
        ],
        services: [
            "We offer: Web Development, UI/UX Design, Cloud Solutions, Mobile Apps, Database Architecture, Security, DevOps and IT Consulting. Which interests you?",
            "PrisolTech specializes in full-stack development, UI/UX design, and digital transformation solutions. Need details on any specific service?",
            "Our services range from web/mobile development to cloud solutions and IT consulting. What are you looking for specifically?"
        ],
        contact: [
            "Email: grow@prisoltech.com | Call: +91 8825756388 | Location: Karur, India. How would you like to connect?",
            "You can reach us via email (grow@prisoltech.com) or phone (+91 8825756388). Our team typically responds within 24 hours.",
            "Contact our team at grow@prisoltech.com or +91 8825756388. We're based in Karur and work with clients globally."
        ],
        about: [
            "PrisolTech is a team of developers and designers with 2+ years of experience creating exceptional digital experiences using modern technologies.",
            "We transform ideas into elegant digital solutions by combining technical expertise with creative design across various platforms.",
            "We're tech enthusiasts specializing in web technologies and best practices to deliver high-performance, scalable digital solutions."
        ],
        projects: [
            "Our work includes e-commerce platforms, portfolio websites, and company landing pages. Check the Projects section for examples!",
            "We've delivered e-commerce solutions, creative portfolios, and business websites that focus on performance and user experience.",
            "Our portfolio showcases custom web solutions for various clients. Each project demonstrates our commitment to quality and innovation."
        ],
        pricing: [
            "Our pricing is customized based on project requirements, scope, and timeline. Would you like to discuss your specific project?",
            "We offer transparent pricing based on project complexity. For an estimate, please share your project details with us.",
            "We provide tailored solutions with fair pricing instead of fixed packages. Let's discuss your budget and requirements."
        ],
        technology: [
            "We use HTML5, CSS3, JavaScript, React, Node.js, and MongoDB, staying current with the latest web development advances.",
            "Our stack includes MERN (MongoDB, Express, React, Node.js) with expertise in responsive design and progressive web apps.",
            "We're proficient in frontend and backend technologies, choosing the right tools based on your specific project needs."
        ],
        process: [
            "Our process: Discovery → Design → Development → Testing → Deployment → Support. What stage is your project in?",
            "We follow an agile methodology with regular client touchpoints throughout planning, design, development, and launch.",
            "Our client-centric approach focuses on clear communication and iterative development from concept to completion."
        ],
        timeline: [
            "Simple websites: 2-4 weeks | Complex apps: 2-6 months. We'll provide a specific timeline after discussing requirements.",
            "Timelines vary by scope: basic websites (3-5 weeks), e-commerce (6-8 weeks), custom applications (8-16 weeks).",
            "We establish realistic milestones based on your business priorities. When are you looking to launch?"
        ],
        team: [
            "Our team includes developers, designers, project managers, and QA specialists who collaborate to deliver exceptional solutions.",
            "PrisolTech brings together diverse skills in development, design, and project management to handle all aspects of your project.",
            "Our professionals have expertise in full-stack development, UI/UX design, and technical project management."
        ],
        support: [
            "We provide ongoing maintenance, updates, security monitoring, and technical assistance after project completion.",
            "Our support packages range from basic maintenance to comprehensive managed services tailored to your needs.",
            "We build long-term client relationships with continued technical support to keep your digital assets performing optimally."
        ],
        default: [
            "I'm not sure about that. Can I help with our services, projects, or contact information instead?",
            "I don't have specific details on that. Would you like to know about our development services or team?",
            "For more information on that topic, please contact us at grow@prisoltech.com or call +91 8825756388."
        ]
    };

    // Helper functions
    function getRandomResponse(type, context = '') {
        const responseArray = responses[type] || responses.default;
        return responseArray[Math.floor(Math.random() * responseArray.length)];
    }

    function addMessage(message, isOutgoing = false, shouldSave = true) {
        const messageDiv = document.createElement('div');
        messageDiv.className = isOutgoing ? 'ai-message ai-outgoing' : 'ai-message ai-incoming';
        
        // Format links in messages
        const formattedMessage = formatLinks(message);
        
        // Add feedback buttons for AI responses
        const feedbackHtml = !isOutgoing ? `
            <div class="ai-message-feedback">
                <button class="ai-feedback-btn" data-value="positive" title="This was helpful">
                    <i class="ri-thumb-up-line"></i>
                </button>
                <button class="ai-feedback-btn" data-value="negative" title="This wasn't helpful">
                    <i class="ri-thumb-down-line"></i>
                </button>
            </div>
        ` : '';
        
        // Add message actions (speech, copy)
        const actionsHtml = !isOutgoing ? `
            <div class="ai-message-actions">
                <button class="ai-speech-btn" title="Listen to response">
                    <i class="ri-volume-up-line"></i>
                </button>
                <button class="ai-copy-btn" title="Copy response">
                    <i class="ri-file-copy-line"></i>
                </button>
            </div>
        ` : '';
        
        messageDiv.innerHTML = `
            <div class="ai-message-content">
                <p>${formattedMessage.replace(/\n/g, '<br>')}</p>
                ${feedbackHtml}
                ${actionsHtml}
            </div>
        `;
        
        aiMessages.appendChild(messageDiv);
        aiMessages.scrollTop = aiMessages.scrollHeight;
        
        // Activate speech for this message if global speech is enabled
        if (!isOutgoing && isSpeechEnabled) {
            const speechBtn = messageDiv.querySelector('.ai-speech-btn');
            if (speechBtn) {
                setTimeout(() => speakText(message, speechBtn), 500);
            }
        }
        
        // Add speech functionality for AI responses
        if (!isOutgoing) {
            const speechBtn = messageDiv.querySelector('.ai-speech-btn');
            if (speechBtn) {
                speechBtn.addEventListener('click', () => {
                    speakText(message, speechBtn);
                });
            }
            
            // Add feedback functionality
            const feedbackBtns = messageDiv.querySelectorAll('.ai-feedback-btn');
            feedbackBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    // Mark all buttons in this message as inactive
                    feedbackBtns.forEach(b => b.classList.remove('active'));
                    // Mark this button as active
                    btn.classList.add('active');
                    
                    // Record feedback
                    const feedback = btn.getAttribute('data-value');
                    console.log(`User feedback: ${feedback} for message: "${message.substring(0, 30)}..."`);
                    
                    // Show thank you message
                    const feedbackContainer = btn.parentElement;
                    feedbackContainer.innerHTML = '<span class="feedback-thanks">Thank you for your feedback!</span>';
                });
            });
            
            // Add copy functionality for AI responses
            const copyBtn = messageDiv.querySelector('.ai-copy-btn');
            if (copyBtn) {
                copyBtn.addEventListener('click', () => {
                    const textToCopy = message;
                    navigator.clipboard.writeText(textToCopy)
                        .then(() => {
                            copyBtn.innerHTML = '<i class="ri-check-line"></i>';
                            setTimeout(() => {
                                copyBtn.innerHTML = '<i class="ri-file-copy-line"></i>';
                            }, 2000);
                        })
                        .catch(err => {
                            console.error('Failed to copy: ', err);
                        });
                });
            }
        }
        
        // Store conversation history for context
        if (shouldSave) {
            conversationHistory.push({
                role: isOutgoing ? 'user' : 'assistant',
                content: message
            });
            
            // Keep history at a reasonable size
            if (conversationHistory.length > maxHistoryLength) {
                conversationHistory.shift();
            }
            
            // Save to session storage
            saveChatHistory();
        }
    }

    function formatLinks(text) {
        // Simple regex to convert URLs to clickable links
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.replace(urlRegex, url => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
        });
    }

    function getConversationContext() {
        // Get the last few exchanges as context
        return conversationHistory.slice(-4);
    }

    function processInput(input) {
        const text = input.toLowerCase().trim();
        let responseType = 'default';
        
        // Enhanced FAQ detection
        for (const [pattern, category] of Object.entries(faqPatterns)) {
            if (text.includes(pattern)) {
                responseType = category;
                break;
            }
        }
        
        // Check for site navigation requests
        if (text.includes('home') && text.includes('section')) {
            scrollToSection('home');
            return "I've scrolled to the Home section for you.";
        } else if (text.includes('about') && (text.includes('section') || text.includes('scroll'))) {
            scrollToSection('about');
            return "Here's the About section.";
        } else if (text.includes('projects') && (text.includes('section') || text.includes('scroll'))) {
            scrollToSection('projects');
            return "I've navigated to the Projects section for you.";
        } else if (text.includes('contact') && (text.includes('section') || text.includes('scroll'))) {
            scrollToSection('contact');
            return "Here's our Contact information.";
        }
        
        // Check for file upload requests
        if (text.includes('upload') || text.includes('send file') || text.includes('share file')) {
            return "To share project files with us, please email them to grow@prisoltech.com or use our contact form. For large files, we recommend using a file sharing service like Google Drive or Dropbox.";
        }
        
        // Enhanced keyword matching with more categories
        if (text.includes('hello') || text.includes('hi') || text.includes('hey')) {
            responseType = 'greeting';
        } else if (text.includes('service') || text.includes('offer') || text.includes('provide')) {
            responseType = 'services';
        } else if (text.includes('contact') || text.includes('email') || text.includes('phone')) {
            responseType = 'contact';
        } else if (text.includes('about') || text.includes('who') || text.includes('company')) {
            responseType = 'about';
        } else if (text.includes('project') || text.includes('work') || text.includes('portfolio')) {
            responseType = 'projects';
        } else if (text.includes('price') || text.includes('cost') || text.includes('budget')) {
            responseType = 'pricing';
        } else if (text.includes('tech') || text.includes('stack') || text.includes('language')) {
            responseType = 'technology';
        } else if (text.includes('process') || text.includes('methodology') || text.includes('approach')) {
            responseType = 'process';
        } else if (text.includes('time') || text.includes('duration') || text.includes('deadline')) {
            responseType = 'timeline';
        } else if (text.includes('team') || text.includes('staff') || text.includes('people')) {
            responseType = 'team';
        } else if (text.includes('support') || text.includes('maintenance') || text.includes('update')) {
            responseType = 'support';
        }
        
        // Get context-aware response
        const context = getConversationContext();
        return getRandomResponse(responseType, context);
    }
    
    function scrollToSection(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({ behavior: 'smooth' });
            return true;
        }
        return false;
    }

    // Voice recognition setup
    let recognition;
    try {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            recognition = new SpeechRecognition();
            recognition.continuous = false;
            recognition.lang = 'en-US';
            recognition.interimResults = false;
            recognition.maxAlternatives = 1;
            
            recognition.onresult = function(event) {
                const speechResult = event.results[0][0].transcript;
                aiInput.value = speechResult;
                aiVoiceBtn.classList.remove('listening');
                aiVoiceBtn.innerHTML = '<i class="ri-mic-line"></i>';
                handleSend();
            };
            
            recognition.onerror = function(event) {
                console.error('Speech recognition error', event.error);
                aiVoiceBtn.classList.remove('listening');
                aiVoiceBtn.innerHTML = '<i class="ri-mic-line"></i>';
            };
            
            recognition.onend = function() {
                aiVoiceBtn.classList.remove('listening');
                aiVoiceBtn.innerHTML = '<i class="ri-mic-line"></i>';
            };
        }
    } catch (e) {
        console.log('Speech recognition not supported');
    }

    // Text to speech setup
    let speechSynthesis = window.speechSynthesis;
    let isSpeechEnabled = false;
    
    // Add speech toggle button in header
    const aiSpeechBtn = document.createElement('button');
    aiSpeechBtn.className = 'ai-action-btn';
    aiSpeechBtn.innerHTML = '<i class="ri-volume-mute-line"></i>';
    aiSpeechBtn.title = "Toggle Speech";
    document.querySelector('.ai-assistant-header').insertBefore(aiSpeechBtn, aiClearBtn);
    
    // Add theme toggle button
    const aiThemeBtn = document.createElement('button');
    aiThemeBtn.className = 'ai-action-btn';
    aiThemeBtn.innerHTML = '<i class="ri-contrast-2-line"></i>';
    aiThemeBtn.title = "Toggle Theme";
    document.querySelector('.ai-assistant-header').insertBefore(aiThemeBtn, aiSpeechBtn);
    
    // FAQ detection patterns
    const faqPatterns = {
        "how long": "timeline",
        "how much": "pricing",
        "pricing": "pricing",
        "cost": "pricing",
        "what services": "services",
        "which services": "services",
        "your process": "process",
        "how do you": "process",
        "contact details": "contact",
        "get in touch": "contact",
        "reach you": "contact"
    };
    
    // Load previous chat history from session storage
    function loadChatHistory() {
        try {
            const savedHistory = sessionStorage.getItem('prisoltech_chat_history');
            if (savedHistory) {
                const history = JSON.parse(savedHistory);
                // Clear initial greeting if we're restoring history
                if (history.length > 0 && aiMessages.children.length > 0) {
                    aiMessages.innerHTML = '';
                }
                
                // Restore messages
                history.forEach(item => {
                    addMessage(item.content, item.role === 'user', false);
                });
                
                conversationHistory = history;
                return true;
            }
        } catch (error) {
            console.error('Error loading chat history:', error);
        }
        return false;
    }
    
    // Save chat history to session storage
    function saveChatHistory() {
        try {
            sessionStorage.setItem('prisoltech_chat_history', JSON.stringify(conversationHistory));
        } catch (error) {
            console.error('Error saving chat history:', error);
        }
    }

    // Event listeners
    aiToggleBtn.addEventListener('click', () => {
        aiAssistant.classList.toggle('active');
        
        // Track engagement analytics
        if (aiAssistant.classList.contains('active')) {
            try {
                console.log('AI Assistant opened');
                // You could add actual analytics tracking here
            } catch (error) {
                console.error('Analytics error:', error);
            }
        }
    });

    aiCloseBtn.addEventListener('click', () => {
        aiAssistant.classList.remove('active');
    });
    
    // Clear chat functionality
    aiClearBtn.addEventListener('click', () => {
        // Keep only the initial greeting message
        while (aiMessages.children.length > 1) {
            aiMessages.removeChild(aiMessages.lastChild);
        }
        conversationHistory = [];
        
        // Add a confirmation message
        addMessage("Chat history cleared. How else can I help you?");
    });
    
    // Voice input functionality
    if (recognition) {
        aiVoiceBtn.addEventListener('click', () => {
            if (aiVoiceBtn.classList.contains('listening')) {
                recognition.stop();
                aiVoiceBtn.classList.remove('listening');
                aiVoiceBtn.innerHTML = '<i class="ri-mic-line"></i>';
            } else {
                recognition.start();
                aiVoiceBtn.classList.add('listening');
                aiVoiceBtn.innerHTML = '<i class="ri-mic-fill"></i>';
                
                // Add visual feedback
                addMessage("Listening...", false);
                setTimeout(() => {
                    // Remove the listening message if it's still the last message
                    const lastMessage = aiMessages.lastChild;
                    if (lastMessage && lastMessage.querySelector('p').textContent === "Listening...") {
                        aiMessages.removeChild(lastMessage);
                    }
                }, 5000);
            }
        });
    } else {
        aiVoiceBtn.style.display = 'none';
    }

    aiSendBtn.addEventListener('click', handleSend);

    aiInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleSend();
        }
    });

    // Add smart suggestions based on user's last message
    function updateSmartSuggestions(userMessage) {
        const suggestionsContainer = document.querySelector('.ai-suggestions');
        
        // Clear existing suggestions
        if (suggestionsContainer) {
            suggestionsContainer.innerHTML = '';
            
            // Generate new suggestions based on user's message
            let newSuggestions = [];
            
            if (userMessage.toLowerCase().includes('service')) {
                newSuggestions = ["Web Development", "UI/UX Design", "Mobile Apps", "Cloud Solutions"];
            } else if (userMessage.toLowerCase().includes('contact')) {
                newSuggestions = ["Email", "Phone", "Office Location", "Schedule Call"];
            } else if (userMessage.toLowerCase().includes('project') || userMessage.toLowerCase().includes('portfolio')) {
                newSuggestions = ["E-commerce", "Portfolio Site", "Landing Page", "Custom App"];
            } else {
                // Default suggestions
                newSuggestions = ["Services", "Contact Us", "Our Projects", "Get a Quote"];
            }
            
            // Add new suggestion chips
            newSuggestions.forEach(text => {
                const chip = document.createElement('button');
                chip.className = 'ai-suggestion-chip';
                chip.textContent = text;
                chip.addEventListener('click', () => {
                    addMessage(text, true);
                    
                    // Add visual feedback
                    chip.style.backgroundColor = 'rgba(255, 51, 102, 0.2)';
                    setTimeout(() => {
                        chip.style.backgroundColor = '';
                    }, 300);
                    
                    showTypingIndicator();
                    
                    setTimeout(() => {
                        removeTypingIndicator();
                        const response = processInput(text);
                        addMessage(response);
                        updateSmartSuggestions(text);
                    }, 1200);
                });
                
                // Add tooltip to suggestion chips
                chip.title = `Ask about ${text}`;
                
                suggestionsContainer.appendChild(chip);
            });
        }
    }

    // Enhanced suggestion chip interactivity
    aiSuggestions.forEach(suggestion => {
        suggestion.addEventListener('click', () => {
            const text = suggestion.textContent;
            addMessage(text, true);
            
            // Add visual feedback
            suggestion.style.backgroundColor = 'rgba(255, 51, 102, 0.2)';
            setTimeout(() => {
                suggestion.style.backgroundColor = '';
            }, 300);
            
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                const response = processInput(text);
                addMessage(response);
                updateSmartSuggestions(text);
            }, 1200);
        });
    });

    function showTypingIndicator() {
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.className = 'ai-message ai-incoming typing-indicator';
        typingIndicator.innerHTML = '<div class="ai-message-content"><p>Typing<span class="dot">.</span><span class="dot">.</span><span class="dot">.</span></p></div>';
        aiMessages.appendChild(typingIndicator);
        aiMessages.scrollTop = aiMessages.scrollHeight;
    }
    
    function removeTypingIndicator() {
        // Remove typing indicator
        const typingIndicator = document.querySelector('.typing-indicator');
        if (typingIndicator) {
            aiMessages.removeChild(typingIndicator);
        }
    }

    function handleSend() {
        const message = aiInput.value.trim();
        if (message) {
            addMessage(message, true);
            aiInput.value = '';
            
            showTypingIndicator();
            
            setTimeout(() => {
                removeTypingIndicator();
                const response = processInput(message);
                addMessage(response);
                updateSmartSuggestions(message);
            }, 1200);
        }
    }

    // Enhanced typing animation for the initial message
    setTimeout(() => {
        const firstMessage = document.querySelector('.ai-message.ai-incoming .ai-message-content p');
        if (firstMessage) {
            const text = firstMessage.textContent;
            firstMessage.textContent = '';
            let i = 0;
            
            function typeWriter() {
                if (i < text.length) {
                    firstMessage.textContent += text.charAt(i);
                    i++;
                    setTimeout(typeWriter, 20 + Math.random() * 20); // Variable typing speed for realism
                }
            }
            
            typeWriter();
        }
    }, 500);

    // Add animated dots to typing indicator
    const style = document.createElement('style');
    style.textContent = `
    .typing-indicator .dot {
        animation: typingDot 1.4s infinite;
        opacity: 0.7;
    }
    .typing-indicator .dot:nth-child(2) {
        animation-delay: 0.2s;
    }
    .typing-indicator .dot:nth-child(3) {
        animation-delay: 0.4s;
    }
    @keyframes typingDot {
        0%, 100% { opacity: 0.7; }
        50% { opacity: 0.2; }
    }
    
    #ai-voice-btn {
        width: 38px;
        height: 38px;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.05);
        border: 1px solid rgba(255, 255, 255, 0.1);
        color: white;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
    }
    
    #ai-voice-btn:hover {
        background: rgba(255, 255, 255, 0.1);
    }
    
    #ai-voice-btn.listening {
        background: var(--gradient);
        animation: pulseAnim 1.5s infinite;
    }
    
    @keyframes pulseAnim {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.05); }
    }
    
    .ai-message-actions {
        display: flex;
        justify-content: flex-end;
        margin-top: 8px;
        opacity: 0;
        transition: opacity 0.2s ease;
    }
    
    .ai-message-content:hover .ai-message-actions {
        opacity: 1;
    }
    
    .ai-copy-btn {
        background: none;
        border: none;
        color: rgba(255,255,255,0.5);
        cursor: pointer;
        padding: 2px 5px;
        font-size: 14px;
        transition: all 0.2s ease;
    }
    
    .ai-copy-btn:hover {
        color: var(--primary);
    }
    
    .ai-action-btn {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        border: none;
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
        transition: all 0.3s ease;
        margin-right: 8px;
    }
    
    .ai-action-btn:hover {
        background: rgba(255, 51, 102, 0.2);
    }
    `;
    document.head.appendChild(style);

    // Speech toggle functionality
    aiSpeechBtn.addEventListener('click', () => {
        isSpeechEnabled = !isSpeechEnabled;
        aiSpeechBtn.innerHTML = isSpeechEnabled 
            ? '<i class="ri-volume-up-line"></i>' 
            : '<i class="ri-volume-mute-line"></i>';
        
        aiSpeechBtn.title = isSpeechEnabled ? "Mute Speech" : "Enable Speech";
        
        // Announce status change
        if (isSpeechEnabled) {
            speakText("Speech output enabled", null);
        }
    });
    
    // Theme toggle functionality
    let isDarkTheme = true; // Default is dark
    aiThemeBtn.addEventListener('click', () => {
        isDarkTheme = !isDarkTheme;
        aiAssistant.classList.toggle('light-theme');
        aiThemeBtn.innerHTML = isDarkTheme 
            ? '<i class="ri-contrast-2-line"></i>' 
            : '<i class="ri-sun-line"></i>';
        
        // Dynamically create/update theme styles
        let themeStyle = document.getElementById('ai-theme-style');
        if (!themeStyle) {
            themeStyle = document.createElement('style');
            themeStyle.id = 'ai-theme-style';
            document.head.appendChild(themeStyle);
        }
        
        themeStyle.textContent = isDarkTheme ? '' : `
            .ai-assistant-container {
                background: rgba(245, 245, 250, 0.95);
                color: #333;
                border-color: rgba(0, 0, 0, 0.1);
            }
            .ai-assistant-header {
                background: rgba(0, 0, 0, 0.03);
                border-color: rgba(0, 0, 0, 0.1);
            }
            .ai-assistant-title {
                color: #333;
            }
            .ai-message.ai-incoming .ai-message-content {
                background: rgba(0, 0, 0, 0.05);
                border-color: rgba(0, 0, 0, 0.1);
                color: #333;
            }
            #ai-input {
                background: rgba(0, 0, 0, 0.05);
                border-color: rgba(0, 0, 0, 0.1);
                color: #333;
            }
            .ai-suggestion-chip {
                background: rgba(0, 0, 0, 0.05);
                border-color: rgba(0, 0, 0, 0.1);
                color: #333;
            }
            .ai-action-btn, .ai-close-btn, #ai-voice-btn {
                background: rgba(0, 0, 0, 0.05);
                color: #333;
            }
        `;
    });
    
    // Add keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        // Only process shortcuts when assistant is active
        if (aiAssistant.classList.contains('active')) {
            // Ctrl+Enter to send message
            if (e.key === 'Enter' && e.ctrlKey) {
                handleSend();
            }
            // Esc to close assistant
            else if (e.key === 'Escape') {
                aiAssistant.classList.remove('active');
            }
            // S key for speech toggle
            else if (e.key === 's' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                aiSpeechBtn.click();
            }
        }
    });

    // Initial setup
    // Try to load previous chat history
    const historyLoaded = loadChatHistory();
    
    // If no history was loaded, add initial greeting
    if (!historyLoaded && aiMessages.children.length === 0) {
        addMessage("Hi there! 👋 I'm your PrisolTech assistant. How can I help you today?", false);
    }
    
    // Add style for new elements
    const extraStyles = document.createElement('style');
    extraStyles.textContent = `
        .ai-action-btn, .ai-close-btn {
            margin-left: 8px;
        }
        
        .ai-message-feedback {
            display: flex;
            gap: 8px;
            margin-top: 8px;
        }
        
        .ai-feedback-btn {
            background: none;
            border: none;
            color: rgba(255,255,255,0.4);
            cursor: pointer;
            padding: 2px 5px;
            font-size: 14px;
            border-radius: 4px;
            transition: all 0.2s ease;
        }
        
        .ai-feedback-btn:hover {
            background: rgba(255,255,255,0.1);
            color: rgba(255,255,255,0.7);
        }
        
        .ai-feedback-btn.active {
            color: var(--primary);
        }
        
        .ai-speech-btn {
            background: none;
            border: none;
            color: rgba(255,255,255,0.5);
            cursor: pointer;
            padding: 2px 5px;
            font-size: 14px;
            transition: all 0.2s ease;
            margin-right: 5px;
        }
        
        .ai-speech-btn:hover {
            color: var(--accent);
        }
        
        .feedback-thanks {
            font-size: 12px;
            color: var(--accent);
            font-style: italic;
        }
        
        .ai-message-content p a {
            color: var(--accent);
            text-decoration: none;
            border-bottom: 1px dashed var(--accent);
        }
        
        .ai-message-content p a:hover {
            border-bottom-style: solid;
        }
        
        .ai-spin {
            animation: ai-spin 1s linear infinite;
        }
        
        @keyframes ai-spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        
        /* Add keyboard shortcut hints */
        .ai-keyboard-shortcuts {
            position: absolute;
            bottom: 10px;
            right: 10px;
            font-size: 11px;
            color: rgba(255,255,255,0.4);
            pointer-events: none;
        }
        
        .ai-keyboard-shortcuts kbd {
            background: rgba(255,255,255,0.1);
            padding: 1px 4px;
            border-radius: 3px;
            font-family: monospace;
        }
    `;
    document.head.appendChild(extraStyles);
    
    // Add keyboard shortcuts info
    // const keyboardShortcuts = document.createElement('div');
    // keyboardShortcuts.className = 'ai-keyboard-shortcuts';
    // keyboardShortcuts.innerHTML = 'Shortcuts: <kbd>Enter</kbd> Send, <kbd>Esc</kbd> Close, <kbd>Ctrl+S</kbd> Toggle Speech';
    // document.querySelector('.ai-assistant-body').appendChild(keyboardShortcuts);
})();
