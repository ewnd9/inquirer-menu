# inquirer-menu

Stateful menu for inquirer

## Install

```
$ npm install inquirer-menu --save
```

## Usage

```js
var level = 0;

var createMenu = function() {
  return {
    message: 'main-menu' + (level === 0 ? '' : (' level ' + level)),
    choices: {
      setupData: function() {
        level++;
        console.log('success');
        return;
      },
      blueMenu: blueMenu,
      redMenu: redMenu
    }
  };
};

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

var menu = require('inquirer-menu');
menu(createMenu).then(function() {
  console.log('bye');
});

```

## License

MIT © [ewnd9](http://ewnd9.com)
