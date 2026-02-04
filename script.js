// Initialize morphing background
function initMorphingBackground() {
    const morphingBg = document.getElementById('morphingBg');
    const shapes = 3; // Reduced from 5 to 3 for better performance

    for (let i = 0; i < shapes; i++) {
        const shape = document.createElement('div');
        shape.className = 'morph-shape';

        // Random properties
        const size = Math.random() * 200 + 100;
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const delay = Math.random() * 20;

        shape.style.width = `${size}px`;
        shape.style.height = `${size}px`;
        shape.style.left = `${left}%`;
        shape.style.top = `${top}%`;
        shape.style.animationDelay = `${delay}s`;

        morphingBg.appendChild(shape);
    }
}

// Initialize holographic grid
function initHolographicGrid() {
    const grid = document.getElementById('holographicGrid');
    // Grid is created with CSS, but we can add interactive effects
    document.addEventListener('mousemove', (e) => {
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;

        grid.style.transform = `translate(${x * 10}px, ${y * 10}px)`;
    });
}

// Magnetic button effect
function initMagneticButtons() {
    const magneticBtns = document.querySelectorAll('.magnetic-btn');

    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const deltaX = (x - centerX) / centerX;
            const deltaY = (y - centerY) / centerY;

            btn.style.transform = `translate(${deltaX * 10}px, ${deltaY * 10}px)`;
        });

        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
}

// Skill orb animation
function initSkillOrbs() {
    const skillOrbs = document.querySelectorAll('.skill-orb');

    skillOrbs.forEach(orb => {
        const skillLevel = orb.getAttribute('data-skill');
        orb.style.background = `conic-gradient(from 0deg, var(--accent) 0%, var(--accent-2) ${skillLevel}%, transparent ${skillLevel}%, transparent 100%)`;
    });
}

// Mobile menu toggle
function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    // Toggle menu when hamburger is clicked
    hamburger.addEventListener('click', (e) => {
        e.stopPropagation();
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close menu when a nav link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Close mobile menu
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
                
                // Smooth scroll to section
                setTimeout(() => {
                    targetSection.scrollIntoView({ 
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 300);
            }
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navLinks.contains(e.target)) {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
}

// Smooth scrolling for all navigation links
function initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Intersection Observer for animations
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(section);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initMobileMenu();
    initSmoothScrolling();
    initScrollAnimations();
    
    // Defer heavy animations for better initial load
    requestAnimationFrame(() => {
        initMagneticButtons();
        initSkillOrbs();
        
        // Further defer background animations
        setTimeout(() => {
            initMorphingBackground();
            initHolographicGrid();
        }, 100);
    });
});

// Add parallax effect to floating orbs
document.addEventListener('mousemove', (e) => {
    const orbs = document.querySelectorAll('.orb');
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
        const speed = (index + 1) * 0.5;
        const x = mouseX * speed * 100;
        const y = mouseY * speed * 100;

        orb.style.transform = `translate(${x}px, ${y}px)`;
    });
});
// Dynamic padding for hero section based on navbar height
function adjustHeroPadding() {
    const navbar = document.getElementById('navbar');
    const heroSection = document.getElementById('home');
    
    if (navbar && heroSection) {
        const navbarHeight = navbar.offsetHeight;
        heroSection.style.paddingTop = `calc(${navbarHeight}px + 2rem)`;
    }
}

// Call this function and also on window resize
document.addEventListener('DOMContentLoaded', () => {
    adjustHeroPadding();
    window.addEventListener('resize', adjustHeroPadding);
});