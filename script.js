gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    // Hero animation
    const tl = gsap.timeline();
    tl.from(".glass-nav", { y: -100, opacity: 0, duration: 0.8 })
      .from(".hero-text h1", { x: -50, opacity: 0, duration: 0.8 }, "-=0.4")
      .from(".hero-text p", { y: 30, opacity: 0, duration: 0.8 }, "-=0.6")
      .from(".hero-visual", { scale: 0.8, opacity: 0, duration: 1 }, "-=0.5");
    
    // Scroll animations
    const revealSections = document.querySelectorAll('.section, .stats-section, .footer-section');
    revealSections.forEach(section => {
        gsap.from(section, {
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
            },
            y: 50,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    });
});

// Custom Cursor (only on desktop)
const customCursor = document.querySelector('.custom-cursor');

if (customCursor && window.innerWidth > 768) {
    window.addEventListener('mousemove', (e) => {
        customCursor.style.transform = `translate(${e.clientX - 12}px, ${e.clientY - 12}px)`;
    });
    
    const hoverElements = document.querySelectorAll('a, button, .btn-resume, .btn-nav, .project-card, .stack-card, .cert-btn, .nav-links a');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            customCursor.style.transform = `scale(1.5)`;
            customCursor.style.backgroundColor = 'rgba(110,168,255,0.2)';
            customCursor.style.borderColor = '#a855f7';
        });
        el.addEventListener('mouseleave', () => {
            customCursor.style.transform = `scale(1)`;
            customCursor.style.backgroundColor = 'rgba(110,168,255,0.3)';
            customCursor.style.borderColor = '#6ea8ff';
        });
    });
}

// Scroll Progress Bar
window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (winScroll / height) * 100;
    const progressBar = document.querySelector('.progress-bar');
    if (progressBar) {
        progressBar.style.width = scrolled + '%';
    }
});

// Smooth Page Transitions
document.querySelectorAll('.nav-link, a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId !== '#' && targetId !== '#about') {
            e.preventDefault();
            const transition = document.querySelector('.page-transition');
            if (transition) {
                transition.style.transform = 'scaleY(1)';
                setTimeout(() => {
                    const target = document.querySelector(targetId);
                    if (target) {
                        target.scrollIntoView({ behavior: 'smooth' });
                    }
                    setTimeout(() => {
                        transition.style.transform = 'scaleY(0)';
                    }, 500);
                }, 500);
            }
        }
    });
});

// Mobile Menu Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');

if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        
        // Change icon
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });
    
    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
    if (navLinks && navLinks.classList.contains('active')) {
        if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinks.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    }
});

// Handle window resize - reinitialize cursor if needed
window.addEventListener('resize', () => {
    if (window.innerWidth > 768 && customCursor) {
        customCursor.style.display = 'block';
    } else if (customCursor) {
        customCursor.style.display = 'none';
    }
});