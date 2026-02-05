const track = document.getElementById('carousel-track');
const cards = document.querySelectorAll('.carousel-card');
const dotContainer = document.getElementById('dot-container');

// 1. Generate Dots based on number of cards
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
    const slideTitle = document.getElementById('slide-title');
    const slideDesc = document.getElementById('slide-desc');
    
    const selectedCard = cards[index];
    
    // Update BG and Text
    mainBg.style.backgroundImage = `url('${selectedCard.dataset.bg}')`;
    slideTitle.innerHTML = selectedCard.dataset.title;
    slideDesc.innerHTML = selectedCard.dataset.desc;

    // Update States
    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    selectedCard.classList.add('active');
    dots[index].classList.add('active');

    // Scroll to card
    track.scrollTo({
        left: selectedCard.offsetLeft - track.offsetLeft,
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
});

track.addEventListener('mouseleave', () => isDown = false);
track.addEventListener('mouseup', () => isDown = false);

track.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - track.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    track.scrollLeft = scrollLeft - walk;
});