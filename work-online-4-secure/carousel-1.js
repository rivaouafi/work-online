   const carousel = document.querySelector('.carousel');
        let currentIndex = 0;
        function slide(direction) {
            const imageWidth = carousel.clientWidth;
            currentIndex += direction;
            if (currentIndex < 0) {
                currentIndex = carousel.children.length - 1;
            } else if (currentIndex >= carousel.children.length) {
                currentIndex = 0;
            }
            carousel.style.transform = `translateX(-${currentIndex * imageWidth}px)`;
        }