 const audio = document.getElementById('audio');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const trimBtn = document.getElementById('trim-btn');
    const startTimeInput = document.getElementById('start-time');
    const endTimeInput = document.getElementById('end-time');
    const audioFileInput = document.getElementById('audio-file');

    let isPlaying = false;

    playPauseBtn.addEventListener('click', () => {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    trimBtn.addEventListener('click', () => {
        const start = parseFloat(startTimeInput.value);
        const end = parseFloat(endTimeInput.value);
        const source = audio.src;
        const trimmedSource = source + '#t=' + start + ',' + end;

        const xhr = new XMLHttpRequest();
        xhr.open('GET', trimmedSource, true);
        xhr.responseType = 'blob';

        xhr.onload = () => {
            const blob = xhr.response;
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'trimmed_audio.mp3';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        xhr.send();
    });

    audioFileInput.addEventListener('change', () => {
        const file = audioFileInput.files[0];
        const objectURL = URL.createObjectURL(file);
        audio.src = objectURL;
    });