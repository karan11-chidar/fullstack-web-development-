let title = document.getElementById('titleInput');
let description = document.getElementById('descriptionInput');
let inputBtn = document.getElementById('inputBtn');
let taskList = document.getElementById('taskList');
let taskListArray = JSON.parse(localStorage.getItem('localTask')) || []; 

// Master Listener
taskList.addEventListener("click", function (event) {
    if (!event.target.closest) return;
    
    let taskCard = event.target.closest('.task-card'); // .task-card theek kiya
    if (!taskCard) return; // Agar click card ke bahar hua toh ruk jao

    let taskIndex = taskCard.dataset.index;
    let currentTask = taskListArray[taskIndex]; // Array se exact task nikal liya

    if (event.target.closest(".delete-btn")) {
        taskListArray.splice(taskIndex, 1); // direct index se delete
        localStorage.setItem('localTask', JSON.stringify(taskListArray));
        taskCard.remove(); // taskElement ki jagah taskCard
    } 
    else if (event.target.closest(".edit-btn")) {
        let newTitle = prompt('Enter New Title :', currentTask.title);
        let newDescription = prompt('Enter new Description :', currentTask.description);
        
        if (newTitle) {
            taskCard.querySelector("h3").textContent = newTitle;
            currentTask.title = newTitle; 
        }
        if (newDescription) {
            taskCard.querySelector("p").textContent = newDescription;
            currentTask.description = newDescription; 
        }
        localStorage.setItem("localTask", JSON.stringify(taskListArray));
    } 
    else if (event.target.closest(".complete-btn")) {
        currentTask.complete = !currentTask.complete;
        localStorage.setItem("localTask", JSON.stringify(taskListArray)); // Adha likha hua theek kiya
        taskCard.classList.toggle('completed');
    }
});
function renderTask(task,index) {
      let taskElement = document.createElement("div");
    taskElement.classList.add('task-card');
    taskElement.dataset.index = index;
    taskElement.innerHTML = ` <div class="task-info">
                            <h3>${task.title}</h3>
                            <p>${task.description}</p>
                        </div>
                        <div class="task-actions">
                            <button class="delete-btn"><i data-lucide="trash-2"></i></button>
                            <button class="edit-btn"><i data-lucide="pencil"></i></button>
                             <button class="complete-btn"><i data-lucide="circle-check-big"></i></button>
                        </div>
                        `;
    
    taskList.appendChild(taskElement);
    title.value = '';
    description.value = '';
    lucide.createIcons();
}
taskListArray.forEach((task,index) => {
    renderTask(task,index);
});

inputBtn.addEventListener('click', function () {
    let titleStr = title.value;
    let descriptionnStr = description.value;
        if (titleStr === "" || descriptionnStr === "") {
          alert("Bhai, pehle title aur description dono bharo!");
          return;
    }
    let newTask = { title: titleStr, description: descriptionnStr, complete: false };
    taskListArray.push(newTask);
    //console.table(taskListArray);
    let data = JSON.stringify(taskListArray);
    // console.table(data);
    localStorage.setItem('localTask', data);
    //console.log(localStorage);
    renderTask(newTask,taskListArray.length-1);
    titleStr.value = '';
    descriptionnStr = '';
})
