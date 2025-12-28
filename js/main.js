/**
 * ============================================
 * FARM WEBSITE - MAIN JAVASCRIPT
 * ============================================
 * 
 * Purpose: Basic interactivity and future-ready structure
 * Scalability: Easy to convert to React/React Native components
 * 
 * WebView Compatibility:
 * - No alert() popups (uses toast notifications)
 * - External links open in respective apps
 * - Internal navigation without browser refresh
 * - Loading states for slow networks
 * - Touch-friendly interactions
 * 
 * Current Features:
 * - Contact form handling (ready for backend)
 * - Smooth scrolling
 * - Basic navigation enhancements
 * - Toast notifications (WebView-friendly)
 * - External link handling
 * 
 * Future Enhancements:
 * - Product cart functionality
 * - API integration
 * - WhatsApp automation
 * - Form validation
 * - Analytics tracking
 * ============================================
 */

/**
 * ============================================
 * WEBVIEW-SAFE HAMBURGER MENU (CRITICAL)
 * ============================================
 * Runs immediately - NO DOMContentLoaded, NO delays
 * Direct onclick binding for Android WebView compatibility
 * Since scripts are loaded at end of body, DOM is ready
 * ============================================
 */
(function () {
  var hamburgerIcon = document.getElementById("hamburger-menu-icon");
  var mainMenu = document.getElementById("main-navigation-menu");

  if (!hamburgerIcon || !mainMenu) {
    console.error("Hamburger menu elements not found");
    return;
  }

  // CRITICAL: Direct onclick for WebView compatibility
  hamburgerIcon.onclick = function () {
    mainMenu.classList.toggle("is-visible");
  };
})();

