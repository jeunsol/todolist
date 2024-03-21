// 유저가 값을 입력한다.
// +버튼을 클릭하면 할일이 추가된다
// delete버튼을 누르면 할일이 삭제된다
// check버튼을 누르면 할일이 끝나면서 밑줄이 간다
// 1.check버튼을 클릭하는 순간 true로 바뀐다
// 2.true면 끝난걸로 간주하고 밑줄 보여주고, false면 안끝난걸로 간주하고 밑줄 보여주기

// not Done, Done 탭을 누르면 언더바가 이동한다
// Done탭은 Done 아이템만 보여주고, not Done탭은 not Done 아이템만 보여준다
// All탭을 누르면 다시 All 아이템만 보여준다

let taskInput = document.getElementById("task-input");
let addButton = document.getElementById("add-button");
let tabs = document.querySelectorAll(".task-tabs div");
let taskList = [];
let mode = "all";
let filterList = [];
let underLine = document.getElementById("under-line");
let list = [];

console.log(tabs);
for (let i = 1; i < tabs.length; i++) {
  tabs[i].addEventListener("click", function (event) {
    filter(event);
    tabIndicator(event);
  });
}

function tabIndicator(event) {
  console.log("underline 이동");
  underLine.style.left = event.currentTarget.offsetLeft + "px";
  underLine.style.width = event.currentTarget.offsetWidth + "px";
}

function handleEvent(event) {
  // 클릭 이벤트의 경우 바로 addTask 호출
  if (event.type === "click") {
    addTask();
  }
  // 키보드 이벤트의 경우, 엔터 키 입력 시에 addTask 호출
  else if (event.type === "keypress" && event.key === "Enter") {
    addTask();
  }
}
addButton.addEventListener("click", handleEvent);
document.addEventListener("keypress", handleEvent);

function addTask() {
  let task = {
    id: randomIDGenerate(),
    taskContent: taskInput.value,
    isComplete: false,
  };
  taskList.push(task);
  console.log(taskList);
  render();
}

function render() {
  // 1. 선택한 탭에 따라서
  // all탭: taskList 보여주기
  // ongoing, done탭: filterList 보여주기
  list = [];
  if (mode === "all") {
    list = taskList;
  } else if (mode === "ongoing" || mode === "done") {
    list = filterList;
  }
  // 2. 리스트를 다르게 보여주기: taskList를 list변수로 교체

  let resultHTML = "";
  for (let i = 0; i < list.length; i++) {
    if (list[i].isComplete == true) {
      console.log("텍스트 밑줄");
      resultHTML += `<div class="task">
        <div class="task-done">${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    } else {
      resultHTML += `<div class="task">
        <div>${list[i].taskContent}</div>
        <div>
          <button onclick="toggleComplete('${list[i].id}')">Check</button>
          <button onclick="deleteTask('${list[i].id}')">Delete</button>
        </div>
      </div>`;
    }
  }

  document.getElementById("task-board").innerHTML = resultHTML;
}

function toggleComplete(id) {
  console.log("id:", id);
  for (let i = 0; i < taskList.length; i++) {
    if (taskList[i].id == id) {
      taskList[i].isComplete = !taskList[i].isComplete;
      break;
    }
  }
  render(); //UI단 업뎃
  console.log(taskList);
}

function deleteTask(id) {
  console.log("삭제", id);
  for (let i = 0; i < list.length; i++) {
    if (list[i].id == id) {
      list.splice(i, 1);
      break;
    }
  }
  render();
  console.log(list);
}

function filter(event) {
  console.log("탭 선택", event.target.id);
  mode = event.target.id;
  filterList = [];

  if (mode === "all") {
    //전체 아이템 보여주기
    render();
  } else if (mode === "ongoing") {
    //진행중인 아이템(task.isComplete=false) 보여주기
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === false) {
        filterList.push(taskList[i]);
      }
    }
    console.log("진행중", filterList);
    render();
  } else if (mode === "done") {
    //끝난 아이템(task.isComplete=true) 보여주기
    for (let i = 0; i < taskList.length; i++) {
      if (taskList[i].isComplete === true) {
        filterList.push(taskList[i]);
      }
    }
    console.log("끝", filterList);
    render();
  }
}

function randomIDGenerate() {
  return "_" + Math.random().toString(36).substring(2, 9);
}
