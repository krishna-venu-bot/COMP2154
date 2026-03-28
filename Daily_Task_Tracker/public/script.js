let allTasks = [];

async function fetchTasks() {
  const res = await fetch("/api/tasks");
  allTasks = await res.json();
  applyFiltersAndSorting();
}

function isOverdue(task) {
  return (
    task.dueDate &&
    new Date(task.dueDate) < new Date() &&
    task.status !== "Done"
  );
}

function displayTasks(tasks) {
  const list = document.getElementById("list");
  list.innerHTML = "";

  tasks.forEach((task) => {
    const li = document.createElement("li");

    let text = `${task.title} (${task.status})`;

    if (task.dueDate) {
      text += ` - Due: ${new Date(task.dueDate).toLocaleDateString()}`;
    }

    if (isOverdue(task)) {
      text += " 🔴 Overdue";
    }

    li.innerHTML = `
      <span>${text}</span>
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
    body: JSON.stringify({ title, description, dueDate, status }),
  });

  document.getElementById("title").value = "";
  document.getElementById("desc").value = "";
  document.getElementById("date").value = "";
  document.getElementById("status").value = "To Do";

  fetchTasks();
}

async function deleteTask(id) {
  await fetch(`/api/tasks/${id}`, { method: "DELETE" });
  fetchTasks();
}

function sortTasks(tasks, sortOption) {
  const sortedTasks = [...tasks];

  if (sortOption === "dueDateAsc") {
    sortedTasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate) : new Date("2030-02-09");
      const dateB = b.dueDate ? new Date(b.dueDate) : new Date("2030-02-09");
      return dateA - dateB;
    });
  } else if (sortOption === "dueDateDesc") {
    sortedTasks.sort((a, b) => {
      const dateA = a.dueDate ? new Date(a.dueDate) : new Date("2030-02-09");
      const dateB = b.dueDate ? new Date(b.dueDate) : new Date("2030-02-09");
      return dateB - dateA;
    });
  } else if (sortOption === "titleAsc") {
    sortedTasks.sort((a, b) => a.title.localeCompare(b.title));
  } else if (sortOption === "titleDesc") {
    sortedTasks.sort((a, b) => b.title.localeCompare(a.title));
  }

  return sortedTasks;
}

function applyFiltersAndSorting() {
  const filterValue = document.getElementById("filter").value;
  const sortValue = document.getElementById("sort").value;

  let filteredTasks = [...allTasks];

  if (filterValue !== "All") {
    filteredTasks = filteredTasks.filter((task) => task.status === filterValue);
  }

  const sortedTasks = sortTasks(filteredTasks, sortValue);
  displayTasks(sortedTasks);
}

fetchTasks();
