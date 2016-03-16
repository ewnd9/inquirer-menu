'use strict';

var menu = require('../../lib/index');

var blueMenu = {
  message: 'blue-menu',
  choices: {
    callApi: function() {
      console.log('blue-api called');
      return;
    }
  }
};

var redMenu = {
  message: 'red-menu',
  choices: {
    callApi: function() {
      console.log('red-api called');
      return;
    }
  }
};

var level = 0;

function createMenu() {
  var curr = {
    message: 'main-menu level ' + level,
    choices: {
      setupData: function() {
        level++;
        console.log('success');

        return createMenu();
      },
      blueMenu: blueMenu,
      redMenu: redMenu
    }
  };

  return curr;
};

menu(createMenu)
  .then(function() {
    console.log('bye');
  })
  .catch(function(err) {
    console.log(err.stack);
  });
