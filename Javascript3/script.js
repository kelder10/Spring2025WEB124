const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const groundhogs = document.querySelectorAll('.groundhog');
let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 45; // Set initial time to 45 seconds
let countdown; // Declare countdown in a broader scope

// Load sounds
const popSound = new Audio('./sounds/pop.mp3'); // Sound when groundhog pops up
const scoreSound = new Audio('./sounds/beep.mp3'); // Sound for scoring

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

// Add shake class to trigger the shaking effect
hole.classList.add('shake');

// Remove shake class after animation ends
setTimeout(() => {
hole.classList.remove('shake');
hole.classList.add('up');
popSound.play(); // Play sound when groundhog pops up

setTimeout(() => {
hole.classList.remove('up');
if (!timeUp) peep();
}, time);
}, 500); // Delay adding 'up' class until shake animation starts
}

function startGame() {
scoreBoard.textContent = "Score: 0";
timeUp = false;
score = 0;
timeLeft = 45; // Set the countdown to 45 seconds
timerDisplay.textContent = timeLeft;
peep();

countdown = setInterval(() => { // Initialize countdown here
timeLeft--;
timerDisplay.textContent = timeLeft;

if (timeLeft <= 0) {
clearInterval(countdown);
timeUp = true;
alert("Time's up! You lose!"); // Game over alert for losing
}
}, 1000);
}

function bonk(e) {
if (!e.isTrusted) return; // cheater!
score++;
this.parentNode.classList.remove('up');
scoreBoard.textContent = `Score: ${score}`;

// Play the score sound
scoreSound.play();

if (score >= 10) {
timeUp = true; // End the game
clearInterval(countdown); // Clear the countdown interval
alert("Congratulations! You win!"); // Game over alert for winning
}
}

groundhogs.forEach(groundhog => groundhog.addEventListener('click', bonk));
