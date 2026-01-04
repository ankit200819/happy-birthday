// Initialize AOS (Animate On Scroll)
AOS.init({
    once: true,
    offset: 100,
    duration: 1000,
});

// DOM Elements
const entranceScreen = document.getElementById('entrance-screen');
const mainContent = document.getElementById('main-content');
const envelopeContainer = document.querySelector('.envelope-container');
const musicBtn = document.getElementById('music-toggle');
const bgMusic = document.getElementById('bg-music');
const celebrateBtn = document.getElementById('celebrate-btn');
const gallerySection = document.getElementById('gallery');

// --- 1. Entrance Animation ---
envelopeContainer.addEventListener('click', () => {
    // Open envelope
    entranceScreen.classList.add('open');

    // Play music (requires user interaction first, which this click provides)
    playMusic();

    // After animation, hide overlay and show main content
    setTimeout(() => {
        entranceScreen.classList.add('fade-out');
        mainContent.classList.remove('hidden');
        musicBtn.classList.remove('hidden');

        // Refresh AOS to detect new elements
        AOS.refresh();

        // Trigger initial confetti
        fireConfetti();
    }, 1000);
});

// --- 2. Music Controls ---
let isPlaying = true;

function playMusic() {
    bgMusic.volume = 0.5;
    bgMusic.play().then(() => {
        musicBtn.classList.add('playing');
        isPlaying = true;
    }).catch(e => {
        console.log("Autoplay blocked, waiting for interaction");
        isPlaying = false;
    });
}

musicBtn.addEventListener('click', () => {
    if (isPlaying) {
        bgMusic.pause();
        musicBtn.classList.remove('playing');
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>'; // Static icon
    } else {
        bgMusic.play();
        musicBtn.classList.add('playing');
        musicBtn.innerHTML = '<i class="fa-solid fa-music"></i>';
    }
    isPlaying = !isPlaying;
});

// --- 3. Celebrate Button & Confetti ---
celebrateBtn.addEventListener('click', () => {
    // 1. Play Music (if not already playing)
    if (!isPlaying) {
        playMusic();
    }

    // 2. Scroll to gallery
    gallerySection.scrollIntoView({ behavior: 'smooth' });

    // 3. Fire more confetti
    fireConfetti();
});

function fireConfetti() {
    const duration = 3000;
    const end = Date.now() + duration;

    (function frame() {
        // Launch confetti from left and right edges
        confetti({
            particleCount: 5,
            angle: 60,
            spread: 55,
            origin: { x: 0 },
            colors: ['#ff9a9e', '#fecfef', '#a18cd1']
        });
        confetti({
            particleCount: 5,
            angle: 120,
            spread: 55,
            origin: { x: 1 },
            colors: ['#ff9a9e', '#fecfef', '#a18cd1']
        });

        if (Date.now() < end) {
            requestAnimationFrame(frame);
        }
    }());
}

// --- 4. Magic Cursor Trail ---
document.addEventListener('mousemove', (e) => {
    createSparkle(e.clientX, e.clientY);
});

function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.classList.add('sparkle');

    // Randomize shape: heart or dot
    if (Math.random() > 0.5) {
        sparkle.innerHTML = '❤️';
        sparkle.style.fontSize = Math.random() * 10 + 5 + 'px';
    } else {
        sparkle.style.width = Math.random() * 5 + 2 + 'px';
        sparkle.style.height = sparkle.style.width;
        sparkle.style.background = '#ffd700'; // Gold dust
        sparkle.style.borderRadius = '50%';
    }

    sparkle.style.position = 'fixed';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'fade-up 1s ease-out forwards';

    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 1000);
}

// --- 5. Entrance Screen Animations (Butterflies & Hearts) ---
function createEntranceEffects() {
    const overlay = document.getElementById('entrance-screen');
    const icons = ['🦋', '💖', '✨', '💑'];
    const count = 12;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');
        el.innerText = icons[Math.floor(Math.random() * icons.length)];
        el.style.position = 'absolute';
        el.style.left = Math.random() * 100 + '%';
        el.style.top = Math.random() * 100 + '%';
        el.style.fontSize = Math.random() * 20 + 20 + 'px';
        el.style.opacity = 0;
        el.style.animation = `entranceFloat ${Math.random() * 3 + 4}s ease-in-out infinite`;
        el.style.animationDelay = Math.random() * 2 + 's';

        overlay.appendChild(el);
    }
}

