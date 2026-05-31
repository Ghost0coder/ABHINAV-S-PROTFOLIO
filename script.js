document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       DYNAMIC TYPING ANIMATION (HERO SUBTITLE)
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const words = ["Self-Taught Web Developer", "Tech Enthusiast", "wibeCoder"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function typeEffect() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            // Delete characters
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50; // Faster deleting speed
        } else {
            // Add characters
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 120; // Natural typing speed
        }

        // Word completed
        if (!isDeleting && charIndex === currentWord.length) {
            isDeleting = true;
            typingSpeed = 2000; // Delay before deleting
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500; // Small delay before typing next word
        }

        setTimeout(typeEffect, typingSpeed);
    }

    // Initialize Typing Effect
    if (typingElement) {
        typeEffect();
    }

    /* ==========================================================================
       THEME TOGGLER (DARK / LIGHT THEME)
       ========================================================================== */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const bodyElement = document.body;
    const themeIcon = themeToggleBtn.querySelector('i');

    // Retrieve saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        bodyElement.classList.remove('dark-theme');
        bodyElement.classList.add('light-theme');
        themeIcon.className = 'fa-solid fa-sun';
    } else {
        bodyElement.classList.add('dark-theme');
        bodyElement.classList.remove('light-theme');
        themeIcon.className = 'fa-solid fa-moon';
    }

    themeToggleBtn.addEventListener('click', () => {
        if (bodyElement.classList.contains('dark-theme')) {
            // Switch to Light
            bodyElement.classList.remove('dark-theme');
            bodyElement.classList.add('light-theme');
            themeIcon.className = 'fa-solid fa-sun';
            localStorage.setItem('theme', 'light');
        } else {
            // Switch to Dark
            bodyElement.classList.remove('light-theme');
            bodyElement.classList.add('dark-theme');
            themeIcon.className = 'fa-solid fa-moon';
            localStorage.setItem('theme', 'dark');
        }
    });

    /* ==========================================================================
       MOBILE RESPONSIVE HAMBURGER NAVIGATION MENU
       ========================================================================== */
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle menu
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close menu when clicking nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when resizing window past mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 900) {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    /* ==========================================================================
       STYLISH ACTIVE NAV HIGHLIGHT ON SCROLL
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        let currentSection = '';
        
        // Sticky nav border threshold
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       SKILLS EXPANDABLE / CATEGORY SWAPPER TABS
       ========================================================================== */
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.skills-tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetId = btn.getAttribute('data-target');

            // Remove active classes
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));

            // Add active classes
            btn.classList.add('active');
            const targetContent = document.getElementById(targetId);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       INTERACTIVE MAGNETIC SPOTLIGHT CARD EFFECT
       ========================================================================== */
    const glassCards = document.querySelectorAll('.glass-card');

    glassCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--x', `${x}px`);
            card.style.setProperty('--y', `${y}px`);
        });
    });

    /* ==========================================================================
       CUSTOM CURSOR GRADIENT SPHERICAL GLOW TRACKER
       ========================================================================== */
    const cursorGlow = document.getElementById('cursor-glow');

    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.opacity = '1';
        cursorGlow.style.left = `${e.clientX}px`;
        cursorGlow.style.top = `${e.clientY}px`;
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.style.opacity = '0';
    });

    /* ==========================================================================
       CONTACT FORM VALIDATION & INTERACTIVE SIMULATED TOAST
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const toastMessage = document.getElementById('toast-message');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        let isValid = true;
        
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');

        // Name Validation
        if (nameInput.value.trim() === '') {
            nameInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            nameInput.parentElement.classList.remove('error');
        }

        // Email Validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(emailInput.value.trim())) {
            emailInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            emailInput.parentElement.classList.remove('error');
        }

        // Message Validation
        if (messageInput.value.trim() === '') {
            messageInput.parentElement.classList.add('error');
            isValid = false;
        } else {
            messageInput.parentElement.classList.remove('error');
        }

        if (isValid) {
            // Form is fully validated. Submit to Google Form
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitText = submitBtn.querySelector('span');
            const submitIcon = submitBtn.querySelector('i');
            
            // UI Button feedback loading
            submitBtn.disabled = true;
            submitText.textContent = "Sending...";
            submitIcon.className = "fa-solid fa-circle-notch fa-spin";
            
            const formData = new URLSearchParams(new FormData(contactForm));

            fetch(contactForm.action || 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSfGA0GG2YRLjJfxTEjkkfeeD8brxTT5-uJdrqq1_fO5YkCBog/formResponse', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: formData.toString()
            })
            .then(() => {
                // Success UI State
                submitText.textContent = "Sent!";
                submitIcon.className = "fa-solid fa-check";
                
                // Show floating Success Toast
                toastMessage.classList.add('show');
                
                // Clear Form Fields
                contactForm.reset();
                
                // Reset Button & Toast State after delay
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitText.textContent = "Send Message";
                    submitIcon.className = "fa-solid fa-paper-plane";
                    
                    toastMessage.classList.remove('show');
                }, 5000);
            })
            .catch(error => {
                console.error('Submission error:', error);
                
                submitText.textContent = "Error";
                submitIcon.className = "fa-solid fa-triangle-exclamation";
                
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitText.textContent = "Send Message";
                    submitIcon.className = "fa-solid fa-paper-plane";
                }, 3000);
            });
        }
    });

    // Realtime error removal on typing
    const inputs = contactForm.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('input', () => {
            if (input.value.trim() !== '') {
                input.parentElement.classList.remove('error');
            }
        });
    });
});
