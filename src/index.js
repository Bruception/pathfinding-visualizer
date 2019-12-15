
const GRID = [];
const MAP_WIDTH = 25;
const MAP_HEIGHT = 15;

const SEARCH = document.querySelector(".search");
const CLEAR = document.querySelector(".clear");

const ALGO_SELECT = document.querySelector("#algorithm");
const SPEED_SELECT = document.querySelector("#speed");

let startI = 7;
let startJ = 4;

let goalI = 7;
let goalJ = 20;

let mouseDown = false;

function setStartAndGoal() {
  GRID[startI][startJ].target.classList.add("start");
  GRID[startI][startJ].target.classList.add("far");
  GRID[startI][startJ].target.classList.add("fa-flag");

  GRID[goalI][goalJ].target.classList.add("goal");
  GRID[goalI][goalJ].target.classList.add("far");
  GRID[goalI][goalJ].target.classList.add("fa-flag");
}

function initGrid() {
  let table = document.querySelector("#tbl");

  for(let i = 0; i < MAP_HEIGHT; ++i) {
    let row = document.createElement("tr");
    row.setAttribute("id", "row" + i);
    table.appendChild(row);

    GRID[i] = [];

    for(let j = 0; j < MAP_WIDTH; ++j) {
      let node = document.createElement("td");

      GRID[i][j] = new Node(i, j, node);

      row.appendChild(node);
    }
  }

  setStartAndGoal();
}

function clearGrid() {

  aqueue.clear();

  pathfinder.isSearching = false;

  for(let i = 0; i < MAP_HEIGHT; ++i) {
    for(let j = 0; j < MAP_WIDTH; ++j) {
      GRID[i][j].clear();
    }
  }

  setStartAndGoal();
}

window.addEventListener("mousedown", e => {
  mouseDown = true;
});

window.addEventListener("mouseup", e => {
  mouseDown = false;
});

ALGO_SELECT.addEventListener("change", () => {
  pathfinder.setMode(ALGO_SELECT.value);
});

SPEED_SELECT.addEventListener("change", () => {
  aqueue.setDelay(SPEED_SELECT.value);
});

SEARCH.addEventListener("click", () => {
  pathfinder.findPath(GRID, [startI, startJ], [goalI, goalJ]);
});

CLEAR.addEventListener("click", clearGrid);

initGrid();