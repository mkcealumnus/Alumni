class AmazingNebulaLoader {
    constructor() {
        this.createLoader();
        this.initializeLoader();
    }

    createLoader() {
        const loader = `
            <div class="nebula-loader">
                <div class="nebula-background"></div>
                <div class="nebula-core">
                    <div class="core-rings">
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="ring"></div>
                        <div class="logo-container">
                            <img src="assets/logo.svg" alt="Loading..." class="loader-logo">
                            <div class="energy-field"></div>
                        </div>
                    </div>
                    <div class="loader-progress">
                        <div class="quantum-dots">
                            <span></span><span></span><span></span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress"></div>
                        </div>
                        <div class="status-text">Initializing Quantum Core...</div>
                    </div>
                </div>
            </div>`;

        document.body.insertAdjacentHTML('afterbegin', loader);
        document.body.style.overflow = 'hidden';
    }

    initializeLoader() {
        const messages = [
            'Initializing Quantum Core...',
            'Stabilizing Neural Network...',
            'Calibrating Space-Time Matrix...',
            'Synchronizing Dimensional Gates...',
            'Activating Nebula Protocols...'
        ];

        let progress = 0;
        const progressBar = document.querySelector('.progress');
        const statusText = document.querySelector('.status-text');
        
        const updateLoader = () => {
            if (progress >= 100) {
                this.completeLoading();
                return;
            }

            progress += 0.7;
            progressBar.style.width = `${Math.min(progress, 100)}%`;
            
            const messageIndex = Math.floor((progress / 100) * messages.length);
            if (messages[messageIndex]) {
                statusText.textContent = messages[messageIndex];
            }

            requestAnimationFrame(updateLoader);
        };

        setTimeout(updateLoader, 500);
    }

    completeLoading() {
        const loader = document.querySelector('.nebula-loader');
        loader.classList.add('fade-out');
        
        setTimeout(() => {
            loader.remove();
            document.body.style.overflow = '';
            document.body.classList.add('loaded');
        }, 1000);
    }
}

// Initialize the loader
document.addEventListener('DOMContentLoaded', () => {
    new AmazingNebulaLoader();
});
