// --- 1. DATA STATE ---
let tasks = JSON.parse(localStorage.getItem("elite_tasks")) || [];

// --- 2. CORE LOGIC ---
function renderTasks(data = tasks) {
  const grid = document.getElementById("taskGrid");
  grid.innerHTML = "";

  data.forEach((task, index) => {
    const card = document.createElement("div");
    card.className = `task-card ${task.completed ? "completed" : ""}`;
    card.innerHTML = `
                <span class="badge ${task.priority}">${task.priority}</span>
                <h4>${task.title}</h4>
                <p>${task.desc}</p>
                <div class="task-actions">
                    <i data-lucide="${task.completed ? "rotate-ccw" : "check"}" class="action-icon" onclick="toggleTask(${index})"></i>
                    <i data-lucide="trash-2" class="action-icon" style="color:var(--danger)" onclick="deleteTask(${index})"></i>
                </div>
            `;
    grid.appendChild(card);
  });

  lucide.createIcons();
  updateStats();
  localStorage.setItem("elite_tasks", JSON.stringify(tasks));
}

function addTask() {
  const title = document.getElementById("taskTitle").value;
  const desc = document.getElementById("taskDesc").value;
  const priority = document.getElementById("taskPriority").value;

  if (!title) return alert("Title please, Master!");

  tasks.unshift({ title, desc, priority, completed: false });
  closeModal();
  renderTasks();
  document.getElementById("taskTitle").value = "";
  document.getElementById("taskDesc").value = "";
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Master, delete this task?")) {
    tasks.splice(index, 1);
    renderTasks();
  }
}

function updateStats() {
  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const pending = total - completed;
  const productivity = total === 0 ? 0 : Math.round((completed / total) * 100);

  document.getElementById("statProductivity").innerText = productivity + "%";
  document.getElementById("statCompleted").innerText = completed;
  document.getElementById("statPending").innerText = pending;
}

function filterTasks() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = tasks.filter(
    (t) =>
      t.title.toLowerCase().includes(term) ||
      t.desc.toLowerCase().includes(term),
  );
  renderTasks(filtered);
}

// --- 3. UI UTILS ---
function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("open");
}

function openModal() {
  document.getElementById("taskModal").style.display = "flex";
}
function closeModal() {
  document.getElementById("taskModal").style.display = "none";
}

// Init
window.onload = () => {
  renderTasks();
  lucide.createIcons();
};
