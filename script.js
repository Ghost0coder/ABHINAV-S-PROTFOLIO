document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       DYNAMIC TYPING ANIMATION (HERO SUBTITLE)
       ========================================================================== */
    const typingElement = document.getElementById('typing-text');
    const words = ["Self-Taught Web Developer", "Tech Enthusiast", "vibeCoder"];
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

    /* ==========================================================================
       3D SCROLL REVEAL ANIMATION SYSTEM
       Tags up sections and cards with 3D entrance classes, then uses an
       IntersectionObserver to flip them into view (rotated-back-in-space ->
       flat) the moment they scroll into the viewport. Also drives a
       continuous, scroll-linked 3D tilt on the hero portrait.
       ========================================================================== */
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReducedMotion) {
        // Section headers, the quote block, the startup card, and the contact
        // form fly straight up out of 3D space.
        const straightInSelectors = ['.section-header', '.about-quote', '.startup-grid'];
        straightInSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el) => el.classList.add('reveal-3d'));
        });

        document.querySelectorAll('.contact-form-container').forEach((el) => {
            el.classList.add('reveal-3d-right');
        });

        // Grid/card groups alternate left/right rotation per item so the
        // whole row tumbles into place with some visual rhythm, staggered
        // slightly so cards don't all land in the same instant.
        const alternatingGridSelectors = [
            '.about-info-card',
            '.service-card',
            '.skill-item',
            '.contact-detail-card',
        ];

        alternatingGridSelectors.forEach((selector) => {
            document.querySelectorAll(selector).forEach((el, i) => {
                el.classList.add(i % 2 === 0 ? 'reveal-3d-left' : 'reveal-3d-right');
                el.style.transitionDelay = `${(i % 4) * 0.1}s`;
            });
        });

        // Featured projects: first card swings in from the left, second from
        // the right, like two open panels.
        document.querySelectorAll('.project-card').forEach((el, i) => {
            el.classList.add(i % 2 === 0 ? 'reveal-3d-left' : 'reveal-3d-right');
        });

        // Fires the 3D "fly-in" exactly once, the first time each element
        // crosses into the viewport, then stops watching it.
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');
                    revealObserver.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        document.querySelectorAll('.reveal-3d, .reveal-3d-left, .reveal-3d-right').forEach((el) => {
            revealObserver.observe(el);
        });

        /* ==========================================================================
           CONTINUOUS 3D HERO TILT, LINKED DIRECTLY TO SCROLL POSITION
           ========================================================================== */
        const heroVisual = document.querySelector('.hero-visual');
        const heroSection = document.getElementById('home');
        let tiltTicking = false;

        function updateHeroTilt() {
            if (heroVisual && heroSection) {
                const heroHeight = heroSection.offsetHeight || 1;
                const progress = Math.min(Math.max(window.scrollY / heroHeight, 0), 1);

                const rotateY = progress * 35;       // turns the card away in 3D space
                const rotateX = progress * -12;       // tips it back slightly
                const translateZ = progress * -180;   // pushes it back into the screen
                const opacity = 1 - progress * 0.9;

                heroVisual.style.transform =
                    `perspective(1400px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(${translateZ}px)`;
                heroVisual.style.opacity = opacity;
            }
            tiltTicking = false;
        }

        window.addEventListener('scroll', () => {
            if (!tiltTicking) {
                requestAnimationFrame(updateHeroTilt);
                tiltTicking = true;
            }
        });

        updateHeroTilt();
    }
});

    /* ==========================================================================
       THREE.JS 3D PARTICLE SCATTER/REJOIN ANIMATION
       Creates a particle sphere that scatters and rejoins based on scroll.
       ========================================================================== */
    const container = document.getElementById('three-js-container');
    if (container && typeof THREE !== 'undefined') {
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        container.appendChild(renderer.domElement);

        // Particle System Settings
        const particleCount = 2000;
        const particles = new THREE.BufferGeometry();
        const initialPositions = new Float32Array(particleCount * 3);
        const currentPositions = new Float32Array(particleCount * 3);
        const randomDirections = new Float32Array(particleCount * 3);

        const radius = 15;
        for (let i = 0; i < particleCount; i++) {
            // Initial Sphere Distribution
            const phi = Math.acos(-1 + (2 * i) / particleCount);
            const theta = Math.sqrt(particleCount * Math.PI) * phi;

            const x = radius * Math.cos(theta) * Math.sin(phi);
            const y = radius * Math.sin(theta) * Math.sin(phi);
            const z = radius * Math.cos(phi);

            initialPositions[i * 3] = x;
            initialPositions[i * 3 + 1] = y;
            initialPositions[i * 3 + 2] = z;

            // Random scatter directions
            randomDirections[i * 3] = (Math.random() - 0.5) * 50;
            randomDirections[i * 3 + 1] = (Math.random() - 0.5) * 50;
            randomDirections[i * 3 + 2] = (Math.random() - 0.5) * 50;
        }

        particles.setAttribute('position', new THREE.BufferAttribute(currentPositions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0x8b5cf6,
            size: 0.15,
            transparent: true,
            opacity: 0.8,
            blending: THREE.AdditiveBlending
        });

        const particleSystem = new THREE.Points(particles, material);
        scene.add(particleSystem);

        camera.position.z = 40;

        // Animation Loop
        function animate() {
            requestAnimationFrame(animate);
            
            const scrollHeight = (document.documentElement.scrollHeight || document.body.scrollHeight) - document.documentElement.clientHeight;
            const scrollPercent = (document.documentElement.scrollTop || document.body.scrollTop) / (scrollHeight || 1);
            
            // Scatter effect: use a sine wave to make it scatter and rejoin periodically or just follow scroll
            // Let's make it scatter most at the middle of the page and rejoin at top/bottom
            const scatterFactor = Math.sin(scrollPercent * Math.PI) * 2; 

            const positions = particles.attributes.position.array;
            for (let i = 0; i < particleCount; i++) {
                positions[i * 3] = initialPositions[i * 3] + randomDirections[i * 3] * scatterFactor;
                positions[i * 3 + 1] = initialPositions[i * 3 + 1] + randomDirections[i * 3 + 1] * scatterFactor;
                positions[i * 3 + 2] = initialPositions[i * 3 + 2] + randomDirections[i * 3 + 2] * scatterFactor;
            }
            particles.attributes.position.needsUpdate = true;

            particleSystem.rotation.y += 0.002;
            particleSystem.rotation.x += 0.001;
            
            renderer.render(scene, camera);
        }

        window.addEventListener('resize', () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        });

        animate();
    }
