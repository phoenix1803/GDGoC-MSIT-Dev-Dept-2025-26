document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");
    const emptyImage = document.querySelector(".empty-image");


    const toggleEmptyState = () => {
        const hasTasks = taskList.querySelectorAll("li").length > 0;
        emptyImage.style.display = hasTasks ? "none" : "block";
    };


    const showWellDone = () => {
        const popup = document.createElement("div");
        popup.textContent = "🎉 Well Done! All tasks completed!";
        popup.className = "popup";
        document.body.appendChild(popup);

        setTimeout(() => {
            popup.classList.add("show");
        }, 100);

        setTimeout(() => {
            popup.classList.remove("show");
            setTimeout(() => popup.remove(), 500);
        }, 3000);
    };

    
    const checkAllCompleted = () => {
        const checkboxes = taskList.querySelectorAll(".checkbox");
        if (checkboxes.length > 0 && [...checkboxes].every(cb => cb.checked)) {
            showWellDone();
        }
    };


    const saveTasks = () => {
        const tasks = [];
        taskList.querySelectorAll("li").forEach(li => {
            tasks.push({
                text: li.querySelector("span").textContent,
                completed: li.querySelector(".checkbox").checked
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    };

 
    const loadTasks = () => {
        const saved = JSON.parse(localStorage.getItem("tasks")) || [];
        saved.forEach(task => {
            createTask(task.text, task.completed);
        });
        toggleEmptyState();
    };

    
    const createTask = (text, completed = false) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <input type="checkbox" class="checkbox" ${completed ? "checked" : ""}>
            <span>${text}</span>
            <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
        `;

   
        li.querySelector(".delete-btn").addEventListener("click", () => {
            li.remove();
            saveTasks();
            toggleEmptyState();
        });

    
        const checkbox = li.querySelector(".checkbox");
        checkbox.addEventListener("change", () => {
            saveTasks();
            checkAllCompleted();
        });

        taskList.appendChild(li);
    };


    const addTask = (event) => {
        event.preventDefault();
        const taskText = taskInput.value.trim();
        if (!taskText) return;

        createTask(taskText);
        taskInput.value = "";
        toggleEmptyState();
        saveTasks();
    };

    document.querySelector(".input-area").addEventListener("submit", addTask);
    taskInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") addTask(e);
    });


    loadTasks();
});
