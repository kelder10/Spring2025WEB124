const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const healthDisplay = document.querySelector('.health'); // New health display
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let health = 3; // User starts with 3 lives
let timeLeft = 80; // Set initial time to 80 seconds

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

// Randomly decide whether to show a mole or a bomb
const showBomb = Math.random() < 0.33; // 33% chance for a bomb
if (showBomb) {
console.log("Bomb appeared!"); // Debugging line
hole.classList.add('bomb');
} else {
console.log("Mole appeared!"); // Debugging line
hole.classList.add('up');
}

setTimeout(() => {
hole.classList.remove('up');
hole.classList.remove('bomb');
if (!timeUp) peep();
}, time);
}

function startGame() {
scoreBoard.textContent = "Score: 0";
healthDisplay.textContent = `Health: ${health}`; // Reset health display
timeUp = false;
score = 0;
timeLeft = 80; // Set the countdown to 80 seconds
timerDisplay.textContent = timeLeft;
peep();

const countdown = setInterval(() => {
timeLeft--;
timerDisplay.textContent = timeLeft;
if (timeLeft <= 0) {
clearInterval(countdown);
timeUp = true;
alert("Time's up! Your score: " + score);
}
}, 1000);
}

function bonk(e) {
if (!e.isTrusted) return; // cheater!

if (this.classList.contains('bomb')) {
// If it's a bomb, deduct health
health--;
healthDisplay.textContent = `Health: ${health}`;
this.parentNode.classList.remove('bomb');
if (health <= 0) {
alert("Game Over! You've lost all your lives.");
timeUp = true; // End the game
}
} else {
score++;
this.parentNode.classList.remove('up');
scoreBoard.textContent = `Score: ${score}`;
}
}

moles.forEach(mole => mole.addEventListener('click', bonk));
