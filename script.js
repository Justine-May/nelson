document.addEventListener('DOMContentLoaded', () => {
    const blocks = document.querySelectorAll('.story-block');
    const hotspots = document.querySelectorAll('.hotspot');

    // 1. Reveal text on scroll (Intersection Observer)
    const observerOptions = {
        threshold: 0.6
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Potential logic to change background image based on section
                console.log("Viewing section:", entry.target.id);
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, observerOptions);

    blocks.forEach(block => observer.observe(block));

    // 2. Hotspot Interactions
    hotspots.forEach(spot => {
        spot.addEventListener('click', () => {
            alert("Information: " + spot.getAttribute('data-info'));
        });
    });
});