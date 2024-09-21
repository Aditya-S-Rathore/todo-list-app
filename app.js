// app.js

let tasks = [];

// Event listener for form submission to add a task
document.getElementById('taskForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const endDate = document.getElementById('endDate').value;
    const priority = parseInt(document.getElementById('priority').value);

    const task = {
        id: Date.now(),
        title: title,
        description: description,   
        endDate: endDate,
        priority: priority,
        status: "To Do" // Default status
    };

    tasks.push(task);
    renderTasks();
    clearForm();
});

// Function to render tasks to the UI
function renderTasks() {
    const toDoList = document.getElementById('to-do');
    const doingList = document.getElementById('doing');
    const doneList = document.getElementById('done');

    // Clear existing content
    toDoList.innerHTML = "";
    doingList.innerHTML = "";
    doneList.innerHTML = "";

    // Populate tasks in the appropriate lists
    tasks.forEach(task => {
        const taskElement = document.createElement('li');
        taskElement.classList.add('list-group-item');
        if (task.status === "Done") taskElement.classList.add('completed');

        taskElement.innerHTML = `
            <span><strong>${task.title} - ${task.endDate}</strong> -${task.description} </span>
           <span class="button-group">
                <button class="btn btn-success btn-custom" onclick="markComplete(${task.id})">Complete</button>
                <button class="btn btn-success btn-custom" onclick="markDoing(${task.id})">On it</button>
                <button class="btn btn-danger btn-custom" onclick="deleteTask(${task.id})">Delete</button>
            </span>

        `;

        if (task.status === "To Do") {
            toDoList.appendChild(taskElement);
        } else if (task.status === "Doing") {
            doingList.appendChild(taskElement);
        } else if (task.status === "Done") {
            doneList.appendChild(taskElement);
        }
    });
}
// Function to mark doing
function markDoing(id) {
    const task = tasks.find(task => task.id === id);
    task.status = "Doing";
    renderTasks();
}

// Function to mark task as complete
function markComplete(id) {
    const task = tasks.find(task => task.id === id);
    task.status = "Done";
    renderTasks();
}

// Function to delete a task
function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Function to clear form fields
function clearForm() {
    document.getElementById('title').value = "";
    document.getElementById('description').value = "";
    document.getElementById('endDate').value = "";
    document.getElementById('priority').value = "1";
}

// Sort tasks by priority
document.getElementById('sortByPriority').addEventListener('click', function() {
    tasks.sort((a, b) => b.priority - a.priority);
    renderTasks();
});

// Sort tasks by end date
document.getElementById('sortByEndDate').addEventListener('click', function() {
    tasks.sort((a, b) => new Date(a.endDate) - new Date(b.endDate));
    renderTasks();
});
