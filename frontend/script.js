// --- Login Handler ---
const loginForm = document.getElementById('loginForm');
if (loginForm) {
  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    // Always show login successful and redirect to dashboard
    alert("Login successful!");
    window.location.href = "/dashboard";
  });
}

// --- Signup Handler ---
const signupForm = document.getElementById('signupForm');
if (signupForm) {
  signupForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const formData = new FormData(signupForm);
    const data = Object.fromEntries(formData.entries());
    const response = await fetch('/signup', {
      method: 'POST',
      body: new URLSearchParams(data),
    });
    const text = await response.text();
    alert(text);
    if (text.includes("successful")) window.location.href = "login.html";
  });
}

// --- Audio Translation ---
const translateBtn = document.getElementById('translateBtn');
if (translateBtn) {
  translateBtn.addEventListener('click', async () => {
    const fileInput = document.getElementById('audioFile');
    if (!fileInput.files.length) {
      alert("Please select an audio file!");
      return;
    }

    const formData = new FormData();
    formData.append("audio", fileInput.files[0]);
    formData.append("sourceLang", document.getElementById("sourceLang").value);
    formData.append("targetLang", document.getElementById("targetLang").value);

    const response = await fetch("/translate", { method: "POST", body: formData });
    if (response.ok) {
      const blob = await response.blob();
      const audio = document.getElementById("resultAudio");
      audio.src = URL.createObjectURL(blob);
      audio.play();
    } else {
      alert("Translation failed.");
    }
  });
}
