var createMenu = function(name) {
  return {
    message: name,
    choices: {
      'test-1': function() {
        return 1;
      },
      'test-2': function() {
        return createMenu('red menu');
      }
    }
  };
};

var menu = require('./');
var blueMenu = createMenu('blue menu');
menu(blueMenu);
