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

    // Trigger Text Animation
    textArea.classList.add('text-animating');

    // Trigger Background Sync with Crossfade
    nextBg.style.backgroundImage = `url('${newImageUrl}')`;
    nextBg.classList.add('fade-in');

    setTimeout(() => {
        // Update content mid-fade
        slideTitle.innerHTML = selectedCard.dataset.title;
        slideDesc.innerHTML = selectedCard.dataset.desc;
        textArea.classList.remove('text-animating');

        // Swap permanent BG and reset overlay
        mainBg.style.backgroundImage = `url('${newImageUrl}')`;
        nextBg.classList.remove('fade-in');
    }, 500);

    // Update States
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    selectedCard.classList.add('active');
    dots[index].classList.add('active');

    // Smooth Scroll to Card
    track.scrollTo({
        left: selectedCard.offsetLeft - track.offsetLeft - 20,
        behavior: 'smooth'
    });
}

// 2. Drag to Scroll Logic
let isDown = false;
let startX;
let scrollLeft;

track.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - track.offsetLeft;
    scrollLeft = track.scrollLeft;
    track.style.cursor = 'grabbing';
});

track.addEventListener('mouseleave', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mouseup', () => {
    isDown = false;
    track.style.cursor = 'grab';
});

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2;
    track.scrollLeft = scrollLeft - walk;
});