// Preloader
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    const count = document.querySelector('.count');
    let progress = 0;

    const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 1;
        if (progress >= 100) {
            progress = 100;
            count.textContent = progress;
            clearInterval(interval);
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                    animateHero();
                }, 600);
            }, 300);
        }
        count.textContent = progress;
    }, 50);
});

// Reveal Hero Elements
function animateHero() {
    const elements = document.querySelectorAll('.hero-text h1, .hero-text p, .hero-actions, .image-wrapper');
    elements.forEach((el, index) => {
        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
            el.style.transition = 'all 1s cubic-bezier(0.16, 1, 0.3, 1)';
        }, index * 200);
    });
}

// Reveal on Scroll (Intersection Observer)
const revealElements = document.querySelectorAll('.project-card, .about-section h2, .about-content, .contact-card');
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            entry.target.style.transition = 'all 1.2s cubic-bezier(0.16, 1, 0.3, 1)';
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(50px)';
    revealObserver.observe(el);
});

// Project Grid Interaction
const projectCards = document.querySelectorAll('.project-card');

projectCards.forEach(card => {
    const btn = card.querySelector('.project-expand-btn');

    const toggleBrief = () => {
        const isActive = card.classList.contains('active');

        // Close all other cards
        projectCards.forEach(c => {
            if (c !== card) c.classList.remove('active');
        });

        // Toggle current card
        card.classList.toggle('active');
    };

    btn.addEventListener('click', (e) => {
        e.stopPropagation();
        toggleBrief();
    });

    card.addEventListener('click', () => {
        if (!card.classList.contains('active')) {
            toggleBrief();
        }
    });
});

// Form Submission -> WhatsApp
const contactForm = document.getElementById('minimal-contact');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const name = document.getElementById('wa-name').value;
        const email = document.getElementById('wa-email').value;
        const message = document.getElementById('wa-message').value;
        
        const text = `Hello Ezz, my name is ${name} (${email}).\n\nHere are my project details:\n${message}`;
        const waLink = `https://wa.me/qr/QKIZYRU7NLDYI1?text=${encodeURIComponent(text)}`;
        
        window.open(waLink, '_blank');

        const btn = contactForm.querySelector('button');
        const originalText = btn.textContent;

        btn.textContent = 'Redirecting...';
        btn.style.background = '#00D1FF';
        btn.style.color = '#000';

        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
            btn.style.color = '';
            contactForm.reset();
        }, 3000);
    });
}

// Navbar Scroll Effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(0, 0, 0, 0.9)';
        navbar.style.padding = '0.6rem 2rem';
    } else {
        navbar.style.background = 'rgba(12, 12, 12, 0.6)';
        navbar.style.padding = '0.8rem 2rem';
    }
});
