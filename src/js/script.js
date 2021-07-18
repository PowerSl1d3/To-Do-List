function deleteTask(task) {
        const li = task.parentNode;
        const ul = li.parentNode;
        ul.removeChild(li);
        updateStorage();
}

function setCompleteTask(liElement) {

        const spanElement = liElement.getElementsByClassName("task");
        spanElement[0].classList.toggle("completed-task");
        updateStorage();

}

function createTask(taskText) {

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";

        const span = document.createElement("span");
        span.className = "task";
        span.textContent = taskText;

        const button = document.createElement("button");
        button.className = "delete-btn border-button";
        button.textContent = "Delete task";
        button.addEventListener("click", function () {
                deleteTask(button);
        });

        const newTask = document.createElement("li");
        newTask.append(checkbox, span, button);

        checkbox.addEventListener("click", function () {
                setCompleteTask(newTask);
        });

        return newTask;

}

function createTaskFromHTML(textHTML) {

        const newTask = document.createElement("li");
        newTask.innerHTML = textHTML;

        const button = newTask.getElementsByTagName("button")[0];
        button.addEventListener("click", function () {
                deleteTask(button);
        });

        const checkbox = newTask.getElementsByTagName("input")[0];
        checkbox.addEventListener("click", function () {
                setCompleteTask(newTask);
        });

        const span = newTask.getElementsByTagName("span")[0];
        if (span.classList.contains("completed-task")) {
                checkbox.checked = true;
        }

        return newTask;

}

function updateStorage() {

        const taskList = document.getElementById("task-list").getElementsByTagName("li");
        let htmlOfTasks = [];

        for (let x = 0; x < taskList.length; ++x) {

                htmlOfTasks.push(taskList[x].innerHTML);

        }

        localStorage.setItem("tasks", JSON.stringify(htmlOfTasks));

}

document.getElementById("add-task-button")
    .addEventListener("click", function() {

        const taskText = document.getElementById("input-task").value;

        if (!taskText) {
                return;
        }
        
        document.getElementById("input-task").value = "";

        const newTask = createTask(taskText);

        document.getElementById("task-list").append(newTask);

        updateStorage();

        taskList.push();
    });

let tasks = document.getElementsByClassName("task");

for (let x = 0; x < tasks.length; ++x) {

        tasks[x].previousElementSibling.addEventListener("click", function () {
                setCompleteTask(tasks[x].parentNode);
        });

}

let taskList = JSON.parse(localStorage.getItem("tasks")) || [];

for (let x = 0; x < taskList.length; ++x) {

        const newTask = createTaskFromHTML(taskList[x]);

        document.getElementById("task-list").append(newTask);

}