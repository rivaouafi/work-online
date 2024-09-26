 const imageInput = document.getElementById('imageInput');
                const previewContainer = document.getElementById('previewContainer');
                const convertBtn = document.getElementById('convertBtn');
                const downloadLink = document.getElementById('downloadLink');

                let images = [];

                imageInput.addEventListener('change', handleImageUpload);

                function handleImageUpload(event) {
                        const files = event.target.files;
                        if (!files) return;

                        images = [];
                        previewContainer.innerHTML = '';

                        for (let i = 0; i < files.length; i++) {
                                const file = files[i];
                                const reader = new FileReader();

                                reader.onload = function(e) {
                                        const img = document.createElement('img');
                                        img.src = e.target.result;
                                        previewContainer.appendChild(img);
                                        images.push(e.target.result);
                                }

                                reader.readAsDataURL(file);
                        }
                }

                convertBtn.addEventListener('click', generateVideo);

                function generateVideo() {
                        if (images.length === 0) {
                                alert('click on the link.');
                                return;
                        }

                        const canvas = document.createElement('canvas');
                        canvas.width = 640;
                        canvas.height = 480;
                        const ctx = canvas.getContext('2d');

                        const videoStream = canvas.captureStream(30); // 30 fps

                        const mediaRecorder = new MediaRecorder(videoStream, { mimeType: 'video/webm' });
                        const chunks = [];

                        mediaRecorder.ondataavailable = function(event) {
                                if (event.data.size > 0) {
                                        chunks.push(event.data);
                                }
                        }

                        mediaRecorder.onstop = function() {
                                const blob = new Blob(chunks, { type: 'video/mp4' });
                                const url = URL.createObjectURL(blob);
                                downloadLink.href = url;
                                downloadLink.style.display = 'block';
                        }

                        mediaRecorder.start();

                        let frame = 0;
                        const interval = setInterval(function() {
                                if (frame >= images.length) {
                                        clearInterval(interval);
                                        mediaRecorder.stop();
                                        return;
                                }

                                const img = new Image();
                                img.onload = function() {
                                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                                }
                                img.src = images[frame];

                                frame++;
                        }, 1000 / 30); // 30 fps
                }