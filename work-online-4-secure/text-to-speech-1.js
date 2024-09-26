  const textInput = document.getElementById('text-to-convert');

    const femaleVoice = document.getElementById('female');
    const maleVoice = document.getElementById('male');
    const audio = document.getElementById('audio');
    const voiceSelect = document.getElementById('voice-select');

    function convertToSpeech() {
        const text = textInput.value;
        const voice = maleVoice.checked ? 'male' : 'female';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speechSynthesis.getVoices().find(v => v.name === voice);
        speechSynthesis.speak(utterance);
        audio.src = URL.createObjectURL(new Blob([text], { type: 'audio/mp3' }));
    }

         // Fetch available voices and populate the dropdown
    function populateVoiceList() {
        speechSynthesis.onvoiceschanged = function() {
            const voices = speechSynthesis.getVoices();
            voices.forEach(voice => {
                const option = document.createElement('option');
                option.textContent = voice.name + ' (' + voice.lang + ')';
                option.setAttribute('value', voice.name);
                voiceSelect.appendChild(option);
                 if (voice.lang.startsWith('ru')) { // Filter Russian voices
                    const option = document.createElement('option');
                    option.value = voice.name;
                    option.textContent = voice.name;
                    voicesSelect.appendChild(option);
                }

                  if (voice.lang.startsWith('ar')) { // Filter Russian voices
                    const option = document.createElement('option');
                    option.value = voice.name;
                    option.textContent = voice.name;
                    voicesSelect.appendChild(option);
                }



            });
        };
    }

    populateVoiceList();

    // Function to speak the entered text
    function speakText() {
        const text = textInput.value;
        const selectedVoice = voiceSelect.value;
        const voices = speechSynthesis.getVoices();
        const utterance = new SpeechSynthesisUtterance(text);
        const selectedVoiceObj = voices.find(voice => voice.name === selectedVoice);
        if (selectedVoiceObj) {
            utterance.voice = selectedVoiceObj;
            speechSynthesis.speak(utterance);
            if (voiceName) {
                utterance.voice = speechSynthesis.getVoices().find(voice => voice.name === voiceName);
            }
        } else {
            alert('Voice not found');
        }
    }




    function saveAsMP3() {
        const text = textInput.value;
        const voice = maleVoice.checked ? 'male' : 'female';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = speechSynthesis.getVoices().find(v => v.name === voice);
        const audioBlob = new Blob([text], { type: 'audio/mp3' });
        const url = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.style.display = 'yes';
        a.href = url;
        a.download = 'speech.mp3';
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
    }