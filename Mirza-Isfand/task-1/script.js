const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const pointsDisplay = document.getElementById("points");
const progressBar = document.getElementById("progress-bar");

let points = localStorage.getItem("points") ? parseInt(localStorage.getItem("points")) : 0;
pointsDisplay.innerText = `Points: ${points}`;
progressBar.style.width = (points % 100) + "%";

function addTask() {
  if (inputBox.value.trim() === '') {
    alert("You must write something");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);

    let span = document.createElement("span");
    span.innerHTML = "\u00d7"; // × symbol
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
}

inputBox.addEventListener("keydown", function(event) {
  if (event.key === "Enter") {
    addTask();
  }
});

listContainer.addEventListener("click", function(e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");

    if (e.target.classList.contains("checked")) {
      points += 10;
    } else {
      points -= 10;
    }

    pointsDisplay.innerText = `Points: ${points}`;
    localStorage.setItem("points", points);

    progressBar.style.width = (points % 100) + "%";

    if (points > 0 && points % 50 === 0) {
      alert("🎉 Level Up! You’re crushing your goals!");
    }

    saveData();
  } else if (e.target.tagName === "SPAN") {
    e.target.parentElement.remove();
    saveData();
  }
}, false);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
}

showTask();

document.getElementById("reset-points-btn").addEventListener("click", () => {
  if (confirm("Are you sure you want to reset your points?")) {
    points = 0;
    localStorage.setItem("points", points);
    pointsDisplay.innerText = `Points: ${points}`;
    progressBar.style.width = "0%";
    alert("✅ Points have been reset!");
  }
});

