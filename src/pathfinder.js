
const pathfinder = {
  mode : "bfs",
  width : 0,
  height : 0,
  grid : undefined,
  isSearching : false
};

function manDist(node, i, j) {
  return (Math.abs(node.i - i) + Math.abs(node.j - j));
}

pathfinder.tracePath = function(node) {
  let currentNode = node;

  while(currentNode !== undefined) {
    aqueue.push(currentNode, (node) => {
      node.target.classList.add("path");
    });
    currentNode = currentNode.parent;
  }
};

pathfinder.isValid = function(i, j) {
  return (i > -1 && i < this.height) &&
         (j > -1 && j < this.width) &&
         (!this.grid[i][j].visited) &&
         (!this.grid[i][j].isClosed());
};

const CHILDREN_COORDS = [
  [-1, 0], // North
  [0, 1], // East
  [1, 0], // South
  [0, -1], // West
];

pathfinder.getChildren = function(node) {
  let children = [];

  let childI = 0;
  let childJ = 0;

  for(let i = 0; i < CHILDREN_COORDS.length; ++i) {
    childI = node.i + CHILDREN_COORDS[i][0];
    childJ = node.j + CHILDREN_COORDS[i][1];

    if(this.isValid(childI, childJ)) {
      children.push([childI, childJ]);
    }
  }

  return children;
};

pathfinder.bfs = function(grid, start, goal) {

  this.grid = grid;
  this.width = grid[0].length;
  this.height = grid.length;

  let startI = start[0];
  let startJ = start[1];

  let goalI = goal[0];
  let goalJ = goal[1];

  let frontier = [];

  let currentNode = this.grid[startI][startJ];
  frontier.push(currentNode);

  while(frontier.length > 0) {
    currentNode = frontier.shift();

    currentNode.visited = true;
    currentNode.inQueue = false;

    aqueue.push(currentNode, (node) => {
      node.target.classList.add("visited");
    });

    if(currentNode.i === goalI && currentNode.j === goalJ) {
      this.tracePath(currentNode);
      break;
    }

    let children = this.getChildren(currentNode);

    for(let i = 0; i < children.length; ++i) {
      let child = this.grid[children[i][0]][children[i][1]];

      if(!child.inQueue) {
        frontier.push(child);
        child.parent = currentNode;
        child.inQueue = true;
      }
    }
  }
};

pathfinder.dfs = function(grid, start, goal) {
  this.grid = grid;
  this.width = grid[0].length;
  this.height = grid.length;

  let startI = start[0];
  let startJ = start[1];

  let goalI = goal[0];
  let goalJ = goal[1];

  let frontier = [];

  let currentNode = this.grid[startI][startJ];

  frontier.push(currentNode);

  while(frontier.length > 0) {
    currentNode = frontier.pop();

    currentNode.visited = true;
    currentNode.inQueue = false;

    aqueue.push(currentNode, (node) => {
      node.target.classList.add("visited");
    });

    if(currentNode.i === goalI && currentNode.j === goalJ) {
      this.tracePath(currentNode);
      break;
    }

    let children = this.getChildren(currentNode);

    for(let i = 0; i < children.length; ++i) {

      let child = this.grid[children[i][0]][children[i][1]];

      if(!child.inQueue) {
        frontier.push(child);
        child.parent = currentNode;
        child.inQueue = true;
      }
    }
  }
};

pathfinder.astar = function(grid, start, goal) {
  this.grid = grid;
  this.width = grid[0].length;
  this.height = grid.length;

  let startI = start[0];
  let startJ = start[1];

  let goalI = goal[0];
  let goalJ = goal[1];

  let frontier = new PriorityQueue();

  let currentNode = this.grid[startI][startJ];

  currentNode.g = 0;
  currentNode.f = 0;
  frontier.push(currentNode, 0);

  while(frontier.size() > 0) {
    currentNode = frontier.pop();

    currentNode.visited = true;
    currentNode.inQueue = false;

    aqueue.push(currentNode, (node) => {
      node.target.classList.add("visited");
    });

    if(currentNode.i === goalI && currentNode.j === goalJ) {
      this.tracePath(currentNode);
      break;
    }

    let children = this.getChildren(currentNode);

    for(let i = 0; i < children.length; ++i) {
      let child = this.grid[children[i][0]][children[i][1]];

      let tentativeG = currentNode.g + 1;

      if(tentativeG < child.g) {
        child.parent = currentNode;
        child.g = tentativeG;
        child.f = child.g + manDist(child, goalI, goalJ);

        if(!child.inQueue) {
          frontier.push(child, child.f);
          child.inQueue = true;
        } else {
          frontier.updatePriority(child, child.f);
        }
      }
    }
  }
};

pathfinder.best = function(grid, start, goal) {

  this.grid = grid;
  this.width = grid[0].length;
  this.height = grid.length;

  let startI = start[0];
  let startJ = start[1];

  let goalI = goal[0];
  let goalJ = goal[1];

  let frontier = new PriorityQueue();

  let currentNode = this.grid[startI][startJ];
  frontier.push(currentNode, 0);

  while(frontier.size() > 0) {

    currentNode = frontier.pop();
    currentNode.inQueue = false;
    currentNode.visited = true;

    aqueue.push(currentNode, (node) => {
      node.target.classList.add("visited");
    });

    if(currentNode.i === goalI && currentNode.j === goalJ) {
      this.tracePath(currentNode);
      break;
    }

    let children = this.getChildren(currentNode);
    for(let i = 0; i < children.length; ++i) {
      let child = this.grid[children[i][0]][children[i][1]];

      dist = manDist(child, goalI, goalJ);

      if(!child.inQueue) {
        child.parent = currentNode;
        frontier.push(child, dist);
        child.inQueue = true;
      }
    }
  }

  console.log(frontier);
};


pathfinder.setMode = function(mode) {
  this.mode = mode;
};

pathfinder.findPath = function(grid, start, goal) {
  if(!this.isSearching) {

    this.isSearching = true;
    this[this.mode](grid, start, goal);

    aqueue.push(this, (pathfinder) => {
      pathfinder.isSearching = false;
    });
    aqueue.execute();
  }
};