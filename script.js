// GET HTML ELEMENTS

const taskForm = document.getElementById("taskForm");
const taskTitle = document.getElementById("taskTitle");
const taskSubject = document.getElementById("taskSubject");
const tasksContainer = document.getElementById("tasksContainer");

// CREATE AN ARRAY TO STORE TASKS

let tasks =
JSON.parse(localStorage.getItem("tasks")) || [];

// FUNCTION TO DISPLAY TASKS

function displayTasks() {

    tasksContainer.innerHTML = "";

    // Calculate task statistics

    const totalTasks = tasks.length;

    const completedTasks = tasks.filter(
        task => task.completed
    ).length;

    const pendingTasks = totalTasks - completedTasks;

    // Display statistics

    document.getElementById("taskStats").innerHTML = `

        <div class="stat-card">
            <h3>${totalTasks}</h3>
            <p>Total Tasks</p>
        </div>

        <div class="stat-card">
            <h3>${completedTasks}</h3>
            <p>Completed</p>
        </div>

        <div class="stat-card">
            <h3>${pendingTasks}</h3>
            <p>Pending</p>
        </div>

    `;

    // Check if there are no tasks

    if (tasks.length === 0) {

        tasksContainer.textContent =
            "No study tasks yet. Add your first task!";

        return;
    }

    // Display individual tasks

    tasks.forEach(function(task, index) {

        const taskDiv = document.createElement("div");

        taskDiv.className = task.completed
            ? "task-item completed"
            : "task-item";

        const title = document.createElement("h3");
        title.textContent = task.title;

        const subject = document.createElement("p");
        subject.textContent = "Subject: " + task.subject;

        const completeButton = document.createElement("button");

        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeButton.className = "complete-btn";

        completeButton.addEventListener("click", function() {
            completeTask(index);
        });

        const deleteButton = document.createElement("button");

        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", function() {
            deleteTask(index);
        });

        taskDiv.appendChild(title);
        taskDiv.appendChild(subject);
        taskDiv.appendChild(completeButton);
        taskDiv.appendChild(deleteButton);

        tasksContainer.appendChild(taskDiv);

    });

}

// FUNCTION TO ADD TASKS

taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    const title = taskTitle.value.trim();
    const subject = taskSubject.value.trim();

    if (title === "" || subject === "") {
        alert("Please enter both task title and subject.");
        return;
    }

    const newTask = {
        title: title,
        subject: subject,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();

    displayTasks();

    taskForm.reset();

});

// FUNCTION TO COMPLETE TASKS

function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}

// FUNCTION TO DELETE TASKS

function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

}

// FUNCTION TO SAVE IN LOCAL STORAGE

function saveTasks(){

    localStorage.setItem("tasks", JSON.stringify(tasks));

}

displayTasks();