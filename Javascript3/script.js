// Katie Elder 04-13-25
// Adapted from https://javascript30.com/Whack-a-Mole 
// Changes made:
// - Renamed 'mole' to 'groundhog' for semantic clarity
// - Added level selection feature with different time limits and scores to win 
// - Introduced sounds for popping groundhogs and scoring 
// - Improved game logic to handle multiple groundhogs at level 3
// - Added a countdown timer and check to prevent multiple game starts
const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const timerDisplay = document.getElementById('timeLeft');
const groundhogs = document.querySelectorAll('.groundhog'); // Changed from 'moles' to 'groundhogs'
let lastHole;
let timeUp = false;
let score = 0;
let timeLeft = 45; // Set initial time to 45 seconds
let countdown;
let gameActive = false; // New variable to check if game is active
let level = 1; // Default level

// Levels configuration
const levels = {
1: { time: 50, scoreToWin: 5, speed: { min: 1000, max: 2000 } }, // Level 1 settings
2: { time: 35, scoreToWin: 8, speed: { min: 800, max: 1500 } }, // Level 2 settings
3: { time: 25, scoreToWin: 10, speed: { min: 700, max: 1300 } }, // Level 3 settings
};

// Load sounds
const popSound = new Audio('./sounds/pop.mp3'); // Sound for when groundhog pops up
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
if (timeUp) return; // Prevent further groundhogs from popping up if the game is over

let numGroundhogs; // Declare variable for number of groundhogs

// Use if-else to determine the number of groundhogs to show
if (level === 3) {
numGroundhogs = 2; // Show two groundhogs if on level 3
} else {
numGroundhogs = 1; // Show one groundhog for other levels
}

const holesToPop = [];

// Select random holes to pop up groundhogs
while (holesToPop.length < numGroundhogs) {
const hole = randomHole(holes);
if (!holesToPop.includes(hole)) {
holesToPop.push(hole);
}
}

holesToPop.forEach((hole) => {
const time = randomTime(levels[level].speed.min, levels[level].speed.max);

// Add the shake class to the hole
hole.classList.add('shake');

// Delay before showing the groundhog to allow the shake to be visible
setTimeout(() => {
hole.classList.remove('shake'); // Remove shake class
hole.classList.add('up'); // Show the groundhog
popSound.play(); // Play sound for popping groundhog

setTimeout(() => {
hole.classList.remove('up'); // Hide the groundhog after it has been shown
}, time);
}, 300); // Short delay for the shake animation to be visible
});

// Schedule the next peep
if (!timeUp) {
setTimeout(peep, randomTime(levels[level].speed.min, levels[level].speed.max));
}
}

function startGame() {
if (gameActive) {
alert("The game is already in progress!"); // Prevent multiple game starts
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

function setLevel(selectedLevel) { // New function to set game level
level = selectedLevel; // Update level to the selected level
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

groundhogs.forEach(groundhog => groundhog.addEventListener('click', bonk)); // Event listener for groundhogs
