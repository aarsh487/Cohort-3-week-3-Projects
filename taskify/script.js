const addTaskButton = document.getElementById('addTaskButton');
const taskInput = document.getElementById('taskInput');

addTaskButton.addEventListener('click', addTask);

function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") return;

    const taskElement = document.createElement('div');
    taskElement.className = 'task';
    taskElement.draggable = true;
    taskElement.textContent = taskValue;

    taskElement.addEventListener('dragstart', dragStart);
    taskElement.addEventListener('dragend', dragEnd);

    const todoList = document.querySelector('#todo .task-list');
    todoList.appendChild(taskElement);
    taskInput.value = '';
}

// Drag and Drop Functions
let draggedTask;

function dragStart(event) {
    draggedTask = this;
    setTimeout(() => {
        this.style.display = "none";
    }, 0);
}

function dragEnd(event) {
    setTimeout(() => {
        draggedTask.style.display = "block";
        draggedTask = null;
    }, 0);
}

const taskLists = document.querySelectorAll('.task-list');
taskLists.forEach(list => {
    list.addEventListener('dragover', dragOver);
    list.addEventListener('drop', drop);
});

function dragOver(event) {
    event.preventDefault(); // Allow dropping
}

function drop(event) {
    event.preventDefault();
    this.appendChild(draggedTask);
}
