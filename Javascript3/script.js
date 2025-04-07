const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 10;

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
const time = randomTime(200, 1000);
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
timeLeft = 10;
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
