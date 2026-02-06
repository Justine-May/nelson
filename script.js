const track = document.getElementById('carousel-track');
const cards = document.querySelectorAll('.carousel-card');
const dotContainer = document.getElementById('dot-container');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('nav-links');

// Restored Hamburger Toggle
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Generate Dots
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

    textArea.style.opacity = '0';
    nextBg.style.backgroundImage = `url('${newImageUrl}')`;
    nextBg.classList.add('zoom-active');

    setTimeout(() => {
        slideTitle.innerHTML = selectedCard.dataset.title;
        slideDesc.innerHTML = selectedCard.dataset.desc;
        textArea.style.opacity = '1';
        mainBg.style.backgroundImage = `url('${newImageUrl}')`;
        nextBg.classList.remove('zoom-active');
    }, 1200); 

    cards.forEach(c => c.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));
    
    selectedCard.classList.add('active');
    dots[index].classList.add('active');

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
let startX, scrollLeft;
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

// Add this to the bottom of script.js
const contactForm = document.getElementById('contactForm');
const statusMsg = document.getElementById('formStatus');
const submitBtn = document.getElementById('submitBtn');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent page reload

    // Change button state
    submitBtn.innerText = "Sending...";
    submitBtn.disabled = true;

    const scriptURL = 'https://script.google.com/macros/s/AKfycbxEnSHgahHLqgef0GbtYC_GhA9HrvqQb04yJxpvIykK3gP0f4Etzy6DWxpBLEkEs-zp/exec'; // <--- PASTE YOUR URL HERE
    const formData = new FormData(contactForm);

    // Convert FormData to URL parameters for e.parameter in Apps Script
    const queryString = new URLSearchParams(formData).toString();

    fetch(`${scriptURL}?${queryString}`, {
        method: 'POST'
    })
    .then(response => {
        statusMsg.style.display = "block";
        statusMsg.style.color = "#28a745"; // Success green
        statusMsg.innerText = "Success! Your message has been sent.";
        contactForm.reset();
    })
    .catch(error => {
        statusMsg.style.display = "block";
        statusMsg.style.color = "#dc3545"; // Error red
        statusMsg.innerText = "Oops! Something went wrong. Please try again.";
        console.error('Error!', error.message);
    })
    .finally(() => {
        submitBtn.innerText = "Submit";
        submitBtn.disabled = false;
    });
});