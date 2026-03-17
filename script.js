document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addTaskButton = document.getElementById('addTaskButton');
    const taskList = document.getElementById('taskList');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `<span class="${task.completed ? 'complete' : ''}">${task.text}</span>
                            <button data-index="${index}">Delete</button>`;
            taskList.appendChild(li);
        });
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            tasks.push({ text: taskText, completed: false });
            updateLocalStorage();
            renderTasks();
            taskInput.value = '';
        }
    });

    taskList.addEventListener('click', function(event) {
        if (event.target.tagName === 'BUTTON') {
            const index = event.target.dataset.index;
            tasks.splice(index, 1);
            updateLocalStorage();
            renderTasks();
        } else if (event.target.tagName === 'SPAN') {
            const taskText = event.target.innerText;
            tasks = tasks.map(task => {
                if (task.text === taskText) {
                    task.completed = !task.completed
                }
                return task;
            });
            updateLocalStorage();
            renderTasks();
        }
    });

    renderTasks();
});