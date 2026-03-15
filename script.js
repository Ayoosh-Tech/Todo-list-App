function addTask(){

let input = document.getElementById("taskInput");
let task = input.value;

if(task === "") return;

createTask(task,false);

input.value = "";

updateTaskCount();
saveTasks();

}


function createTask(task,completed){

let li = document.createElement("li");

let span = document.createElement("span");
span.textContent = task;

if(completed){
span.classList.add("completed");
}

span.onclick = function(){
span.classList.toggle("completed");
saveTasks();
}

let deleteBtn = document.createElement("button");
deleteBtn.innerHTML = `
<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="white" viewBox="0 0 24 24">
<path d="M3 6h18M9 6V4h6v2M6 6l1 14h10l1-14"/>
</svg>
`;

deleteBtn.onclick = function(){
li.remove();
updateTaskCount();
saveTasks();
}

li.appendChild(span);
li.appendChild(deleteBtn);

document.getElementById("taskList").appendChild(li);

}


function updateTaskCount(){

let tasks = document.querySelectorAll("#taskList li");
let count = tasks.length;

document.getElementById("taskCount").textContent =
count + (count === 1 ? " task" : " tasks");

}


function saveTasks(){

let tasks = [];

document.querySelectorAll("#taskList li").forEach(function(li){

let text = li.querySelector("span").textContent;
let completed = li.querySelector("span").classList.contains("completed");

tasks.push({
text:text,
completed:completed
});

});

localStorage.setItem("tasks", JSON.stringify(tasks));

}


window.onload = function(){

let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(function(task){
createTask(task.text,task.completed);
});

updateTaskCount();

}