document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskinput');
    const addTaskBtn = document.querySelector('.buttonadd');
    const taskList = document.getElementById('tasklist');
    const midText = document.querySelector('.centerempty');
    let points = 0;
    const milestones = [50, 100, 150, 200, 250, 300, 350, 400, 500, 600, 700, 800 ,900, 1000]; 
    const achievedMilestones = new Set();

    const popup = document.getElementById('milestone-popup');
    const popupText = document.getElementById('popup-text');

    function showMilestonePopup(points) {
    popupText.textContent = `🎉 Congratulations! You reached ${points} points!`;
    popup.classList.add('show');

    setTimeout(() => {
        popup.classList.remove('show');
    }, 2000); 
    }

    const togglEmptyState = () => {
        midText.style.display = taskList.children.length === 0 ? 'block':'none';

    };

    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        const li = document.createElement('li');
        li.textContent = taskText;

        li.classList.add('taskitem');
        li.innerHTML = `
        <input type="checkbox" class="checkbox">
        <span>${taskText}</span>
        <button class="delete-btn">✖</button>
        `;
        const pointsDisplay = document.getElementById('points');

        li.querySelector('.checkbox').addEventListener('change', (e) => {
            const span = li.querySelector('span');
            const checked = e.target.checked;

            span.style.textDecoration = checked ? 'line-through' : 'none';
            span.style.opacity = checked ? '0.6' : '1';
            points += checked ? 10 : -10;
            if (points < 0) points = 0;
            pointsDisplay.textContent = points;

            milestones.forEach(ms => {
            if (points >= ms && !achievedMilestones.has(ms)) {
            showMilestonePopup(ms);
            achievedMilestones.add(ms);
            }
            });
        });   
  


        li.querySelector('.delete-btn').addEventListener('click', () => {
        li.remove();
        togglEmptyState();
        });



        taskList.appendChild(li);
        taskInput.value = '';
        togglEmptyState();
    }

    addTaskBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask(e);
    });
});