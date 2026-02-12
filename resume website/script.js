document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Lenis Smooth Scroll
    const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        smoothWheel: true,
        wheelMultiplier: 1,
        smoothTouch: false,
        touchMultiplier: 2,
        infinite: false,
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Synchronize Lenis with GSAP ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => {
        lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    // 2. Custom Cursor Follower
    const cursor = document.querySelector(".cursor-follower");
    const isMobile = window.matchMedia("(max-width: 768px)").matches || ('ontouchstart' in window);

    if (!isMobile && cursor) {
        document.addEventListener("mousemove", (e) => {
            gsap.to(cursor, {
                x: e.clientX,
                y: e.clientY,
                duration: 0.5,
                ease: "power2.out"
            });
        });

        // Cursor interaction on links and buttons
        const hoverElements = document.querySelectorAll("a, button, .interest-tag, .project-card, .showcase-item");
        hoverElements.forEach(el => {
            el.addEventListener("mouseenter", () => {
                gsap.to(cursor, {
                    scale: 3,
                    backgroundColor: "rgba(139, 92, 246, 0.3)",
                    mixBlendMode: "normal",
                    duration: 0.3
                });
            });
            el.addEventListener("mouseleave", () => {
                gsap.to(cursor, {
                    scale: 1,
                    backgroundColor: "#8B5CF6",
                    mixBlendMode: "difference",
                    duration: 0.3
                });
            });
        });
    } else if (cursor) {
        cursor.style.display = 'none';
    }

    // 3. GSAP Animations
    gsap.registerPlugin(ScrollTrigger);

    // Hero Text Animation
    const heroTl = gsap.timeline();
    heroTl.from(".hero-name", {
        y: 100,
        opacity: 0,
        duration: 1.5,
        ease: "power4.out"
    })
        .from(".hero-title", {
            opacity: 0,
            y: 20,
            duration: 1,
            ease: "power3.out"
        }, "-=0.8")
        .from(".profile-container", {
            scale: 0.8,
            opacity: 0,
            duration: 1.2,
            ease: "back.out(1.7)"
        }, "-=0.5");

    // Reveal Sections on Scroll
    const sections = gsap.utils.toArray("section:not(.hero)");
    sections.forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 50,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Project Cards Reveal
    const cards = gsap.utils.toArray(".project-card");
    cards.forEach((card, i) => {
        gsap.from(card, {
            opacity: 0,
            x: i % 2 === 0 ? -30 : 30,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: card,
                start: "top 90%",
                toggleActions: "play none none reverse"
            }
        });
    });

    // Showcase Items Reveal
    const showcaseItems = gsap.utils.toArray(".showcase-item");
    gsap.from(showcaseItems, {
        opacity: 0,
        y: 30,
        stagger: 0.1,
        duration: 0.8,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".image-showcase",
            start: "top 85%",
            toggleActions: "play none none reverse"
        }
    });

    // Gradient Text Shimmer
    gsap.to(".gradient-text", {
        backgroundPosition: "200% center",
        duration: 5,
        repeat: -1,
        ease: "none"
    });
});
