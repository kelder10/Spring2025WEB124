const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const groundhogs = document.querySelectorAll('.groundhog');
let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 80; // Set initial time to 80 seconds

// Load sound
const popSound = new Audio('./sounds/pop.mp3'); // Ensure you have a sound file at this path

function randomTime(min, max) {
return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
const idx = Math.floor(Math.random() * holes.length);
const hole = holes[idx];
if (hole === lastHole) {
return randomHole(holes);
}
lastHole = hole;
return hole;
}

function peep() {
const time = randomTime(1000, 2000);
const hole = randomHole(holes);

// Add the 'up' class to trigger the shake effect
hole.classList.add('up');

// Play the sound when the groundhog pops up
popSound.play();

setTimeout(() => {
// Remove the 'up' class after the specified time
hole.classList.remove('up');
if (!timeUp) peep(); // Continue the game if time is not up
}, 400); // Duration for how long the groundhog is visible
}

function startGame() {
scoreBoard.textContent = "Score: 0";
timeUp = false;
score = 0;
timeLeft = 80; // Reset the countdown to 80 seconds
timerDisplay.textContent = timeLeft;
peep(); // Start the game by calling the peep function

const countdown = setInterval(() => {
timeLeft--;
timerDisplay.textContent = timeLeft;
if (timeLeft <= 0) {
clearInterval(countdown); // Stop the countdown
timeUp = true; // Set time up to true
}
}, 1000); // Countdown interval of 1 second
}

function bonk(e) {
if (!e.isTrusted) return; // Prevent cheating
score++; // Increase score
this.parentNode.classList.remove('up'); // Remove the groundhog from the hole
scoreBoard.textContent = `Score: ${score}`; // Update score display
}

// Add event listeners to each groundhog for click events
groundhogs.forEach(groundhog => groundhog.addEventListener('click', bonk));
