
html {
font-family: sans-serif;
background: #b64515;
}

.wrapper {
padding: 30px;
}

.container {
display: flex;
justify-content: space-between;
background: #f4ece9;
box-shadow: 10px 10px 0 rgba(0,0,0,0.1);
border: 40px solid transparent;
border-image: url('./images/flowers.jpg') 30 stretch;
border-radius: 15px;
padding: 20px;
flex-direction: row;
max-height: 600px;
}

h2 {
font-size: 2.2rem;
font-family: Arial, sans-serif;
font-style: italic;
padding: 0.5rem 1rem;
cursor: pointer;
margin: 0 20px;
border-radius: 10px;
background-color: #b64515;
color: white;
border: 2px solid #fff;
transition: background-color 0.3s, border-color 0.3s;
}

.left-column {
flex: 2;
padding-right: 20px;
}

.right-column {
flex: 1;
padding-left: 20px;
}

.add-task, .add-priority-task, .add-tomorrow-task, .add-appointment-task {
display: flex;
margin-bottom: 10px;
}

.add-task input,
.add-priority-task input,
.add-tomorrow-task input,
.add-appointment-task input {
flex: 1;
padding: 10px;
font-size: 14px;
height: 40px;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing: border-box;
}

.add-task button,
.add-priority-task button,
.add-tomorrow-task button,
.add-appointment-task button {
padding: 10px 15px;
margin-left: 5px;
background: #b64515;
color: white;
border: none;
border-radius: 5px;
cursor: pointer;
}

h3 {
margin-top: 20px;
color: #555;
font-family: 'Georgia', serif;
font-size: 1rem;
font-weight: bold;
text-transform: uppercase;
border-bottom: 2px solid #b64515;
padding-bottom: 5px;
}

.items, .priority-container, .tomorrow-container, .appointments-container {
border: 1px solid #F1F1F1;
border-radius: 5px;
margin-bottom: 10px;
padding: 10px;
background: #f9f9f9;
max-height: 200px;
overflow-y: auto;
}

.item, .priority-item, .tomorrow-item, .appointment-item {
display: flex;
align-items: center;
border-bottom: 1px solid #F1F1F1;
padding: 5px 0;
word-wrap: break-word;
}

.item:last-child, .priority-item:last-child, .tomorrow-item:last-child, .appointment-item:last-child {
border-bottom: 0;
}

.item.completed p {
text-decoration: line-through;
color: #999;
}

input[type="checkbox"] {
margin: 0 10px 0 0;
}

.notes-container {
margin-top: 10px;
}

textarea {
width: 100%;
height: 100px;
padding: 10px;
font-size: 16px;
border: 1px solid #ccc;
border-radius: 5px;
box-sizing: border-box;
}

.remove-completed {
margin-top: 10px;
background: #b64515;
color: white;
border: none;
padding: 10px;
cursor: pointer;
width: 100%;
border-radius: 5px;
}

.remove-completed:hover {
background: #FF2E2E;
}
