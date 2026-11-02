const heading = document.getElementById("heading");
const changeBtn = document.getElementById("changeBtn");
const colorBtn = document.getElementById("colorBtn");

const nameInput = document.getElementById("nameInput");
const displayText = document.getElementById("displayText");

const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

const keyInput = document.getElementById("keyInput");
const keyOutput = document.getElementById("keyOutput");


changeBtn.addEventListener("click", function () {

    heading.textContent = "Welcome to My Interactive Task List!";

});


colorBtn.addEventListener("click", function () {

    heading.classList.toggle("highlight");

});


nameInput.addEventListener("input", function () {

    if (nameInput.value === "") {

        displayText.textContent =
            "Your name will appear here.";

    } else {

        displayText.textContent =
            "Hello, " + nameInput.value + "!";

    }

});


addBtn.addEventListener("click", function () {

    const task = taskInput.value.trim();

    if (task !== "") {

        const li = document.createElement("li");

        li.textContent = task;

        const removeBtn =
            document.createElement("button");

        removeBtn.textContent = "Remove";

        removeBtn.className = "removeBtn";

        removeBtn.addEventListener("click", function () {

            li.remove();

        });

        li.appendChild(removeBtn);

        taskList.appendChild(li);

        taskInput.value = "";

    }

});


keyInput.addEventListener("keydown", function (event) {

    keyOutput.textContent =
        "You pressed: " + event.key;

});


const removeButtons =
    document.querySelectorAll(".removeBtn");

removeButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        button.parentElement.remove();

    });

});