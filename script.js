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

    // 4. Galerie Photographique - Projet École
    const photos = [
        { 
            src: 'assets/images/lightbox_face.jpg', 
            alt: 'Portrait éclairé par une lumière chaude, projet d\'école en photographie',
            title: 'Portrait Frontal',
            description: 'Portrait éclairé par une lumière chaude — Projet d\'école en photographie'
        },
        { 
            src: 'assets/images/lightbox_side.jpg', 
            alt: 'Vue latérale éclairée dans l\'ombre, projet d\'école en photographie',
            title: 'Vue Latérale',
            description: 'Vue latérale éclairée dans l\'ombre — Projet d\'école en photographie'
        }
    ];

    // Fonction pour générer dynamiquement la galerie (optionnel - déjà en HTML)
    // Cette structure de données peut être utilisée pour étendre la galerie facilement
    const photoGallery = document.querySelector('.photo-gallery');
    if (photoGallery && photoGallery.children.length === 0) {
        // Génération dynamique seulement si la galerie est vide
        photos.forEach((photo, index) => {
            const photoItem = document.createElement('div');
            photoItem.className = 'photo-item scroll-reveal fade-in-photo';
            photoItem.setAttribute('data-delay', (0.4 + index * 0.3).toString());
            
            photoItem.innerHTML = `
                <img src="${photo.src}" alt="${photo.alt}" class="photo-img">
                <div class="photo-caption">
                    <h4>${photo.title}</h4>
                    <p>${photo.description}</p>
                </div>
            `;
            
            photoGallery.appendChild(photoItem);
            observer.observe(photoItem); // Observer pour l'animation au scroll
        });
    }

});