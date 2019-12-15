
const SPEED_MAP = {
  ["moderate"] : 35,
  ["slow"] : 100,
  ["fast"] : 10
};

const aqueue = {
  queue : [],
  delay : SPEED_MAP.moderate,
};

aqueue.push = function(target, call) {
  let event = {
    target : target,
    call : call
  };
  this.queue.push(event);
};

aqueue.execute = function() {
  setTimeout(() => {
    if(this.queue.length > 0) {
      this.queue[0].call(this.queue[0].target);
      this.queue.shift();

      this.execute();
    }
  }, this.delay);
};

aqueue.setDelay = function(delay) {
  this.delay = SPEED_MAP[delay];
};

aqueue.clear = function() {
  this.queue = [];
};