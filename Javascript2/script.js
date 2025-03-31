const secondHand = document.getElementById('second-hand');
const minsHand = document.getElementById('min-hand');
const hourHand = document.getElementById('hour-hand');
const digitalTime = document.getElementById('digitalTime');
const currentDate = document.getElementById('currentDate');
const setAlarmButton = document.getElementById('set-alarm');
const tickSound = document.getElementById('tick-sound');
const themeToggleButton = document.getElementById('theme-toggle');
let alarmTime = null;

function setDate() {
const now = new Date();
const seconds = now.getSeconds();
const secondsDegrees = ((seconds / 60) * 360) + 90;
secondHand.style.transform = `rotate(${secondsDegrees}deg)`;

const mins = now.getMinutes();
const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90;
minsHand.style.transform = `rotate(${minsDegrees}deg)`;

const hour = now.getHours();
const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90;
hourHand.style.transform = `rotate(${hourDegrees}deg)`;

// Update digital time
digitalTime.textContent = now.toLocaleTimeString();
updateDate();

// Play tick sound
tickSound.currentTime = 0; // Reset sound
tickSound.play();

// Check for alarm
if (alarmTime && alarmTime === now.toLocaleTimeString()) {
alert("Alarm! Time's up!");
alarmTime = null; // Reset alarm
}
}

function updateDate() {
const now = new Date();
currentDate.textContent = now.toLocaleDateString(undefined, {
year: 'numeric',
month: 'long',
day: 'numeric'
});
}

// Set Alarm
setAlarmButton.addEventListener('click', () => {
alarmTime = document.getElementById('alarm-time').value + ":00"; // Assuming HH:MM format
});

// Theme Toggle
themeToggleButton.addEventListener('click', () => {
document.body.classList.toggle('dark-theme');
});

// Start the clock
setInterval(setDate, 1000);
setDate(); // Initial call
