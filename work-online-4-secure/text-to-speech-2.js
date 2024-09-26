document.getElementById('openButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', function() {
    const file = this.files[0];
    const reader = new FileReader();

    reader.onload = function(e) {
        const text = e.target.result;
        document.getElementById('textDisplay').innerText = text;
    };

    reader.readAsText(file);
});

document.getElementById('convertButton').addEventListener('click', function() {
    const text = document.getElementById('textDisplay').innerText;
    const speech = new SpeechSynthesisUtterance(text);
    const synth = window.speechSynthesis;

    synth.speak(speech);

    speech.onend = function() {
        const blob = new Blob([text], { type: 'audio/mp3' });
        const url = URL.createObjectURL(blob);
        const link = document.getElementById('downloadLink');
        link.href = url;
        link.style.display = 'inline';
    };
});
