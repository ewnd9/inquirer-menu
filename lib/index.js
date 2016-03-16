var inquirer = require('inquirer-question');
var Promise = require('pinkie');

var constants = require('./constants');
var Menu = require('./menu');

var BACK = 'Back';

module.exports = function(rootComponent) {
  return new Promise(function(resolve, reject) {
    var menu = new Menu();

    function loop(component) {
      if (component === null) {
        resolve();
      } else {
        component.type = 'list';
        component.choices['_____'] = '';
        component.choices.back = function() {
          return BACK;
        };

        inquirer
          .prompt(component)
          .then(function(result) {
            return result && result.then ? result : Promise.resolve(result);
          })
          .then(function(prop) {
            var action = null;

            if (prop === BACK) {
              action = constants.POP;
            } else if (prop && (typeof prop === 'function') || (prop && prop.message && prop.choices)) {
              action = constants.PUSH;
            } else {
              action = constants.REPLACE;
            }

            loop(menu.next(action, prop));
          })
          .catch(function(err) {
            reject(err);
          });
      }
    };

    loop(menu.next(constants.PUSH, rootComponent));
  });
};
