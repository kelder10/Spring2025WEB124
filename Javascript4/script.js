const addTaskBtn = document.getElementById('addTaskBtn');
const taskInput = document.getElementById('taskInput');
const prioritySelect = document.getElementById('prioritySelect');
const itemsContainer = document.getElementById('itemsContainer');
const removeCompletedBtn = document.getElementById('removeCompletedBtn');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let lastChecked;

renderTasks();

function renderTasks() {
    itemsContainer.innerHTML = '';
    tasks.forEach((task, index) => {
        const item = document.createElement('div');
        item.classList.add('item');

        // Create priority indicator
        const priorityIndicator = document.createElement('span');
        priorityIndicator.classList.add('priority-indicator', `priority-${task.priority}`);

        item.innerHTML = `
            ${priorityIndicator.outerHTML}      
            <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
            <p class="${task.completed ? 'completed-text' : ''}">${task.text}</p>
        `;
        itemsContainer.appendChild(item);
    });
}

function addTask() {
    const taskText = taskInput.value.trim();
    const priorityLevel = prioritySelect.value;

    if (taskText) {
        tasks.push({ text: taskText, completed: false, priority: priorityLevel });
        localStorage.setItem('tasks', JSON.stringify(tasks));
        taskInput.value = '';
        prioritySelect.value = 'low'; // Reset to default
        renderTasks();
    }
}

function handleCheck(e) {
    const checkboxes = itemsContainer.querySelectorAll('input[type="checkbox"]');
    const currentIndex = Array.from(checkboxes).indexOf(this);

    if (currentIndex < 0 || currentIndex >= tasks.length) {
        return;
    }

    if (e.shiftKey && lastChecked) {
        const lastCheckedIndex = Array.from(checkboxes).indexOf(lastChecked);
        const start = Math.min(currentIndex, lastCheckedIndex);
        const end = Math.max(currentIndex, lastCheckedIndex);

        for (let i = start; i <= end; i++) {
            if (checkboxes[i]) {
                checkboxes[i].checked = true;
                const index = checkboxes[i].id.split('-')[1];
                if (index >= 0 && index < tasks.length) {
                    tasks[index].completed = true;
                }
            }
        }
    } else {
        const index = e.target.id.split('-')[1];
        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = e.target.checked;
        }
    }

    // Update the completed class on the task item
    const item = checkboxes[currentIndex].closest('.item');
    if (item) {
        if (checkboxes[currentIndex].checked) {
            item.classList.add('completed'); // Add the completed class
        } else {
            item.classList.remove('completed'); // Remove the completed class
        }
    }

    lastChecked = this;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

function removeCompletedTasks() {
    tasks = tasks.filter(task => !task.completed);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
}

// Add event listener for checkbox clicks
itemsContainer.addEventListener('click', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        handleCheck.call(e.target, e);
    }
});

// Add event listeners for buttons
addTaskBtn.addEventListener('click', addTask);
removeCompletedBtn.addEventListener('click', removeCompletedTasks);

// Initial render
renderTasks();