(function() {
    'use strict';

    /**
     * Initialize all functionality when DOM is ready
     */
    document.addEventListener('DOMContentLoaded', function() {
        initToastSystem();
        initContactForm();
        initSmoothScrolling();
        initNavigation();
        initProductCards();
        initExternalLinks();
        initLoadingStates();
        initMobileMenu(); // Mobile menu functionality
        initLanguageSwitcher(); // Language toggle functionality
        initStickyHeader(); // Sticky header enhancement
        initServiceWorker(); // PWA support (optional)
    });

    /**
     * ============================================
     * CONTACT FORM HANDLING
     * ============================================
     * Future: Connect to backend API, Firebase, or Formspree
     * Scalability: Can be converted to React form component
     */
    function initContactForm() {
        const contactForm = document.getElementById('contactForm');
        
        if (!contactForm) return;

        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                phone: formData.get('phone'),
                email: formData.get('email'),
                message: formData.get('message')
            };

            // Log for now (replace with API call)
            console.log('Form submitted:', data);
            
            // Future: Replace with actual API call
            // Example:
            // fetch('/api/contact', {
            //     method: 'POST',
            //     headers: { 'Content-Type': 'application/json' },
            //     body: JSON.stringify(data)
            // })
            // .then(response => response.json())
            // .then(data => showSuccessMessage())
            // .catch(error => showErrorMessage());

            // Show success message (WebView-friendly toast)
            showToast('Thank you for your message! We will contact you soon.', 'success');
            
            // Reset form
            contactForm.reset();
        });
    }

    /**
     * ============================================
     * SMOOTH SCROLLING
     * ============================================
     * Enhances user experience for anchor links
     */
    function initSmoothScrolling() {
        // Smooth scroll is handled by CSS, but we can enhance it
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(link => {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Only handle same-page anchors
                if (href !== '#' && href.length > 1) {
                    const target = document.querySelector(href);
                    if (target) {
                        e.preventDefault();
                        target.scrollIntoView({
                            behavior: 'smooth',
                            block: 'start'
                        });
                    }
                }
            });
        });
    }

    /**
     * ============================================
     * NAVIGATION ENHANCEMENTS (WebView-optimized)
     * ============================================
     * Internal navigation works without browser refresh
     */
    function initNavigation() {
        // Set active navigation link based on current page
        const currentPage = window.location.pathname.split('/').pop() || 'index.html';
        const navLinks = document.querySelectorAll('.header__nav-link, #main-navigation-menu a');
        
        navLinks.forEach(link => {
            const linkHref = link.getAttribute('href');
            
            // Check if it's an internal link (same domain)
            if (linkHref && !linkHref.startsWith('http') && !linkHref.startsWith('//')) {
                // Internal navigation - ensure smooth transition
                if (linkHref === currentPage || 
                    (currentPage === '' && linkHref === 'index.html')) {
                    // Add active class only to desktop nav links
                    if (link.classList.contains('header__nav-link')) {
                        link.classList.add('header__nav-link--active');
                    }
                    link.setAttribute('aria-current', 'page');
                }
                
                // WebView: Ensure internal links work smoothly
                link.addEventListener('click', function(e) {
                    // Close mobile menu when navigating (if it's in mobile menu)
                    const mobileMenu = document.getElementById('main-navigation-menu');
                    if (mobileMenu && mobileMenu.contains(link)) {
                        mobileMenu.classList.remove('is-visible');
                        document.body.classList.remove('menu-open');
                    }
                    // Let default behavior handle navigation
                    // WebView will handle page transitions
                });
            }
        });
    }

    /**
     * ============================================
     * HAMBURGER MENU FUNCTIONALITY (WebView-Safe)
     * ============================================
     * WebView-safe implementation: immediate binding, no DOMContentLoaded
     * Works reliably in Android WebView, mobile browsers, and desktop
     */
    function initMobileMenu() {
        const hamburgerIcon = document.getElementById('hamburger-menu-icon');
        const navigationMenu = document.getElementById('main-navigation-menu');

        if (!hamburgerIcon || !navigationMenu) {
            console.error('Hamburger menu elements not found');
            return;
        }

        // CRITICAL: Use direct onclick for WebView compatibility
        // DO NOT use addEventListener or DOMContentLoaded delays
        hamburgerIcon.onclick = function() {
            navigationMenu.classList.toggle('is-visible');
        };

        // Close menu when clicking a navigation link (keep for UX)
        const navLinks = navigationMenu.querySelectorAll('a');
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                navigationMenu.classList.remove('is-visible');
            });
        });
    }

    /**
     * ============================================
     * PRODUCT CARDS INTERACTIVITY
     * ============================================
     * Future: Add to cart functionality, product details modal
     * Scalability: Ready for shopping cart integration
     */
    function initProductCards() {
        const productCards = document.querySelectorAll('.product-card');
        
        productCards.forEach(card => {
            // Add click handler for future "View Details" or "Add to Cart"
            card.addEventListener('click', function(e) {
                // Don't trigger if clicking on a link or button inside
                if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
                    return;
                }

                // Future: Open product details modal or add to cart
                const productId = card.getAttribute('data-product-id');
                const productName = card.getAttribute('data-product-name');
                
                if (productId) {
                    console.log('Product clicked:', productId, productName);
                    // Future: Add to cart or show details
                    // addToCart(productId);
                }
            });

            // Add hover effect enhancement (optional)
            card.style.cursor = 'pointer';
        });
    }

    /**
     * ============================================
     * TOAST NOTIFICATION SYSTEM (WebView-friendly)
     * ============================================
     * Replaces alert() for better WebView experience
     */
    function initToastSystem() {
        // Create toast container if it doesn't exist
        if (!document.querySelector('.toast-container')) {
            const toastContainer = document.createElement('div');
            toastContainer.className = 'toast-container';
            toastContainer.setAttribute('aria-live', 'polite');
            toastContainer.setAttribute('aria-atomic', 'true');
            document.body.appendChild(toastContainer);
        }
    }

    /**
     * Show toast notification (replaces alert)
     * @param {string} message - Message to display
     * @param {string} type - 'success' or 'error'
     * @param {number} duration - Duration in milliseconds (default: 3000)
     */
    function showToast(message, type, duration) {
        type = type || 'success';
        duration = duration || 3000;

        // Create toast element
        const toast = document.createElement('div');
        toast.className = 'toast toast--' + type;
        toast.textContent = message;
        toast.setAttribute('role', 'alert');

        // Append to body
        document.body.appendChild(toast);

        // Trigger animation
        setTimeout(function() {
            toast.classList.add('toast--show');
        }, 10);

        // Remove after duration
        setTimeout(function() {
            toast.classList.remove('toast--show');
            setTimeout(function() {
                if (toast.parentNode) {
                    toast.parentNode.removeChild(toast);
                }
            }, 300); // Wait for fade-out animation
        }, duration);
    }

    /**
     * ============================================
     * EXTERNAL LINK HANDLING (WebView)
     * ============================================
     * Opens WhatsApp, Phone, Maps in respective apps
     */
    function initExternalLinks() {
        // Handle WhatsApp links
        const whatsappLinks = document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp"]');
        whatsappLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let the link open naturally (WebView will handle app opening)
                // Add intent:// fallback for better Android support
                const href = this.getAttribute('href');
                if (href && href.includes('wa.me')) {
                    // Ensure it opens in WhatsApp app
                    this.setAttribute('target', '_blank');
                    this.setAttribute('rel', 'noopener noreferrer');
                }
            });
        });

        // Handle phone links (tel:)
        const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
        phoneLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let WebView handle phone app opening
                this.setAttribute('target', '_self');
            });
        });

        // Handle email links
        const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
        emailLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Let WebView handle email app opening
                this.setAttribute('target', '_self');
            });
        });

        // Handle Google Maps links
        const mapLinks = document.querySelectorAll('a[href*="maps.google"], a[href*="google.com/maps"]');
        mapLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                // Open in Maps app
                this.setAttribute('target', '_blank');
                this.setAttribute('rel', 'noopener noreferrer');
            });
        });
    }

    /**
     * ============================================
     * LOADING STATES (WebView: Slow network)
     * ============================================
     */
    function initLoadingStates() {
        // Create loading overlay if needed
        if (!document.querySelector('.loading-overlay')) {
            const loadingOverlay = document.createElement('div');
            loadingOverlay.className = 'loading-overlay';
            loadingOverlay.innerHTML = '<div class="loading"></div>';
            loadingOverlay.setAttribute('aria-hidden', 'true');
            document.body.appendChild(loadingOverlay);
        }
    }

    /**
     * Show loading overlay
     */
    function showLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.add('loading-overlay--show');
            overlay.setAttribute('aria-hidden', 'false');
        }
    }

    /**
     * Hide loading overlay
     */
    function hideLoading() {
        const overlay = document.querySelector('.loading-overlay');
        if (overlay) {
            overlay.classList.remove('loading-overlay--show');
            overlay.setAttribute('aria-hidden', 'true');
        }
    }

    /**
     * ============================================
     * UTILITY FUNCTIONS
     * ============================================
     */

    /**
     * Show success message (for form submissions)
     * Uses toast notification (WebView-friendly)
     */
    function showSuccessMessage(message) {
        showToast(message || 'Success!', 'success');
    }

    /**
     * Show error message
     * Uses toast notification (WebView-friendly)
     */
    function showErrorMessage(message) {
        showToast(message || 'An error occurred. Please try again.', 'error', 4000);
    }

    /**
     * ============================================
     * FUTURE: ADD TO CART FUNCTIONALITY
     * ============================================
     * This structure is ready for shopping cart implementation
     */
    // function addToCart(productId) {
    //     // Get product data from card or API
    //     const product = {
    //         id: productId,
    //         name: document.querySelector(`[data-product-id="${productId}"] .product-card__title`).textContent,
    //         price: document.querySelector(`[data-product-id="${productId}"] .product-card__price`).textContent
    //     };
    //     
    //     // Add to localStorage or send to backend
    //     let cart = JSON.parse(localStorage.getItem('cart') || '[]');
    //     cart.push(product);
    //     localStorage.setItem('cart', JSON.stringify(cart));
    //     
    //     // Update UI
    //     updateCartCount();
    // }

    /**
     * ============================================
     * FUTURE: WHATSAPP ORDER AUTOMATION
     * ============================================
     * Can integrate with WhatsApp Business API
     */
    // function sendWhatsAppOrder(productList) {
    //     const phoneNumber = '919011463179'; // Replace with actual number
    //     const message = encodeURIComponent(`Order:\n${productList.join('\n')}`);
    //     window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
    // }

    /**
     * ============================================
     * STICKY HEADER ENHANCEMENT
     * ============================================
     * Enhances sticky header behavior and adds scroll effects
     */
    function initStickyHeader() {
        const header = document.querySelector('.header');
        if (!header) return;

        let lastScrollTop = 0;
        let ticking = false;

        function updateHeader() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class for enhanced shadow
            if (scrollTop > 10) {
                header.classList.add('header--scrolled');
            } else {
                header.classList.remove('header--scrolled');
            }

            lastScrollTop = scrollTop;
            ticking = false;
        }

        function onScroll() {
            if (!ticking) {
                window.requestAnimationFrame(updateHeader);
                ticking = true;
            }
        }

        // Listen to scroll events
        window.addEventListener('scroll', onScroll, { passive: true });
        
        // Initial check
        updateHeader();
    }

    /**
     * ============================================
     * SERVICE WORKER REGISTRATION (PWA - Optional)
     * ============================================
     * Uncomment to enable offline functionality
     */
    function initServiceWorker() {
        // Check if service workers are supported
        if ('serviceWorker' in navigator) {
            // Uncomment below to enable service worker
            /*
            window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                        console.log('Service Worker registered:', registration);
                    })
                    .catch(function(error) {
                        console.log('Service Worker registration failed:', error);
                    });
            });
            */
        }
    }

    /**
     * ============================================
     * LANGUAGE SWITCHER FUNCTIONALITY
     * ============================================
     * Handles English/Marathi language switching
     * WebView-compatible with localStorage persistence
     */
    function initLanguageSwitcher() {
        // Check if translations object exists
        if (typeof translations === 'undefined') {
            console.warn('Translations not loaded. Make sure translations.js is loaded before main.js');
            // Try again after a short delay
            setTimeout(initLanguageSwitcher, 100);
            return;
        }

        const langToggle = document.getElementById('langToggle');
        const mobileLangToggle = document.getElementById('mobileLangToggle');
        
        // Get saved language preference or default to English
        let currentLang = localStorage.getItem('farmLang') || 'en';
        
        /**
         * Update text content of element
         */
        function updateText(selector, text) {
            if (!text) return;
            const elements = document.querySelectorAll(selector);
            if (elements.length === 0) {
                console.warn('No elements found for selector:', selector);
                return;
            }
            elements.forEach(el => {
                if (el) {
                    el.textContent = text;
                    console.log('Updated element:', selector, 'to:', text);
                }
            });
        }

        /**
         * Apply language to page content
         */
        function applyLanguage(lang) {
            const t = translations[lang];
            if (!t) {
                console.error('Translation not found for language:', lang);
                return;
            }

            console.log('Applying language:', lang);

            // Update desktop navigation - iterate through links directly
            const desktopNavLinks = document.querySelectorAll('.header__nav-link');
            desktopNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === 'index.html') {
                    link.textContent = t.nav.home;
                } else if (href === 'about.html') {
                    link.textContent = t.nav.about;
                } else if (href === 'products.html') {
                    link.textContent = t.nav.products;
                } else if (href === 'contact.html') {
                    link.textContent = t.nav.contact;
                }
            });
            
            // Update mobile navigation menu (new structure)
            const mobileNavLinks = document.querySelectorAll('#main-navigation-menu a');
            mobileNavLinks.forEach(link => {
                const href = link.getAttribute('href');
                if (href === 'index.html') {
                    link.textContent = t.nav.home;
                } else if (href === 'about.html') {
                    link.textContent = t.nav.about;
                } else if (href === 'products.html') {
                    link.textContent = t.nav.products;
                } else if (href === 'contact.html') {
                    link.textContent = t.nav.contact;
                }
            });
            
            console.log('Navigation updated:', {
                desktop: desktopNavLinks.length,
                mobile: mobileNavLinks.length
            });

            // Update page-specific content based on current page
            const currentPage = window.location.pathname.split('/').pop() || 'index.html';
            console.log('Current page:', currentPage);
            
            if (currentPage === 'index.html' || currentPage === '' || currentPage === 'FarmProject' || currentPage === 'FarmProject/') {
                updateHomePage(t);
            } else if (currentPage === 'about.html') {
                updateAboutPage(t);
            } else if (currentPage === 'products.html') {
                updateProductsPage(t);
            } else if (currentPage === 'contact.html') {
                updateContactPage(t);
            }
        }

        /**
         * Toggle between English and Marathi
         */
        function toggleLanguage() {
            currentLang = currentLang === 'en' ? 'mr' : 'en';
            localStorage.setItem('farmLang', currentLang);
            applyLanguage(currentLang);
            showToast(currentLang === 'mr' ? 'भाषा बदलली' : 'Language changed', 'success');
        }
        
        // Apply language on page load
        applyLanguage(currentLang);
        
        // Desktop toggle
        if (langToggle) {
            langToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleLanguage();
            });
        }

        // Mobile toggle
        if (mobileLangToggle) {
            mobileLangToggle.addEventListener('click', function(e) {
                e.preventDefault();
                toggleLanguage();
            });
        }


        /**
         * Update home page content
         */
        function updateHomePage(t) {
            updateText('.hero__title', t.home.title);
            updateText('.hero__tagline', t.home.tagline);
            const intro = document.querySelector('.hero__intro');
            if (intro) intro.textContent = t.home.intro;
            
            // Update section headings
            updateText('h2#why-different', t.home.whyDifferent);
            updateText('h2#featured-products', t.home.featuredProducts);
            updateText('h2#testimonials', t.home.testimonials);
            
            // Update buttons - find by text content
            const whatsappBtns = document.querySelectorAll('.btn--whatsapp, .btn');
            whatsappBtns.forEach(btn => {
                if (btn.textContent.includes('Order via WhatsApp') || btn.textContent.includes('📱')) {
                    btn.innerHTML = '📱 ' + t.common.orderWhatsApp;
                }
            });
            
            const viewAllBtns = document.querySelectorAll('.btn');
            viewAllBtns.forEach(btn => {
                if (btn.textContent.includes('View All Products')) {
                    btn.textContent = t.common.viewAll;
                }
            });
            
            // Update ready to order section
            const readySection = document.querySelector('section:has(h2)');
            if (readySection) {
                const readyH2 = readySection.querySelector('h2');
                if (readyH2 && readyH2.textContent.includes('Ready to Order')) {
                    readyH2.textContent = t.home.readyToOrder;
                }
                const readyP = readySection.querySelector('p');
                if (readyP && readyP.textContent.includes('Get fresh')) {
                    readyP.textContent = t.home.orderDescription;
                }
            }
        }

        /**
         * Update about page content
         */
        function updateAboutPage(t) {
            updateText('.hero__title', t.about.title);
            updateText('.hero__tagline', t.about.tagline);
            const intro = document.querySelectorAll('.hero__intro');
            if (intro.length >= 1) intro[0].textContent = t.about.story1;
            if (intro.length >= 2) intro[1].textContent = t.about.story2;
            
            updateText('h2#values', t.about.values);
            updateText('h2#practices', t.about.practices);
            updateText('h2#farm-photos', t.about.photos);
            
            // Find transparency section by text
            const allH2 = document.querySelectorAll('h2');
            allH2.forEach(h2 => {
                if (h2.textContent.includes('Transparency')) {
                    h2.textContent = t.about.transparency;
                }
            });
            
            // Update transparency text
            const allP = document.querySelectorAll('p');
            allP.forEach(p => {
                if (p.textContent.includes('transparency builds trust')) {
                    p.textContent = t.about.transparencyText;
                } else if (p.textContent.includes('proud of our practices')) {
                    p.textContent = t.about.transparencyText2;
                }
            });
            
            // Update button
            const visitBtn = document.querySelector('.btn');
            if (visitBtn && visitBtn.textContent.includes('Schedule')) {
                visitBtn.textContent = t.about.scheduleVisit;
            }
        }

        /**
         * Update products page content
         */
        function updateProductsPage(t) {
            updateText('.hero__title', t.products.title);
            updateText('.hero__tagline', t.products.tagline);
            const intro = document.querySelector('.hero__intro');
            if (intro) intro.textContent = t.products.intro;
            
            updateText('h2#all-products', t.products.allProducts);
            updateText('h2#ordering-info', t.products.howToOrder);
            
            // Update step headings
            const allH3 = document.querySelectorAll('h3');
            allH3.forEach(h3 => {
                if (h3.textContent.includes('WhatsApp Us')) {
                    h3.textContent = '1️⃣ ' + t.products.step1;
                } else if (h3.textContent.includes('Confirm Order')) {
                    h3.textContent = '2️⃣ ' + t.products.step2;
                } else if (h3.textContent.includes('Receive Fresh')) {
                    h3.textContent = '3️⃣ ' + t.products.step3;
                }
            });
            
            // Update why choose section
            updateText('h2#benefits', t.products.whyChoose);
        }

        /**
         * Update contact page content
         */
        function updateContactPage(t) {
            updateText('.hero__title', t.contact.title);
            updateText('.hero__tagline', t.contact.tagline);
            const intro = document.querySelector('.hero__intro');
            if (intro) intro.textContent = t.contact.intro;
            
            updateText('h2#whatsapp-order', t.contact.whatsappOrder);
            
            // Update WhatsApp description
            const allP = document.querySelectorAll('p');
            allP.forEach(p => {
                if (p.textContent.includes('fastest way')) {
                    p.textContent = t.contact.whatsappDesc;
                } else if (p.textContent.includes('welcome visitors')) {
                    p.textContent = t.contact.visitFarmDesc;
                }
            });
            
            updateText('h2#contact-info', t.contact.contactInfo);
            
            // Update contact info headings
            const allH3 = document.querySelectorAll('h3');
            allH3.forEach(h3 => {
                if (h3.textContent.includes('📞 Phone')) {
                    h3.textContent = '📞 ' + t.contact.phone;
                } else if (h3.textContent.includes('📧 Email')) {
                    h3.textContent = '📧 ' + t.contact.email;
                } else if (h3.textContent.includes('📍 Address')) {
                    h3.textContent = '📍 ' + t.contact.address;
                }
            });
            
            updateText('h2#location', t.contact.findUs);
            updateText('h2#contact-form', t.contact.sendMessage);
            
            // Update form labels
            updateText('label[for="name"]', t.contact.name);
            updateText('label[for="phone"]', t.contact.phoneLabel);
            updateText('label[for="email"]', t.contact.emailLabel);
            updateText('label[for="message"]', t.contact.message);
            
            const messageTextarea = document.querySelector('textarea#message');
            if (messageTextarea) messageTextarea.placeholder = t.contact.messagePlaceholder;
            
            updateText('h2#visit-farm', t.contact.visitFarm);
        }

        // Expose for external use
        window.toggleLanguage = toggleLanguage;
        window.applyLanguage = applyLanguage;
        
        // closeMobileMenu is already exposed above
    }

    /**
     * ============================================
     * EXPORT FOR FUTURE MODULE SYSTEM
     * ============================================
     * When converting to React/ES6 modules, these can be exported
     */
    // export { addToCart, sendWhatsAppOrder };

})();

