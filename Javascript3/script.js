const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const groundhogs = document.querySelectorAll('.groundhog');
let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 45; // Set initial time to 45 seconds
let countdown; // Declare countdown in a broader scope
let gameActive = false; // New variable to check if game is active
let level = 1; // Default level

// Levels configuration
const levels = {
1: { time: 50, scoreToWin: 5, speed: { min: 1000, max: 2000 } },
2: { time: 35, scoreToWin: 8, speed: { min: 800, max: 1500 } },
3: { time: 25, scoreToWin: 10, speed: { min: 700, max: 1300 } },
};

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
const numGroundhogs = level === 3 ? 2 : 1; // Show two groundhogs if on level 3
const holesToPop = [];

// Select random holes to pop up groundhogs
while (holesToPop.length < numGroundhogs) {
const hole = randomHole(holes);
if (!holesToPop.includes(hole)) {
holesToPop.push(hole);
}
}

holesToPop.forEach((hole, index) => {
const time = randomTime(levels[level].speed.min, levels[level].speed.max);

// Add the shake class to the hole
hole.classList.add('shake');

setTimeout(() => {
hole.classList.remove('shake');
hole.classList.add('up');
popSound.play();

setTimeout(() => {
hole.classList.remove('up');
}, time);
}, index * 500); // Stagger the popping up
});

// Schedule the next peep
if (!timeUp) {
setTimeout(peep, randomTime(levels[level].speed.min, levels[level].speed.max));
}
}

function startGame() {
if (gameActive) {
alert("The game is already in progress!");
return;
}

scoreBoard.textContent = `Score: 0/${levels[level].scoreToWin}`; // Update score display
timeUp = false;
score = 0;
timeLeft = levels[level].time; // Set the countdown according to the selected level
timerDisplay.textContent = timeLeft;
peep();
gameActive = true;

countdown = setInterval(() => {
timeLeft--;
timerDisplay.textContent = timeLeft;

if (timeLeft <= 0) {
clearInterval(countdown);
timeUp = true;
gameActive = false;
alert("Time's up! Game Over, You lose!!");
}
}, 1000);
}

function setLevel(selectedLevel) {
level = selectedLevel;
alert(`Level ${level} selected!`);
}

function bonk(e) {
if (!e.isTrusted) return; // cheater!
score++;
this.parentNode.classList.remove('up');

// Update score display before checking for win
scoreBoard.textContent = `Score: ${score}/${levels[level].scoreToWin}`;

// Play the score sound every time a point is scored
scoreSound.currentTime = 0; // Reset sound to the beginning
scoreSound.play();

// Check if the score meets or exceeds the target score
if (score >= levels[level].scoreToWin) {
timeUp = true; // End the game
clearInterval(countdown); // Clear the countdown interval
gameActive = false; // Set game active to false

// Display winning score before alert
scoreBoard.textContent = `Score: ${score}/${levels[level].scoreToWin}`;
alert("Game Over! Congratulations, You win!!"); // Game over alert for winning
}
}

groundhogs.forEach(groundhog => groundhog.addEventListener('click', bonk));
