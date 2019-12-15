
function Node(i, j, target) {
  this.i = i;
  this.j = j;
  this.target = target;

  this.g = Infinity;
  this.f = Infinity;

  this.parent = undefined;
  this.key = (this.i * MAP_WIDTH) + this.j;
  this.inQueue = false;
  this.visited = false;

  this.target.addEventListener("mouseenter", (event) => {
    if(mouseDown && !pathfinder.isSearching) this.close();
  });

  this.target.addEventListener("click", (event) => {
    if(!pathfinder.isSearching) this.close();
  });
}

Node.prototype.close = function() {
  this.target.classList.toggle("closed");
};


Node.prototype.clear = function() {
  this.parent = undefined;
  this.inQueue = false;
  this.visited = false;
  this.g = Infinity;
  this.f = Infinity;
  this.target.setAttribute("class", "");
};

Node.prototype.isClosed = function() {
  return this.target.classList.contains("closed");
};
