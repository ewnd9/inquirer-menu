var constants = require('./constants');

function Menu() {
  this.history = [];
};

Menu.prototype.next = function(action, component) {
  if (action === constants.REPLACE) {
    component = this.history[this.history.length - 1];
  } else if (action === constants.POP) {
    this.history.pop();
    component = this.history[this.history.length - 1];
  }

  var res = (typeof component === 'function') ? component() : component;

  if (action === constants.PUSH) {
    this.history.push(res);
  }

  if (this.history.length === 0) {
    return null;
  }

  return res;
};

module.exports = Menu;
