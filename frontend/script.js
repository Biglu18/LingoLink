// --- Login Handler ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    alert("Login successful!");
    window.location.href = "dashboard.html";
  });
}

// --- Audio Translation ---
const translateBtn = document.getElementById('translateBtn');
if (translateBtn) {
  translateBtn.addEventListener('click', async () => {
    const audioFile = document.getElementById('audioFile').files[0];
    const sourceLang = document.getElementById('sourceLang').value;
    const targetLang = document.getElementById('targetLang').value;

    if (!audioFile || !sourceLang || !targetLang) {
      alert("Please upload an audio file and select both languages.");
      return;
    }

    const formData = new FormData();
    formData.append('audio', audioFile);
    formData.append('sourceLang', sourceLang);
    formData.append('targetLang', targetLang);

    try {
      const response = await fetch('http://127.0.0.1:5000/translate', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const err = await response.json();
        alert("Error: " + err.error);
        return;
      }

      const blob = await response.blob();
      const audioURL = URL.createObjectURL(blob);

      const audioPlayer = document.getElementById('translatedAudio');
      audioPlayer.src = audioURL;
      audioPlayer.play();

    } catch (error) {
      alert("Translation failed: " + error.message);
    }
  });
}
