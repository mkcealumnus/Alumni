class NebulaFollower {
    constructor() {
        this.createElements();
        this.mouse = { x: 0, y: 0 };
        this.isActive = false;
        this.init();
    }

    createElements() {
        // Create nebula wrapper
        this.wrapper = document.createElement('div');
        this.wrapper.className = 'nebula-wrapper';
        
        // Create central orb
        this.orb = document.createElement('div');
        this.orb.className = 'nebula-orb';
        
        // Create rings
        // this.rings = ['ring-1', 'ring-2', 'ring-3'].map(className => {
        //     const ring = document.createElement('div');
        //     ring.className = `nebula-ring ${className}`;
        //     this.wrapper.appendChild(ring);
        //     return ring;
        // });
        
        // Create particles container
        this.particles = document.createElement('div');
        this.particles.className = 'nebula-particles';
        
        // Assemble and append to DOM
        this.wrapper.appendChild(this.orb);
        document.body.appendChild(this.wrapper);
        document.body.appendChild(this.particles);
        
        // Set initial position
        this.wrapper.style.transform = `translate(-50%, -50%)`;
        this.moveToCenter();
    }

    moveToCenter() {
        const x = window.innerWidth / 2;
        const y = window.innerHeight / 2;
        this.wrapper.style.left = `${x}px`;
        this.wrapper.style.top = `${y}px`;
    }

    init() {
        // Follow mouse movement
        document.addEventListener('mousemove', (e) => {
            if (!this.isActive) {
                this.isActive = true;
                this.wrapper.style.transition = 'transform 0.1s ease-out';
            }
            
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
            
            this.wrapper.style.left = `${this.mouse.x}px`;
            this.wrapper.style.top = `${this.mouse.y}px`;
            
            // Create particle occasionally
            if (Math.random() > 0.8) {
                this.createParticle(this.mouse.x, this.mouse.y);
            }
        });

        // Interactive elements
        document.querySelectorAll('a, button, .hero-card').forEach(elem => {
            elem.addEventListener('mouseenter', () => this.wrapper.classList.add('energized'));
            elem.addEventListener('mouseleave', () => this.wrapper.classList.remove('energized'));
            elem.addEventListener('click', () => this.triggerPulse());
        });
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'nebula-particle';
        
        // Random particle attributes
        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 2;
        const life = 1000 + Math.random() * 1000;
        const size = 2 + Math.random() * 4;
        
        particle.style.left = `${x}px`;
        particle.style.top = `${y}px`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        
        this.particles.appendChild(particle);
        
        // Animate particle
        const start = Date.now();
        const animate = () => {
            const elapsed = Date.now() - start;
            const progress = elapsed / life;
            
            if (progress >= 1) {
                particle.remove();
                return;
            }
            
            const distance = velocity * progress * 100;
            const currentX = x + Math.cos(angle) * distance;
            const currentY = y + Math.sin(angle) * distance;
            
            particle.style.transform = `translate(${currentX - x}px, ${currentY - y}px)`;
            particle.style.opacity = 1 - progress;
            
            requestAnimationFrame(animate);
        };
        
        requestAnimationFrame(animate);
    }

    triggerPulse() {
        this.wrapper.classList.add('pulse');
        setTimeout(() => this.wrapper.classList.remove('pulse'), 500);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new NebulaFollower();
});
