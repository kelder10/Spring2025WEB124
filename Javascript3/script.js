const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.querySelector('.timer');
const lifeCountDisplay = document.querySelector('.life-count');
const moles = document.querySelectorAll('.mole');
const bombs = document.querySelectorAll('.bomb');
const gameOverDisplay = document.querySelector('.game-over');
let lastHole;
let timeUp = false;
let score = 0;
let lives = 3;
let timer;

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
const time = randomTime(1000, 2000); // Slower mole appearance
const hole = randomHole(holes);
hole.classList.add('up');
playSound('./sounds/pop.mp3'); // Play sound when mole pops up
setTimeout(() => {
hole.classList.remove('up');
if (!timeUp) peep();
}, time);
}

function startGame() {
scoreBoard.textContent = "Score: 0";
lifeCountDisplay.textContent = lives;
timerDisplay.textContent = "Time: 10";
timeUp = false;
score = 0;
lives = 3;
gameOverDisplay.style.display = "none";

peep();
timer = setInterval(updateTimer, 1000);
setTimeout(() => {
timeUp = true;
clearInterval(timer);
showGameOver("Time's Up! Your score: " + score);
}, 10000);
}

function updateTimer() {
const currentTime = parseInt(timerDisplay.textContent.split(': ')[1]);
if (currentTime > 0) {
timerDisplay.textContent = `Time: ${currentTime - 1}`;
}
}

function bonk(e) {
if (!e.isTrusted) return; // cheater!
score += 100; // Add points for hitting a mole
this.parentNode.classList.remove('up');
scoreBoard.textContent = "Score: " + score;
}

function hitBomb(e) {
if (!e.isTrusted) return; // cheater!
lives--;
lifeCountDisplay.textContent = lives;
this.parentNode.classList.remove('up');
playSound('./sounds/explosion.mp3'); // Play sound when bomb clicked
if (lives <= 0) {
showGameOver("Game Over! Your score: " + score);
}
}

function showGameOver(message) {
gameOverDisplay.textContent = message;
gameOverDisplay.style.display = "block";
}

moles.forEach(mole => mole.addEventListener('click', bonk));
bombs.forEach(bomb => bomb.addEventListener('click', hitBomb));

function playSound(src) {
const sound = new Audio(src);
sound.play();
}
