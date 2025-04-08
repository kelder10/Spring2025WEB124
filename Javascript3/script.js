const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const moles = document.querySelectorAll('.mole');
const healthDisplay = document.querySelector('.health'); // New element to display health

let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 45; // Set initial time to 45 seconds
let health = 3; // User starts with 3 lives

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
score++;
this.parentNode.classList.remove('up');
scoreBoard.textContent = `Score: ${score}`;
}

moles.forEach(mole => mole.addEventListener('click', bonk));
