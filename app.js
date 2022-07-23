const sunBtn = document.getElementById("sun");
const moonBtn = document.getElementById("moon");
const bg = document.querySelector(".bg");
const input = document.getElementById("input");
const taskText = document.querySelectorAll(".task");
const taskBox = document.querySelectorAll(".task-box");
const box = document.querySelector(".box");
const btns = document.querySelectorAll(".btn");
const circles = document.querySelectorAll(".circle");
const taskData = document.querySelector(".task-data");
const filterBtns = document.querySelector(".filter-btns");
// =============theme function==========
moonBtn.addEventListener("click", function () {
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

sunBtn.addEventListener("click", function () {
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
