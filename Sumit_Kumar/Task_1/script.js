// Get elements
const addButton = document.getElementById('addButton');
const taskInput = document.getElementById('taskInput');
const list = document.getElementById('taskList');
const quoteDisplay = document.getElementById('quoteDisplay');

const quotes = [
    "Keep going! 💪",
    "You're doing great! 🌟",
    "One step at a time! 🪜",
    "Every task completed is progress! 🚀",
    "Success is built one task at a time! 🏆",
    "Believe you can and you're halfway there. ✨",
    "The secret of getting ahead is getting started. 🏁"
];

function displayRandomQuote() {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteDisplay.textContent = randomQuote;
}

function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") {
        alert("Please enter a task!");
        return;
    }

    const li = document.createElement('li');
    const span = document.createElement('span');
    const checkbox = document.createElement('input');
    const editButton = document.createElement('button');
    const deleteButton = document.createElement('button');

    checkbox.type = 'checkbox';
    span.textContent = taskText;
    editButton.textContent = "Edit";
    deleteButton.textContent = "Delete";

    checkbox.addEventListener('change', function() {
        if (checkbox.checked) {
            span.style.textDecoration = "line-through";
            span.style.color = "gray";
            li.classList.add('task-completed-animation');
            displayRandomQuote();
            setTimeout(() => { li.classList.remove('task-completed-animation'); }, 700);
        } else {
            span.style.textDecoration = "none";
            span.style.color = "white";
        }
    });

    editButton.addEventListener('click', function() {
        const newText = prompt("Edit your task:", span.textContent);
            if (newText !== null && newText.trim() !== "") {
                span.textContent = newText.trim();
            }
        });

    deleteButton.addEventListener('click', function() {
        list.removeChild(li);
    });

    const leftDiv = document.createElement('div');
    leftDiv.className = 'task-item-left';
    const rightDiv = document.createElement('div');
    rightDiv.className = 'task-item-right';

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);
    rightDiv.appendChild(editButton);
    rightDiv.appendChild(deleteButton);

    li.appendChild(leftDiv);
    li.appendChild(rightDiv);
    list.appendChild(li);

    taskInput.value = "";
}

addButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === "Enter") addTask();
});

displayRandomQuote();