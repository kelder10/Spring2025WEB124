// Name: Your Name
// Date: YYYY-MM-DD
// Source: Based on original script from the JS Drum Kit project by Wes Bos
// Description: JavaScript functionality for the Animal Sound Board, enabling sounds to play on key presses and clicks.
// New/Challenging Aspects: Added click-to-play functionality for sounds and a volume control feature.
// Significant Changes:
// - Updated key codes to match new animal sounds.
// - Added functionality to allow sounds to be played by clicking on the animal keys.
// - Implemented a volume control slider for sound volume adjustment.

function removeTransition(e) {
if (e.propertyName !== 'transform') return;
e.target.classList.remove('playing');
}

function playSound(e) {
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
const volumeControl = document.getElementById('volume-control');

if (!audio) return;

audio.volume = volumeControl.value; // Set audio volume based on slider
key.classList.add('playing');
audio.currentTime = 0;
audio.play();
}

// New: Allow clicking on animal keys to play sounds
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => {
key.addEventListener('click', () => {
const keyCode = key.dataset.key;
window.dispatchEvent(new KeyboardEvent('keydown', {'keyCode': keyCode}));
});
});

// New: Volume control slider
const volumeControl = document.getElementById('volume-control');
volumeControl.addEventListener('input', () => {
// Optional: You can update the volume of currently playing sounds if needed
});

// Add event listeners for playing sounds with keyboard
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
