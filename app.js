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
  let id = new Date().getTime().toString();

  if (arr.length == 0) {
    taskData.style.opacity = "0";
  }
  // ===========for loop to display our array depend which theme is======
  let displayCompleted = arr.map(function (task) {
    if (task.status === "completed" && dark === true) {
      return `<article class="task-box box">
    <div class="task-check">
      <span class="circle completed circle-completed" id=${id}>
        <img
          class="check show-opacity"
          id=${id}
          src="./images/icon-check.svg"
          alt=""
        />
      </span>
      <p class="task task-completed" id=${id}>${task.content}</p>
    </div>
    <img
      class="remove-task show-opacity"
      id=${id}
      src="./images/icon-cross.svg"
      alt=""
    />
    </article>`;
    } else if (task.status === "completed" && dark === false) {
      return `<article class="task-box white-box box">
        <div class="task-check">
          <span class="circle white-circle completed circle-completed" id=${id}>
             <img
               class="check show-opacity"
               id=${id}
               src="./images/icon-check.svg"
               alt=""
             />
           </span>
           <p class="task white-task task-completed" id=${id}>${task.content}</p>
         </div>
         <img
           class="remove-task show-opacity"
           id=${id}
           src="./images/icon-cross.svg"
           alt=""
         />
         </article>`;
    }
  });
  let displaytasks = arr.map(function (task) {
    if (task.status === "active" && dark === true) {
      return `<article class="task-box box">
<div class="task-check">
  <span class="circle completed" id=${id}>
    <img
      class="check"
      id=${id}
      src="./images/icon-check.svg"
      alt=""
    />
  </span>
  <p class="task" id=${id}>${task.content}</p>
</div>
<img
  class="remove-task"
  id=${id}
  src="./images/icon-cross.svg"
  alt=""
/>
</article>`;
    } else if (task.status === "active" && dark === false) {
      return `<article class="task-box white-box  box">
          <div class="task-check">
             <span class="circle completed white-circle" id=${id}>
               <img
                 class="check"
                 id=${id}
                 src="./images/icon-check.svg"
                 alt=""
               />
             </span>
             <p class="task white-task" id=${id}>${task.content}</p>
           </div>
           <img
             class="remove-task"
             id=${id}
             src="./images/icon-cross.svg"
             alt=""
           />
           </article>`;
    }
  });
  displayCompleted = displayCompleted.join("");
  displaytasks = displaytasks.join("");

  taskContainer.innerHTML = `${displaytasks} ${displayCompleted}`;
  taskValue.textContent = `${displaytasks.length} tasks left`;
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

  // ==================filter btns===================
  // ==================all btn filter========================
  allBtn.addEventListener("click", function () {
    displayList(taskList);
    completedTaskBtn.classList.remove("selected-filter");
    allBtn.classList.add("selected-filter");
    activeBtn.classList.remove("selected-filter");
  });
  // ==============active btn filter===============================
  activeBtn.addEventListener("click", function () {
    const activetasks = taskList.filter(function (task) {
      return task.status === "active";
    });
    activeBtn.classList.add("selected-filter");
    completedTaskBtn.classList.remove("selected-filter");
    allBtn.classList.remove("selected-filter");

    displayList(activetasks);
  });
  completedTaskBtn.addEventListener("click", function () {
    const completedTaskArr = taskList.filter(function (task) {
      return task.status === "completed";
    });
    console.log(completedTaskArr);
    completedTaskBtn.classList.add("selected-filter");
    allBtn.classList.remove("selected-filter");
    activeBtn.classList.remove("selected-filter");
    displayList(completedTaskArr);
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
