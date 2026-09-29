/**
 * Lilly Grace Pilli - Portfolio Interactive Scripts
 * Handles Navigation, Smooth Scrolling, Form Interactivity, and UI Enhancements
 */

document.addEventListener('DOMContentLoaded', () => {
    // ----------------------------------------------------
    // 1. Sticky Navbar & Active Section Scrollspy
    // ----------------------------------------------------
    const navbar = document.querySelector('.custom-navbar');
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;

        // Navbar scrolled shadow effect
        if (scrollPosition > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top button visibility
        if (scrollPosition > 400) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }

        // Scrollspy link highlighting
        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const correspondingLink = document.querySelector(`.nav-link[href*="#${sectionId}"]`);

            if (scrollPosition > sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                if (correspondingLink) {
                    correspondingLink.classList.add('active');
                }
            }
        });
    });

    // ----------------------------------------------------
    // 2. Mobile Menu Collapse on Link Click
    // ----------------------------------------------------
    const navbarCollapse = document.getElementById('navbarNav');
    const bsCollapse = navbarCollapse ? new bootstrap.Collapse(navbarCollapse, { toggle: false }) : null;

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth < 992 && navbarCollapse && navbarCollapse.classList.contains('show')) {
                bsCollapse.toggle();
            }
        });
    });

    // ----------------------------------------------------
    // 3. Smooth Scroll Back To Top
    // ----------------------------------------------------
    if (backToTopBtn) {
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // ----------------------------------------------------
    // 4. Contact Form Handling
    // ----------------------------------------------------
    const contactForm = document.getElementById('portfolioContactForm');
    const formAlert = document.getElementById('formAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            // Client-side visual feedback demonstration
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.innerHTML;

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Sending...';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;

                if (formAlert) {
                    formAlert.style.display = 'block';
                    formAlert.className = 'alert alert-success mt-3';
                    formAlert.innerHTML = '<i class="fas fa-check-circle me-2"></i> Thank you! Your message has been sent successfully. I will get back to you soon.';
                }

                contactForm.reset();

                // Auto-dismiss alert after 6 seconds
                setTimeout(() => {
                    if (formAlert) {
                        formAlert.style.display = 'none';
                    }
                }, 6000);
            }, 1200);
        });
    }
});
