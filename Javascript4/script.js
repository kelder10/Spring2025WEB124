// Author: Your Name, Date: YYYY-MM-DD
// Description: JavaScript for handling the Daily Planner application

const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const itemsContainer = document.getElementById('itemsContainer');
const removeCompletedBtn = document.getElementById('removeCompletedBtn');
const tomorrowContainer = document.getElementById('tomorrowContainer');
const appointmentsContainer = document.querySelector('.appointments-container');
const notesInput = document.getElementById('notesInput');

const addTomorrowTaskBtn = document.getElementById('addTomorrowTaskBtn');
const tomorrowTaskInput = document.getElementById('tomorrowTaskInput');
const addAppointmentTaskBtn = document.getElementById('addAppointmentTaskBtn');
const appointmentTaskInput = document.getElementById('appointmentTaskInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let tomorrowTasks = JSON.parse(localStorage.getItem('tomorrowTasks')) || [];
let appointmentTasks = JSON.parse(localStorage.getItem('appointmentTasks')) || [];

let lastChecked; // Variable to keep track of the last checked checkbox

// Call renderTasks to display existing tasks
renderTasks();
renderTomorrowTasks(); // Render existing tomorrow tasks on initial load

function renderTasks() {
itemsContainer.innerHTML = '';
tasks.forEach((task, index) => {
const item = document.createElement('div');
item.classList.add('item');
if (task.completed) {
item.classList.add('completed'); // Add 'completed' class if the task is completed
}
item.innerHTML = `
<input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
<p>${task.text}</p>
`;
itemsContainer.appendChild(item);
});
}

function addTask() {
const taskText = taskInput.value.trim();
if (taskText) {
tasks.push({ text: taskText, completed: false });
localStorage.setItem('tasks', JSON.stringify(tasks));
taskInput.value = '';
renderTasks();
}
}

function handleCheck(e, taskArray, renderFunction) {
const checkboxes = tomorrowContainer.querySelectorAll('input[type="checkbox"]');
const currentIndex = Array.from(checkboxes).indexOf(this);

// Check if the currentIndex is valid
if (currentIndex < 0 || currentIndex >= taskArray.length) {
return; // Exit the function if the index is out of bounds
}

if (e.shiftKey && lastChecked) {
const lastCheckedIndex = Array.from(checkboxes).indexOf(lastChecked);
const start = Math.min(currentIndex, lastCheckedIndex);
const end = Math.max(currentIndex, lastCheckedIndex);

// Check all checkboxes in between and update the tasks array
for (let i = start; i <= end; i++) {
if (checkboxes[i]) {
checkboxes[i].checked = true; // Check the checkbox in between
const index = checkboxes[i].id.split('-')[2]; // Update index for tomorrow tasks

if (index >= 0 && index < taskArray.length) {
taskArray[index].completed = true; // Mark the task as completed in the tomorrowTasks array
}
}
}
} else {
const index = e.target.id.split('-')[2]; // Update index for tomorrow tasks
if (index >= 0 && index < taskArray.length) {
taskArray[index].completed = e.target.checked; // Update individual task completion
}
}

lastChecked = this; // Update lastChecked to the current checkbox
localStorage.setItem('tomorrowTasks', JSON.stringify(taskArray)); // Save the updated tomorrow tasks
renderFunction(); // Re-render the tomorrow tasks to update the display
}

function removeCompletedTasks() {
// Remove completed tasks from the main task list
tasks = tasks.filter(task => !task.completed);
localStorage.setItem('tasks', JSON.stringify(tasks));

// Remove completed tasks from tomorrow tasks
tomorrowTasks = tomorrowTasks.filter(task => !task.completed);
localStorage.setItem('tomorrowTasks', JSON.stringify(tomorrowTasks));

renderTasks(); // Re-render main tasks
renderTomorrowTasks(); // Re-render tomorrow tasks
}

function renderTomorrowTasks() {
tomorrowContainer.innerHTML = '';
tomorrowTasks.forEach((task, index) => {
const item = document.createElement('div');
item.classList.add('tomorrow-item');
item.classList.toggle('completed', task.completed); // Add 'completed' class based on task status
item.innerHTML = `
<input type="checkbox" id="tomorrow-task-${index}" ${task.completed ? 'checked' : ''}>
<p>${task.text}</p>
`;
tomorrowContainer.appendChild(item);
});
}

function addTomorrowTask() {
const taskText = tomorrowTaskInput.value.trim();
if (taskText) {
console.log("Adding tomorrow task:", taskText); // Log the task being added
tomorrowTasks.push({ text: taskText, completed: false }); // Set completed to false
localStorage.setItem('tomorrowTasks', JSON.stringify(tomorrowTasks));
tomorrowTaskInput.value = '';
renderTomorrowTasks(); // Render the updated tasks
} else {
console.log("No task text entered."); // Log if no task is entered
}
}

function renderAppointmentTasks() {
appointmentsContainer.innerHTML = '';
appointmentTasks.forEach((task) => {
const item = document.createElement('div');
item.classList.add('appointment-item');
item.innerHTML = `<p>${task.text}</p>`;
appointmentsContainer.appendChild(item);
});
}

function addAppointmentTask() {
const taskText = appointmentTaskInput.value.trim();
if (taskText) {
appointmentTasks.push({ text: taskText });
localStorage.setItem('appointmentTasks', JSON.stringify(appointmentTasks));
appointmentTaskInput.value = '';
renderAppointmentTasks();
}
}

// Add event listener for checkbox clicks in the main task list
itemsContainer.addEventListener('click', (e) => {
if (e.target.matches('input[type="checkbox"]')) {
handleCheck.call(e.target, e, tasks, renderTasks); // Call handleCheck for main tasks
}
});

// Add event listener for checkbox clicks in the tomorrow tasks
tomorrowContainer.addEventListener('click', (e) => {
if (e.target.matches('input[type="checkbox"]')) {
handleCheck.call(e.target, e, tomorrowTasks, renderTomorrowTasks); // Call handleCheck for tomorrow tasks
}
});

// Add event listeners for buttons
addTaskBtn.addEventListener('click', addTask);
removeCompletedBtn.addEventListener('click', removeCompletedTasks);
addTomorrowTaskBtn.addEventListener('click', addTomorrowTask);
addAppointmentTaskBtn.addEventListener('click', addAppointmentTask);

// Initial render
renderTomorrowTasks();
renderAppointmentTasks();
