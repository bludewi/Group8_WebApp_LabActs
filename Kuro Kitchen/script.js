/* --- DRAG TO SCROLL CAROUSEL FUNCTIONALITY --- */
const sliders = document.querySelectorAll('.scroll-track');

sliders.forEach(slider => {
    let isDown = false;
    let startX;
    let scrollLeft;

    function startDrag(e) {
        isDown = true;
        slider.classList.add('active');
        startX = e.pageX - slider.offsetLeft;
        scrollLeft = slider.scrollLeft;
    }

    function stopDrag() {
        isDown = false;
        slider.classList.remove('active');
    }

    function dragMove(e) {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - slider.offsetLeft;
        const walk = (x - startX) * 2;
        slider.scrollLeft = scrollLeft - walk;
    }

    slider.addEventListener('mousedown', startDrag);
    slider.addEventListener('mouseleave', stopDrag);
    slider.addEventListener('mouseup', stopDrag);
    slider.addEventListener('mousemove', dragMove);
});

/* --- INITIAL LOAD POSITION FOR RIGHT-ALIGNED INTRO BOXES --- */
window.addEventListener('load', () => {
    // Bento Boxes Track
    const bento = document.getElementById('bentoScrollTrack');
    if (bento) {
        bento.scrollLeft = bento.scrollWidth;
    }

    // Desserts Track
    const desserts = document.getElementById('dessertsScrollTrack');
    if (desserts) {
        desserts.scrollLeft = desserts.scrollWidth;
    }
});

/* --- SMOOTH SCROLL OFFSET FIX FOR SUB-NAVIGATION ANCHORS & VIEW MENU BUTTON --- */
window.addEventListener('load', () => {
    // If arriving with a hash anchor (e.g. #starters from index.html)
    if (window.location.hash) {
        scrollToTarget(window.location.hash);
    }
});

// Intercept clicks on sub-nav links to apply the fixed header offset
document.querySelectorAll('.subnav-links-container a').forEach(link => {
    link.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId && targetId.startsWith('#')) {
            e.preventDefault();
            scrollToTarget(targetId);
            // Optionally update URL hash without sudden browser jump
            history.pushState(null, null, targetId);
        }
    });
});

// Helper function to handle precise scrolling position below the fixed header
function scrollToTarget(selector) {
    const targetElement = document.querySelector(selector);
    if (targetElement) {
        setTimeout(() => {
            const headerOffset = 130; // Accounts for header height and subnav bar spacing
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: "smooth"
            });
        }, 50);
    }
}