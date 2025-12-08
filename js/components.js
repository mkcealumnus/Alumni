// Components Loader - Load reusable HTML components
(function() {
    'use strict';

    // Load header component
    async function loadHeader() {
        const headerPlaceholder = document.getElementById('header-component');
        if (headerPlaceholder) {
            try {
                const response = await fetch('./components/header.html');
                const html = await response.text();
                headerPlaceholder.innerHTML = html;
                
                // Set active nav link based on current page
                setActiveNavLink();
                
                // Initialize mobile navigation
                initMobileNav();
            } catch (error) {
                console.error('Error loading header:', error);
            }
        }
    }

    // Load footer component
    async function loadFooter() {
        const footerPlaceholder = document.getElementById('footer-component');
        if (footerPlaceholder) {
            try {
                const response = await fetch('./components/footer.html');
                const html = await response.text();
                footerPlaceholder.innerHTML = html;
                
                // Initialize newsletter form
                initNewsletterForm();
            } catch (error) {
                console.error('Error loading footer:', error);
            }
        }
    }

    // Set active navigation link
    function setActiveNavLink() {
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const pageMap = {
            'index.html': 'home',
            'about.html': 'about',
            'products.html': 'products',
            'careers.html': 'careers',
            'contact.html': 'contact'
        };
        
        const activePage = pageMap[currentPage] || 'home';
        
        document.querySelectorAll('.nav-link').forEach(link => {
            if (link.dataset.page === activePage) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // Initialize mobile navigation
    function initMobileNav() {
        const hamburger = document.querySelector('.hamburger');
        const navLinks = document.querySelector('.nav-links');
        const navOverlay = document.querySelector('.nav-overlay');

        if (hamburger && navLinks) {
            hamburger.addEventListener('click', () => {
                hamburger.classList.toggle('active');
                navLinks.classList.toggle('active');
                if (navOverlay) {
                    navOverlay.classList.toggle('active');
                }
                document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            });

            document.querySelectorAll('.nav-link').forEach(link => {
                link.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    if (navOverlay) {
                        navOverlay.classList.remove('active');
                    }
                    document.body.style.overflow = '';
                });
            });
            
            if (navOverlay) {
                navOverlay.addEventListener('click', () => {
                    hamburger.classList.remove('active');
                    navLinks.classList.remove('active');
                    navOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                });
            }
        }
    }

    // Initialize newsletter form
    function initNewsletterForm() {
        const form = document.querySelector('.newsletter-form');
        if (form) {
            form.addEventListener('submit', function(e) {
                e.preventDefault();
                const input = this.querySelector('input[type="email"]');
                const button = this.querySelector('button');
                
                if (input.value) {
                    button.innerHTML = '<i class="fas fa-check"></i>';
                    button.style.background = 'var(--accent-color)';
                    
                    setTimeout(() => {
                        input.value = '';
                        button.innerHTML = '<i class="fas fa-paper-plane"></i>';
                        button.style.background = '';
                    }, 2000);
                }
            });
        }
    }

    // Initialize on DOM ready
    document.addEventListener('DOMContentLoaded', async function() {
        await loadHeader();
        await loadFooter();
        
        // Trigger scroll event for navbar
        window.dispatchEvent(new Event('scroll'));
    });
})();
