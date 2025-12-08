class FooterNebula {
    constructor() {
        this.footer = document.querySelector('.footer');
        this.particlesContainer = this.footer.querySelector('.particles-section');
        this.init();
    }

    init() {
        this.createPortal();
        this.createWormhole();
        this.createGrid();
        this.initCosmicDust();
        this.createEnergyBeams();
        this.createPulsingRings();
        this.createConstellation();
        this.createAurora();
        this.initShootingStars();
        this.createQuantumParticles();
        this.createEnergyField();
        this.createNebulaClouds();
        this.createSpaceDust();
        this.createGalaxySpirals();
        this.createStarClusters();
        this.createPlasmaOrbs();
        this.createNebulaStrings();
        this.createCosmicFlares();
        this.createEnergyNodes();
        this.createBlackHole();
        this.createLightRays();
        this.createNebulaSwirlEffects();
        this.createCosmicLightning();
        this.bindEvents();
    }

    createPortal() {
        const portal = document.createElement('div');
        portal.className = 'nebula-portal';
        portal.style.left = '50%';
        portal.style.top = '50%';
        this.particlesContainer.appendChild(portal);
    }

    createWormhole() {
        const wormhole = document.createElement('div');
        wormhole.className = 'wormhole';
        wormhole.style.left = '75%';
        wormhole.style.top = '50%';
        this.particlesContainer.appendChild(wormhole);
    }

    createGrid() {
        const grid = document.createElement('div');
        grid.className = 'nebula-grid';
        this.particlesContainer.appendChild(grid);
    }

    initCosmicDust() {
        for (let i = 0; i < 50; i++) {
            setTimeout(() => {
                this.createDustParticle();
            }, i * 100);
        }
    }

    createDustParticle() {
        const dust = document.createElement('div');
        dust.className = 'cosmic-dust';
        dust.style.left = `${Math.random() * 100}%`;
        dust.style.top = `${Math.random() * 100}%`;
        
        const animation = dust.animate([
            { 
                transform: 'translate(0, 0) scale(1)',
                opacity: 0
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 200}px, ${(Math.random() - 0.5) * 200}px) scale(2)`,
                opacity: 0.8
            },
            { 
                transform: `translate(${(Math.random() - 0.5) * 400}px, ${(Math.random() - 0.5) * 400}px) scale(0)`,
                opacity: 0
            }
        ], {
            duration: 5000 + Math.random() * 5000,
            easing: 'ease-out',
            iterations: Infinity
        });

        this.particlesContainer.appendChild(dust);
    }

    createEnergyBeams() {
        setInterval(() => {
            const beam = document.createElement('div');
            beam.className = 'energy-beam';
            beam.style.top = `${Math.random() * 100}%`;
            this.particlesContainer.appendChild(beam);
            
            setTimeout(() => beam.remove(), 8000);
        }, 3000);
    }

    createPulsingRings() {
        setInterval(() => {
            const ring = document.createElement('div');
            ring.className = 'nebula-ring';
            ring.style.left = '50%';
            ring.style.top = '50%';
            ring.style.width = '50px';
            ring.style.height = '50px';
            this.particlesContainer.appendChild(ring);
            
            setTimeout(() => ring.remove(), 4000);
        }, 2000);
    }

    createConstellation() {
        const constellation = document.createElement('div');
        constellation.className = 'constellation';
        this.particlesContainer.appendChild(constellation);
    }

    createAurora() {
        const aurora = document.createElement('div');
        aurora.className = 'aurora';
        this.particlesContainer.appendChild(aurora);

        // Create multiple aurora layers
        for (let i = 0; i < 3; i++) {
            const auroraLayer = aurora.cloneNode();
            auroraLayer.style.top = `${i * 20}%`;
            auroraLayer.style.animationDelay = `${i * -3}s`;
            this.particlesContainer.appendChild(auroraLayer);
        }
    }

    initShootingStars() {
        setInterval(() => {
            const star = document.createElement('div');
            star.className = 'shooting-star';
            star.style.top = `${Math.random() * 100}%`;
            star.style.left = `${Math.random() * 100}%`;
            this.particlesContainer.appendChild(star);
            
            setTimeout(() => star.remove(), 3000);
        }, 2000);
    }

    createQuantumParticles() {
        for (let i = 0; i < 20; i++) {
            setTimeout(() => {
                const particle = document.createElement('div');
                particle.className = 'quantum-particle';
                particle.style.left = `${Math.random() * 100}%`;
                particle.style.top = `${Math.random() * 100}%`;
                this.particlesContainer.appendChild(particle);

                // Remove particle after animation
                setTimeout(() => particle.remove(), 10000);
            }, i * 300);
        }
    }

    createEnergyField() {
        const field = document.createElement('div');
        field.className = 'energy-field';
        this.particlesContainer.appendChild(field);
    }

    createNebulaClouds() {
        for (let i = 0; i < 3; i++) {
            const cloud = document.createElement('div');
            cloud.className = 'nebula-cloud';
            cloud.style.left = `${Math.random() * 100}%`;
            cloud.style.top = `${Math.random() * 100}%`;
            cloud.style.opacity = 0.3 + Math.random() * 0.4;
            cloud.style.animationDelay = `${-i * 8}s`;
            this.particlesContainer.appendChild(cloud);
        }
    }

    createSpaceDust() {
        const createDust = () => {
            const dust = document.createElement('div');
            dust.className = 'space-dust';
            dust.style.left = `${Math.random() * 100}%`;
            dust.style.top = '100%';
            this.particlesContainer.appendChild(dust);
            
            setTimeout(() => dust.remove(), 8000);
        };

        setInterval(createDust, 200);
    }

    createGalaxySpirals() {
        const spiral = document.createElement('div');
        spiral.className = 'galaxy-spiral';
        spiral.style.left = '75%';
        spiral.style.top = '60%';
        this.particlesContainer.appendChild(spiral);

        const spiral2 = spiral.cloneNode();
        spiral2.style.left = '25%';
        spiral2.style.top = '40%';
        spiral2.style.animationDirection = 'reverse';
        this.particlesContainer.appendChild(spiral2);
    }

    createStarClusters() {
        const createCluster = () => {
            for (let i = 0; i < 5; i++) {
                const star = document.createElement('div');
                star.className = 'star-cluster';
                star.style.left = `${Math.random() * 100}%`;
                star.style.top = `${Math.random() * 100}%`;
                star.style.animationDelay = `${Math.random() * 4}s`;
                this.particlesContainer.appendChild(star);
                
                setTimeout(() => star.remove(), 4000);
            }
        };

        setInterval(createCluster, 2000);
    }

    createPlasmaOrbs() {
        for (let i = 0; i < 3; i++) {
            const orb = document.createElement('div');
            orb.className = 'plasma-orb';
            orb.style.left = `${20 + i * 30}%`;
            orb.style.top = `${40 + (i % 2) * 20}%`;
            orb.style.animationDelay = `${-i * 2}s`;
            this.particlesContainer.appendChild(orb);
        }
    }

    createNebulaStrings() {
        for (let i = 0; i < 8; i++) {
            const string = document.createElement('div');
            string.className = 'nebula-string';
            string.style.left = `${Math.random() * 100}%`;
            string.style.animationDelay = `${-i * 1.5}s`;
            this.particlesContainer.appendChild(string);
        }
    }

    createCosmicFlares() {
        const createFlare = () => {
            const flare = document.createElement('div');
            flare.className = 'cosmic-flare';
            flare.style.top = `${Math.random() * 100}%`;
            flare.style.transform = `rotate(${Math.random() * 360}deg)`;
            this.particlesContainer.appendChild(flare);
            
            setTimeout(() => flare.remove(), 5000);
        };

        setInterval(createFlare, 2000);
    }

    createEnergyNodes() {
        const createNode = () => {
            const node = document.createElement('div');
            node.className = 'energy-node';
            node.style.left = `${Math.random() * 100}%`;
            node.style.top = `${Math.random() * 100}%`;
            this.particlesContainer.appendChild(node);
            
            setTimeout(() => node.remove(), 4000);
        };

        setInterval(createNode, 1000);
    }

    createBlackHole() {
        const blackHole = document.createElement('div');
        blackHole.className = 'black-hole';
        blackHole.style.left = '75%';
        blackHole.style.top = '60%';
        this.particlesContainer.appendChild(blackHole);

        // Add gravitational effect to nearby particles
        this.applyGravitationalEffect(blackHole);
    }

    createLightRays() {
        for (let i = 0; i < 8; i++) {
            const ray = document.createElement('div');
            ray.className = 'light-ray';
            ray.style.left = '75%';
            ray.style.top = '60%';
            ray.style.transform = `rotate(${i * 45}deg)`;
            ray.style.animationDelay = `${-i * 0.5}s`;
            this.particlesContainer.appendChild(ray);
        }
    }

    createNebulaSwirlEffects() {
        const positions = [
            { left: '20%', top: '30%' },
            { left: '80%', top: '70%' },
            { left: '50%', top: '50%' }
        ];

        positions.forEach((pos, i) => {
            const swirl = document.createElement('div');
            swirl.className = 'nebula-swirl';
            swirl.style.left = pos.left;
            swirl.style.top = pos.top;
            swirl.style.animationDelay = `${-i * 3}s`;
            this.particlesContainer.appendChild(swirl);
        });
    }

    createCosmicLightning() {
        const createLightning = () => {
            const lightning = document.createElement('div');
            lightning.className = 'cosmic-lightning';
            lightning.style.left = `${Math.random() * 100}%`;
            lightning.style.top = `${Math.random() * 100}%`;
            this.particlesContainer.appendChild(lightning);
            
            setTimeout(() => lightning.remove(), 6000);
        };

        // Random lightning strikes
        setInterval(createLightning, 4000);
    }

    applyGravitationalEffect(blackHole) {
        const particles = this.particlesContainer.querySelectorAll('.quantum-particle, .star-cluster');
        const bhRect = blackHole.getBoundingClientRect();
        const center = {
            x: bhRect.left + bhRect.width / 2,
            y: bhRect.top + bhRect.height / 2
        };

        particles.forEach(particle => {
            const pRect = particle.getBoundingClientRect();
            const dx = center.x - (pRect.left + pRect.width / 2);
            const dy = center.y - (pRect.top + pRect.height / 2);
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 200) {
                const force = (200 - distance) / 200;
                particle.style.transform += ` translate(${dx * force}px, ${dy * force}px)`;
            }
        });
    }

    bindEvents() {
        this.footer.addEventListener('mousemove', (e) => {
            const rect = this.footer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;
            
            const portal = this.particlesContainer.querySelector('.nebula-portal');
            if (portal) {
                portal.style.transform = `translate(
                    calc(-50% + ${(x - 0.5) * 50}px),
                    calc(-50% + ${(y - 0.5) * 50}px)
                ) rotate(${x * 360}deg)`;
            }

            const auroras = this.particlesContainer.querySelectorAll('.aurora');
            auroras.forEach((aurora, index) => {
                const factor = (index + 1) * 20;
                aurora.style.transform = `translateX(${(x - 0.5) * factor}px) translateY(${(y - 0.5) * factor}px)`;
            });
        });

        // Add interactive effects on scroll
        window.addEventListener('scroll', () => {
            const scrolled = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
            const portal = this.particlesContainer.querySelector('.nebula-portal');
            const wormhole = this.particlesContainer.querySelector('.wormhole');
            
            if (portal && wormhole) {
                portal.style.transform = `translate(-50%, -50%) rotate(${scrolled * 360}deg)`;
                wormhole.style.transform = `scale(${1 + scrolled}) rotate(${-scrolled * 360}deg)`;
            }
        });

        // Recreate quantum particles periodically
        setInterval(() => {
            this.createQuantumParticles();
        }, 10000);

        // Add parallax effect to nebula clouds
        this.footer.addEventListener('mousemove', (e) => {
            const clouds = this.particlesContainer.querySelectorAll('.nebula-cloud');
            const rect = this.footer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            clouds.forEach((cloud, index) => {
                const factor = (index + 1) * 30;
                cloud.style.transform = `translate(${x * factor}px, ${y * factor}px)`;
            });
        });

        // Add interactive plasma orbs movement
        this.footer.addEventListener('mousemove', (e) => {
            const orbs = this.particlesContainer.querySelectorAll('.plasma-orb');
            const rect = this.footer.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = (e.clientY - rect.top) / rect.height;

            orbs.forEach((orb, index) => {
                const factor = (index + 1) * 40;
                orb.style.transform = `translate(${(x - 0.5) * factor}px, ${(y - 0.5) * factor}px)`;
            });
        });

        // Add black hole interaction
        this.particlesContainer.addEventListener('mousemove', (e) => {
            const blackHole = this.particlesContainer.querySelector('.black-hole');
            if (blackHole) {
                const rect = this.footer.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                
                blackHole.style.transform = `translate(${(x - 0.5) * 50}px, ${(y - 0.5) * 50}px)`;
                this.applyGravitationalEffect(blackHole);
            }
        });
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new FooterNebula();
});
