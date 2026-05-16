// global array
let editTaskIndex = null;
const tasksList = JSON.parse(localStorage.getItem('localTask')) || [];
console.log(tasksList);
// date and time set initally
let dateAndTime = new Date().toISOString().split('T');
document.getElementById('date-picker').value = dateAndTime[0];
document.getElementById('time-picker').value = dateAndTime[1];


// Modals Ids
let sidebar = document.getElementById('sidebar');
let menuBtn = document.getElementById('menuBtn');
let openModal = document.getElementById('addTaskBtn');
let closeModal = document.getElementById('closeModal');
let taskModal = document.getElementById('taskModal');
let saveModal = document.getElementById('saveModal');
let taskGrid = document.getElementById("task-table");
let dropdownFilter = document.getElementById("dropdownInput");
let searchFilter = document.getElementById("searchInput");
 
// Handle Ui with js 
openModal.addEventListener('click', function () {
  console.log('click add task modal');
  taskModal.style.display = 'flex';
})

closeModal.addEventListener('click', function () {
  console.log('click close modal');
  taskModal.style.display = 'none';
})

menuBtn.addEventListener('click', function () {
  console.log('click menu btn');
  sidebar.classList.toggle('open');
})

// update stats
function updateStats() {
    // Stats Inputs
    let productiveStats = document.getElementById('prod-stats')
    let activeStats = document.getElementById("act-stats");
    let MileStats = document.getElementById("comp-stats");

    // Calculate stats
    let totalTask = tasksList.length;
    let completedTask = tasksList.filter(task => {
        return task.completed === true;
    }).length;
    console.log(completedTask);
    let pendingTask = totalTask - completedTask;
    let productive =(totalTask===0)?0:((completedTask / totalTask) * 100).toFixed(1);
    console.log(pendingTask);
    productiveStats.innerText = `${productive}%`;
    activeStats.innerText = `${pendingTask}`;
    MileStats.innerText = `${completedTask}`
}
 //refresh ui 
function refreshUI(taskList = tasksList) {
  // 1. Pehle poore UI grid ko khali karo
  taskGrid.innerHTML = "";

  // 2. Updated array se saare cards wapas lagao sahi index ke sath
  taskList.forEach(function (item, index) {
    renderTask(item, index);
  });
  localStorage.setItem("localTask", JSON.stringify(tasksList));
  updateStats();
    console.log(localStorage);
}

