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