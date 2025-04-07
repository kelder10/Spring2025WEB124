// Katie Elder 04-06-25
// Adapted from https://javascript30.com/
// JS + CSS Clock
// Changes made:
// - Used getElementById instead of querySelector for unique elements.
// - Added digital time and current date display.
// - Implemented alarm functionality with sound alerts and buttons.
// - Enabled tick sound with toggle functionality.

const secondHand = document.getElementById('second-hand'); // Changed from querySelector to getElementById
const minsHand = document.getElementById('min-hand'); // Changed from querySelector to getElementById
const hourHand = document.getElementById('hour-hand'); // Changed from querySelector to getElementById

// Get references to digital time and date display elements
const digitalTime = document.getElementById('digitalTime'); // New digital time display element
const currentDate = document.getElementById('currentDate'); // New current date display element

// Get references to buttons and sound
const setAlarmButton = document.getElementById('set-alarm'); // New set alarm button
const tickSound = document.getElementById('tick-sound'); // New tick sound audio element
const themeToggleButton = document.getElementById('theme-toggle'); // New theme toggle button
const alarmSound = document.getElementById('alarm-sound'); // New alarm sound audio element
const stopAlarmButton = document.getElementById('stop-alarm'); // New stop alarm button

let alarmTime = null; // Variable to store alarm time
let alarmPlaying = false; // Flag to check if the alarm is currently playing
let tickSoundEnabled = false; // Start with tick sound disabled

// Function to update clock hands and digital time
function setDate() {
  const now = new Date(); 
  
  const seconds = now.getSeconds(); 
  const secondsDegrees = ((seconds / 60) * 360); 
  secondHand.style.transform = `rotate(${secondsDegrees}deg)`; 

  const mins = now.getMinutes(); 
  const minsDegrees = ((mins / 60) * 360) + ((seconds / 60) * 6); 
  minsHand.style.transform = `rotate(${minsDegrees}deg)`; 

  const hour = now.getHours(); 
  const hourDegrees = ((hour % 12) / 12) * 360 + ((mins / 60) * 30);
  hourHand.style.transform = `rotate(${hourDegrees}deg)`; 

  // Update digital time display
  digitalTime.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' }); // Display current time
  updateDate(); // Update the date display

  // Play tick sound if enabled
  if (tickSoundEnabled) {
    tickSound.currentTime = 0; // Reset sound
    tickSound.play(); // Play tick sound
  }

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

// Event listener for clicking on the clock face
const clockFace = document.getElementById('clock-face'); // Get the clock face element
clockFace.addEventListener('click', () => {
  tickSoundEnabled = !tickSoundEnabled; // Toggle tick sound state
  if (tickSoundEnabled) {
    alert("Tick sound enabled."); 
  } else {
    tickSound.pause(); // Stop the tick sound immediately
    tickSound.currentTime = 0; // Reset sound to the beginning
    alert("Tick sound disabled."); 
  }
});

setInterval(setDate, 1000); 
setDate(); 
