// Author: Your Name, Date: YYYY-MM-DD
// Description: JavaScript for handling the Daily Planner application

const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const itemsContainer = document.getElementById('itemsContainer');
const removeCompletedBtn = document.getElementById('removeCompletedBtn');
const appointmentsContainer = document.getElementById('appointmentsContainer');
const appointmentTaskInput = document.getElementById('appointmentTaskInput');
const addAppointmentTaskBtn = document.getElementById('addAppointmentTaskBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let appointmentTasks = JSON.parse(localStorage.getItem('appointmentTasks')) || [];

// Call renderTasks and renderAppointmentTasks to display existing tasks and appointments
renderTasks();
renderAppointmentTasks();

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

function handleCheck(e) {
const checkboxes = itemsContainer.querySelectorAll('input[type="checkbox"]');
const currentIndex = Array.from(checkboxes).indexOf(this);

// Check if the currentIndex is valid
if (currentIndex < 0 || currentIndex >= tasks.length) {
return; // Exit the function if the index is out of bounds
}

if (e.shiftKey && lastChecked) {
const lastCheckedIndex = Array.from(checkboxes).indexOf(lastChecked);
const start = Math.min(currentIndex, lastCheckedIndex);
const end = Math.max(currentIndex, lastCheckedIndex);

// Check all checkboxes in between
for (let i = start; i <= end; i++) {
if (checkboxes[i]) {
checkboxes[i].checked = true; // Check the checkbox in between
const index = checkboxes[i].id.split('-')[1];
if (index >= 0 && index < tasks.length) {
tasks[index].completed = true; // Mark the task as completed in the tasks array
}
}
}
} else {
const index = e.target.id.split('-')[1];
if (index >= 0 && index < tasks.length) {
tasks[index].completed = e.target.checked; // Update individual task completion
}
}

lastChecked = this; // Update lastChecked to the current checkbox
localStorage.setItem('tasks', JSON.stringify(tasks)); // Save the updated tasks
renderTasks(); // Re-render tasks to update the display
}

function removeCompletedTasks() {
tasks = tasks.filter(task => !task.completed);
localStorage.setItem('tasks', JSON.stringify(tasks));
renderTasks();
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

// Add event listener for checkbox clicks
itemsContainer.addEventListener('click', (e) => {
if (e.target.matches('input[type="checkbox"]')) {
handleCheck.call(e.target, e); // Call handleCheck with the current target
}
});

// Add event listeners for buttons
addTaskBtn.addEventListener('click', addTask);
removeCompletedBtn.addEventListener('click', removeCompletedTasks);
addAppointmentTaskBtn.addEventListener('click', addAppointmentTask);

// Initial render
renderTasks();
renderAppointmentTasks();
