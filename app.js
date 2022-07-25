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
    let id = new Date().getTime().toString();
    taskList.push({ content: input.value, status: "active", id: id });
    input.value = "";

    displayList(taskList, id);
    allBtn.classList.add("selected-filter");
    activeBtn.classList.remove("selected-filter");
    completedTaskBtn.classList.remove("selected-filter");
    taskData.style.opacity = "1";
    addInputCheck();

    console.log(taskList);
  }
});

// ==========================dom content load ===================

window.addEventListener("DOMContentLoaded", function () {
  allBtn.classList.add("selected-filter");
  displayList(taskList);
});

// ======display item function and contains theme switch ================
function displayList(arr, id) {
  if (arr.length == 0) {
    taskData.style.opacity = "0";
  } else {
    taskData.style.opacity = "1";
  }
  // ===========for loop to display our array depend which theme is======
  let displayCompleted = arr.map(function (task) {
    if (task.status === "completed" && dark === true) {
      return `<article class="task-box box">
    <div class="task-check">
      <span class="circle completed circle-completed" id=${task.id}>
        <img
          class="check show-opacity"
          id=${task.id}
          src="./images/icon-check.svg"
          alt=""
        />
      </span>
      <p class="task task-completed" id=${task.id}>${task.content}</p>
    </div>
    <img
      class="remove-task show-opacity"
      id=${task.id}
      src="./images/icon-cross.svg"
      alt=""
    />
    </article>`;
    } else if (task.status === "completed" && dark === false) {
      return `<article class="task-box white-box box">
        <div class="task-check">
          <span class="circle white-circle completed circle-completed" id=${task.id}>
             <img
               class="check show-opacity"
               id=${task.id}
               src="./images/icon-check.svg"
               alt=""
             />
           </span>
           <p class="task white-task task-completed" id=${task.id}>${task.content}</p>
         </div>
         <img
           class="remove-task show-opacity"
           id=${task.id}
           src="./images/icon-cross.svg"
           alt=""
         />
         </article>`;
    }
  });
  // ====================map for the active tasks and for the displayed tasks with id related to time so we get random number so we facilitate the work for other functions
  let displaytasks = arr.map(function (task) {
    if (task.status === "active" && dark === true) {
      return `<article class="task-box box">
<div class="task-check">
  <span class="circle completed" id=${task.id}>
    <img
      class="check"
      id=${task.id}
      src="./images/icon-check.svg"
      alt=""
    />
  </span>
  <p class="task" id=${task.id}>${task.content}</p>
</div>
<img
  class="remove-task"
  id=${task.id}
  src="./images/icon-cross.svg"
  alt=""
/>
</article>`;
    } else if (task.status === "active" && dark === false) {
      return `<article class="task-box white-box  box">
          <div class="task-check">
             <span class="circle completed white-circle" id=${task.id}>
               <img
                 class="check"
                 id=${task.id}
                 src="./images/icon-check.svg"
                 alt=""
               />
             </span>
             <p class="task white-task" id=${task.id}>${task.content}</p>
           </div>
           <img
             class="remove-task"
             id=${task.id}
             src="./images/icon-cross.svg"
             alt=""
           />
           </article>`;
    }
  });
  displayCompleted = displayCompleted.join("");
  displaytasks = displaytasks.join("");

  taskContainer.innerHTML = `${displayCompleted} ${displaytasks} `;
  // ==========task value filter which ones are active ==========
  const activetasks = taskList.filter(function (task) {
    return task.status === "active";
  });
  taskValue.textContent = `${activetasks.length} tasks active`;
  const taskText = document.querySelectorAll(".task");
  const removeBtns = document.querySelectorAll(".remove-task");
  const checkIcon = document.querySelectorAll(".check");
  const taskBox = document.querySelectorAll(".task-box");
  const completedBtns = document.querySelectorAll(".completed");

  // ==========when finish task click function to cross it and switch it status ==============================
  completedBtns.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (!btn.classList.contains("circle-completed")) {
        btn.classList.add("circle-completed");
        // =====show the icon in the circle and give bg
        checkIcon.forEach(function (check) {
          if (check.id === btn.id) {
            check.classList.add("show-opacity");
          }
        });
        // =====cross the text and find index to switch status
        taskText.forEach(function (task) {
          if (task.id === btn.id) {
            task.classList.add("task-completed");
            const index = taskList.findIndex(function (element) {
              return element.content === task.textContent;
            });
            if (index !== -1) {
              taskList[index].status = "completed";
            }
          }
        });
        removeBtns.forEach(function (removeBtn) {
          if (removeBtn.id === btn.id) {
            removeBtn.classList.add("show-opacity");
          }
        });
      } else {
        btn.classList.remove("circle-completed");
        // =====show the icon in the circle and give bg
        checkIcon.forEach(function (check) {
          if (check.id === btn.id) {
            check.classList.remove("show-opacity");
          }
        });
        // =====cross the text and find index to switch status
        taskText.forEach(function (task) {
          if (task.id === btn.id) {
            task.classList.remove("task-completed");
            const index = taskList.findIndex(function (element) {
              return element.content === task.textContent;
            });
            if (index !== -1) {
              taskList[index].status = "active";
            }
          }
        });
        removeBtns.forEach(function (removeBtn) {
          if (removeBtn.id === btn.id) {
            removeBtn.classList.remove("show-opacity");
          }
        });
      }
    });
  });

  // =============remove task btn ===================
  removeBtns.forEach(function (removeBtn) {
    removeBtn.addEventListener("click", function () {
      // =======get the index of the id in order to remove it from the array
      let index = taskList.findIndex(function (element) {
        return element.id === removeBtn.id;
      });
      if (index !== -1) {
        taskList.splice(index, 1);
        // =========depends what filter we have open we want different tasks displayed so we do it with if statement depend on the class.====
        if (completedTaskBtn.classList.contains("selected-filter")) {
          const completedTaskArr = taskList.filter(function (task) {
            return task.status === "completed";
          });
          displayList(completedTaskArr);
        } else if (activeBtn.classList.contains("selected-filter")) {
          const activetasks = taskList.filter(function (task) {
            return task.status === "active";
          });
          displayList(activetasks);
        } else {
          displayList(taskList);
        }
      }
    });
  });
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
    taskValue.textContent = `${activetasks.length} tasks active`;
  });
  // ==========completed task filter=====================================
  completedTaskBtn.addEventListener("click", function () {
    const completedTaskArr = taskList.filter(function (task) {
      return task.status === "completed";
    });
    console.log(completedTaskArr);
    completedTaskBtn.classList.add("selected-filter");
    allBtn.classList.remove("selected-filter");
    activeBtn.classList.remove("selected-filter");
    displayList(completedTaskArr);
    taskValue.textContent = `${completedTaskArr.length} tasks completed`;
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
