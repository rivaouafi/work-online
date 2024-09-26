document.addEventListener("DOMContentLoaded", function() {
        const canvas = document.getElementById("canvas");
        const ctx = canvas.getContext("2d");
        const fileInput = document.getElementById("file-input");
        const colorPicker = document.getElementById("color-picker");
        const downloadBtn = document.getElementById("download-btn");

        let isDrawing = false;
        let lastX = 0;
        let lastY = 0;

        fileInput.addEventListener("change", function(e) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = function(event) {
                const img = new Image();
                img.onload = function() {
                    canvas.width = img.width;
                    canvas.height = img.height;
                    ctx.drawImage(img, 0, 0);
                };
                img.src = event.target.result;
            };
            reader.readAsDataURL(file);
        });

        canvas.addEventListener("mousedown", function(e) {
            isDrawing = true;
            [lastX, lastY] = [e.offsetX, e.offsetY];
        });

        canvas.addEventListener("mousemove", function(e) {
            if (isDrawing) {
                const color = colorPicker.value;
                ctx.strokeStyle = color;
                ctx.lineCap = "round";
                ctx.lineWidth = 5;
                ctx.beginPath();
                ctx.moveTo(lastX, lastY);
                ctx.lineTo(e.offsetX, e.offsetY);
                ctx.stroke();
                [lastX, lastY] = [e.offsetX, e.offsetY];
            }
        });

        canvas.addEventListener("mouseup", function() {
            isDrawing = false;
        });

        downloadBtn.addEventListener("click", function() {
            const dataURL = canvas.toDataURL("image/jpeg");
            const link = document.createElement("a");
            link.href = dataURL;
            link.download = "drawn_image.jpg";
            link.click();
        });
    });