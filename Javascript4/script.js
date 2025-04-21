/*
Katie Elder 4-19-25
  Adapted from https://javascript30.com/
  Hold Shift and Check Checkboxes
New JS features
    Added functionality for task priority selection.
    Implemented task management using local storage.
    Enabled the removal of completed tasks.
*/

const addTaskBtn = document.getElementById('addTaskBtn'); // Button to add a new task
const taskInput = document.getElementById('taskInput'); // Input field for task description
const prioritySelect = document.getElementById('prioritySelect'); // Dropdown for task priority
const itemsContainer = document.getElementById('itemsContainer'); // Container for displaying tasks
const removeCompletedBtn = document.getElementById('removeCompletedBtn'); // Button to remove completed tasks

let tasks = JSON.parse(localStorage.getItem('tasks')) || []; 
let lastChecked; // Variable to keep track of the last checked checkbox

renderTasks(); // Initial render of tasks when the application loads

// Function to render tasks in the UI
function renderTasks() {
    itemsContainer.innerHTML = ''; // Clear existing tasks to avoid duplication
    tasks.forEach((task, index) => {
        const item = document.createElement('div'); // Create a new task item container
        item.classList.add('item'); // Add class for styling

        // Create priority indicator element to show task priority visually
        const priorityIndicator = document.createElement('span');
        priorityIndicator.classList.add('priority-indicator', `priority-${task.priority}`);

        // Set inner HTML to include checkbox and task description, applying styles based on completion
        item.innerHTML = `
            ${priorityIndicator.outerHTML}
            <input type="checkbox" id="task-${index}" ${task.completed ? 'checked' : ''}>
            <p class="${task.completed ? 'completed-text' : ''}">${task.text}</p>
        `;
        itemsContainer.appendChild(item); 
    });
}

// Function to add a new task
function addTask() {
    const taskText = taskInput.value.trim(); // Get and trim user input for task text
    const priorityLevel = prioritySelect.value; // Get selected priority level from dropdown

    if (taskText) { // Check if input is not empty
        tasks.push({ text: taskText, completed: false, priority: priorityLevel }); // Add new task to tasks array
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to local storage
        taskInput.value = ''; 
        prioritySelect.value = 'low'; // Reset priority to default after adding task
        renderTasks(); 
    }
}

// Function to handle checkbox checks and manage task completion
function handleCheck(e) {
    const checkboxes = itemsContainer.querySelectorAll('input[type="checkbox"]'); 
    const currentIndex = Array.from(checkboxes).indexOf(this); 

    if (currentIndex < 0 || currentIndex >= tasks.length) {
        return; // Ensure valid index to prevent errors
    }

    // Handle shift-click for checking multiple boxes
    if (e.shiftKey && lastChecked) {
        const lastCheckedIndex = Array.from(checkboxes).indexOf(lastChecked); // Get index of the last checked checkbox
        const start = Math.min(currentIndex, lastCheckedIndex); // Determine the starting index
        const end = Math.max(currentIndex, lastCheckedIndex); // Determine the ending index

        // Loop through the range and check all boxes in between
        for (let i = start; i <= end; i++) {
            if (checkboxes[i]) {
                checkboxes[i].checked = true; // Check the box
                const index = checkboxes[i].id.split('-')[1]; // Get the task index from the checkbox ID
                if (index >= 0 && index < tasks.length) {
                    tasks[index].completed = true; // Mark the corresponding task as completed
                }
            }
        }
    } else {
        const index = e.target.id.split('-')[1]; // Get task index from the clicked checkbox ID
        if (index >= 0 && index < tasks.length) {
            tasks[index].completed = e.target.checked; // Update task completion status
        }
    }

    // Update the completed class on the task item for visual feedback
    const item = checkboxes[currentIndex].closest('.item');
    if (item) {
        if (checkboxes[currentIndex].checked) {
            
        } else {
            item.classList.remove('completed'); // Remove completed class if unchecked
        }
    }

    lastChecked = this; 
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to local storage
    renderTasks(); // Re-render tasks to reflect updated states
}

// Function to remove completed tasks from the list
function removeCompletedTasks() {
    tasks = tasks.filter(task => !task.completed); // Filter out completed tasks
    localStorage.setItem('tasks', JSON.stringify(tasks)); // Save updated tasks to local storage
    renderTasks(); // Re-render tasks to reflect changes
}

// Event listener for checkbox clicks to manage task completion
itemsContainer.addEventListener('click', (e) => {
    if (e.target.matches('input[type="checkbox"]')) {
        handleCheck.call(e.target, e); // Call handleCheck with the context of the clicked checkbox
    }
});

// Event listeners for buttons to trigger respective functions
addTaskBtn.addEventListener('click', addTask); // Event for adding a new task
removeCompletedBtn.addEventListener('click', removeCompletedTasks); // Event for removing completed tasks


renderTasks(); // Render tasks when the application loads
