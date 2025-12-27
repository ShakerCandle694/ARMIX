// Actualizar año en el footer
document.addEventListener('DOMContentLoaded', function() {
    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Smooth scroll para los enlaces de navegación
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Efecto parallax suave en el hero
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const heroHeight = hero.offsetHeight;
                if (scrolled < heroHeight) {
                    heroImage.style.transform = `translateY(${scrolled * 0.5}px) scale(${1 + scrolled * 0.0005})`;
                }
            }
        });
    }

    // Animación mejorada al hacer scroll para las tarjetas de servicios
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -80px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0) scale(1)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observar las tarjetas de servicios con efecto escalonado
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(50px) scale(0.95)';
        card.style.transition = `opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s, transform 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`;
        observer.observe(card);
    });

    // Animación para el título de servicios
    const servicesTitle = document.querySelector('.services-title');
    const servicesSubtitle = document.querySelector('.services-subtitle');
    
    if (servicesTitle && servicesSubtitle) {
        const titleObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.5 });

        servicesTitle.style.opacity = '0';
        servicesTitle.style.transform = 'translateY(-20px)';
        servicesTitle.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        servicesSubtitle.style.opacity = '0';
        servicesSubtitle.style.transform = 'translateY(-20px)';
        servicesSubtitle.style.transition = 'opacity 0.8s ease 0.2s, transform 0.8s ease 0.2s';

        titleObserver.observe(servicesTitle);
        titleObserver.observe(servicesSubtitle);
    }

    // Efecto de cursor en los botones (opcional, solo si el usuario tiene mouse)
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton && window.matchMedia('(pointer: fine)').matches) {
        ctaButton.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px) scale(1.05)';
        });
        
        ctaButton.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-3px) scale(1)';
        });
    }

    // Agregar efecto de carga progresiva para imágenes
    const serviceImages = document.querySelectorAll('.service-image');
    serviceImages.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
        });
        
        if (img.complete) {
            img.style.opacity = '1';
        } else {
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.5s ease';
        }
    });
});
