const track = document.getElementById('carousel-track');
const cards = document.querySelectorAll('.carousel-card');
const dotContainer = document.getElementById('dot-container');

// 1. Generate Dots
cards.forEach((_, i) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (i === 0) dot.classList.add('active');
    dot.addEventListener('click', () => updateSlider(i));
    dotContainer.appendChild(dot);
});

function updateSlider(index) {
    const dots = document.querySelectorAll('.dot');
    const mainBg = document.getElementById('main-bg');
    const nextBg = document.getElementById('next-bg');
    const slideTitle = document.getElementById('slide-title');
    const slideDesc = document.getElementById('slide-desc');
    const textArea = document.querySelector('.text-area');
    
    const selectedCard = cards[index];
    const newImageUrl = selectedCard.dataset.bg;

    // Trigger text fade
    textArea.classList.add('text-animating');
    
    // Setup background layers
    nextBg.classList.remove('zoom-active');
    nextBg.style.backgroundImage = `url('${newImageUrl}')`;
    
    void nextBg.offsetWidth; // Trigger reflow

    // Activate 1200ms Zoom/Fade
    nextBg.classList.add('zoom-active');

    setTimeout(() => {
        // Update Content
        slideTitle.innerHTML = selectedCard.dataset.title;
        slideDesc.innerHTML = selectedCard.dataset.desc;
        textArea.classList.remove('text-animating');

        // Swap backgrounds and reset
        mainBg.style.backgroundImage = `url('${newImageUrl}')`;
        nextBg.classList.remove('zoom-active');
    }, 1200); 

    // Update States
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    selectedCard.classList.add('active');
    dots[index].classList.add('active');

    // Centering logic
    const trackWidth = track.offsetWidth;
    const cardOffset = selectedCard.offsetLeft;
    const cardWidth = selectedCard.offsetWidth;
    
    track.scrollTo({
        left: cardOffset - (trackWidth / 2) + (cardWidth / 2),
        behavior: 'smooth'
    });
}

// Drag Logic
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => isDown = false);
track.addEventListener('mouseup', () => isDown = false);

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
});