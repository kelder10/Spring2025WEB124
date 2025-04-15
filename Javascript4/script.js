// Author: Your Name, Date: YYYY-MM-DD
// Description: JavaScript for handling the Interactive To-Do List application

const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const itemsContainer = document.getElementById('itemsContainer');
const removeCompletedBtn = document.getElementById('removeCompletedBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function renderTasks() {
itemsContainer.innerHTML = '';
tasks.forEach((task, index) => {
const item = document.createElement('div');
item.classList.add('item');
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
const index = e.target.id.split('-')[1];
tasks[index].completed = e.target.checked;
localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeCompletedTasks() {
tasks = tasks.filter(task => !task.completed);
localStorage.setItem('tasks', JSON.stringify(tasks));
renderTasks();
}

addTaskBtn.addEventListener('click', addTask);
itemsContainer.addEventListener('click', (e) => {
if (e.target.matches('input[type="checkbox"]')) {
handleCheck(e);
}
});
removeCompletedBtn.addEventListener('click', removeCompletedTasks);

// Initial render
renderTasks();
