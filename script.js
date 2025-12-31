function showMessage() {
  const message = document.getElementById("hiddenMessage");
  if (message) message.style.display = "block";
}

document.addEventListener("DOMContentLoaded", () => {

  /* ================= MUSIC ================= */

  const music = document.getElementById("bgMusic");
  const slider = document.getElementById("volumeSlider");
  const songTitle = document.getElementById("songTitle");
  const playPauseBtn = document.getElementById("playPauseBtn");
  const nextBtn = document.getElementById("nextBtn");

  if (!music) return;

  const playlist = [
    "music/Love Like You - Steven Universe.mp3",
    "music/Everything Stays (feat. Olivia Olson).mp3",
    "music/Bruno Major - The Most Beautiful Thing.mp3",
    "music/elijah woods - 247, 365.mp3",
    "music/Journey To Bethlehem - We Become We (Fiona Palomo, Milo Manheim).mp3",
    "music/Tokyo Ghoul Opening Unravel.mp3"
  ];

  let currentSongIndex = 0;

  function getSongName(path) {
    return decodeURIComponent(
      path.split("/").pop().replace(".mp3", "")
    );
  }

  function loadSong(index) {
    music.src = playlist[index];
    if (songTitle) {
      songTitle.textContent = `Now Playing: ${getSongName(playlist[index])}`;
    }
    music.play().catch(() => {});
    if (playPauseBtn) playPauseBtn.textContent = "⏸️";
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener("click", () => {
      if (music.paused) {
        music.play();
        playPauseBtn.textContent = "⏸️";
      } else {
        music.pause();
        playPauseBtn.textContent = "▶️";
      }
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentSongIndex = (currentSongIndex + 1) % playlist.length;
      loadSong(currentSongIndex);
    });
  }

  const savedVolume = localStorage.getItem("musicVolume");
  const volume = savedVolume !== null ? savedVolume : 0.25;
  music.volume = volume;
  if (slider) slider.value = volume;

  if (slider) {
    slider.addEventListener("input", e => {
      music.volume = e.target.value;
      localStorage.setItem("musicVolume", e.target.value);
    });
  }

  music.addEventListener("ended", () => {
    currentSongIndex = (currentSongIndex + 1) % playlist.length;
    loadSong(currentSongIndex);
  });

  loadSong(currentSongIndex);

  /* ================= GALLERY ================= */

  const galleryImages = document.querySelectorAll(".gallery img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  if (galleryImages.length && lightbox && lightboxImg) {
    galleryImages.forEach(img => {
      img.addEventListener("click", () => {
        lightboxImg.src = img.src;
        lightbox.style.display = "flex";
      });
    });

    lightbox.addEventListener("click", () => {
      lightbox.style.display = "none";
    });
  }

  /* ================= MUSIC SYNC ================= */

  function pulseToMusic() {
    if (music.paused || !galleryImages.length) return;
    const pulse = 1 + music.volume * 0.12;

    galleryImages.forEach(img => {
      img.style.transform = `scale(${pulse})`;
    });
  }

  setInterval(pulseToMusic, 400);

  /* ================= HEARTS ================= */

  const heartContainer = document.getElementById("heartContainer");

  function createHeart() {
    if (!heartContainer || music.paused) return;

    const heart = document.createElement("div");
    heart.className = "heart";
    heart.textContent = "❤️";

    const size = 14 + music.volume * 28;
    const duration = 6 - music.volume * 2;

    heart.style.left = Math.random() * 100 + "vw";
    heart.style.fontSize = `${size}px`;
    heart.style.animationDuration = `${duration}s`;

    heartContainer.appendChild(heart);
    setTimeout(() => heart.remove(), duration * 1000);
  }

  setInterval(createHeart, 450);

});
