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
let alarmTime = null; // Variable to store alarm time

// Function to update clock hands and digital time
function setDate() {
const now = new Date(); // Get current date and time
const seconds = now.getSeconds(); // Get current seconds
const secondsDegrees = ((seconds / 60) * 360) + 90; // Calculate rotation for second hand
secondHand.style.transform = `rotate(${secondsDegrees}deg)`; // Rotate second hand

const mins = now.getMinutes(); // Get current minutes
const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6) + 90; // Calculate rotation for minute hand
minsHand.style.transform = `rotate(${minsDegrees}deg)`; // Rotate minute hand

const hour = now.getHours(); // Get current hours
const hourDegrees = ((hour / 12) * 360) + ((mins / 60) * 30) + 90; // Calculate rotation for hour hand
hourHand.style.transform = `rotate(${hourDegrees}deg)`; // Rotate hour hand

// Update digital time display
digitalTime.textContent = now.toLocaleTimeString(); // Display current time
updateDate(); // Update the date display

// Play tick sound
tickSound.currentTime = 0; // Reset sound
tickSound.play(); // Play tick sound

// Check for alarm time and alert if it matches
if (alarmTime && alarmTime === now.toLocaleTimeString()) {
  alert("Alarm! Time's up!"); // Alert message
  alarmTime = null; // Reset alarm 
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
  alarmTime = document.getElementById('alarm-time').value + ":00"; // Set alarm time in HH:MM format
});

// Event listener for toggling themes
themeToggleButton.addEventListener('click', () => {
  document.body.classList.toggle('dark-theme'); // Toggle dark theme class
});

// Start the clock with an interval
setInterval(setDate, 1000); // Update the clock every second
setDate(); // Initial call to set the time
