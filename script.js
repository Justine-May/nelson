// Register all necessary plugins
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

/**
 * 1. CINEMATIC INITIAL ENTRANCE
 * This handles the reveal when the page first loads
 */
window.addEventListener('load', () => {
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

    // Initial Zoom and Fade In of elements
    tl.fromTo(".main-photo", 
        { scale: 1.6, filter: "blur(10px)" }, 
        { scale: 1, filter: "blur(0px)", duration: 2.5 }
    )
    .fromTo(".hero-content .content-inner > *", 
        { opacity: 0, y: 50 }, 
        { opacity: 1, y: 0, stagger: 0.2, duration: 1.2 }, 
        "-=1.8" // Overlaps with the photo zoom
    )
    .fromTo(".site-header", 
        { y: -100, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1 }, 
        "-=1"
    );

    // Refresh ScrollTrigger after elements load to ensure correct positions
    setTimeout(() => {
        ScrollTrigger.refresh();
    }, 100);
});

/**
 * 2. TRUE ADAPTIVE HEADER LOGIC
 * Checks if the header is over a light or dark section
 */
const header = document.querySelector('.site-header');

// Handle Pill Appearance/Shadow
ScrollTrigger.create({
    start: "top -50",
    onUpdate: (self) => {
        if (self.scroll() > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }
});

// Theme Switching: Force Light Mode on specific sections (About & Gallery)
const lightSections = gsap.utils.toArray('.bio-intro, .gallery-container');
lightSections.forEach((section) => {
    ScrollTrigger.create({
        trigger: section,
        start: "top 80px",
        end: "bottom 80px",
        onEnter: () => header.classList.add('light-mode'),
        onLeave: () => header.classList.remove('light-mode'),
        onEnterBack: () => header.classList.add('light-mode'),
        onLeaveBack: () => header.classList.remove('light-mode'),
    });
});

/**
 * 3. HERO SCROLL ANIMATION (Zoom & Fadeout)
 */
const heroTimeline = gsap.timeline({
    scrollTrigger: {
        trigger: ".hero-section",
        start: "top top",
        end: "+=100%", 
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true
    }
});

heroTimeline
    .to(".main-photo", { scale: 1.3, ease: "none" }, 0)
    .to(".hero-content", { opacity: 0, y: -100, ease: "power2.inOut" }, 0)
    .to(".overlay", { backgroundColor: "rgba(0,0,0, 1)", ease: "none" }, 0)
    .to(".hero-visual", { opacity: 0, duration: 0.5 }); // Cinematic reveal of Bio

/**
 * 4. HORIZONTAL GALLERY (Editorial Style)
 */
const galleryWrapper = document.querySelector(".gallery-wrapper");
const galleryItems = gsap.utils.toArray(".gallery-item");

if (galleryWrapper) {
    const scrollTween = gsap.to(galleryItems, {
        xPercent: -100 * (galleryItems.length - 1),
        ease: "none",
        scrollTrigger: {
            trigger: ".gallery-container",
            pin: true,
            scrub: 1,
            start: "top top", 
            end: () => "+=" + galleryWrapper.scrollWidth,
            invalidateOnRefresh: true,
            snap: 1 / (galleryItems.length - 1)
        }
    });

    /**
     * 5. 3D FOCUS EFFECT (Center Zoom)
     */
    galleryItems.forEach((item) => {
        ScrollTrigger.create({
            trigger: item,
            containerAnimation: scrollTween,
            start: "left center",
            end: "right center",
            toggleClass: "active"
        });
    });
}

/**
 * 6. NAV LINK SMOOTH SCROLLING
 */
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const headerOffset = 80; // Offset for floating header
            
            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: targetSection,
                    offsetY: headerOffset,
                    autoKill: false
                },
                ease: "power4.inOut"
            });
        }
    });
});

/**
 * 6. NAV LINK SMOOTH SCROLLING
 * Automatically detects the link destination and scrolls smoothly
 */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // We calculate an offset so the header doesn't overlap the content
            // 80px is usually perfect for your floating capsule design
            const headerOffset = 80; 

            gsap.to(window, {
                duration: 1.5,
                scrollTo: {
                    y: targetSection,
                    offsetY: headerOffset,
                    autoKill: false
                },
                ease: "power4.inOut"
            });
        }
    });
});