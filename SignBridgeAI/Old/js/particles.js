const particleConfigs = {
    home: {
        particles: {
            number: { value: 80 },
            color: { value: ["#ff3366", "#8a2be2"] },
            opacity: { value: 0.5 },
            size: { value: 3 },
            line_linked: { color: "#ff3366" }
        }
    },
    portfolio: {
        particles: {
            number: { value: 40 },
            color: { value: ["#4dc9ff", "#8a2be2"] },
            opacity: { value: 0.3 },
            size: { value: 2 },
            line_linked: { color: "#4dc9ff" }
        }
    },
    about: {
        particles: {
            number: { value: 60 },
            color: { value: "#8a2be2" },
            opacity: { value: 0.4 },
            size: { value: 4 },
            line_linked: { color: "#8a2be2" }
        }
    },
    projects: {
        particles: {
            number: { value: 50 },
            color: { value: "#ff3366" },
            opacity: { value: 0.3 },
            size: { value: 3 },
            line_linked: { color: "#ff3366" }
        }
    },
    testimonial: {
        particles: {
            number: { value: 30 },
            color: { value: "#4dc9ff" },
            opacity: { value: 0.2 },
            size: { value: 2 },
            line_linked: { color: "#4dc9ff" }
        }
    },
    contact: {
        particles: {
            number: { value: 40 },
            color: { value: ["#ff3366", "#4dc9ff"] },
            opacity: { value: 0.3 },
            size: { value: 3 },
            line_linked: { color: "#ff3366" }
        }
    }
};

const footerConfig = {
    particles: {
        number: {
            value: 50,  // Increased number of particles
            density: {
                enable: true,
                value_area: 800
            }
        },
        color: {
            value: ["#ff3366", "#8a2be2", "#4dc9ff"]
        },
        opacity: {
            value: 0.6,  // Increased opacity
            random: false
        },
        size: {
            value: 4,  // Increased size
            random: true
        },
        move: {
            enable: true,
            speed: 3,  // Increased speed
            direction: "none",
            random: true,
            straight: false,
            out_mode: "bounce"  // Changed to bounce
        },
        line_linked: {
            enable: true,
            distance: 150,
            color: "#ff3366",
            opacity: 0.4,  // Increased opacity
            width: 1
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: {
                enable: true,
                mode: "grab"
            },
            onclick: {
                enable: true,
                mode: "push"
            },
            resize: true
        }
    },
    retina_detect: true
};

// Initialize particles for each section
document.addEventListener('DOMContentLoaded', () => {
    Object.keys(particleConfigs).forEach(section => {
        const config = {
            ...particleConfigs[section],
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" },
                    resize: true
                }
            },
            retina_detect: true
        };
        
        particlesJS(`particles-${section}`, config);
    });

    // Initialize footer particles
    if (document.getElementById('particles-footer')) {
        particlesJS('particles-footer', {
            ...footerConfig,
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: {
                        enable: true,
                        mode: "grab"
                    },
                    resize: true
                }
            },
            retina_detect: true
        });
    }
});
