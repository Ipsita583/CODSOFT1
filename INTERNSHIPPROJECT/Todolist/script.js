document.addEventListener('DOMContentLoaded', function() {
    loadTasks();
});

function addTask() {
    var taskInput = document.getElementById('task-input');
    var taskText = taskInput.value.trim();

    if (taskText !== '') {
        var tasks = getTasks();

        tasks.push({ text: taskText, completed: false, id: Date.now() });

        saveTasks(tasks);
        renderTasks();

        taskInput.value = '';
    }
}

function editTask(id) {
    var tasks = getTasks();

    var updatedTasks = tasks.map(function(task) {
        if (task.id === id) {
            task.text = prompt('Edit task:', task.text);
        }
        return task;
    });

    saveTasks(updatedTasks);
    renderTasks();
}

function toggleComplete(id) {
    var tasks = getTasks();

    var updatedTasks = tasks.map(function(task) {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks(updatedTasks);
    renderTasks();
}

function deleteTask(id) {
    var tasks = getTasks();

    var updatedTasks = tasks.filter(function(task) {
        return task.id !== id;
    });

    saveTasks(updatedTasks);
    renderTasks();
}

function getTasks() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    var todoList = document.getElementById('todo-list');
    todoList.innerHTML = '';

    var tasks = getTasks();

    tasks.forEach(function(task) {
        var taskDiv = document.createElement('div');
        taskDiv.classList.add('task');

        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = task.completed;
        checkbox.onclick = function() {
            toggleComplete(task.id);
        };

        var taskText = document.createElement('span');
        taskText.innerText = task.text;

        var deleteButton = document.createElement('button');
        deleteButton.textContent = 'clear';
        deleteButton.onclick = function() {
            deleteTask(task.id);
        };

        taskDiv.appendChild(checkbox);
        taskDiv.appendChild(taskText);
        taskDiv.appendChild(deleteButton);

        todoList.appendChild(taskDiv);
    });
}

function loadTasks() {
    renderTasks();
}