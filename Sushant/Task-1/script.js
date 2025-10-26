const STORAGE_KEY = "sushant_simple_todos";
const addForm = document.getElementById("addForm");
const taskInput = document.getElementById("taskInput");
const taskListEl = document.getElementById("taskList");
const totalCountEl = document.getElementById("totalCount");
const doneCountEl = document.getElementById("doneCount");
const progressEl = document.getElementById("progressPercent");
const quoteTextEl = document.getElementById("quoteText");
const quoteBtn = document.getElementById("quoteBtn");
const clearBtn = document.getElementById("clearBtn");

const QUOTES = [
  "Small steps every day add up to big results.",
  "Done is better than perfect.",
  "Progress, not perfection.",
  "You don't have to be great to start.",
  "Celebrate small wins.",
];

let todos = [];

function save() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function load() {
  const raw = localStorage.getItem(STORAGE_KEY);
  todos = raw ? JSON.parse(raw) : [];
}

function newId() {
  return Date.now().toString(36);
}

function render() {
  taskListEl.innerHTML = "";

  if (todos.length === 0) {
    taskListEl.innerHTML = '<div class="small">No tasks yet.</div>';
  } else {
    todos.forEach((item) => {
      const row = document.createElement("div");
      row.className = "task" + (item.done ? " completed" : "");

      const cb = document.createElement("input");
      cb.type = "checkbox";
      cb.checked = !!item.done;
      cb.addEventListener("change", () => toggleDone(item.id));
      row.appendChild(cb);

      const title = document.createElement("div");
      title.className = "title";
      title.textContent = item.text;
      row.appendChild(title);

      const btnEdit = document.createElement("button");
      btnEdit.textContent = "Edit";
      btnEdit.style.marginRight = "6px";
      btnEdit.addEventListener("click", () => editTask(item.id));
      row.appendChild(btnEdit);

      const btnDel = document.createElement("button");
      btnDel.textContent = "Delete";
      btnDel.style.background = "#d94907";
      btnDel.addEventListener("click", () => deleteTask(item.id));
      row.appendChild(btnDel);

      taskListEl.appendChild(row);
    });
  }

  updateStats();
}

function updateStats() {
  const total = todos.length;
  const done = todos.filter((t) => t.done).length;
  totalCountEl.textContent = total;
  doneCountEl.textContent = done;
  const pct = total === 0 ? 0 : Math.round((done / total) * 100);
  progressEl.textContent = pct + "%";
}

function addTask(text) {
  if (!text || !text.trim()) return;
  todos.unshift({ id: newId(), text: text.trim(), done: false });
  save();
  render();
}

function deleteTask(id) {
  if (!confirm("Delete this task?")) return;
  todos = todos.filter((t) => t.id !== id);
  save();
  render();
}

function editTask(id) {
  const t = todos.find((x) => x.id === id);
  if (!t) return;
  const newText = prompt("Edit task text", t.text);
  if (newText === null) return; // user cancelled
  if (!newText.trim()) {
    alert("Task text cannot be empty");
    return;
  }
  t.text = newText.trim();
  save();
  render();
}

function toggleDone(id) {
  const t = todos.find((x) => x.id === id);
  if (!t) return;
  t.done = !t.done;
  save();
  render();
  if (t.done) {
    showRandomQuote();
  }
}

function showRandomQuote() {
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  quoteTextEl.textContent = '"' + q + '"';
}

addForm.addEventListener("submit", function (e) {
  e.preventDefault();
  addTask(taskInput.value);
  taskInput.value = "";
  taskInput.focus();
});

quoteBtn.addEventListener("click", showRandomQuote);

clearBtn.addEventListener("click", function () {
  if (!confirm("Clear all tasks?")) return;
  todos = [];
  save();
  render();
  quoteTextEl.textContent = "All cleared. Add new tasks!";
});

load();
render();
