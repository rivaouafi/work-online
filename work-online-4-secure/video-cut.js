   document.addEventListener("DOMContentLoaded", function() {
    const videoInput = document.getElementById('videoInput');
    const videoPlayer = document.getElementById('videoPlayer');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const trimBtn = document.getElementById('trimBtn');
    const startTimeInput = document.getElementById('startTime');
    const endTimeInput = document.getElementById('endTime');

    let isPlaying = false;
    let trimStart = 0;
    let trimEnd = 10;

    // Play or pause the video
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            videoPlayer.pause();
            playPauseBtn.textContent = 'Play';
        } else {
            videoPlayer.play();
            playPauseBtn.textContent = 'Pause';
        }
        isPlaying = !isPlaying;
    });

    // Update trim start and end times based on user input
    startTimeInput.addEventListener('input', function() {
        trimStart = parseFloat(startTimeInput.value);
    });

    endTimeInput.addEventListener('input', function() {
        trimEnd = parseFloat(endTimeInput.value);
    });

    // Trim the video and download
    trimBtn.addEventListener('click', function() {
        const blob = videoPlayer.captureStream().getVideoTracks()[0].content;
        const trimmedBlob = new Blob([blob], { type: 'video/mp4' });
        const trimmedUrl = URL.createObjectURL(trimmedBlob);

        const a = document.createElement('a');
        a.href = trimmedUrl;
        a.download = 'trimmed_video.mp4';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    });

    // Listen for file selection and load the video
    videoInput.addEventListener('change', function() {
        const file = this.files[0];
        const videoURL = URL.createObjectURL(file);
        videoPlayer.src = videoURL;
    });

    // Update trim controls when the video is loaded
    videoPlayer.addEventListener('loadedmetadata', function() {
        if (videoPlayer.duration) {
            startTimeInput.max = videoPlayer.duration;
            endTimeInput.max = videoPlayer.duration;
        }
    });

    // Update video playback time based on trim controls
    videoPlayer.addEventListener('timeupdate', function() {
        if (videoPlayer.currentTime < trimStart || videoPlayer.currentTime > trimEnd) {
            videoPlayer.currentTime = trimStart;
        }
    });
});