// Buttons Actions handle
taskGrid.addEventListener('click', function (event) {
    if (!(event.target.closest)) return;

    let taskCard = event.target.closest('.task-card');
    if (!taskCard) return;
    let cardNumber = taskCard.dataset.index;
    console.log(cardNumber);
    let currentTask = tasksList[cardNumber];

    // Delete Button
    if (event.target.closest(".delete-task")) {
      tasksList.splice(cardNumber, 1);
        localStorage.setItem("localTask", JSON.stringify(tasksList));
      console.log('delte card')
      refreshUI();
      taskCard.remove();
    } else if (event.target.closest(".edit-task")) {
      // Again Open task modal
      taskModal.style.display = "flex";
      editTaskIndex = cardNumber;
      // Fill the value of Current task
      document.getElementById("titleInput").value = currentTask.title;
      document.getElementById("prioritySelect").value = currentTask.priority;
      document.getElementById("descriptionInput").value =
        currentTask.description;
      document.getElementById("date-picker").value = currentTask.date;
      document.getElementById("time-picker").value = currentTask.time;
      refreshUI()
      console.log("fill the all previous values");
    } else if (event.target.closest(".complete-task")) {
        taskCard.classList.toggle("completed");
      if (!currentTask.completed) {
        currentTask.completed = true;
        // 2. UI par status text ko change karo
        let statusDiv = taskCard.querySelector(".task-status");
        statusDiv.innerHTML = '<span class="status-dot"></span> Completed';
      } else {
        currentTask.completed = false;
        // 2. UI par status text ko change karo
        let statusDiv = taskCard.querySelector(".task-status");
        statusDiv.innerHTML = '<span class="status-dot"></span> InProgress';
      }

      localStorage.setItem("localTask", JSON.stringify(tasksList));
      updateStats();
        console.log(localStorage)
    }
})
function renderTask(task,taskNumber){
  let newTask = document.createElement('div');
  newTask.classList.add('task-card');
  newTask.dataset.index = taskNumber;
  newTask.innerHTML = ` <!-- Top -->
        <div class="task-top">

            <span class="badge high">${task.priority}</span>

            <div class="task-menu">
                <i data-lucide="more-horizontal"></i>
            </div>

        </div>

        <!-- Title -->
        <h4 class="task-title">${task.title}</h4>

        <!-- Description -->
        <p class="task-desc">
           ${task.description}
        </p>

        <!-- Date & Time -->
        <div class="task-date-time">

            <div class="task-info">
                <i data-lucide="calendar-days"></i>
                <span>${task.date}</span>
            </div>

            <div class="task-info">
                <i data-lucide="clock-3"></i>
                <span>${task.time}</span>
            </div>

        </div>

        <!-- Status -->
        <div class="task-status-row">

            <div class="task-status working">
                <span class="status-dot"></span>
                In Progress
            </div>

            <div class="task-priority">
                <i data-lucide="flag"></i>
                Priority Task
            </div>

        </div>

        <!-- Footer -->
        <div class="task-footer">

            <!-- User -->
            <div class="task-user">
                <div class="user-avatar">K</div>
                <span>Karan</span>
            </div>

            <!-- Actions -->
            <div class="task-actions">

                <button class="task-btn edit-task">
                    <i data-lucide="square-pen"></i>
                </button>

                <button class="task-btn delete-task">
                    <i data-lucide="trash-2"></i>
                </button>

                <button class="task-btn complete-task">
                    <i data-lucide="circle-check-big"></i>
                </button>

            </div>
        </div>`;
  taskGrid.appendChild(newTask);
  lucide.createIcons();
}
// save task form
saveModal.addEventListener('click', function (event) {
  console.log('click sumbit button');
  //  inputs values
  let title = document.getElementById('titleInput').value;
  let priority = document.getElementById('prioritySelect').value;
  let description = document.getElementById('descriptionInput').value;
  let date = document.getElementById('date-picker').value;
  let time = document.getElementById('time-picker').value;
  
    if (title.trim() === '') { alert('Please Enter Correct Title .'); return; }
    if (priority === '') { alert('Enter priority task .'); return; }
    if (description.trim() === '') { alert('Enter Correct Description .'); return; }
    if (date === '' || time === '') { alert('Enter correct date and time format .'); return }
  // object values tasks
  const task = {
    title: title,
    description: description,
    priority: priority,
    completed: false,
    date: date,
    time:time
    }
    if (editTaskIndex === null) {
        tasksList.push(task);
    }
    else {
        tasksList[editTaskIndex] = task;
        editTaskIndex = null;
    }
  refreshUI();
  title.value = '';
  description.value = '';
  priority.value = '';
  taskModal.style.display = 'none';
})

function filterTask() {
  // filter inputs ids
    let dropdownValue = document.getElementById('dropdownInput').value;
    let searchValue = document.getElementById('searchInput').value;

  // format filter values
  let dropdownText = dropdownValue.toLowerCase();
  let searchText = searchValue.toLowerCase();

  let filterResult = tasksList.filter(task => {
    if (
      ((task.priority.toLowerCase() === dropdownText) ||(dropdownText === ""))
      && (task.title.toLowerCase().includes(searchText)))
    {
      return task;
    }
  });
  console.log(filterResult);
  refreshUI(filterResult);
  dropdownValue.value = "";
  searchValue.value = "";
  console.log(dropdownText);
  console.log(searchText);
}
dropdownFilter.addEventListener('change', function () {
  console.log('dropdwon fileter is rungin')
   filterTask();
})
let searchTimer;
searchFilter.addEventListener('input', function () {
  console.log("search bar is runing");

  clearTimeout(searchTimer);
  console.log('timer start now')
  searchTimer = setTimeout(function () {
    filterTask();
  },1500)
})
refreshUI();
lucide.createIcons()