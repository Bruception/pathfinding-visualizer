
function PriorityQueue() {
  this.heap = [];
  this.map = {};
}

PriorityQueue.prototype.swim = function() {

  let childIndex = this.heap.length - 1;
  let parentIndex = Math.floor((childIndex - 1) / 2);

  while(childIndex > 0 && this.heap[parentIndex].priority > this.heap[childIndex].priority) {

    this.map[this.heap[childIndex].data.key] = parentIndex;
    this.map[this.heap[parentIndex].data.key] = childIndex;

    let temp = this.heap[childIndex];
    this.heap[childIndex] = this.heap[parentIndex];
    this.heap[parentIndex] = temp;

    childIndex = parentIndex;
    parentIndex = Math.floor((childIndex - 1) / 2);
  }

};

PriorityQueue.prototype.push = function(data, priority) {
  let node = {
    data : data,
    priority : priority,
  };

  this.heap.push(node);
  this.map[node.data.key] = this.heap.length - 1;

  this.swim();
};

PriorityQueue.prototype.sink = function(index) {
  let parentIndex = index;
  let minChildIndex = (2 * parentIndex) + 1;

  let heapLen = (this.heap.length - 1);

  while(minChildIndex <= heapLen) {

    if(minChildIndex < heapLen && this.heap[minChildIndex].priority > this.heap[minChildIndex + 1].priority)
      ++minChildIndex;
    if(this.heap[minChildIndex].priority >= this.heap[parentIndex].priority) break;

    this.map[this.heap[minChildIndex].data.key] = parentIndex;
    this.map[this.heap[parentIndex].data.key] = minChildIndex;

    let temp = this.heap[minChildIndex];
    this.heap[minChildIndex] = this.heap[parentIndex];
    this.heap[parentIndex] = temp;

    parentIndex = minChildIndex;
    minChildIndex = (2 * parentIndex) + 1;
  }
};

PriorityQueue.prototype.pop = function() {
  if(this.size() == 0) return undefined;

  let node = this.heap[0].data;
  delete this.map[node.key];

  this.heap[0] = this.heap[this.heap.length - 1];
  this.map[this.heap[0].data.key] = 0;

  this.heap.pop();
  this.sink(0);

  return node;
};

PriorityQueue.prototype.peek = function() {
  if(this.size() == 0) return undefined;

  return this.heap[0].data;
};

PriorityQueue.prototype.size = function() {
  return this.heap.length;
};

PriorityQueue.prototype.updatePriority = function(node, priority) {
  if(this.map[node.key] === undefined) return;

  this.heap[this.map[node.key]].priority = priority;

  for(let i = Math.floor(this.heap.length / 2); i >= 0; --i) {
    this.sink(i);
  }
};