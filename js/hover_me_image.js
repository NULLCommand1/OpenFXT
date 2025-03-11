const img = document.getElementById('hover-image');
        const originalSrc = './images/fake_me.jpg';
        const hoverSrc = './images/me.jpg';

        img.addEventListener('mouseenter', () => {
            img.classList.add('fade');
            setTimeout(() => {
                img.src = hoverSrc;
                img.classList.remove('fade');
            }, 250);
        });

        img.addEventListener('mouseleave', () => {
            img.classList.add('fade');
            setTimeout(() => {
                img.src = originalSrc;
                img.classList.remove('fade');
            }, 250);
        });