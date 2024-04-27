document.addEventListener("DOMContentLoaded", () => {
  const inputAdd = document.getElementById("inputAdd");
  const list = document.getElementById("list");
  const addButton = document.getElementById("addButton");
  const darkModeButton = document.querySelector(".dark-mode-btn");

  // Funkcja przełączająca tryb ciemny
  darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  // Funkcja dodająca zadanie do listy
  addButton.addEventListener("click", () => {
    addTask();
  });

  // Dodawanie nowego zadania
  function addTask() {
    const taskContent = inputAdd.value.trim();
    if (!taskContent) {
      alert("Please enter a task.");
      return;
    }

    // Tworzenie i dodawanie elementu zadania do listy
    const taskElement = createTaskElement(taskContent);
    list.appendChild(taskElement);

    inputAdd.value = ""; // Resetowanie pola tekstowego
    saveTasks(); // Zapisywanie zadań
  }

  // Tworzenie elementu zadania
  function createTaskElement(content) {
    const taskItem = document.createElement("li");
    taskItem.textContent = content;
    taskItem.className = "task-item";

    // Dodawanie ikon akcji
    const deleteIcon = createIcon("images/dustbin.png", "Delete task", () => {
      list.removeChild(taskItem);
      saveTasks();
    });

    const editIcon = createIcon("images/edit.png", "Edit task", () => {
      const newText = prompt("Edit task:", content);
      if (newText) {
        taskItem.textContent = newText;
        taskItem.appendChild(editIcon);
        taskItem.appendChild(deleteIcon);
        saveTasks();
      }
    });

    taskItem.appendChild(editIcon);
    taskItem.appendChild(deleteIcon);

    return taskItem;
  }

  // Tworzenie ikony akcji
  function createIcon(imgSrc, altText, onClickHandler) {
    const icon = document.createElement("img");
    icon.src = imgSrc;
    icon.alt = altText;
    icon.addEventListener("click", onClickHandler);
    icon.className = "action-icon";
    return icon;
  }

  // Zapisywanie zadań do localStorage
  function saveTasks() {
    const tasks = [];
    list.querySelectorAll(".task-item").forEach((taskItem) => {
      tasks.push(taskItem.firstChild.textContent); // Zapisujemy tylko tekst zadania
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Ładowanie zadań z localStorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach((taskContent) => {
      const taskElement = createTaskElement(taskContent);
      list.appendChild(taskElement);
    });
  }

  // Wywołanie funkcji ładowania zadań podczas inicjalizacji
  loadTasks();
});
