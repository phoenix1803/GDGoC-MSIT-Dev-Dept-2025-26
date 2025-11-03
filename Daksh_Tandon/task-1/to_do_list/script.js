let btadd = document.getElementById("add");
let inp = document.getElementById("task");
let op = document.querySelector(".orderd");
let count = 0;
let body=document.body;
let complete = 0;
let log = document.getElementById("login");
let username = localStorage.getItem("username");
let box = document.querySelector(".box");

let heading = document.createElement("h2");
heading.className = "list";
heading.style.color="rgba(20,50,72,0.75)";
heading.style.marginTop="10px";
document.querySelector(".list").after(heading);
updateDisplay();

if (username) {
  document.querySelector("h1").textContent = `Welcome ${username}`;
  log.textContent = "Logout";
  box.style.display = "flex";
} else {
  alert("Please login to use the To Do app");
  box.style.display = "none";
}
log.addEventListener("click", () => {
  if (log.textContent === "Login") {
    let name = prompt("Enter your name to login:");
    let p = prompt("Enter your password:");
    if (name && name.trim() !== "" && p && p.trim() !== "") {
      localStorage.setItem("username", name.trim());
      localStorage.setItem("value", p.trim());
      document.querySelector("h1").textContent = `Welcome, ${name}!`;
      log.textContent = "Logout";
      box.style.display = "flex";
    } else {
      alert("Please enter a valid name or password!");
    }
  } else {
    document.querySelector("h1").textContent = "Welcome to our To Do App";
    box.style.display = "none";
    log.textContent = "Login";
    localStorage.removeItem("username");
    localStorage.removeItem("value");
  }
});


btadd.addEventListener("click", check);

function check() {
  if (inp.value.trim() === "") {
    alert("Please enter the text");
  } else if (count >= 10) {
    alert("You have reached the maximum number of tasks (10)");
    inp.value = "";
  } else {
    let li = document.createElement("li");
    li.textContent = inp.value;
    li.style.marginTop = "10px";
    li.style.display = "flex";
    li.style.justifyContent = "space-between";
    li.style.alignItems = "center";

    let del = document.createElement("button");
    del.id = "delete";

    del.addEventListener("click", () => {
      li.remove();
      count--;
      complete++;
      updateDisplay();
    });

    li.appendChild(del);
    op.appendChild(li);
    inp.value = "";
    count++;
    updateDisplay();
  }
}


function updateDisplay() {
  if(complete!=0){
    if(complete==(count+complete)){
      heading.textContent = `Keep it up ${complete}/${count + complete}`;
      body.style.backgroundImage = "url('images/congratulations-congrats.gif')";
     
      body.style.backgroundPosition="center";

    }
    else {
      body.style.backgroundImage="url('images/incredibly-beautiful-sunset-sun-lake-sunrise-landscape-panorama-nature-sky-amazing-colorful-clouds-fantasy-design-115177001.webp')";
      heading.textContent = `Keep it up ${complete}/${count + complete}`
    }
  }
 
}
