// script.js

document.addEventListener('DOMContentLoaded', () => {

    // 1. Scroll-Triggered Content (Intersection Observer - Apple style)
    const revealElements = document.querySelectorAll('.scroll-reveal, .scale-in');

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Délai d'apparition basé sur la classe (pour des effets en chaîne)
                const delay = parseFloat(entry.target.getAttribute('data-delay') || 0);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                    observer.unobserve(entry.target);
                }, delay * 1000);
            }
        });
    }, {
        threshold: 0.15 // Déclenchement à 15% de visibilité
    });

    revealElements.forEach(element => {
        observer.observe(element);
    });


    // 2. Header Style au Scroll (similaire au site Apple)
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.9)';
            header.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.5)';
        } else {
            header.style.backgroundColor = 'rgba(5, 5, 5, 0.7)';
            header.style.boxShadow = 'none';
        }
    });

    // 3. Animation Parallax sur l'Image Héro (sur index.html)
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.pageYOffset;
            // Déplacement très subtil (Apple-like)
            heroImage.style.transform = `translateY(${scrollPosition * 0.1}px) scale(1.0)`;
        });
    }

});