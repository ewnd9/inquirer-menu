# inquirer-menu

[![Build Status](https://travis-ci.org/ewnd9/inquirer-menu.svg?branch=master)](https://travis-ci.org/ewnd9/inquirer-menu)

Wrapper around inquirer for creation a terminal menu with history

![Demonstration](/demo.gif?raw=true)

## Install

```
$ npm install inquirer-menu --save
```

## Usage

```js
const menu = require('inquirer-menu');

const blueMenu = {
  message: 'blue-menu',
  choices: {
    callApi: function() {
      console.log('blue-api called');
      return;
    }
  }
};

const redMenu = {
  message: 'red-menu',
  choices: {
    callApi: function() {
      console.log('red-api called');
      return;
    }
  }
};

let level = 0;

function createMenu() {
  return {
    message: 'main-menu level ' + level,
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

menu(createMenu)
  .then(function() {
    console.log('bye');
  })
  .catch(function(err) {
    console.log(err.stack);
  });
```

## Related

- [inquirer](https://github.com/sboudrias/Inquirer.js)
- [inquirer-test](https://github.com/ewnd9/inquirer-test)
- [inquirer-bluebird](https://github.com/ewnd9/inquirer-bluebird)
- [inquirer-question](https://github.com/ewnd9/inquirer-question)
- [inquirer-credentials](https://github.com/ewnd9/inquirer-credentials)

## License

MIT © [ewnd9](http://ewnd9.com)
