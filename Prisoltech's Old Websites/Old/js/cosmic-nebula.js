class CosmicNebula {
    constructor() {
        if (!document.body) {
            throw new Error('Document body not found');
        }
        console.log('Creating cosmic nebula effect...');
        this.createCanvas();
        this.initializeEffects();
        this.animate();
        console.log('Cosmic nebula effect created');
    }

    createCanvas() {
        this.canvas = document.createElement('canvas');
        this.canvas.className = 'cosmic-nebula-canvas';
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    initializeEffects() {
        // Reduced from 150 to 80 particles
        this.cosmicdust = Array(80).fill().map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 3 + 0.5, // Slightly smaller
            speed: Math.random() * 0.4 + 0.1, // Slower speed
            color: this.getRandomParticleColor(),
            angle: Math.random() * Math.PI * 2,
            pulse: Math.random() * 0.01 + 0.005 // Reduced pulsing
        }));

        // Reduced from 5 to 3 nebula clouds
        this.nebulaClouds = Array(3).fill().map(() => ({
            x: Math.random() * this.canvas.width,
            y: Math.random() * this.canvas.height,
            size: Math.random() * 200 + 100, // Smaller clouds
            hue: Math.random() * 60 + 220,
            drift: Math.random() * 0.01 - 0.005, // Slower drift
            angle: Math.random() * Math.PI * 2,
            opacity: Math.random() * 0.08 + 0.03 // Slightly reduced opacity
        }));
    }

    getRandomParticleColor() {
        const colors = [
            `hsla(${Math.random() * 60 + 220}, 80%, 50%, 0.3)`,  // Blue
            `hsla(${Math.random() * 30 + 270}, 70%, 60%, 0.3)`,  // Purple
            `hsla(${Math.random() * 20 + 180}, 85%, 45%, 0.3)`,  // Cyan
            `hsla(${Math.random() * 30 + 290}, 75%, 55%, 0.3)`   // Pink
        ];
        return colors[Math.floor(Math.random() * colors.length)];
    }

    drawNebulaClouds() {
        this.nebulaClouds.forEach(cloud => {
            // Reduced movement complexity
            const t = Date.now() * 0.0002; // Slower timing (reduced from 0.0005)
            cloud.angle += cloud.drift * 0.5; // Half the drift speed
            
            // Reduced motion amount (reduced from 30 and 15 to 10 and 5)
            const x = cloud.x + Math.sin(t) * Math.cos(cloud.angle) * 10;
            const y = cloud.y + Math.cos(t * 0.7) * Math.sin(cloud.angle) * 5;

            const gradient = this.ctx.createRadialGradient(x, y, 0, x, y, cloud.size);
            gradient.addColorStop(0, `hsla(${cloud.hue}, 80%, 50%, ${cloud.opacity})`);
            gradient.addColorStop(0.5, `hsla(${cloud.hue + 30}, 70%, 40%, ${cloud.opacity * 0.5})`);
            gradient.addColorStop(1, 'transparent');

            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(x, y, cloud.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
    }

    drawCosmicDust() {
        this.cosmicdust.forEach(particle => {
            // Slower rotation and movement
            particle.angle += 0.005; // Reduced from 0.01
            particle.x += Math.cos(particle.angle) * particle.speed * 0.5;
            particle.y += Math.sin(particle.angle) * particle.speed * 0.5;
            
            // Gentler size pulsing
            particle.size += Math.sin(particle.angle * 2) * particle.pulse * 0.5;

            // Reset particles when they go off screen
            if (particle.x < 0 || particle.x > this.canvas.width || 
                particle.y < 0 || particle.y > this.canvas.height) {
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.angle = Math.random() * Math.PI * 2;
            }

            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(
                particle.x,
                particle.y,
                Math.max(0.5, particle.size),
                0,
                Math.PI * 2
            );
            this.ctx.fill();
        });
    }

    animate() {
        // More consistent fade with less variation
        const fadeAmount = 0.04 + Math.sin(Date.now() * 0.0005) * 0.01; // Reduced variation
        this.ctx.fillStyle = `rgba(0, 0, 0, ${fadeAmount})`;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawNebulaClouds();
        this.drawCosmicDust();

        requestAnimationFrame(() => this.animate());
    }
}

// Initialize the cosmic nebula when the document is ready
document.addEventListener('DOMContentLoaded', () => {
    try {
        window.cosmicNebula = new CosmicNebula();
        console.log('Cosmic nebula initialized successfully');
    } catch (error) {
        console.error('Failed to initialize cosmic nebula:', error);
    }
});
