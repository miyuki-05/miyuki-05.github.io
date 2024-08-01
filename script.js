import { addTask } from "./Task/addTask";
const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const completedCounter = document.getElementById("completed-counter");
const uncompletedCounter = document.getElementById("uncompleted-counter");
const confirmDeleteContainer = document.getElementById("confirm-delete");


addTask();

function updateCounters() {
    const completedTasks = document.querySelectorAll(".completed").length;
    const uncompletedTasks =
      document.querySelectorAll("li:not(.completed)").length;
  
    completedCounter.textContent = completedTasks;
    uncompletedCounter.textContent = uncompletedTasks;
}

inputBox.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
      event.preventDefault();
      document.getElementById("input-button").click();
    }
});

//**
// * Allows for saving and loading list using localStorage
// */
function loadList() {
    var number = 0;
    while (localStorage.getItem(`li${number}`) !== null) {
        const li = document.createElement("li");
        li.innerHTML = localStorage.getItem(`li${number}`);
        listContainer.appendChild(li);
        inputBox.value = "";
        updateCounters();
        makeElementsDraggable();


        const checkbox = li.querySelector("input");
        if (localStorage.getItem(`li${number} done`) === true) {
            li.classList.toggle("completed", checkbox.checked);
        }
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
        number++;
    }
}

function saveList() {
    localStorage.clear();
    const allListObjects = document.querySelectorAll("li");
    for (var i = 0; i < allListObjects.length; i++) {
        localStorage.setItem(`li${i}`, allListObjects[i].innerHTML);
        const checkbox = allListObjects[i].querySelector("input");
        localStorage.setItem(`li${i} done`, checkbox.indeterminate)
    } 
}


//**
// * Allows for elements to be draggable
// */

function makeElementsDraggable() {
    const draggables = document.querySelectorAll("li");
    for (let i = 0; i < draggables.length; i++) {
        draggables[i].draggable = "true";
      }
}

let draggedItem = null;
 
listContainer.addEventListener("dragstart", (e) => {
    draggedItem = e.target;
    setTimeout(() => {
        e.target.style.display =
            "none";
    }, 0);
});
 
listContainer.addEventListener("dragend", (e) => {
    setTimeout(() => {
        e.target.style.display = "";
        draggedItem = null;
    }, 0);
});
 
listContainer.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement =
        getDragAfterElement(
            listContainer,
            e.clientY);
    const currentElement =
        document.querySelector(
            ".dragging");
    if (afterElement == null) {
        listContainer.appendChild(
            draggedItem
        );} 
    else {
        listContainer.insertBefore(
            draggedItem,
            afterElement
        );}
    });
 
const getDragAfterElement = (container, y) => {
    const draggableElements = [
        ...container.querySelectorAll(
            "li:not(.dragging)"
        ),];
 
    return draggableElements.reduce(
        (closest, child) => {
            const box =
                child.getBoundingClientRect();
            const offset =
                y - box.top - box.height / 2;
            if (
                offset < 0 &&
                offset > closest.offset) {
                return {
                    offset: offset,
                    element: child,
                };} 
            else {
                return closest;
            }},
        {
            offset: Number.NEGATIVE_INFINITY,
        }
    ).element;
};

//**
// * Button to clear all tasks
// */
function clearTasks() {
    document.getElementById("list-container").innerHTML = "";
    updateCounters();
}

export {inputBox, listContainer, completedCounter, uncompletedCounter};