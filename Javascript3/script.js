const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 45; // Set initial time to 45 seconds

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
hole.classList.add('up');
setTimeout(() => {
hole.classList.remove('up');
if (!timeUp) peep();
}, time);
}

function startGame() {
scoreBoard.textContent = "Score: 0";
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
}
}, 1000);
}

function bonk(e) {
if (!e.isTrusted) return; // cheater!

const clickedMole = this.parentNode; // Get the parent (hole) of the clicked mole

if (this.classList.contains('bomb')) {
// If it's a bomb, deduct health
health--;
healthDisplay.textContent = `Health: ${health}`;
clickedMole.classList.remove('bomb');
if (health <= 0) {
alert("Game Over! You've lost all your lives.");
timeUp = true; // End the game
}
} else {
score++;
clickedMole.classList.remove('up');
scoreBoard.textContent = `Score: ${score}`;

// Create the catch image
const catchImage = document.createElement('img');
catchImage.src = './images/catch-icon.png'; // Path to your catch image
catchImage.classList.add('catch-effect'); // Add a class for styling
document.body.appendChild(catchImage);

// Position the catch image at the click location
const rect = clickedMole.getBoundingClientRect();
catchImage.style.left = `${e.clientX - 25}px`; // Center the image
catchImage.style.top = `${e.clientY - 25}px`; // Center the image

// Remove the catch image after a short delay
setTimeout(() => {
catchImage.remove();
}, 1000);
}
}

function bonk(e) {
if (!e.isTrusted) return; // cheater!
score++;
this.parentNode.classList.remove('up');
scoreBoard.textContent = `Score: ${score}`;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