// Add styles for sparkles dynamically
const styleSheet = document.createElement("style");
styleSheet.innerText = `
    @keyframes fade-up {
        0% { transform: translate(-50%, -50%) scale(1); opacity: 1; }
        100% { transform: translate(-50%, -150%) scale(0); opacity: 0; }
    }
    
    @keyframes entranceFloat {
        0% { transform: translateY(0) translateX(0) rotate(0deg); opacity: 0; }
        20% { opacity: 0.8; }
        50% { transform: translateY(-40px) translateX(20px) rotate(10deg); }
        80% { opacity: 0.8; }
        100% { transform: translateY(-100px) translateX(-20px) rotate(-10deg); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

createEntranceEffects();

// --- 5. Background Floating Elements ---
function createFloatingElements() {
    const container = document.getElementById('floating-elements');
    const icons = ['❤️', '🦋', '🌸', '✨', '💌', '🧸', '💖', '💐'];
    const phrases = ['I Love You', 'You are Magic', 'My Everything', 'Happy Birthday', 'Forever & Always', 'Soulmate', 'Cutie'];

    // Moderate count
    const count = 30;

    for (let i = 0; i < count; i++) {
        const el = document.createElement('div');

        const isPhrase = Math.random() > 0.6;

        if (isPhrase) {
            el.innerText = phrases[Math.floor(Math.random() * phrases.length)];
            el.className = 'floating-phrase';
            el.style.fontSize = Math.random() * 1.5 + 1.2 + 'rem';
            el.style.fontFamily = "'Dancing Script', cursive";
            el.style.color = '#ffffff';
            el.style.fontWeight = 'bold';
            el.style.textShadow = '0 2px 4px rgba(233, 30, 99, 0.5)';

            // CORRECTION: Avoid edges being cut off. 
            // Use 5vw - 20vw (Left) and 80vw - 95vw (Right)
            if (Math.random() > 0.5) {
                el.style.left = (Math.random() * 15 + 5) + 'vw';
            } else {
                el.style.left = (Math.random() * 15 + 75) + 'vw';
            }

        } else {
            el.innerText = icons[Math.floor(Math.random() * icons.length)];
            el.style.fontSize = Math.random() * 25 + 15 + 'px';
            el.style.left = Math.random() * 100 + 'vw';
        }

        el.style.position = 'fixed';
        el.style.top = Math.random() * 100 + 'vh';
        el.style.opacity = Math.random() * 0.4 + 0.3;

        el.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        el.style.zIndex = -1;
        el.style.pointerEvents = 'none';

        container.appendChild(el);
    }
}

// Add float keyframes if not exists
const floatStyle = document.createElement("style");
floatStyle.innerText = `
    @keyframes float {
        0% { transform: translateY(0) rotate(0deg); }
        50% { transform: translateY(-20px) rotate(10deg); }
        100% { transform: translateY(0) rotate(0deg); }
    }
`;
document.head.appendChild(floatStyle);

createFloatingElements();


// --- 6. 3D Tilt Effect for Gallery Cards ---
const cards = document.querySelectorAll('.glass-card');

cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const sensitivity = 20;
        const rotateX = (y / rect.height - 0.5) * -sensitivity;
        const rotateY = (x / rect.width - 0.5) * sensitivity;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
        card.classList.add('hover-active');
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.classList.remove('hover-active');
    });
});

// --- 7. Video Modal Logic ---
const videoCard = document.getElementById('video-card');
const modal = document.getElementById('video-modal');
const closeModal = document.querySelector('.close-modal');
const videoPlayer = document.getElementById('birthday-video');

if (videoCard && modal) {
    videoCard.addEventListener('click', () => {
        modal.classList.add('show');
        modal.classList.remove('hidden');
        // Auto-play if desired, or let user click play
        videoPlayer.play().catch(e => console.log("Video autoplay blocked", e));

        // Pause background music if playing? Optional.
        // if (isPlaying) bgMusic.pause();
    });

    closeModal.addEventListener('click', () => {
        closeVideoModal();
    });

    // Close on clicking outside content
    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            closeVideoModal();
        }
    });
}

function closeVideoModal() {
    modal.classList.remove('show');
    setTimeout(() => {
        modal.classList.add('hidden');
        videoPlayer.pause();
        videoPlayer.currentTime = 0; // Reset video

        // Resume bg music if it was playing? 
        // if (isPlaying && musicBtn.classList.contains('playing')) bgMusic.play();
    }, 300); // Wait for fade out
}

// --- 8. Special Message Modal ---
const messageBtn = document.getElementById('message-btn');
const messageModal = document.getElementById('message-modal');
const closeMessageBtn = document.querySelector('.close-message');

if (messageBtn && messageModal) {
    messageBtn.addEventListener('click', () => {
        messageModal.classList.remove('hidden');
        // Small delay to allow display:block to apply before adding opacity class
        setTimeout(() => {
            messageModal.classList.add('show');
            // Trigger confetti for celebration effect!
            fireConfetti();
        }, 10);
    });

    if (closeMessageBtn) {
        closeMessageBtn.addEventListener('click', () => {
            closeMessageModal();
        });
    }

    // Close on clicking outside
    window.addEventListener('click', (e) => {
        if (e.target == messageModal) {
            closeMessageModal();
        }
    });
}

function closeMessageModal() {
    messageModal.classList.remove('show');
    setTimeout(() => {
        messageModal.classList.add('hidden');
    }, 600); // Wait for transition
}
