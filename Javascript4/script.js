// Author: Your Name, Date: YYYY-MM-DD
// Description: JavaScript for handling the Daily Planner application
// Author: Your Name, Date: YYYY-MM-DD
// Description: JavaScript for handling the Daily Planner application

// Author: Your Name, Date: YYYY-MM-DD
// Description: JavaScript for handling the Daily Planner application

const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const itemsContainer = document.getElementById('itemsContainer');
const removeCompletedBtn = document.getElementById('removeCompletedBtn');
const priorityContainer = document.getElementById('priorityContainer');
const tomorrowContainer = document.getElementById('tomorrowContainer');
const appointmentsContainer = document.getElementById('appointmentsContainer');
const notesInput = document.getElementById('notesInput');

const addPriorityTaskBtn = document.getElementById('addPriorityTaskBtn');
const priorityTaskInput = document.getElementById('priorityTaskInput');
const addTomorrowTaskBtn = document.getElementById('addTomorrowTaskBtn');
const tomorrowTaskInput = document.getElementById('tomorrowTaskInput');
const addAppointmentTaskBtn = document.getElementById('addAppointmentTaskBtn');
const appointmentTaskInput = document.getElementById('appointmentTaskInput');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let priorityTasks = JSON.parse(localStorage.getItem('priorityTasks')) || [];
let tomorrowTasks = JSON.parse(localStorage.getItem('tomorrowTasks')) || [];
let appointmentTasks = JSON.parse(localStorage.getItem('appointmentTasks')) || [];

let lastChecked; // Variable to keep track of the last checked checkbox

// Call renderTasks to display existing tasks
renderTasks();

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
// Check if they had the shift key down AND check that they are checking it
let inBetween = false;
if (e.shiftKey && this.checked) {
// Loop over every single checkbox
const checkboxes = itemsContainer.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach(checkbox => {
if (checkbox === this || checkbox === lastChecked) {
inBetween = !inBetween; // Toggle inBetween flag
}
if (inBetween) {
checkbox.checked = true; // Check the checkbox in between
}
});
}
lastChecked = this; // Update lastChecked
const index = e.target.id.split('-')[1];
tasks[index].completed = e.target.checked;
localStorage.setItem('tasks', JSON.stringify(tasks));
renderTasks(); // Re-render tasks to update the display
}

function removeCompletedTasks() {
tasks = tasks.filter(task => !task.completed);
localStorage.setItem('tasks', JSON.stringify(tasks));
renderTasks();
}

// Additional functions for priority, tomorrow, and appointment tasks
function renderPriorityTasks() {
priorityContainer.innerHTML = '';
priorityTasks.forEach((task) => {
const item = document.createElement('div');
item.classList.add('priority-item');
item.innerHTML = `<p>${task.text}</p>`;
priorityContainer.appendChild(item);
});
}

function addPriorityTask() {
const taskText = priorityTaskInput.value.trim();
if (taskText) {
priorityTasks.push({ text: taskText });
localStorage.setItem('priorityTasks', JSON.stringify(priorityTasks));
priorityTaskInput.value = '';
renderPriorityTasks();
}
}

function renderTomorrowTasks() {
tomorrowContainer.innerHTML = '';
tomorrowTasks.forEach((task) => {
const item = document.createElement('div');
item.classList.add('tomorrow-item');
item.innerHTML = `<p>${task.text}</p>`;
tomorrowContainer.appendChild(item);
});
}

function addTomorrowTask() {
const taskText = tomorrowTaskInput.value.trim();
if (taskText) {
tomorrowTasks.push({ text: taskText });
localStorage.setItem('tomorrowTasks', JSON.stringify(tomorrowTasks));
tomorrowTaskInput.value = '';
renderTomorrowTasks();
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

addTaskBtn.addEventListener('click', addTask);
itemsContainer.addEventListener('click', (e) => {
if (e.target.matches('input[type="checkbox"]')) {
handleCheck.call(e.target, e); // Call handleCheck with the current target
}
});
removeCompletedBtn.addEventListener('click', removeCompletedTasks);
addPriorityTaskBtn.addEventListener('click', addPriorityTask);
addTomorrowTaskBtn.addEventListener('click', addTomorrowTask);
addAppointmentTaskBtn.addEventListener('click', addAppointmentTask);

// Initial render
renderPriorityTasks();
renderTomorrowTasks();
renderAppointmentTasks();
