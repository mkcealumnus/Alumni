document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const progress = document.querySelector('.nav-progress');
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const goToTopBtn = document.getElementById('go-to-top');
    const aiAssistantBtn = document.getElementById('ai-toggle-btn');

    // Show/hide go-to-top button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            goToTopBtn.classList.add('visible');
        } else {
            goToTopBtn.classList.remove('visible');
        }
    });

    // Ensure go-to-top button is positioned correctly relative to AI assistant
    const repositionGoToTop = () => {
        const aiRect = aiAssistantBtn.getBoundingClientRect();
        // Only update positioning if needed
        if (window.innerWidth <= 480) {
            goToTopBtn.style.bottom = '70px';
        } else if (window.innerWidth <= 768) {
            goToTopBtn.style.bottom = '80px';
        } else {
            goToTopBtn.style.bottom = '100px';
        }
    };

    // Initial positioning
    window.addEventListener('load', repositionGoToTop);
    window.addEventListener('resize', repositionGoToTop);

    // Scroll to top when button is clicked
    goToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Scroll Progress
    // window.addEventListener('scroll', () => {
    //     const scrollPercent = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    //     progress.style.width = `${scrollPercent}%`;
    // });

    // Mobile Menu Toggle
    menuToggle?.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Add hover effect to nav items
    const navItems = document.querySelectorAll('.nav-links a');
    navItems.forEach(item => {
        item.addEventListener('mouseenter', (e) => {
            const { left, top, width, height } = item.getBoundingClientRect();
            const x = (e.clientX - left) / width;
            const y = (e.clientY - top) / height;
            
            item.style.transform = `
                perspective(1000px)
                rotateX(${(y - 0.5) * 10}deg)
                rotateY(${(x - 0.5) * 10}deg)
                translateZ(10px)
            `;
        });

        item.addEventListener('mouseleave', () => {
            item.style.transform = 'none';
        });
    });

    // Add magnetic effect to logo
    const logo = document.querySelector('.logo');
    document.addEventListener('mousemove', (e) => {
        const { left, top, width, height } = logo.getBoundingClientRect();
        const x = e.clientX - (left + width / 2);
        const y = e.clientY - (top + height / 2);
        const distance = Math.sqrt(x * x + y * y);
        
        if (distance < 100) {
            logo.style.transform = `
                translate(${x * 0.2}px, ${y * 0.2}px)
                scale(1.1)
            `;
        } else {
            logo.style.transform = 'none';
        }
    });

    // Create particle effect behind navbar
    const createParticle = (x, y) => {
        const particle = document.createElement('div');
        particle.className = 'nav-particle';
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        document.body.appendChild(particle);
        
        setTimeout(() => particle.remove(), 1000);
    };

    document.querySelector('.navbar').addEventListener('mousemove', (e) => {
        if (Math.random() > 0.9) {
            createParticle(e.clientX, e.clientY);
        }
    });

    // Add holographic glow effect
    const initHolographicEffect = () => {
        const navbar = document.querySelector('.navbar');
        const glow = document.querySelector('.nav-glow');
        
        navbar.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = navbar.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            
            glow.style.opacity = '1';
            glow.style.left = `${x - 50}px`;
            glow.style.top = `${y - 50}px`;
            
            // Create ripple effect
            if (Math.random() > 0.85) {
                createRipple(x, y);
            }
        });
        
        navbar.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    };

    // Create ripple effect
    const createRipple = (x, y) => {
        const navbar = document.querySelector('.navbar');
        const ripple = document.createElement('div');
        ripple.className = 'nav-ripple';
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        navbar.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 1000);
    };

    // Combined nav and section effects
    const initEffects = () => {
        const navLinks = document.querySelectorAll('.nav-links a');
        const sections = document.querySelectorAll('section[id]');
        
        // Single scroll event listener
        window.addEventListener('scroll', () => {
            // Update nav background
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(10, 10, 18, 0.95)';
            } else {
                navbar.style.background = 'rgba(10, 10, 18, 0.8)';
            }
            
            // Update active section
            const scrollY = window.scrollY + window.innerHeight / 2;
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 100;
                const sectionBottom = sectionTop + section.offsetHeight;
                const sectionId = section.getAttribute('id');
                
                if (scrollY >= sectionTop && scrollY < sectionBottom) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === `#${sectionId}`) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        });
        
        // Smooth scroll
        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetId = link.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        });
    };

    // Initialize all effects
    initEffects();
    initHolographicEffect();
    
    // Form submission handler
    const form = document.querySelector('.contact-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // Add your form submission logic here
        });
    }

    // Add section reveal animation
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        threshold: 0.15,
        rootMargin: '-50px'
    });

    document.querySelectorAll('section').forEach(section => {
        section.classList.add('visible'); // Make sections visible by default
        sectionObserver.observe(section);
    });

    // Initialize effects
    initHolographicEffect();
    initEffects();

    // Section reveal on scroll
    const revealSections = () => {
        const sections = document.querySelectorAll('.section-reveal');
        
        sections.forEach(section => {
            const observer = new IntersectionObserver(entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.style.animation = 'sectionReveal 0.8s ease forwards';
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.2 });
            
            observer.observe(section);
        });
    };

    // Footer glow effect
    const initFooterGlow = () => {
        const footer = document.querySelector('.footer');
        const glow = document.querySelector('.footer-glow');
        
        footer.addEventListener('mousemove', (e) => {
            const { left, top, width, height } = footer.getBoundingClientRect();
            const x = e.clientX - left;
            const y = e.clientY - top;
            
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
        });
    };

    // Initialize new effects
    revealSections();
    initFooterGlow();
    
    // Update particles configuration
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 50,
                density: {
                    enable: true,
                    value_area: 800
                }
            },
            opacity: {
                value: 0.3,
            }
        }
    });

    // Optimize particle animations
    const particleSections = document.querySelectorAll('.particles-section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const canvas = entry.target.querySelector('canvas');
            if (canvas) {
                if (entry.isIntersecting) {
                    canvas.style.opacity = '1';
                    canvas.style.visibility = 'visible';
                } else {
                    canvas.style.opacity = '0';
                    canvas.style.visibility = 'hidden';
                }
            }
        });
    }, { threshold: 0.1 });

    particleSections.forEach(section => observer.observe(section));
});

