import {inputBox, listContainer, completedCounter, uncompletedCounter} from "./script.js";
//**
// * Adds a task to the list
// */
export function addTask() {
    const task = inputBox.value.trim();
    if (!task) {
        document.getElementById("alert").style.display = "block";
        return;
    }
    const li = document.createElement("li");
    li.innerHTML = `
    <div class = "li-div" ondragstart= "event.preventDefault()">
    <label>
    <input type="checkbox">
    <span>${task}</span>
    </label>
    <span class="delete-button">Delete</span>
    <span class="edit-button">Edit</span>
    </div>
    `;

    listContainer.appendChild(li);
    inputBox.value = "";
    updateCounters();
    makeElementsDraggable();
    

    const checkbox = li.querySelector("input");
    const editButton = li.querySelector(".edit-button");
    const taskSpan = li.querySelector("span");
    const deleteButton = li.querySelector(".delete-button");

    checkbox.addEventListener("click", function () {
        li.classList.toggle("completed", checkbox.checked);
        updateCounters();
    });

    editButton.addEventListener("click", function () {
        document.getElementById("edit-task").style.display = "block";
        const editTaskScreen = document.getElementById("edit-task");
        const editBox = editTaskScreen.querySelector(".edit-item");
        const doneButton = editTaskScreen.querySelector(".done-button");
        const cancelButton = editTaskScreen.querySelector(".cancel-button");
        doneButton.addEventListener("click", function () {
            const update = editBox.value.trim();
            if (!update) {
                document.getElementById("alert").style.display = "block";
                return;
            }
            if (update !== null) {
                taskSpan.textContent = update;
                li.classList.remove("completed");
            }
            checkbox.checked = false;
            updateCounters();
        })
        editBox.addEventListener("keypress", function(event) {
            if (event.key === "Enter") {
              event.preventDefault();
              doneButton.click();
            }
        });
        cancelButton.addEventListener("click", function () {
            this.parentElement.style.display='none';
        })
        editBox.value = "";
    });

    deleteButton.addEventListener("click", function () {
        document.getElementById("confirm-delete").style.display = "block";
        const confirmScreen = document.getElementById("confirm-delete");
        const yesButton = confirmScreen.querySelector(".yes-button");
        const noButton = confirmScreen.querySelector(".no-button");
        yesButton.addEventListener("click", function () {
            li.remove();
            updateCounters();
            this.parentElement.style.display='none';
        })
        noButton.addEventListener("click", function () {
            this.parentElement.style.display='none';
        })
    });

    
}