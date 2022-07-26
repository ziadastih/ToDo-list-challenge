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

let taskList = [];
let dark = true;
// =======================add tasks to the list and local storage ================
const addTask = document.getElementById("add-btn");
addTask.addEventListener("click", function () {
  if (input.value.length > 0) {
    // ======CREATE ID FOR EVERY TASK===================
    let id = new Date().getTime().toString();
    taskList.push({ content: input.value, status: "active", id: id });
    input.value = "";
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayList(taskList, id);
    allBtn.classList.add("selected-filter");
    activeBtn.classList.remove("selected-filter");
    completedTaskBtn.classList.remove("selected-filter");
    taskData.style.opacity = "1";
    addInputCheck();
  }
});

// ==========================dom content load and displaying the local storage  ===================
const taskFromLocalS = JSON.parse(this.localStorage.getItem("taskList"));
if (taskFromLocalS) {
  taskList = taskFromLocalS;
  displayList(taskList);
}
window.addEventListener("DOMContentLoaded", function () {
  allBtn.classList.add("selected-filter");
});

// ======display item function and contains theme switch ================
function displayList(arr, id) {
  if (arr.length == 0) {
    taskData.style.opacity = "0";
  } else {
    taskData.style.opacity = "1";
  }

  // ===============MAP AROUND 2 THE SAME ARRAY SO WE GET THE COMPLETED WITH DIFFERENT STYLING AND THE ACTIVE WITH THE INITIAL ONE AND HAVE CONDITION FOR THE THEMES SO IT DOESNT CHANGE WHEN WE ADD A NEW ITEM.THEN JOIN BOTH AND ADD THEM TO TASK CONTAINER
  let displayCompleted = arr.map(function (task) {
    if (task.status === "completed" && dark === true) {
      return `<article class="task-box box" draggable="true">
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
      return `<article class="task-box white-box box" draggable="true">
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

  let displaytasks = arr.map(function (task) {
    if (task.status === "active" && dark === true) {
      return `<article class="task-box box" draggable="true">
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
      return `<article class="task-box white-box  box" draggable="true">
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
  taskValue.textContent = `${activetasks.length} task active`;
  const taskText = document.querySelectorAll(".task");
  const removeBtns = document.querySelectorAll(".remove-task");
  const checkIcon = document.querySelectorAll(".check");
  const taskBox = document.querySelectorAll(".task-box");
  const completedBtns = document.querySelectorAll(".completed");

  // ==========MARK TASK OR UNMARK IT FUNCTION ==============================
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
              localStorage.setItem("taskList", JSON.stringify(taskList));
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
              localStorage.setItem("taskList", JSON.stringify(taskList));
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

  // =============REMOVE TASK BTN ===================
  removeBtns.forEach(function (removeBtn) {
    removeBtn.addEventListener("click", function () {
      // =======get the index of the id in order to remove it from the array
      let index = taskList.findIndex(function (element) {
        return element.id === removeBtn.id;
      });
      if (index !== -1) {
        taskList.splice(index, 1);
        localStorage.setItem("taskList", JSON.stringify(taskList));
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
  //   ==============THEME SWITCH ===============
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

  //   ============END oF THEME SWITCH =====================
  // ============CLEAR COMPLETED TASKS FUNCTION ======================
  const clearCompleted = document.querySelector(".clear");

  clearCompleted.addEventListener("click", function () {
    // ==========filter our main array and the displaying it ,also setting it as to overwrite the old one in local storage
    taskList = taskList.filter(function (element) {
      return element.status === "active";
    });
    localStorage.setItem("taskList", JSON.stringify(taskList));
    displayList(taskList);
    console.log(taskList);
  });

  // ==================FILTER  BTNS ===================
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

  // ================DRAG AND DROP ============
  // ====change opacity to notice which one we are dragging
  taskBox.forEach(function (task) {
    task.addEventListener("dragstart", function () {
      task.classList.add("dragging");
    });
  });
  taskBox.forEach(function (task) {
    task.addEventListener("dragend", function () {
      task.classList.remove("dragging");
    });
  });
  // =========task container drag event=====
  taskContainer.addEventListener("dragover", function (e) {
    e.preventDefault();

    const draggableTask = document.querySelector(".dragging");
    const afterElement = getDragAfterElement(taskContainer, e.clientY);
    if (afterElement == null) {
      taskContainer.appendChild(draggableTask);
    } else {
      taskContainer.insertBefore(draggableTask, afterElement);
    }
    console.log(afterElement);
  });

  //
  // ==========function getdragafterelement....=============
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

function getDragAfterElement(container, y) {
  // ==define the elements in that box just not the one we are dragging, then creating these items as an array
  const draggableElements = [
    ...container.querySelectorAll(".task-box:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, task) => {
      const box = task.getBoundingClientRect();

      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: task };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

// ===========steps in this challenge to pay attention for==========

// 1. start with a good order finish easy things such as theme switch
// 2.pay attention even though you adjusted theme switch when adding a task you will face issue so you need to set an if statement for every theme
// 3.instead of a for loop start using arr.map under certain condition so we can give the completed tasks different classes and join them all
// 4.comment all code and make sure the variables you are chosing can be accessed
// 5.use arr.filter to facilitate creating new array and diplaying it
// 6.regarding local storage make sure at any change we do we need to update it

// =====================Drag and DROP points===========================

// 1.give the <div  draggable = 'true'>
// 2.for each task give eventlistener ('dragstart') ('dragend')
// 3.for the container give eventListener('dragover')
// 4.e.preventDefault() so we remove the icon on our cursor
// 5.on click get the element that have the class we gave when we drag so that way we have only 1 element and we facilitate our work
// 6.container.appendChild(element),this put the element at the end of the container whenever we drag it
// 7.create a function that determine our mouse y position and determine which element is directly after our dragged element
// 8.the function can have parameters,the container and  the y ,container is the container that we have this drag stat activated in it ,and the y is the e.client which is equal to the user mouse position
// 9.inside the function we need to create an array which we can use [...container.queryselectorAll('task-box:not(.dragging)')],,,,,,,which means get the element inside the container make them an array just dont include the one that have the dragging class on
// 10.we have to return on that function the array we created in form of array.reduce
// 11.the reduce will help us indicate which single element is directly after our mouse cursor depending on the e.client
// 12. set the second parameter in the reduce an offset: number.negative_infinity number so it is always higher than all
// 13.the 2 parameters we use are the (closesr,task) the closest show which offset is the closest and the task shows what task it is
// 14.the get a varialble that give us a rectangle(x,y position and width and height ,top,left,right,bottom) for a box using task.BoundungClientRect()
// 15.we want to measure from the middle of our box,so when we hover and the item is past the middle we do a change
// 16.to do that => get the offset which it will be the difference between the center of the box and the mouse cursor use offset = e.client - box.top - box.height/2(cz we need the center of the box)
// 17.when we console log it we will see when we are above an element we have a negative number and when between 2 we have pos and neg, and when at the bottom we have only positive
// 18.then we give if statement stating the offset < 0 ,cz otherwise we will use the apendChild that we stated above
// 19. if (offset < 0 && offset > closest.offset) mean our offset is closer to than whatever offset we currently have then we know what is our currently closest offset ,and the closest start with the infinity that we set and we need negative infinity cz our numbers are negative
// 20.return an object that includes {offset: offset ,element:task} task we are currently on
// 21. esle if not then we return the closest that we already have set by default...number.neg....
// 22.call this function in case it is defined ,if not call the appenfChild that we set so that way if the item is in the end of the container it will be set directly there if not it will determine the element and we use CONTAINER.INSERTBEFORE(TASK THAT IS BEING DRAGED,AFTERELEMENT(THE ELEMENT THAT WE ARE ABOVE IT))
