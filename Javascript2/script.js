// Get references to clock hand elements
const secondHand = document.getElementById('second-hand'); // Second hand element
const minsHand = document.getElementById('min-hand'); // Minute hand element
const hourHand = document.getElementById('hour-hand'); // Hour hand element

// Get references to digital time and date display elements
const digitalTime = document.getElementById('digitalTime'); // Digital time display element
const currentDate = document.getElementById('currentDate'); // Current date display element

// Get references to buttons and sound
const setAlarmButton = document.getElementById('set-alarm'); // Set alarm button
const tickSound = document.getElementById('tick-sound'); // Tick sound audio element
const themeToggleButton = document.getElementById('theme-toggle'); // Theme toggle button
const alarmSound = document.getElementById('alarm-sound'); // Alarm sound audio element
const stopAlarmButton = document.getElementById('stop-alarm'); // Stop alarm button

let alarmTime = null; // Variable to store alarm time
let alarmPlaying = false; // Flag to check if the alarm is currently playing

// Function to update clock hands and digital time
function setDate() {
const now = new Date(); // Get current date and time
const seconds = now.getSeconds(); // Get current seconds
const secondsDegrees = ((seconds / 60) * 360); // Calculate rotation for second hand
secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // Rotate second hand

const mins = now.getMinutes(); // Get current minutes
const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6); // Calculate rotation for minute hand
minsHand.style.transform = `rotate(${minsDegrees}deg)`; // Rotate minute hand

const hour = now.getHours(); // Get current hours
const hourDegrees = ((hour % 12) / 12) * 360 + ((mins / 60) * 30); // Calculate rotation for hour hand
hourHand.style.transform = `rotate(${hourDegrees}deg)`; // Rotate hour hand

// Update digital time display
digitalTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Display current time
updateDate(); // Update the date display

// Play tick sound
tickSound.currentTime = 0; // Reset sound
tickSound.play(); // Play tick sound

// Check for alarm time and play sound if it matches
const currentTimeString = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
if (alarmTime && alarmTime === currentTimeString) {
if (!alarmPlaying) {
alarmSound.currentTime = 0; // Reset alarm sound
alarmSound.play().catch(error => {
console.error("Error playing sound:", error); // Log any errors
});
alarmPlaying = true; // Set flag to indicate the alarm is playing
}
} else {
// Reset the alarm playing flag if the alarm time is not matched
if (alarmPlaying) {
alarmPlaying = false;
}
}
}

// Function to update the current date display
function updateDate() {
const now = new Date(); // Get current date
currentDate.textContent = now.toLocaleDateString(undefined, {
year: 'numeric', // Display year
month: 'long', // Display month
day: 'numeric' // Display day
});
}

// Event listener for setting the alarm
setAlarmButton.addEventListener('click', () => {
const alarmInput = document.getElementById('alarm-time').value; // Get the input value
if (alarmInput) {
alarmTime = new Date(`1970-01-01T${alarmInput}:00`).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Set alarm time in HH:MM:SS format
alert(`Alarm set for ${alarmTime}`); // Alert message
} else {
alert("Please set a valid alarm time.");
}
});

// Event listener for stopping the alarm
stopAlarmButton.addEventListener('click', () => {
alarmSound.pause(); // Pause the alarm sound
alarmSound.currentTime = 0; // Reset sound to the beginning
alarmPlaying = false; // Reset the flag
});

// Event listener for toggling themes
themeToggleButton.addEventListener('click', () => {
document.body.classList.toggle('dark-theme'); // Toggle dark theme class
});

// Start the clock with an interval
setInterval(setDate, 1000); // Update the clock every second
setDate(); // Initial call to set the time
