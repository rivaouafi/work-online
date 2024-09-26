 const imageInput = document.getElementById('imageInput');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const textSizeInput = document.getElementById('textSizeInput');
const colorPicker = document.getElementById('colorPicker');
const addTextBtn = document.getElementById('addTextBtn');
const downloadBtn = document.getElementById('downloadBtn');
let img;

// Handle image upload
imageInput.addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = function() {
        img = new Image();
        img.onload = function() {
            canvas.width = img.width;
            canvas.height = img.height;
            ctx.drawImage(img, 0, 0);
        }
        img.src = reader.result;
    }

    if (file) {
        reader.readAsDataURL(file);
    }
});

// Add text to canvas
addTextBtn.addEventListener('click', function() {
    const text = document.getElementById('textInput').value;
    const textSize = parseInt(textSizeInput.value);
    const textColor = colorPicker.value;

    ctx.font = `${textSize}px Arial`;
    ctx.fillStyle = textColor;
    ctx.fillText(text, 50, 50); // Change position as needed
});

// Download image
downloadBtn.addEventListener('click', function() {
    const dataURL = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'image.jpg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
});