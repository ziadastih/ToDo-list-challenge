const sunBtn = document.getElementById("sun");
const moonBtn = document.getElementById("moon");
const bg = document.querySelector(".bg");
const input = document.getElementById("input");
const box = document.querySelector(".box");
const btns = document.querySelectorAll(".btn");
const circles = document.querySelectorAll(".circle");
const taskData = document.querySelector(".task-data");
const taskValue = document.querySelector(".task-value");
const filterBtns = document.querySelector(".filter-btns");
const allBtn = document.querySelector(".all");
const activeBtn = document.querySelector(".active-btn");
const completedTaskBtn = document.querySelector(".completed-btn");
const taskContainer = document.querySelector(".list-container");
const checkInputIcon = document.querySelector(".check-input");

// ========= our task array==========

const taskList = [];
let dark = true;
// =======================add tasks to the list ================
const addTask = document.getElementById("add-btn");
addTask.addEventListener("click", function () {
  if (input.value.length > 0) {
    taskList.push({ content: input.value, status: "active" });
    input.value = "";
    displayList(taskList);
    taskData.style.opacity = "1";
    addInputCheck();
  }
});

// ==========================dom content load ===================

window.addEventListener("DOMContentLoaded", function () {
  allBtn.classList.add("selected-filter");
  displayList(taskList);
});

// ======display item function and contains theme switch ================
function displayList(arr) {
  let listItems = "";
  if (arr.length == 0) {
    taskData.style.opacity = "0";
  }
  // ===========for loop to display our array

  for (let i = 0; i < arr.length; i++) {
    if (dark) {
      listItems += `<article class="task-box box">
<div class="task-check">
  <span class="circle completed" id=${i}>
    <img
      class="check"
      id=${i}
      src="./images/icon-check.svg"
      alt=""
    />
  </span>
  <p class="task" id=${i}>${arr[i].content}</p>
</div>
<img
  class="remove-task"
  id=${i}
  src="./images/icon-cross.svg"
  alt=""
/>
</article>`;
    } else {
      listItems += `<article class="task-box white-box box">
      <div class="task-check">
        <span class="circle white-circle completed" id=${i}>
          <img
            class="check"
            id=${i}
            src="./images/icon-check.svg"
            alt=""
          />
        </span>
        <p class="task white-task" id=${i}>${arr[i].content}</p>
      </div>
      <img
        class="remove-task"
        id=${i}
        src="./images/icon-cross.svg"
        alt=""
      />
      </article>`;
    }
  }

  taskContainer.innerHTML = listItems;
  taskValue.textContent = `${arr.length} tasks left`;
  const taskText = document.querySelectorAll(".task");
  const removeBtns = document.querySelectorAll(".remove-task");
  const checkIcon = document.querySelectorAll(".check");
  const taskBox = document.querySelectorAll(".task-box");
  const completedBtns = document.querySelectorAll(".completed");

  //   ==============theme switch ===============
  sunBtn.addEventListener("click", function () {
    dark = false;
    moonBtn.style.display = "flex";
    sunBtn.style.display = "none";
    document.body.style.backgroundColor = "var(--VeryLightGrayishBlue)";
    bg.classList.add("white-bg");
    box.classList.add("white-box");
    input.classList.add("white-input");
    filterBtns.classList.add("white-box");
    taskData.classList.add("white-box");
    circles.forEach(function (circle) {
      circle.classList.add("white-circle");
    });
    completedBtns.forEach(function (btn) {
      btn.classList.add("white-circle");
    });
    btns.forEach(function (btn) {
      btn.classList.add("white-btn");
    });
    taskText.forEach(function (task) {
      task.classList.add("white-task");
    });
    taskBox.forEach(function (box) {
      box.classList.add("white-box");
    });
  });
  moonBtn.addEventListener("click", function () {
    dark = true;
    document.body.style.backgroundColor = "var(--VeryDarkBlue)";
    moonBtn.style.display = "none";
    sunBtn.style.display = "flex";
    bg.classList.remove("white-bg");
    box.classList.remove("white-box");
    input.classList.remove("white-input");
    filterBtns.classList.remove("white-box");
    taskData.classList.remove("white-box");
    circles.forEach(function (circle) {
      circle.classList.remove("white-circle");
    });
    completedBtns.forEach(function (btn) {
      btn.classList.remove("white-circle");
    });
    btns.forEach(function (btn) {
      btn.classList.remove("white-btn");
    });
    taskText.forEach(function (task) {
      task.classList.remove("white-task");
    });
    taskBox.forEach(function (box) {
      box.classList.remove("white-box");
    });
  });

  //   ============end of theme switch================

  //   =========completed tasks function / add bg for circle /show the close btn /cross the task..switch status inside the array======

  completedBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      console.log(taskList);
      if (!btn.classList.contains("circle-completed")) {
        btn.classList.add("circle-completed");
        taskText.forEach(function (task) {
          if (task.id == btn.id) {
            task.classList.add("task-completed");
            let completedNum = parseInt(task.id);
            taskList[completedNum].status = "completed";
          }
        });
        removeBtns.forEach(function (removeBtn) {
          if (removeBtn.id == btn.id) {
            removeBtn.classList.add("show-opacity");
          }
        });
        checkIcon.forEach(function (icon) {
          if (icon.id == btn.id) {
            icon.classList.add("show-opacity");
          }
        });
      } else {
        btn.classList.remove("circle-completed");
        taskText.forEach(function (task) {
          if (task.id == btn.id) {
            task.classList.remove("task-completed");
            let number = parseInt(task.id);

            taskList[number].status = "active";
          }
        });
        removeBtns.forEach(function (removeBtn) {
          if (removeBtn.id == btn.id) {
            removeBtn.classList.remove("show-opacity");
          }
        });
        checkIcon.forEach(function (icon) {
          if (icon.id == btn.id) {
            icon.classList.remove("show-opacity");
          }
        });
      }
    });
  });
}
// ================timeout for check add-input==============

function addInputCheck() {
  addTask.classList.add("circle-completed");
  checkInputIcon.classList.add("show-opacity");
  setTimeout(function () {
    addTask.classList.remove("circle-completed");
    checkInputIcon.classList.remove("show-opacity");
  }, 300);
}
