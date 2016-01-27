var inquirer = require('inquirer-question');
var Promise = require('bluebird');

var PUSH = 'PUSH';
var REPLACE = 'REPLACE';
var POP = 'POP';

var menu = function(component, render, cb) {
  var history = [];

  var renderComponent = function(component, action) {
    if (action === PUSH) {
      history.push(component);
    } else if (action === POP) {
      history.pop();
    }

    if (history.length === 0) {
      cb();
      return;
    }

    var component = history[history.length - 1];
    var res = (typeof component === 'function') ? component() : component;

    render(res, renderComponent);
  };

  renderComponent(component, PUSH);
};

var noop = function() {};

var inquirerMenu = function(component, cb) {
  var BACK = 'Back';

  var render = function(component, renderComponent) {
    component.type = 'list';
    component.choices[new inquirer.Separator()] = noop;
    component.choices.back = function() {
      return BACK;
    };

    // render if component otherwise rerender current
    var renderIfComponent = function(prop) {
      if (prop === BACK) {
        renderComponent(null, POP);
      } else if (prop && (typeof prop === 'function') || (prop && prop.message && prop.choices)) {
        renderComponent(prop, PUSH);
      } else {
        renderComponent(null, REPLACE);
      }
    };

    inquirer
      .prompt(component)
      .then(function(result) {
        if (result && result.then) {
          result.then(function(result) {
            renderIfComponent(result);
          });
        } else {
          renderIfComponent(result);
        }
    });
  };

  menu(component, render, cb);
};

module.exports = function(component) {
  return new Promise(function(resolve, reject) {
    inquirerMenu(component, resolve);
  });
};
