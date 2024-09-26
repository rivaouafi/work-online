            window.onload = function() {
                const canvas1 = document.getElementById('canvas1');
                const ctx = canvas1.getContext('2d');
                const fileInput = document.getElementById('fileInput1');
                const stickers = document.querySelectorAll('.sticker');
                const volume = document.getElementById('volume');
                const downloadBtnm = document.getElementById('downloadBtnm');
                let image;
                let selectedSticker = null;

                fileInput.addEventListener('change', function(e) {
                                const file = e.target.files[0];
                                const reader = new FileReader();

                                reader.onload = function(event) {
                                                const img = new Image();
                                                img.onload = function() {
                                                                canvas1.width = img.width;
                                                                canvas1.height = img.height;
                                                                ctx.drawImage(img, 0, 0);
                                                                image = img;
                                                };
                                                img.src = event.target.result;
                                };

                                reader.readAsDataURL(file);
                });

                stickers.forEach(sticker => {
                                sticker.addEventListener('click', function() {
                                                selectedSticker = sticker;
                                });
                });

                canvas1.addEventListener('click', function(e) {
                                if (selectedSticker && image) {
                                                const scaleFactor = parseFloat(volume.value);
                                                const x = e.offsetX - selectedSticker.width / 2;
                                                const y = e.offsetY - selectedSticker.height / 2;
                                                ctx.drawImage(selectedSticker, x, y, selectedSticker.width * scaleFactor, selectedSticker.height * scaleFactor);
                                }
                });

                downloadBtnm.addEventListener('click', function() {
                                const link = document.createElement('a');
                                link.download = 'image_with_stickers.jpg';
                                link.href = canvas1.toDataURL('image/jpeg');
                                link.click();
                });
};
