document.addEventListener('DOMContentLoaded', () => {
    // Scroll Reveal Animation Initialization
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Trigger only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach(el => observer.observe(el));

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Adjust for sticky header height
                const headerOffset = 70;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    // Walking Cat Logic
    const catContainer = document.getElementById('cat-container');
    let pos = -150;
    let speed = 2;
    let direction = 1; // 1 for right, -1 for left

    function animateCat() {
        pos += speed * direction;
        catContainer.style.left = pos + 'px';

        // Boundary check
        if (pos > window.innerWidth) {
            direction = -1;
            catContainer.style.transform = 'scaleX(-1)';
        } else if (pos < -150) {
            direction = 1;
            catContainer.style.transform = 'scaleX(1)';
        }

        requestAnimationFrame(animateCat);
    }

    // Start walking
    animateCat();

    // Interaction: Jump on click
    catContainer.addEventListener('click', () => {
        if (!catContainer.classList.contains('jumping')) {
            catContainer.classList.add('jumping');
            setTimeout(() => {
                catContainer.classList.remove('jumping');
            }, 500);
        }
    });
});
