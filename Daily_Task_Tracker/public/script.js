let allTasks = [];

async function fetchTasks() {
  const res = await fetch("/api/tasks");
  allTasks = await res.json();
  displayTasks(allTasks);
}

function isOverdue(task) {
  return task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "Done";
}

function displayTasks(tasks) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach(task => {
    const li = document.createElement("li");

    let text = `${task.title} (${task.status})`;

    if (isOverdue(task)) {
      text += " 🔴 Overdue";
    }

    li.innerHTML = `
      ${text}
      <button onclick="deleteTask('${task._id}')">Delete</button>
    `;

    list.appendChild(li);
  });
}

async function addTask() {
  const title = document.getElementById("title").value;
  const description = document.getElementById("desc").value;
  const dueDate = document.getElementById("date").value;
  const status = document.getElementById("status").value;

  await fetch("/api/tasks", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, description, dueDate, status })
  });

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

function filterTasks(status) {
  if (status === "All") {
    displayTasks(allTasks);
  } else {
    displayTasks(allTasks.filter(t => t.status === status));
  }
}

fetchTasks();