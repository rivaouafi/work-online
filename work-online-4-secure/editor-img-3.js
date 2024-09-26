    document.addEventListener('DOMContentLoaded', () => {
        const fileInput = document.getElementById('fileInput');
        const loadButton = document.getElementById('loadButton');
        const filterSelect = document.getElementById('filterSelect');
        const applyFilterButton = document.getElementById('applyFilterButton');
        const canvas = document.getElementById('canvas');
        const ctx = canvas.getContext('2d');
        const downloadButton = document.getElementById('downloadButton');
        let image;

        loadButton.addEventListener('click', () => {
                fileInput.click();
        });

        fileInput.addEventListener('change', (e) => {
                const file = e.target.files[0];
                const reader = new FileReader();
                reader.onload = () => {
                        const img = new Image();
                        img.onload = () => {
                                canvas.width = img.width;
                                canvas.height = img.height;
                                ctx.drawImage(img, 0, 0);
                                image = img;
                        };
                        img.src = reader.result;
                };
                reader.readAsDataURL(file);
        });

        applyFilterButton.addEventListener('click', () => {
                const selectedFilter = filterSelect.value;
                if (selectedFilter === 'none') {
                        ctx.drawImage(image, 0, 0);
                } else {
                        applyFilter(selectedFilter);
                }
        });

        function applyFilter(filter) {
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                let data = imageData.data;

                switch (filter) {
                        case 'sepia':
                                for (let i = 0; i < data.length; i += 4) {
                                        const r = data[i];
                                        const g = data[i + 1];
                                        const b = data[i + 2];
                                        data[i] = Math.min(255, 0.393 * r + 0.769 * g + 0.189 * b);
                                        data[i + 1] = Math.min(255, 0.349 * r + 0.686 * g + 0.168 * b);
                                        data[i + 2] = Math.min(255, 0.272 * r + 0.534 * g + 0.131 * b);
                                }
                                break;
                        case 'blur':
                                ctx.filter = 'blur(5px)';
                                break;
                        case 'blackwhite':
                                for (let i = 0; i < data.length; i += 4) {
                                        const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
                                        data[i] = avg;
                                        data[i + 1] = avg;
                                        data[i + 2] = avg;
                                }
                                break;
                        case 'grayscale':
                                for (let i = 0; i < data.length; i += 4) {
                                        const grayscale = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
                                        data[i] = grayscale;
                                        data[i + 1] = grayscale;
                                        data[i + 2] = grayscale;
                                }
                                break;
                }

                ctx.putImageData(imageData, 0, 0);
                ctx.filter = 'none';
        }

        downloadButton.addEventListener('click', () => {
                const dataURL = canvas.toDataURL('image/jpeg');
                downloadButton.href = dataURL;
        });
});
