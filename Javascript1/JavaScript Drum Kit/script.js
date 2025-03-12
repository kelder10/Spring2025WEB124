// Name: Your Name
// Date: YYYY-MM-DD
// Source: Based on original script from the JS Drum Kit project by Wes Bos
// Description: JavaScript functionality for the Animal Sound Board, enabling sounds to play on key presses and clicks.
// New/Challenging Aspects: Added click-to-play functionality for sounds.
// Significant Changes:
// - Updated key codes to match new animal sounds.
// - Added functionality to allow sounds to be played by clicking on the animal keys.
// - Prevented multiple sounds from playing simultaneously.

function removeTransition(e) {
if (e.propertyName !== 'transform') return;
e.target.classList.remove('playing');
}

function playSound(e) {
const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
const key = document.querySelector(`div[data-key="${e.keyCode}"]`);

if (!audio) return;

// Stop other sounds before playing the selected one
const allAudios = document.querySelectorAll('audio');
allAudios.forEach((otherAudio) => {
otherAudio.pause();
otherAudio.currentTime = 0; // Reset the sound to the start
});

key.classList.add('playing');
audio.currentTime = 0; // Reset the audio
audio.play(); // Play the selected sound
}

// Allow clicking on animal keys to play sounds
const keys = Array.from(document.querySelectorAll('.key'));
keys.forEach(key => {
key.addEventListener('click', () => {
const keyCode = key.dataset.key;
window.dispatchEvent(new KeyboardEvent('keydown', {'keyCode': keyCode}));
});
});

// Add event listeners for playing sounds with keyboard
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
