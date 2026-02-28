/* =========================================
   MAIN JAVASCRIPT
========================================= */

document.addEventListener('DOMContentLoaded', () => {

    // 1. Header Scroll Effect
    const header = document.getElementById('header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Run once on load
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    }

    // 2. Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinksList = document.querySelectorAll('.nav-links a');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');

            // Toggle hamburger icon
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu on link click
    navLinksList.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.add('fa-bars');
                icon.classList.remove('fa-times');
            }
        });
    });

    // 3. Contact Form Submission Handling (Dual WhatsApp Buttons)
    const btnFranchi = document.getElementById('btn-franchi');
    const btnCaronni = document.getElementById('btn-caronni');
    const formError = document.getElementById('form-error');

    // Function to handle WhatsApp sending
    const sendToWhatsApp = (targetPhone) => {
        // Get form values
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const serviceNode = document.getElementById('service');
        const service = serviceNode ? serviceNode.value : '';
        const message = document.getElementById('message').value.trim();

        // Basic validation for required fields
        if (!name || !email || !message) {
            if (formError) {
                formError.style.display = 'block';
                setTimeout(() => {
                    formError.style.display = 'none';
                }, 5000);
            }
            return;
        }

        // Hide error if previously shown and fields are now valid
        if (formError) formError.style.display = 'none';

        const serviceText = service ? service.toUpperCase() : 'Non specificato';

        // Construct WhatsApp message
        const waMessage = `Ciao, sono ${name}.\n\n` +
            `Vorrei informazioni per il servizio di: ${serviceText}.\n\n` +
            `I miei contatti:\n` +
            `Email: ${email}\n` +
            `Telefono: ${phone || 'Non specificato'}\n\n` +
            `Messaggio:\n${message}`;

        // URL Encode the message
        const encodedMessage = encodeURIComponent(waMessage);

        // Open WhatsApp in a new tab
        const waUrl = `https://wa.me/${targetPhone}?text=${encodedMessage}`;
        window.open(waUrl, '_blank');

        // Optional: reset form after sending
        const contactForm = document.getElementById('contact-form');
        if (contactForm) contactForm.reset();
    };

    // Event listeners for the two buttons
    if (btnFranchi) {
        btnFranchi.addEventListener('click', () => {
            sendToWhatsApp('393479183726'); // Paolo Franchi's number
        });
    }

    if (btnCaronni) {
        btnCaronni.addEventListener('click', () => {
            sendToWhatsApp('393391628652'); // Paolo Caronni's number
        });
    }

    // 4. Initialize AOS Animations
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            once: true,
            offset: 100
        });
    }

    // 5. Dynamic Footer Year
    const yearSpan = document.getElementById('current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // 6. Scroll to Top Button
    const scrollTopBtn = document.getElementById('scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // 7. Initialize GLightbox
    if (typeof GLightbox !== 'undefined') {
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            loop: true,
            autoplayVideos: true
        });
    }

});
