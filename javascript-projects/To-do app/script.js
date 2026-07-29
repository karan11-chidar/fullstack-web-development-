function addTask() {
    let inputTask = document.getElementById('taskInput');
    let taskBtn = document.getElementById('addTaskButton');
    let resultTask = document.getElementById('resultList');
    if (inputTask.value.trim() === '') {
        alert('Enter a vaild task not a empty......');
        return;
    }
    let newTask = document.createElement('li');
    let deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    let editBtn = document.createElement('button');
    editBtn.textContent = 'Edit';
    newTask.textContent = inputTask.value;
    newTask.appendChild(deleteBtn);
    newTask.appendChild(editBtn);
    resultTask.appendChild(newTask);
    inputTask.value = '';
}
