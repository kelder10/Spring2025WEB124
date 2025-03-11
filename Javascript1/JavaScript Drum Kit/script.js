

const keys = document.querySelectorAll('.key');

function playSound(e) {
const key = document.querySelector(`div[data-key="${e.key}"]`);
const audio = document.querySelector(`audio[data-key="${e.key}"]`);

if (!audio) return; // If there's no audio for that key, exit

key.classList.add('playing');
audio.currentTime = 0; // Rewind to start
audio.play();
}

function removeTransition(e) {
if (e.propertyName === 'transform') {
e.target.classList.remove('playing');
}
}

// Event listeners
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);