// Remove all previous testimonial code and use this simplified version
function initTestimonials() {
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.nav-dot');
    let currentIndex = 0;

    // Show specific testimonial
    function showTestimonial(index) {
        testimonials.forEach(card => card.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonials[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Add click events to dots
    dots.forEach((dot, idx) => {
        dot.addEventListener('click', () => {
            currentIndex = idx;
            showTestimonial(currentIndex);
        });
    });

    // Auto advance
    setInterval(() => {
        currentIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(currentIndex);
    }, 5000);

    // Show first testimonial initially
    showTestimonial(0);
}

// Initialize testimonials when DOM is loaded
document.addEventListener('DOMContentLoaded', initTestimonials);

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', () => {
    // Get all navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Track last clicked section for reverse navigation
    let lastClickedSection = '';
    let lastScrollPos = window.pageYOffset;

    // Add click event listeners to nav links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                // Store current section before scrolling
                lastClickedSection = targetId;
                
                // Smooth scroll to target
                targetSection.scrollIntoView({
                    behavior: 'smooth'
                });
                
                // Update active state
                navLinks.forEach(link => link.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Handle scroll events for reverse navigation
    window.addEventListener('scroll', () => {
        const currentScrollPos = window.pageYOffset;
        const sections = document.querySelectorAll('section');
        
        // Determine scroll direction
        const isScrollingUp = currentScrollPos < lastScrollPos;
        
        // Find the current visible section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            
            if (currentScrollPos >= sectionTop - 100 && 
                currentScrollPos < sectionTop + sectionHeight) {
                const currentId = section.getAttribute('id');
                
                // Update navigation active state
                navLinks.forEach(link => {
                    const linkHref = link.getAttribute('href').substring(1);
                    if (linkHref === currentId) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
        
        lastScrollPos = currentScrollPos;
    });

    // Add smooth scroll behavior to the entire document
    document.documentElement.style.scrollBehavior = 'smooth';
});

// Add this to your existing scroll event listener
document.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('.section-reveal');
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.75) {
            section.classList.add('active');
        }
    });
});

// Initialize particles for services section
document.addEventListener('DOMContentLoaded', () => {
    if (typeof particlesJS !== 'undefined') {
        particlesJS("particles-services", particlesConfig);
    }
});
