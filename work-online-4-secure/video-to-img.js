 const textInput = document.getElementById('textInput');
    const lineSizeInput = document.getElementById('lineSize');
    const colorPicker = document.getElementById('colorPicker');
    const textAlignSelect = document.getElementById('textAlign');
    const fontFamilySelect = document.getElementById('fontFamily');
    const downloadButton = document.getElementById('downloadButton');

    function updateText() {
        textInput.style.fontSize = lineSizeInput.value + 'em';
        textInput.style.color = colorPicker.value;
        textInput.style.textAlign = textAlignSelect.value;
        textInput.style.fontFamily = fontFamilySelect.value;
    }

    downloadButton.addEventListener('click', function() {
        const textContent = textInput.value;
        const blob = new Blob([textContent], { type: 'text/plain' });
        const anchor = document.createElement('a');
        anchor.href = window.URL.createObjectURL(blob);
        anchor.download = 'text.txt';
        anchor.click();
        window.URL.revokeObjectURL(anchor.href);
    });

    lineSizeInput.addEventListener('input', updateText);
    colorPicker.addEventListener('input', updateText);
    textAlignSelect.addEventListener('change', updateText);
    fontFamilySelect.addEventListener('change', updateText);

    // Initial update
    updateText();